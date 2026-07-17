import axios from "axios";

const API = "https://localhost:7131/api";

function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
}

export interface FamilyMember {
  id: number;
  nombre: string;
  apellidos: string;
  parentesco: string;
  telefono: string;
  email?: string;
  esContactoPrincipal: boolean;
  observaciones?: string;
  clientId: number;
}

export async function getFamilyMembers() {
  const response = await axios.get<FamilyMember[]>(
    `${API}/FamilyMembers`,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
}

export async function createFamilyMember(data: any) {
  const response = await axios.post(
    `${API}/FamilyMembers`,
    data,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
}

export async function updateFamilyMember(
  id: number,
  data: any
) {
  await axios.put(
    `${API}/FamilyMembers/${id}`,
    data,
    {
      headers: getHeaders(),
    }
  );
}

export async function deleteFamilyMember(id: number) {
  await axios.delete(
    `${API}/FamilyMembers/${id}`,
    {
      headers: getHeaders(),
    }
  );
}