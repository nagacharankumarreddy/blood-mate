import React, { useState } from "react";
import { highlightMatch } from "../components/highlightMatch";
import "./Donors.css";

const Donors = ({ donors }) => {
  const [searchText, setSearchText] = useState("");

  const filteredDonors = Array.isArray(donors)
    ? searchText.trim() === ""
      ? donors
      : donors.filter((donor) => {
          const searchWords = searchText
            .toLowerCase()
            .split(" ")
            .filter(Boolean);
          const { bloodGroup = "", location = "", name = "" } = donor;
          const donorFields = [bloodGroup, location, name]
            .join(" ")
            .toLowerCase();

          return searchWords.some((word) => donorFields.includes(word));
        })
    : [];

  return (
    <div className="donors-container">
      <h2>Available Donors</h2>

      <input
        type="text"
        placeholder="Search by blood type or location"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
      />

      <ul className="donor-list">
        {filteredDonors.map((donor, index) => (
          <li key={index} className="donor-card">
            <div className="donor-card-wrapper">
              <h3>{highlightMatch(donor.name, searchText)}</h3>
              <p>
                <strong>Blood Group:</strong>{" "}
                <span className="blood-badge">
                  {highlightMatch(donor.bloodGroup, searchText)}
                </span>
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {highlightMatch(donor.location, searchText)}
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Donors;
