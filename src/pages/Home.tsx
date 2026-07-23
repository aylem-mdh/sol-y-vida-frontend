import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseMedical,
  Heart,
  HeartHandshake,
  Home as HomeIcon,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function Home() {
  const { t } = useTranslation();
  const services = [
    {
      title: t("publicHome.services.card1.title"),
      description: t("publicHome.services.card1.description"),
      icon: HeartHandshake,
    },
    {
      title: t("publicHome.services.card2.title"),
      description: t("publicHome.services.card2.description"),
      icon: HomeIcon,
    },
    {
      title: t("publicHome.services.card3.title"),
      description: t("publicHome.services.card3.description"),
      icon: BriefcaseMedical,
    },
    {
      title: t("publicHome.services.card4.title"),
      description: t("publicHome.services.card4.description"),
      icon: Users,
    },
  ];

  const reasons = [
    {
      title: t("publicHome.reasons.reason1"),
      icon: Heart,
    },
    {
      title: t("publicHome.reasons.reason2"),
      icon: ShieldCheck,
    },
    {
      title: t("publicHome.reasons.reason3"),
      icon: BadgeCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7FCFB] text-[#1F2937]">
      <section className="relative overflow-hidden bg-[#DDF7F5]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_transparent_45%)]" />
        <Header />

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-8 lg:px-10 lg:py-10">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 rounded-3xl bg-white/80 px-6 py-4 backdrop-blur sm:mb-8 sm:gap-4 sm:px-8 sm:py-3 lg:gap-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F29A38] sm:text-sm">
              {t("workerPage.locations.torremolinos")}
            </span>
            <span className="text-[#F29A38]">•</span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F29A38] sm:text-sm">
              {t("workerPage.locations.benalmadena")}
            </span>
            <span className="text-[#F29A38]">•</span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F29A38] sm:text-sm">
              {t("workerPage.locations.fuengirola")}
            </span>
            <span className="text-[#F29A38]">•</span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F29A38] sm:text-sm">
              {t("workerPage.locations.mijas")}
            </span>
          </div>

          <div className="grid items-center gap-6 md:mt-8 md:gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
            <div className="order-2 text-center md:order-1 md:text-left">
              <div className="inline-flex items-center rounded-full border border-[#BFEAE6] bg-white/80 px-4 py-3 shadow-sm backdrop-blur sm:px-5 sm:py-2.5">
                <span className="text-xs font-semibold text-[#0F9E98] sm:text-sm">
                  {t("publicHome.hero.badge")}
                </span>
              </div>

              <h1 className="mt-4 text-4xl font-black leading-[0.95] text-[#1F2937] sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl">
                {t("branding.name")}
                <span className="mt-2 block text-[#0F9E98]">{t("branding.suffix")}</span>
              </h1>

              <p className="mt-4 text-base font-semibold text-[#374151] sm:mt-5 sm:text-lg md:text-xl">
                {t("publicHome.hero.lead")}
              </p>

              <p className="mt-3 text-sm leading-6 text-[#4B5563] sm:mt-4 sm:text-base sm:leading-7">
                {t("publicHome.hero.description1")}
              </p>

              <p className="mt-2 text-sm leading-6 text-[#4B5563] sm:mt-3 sm:text-base sm:leading-7">
                {t("publicHome.hero.description2")}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4 md:flex-col md:gap-3 lg:flex-row lg:gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#0F9E98] px-6 py-3 font-semibold text-white shadow-lg shadow-[#0F9E98]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#0B817C] sm:px-7 sm:py-3.5 lg:px-7 lg:py-3.5"
                >
                  {t("services.requestInfo")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-[#0F9E98] bg-white/80 px-6 py-3 font-semibold text-[#0F9E98] transition duration-300 hover:bg-[#DDF7F5] sm:px-7 sm:py-3.5 lg:px-7 lg:py-3.5"
                >
                  {t("services.title")}
                </Link>
              </div>
            </div>

            <div className="order-1 flex min-h-[320px] items-center justify-center md:order-2 md:min-h-[400px] lg:min-h-[500px] lg:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <div className="absolute left-1/2 top-2 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-[#0F9E98]/20 sm:h-[240px] sm:w-[240px] md:left-auto md:right-[-4%] md:top-4 md:h-[300px] md:w-[300px] lg:right-[-4%] lg:top-4 lg:h-[380px] lg:w-[380px]" />
                <div className="absolute left-1/2 top-6 h-[180px] w-[180px] -translate-x-1/2 rounded-full bg-[#DDF7F5] sm:h-[220px] sm:w-[220px] md:left-auto md:right-2 md:top-10 md:h-[280px] md:w-[280px] lg:right-4 lg:top-16 lg:h-[360px] lg:w-[360px]" />
                <img
                  src="/hero.png"
                  alt={t("publicHome.hero.imageAlt")}
                  className="relative z-10 mx-auto h-[240px] w-auto rounded-[28px] border border-white/70 bg-white/40 p-2 shadow-[0_20px_50px_rgba(15,158,152,0.18)] sm:h-[280px] md:h-[340px] lg:h-[420px]"
                  style={{
                    filter: "saturate(1.5) contrast(1.1) brightness(1.08)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FCFB] px-4 py-12 sm:px-8 sm:py-16 md:py-20 lg:px-10 lg:py-40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 rounded-2xl border border-[#E8F8F6] bg-white p-6 shadow-[0_25px_70px_rgba(15,25,30,0.06)] sm:rounded-3xl sm:p-8 md:gap-8 md:rounded-[44px] md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F29A38] sm:text-sm">
              {t("publicHome.presentation.label")}
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-[#1F2937] sm:mt-5 sm:text-3xl md:text-4xl lg:text-[2.45rem]">
              {t("publicHome.presentation.title1")}
              <span className="block">{t("publicHome.presentation.title2")}</span>
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-[#F29A38] sm:mt-6 sm:h-1.5 sm:w-24" />
            <p className="mt-4 text-sm leading-6 text-[#4B5563] sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
              {t("publicHome.presentation.description1")}
            </p>
            <p className="mt-3 text-sm leading-6 text-[#4B5563] sm:mt-4 sm:text-base sm:leading-8 md:text-lg">
              {t("publicHome.presentation.description2")}
            </p>
          </div>

          <div className="rounded-2xl bg-[#FFF5E8] p-6 text-[#1F2937] shadow-[0_20px_45px_rgba(242,154,56,0.16)] sm:p-8 md:rounded-[34px] md:p-10 lg:ml-auto lg:max-w-[430px]">
            <h3 className="text-xl font-bold sm:text-2xl">{t("publicHome.reasons.title")}</h3>
            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {reasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <div key={reason.title} className="flex items-start gap-3 rounded-xl border border-[#F8E0BC] bg-white/80 p-3 sm:rounded-2xl sm:p-4">
                    <div className="mt-0.5 rounded-full bg-[#F29A38]/10 p-1.5 text-[#F29A38] sm:p-2">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="text-sm font-medium sm:text-lg">{reason.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FCFB] px-4 py-12 sm:px-8 sm:py-16 md:py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F29A38] sm:text-sm">
              {t("common.services")}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#1F2937] sm:mt-4 sm:text-3xl md:text-4xl">
              {t("services.title")}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:mt-12 lg:gap-6 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="group flex h-full flex-col rounded-2xl border border-[#DDF7F5] bg-white p-5 shadow-[0_16px_40px_rgba(15,25,30,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(15,158,152,0.12)] sm:p-7 md:rounded-[28px]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DDF7F5] text-[#0F9E98] transition duration-300 group-hover:bg-[#0F9E98] group-hover:text-white sm:h-14 sm:w-14 sm:rounded-2xl">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#1F2937] sm:mt-6 sm:text-xl">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#4B5563] sm:mt-3 sm:text-base sm:leading-7">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#DDF7F5] px-4 py-12 sm:px-8 sm:py-16 md:py-32 lg:px-10 lg:py-48">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 rounded-2xl border border-[#BFEAE6] bg-white/85 p-6 shadow-[0_20px_50px_rgba(15,158,152,0.12)] sm:gap-10 sm:rounded-3xl sm:p-8 md:gap-10 md:rounded-[40px] md:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:p-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F29A38] sm:text-sm">
              {t("common.contact")}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#1F2937] sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
              {t("publicHome.contact.title")}
            </h2>
            <div className="mt-6 space-y-3 text-[#4B5563] sm:mt-8 sm:space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-[#0F9E98] sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-lg">{t("branding.supportPhone")}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-[#0F9E98] sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-lg">{t("publicHome.contact.address")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-[#0F9E98] sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-lg">{t("branding.supportEmail")}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-[0_20px_45px_rgba(15,158,152,0.12)] sm:p-8 md:rounded-[28px] md:p-10 md:sm:p-12">
            <h3 className="text-xl font-bold text-[#1F2937] sm:text-2xl md:text-3xl">{t("services.moreInfoTitle")}</h3>
            <p className="mt-3 text-sm leading-6 text-[#4B5563] sm:mt-4 sm:text-base sm:leading-8 md:mt-5 md:text-lg">
              {t("publicHome.contact.description")}
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center rounded-2xl bg-[#0F9E98] px-6 py-3 font-semibold text-white transition duration-300 hover:bg-[#0B817C] sm:mt-8 sm:px-8 sm:py-4 md:mt-8"
            >
              {t("common.contact")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}