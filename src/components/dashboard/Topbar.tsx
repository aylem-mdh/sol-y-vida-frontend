import { Bell, Clock3, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getNotifications } from "../../services/notificationService";

type Props = {
  title: string;
  subtitle: string;
  name: string;
  role: string;
  notificationPath?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
};

export default function Topbar({
  title,
  subtitle,
  name,
  role,
  notificationPath,
  searchValue,
  onSearchChange,
  searchPlaceholder,
}: Props) {
  const { t, i18n } = useTranslation();
  const resolvedSearchPlaceholder = searchPlaceholder ?? t("reportsPage.searchPlaceholder");
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? t("topbar.goodMorning")
      : hour < 20
      ? t("topbar.goodAfternoon")
      : t("topbar.goodEvening");

  useEffect(() => {
    let mounted = true;

    async function loadUnreadCount() {
      try {
        const data = await getNotifications();
        if (!mounted) {
          return;
        }

        const unread = data.filter((item) => !item.isRead).length;
        setUnreadCount(unread);
      } catch {
        if (mounted) {
          setUnreadCount(0);
        }
      }
    }

    loadUnreadCount();
    const timer = window.setInterval(loadUnreadCount, 45000);

    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <header className="rounded-[28px] border border-[#D8EFEA] bg-white/95 px-5 py-5 shadow-[0_18px_42px_rgba(15,25,30,0.08)] backdrop-blur-sm sm:px-7 sm:py-6 lg:px-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#4B5563] sm:text-base">{subtitle}</p>
          <p className="mt-3 text-sm font-semibold text-[#0F9E98] sm:text-base">
            {greeting}, {name}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <div className="hidden items-center gap-2 rounded-2xl border border-[#D8EFEA] bg-[#F7FCFB] px-4 py-3 text-sm text-[#4B5563] lg:inline-flex">
            <Clock3 size={16} className="text-[#0F9E98]" />
            {new Date().toLocaleDateString(
              i18n.language === "es" ? "es-ES" : i18n.language === "fr" ? "fr-FR" : i18n.language === "de" ? "de-DE" : "en-US",
              {
              weekday: "long",
              day: "2-digit",
              month: "long",
            })}
          </div>

          {onSearchChange && (
            <div className="hidden items-center gap-2 rounded-2xl border border-[#D8EFEA] bg-[#F7FCFB] px-4 py-3 lg:flex lg:w-64">
              <Search size={16} className="text-[#0F9E98]" />
              <input
                value={searchValue ?? ""}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={resolvedSearchPlaceholder}
                className="w-full bg-transparent text-sm text-[#1F2937] outline-none placeholder:text-[#94A3B8]"
              />
            </div>
          )}

          <button
            onClick={() => notificationPath && navigate(notificationPath)}
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D8EFEA] bg-[#F7FCFB] text-[#0F9E98] transition duration-300 hover:bg-[#ECFAF8]"
            aria-label={t("topbar.notifications")}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex min-h-[1.25rem] min-w-[1.25rem] items-center justify-center rounded-full bg-[#F29A38] px-1 text-[10px] font-bold text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-[#D8EFEA] bg-white px-3 py-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F9E98] text-sm font-bold text-white">
              {name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-[#1F2937]">{name}</p>
              <p className="text-xs text-[#6B7280]">{role}</p>
            </div>
          </div>

          <select
            value={i18n.language}
            onChange={(event) => i18n.changeLanguage(event.target.value)}
            className="rounded-2xl border border-[#D8EFEA] bg-white px-3 py-2.5 text-xs font-semibold text-[#1F2937] outline-none"
            aria-label={t("common.language")}
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
          </select>
        </div>
      </div>
    </header>
  );
}