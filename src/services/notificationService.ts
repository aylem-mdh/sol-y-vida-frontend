import api from "./api";

export interface NotificationItem {
  id: number;
  userId?: number;
  targetRole?: string;
  title: string;
  message: string;
  type: string;
  relatedEntityType?: string;
  relatedEntityId?: number;
  dedupKey?: string;
  isRead: boolean;
  readAt?: string;
  channel: string;
  pushReady: boolean;
  createdAt: string;
}

export interface PushConfigResponse {
  configured: boolean;
  publicKey?: string;
  subject?: string;
}

export interface PushSubscriptionPayload {
  endpoint: string;
  p256dh: string;
  auth: string;
}

export async function getNotifications() {
  const response = await api.get<NotificationItem[]>("/Notifications");
  return response.data;
}

export async function markNotificationRead(id: number) {
  await api.post(`/Notifications/${id}/read`);
}

export async function getPushConfig() {
  const response = await api.get<PushConfigResponse>("/Notifications/push-config");
  return response.data;
}

export async function savePushSubscription(payload: PushSubscriptionPayload) {
  await api.post("/Notifications/push-subscriptions", payload);
}

export async function deletePushSubscription(endpoint: string) {
  await api.delete("/Notifications/push-subscriptions", { params: { endpoint } });
}
