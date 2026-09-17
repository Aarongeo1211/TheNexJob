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
          {[
            { l: "Services", href: "#services" },
            { l: "Vision",   href: "#vision" },
            { l: "FAQ",      href: "#faq" },
            { l: "Contact",  href: "#contact" },
          ].map(item => (
            <a key={item.l} href={item.href} className="nav-link" style={{
              fontSize: 13.5, color: "var(--fg-2)", letterSpacing: "-0.005em",
              transition: "color 200ms",
            }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
               onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-2)"}>
              {item.l}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="nav-ctas">
          <a href="candidate" className="btn btn-ghost">Candidates</a>
          <a href="recruiter" className="btn btn-primary">Recruiters</a>
        </div>
        <a href="mailto:contact@thenexjob.com?subject=Let's%20talk" className="btn btn-primary nav-mobile-cta">
          Get in touch
        </a>
      </div>
      <style>{`
        .nav-mobile-cta { display: none; }
        @media (max-width: 820px) {
          .nav-links { display: none !important; }
          .nav-ctas { display: none !important; }
          .nav-mobile-cta { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
};

window.Nav = Nav;
