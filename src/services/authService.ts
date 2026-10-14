import api from "./api";

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresAt: string;
  role: string;
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("tokenExpiresAt");
}

export function isSessionExpired() {
  const expiresAt = localStorage.getItem("tokenExpiresAt");
  if (!expiresAt) return false;
  const expiresAtMs = Date.parse(expiresAt);
  return Number.isFinite(expiresAtMs) && expiresAtMs <= Date.now();
}

export function getStoredRole() {
  return localStorage.getItem("role");
}

export function hasSession() {
  return Boolean(localStorage.getItem("token") && localStorage.getItem("role")) && !isSessionExpired();
}

export async function login(dto: LoginDto) {
  const response = await api.post("/Auth/login", dto);

  const payload = response.data;

  return {
    token: payload.token ?? payload.Token,
    tokenType: payload.tokenType ?? "Bearer",
    expiresAt: payload.expiresAt,
    role: payload.role,
  } as LoginResponse;
}

export async function activateAccount(token: string, password: string) {
  const response = await api.post("/Auth/activate", { token, password });
  return response.data;
}

export async function forgotPassword(email: string) {
  const response = await api.post<{ message: string; resetToken?: string }>("/Auth/forgot-password", { email });
  return response.data;
}

export async function resetPassword(token: string, newPassword: string) {
  const response = await api.post("/Auth/reset-password", { token, newPassword });
  return response.data;
}