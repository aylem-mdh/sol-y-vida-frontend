import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  createClient,
  updateClient,
  type ClientAccountActionResult,
  type Client,
} from "../../services/clientService";
import { getWorkers, type Worker } from "../../services/workerService";

type ClientFormData = {
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
  assignedWorkerId: number | null;
  notificationsEnabled: boolean;
  preferredContact: string;
  createPortalAccess: boolean;
};

interface Props {
  client: Client | null;
  onCreated: () => void;
}

const emptyClient: ClientFormData = {
  nombre: "",
  apellidos: "",
  fechaNacimiento: "",
  dni: "",
  numeroSeguridadSocial: "",
  direccion: "",
  ciudad: "",
  codigoPostal: "",
  telefono: "",
  email: "",
  assignedWorkerId: null,
  notificationsEnabled: true,
  preferredContact: "Telefono",
  createPortalAccess: false,
};

export default function ClientForm({
  client,
  onCreated,
}: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [workers, setWorkers] = useState<Worker[]>([]);

  const [form, setForm] = useState<ClientFormData>(() => {
    if (!client) {
      return emptyClient;
    }

    return {
      nombre: client.nombre,
      apellidos: client.apellidos,
      fechaNacimiento: client.fechaNacimiento,
      dni: client.dni,
      numeroSeguridadSocial: client.numeroSeguridadSocial,
      direccion: client.direccion,
      ciudad: client.ciudad,
      codigoPostal: client.codigoPostal,
      telefono: client.telefono,
      email: client.email,
      assignedWorkerId: client.assignedWorkerId ?? null,
      notificationsEnabled: client.notificationsEnabled,
      preferredContact: client.preferredContact,
      createPortalAccess: false,
    };
  });

  const loadWorkers = useCallback(async () => {
    try {
      const data = await getWorkers();
      setWorkers(data);
    } catch (workerError) {
      console.error(workerError);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadWorkers();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loadWorkers]);

  function hasHomeLocation() {
    return typeof client?.homeLatitude === "number" && typeof client?.homeLongitude === "number";
  }

  function getHomeLocationNoticeCode(result: ClientAccountActionResult) {
    return result.homeLocationWarningCode ?? null;
  }

  function getHomeLocationNoticeText(result: ClientAccountActionResult) {
    const warningCode = getHomeLocationNoticeCode(result);

    if (warningCode === "home_location_not_found") {
      return t("forms.client.homeLocation.warnings.notFound");
    }

    if (warningCode === "home_location_geocoding_unavailable") {
      return t("forms.client.homeLocation.warnings.unavailable");
    }

    if (result.homeLocationConfigured) {
      return t("forms.client.homeLocation.warnings.configured");
    }

    return "";
  }

  function change(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]:
        name === "assignedWorkerId"
          ? (value === "" ? null : Number(value))
          : value,
    }));
  }

  function changeCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;

    setForm((current) => ({
      ...current,
      [name]: checked,
    }));
  }

  function getDetailedError(err: unknown): string {
    if (!axios.isAxiosError(err)) {
      return t("forms.common.errors.generic");
    }

    const status = err.response?.status;
    const data = err.response?.data as
      | { message?: string; detail?: string; title?: string; errors?: Record<string, string[]>; traceId?: string }
      | undefined;

    const validationErrors = data?.errors
      ? Object.entries(data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join(" | ")
      : "";

    const parts = [
      data?.message,
      data?.title,
      data?.detail,
      validationErrors,
      status ? `HTTP ${status}` : "",
      data?.traceId ? `TraceId: ${data.traceId}` : "",
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(" | ") : t("forms.common.errors.generic");
  }

  async function save() {
    setError("");

    if (
      !form.nombre ||
      !form.apellidos ||
      !form.fechaNacimiento ||
      !form.dni ||
      !form.numeroSeguridadSocial ||
      !form.direccion ||
      !form.ciudad ||
      !form.codigoPostal ||
      !form.telefono ||
      !form.email
    ) {
      setError(t("forms.client.errors.required"));
      return;
    }

    try {
      setLoading(true);

      if (client?.id) {
        const result = await updateClient(client.id, {
          ...form,
          portalNotes: "",
        });
        const locationNotice = getHomeLocationNoticeText(result);
        alert(`${t("forms.client.success.updated")}${locationNotice ? `\n${locationNotice}` : ""}`);
      } else {
        const result = await createClient(form);
        const locationNotice = getHomeLocationNoticeText(result);
        const delivery = result.invitationDeliveryStatus
          ? `\n${t(`accountEmail.${result.invitationDeliveryStatus}`)}` : "";
        alert(`${t("forms.client.success.created")}${locationNotice ? `\n${locationNotice}` : ""}${delivery}`);
      }

      onCreated();

      setForm(emptyClient);
    } catch (err) {
      setError(getDetailedError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-8">
        {client ? t("forms.client.editTitle") : t("forms.client.newTitle")}
      </h2>

      {error && (
        <div className="mb-6 rounded-xl bg-red-100 text-red-700 p-4 font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <input
          name="nombre"
          value={form.nombre}
          onChange={change}
          placeholder={t("forms.common.name")}
          className="border rounded-xl p-3"
        />

        <input
          name="apellidos"
          value={form.apellidos}
          onChange={change}
          placeholder={t("forms.common.lastName")}
          className="border rounded-xl p-3"
        />

        <input
          type="date"
          name="fechaNacimiento"
          value={form.fechaNacimiento}
          onChange={change}
          className="border rounded-xl p-3"
        />

        <input
          name="dni"
          value={form.dni}
          onChange={change}
          placeholder={t("forms.common.idNumber")}
          className="border rounded-xl p-3"
        />

        <input
          name="numeroSeguridadSocial"
          value={form.numeroSeguridadSocial}
          onChange={change}
          placeholder={t("forms.client.socialSecurity")}
          className="border rounded-xl p-3"
        />

        <input
          name="direccion"
          value={form.direccion}
          onChange={change}
          placeholder={t("forms.common.address")}
          className="border rounded-xl p-3"
        />

        <input
          name="ciudad"
          value={form.ciudad}
          onChange={change}
          placeholder={t("forms.common.city")}
          className="border rounded-xl p-3"
        />

        <input
          name="codigoPostal"
          value={form.codigoPostal}
          onChange={change}
          placeholder={t("forms.common.postalCode")}
          className="border rounded-xl p-3"
        />

        {client && (
          <div className="md:col-span-2 rounded-2xl border border-[#D8EFEA] bg-[#F7FCFB] p-4">
            <p className="text-sm font-semibold text-[#1F2937]">{t("forms.client.homeLocation.label")}</p>
            <p className="mt-1 text-sm text-[#4B5563]">
              {hasHomeLocation() ? t("forms.client.homeLocation.configured") : t("forms.client.homeLocation.unavailable")}
            </p>
          </div>
        )}

        <input
          name="telefono"
          value={form.telefono}
          onChange={change}
          placeholder={t("forms.common.phone")}
          className="border rounded-xl p-3"
        />

        <input
          name="email"
          value={form.email}
          onChange={change}
          placeholder={t("forms.common.email")}
          className="border rounded-xl p-3"
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="assignedWorkerId" className="text-sm font-medium text-slate-700">
            {t("forms.client.assignedWorker")}
          </label>

          <select
            id="assignedWorkerId"
            name="assignedWorkerId"
            value={form.assignedWorkerId ?? ""}
            onChange={change}
            className="border rounded-xl p-3"
          >
            <option value="">
              {workers.length > 0
                ? t("forms.client.unassigned")
                : t("forms.client.noWorkers")}
            </option>

            {workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.nombre} {worker.apellidos}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="preferredContact" className="text-sm font-medium text-slate-700">
            {t("forms.client.preferredContact")}
          </label>

          <select
            id="preferredContact"
            name="preferredContact"
            value={form.preferredContact}
            onChange={change}
            className="border rounded-xl p-3"
          >
            <option value="Telefono">{t("forms.client.preferredPhone")}</option>
            <option value="Email">{t("forms.client.preferredEmail")}</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="notificationsEnabled"
            checked={form.notificationsEnabled}
            onChange={changeCheckbox}
          />
          {t("forms.client.notificationsEnabled")}
        </label>

        {!client && (
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              name="createPortalAccess"
              checked={form.createPortalAccess}
              onChange={changeCheckbox}
            />
            {t("forms.client.createPortalAccess")}
          </label>
        )}

      </div>

      <div className="flex gap-4 mt-8">

        <button
          disabled={loading}
          onClick={save}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-4 rounded-2xl font-bold transition"
        >
          {loading
            ? t("forms.common.saving")
            : client
            ? t("forms.common.saveChanges")
            : t("forms.client.save")}
        </button>

        <button
          onClick={onCreated}
          className="bg-slate-200 hover:bg-slate-300 px-8 py-4 rounded-2xl font-bold transition"
        >
          {t("forms.common.cancel")}
        </button>

      </div>
    </div>
  );
}