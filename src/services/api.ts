import axios from "axios";

const PROD_API_URL = "https://solyvida-api-c0akbkcac3fzc2fv.swedencentral-01.azurewebsites.net/api";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
if (import.meta.env.MODE === "staging" && !configuredApiUrl) {
  throw new Error("Staging requiere VITE_API_URL explícita.");
}
const API_URL = configuredApiUrl || (import.meta.env.DEV ? "https://localhost:7131/api" : PROD_API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function clearStoredSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("tokenExpiresAt");
}

function storedSessionExpired() {
  const expiresAt = localStorage.getItem("tokenExpiresAt");
  const expiresAtMs = expiresAt ? Date.parse(expiresAt) : NaN;
  return Number.isFinite(expiresAtMs) && expiresAtMs <= Date.now();
}

api.interceptors.request.use((config) => {
  if (storedSessionExpired()) {
    clearStoredSession();
  }
  const token = localStorage.getItem("token");
  const language = localStorage.getItem("language") ?? "es";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["X-UI-Language"] = language;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearStoredSession();
    }

    return Promise.reject(error);
  }
);

export default api;