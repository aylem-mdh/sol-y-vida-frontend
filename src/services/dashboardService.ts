import { getClients } from "./clientService";
import { getWorkers } from "./workerService";
import { getVisits } from "./visitService";
import { getServices } from "./serviceService";
import { getFamilyMembers } from "./familyMemberService";

export interface DashboardData {
  clientes: number;
  trabajadores: number;
  visitas: number;
  servicios: number;
  familiares: number;
}

export async function getDashboardData(): Promise<DashboardData> {
  const [
    clients,
    workers,
    visits,
    services,
    familyMembers,
  ] = await Promise.all([
    getClients(),
    getWorkers(),
    getVisits(),
    getServices(),
    getFamilyMembers(),
  ]);

  return {
    clientes: clients.length,
    trabajadores: workers.length,
    visitas: visits.length,
    servicios: services.length,
    familiares: familyMembers.length,
  };
}