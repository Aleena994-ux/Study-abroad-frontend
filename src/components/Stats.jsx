const STATS = [
  { num: "300+", label: "Doctors Educated" },
  { num: "25", label: "Years Of Expertise" },
  { num: "4", label: "Campus Offices" },
  { num: "Free", label: "Hostel Support" },
];

export default function Stats() {
  return (
    <div className="stats">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
