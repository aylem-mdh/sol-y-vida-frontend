import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  createService,
  updateService,
  type Service,
} from "../../services/serviceService";
import { getWorkers, type Worker } from "../../services/workerService";
import { getClients, type Client } from "../../services/clientService";

interface Props {
  service?: Service | null;
  onSaved: () => void | Promise<void>;
}

export default function ServiceForm({
  service,
  onSaved,
}: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const submitLock = useRef(false);
  const formatDateTimeLocal = (value?: string | null) => value ? value.slice(0, 16) : "";

  const [form, setForm] = useState(() => {
    if (!service) {
      return {
        nombre: "",
        descripcion: "",
        categoria: "General",
        precioPorHora: 0,
        duracionMinutos: 60,
        frecuencia: "Semanal",
        assignedWorkerId: null as number | null,
        assignedClientId: null as number | null,
        startDate: "",
        endDate: "",
        notes: "",
        activo: true,
      };
    }

    return {
      nombre: service.nombre,
      descripcion: service.descripcion,
      categoria: service.categoria ?? "General",
      precioPorHora: service.precioPorHora,
      duracionMinutos: service.duracionMinutos ?? 60,
      frecuencia: service.frecuencia ?? "Semanal",
      assignedWorkerId: service.assignedWorkerId ?? null,
      assignedClientId: service.assignedClientId ?? null,
      startDate: formatDateTimeLocal(service.startDate),
      endDate: formatDateTimeLocal(service.endDate),
      notes: service.notes ?? "",
      activo: service.activo,
    };
  });

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const [workersResponse, clientsResponse] = await Promise.all([
            getWorkers(),
            getClients(),
          ]);

          if (!cancelled) {
            setWorkers(workersResponse);
            setClients(clientsResponse);
          }
        } catch {
          if (!cancelled) setError(t("crud.errors.loadOptions"));
        }
      })();
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [t]);

  function change(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : name === "precioPorHora" || name === "duracionMinutos"
          ? Number(value)
          : name === "assignedWorkerId" || name === "assignedClientId"
          ? value === "" ? null : Number(value)
          : value,
    }));
  }

  async function save() {
    if (submitLock.current || saved) return;
    setError("");
    const assignedWorkerRequiresSchedule = form.assignedWorkerId !== null
      && (!form.startDate || !form.endDate);
    const assignedWorkerRequiresTasks = form.assignedWorkerId !== null
      && !form.descripcion.trim();
    const invalidSchedule = form.startDate && form.endDate
      && new Date(form.endDate).getTime() <= new Date(form.startDate).getTime();

    if (
      !form.nombre.trim()
      || form.precioPorHora <= 0
      || form.duracionMinutos <= 0
      || assignedWorkerRequiresSchedule
      || assignedWorkerRequiresTasks
      || (form.assignedWorkerId !== null && form.assignedClientId === null)
      || Boolean(form.startDate) !== Boolean(form.endDate)
      || invalidSchedule
    ) {
      setError(t("assignedService.required"));
      return;
    }

    submitLock.current = true;
    try {
      setLoading(true);

      const payload = {
        ...form,
        startDate: form.startDate || null,
        endDate: form.endDate || null,
      };

      if (service) {
        await updateService(service.id, payload);
      } else {
        await createService(payload);
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
      {error && <p role="alert" className="col-span-2 rounded-xl bg-red-100 p-4 text-red-700">{error}</p>}

      <input
        name="nombre"
        placeholder={t("forms.service.name")}
        value={form.nombre}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        type="number"
        name="precioPorHora"
        placeholder={t("forms.service.pricePerHour")}
        value={form.precioPorHora}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <textarea
        name="descripcion"
        placeholder={t("assignedService.tasks")}
        maxLength={500}
        value={form.descripcion}
        onChange={change}
        className="border rounded-xl p-3 col-span-2 min-h-[120px]"
      />

      <input
        name="categoria"
        placeholder={t("serviceCatalog.category")}
        maxLength={80}
        value={form.categoria}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        type="number"
        name="duracionMinutos"
        placeholder={t("serviceCatalog.duration")}
        value={form.duracionMinutos}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="frecuencia"
        placeholder={t("serviceCatalog.frequency")}
        maxLength={50}
        value={form.frecuencia}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <select
        name="assignedWorkerId"
        value={form.assignedWorkerId ?? ""}
        onChange={change}
        className="border rounded-xl p-3"
      >
        <option value="">{t("assignedService.noWorker")}</option>
        {workers.map((worker) => (
          <option key={worker.id} value={worker.id}>
            {worker.nombre} {worker.apellidos}
          </option>
        ))}
      </select>

      <select
        name="assignedClientId"
        value={form.assignedClientId ?? ""}
        onChange={change}
        className="border rounded-xl p-3"
      >
        <option value="">{t("assignedService.noClient")}</option>
        {clients.map((clientItem) => (
          <option key={clientItem.id} value={clientItem.id}>
            {clientItem.nombre} {clientItem.apellidos}
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        aria-label={t("assignedService.start")}
        name="startDate"
        value={form.startDate}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        type="datetime-local"
        aria-label={t("assignedService.end")}
        name="endDate"
        value={form.endDate}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <textarea
        name="notes"
        placeholder={t("assignedService.notes")}
        maxLength={1000}
        value={form.notes}
        onChange={change}
        className="border rounded-xl p-3 col-span-2 min-h-[90px]"
      />

      <label className="flex items-center gap-3 col-span-2">
        <input
          type="checkbox"
          name="activo"
          checked={form.activo}
          onChange={change}
        />

        {t("tables.common.active")}
      </label>

      <div className="col-span-2 flex justify-end">

        <button
          disabled={loading || saved}
          onClick={save}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-2xl font-bold"
        >
          {loading
            ? t("forms.common.saving")
            : service
            ? t("forms.common.saveChanges")
            : t("forms.service.save")}
        </button>

      </div>

    </div>
  );
}