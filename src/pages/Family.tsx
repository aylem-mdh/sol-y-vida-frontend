import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function Family() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar
          title="Bienvenidos 👋"
          subtitle="Consulta el estado y seguimiento del servicio."
          name="Familia López"
          role="Familia"
        />

        {/* Stats */}
        <section className="grid grid-cols-4 gap-6 mt-8">
          {[
            ["12", "Visitas este mes"],
            ["4.9", "Valoración"],
            ["98%", "Puntualidad"],
            ["24h", "Soporte"],
          ].map(([value, label]) => (
            <div key={label} className="bg-white rounded-3xl shadow-sm p-6">
              <h2 className="text-4xl font-bold text-[#0B4EA2]">{value}</h2>
              <p className="text-gray-500 mt-2">{label}</p>
            </div>
          ))}
        </section>

        {/* Estado + Próxima visita */}
        <section className="grid grid-cols-3 gap-6 mt-8">
          <div className="col-span-2 bg-white rounded-3xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Estado del familiar
            </h3>

            <div className="space-y-5">
              <div className="bg-green-50 rounded-2xl p-5">
                <p className="font-semibold text-green-700">Estado general</p>
                <p className="mt-2 text-gray-700">
                  Carmen se encuentra estable, tranquila y de buen ánimo.
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-5">
                <p className="font-semibold text-[#0B4EA2]">Comidas</p>
                <p className="mt-2 text-gray-700">
                  Desayuno y almuerzo completados correctamente.
                </p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-5">
                <p className="font-semibold text-orange-600">Medicación</p>
                <p className="mt-2 text-gray-700">
                  Medicación administrada a las 08:30.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-slate-800">
              Próxima visita
            </h3>

            <div className="mt-8">
              <p className="text-5xl">👩‍⚕️</p>
              <p className="text-2xl font-bold mt-4">María García</p>
              <p className="text-gray-500 mt-2">Cuidadora asignada</p>

              <div className="mt-6 bg-blue-50 rounded-2xl p-5">
                <p className="font-semibold">Hora</p>
                <p className="text-2xl text-[#0B4EA2] font-bold">18:00</p>
              </div>
            </div>
          </div>
        </section>

        {/* Actualizaciones + Fotos */}
        <section className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Últimas actualizaciones
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                ✅ Visita completada correctamente
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                🍽 Comida servida y completada
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                💊 Medicación administrada
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Fotos recientes
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 h-32 rounded-2xl flex items-center justify-center text-4xl">
                📷
              </div>

              <div className="bg-orange-50 h-32 rounded-2xl flex items-center justify-center text-4xl">
                📷
              </div>
            </div>
          </div>
        </section>

        {/* Bottom */}
        <section className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Mensajes
            </h3>

            <div className="bg-slate-50 rounded-2xl p-5">
              <p className="font-semibold">María García</p>
              <p className="text-gray-600 mt-2">
                Todo ha ido bien durante la visita de hoy.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Valorar servicio
            </h3>

            <p className="text-orange-500 text-4xl mb-6">★★★★★</p>

            <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-semibold">
              Dejar valoración
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}