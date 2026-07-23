import api from "./api";

export interface MaintenanceTicket {
  id: number;
  clientId: number;
  cliente: string;
  area: string;
  description: string;
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
  status: string;
  technicalReport?: string;
  createdAt: string;
  closedAt?: string;
}

export interface CreateMaintenancePayload {
  clientId: number;
  area: string;
  description: string;
  beforePhotoUrl?: string;
}

export interface CloseMaintenancePayload {
  afterPhotoUrl?: string;
  technicalReport: string;
}

export async function getMaintenanceTickets() {
  const response = await api.get<MaintenanceTicket[]>("/Maintenance");
  return response.data;
}

export async function createMaintenanceTicket(payload: CreateMaintenancePayload) {
  const response = await api.post<MaintenanceTicket>("/Maintenance", payload);
  return response.data;
}

export async function closeMaintenanceTicket(id: number, payload: CloseMaintenancePayload) {
  await api.put(`/Maintenance/${id}/close`, payload);
}
