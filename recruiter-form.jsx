const RecruiterForm = () => {
  const [roleValue, setRoleValue] = React.useState({ category: "", role: "", otherText: "" });
  const [status, setStatus] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const formRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await submitForm("/api/recruiter", formRef.current, {
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
      eyebrow="For Recruiters"
      title="Tell us who you're hiring."
      subtitle="Share the role and a job description — we'll start sourcing from there."
    >
      <StatusBanner status={status} />
      <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div className="field">
          <label>Name <span className="req">*</span></label>
          <input className="input" type="text" name="name" required />
        </div>

        <div className="field-row">
          <div className="field">
            <label>Official Email ID <span className="req">*</span></label>
            <input className="input" type="email" name="email" required />
          </div>
          <div className="field">
            <label>Phone No <span className="req">*</span></label>
            <input className="input" type="tel" name="phone" required />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Company Name <span className="req">*</span></label>
            <input className="input" type="text" name="company_name" required />
          </div>
          <div className="field">
            <label>Job Title <span className="req">*</span></label>
            <input className="input" type="text" name="job_title" required />
          </div>
        </div>

        <CategoryRolePicker value={roleValue} onChange={setRoleValue} name="role" />

        <FileField name="jds" label="Job Description(s)" multiple max={5} hint="PDF, DOC, or DOCX — up to 5 files, 8MB each" />

        <div className="field">
          <label>Compensation Range</label>
          <input className="input" type="text" name="compensation_range" placeholder="e.g. ₹15–20 LPA" />
        </div>

        <div className="field">
          <label>Additional Information</label>
          <textarea className="textarea" name="additional_info" placeholder="Anything else that helps us find the right fit…" />
        </div>

        <button type="submit" className="btn btn-accent" disabled={submitting} style={{ justifyContent: "center", marginTop: 8, padding: "13px 20px" }}>
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </form>
    </FormPage>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<RecruiterForm/>);
