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

export interface CreateWorkerWithAccountResult {
  worker: Worker;
  activationToken: string;
  activationLink?: string;
}

type RawCreateWorkerWithAccountResult = {
  worker?: Worker;
  Worker?: Worker;
  activationToken?: string;
  ActivationToken?: string;
  token?: string;
  activation_token?: string;
  activationLink?: string;
  ActivationLink?: string;
};

function normalizeCreateWorkerResult(raw: RawCreateWorkerWithAccountResult): CreateWorkerWithAccountResult {
  const worker = raw.worker ?? raw.Worker;
  const activationLink = raw.activationLink ?? raw.ActivationLink;
  const tokenFromResponse = raw.activationToken ?? raw.ActivationToken ?? raw.token ?? raw.activation_token;

  let activationToken = tokenFromResponse ?? "";

  if (!activationToken && activationLink) {
    try {
      const parsed = new URL(activationLink, window.location.origin);
      activationToken = parsed.searchParams.get("token") ?? "";
    } catch {
      activationToken = "";
    }
  }

  if (!worker || !activationToken) {
    throw new Error("Respuesta invalida al crear trabajadora.");
  }

  return {
    worker,
    activationToken,
    activationLink,
  };
}

export async function getWorkers() {
  const response = await api.get<Worker[]>("/Workers");

  return response.data;
}

export async function createWorker(worker: any) {
  const response = await api.post<RawCreateWorkerWithAccountResult>("/Workers", worker);

  return normalizeCreateWorkerResult(response.data);
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