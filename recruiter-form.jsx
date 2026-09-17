function isValidCompanyOrTitle(v) {
  return v.trim().length >= 2;
}

const RecruiterForm = () => {
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
      { name: "email", value: el.email.value, label: "Official email", required: true, validator: isValidEmail, message: "Enter a valid email address." },
      { name: "phone", value: el.phone.value, label: "Phone number", required: true, validator: isValidPhone, message: "Enter a valid phone number." },
      { name: "company_name", value: el.company_name.value, label: "Company name", required: true, validator: isValidCompanyOrTitle, message: "Enter your company's name." },
      { name: "job_title", value: el.job_title.value, label: "Job title", required: true, validator: isValidCompanyOrTitle, message: "Enter a valid job title." },
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
    const ok = await submitForm("/api/recruiter", formRef.current, {
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
      eyebrow="For Recruiters"
      title="Tell us who you're hiring."
      subtitle="Share the role and a job description — we'll start sourcing from there."
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
            <label>Official Email ID <span className="req">*</span></label>
            <input className={cls("input", "email")} type="email" name="email" />
            <FieldError message={errors.email} />
          </div>
          <div className="field" data-field-group="phone">
            <label>Phone No <span className="req">*</span></label>
            <input className={cls("input", "phone")} type="tel" name="phone" />
            <FieldError message={errors.phone} />
          </div>
        </div>

        <div className="field-row">
          <div className="field" data-field-group="company_name">
            <label>Company Name <span className="req">*</span></label>
            <input className={cls("input", "company_name")} type="text" name="company_name" />
            <FieldError message={errors.company_name} />
          </div>
          <div className="field" data-field-group="job_title">
            <label>Job Title <span className="req">*</span></label>
            <input className={cls("input", "job_title")} type="text" name="job_title" />
            <FieldError message={errors.job_title} />
          </div>
        </div>

        <CategoryRolePicker value={roleValue} onChange={setRoleValue} name="role" error={errors.category} />

        <FileField name="jds" label="Job Description(s)" multiple max={5} hint="PDF, DOC, or DOCX — up to 5 files, 1.5MB each" onError={setFileError} />
        <FieldError message={fileError} />

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

      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Thanks — request received!"
        message="We've received the role details. Our team will review them and reach out to you soon."
      />
    </FormPage>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<RecruiterForm/>);
