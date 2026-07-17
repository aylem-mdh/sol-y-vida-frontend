import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Worker } from "../../services/workerService";

interface Props {
  workers: Worker[];
  onDelete: (id: number) => void;
  onEdit: (worker: Worker) => void;
}

export default function WorkersTable({
  workers,
  onDelete,
  onEdit,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      const text = (
        worker.nombre +
        " " +
        worker.apellidos +
        " " +
        worker.dni +
        " " +
        worker.telefono +
        " " +
        worker.email +
        " " +
        worker.especialidad
      ).toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [workers, search]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

      <div className="flex justify-between items-center px-8 py-6 border-b">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Trabajadores
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Gestiona todos los trabajadores de Sol y Vida.
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar trabajador..."
          className="w-72 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B4EA2]"
        />

      </div>

      <table className="w-full">

        <thead className="bg-slate-50">
          <tr className="text-left text-gray-600">
            <th className="px-8 py-4">Trabajador</th>
            <th>Especialidad</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>

          {filteredWorkers.map((worker) => (

            <tr
              key={worker.id}
              className="border-t hover:bg-slate-50 transition"
            >

              <td className="px-8 py-5">
                <div>
                  <p className="font-semibold text-slate-800">
                    {worker.nombre} {worker.apellidos}
                  </p>

                  <p className="text-sm text-gray-500">
                    {worker.dni}
                  </p>
                </div>
              </td>

              <td>{worker.especialidad}</td>

              <td>{worker.telefono}</td>

              <td>{worker.email}</td>

              <td>

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(worker)}
                    className="w-10 h-10 rounded-xl bg-blue-100 hover:bg-[#0B4EA2] text-[#0B4EA2] hover:text-white transition flex items-center justify-center"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(worker.id)}
                    className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

          {filteredWorkers.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center py-12 text-gray-500"
              >
                No se encontraron trabajadores.
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}