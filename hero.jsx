/* Hero — calm, premium headline + animated centerpiece (3 variants) */

const HeroCenterpiece = ({ variant = "pipeline" }) => {
  if (variant === "matching") return <MatchingViz />;
  if (variant === "morph")    return <MorphViz />;
  return <PipelineViz />;
};

/* Variant 1: Animated candidate pipeline — cards flow through stages */
const PipelineViz = () => {
  const stages = [
    { label: "Sourced", count: 12480 },
    { label: "Screened", count: 1240 },
    { label: "Matched", count: 86 },
    { label: "Hired", count: 12 },
  ];
  return (
    <div className="card" style={{
      padding: 28,
      borderRadius: 22,
      width: "100%",
      maxWidth: 720,
      position: "relative",
      backdropFilter: "blur(20px)",
    }}>
      {/* Top status row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span className="chip"><span className="dot"/> Live pipeline</span>
          <span style={{ fontSize: 12, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>req · senior-fullstack-114</span>
        </div>
        <span style={{ fontSize: 12, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>updated 2s ago</span>
      </div>

      {/* Stages */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, position: "relative" }}>
        {stages.map((s, i) => (
          <PipelineStage key={s.label} stage={s} index={i} />
        ))}
        {/* Connecting flow */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {[0,1,2].map(i => (
            <FlowDot key={i} startCol={i} endCol={i+1} delay={i * 0.6} />
          ))}
        </svg>
      </div>

      {/* Bottom — match scoring */}
      <div style={{ marginTop: 18, padding: 14, borderRadius: 14, background: "rgba(var(--ink), 0.03)", border: "1px solid var(--border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: "var(--fg-2)" }}>AI match · top candidate</span>
          <span style={{ fontSize: 12, color: "var(--accent)", fontFamily: "var(--font-mono)" }}>0.972</span>
        </div>
        <ProgressBar value={97.2} />
      </div>
    </div>
  );
};

const PipelineStage = ({ stage, index }) => {
  const [count, setCount] = React.useState(stage.count - Math.floor(Math.random() * 8));
  React.useEffect(() => {
    const t = setInterval(() => setCount(c => c + Math.floor(Math.random() * 3)), 1800 + index * 220);
    return () => clearInterval(t);
  }, [index]);
  return (
    <div style={{
      padding: "14px 12px",
      background: "rgba(var(--ink), 0.04)",
      border: "1px solid var(--border)",
      borderRadius: 14,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{stage.label}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 500, letterSpacing: "-0.02em", marginTop: 6, color: "var(--fg)" }}>
        {count.toLocaleString()}
      </div>
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: 2,
        background: `linear-gradient(90deg, transparent, var(--accent), transparent)`,
        opacity: 0.5,
        animation: `shimmer 2.6s ${index * 0.2}s infinite`,
      }}/>
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%);} 100% { transform: translateX(100%);} }
      `}</style>
    </div>
  );
};

const FlowDot = ({ startCol, endCol, delay }) => {
  // Visualize particles flowing between columns
  return (
    <>
      {[0,1,2].map(j => (
        <circle key={j} r="2.5" fill="var(--accent)" opacity="0.85"
          style={{
            filter: "drop-shadow(0 0 6px rgba(var(--accent-glow),0.8))",
          }}>
          <animate attributeName="cx" from={`${(startCol + 1) * 25 - 1}%`} to={`${(endCol) * 25 + 1}%`}
                   dur="2.4s" begin={`${delay + j * 0.8}s`} repeatCount="indefinite"/>
          <animate attributeName="cy" values="50%;52%;50%" dur="2.4s" begin={`${delay + j * 0.8}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0.9;0" dur="2.4s" begin={`${delay + j * 0.8}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </>
  );
};

const ProgressBar = ({ value }) => (
  <div style={{ height: 6, background: "rgba(var(--ink), 0.06)", borderRadius: 999, overflow: "hidden", position: "relative" }}>
    <div style={{
      height: "100%", width: `${value}%`,
      background: "linear-gradient(90deg, var(--accent-2), var(--accent))",
      borderRadius: 999,
      boxShadow: "0 0 12px rgba(var(--accent-glow), 0.6)",
      transition: "width 1.4s cubic-bezier(.2,.8,.2,1)",
    }}/>
  </div>
);

