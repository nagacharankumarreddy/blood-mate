import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>BloodMate</h2>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/donors">Donors</Link>
        <Link to="/add">Add Donor</Link>
      </div>
    </nav>
  );
};

export default Navbar;
