// A glossy 3D blood drop with a heartbeat line. Small drops and blood-group chips float
// at different depths, so the whole scene shifts in parallax as the pointer moves over the hero.
const CHIPS = [
  { label: "O+", className: "float-chip chip-a" },
  { label: "A-", className: "float-chip chip-b" },
  { label: "AB+", className: "float-chip chip-c" },
];

const HeroDrop = () => (
  <div className="drop-scene" aria-hidden="true">
    <div className="drop-tilt">
      <div className="drop-rings">
        <span />
        <span />
        <span />
      </div>

      <div className="drop-float">
        <svg className="drop-main" viewBox="0 0 300 380">
          <defs>
            <radialGradient id="drop-body" cx="36%" cy="38%" r="75%">
              <stop offset="0" stopColor="#ff7b7b" />
              <stop offset="0.38" stopColor="#d81b2a" />
              <stop offset="0.78" stopColor="#99101b" />
              <stop offset="1" stopColor="#5c070f" />
            </radialGradient>
            <radialGradient id="drop-shine" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="drop-rim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#ffb3b3" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <path id="drop-shape" d="M150 14 C150 14 44 150 44 236 a106 106 0 0 0 212 0 C256 150 150 14 150 14Z" fill="url(#drop-body)" />
          <path d="M150 14 C150 14 44 150 44 236 a106 106 0 0 0 212 0 C256 150 150 14 150 14Z" fill="url(#drop-rim)" />
          <ellipse cx="108" cy="190" rx="26" ry="50" fill="url(#drop-shine)" transform="rotate(18 108 190)" />
          <circle cx="126" cy="118" r="9" fill="#fff" opacity="0.5" />
          <path className="drop-beat" d="M70 246 H112 L126 214 L146 284 L164 226 L176 246 H230" pathLength="100" />
        </svg>
      </div>

      <span className="mini-drop mini-a" />
      <span className="mini-drop mini-b" />
      <span className="mini-drop mini-c" />
      {CHIPS.map((chip) => (
        <span key={chip.label} className={chip.className}>
          {chip.label}
        </span>
      ))}
    </div>
    <div className="drop-shadow" />
  </div>
);

export default HeroDrop;
