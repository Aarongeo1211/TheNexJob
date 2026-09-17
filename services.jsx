/* Services — one featured entry (Recruitment, the actual conversion path)
   plus three secondary cards, broken up with editorial numerals instead of
   a uniform 2x2 icon-tile grid. */

const SERVICES = [
  {
    title: "Recruitment",
    desc: "Permanent staffing and contract hiring, managed end-to-end — role scoping, sourcing, screening, and onboarding the right person, not just a fast one.",
    icon: "recruitment",
    links: [
      { label: "Submit your resume", href: "candidate" },
      { label: "Looking to hire?", href: "recruiter" },
    ],
    featured: true,
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
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
          marginTop: 40,
        }} className="svc-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
        <style>{`
          @media (max-width: 860px) {
            .svc-grid { grid-template-columns: 1fr !important; }
            .svc-featured { flex-direction: column !important; align-items: flex-start !important; }
            .svc-featured .svc-rail { flex-direction: row !important; align-items: center !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

const Numeral = ({ n, size = 30 }) => (
  <span style={{
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontSize: size,
    lineHeight: 1,
    color: "color-mix(in oklab, var(--accent), transparent 55%)",
  }}>
    {String(n).padStart(2, "0")}
  </span>
);

const ServiceCard = ({ service, index }) => {
  if (service.featured) {
    return (
      <div className="card card-hover reveal svc-featured" style={{
        gridColumn: "1 / -1",
        padding: "34px 36px",
        display: "flex",
        gap: 30,
        alignItems: "center",
        background: `radial-gradient(760px 280px at 0% 0%, rgba(var(--accent-glow),0.10), transparent 70%), var(--surface)`,
      }}>
        <div className="svc-rail" style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
          <Numeral n={index + 1} size={40} />
          <div className="icon-box" style={{
            width: 52, height: 52, borderRadius: 14,
            background: "rgba(var(--accent-glow), 0.10)",
            border: "1px solid rgba(var(--accent-glow), 0.22)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--accent)",
          }}>
            <ServiceIcon kind={service.icon} size={26}/>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 className="h-display" style={{ fontSize: 26, margin: 0 }}>{service.title}</h3>
          <p className="muted" style={{ margin: "8px 0 0", fontSize: 15.5, lineHeight: 1.6, maxWidth: 560, textWrap: "pretty" }}>{service.desc}</p>
          <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
            {service.links.map((l) => (
              <a key={l.label} href={l.href} className="btn btn-ghost" style={{ fontSize: 13.5, padding: "9px 16px" }}>
                {l.label} <span aria-hidden>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-hover reveal reveal-stagger" style={{ "--i": index, padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Numeral n={index + 1} />
        <div className="icon-box" style={{
          width: 34, height: 34, borderRadius: 10,
          background: "rgba(var(--accent-glow), 0.08)",
          border: "1px solid rgba(var(--accent-glow), 0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--accent)",
        }}>
          <ServiceIcon kind={service.icon} size={17}/>
        </div>
      </div>
      <h3 className="h-display" style={{ fontSize: 20, margin: 0 }}>{service.title}</h3>
      <p className="muted" style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, textWrap: "pretty" }}>{service.desc}</p>
    </div>
  );
};

const ServiceIcon = ({ kind, size = 20 }) => {
  if (kind === "recruitment") return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="7" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2.5 17c0-3 2-5 4.5-5s4.5 2 4.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M13.5 9l1.6 1.6L18.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (kind === "career") return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 2l2.3 4.8 5.2.7-3.8 3.7.9 5.3L10 13.9l-4.6 2.6.9-5.3-3.8-3.7 5.2-.7L10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  );
  if (kind === "sales") return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M2.5 14.5l4.5-4.5 3 3 6.5-6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 6.5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
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
