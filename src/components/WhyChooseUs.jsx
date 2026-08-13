const REASONS = [
  "25 years of trusted admissions experience",
  "2,500+ students placed across partner universities",
  "300+ doctors educated and licensed",
  "35+ partner universities across 4 countries",
  "Dedicated visa and hostel support team",
];

export default function WhyChooseUs() {
  return (
    <section className="container why-section">
      <div className="why">
        <div>
          <div className="eyebrow">Why Families Choose Us</div>
          <h2>A transparent process, from shortlist to seat.</h2>
          <p style={{ color: "var(--slate)", maxWidth: 420 }}>
            No hidden fees, no vague promises — every step of your admission is explained
            before you commit to it.
          </p>
        </div>
        <ul className="why-list">
          {REASONS.map((r) => (
            <li key={r}>
              <span className="mark">✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
