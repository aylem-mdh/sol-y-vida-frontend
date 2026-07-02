import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-soft">
      <section className="relative min-h-[82vh] overflow-hidden bg-slate-100">
        <div className="absolute inset-0 bg-slate-900"></div>

        {/* FOTO MUJER */}
        <div
          className="absolute inset-y-0 right-0 w-[65%] bg-no-repeat"
          style={{
            backgroundImage: "url('/hero.png')",
            backgroundSize: "contain",
            backgroundPosition: "right bottom",
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/75 via-40% to-transparent"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-6">
          {/* COBERTURA */}
          <div className="pt-6 ml-[180px] text-left text-orange-400 text-base md:text-lg tracking-[0.14em] font-semibold mb-5 whitespace-nowrap">
            Torremolinos · Benalmádena · Fuengirola · Mijas · Alhaurín de la Torre
          </div>

          {/* HEADER */}
          <div className="mb-12 ml-10 scale-95 origin-left">
            <Header />
          </div>
        </div>

        {/* HERO TEXT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white w-full">
          <div className="pt-14 md:pt-16 ml-2">
            <h1 className="text-4xl md:text-[56px] font-light tracking-[-0.02em] leading-tight max-w-4xl">
              Cuidamos de quienes más quieres
            </h1>

            <p className="mt-5 text-lg md:text-xl max-w-3xl text-gray-200 leading-relaxed">
              Cuidado profesional y humano para que tus seres queridos reciban
              la atención que merecen, con seguridad, cercanía y sin salir de
              casa.
            </p>

            <div className="mt-7 space-y-3 text-lg text-gray-100">
              <p>✓ Acompañamiento y compañía</p>
              <p>✓ Ayuda a domicilio</p>
              <p>✓ Respiro familiar</p>
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-4">
              <Link
                to="/services"
                className="bg-primary hover:opacity-90 px-5 py-2.5 rounded-xl text-base font-semibold transition shadow-lg"
              >
                Nuestros Servicios
              </Link>

              <Link
                to="/contact"
                className="bg-white text-gray-900 hover:bg-gray-100 px-5 py-2.5 rounded-xl text-base font-semibold transition shadow-lg"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-24">
        {/* KPI */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            ["25", "Familias atendidas este mes"],
            ["128", "Servicios realizados"],
            ["4.8/5", "Valoración media"],
            ["18", "Trabajadores activos"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow-md p-6 text-center"
            >
              <h3 className="text-3xl font-bold text-primary">{value}</h3>
              <p className="text-gray-600 mt-2">{label}</p>
            </div>
          ))}
        </section>

        {/* WHY US */}
        <section className="mt-28">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">
              ¿Por qué elegirnos?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              ["👩‍⚕️", "Profesionales cualificados"],
              ["❤️", "Atención personalizada"],
              ["🛡️", "Confianza y seguridad"],
              ["📋", "Seguimiento diario"],
              ["📞", "Comunicación constante"],
              ["🕒", "Flexibilidad horaria"],
            ].map(([icon, title]) => (
              <div key={title} className="bg-white rounded-2xl shadow-md p-8">
                <div className="text-4xl">{icon}</div>
                <h3 className="text-xl font-bold mt-4">{title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="mt-28">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">
              Nuestros Servicios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              ["👥", "ACOMPAÑAMIENTO Y COMPAÑÍA"],
              ["🏠", "AYUDA A DOMICILIO"],
              ["🏥", "ACOMPAÑAMIENTO MÉDICO Y HOSPITALARIO"],
              ["🕒", "RESPIRO FAMILIAR"],
            ].map(([icon, title]) => (
              <div key={title} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-5xl">{icon}</div>
                <h3 className="text-2xl font-bold mt-4">{title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT REAL */}
        <section className="mt-28">
          <div className="bg-white rounded-3xl shadow-md p-10 md:p-14">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Sobre Nosotros
            </h2>

            <p className="text-gray-600 leading-relaxed text-lg">
              Somos una empresa especializada en la atención y acompañamiento de
              personas mayores en la Costa del Sol.
            </p>

            <p className="text-gray-600 leading-relaxed text-lg mt-5">
              Ofrecemos servicios adaptados a las necesidades de cada familia,
              con personal cualificado y seleccionado cuidadosamente para
              garantizar un trato humano, respetuoso y profesional.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 bg-primary rounded-3xl px-8 py-12 md:px-14 md:py-16 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                ¿Necesitas ayuda para un familiar?
              </h2>

              <p className="mt-4 text-lg text-blue-100 max-w-2xl">
                Solicita una valoración gratuita y te asesoraremos sin compromiso.
              </p>
            </div>

            <Link
              to="/contact"
              className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
            >
              Solicitar valoración gratuita →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}