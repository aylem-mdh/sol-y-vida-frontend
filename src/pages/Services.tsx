import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import ServicesTable from "../components/dashboard/ServicesTable";
import ServiceForm from "../components/dashboard/ServiceForm";
import Modal from "../components/ui/Modal";
import { deleteService, getServices, getServiceCatalog, type Service, type ServiceCatalogItem } from "../services/serviceService";
import {
  ArrowRight,
  BriefcaseMedical,
  Eye,
  HeartHandshake,
  Home as HomeIcon,
  Users,
} from "lucide-react";

export default function Services() {
  const { t, i18n } = useTranslation();
  const hasSession = Boolean(localStorage.getItem("token"));
  const role = localStorage.getItem("role");
  const isAdmin = hasSession && role === "admin";
  const isWorker = hasSession && role === "worker";
  const isClient = hasSession && role === "client";
  const [catalog, setCatalog] = useState<ServiceCatalogItem[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState(false);
  const [selectedCatalogItem, setSelectedCatalogItem] = useState<ServiceCatalogItem | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [assignedServices, setAssignedServices] = useState<Service[]>([]);
  const [loadError, setLoadError] = useState("");
  const [assignedLoading, setAssignedLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const publicServices = [
    {
      title: t("services.card1"),
      description: t("services.publicDesc1"),
      icon: HeartHandshake,
    },
    {
      title: t("services.card2"),
      description: t("services.publicDesc2"),
      icon: HomeIcon,
    },
    {
      title: t("services.card3"),
      description: t("services.publicDesc3"),
      icon: BriefcaseMedical,
    },
    {
      title: t("services.card4"),
      description: t("services.publicDesc4"),
      icon: Users,
    },
  ];

  const loadServices = useCallback(async () => {
    setLoadError("");
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      setLoadError(t("crud.errors.loadList"));
      throw error;
    }
  }, [t]);

  const loadAssignedServices = useCallback(async () => {
    setLoadError("");
    setAssignedLoading(true);
    try {
      setAssignedServices(await getServices());
    } catch {
      setLoadError(t("crud.errors.loadList"));
    } finally {
      setAssignedLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (!isAdmin) {
      return;
    }

    const timer = window.setTimeout(() => {
      void loadServices().catch(() => undefined);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isAdmin, loadServices]);

  useEffect(() => {
    if (!isWorker) {
      return;
    }

    const timer = window.setTimeout(() => {
      void loadAssignedServices();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isWorker, loadAssignedServices]);

  useEffect(() => {
    if (!isClient) return;
    let active = true;
    async function loadCatalog() {
      try {
        setCatalogLoading(true);
        setCatalogError(false);
        const data = await getServiceCatalog();
        if (active) setCatalog(data);
      } catch {
        if (active) {
          setCatalog([]);
          setCatalogError(true);
        }
      } finally {
        if (active) setCatalogLoading(false);
      }
    }
    void loadCatalog();
    return () => { active = false; };
  }, [isClient]);

  async function removeService(id: number) {
    if (!window.confirm(t("crud.confirmDeleteService"))) {
      return;
    }

    try {
      await deleteService(id);
      setServices((previous) => previous.filter((service) => service.id !== id));
    } catch (error) {
      alert(axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message ?? t("crud.errors.deleteService")
        : t("crud.errors.deleteService"));
    }
  }

  const filteredAssignedServices = assignedServices.filter((service) => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return true;
    }

    const text = `${service.nombre} ${service.descripcion} ${service.categoria} ${service.frecuencia} ${service.notes} ${service.clienteNombre ?? ""} ${service.clienteDireccion ?? ""}`.toLowerCase();
    return text.includes(query);
  });

  if (isClient) {
    const query = search.trim().toLowerCase();
    const visibleCatalog = catalog.filter((item) =>
      `${item.nombre} ${item.descripcion} ${item.categoria} ${item.frecuencia}`.toLowerCase().includes(query));
    const formatRate = (rate: number) => new Intl.NumberFormat(i18n.language, { style: "currency", currency: "EUR" }).format(rate);
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
        <Sidebar role="client" />
        <main className="min-w-0 flex-1 p-4 pt-16 [overflow-wrap:anywhere] sm:p-6 sm:pt-20 lg:p-8 lg:pt-8 lg:[&_header>div]:flex-col lg:[&_header>div]:items-stretch">
          <Topbar title={t("serviceCatalog.title")} subtitle={t("serviceCatalog.subtitle")} name={t("profiles.familyName")} role={t("roles.client")} notificationPath="/notifications" searchValue={search} onSearchChange={setSearch} searchPlaceholder={t("tables.services.search")} />
          <section className="mt-8">
            <div className="mb-4 lg:hidden">
              <label htmlFor="catalog-search" className="sr-only">{t("tables.services.search")}</label>
              <input id="catalog-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("tables.services.search")} className="w-full rounded-md border border-[#D8EFEA] bg-white px-4 py-3 text-sm" />
            </div>
            {catalogError ? <p role="alert" className="text-sm text-red-700">{t("serviceCatalog.error")}</p> : (
              <div className="relative overflow-x-auto border border-[#D8EFEA] bg-white">
                <table className="w-full min-w-[800px] table-fixed text-left text-sm">
                  <thead className="bg-[#F7FCFB] text-[#1F2937]">
                    <tr><th className="w-2/5 p-4">{t("serviceCatalog.service")}</th><th className="p-4">{t("serviceCatalog.category")}</th><th className="p-4">{t("serviceCatalog.rate")}</th><th className="p-4">{t("serviceCatalog.duration")}</th><th className="p-4">{t("serviceCatalog.frequency")}</th><th className="w-16 p-4"><span className="sr-only">{t("serviceCatalog.view")}</span></th></tr>
                  </thead>
                  <tbody>
                    {catalogLoading ? <tr><td colSpan={6} className="p-6 text-[#4B5563]">{t("serviceCatalog.loading")}</td></tr> : visibleCatalog.length === 0 ? <tr><td colSpan={6} className="p-6 text-[#4B5563]">{t("serviceCatalog.empty")}</td></tr> : visibleCatalog.map((item) => (
                      <tr key={item.id} className="border-t border-[#E3F2EF] text-[#4B5563]">
                        <td className="max-w-sm p-4"><p className="break-words font-semibold text-[#1F2937]">{item.nombre}</p><p className="mt-1 break-words">{item.descripcion}</p></td>
                        <td className="p-4">{item.categoria}</td><td className="whitespace-nowrap p-4">{formatRate(item.precioPorHora)}</td><td className="whitespace-nowrap p-4">{item.duracionMinutos} min</td><td className="p-4">{item.frecuencia}</td>
                        <td className="p-4"><button type="button" onClick={() => setSelectedCatalogItem(item)} aria-label={t("serviceCatalog.view")} title={t("serviceCatalog.view")} className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#D8EFEA] text-[#0F9E98]"><Eye size={18} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
          <Modal open={selectedCatalogItem !== null} title={selectedCatalogItem?.nombre ?? t("serviceCatalog.title")} onClose={() => setSelectedCatalogItem(null)}>
            {selectedCatalogItem && <div className="space-y-4 text-sm text-[#4B5563]"><p className="break-words">{selectedCatalogItem.descripcion}</p><dl className="grid grid-cols-2 gap-3"><dt>{t("serviceCatalog.category")}</dt><dd>{selectedCatalogItem.categoria}</dd><dt>{t("serviceCatalog.rate")}</dt><dd>{formatRate(selectedCatalogItem.precioPorHora)}</dd><dt>{t("serviceCatalog.duration")}</dt><dd>{selectedCatalogItem.duracionMinutos} min</dd><dt>{t("serviceCatalog.frequency")}</dt><dd>{selectedCatalogItem.frecuencia}</dd></dl></div>}
          </Modal>
        </main>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
        <Sidebar role="admin" />

        <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
          <Topbar
            title={t("pages.services.title")}
            subtitle={t("pages.services.subtitle")}
            name="Carmen López"
            role={t("roles.admin")}
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder={t("tables.services.search")}
          />

          <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-5 shadow-[0_16px_40px_rgba(15,25,30,0.08)] sm:p-7">
            {loadError && <p role="alert" className="mb-4 rounded-xl bg-red-100 p-4 text-red-700">{loadError}</p>}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">{t("pages.services.title")}</h2>
              <button
                onClick={() => {
                  setSelectedService(null);
                  setShowModal(true);
                }}
                className="rounded-2xl bg-[#0F9E98] px-6 py-3 font-bold text-white transition duration-300 hover:bg-[#0B817C]"
              >
                + {t("pages.services.new")}
              </button>
            </div>

            <ServicesTable
              services={services}
              onDelete={removeService}
              onEdit={(service) => {
                setSelectedService(service);
                setShowModal(true);
              }}
              searchTerm={search}
              onSearchTermChange={setSearch}
              hideSearchInput
            />
          </section>

          <Modal
            open={showModal}
            title={selectedService ? t("pages.services.edit") : t("pages.services.new")}
            onClose={() => {
              setSelectedService(null);
              setShowModal(false);
            }}
          >
            <ServiceForm
              key={selectedService?.id ?? "new-service"}
              service={selectedService}
              onSaved={async () => {
                await loadServices();
                setSelectedService(null);
                setShowModal(false);
              }}
            />
          </Modal>
        </main>
      </div>
    );
  }

  if (isWorker) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
        <Sidebar role="worker" />

        <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
          <Topbar
            title={t("sidebar.myServices")}
            subtitle={t("workerPage.topbar.subtitle")}
            name={t("profiles.workerName")}
            role={t("roles.worker")}
            notificationPath="/notifications"
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder={t("tables.visits.search")}
          />

          <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <h2 className="text-2xl font-bold text-[#1F2937]">{t("workerPage.cards.assignedServices")}</h2>
            {loadError && <p role="alert" className="mt-4 rounded-xl bg-red-100 p-4 text-red-700">{loadError}</p>}
            {assignedLoading && <p role="status" className="mt-4">{t("serviceCatalog.loading")}</p>}

            <div className="mt-5 space-y-3">
              {filteredAssignedServices.map((service) => (
                  <article key={service.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                    <p className="font-semibold text-[#1F2937]">{service.nombre}</p>
                    <p className="mt-1 text-sm text-[#4B5563]">{service.categoria} · {service.frecuencia} · {service.duracionMinutos} min · {service.precioPorHora.toFixed(2)} EUR/h</p>
                      {service.clienteNombre && <p className="mt-2 text-sm font-medium text-[#1F2937]">{t("assignedService.client")}: {service.clienteNombre}</p>}
                      {(service.clienteDireccion || service.clienteCiudad) && <p className="text-sm text-[#4B5563]">{t("assignedService.address")}: {[service.clienteDireccion, service.clienteCiudad].filter(Boolean).join(", ")}</p>}
                      {service.startDate && <p className="mt-2 text-xs text-[#6B7280]">{t("assignedService.start")}: {new Date(service.startDate).toLocaleString(i18n.language)}</p>}
                      {service.endDate && <p className="text-xs text-[#6B7280]">{t("assignedService.end")}: {new Date(service.endDate).toLocaleString(i18n.language)}</p>}
                      {service.descripcion && <p className="mt-2 text-sm text-[#4B5563]"><span className="font-medium">{t("assignedService.tasks")}:</span> {service.descripcion}</p>}
                      {service.notes && <p className="mt-2 text-sm text-[#4B5563]"><span className="font-medium">{t("assignedService.notes")}:</span> {service.notes}</p>}
                  </article>
                ))}

              {!assignedLoading && !loadError && assignedServices.length === 0 && (
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-sm text-[#4B5563]">
                  {t("workerPage.cards.noAssignedServices")}
                </div>
              )}

              {!assignedLoading && !loadError && assignedServices.length > 0 && filteredAssignedServices.length === 0 && (
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-sm text-[#4B5563]">
                  {t("tables.visits.empty")}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ECFAF8_0%,#F7FCFB_45%,#FFFFFF_100%)]">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Header />
      </div>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-14 sm:pt-16 lg:pt-20">
        <section className="rounded-[36px] border border-[#D8F0ED] bg-white/90 px-6 py-12 shadow-[0_22px_55px_rgba(15,158,152,0.10)] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F29A38] sm:text-sm">
              Sol y Vida Cuidados
            </p>
            <h1 className="mt-4 text-4xl font-bold text-[#1F2937] sm:text-5xl">
              {t("services.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8 lg:text-lg">
              {t("services.publicDescription")}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:mt-14">
            {publicServices.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="group rounded-3xl border border-[#E3F4F2] bg-white p-6 shadow-[0_12px_30px_rgba(15,158,152,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#C7EAE6] hover:shadow-[0_20px_44px_rgba(15,158,152,0.14)] sm:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DDF7F5] text-[#0F9E98] transition duration-300 group-hover:bg-[#0F9E98] group-hover:text-white sm:h-14 sm:w-14">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <h2 className="mt-5 text-xl font-bold text-[#1F2937] sm:text-2xl">{service.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10 rounded-[32px] border border-[#F8E1BE] bg-[#FFF5E8] px-6 py-10 shadow-[0_16px_38px_rgba(242,154,56,0.18)] sm:mt-12 sm:px-10 sm:py-12 lg:mt-14 lg:px-14 lg:py-14">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h3 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">{t("services.moreInfoTitle")}</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
              {t("services.moreInfoText")}
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center rounded-2xl bg-[#0F9E98] px-8 py-4 text-base font-semibold text-white shadow-[0_16px_34px_rgba(15,158,152,0.26)] transition duration-300 hover:bg-[#0B817C] hover:shadow-[0_22px_46px_rgba(15,158,152,0.34)] sm:mt-8 sm:px-10 sm:py-4 sm:text-lg"
            >
              {t("services.requestInfo")}
              <ArrowRight className="ml-2.5 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}