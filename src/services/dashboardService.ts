import { getClients } from "./clientService";
import { getIncidents } from "./incidentService";
import { getWorkers } from "./workerService";
import { getVisits } from "./visitService";
import { getServices } from "./serviceService";
import { getFamilyMembers } from "./familyMemberService";

const weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export interface DashboardData {
  clientes: number;
  trabajadores: number;
  visitas: number;
  servicios: number;
  familiares: number;
}

export interface DashboardChartPoint {
  day: string;
  visits: number;
}

export interface DashboardUpcomingVisit {
  id: number;
  time: string;
  client: string;
  worker: string;
  zone: string;
}

export interface DashboardRecentClient {
  id: number;
  name: string;
  detail: string;
}

export interface DashboardIncident {
  id: number;
  level: string;
  message: string;
  when: string;
}

export interface DashboardCalendarItem {
  day: string;
  value: string;
  level: string;
}

export interface IncidentFeedItem {
  id: number;
  title: string;
  description: string;
  level: string;
  when: string;
  client: string;
  worker: string;
}

export interface AdminDashboardData extends DashboardData {
  incidencias: number;
  mensajes: number;
  serviciosActivos: number;
  chart: DashboardChartPoint[];
  upcomingVisits: DashboardUpcomingVisit[];
  recentClients: DashboardRecentClient[];
  incidents: DashboardIncident[];
  calendar: DashboardCalendarItem[];
}

export async function getDashboardData(): Promise<DashboardData> {
  const data = await getAdminDashboardData();

  return {
    clientes: data.clientes,
    trabajadores: data.trabajadores,
    visitas: data.visitas,
    servicios: data.servicios,
    familiares: data.familiares,
  };
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
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

  const sortedVisits = [...visits].sort(
    (left, right) => new Date(left.fecha).getTime() - new Date(right.fecha).getTime()
  );
  const sortedClients = [...clients].sort((left, right) => (right.id ?? 0) - (left.id ?? 0));

  const visitsPerDay = weekdays.map((day, index) => ({
    day,
    visits: visits.filter((visit) => new Date(visit.fecha).getDay() === index).length,
  }));

  const upcomingVisits = sortedVisits.slice(0, 3).map((visit) => ({
    id: visit.id,
    time: new Date(visit.fecha).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    client: visit.cliente,
    worker: visit.trabajador,
    zone: extractZone(visit.observaciones),
  }));

  const recentClients = sortedClients.slice(0, 3).map((client, index) => ({
    id: client.id,
    name: `${client.nombre} ${client.apellidos}`.trim(),
    detail: index === 0 ? "Alta más reciente" : `Cliente activo en ${client.ciudad ?? "seguimiento"}`,
  }));

  const incidents = sortedVisits
    .filter((visit) => visit.observaciones && visit.observaciones.trim().length > 0)
    .slice(0, 3)
    .map((visit, index) => ({
      id: visit.id,
      level: index === 0 ? "Prioridad alta" : index === 1 ? "Prioridad media" : "Seguimiento",
      message: visit.observaciones,
      when: formatRelative(visit.fecha),
    }));

  const calendar = visitsPerDay.slice(1).concat(visitsPerDay.slice(0, 1)).map((item) => ({
    day: expandDay(item.day),
    value: `${item.visits} ${item.visits === 1 ? "servicio" : "servicios"}`,
    level: item.visits >= 3 ? "Alto" : item.visits > 0 ? "Normal" : "Bajo",
  }));

  const activeServices = services.filter((service) => service.activo).length;
  const messages = familyMembers.filter((member) => member.esContactoPrincipal || member.email).length;

  return {
    clientes: clients.length,
    trabajadores: workers.length,
    visitas: visits.length,
    servicios: services.length,
    familiares: familyMembers.length,
    incidencias: incidents.length,
    mensajes: messages,
    serviciosActivos: activeServices,
    chart: visitsPerDay.slice(1).concat(visitsPerDay.slice(0, 1)),
    upcomingVisits,
    recentClients,
    incidents,
    calendar,
  };
}

function extractZone(notes: string | undefined) {
  if (!notes) {
    return "Zona asignada";
  }

  const trimmed = notes.trim();
  return trimmed.length > 36 ? `${trimmed.slice(0, 36)}...` : trimmed;
}

function formatRelative(date: string) {
  const diffMs = Math.abs(Date.now() - new Date(date).getTime());
  const diffHours = Math.max(1, Math.round(diffMs / (1000 * 60 * 60)));

  if (diffHours < 24) {
    return `Hace ${diffHours} h`;
  }

  const diffDays = Math.round(diffHours / 24);
  return `Hace ${diffDays} día${diffDays === 1 ? "" : "s"}`;
}

function expandDay(day: string) {
  return (
    {
      Lun: "Lunes",
      Mar: "Martes",
      Mié: "Miércoles",
      Jue: "Jueves",
      Vie: "Viernes",
      Sáb: "Sábado",
      Dom: "Domingo",
    }[day] ?? day
  );
}

export async function getIncidentFeed(): Promise<IncidentFeedItem[]> {
  const incidents = await getIncidents();

  return incidents.map((incident) => ({
    id: incident.id,
    title: incident.titulo,
    description: incident.descripcion,
    level: incident.nivelGravedad ?? "Media",
    when: formatRelative(incident.fecha),
    client: incident.cliente,
    worker: incident.trabajador,
  }));
}