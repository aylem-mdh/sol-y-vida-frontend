import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { FamilyMember } from "../../services/familyMemberService";

interface Props {
  familyMembers: FamilyMember[];
  onDelete: (id: number) => void;
  onEdit: (member: FamilyMember) => void;
}

export default function FamilyMembersTable({
  familyMembers,
  onDelete,
  onEdit,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return familyMembers.filter((member) => {
      const text = (
        member.nombre +
        " " +
        member.apellidos +
        " " +
        member.parentesco +
        " " +
        member.telefono +
        " " +
        (member.email ?? "")
      ).toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [familyMembers, search]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

      <div className="flex justify-between items-center px-8 py-6 border-b">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Familiares
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Gestiona los familiares de los clientes.
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar familiar..."
          className="w-72 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B4EA2]"
        />

      </div>

      <table className="w-full">

        <thead className="bg-slate-50">
          <tr className="text-left text-gray-600">
            <th className="px-8 py-4">Nombre</th>
            <th>Parentesco</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Principal</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>

          {filtered.map((member) => (

            <tr
              key={member.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-8 py-5 font-semibold">
                {member.nombre} {member.apellidos}
              </td>

              <td>{member.parentesco}</td>

              <td>{member.telefono}</td>

              <td>{member.email}</td>

              <td>

                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                    member.esContactoPrincipal
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {member.esContactoPrincipal ? "Sí" : "No"}
                </span>

              </td>

              <td>

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(member)}
                    className="w-10 h-10 rounded-xl bg-blue-100 hover:bg-[#0B4EA2] text-[#0B4EA2] hover:text-white transition flex items-center justify-center"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(member.id)}
                    className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

          {filtered.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center py-10 text-gray-500"
              >
                No hay familiares registrados.
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}