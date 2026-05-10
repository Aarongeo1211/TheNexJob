/* ThenexJob logo — abstract motion mark + wordmark */
const Logo = ({ size = 28, showWord = true, variant = "default" }) => {
  const accent = "var(--accent)";
  const accent2 = "var(--accent-2)";
  return (
    <a href="#" className="logo" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <LogoMark size={size} variant={variant} />
      {showWord && (
        <span style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          fontSize: Math.round(size * 0.62),
          color: "var(--fg)",
        }}>
          thenex<span style={{ color: "var(--fg-3)" }}>·</span>job
        </span>
      )}
    </a>
  );
};

/* Concentric arc / pulse mark — the primary brand */
const LogoMark = ({ size = 28, variant = "default" }) => {
  const s = size;
  if (variant === "monogram") {
    return (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="lm-g1" x1="0" x2="32" y1="0" y2="32">
            <stop offset="0" stopColor="var(--accent)"/>
            <stop offset="1" stopColor="var(--accent-2)"/>
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="30" height="30" rx="8" fill="url(#lm-g1)"/>
        <path d="M9 22V10l8 8V10h6v12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    );
  }
  // Default: animated concentric arcs forming a forward pulse
  return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="lm-grad" x1="0" x2="32" y1="32" y2="0">
          <stop offset="0" stopColor="var(--accent-2)"/>
          <stop offset="1" stopColor="var(--accent)"/>
        </linearGradient>
      </defs>
      {/* outer arc */}
      <path d="M4 16a12 12 0 0 1 24 0" stroke="url(#lm-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.35"/>
      {/* mid arc */}
      <path d="M9 16a7 7 0 0 1 14 0" stroke="url(#lm-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.7"/>
      {/* core dot */}
      <circle cx="16" cy="16" r="2.4" fill="url(#lm-grad)"/>
      {/* forward arrow tick */}
      <path d="M22 11l5 5-5 5" stroke="url(#lm-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
};

window.Logo = Logo;
window.LogoMark = LogoMark;
