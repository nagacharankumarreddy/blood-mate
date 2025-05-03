import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">BloodMate</h2>
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link
            to="/"
            onClick={closeMenu}
            className={`nav-link ${
              location.pathname === "/" ? "active-link" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/donors"
            onClick={closeMenu}
            className={`nav-link ${
              location.pathname === "/donors" ? "active-link" : ""
            }`}
          >
            Donors
          </Link>
          <Link
            to="/register"
            onClick={closeMenu}
            className={`nav-link ${
              location.pathname === "/register" ? "active-link" : ""
            }`}
          >
            Register As Donor
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
