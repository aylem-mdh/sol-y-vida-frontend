import api from "./api";

export interface Client {
  id: number;
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
  activo: boolean;
  assignedWorkerId?: number | null;
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
    nombre: String(raw.nombre ?? ""),
    apellidos: String(raw.apellidos ?? ""),
    fechaNacimiento: String(raw.fechaNacimiento ?? ""),
    dni: String(raw.dni ?? ""),
    numeroSeguridadSocial: String(raw.numeroSeguridadSocial ?? ""),
    direccion: String(raw.direccion ?? ""),
    ciudad: String(raw.ciudad ?? ""),
    codigoPostal: String(raw.codigoPostal ?? ""),
    telefono: String(raw.telefono ?? ""),
    email: String(raw.email ?? ""),
    activo: Boolean(raw.activo),
    assignedWorkerId:
      raw.assignedWorkerId === null || raw.assignedWorkerId === undefined
        ? null
        : Number(raw.assignedWorkerId),
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

export async function createClient(client: Omit<Client, "id" | "activo">) {
  const response = await api.post("/Clients", client);

  return response.data;
}

export async function updateClient(id: number, client: Omit<Client, "id" | "activo">) {
  const response = await api.put(`/Clients/${id}`, client);

  return response.data;
}

export async function deleteClient(id: number) {
  const response = await api.delete(`/Clients/${id}`);

  return response.data;
}