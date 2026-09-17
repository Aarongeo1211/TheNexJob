/* The Nex Job — real brand mark (assets/logo-mark.png) + wordmark */
const Logo = ({ size = 28, showWord = true }) => {
  return (
    <a href="/" className="logo" style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
      <LogoMark size={size} />
      {showWord && (
        <span style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          fontSize: Math.round(size * 0.6),
          color: "var(--fg)",
        }}>
          The <span style={{ color: "var(--accent)" }}>Nex</span> Job
        </span>
      )}
    </a>
  );
};

/* Icon mark, cropped + chroma-keyed from the real logo (assets/logo-mark.png) */
const LogoMark = ({ size = 28 }) => (
  <img
    src="assets/logo-mark.png"
    alt="The Nex Job"
    width={Math.round(size * 0.94)}
    height={size}
    style={{ display: "block", objectFit: "contain" }}
  />
);

/* Full lockup — icon + wordmark + tagline, for footer / larger placements */
const LogoFull = ({ width = 220 }) => (
  <img
    src="assets/logo-full.png"
    alt="The Nex Job LLP — Connect. Hire. Grow."
    width={width}
    style={{ display: "block", width, height: "auto" }}
  />
);

window.Logo = Logo;
window.LogoMark = LogoMark;
window.LogoFull = LogoFull;
