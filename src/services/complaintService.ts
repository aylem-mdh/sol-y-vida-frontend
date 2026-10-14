import api from "./api";

export interface Complaint {
  id: number;
  category: string;
  subject: string;
  description: string;
  status: string;
  createdByUserId?: number;
  resolutionNotes?: string;
  createdAt: string;
  resolvedAt?: string;
  messages: ComplaintMessage[];
}

export interface ComplaintMessage {
  id: number;
  sentByUserId?: number;
  sentByRole: string;
  sentByName: string;
  message: string;
  createdAt: string;
}

export interface CreateComplaintPayload {
  category: string;
  subject: string;
  description: string;
}

export interface ResolveComplaintPayload {
  status: string;
  resolutionNotes: string;
}

export interface AddComplaintMessagePayload {
  message: string;
}

export async function getComplaints() {
  const response = await api.get<Complaint[]>("/Complaints");
  return response.data;
}

export async function createComplaint(payload: CreateComplaintPayload) {
  const response = await api.post<Complaint>("/Complaints", payload);
  return response.data;
}

export async function resolveComplaint(id: number, payload: ResolveComplaintPayload) {
  await api.put(`/Complaints/${id}/status`, payload);
}

export async function addComplaintMessage(id: number, payload: AddComplaintMessagePayload) {
  const response = await api.post<ComplaintMessage>(`/Complaints/${id}/messages`, payload);
  return response.data;
}
