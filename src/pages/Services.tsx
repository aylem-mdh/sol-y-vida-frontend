import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import ServicesTable from "../components/dashboard/ServicesTable";
import ServiceForm from "../components/dashboard/ServiceForm";
import Modal from "../components/ui/Modal";
import { deleteService, getServices, type Service } from "../services/serviceService";
import {
  ArrowRight,
  BriefcaseMedical,
  HeartHandshake,
  Home as HomeIcon,
  Users,
} from "lucide-react";

export default function Services() {
  const { t } = useTranslation();
  const isAdmin = localStorage.getItem("token") && localStorage.getItem("role") === "admin";
  const [services, setServices] = useState<Service[]>([]);
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

  useEffect(() => {
    if (!isAdmin) {
      return;
    }

    loadServices();
  }, [isAdmin]);

  async function loadServices() {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeService(id: number) {
    if (!window.confirm(t("crud.confirmDeleteService"))) {
      return;
    }

    try {
      await deleteService(id);
      setServices((previous) => previous.filter((service) => service.id !== id));
    } catch (error) {
      console.error(error);
      alert(t("crud.errors.deleteService"));
    }
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