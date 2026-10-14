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

export type WorkerPayload = Omit<Worker, "id">;
export type WorkerProfilePayload = Pick<Worker, "nombre" | "apellidos" | "telefono">;

export async function getOwnWorkerProfile() {
  const response = await api.get<Worker>("/Workers/me");
  return response.data;
}

export async function updateOwnWorkerProfile(profile: WorkerProfilePayload) {
  const response = await api.put<Worker>("/Workers/me", profile);
  return response.data;
}

export interface CreateWorkerWithAccountResult {
  worker: Worker;
  activationToken?: string;
  activationLink?: string;
  requiresActivation?: boolean;
  message?: string;
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
  requiresActivation?: boolean;
  RequiresActivation?: boolean;
  message?: string;
  Message?: string;
};

function normalizeCreateWorkerResult(raw: RawCreateWorkerWithAccountResult): CreateWorkerWithAccountResult {
  const worker = raw.worker ?? raw.Worker;
  const activationLink = raw.activationLink ?? raw.ActivationLink;
  const tokenFromResponse = raw.activationToken ?? raw.ActivationToken ?? raw.token ?? raw.activation_token;

  let activationToken = tokenFromResponse ?? "";

  if (!activationToken && activationLink) {
    try {
      const parsed = new URL(activationLink, window.location.origin);
      activationToken = new URLSearchParams(parsed.hash.slice(1)).get("token")
        ?? parsed.searchParams.get("token") ?? "";
    } catch {
      activationToken = "";
    }
  }

  if (!worker) {
    throw new Error("Respuesta invalida al crear trabajadora.");
  }

  return {
    worker,
    activationToken: activationToken || undefined,
    activationLink,
    requiresActivation: raw.requiresActivation ?? raw.RequiresActivation,
    message: raw.message ?? raw.Message,
  };
}

export async function getWorkers() {
  const response = await api.get<Worker[]>("/Workers");

  return response.data;
}

export async function createWorker(worker: WorkerPayload) {
  const requestId = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  console.log("WORKER_CREATE_REQUEST", { requestId });

  const response = await api.post<RawCreateWorkerWithAccountResult>("/Workers", worker, {
    headers: {
      "X-Client-Request-Id": requestId,
    },
  });

  console.log("WORKER_CREATE_RESPONSE", { requestId, status: response.status });

  return normalizeCreateWorkerResult(response.data);
}

export async function updateWorker(
  id: number,
  worker: WorkerPayload
) {
  await api.put(`/Workers/${id}`, worker);
}

export async function deleteWorker(id: number) {
  await api.delete(`/Workers/${id}`);
}