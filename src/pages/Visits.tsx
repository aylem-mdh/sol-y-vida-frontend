import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import VisitsTable from "../components/dashboard/VisitsTable";
import VisitForm from "../components/dashboard/VisitForm";
import Modal from "../components/ui/Modal";
import { deleteVisit, finishVisit, getVisits, startVisit, type Visit } from "../services/visitService";
import { getCurrentUserIdFromToken } from "../utils/authClaims";

function getLocale(language: string) {
  return language === "es" ? "es-ES" : language === "fr" ? "fr-FR" : language === "de" ? "de-DE" : "en-US";
}

function formatDateTime(value: string, language: string) {
  return new Intl.DateTimeFormat(getLocale(language), {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function Visits() {
  const { t, i18n } = useTranslation();
  const role = localStorage.getItem("role") === "worker" ? "worker" : "admin";
  const isAdmin = role === "admin";
  const currentWorkerId = getCurrentUserIdFromToken();

  const [visits, setVisits] = useState<Visit[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [selectedVisitId, setSelectedVisitId] = useState<number | null>(null);
  const [checklist, setChecklist] = useState({
    hygieneCompleted: false,
    medicationCompleted: false,
    nutritionCompleted: false,
    mobilityCompleted: false,
    assistanceReport: "",
    careNotes: "",
  });

  useEffect(() => {
    loadVisits();
  }, []);

  async function loadVisits() {
    try {
      setVisits(await getVisits());
    } catch (error) {
      console.error(error);
    }
  }

  const visibleVisits = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return visits
      .filter((visit) => {
        if (role === "worker" && currentWorkerId != null && visit.workerId !== currentWorkerId) {
          return false;
        }

        if (!normalizedSearch) {
          return true;
        }

        const text = `${visit.cliente} ${visit.trabajador} ${visit.observaciones} ${visit.fecha}`.toLowerCase();
        return text.includes(normalizedSearch);
      })
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }, [currentWorkerId, role, search, visits]);

  function getVisitAddress(visit: Visit) {
    return (visit as Visit & { direccion?: string; address?: string }).direccion ?? (visit as Visit & { direccion?: string; address?: string }).address ?? "";
  }

  function getStatusLabel(visit: Visit) {
    const status = (visit.estado ?? t("pages.visits.scheduled")).trim();
    return status.length > 0 ? status : t("pages.visits.scheduled");
  }

  async function removeVisit(id: number) {
    if (!window.confirm(t("crud.confirmDeleteVisit"))) {
      return;
    }

    try {
      await deleteVisit(id);
      setVisits((current) => current.filter((visit) => visit.id !== id));
    } catch (error) {
      console.error(error);
      alert(t("crud.errors.deleteVisit"));
    }
  }

  function newVisit() {
    if (isAdmin) {
      setSelectedVisit(null);
      setShowModal(true);
    }
  }

  function editVisit(visit: Visit) {
    if (isAdmin) {
      setSelectedVisit(visit);
      setShowModal(true);
    }
  }

  function closeModal() {
    setSelectedVisit(null);
    setShowModal(false);
  }

  async function locateCoordinates() {
    return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalización no disponible"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }

  async function handleStartVisit(id: number) {
    try {
      const gps = await locateCoordinates();
      await startVisit(id, gps);
      setSelectedVisitId(id);
      await loadVisits();
    } catch (error) {
      console.error(error);
      alert(t("pages.visits.startError"));
    }
  }

  async function handleFinishVisit(id: number) {
    try {
      const gps = await locateCoordinates();
      await finishVisit(id, {
        ...gps,
        ...checklist,
        visibleToFamily: true,
      });

      setChecklist({
        hygieneCompleted: false,
        medicationCompleted: false,
        nutritionCompleted: false,
        mobilityCompleted: false,
        assistanceReport: "",
        careNotes: "",
      });
      setSelectedVisitId(null);
      await loadVisits();
      alert(t("pages.visits.finishSuccess"));
    } catch (error) {
      console.error(error);
      alert(t("pages.visits.finishError"));
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("pages.visits.mobileTitle")}
          subtitle={isAdmin ? t("pages.visits.subtitleAdmin") : t("pages.visits.subtitleWorker")}
          name={isAdmin ? t("profiles.adminName") : t("profiles.workerName")}
          role={isAdmin ? t("roles.admin") : t("roles.worker")}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("tables.visits.search")}
        />

        <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-5 shadow-[0_16px_40px_rgba(15,25,30,0.08)] sm:p-7">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">{t("pages.visits.mobileTitle")}</h2>

            <button
              onClick={newVisit}
              disabled={!isAdmin}
              className="rounded-2xl bg-[#0F9E98] px-6 py-3 font-bold text-white transition duration-300 hover:bg-[#0B817C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              + {t("pages.visits.new")}
            </button>
          </div>

          <VisitsTable
            visits={visibleVisits}
            onDelete={removeVisit}
            onEdit={editVisit}
            canEdit={isAdmin}
            searchTerm={search}
            onSearchTermChange={setSearch}
            hideSearchInput
          />
        </section>

        {!isAdmin && (
          <section className="mt-6 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7 md:hidden">
            <h3 className="text-xl font-bold text-[#1F2937]">{t("pages.visits.mobileTitle")}</h3>

            <div className="mt-4 space-y-3">
              {visibleVisits.map((visit) => {
                const isOpen = selectedVisitId === visit.id;
                const address = getVisitAddress(visit);
                const canStart = !visit.startedAt;
                const canFinish = Boolean(visit.startedAt) && !visit.endedAt;

                return (
                  <article key={visit.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[#1F2937]">{visit.cliente}</p>
                        <p className="mt-1 text-sm text-[#4B5563]">{formatDateTime(visit.fecha, i18n.language)}</p>
                        <p className="mt-1 text-xs font-semibold text-[#0F9E98]">
                          {t("pages.visits.status")}: {getStatusLabel(visit)}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col gap-2">
                        {canStart && (
                          <button
                            onClick={() => handleStartVisit(visit.id)}
                            className="rounded-xl border border-[#D8EFEA] bg-white px-3 py-2 text-xs font-semibold text-[#1F2937]"
                          >
                            {t("pages.visits.startVisit")}
                          </button>
                        )}
                        {canFinish && (
                          <button
                            onClick={() => setSelectedVisitId(isOpen ? null : visit.id)}
                            className="rounded-xl bg-[#0F9E98] px-3 py-2 text-xs font-semibold text-white"
                          >
                            {isOpen ? t("pages.visits.details") : t("pages.visits.finishVisit")}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-[#4B5563]">
                      {visit.startedAt && (
                        <p>
                          <span className="font-semibold text-[#1F2937]">{t("pages.visits.startedAt")}:</span> {formatDateTime(visit.startedAt, i18n.language)}
                        </p>
                      )}
                      {visit.endedAt && (
                        <p>
                          <span className="font-semibold text-[#1F2937]">{t("pages.visits.endedAt")}:</span> {formatDateTime(visit.endedAt, i18n.language)}
                        </p>
                      )}
                      {address && (
                        <p className="break-words">
                          <span className="font-semibold text-[#1F2937]">{t("pages.visits.address")}:</span> {address}
                        </p>
                      )}
                      {visit.observaciones && (
                        <p className="break-words">
                          <span className="font-semibold text-[#1F2937]">{t("pages.visits.notes")}:</span> {visit.observaciones}
                        </p>
                      )}
                    </div>

                    {isOpen && canFinish && (
                      <div className="mt-4 grid grid-cols-1 gap-3">
                        <label className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={checklist.hygieneCompleted}
                            onChange={(event) => setChecklist((current) => ({ ...current, hygieneCompleted: event.target.checked }))}
                          />
                          {t("pages.visits.hygiene")}
                        </label>
                        <label className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={checklist.medicationCompleted}
                            onChange={(event) => setChecklist((current) => ({ ...current, medicationCompleted: event.target.checked }))}
                          />
                          {t("pages.visits.medication")}
                        </label>
                        <label className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={checklist.nutritionCompleted}
                            onChange={(event) => setChecklist((current) => ({ ...current, nutritionCompleted: event.target.checked }))}
                          />
                          {t("pages.visits.nutrition")}
                        </label>
                        <label className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={checklist.mobilityCompleted}
                            onChange={(event) => setChecklist((current) => ({ ...current, mobilityCompleted: event.target.checked }))}
                          />
                          {t("pages.visits.mobility")}
                        </label>
                        <textarea
                          value={checklist.assistanceReport}
                          onChange={(event) => setChecklist((current) => ({ ...current, assistanceReport: event.target.value }))}
                          placeholder={t("pages.visits.reportRequired")}
                          className="rounded-xl border border-[#D7E5E3] px-4 py-3"
                          rows={3}
                        />
                        <textarea
                          value={checklist.careNotes}
                          onChange={(event) => setChecklist((current) => ({ ...current, careNotes: event.target.value }))}
                          placeholder={t("pages.visits.optionalNotes")}
                          className="rounded-xl border border-[#D7E5E3] px-4 py-3"
                          rows={2}
                        />
                        <button
                          onClick={() => handleFinishVisit(visit.id)}
                          className="rounded-2xl bg-[#0F9E98] px-4 py-3 font-semibold text-white"
                        >
                          {t("pages.visits.saveAndFinish")}
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}

              {visibleVisits.length === 0 && (
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-sm text-[#4B5563]">
                  {t("pages.visits.noAssignedVisits")}
                </div>
              )}
            </div>
          </section>
        )}

        <Modal
          open={showModal}
          title={selectedVisit ? t("pages.visits.edit") : t("pages.visits.new")}
          onClose={closeModal}
        >
          <VisitForm
            visit={selectedVisit}
            onSaved={async () => {
              await loadVisits();
              closeModal();
            }}
          />
        </Modal>
      </main>
    </div>
  );
}
