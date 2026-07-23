import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import WorkersTable from "../components/dashboard/WorkersTable";
import WorkerForm from "../components/dashboard/WorkerForm";
import Modal from "../components/ui/Modal";

import {
  getWorkers,
  deleteWorker,
  type Worker,
} from "../services/workerService";

export default function Workers() {
  const { t } = useTranslation();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  useEffect(() => {
    loadWorkers();
  }, []);

  async function loadWorkers() {
    try {
      const data = await getWorkers();
      setWorkers(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeWorker(id: number) {
    if (!window.confirm(t("crud.confirmDeleteWorker")))
      return;

    try {
      await deleteWorker(id);

      setWorkers((prev) => prev.filter((w) => w.id !== id));
    } catch (error) {
      console.error(error);
      alert(t("crud.errors.deleteWorker"));
    }
  }

  function newWorker() {
    setSelectedWorker(null);
    setShowModal(true);
  }

  function editWorker(worker: Worker) {
    setSelectedWorker(worker);
    setShowModal(true);
  }

  function closeModal() {
    setSelectedWorker(null);
    setShowModal(false);
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role="admin" />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("pages.workers.title")}
          subtitle={t("pages.workers.subtitle")}
          name="Carmen López"
          role={t("roles.admin")}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("tables.workers.search")}
        />

        <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-5 shadow-[0_16px_40px_rgba(15,25,30,0.08)] sm:p-7">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">
              {t("pages.workers.title")}
            </h2>

            <button
              onClick={newWorker}
              className="rounded-2xl bg-[#0F9E98] px-6 py-3 font-bold text-white transition duration-300 hover:bg-[#0B817C]"
            >
              + {t("pages.workers.new")}
            </button>
          </div>

          <WorkersTable
            workers={workers}
            onDelete={removeWorker}
            onEdit={editWorker}
            searchTerm={search}
            onSearchTermChange={setSearch}
            hideSearchInput
          />
        </section>

        <Modal
          open={showModal}
          title={
            selectedWorker
              ? t("pages.workers.edit")
              : t("pages.workers.new")
          }
          onClose={closeModal}
        >
          <WorkerForm
            worker={selectedWorker}
            onSaved={async () => {
              await loadWorkers();
              closeModal();
            }}
          />
        </Modal>
      </main>
    </div>
  );
}