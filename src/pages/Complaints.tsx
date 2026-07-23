import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import {
  createComplaint,
  getComplaints,
  resolveComplaint,
  type Complaint,
} from "../services/complaintService";
import { useTranslation } from "react-i18next";

type Role = "admin" | "worker" | "family";
type StatusOption = "Pendiente" | "En proceso" | "Resuelta";

export default function Complaints() {
  const { t, i18n } = useTranslation();
  const role = (localStorage.getItem("role") as Role) || "admin";
  const isAdmin = role === "admin";

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ category: "Sugerencia", subject: "", description: "" });
  const [statusMap, setStatusMap] = useState<Record<number, StatusOption>>({});
  const [responseMap, setResponseMap] = useState<Record<number, string>>({});

  function normalizeStatus(status: string): StatusOption {
    const value = status.trim().toLowerCase();

    if (["resuelta", "resolved", "resolue", "gelost"].includes(value)) {
      return "Resuelta";
    }

    if (["en proceso", "in progress", "en cours", "in bearbeitung"].includes(value)) {
      return "En proceso";
    }

    return "Pendiente";
  }

  function getStatusLabel(status: StatusOption) {
    if (status === "Resuelta") {
      return t("complaintsPage.status.resolved");
    }

    if (status === "En proceso") {
      return t("complaintsPage.status.inProgress");
    }

    return t("complaintsPage.status.pending");
  }

  useEffect(() => {
    loadComplaints();
  }, []);

  async function loadComplaints() {
    try {
      const data = await getComplaints();
      const sorted = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setComplaints(sorted);
    } catch (error) {
      console.error(error);
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return complaints.filter((complaint) => `${complaint.category} ${complaint.subject} ${complaint.description} ${complaint.status}`.toLowerCase().includes(q));
  }, [complaints, search]);

  async function submitComplaint() {
    if (!form.subject.trim() || !form.description.trim()) {
      alert(t("complaintsPage.errors.required"));
      return;
    }

    try {
      await createComplaint(form);
      setForm({ category: "Sugerencia", subject: "", description: "" });
      await loadComplaints();
    } catch (error) {
      console.error(error);
      alert(t("complaintsPage.errors.send"));
    }
  }

  async function updateComplaint(complaint: Complaint) {
    const selectedStatus = statusMap[complaint.id] ?? normalizeStatus(complaint.status);
    const notes = (responseMap[complaint.id] ?? complaint.resolutionNotes ?? "").trim();

    if (!notes) {
      alert(t("complaintsPage.errors.responseRequired"));
      return;
    }

    try {
      await resolveComplaint(complaint.id, { status: selectedStatus, resolutionNotes: notes });
      await loadComplaints();
    } catch (error) {
      console.error(error);
      alert(t("complaintsPage.errors.update"));
    }
  }

  function formatDate(value: string) {
    const locale = i18n.language === "es" ? "es-ES" : i18n.language === "fr" ? "fr-FR" : i18n.language === "de" ? "de-DE" : "en-US";
    return new Date(value).toLocaleString(locale);
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("sidebar.complaints")}
          subtitle={t("complaintsPage.subtitle")}
          name={role === "admin" ? t("profiles.adminName") : role === "worker" ? t("profiles.workerName") : t("profiles.familyName")}
          role={role === "admin" ? t("roles.admin") : role === "worker" ? t("roles.worker") : t("roles.family")}
          notificationPath="/notifications"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("complaintsPage.searchPlaceholder")}
        />

        {!isAdmin && (
          <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <h2 className="text-xl font-bold text-[#1F2937]">{t("complaintsPage.newConversation")}</h2>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <select
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                className="rounded-xl border border-[#D7E5E3] px-4 py-3"
              >
                <option>{t("complaintsPage.categories.suggestion")}</option>
                <option>{t("complaintsPage.categories.complaint")}</option>
                <option>{t("complaintsPage.categories.quality")}</option>
              </select>
              <input
                value={form.subject}
                onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
                placeholder={t("complaintsPage.subject")}
                className="rounded-xl border border-[#D7E5E3] px-4 py-3"
              />
              <textarea
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                rows={5}
                placeholder={t("complaintsPage.description")}
                className="rounded-xl border border-[#D7E5E3] px-4 py-3"
              />
            </div>
            <button onClick={submitComplaint} className="mt-4 rounded-2xl bg-[#0F9E98] px-5 py-3 font-semibold text-white">
              {t("complaintsPage.send")}
            </button>
          </section>
        )}

        <section className="mt-6 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
          <h2 className="text-xl font-bold text-[#1F2937]">{isAdmin ? t("complaintsPage.adminInbox") : t("complaintsPage.history")}</h2>

          <div className="mt-4 space-y-3">
            {filtered.map((complaint) => {
              const status = statusMap[complaint.id] ?? normalizeStatus(complaint.status);
              const statusClass =
                status === "Resuelta"
                  ? "bg-[#ECFAF8] text-[#0F9E98]"
                  : status === "En proceso"
                  ? "bg-[#EFF6FF] text-[#1D4ED8]"
                  : "bg-[#FFF5E8] text-[#9A5A13]";

              return (
                <article key={complaint.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#1F2937]">{complaint.category} · {complaint.subject}</p>
                      <p className="mt-2 text-sm text-[#4B5563]">{complaint.description}</p>
                      <p className="mt-2 text-xs text-[#6B7280]">{formatDate(complaint.createdAt)}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass}`}>
                      {getStatusLabel(status)}
                    </span>
                  </div>

                  {(complaint.resolutionNotes || responseMap[complaint.id]) && (
                    <div className="mt-3 rounded-xl border border-[#D7E5E3] bg-white px-3 py-2.5 text-sm text-[#4B5563]">
                      <span className="font-semibold text-[#1F2937]">{t("complaintsPage.responseLabel")}: </span>
                      {responseMap[complaint.id] ?? complaint.resolutionNotes}
                    </div>
                  )}

                  {isAdmin && (
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[200px_1fr_auto]">
                      <select
                        value={status}
                        onChange={(event) =>
                          setStatusMap((current) => ({
                            ...current,
                            [complaint.id]: event.target.value as StatusOption,
                          }))
                        }
                        className="rounded-xl border border-[#D7E5E3] px-4 py-3"
                      >
                        <option value="Pendiente">{t("complaintsPage.status.pending")}</option>
                        <option value="En proceso">{t("complaintsPage.status.inProgress")}</option>
                        <option value="Resuelta">{t("complaintsPage.status.resolved")}</option>
                      </select>
                      <input
                        value={responseMap[complaint.id] ?? complaint.resolutionNotes ?? ""}
                        onChange={(event) =>
                          setResponseMap((current) => ({
                            ...current,
                            [complaint.id]: event.target.value,
                          }))
                        }
                        placeholder={t("complaintsPage.responsePlaceholder")}
                        className="rounded-xl border border-[#D7E5E3] px-4 py-3"
                      />
                      <button
                        onClick={() => updateComplaint(complaint)}
                        className="rounded-2xl bg-[#0F9E98] px-5 py-3 font-semibold text-white"
                      >
                        {t("complaintsPage.save")}
                      </button>
                    </div>
                  )}
                </article>
              );
            })}

            {filtered.length === 0 && (
              <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-sm text-[#4B5563]">
                {t("complaintsPage.noResults")}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
