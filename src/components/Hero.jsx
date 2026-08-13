export default function Hero() {
  return (
    <section className="hero">
      <div className="container" style={{ display: "flex", gap: 48, alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div className="hero-eyebrow">Study Abroad Admissions</div>
          <h1>
            Your seat at a top medical university is <em>closer than you think.</em>
          </h1>
          <p className="lede">
            Straightforward, student-first guidance to NMC-approved universities abroad —
            from shortlisting the right country to landing on campus.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#apply">
              Start Your Application
            </a>
            <a className="btn btn-ghost" href="#destinations">
              Explore Destinations
            </a>
          </div>
          <div className="hero-checks">
            <span>Free Consultation</span>
            <span>Dedicated Advisor</span>
            <span>4 Countries</span>
            <span>End-to-End Support</span>
          </div>
        </div>
        <div className="stamp" aria-hidden="true">
          <div className="stamp-inner">
            Est.
            <br />
            Admissions
            <br />
            Verified
          </div>
        </div>
      </div>
    </section>
  );
}
