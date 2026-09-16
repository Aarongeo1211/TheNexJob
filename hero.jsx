/* Hero — calm, simple, no animated centerpiece */

const Hero = () => {
  return (
    <section style={{ paddingTop: 168, paddingBottom: 72 }}>
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
          <span className="chip mount" style={{ "--i": 0 }}>
            <span className="dot"/>
            Recruitment · Career Guidance · Sales Consulting · HR Advisory
          </span>

          <h1 className="h-display mount" style={{
            fontSize: "clamp(38px, 6vw, 72px)",
            margin: 0,
            maxWidth: 880,
            "--i": 1,
          }}>
            Helping people and businesses<br/>
            find their <span className="h-serif-italic" style={{ color: "color-mix(in oklab, var(--fg), var(--accent) 30%)" }}>next</span> right move.
          </h1>

          <p className="muted mount" style={{
            fontSize: 18,
            maxWidth: 620,
            lineHeight: 1.6,
            margin: 0,
            textWrap: "pretty",
            "--i": 2,
          }}>
            ThenexJob is Anil V Babu's practice — hands-on support across recruitment,
            career guidance, sales consulting, and HR advisory, built on years of
            experience across hiring and people strategy.
          </p>

          <div className="mount" style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap", justifyContent: "center", "--i": 3 }}>
            <a href="mailto:contact@thenexjob.com?subject=Let's%20talk" className="btn btn-accent">
              Get in touch
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#services" className="btn btn-ghost">See services</a>
          </div>

          <div className="mount" style={{ display: "flex", gap: 28, marginTop: 20, flexWrap: "wrap", justifyContent: "center", "--i": 4 }}>
            {[
              ["Recruitment", "Permanent & contract"],
              ["Career Guidance", "1:1, personalised"],
              ["Sales Consulting", "Process & pipeline"],
              ["HR Advisory", "Policy & strategy"],
            ].map(([t, s]) => (
              <div key={t} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--fg-2)" }}>{t}</div>
                <div style={{ fontSize: 11.5, color: "var(--fg-3)", marginTop: 2 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

window.Hero = Hero;
