import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatusBadge from "../components/dashboard/StatusBadge";
import VisitsChart from "../components/dashboard/VisitsChart";
import ClientsTable from "../components/dashboard/ClientsTable";

export default function Admin() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar
          title="Bienvenida, Administradora 👋"
          subtitle="Aquí tienes un resumen de la actividad de Sol y Vida Cuidados."
          name="Carmen López"
          role="Administradora"
        />

        <section className="grid grid-cols-4 gap-6 mt-8">
          {[
            ["25", "Clientes activos"],
            ["18", "Trabajadores"],
            ["32", "Visitas hoy"],
            ["4.8", "Valoración media"],
          ].map(([value, label]) => (
            <div key={label} className="bg-white rounded-3xl shadow-sm p-6">
              <h2 className="text-4xl font-bold text-[#0B4EA2]">{value}</h2>
              <p className="text-gray-500 mt-2">{label}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-3 gap-6 mt-8">
          <div className="col-span-2">
            <VisitsChart />
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Visitas de hoy
            </h3>

            <div className="space-y-5">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">Carmen López</p>
                  <p className="text-sm text-gray-500">08:00</p>
                </div>
                <StatusBadge status="Completada" />
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">Antonio Ruiz</p>
                  <p className="text-sm text-gray-500">10:00</p>
                </div>
                <StatusBadge status="En curso" />
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">María Sánchez</p>
                  <p className="text-sm text-gray-500">12:00</p>
                </div>
                <StatusBadge status="Pendiente" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <ClientsTable />
        </section>
      </main>
    </div>
  );
}