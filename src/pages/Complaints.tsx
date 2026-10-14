import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import {
  addComplaintMessage,
  createComplaint,
  getComplaints,
  resolveComplaint,
  type Complaint,
} from "../services/complaintService";
import { useTranslation } from "react-i18next";

type Role = "admin" | "worker" | "family" | "client";
type StatusOption = "Pendiente" | "En revision" | "Respondida" | "Resuelta" | "Cerrada";

export default function Complaints() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const role = (localStorage.getItem("role") as Role) || "admin";
  const isAdmin = role === "admin";
  const isMessagesView = location.pathname.startsWith("/family/messages");
  const selectedComplaintId = Number(new URLSearchParams(location.search).get("id"));

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ category: "Sugerencia", subject: "", description: "" });
  const [statusMap, setStatusMap] = useState<Record<number, StatusOption>>({});
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const complaintRefs = useRef<Record<number, HTMLElement | null>>({});

  function normalizeStatus(status: string): StatusOption {
    const value = status.trim().toLowerCase();

    if (["cerrada", "closed", "fermee", "geschlossen"].includes(value)) {
      return "Cerrada";
    }

    if (["resuelta", "resolved", "resolue", "gelost"].includes(value)) {
      return "Resuelta";
    }

    if (["respondida", "answered", "repondu", "beantwortet"].includes(value)) {
      return "Respondida";
    }

    if (["en revision", "in review", "en revision", "in pruefung"].includes(value)) {
      return "En revision";
    }

    return "Pendiente";
  }

  function getStatusLabel(status: StatusOption) {
    if (status === "Resuelta") {
      return t("complaintsPage.status.resolved");
    }

    if (status === "Respondida") {
      return t("complaintsPage.status.answered");
    }

    if (status === "En revision") {
      return t("complaintsPage.status.inReview");
    }

    if (status === "Cerrada") {
      return t("complaintsPage.status.closed");
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
    return complaints.filter((complaint) => {
      const messagesText = complaint.messages?.map((message) => `${message.sentByName} ${message.message}`).join(" ") ?? "";
      return `${complaint.category} ${complaint.subject} ${complaint.description} ${complaint.status} ${messagesText}`.toLowerCase().includes(q);
    });
  }, [complaints, search]);

  useEffect(() => {
    if (!Number.isFinite(selectedComplaintId)) {
      return;
    }

    const target = complaintRefs.current[selectedComplaintId];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [filtered, selectedComplaintId]);

  async function submitComplaint() {
    try {
      if (selectedConversationId !== null) {
        if (!form.description.trim()) {
          alert(t("complaintsPage.errors.messageRequired"));
          return;
        }

        await addComplaintMessage(selectedConversationId, { message: form.description.trim() });
        setForm((current) => ({ ...current, description: "" }));
      } else {
        if (isAdmin) {
          return;
        }

        if (!form.subject.trim() || !form.description.trim()) {
          alert(t("complaintsPage.errors.required"));
          return;
        }

        const created = await createComplaint(form);
        setSelectedConversationId(created.id);
        setForm((current) => ({ ...current, subject: created.subject, description: "" }));
      }
      await loadComplaints();
    } catch (error) {
      console.error(error);
      alert(t("complaintsPage.errors.send"));
    }
  }

  async function updateComplaint(complaint: Complaint) {
    const selectedStatus = statusMap[complaint.id] ?? normalizeStatus(complaint.status);

    try {
      await resolveComplaint(complaint.id, { status: selectedStatus, resolutionNotes: complaint.resolutionNotes ?? "" });
      await loadComplaints();
    } catch (error) {
      console.error(error);
      alert(t("complaintsPage.errors.update"));
    }
  }

  function selectConversation(complaint: Complaint) {
    setSelectedConversationId(complaint.id);
    setForm({ category: complaint.category, subject: complaint.subject, description: "" });
  }

  function startNewConversation() {
    setSelectedConversationId(null);
    setForm({ category: "Sugerencia", subject: "", description: "" });
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
          title={isMessagesView ? t("sidebar.messages") : t("sidebar.complaints")}
          subtitle={t("complaintsPage.subtitle")}
          name={role === "admin" ? t("profiles.adminName") : role === "worker" ? t("profiles.workerName") : t("profiles.familyName")}
          role={role === "admin" ? t("roles.admin") : role === "worker" ? t("roles.worker") : role === "client" ? t("roles.client") : t("roles.family")}
          notificationPath="/notifications"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("complaintsPage.searchPlaceholder")}
        />

        {(!isAdmin || selectedConversationId !== null) && (
          <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#1F2937]">
                {selectedConversationId === null ? t("complaintsPage.newConversation") : t("complaintsPage.replyingTo", { subject: form.subject })}
              </h2>
                {!isAdmin && selectedConversationId !== null && (
                <button type="button" onClick={startNewConversation} className="text-sm font-semibold text-[#0F817C]">
                  {t("complaintsPage.startAnother")}
                </button>
              )}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3">
              {!isAdmin && selectedConversationId === null && (
                <>
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
                </>
              )}
              <textarea
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                rows={5}
                placeholder={selectedConversationId === null ? t("complaintsPage.description") : t("complaintsPage.messagePlaceholder")}
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
                status === "Resuelta" || status === "Cerrada"
                  ? "bg-[#ECFAF8] text-[#0F9E98]"
                  : status === "Respondida" || status === "En revision"
                  ? "bg-[#EFF6FF] text-[#1D4ED8]"
                  : "bg-[#FFF5E8] text-[#9A5A13]";

              return (
                <article
                  key={complaint.id}
                  ref={(element) => {
                    complaintRefs.current[complaint.id] = element;
                  }}
                  className={`rounded-2xl border bg-[#FAFDFC] p-4 ${complaint.id === selectedComplaintId ? "border-[#0F9E98] ring-2 ring-[#0F9E98]/20" : "border-[#E3F2EF]"}`}
                >
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

                  <div className="mt-3 space-y-2 rounded-xl border border-[#D7E5E3] bg-white px-3 py-3">
                    {(complaint.messages ?? []).map((item) => (
                      <div key={item.id} className="rounded-lg border border-[#EEF4F2] bg-[#FAFDFC] px-3 py-2 text-sm">
                        <p className="font-semibold text-[#1F2937]">{item.sentByName} <span className="font-normal text-[#6B7280]">({item.sentByRole})</span></p>
                        <p className="mt-1 text-[#374151]">{item.message}</p>
                        <p className="mt-1 text-xs text-[#6B7280]">{formatDate(item.createdAt)}</p>
                      </div>
                    ))}
                    {(complaint.messages ?? []).length === 0 && (
                      <p className="text-sm text-[#6B7280]">{t("complaintsPage.threadEmpty")}</p>
                    )}
                  </div>

                  {complaint.resolutionNotes && (
                    <div className="mt-3 rounded-xl border border-[#D7E5E3] bg-white px-3 py-2.5 text-sm text-[#4B5563]">
                      <span className="font-semibold text-[#1F2937]">{t("complaintsPage.responseLabel")}: </span>
                      {complaint.resolutionNotes}
                    </div>
                  )}

                  {isAdmin && (
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
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
                        <option value="En revision">{t("complaintsPage.status.inReview")}</option>
                        <option value="Respondida">{t("complaintsPage.status.answered")}</option>
                        <option value="Resuelta">{t("complaintsPage.status.resolved")}</option>
                        <option value="Cerrada">{t("complaintsPage.status.closed")}</option>
                      </select>
                      <button
                        onClick={() => updateComplaint(complaint)}
                        className="rounded-2xl bg-[#0F9E98] px-5 py-3 font-semibold text-white"
                      >
                        {t("complaintsPage.updateStatus")}
                      </button>
                    </div>
                  )}

                  {selectedConversationId !== complaint.id && (
                    <button
                      type="button"
                      onClick={() => selectConversation(complaint)}
                      className="mt-3 rounded-xl border border-[#D8EFEA] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937]"
                    >
                      {t("complaintsPage.openConversation")}
                    </button>
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
