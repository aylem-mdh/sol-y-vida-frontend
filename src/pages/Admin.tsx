import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Bell,
  Calendar,
  ClipboardList,
  FileText,
  HeartHandshake,
  MonitorCheck,
  Settings,
  ShieldAlert,
  UserCog,
  Users,
  UsersRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function Admin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const modules = useMemo(
    () => [
      { label: t("sidebar.clients"), path: "/clients", icon: Users },
      { label: t("sidebar.workers"), path: "/workers", icon: UserCog },
      { label: t("sidebar.familyMembers"), path: "/family-members", icon: UsersRound },
      { label: t("sidebar.services"), path: "/services", icon: HeartHandshake },
      { label: t("sidebar.calendar"), path: "/visits", icon: Calendar },
      { label: t("sidebar.reports"), path: "/reports", icon: FileText },
      { label: t("sidebar.budgets"), path: "/budgets", icon: ClipboardList },
      { label: t("sidebar.incidents"), path: "/incidents", icon: AlertTriangle },
      { label: t("sidebar.maintenance"), path: "/maintenance", icon: MonitorCheck },
      { label: t("sidebar.complaints"), path: "/complaints", icon: ShieldAlert },
      { label: t("sidebar.settings"), path: "/settings", icon: Settings },
      { label: t("sidebar.notifications"), path: "/notifications", icon: Bell },
    ],
    [t]
  );

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return modules;
    }

    return modules.filter((module) => module.label.toLowerCase().includes(query));
  }, [modules, search]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role="admin" />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("sidebar.dashboard")}
          subtitle={t("settingsPage.topbar.subtitle")}
          name={t("profiles.adminName")}
          role={t("roles.admin")}
          notificationPath="/notifications"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("reportsPage.searchPlaceholder")}
        />

        <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
          <div className="flex flex-col gap-3">
            {filteredModules.map(({ label, path, icon: Icon }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-[#D8EFEA] bg-[#F7FCFB] px-4 py-4 text-left font-semibold text-[#1F2937] transition duration-300 hover:bg-[#ECFAF8]"
              >
                <Icon className="h-5 w-5 text-[#0F9E98]" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {filteredModules.length === 0 && (
            <div className="mt-4 rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm text-[#4B5563]">
              {t("notificationsPage.noResults")}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
