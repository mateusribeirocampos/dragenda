import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

console.log("API_URL", API_URL);

const api = axios.create({
  baseURL: "http://192.168.3.7:3001",
});

export default api;