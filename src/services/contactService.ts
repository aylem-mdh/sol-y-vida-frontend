import api from "./api";

export interface PublicContactPayload {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string;
}

export async function sendPublicContact(payload: PublicContactPayload) {
  await api.post("/PublicContact", {
    ...payload,
    fullName: payload.fullName.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim() || undefined,
    subject: payload.subject.trim(),
    message: payload.message.trim(),
  });
}
