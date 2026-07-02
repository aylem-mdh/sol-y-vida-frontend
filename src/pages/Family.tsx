import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function Family() {
  return (
    <div className="min-h-screen bg-soft">
      {/* HERO */}
      <section className="bg-slate-900 pb-16 pt-8">
        <div className="px-6 max-w-7xl mx-auto">
          <Header />
        </div>

        <div className="text-center mt-20 text-white px-6">
          <h1 className="text-5xl font-bold">Panel Familiar</h1>

          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Gestiona servicios, visitas y comunicación con tu cuidador.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-24">
        {/* Cards principales */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            ["👩‍⚕️", "Cuidador asignado", "María González"],
            ["📅", "Próxima visita", "Hoy · 17:00"],
            ["🟢", "Estado", "Servicio activo"],
          ].map(([icon, title, value]) => (
            <div key={title} className="bg-white rounded-3xl shadow-md p-8">
              <div className="text-4xl">{icon}</div>
              <h3 className="text-xl font-bold mt-4">{title}</h3>
              <p className="text-gray-600 mt-2 text-lg">{value}</p>
            </div>
          ))}
        </section>

        {/* Acciones */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-md p-10">
            <h2 className="text-2xl font-bold text-gray-800">
              Solicitar servicio adicional
            </h2>

            <p className="mt-4 text-gray-600">
              Solicita horas extra, acompañamiento médico o asistencia especial.
            </p>

            <button className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-semibold">
              Solicitar
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-10">
            <h2 className="text-2xl font-bold text-gray-800">Mensajes</h2>

            <p className="mt-4 text-gray-600">
              Consulta mensajes y actualizaciones de tu cuidador.
            </p>

            <button className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-semibold">
              Ver mensajes
            </button>
          </div>
        </section>

        {/* Historial */}
        <section className="mt-16 bg-white rounded-3xl shadow-md p-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Historial reciente
          </h2>

          <div className="mt-6 space-y-4">
            {[
              "01 Jul · Servicio completado",
              "30 Jun · Acompañamiento médico",
              "28 Jun · Visita domiciliaria",
            ].map((item) => (
              <div
                key={item}
                className="border border-gray-100 rounded-xl px-5 py-4"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}