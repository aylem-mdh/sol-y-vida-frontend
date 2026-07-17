import axios from "axios";

const API = "https://localhost:7131/api";

function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
}

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
  const response = await axios.get<Worker[]>(
    `${API}/Workers`,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
}

export async function createWorker(worker: any) {
  const response = await axios.post(
    `${API}/Workers`,
    worker,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
}

export async function updateWorker(
  id: number,
  worker: any
) {
  await axios.put(
    `${API}/Workers/${id}`,
    worker,
    {
      headers: getHeaders(),
    }
  );
}

export async function deleteWorker(id: number) {
  await axios.delete(
    `${API}/Workers/${id}`,
    {
      headers: getHeaders(),
    }
  );
}