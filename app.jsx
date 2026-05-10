/* App shell + tweaks wiring */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#5B3DFF",
  "heroVariant": "pipeline",
  "theme": "light"
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  "#5B3DFF": { hex2: "#3617D9", glow: "91, 61, 255"   }, // Indigo
  "#0F8F5C": { hex2: "#0A6E47", glow: "15, 143, 92"   }, // Emerald
  "#E15526": { hex2: "#B23A14", glow: "225, 85, 38"   }, // Ember
  "#0EA5BE": { hex2: "#0A8499", glow: "14, 165, 190"  }, // Cyan
  "#C18A00": { hex2: "#8E6500", glow: "193, 138, 0"   }, // Amber
};
const ACCENT_OPTIONS = Object.keys(ACCENT_MAP);

const HERO_VARIANTS = [
  { value: "pipeline", label: "Pipeline" },
  { value: "matching", label: "Match" },
  { value: "morph",    label: "Signal" },
];

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const meta = ACCENT_MAP[tweaks.accent] || Object.values(ACCENT_MAP)[0];
    document.documentElement.style.setProperty("--accent", tweaks.accent);
    document.documentElement.style.setProperty("--accent-2", meta.hex2);
    document.documentElement.style.setProperty("--accent-glow", meta.glow);
  }, [tweaks.accent]);

  React.useEffect(() => {
    document.documentElement.dataset.theme = tweaks.theme || "light";
  }, [tweaks.theme]);

  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav/>
      <main>
        <Hero heroVariant={tweaks.heroVariant}/>
        <HowItWorks/>
        <Features/>
        <PipelineShowcase/>
        <CTA/>
        <FAQ/>
      </main>
      <Footer/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakRadio
            label="Mode"
            value={tweaks.theme}
            options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]}
            onChange={(v) => setTweak("theme", v)}
          />
        </TweakSection>
        <TweakSection label="Accent">
          <TweakColor
            label="Color"
            value={tweaks.accent}
            options={ACCENT_OPTIONS}
            onChange={(v) => setTweak("accent", v)}
          />
        </TweakSection>
        <TweakSection label="Hero">
          <TweakRadio
            label="Centerpiece"
            value={tweaks.heroVariant}
            options={HERO_VARIANTS}
            onChange={(v) => setTweak("heroVariant", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
