import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to requests
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("teethmocure_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("teethmocure_token");
      localStorage.removeItem("teethmocure_user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default client;
