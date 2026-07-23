import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Service } from "../../services/serviceService";
import { useTranslation } from "react-i18next";

interface Props {
  services: Service[];
  onDelete: (id: number) => void;
  onEdit: (service: Service) => void;
  searchTerm?: string;
  onSearchTermChange?: (value: string) => void;
  hideSearchInput?: boolean;
}

export default function ServicesTable({
  services,
  onDelete,
  onEdit,
  searchTerm,
  onSearchTermChange,
  hideSearchInput = false,
}: Props) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const effectiveSearch = searchTerm ?? search;
  const handleSearchChange = onSearchTermChange ?? setSearch;

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const text = (
        service.nombre +
        " " +
        service.descripcion
      ).toLowerCase();

      return text.includes(effectiveSearch.toLowerCase());
    });
  }, [services, effectiveSearch]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

      <div className="flex justify-between items-center px-8 py-6 border-b">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {t("tables.services.title")}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {t("tables.services.subtitle")}
          </p>
        </div>

        {!hideSearchInput && (
          <input
            value={effectiveSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t("tables.services.search")}
            className="w-72 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B4EA2]"
          />
        )}

      </div>

      <div className="overflow-x-auto">
      <table className="w-full min-w-[760px]">

        <thead className="bg-slate-50">
          <tr className="text-left text-gray-600">
            <th className="px-8 py-4">{t("tables.services.service")}</th>
            <th>{t("tables.common.description")}</th>
            <th>{t("tables.services.pricePerHour")}</th>
            <th>{t("tables.common.status")}</th>
            <th className="text-center">{t("tables.common.actions")}</th>
          </tr>
        </thead>

        <tbody>

          {filteredServices.map((service) => (

            <tr
              key={service.id}
              className="border-t hover:bg-slate-50 transition"
            >

              <td className="px-8 py-5 font-semibold">
                {service.nombre}
              </td>

              <td>{service.descripcion}</td>

              <td>{service.precioPorHora} €</td>

              <td>

                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                    service.activo
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {service.activo ? t("tables.common.active") : t("tables.common.inactive")}
                </span>

              </td>

              <td>

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(service)}
                    className="w-10 h-10 rounded-xl bg-blue-100 hover:bg-[#0B4EA2] text-[#0B4EA2] hover:text-white transition flex items-center justify-center"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(service.id)}
                    className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

          {filteredServices.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center py-12 text-gray-500"
              >
                {t("tables.services.empty")}
              </td>
            </tr>
          )}

        </tbody>

      </table>
      </div>

    </div>
  );
}