import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  FileText,
  FolderOpen,
  MessageSquare,
  Phone,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function Family() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const role = (localStorage.getItem("role") === "client" ? "client" : "family") as "client" | "family";
  const [search, setSearch] = useState("");

  const modules = useMemo(
    () => [
      { label: t("familyPage.cards.familyStatus"), path: "/reports", icon: ShieldCheck },
      { label: t("familyPage.cards.nextVisits"), path: "/reports", icon: Calendar },
      { label: t("sidebar.reports"), path: "/reports", icon: FileText },
      { label: t("sidebar.documentation"), path: "/documentation", icon: FolderOpen },
      { label: t("sidebar.messages"), path: "/complaints", icon: MessageSquare },
      { label: t("familyPage.actions.contact"), path: "/contact", icon: Phone },
      { label: "Valoraciones", path: "/complaints", icon: Star },
      { label: t("sidebar.profile"), path: "/settings", icon: User },
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
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("sidebar.dashboard")}
          subtitle={t("familyPage.topbar.subtitleFamily")}
          name={t("profiles.familyName")}
          role={t("roles.family")}
          notificationPath="/notifications"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("familyPage.topbar.searchPlaceholder")}
        />

        <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
          <div className="flex flex-col gap-3">
            {filteredModules.map(({ label, path, icon: Icon }) => (
              <button
                key={`${label}-${path}`}
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
              {t("familyPage.noResults")}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
