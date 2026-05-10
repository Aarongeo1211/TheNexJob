/* AI Features showcase — bento-style grid with motion */

const Features = () => {
  return (
    <section id="features">
      <div className="container">
        <SectionHeader
          eyebrow="The platform"
          title={<>Every signal, in <span className="h-serif-italic" style={{ color: "color-mix(in oklab, var(--fg), var(--accent) 30%)" }}>one</span> intelligent layer.</>}
          subtitle="Sourcing, scoring, outreach, scheduling, and analytics — built around a single agentic graph of every candidate you've ever touched."
        />
        <div className="bento" style={{ marginTop: 64 }}>
          <FeatureCard
            span={2}
            title="Vector talent graph"
            desc="50M+ candidates, embedded with skills, projects, and trajectories. Search semantically — find people you'd never find with keywords."
            visual={<VectorGraphVisual/>}
            tall
          />
          <FeatureCard
            title="Agentic outreach"
            desc="Personalized first messages, follow-ups, and reschedules — drafted by an agent that knows your voice."
            visual={<OutreachVisual/>}
          />
          <FeatureCard
            title="Calibrated scoring"
            desc="Every candidate scored against your rubric, with reasoning trails you can audit, edit, and learn from."
            visual={<ScoreVisual/>}
          />
          <FeatureCard
            span={2}
            title="Live hiring intelligence"
            desc="Where do your best hires come from? What does your pipeline look like for the next quarter? Answers, not dashboards."
            visual={<IntelVisual/>}
          />
        </div>
        <style>{`
          .bento {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          .bento .feat-span-2 { grid-column: span 2; }
          @media (max-width: 920px) {
            .bento { grid-template-columns: 1fr !important; }
            .bento .feat-span-2 { grid-column: auto !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

const FeatureCard = ({ title, desc, visual, span = 1, tall = false }) => (
  <div className={`card reveal ${span === 2 ? "feat-span-2" : ""}`} style={{
    padding: 28,
    display: "flex", flexDirection: "column", gap: 16,
    minHeight: tall ? 460 : 360,
  }}>
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 0" }}>
      {visual}
    </div>
    <div>
      <h3 className="h-display" style={{ fontSize: 22, margin: "0 0 8px 0" }}>{title}</h3>
      <p className="muted" style={{ margin: 0, fontSize: 14, lineHeight: 1.55, textWrap: "pretty" }}>{desc}</p>
    </div>
  </div>
);

/* Visualization components */

const VectorGraphVisual = () => {
  const points = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) {
      arr.push({
        x: 50 + Math.random() * 500,
        y: 30 + Math.random() * 220,
        r: 2 + Math.random() * 2.5,
        delay: Math.random() * 4,
      });
    }
    return arr;
  }, []);

  return (
    <svg viewBox="0 0 600 280" style={{ width: "100%", maxHeight: 280 }}>
      <defs>
        <radialGradient id="vg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.5"/>
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* clusters */}
      <circle cx="170" cy="120" r="90" fill="url(#vg-glow)" opacity="0.4"/>
      <circle cx="430" cy="160" r="70" fill="url(#vg-glow)" opacity="0.3"/>
      {/* connections */}
      {points.slice(0, 40).map((p, i) => {
        const next = points[(i + 1) % points.length];
        const dist = Math.hypot(p.x - next.x, p.y - next.y);
        if (dist > 100) return null;
        return <line key={i} x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="var(--accent)" strokeWidth="0.5" opacity="0.15"/>;
      })}
      {/* points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="var(--accent)" opacity="0.65">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.5s" begin={`${p.delay}s`} repeatCount="indefinite"/>
        </circle>
      ))}
      {/* search query box */}
      <g transform="translate(380, 40)">
        <rect width="180" height="36" rx="18" fill="rgba(var(--ink), 0.05)" stroke="var(--border-strong)"/>
        <circle cx="20" cy="18" r="6" fill="none" stroke="var(--fg-3)" strokeWidth="1"/>
        <line x1="24" y1="22" x2="28" y2="26" stroke="var(--fg-3)" strokeWidth="1" strokeLinecap="round"/>
        <text x="38" y="22" fontFamily="var(--font-mono)" fontSize="11" fill="var(--fg-2)">"shipped infra at scale"</text>
      </g>
    </svg>
  );
};

const OutreachVisual = () => (
  <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
    {[
      { side: "agent", text: "Hi — your recent work on Postgres replication caught our eye…" },
      { side: "user", text: "Tell me about culture & comp." },
      { side: "agent", text: "Of course. Senior IC band, $240k base, async-first…", typing: false },
    ].map((m, i) => (
      <div key={i} style={{
        alignSelf: m.side === "agent" ? "flex-start" : "flex-end",
        maxWidth: "82%",
        padding: "9px 12px",
        borderRadius: m.side === "agent" ? "12px 12px 12px 4px" : "12px 12px 4px 12px",
        background: m.side === "agent" ? "rgba(var(--ink), 0.05)" : "rgba(var(--accent-glow), 0.18)",
        border: "1px solid var(--border)",
        fontSize: 12.5,
        color: m.side === "agent" ? "var(--fg-2)" : "var(--fg)",
        lineHeight: 1.5,
        animation: `slideIn 600ms ${i * 0.4}s both cubic-bezier(.2,.8,.2,1)`,
      }}>
        {m.text}
      </div>
    ))}
    <style>{`
      @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    `}</style>
  </div>
);

const ScoreVisual = () => {
  const factors = [
    { label: "Skill match", value: 0.94 },
    { label: "Seniority", value: 0.88 },
    { label: "Trajectory", value: 0.91 },
    { label: "Culture", value: 0.79 },
  ];
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
      {factors.map((f, i) => (
        <div key={f.label}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 4, fontFamily: "var(--font-mono)" }}>
            <span style={{ color: "var(--fg-3)" }}>{f.label}</span>
            <span style={{ color: "var(--accent)" }}>{f.value.toFixed(2)}</span>
          </div>
          <div style={{ height: 4, background: "rgba(var(--ink), 0.06)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${f.value * 100}%`,
              background: "linear-gradient(90deg, var(--accent-2), var(--accent))",
              borderRadius: 999,
              animation: `grow 1.4s ${i * 0.15}s both cubic-bezier(.2,.8,.2,1)`,
              transformOrigin: "left",
            }}/>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>
    </div>
  );
};

