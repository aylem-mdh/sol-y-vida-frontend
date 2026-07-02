import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function Services() {
  return (
    <div className="min-h-screen bg-soft">
      {/* HERO OSCURO */}
      <section className="bg-slate-900 pb-16 pt-8">
        <div className="px-6 max-w-7xl mx-auto">
          <Header />
        </div>

        <div className="text-center mt-20 text-white px-6">
          <h1 className="text-5xl font-bold">Nuestros Servicios</h1>

          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Cuidado personalizado para cada necesidad.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-24">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            [
              "👥",
              "Acompañamiento y compañía",
              "Compañía diaria, paseos y apoyo emocional.",
            ],
            [
              "🏠",
              "Ayuda a domicilio",
              "Apoyo en higiene, movilidad y tareas básicas.",
            ],
            [
              "🏥",
              "Acompañamiento médico",
              "Asistencia en consultas y hospitales.",
            ],
            [
              "🕒",
              "Respiro familiar",
              "Cuidamos mientras tú descansas.",
            ],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-xl transition"
            >
              <div className="text-5xl">{icon}</div>

              <h3 className="text-2xl font-bold mt-5">{title}</h3>

              <p className="text-gray-600 mt-4 text-lg">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-28">
          <h2 className="text-4xl font-bold text-center text-gray-800">
            ¿Cómo trabajamos?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              ["1", "Valoración gratuita"],
              ["2", "Selección del cuidador"],
              ["3", "Seguimiento continuo"],
            ].map(([num, title]) => (
              <div
                key={num}
                className="bg-white rounded-2xl shadow-md p-8 text-center"
              >
                <div className="text-4xl font-bold text-primary">{num}</div>
                <h3 className="text-xl font-semibold mt-4">{title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}