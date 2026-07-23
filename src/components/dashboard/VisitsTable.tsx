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

      <div className="overflow-x-auto">
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