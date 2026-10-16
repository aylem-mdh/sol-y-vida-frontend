import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
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
  onSaved: () => void | Promise<void>;
}

export default function FamilyMemberForm({
  familyMember,
  onSaved,
}: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const submitLock = useRef(false);

  const [form, setForm] = useState(() => ({
    nombre: "",
    apellidos: "",
    parentesco: "",
    telefono: "",
    email: "",
    esContactoPrincipal: false,
    observaciones: "",
    clientId: 0,
    ...(familyMember ? {
      nombre: familyMember.nombre,
      apellidos: familyMember.apellidos,
      parentesco: familyMember.parentesco,
      telefono: familyMember.telefono,
      email: familyMember.email ?? "",
      esContactoPrincipal: familyMember.esContactoPrincipal,
      observaciones: familyMember.observaciones ?? "",
      clientId: familyMember.clientId,
    } : {}),
  }));

  useEffect(() => {
    let cancelled = false;
    async function loadClients() {
      try {
        const data = await getClients();
        if (!cancelled) setClients(data);
      } catch {
        if (!cancelled) setError(t("crud.errors.loadOptions"));
      }
    }
    void loadClients();
    return () => { cancelled = true; };
  }, [t]);

  function change(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type, checked } =
      e.target as HTMLInputElement;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : name === "clientId"
          ? Number(value)
          : value,
    }));
  }

  async function save() {
    if (submitLock.current || saved) return;
    setError("");
    if (!form.nombre.trim() || !form.apellidos.trim() || !form.parentesco.trim() || !form.telefono.trim() || form.clientId <= 0) {
      setError(t("forms.familyMember.errors.required"));
      return;
    }

    submitLock.current = true;
    try {
      setLoading(true);

      if (familyMember) {
        await updateFamilyMember(familyMember.id, form);
      } else {
        await createFamilyMember(form);
      }

      setSaved(true);
      try {
        await onSaved();
      } catch {
        setError(t("crud.errors.savedRefresh"));
      }
    } catch (error) {
      setError(axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message ?? t("forms.common.errors.generic")
        : t("forms.common.errors.generic"));
    } finally {
      submitLock.current = false;
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {error && <div role="alert" className="col-span-2 rounded-xl bg-red-100 p-4 text-red-700">{error}</div>}

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
        <option value={0}>{t("forms.familyMember.selectClient")}</option>
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
          disabled={loading || saved}
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