import api from "./api";

export interface FamilyMember {
  id: number;
  userId?: number;
  nombre: string;
  apellidos: string;
  parentesco: string;
  telefono: string;
  email?: string;
  esContactoPrincipal: boolean;
  observaciones?: string;
  clientId: number;
  hasPortalAccess?: boolean;
  portalAccessStatus: "none" | "pending" | "active" | "disabled" | "unknown";
}

export interface FamilyMemberPayload {
  nombre: string;
  apellidos: string;
  parentesco: string;
  telefono: string;
  email?: string;
  esContactoPrincipal: boolean;
  observaciones?: string;
  clientId: number;
  createPortalAccess?: boolean;
}

export interface FamilyMemberAccountActionResult {
  member: FamilyMember;
  message: string;
  activationToken?: string;
  passwordResetToken?: string;
}

export async function getFamilyMembers() {
  const response = await api.get<Array<Omit<FamilyMember, "portalAccessStatus" | "hasPortalAccess"> & {
    hasPortalAccess?: boolean;
    portalAccessStatus?: string;
  }>>("/FamilyMembers");

  return response.data.map((member) => {
    const status = member.portalAccessStatus?.trim().toLowerCase();
    const hasKnownStatus = status === "none" || status === "pending" || status === "active" || status === "disabled";
    const portalAccessStatus: FamilyMember["portalAccessStatus"] = hasKnownStatus
      ? status as Exclude<FamilyMember["portalAccessStatus"], "unknown">
      : member.hasPortalAccess === false
      ? "none"
      : "unknown";

    return {
      ...member,
      hasPortalAccess: member.hasPortalAccess,
      portalAccessStatus,
    };
  });
}

export async function createFamilyMember(data: FamilyMemberPayload) {
  const response = await api.post<FamilyMemberAccountActionResult>("/FamilyMembers", data);

  return response.data;
}

export async function updateFamilyMember(
  id: number,
  data: FamilyMemberPayload
) {
  await api.put(`/FamilyMembers/${id}`, data);
}

export async function deleteFamilyMember(id: number) {
  await api.delete(`/FamilyMembers/${id}`);
}

export async function createFamilyPortalAccess(id: number) {
  const response = await api.post<FamilyMemberAccountActionResult>(`/FamilyMembers/${id}/portal-access`);
  return response.data;
}

export async function resendFamilyInvitation(id: number) {
  const response = await api.post<FamilyMemberAccountActionResult>(`/FamilyMembers/${id}/portal-access/resend`);
  return response.data;
}

export async function resetFamilyAccess(id: number) {
  const response = await api.post<FamilyMemberAccountActionResult>(`/FamilyMembers/${id}/portal-access/reset`);
  return response.data;
}

export async function deactivateFamilyAccess(id: number) {
  const response = await api.post<FamilyMemberAccountActionResult>(`/FamilyMembers/${id}/portal-access/deactivate`);
  return response.data;
}