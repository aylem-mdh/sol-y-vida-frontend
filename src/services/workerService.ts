import api from "./api";

export interface Worker {
  id: number;
  nombre: string;
  apellidos: string;
  dni: string;
  telefono: string;
  email: string;
  especialidad: string;
}

export async function getWorkers() {
  const response = await api.get<Worker[]>("/Workers");

  return response.data;
}

export async function createWorker(worker: any) {
  const response = await api.post("/Workers", worker);

  return response.data;
}

export async function updateWorker(
  id: number,
  worker: any
) {
  await api.put(`/Workers/${id}`, worker);
}

export async function deleteWorker(id: number) {
  await api.delete(`/Workers/${id}`);
}