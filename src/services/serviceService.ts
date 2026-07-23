import api from "./api";

export interface Service {
  id: number;
  nombre: string;
  descripcion: string;
  precioPorHora: number;
  activo: boolean;
  createdAt: string;
}

export async function getServices() {
  const response = await api.get<Service[]>("/Services");

  return response.data;
}

export async function createService(service: any) {
  const response = await api.post("/Services", service);

  return response.data;
}

export async function updateService(
  id: number,
  service: any
) {
  await api.put(`/Services/${id}`, service);
}

export async function deleteService(id: number) {
  await api.delete(`/Services/${id}`);
}