const IntelVisual = () => {
  const bars = [42, 64, 51, 78, 92, 71, 88, 96, 84];
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Q-on-Q hire velocity</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 500, letterSpacing: "-0.025em", marginTop: 4 }}>
            <span style={{ color: "var(--accent)" }}>+312%</span> <span style={{ color: "var(--fg-3)", fontSize: 14, fontWeight: 400 }}>vs. last year</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["7d","30d","90d"].map(t => (
            <span key={t} style={{ fontSize: 11, fontFamily: "var(--font-mono)", padding: "4px 8px", borderRadius: 6, background: t === "30d" ? "rgba(var(--accent-glow),0.15)" : "rgba(var(--ink), 0.04)", color: t === "30d" ? "var(--accent)" : "var(--fg-3)", border: "1px solid var(--border)" }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 110 }}>
        {bars.map((h, i) => (
          <div key={i} style={{
            flex: 1,
            height: `${h}%`,
            background: i === bars.length - 2 ? "linear-gradient(180deg, var(--accent), var(--accent-2))" : "rgba(var(--ink), 0.10)",
            borderRadius: "6px 6px 2px 2px",
            border: i === bars.length - 2 ? "1px solid rgba(var(--accent-glow),0.4)" : "1px solid var(--border)",
            boxShadow: i === bars.length - 2 ? "0 0 18px rgba(var(--accent-glow),0.35)" : "none",
            animation: `barGrow 900ms ${i * 0.08}s both cubic-bezier(.2,.8,.2,1)`,
            transformOrigin: "bottom",
          }}/>
        ))}
        <style>{`
          @keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        `}</style>
      </div>
    </div>
  );
};

window.Features = Features;
