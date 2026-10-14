import api from "./api";
import { formatDate, formatDateTime } from "./familyPortalPresentation";

export interface FamilyStatusItem {
  title: string;
  text: string;
}

export interface FamilyVisit {
  id: number;
  scheduledAt?: string;
  dayLabel?: string;
  hour?: string;
  professional: string;
  location: string;
  status: string;
  summary: string;
  relatedReportId?: number;
}

export interface FamilyMessage {
  id: number;
  sender: string;
  subject: string;
  body: string;
  sentAt: string;
  unread: boolean;
  category: "update" | "coordination" | "family";
}

export interface FamilyDocument {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
  category: string;
  fileName: string;
}

export interface FamilyReport {
  id: number;
  title: string;
  summary: string;
  createdAt: string;
  professional: string;
  status: string;
  details: string[];
}

export interface FamilyProfile {
  fullName: string;
  relation: string;
  email: string;
  phone: string;
  preferredContact: string;
  clientName: string;
  servicePlan: string;
  address: string;
  supportPhone: string;
  supportEmail: string;
  notes: string;
  notificationsEnabled: boolean;
}

export interface FamilyContactRequest {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface FamilyDashboardData {
  statusItems: FamilyStatusItem[];
  visits: FamilyVisit[];
  messages: FamilyMessage[];
  documents: FamilyDocument[];
  reports: FamilyReport[];
  profile: FamilyProfile;
}

interface FamilyMessageDraft {
  subject: string;
  body: string;
}

interface FamilyProfileUpdate {
  email: string;
  phone: string;
  preferredContact: string;
  notes: string;
  notificationsEnabled: boolean;
}

interface FamilyContactDraft {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface DownloadPayload {
  fileName: string;
  mimeType: string;
  content: string;
}

export async function getFamilyDashboardData() {
  const response = await api.get<FamilyDashboardData>("/FamilyPortal/dashboard");
  return response.data;
}

export async function getFamilyVisits() {
  const response = await api.get<FamilyVisit[]>("/FamilyPortal/visits");
  return response.data;
}

export async function getFamilyMessages() {
  const response = await api.get<FamilyMessage[]>("/FamilyPortal/messages");
  return response.data;
}

export async function getFamilyDocuments() {
  const response = await api.get<FamilyDocument[]>("/FamilyPortal/documents");
  return response.data;
}

export async function getFamilyReports() {
  const response = await api.get<FamilyReport[]>("/FamilyPortal/reports");
  return response.data;
}

export async function getFamilyProfile() {
  const response = await api.get<FamilyProfile>("/FamilyPortal/profile");
  return response.data;
}

export async function markFamilyMessageAsRead(id: number) {
  await api.post(`/FamilyPortal/messages/${id}/read`);
}

export async function sendFamilyMessage(draft: FamilyMessageDraft) {
  const response = await api.post<FamilyMessage>("/FamilyPortal/messages", draft);
  return response.data;
}

export async function submitFamilyContactRequest(draft: FamilyContactDraft) {
  const response = await api.post<FamilyContactRequest>("/FamilyPortal/contact-requests", draft);
  return response.data;
}

export async function updateFamilyProfile(update: FamilyProfileUpdate) {
  const response = await api.put<FamilyProfile>("/FamilyPortal/profile", update);
  return response.data;
}

export async function downloadFamilyDocument(id: number) {
  const response = await api.get<DownloadPayload>(`/FamilyPortal/documents/${id}/download`);
  return response.data;
}

export async function downloadFamilyReport(id: number) {
  const response = await api.get<DownloadPayload>(`/FamilyPortal/reports/${id}/download`);
  return response.data;
}

export function formatFamilyDate(value: string, language = "es") {
  return formatDate(value, language);
}

export function formatFamilyDateTime(value: string, language = "es") {
  return formatDateTime(value, language);
}

export function triggerFamilyDownload(payload: DownloadPayload) {
  const blob = new Blob([payload.content], { type: payload.mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = payload.fileName;
  link.click();

  URL.revokeObjectURL(url);
}
