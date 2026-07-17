import axios from "axios";

const API = "https://localhost:7131/api";

function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
}

export interface Visit {
  id: number;
  fecha: string;
  observaciones: string;

  clientId: number;
  workerId: number;

  cliente: string;
  trabajador: string;
}

export async function getVisits() {
  const response = await axios.get<Visit[]>(
    `${API}/Visits`,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
}

export async function createVisit(visit: any) {
  const response = await axios.post(
    `${API}/Visits`,
    visit,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
}

export async function updateVisit(
  id: number,
  visit: any
) {
  await axios.put(
    `${API}/Visits/${id}`,
    visit,
    {
      headers: getHeaders(),
    }
  );
}

export async function deleteVisit(id: number) {
  await axios.delete(
    `${API}/Visits/${id}`,
    {
      headers: getHeaders(),
    }
  );
}