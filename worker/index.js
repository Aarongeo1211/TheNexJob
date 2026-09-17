const MAX_FILE_BYTES = 1.5 * 1024 * 1024; // 1.5MB — D1 caps a single BLOB value at ~2MB
const ALLOWED_EXT = [".pdf", ".doc", ".docx"];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function badRequest(message) {
  return json({ ok: false, error: message }, 400);
}

function extOf(filename) {
  const i = filename.lastIndexOf(".");
  return i === -1 ? "" : filename.slice(i).toLowerCase();
}

function validFile(file) {
  if (!file || typeof file === "string") return null;
  if (file.size === 0) return null;
  if (file.size > MAX_FILE_BYTES) return "too large (max 1.5MB)";
  if (!ALLOWED_EXT.includes(extOf(file.name))) return "must be PDF, DOC, or DOCX";
  return "";
}

function requireFields(form, fields) {
  for (const f of fields) {
    const v = form.get(f);
    if (!v || String(v).trim() === "") return f;
  }
  return null;
}

function requireAdmin(request, env) {
  if (!env.ADMIN_TOKEN) return false;
  const header = request.headers.get("authorization") || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7) : null;
  const queryToken = new URL(request.url).searchParams.get("token");
  const token = bearer || queryToken;
  return token === env.ADMIN_TOKEN;
}

async function handleCandidate(request, env) {
  const form = await request.formData();

  const missing = requireFields(form, ["name", "email", "phone", "experience_range", "category", "role"]);
  if (missing) return badRequest(`Missing required field: ${missing}`);

  const resume = form.get("resume");
  const resumeCheck = validFile(resume);
  if (resumeCheck) return badRequest(`Resume ${resumeCheck}`);

  let resumeFilename = null;
  let resumeContentType = null;
  let resumeBlob = null;
  if (resume && resume.size > 0) {
    resumeFilename = resume.name;
    resumeContentType = resume.type || "application/octet-stream";
    resumeBlob = await resume.arrayBuffer();
  }

  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO candidates
      (id, name, email, phone, alt_phone, resume_filename, resume_content_type, resume_blob,
       experience_range, category, role, description, current_compensation, expected_compensation,
       notice_period, created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(
    id,
    form.get("name"),
    form.get("email"),
    form.get("phone"),
    form.get("alt_phone") || null,
    resumeFilename,
    resumeContentType,
    resumeBlob,
    form.get("experience_range"),
    form.get("category"),
    form.get("role"),
    form.get("description") || null,
    form.get("current_compensation") || null,
    form.get("expected_compensation") || null,
    form.get("notice_period") || null,
    new Date().toISOString()
  ).run();

  return json({ ok: true, id });
}

async function handleRecruiter(request, env) {
  const form = await request.formData();

  const missing = requireFields(form, ["name", "email", "phone", "company_name", "job_title", "category", "role"]);
  if (missing) return badRequest(`Missing required field: ${missing}`);

  const jdFiles = form.getAll("jds").filter((f) => f && typeof f !== "string" && f.size > 0);
  if (jdFiles.length > 5) return badRequest("Upload at most 5 JD files");

  for (const file of jdFiles) {
    const check = validFile(file);
    if (check) return badRequest(`JD file "${file.name}" ${check}`);
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO recruiters
      (id, name, email, phone, company_name, job_title, category, role,
       compensation_range, additional_info, created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(
    id,
    form.get("name"),
    form.get("email"),
    form.get("phone"),
    form.get("company_name"),
    form.get("job_title"),
    form.get("category"),
    form.get("role"),
    form.get("compensation_range") || null,
    form.get("additional_info") || null,
    createdAt
  ).run();

  for (const file of jdFiles) {
    const blob = await file.arrayBuffer();
    await env.DB.prepare(
      `INSERT INTO recruiter_files (id, recruiter_id, filename, content_type, blob, created_at)
       VALUES (?,?,?,?,?,?)`
    ).bind(crypto.randomUUID(), id, file.name, file.type || "application/octet-stream", blob, createdAt).run();
  }

  return json({ ok: true, id });
}

async function handleAdminCandidates(env) {
  const { results } = await env.DB.prepare(
    `SELECT id, name, email, phone, alt_phone, resume_filename, experience_range, category, role,
            description, current_compensation, expected_compensation, notice_period, created_at
     FROM candidates ORDER BY created_at DESC`
  ).all();
  return json({ ok: true, candidates: results });
}

async function handleAdminRecruiters(env) {
  const { results: recruiters } = await env.DB.prepare(
    `SELECT id, name, email, phone, company_name, job_title, category, role,
            compensation_range, additional_info, created_at
     FROM recruiters ORDER BY created_at DESC`
  ).all();
  const { results: files } = await env.DB.prepare(
    `SELECT id, recruiter_id, filename FROM recruiter_files ORDER BY created_at ASC`
  ).all();
  const filesByRecruiter = {};
  for (const f of files) {
    (filesByRecruiter[f.recruiter_id] ||= []).push({ id: f.id, filename: f.filename });
  }
  for (const r of recruiters) r.files = filesByRecruiter[r.id] || [];
  return json({ ok: true, recruiters });
}

async function handleAdminFile(env, kind, id) {
  const row =
    kind === "candidate"
      ? await env.DB.prepare(`SELECT resume_filename AS filename, resume_content_type AS content_type, resume_blob AS blob FROM candidates WHERE id = ?`).bind(id).first()
      : await env.DB.prepare(`SELECT filename, content_type, blob FROM recruiter_files WHERE id = ?`).bind(id).first();

  if (!row || !row.blob) return json({ ok: false, error: "Not found" }, 404);

  // D1 can hand back a BLOB column as an ArrayBuffer or (locally) a plain
  // number array — normalize to bytes either way.
  const bytes = new Uint8Array(row.blob);

  return new Response(bytes, {
    headers: {
      "content-type": row.content_type || "application/octet-stream",
      "content-disposition": `attachment; filename="${(row.filename || "file").replace(/"/g, "")}"`,
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/api/candidate") {
      try {
        return await handleCandidate(request, env);
      } catch (err) {
        console.error("candidate error:", (err && err.stack) || err);
        return json({ ok: false, error: "Server error. Please try again." }, 500);
      }
    }

    if (request.method === "POST" && url.pathname === "/api/recruiter") {
      try {
        return await handleRecruiter(request, env);
      } catch (err) {
        console.error("recruiter error:", (err && err.stack) || err);
        return json({ ok: false, error: "Server error. Please try again." }, 500);
      }
    }

    if (url.pathname.startsWith("/api/admin/")) {
      if (!requireAdmin(request, env)) return json({ ok: false, error: "Unauthorized" }, 401);
      try {
        if (url.pathname === "/api/admin/candidates") return await handleAdminCandidates(env);
        if (url.pathname === "/api/admin/recruiters") return await handleAdminRecruiters(env);
        const fileMatch = url.pathname.match(/^\/api\/admin\/file\/(candidate|recruiter)\/([^/]+)$/);
        if (fileMatch) return await handleAdminFile(env, fileMatch[1], fileMatch[2]);
      } catch (err) {
        console.error("admin error:", (err && err.stack) || err);
        return json({ ok: false, error: "Server error." }, 500);
      }
    }

    return json({ ok: false, error: "Not found" }, 404);
  },
};
