import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <h2>BloodMate</h2>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link
          to="/"
          className={
            location.pathname === "/" ? "nav-link active-link" : "nav-link"
          }
        >
          Home
        </Link>
        <Link
          to="/donors"
          className={
            location.pathname === "/donors"
              ? "nav-link active-link"
              : "nav-link"
          }
        >
          Donors
        </Link>
        <Link
          to="/register"
          className={
            location.pathname === "/register"
              ? "nav-link active-link"
              : "nav-link"
          }
        >
          Register As Donor
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
