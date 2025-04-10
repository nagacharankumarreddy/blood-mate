import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddDonor.css";

const AddDonor = ({ addDonor }) => {
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    location: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const { name, bloodGroup, location, mobile } = formData;

    if (!name.trim()) newErrors.name = "Name is required.";
    else if (name.trim().length < 2) newErrors.name = "Minimum 2 characters.";

    if (!bloodGroup) newErrors.bloodGroup = "Please select blood group.";

    if (!location.trim()) newErrors.location = "Location is required.";

    if (!mobile.trim()) newErrors.mobile = "Mobile number is required.";
    else if (!/^\d{10}$/.test(mobile))
      newErrors.mobile = "Must be exactly 10 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addDonor(formData, () => navigate("/donors"));
  };

  return (
    <div className="add-form-container">
      <h2>Add Donor</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        {errors.bloodGroup && <p className="error">{errors.bloodGroup}</p>}

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && <p className="error">{errors.location}</p>}

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
        />
        {errors.mobile && <p className="error">{errors.mobile}</p>}

        <button type="submit">Add Donor</button>
      </form>
    </div>
  );
};

export default AddDonor;
