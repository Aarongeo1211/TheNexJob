/* Services — simple 2x2 card grid, no animation, no dashboards */

const SERVICES = [
  {
    title: "Recruitment",
    desc: "Permanent staffing and contract hiring, managed end-to-end — role scoping, sourcing, screening, and onboarding the right person, not just a fast one.",
    icon: "recruitment",
    links: [
      { label: "Submit your resume", href: "candidate" },
      { label: "Looking to hire?", href: "recruiter" },
    ],
  },
  {
    title: "Career Guidance",
    desc: "One-on-one guidance for professionals at a crossroads — resume, interview preparation, and honest clarity on the right next step.",
    icon: "career",
  },
  {
    title: "Sales Consulting",
    desc: "Sales effectiveness done practically — process, pipeline discipline, and team coaching for businesses that need to sell better, not just harder.",
    icon: "sales",
  },
  {
    title: "HR Advisory",
    desc: "Policy, process, and people-strategy support for founders and HR teams building their function from the ground up.",
    icon: "hr",
  },
];

const Services = () => {
  return (
    <section id="services" className="band">
      <div className="container">
        <SectionHeader
          eyebrow="Services"
          title={<>What I <span className="h-serif-italic" style={{ color: "var(--fg-3)" }}>help with</span>.</>}
          subtitle="Four areas, one practice — each grounded in the same experience with people and organisations."
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 18,
          marginTop: 40,
        }} className="svc-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
        <style>{`
          @media (max-width: 720px) {
            .svc-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }) => (
  <div className="card card-hover reveal reveal-stagger" style={{ "--i": index, padding: 30, display: "flex", flexDirection: "column", gap: 14 }}>
    <div className="icon-box" style={{
      width: 44, height: 44, borderRadius: 12,
      background: "rgba(var(--accent-glow), 0.08)",
      border: "1px solid rgba(var(--accent-glow), 0.2)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "var(--accent)",
    }}>
      <ServiceIcon kind={service.icon}/>
    </div>
    <h3 className="h-display" style={{ fontSize: 22, margin: 0 }}>{service.title}</h3>
    <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.6, textWrap: "pretty" }}>{service.desc}</p>
    {service.links && (
      <div style={{ display: "flex", gap: 16, marginTop: 2 }}>
        {service.links.map((l) => (
          <a key={l.label} href={l.href} style={{ fontSize: 13.5, color: "var(--accent)", fontWeight: 500, borderBottom: "1px solid transparent" }}
             onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
             onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}>
            {l.label} →
          </a>
        ))}
      </div>
    )}
  </div>
);

const ServiceIcon = ({ kind }) => {
  if (kind === "recruitment") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="7" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2.5 17c0-3 2-5 4.5-5s4.5 2 4.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M13.5 9l1.6 1.6L18.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (kind === "career") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2l2.3 4.8 5.2.7-3.8 3.7.9 5.3L10 13.9l-4.6 2.6.9-5.3-3.8-3.7 5.2-.7L10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  );
  if (kind === "sales") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2.5 14.5l4.5-4.5 3 3 6.5-6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 6.5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M6 8h8M6 11h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
};

const SectionHeader = ({ eyebrow, title, subtitle, align = "center" }) => (
  <div style={{ textAlign: align, display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start", gap: 18 }}>
    <span className="eyebrow">{eyebrow}</span>
    <h2 className="h-display" style={{ fontSize: "clamp(32px, 4.5vw, 52px)", margin: 0, maxWidth: 780 }}>{title}</h2>
    {subtitle && <p className="muted" style={{ fontSize: 16, maxWidth: 560, margin: 0, textWrap: "pretty" }}>{subtitle}</p>}
  </div>
);

window.Services = Services;
window.SectionHeader = SectionHeader;
