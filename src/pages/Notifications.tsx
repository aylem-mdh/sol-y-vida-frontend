import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { getNotifications, markNotificationRead, type NotificationItem } from "../services/notificationService";
import { useTranslation } from "react-i18next";

type Role = "admin" | "worker" | "family";

export default function Notifications() {
  const { t, i18n } = useTranslation();
  const role = (localStorage.getItem("role") as Role) || "admin";
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    try {
      const data = await getNotifications();
      const sorted = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setNotifications(sorted);
    } catch (error) {
      console.error(error);
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return notifications.filter((n) => `${n.title} ${n.message}`.toLowerCase().includes(q));
  }, [notifications, search]);

  async function read(id: number) {
    try {
      await markNotificationRead(id);
      setNotifications((current) => current.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("sidebar.notifications")}
          subtitle={t("notificationsPage.subtitle")}
          name={role === "admin" ? t("profiles.adminName") : role === "worker" ? t("profiles.workerName") : t("profiles.familyName")}
          role={role === "admin" ? t("roles.admin") : role === "worker" ? t("roles.worker") : t("roles.family")}
          notificationPath="/notifications"
        />

        <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-[#1F2937]">{t("notificationsPage.history")}</h2>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("notificationsPage.searchPlaceholder")}
              className="w-full rounded-xl border border-[#D7E5E3] px-4 py-3 sm:w-80"
            />
          </div>

          <div className="mt-6 space-y-3">
            {filtered.map((notification) => (
              <article key={notification.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#1F2937]">{notification.title}</p>
                    <p className="mt-2 text-sm text-[#4B5563]">{notification.message}</p>
                    <p className="mt-2 text-xs text-[#6B7280]">
                      {new Date(notification.createdAt).toLocaleString(
                        i18n.language === "es"
                          ? "es-ES"
                          : i18n.language === "fr"
                          ? "fr-FR"
                          : i18n.language === "de"
                          ? "de-DE"
                          : "en-US"
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${notification.pushReady ? "bg-[#FFF5E8] text-[#9A5A13]" : "bg-[#ECFAF8] text-[#0F9E98]"}`}>
                      {notification.pushReady ? t("notificationsPage.pushReady") : t("notificationsPage.inApp")}
                    </span>
                    {!notification.isRead && (
                      <button onClick={() => read(notification.id)} className="text-xs font-semibold text-[#0F9E98]">
                        {t("notificationsPage.markRead")}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}

            {filtered.length === 0 && (
              <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-sm text-[#4B5563]">
                {t("notificationsPage.noResults")}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
