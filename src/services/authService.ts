import api from "./api";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  nombre: string;
  email: string;
  password?: string;
  rol: "admin" | "worker" | "client" | "family";
}

export interface RegisterResponse {
  message: string;
  requiresActivation: boolean;
  activationToken?: string;
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
}

export function getStoredRole() {
  return localStorage.getItem("role");
}

export function hasSession() {
  return Boolean(localStorage.getItem("token") && localStorage.getItem("role"));
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

export async function register(dto: RegisterDto) {
  const response = await api.post<RegisterResponse>("/Auth/register", dto);
  return response.data;
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