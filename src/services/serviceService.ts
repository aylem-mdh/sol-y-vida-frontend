import api from "./api";

export interface Service {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  precioPorHora: number;
  duracionMinutos: number;
  frecuencia: string;
  assignedWorkerId?: number | null;
  assignedClientId?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  notes: string;
  activo: boolean;
  createdAt: string;
}

export type ServicePayload = Omit<Service, "id" | "createdAt">;
export type ServiceCatalogItem = Pick<Service, "id" | "nombre" | "descripcion" | "categoria" | "precioPorHora" | "duracionMinutos" | "frecuencia">;

export async function getServiceCatalog() {
  const response = await api.get<ServiceCatalogItem[]>("/Services/catalog");
  return response.data;
}

export async function getServices() {
  const response = await api.get<Service[]>("/Services");

  return response.data;
}

export async function createService(service: ServicePayload) {
  const response = await api.post("/Services", service);

  return response.data;
}

export async function updateService(
  id: number,
  service: ServicePayload
) {
  await api.put(`/Services/${id}`, service);
}

export async function deleteService(id: number) {
  await api.delete(`/Services/${id}`);
}