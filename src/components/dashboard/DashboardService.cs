import axios from "axios";

const API = "https://localhost:7131/api";

function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
}

export interface DashboardData {
  clientes: number;
  trabajadores: number;
  visitasHoy: number;
  valoracionMedia: number;
}

export async function getDashboard() {
  const response = await axios.get<DashboardData>(
    `${API}/Dashboard`,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
}