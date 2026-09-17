const EXPERIENCE_RANGES = ["0-2 years", "2-5 years", "5-10 years", "10+ years", "Management / Leadership level"];

const CandidateForm = () => {
  const [roleValue, setRoleValue] = React.useState({ category: "", role: "", otherText: "" });
  const [errors, setErrors] = React.useState({});
  const [fileError, setFileError] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const formRef = React.useRef(null);

  const cls = (base, name) => (errors[name] ? `${base} ${base}-error` : base);

  const resolvedRole = roleValue.role.startsWith("Other") ? roleValue.otherText : roleValue.role;

  const validate = () => {
    const el = formRef.current.elements;
    const fieldErrors = runValidation([
      { name: "name", value: el.name.value, label: "Name", required: true, validator: isValidName, message: "Enter a valid name (letters only)." },
      { name: "email", value: el.email.value, label: "Email", required: true, validator: isValidEmail, message: "Enter a valid email address." },
      { name: "phone", value: el.phone.value, label: "Phone number", required: true, validator: isValidPhone, message: "Enter a valid phone number." },
      { name: "alt_phone", value: el.alt_phone.value, label: "Alternative phone number", required: false, validator: isValidPhone, message: "Enter a valid phone number." },
      { name: "experience_range", value: el.experience_range.value, label: "Experience range", required: true },
    ]);
    if (!roleValue.category) {
      fieldErrors.category = "Choose IT or Non-IT.";
    } else if (!resolvedRole.trim()) {
      fieldErrors.category = roleValue.role === "" ? "Choose a role." : "Tell us the specific role.";
    }
    return fieldErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      focusFirstError(formRef.current, fieldErrors);
      return;
    }
    const ok = await submitForm("/api/candidate", formRef.current, {
      onStart: () => { setSubmitting(true); setStatus(null); },
      onDone: (s) => { setSubmitting(false); setStatus(s); },
    });
    if (ok) {
      formRef.current.reset();
      setRoleValue({ category: "", role: "", otherText: "" });
      setErrors({});
      setShowSuccess(true);
    }
  };

  return (
    <FormPage
      eyebrow="For Candidates"
      title="Tell us about you."
      subtitle="Share a few details and your resume — we'll reach out when there's a fit."
    >
      <StatusBanner status={status} />
      <form ref={formRef} onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div className="field" data-field-group="name">
          <label>Name <span className="req">*</span></label>
          <input className={cls("input", "name")} type="text" name="name" />
          <FieldError message={errors.name} />
        </div>

        <div className="field-row">
          <div className="field" data-field-group="email">
            <label>Email ID <span className="req">*</span></label>
            <input className={cls("input", "email")} type="email" name="email" />
            <FieldError message={errors.email} />
          </div>
          <div className="field" data-field-group="phone">
            <label>Phone No <span className="req">*</span></label>
            <input className={cls("input", "phone")} type="tel" name="phone" />
            <FieldError message={errors.phone} />
          </div>
        </div>

        <div className="field" data-field-group="alt_phone">
          <label>Alternative Phone No</label>
          <input className={cls("input", "alt_phone")} type="tel" name="alt_phone" />
          <FieldError message={errors.alt_phone} />
        </div>

        <FileField name="resume" label="Resume" hint="PDF, DOC, or DOCX — up to 1.5MB" onError={setFileError} />
        <FieldError message={fileError} />

        <div className="field" data-field-group="experience_range">
          <label>Experience Range <span className="req">*</span></label>
          <select className={cls("select", "experience_range")} name="experience_range" defaultValue="">
            <option value="" disabled>Select…</option>
            {EXPERIENCE_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <FieldError message={errors.experience_range} />
        </div>

        <CategoryRolePicker value={roleValue} onChange={setRoleValue} name="role" error={errors.category} />

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

      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Thanks — you're in!"
        message="We've received your details. Our team will review them and reach out to you soon."
      />
    </FormPage>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<CandidateForm/>);
