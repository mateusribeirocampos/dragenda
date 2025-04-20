import { EXPO_PUBLIC_API_URL } from "@env";
import axios from "axios";

if(!EXPO_PUBLIC_API_URL) {
  alert("Error with URL API");
}

const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
});

export default api;