import api from "./api";

export interface LoginDto {
  email: string;
  password: string;
}

export async function login(dto: LoginDto) {
  const response = await api.post("/Auth/login", dto);

  return response.data;
}