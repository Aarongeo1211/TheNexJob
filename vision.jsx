/* Vision & Experience — simple two-column bio section, ties into all services */

const CONNECTS = [
  { label: "Recruitment", note: "Placing the right people, not just filling roles." },
  { label: "Career Guidance", note: "The same eye for fit, turned toward individuals." },
  { label: "Sales Consulting", note: "Growth built on process, not pressure." },
  { label: "HR Advisory", note: "People-strategy that scales with the business." },
];

const Vision = () => {
  return (
    <section id="vision">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 56, alignItems: "start" }} className="vision-grid">
          <div className="reveal">
            <div className="card card-hover portrait-card" style={{
              aspectRatio: "4 / 5",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}>
              <img
                src="assets/anil.jpg"
                alt="Anil V Babu"
                style={{ width: "100%", flex: 1, objectFit: "cover", display: "block" }}
              />
              <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)" }}>
                <div className="h-display" style={{ fontSize: 20 }}>Anil V Babu</div>
                <div className="muted" style={{ fontSize: 13, marginTop: 3 }}>Founder, The Nex Job LLP</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <span className="eyebrow">Vision &amp; Experience</span>
            <h2 className="h-display" style={{ fontSize: "clamp(30px, 4vw, 46px)", margin: 0 }}>
              One person, <span className="h-serif-italic" style={{ color: "color-mix(in oklab, var(--fg), var(--accent) 30%)" }}>four lenses</span> on the same problem.
            </h2>
            <p className="muted" style={{ fontSize: 16.5, lineHeight: 1.65, margin: 0, maxWidth: 560, textWrap: "pretty" }}>
              Every service on this site comes from the same place — years spent close to
              hiring, sales, and people decisions, working directly with founders,
              candidates, and HR teams. Recruitment taught me what makes a placement stick.
              That understanding carries straight into career guidance, sales consulting,
              and HR advisory — different rooms, the same instinct for what actually works.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 24px", marginTop: 8 }} className="connects-grid">
              {CONNECTS.map((c) => (
                <div key={c.label} style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--fg)" }}>{c.label}</div>
                  <div className="muted" style={{ fontSize: 13, marginTop: 3, lineHeight: 1.5 }}>{c.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 820px) {
            .vision-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
            .connects-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

window.Vision = Vision;
