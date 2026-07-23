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

export async function getClients() {
  const response = await api.get<Client[]>("/Clients");

  return response.data;
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