import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, FileText, MessageSquare, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { getFamilyDashboardData, type FamilyDashboardData } from "../services/familyPortalService";
import { formatDateTime, getReportTitle, getVisitStatusKey } from "../services/familyPortalPresentation";

function getVisitTimestamp(visit: { scheduledAt?: string }) {
  const raw = visit.scheduledAt;
  if (!raw) {
    return Number.MAX_SAFE_INTEGER;
  }

  const timestamp = new Date(raw).getTime();
  return Number.isFinite(timestamp) ? timestamp : Number.MAX_SAFE_INTEGER;
}

function formatVisitDateTime(
  visit: { scheduledAt?: string; dayLabel?: string; hour?: string },
  language: string,
) {
  const raw = visit.scheduledAt;
  if (raw) {
    const date = new Date(raw);
    if (Number.isFinite(date.getTime())) {
      return formatDateTime(raw, language);
    }
  }

  const fallback = visit.hour?.trim() ?? "";
  return fallback || "-";
}

export default function FamilyFollowUp() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const role = (localStorage.getItem("role") === "client" ? "client" : "family") as "client" | "family";
  const [data, setData] = useState<FamilyDashboardData | null>(null);
  const [search, setSearch] = useState("");

  const loadData = useCallback(async () => {
    try {
      const response = await getFamilyDashboardData();
      setData(response);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loadData]);

  const nextVisit = useMemo(() => {
    if (!data) {
      return null;
    }

    return data.visits
      .slice()
      .sort((left, right) => getVisitTimestamp(left) - getVisitTimestamp(right))
      .find((visit) => getVisitStatusKey(visit.status) !== "completed") ?? data.visits[0] ?? null;
  }, [data]);

  const lastReport = useMemo(() => {
    if (!data) {
      return null;
    }

    return data.reports
      .slice()
      .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())[0] ?? null;
  }, [data]);

  const statusItems = useMemo(() => {
    const items: Array<{ title: string; text: string }> = [];

    if (nextVisit) {
      items.push({
        title: t("familyPortal.statusItems.nextVisitTitle"),
        text: t("familyPortal.statusItems.nextVisitText", {
          date: formatVisitDateTime(nextVisit, i18n.language),
          professional: nextVisit.professional,
        }),
      });
    }

    if (lastReport) {
      items.push({
        title: t("familyPortal.statusItems.lastReportTitle"),
        text: lastReport.summary,
      });
    }

    if (items.length === 0) {
      items.push({
        title: t("familyPortal.statusItems.generalStatusTitle"),
        text: t("familyPortal.statusItems.noNews"),
      });
    }

    return items;
  }, [i18n.language, lastReport, nextVisit, t]);

  const filteredStatus = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (statusItems.length === 0) {
      return [];
    }

    if (!normalized) {
      return statusItems;
    }

    return statusItems.filter((item) => `${item.title} ${item.text}`.toLowerCase().includes(normalized));
  }, [search, statusItems]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("sidebar.followUp")}
          subtitle={role === "client" ? t("familyPage.topbar.subtitleClient") : t("familyPage.topbar.subtitleFamily")}
          name={t("profiles.familyName")}
          role={role === "client" ? t("roles.client") : t("roles.family")}
          notificationPath="/notifications"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("familyPage.topbar.searchPlaceholder")}
        />

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#0F9E98]" />
              <h2 className="text-2xl font-bold text-[#1F2937]">{t("familyPage.cards.familyStatus")}</h2>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                <p className="text-sm text-[#4B5563]">{t("familyPage.cards.nextVisits")}</p>
                <p className="mt-2 text-3xl font-bold text-[#1F2937]">{data?.visits.length ?? 0}</p>
              </div>
              <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                <p className="text-sm text-[#4B5563]">{t("sidebar.reports")}</p>
                <p className="mt-2 text-3xl font-bold text-[#1F2937]">{data?.reports.length ?? 0}</p>
              </div>
              <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                <p className="text-sm text-[#4B5563]">{t("sidebar.messages")}</p>
                <p className="mt-2 text-3xl font-bold text-[#1F2937]">{data?.messages.length ?? 0}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {filteredStatus.map((item, index) => (
                <div key={`${item.title}-${index}`} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                  <p className="font-semibold text-[#1F2937]">{item.title}</p>
                  <p className="mt-2 text-sm text-[#4B5563]">{item.text}</p>
                </div>
              ))}

              {filteredStatus.length === 0 && (
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm text-[#4B5563]">
                  {t("familyPage.noResults")}
                </div>
              )}
            </div>
          </article>

          <article className="rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <h3 className="text-xl font-bold text-[#1F2937]">{t("reportsPage.family.quickAccess")}</h3>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                <p className="text-sm font-semibold text-[#1F2937]">{t("familyPage.sections.nextVisit")}</p>
                {nextVisit ? (
                  <>
                    <p className="mt-2 text-sm text-[#4B5563]">{formatVisitDateTime(nextVisit, i18n.language)}</p>
                    <p className="mt-1 text-sm text-[#4B5563]">{nextVisit.professional}</p>
                    <p className="mt-1 text-xs text-[#6B7280]">{nextVisit.summary}</p>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-[#6B7280]">{t("familyPage.noData")}</p>
                )}
              </div>

              <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                <p className="text-sm font-semibold text-[#1F2937]">{t("reportsPage.family.noReportSelected")}</p>
                {lastReport ? (
                  <>
                    <p className="mt-2 text-sm text-[#4B5563]">{getReportTitle(lastReport.title, lastReport.id, t)}</p>
                    <p className="mt-1 text-xs text-[#6B7280]">{lastReport.professional}</p>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-[#6B7280]">{t("familyPage.noData")}</p>
                )}
              </div>

              <button onClick={() => navigate("/family/calendar")} className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left">
                <span className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><Calendar className="h-4 w-4 text-[#0F9E98]" /> {t("sidebar.calendar")}</span>
                <span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span>
              </button>

              <button onClick={() => navigate("/family/reports")} className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left">
                <span className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><FileText className="h-4 w-4 text-[#0F9E98]" /> {t("sidebar.reports")}</span>
                <span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span>
              </button>

              <button onClick={() => navigate("/family/messages")} className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left">
                <span className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><MessageSquare className="h-4 w-4 text-[#0F9E98]" /> {t("sidebar.messages")}</span>
                <span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span>
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
