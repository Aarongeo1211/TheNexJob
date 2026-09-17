const EXPERIENCE_RANGES = ["0-2 years", "2-5 years", "5-10 years", "10+ years", "Management / Leadership level"];

const CandidateForm = () => {
  const [roleValue, setRoleValue] = React.useState({ category: "", role: "", otherText: "" });
  const [status, setStatus] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const formRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await submitForm("/api/candidate", formRef.current, {
      onStart: () => { setSubmitting(true); setStatus(null); },
      onDone: (s) => { setSubmitting(false); setStatus(s); },
    });
    if (ok) {
      formRef.current.reset();
      setRoleValue({ category: "", role: "", otherText: "" });
    }
  };

  return (
    <FormPage
      eyebrow="For Candidates"
      title="Tell us about you."
      subtitle="Share a few details and your resume — we'll reach out when there's a fit."
    >
      <StatusBanner status={status} />
      <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div className="field">
          <label>Name <span className="req">*</span></label>
          <input className="input" type="text" name="name" required />
        </div>

        <div className="field-row">
          <div className="field">
            <label>Email ID <span className="req">*</span></label>
            <input className="input" type="email" name="email" required />
          </div>
          <div className="field">
            <label>Phone No <span className="req">*</span></label>
            <input className="input" type="tel" name="phone" required />
          </div>
        </div>

        <div className="field">
          <label>Alternative Phone No</label>
          <input className="input" type="tel" name="alt_phone" />
        </div>

        <FileField name="resume" label="Resume" hint="PDF, DOC, or DOCX — up to 8MB" />

        <div className="field">
          <label>Experience Range <span className="req">*</span></label>
          <select className="select" name="experience_range" required defaultValue="">
            <option value="" disabled>Select…</option>
            {EXPERIENCE_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <CategoryRolePicker value={roleValue} onChange={setRoleValue} name="role" />

        <div className="field">
          <label>Short Description of Experience</label>
          <textarea className="textarea" name="description" placeholder="A couple of lines on what you do and what you're looking for…" />
        </div>

        <div className="field-row">
          <div className="field">
            <label>Current Compensation</label>
            <input className="input" type="text" name="current_compensation" placeholder="e.g. ₹12 LPA" />
          </div>
          <div className="field">
            <label>Expected Compensation</label>
            <input className="input" type="text" name="expected_compensation" placeholder="e.g. ₹16 LPA" />
          </div>
        </div>

        <div className="field">
          <label>Notice Period</label>
          <input className="input" type="text" name="notice_period" placeholder="e.g. Immediate, 30 days" />
        </div>

        <button type="submit" className="btn btn-accent" disabled={submitting} style={{ justifyContent: "center", marginTop: 8, padding: "13px 20px" }}>
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </form>
    </FormPage>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<CandidateForm/>);
