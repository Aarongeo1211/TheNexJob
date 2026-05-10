/* ThenexJob — logo explorations */

const Frame = ({ children, bg = "var(--bg)" }) => (
  <div style={{
    width: "100%", height: "100%",
    background: bg,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#F4F4F6",
    fontFamily: "var(--font-display)",
  }}>
    {children}
  </div>
);

const Wordmark = ({ children, size = 36, color = "#F4F4F6", weight = 500 }) => (
  <span style={{
    fontFamily: "var(--font-display)",
    fontWeight: weight,
    letterSpacing: "-0.025em",
    fontSize: size,
    color,
  }}>{children}</span>
);

/* ─── Mark variants ────────────────────────────────────────── */

// 1. Concentric pulse + arrow tick (default)
const M_PulseArrow = ({ size = 96, accent = "#8B6CFF", accent2 = "#5B3DFF" }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
    <defs>
      <linearGradient id="m1g" x1="0" x2="96" y1="96" y2="0">
        <stop offset="0" stopColor={accent2}/>
        <stop offset="1" stopColor={accent}/>
      </linearGradient>
    </defs>
    <path d="M14 48a34 34 0 0 1 68 0" stroke="url(#m1g)" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.35"/>
    <path d="M28 48a20 20 0 0 1 40 0" stroke="url(#m1g)" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.7"/>
    <circle cx="48" cy="48" r="7" fill="url(#m1g)"/>
    <path d="M64 32l16 16-16 16" stroke="url(#m1g)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

// 2. Node network forming an N
const M_NodeN = ({ size = 96, accent = "#8B6CFF", accent2 = "#5B3DFF" }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
    <defs>
      <linearGradient id="m2g" x1="0" x2="96" y1="0" y2="96">
        <stop offset="0" stopColor={accent}/>
        <stop offset="1" stopColor={accent2}/>
      </linearGradient>
    </defs>
    {/* The N path */}
    <path d="M22 74V22l52 52V22" stroke="url(#m2g)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
    {/* Node dots at the corners */}
    {[[22,22],[22,74],[74,22],[74,74],[48,48]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="5" fill="url(#m2g)"/>
    ))}
    {/* Inner connections */}
    <line x1="22" y1="22" x2="74" y2="74" stroke="url(#m2g)" strokeWidth="3" opacity="0.7"/>
  </svg>
);

