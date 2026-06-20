import axios from "axios";

console.log("VITE_URL =", import.meta.env.VITE_URL);
const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
});

export default api;

