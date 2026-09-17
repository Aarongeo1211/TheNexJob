/* Shared shell + helpers for the candidate/recruiter forms */

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
  const isError = status.type === "error";
  return (
    <div style={{
      padding: "12px 14px",
      borderRadius: "var(--radius-sm)",
      background: isError ? "rgba(220,38,38,0.08)" : "rgba(var(--accent-glow),0.10)",
      border: `1px solid ${isError ? "rgba(220,38,38,0.25)" : "rgba(var(--accent-glow),0.3)"}`,
      color: isError ? "#B91C1C" : "var(--accent-2)",
      fontSize: 13.5,
      marginBottom: 20,
    }}>
      {status.message}
    </div>
  );
};

/**
 * Single- or multi-file picker with a dropzone-styled button and removable chips.
 * `multiple` + `max` bound how many files can be attached.
 */
const FileField = ({ name, label, required, multiple = false, max = 1, hint }) => {
  const [files, setFiles] = React.useState([]);
  const inputRef = React.useRef(null);

  const addFiles = (list) => {
    const incoming = Array.from(list);
    setFiles((prev) => {
      const next = multiple ? [...prev, ...incoming] : incoming;
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
    <div className="field">
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
    onDone({ type: "success", message: "Thanks — we've received it and will be in touch." });
    return true;
  } catch (err) {
    onDone({ type: "error", message: "Network error. Please check your connection and try again." });
    return false;
  }
}

window.FormPage = FormPage;
window.StatusBanner = StatusBanner;
window.FileField = FileField;
window.submitForm = submitForm;
