import { useEffect, useState } from "react";
import {
  Users,
  UserCog,
  CalendarDays,
  HeartHandshake,
  UsersRound,
} from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import VisitsChart from "../components/dashboard/VisitsChart";
import StatCard from "../components/dashboard/StatCard";

import { getDashboardData } from "../services/dashboardService";
import type { DashboardData } from "../services/dashboardService";

export default function Admin() {
  const [stats, setStats] = useState<DashboardData>({
    clientes: 0,
    trabajadores: 0,
    visitas: 0,
    servicios: 0,
    familiares: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboardData();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar
          title="Dashboard"
          subtitle="Resumen general de Sol y Vida Cuidados."
          name="Carmen López"
          role="Administradora"
        />

        {/* TARJETAS */}

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mt-8">
          <StatCard
            title="Clientes"
            value={stats.clientes}
            icon={Users}
          />

          <StatCard
            title="Trabajadores"
            value={stats.trabajadores}
            icon={UserCog}
          />

          <StatCard
            title="Visitas"
            value={stats.visitas}
            icon={CalendarDays}
          />

          <StatCard
            title="Servicios"
            value={stats.servicios}
            icon={HeartHandshake}
          />

          <StatCard
            title="Familiares"
            value={stats.familiares}
            icon={UsersRound}
          />
        </section>

        {/* GRÁFICA */}

        <section className="mt-8">
          <VisitsChart />
        </section>
      </main>
    </div>
  );
}