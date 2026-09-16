/* CTA + FAQ + Footer — simplified, no fake SaaS footer columns */

const CTA = () => (
  <section id="contact" style={{ padding: "72px 0" }}>
    <div className="container">
      <div className="card" style={{
        padding: "64px 40px",
        textAlign: "center",
        borderRadius: 28,
        position: "relative",
        overflow: "hidden",
        background: `
          radial-gradient(900px 400px at 50% -50px, rgba(var(--accent-glow),0.14), transparent 70%),
          linear-gradient(180deg, rgba(var(--ink), 0.04), rgba(255,255,255,0.01))
        `,
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
          <PulseRings/>
        </div>
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <span className="eyebrow">Get started</span>
          <h2 className="h-display" style={{ fontSize: "clamp(32px, 5vw, 52px)", margin: 0, maxWidth: 680 }}>
            Let's talk about what you need.
          </h2>
          <p className="muted" style={{ fontSize: 16.5, maxWidth: 480, margin: 0, textWrap: "pretty" }}>
            Hiring, a career decision, sales process, or HR strategy — reach out and
            we'll figure out the right starting point together.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="mailto:contact@thenexjob.com?subject=Let's%20talk" className="btn btn-accent">
              Email us
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="tel:+919886226049" className="btn btn-ghost">Call · +91 98862 26049</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PulseRings = () => (
  <svg viewBox="0 0 1200 400" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
    {[0, 1, 2, 3].map(i => (
      <circle key={i} cx="600" cy="200" r="80" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" from="40" to="500" dur="6s" begin={`${i * 1.5}s`} repeatCount="indefinite"/>
        <animate attributeName="opacity" from="0.4" to="0" dur="6s" begin={`${i * 1.5}s`} repeatCount="indefinite"/>
      </circle>
    ))}
  </svg>
);

const FAQ = () => {
  const items = [
    { q: "Do you work with individuals or companies?", a: "Both. Recruitment and HR advisory are typically company engagements; career guidance is usually one-on-one. Sales consulting works either way, depending on the size of the team." },
    { q: "How does an engagement usually start?", a: "With a conversation. Reach out by email or phone, and we'll talk through what you're trying to solve before agreeing on scope." },
    { q: "Which industries do you work with?", a: "No fixed list — the focus is on the person or problem, not a specific sector. If you're unsure whether it's a fit, just ask." },
    { q: "Is this a one-off engagement or ongoing support?", a: "Either. Some engagements are a single placement or session; others are ongoing advisory. We'll agree on the shape upfront." },
  ];
  const [open, setOpen] = React.useState(0);

  return (
    <section id="faq">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64 }} className="faq-grid">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="h-display" style={{ fontSize: "clamp(30px, 4vw, 46px)", margin: "16px 0 12px 0" }}>
              A few <span className="h-serif-italic" style={{ color: "var(--fg-3)" }}>questions</span>.
            </h2>
            <p className="muted" style={{ margin: 0, fontSize: 15.5, maxWidth: 320, textWrap: "pretty" }}>
              Anything else? <a href="mailto:contact@thenexjob.com" style={{ color: "var(--accent)", borderBottom: "1px solid currentColor" }}>Email contact@thenexjob.com</a>.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {items.map((it, i) => (
              <div key={i} style={{
                borderTop: "1px solid var(--border)",
                borderBottom: i === items.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  padding: "20px 4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "var(--fg)",
                  fontSize: 17,
                  letterSpacing: "-0.01em",
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  textAlign: "left",
                }}>
                  {it.q}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transition: "transform 300ms cubic-bezier(.2,.8,.2,1)", transform: open === i ? "rotate(45deg)" : "rotate(0)", color: "var(--fg-3)", flexShrink: 0 }}>
                    <path d="M9 4v10M4 9h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </button>
                <div style={{
                  maxHeight: open === i ? 200 : 0,
                  opacity: open === i ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 400ms cubic-bezier(.2,.8,.2,1), opacity 300ms",
                }}>
                  <p style={{ color: "var(--fg-2)", fontSize: 15, lineHeight: 1.6, margin: "0 0 20px 0", maxWidth: 560, textWrap: "pretty" }}>{it.a}</p>
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @media (max-width: 920px) {
              .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 0 28px" }}>
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }} className="foot-row">
        <div style={{ maxWidth: 380 }}>
          <Logo size={24}/>
          <p style={{ color: "var(--fg-3)", fontSize: 13.5, lineHeight: 1.6, marginTop: 14 }}>
            Recruitment, career guidance, sales consulting, and HR advisory — Anil Achachan's practice.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13.5 }}>
          <a href="mailto:contact@thenexjob.com" style={{ color: "var(--fg-2)", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1"/><path d="M2 4l5 4 5-4" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/></svg>
            contact@thenexjob.com
          </a>
          <a href="tel:+919886226049" style={{ color: "var(--fg-2)", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 2.5h2l1 3-1.5 1a7 7 0 0 0 3 3l1-1.5 3 1v2a1 1 0 0 1-1 1A9 9 0 0 1 2 3.5a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/></svg>
            +91 98862 26049
          </a>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--border)", marginTop: 32, paddingTop: 20, fontSize: 12, color: "var(--fg-3)" }}>
        © 2026 ThenexJob. All rights reserved.
      </div>
      <style>{`
        @media (max-width: 560px) {
          .foot-row { flex-direction: column; }
        }
      `}</style>
    </div>
  </footer>
);

window.CTA = CTA;
window.FAQ = FAQ;
window.Footer = Footer;
