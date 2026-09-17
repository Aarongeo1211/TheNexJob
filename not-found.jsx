const NotFound = () => (
  <>
    <Nav/>
    <main>
      <section style={{ paddingTop: 180, paddingBottom: 100, textAlign: "center" }}>
        <div className="container mount" style={{ "--i": 0 }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>404</span>
          <h1 className="h-display" style={{ fontSize: "clamp(40px, 7vw, 84px)", margin: "16px 0 14px" }}>
            Page not <span className="h-serif-italic" style={{ color: "color-mix(in oklab, var(--fg), var(--accent) 30%)" }}>found</span>.
          </h1>
          <p className="muted" style={{ fontSize: 17, maxWidth: 480, margin: "0 auto", lineHeight: 1.6, textWrap: "pretty" }}>
            The page you're looking for doesn't exist, or may have moved.
            Let's get you back on track.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 28, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/" className="btn btn-accent">
              Back to home
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="/#services" className="btn btn-ghost">See services</a>
          </div>
        </div>
      </section>
    </main>
    <Footer/>
  </>
);

ReactDOM.createRoot(document.getElementById("root")).render(<NotFound/>);
