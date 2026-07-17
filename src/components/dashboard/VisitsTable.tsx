import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Visit } from "../../services/visitService";

interface Props {
  visits: Visit[];
  onDelete: (id: number) => void;
  onEdit: (visit: Visit) => void;
}

export default function VisitsTable({
  visits,
  onDelete,
  onEdit,
}: Props) {
  const [search, setSearch] = useState("");

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

      return text.includes(search.toLowerCase());
    });
  }, [visits, search]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

      <div className="flex justify-between items-center px-8 py-6 border-b">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Visitas
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Gestiona todas las visitas.
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar visita..."
          className="w-72 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B4EA2]"
        />

      </div>

      <table className="w-full">

        <thead className="bg-slate-50">
          <tr className="text-left text-gray-600">
            <th className="px-8 py-4">Cliente</th>
            <th>Trabajador</th>
            <th>Fecha</th>
            <th>Observaciones</th>
            <th className="text-center">Acciones</th>
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
                {new Date(visit.fecha).toLocaleString()}
              </td>

              <td>
                {visit.observaciones || "-"}
              </td>

              <td>

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

              </td>

            </tr>

          ))}

          {filteredVisits.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center py-12 text-gray-500"
              >
                No hay visitas registradas.
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}