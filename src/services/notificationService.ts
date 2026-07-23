import api from "./api";

export interface NotificationItem {
  id: number;
  userId?: number;
  targetRole?: string;
  title: string;
  message: string;
  isRead: boolean;
  channel: string;
  pushReady: boolean;
  createdAt: string;
}

export async function getNotifications() {
  const response = await api.get<NotificationItem[]>("/Notifications");
  return response.data;
}

export async function markNotificationRead(id: number) {
  await api.post(`/Notifications/${id}/read`);
}
