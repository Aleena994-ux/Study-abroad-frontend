const DESTINATIONS = [
  { name: "Egypt", tag: "Africa · NMC Approved" },
  { name: "Georgia", tag: "Europe · NMC Approved" },
  { name: "Armenia", tag: "Europe · NMC Approved" },
  { name: "Bulgaria", tag: "Europe · NMC Approved" },
];

export default function Destinations() {
  return (
    <section className="container" id="destinations">
      <div className="eyebrow">Top Destinations</div>
      <h2>Four countries, one standard of care.</h2>
      <div className="dest-grid">
        {DESTINATIONS.map((d) => (
          <div className="dest-card" key={d.name}>
            <div className="dest-name">{d.name}</div>
            <div className="dest-tag">{d.tag}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
