import {
  Calendar,
  ClipboardList,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Menu,
  MessageSquare,
  MonitorCheck,
  ShieldAlert,
  User,
  HeartHandshake,
  UserCog,
  Users,
  UsersRound,
  X,
  AlertTriangle,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useNavigate, useLocation } from "react-router-dom";
import { clearSession } from "../../services/authService";

type Role = "admin" | "worker" | "family" | "client";

type Props = {
  role: Role;
};

const menus: Record<Role, Array<{ labelKey: string; path: string; icon: typeof LayoutDashboard }>> = {
  admin: [
    { labelKey: "sidebar.clients", path: "/clients", icon: Users },
    { labelKey: "sidebar.workers", path: "/workers", icon: UserCog },
    { labelKey: "sidebar.familyMembers", path: "/family-members", icon: UsersRound },
    { labelKey: "sidebar.services", path: "/services", icon: HeartHandshake },
    { labelKey: "sidebar.calendar", path: "/visits", icon: Calendar },
    { labelKey: "sidebar.reports", path: "/reports", icon: FileText },
    { labelKey: "sidebar.budgets", path: "/budgets", icon: ClipboardList },
    { labelKey: "sidebar.incidents", path: "/incidents", icon: AlertTriangle },
    { labelKey: "sidebar.maintenance", path: "/maintenance", icon: MonitorCheck },
    { labelKey: "sidebar.complaints", path: "/complaints", icon: ShieldAlert },
    { labelKey: "sidebar.notifications", path: "/notifications", icon: MessageSquare },
    { labelKey: "sidebar.settings", path: "/settings", icon: Settings },
  ],
  worker: [
    { labelKey: "sidebar.agenda", path: "/visits", icon: Calendar },
    { labelKey: "sidebar.myServices", path: "/services", icon: HeartHandshake },
    { labelKey: "sidebar.assignedClients", path: "/clients", icon: Users },
    { labelKey: "sidebar.reports", path: "/reports", icon: FileText },
    { labelKey: "sidebar.incidents", path: "/incidents", icon: ShieldAlert },
    { labelKey: "sidebar.maintenance", path: "/maintenance", icon: MonitorCheck },
    { labelKey: "sidebar.messages", path: "/complaints", icon: MessageSquare },
    { labelKey: "sidebar.notifications", path: "/notifications", icon: MessageSquare },
    { labelKey: "sidebar.documentation", path: "/documentation", icon: FolderOpen },
    { labelKey: "sidebar.profile", path: "/settings", icon: User },
  ],
  client: [
    { labelKey: "sidebar.dashboard", path: "/family", icon: LayoutDashboard },
    { labelKey: "sidebar.myServices", path: "/reports", icon: HeartHandshake },
    { labelKey: "sidebar.calendar", path: "/reports", icon: Calendar },
    { labelKey: "sidebar.messages", path: "/complaints", icon: MessageSquare },
    { labelKey: "sidebar.documentation", path: "/documentation", icon: FolderOpen },
    { labelKey: "sidebar.profile", path: "/settings", icon: User },
  ],
  family: [
    { labelKey: "sidebar.followUp", path: "/reports", icon: MonitorCheck },
    { labelKey: "sidebar.calendar", path: "/reports", icon: Calendar },
    { labelKey: "sidebar.reports", path: "/reports", icon: ClipboardList },
    { labelKey: "sidebar.messages", path: "/complaints", icon: MessageSquare },
    { labelKey: "sidebar.notifications", path: "/notifications", icon: MessageSquare },
    { labelKey: "sidebar.complaints", path: "/complaints", icon: ShieldAlert },
    { labelKey: "sidebar.documentation", path: "/documentation", icon: FolderOpen },
    { labelKey: "contact.title", path: "/contact", icon: FolderOpen },
    { labelKey: "sidebar.profile", path: "/settings", icon: User },
  ],
};

export default function Sidebar({ role }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const items = menus[role];

  function logout() {
    clearSession();
    navigate("/login");
  }

  function goTo(path: string) {
    navigate(path);
    setOpen(false);
  }

  const panel = (
    <aside className="flex h-full w-72 flex-col border-r border-[#D7EDEA] bg-white/95 shadow-[0_20px_42px_rgba(15,25,30,0.08)] backdrop-blur-sm">
      <div className="px-6 pb-5 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">{t("branding.name")}</h1>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F9E98]">{t("branding.suffix")}</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-xl border border-[#D6ECE9] p-2 text-[#0F9E98] lg:hidden"
            aria-label={t("sidebar.aria.closeMenu")}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 pb-4">
        {items.map(({ icon: Icon, labelKey, path }) => {
          const [basePath, hash] = path.split("#");
          const active =
            hash
              ? location.pathname === basePath && location.hash === `#${hash}`
              : path === "/admin"
              ? location.pathname === "/admin"
              : path === "/worker"
              ? location.pathname === "/worker"
              : path === "/family"
              ? location.pathname === "/family"
              : location.pathname.startsWith(path);

              const label = t(labelKey);

          return (
            <button
              key={`${label}-${path}`}
              onClick={() => goTo(path)}
              className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition duration-300 ${
                active
                  ? "bg-[#0F9E98] text-white shadow-[0_14px_28px_rgba(15,158,152,0.32)]"
                  : "text-[#374151] hover:bg-[#ECFAF8]"
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className="text-sm font-semibold sm:text-[15px]">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mx-4 mb-4 rounded-2xl border border-[#D8EFEA] bg-[#ECFAF8] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">{t("sidebar.support")}</p>
        <p className="mt-2 text-lg font-bold text-[#1F2937]">{t("branding.supportPhone")}</p>
        <p className="text-sm text-[#4B5563]">{t("sidebar.support24")}</p>
      </div>

      <div className="p-4">
        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#F7D7AA] bg-[#FFF5E8] py-3.5 font-semibold text-[#9A5A13] transition duration-300 hover:bg-[#FDEFD8]"
        >
          <LogOut size={18} />
          {t("common.logout")}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#D8EFEA] bg-white text-[#0F9E98] shadow-[0_10px_24px_rgba(15,25,30,0.14)] lg:hidden"
        aria-label={t("sidebar.aria.openMenu")}
      >
        <Menu size={20} />
      </button>

      <div className="hidden lg:block">{panel}</div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-[#0F172A]/40"
            onClick={() => setOpen(false)}
            aria-label={t("sidebar.aria.closePanel")}
          />
          <div className="relative h-full">{panel}</div>
        </div>
      )}
    </>
  );
}