/* Variant 2: AI matching — node graph connecting candidate to role */
const MatchingViz = () => {
  return (
    <div className="card" style={{ padding: 28, borderRadius: 22, width: "100%", maxWidth: 720, height: 360 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
        <span className="chip"><span className="dot"/> Vector match · live</span>
        <span style={{ fontSize: 12, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>50.2M candidates indexed</span>
      </div>
      <svg viewBox="0 0 600 260" style={{ width: "100%", height: 260 }}>
        <defs>
          <radialGradient id="node-g" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="1"/>
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* Connections */}
        {[
          [80, 60, 320, 130], [80, 130, 320, 130], [80, 200, 320, 130],
          [80, 95, 320, 130], [80, 165, 320, 130],
          [320, 130, 540, 130],
        ].map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="1" opacity="0.18">
            <animate attributeName="opacity" values="0.05;0.45;0.05" dur="3s" begin={`${i*0.3}s`} repeatCount="indefinite"/>
          </line>
        ))}
        {/* Candidate nodes */}
        {[60, 95, 130, 165, 200].map((y, i) => (
          <g key={i}>
            <circle cx="80" cy={y} r="14" fill="var(--surface-2)" stroke="var(--border-strong)" strokeWidth="1"/>
            <circle cx="80" cy={y} r="3.5" fill="var(--accent)" opacity={0.4 + i * 0.12}/>
          </g>
        ))}
        {/* Center AI core */}
        <circle cx="320" cy="130" r="60" fill="url(#node-g)" opacity="0.3"/>
        <circle cx="320" cy="130" r="32" fill="var(--surface-2)" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="320" y="128" textAnchor="middle" fontFamily="var(--font-display)" fontSize="11" fill="var(--fg-3)">AI</text>
        <text x="320" y="142" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent)">match</text>
        {/* Role */}
        <g>
          <rect x="490" y="105" width="100" height="50" rx="10" fill="var(--surface-2)" stroke="var(--border-strong)"/>
          <text x="540" y="125" textAnchor="middle" fontFamily="var(--font-display)" fontSize="11" fill="var(--fg)">Senior Eng</text>
          <text x="540" y="142" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent)">0.972</text>
        </g>
        {/* pulse */}
        <circle cx="320" cy="130" r="60" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5">
          <animate attributeName="r" from="32" to="80" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.5" to="0" dur="2.4s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>
  );
};

/* Variant 3: morph — candidates flowing into a hire badge */
const MorphViz = () => {
  return (
    <div className="card" style={{ padding: 28, borderRadius: 22, width: "100%", maxWidth: 720, height: 360, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <div style={{ position: "absolute", top: 18, left: 18, right: 18, display: "flex", justifyContent: "space-between" }}>
        <span className="chip"><span className="dot"/> Hire signal</span>
        <span style={{ fontSize: 12, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>signal · 0.94</span>
      </div>
      <svg viewBox="0 0 600 280" style={{ width: "100%", height: 280 }}>
        {/* Diagonal lines flowing in from left */}
        {Array.from({ length: 18 }).map((_, i) => {
          const y = 30 + i * 12;
          return (
            <line key={i} x1="40" y1={y} x2="280" y2="140" stroke="var(--accent)" strokeWidth="0.6" opacity="0">
              <animate attributeName="opacity" values="0;0.5;0" dur="3s" begin={`${i*0.12}s`} repeatCount="indefinite"/>
              <animate attributeName="x1" values="40;120;200" dur="3s" begin={`${i*0.12}s`} repeatCount="indefinite"/>
            </line>
          );
        })}
        {/* Center hire ring */}
        <circle cx="380" cy="140" r="80" fill="none" stroke="var(--border-strong)" strokeWidth="1"/>
        <circle cx="380" cy="140" r="62" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.6"/>
        <circle cx="380" cy="140" r="44" fill="var(--surface-2)" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="380" y="138" textAnchor="middle" fontFamily="var(--font-serif)" fontStyle="italic" fontSize="20" fill="var(--fg)">hired</text>
        <text x="380" y="156" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--fg-3)">in 6 days</text>
        {/* concentric rings pulse */}
        <circle cx="380" cy="140" r="44" fill="none" stroke="var(--accent)" strokeWidth="1">
          <animate attributeName="r" from="44" to="100" dur="2.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.6" to="0" dur="2.6s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>
  );
};

const Hero = ({ heroVariant }) => {
  return (
    <section style={{ paddingTop: 160, paddingBottom: 80 }}>
      <div className="grid-bg"/>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 26 }}>
          <span className="chip">
            <span className="dot"/>
            Two decades in recruiting · now AI-native
          </span>

          <h1 className="h-display" style={{
            fontSize: "clamp(42px, 7vw, 92px)",
            margin: 0,
            maxWidth: 1100,
          }}>
            Recruitment, <span className="h-serif-italic" style={{ color: "color-mix(in oklab, var(--fg), var(--accent) 30%)" }}>reimagined</span><br/>
            for the <span className="text-glow">AI-native</span> team.
          </h1>

          <p className="muted" style={{
            fontSize: 18,
            maxWidth: 620,
            lineHeight: 1.55,
            margin: 0,
            textWrap: "pretty",
          }}>
            ThenexJob sources, screens, and shortlists world-class candidates in hours — not weeks. Built by a team with 20+ years of placements behind us, powered by an AI platform built for what's next.
          </p>

          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <a href="mailto:contact@thenexjob.com?subject=ThenexJob%20demo%20request" className="btn btn-accent">
              Book a demo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#how" className="btn btn-ghost">See how it works</a>
          </div>

          <div style={{ marginTop: 56, width: "100%", display: "flex", justifyContent: "center" }}>
            <HeroCenterpiece variant={heroVariant} />
          </div>
        </div>
      </div>
    </section>
  );
};

window.Hero = Hero;
