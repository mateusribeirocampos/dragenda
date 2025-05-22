import axios from "axios";

const token = localStorage.getItem("sessionToken");
if(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001"
});

export default api;