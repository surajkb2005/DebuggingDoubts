import axios from "./axiosInstance";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const fetchVideos = () => API.get("/videos");