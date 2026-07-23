import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Client {
  id: number;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  dni: string;
  numeroSeguridadSocial: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  telefono: string;
  email: string;
  activo: boolean;
}

interface Props {
  clients: Client[];
  onDelete: (id: number) => void;
  onEdit: (client: Client) => void;
  canManage?: boolean;
  searchTerm?: string;
  onSearchTermChange?: (value: string) => void;
  hideSearchInput?: boolean;
}

export default function ClientsTable({
  clients,
  onDelete,
  onEdit,
  canManage = true,
  searchTerm,
  onSearchTermChange,
  hideSearchInput = false,
}: Props) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const effectiveSearch = searchTerm ?? search;
  const handleSearchChange = onSearchTermChange ?? setSearch;

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const text = (
        client.nombre +
        " " +
        client.apellidos +
        " " +
        client.ciudad +
        " " +
        client.telefono +
        " " +
        client.email
      ).toLowerCase();

      return text.includes(effectiveSearch.toLowerCase());
    });
  }, [clients, effectiveSearch]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

      {/* CABECERA */}

      <div className="flex justify-between items-center px-8 py-6 border-b">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {t("tables.clients.title")}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {t("tables.clients.subtitle")}
          </p>
        </div>

        {!hideSearchInput && (
          <input
            value={effectiveSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t("tables.clients.search")}
            className="w-72 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B4EA2]"
          />
        )}

      </div>

      {/* TABLA */}

      <div className="overflow-x-auto">
      <table className="w-full min-w-[760px]">

        <thead className="bg-slate-50">
          <tr className="text-left text-gray-600">
            <th className="px-8 py-4">{t("tables.clients.client")}</th>
            <th className="py-4">{t("tables.common.city")}</th>
            <th className="py-4">{t("tables.common.phone")}</th>
            <th className="py-4">{t("tables.common.status")}</th>
            <th className="py-4 text-center">{t("tables.common.actions")}</th>
          </tr>
        </thead>

        <tbody>

          {filteredClients.map((client) => (

            <tr
              key={client.id}
              className="border-t hover:bg-slate-50 transition"
            >

              <td className="px-8 py-5">

                <div>

                  <p className="font-semibold text-slate-800">
                    {client.nombre} {client.apellidos}
                  </p>

                  <p className="text-sm text-gray-500">
                    {client.email}
                  </p>

                </div>

              </td>

              <td>{client.ciudad}</td>

              <td>{client.telefono}</td>

              <td>

                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                    client.activo
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {client.activo ? t("tables.common.active") : t("tables.common.inactive")}
                </span>

              </td>

              <td>

                {canManage ? (
                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onEdit(client)}
                      className="w-10 h-10 rounded-xl bg-blue-100 hover:bg-[#0B4EA2] text-[#0B4EA2] hover:text-white transition flex items-center justify-center"
                      title={t("tables.common.edit")}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(client.id)}
                      className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition flex items-center justify-center"
                      title={t("tables.common.delete")}
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

          {filteredClients.length === 0 && (

            <tr>

              <td
                colSpan={5}
                className="text-center py-12 text-gray-500"
              >
                {t("tables.clients.empty")}
              </td>

            </tr>

          )}

        </tbody>

      </table>
      </div>

    </div>
  );
}