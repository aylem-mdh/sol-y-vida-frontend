export interface FamilyStatusItem {
  title: string;
  text: string;
}

export interface FamilyVisit {
  id: number;
  dayLabel: string;
  hour: string;
  professional: string;
  location: string;
  status: string;
  summary: string;
  relatedReportId?: number;
}

export interface FamilyMessage {
  id: number;
  sender: string;
  subject: string;
  body: string;
  sentAt: string;
  unread: boolean;
  category: "update" | "coordination" | "family";
}

export interface FamilyDocument {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
  category: string;
  fileName: string;
  content: string;
}

export interface FamilyReport {
  id: number;
  title: string;
  summary: string;
  createdAt: string;
  professional: string;
  status: string;
  details: string[];
}

export interface FamilyProfile {
  fullName: string;
  relation: string;
  email: string;
  phone: string;
  preferredContact: string;
  clientName: string;
  servicePlan: string;
  address: string;
  supportPhone: string;
  supportEmail: string;
  notes: string;
  notificationsEnabled: boolean;
}

export interface FamilyContactRequest {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface FamilyDashboardData {
  statusItems: FamilyStatusItem[];
  visits: FamilyVisit[];
  messages: FamilyMessage[];
  documents: FamilyDocument[];
  reports: FamilyReport[];
  profile: FamilyProfile;
}

interface FamilyPortalStore {
  statusItems: FamilyStatusItem[];
  visits: FamilyVisit[];
  messages: FamilyMessage[];
  documents: FamilyDocument[];
  reports: FamilyReport[];
  profile: FamilyProfile;
  contactRequests: FamilyContactRequest[];
}

interface FamilyMessageDraft {
  subject: string;
  body: string;
}

interface FamilyProfileUpdate {
  email: string;
  phone: string;
  preferredContact: string;
  notes: string;
  notificationsEnabled: boolean;
}

interface FamilyContactDraft {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface DownloadPayload {
  fileName: string;
  mimeType: string;
  content: string;
}

const STORAGE_KEY = "sol-y-vida-family-portal";

const initialStore: FamilyPortalStore = {
  statusItems: [
    {
      title: "Estado general",
      text: "Carmen se encuentra estable, tranquila y con buena movilidad durante la jornada.",
    },
    {
      title: "Medicación",
      text: "Administración completada en horario y sin incidencias registradas por el equipo.",
    },
    {
      title: "Alimentación",
      text: "Desayuno y almuerzo realizados correctamente según la pauta asistencial vigente.",
    },
  ],
  visits: [
    {
      id: 1,
      dayLabel: "Hoy",
      hour: "18:00",
      professional: "María García",
      location: "Torremolinos",
      status: "Confirmada",
      summary: "Revisión general y control de medicación.",
      relatedReportId: 101,
    },
    {
      id: 2,
      dayLabel: "Mañana",
      hour: "09:30",
      professional: "Laura Pérez",
      location: "Torremolinos",
      status: "Planificada",
      summary: "Seguimiento de movilidad y apoyo en aseo personal.",
      relatedReportId: 102,
    },
    {
      id: 3,
      dayLabel: "Viernes",
      hour: "17:15",
      professional: "María García",
      location: "Torremolinos",
      status: "Planificada",
      summary: "Revisión semanal y actualización del plan de cuidados.",
      relatedReportId: 103,
    },
  ],
  messages: [
    {
      id: 201,
      sender: "María García",
      subject: "Visita completada",
      body: "Todo ha ido bien durante la visita de hoy. Carmen ha mantenido buen ánimo, constantes estables y tolerancia correcta a la medicación.",
      sentAt: "2026-07-18T18:10:00.000Z",
      unread: true,
      category: "update",
    },
    {
      id: 202,
      sender: "Coordinación",
      subject: "Informe semanal disponible",
      body: "Ya puedes revisar el informe semanal consolidado con la evolución general, próximas visitas y observaciones del equipo.",
      sentAt: "2026-07-17T11:45:00.000Z",
      unread: true,
      category: "coordination",
    },
  ],
  documents: [
    {
      id: 301,
      title: "Informe clínico - julio",
      description: "Resumen clínico actualizado con observaciones del equipo asistencial.",
      updatedAt: "2026-07-18T10:00:00.000Z",
      category: "Informe",
      fileName: "informe-clinico-julio.txt",
      content: "Informe clínico de julio\n\nPaciente: Carmen López\nEstado general: estable\nObservaciones: evolución positiva y sin incidencias relevantes.",
    },
    {
      id: 302,
      title: "Plan de cuidados",
      description: "Pauta activa de atención domiciliaria y seguimiento diario.",
      updatedAt: "2026-07-16T09:15:00.000Z",
      category: "Plan asistencial",
      fileName: "plan-de-cuidados.txt",
      content: "Plan de cuidados\n\nCobertura: lunes a viernes\nObjetivos: mantenimiento de autonomía, adherencia terapéutica y seguimiento nutricional.",
    },
    {
      id: 303,
      title: "Registro de medicación",
      description: "Control de administración y pauta terapéutica semanal.",
      updatedAt: "2026-07-15T16:20:00.000Z",
      category: "Medicación",
      fileName: "registro-de-medicacion.txt",
      content: "Registro de medicación\n\nSemana vigente completa y sin incidencias registradas.",
    },
  ],
  reports: [
    {
      id: 101,
      title: "Seguimiento semanal",
      summary: "Situación estable con cumplimiento completo de la pauta asistencial y buena respuesta general.",
      createdAt: "2026-07-18T08:30:00.000Z",
      professional: "María García",
      status: "Actualizado",
      details: [
        "Movilidad mantenida con apoyo parcial en desplazamientos cortos.",
        "Medicación administrada en horario sin incidencias.",
        "Buen estado anímico y colaboración correcta con el equipo.",
      ],
    },
    {
      id: 102,
      title: "Revisión funcional",
      summary: "Se mantiene autonomía parcial en actividades básicas con necesidad de supervisión ligera.",
      createdAt: "2026-07-14T12:00:00.000Z",
      professional: "Laura Pérez",
      status: "Revisado",
      details: [
        "Transferencias seguras con mínima asistencia.",
        "Sin cambios relevantes en tolerancia al esfuerzo.",
        "Continuar plan actual y seguimiento diario.",
      ],
    },
    {
      id: 103,
      title: "Evolución nutricional",
      summary: "Ingesta adecuada y buena tolerancia a las pautas alimentarias establecidas.",
      createdAt: "2026-07-10T17:10:00.000Z",
      professional: "María García",
      status: "Archivado",
      details: [
        "Desayuno y almuerzo realizados con normalidad.",
        "Hidratación correcta durante la jornada.",
        "Se recomienda mantener supervisión habitual.",
      ],
    },
  ],
  profile: {
    fullName: "Laura López Martín",
    relation: "Hija y contacto principal",
    email: "familia.lopez@solyvidacare.com",
    phone: "600 555 218",
    preferredContact: "Teléfono",
    clientName: "Carmen López",
    servicePlan: "Atención domiciliaria de lunes a viernes",
    address: "Torremolinos (Málaga)",
    supportPhone: "626 406 477",
    supportEmail: "solyvida@solyvidacare.com",
    notes: "Solicita aviso telefónico ante cualquier cambio relevante de horario o medicación.",
    notificationsEnabled: true,
  },
  contactRequests: [],
};

interface FamilyPortalGateway {
  getDashboardData(): Promise<FamilyDashboardData>;
  getMessages(): Promise<FamilyMessage[]>;
  getDocuments(): Promise<FamilyDocument[]>;
  getReports(): Promise<FamilyReport[]>;
  getProfile(): Promise<FamilyProfile>;
  markMessageAsRead(id: number): Promise<void>;
  sendMessage(draft: FamilyMessageDraft): Promise<FamilyMessage>;
  submitContactRequest(draft: FamilyContactDraft): Promise<FamilyContactRequest>;
  updateProfile(update: FamilyProfileUpdate): Promise<FamilyProfile>;
  getDocumentDownload(id: number): Promise<DownloadPayload>;
  getReportDownload(id: number): Promise<DownloadPayload>;
}

const mockFamilyPortalGateway: FamilyPortalGateway = {
  async getDashboardData() {
    const store = readStore();
    return clone({
      statusItems: store.statusItems,
      visits: store.visits,
      messages: sortMessages(store.messages).slice(0, 3),
      documents: sortDocuments(store.documents).slice(0, 3),
      reports: sortReports(store.reports).slice(0, 3),
      profile: store.profile,
    });
  },

  async getMessages() {
    return clone(sortMessages(readStore().messages));
  },

  async getDocuments() {
    return clone(sortDocuments(readStore().documents));
  },

  async getReports() {
    return clone(sortReports(readStore().reports));
  },

  async getProfile() {
    return clone(readStore().profile);
  },

  async markMessageAsRead(id) {
    const store = readStore();
    store.messages = store.messages.map((message) =>
      message.id === id ? { ...message, unread: false } : message
    );
    saveStore(store);
  },

  async sendMessage(draft) {
    const store = readStore();
    const message: FamilyMessage = {
      id: Date.now(),
      sender: "Familia López",
      subject: draft.subject.trim(),
      body: draft.body.trim(),
      sentAt: new Date().toISOString(),
      unread: false,
      category: "family",
    };

    store.messages = [message, ...store.messages];
    saveStore(store);
    return clone(message);
  },

  async submitContactRequest(draft) {
    const store = readStore();
    const request: FamilyContactRequest = {
      id: Date.now(),
      fullName: draft.fullName.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      subject: draft.subject.trim(),
      message: draft.message.trim(),
      createdAt: new Date().toISOString(),
    };

    store.contactRequests = [request, ...store.contactRequests];
    store.messages = [
      {
        id: request.id + 1,
        sender: "Coordinación",
        subject: `Solicitud recibida: ${request.subject}`,
        body: "Hemos recibido tu solicitud y el equipo de coordinación contactará contigo a la mayor brevedad posible.",
        sentAt: request.createdAt,
        unread: true,
        category: "coordination",
      },
      ...store.messages,
    ];
    saveStore(store);
    return clone(request);
  },

  async updateProfile(update) {
    const store = readStore();
    store.profile = {
      ...store.profile,
      ...update,
    };
    saveStore(store);
    return clone(store.profile);
  },

  async getDocumentDownload(id) {
    const document = readStore().documents.find((item) => item.id === id);

    if (!document) {
      throw new Error("Documento no encontrado.");
    }

    return {
      fileName: document.fileName,
      mimeType: "text/plain;charset=utf-8",
      content: document.content,
    };
  },

  async getReportDownload(id) {
    const report = readStore().reports.find((item) => item.id === id);

    if (!report) {
      throw new Error("Informe no encontrado.");
    }

    return {
      fileName: `${slugify(report.title)}.txt`,
      mimeType: "text/plain;charset=utf-8",
      content: [
        report.title,
        `Profesional: ${report.professional}`,
        `Estado: ${report.status}`,
        "",
        report.summary,
        "",
        ...report.details.map((detail, index) => `${index + 1}. ${detail}`),
      ].join("\n"),
    };
  },
};

const familyPortalGateway = mockFamilyPortalGateway;

export async function getFamilyDashboardData() {
  return familyPortalGateway.getDashboardData();
}

export async function getFamilyMessages() {
  return familyPortalGateway.getMessages();
}

export async function getFamilyDocuments() {
  return familyPortalGateway.getDocuments();
}

export async function getFamilyReports() {
  return familyPortalGateway.getReports();
}

export async function getFamilyProfile() {
  return familyPortalGateway.getProfile();
}

export async function markFamilyMessageAsRead(id: number) {
  return familyPortalGateway.markMessageAsRead(id);
}

export async function sendFamilyMessage(draft: FamilyMessageDraft) {
  return familyPortalGateway.sendMessage(draft);
}

export async function submitFamilyContactRequest(draft: FamilyContactDraft) {
  return familyPortalGateway.submitContactRequest(draft);
}

export async function updateFamilyProfile(update: FamilyProfileUpdate) {
  return familyPortalGateway.updateProfile(update);
}

export async function downloadFamilyDocument(id: number) {
  return familyPortalGateway.getDocumentDownload(id);
}

export async function downloadFamilyReport(id: number) {
  return familyPortalGateway.getReportDownload(id);
}

export function formatFamilyDate(value: string) {
  return new Date(value).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatFamilyDateTime(value: string) {
  return new Date(value).toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function triggerFamilyDownload(payload: DownloadPayload) {
  const blob = new Blob([payload.content], { type: payload.mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = payload.fileName;
  link.click();

  URL.revokeObjectURL(url);
}

function readStore(): FamilyPortalStore {
  if (typeof window === "undefined") {
    return clone(initialStore);
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    const seeded = clone(initialStore);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<FamilyPortalStore>;
    const merged: FamilyPortalStore = {
      ...clone(initialStore),
      ...parsed,
      profile: {
        ...initialStore.profile,
        ...(parsed.profile ?? {}),
      },
      statusItems: parsed.statusItems ?? clone(initialStore.statusItems),
      visits: parsed.visits ?? clone(initialStore.visits),
      messages: parsed.messages ?? clone(initialStore.messages),
      documents: parsed.documents ?? clone(initialStore.documents),
      reports: parsed.reports ?? clone(initialStore.reports),
      contactRequests: parsed.contactRequests ?? [],
    };

    return merged;
  } catch {
    const seeded = clone(initialStore);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function saveStore(store: FamilyPortalStore) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function sortMessages(messages: FamilyMessage[]) {
  return [...messages].sort(
    (left, right) => new Date(right.sentAt).getTime() - new Date(left.sentAt).getTime()
  );
}

function sortDocuments(documents: FamilyDocument[]) {
  return [...documents].sort(
    (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
  );
}

function sortReports(reports: FamilyReport[]) {
  return [...reports].sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}