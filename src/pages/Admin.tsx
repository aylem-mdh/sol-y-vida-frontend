import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function Admin() {
  return (
    <div className="min-h-screen bg-soft">
      {/* HERO */}
      <section className="bg-slate-900 pb-16 pt-8">
        <div className="px-6 max-w-7xl mx-auto">
          <Header />
        </div>

        <div className="text-center mt-20 text-white px-6">
          <h1 className="text-5xl font-bold">Panel Admin</h1>

          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Gestiona familias, trabajadores y solicitudes.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-24">
        {/* KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            ["25", "Familias activas"],
            ["18", "Trabajadores"],
            ["6", "Solicitudes nuevas"],
            ["128", "Servicios este mes"],
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

        {/* Gestión */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl shadow-md p-10">
            <h2 className="text-2xl font-bold text-gray-800">Familias</h2>
            <p className="mt-4 text-gray-600">
              Gestiona perfiles y servicios activos.
            </p>
            <button className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-semibold">
              Ver familias
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-10">
            <h2 className="text-2xl font-bold text-gray-800">Trabajadores</h2>
            <p className="mt-4 text-gray-600">
              Asignaciones, horarios y disponibilidad.
            </p>
            <button className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-semibold">
              Ver trabajadores
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-10">
            <h2 className="text-2xl font-bold text-gray-800">Solicitudes</h2>
            <p className="mt-4 text-gray-600">
              Nuevas peticiones pendientes.
            </p>
            <button className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-semibold">
              Revisar
            </button>
          </div>
        </section>

        {/* Actividad */}
        <section className="mt-16 bg-white rounded-3xl shadow-md p-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Actividad reciente
          </h2>

          <div className="mt-6 space-y-4">
            {[
              "Nueva solicitud recibida · Familia García",
              "Trabajador asignado · María López",
              "Servicio completado · Torremolinos",
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