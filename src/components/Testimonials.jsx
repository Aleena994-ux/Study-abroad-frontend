const REVIEWS = [
  {
    initials: "A K",
    name: "Aisha K.",
    role: "Verified student",
    quote:
      "The team explained every step before asking me to decide anything. I always knew what was happening with my application.",
  },
  {
    initials: "R M",
    name: "Rohan M.",
    role: "Verified student",
    quote:
      "Clear timelines and honest advice about which university actually fit my budget and grades.",
  },
  {
    initials: "S T",
    name: "Sara T.",
    role: "Verified student",
    quote:
      "Visa paperwork felt overwhelming until they broke it into a simple checklist. Smooth process end to end.",
  },
  {
    initials: "D P",
    name: "Devan P.",
    role: "Verified student",
    quote:
      "Hostel support after landing made the first week abroad far less stressful than I expected.",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="eyebrow">Student Success Stories</div>
        <div className="rating-line">
          <span className="rating-num">4.9</span>
          <span className="stars">★★★★★</span>
        </div>
        <p style={{ color: "var(--slate)" }}>Based on verified student reviews</p>
        <div className="t-grid">
          {REVIEWS.map((r) => (
            <div className="t-card" key={r.name}>
              <div className="t-head">
                <div className="t-avatar">{r.initials}</div>
                <div>
                  <div className="t-name">{r.name}</div>
                  <div className="t-role">{r.role}</div>
                </div>
              </div>
              <p className="t-quote">{r.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
