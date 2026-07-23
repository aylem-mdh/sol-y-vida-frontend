import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import ClientsTable from "../components/dashboard/ClientsTable";
import ClientForm from "../components/dashboard/ClientForm";
import Modal from "../components/ui/Modal";

import {
  getClients,
  deleteClient,
  type Client,
} from "../services/clientService";

export default function Clients() {
  const { t } = useTranslation();
  const role = localStorage.getItem("role") === "worker" ? "worker" : "admin";
  const isAdmin = role === "admin";
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
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
    if (!window.confirm(t("crud.confirmDeleteClient"))) return;

    try {
      await deleteClient(id);

      setClients((prev) =>
        prev.filter((c) => c.id !== id)
      );
    } catch {
      alert(t("crud.errors.deleteClient"));
    }
  }

  function newClient() {
    if (!isAdmin) {
      return;
    }

    setSelectedClient(null);
    setShowForm(true);
  }

  function editClient(client: Client) {
    if (!isAdmin) {
      return;
    }

    setSelectedClient(client);
    setShowForm(true);
  }

  function closeModal() {
    setSelectedClient(null);
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">

        <Topbar
          title={t("pages.clients.title")}
          subtitle={isAdmin ? t("pages.clients.subtitle") : t("workerPage.topbar.subtitle")}
          name={isAdmin ? t("profiles.adminName") : t("profiles.workerName")}
          role={isAdmin ? t("roles.admin") : t("roles.worker")}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("tables.clients.search")}
        />

        <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-5 shadow-[0_16px_40px_rgba(15,25,30,0.08)] sm:p-7">

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <h2 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">
              {t("pages.clients.title")}
            </h2>

            {isAdmin && (
              <button
                onClick={newClient}
                className="rounded-2xl bg-[#0F9E98] px-6 py-3 font-bold text-white transition duration-300 hover:bg-[#0B817C]"
              >
                + {t("pages.clients.new")}
              </button>
            )}

          </div>

          <ClientsTable
            clients={clients}
            onDelete={removeClient}
            onEdit={editClient}
            canManage={isAdmin}
            searchTerm={search}
            onSearchTermChange={setSearch}
            hideSearchInput
          />

        </section>

        <Modal
          open={showForm}
          title={
            selectedClient
              ? t("pages.clients.edit")
              : t("pages.clients.new")
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