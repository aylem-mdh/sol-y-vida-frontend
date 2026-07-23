import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CalendarClock, ClipboardList, Pencil, Trash2 } from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import Modal from "../components/ui/Modal";
import { getVisits, type Visit } from "../services/visitService";
import {
  createIncident,
  deleteIncident,
  getIncidents,
  updateIncident,
  type Incident,
} from "../services/incidentService";
import { useTranslation } from "react-i18next";

type DashboardRole = "admin" | "worker";

export default function Incidents() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const role = (localStorage.getItem("role") === "worker" ? "worker" : "admin") as DashboardRole;
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    visitId: 0,
    titulo: "",
    descripcion: "",
    fecha: new Date().toISOString().slice(0, 16),
    nivelGravedad: "Media",
  });

  useEffect(() => {
    loadIncidents();
    loadVisits();
  }, []);

  async function loadIncidents() {
    try {
      const data = await getIncidents();
      setIncidents(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadVisits() {
    try {
      const data = await getVisits();
      setVisits(data);
      if (data.length > 0) {
        setForm((current) => ({ ...current, visitId: current.visitId || data[0].id }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  function openNewIncident() {
    setSelectedIncident(null);
    setForm({
      visitId: visits[0]?.id ?? 0,
      titulo: "",
      descripcion: "",
      fecha: new Date().toISOString().slice(0, 16),
      nivelGravedad: "Media",
    });
    setShowModal(true);
  }

  function openEditIncident(incident: Incident) {
    setSelectedIncident(incident);
    setForm({
      visitId: incident.visitId,
      titulo: incident.titulo,
      descripcion: incident.descripcion,
      fecha: incident.fecha.slice(0, 16),
      nivelGravedad: incident.nivelGravedad ?? "Media",
    });
    setShowModal(true);
  }

  async function saveIncident() {
    try {
      const payload = {
        ...form,
        fecha: new Date(form.fecha).toISOString(),
      };

      if (selectedIncident) {
        await updateIncident(selectedIncident.id, payload);
      } else {
        await createIncident(payload);
      }

      await loadIncidents();
      setShowModal(false);
      setSelectedIncident(null);
    } catch (error) {
      console.error(error);
      alert(t("incidentsPage.errors.save"));
    }
  }

  async function removeIncident(id: number) {
    if (!window.confirm(t("incidentsPage.confirmDelete"))) {
      return;
    }

    try {
      await deleteIncident(id);
      setIncidents((current) => current.filter((incident) => incident.id !== id));
    } catch (error) {
      console.error(error);
      alert(t("incidentsPage.errors.delete"));
    }
  }

  const filteredIncidents = incidents.filter((incident) => {
    const text = `${incident.titulo} ${incident.descripcion} ${incident.cliente} ${incident.trabajador}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("sidebar.incidents")}
          subtitle={t("incidentsPage.subtitle")}
          name={role === "admin" ? t("profiles.adminName") : t("profiles.workerName")}
          role={role === "admin" ? t("roles.admin") : t("roles.worker")}
          notificationPath="/incidents"
        />

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1F2937]">{t("incidentsPage.registry")}</h2>
                <p className="mt-2 text-sm text-[#4B5563]">{t("incidentsPage.registryDescription")}</p>
              </div>
              <button
                onClick={openNewIncident}
                className="rounded-2xl bg-[#0F9E98] px-5 py-3 font-semibold text-white transition duration-300 hover:bg-[#0B817C]"
              >
                {t("incidentsPage.newIncident")}
              </button>
            </div>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("incidentsPage.searchPlaceholder")}
              className="mt-4 w-full rounded-xl border border-[#D7E5E3] px-4 py-3 sm:w-80"
            />

            <div className="mt-6 space-y-4">
              {filteredIncidents.length === 0 ? (
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-sm text-[#4B5563]">
                  {t("incidentsPage.noResults")}
                </div>
              ) : (
                filteredIncidents.map((incident) => (
                  <article key={incident.id} className="rounded-2xl border border-[#F6E4CB] bg-[#FFF9F1] p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#9A5A13]">{incident.nivelGravedad ?? t("incidentsPage.level.medium")}</p>
                        <h3 className="mt-1 text-lg font-bold text-[#1F2937]">{incident.titulo}</h3>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#9A5A13]">{new Date(incident.fecha).toLocaleDateString("es-ES")}</span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#374151]">{incident.descripcion}</p>
                    <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-[#4B5563] sm:grid-cols-2">
                      <p><span className="font-semibold text-[#1F2937]">{t("incidentsPage.client")}:</span> {incident.cliente}</p>
                      <p><span className="font-semibold text-[#1F2937]">{t("incidentsPage.professional")}:</span> {incident.trabajador}</p>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button onClick={() => openEditIncident(incident)} className="inline-flex items-center rounded-xl border border-[#D8EFEA] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937]"><Pencil className="mr-2 h-4 w-4 text-[#0F9E98]" />{t("tables.common.edit")}</button>
                      <button onClick={() => removeIncident(incident.id)} className="inline-flex items-center rounded-xl border border-[#F7D7AA] bg-[#FFF5E8] px-4 py-2 text-sm font-semibold text-[#9A5A13]"><Trash2 className="mr-2 h-4 w-4" />{t("tables.common.delete")}</button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </article>

          <article className="rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <h3 className="text-xl font-bold text-[#1F2937]">{t("incidentsPage.actionsTitle")}</h3>
            <div className="mt-5 space-y-3">
              <button
                onClick={() => navigate("/visits")}
                className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><CalendarClock className="h-4 w-4 text-[#0F9E98]" /> {t("incidentsPage.reviewVisits")}</span>
                <span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span>
              </button>
              <button
                onClick={() => navigate(role === "admin" ? "/clients" : "/worker#agenda")}
                className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><ClipboardList className="h-4 w-4 text-[#0F9E98]" /> {t("incidentsPage.careFollowup")}</span>
                <span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span>
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-[#F7D7AA] bg-[#FFF5E8] p-4 text-sm text-[#9A5A13]">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4" />
                <p>{t("incidentsPage.traceability")}</p>
              </div>
            </div>
          </article>
        </section>

        <Modal open={showModal} title={selectedIncident ? t("incidentsPage.editIncident") : t("incidentsPage.newIncident")} onClose={() => setShowModal(false)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-[#374151]">{t("incidentsPage.linkedVisit")}</span>
              <select value={form.visitId} onChange={(event) => setForm((current) => ({ ...current, visitId: Number(event.target.value) }))} className="w-full rounded-xl border border-[#D7E5E3] bg-white px-4 py-3.5 text-[#1F2937] outline-none">
                {visits.map((visit) => (
                  <option key={visit.id} value={visit.id}>{visit.cliente} · {visit.trabajador}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#374151]">{t("incidentsPage.titleLabel")}</span>
              <input value={form.titulo} onChange={(event) => setForm((current) => ({ ...current, titulo: event.target.value }))} className="w-full rounded-xl border border-[#D7E5E3] px-4 py-3.5" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#374151]">{t("incidentsPage.levelLabel")}</span>
              <select value={form.nivelGravedad} onChange={(event) => setForm((current) => ({ ...current, nivelGravedad: event.target.value }))} className="w-full rounded-xl border border-[#D7E5E3] px-4 py-3.5">
                <option value="Baja">{t("incidentsPage.level.low")}</option>
                <option value="Media">{t("incidentsPage.level.medium")}</option>
                <option value="Alta">{t("incidentsPage.level.high")}</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#374151]">{t("incidentsPage.date")}</span>
              <input type="datetime-local" value={form.fecha} onChange={(event) => setForm((current) => ({ ...current, fecha: event.target.value }))} className="w-full rounded-xl border border-[#D7E5E3] px-4 py-3.5" />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-[#374151]">{t("forms.common.description")}</span>
              <textarea value={form.descripcion} onChange={(event) => setForm((current) => ({ ...current, descripcion: event.target.value }))} rows={5} className="w-full rounded-xl border border-[#D7E5E3] px-4 py-3.5" />
            </label>
            <div className="md:col-span-2 flex justify-end">
              <button onClick={saveIncident} className="rounded-2xl bg-[#0F9E98] px-6 py-3 font-semibold text-white transition duration-300 hover:bg-[#0B817C]">{selectedIncident ? t("forms.common.saveChanges") : t("incidentsPage.createIncident")}</button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
}