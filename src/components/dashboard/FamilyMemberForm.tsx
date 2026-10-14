import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  createFamilyMember,
  type FamilyMemberAccountActionResult,
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
  onSaved: (result?: FamilyMemberAccountActionResult) => void;
}

export default function FamilyMemberForm({
  familyMember,
  onSaved,
}: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [createPortalAccess, setCreatePortalAccess] = useState(false);

  const [form, setForm] = useState(() => {
    if (!familyMember) {
      return {
        nombre: "",
        apellidos: "",
        parentesco: "",
        telefono: "",
        email: "",
        esContactoPrincipal: false,
        observaciones: "",
        clientId: 0,
      };
    }

    return {
      nombre: familyMember.nombre,
      apellidos: familyMember.apellidos,
      parentesco: familyMember.parentesco,
      telefono: familyMember.telefono,
      email: familyMember.email ?? "",
      esContactoPrincipal: familyMember.esContactoPrincipal,
      observaciones: familyMember.observaciones ?? "",
      clientId: familyMember.clientId,
    };
  });

  const loadClients = useCallback(async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadClients();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loadClients]);

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
    if (!form.nombre || !form.apellidos || !form.parentesco || !form.telefono || form.clientId <= 0) {
      alert(t("forms.familyMember.errors.required"));
      return;
    }

    if (!familyMember && createPortalAccess && !form.email.trim()) {
      alert(t("forms.familyMember.errors.emailRequiredForPortal"));
      return;
    }

    try {
      setLoading(true);

      if (familyMember) {
        await updateFamilyMember(familyMember.id, form);
        onSaved();
      } else {
        const result = await createFamilyMember({
          ...form,
          createPortalAccess,
        });
        onSaved(result);
      }
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

      <div className="flex flex-col gap-2">
        <label htmlFor="family-client" className="text-sm font-semibold text-slate-700">
          {t("forms.familyMember.clientLinked")}
        </label>
        <select
          id="family-client"
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
      </div>

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

      <div className="col-span-2 rounded-2xl border-2 border-[#0F9E98] bg-[#F7FCFB] p-4">
        <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#0B4EA2]">
          {t("forms.familyMember.portalAccess.title")}
        </p>
        <label className="mt-3 flex items-center gap-3 text-sm font-semibold text-[#1F2937]">
          <input
            type="checkbox"
            checked={createPortalAccess}
            onChange={(event) => setCreatePortalAccess(event.target.checked)}
            disabled={Boolean(familyMember)}
          />
          {t("forms.familyMember.portalAccess.enable")}
        </label>
        {createPortalAccess && !familyMember && (
          <p className="mt-2 text-sm text-[#374151]">
            {t("forms.familyMember.portalAccess.hint")}
          </p>
        )}
        {familyMember && (
          <p className="mt-2 text-xs text-[#6B7280]">
            {t("forms.familyMember.portalAccess.editHint")}
          </p>
        )}
      </div>

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