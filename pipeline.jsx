/* Pipeline showcase — large animated hero-style section */

const PipelineShowcase = () => {
  return (
    <section id="pipeline" style={{ padding: "80px 0 120px" }}>
      <div className="container">
        <div className="card" style={{
          padding: "64px 48px",
          borderRadius: 28,
          position: "relative",
          overflow: "hidden",
        }}>
          <div className="grid-bg" style={{ opacity: 0.5 }}/>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: 48,
            alignItems: "center",
            position: "relative",
          }} className="ps-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 480 }}>
              <span className="eyebrow">The pipeline</span>
              <h2 className="h-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: 0 }}>
                Watch your funnel <span className="h-serif-italic" style={{ color: "color-mix(in oklab, var(--fg), var(--accent) 30%)" }}>breathe</span>.
              </h2>
              <p className="muted" style={{ fontSize: 16, margin: 0, lineHeight: 1.55, textWrap: "pretty" }}>
                Real-time visibility from sourced to signed. Every requisition, every stage, every signal — at a glance, with no spreadsheets.
              </p>
              <div style={{ display: "flex", gap: 24, marginTop: 8 }}>
                <Stat label="Avg. time-to-shortlist" value="6 hrs" sub="↓ from 12 days"/>
                <Stat label="Hire conversion" value="3.4×" sub="vs. industry avg"/>
              </div>
            </div>
            <div>
              <FunnelViz/>
            </div>
          </div>
          <style>{`
            @media (max-width: 980px) {
              .ps-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value, sub }) => (
  <div>
    <div style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
    <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, letterSpacing: "-0.025em", marginTop: 4 }}>{value}</div>
    <div style={{ fontSize: 12, color: "var(--accent)", marginTop: 2 }}>{sub}</div>
  </div>
);

const FunnelViz = () => {
  const stages = [
    { name: "Sourced", count: 12480, w: 100 },
    { name: "Engaged", count: 4280, w: 78 },
    { name: "Screened", count: 1240, w: 56 },
    { name: "Interviewed", count: 240, w: 36 },
    { name: "Offer", count: 28, w: 18 },
    { name: "Hired", count: 12, w: 10 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, position: "relative" }}>
      {stages.map((s, i) => (
        <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 16, position: "relative" }}>
          <div style={{
            width: `${s.w}%`,
            marginLeft: `${(100 - s.w) / 2}%`,
            height: 42,
            borderRadius: 8,
            background: `linear-gradient(90deg, rgba(var(--accent-glow), ${0.15 + i * 0.08}), rgba(var(--accent-glow), ${0.25 + i * 0.1}))`,
            border: "1px solid rgba(var(--accent-glow), 0.25)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 14px",
            boxShadow: `0 0 ${20 + i * 6}px rgba(var(--accent-glow), ${0.05 + i * 0.04})`,
            position: "relative",
            overflow: "hidden",
            animation: `funnelIn 800ms ${i * 0.1}s both cubic-bezier(.2,.8,.2,1)`,
          }}>
            <span style={{ fontSize: 12, color: "var(--fg)", fontWeight: 500 }}>{s.name}</span>
            <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--fg-2)" }}>{s.count.toLocaleString()}</span>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              animation: `shimmerFunnel 3s ${i * 0.3}s infinite`,
              transform: "translateX(-100%)",
            }}/>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes funnelIn { from { opacity: 0; transform: translateY(8px) scaleX(0.9); } to { opacity: 1; transform: none; } }
        @keyframes shimmerFunnel { 0% { transform: translateX(-100%); } 60%, 100% { transform: translateX(200%); } }
      `}</style>
    </div>
  );
};

window.PipelineShowcase = PipelineShowcase;