// 3. Forward chevron — three motion lines
const M_Chevron = ({ size = 96, accent = "#8B6CFF", accent2 = "#5B3DFF" }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
    <defs>
      <linearGradient id="m3g" x1="0" x2="96" y1="48" y2="48">
        <stop offset="0" stopColor={accent2} stopOpacity="0.3"/>
        <stop offset="1" stopColor={accent}/>
      </linearGradient>
    </defs>
    <path d="M16 28l24 20-24 20" stroke="url(#m3g)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
    <path d="M40 28l24 20-24 20" stroke="url(#m3g)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
    <path d="M64 28l16 20-16 20" stroke="url(#m3g)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

// 4. Möbius / loop — infinite matching
const M_Loop = ({ size = 96, accent = "#8B6CFF", accent2 = "#5B3DFF" }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
    <defs>
      <linearGradient id="m4g" x1="0" x2="96" y1="48" y2="48">
        <stop offset="0" stopColor={accent}/>
        <stop offset="1" stopColor={accent2}/>
      </linearGradient>
    </defs>
    <path d="M16 48c0-12 8-20 20-20s16 12 28 20 20 12 20 0-8-20-20-20-16 12-28 20-20 12-20 0z" stroke="url(#m4g)" strokeWidth="5" fill="none" strokeLinecap="round"/>
    <circle cx="48" cy="48" r="4" fill="url(#m4g)"/>
  </svg>
);

// 5. Diamond constellation — 4 nodes and a center hub
const M_Constellation = ({ size = 96, accent = "#8B6CFF", accent2 = "#5B3DFF" }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
    <defs>
      <linearGradient id="m5g" x1="0" x2="96" y1="0" y2="96">
        <stop offset="0" stopColor={accent}/>
        <stop offset="1" stopColor={accent2}/>
      </linearGradient>
    </defs>
    <path d="M48 12L84 48L48 84L12 48Z" stroke="url(#m5g)" strokeWidth="3" fill="none" opacity="0.35" strokeLinejoin="round"/>
    {[[48,12],[84,48],[48,84],[12,48]].map(([x,y],i)=>(
      <g key={i}>
        <line x1={x} y1={y} x2="48" y2="48" stroke="url(#m5g)" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        <circle cx={x} cy={y} r="6" fill="url(#m5g)"/>
      </g>
    ))}
    <circle cx="48" cy="48" r="9" fill="var(--bg)" stroke="url(#m5g)" strokeWidth="3"/>
  </svg>
);

// 6. Soundwave / signal — vertical bars escalating
const M_Signal = ({ size = 96, accent = "#8B6CFF", accent2 = "#5B3DFF" }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
    <defs>
      <linearGradient id="m6g" x1="0" x2="96" y1="96" y2="0">
        <stop offset="0" stopColor={accent2}/>
        <stop offset="1" stopColor={accent}/>
      </linearGradient>
    </defs>
    {[
      { x: 16, h: 24 },
      { x: 32, h: 44 },
      { x: 48, h: 64 },
      { x: 64, h: 44 },
      { x: 80, h: 28 },
    ].map((b,i)=>(
      <rect key={i} x={b.x - 4} y={48 - b.h/2} width="8" height={b.h} rx="4" fill="url(#m6g)" opacity={0.45 + i*0.12}/>
    ))}
  </svg>
);

/* ─── Lockups ────────────────────────────────────────── */

const Lockup = ({ Mark, label, size = 64, gap = 16, fontSize = 32, accent, accent2 }) => (
  <div style={{ display: "flex", alignItems: "center", gap }}>
    <Mark size={size} accent={accent} accent2={accent2}/>
    <Wordmark size={fontSize}>thenex<span style={{ color: "#7B7B85" }}>·</span>job</Wordmark>
  </div>
);

const StackedLockup = ({ Mark, size = 96, fontSize = 28, accent, accent2 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
    <Mark size={size} accent={accent} accent2={accent2}/>
    <Wordmark size={fontSize}>thenex<span style={{ color: "#7B7B85" }}>·</span>job</Wordmark>
  </div>
);

/* ─── Per-artboard scenes ────────────────────────────────────────── */

const PrimaryScene = ({ Mark, name, accent = "#8B6CFF", accent2 = "#5B3DFF" }) => (
  <Frame>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
      <Lockup Mark={Mark} size={80} fontSize={44} accent={accent} accent2={accent2}/>
      <div style={{ display: "flex", gap: 32, alignItems: "center", opacity: 0.7 }}>
        <Mark size={40} accent={accent} accent2={accent2}/>
        <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.12)" }}/>
        <Wordmark size={20} color="#B7B7C0">thenex<span style={{ color: "#5A5A60" }}>·</span>job</Wordmark>
      </div>
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "#7B7B85",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
      }}>{name}</span>
    </div>
  </Frame>
);

const FullBleedScene = ({ Mark, name, accent = "#8B6CFF", accent2 = "#5B3DFF" }) => (
  <div style={{
    width: "100%", height: "100%",
    background: `radial-gradient(700px 400px at 50% 50%, ${accent}33, transparent 70%), #08080A`,
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24,
    color: "#F4F4F6",
    position: "relative",
    overflow: "hidden",
  }}>
    {/* grid */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
      maskImage: "radial-gradient(ellipse 70% 50% at 50% 50%, black 30%, transparent 80%)",
    }}/>
    <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
      <Mark size={140} accent={accent} accent2={accent2}/>
      <Wordmark size={36}>thenex<span style={{ color: "#7B7B85" }}>·</span>job</Wordmark>
      <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 18, color: "#B7B7C0" }}>
        Recruitment, reimagined.
      </span>
    </div>
  </div>
);

