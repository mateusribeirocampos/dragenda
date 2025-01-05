<<<<<<< HEAD
import axios from "axios";

/*const API_URL = process.env.EXPO_PUBLIC_API_URL;

console.log("API_URL", API_URL);*/

const api = axios.create({
  baseURL: "http://192.168.3.7:3001",
=======
import { EXPO_PUBLIC_API_URL } from "@env";
import axios from "axios";

if(!EXPO_PUBLIC_API_URL) {
  alert("Error with URL API");
}

const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
>>>>>>> main
});

export default api;