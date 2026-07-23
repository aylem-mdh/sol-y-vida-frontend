import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, ClipboardList, FileText, Users } from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { getAdminDashboardData, type AdminDashboardData } from "../services/dashboardService";
import Modal from "../components/ui/Modal";
import {
  downloadFamilyReport,
  formatFamilyDate,
  getFamilyReports,
  triggerFamilyDownload,
  type FamilyReport,
} from "../services/familyPortalService";
import { useTranslation } from "react-i18next";

type DashboardRole = "admin" | "worker" | "family";

export default function Reports() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const role = (localStorage.getItem("role") === "family"
    ? "family"
    : localStorage.getItem("role") === "worker"
    ? "worker"
    : "admin") as DashboardRole;
  const [stats, setStats] = useState<AdminDashboardData | null>(null);
  const [familyReports, setFamilyReports] = useState<FamilyReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<FamilyReport | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (role === "admin" || role === "worker") {
      loadStats();
      return;
    }

    loadFamilyReports();
  }, [role]);

  async function loadStats() {
    try {
      const data = await getAdminDashboardData();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadFamilyReports() {
    try {
      const data = await getFamilyReports();
      setFamilyReports(data);
      setSelectedReport(data[0] ?? null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDownload(reportId: number) {
    try {
      const payload = await downloadFamilyReport(reportId);
      triggerFamilyDownload(payload);
    } catch (error) {
      console.error(error);
      alert(t("reportsPage.errors.download"));
    }
  }

  const filteredFamilyReports = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) {
      return familyReports;
    }

    return familyReports.filter((report) =>
      `${report.title} ${report.summary} ${report.status} ${report.professional}`.toLowerCase().includes(normalized)
    );
  }, [familyReports, search]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("sidebar.reports")}
          subtitle={role === "family" ? t("reportsPage.topbar.subtitleFamily") : t("reportsPage.topbar.subtitleAdmin")}
          name={role === "admin" ? t("profiles.adminName") : role === "worker" ? t("profiles.workerName") : t("profiles.familyName")}
          role={role === "admin" ? t("roles.admin") : role === "worker" ? t("roles.worker") : t("roles.family")}
          searchValue={role === "family" ? search : undefined}
          onSearchChange={role === "family" ? setSearch : undefined}
          searchPlaceholder={t("reportsPage.searchPlaceholder")}
        />

        {role !== "family" ? (
          <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-[#0F9E98]" />
                <h2 className="text-2xl font-bold text-[#1F2937]">{t("reportsPage.admin.summaryTitle")}</h2>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4"><p className="text-sm text-[#4B5563]">{t("reportsPage.admin.activeClients")}</p><p className="mt-2 text-3xl font-bold text-[#1F2937]">{stats?.clientes ?? 0}</p></div>
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4"><p className="text-sm text-[#4B5563]">{t("reportsPage.admin.activeWorkers")}</p><p className="mt-2 text-3xl font-bold text-[#1F2937]">{stats?.trabajadores ?? 0}</p></div>
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4"><p className="text-sm text-[#4B5563]">{t("reportsPage.admin.registeredVisits")}</p><p className="mt-2 text-3xl font-bold text-[#1F2937]">{stats?.visitas ?? 0}</p></div>
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4"><p className="text-sm text-[#4B5563]">{t("reportsPage.admin.relatedFamily")}</p><p className="mt-2 text-3xl font-bold text-[#1F2937]">{stats?.familiares ?? 0}</p></div>
              </div>

              <div className="mt-6 space-y-3">
                {(stats?.recentClients ?? []).map((client) => (
                  <div key={client.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                    <p className="font-semibold text-[#1F2937]">{client.name}</p>
                    <p className="mt-1 text-sm text-[#4B5563]">{client.detail}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
              <h3 className="text-xl font-bold text-[#1F2937]">{t("reportsPage.admin.actionsTitle")}</h3>
              <div className="mt-5 space-y-3">
                <button onClick={() => navigate("/clients")} className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left"><span className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><Users className="h-4 w-4 text-[#0F9E98]" /> {t("reportsPage.actions.viewClients")}</span><span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span></button>
                <button onClick={() => navigate("/family-members")} className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left"><span className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><ClipboardList className="h-4 w-4 text-[#0F9E98]" /> {t("reportsPage.actions.viewFamily")}</span><span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span></button>
                <button onClick={() => navigate("/documentation")} className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left"><span className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><FileText className="h-4 w-4 text-[#0F9E98]" /> {t("reportsPage.actions.documentSupport")}</span><span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span></button>
              </div>
            </article>
          </section>
        ) : (
          <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <article className="rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
              <h2 className="text-2xl font-bold text-[#1F2937]">{t("reportsPage.family.followupTitle")}</h2>
              <div className="mt-6 space-y-4">
                {filteredFamilyReports.map((report) => (
                  <div key={report.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#1F2937]">{report.title}</p>
                        <p className="mt-2 text-sm text-[#4B5563]">{report.summary}</p>
                      </div>
                      <span className="rounded-full bg-[#ECFAF8] px-3 py-1 text-xs font-semibold text-[#0F9E98]">{report.status}</span>
                    </div>
                    <p className="mt-3 text-xs text-[#6B7280]">{t("familyPage.labels.updated")} {formatFamilyDate(report.createdAt)} · {report.professional}</p>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <button onClick={() => setSelectedReport(report)} className="rounded-2xl border border-[#D8EFEA] bg-white px-4 py-3 font-semibold text-[#1F2937] transition duration-300 hover:bg-[#ECFAF8]">{t("reportsPage.actions.viewSummary")}</button>
                      <button onClick={() => handleDownload(report.id)} className="rounded-2xl bg-[#0F9E98] px-4 py-3 font-semibold text-white transition duration-300 hover:bg-[#0B817C]">{t("reportsPage.actions.download")}</button>
                    </div>
                  </div>
                ))}
                {filteredFamilyReports.length === 0 && (
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
                  <p className="text-sm font-semibold text-[#1F2937]">{selectedReport?.title ?? t("reportsPage.family.noReportSelected")}</p>
                  <p className="mt-2 text-sm text-[#4B5563]">{selectedReport?.summary ?? t("reportsPage.family.selectReport")}</p>
                </div>
                <button onClick={() => navigate("/family") } className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left"><span className="text-sm font-semibold text-[#1F2937]">{t("reportsPage.actions.backToFamily")}</span><span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span></button>
                <button onClick={() => navigate("/documentation")} className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left"><span className="text-sm font-semibold text-[#1F2937]">{t("reportsPage.actions.viewDocumentation")}</span><span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span></button>
                <button onClick={() => navigate("/contact")} className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left"><span className="text-sm font-semibold text-[#1F2937]">{t("reportsPage.actions.contactCompany")}</span><span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span></button>
              </div>
            </article>
          </section>
        )}

        <Modal open={Boolean(selectedReport)} title={selectedReport?.title ?? t("sidebar.reports")} onClose={() => setSelectedReport(null)}>
          {selectedReport && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm text-[#374151]">
                <p className="font-semibold text-[#1F2937]">{selectedReport.professional}</p>
                <p className="mt-1 text-xs text-[#6B7280]">{formatFamilyDate(selectedReport.createdAt)} · {selectedReport.status}</p>
                <p className="mt-4 leading-7">{selectedReport.summary}</p>
              </div>
              <div className="space-y-3">
                {selectedReport.details.map((detail) => (
                  <div key={detail} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm text-[#374151]">{detail}</div>
                ))}
              </div>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}