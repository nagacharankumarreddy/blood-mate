import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/donors", label: "Find donors" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the page changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="BloodMate home">
          <span className="brand-drop" aria-hidden="true" />
          BloodMate
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="nav-links" className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className="nav-link">
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/register" className="btn btn-light nav-cta">
            Become a donor
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
