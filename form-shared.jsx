/* Shared shell + validation + helpers for the candidate/recruiter forms */

const FormPage = ({ eyebrow, title, subtitle, children }) => (
  <>
    <Nav/>
    <main>
      <section style={{ paddingTop: 148, paddingBottom: 40 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }} className="mount">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="h-display" style={{ fontSize: "clamp(30px, 4.5vw, 48px)", margin: "14px 0 10px" }}>{title}</h1>
            <p className="muted" style={{ fontSize: 16, maxWidth: 520, margin: "0 auto", textWrap: "pretty" }}>{subtitle}</p>
          </div>
          <div className="card" style={{ padding: "32px 26px" }}>
            {children}
          </div>
        </div>
      </section>
    </main>
    <Footer/>
  </>
);

const StatusBanner = ({ status }) => {
  if (!status) return null;
  return (
    <div style={{
      padding: "12px 14px",
      borderRadius: "var(--radius-sm)",
      background: "rgba(220,38,38,0.08)",
      border: "1px solid rgba(220,38,38,0.25)",
      color: "#B91C1C",
      fontSize: 13.5,
      marginBottom: 20,
    }}>
      {status.message}
    </div>
  );
};

/* Inline error message shown directly under an invalid field */
const FieldError = ({ message }) =>
  message ? <div className="field-error">{message}</div> : null;

/* ---------------------------------------------------------------------- */
/* Validation                                                              */
/* ---------------------------------------------------------------------- */

const RX_EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const RX_NAME = /^[A-Za-z][A-Za-z .'-]{1,79}$/;

function isValidEmail(v) {
  return RX_EMAIL.test(v.trim());
}

function isValidName(v) {
  return RX_NAME.test(v.trim());
}

function isValidPhone(v) {
  const digits = v.replace(/[\s()-]/g, "");
  return /^\+?[0-9]{7,15}$/.test(digits);
}

/**
 * fields: [{ name, value, label, required, validator, message }]
 * Returns { fieldName: errorMessage } for every field that fails.
 */
function runValidation(fields) {
  const errors = {};
  for (const f of fields) {
    const value = (f.value ?? "").toString().trim();
    if (f.required && !value) {
      errors[f.name] = `${f.label} is required.`;
      continue;
    }
    if (value && f.validator && !f.validator(value)) {
      errors[f.name] = f.message || `Enter a valid ${f.label.toLowerCase()}.`;
    }
  }
  return errors;
}

/* Scroll to and focus the first field with an error. Category/role errors
   live on the picker block (no focusable native input), so scroll to that
   wrapper via a data attribute instead. */
function focusFirstError(formEl, errors) {
  const firstKey = Object.keys(errors)[0];
  if (!firstKey) return;
  const group = formEl.querySelector(`[data-field-group="${firstKey}"]`);
  const scrollTarget = group || formEl.elements[firstKey];
  const focusTarget = (group && group.querySelector("input, select, textarea, button")) || formEl.elements[firstKey];
  if (scrollTarget && scrollTarget.scrollIntoView) {
    scrollTarget.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  if (focusTarget && typeof focusTarget.focus === "function") {
    focusTarget.focus({ preventScroll: true });
  }
}

/* ---------------------------------------------------------------------- */
/* Success modal — shown on a confirmed submission                        */
/* ---------------------------------------------------------------------- */

const SuccessModal = ({ open, onClose, title, message }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-check">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M7.5 13.5l3.4 3.4 7.2-8.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="h-display" style={{ fontSize: 22, margin: "16px 0 8px" }}>{title}</h3>
        <p className="muted" style={{ fontSize: 15, lineHeight: 1.55, margin: 0 }}>{message}</p>
        <button type="button" className="btn btn-accent" onClick={onClose} style={{ marginTop: 22, justifyContent: "center", width: "100%" }}>
          Done
        </button>
      </div>
    </div>
  );
};

/**
 * Single- or multi-file picker with a dropzone-styled button and removable chips.
 * `multiple` + `max` bound how many files can be attached. Validates type/size
 * client-side and surfaces a rejection message via `onError`.
 */
const FileField = ({ name, label, required, multiple = false, max = 1, hint, onError }) => {
  const [files, setFiles] = React.useState([]);
  const inputRef = React.useRef(null);
  const MAX_BYTES = 1.5 * 1024 * 1024;
  const ALLOWED = [".pdf", ".doc", ".docx"];

  const addFiles = (list) => {
    const incoming = Array.from(list);
    const accepted = [];
    for (const f of incoming) {
      const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
      if (!ALLOWED.includes(ext)) {
        onError?.(`"${f.name}" must be a PDF, DOC, or DOCX file.`);
        continue;
      }
      if (f.size > MAX_BYTES) {
        onError?.(`"${f.name}" is too large — 1.5MB max.`);
        continue;
      }
      accepted.push(f);
    }
    if (accepted.length === 0) return;
    onError?.(null);
    setFiles((prev) => {
      const next = multiple ? [...prev, ...accepted] : accepted;
      return next.slice(0, max);
    });
  };

  const removeAt = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  // Keep a real FileList on the (hidden) input so FormData picks it up on submit.
  React.useEffect(() => {
    if (!inputRef.current) return;
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    inputRef.current.files = dt.files;
  }, [files]);

  return (
    <div className="field" data-field-group={name}>
      <label>{label} {required && <span className="req">*</span>}</label>
      <label className={`dropzone ${files.length ? "has-files" : ""}`}>
        <input
          ref={inputRef}
          type="file"
          name={name}
          multiple={multiple}
          accept=".pdf,.doc,.docx"
          onChange={(e) => addFiles(e.target.files)}
        />
        <div className="muted" style={{ fontSize: 13.5 }}>
          {files.length === 0
            ? <>Click to upload {multiple ? `(up to ${max})` : ""} — PDF, DOC, or DOCX</>
            : <>Click to {multiple && files.length < max ? "add more" : "replace"}</>}
        </div>
      </label>
      {hint && <div className="field-hint">{hint}</div>}
      {files.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
          {files.map((f, i) => (
            <span key={i} className="file-chip">
              {f.name}
              <button type="button" onClick={() => removeAt(i)} aria-label="Remove file">×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

async function submitForm(url, formEl, { onStart, onDone }) {
  onStart();
  try {
    const res = await fetch(url, { method: "POST", body: new FormData(formEl) });
    const data = await res.json().catch(() => ({ ok: false, error: "Unexpected response from server." }));
    if (!res.ok || !data.ok) {
      onDone({ type: "error", message: data.error || "Something went wrong. Please try again." });
      return false;
    }
    onDone(null);
    return true;
  } catch (err) {
    onDone({ type: "error", message: "Network error. Please check your connection and try again." });
    return false;
  }
}

window.FormPage = FormPage;
window.StatusBanner = StatusBanner;
window.FieldError = FieldError;
window.SuccessModal = SuccessModal;
window.FileField = FileField;
window.submitForm = submitForm;
window.isValidEmail = isValidEmail;
window.isValidName = isValidName;
window.isValidPhone = isValidPhone;
window.runValidation = runValidation;
window.focusFirstError = focusFirstError;
