import axios from "axios";

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://blood-mate-backend.onrender.com",
  // The free backend host sleeps when idle and can take about a minute to wake up.
  timeout: 90000,
});

export const fetchDonors = async () => {
  const { data } = await api.get("/api/donors");
  return Array.isArray(data) ? data : [];
};

// Resolves with the saved donor. On failure, throws an Error whose `fields`
// maps form field names to messages when the server reported any.
export const createDonor = async (donor) => {
  try {
    const { data } = await api.post("/api/donors", donor);
    return data;
  } catch (err) {
    const body = err.response?.data;
    const error = new Error(
      body?.message || (err.response ? "Could not register. Please try again." : "Could not reach the server. Please try again.")
    );
    error.fields = body?.errors || {};
    throw error;
  }
};
