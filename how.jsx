/* How it works — 3-step process with animated connectors */

const HowItWorks = () => {
  const steps = [
    {
      n: "01",
      title: "Define the role",
      copy: "Plain-language brief in. Our agent extracts skills, seniority, comp range, and culture signals — your hiring rubric, calibrated.",
      icon: "brief",
    },
    {
      n: "02",
      title: "Source & screen, autonomously",
      copy: "Agents search across 50M+ profiles, our talent network, and your ATS. Outreach, screening, and ranking happen in parallel.",
      icon: "search",
    },
    {
      n: "03",
      title: "Hire with conviction",
      copy: "A vetted shortlist with reasoning, signals, and interview kits. You meet the right five — not the available five hundred.",
      icon: "hire",
    },
  ];

  return (
    <section id="how">
      <div className="container">
        <SectionHeader
          eyebrow="How it works"
          title={<>From requisition to offer<br/><span className="h-serif-italic" style={{ color: "var(--fg-3)" }}>in days, not quarters.</span></>}
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
          marginTop: 64,
        }} className="how-grid">
          {steps.map((s, i) => (
            <StepCard key={s.n} step={s} index={i} />
          ))}
        </div>
        <style>{`
          @media (max-width: 920px) {
            .how-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

const StepCard = ({ step, index }) => {
  return (
    <div className="card reveal" style={{ padding: 28, minHeight: 320, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: "rgba(var(--accent-glow), 0.08)",
          border: "1px solid rgba(var(--accent-glow), 0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--accent)",
        }}>
          <StepIcon kind={step.icon}/>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)", letterSpacing: "0.1em" }}>{step.n}</span>
      </div>
      <h3 className="h-display" style={{ fontSize: 24, margin: "8px 0 0 0" }}>{step.title}</h3>
      <p className="muted" style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, textWrap: "pretty" }}>{step.copy}</p>
      {/* Mini visualization per step */}
      <div style={{ marginTop: "auto", paddingTop: 20 }}>
        <StepVisual kind={step.icon} />
      </div>
    </div>
  );
};

const StepIcon = ({ kind }) => {
  if (kind === "brief") return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="4" y="3" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M7 8h8M7 11h8M7 14h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
  if (kind === "search") return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M14.5 14.5L18 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="10" cy="10" r="2" fill="currentColor"/>
    </svg>
  );
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L11 15.4l-4.8 2.5.9-5.4L3.2 8.7l5.4-.8L11 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  );
};

const StepVisual = ({ kind }) => {
  if (kind === "brief") {
    return (
      <div style={{ background: "rgba(var(--ink), 0.03)", border: "1px solid var(--border)", borderRadius: 10, padding: 12, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-2)", lineHeight: 1.7 }}>
        <div><span style={{ color: "var(--fg-3)" }}>role:</span> Senior Backend Engineer</div>
        <div><span style={{ color: "var(--fg-3)" }}>signals:</span> <span style={{ color: "var(--accent)" }}>Go</span> · <span style={{ color: "var(--accent)" }}>distributed sys</span> · scale</div>
        <div><span style={{ color: "var(--fg-3)" }}>band:</span> $210k–$260k</div>
        <div style={{ display: "inline-flex", marginTop: 4, gap: 4, alignItems: "center", color: "var(--accent)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px rgba(var(--accent-glow),0.7)" }}/>
          parsed in 2.1s
        </div>
      </div>
    );
  }
  if (kind === "search") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4 }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const isHit = [3, 7, 12, 18, 21].includes(i);
          return (
            <div key={i} style={{
              aspectRatio: "1",
              borderRadius: 4,
              background: isHit ? "var(--accent)" : "rgba(var(--ink), 0.08)",
              boxShadow: isHit ? "0 0 8px rgba(var(--accent-glow),0.6)" : "none",
              animation: isHit ? `pulseHit 2s ${i*0.1}s infinite` : "none",
            }}/>
          );
        })}
        <style>{`
          @keyframes pulseHit { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        `}</style>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {[
        { code: "C-0481", score: 0.97 },
        { code: "C-0317", score: 0.94 },
        { code: "C-0226", score: 0.91 },
      ].map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 8, background: "rgba(var(--ink), 0.03)", border: "1px solid var(--border)" }}>
          <span style={{ fontSize: 12, color: "var(--fg)", fontFamily: "var(--font-mono)" }}>{c.code}</span>
          <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{c.score.toFixed(3)}</span>
        </div>
      ))}
    </div>
  );
};

const SectionHeader = ({ eyebrow, title, subtitle, align = "center" }) => (
  <div style={{ textAlign: align, display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start", gap: 18 }}>
    <span className="eyebrow">{eyebrow}</span>
    <h2 className="h-display" style={{ fontSize: "clamp(36px, 5vw, 60px)", margin: 0, maxWidth: 880 }}>{title}</h2>
    {subtitle && <p className="muted" style={{ fontSize: 17, maxWidth: 580, margin: 0, textWrap: "pretty" }}>{subtitle}</p>}
  </div>
);

window.HowItWorks = HowItWorks;
window.SectionHeader = SectionHeader;
