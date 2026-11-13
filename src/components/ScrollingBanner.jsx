const MESSAGE =
  "Help us save more lives. Share BloodMate with your friends so we can reach more donors.";

const ScrollingBanner = () => (
  <aside className="banner" aria-label="Share BloodMate">
    <p className="banner-text">
      <span>{MESSAGE}</span>
      <span aria-hidden="true">{MESSAGE}</span>
    </p>
  </aside>
);

export default ScrollingBanner;
