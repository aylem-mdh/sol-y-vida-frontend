import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import VisitsTable from "../components/dashboard/VisitsTable";
import VisitForm from "../components/dashboard/VisitForm";
import Modal from "../components/ui/Modal";

import {
  getVisits,
  deleteVisit,
  type Visit,
} from "../services/visitService";

export default function Visits() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

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
    if (!window.confirm("¿Seguro que deseas eliminar esta visita?"))
      return;

    try {
      await deleteVisit(id);

      setVisits((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar la visita.");
    }
  }

  function newVisit() {
    setSelectedVisit(null);
    setShowModal(true);
  }

  function editVisit(visit: Visit) {
    setSelectedVisit(visit);
    setShowModal(true);
  }

  function closeModal() {
    setSelectedVisit(null);
    setShowModal(false);
  }

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar
          title="Visitas"
          subtitle="Gestiona todas las visitas de Sol y Vida Cuidados."
          name="Carmen López"
          role="Administradora"
        />

        <section className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-800">
              Visitas
            </h2>

            <button
              onClick={newVisit}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition"
            >
              + Nueva Visita
            </button>
          </div>

          <VisitsTable
            visits={visits}
            onDelete={removeVisit}
            onEdit={editVisit}
          />
        </section>

        <Modal
          open={showModal}
          title={
            selectedVisit
              ? "Editar visita"
              : "Nueva visita"
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