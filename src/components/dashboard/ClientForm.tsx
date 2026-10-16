import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  createClient,
  updateClient,
  type Client,
} from "../../services/clientService";
import { getWorkers, type Worker } from "../../services/workerService";

type ClientFormData = Omit<Client, "id" | "activo">;

interface Props {
  client: Client | null;
  onCreated: () => void | Promise<void>;
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
};

export default function ClientForm({
  client,
  onCreated,
}: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [saved, setSaved] = useState(false);
  const submitLock = useRef(false);

  const [form, setForm] = useState<ClientFormData>(() => client ?? emptyClient);

  useEffect(() => {
    let cancelled = false;
    async function loadWorkers() {
      try {
        const data = await getWorkers();
        if (!cancelled) setWorkers(data);
      } catch {
        if (!cancelled) setError(t("crud.errors.loadOptions"));
      }
    }
    void loadWorkers();
    return () => { cancelled = true; };
  }, [t]);

  function change(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: name === "assignedWorkerId" ? (value === "" ? null : Number(value)) : value,
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
    if (submitLock.current || saved) return;
    setError("");

    if (
      !form.nombre.trim() ||
      !form.apellidos.trim() ||
      !form.fechaNacimiento ||
      !form.dni.trim() ||
      !form.numeroSeguridadSocial.trim() ||
      !form.direccion.trim() ||
      !form.ciudad.trim() ||
      !form.codigoPostal.trim() ||
      !form.telefono.trim() ||
      !form.email.trim()
    ) {
      setError(t("forms.client.errors.required"));
      return;
    }

    submitLock.current = true;
    try {
      setLoading(true);

      if (client?.id) {
        await updateClient(client.id, form);
        alert(t("forms.client.success.updated"));
      } else {
        await createClient(form);
        alert(t("forms.client.success.created"));
      }

      setSaved(true);
      try {
        await onCreated();
      } catch {
        setError(t("crud.errors.savedRefresh"));
      }
    } catch (err) {
      setError(getDetailedError(err));
    } finally {
      submitLock.current = false;
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-8">
        {client ? t("forms.client.editTitle") : t("forms.client.newTitle")}
      </h2>

      {error && (
        <div role="alert" className="mb-6 rounded-xl bg-red-100 text-red-700 p-4 font-medium">
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

      </div>

      <div className="flex gap-4 mt-8">

        <button
          disabled={loading || saved}
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