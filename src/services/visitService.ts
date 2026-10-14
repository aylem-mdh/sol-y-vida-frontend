import api from "./api";

export interface Visit {
  id: number;
  fecha: string;
  observaciones: string;

  clientId: number;
  workerId: number;

  cliente: string;
  trabajador: string;

  estado?: string;
  startedAt?: string;
  endedAt?: string;
  startedByUserId?: number;
  endedByUserId?: number;
  startLatitude?: number;
  startLongitude?: number;
  endLatitude?: number;
  endLongitude?: number;
  careChecklistCompleted?: boolean;
  careNotes?: string;
  assistanceReport?: string;
  visibleToFamily?: boolean;
}

export interface VisitUpsertPayload {
  fecha: string;
  observaciones: string;
  clientId: number;
  workerId: number;
}

export interface StartVisitPayload {
  latitude: number;
  longitude: number;
}

export interface FinishVisitPayload {
  latitude: number;
  longitude: number;
  assistanceReport: string;
  careNotes?: string;
  visibleToFamily: boolean;
}

export async function getVisits() {
  const response = await api.get<Visit[]>("/Visits");

  return response.data;
}

export async function createVisit(visit: VisitUpsertPayload) {
  const response = await api.post("/Visits", visit);

  return response.data;
}

export async function updateVisit(
  id: number,
  visit: VisitUpsertPayload
) {
  await api.put(`/Visits/${id}`, visit);
}

export async function deleteVisit(id: number) {
  await api.delete(`/Visits/${id}`);
}

export async function startVisit(id: number, payload: StartVisitPayload) {
  const response = await api.post(`/Visits/${id}/start`, payload);
  return response.data;
}

export async function finishVisit(id: number, payload: FinishVisitPayload) {
  const response = await api.post(`/Visits/${id}/finish`, payload);
  return response.data;
}