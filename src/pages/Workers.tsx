import { useEffect, useState } from "react";
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
  const [workers, setWorkers] = useState<Worker[]>([]);
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
    if (!window.confirm("¿Seguro que deseas eliminar este trabajador?"))
      return;

    try {
      await deleteWorker(id);

      setWorkers((prev) => prev.filter((w) => w.id !== id));
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el trabajador.");
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
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar
          title="Trabajadores"
          subtitle="Gestiona el personal de Sol y Vida Cuidados."
          name="Carmen López"
          role="Administradora"
        />

        <section className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-800">
              Trabajadores
            </h2>

            <button
              onClick={newWorker}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition"
            >
              + Nuevo Trabajador
            </button>
          </div>

          <WorkersTable
            workers={workers}
            onDelete={removeWorker}
            onEdit={editWorker}
          />
        </section>

        <Modal
          open={showModal}
          title={
            selectedWorker
              ? "Editar trabajador"
              : "Nuevo trabajador"
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