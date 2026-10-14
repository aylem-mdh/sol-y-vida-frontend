import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import {
  deletePushSubscription,
  getNotifications,
  getPushConfig,
  markNotificationRead,
  savePushSubscription,
  type NotificationItem,
} from "../services/notificationService";
import { useTranslation } from "react-i18next";

type Role = "admin" | "worker" | "family" | "client";

type PushState = "unsupported" | "not-configured" | "disabled" | "enabled" | "blocked";

function decodeBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  const raw = window.atob(padded);
  const output = new Uint8Array(raw.length);

  for (let index = 0; index < raw.length; index += 1) {
    output[index] = raw.charCodeAt(index);
  }

  return output;
}

export default function Notifications() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const role = (localStorage.getItem("role") as Role) || "admin";
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [search, setSearch] = useState("");
  const [pushState, setPushState] = useState<PushState>("unsupported");
  const [pushConfigured, setPushConfigured] = useState(false);
  const [pushPublicKey, setPushPublicKey] = useState<string | null>(null);
  const [pushFeedback, setPushFeedback] = useState("");

  const loadNotifications = useCallback(async () => {
    try {
      const data = await getNotifications();
      const sorted = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setNotifications(sorted);
      window.dispatchEvent(new Event("notifications:updated"));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadPushState = useCallback(async () => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
      setPushState("unsupported");
      setPushFeedback(t("notificationsPage.pushUnsupported"));
      return;
    }

    try {
      const config = await getPushConfig();
      setPushConfigured(config.configured);
      setPushPublicKey(config.publicKey ?? null);

      const permission = Notification.permission;
      if (!config.configured) {
        setPushState("not-configured");
        setPushFeedback(t("notificationsPage.pushNotConfigured"));
        return;
      }

      const registration = await navigator.serviceWorker.register("/push-sw.js");
      const subscription = await registration.pushManager.getSubscription();

      if (permission === "denied") {
        setPushState("blocked");
        setPushFeedback(t("notificationsPage.pushBlocked"));
        return;
      }

      if (subscription) {
        setPushState("enabled");
        setPushFeedback(t("notificationsPage.pushEnabled"));
        return;
      }

      setPushState("disabled");
      setPushFeedback(t("notificationsPage.pushDisabled"));
    } catch (error) {
      console.error(error);
      setPushState("disabled");
      setPushFeedback(t("forms.common.errors.generic"));
    }
  }, [t]);

  async function enablePush() {
    if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
      setPushState("unsupported");
      setPushFeedback(t("notificationsPage.pushUnsupported"));
      return;
    }

    if (!pushConfigured || !pushPublicKey) {
      setPushState("not-configured");
      setPushFeedback(t("notificationsPage.pushNotConfigured"));
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setPushState(permission === "denied" ? "blocked" : "disabled");
        setPushFeedback(permission === "denied" ? t("notificationsPage.pushBlocked") : t("notificationsPage.pushDisabled"));
        return;
      }

      const registration = await navigator.serviceWorker.register("/push-sw.js");
      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: decodeBase64Url(pushPublicKey),
        });
      }

      const rawSubscription = subscription.toJSON();
      await savePushSubscription({
        endpoint: subscription.endpoint,
        p256dh: rawSubscription.keys?.p256dh ?? "",
        auth: rawSubscription.keys?.auth ?? "",
      });

      setPushState("enabled");
      setPushFeedback(t("notificationsPage.pushEnabled"));
    } catch (error) {
      console.error(error);
      setPushState("disabled");
      setPushFeedback(t("forms.common.errors.generic"));
    }
  }

  async function disablePush() {
    if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      setPushState("unsupported");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register("/push-sw.js");
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await deletePushSubscription(subscription.endpoint);
        await subscription.unsubscribe();
      }

      setPushState("disabled");
      setPushFeedback(t("notificationsPage.pushDisabled"));
    } catch (error) {
      console.error(error);
      setPushFeedback(t("forms.common.errors.generic"));
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadNotifications();
      void loadPushState();
    }, 0);

    const refreshUnread = () => {
      void loadNotifications();
    };

    window.addEventListener("notifications:updated", refreshUnread);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("notifications:updated", refreshUnread);
    };
  }, [loadNotifications, loadPushState]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return notifications.filter((n) => `${n.title} ${n.message}`.toLowerCase().includes(q));
  }, [notifications, search]);

  async function read(id: number) {
    try {
      await markNotificationRead(id);
      setNotifications((current) => current.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
      window.dispatchEvent(new Event("notifications:updated"));
    } catch (error) {
      console.error(error);
    }
  }

  function getNotificationPath(notification: NotificationItem) {
    const entityType = notification.relatedEntityType?.toLowerCase();

    if (entityType === "incident" && notification.relatedEntityId) {
      return `/incidents?id=${notification.relatedEntityId}`;
    }

    if (entityType === "complaint" && notification.relatedEntityId) {
      return `/complaints?id=${notification.relatedEntityId}`;
    }

    return "/notifications";
  }

  async function openNotification(notification: NotificationItem) {
    if (!notification.isRead) {
      await read(notification.id);
    }

    navigate(getNotificationPath(notification));
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("sidebar.notifications")}
          subtitle={t("notificationsPage.subtitle")}
          name={role === "admin" ? t("profiles.adminName") : role === "worker" ? t("profiles.workerName") : t("profiles.familyName")}
          role={role === "admin" ? t("roles.admin") : role === "worker" ? t("roles.worker") : role === "client" ? t("roles.client") : t("roles.family")}
          notificationPath="/notifications"
        />

        <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
          <div className="mb-6 rounded-2xl border border-[#D8EFEA] bg-[#F7FCFB] p-4">
            <p className="text-sm font-semibold text-[#1F2937]">{t("notificationsPage.pushSectionTitle")}</p>
            <p className="mt-2 text-sm text-[#4B5563]">
              {pushState === "blocked"
                ? t("notificationsPage.pushBlocked")
                : pushState === "enabled"
                ? t("notificationsPage.pushEnabled")
                : pushState === "not-configured"
                ? t("notificationsPage.pushNotConfigured")
                : pushState === "unsupported"
                ? t("notificationsPage.pushUnsupported")
                : t("notificationsPage.pushDisabled")}
            </p>
            {pushFeedback && <p className="mt-2 text-xs font-semibold text-[#0F9E98]">{pushFeedback}</p>}
            {pushState !== "unsupported" && pushConfigured && (
              <div className="mt-3 flex gap-3">
                {pushState === "enabled" ? (
                  <button onClick={() => void disablePush()} className="rounded-xl border border-[#D8EFEA] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937]">
                    {t("notificationsPage.disablePush")}
                  </button>
                ) : (
                  <button onClick={() => void enablePush()} className="rounded-xl bg-[#0F9E98] px-4 py-2 text-sm font-semibold text-white">
                    {t("notificationsPage.enablePush")}
                  </button>
                )}
              </div>
            )}
          </div>

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
              <article
                key={notification.id}
                onClick={() => void openNotification(notification)}
                className="cursor-pointer rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 transition duration-300 hover:border-[#0F9E98] hover:bg-[#F7FCFB]"
              >
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
                    {notification.type && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {notification.type}
                      </span>
                    )}
                    {!notification.isRead && (
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          void read(notification.id);
                        }}
                        className="text-xs font-semibold text-[#0F9E98]"
                      >
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
