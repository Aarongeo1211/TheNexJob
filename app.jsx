/* App shell — simple, static (no runtime theme/accent tweaks) */

const App = () => {
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
        <Hero/>
        <Services/>
        <Vision/>
        <CTA/>
        <FAQ/>
      </main>
      <Footer/>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
