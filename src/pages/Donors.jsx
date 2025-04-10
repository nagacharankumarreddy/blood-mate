import React, { useState } from "react";
import "./Donors.css";

const Donors = ({ donors }) => {
  const [searchText, setSearchText] = useState("");

  const filteredDonors = Array.isArray(donors)
    ? donors.filter(
        (donor) =>
          donor.name.toLowerCase().includes(searchText.toLowerCase()) ||
          donor.location.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <div className="donors-container">
      <h2>Available Donors</h2>

      <input
        type="text"
        placeholder="Search by name or location"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
      />

      <ul className="donor-list">
        {filteredDonors.map((donor, index) => (
          <li key={index} className="donor-card">
            <h3>{donor.name}</h3>
            <p>
              <strong>Blood Group:</strong>{" "}
              <span className="blood-badge">{donor.bloodGroup}</span>
            </p>
            <p>
              <strong>Location:</strong> {donor.location}
            </p>
            <p className="mobile-line">
              <strong>Mobile:</strong> {donor.mobile}
              <a
                href={`tel:${donor.mobile}`}
                className="call-icon"
                title="Call"
              >
                📞
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Donors;
