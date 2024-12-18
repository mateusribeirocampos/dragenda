import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.3.7:3001",
});

export default api;