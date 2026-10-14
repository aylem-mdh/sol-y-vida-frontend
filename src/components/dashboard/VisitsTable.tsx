import { useMemo, useState } from "react";
import { CheckCircle2, CircleDashed, Eye, MapPin, Pencil, Trash2 } from "lucide-react";
import type { Visit } from "../../services/visitService";
import { useTranslation } from "react-i18next";
import Modal from "../ui/Modal";

interface Props {
  visits: Visit[];
  onDelete: (id: number) => void;
  onEdit: (visit: Visit) => void;
  canEdit?: boolean;
  searchTerm?: string;
  onSearchTermChange?: (value: string) => void;
  hideSearchInput?: boolean;
}

export default function VisitsTable({
  visits,
  onDelete,
  onEdit,
  canEdit = true,
  searchTerm,
  onSearchTermChange,
  hideSearchInput = false,
}: Props) {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const effectiveSearch = searchTerm ?? search;
  const handleSearchChange = onSearchTermChange ?? setSearch;

  type VisitStatus = "pending" | "inProgress" | "completed" | "cancelled";

  function getLocale() {
    return i18n.language === "es" ? "es-ES" : i18n.language === "fr" ? "fr-FR" : i18n.language === "de" ? "de-DE" : "en-US";
  }

  function formatVisitDate(value: string) {
    return new Intl.DateTimeFormat(getLocale(), {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  }

  function formatScheduledDate(value: string) {
    return formatVisitDate(value).replace(",", " -");
  }

  function hasCoordinates(latitude?: number, longitude?: number) {
    return typeof latitude === "number" && typeof longitude === "number";
  }

  function formatCoordinates(latitude?: number, longitude?: number) {
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return "-";
    }

    return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  }

  function getMapsUrl(latitude?: number, longitude?: number) {
    if (!hasCoordinates(latitude, longitude)) {
      return null;
    }

    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }

  function getVisitStatus(visit: Visit): VisitStatus {
    const rawStatus = visit.estado?.toLowerCase() ?? "";

    if (rawStatus.includes("cancel")) {
      return "cancelled";
    }

    if (rawStatus.includes("complet") || visit.endedAt) {
      return "completed";
    }

    if (rawStatus.includes("curso") || visit.startedAt) {
      return "inProgress";
    }

    return "pending";
  }

  function getStatusLabel(status: VisitStatus) {
    if (status === "completed") return t("pages.visits.statusCompleted");
    if (status === "inProgress") return t("pages.visits.statusInProgress");
    if (status === "cancelled") return t("pages.visits.statusCancelled");
    return t("pages.visits.statusPending");
  }

  function getStatusPill(status: VisitStatus) {
    if (status === "completed") {
      return "bg-[#ECFAF8] text-[#0F9E98]";
    }

    if (status === "inProgress") {
      return "bg-[#EEF6FF] text-[#0B4EA2]";
    }

    if (status === "cancelled") {
      return "bg-[#FDECEC] text-[#B42318]";
    }

    return "bg-[#FFF7E8] text-[#A16207]";
  }

  function getCheckSummary(type: "start" | "end", visit: Visit) {
    const date = type === "start" ? visit.startedAt : visit.endedAt;

    if (!date) {
      return type === "start" ? t("pages.visits.checkInPending") : t("pages.visits.checkOutPending");
    }

    const done = type === "start" ? t("pages.visits.checkInDone") : t("pages.visits.checkOutCompleted");
    return `${done} - ${formatVisitDate(date)}`;
  }

  const filteredVisits = useMemo(() => {
    return visits.filter((visit) => {
      const text = (
        visit.cliente +
        " " +
        visit.trabajador +
        " " +
        visit.observaciones +
        " " +
        visit.fecha
      ).toLowerCase();

      return text.includes(effectiveSearch.toLowerCase());
    });
  }, [visits, effectiveSearch]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

      <div className="flex justify-between items-center px-8 py-6 border-b">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {t("tables.visits.title")}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {t("tables.visits.subtitle")}
          </p>
        </div>

        {!hideSearchInput && (
          <input
            value={effectiveSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t("tables.visits.search")}
            className="w-72 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B4EA2]"
          />
        )}

      </div>

      <div className="md:hidden p-4 space-y-3">
        {filteredVisits.map((visit) => {
          const status = getVisitStatus(visit);
          const hasStartLocation = hasCoordinates(visit.startLatitude, visit.startLongitude);
          const hasEndLocation = hasCoordinates(visit.endLatitude, visit.endLongitude);
          const startMapsUrl = getMapsUrl(visit.startLatitude, visit.startLongitude);
          const endMapsUrl = getMapsUrl(visit.endLatitude, visit.endLongitude);

          return (
            <article key={visit.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-[#1F2937]">{visit.cliente}</p>
                  <p className="mt-1 text-sm text-[#4B5563]">{formatScheduledDate(visit.fecha)}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusPill(status)}`}>
                  {getStatusLabel(status)}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-[#4B5563]">
                <p><span className="font-semibold text-[#1F2937]">{t("pages.visits.worker")}:</span> {visit.trabajador}</p>
                <div className="rounded-xl border border-[#D8EFEA] bg-white p-3">
                  <p className="font-semibold text-[#1F2937]">{t("pages.visits.checkInSection")}</p>
                  <p className="mt-1">{getCheckSummary("start", visit)}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[#4B5563]">
                    <MapPin className="h-3.5 w-3.5 text-[#0F9E98]" />
                    <span>{hasStartLocation ? t("pages.visits.locationRecorded") : t("pages.visits.locationMissing")}</span>
                    {startMapsUrl && (
                      <a
                        href={startMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#0B4EA2] hover:underline"
                      >
                        {t("pages.visits.viewLocation")}
                      </a>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-[#D8EFEA] bg-white p-3">
                  <p className="font-semibold text-[#1F2937]">{t("pages.visits.checkOutSection")}</p>
                  <p className="mt-1">{getCheckSummary("end", visit)}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[#4B5563]">
                    <MapPin className="h-3.5 w-3.5 text-[#0F9E98]" />
                    <span>{hasEndLocation ? t("pages.visits.locationRecorded") : t("pages.visits.locationMissing")}</span>
                    {endMapsUrl && (
                      <a
                        href={endMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#0B4EA2] hover:underline"
                      >
                        {t("pages.visits.viewLocation")}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {canEdit ? (
                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedVisit(visit)}
                    className="inline-flex items-center justify-center rounded-xl border border-[#D8EFEA] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:bg-[#ECFAF8]"
                  >
                    <Eye size={16} className="mr-2" />
                    {t("pages.visits.details")}
                  </button>
                  <button
                    onClick={() => onEdit(visit)}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-100 px-4 py-2 text-sm font-semibold text-[#0B4EA2] transition hover:bg-[#0B4EA2] hover:text-white"
                  >
                    {t("tables.common.edit")}
                  </button>
                  <button
                    onClick={() => onDelete(visit.id)}
                    className="inline-flex items-center justify-center rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                  >
                    {t("tables.common.delete")}
                  </button>
                </div>
              ) : (
                <div className="mt-4 text-right text-xs font-semibold text-[#0F9E98]">{t("tables.common.readOnly")}</div>
              )}
            </article>
          );
        })}

        {filteredVisits.length === 0 && (
          <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-sm text-[#4B5563]">
            {t("tables.visits.empty")}
          </div>
        )}
      </div>

      <div className="hidden md:block overflow-x-auto">
      <table className="w-full min-w-[1080px]">

        <thead className="bg-slate-50">
          <tr className="text-left text-gray-600">
            <th className="px-8 py-4">{t("tables.clients.client")}</th>
            <th>{t("tables.workers.title")}</th>
            <th>{t("tables.visits.date")}</th>
            <th>{t("pages.visits.status")}</th>
            <th>{t("pages.visits.checkInSection")}</th>
            <th>{t("pages.visits.checkOutSection")}</th>
            <th className="text-center">{t("tables.common.actions")}</th>
          </tr>
        </thead>

        <tbody>

          {filteredVisits.map((visit) => {
            const status = getVisitStatus(visit);
            const hasStartLocation = hasCoordinates(visit.startLatitude, visit.startLongitude);
            const hasEndLocation = hasCoordinates(visit.endLatitude, visit.endLongitude);
            const startMapsUrl = getMapsUrl(visit.startLatitude, visit.startLongitude);
            const endMapsUrl = getMapsUrl(visit.endLatitude, visit.endLongitude);

            return (

            <tr
              key={visit.id}
              className="border-t hover:bg-slate-50 transition"
            >

              <td className="px-8 py-5 font-semibold">
                {visit.cliente}
              </td>

              <td>
                {visit.trabajador}
              </td>

              <td>
                {formatScheduledDate(visit.fecha)}
              </td>

              <td>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusPill(status)}`}>
                  {getStatusLabel(status)}
                </span>
              </td>

              <td className="text-sm text-[#4B5563]">
                <div>{getCheckSummary("start", visit)}</div>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <MapPin className="h-3.5 w-3.5 text-[#0F9E98]" />
                  <span>{hasStartLocation ? t("pages.visits.locationRecorded") : t("pages.visits.locationMissing")}</span>
                  {startMapsUrl && (
                    <a
                      href={startMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#0B4EA2] hover:underline"
                    >
                      {t("pages.visits.viewLocation")}
                    </a>
                  )}
                </div>
              </td>

              <td className="text-sm text-[#4B5563]">
                <div>{getCheckSummary("end", visit)}</div>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <MapPin className="h-3.5 w-3.5 text-[#0F9E98]" />
                  <span>{hasEndLocation ? t("pages.visits.locationRecorded") : t("pages.visits.locationMissing")}</span>
                  {endMapsUrl && (
                    <a
                      href={endMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#0B4EA2] hover:underline"
                    >
                      {t("pages.visits.viewLocation")}
                    </a>
                  )}
                </div>
              </td>

              <td>

                {canEdit ? (
                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => setSelectedVisit(visit)}
                    className="w-10 h-10 rounded-xl border border-[#D8EFEA] bg-white hover:bg-[#ECFAF8] text-[#1F2937] transition flex items-center justify-center"
                    title={t("pages.visits.details")}
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => onEdit(visit)}
                    className="w-10 h-10 rounded-xl bg-blue-100 hover:bg-[#0B4EA2] text-[#0B4EA2] hover:text-white transition flex items-center justify-center"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(visit.id)}
                    className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
                ) : (
                  <div className="text-center text-xs font-semibold text-[#0F9E98]">{t("tables.common.readOnly")}</div>
                )}

              </td>

            </tr>

            );
          })}

          {filteredVisits.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="text-center py-12 text-gray-500"
              >
                {t("tables.visits.empty")}
              </td>
            </tr>
          )}

        </tbody>

      </table>
      </div>

      <Modal
        open={selectedVisit !== null}
        title={t("pages.visits.details")}
        onClose={() => setSelectedVisit(null)}
      >
        {selectedVisit && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-[#D8EFEA] bg-[#FAFDFC] p-4">
              <p className="text-lg font-bold text-[#1F2937]">{selectedVisit.cliente}</p>
              <p className="mt-1 text-sm text-[#4B5563]">{t("pages.visits.worker")}: {selectedVisit.trabajador}</p>
              <p className="mt-1 text-sm text-[#4B5563]">{t("pages.visits.dateTime")}: {formatScheduledDate(selectedVisit.fecha)}</p>
            </div>

            {selectedVisit.observaciones && (
              <div className="rounded-2xl border border-[#E3F2EF] bg-white p-4">
                <p className="text-sm font-semibold text-[#1F2937]">{t("pages.visits.notes")}</p>
                <p className="mt-2 text-sm text-[#4B5563]">{selectedVisit.observaciones}</p>
              </div>
            )}

            {selectedVisit.assistanceReport && (
              <div className="rounded-2xl border border-[#E3F2EF] bg-white p-4">
                <p className="text-sm font-semibold text-[#1F2937]">{t("pages.visits.reportRequired")}</p>
                <p className="mt-2 text-sm text-[#4B5563]">{selectedVisit.assistanceReport}</p>
              </div>
            )}

            {selectedVisit.careNotes && (
              <div className="rounded-2xl border border-[#E3F2EF] bg-white p-4">
                <p className="text-sm font-semibold text-[#1F2937]">{t("pages.visits.optionalNotes")}</p>
                <p className="mt-2 text-sm text-[#4B5563]">{selectedVisit.careNotes}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <section className="rounded-2xl border border-[#D8EFEA] bg-white p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]">
                  <CheckCircle2 className="h-4 w-4 text-[#0F9E98]" />
                  {t("pages.visits.checkInSection")}
                </p>
                <p className="mt-2 text-sm text-[#4B5563]">{getCheckSummary("start", selectedVisit)}</p>
                <p className="mt-2 text-sm text-[#4B5563]">{t("pages.visits.worker")}: {selectedVisit.trabajador}</p>
                <p className="mt-2 text-sm text-[#4B5563]">{t("pages.visits.checkInLocation")}: {formatCoordinates(selectedVisit.startLatitude, selectedVisit.startLongitude)}</p>
              </section>

              <section className="rounded-2xl border border-[#D8EFEA] bg-white p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]">
                  <CircleDashed className="h-4 w-4 text-[#0F9E98]" />
                  {t("pages.visits.checkOutSection")}
                </p>
                <p className="mt-2 text-sm text-[#4B5563]">{getCheckSummary("end", selectedVisit)}</p>
                <p className="mt-2 text-sm text-[#4B5563]">{t("pages.visits.worker")}: {selectedVisit.trabajador}</p>
                <p className="mt-2 text-sm text-[#4B5563]">{t("pages.visits.checkOutLocation")}: {formatCoordinates(selectedVisit.endLatitude, selectedVisit.endLongitude)}</p>
              </section>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}