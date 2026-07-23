import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { FamilyMember } from "../../services/familyMemberService";
import { useTranslation } from "react-i18next";

interface Props {
  familyMembers: FamilyMember[];
  onDelete: (id: number) => void;
  onEdit: (member: FamilyMember) => void;
  searchTerm?: string;
  onSearchTermChange?: (value: string) => void;
  hideSearchInput?: boolean;
}

export default function FamilyMembersTable({
  familyMembers,
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

      return text.includes(effectiveSearch.toLowerCase());
    });
  }, [familyMembers, effectiveSearch]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

      <div className="flex justify-between items-center px-8 py-6 border-b">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {t("tables.familyMembers.title")}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {t("tables.familyMembers.subtitle")}
          </p>
        </div>

        {!hideSearchInput && (
          <input
            value={effectiveSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t("tables.familyMembers.search")}
            className="w-72 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B4EA2]"
          />
        )}

      </div>

      <div className="overflow-x-auto">
      <table className="w-full min-w-[820px]">

        <thead className="bg-slate-50">
          <tr className="text-left text-gray-600">
            <th className="px-8 py-4">{t("tables.common.name")}</th>
            <th>{t("tables.familyMembers.relationship")}</th>
            <th>{t("tables.common.phone")}</th>
            <th>Email</th>
            <th>{t("tables.familyMembers.primary")}</th>
            <th className="text-center">{t("tables.common.actions")}</th>
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
                  {member.esContactoPrincipal ? t("common.yes") : t("common.no")}
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
                {t("tables.familyMembers.empty")}
              </td>
            </tr>
          )}

        </tbody>

      </table>
      </div>

    </div>
  );
}