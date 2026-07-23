import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import VisitsTable from "../components/dashboard/VisitsTable";
import VisitForm from "../components/dashboard/VisitForm";
import Modal from "../components/ui/Modal";

import {
  finishVisit,
  getVisits,
  deleteVisit,
  startVisit,
  type Visit,
} from "../services/visitService";

export default function Visits() {
  const { t, i18n } = useTranslation();
  const role = localStorage.getItem("role") === "worker" ? "worker" : "admin";
  const isAdmin = role === "admin";
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
      const data = await getVisits();
      setVisits(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeVisit(id: number) {
    if (!window.confirm(t("crud.confirmDeleteVisit")))
      return;

    try {
      await deleteVisit(id);

      setVisits((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error(error);
      alert(t("crud.errors.deleteVisit"));
    }
  }

  function newVisit() {
    if (!isAdmin) {
      return;
    }

    setSelectedVisit(null);
    setShowModal(true);
  }

  function editVisit(visit: Visit) {
    if (!isAdmin) {
      return;
    }

    setSelectedVisit(visit);
    setShowModal(true);
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
          title={t("pages.visits.title")}
          subtitle={isAdmin ? t("pages.visits.subtitleAdmin") : t("pages.visits.subtitleWorker")}
          name={isAdmin ? "Carmen López" : "María García"}
          role={isAdmin ? t("roles.admin") : t("roles.worker")}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("tables.visits.search")}
        />

        <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-5 shadow-[0_16px_40px_rgba(15,25,30,0.08)] sm:p-7">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">
              {t("pages.visits.title")}
            </h2>

            <button
              onClick={newVisit}
              disabled={!isAdmin}
              className="rounded-2xl bg-[#0F9E98] px-6 py-3 font-bold text-white transition duration-300 hover:bg-[#0B817C]"
            >
              + {t("pages.visits.new")}
            </button>
          </div>

          <VisitsTable
            visits={visits}
            onDelete={removeVisit}
            onEdit={editVisit}
            canEdit={isAdmin}
            searchTerm={search}
            onSearchTermChange={setSearch}
            hideSearchInput
          />
        </section>

        {!isAdmin && (
          <section className="mt-6 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <h3 className="text-xl font-bold text-[#1F2937]">{t("pages.visits.operation")}</h3>
            <div className="mt-4 space-y-3">
              {visits.slice(0, 5).map((visit) => (
                <article key={visit.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-[#1F2937]">{visit.cliente}</p>
                      <p className="text-sm text-[#4B5563]">{new Date(visit.fecha).toLocaleString(i18n.language === "es" ? "es-ES" : i18n.language === "fr" ? "fr-FR" : i18n.language === "de" ? "de-DE" : "en-US")}</p>
                      <p className="text-xs text-[#6B7280]">{t("tables.common.status")}: {visit.estado ?? t("pages.visits.scheduled")}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleStartVisit(visit.id)} className="rounded-xl border border-[#D8EFEA] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937]">{t("pages.visits.start")}</button>
                      <button onClick={() => setSelectedVisitId(visit.id)} className="rounded-xl bg-[#0F9E98] px-4 py-2 text-sm font-semibold text-white">{t("pages.visits.finish")}</button>
                    </div>
                  </div>

                  {selectedVisitId === visit.id && (
                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                      <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={checklist.hygieneCompleted} onChange={(e) => setChecklist((c) => ({ ...c, hygieneCompleted: e.target.checked }))} /> {t("pages.visits.hygiene")}</label>
                      <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={checklist.medicationCompleted} onChange={(e) => setChecklist((c) => ({ ...c, medicationCompleted: e.target.checked }))} /> {t("pages.visits.medication")}</label>
                      <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={checklist.nutritionCompleted} onChange={(e) => setChecklist((c) => ({ ...c, nutritionCompleted: e.target.checked }))} /> {t("pages.visits.nutrition")}</label>
                      <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={checklist.mobilityCompleted} onChange={(e) => setChecklist((c) => ({ ...c, mobilityCompleted: e.target.checked }))} /> {t("pages.visits.mobility")}</label>
                      <textarea
                        value={checklist.assistanceReport}
                        onChange={(e) => setChecklist((c) => ({ ...c, assistanceReport: e.target.value }))}
                        placeholder={t("pages.visits.reportRequired")}
                        className="rounded-xl border border-[#D7E5E3] px-4 py-3 md:col-span-2"
                        rows={3}
                      />
                      <textarea
                        value={checklist.careNotes}
                        onChange={(e) => setChecklist((c) => ({ ...c, careNotes: e.target.value }))}
                        placeholder={t("pages.visits.optionalNotes")}
                        className="rounded-xl border border-[#D7E5E3] px-4 py-3 md:col-span-2"
                        rows={2}
                      />
                      <button onClick={() => handleFinishVisit(visit.id)} className="rounded-2xl bg-[#0F9E98] px-4 py-3 font-semibold text-white md:col-span-2">{t("pages.visits.saveAndFinish")}</button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        <Modal
          open={showModal}
          title={
            selectedVisit
              ? t("pages.visits.edit")
              : t("pages.visits.new")
          }
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