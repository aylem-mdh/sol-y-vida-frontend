import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import ClientsTable from "../components/dashboard/ClientsTable";
import ClientForm from "../components/dashboard/ClientForm";
import Modal from "../components/ui/Modal";

import {
  getClients,
  deleteClient,
} from "../services/clientService";

interface Client {
  id: number;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  dni: string;
  numeroSeguridadSocial: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  telefono: string;
  email: string;
  activo: boolean;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] =
    useState<Client | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    try {
      const data = await getClients();
      setClients(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function removeClient(id: number) {
    if (!window.confirm("¿Eliminar cliente?")) return;

    try {
      await deleteClient(id);

      setClients((prev) =>
        prev.filter((c) => c.id !== id)
      );
    } catch {
      alert("No se pudo eliminar.");
    }
  }

  function newClient() {
    setSelectedClient(null);
    setShowForm(true);
  }

  function editClient(client: Client) {
    setSelectedClient(client);
    setShowForm(true);
  }

  function closeModal() {
    setSelectedClient(null);
    setShowForm(false);
  }

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">

        <Topbar
          title="Clientes"
          subtitle="Gestiona todos los clientes."
          name="Carmen López"
          role="Administradora"
        />

        <section className="mt-8">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold text-slate-800">
              Clientes
            </h2>

            <button
              onClick={newClient}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold"
            >
              + Nuevo Cliente
            </button>

          </div>

          <ClientsTable
            clients={clients}
            onDelete={removeClient}
            onEdit={editClient}
          />

        </section>

        <Modal
          open={showForm}
          title={
            selectedClient
              ? "Editar Cliente"
              : "Nuevo Cliente"
          }
          onClose={closeModal}
        >
          <ClientForm
            client={selectedClient}
            onCreated={async () => {
              await loadClients();
              closeModal();
            }}
          />
        </Modal>

      </main>
    </div>
  );
}