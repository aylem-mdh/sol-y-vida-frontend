import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import {
  closeMaintenanceTicket,
  createMaintenanceTicket,
  getMaintenanceTickets,
  type MaintenanceTicket,
} from "../services/maintenanceService";
import { getClients } from "../services/clientService";
import { useTranslation } from "react-i18next";

type Role = "admin" | "worker";
type ClientOption = { id: number; nombre: string; apellidos: string };

const AREA_OPTIONS = [
  "Fontanería",
  "Electricidad",
  "Cerrajería",
  "Climatización",
  "Mantenimiento general",
  "Limpieza extraordinaria",
  "Otros",
];

type CloseDraft = {
  afterPhotoUrl: string;
  technicalReport: string;
};

function toDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Maintenance() {
  const { t } = useTranslation();
  const role = (localStorage.getItem("role") === "worker" ? "worker" : "admin") as Role;
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ clientId: 0, area: AREA_OPTIONS[0], description: "", beforePhotoUrl: "" });
  const [closeMap, setCloseMap] = useState<Record<number, CloseDraft>>({});

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    const [ticketData, clientData] = await Promise.all([getMaintenanceTickets(), getClients()]);
    setTickets(ticketData);
    setClients(clientData);
    if (clientData.length > 0) {
      setForm((current) => ({ ...current, clientId: current.clientId || clientData[0].id }));
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return tickets
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .filter((ticket) => `${ticket.cliente} ${ticket.area} ${ticket.description}`.toLowerCase().includes(q));
  }, [tickets, search]);

  async function createTicket() {
    if (!form.clientId || !form.area.trim() || !form.description.trim()) {
      alert(t("maintenancePage.errors.required"));
      return;
    }

    await createMaintenanceTicket(form);
    setForm((current) => ({ ...current, area: AREA_OPTIONS[0], description: "", beforePhotoUrl: "" }));
    await loadAll();
  }

  async function closeTicket(id: number) {
    const payload = closeMap[id];
    if (!payload?.technicalReport?.trim()) {
      alert(t("maintenancePage.errors.reportRequired"));
      return;
    }

    await closeMaintenanceTicket(id, payload);
    await loadAll();
  }

  async function setBeforePhoto(file: File | null) {
    if (!file) {
      setForm((current) => ({ ...current, beforePhotoUrl: "" }));
      return;
    }

    const dataUrl = await toDataUrl(file);
    setForm((current) => ({ ...current, beforePhotoUrl: dataUrl }));
  }

  async function setAfterPhoto(id: number, file: File | null) {
    if (!file) {
      setCloseMap((current) => ({
        ...current,
        [id]: {
          afterPhotoUrl: "",
          technicalReport: current[id]?.technicalReport ?? "",
        },
      }));
      return;
    }

    const dataUrl = await toDataUrl(file);
    setCloseMap((current) => ({
      ...current,
      [id]: {
        afterPhotoUrl: dataUrl,
        technicalReport: current[id]?.technicalReport ?? "",
      },
    }));
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("maintenancePage.title")}
          subtitle={t("maintenancePage.subtitle")}
          name={role === "admin" ? t("profiles.adminName") : t("profiles.workerName")}
          role={role === "admin" ? t("roles.admin") : t("roles.worker")}
          notificationPath="/notifications"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("maintenancePage.searchPlaceholder")}
        />

        <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
          <h2 className="text-xl font-bold text-[#1F2937]">{t("maintenancePage.newTicket")}</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <select value={form.clientId} onChange={(event) => setForm((current) => ({ ...current, clientId: Number(event.target.value) }))} className="rounded-xl border border-[#D7E5E3] px-4 py-3">
              {clients.map((client) => <option key={client.id} value={client.id}>{client.nombre} {client.apellidos}</option>)}
            </select>
            <select value={form.area} onChange={(event) => setForm((current) => ({ ...current, area: event.target.value }))} className="rounded-xl border border-[#D7E5E3] px-4 py-3">
              {AREA_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <input value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder={t("forms.common.description")} className="rounded-xl border border-[#D7E5E3] px-4 py-3" />
          </div>

          <div className="mt-4 rounded-2xl border border-[#D7E5E3] bg-[#FAFDFC] p-4">
            <p className="text-sm font-semibold text-[#1F2937]">{t("maintenancePage.beforePhoto")}</p>
            <input
              type="file"
              accept="image/*"
              className="mt-2 w-full text-sm"
              onChange={(event) => {
                void setBeforePhoto(event.target.files?.[0] ?? null);
              }}
            />
            {form.beforePhotoUrl && (
              <img src={form.beforePhotoUrl} alt={t("maintenancePage.before")} className="mt-3 h-36 w-full rounded-xl object-cover" />
            )}
          </div>

          <button onClick={createTicket} className="mt-4 rounded-2xl bg-[#0F9E98] px-5 py-3 font-semibold text-white">{t("maintenancePage.createTicket")}</button>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
          <h2 className="text-xl font-bold text-[#1F2937]">{t("maintenancePage.history")}</h2>

          <div className="mt-4 space-y-3">
            {filtered.map((ticket) => (
              <article key={ticket.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-[#1F2937]">{ticket.cliente} · {ticket.area}</p>
                      <p className="mt-1 text-sm text-[#4B5563]">{ticket.description}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${ticket.status === "Cerrado" ? "bg-[#ECFAF8] text-[#0F9E98]" : "bg-[#FFF5E8] text-[#9A5A13]"}`}>
                      {ticket.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-[#D7E5E3] bg-white p-3">
                      <p className="text-xs font-semibold text-[#6B7280]">{t("maintenancePage.before")}</p>
                      {ticket.beforePhotoUrl ? (
                        <img src={ticket.beforePhotoUrl} alt={t("maintenancePage.before")} className="mt-2 h-32 w-full rounded-lg object-cover" />
                      ) : (
                        <p className="mt-2 text-sm text-[#4B5563]">{t("maintenancePage.noneAttached")}</p>
                      )}
                    </div>
                    <div className="rounded-xl border border-[#D7E5E3] bg-white p-3">
                      <p className="text-xs font-semibold text-[#6B7280]">{t("maintenancePage.after")}</p>
                      {ticket.afterPhotoUrl ? (
                        <img src={ticket.afterPhotoUrl} alt={t("maintenancePage.after")} className="mt-2 h-32 w-full rounded-lg object-cover" />
                      ) : (
                        <p className="mt-2 text-sm text-[#4B5563]">{t("maintenancePage.pending")}</p>
                      )}
                    </div>
                  </div>

                  {ticket.status !== "Cerrado" ? (
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div className="rounded-xl border border-[#D7E5E3] bg-white p-3">
                        <p className="text-sm font-semibold text-[#1F2937]">{t("maintenancePage.afterPhoto")}</p>
                        <input
                          type="file"
                          accept="image/*"
                          className="mt-2 w-full text-sm"
                          onChange={(event) => {
                            void setAfterPhoto(ticket.id, event.target.files?.[0] ?? null);
                          }}
                        />
                        {closeMap[ticket.id]?.afterPhotoUrl && (
                          <img src={closeMap[ticket.id].afterPhotoUrl} alt={t("maintenancePage.after")} className="mt-3 h-32 w-full rounded-lg object-cover" />
                        )}
                      </div>
                      <div className="space-y-3">
                        <input
                          value={closeMap[ticket.id]?.technicalReport ?? ""}
                          onChange={(event) =>
                            setCloseMap((current) => ({
                              ...current,
                              [ticket.id]: {
                                afterPhotoUrl: current[ticket.id]?.afterPhotoUrl ?? "",
                                technicalReport: event.target.value,
                              },
                            }))
                          }
                          placeholder={t("maintenancePage.technicalReport")}
                          className="w-full rounded-xl border border-[#D7E5E3] px-4 py-3"
                        />
                        <button onClick={() => closeTicket(ticket.id)} className="w-full rounded-2xl bg-[#0F9E98] px-4 py-3 font-semibold text-white">
                          {t("maintenancePage.closeTicket")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-[#4B5563]">{t("maintenancePage.report")}: {ticket.technicalReport}</p>
                  )}
                </div>
              </article>
            ))}
            {filtered.length === 0 && <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-sm text-[#4B5563]">{t("maintenancePage.noResults")}</div>}
          </div>
        </section>
      </main>
    </div>
  );
}
