const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB per file
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
  if (file.size > MAX_FILE_BYTES) return "too large (max 8MB)";
  if (!ALLOWED_EXT.includes(extOf(file.name))) return "must be PDF, DOC, or DOCX";
  return "";
}

async function storeFile(env, file, keyPrefix) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `${keyPrefix}/${crypto.randomUUID()}-${safeName}`;
  await env.UPLOADS.put(key, file.stream(), {
    httpMetadata: { contentType: file.type || "application/octet-stream" },
  });
  return { key, filename: file.name };
}

function requireFields(form, fields) {
  for (const f of fields) {
    const v = form.get(f);
    if (!v || String(v).trim() === "") return f;
  }
  return null;
}

async function handleCandidate(request, env) {
  const form = await request.formData();

  const missing = requireFields(form, ["name", "email", "phone", "experience_range", "category", "role"]);
  if (missing) return badRequest(`Missing required field: ${missing}`);

  const resume = form.get("resume");
  const resumeCheck = validFile(resume);
  if (resumeCheck) return badRequest(`Resume ${resumeCheck}`);

  let resumeKey = null;
  let resumeFilename = null;
  if (resume && resume.size > 0) {
    const stored = await storeFile(env, resume, "candidates");
    resumeKey = stored.key;
    resumeFilename = stored.filename;
  }

  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO candidates
      (id, name, email, phone, alt_phone, resume_key, resume_filename, experience_range,
       category, role, description, current_compensation, expected_compensation, notice_period, created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(
    id,
    form.get("name"),
    form.get("email"),
    form.get("phone"),
    form.get("alt_phone") || null,
    resumeKey,
    resumeFilename,
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

  const jdKeys = [];
  for (const file of jdFiles) {
    const check = validFile(file);
    if (check) return badRequest(`JD file "${file.name}" ${check}`);
    const stored = await storeFile(env, file, "recruiters");
    jdKeys.push(stored);
  }

  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO recruiters
      (id, name, email, phone, company_name, job_title, category, role,
       compensation_range, additional_info, jd_keys, created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
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
    JSON.stringify(jdKeys),
    new Date().toISOString()
  ).run();

  return json({ ok: true, id });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/api/candidate") {
      try {
        return await handleCandidate(request, env);
      } catch (err) {
        console.error("candidate error:", err && err.stack || err);
        return json({ ok: false, error: "Server error. Please try again." }, 500);
      }
    }

    if (request.method === "POST" && url.pathname === "/api/recruiter") {
      try {
        return await handleRecruiter(request, env);
      } catch (err) {
        console.error("recruiter error:", err && err.stack || err);
        return json({ ok: false, error: "Server error. Please try again." }, 500);
      }
    }

    return json({ ok: false, error: "Not found" }, 404);
  },
};
