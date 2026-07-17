import axios from "axios";

const API = "https://localhost:7131/api";

function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
}

export interface Service {
  id: number;
  nombre: string;
  descripcion: string;
  precioPorHora: number;
  activo: boolean;
  createdAt: string;
}

export async function getServices() {
  const response = await axios.get<Service[]>(
    `${API}/Services`,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
}

export async function createService(service: any) {
  const response = await axios.post(
    `${API}/Services`,
    service,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
}

export async function updateService(
  id: number,
  service: any
) {
  await axios.put(
    `${API}/Services/${id}`,
    service,
    {
      headers: getHeaders(),
    }
  );
}

export async function deleteService(id: number) {
  await axios.delete(
    `${API}/Services/${id}`,
    {
      headers: getHeaders(),
    }
  );
}