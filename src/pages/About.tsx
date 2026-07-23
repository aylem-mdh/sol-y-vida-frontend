import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Handshake,
  Leaf,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

const missionCards = [
  {
    icon: Heart,
    title: "Atención humana",
    description:
      "Ofrecemos un trato cercano y personalizado, poniendo siempre a la persona en el centro.",
  },
  {
    icon: Handshake,
    title: "Confianza",
    description:
      "Trabajamos con profesionales cualificados para ofrecer tranquilidad y seguridad a las familias.",
  },
  {
    icon: Leaf,
    title: "Calidad de vida",
    description:
      "Nuestro objetivo es mejorar el bienestar y la autonomía de las personas mayores en su propio hogar.",
  },
];

const reasons = [
  {
    icon: UserRound,
    text: "Atención personalizada",
  },
  {
    icon: ShieldCheck,
    text: "Personal cualificado",
  },
  {
    icon: CheckCircle2,
    text: "Cercanía y confianza",
  },
  {
    icon: Users,
    text: "Compromiso con las familias",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ECFAF8_0%,#F6FCFB_45%,#FFFFFF_100%)]">
      <section className="relative overflow-hidden bg-[linear-gradient(140deg,#0F9E98_0%,#6EC8C3_40%,#F29A38_100%)] pb-16 pt-8 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Header />
        </div>

        <div className="pointer-events-none absolute -left-20 top-24 h-56 w-56 rounded-full bg-white/20 blur-3xl sm:h-72 sm:w-72" />
        <div className="pointer-events-none absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-[#FFF5E8]/55 blur-3xl sm:h-80 sm:w-80" />

        <div className="relative mx-auto mt-14 max-w-4xl px-6 text-center text-white sm:mt-16 lg:mt-20">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-white/85 sm:text-sm">
            Sol y Vida Cuidados
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Conócenos</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-white/90 sm:text-lg lg:text-xl">
            En Sol y Vida Cuidados creemos que el mejor cuidado nace de la cercanía, el respeto y la confianza.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base text-white/90 sm:text-lg lg:text-xl">
            Acompañamos a las personas mayores y a sus familias con un trato humano, profesional y completamente personalizado, adaptándonos a las necesidades de cada situación.
          </p>
          <Link
            to="#historia"
            className="mt-7 inline-flex items-center rounded-2xl border border-white/45 bg-white/15 px-7 py-3 text-base font-semibold text-white shadow-[0_16px_30px_rgba(15,25,30,0.22)] backdrop-blur-sm transition duration-300 hover:bg-white/25 sm:mt-8"
          >
            Más sobre nosotros
            <ArrowRight className="ml-2.5 h-5 w-5" />
          </Link>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-14 sm:pt-16 lg:pt-20">
        <section id="historia" className="rounded-[34px] border border-[#D8EFEA] bg-white p-7 shadow-[0_20px_54px_rgba(15,158,152,0.08)] sm:p-10 lg:p-14">
          <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">Nuestra historia</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
            <p>
              Sol y Vida Cuidados nace con el objetivo de ofrecer un servicio de atención domiciliaria cercano, profesional y personalizado para personas mayores y sus familias en la Costa del Sol.
            </p>
            <p>
              Creemos que cada persona merece ser atendida con respeto, empatía y dedicación, adaptándonos siempre a sus necesidades.
            </p>
          </div>
        </section>

        <section className="mt-12 sm:mt-14 lg:mt-16">
          <div className="mb-8 text-center sm:mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F29A38] sm:text-sm">Nuestra misión</p>
            <h2 className="mt-3 text-3xl font-bold text-[#1F2937] sm:text-4xl">Cuidado profesional con valor humano</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {missionCards.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group rounded-3xl border border-[#DFF3F0] bg-white p-6 shadow-[0_12px_32px_rgba(15,158,152,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#C7EAE6] hover:shadow-[0_20px_45px_rgba(15,158,152,0.14)] sm:p-7"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DDF7F5] text-[#0F9E98] transition duration-300 group-hover:bg-[#0F9E98] group-hover:text-white sm:h-14 sm:w-14">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#1F2937] sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-12 rounded-[34px] border border-[#EAF2F1] bg-white px-6 py-10 shadow-[0_18px_44px_rgba(15,25,30,0.06)] sm:mt-14 sm:px-10 sm:py-12 lg:mt-16 lg:px-14 lg:py-14">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F29A38] sm:text-sm">¿Por qué elegirnos?</p>
            <h2 className="mt-3 text-3xl font-bold text-[#1F2937] sm:text-4xl">Compromiso real con cada familia</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">
            {reasons.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.text}
                  className="group flex items-center gap-4 rounded-2xl border border-[#E7F2F1] bg-[#FCFEFE] p-5 shadow-[0_8px_20px_rgba(15,25,30,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#D6EBE9] hover:shadow-[0_14px_28px_rgba(15,25,30,0.08)] sm:p-6"
                >
                  <div className="rounded-xl bg-[#DDF7F5] p-3 text-[#0F9E98] transition duration-300 group-hover:bg-[#0F9E98] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-base font-semibold text-[#1F2937] sm:text-lg">{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-12 rounded-[32px] border border-[#F8E1BE] bg-[#FFF5E8] px-6 py-10 shadow-[0_16px_36px_rgba(242,154,56,0.18)] sm:mt-14 sm:px-10 sm:py-12 lg:mt-16 lg:px-14 lg:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">¿Hablamos?</h2>
            <p className="mt-4 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
              Si deseas conocer más sobre nuestros servicios, estaremos encantados de ayudarte.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center rounded-2xl bg-[#0F9E98] px-8 py-4 text-base font-semibold text-white shadow-[0_16px_34px_rgba(15,158,152,0.26)] transition duration-300 hover:bg-[#0B817C] hover:shadow-[0_22px_46px_rgba(15,158,152,0.34)] sm:mt-8 sm:px-10 sm:text-lg"
            >
              Solicitar información
              <ArrowRight className="ml-2.5 h-5 w-5" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}