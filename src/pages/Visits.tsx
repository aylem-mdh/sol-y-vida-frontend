import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import VisitsTable from "../components/dashboard/VisitsTable";
import VisitForm from "../components/dashboard/VisitForm";
import Modal from "../components/ui/Modal";
import WorkerVisitActionCard from "../components/dashboard/WorkerVisitActionCard";
import { deleteVisit, finishVisit, getVisits, startVisit, type Visit } from "../services/visitService";
import {
  getCurrentCoordinates,
  getGeolocationErrorMessage,
  getVisitMutationErrorMessage,
} from "../services/visitCheckInService";

export default function Visits() {
  const { t, i18n } = useTranslation();
  const role = localStorage.getItem("role") === "worker" ? "worker" : "admin";
  const isAdmin = role === "admin";

  const [visits, setVisits] = useState<Visit[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [busyVisitId, setBusyVisitId] = useState<number | null>(null);

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
        if (!normalizedSearch) {
          return true;
        }

        const text = `${visit.cliente} ${visit.trabajador} ${visit.observaciones} ${visit.fecha}`.toLowerCase();
        return text.includes(normalizedSearch);
      })
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }, [search, visits]);

  function getVisitAddress(visit: Visit) {
    return (visit as Visit & { direccion?: string; address?: string }).direccion ?? (visit as Visit & { direccion?: string; address?: string }).address ?? "";
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

  async function handleStartVisit(id: number) {
    try {
      setBusyVisitId(id);
      const gps = await getCurrentCoordinates();
      await startVisit(id, gps);
      await loadVisits();
      alert(t("pages.visits.startSuccess"));
    } catch (error) {
      console.error(error);
      const isLocationError = error instanceof GeolocationPositionError || (error instanceof Error && error.message === "gps_not_supported");
      const message = isLocationError
        ? getGeolocationErrorMessage(error, t)
        : getVisitMutationErrorMessage(error, "start", t);
      alert(message);
    } finally {
      setBusyVisitId(null);
    }
  }

  async function handleFinishVisit(id: number, payload: Omit<Parameters<typeof finishVisit>[1], "latitude" | "longitude">) {
    try {
      setBusyVisitId(id);
      const gps = await getCurrentCoordinates();
      await finishVisit(id, {
        ...gps,
        ...payload,
      });
      await loadVisits();
      alert(t("pages.visits.finishSuccess"));
    } catch (error) {
      console.error(error);
      const isLocationError = error instanceof GeolocationPositionError || (error instanceof Error && error.message === "gps_not_supported");
      const message = isLocationError
        ? getGeolocationErrorMessage(error, t)
        : getVisitMutationErrorMessage(error, "finish", t);
      alert(message);
    } finally {
      setBusyVisitId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={isAdmin ? t("tables.visits.title") : t("pages.visits.mobileTitle")}
          subtitle={isAdmin ? t("tables.visits.subtitle") : t("pages.visits.subtitleWorker")}
          name={isAdmin ? t("profiles.adminName") : t("profiles.workerName")}
          role={isAdmin ? t("roles.admin") : t("roles.worker")}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("tables.visits.search")}
        />

        <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-5 shadow-[0_16px_40px_rgba(15,25,30,0.08)] sm:p-7">
          <div className="mb-6 flex justify-end">
            <button
              onClick={newVisit}
              disabled={!isAdmin}
              className="rounded-2xl bg-[#0F9E98] px-6 py-3 font-bold text-white transition duration-300 hover:bg-[#0B817C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              + {t("pages.visits.new")}
            </button>
          </div>

          {isAdmin ? (
            <VisitsTable
              visits={visibleVisits}
              onDelete={removeVisit}
              onEdit={editVisit}
              canEdit
              searchTerm={search}
              onSearchTermChange={setSearch}
              hideSearchInput
            />
          ) : (
            <div className="space-y-3">
              {visibleVisits.map((visit) => (
                <WorkerVisitActionCard
                  key={visit.id}
                  visit={visit}
                  address={getVisitAddress(visit)}
                  language={i18n.language}
                  busy={busyVisitId === visit.id}
                  onStart={handleStartVisit}
                  onFinish={handleFinishVisit}
                />
              ))}

              {visibleVisits.length === 0 && (
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-sm text-[#4B5563]">
                  {t("pages.visits.noAssignedVisits")}
                </div>
              )}
            </div>
          )}
        </section>

        <Modal
          open={showModal}
          title={selectedVisit ? t("pages.visits.edit") : t("pages.visits.new")}
          onClose={closeModal}
        >
          <VisitForm
            key={selectedVisit?.id ?? "new-visit"}
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
