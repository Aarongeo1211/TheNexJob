/* Nav — slim, premium, sticky with scroll-aware backdrop */
const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "all 300ms cubic-bezier(.2,.8,.2,1)",
      padding: scrolled ? "10px 0" : "18px 0",
    }}>
      <div className="container" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 56,
        padding: scrolled ? "0 16px" : "0 24px",
        background: scrolled ? "color-mix(in oklab, var(--bg), transparent 30%)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
        border: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        borderRadius: 999,
        maxWidth: scrolled ? 980 : 1240,
        transition: "all 300ms cubic-bezier(.2,.8,.2,1)",
      }}>
        <Logo size={26} />
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }} className="nav-links">
          {["Platform", "How it works", "Customers", "Pricing"].map(l => (
            <a key={l} href="#" style={{
              fontSize: 13.5, color: "var(--fg-2)", letterSpacing: "-0.005em",
              transition: "color 200ms",
            }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
               onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-2)"}>
              {l}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a href="mailto:contact@thenexjob.com?subject=ThenexJob%20demo%20request" className="btn btn-primary">
            Book a demo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </header>
  );
};

window.Nav = Nav;
