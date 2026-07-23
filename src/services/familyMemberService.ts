import api from "./api";

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
  const response = await api.get<FamilyMember[]>("/FamilyMembers");

  return response.data;
}

export async function createFamilyMember(data: any) {
  const response = await api.post("/FamilyMembers", data);

  return response.data;
}

export async function updateFamilyMember(
  id: number,
  data: any
) {
  await api.put(`/FamilyMembers/${id}`, data);
}

export async function deleteFamilyMember(id: number) {
  await api.delete(`/FamilyMembers/${id}`);
}