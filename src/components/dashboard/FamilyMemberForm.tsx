import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  createFamilyMember,
  updateFamilyMember,
  type FamilyMember,
} from "../../services/familyMemberService";
import { getClients } from "../../services/clientService";

interface ClientOption {
  id: number;
  nombre: string;
  apellidos: string;
}

interface Props {
  familyMember?: FamilyMember | null;
  onSaved: () => void;
}

export default function FamilyMemberForm({
  familyMember,
  onSaved,
}: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<ClientOption[]>([]);

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    parentesco: "",
    telefono: "",
    email: "",
    esContactoPrincipal: false,
    observaciones: "",
    clientId: 1,
  });

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    if (familyMember) {
      setForm({
        nombre: familyMember.nombre,
        apellidos: familyMember.apellidos,
        parentesco: familyMember.parentesco,
        telefono: familyMember.telefono,
        email: familyMember.email ?? "",
        esContactoPrincipal: familyMember.esContactoPrincipal,
        observaciones: familyMember.observaciones ?? "",
        clientId: familyMember.clientId,
      });
    }
  }, [familyMember]);

  async function loadClients() {
    try {
      const data = await getClients();
      setClients(data);
      if (data.length > 0) {
        setForm((current) => ({
          ...current,
          clientId: current.clientId || data[0].id,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  function change(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type, checked } =
      e.target as HTMLInputElement;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : name === "clientId"
          ? Number(value)
          : value,
    });
  }

  async function save() {
    if (!form.nombre || !form.apellidos || !form.parentesco || !form.telefono || !form.clientId) {
      alert(t("forms.familyMember.errors.required"));
      return;
    }

    try {
      setLoading(true);

      if (familyMember) {
        await updateFamilyMember(familyMember.id, form);
      } else {
        await createFamilyMember(form);
      }

      onSaved();
    } catch (error) {
      console.error(error);
      alert(t("forms.common.errors.generic"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

      <input
        name="nombre"
        placeholder={t("forms.common.name")}
        value={form.nombre}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="apellidos"
        placeholder={t("forms.common.lastName")}
        value={form.apellidos}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="parentesco"
        placeholder={t("forms.familyMember.relationship")}
        value={form.parentesco}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="telefono"
        placeholder={t("forms.common.phone")}
        value={form.telefono}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="email"
        placeholder={t("forms.common.email")}
        value={form.email}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <select
        name="clientId"
        value={form.clientId}
        onChange={change}
        className="border rounded-xl p-3"
      >
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.nombre} {client.apellidos}
          </option>
        ))}
      </select>

      <textarea
        name="observaciones"
        placeholder={t("forms.common.notes")}
        value={form.observaciones}
        onChange={change}
        className="border rounded-xl p-3 col-span-2 min-h-[100px]"
      />

      <label className="flex items-center gap-3 col-span-2">
        <input
          type="checkbox"
          name="esContactoPrincipal"
          checked={form.esContactoPrincipal}
          onChange={change}
        />

        {t("forms.familyMember.primaryContact")}
      </label>

      <div className="col-span-2 flex justify-end">

        <button
          disabled={loading}
          onClick={save}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-2xl font-bold"
        >
          {loading
            ? t("forms.common.saving")
            : familyMember
            ? t("forms.common.saveChanges")
            : t("forms.familyMember.save")}
        </button>

      </div>

    </div>
  );
}