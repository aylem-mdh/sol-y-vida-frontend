import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import ClientForm from "../components/dashboard/ClientForm";
import Modal from "../components/ui/Modal";
import { getClientById, type Client } from "../services/clientService";

export default function ClientDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const role = localStorage.getItem("role") === "worker" ? "worker" : "admin";
  const isAdmin = role === "admin";

  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const clientId = useMemo(() => Number(id), [id]);

  useEffect(() => {
    void loadClient();
  }, [clientId]);

  async function loadClient() {
    setLoading(true);
    setError("");

    if (!Number.isInteger(clientId) || clientId <= 0) {
      setError(t("pages.clients.details.notFound"));
      setLoading(false);
      return;
    }

    try {
      const data = await getClientById(clientId);
      setClient(data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setError(t("pages.clients.details.notFound"));
      } else {
        setError(t("pages.clients.details.loadError"));
      }
      setClient(null);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(value: string) {
    if (!value) {
      return "—";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function display(value?: string | number | null) {
    if (value === null || value === undefined) {
      return "—";
    }

    if (typeof value === "string" && value.trim().length === 0) {
      return "—";
    }

    return String(value);
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("pages.clients.details.title")}
          subtitle={isAdmin ? t("pages.clients.details.subtitle") : t("workerPage.topbar.subtitle")}
          name={isAdmin ? t("profiles.adminName") : t("profiles.workerName")}
          role={isAdmin ? t("roles.admin") : t("roles.worker")}
        />

        <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-5 shadow-[0_16px_40px_rgba(15,25,30,0.08)] sm:p-7">
          {loading && (
            <div className="py-12 text-center text-slate-600">
              {t("pages.clients.details.loading")}
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              <p className="font-semibold">{error}</p>
              <button
                type="button"
                onClick={() => navigate("/clients")}
                className="mt-4 rounded-xl bg-slate-200 px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-300"
              >
                {t("pages.clients.details.backToClients")}
              </button>
            </div>
          )}

          {!loading && !error && client && (
            <>
              <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#D8EFEA] bg-[#F7FCFB] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">
                    {client.nombre} {client.apellidos}
                  </h2>
                  <span
                    className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                      client.activo
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {client.activo ? t("tables.common.active") : t("tables.common.inactive")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/clients")}
                    className="rounded-2xl bg-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-300"
                  >
                    {t("pages.clients.details.backToClients")}
                  </button>

                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="rounded-2xl bg-[#0F9E98] px-5 py-3 font-bold text-white transition hover:bg-[#0B817C]"
                    >
                      {t("pages.clients.edit")}
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-4 text-lg font-bold text-slate-800">{t("pages.clients.details.personalData")}</h3>
                  <dl className="grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold text-slate-500">{t("forms.common.name")}</dt>
                      <dd>{display(client.nombre)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500">{t("forms.common.lastName")}</dt>
                      <dd>{display(client.apellidos)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500">{t("pages.clients.details.birthDate")}</dt>
                      <dd>{formatDate(client.fechaNacimiento)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500">{t("forms.common.idNumber")}</dt>
                      <dd>{display(client.dni)}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-semibold text-slate-500">{t("forms.client.socialSecurity")}</dt>
                      <dd>{display(client.numeroSeguridadSocial)}</dd>
                    </div>
                  </dl>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-4 text-lg font-bold text-slate-800">{t("pages.clients.details.contactData")}</h3>
                  <dl className="grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold text-slate-500">{t("forms.common.phone")}</dt>
                      <dd>{display(client.telefono)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500">{t("forms.common.email")}</dt>
                      <dd>{display(client.email)}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-semibold text-slate-500">{t("forms.common.address")}</dt>
                      <dd>{display(client.direccion)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500">{t("forms.common.city")}</dt>
                      <dd>{display(client.ciudad)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500">{t("forms.common.postalCode")}</dt>
                      <dd>{display(client.codigoPostal)}</dd>
                    </div>
                  </dl>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
                  <h3 className="mb-4 text-lg font-bold text-slate-800">{t("pages.clients.details.assignment")}</h3>
                  <dl className="grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold text-slate-500">{t("pages.clients.details.assignedWorkerId")}</dt>
                      <dd>
                        {client.assignedWorkerId === null || client.assignedWorkerId === undefined
                          ? t("pages.clients.details.noAssignedWorker")
                          : client.assignedWorkerId}
                      </dd>
                    </div>
                  </dl>
                </article>
              </div>
            </>
          )}
        </section>

        <Modal
          open={showForm && Boolean(client) && isAdmin}
          title={t("pages.clients.edit")}
          onClose={() => setShowForm(false)}
        >
          <ClientForm
            client={client}
            onCreated={async () => {
              await loadClient();
              setShowForm(false);
            }}
          />
        </Modal>
      </main>
    </div>
  );
}
