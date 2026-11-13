import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { createDonor, fetchDonors } from "./api";
import Navbar from "./components/Navbar";
import ScrollingBanner from "./components/ScrollingBanner";
import Donors from "./pages/Donors";
import Home from "./pages/Home";
import RegisterDonor from "./pages/RegisterDonor";

function App() {
  const [donors, setDonors] = useState([]);
  // "loading" | "ready" | "error"
  const [status, setStatus] = useState("loading");
  const { pathname } = useLocation();

  const loadDonors = useCallback(async () => {
    setStatus("loading");
    try {
      setDonors(await fetchDonors());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadDonors();
  }, [loadDonors]);

  // Throws on failure so the form can show the server's messages.
  const registerDonor = async (donor) => {
    const saved = await createDonor(donor);
    setDonors((prev) => [saved, ...prev]);
    toast.success("You're registered as a donor. Thank you!");
  };

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="main">
        {/* The key restarts the entrance animation on every page change. */}
        <div key={pathname} className="route">
        <Routes>
          <Route path="/" element={<Home donors={donors} status={status} />} />
          <Route path="/donors" element={<Donors donors={donors} status={status} onRetry={loadDonors} />} />
          <Route path="/register" element={<RegisterDonor registerDonor={registerDonor} />} />
          <Route path="*" element={<Home donors={donors} status={status} />} />
        </Routes>
        </div>
      </main>
      <ScrollingBanner />
      <ToastContainer position="top-right" autoClose={3500} limit={2} />
    </div>
  );
}

export default App;
