import api from "./api";

export interface Incident {
  id: number;
  visitId: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  nivelGravedad?: string;
  cliente: string;
  trabajador: string;
}

export interface IncidentPayload {
  visitId: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  nivelGravedad?: string;
}

export async function getIncidents() {
  const response = await api.get<Incident[]>("/Incidents");
  return response.data;
}

export async function createIncident(payload: IncidentPayload) {
  const response = await api.post<Incident>("/Incidents", payload);
  return response.data;
}

export async function updateIncident(id: number, payload: IncidentPayload) {
  await api.put(`/Incidents/${id}`, payload);
}

export async function deleteIncident(id: number) {
  await api.delete(`/Incidents/${id}`);
}