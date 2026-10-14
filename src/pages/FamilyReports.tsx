import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import Modal from "../components/ui/Modal";
import {
  downloadFamilyReport,
  formatFamilyDate,
  getFamilyReports,
  triggerFamilyDownload,
  type FamilyReport,
} from "../services/familyPortalService";
import { getReportDetailText, getReportTitle, getVisitStatusLabel } from "../services/familyPortalPresentation";

export default function FamilyReports() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = (localStorage.getItem("role") === "client" ? "client" : "family") as "client" | "family";

  const [reports, setReports] = useState<FamilyReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<FamilyReport | null>(null);
  const [search, setSearch] = useState("");

  const targetReportId = Number(searchParams.get("reportId") ?? 0);

  const loadReports = useCallback(async () => {
    try {
      const data = await getFamilyReports();
      setReports(data);
      if (Number.isInteger(targetReportId) && targetReportId > 0) {
        const target = data.find((report) => report.id === targetReportId) ?? null;
        setSelectedReport(target ?? data[0] ?? null);
      } else {
        setSelectedReport(data[0] ?? null);
      }
    } catch (error) {
      console.error(error);
    }
  }, [targetReportId]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadReports();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loadReports]);

  async function handleDownload(reportId: number) {
    try {
      const payload = await downloadFamilyReport(reportId);
      triggerFamilyDownload(payload);
    } catch (error) {
      console.error(error);
      alert(t("reportsPage.errors.download"));
    }
  }

  const filteredReports = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) {
      return reports;
    }

    return reports.filter((report) =>
      `${report.title} ${report.summary} ${report.status} ${report.professional}`.toLowerCase().includes(normalized)
    );
  }, [reports, search]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("sidebar.reports")}
          subtitle={t("reportsPage.topbar.subtitleFamily")}
          name={t("profiles.familyName")}
          role={role === "client" ? t("roles.client") : t("roles.family")}
          notificationPath="/notifications"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("reportsPage.searchPlaceholder")}
        />

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <h2 className="text-2xl font-bold text-[#1F2937]">{t("reportsPage.family.followupTitle")}</h2>
            <div className="mt-6 space-y-4">
              {filteredReports.map((report) => (
                <div key={report.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#1F2937]">{getReportTitle(report.title, report.id, t)}</p>
                      <p className="mt-2 text-sm text-[#4B5563]">{report.summary}</p>
                    </div>
                    <span className="rounded-full bg-[#ECFAF8] px-3 py-1 text-xs font-semibold text-[#0F9E98]">{getVisitStatusLabel(report.status, t)}</span>
                  </div>
                  <p className="mt-3 text-xs text-[#6B7280]">{t("familyPage.labels.updated")} {formatFamilyDate(report.createdAt, i18n.language)} · {report.professional}</p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button onClick={() => setSelectedReport(report)} className="rounded-2xl border border-[#D8EFEA] bg-white px-4 py-3 font-semibold text-[#1F2937] transition duration-300 hover:bg-[#ECFAF8]">{t("reportsPage.actions.viewSummary")}</button>
                    <button onClick={() => handleDownload(report.id)} className="rounded-2xl bg-[#0F9E98] px-4 py-3 font-semibold text-white transition duration-300 hover:bg-[#0B817C]">{t("reportsPage.actions.download")}</button>
                  </div>
                </div>
              ))}

              {filteredReports.length === 0 && (
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
                <p className="text-sm font-semibold text-[#1F2937]">{selectedReport ? getReportTitle(selectedReport.title, selectedReport.id, t) : t("reportsPage.family.noReportSelected")}</p>
                <p className="mt-2 text-sm text-[#4B5563]">{selectedReport?.summary ?? t("reportsPage.family.selectReport")}</p>
              </div>
              <button onClick={() => navigate("/family/follow-up")} className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left"><span className="text-sm font-semibold text-[#1F2937]">{t("sidebar.followUp")}</span><span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span></button>
              <button onClick={() => navigate("/family/calendar")} className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left"><span className="text-sm font-semibold text-[#1F2937]">{t("sidebar.calendar")}</span><span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span></button>
              <button onClick={() => navigate("/documentation")} className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left"><span className="text-sm font-semibold text-[#1F2937]">{t("reportsPage.actions.viewDocumentation")}</span><span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span></button>
            </div>
          </article>
        </section>

        <Modal open={Boolean(selectedReport)} title={selectedReport ? getReportTitle(selectedReport.title, selectedReport.id, t) : t("sidebar.reports")} onClose={() => setSelectedReport(null)}>
          {selectedReport && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm text-[#374151]">
                <p className="font-semibold text-[#1F2937]">{selectedReport.professional}</p>
                <p className="mt-1 text-xs text-[#6B7280]">{formatFamilyDate(selectedReport.createdAt, i18n.language)} · {getVisitStatusLabel(selectedReport.status, t)}</p>
                <p className="mt-4 leading-7">{selectedReport.summary}</p>
              </div>
              <div className="space-y-3">
                {selectedReport.details.map((detail) => (
                  <div key={detail} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm text-[#374151]">{getReportDetailText(detail, t)}</div>
                ))}
              </div>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}
