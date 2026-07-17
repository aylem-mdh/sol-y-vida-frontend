import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
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

const services = [
  {
    title: "Acompañamiento",
    description:
      "Compañía, conversación y apoyo diario para que cada día se viva con mayor tranquilidad y bienestar.",
    icon: HeartHandshake,
  },
  {
    title: "Ayuda a domicilio",
    description:
      "Asistencia práctica en casa para tareas cotidianas y un entorno más seguro y ordenado.",
    icon: HomeIcon,
  },
  {
    title: "Acompañamiento médico",
    description:
      "Apoyo y supervisión en los cuidados de salud, siempre con respeto y profesionalidad.",
    icon: BriefcaseMedical,
  },
  {
    title: "Respiro familiar",
    description:
      "Ofrecemos apoyo para que las familias puedan recuperar tiempo y energía con confianza.",
    icon: Users,
  },
];

const reasons = [
  {
    title: "Atención personalizada",
    icon: Heart,
  },
  {
    title: "Personal cualificado",
    icon: ShieldCheck,
  },
  {
    title: "Confianza y seguridad",
    icon: BadgeCheck,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7FCFB] text-[#1F2937]">
      <section className="relative overflow-hidden bg-[#DDF7F5]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_transparent_45%)]" />
        <Header />

        <div className="relative mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 rounded-3xl bg-white/80 px-8 py-3 backdrop-blur sm:justify-center sm:gap-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F29A38] sm:text-sm">
              Torremolinos
            </span>
            <span className="text-[#F29A38]">•</span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F29A38] sm:text-sm">
              Benalmádena
            </span>
            <span className="text-[#F29A38]">•</span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F29A38] sm:text-sm">
              Fuengirola
            </span>
            <span className="text-[#F29A38]">•</span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F29A38] sm:text-sm">
              Mijas
            </span>
          </div>

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
            <div className="max-w-2xl py-4 lg:py-8">
              <div className="inline-flex items-center rounded-full border border-[#BFEAE6] bg-white/80 px-5 py-2.5 shadow-sm backdrop-blur">
                <span className="text-sm font-semibold text-[#0F9E98]">
                  CUIDADO PROFESIONAL A DOMICILIO
                </span>
              </div>

              <h1 className="mt-6 text-5xl font-black leading-[0.95] text-[#1F2937] sm:text-6xl lg:text-7xl">
                Sol y Vida
                <span className="mt-2 block text-[#0F9E98]">Cuidados</span>
              </h1>

              <p className="mt-5 text-lg font-semibold text-[#374151] sm:text-xl">
                Atención domiciliaria cercana, humana y profesional para personas mayores.
              </p>

              <p className="mt-4 text-base leading-7 text-[#4B5563]">
                Somos una empresa comprometida con el bienestar de las personas mayores y sus familias, ofreciendo cuidados personalizados en el entorno más familiar: el hogar.
              </p>

              <p className="mt-3 text-base leading-7 text-[#4B5563]">
                Nuestro equipo acompaña con respeto, empatía y una visión integral para que cada persona se sienta acompañada, segura y valorada.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#0F9E98] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#0F9E98]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#0B817C]"
                >
                  Solicitar información
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-[#0F9E98] bg-white/80 px-7 py-3.5 font-semibold text-[#0F9E98] transition duration-300 hover:bg-[#DDF7F5]"
                >
                  Nuestros servicios
                </Link>
              </div>
            </div>

            <div className="relative flex min-h-[500px] items-center justify-center lg:justify-end lg:min-h-[560px]">
              <div className="absolute right-[-8%] top-6 h-[360px] w-[360px] rounded-full bg-[#0F9E98]/20 sm:right-[-6%] sm:h-[400px] sm:w-[400px] lg:right-[-4%] lg:top-4 lg:h-[440px] lg:w-[440px]" />
              <div className="absolute right-0 top-12 h-[320px] w-[320px] rounded-full bg-[#DDF7F5] sm:right-2 sm:top-14 sm:h-[360px] sm:w-[360px] lg:right-4 lg:top-16 lg:h-[400px] lg:w-[400px]" />
              <img
                src="/hero.png"
                alt="Profesional de Sol y Vida Cuidados"
                className="relative z-10 h-[380px] w-full max-w-[280px] object-contain rounded-[36px] border border-white/70 bg-white/40 p-2 shadow-[0_32px_72px_rgba(15,158,152,0.26)] sm:h-[440px] sm:max-w-[310px] lg:h-[480px] lg:max-w-[340px]"
                style={{
                  filter: "saturate(1.5) contrast(1.1) brightness(1.08)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FCFB] px-6 py-32 sm:px-8 lg:px-10 lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[44px] border border-[#E8F8F6] bg-white p-8 shadow-[0_25px_70px_rgba(15,25,30,0.06)] sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#F29A38]">
              Presentación
            </p>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-[#1F2937] sm:text-4xl lg:text-[2.45rem]">
              Atención cercana,
              <span className="block">humana y profesional.</span>
            </h2>
            <div className="mt-6 h-1.5 w-24 rounded-full bg-[#F29A38]" />
            <p className="mt-6 text-lg leading-8 text-[#4B5563]">
              En Sol y Vida Cuidados creemos que el cuidado de las personas mayores debe basarse en la cercanía, la confianza y la empatía. Por eso, diseñamos nuestros servicios para adaptarse a cada situación y a cada persona.
            </p>
            <p className="mt-4 text-lg leading-8 text-[#4B5563]">
              Nuestros profesionales acompañan con sensibilidad, ofreciendo apoyo práctico, emocional y sanitario cuando se necesita, siempre con respeto por la dignidad y la autonomía.
            </p>
          </div>

          <div className="rounded-[34px] bg-[#FFF5E8] p-8 text-[#1F2937] shadow-[0_20px_45px_rgba(242,154,56,0.16)] sm:p-10 lg:ml-auto lg:max-w-[430px] lg:p-10">
            <h3 className="text-2xl font-bold">¿Por qué elegirnos?</h3>
            <div className="mt-8 space-y-4">
              {reasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <div key={reason.title} className="flex items-start gap-3 rounded-2xl border border-[#F8E0BC] bg-white/80 p-4">
                    <div className="mt-0.5 rounded-full bg-[#F29A38]/10 p-2 text-[#F29A38]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-medium">{reason.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FCFB] px-6 py-24 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#F29A38]">
              Servicios
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Nuestros servicios
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="group flex h-full flex-col rounded-[28px] border border-[#DDF7F5] bg-white p-7 shadow-[0_16px_40px_rgba(15,25,30,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(15,158,152,0.12)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DDF7F5] text-[#0F9E98] transition duration-300 group-hover:bg-[#0F9E98] group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-[#1F2937]">{service.title}</h3>
                  <p className="mt-3 flex-1 text-base leading-7 text-[#4B5563]">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#DDF7F5] px-6 py-40 sm:px-8 lg:px-10 lg:py-48">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[40px] border border-[#BFEAE6] bg-white/80 p-10 shadow-[0_20px_50px_rgba(15,158,152,0.12)] sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:p-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#F29A38]">
              Contacto
            </p>
            <h2 className="mt-4 text-4xl font-bold text-[#1F2937] sm:text-5xl">
              Estamos aquí para ayudarte
            </h2>
            <div className="mt-8 space-y-5 text-[#4B5563]">
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-[#0F9E98]" />
                <span className="text-lg">+34 600 000 000</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-[#0F9E98]" />
                <span className="text-lg">Marbella, Costa del Sol</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-[#0F9E98]" />
                <span className="text-lg">info@solyvidacuidados.com</span>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-10 shadow-[0_20px_45px_rgba(15,158,152,0.12)] sm:p-12">
            <h3 className="text-3xl font-bold text-[#1F2937]">¿Quieres más información?</h3>
            <p className="mt-5 text-lg leading-8 text-[#4B5563]">
              Escríbenos y te responderemos con gusto para conocer tus necesidades y explicarte cómo podemos ayudarte.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center rounded-2xl bg-[#0F9E98] px-8 py-4 font-semibold text-white transition duration-300 hover:bg-[#0B817C]"
            >
              Contactar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}