const SystemScene = ({ Mark, accent = "#8B6CFF", accent2 = "#5B3DFF" }) => (
  <Frame>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, padding: 40 }}>
      {/* Mark + scale */}
      <div style={{ gridColumn: "span 3", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 32, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Mark size={96} accent={accent} accent2={accent2}/>
        <Mark size={64} accent={accent} accent2={accent2}/>
        <Mark size={40} accent={accent} accent2={accent2}/>
        <Mark size={24} accent={accent} accent2={accent2}/>
        <Mark size={16} accent={accent} accent2={accent2}/>
      </div>
      {/* Light */}
      <div style={{
        background: "#F4F4F6", borderRadius: 14, padding: 24,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Mark size={32} accent={accent} accent2={accent2}/>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: "#0A0A0A", letterSpacing: "-0.02em" }}>
            thenex<span style={{ color: "#9A9AA0" }}>·</span>job
          </span>
        </div>
      </div>
      {/* Dark */}
      <div style={{
        background: "#0F0F12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 24,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Mark size={32} accent={accent} accent2={accent2}/>
          <Wordmark size={18}>thenex<span style={{ color: "#7B7B85" }}>·</span>job</Wordmark>
        </div>
      </div>
      {/* Mono */}
      <div style={{
        background: "linear-gradient(135deg," + accent + "," + accent2 + ")",
        borderRadius: 14, padding: 24,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="32" height="32" viewBox="0 0 96 96" fill="none">
            <Mark size={32} accent="#FFFFFF" accent2="#FFFFFF"/>
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
            thenex<span style={{ opacity: 0.7 }}>·</span>job
          </span>
        </div>
      </div>
      {/* Stacked */}
      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <StackedLockup Mark={Mark} size={56} fontSize={18} accent={accent} accent2={accent2}/>
      </div>
      {/* App icon */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 96, height: 96, borderRadius: 22,
          background: "linear-gradient(135deg," + accent + "," + accent2 + ")",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 40px ${accent}55`,
        }}>
          <Mark size={56} accent="#FFFFFF" accent2="#FFFFFF"/>
        </div>
      </div>
      {/* Favicon row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
        {[40, 24, 16].map(s => (
          <div key={s} style={{ width: s, height: s, borderRadius: s * 0.22, background: "linear-gradient(135deg," + accent + "," + accent2 + ")", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Mark size={s * 0.65} accent="#FFFFFF" accent2="#FFFFFF"/>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

const MARKS = [
  { id: "pulse",     Mark: M_PulseArrow,    name: "Pulse · forward",  primary: true },
  { id: "node",      Mark: M_NodeN,         name: "Node · N graph" },
  { id: "chevron",   Mark: M_Chevron,       name: "Chevron · motion" },
  { id: "loop",      Mark: M_Loop,          name: "Loop · infinite" },
  { id: "constell",  Mark: M_Constellation, name: "Constellation"  },
  { id: "signal",    Mark: M_Signal,        name: "Signal · waveform" },
];

const App = () => {
  return (
    <DesignCanvas>
      <DCSection id="primary" title="Primary lockup" subtitle="Mark + wordmark, side by side">
        {MARKS.map(m => (
          <DCArtboard key={m.id} id={m.id} label={m.name} width={520} height={360}>
            <PrimaryScene Mark={m.Mark} name={m.name}/>
          </DCArtboard>
        ))}
      </DCSection>

      <DCSection id="hero" title="Brand hero" subtitle="Full-bleed treatment with tagline">
        {MARKS.map(m => (
          <DCArtboard key={m.id} id={m.id} label={m.name} width={520} height={360}>
            <FullBleedScene Mark={m.Mark} name={m.name}/>
          </DCArtboard>
        ))}
      </DCSection>

      <DCSection id="system" title="System exploration" subtitle="Recommended primary mark · scale, dark/light/mono, app icon, favicon">
        <DCArtboard id="pulse-system" label="Pulse · system overview" width={760} height={520}>
          <SystemScene Mark={M_PulseArrow}/>
        </DCArtboard>
        <DCArtboard id="node-system" label="Node · system overview" width={760} height={520}>
          <SystemScene Mark={M_NodeN}/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
