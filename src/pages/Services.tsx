import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import ServicesTable from "../components/dashboard/ServicesTable";
import ServiceForm from "../components/dashboard/ServiceForm";
import Modal from "../components/ui/Modal";

import {
  getServices,
  deleteService,
  type Service,
} from "../services/serviceService";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeService(id: number) {
    if (!window.confirm("¿Seguro que deseas eliminar este servicio?"))
      return;

    try {
      await deleteService(id);

      setServices((prev) =>
        prev.filter((s) => s.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el servicio.");
    }
  }

  function newService() {
    setSelectedService(null);
    setShowModal(true);
  }

  function editService(service: Service) {
    setSelectedService(service);
    setShowModal(true);
  }

  function closeModal() {
    setSelectedService(null);
    setShowModal(false);
  }

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar
          title="Servicios"
          subtitle="Gestiona todos los servicios de Sol y Vida Cuidados."
          name="Carmen López"
          role="Administradora"
        />

        <section className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-800">
              Servicios
            </h2>

            <button
              onClick={newService}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition"
            >
              + Nuevo Servicio
            </button>
          </div>

          <ServicesTable
            services={services}
            onDelete={removeService}
            onEdit={editService}
          />
        </section>

        <Modal
          open={showModal}
          title={
            selectedService
              ? "Editar servicio"
              : "Nuevo servicio"
          }
          onClose={closeModal}
        >
          <ServiceForm
            service={selectedService}
            onSaved={async () => {
              await loadServices();
              closeModal();
            }}
          />
        </Modal>
      </main>
    </div>
  );
}