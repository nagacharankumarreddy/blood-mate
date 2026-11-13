import { Link } from "react-router-dom";
import { BLOOD_GROUPS } from "../api";
import HeroDrop from "../components/HeroDrop";
import { Reveal, tilt, useCountUp } from "../motion";

const STEPS = [
  { title: "Register", text: "Add your name, blood group, city and phone number. It takes under a minute." },
  { title: "Get found", text: "People who need blood search by group and location and see matching donors." },
  { title: "Save a life", text: "They call you directly. One donation can help up to three people." },
];

const donorCount = (count) => `${count} ${count === 1 ? "donor" : "donors"}`;

const Home = ({ donors, status }) => {
  const cities = new Set(donors.map((donor) => donor.location?.trim().toLowerCase()).filter(Boolean)).size;
  const groups = new Set(donors.map((donor) => donor.bloodGroup)).size;
  const ready = status === "ready";
  const donorTotal = useCountUp(donors.length, ready);
  const cityTotal = useCountUp(cities, ready);
  const groupTotal = useCountUp(groups, ready);

  // The 3D scene leans toward the pointer anywhere over the hero.
  const onHeroMove = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--px", ((event.clientX - box.left) / box.width - 0.5).toFixed(3));
    event.currentTarget.style.setProperty("--py", ((event.clientY - box.top) / box.height - 0.5).toFixed(3));
  };

  return (
    <>
      <section className="hero" onPointerMove={onHeroMove}>
        <div className="hero-inner">
          <HeroDrop />
          <div className="hero-copy">
          <p className="eyebrow">Blood donor network</p>
          <h1>
            Find a blood donor near you, <span>fast.</span>
          </h1>
          <p className="hero-lead">
            BloodMate connects people who need blood with volunteer donors in their city. Search by blood group and
            call a donor directly.
          </p>
          <div className="hero-actions">
            <Link to="/donors" className="btn btn-primary">
              Find donors
            </Link>
            <Link to="/register" className="btn btn-outline">
              Become a donor
            </Link>
          </div>

          <dl className="stats" aria-live="polite">
            <div>
              <dt>Registered donors</dt>
              <dd>{ready ? donorTotal : "—"}</dd>
            </div>
            <div>
              <dt>Cities covered</dt>
              <dd>{ready ? cityTotal : "—"}</dd>
            </div>
            <div>
              <dt>Blood groups available</dt>
              <dd>{ready ? `${groupTotal} of ${BLOOD_GROUPS.length}` : "—"}</dd>
            </div>
          </dl>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>How it works</h2>
        <ol className="steps">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 110} className="tilt" {...tilt}>
              <span className="step-number" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section">
        <h2>Search by blood group</h2>
        <div className="group-grid">
          {BLOOD_GROUPS.map((group, i) => (
            <Reveal key={group} delay={i * 50}>
            <Link to={`/donors?group=${encodeURIComponent(group)}`} className="group-tile tilt" {...tilt}>
              <strong>{group}</strong>
              <span>{ready ? donorCount(donors.filter((donor) => donor.bloodGroup === group).length) : "View donors"}</span>
            </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
