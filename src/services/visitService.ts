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
  startLatitude?: number;
  startLongitude?: number;
  endLatitude?: number;
  endLongitude?: number;
  careChecklistCompleted?: boolean;
  careNotes?: string;
  assistanceReport?: string;
  visibleToFamily?: boolean;
}

export interface StartVisitPayload {
  latitude: number;
  longitude: number;
}

export interface FinishVisitPayload {
  latitude: number;
  longitude: number;
  hygieneCompleted: boolean;
  medicationCompleted: boolean;
  nutritionCompleted: boolean;
  mobilityCompleted: boolean;
  assistanceReport: string;
  careNotes?: string;
  visibleToFamily: boolean;
}

export async function getVisits() {
  const response = await api.get<Visit[]>("/Visits");

  return response.data;
}

export async function createVisit(visit: any) {
  const response = await api.post("/Visits", visit);

  return response.data;
}

export async function updateVisit(
  id: number,
  visit: any
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