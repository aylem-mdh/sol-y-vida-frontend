import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function Worker() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar
          title="Bienvenida 👋"
          subtitle="Aquí tienes tu agenda y próximas visitas."
          name="María García"
          role="Trabajadora"
        />

        <section className="grid grid-cols-4 gap-6 mt-8">
          {[
            ["4", "Visitas hoy"],
            ["32h", "Horas semanales"],
            ["98%", "Puntualidad"],
            ["4.9", "Valoración"],
          ].map(([value, label]) => (
            <div key={label} className="bg-white rounded-3xl shadow-sm p-6">
              <h2 className="text-4xl font-bold text-[#0B4EA2]">{value}</h2>
              <p className="text-gray-500 mt-2">{label}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-3 gap-6 mt-8">
          <div className="col-span-2 bg-white rounded-3xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Agenda de hoy
            </h3>

            <div className="space-y-4">
              {[
                ["08:00", "Carmen López", "Torremolinos"],
                ["11:00", "Antonio Ruiz", "Benalmádena"],
                ["15:00", "María Sánchez", "Fuengirola"],
              ].map(([time, client, zone]) => (
                <div
                  key={time}
                  className="flex justify-between items-center bg-slate-50 rounded-2xl p-5"
                >
                  <div>
                    <p className="font-bold text-lg">{time}</p>
                    <p className="text-gray-700">{client}</p>
                    <p className="text-sm text-gray-500">{zone}</p>
                  </div>

                  <button className="bg-orange-500 text-white px-5 py-3 rounded-xl font-semibold">
                    Check-in
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-slate-800">
              Próxima visita
            </h3>

            <div className="mt-8">
              <p className="text-5xl">🏠</p>
              <p className="text-2xl font-bold mt-4">Carmen López</p>
              <p className="text-gray-500 mt-2">Torremolinos</p>

              <div className="mt-6 bg-blue-50 rounded-2xl p-5">
                <p className="font-semibold">Hora</p>
                <p className="text-2xl text-[#0B4EA2] font-bold">08:00</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Documentos
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">📄 Nómina Junio</div>
              <div className="bg-slate-50 rounded-2xl p-4">📄 Contrato</div>
              <div className="bg-slate-50 rounded-2xl p-4">📄 PRL</div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Acciones rápidas
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-50 rounded-2xl p-4 font-semibold">
                Reportar incidencia
              </button>

              <button className="bg-orange-50 rounded-2xl p-4 font-semibold">
                Subir fotos
              </button>

              <button className="bg-blue-50 rounded-2xl p-4 font-semibold">
                Ver ruta
              </button>

              <button className="bg-orange-50 rounded-2xl p-4 font-semibold">
                Contactar admin
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}