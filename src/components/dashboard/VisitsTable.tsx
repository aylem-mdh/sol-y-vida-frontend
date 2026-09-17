import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Visit } from "../../services/visitService";
import { useTranslation } from "react-i18next";

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
  const effectiveSearch = searchTerm ?? search;
  const handleSearchChange = onSearchTermChange ?? setSearch;

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
          const startTime = visit.startedAt ? formatVisitDate(visit.startedAt) : null;
          const endTime = visit.endedAt ? formatVisitDate(visit.endedAt) : null;

          return (
            <article key={visit.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-[#1F2937]">{visit.cliente}</p>
                  <p className="mt-1 text-sm text-[#4B5563]">{formatVisitDate(visit.fecha)}</p>
                </div>
                <span className="rounded-full bg-[#ECFAF8] px-3 py-1 text-xs font-semibold text-[#0F9E98]">
                  {visit.estado ?? t("pages.visits.scheduled")}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-[#4B5563] sm:grid-cols-2">
                <p><span className="font-semibold text-[#1F2937]">{t("pages.visits.worker")}:</span> {visit.trabajador}</p>
                {startTime && <p><span className="font-semibold text-[#1F2937]">{t("pages.visits.startedAt")}:</span> {startTime}</p>}
                {endTime && <p><span className="font-semibold text-[#1F2937]">{t("pages.visits.endedAt")}:</span> {endTime}</p>}
                {visit.observaciones && <p className="sm:col-span-2 line-clamp-3"><span className="font-semibold text-[#1F2937]">{t("pages.visits.notes")}:</span> {visit.observaciones}</p>}
              </div>

              {canEdit ? (
                <div className="mt-4 flex justify-end gap-3">
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
      <table className="w-full min-w-[860px]">

        <thead className="bg-slate-50">
          <tr className="text-left text-gray-600">
            <th className="px-8 py-4">{t("tables.clients.client")}</th>
            <th>{t("tables.workers.title")}</th>
            <th>{t("tables.visits.date")}</th>
            <th>{t("tables.visits.notes")}</th>
            <th className="text-center">{t("tables.common.actions")}</th>
          </tr>
        </thead>

        <tbody>

          {filteredVisits.map((visit) => (

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
                {new Date(visit.fecha).toLocaleString(
                  i18n.language === "es" ? "es-ES" : i18n.language === "fr" ? "fr-FR" : i18n.language === "de" ? "de-DE" : "en-US"
                )}
              </td>

              <td>
                {visit.observaciones || "-"}
              </td>

              <td>

                {canEdit ? (
                <div className="flex justify-center gap-3">

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

          ))}

          {filteredVisits.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center py-12 text-gray-500"
              >
                {t("tables.visits.empty")}
              </td>
            </tr>
          )}

        </tbody>

      </table>
      </div>

    </div>
  );
}