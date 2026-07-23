import { FileText, FolderOpen, LifeBuoy, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import {
  downloadFamilyDocument,
  formatFamilyDate,
  getFamilyDocuments,
  triggerFamilyDownload,
  type FamilyDocument,
} from "../services/familyPortalService";

type DashboardRole = "admin" | "worker" | "family";

const documentsByRole: Record<DashboardRole, Array<{ title: string; description: string; path: string }>> = {
  admin: [
    { title: "Agenda y visitas", description: "Consulta la planificación y el histórico operativo.", path: "/visits" },
    { title: "Catálogo de servicios", description: "Revisa los servicios activos y su cobertura.", path: "/services" },
    { title: "Familiares registrados", description: "Accede a los contactos familiares y seguimiento.", path: "/family-members" },
  ],
  worker: [
    { title: "Agenda profesional", description: "Accede a tus visitas y organización diaria.", path: "/worker#agenda" },
    { title: "Documentación PRL", description: "Material operativo y cumplimiento interno.", path: "/contact" },
    { title: "Incidencias y seguimiento", description: "Consulta observaciones y actuaciones pendientes.", path: "/incidents" },
  ],
  family: [
    { title: "Informes de seguimiento", description: "Accede al seguimiento del estado y visitas programadas.", path: "/reports" },
    { title: "Documentación asistencial", description: "Solicita documentación complementaria del servicio.", path: "/contact" },
    { title: "Canal de comunicación", description: "Ponte en contacto con el equipo de coordinación.", path: "/contact" },
  ],
};

export default function Documentation() {
  const navigate = useNavigate();
  const role = ((localStorage.getItem("role") as DashboardRole) || "admin") === "worker"
    ? "worker"
    : localStorage.getItem("role") === "family"
    ? "family"
    : "admin";
  const [familyDocuments, setFamilyDocuments] = useState<FamilyDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<FamilyDocument | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (role !== "family") {
      return;
    }

    loadFamilyDocuments();
  }, [role]);

  async function loadFamilyDocuments() {
    try {
      const documents = await getFamilyDocuments();
      setFamilyDocuments(documents);
      setSelectedDocument(documents[0] ?? null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDownload(documentId: number) {
    try {
      const payload = await downloadFamilyDocument(documentId);
      triggerFamilyDownload(payload);
    } catch (error) {
      console.error(error);
      alert("No se pudo descargar el documento.");
    }
  }

  const filteredFamilyDocuments = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) {
      return familyDocuments;
    }

    return familyDocuments.filter((document) => `${document.title} ${document.description} ${document.category}`.toLowerCase().includes(normalized));
  }, [familyDocuments, search]);

  const filteredRoleDocuments = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    const source = documentsByRole[role];
    if (!normalized) {
      return source;
    }

    return source.filter((document) => `${document.title} ${document.description}`.toLowerCase().includes(normalized));
  }, [role, search]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title="Documentación"
          subtitle="Repositorio operativo y accesos útiles según el perfil de usuario."
          name={role === "admin" ? "Carmen López" : role === "worker" ? "María García" : "Familia López"}
          role={role === "admin" ? "Administradora" : role === "worker" ? "Trabajadora" : "Familiar"}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Buscar documentación"
        />

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <div className="flex items-center gap-3">
              <FolderOpen className="h-6 w-6 text-[#0F9E98]" />
              <h2 className="text-2xl font-bold text-[#1F2937]">Recursos disponibles</h2>
            </div>

            <div className="mt-6 space-y-4">
              {role === "family"
                ? filteredFamilyDocuments.map((document) => (
                    <button
                      key={document.id}
                      onClick={() => setSelectedDocument(document)}
                      className="w-full rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-left transition duration-300 hover:border-[#CDEAE5] hover:bg-white"
                    >
                      <p className="text-lg font-bold text-[#1F2937]">{document.title}</p>
                      <p className="mt-2 text-sm leading-7 text-[#4B5563]">{document.description}</p>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#0F9E98]">{document.category} · {formatFamilyDate(document.updatedAt)}</p>
                    </button>
                  ))
                : filteredRoleDocuments.map((document) => (
                    <button
                      key={document.title}
                      onClick={() => navigate(document.path)}
                      className="w-full rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-left transition duration-300 hover:border-[#CDEAE5] hover:bg-white"
                    >
                      <p className="text-lg font-bold text-[#1F2937]">{document.title}</p>
                      <p className="mt-2 text-sm leading-7 text-[#4B5563]">{document.description}</p>
                    </button>
                  ))}
              {role === "family" && filteredFamilyDocuments.length === 0 && (
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm text-[#4B5563]">
                  No se encontraron resultados.
                </div>
              )}
              {role !== "family" && filteredRoleDocuments.length === 0 && (
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm text-[#4B5563]">
                  No se encontraron resultados.
                </div>
              )}
            </div>
          </article>

          <article className="rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <h3 className="text-xl font-bold text-[#1F2937]">Soporte documental</h3>
            <div className="mt-5 space-y-4">
              {role === "family" && selectedDocument ? (
                <>
                  <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><ShieldCheck className="h-4 w-4 text-[#0F9E98]" /> {selectedDocument.title}</div>
                    <p className="mt-2 text-sm text-[#4B5563]">{selectedDocument.description}</p>
                    <p className="mt-3 text-xs text-[#6B7280]">Actualizado {formatFamilyDate(selectedDocument.updatedAt)}</p>
                  </div>
                  <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><FileText className="h-4 w-4 text-[#0F9E98]" /> Acciones</div>
                    <p className="mt-2 text-sm text-[#4B5563]">Descarga el documento o contacta con coordinación si necesitas ampliación o copia adicional.</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => handleDownload(selectedDocument.id)}
                      className="inline-flex items-center justify-center rounded-2xl bg-[#0F9E98] px-5 py-3 font-semibold text-white transition duration-300 hover:bg-[#0B817C]"
                    >
                      <FileText className="mr-2 h-4 w-4" /> Descargar documento
                    </button>
                    <button
                      onClick={() => navigate("/contact")}
                      className="inline-flex items-center justify-center rounded-2xl border border-[#D8EFEA] bg-[#F7FCFB] px-5 py-3 font-semibold text-[#1F2937] transition duration-300 hover:bg-[#ECFAF8]"
                    >
                      <LifeBuoy className="mr-2 h-4 w-4 text-[#0F9E98]" /> Contactar soporte
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><ShieldCheck className="h-4 w-4 text-[#0F9E98]" /> Validación interna</div>
                    <p className="mt-2 text-sm text-[#4B5563]">La documentación visible se adapta al rol y evita exponer información no autorizada.</p>
                  </div>
                  <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><FileText className="h-4 w-4 text-[#0F9E98]" /> Solicitudes</div>
                    <p className="mt-2 text-sm text-[#4B5563]">Si necesitas documentación adicional, usa el canal de contacto operativo.</p>
                  </div>
                  <button
                    onClick={() => navigate("/contact")}
                    className="inline-flex items-center rounded-2xl bg-[#0F9E98] px-5 py-3 font-semibold text-white transition duration-300 hover:bg-[#0B817C]"
                  >
                    <LifeBuoy className="mr-2 h-4 w-4" /> Contactar soporte
                  </button>
                </>
              )}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}