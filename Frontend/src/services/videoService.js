import axios from "./axiosInstance";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export const fetchVideos = () => API.get("/videos");