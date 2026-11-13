import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BLOOD_GROUPS } from "../api";
import { highlightMatch } from "../components/highlightMatch";
import { tilt } from "../motion";

const Skeletons = () => (
  <ul className="donor-grid" aria-hidden="true">
    {Array.from({ length: 6 }, (_, i) => (
      <li key={i} className="donor-card skeleton">
        <span className="bone bone-badge" />
        <span className="bone" />
        <span className="bone bone-short" />
      </li>
    ))}
  </ul>
);

const Donors = ({ donors, status, onRetry }) => {
  const [params, setParams] = useSearchParams();
  const group = BLOOD_GROUPS.includes(params.get("group")) ? params.get("group") : "";
  const [searchText, setSearchText] = useState("");
  const [slow, setSlow] = useState(false);

  // The backend sleeps when idle; explain the wait instead of looking broken.
  useEffect(() => {
    if (status !== "loading") return setSlow(false);
    const timer = setTimeout(() => setSlow(true), 4000);
    return () => clearTimeout(timer);
  }, [status]);

  const setGroup = (next) => setParams(next ? { group: next } : {}, { replace: true });

  // Every word typed must match the donor's name or location.
  const words = searchText.toLowerCase().split(/\s+/).filter(Boolean);
  const visible = donors.filter((donor) => {
    if (group && donor.bloodGroup !== group) return false;
    const haystack = `${donor.name || ""} ${donor.location || ""}`.toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
  const filtering = Boolean(group || words.length);

  return (
    <section className="section page">
      <header className="page-head">
        <h1>Find donors</h1>
        <p>Pick a blood group, then narrow down by city or name.</p>
      </header>

      <div className="filters">
        <div className="chips" role="group" aria-label="Blood group">
          <button type="button" className={`chip ${group === "" ? "chip-active" : ""}`} aria-pressed={group === ""} onClick={() => setGroup("")}>
            All
          </button>
          {BLOOD_GROUPS.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip ${group === item ? "chip-active" : ""}`}
              aria-pressed={group === item}
              onClick={() => setGroup(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <input
          type="search"
          className="input search"
          aria-label="Search by city or name"
          placeholder="Search by city or name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {status === "loading" && (
        <>
          <p className="result-line" role="status">
            {slow ? "Waking up the server. The first load can take up to a minute…" : "Loading donors…"}
          </p>
          <Skeletons />
        </>
      )}

      {status === "error" && (
        <div className="notice" role="alert">
          <strong>Couldn't load donors</strong>
          <p>The server didn't respond. Check your connection and try again.</p>
          <button type="button" className="btn btn-primary" onClick={onRetry}>
            Try again
          </button>
        </div>
      )}

      {status === "ready" && (
        <>
          <p className="result-line" role="status">
            {visible.length} {visible.length === 1 ? "donor" : "donors"}
            {group && ` with ${group}`}
            {words.length > 0 && ` matching “${searchText.trim()}”`}
          </p>

          {visible.length === 0 ? (
            <div className="notice">
              <strong>{filtering ? "No donors match this search" : "No donors yet"}</strong>
              <p>{filtering ? "Try another blood group or a nearby city." : "Be the first to register."}</p>
              {filtering ? (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setGroup("");
                    setSearchText("");
                  }}
                >
                  Clear filters
                </button>
              ) : (
                <Link to="/register" className="btn btn-primary">
                  Become a donor
                </Link>
              )}
            </div>
          ) : (
            <ul className="donor-grid">
              {visible.map((donor, i) => (
                <li key={donor._id} className="donor-card tilt rise" style={{ "--i": Math.min(i, 12) }} {...tilt}>
                  <span className="blood-badge" aria-label={`Blood group ${donor.bloodGroup}`}>
                    {donor.bloodGroup}
                  </span>
                  <div className="donor-info">
                    <h2>{highlightMatch(donor.name || "", searchText.trim())}</h2>
                    <p>{highlightMatch(donor.location || "", searchText.trim())}</p>
                  </div>
                  <a href={`tel:${donor.mobile}`} className="btn btn-call" aria-label={`Call ${donor.name} on ${donor.mobile}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                    </svg>
                    {donor.mobile}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
};

export default Donors;
