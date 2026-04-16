//Frontend\src\services\axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

instance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("user");   // clear invalid login
      window.location.href = "/login";   // force redirect
      setUser(null);
    }
    return Promise.reject(err);
  }
);

export default instance;