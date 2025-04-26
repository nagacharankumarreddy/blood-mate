import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Donors from "./pages/Donors";
import Home from "./pages/Home";
import RegisterDonor from "./pages/RegisterDonor";

function App() {
  const [donors, setDonors] = useState([]);
  // AWS Backend URL
  // const apiBaseUrl = "http://13.61.24.214:5000";
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  console.log("API Base URL:", apiBaseUrl);
  const fetchDonors = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/api/donors`);
      setDonors(res.data);
    } catch (err) {
      console.error("Error fetching donors", err);
    }
  };

  useEffect(() => {
    fetchDonors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerDonor = async (donor, onSuccess) => {
    try {
      const res = await axios.post(`${apiBaseUrl}/api/donors`, donor);
      setDonors((prev) => [...prev, res.data]);
      toast.success("✅ Donor added successfully!");
      onSuccess();
    } catch (err) {
      console.error("Error adding donor", err);
    }
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<RegisterDonor registerDonor={registerDonor} />}
        />
        <Route path="/donors" element={<Donors donors={donors} />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} limit={1} />
    </>
  );
}

export default App;
