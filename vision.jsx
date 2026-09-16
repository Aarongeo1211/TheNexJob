/* Vision & Experience — real bio, stats, and career highlights */

const STATS = [
  { value: "22+ Years", note: "Recruitment, Sales, BD & Corporate Relations" },
  { value: "3 Countries", note: "India · Ireland · Kuwait" },
  { value: "PAN-India", note: "Operations & CXO engagement" },
];

const HIGHLIGHTS = [
  { label: "Strategic Business Growth", note: "Scaling recruitment divisions, building client pipelines, and closing large enterprise mandates." },
  { label: "Corporate Partnership Development", note: "Deep, trust-driven relationships with senior hiring leaders and corporate decision-makers." },
  { label: "Team Leadership & Performance", note: "Managing national teams through structured planning, coaching, and execution excellence." },
  { label: "Revenue & Operations Ownership", note: "End-to-end BD lifecycle — prospecting, contracting, negotiation, delivery, and retention." },
  { label: "Brand & Outreach Strategy", note: "Strengthening visibility through digital branding, events, networks, and community engagement." },
];

const Vision = () => {
  return (
    <section id="vision">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 48, alignItems: "start" }} className="vision-grid">
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

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span className="eyebrow">Vision &amp; Experience</span>
            <h2 className="h-display" style={{ fontSize: "clamp(30px, 4vw, 46px)", margin: 0 }}>
              22+ years, <span className="h-serif-italic" style={{ color: "color-mix(in oklab, var(--fg), var(--accent) 30%)" }}>one throughline</span>.
            </h2>
            <p className="muted" style={{ fontSize: 16, lineHeight: 1.65, margin: 0, maxWidth: 560, textWrap: "pretty" }}>
              I'm humbled to have built a career across different sectors and geographies —
              India, Ireland, and Kuwait. Over 22+ years in recruitment, sales, business
              development, corporate relations, and administration, I've driven revenue
              growth, expanded corporate partnerships, and built high-performing teams
              across recruitment, technology, engineering, consulting, and education —
              setting up new business units and running PAN-India operations while
              engaging directly with CXO-level stakeholders.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 4 }} className="stat-row">
              {STATS.map((s) => (
                <div key={s.value} style={{ borderTop: "1px solid var(--border)", paddingTop: 10 }}>
                  <div className="h-display" style={{ fontSize: 19 }}>{s.value}</div>
                  <div className="muted" style={{ fontSize: 12, marginTop: 3, lineHeight: 1.4 }}>{s.note}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginTop: 8 }}>
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} style={{ borderTop: "1px solid var(--border)", padding: "14px 0" }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--fg)" }}>{h.label}</div>
                  <div className="muted" style={{ fontSize: 13.5, marginTop: 4, lineHeight: 1.55, textWrap: "pretty" }}>{h.note}</div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)" }}/>
            </div>

            <p className="dim" style={{ fontSize: 13, lineHeight: 1.6, margin: 0, maxWidth: 560, textWrap: "pretty" }}>
              Earlier experience across operations, HR services, and quality management
              adds further operational depth, execution discipline, and cross-functional
              expertise.
            </p>
          </div>
        </div>
        <style>{`
          @media (max-width: 820px) {
            .vision-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
          @media (max-width: 560px) {
            .stat-row { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

window.Vision = Vision;
