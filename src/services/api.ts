import axios from "axios";

const PROD_API_URL = "https://solyvida-api-c0akbkcac3fzc2fv.swedencentral-01.azurewebsites.net/api";

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "https://localhost:7131/api" : PROD_API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }

    return Promise.reject(error);
  }
);

export default api;