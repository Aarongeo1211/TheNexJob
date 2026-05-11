/* CTA + FAQ + Footer */

const CTA = () => (
  <section id="cta" style={{ padding: "80px 0" }}>
    <div className="container">
      <div className="card" style={{
        padding: "72px 48px",
        textAlign: "center",
        borderRadius: 28,
        position: "relative",
        overflow: "hidden",
        background: `
          radial-gradient(900px 400px at 50% -50px, rgba(var(--accent-glow),0.18), transparent 70%),
          linear-gradient(180deg, rgba(var(--ink), 0.04), rgba(255,255,255,0.01))
        `,
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
          <PulseRings/>
        </div>
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <span className="eyebrow">Get started</span>
          <h2 className="h-display" style={{ fontSize: "clamp(36px, 5.5vw, 64px)", margin: 0, maxWidth: 820 }}>
            Hire your next ten<br/>
            <span className="h-serif-italic" style={{ color: "color-mix(in oklab, var(--fg), var(--accent) 30%)" }}>before the next quarter</span>.
          </h2>
          <p className="muted" style={{ fontSize: 17, maxWidth: 540, margin: 0, textWrap: "pretty" }}>
            See ThenexJob on a 30-minute call. We'll run a live search on a real role you're hiring for.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <a href="mailto:contact@thenexjob.com?subject=ThenexJob%20demo%20request" className="btn btn-accent">
              Book a demo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="tel:+919886226049" className="btn btn-ghost">Talk to us · +91 98862 26049</a>
          </div>
          <div style={{ display: "flex", gap: 18, marginTop: 8, fontSize: 12, color: "var(--fg-3)", flexWrap: "wrap", justifyContent: "center" }}>
            <span>· contact@thenexjob.com</span>
            <span>· Built by a team with two decades in recruiting</span>
            <span>· White-glove onboarding</span>
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
    { q: "What makes ThenexJob different from an ATS?", a: "ATSs store candidates. ThenexJob actively works the funnel — sourcing, scoring, scheduling, and re-engaging — like a senior recruiter on every requisition. We integrate with your ATS, not replace it." },
    { q: "How fast can we get value?", a: "Day one. We onboard a single role first; you'll see a calibrated shortlist within 24 hours. Most teams see their first hire within two weeks." },
    { q: "Do you respect bias controls and auditability?", a: "Yes. Every scoring trail is auditable, and we ship with bias-aware shortlisting calibrated by your hiring committee. No black boxes, no demographic shortcuts." },
    { q: "How does outreach not feel automated?", a: "Our agent personalizes from a candidate's actual work — repos, papers, talks — not their headline. It drafts, you approve, then it sends and follows up. Reply rates are 3–4× standard sequencing tools." },
    { q: "What's the pricing model?", a: "A platform fee per active requisition with no per-hire commission. Annual contracts include unlimited seats and ATS sync." },
    { q: "How do you handle our candidate data?", a: "Your data stays yours. We use it only to deliver shortlists for your roles — never to train shared models or sell on. We're a young team; we'd rather earn your trust than wave around a logo wall." },
  ];
  const [open, setOpen] = React.useState(0);

  return (
    <section id="faq">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64 }} className="faq-grid">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="h-display" style={{ fontSize: "clamp(32px, 4vw, 52px)", margin: "16px 0 12px 0" }}>
              Common <span className="h-serif-italic" style={{ color: "var(--fg-3)" }}>questions</span>.
            </h2>
            <p className="muted" style={{ margin: 0, fontSize: 16, maxWidth: 320, textWrap: "pretty" }}>
              Can't find what you need? <a href="mailto:contact@thenexjob.com" style={{ color: "var(--accent)", borderBottom: "1px solid currentColor" }}>Email us at contact@thenexjob.com</a>.
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
                  padding: "22px 4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "var(--fg)",
                  fontSize: 18,
                  letterSpacing: "-0.01em",
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  textAlign: "left",
                }}>
                  {it.q}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transition: "transform 300ms cubic-bezier(.2,.8,.2,1)", transform: open === i ? "rotate(45deg)" : "rotate(0)", color: "var(--fg-3)" }}>
                    <path d="M9 4v10M4 9h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </button>
                <div style={{
                  maxHeight: open === i ? 200 : 0,
                  opacity: open === i ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 400ms cubic-bezier(.2,.8,.2,1), opacity 300ms",
                }}>
                  <p style={{ color: "var(--fg-2)", fontSize: 15, lineHeight: 1.6, margin: "0 0 22px 0", maxWidth: 580, textWrap: "pretty" }}>{it.a}</p>
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
  <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 0 32px" }}>
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 360 }}>
          <Logo size={26}/>
          <p style={{ color: "var(--fg-3)", fontSize: 13.5, lineHeight: 1.6, marginTop: 16 }}>
            ThenexJob is the agentic recruiting platform — built by recruiters with 20+ years of placement experience, for AI-native teams.
          </p>
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 6, fontSize: 13.5 }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: 56 }} className="foot-cols">
          {[
            { t: "Platform", l: ["Sourcing", "Outreach", "Scoring", "Analytics"] },
            { t: "Company", l: ["About", "Careers", "Press", "Contact"] },
            { t: "Resources", l: ["Docs", "Changelog", "Customers", "Security"] },
            { t: "Legal", l: ["Privacy", "Terms", "DPA", "Cookies"] },
          ].map(c => (
            <div key={c.t}>
              <div style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>{c.t}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {c.l.map(x => <li key={x}><a href="#" style={{ fontSize: 13.5, color: "var(--fg-2)" }}>{x}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--border)", marginTop: 48, paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontSize: 12, color: "var(--fg-3)" }}>
        <span>© 2026 ThenexJob, Inc. All rights reserved.</span>
        <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
          <span className="dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px rgba(var(--accent-glow),0.6)" }}/>
          All systems operational
        </span>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .foot-cols { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  </footer>
);

window.CTA = CTA;
window.FAQ = FAQ;
window.Footer = Footer;
