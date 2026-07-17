import axios from "axios";

const API = "https://localhost:7131/api";

function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function getClients() {
  const response = await axios.get(`${API}/Clients`, {
    headers: getHeaders(),
  });

  return response.data;
}

export async function createClient(client: any) {
  const response = await axios.post(`${API}/Clients`, client, {
    headers: getHeaders(),
  });

  return response.data;
}

export async function updateClient(id: number, client: any) {
  const response = await axios.put(`${API}/Clients/${id}`, client, {
    headers: getHeaders(),
  });

  return response.data;
}

export async function deleteClient(id: number) {
  const response = await axios.delete(`${API}/Clients/${id}`, {
    headers: getHeaders(),
  });

  return response.data;
}