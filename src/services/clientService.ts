import api from "./api";

export interface Client {
  id: number;
  userId?: number;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  dni: string;
  numeroSeguridadSocial: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  homeLatitude?: number | null;
  homeLongitude?: number | null;
  telefono: string;
  email: string;
  activo: boolean;
  assignedWorkerId?: number | null;
  hasPortalAccess: boolean;
  portalAccessStatus: "none" | "pending" | "active" | "disabled";
  notificationsEnabled: boolean;
  preferredContact: string;
}

export interface ClientAccountActionResult {
  client: Client;
  message: string;
  activationToken?: string;
  passwordResetToken?: string;
  invitationDeliveryStatus?: "sent" | "notConfigured" | "failed";
  homeLocationConfigured?: boolean;
  homeLocationWarningCode?: string | null;
}

export interface CreateClientPayload {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  dni: string;
  numeroSeguridadSocial: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  telefono: string;
  email: string;
  assignedWorkerId?: number | null;
  createPortalAccess?: boolean;
}

export interface UpdateClientPayload {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  dni: string;
  numeroSeguridadSocial: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  telefono: string;
  email: string;
  assignedWorkerId?: number | null;
  notificationsEnabled?: boolean;
  preferredContact?: string;
  portalNotes?: string;
}

type RawClient = Partial<Client> & {
  Id?: number;
  idCliente?: number;
  IdCliente?: number;
  clientId?: number;
  ClientId?: number;
};

function normalizeClient(raw: RawClient): Client {
  const rawId = raw.id ?? raw.Id ?? raw.idCliente ?? raw.IdCliente ?? raw.clientId ?? raw.ClientId;

  return {
    id: Number(rawId),
    userId: raw.userId === undefined || raw.userId === null ? undefined : Number(raw.userId),
    nombre: String(raw.nombre ?? ""),
    apellidos: String(raw.apellidos ?? ""),
    fechaNacimiento: String(raw.fechaNacimiento ?? ""),
    dni: String(raw.dni ?? ""),
    numeroSeguridadSocial: String(raw.numeroSeguridadSocial ?? ""),
    direccion: String(raw.direccion ?? ""),
    ciudad: String(raw.ciudad ?? ""),
    codigoPostal: String(raw.codigoPostal ?? ""),
    homeLatitude: raw.homeLatitude === undefined || raw.homeLatitude === null ? null : Number(raw.homeLatitude),
    homeLongitude: raw.homeLongitude === undefined || raw.homeLongitude === null ? null : Number(raw.homeLongitude),
    telefono: String(raw.telefono ?? ""),
    email: String(raw.email ?? ""),
    activo: Boolean(raw.activo),
    assignedWorkerId:
      raw.assignedWorkerId === null || raw.assignedWorkerId === undefined
        ? null
        : Number(raw.assignedWorkerId),
    hasPortalAccess: Boolean(raw.hasPortalAccess),
    portalAccessStatus: (raw.portalAccessStatus as Client["portalAccessStatus"]) ?? "none",
    notificationsEnabled: raw.notificationsEnabled === undefined ? true : Boolean(raw.notificationsEnabled),
    preferredContact: String(raw.preferredContact ?? "Telefono"),
  };
}

export async function getClients() {
  const response = await api.get<RawClient[]>("/Clients");

  return response.data.map(normalizeClient);
}

export async function getClientById(id: number): Promise<Client> {
  const response = await api.get<RawClient>(`/Clients/${id}`);

  return normalizeClient(response.data);
}

export async function createClient(client: CreateClientPayload) {
  const response = await api.post<ClientAccountActionResult>("/Clients", client);

  return response.data;
}

export async function updateClient(id: number, client: UpdateClientPayload) {
  const response = await api.put(`/Clients/${id}`, client);

  return response.data;
}

export async function deleteClient(id: number) {
  const response = await api.delete(`/Clients/${id}`);

  return response.data;
}

export async function createClientPortalAccess(id: number) {
  const response = await api.post<ClientAccountActionResult>(`/Clients/${id}/portal-access`);
  return response.data;
}

export async function resendClientInvitation(id: number) {
  const response = await api.post<ClientAccountActionResult>(`/Clients/${id}/portal-access/resend`);
  return response.data;
}

export async function resetClientAccess(id: number) {
  const response = await api.post<ClientAccountActionResult>(`/Clients/${id}/portal-access/reset`);
  return response.data;
}

export async function deactivateClientAccess(id: number) {
  const response = await api.post<ClientAccountActionResult>(`/Clients/${id}/portal-access/deactivate`);
  return response.data;
}