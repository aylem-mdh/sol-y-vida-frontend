import { useEffect, useState } from "react";
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
  onSaved: () => void;
}

export default function ServiceForm({
  service,
  onSaved,
}: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

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
      startDate: service.startDate ? service.startDate.slice(0, 10) : "",
      endDate: service.endDate ? service.endDate.slice(0, 10) : "",
      notes: service.notes ?? "",
      activo: service.activo,
    };
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const [workersResponse, clientsResponse] = await Promise.all([
            getWorkers(),
            getClients(),
          ]);

          setWorkers(workersResponse);
          setClients(clientsResponse);
        } catch (error) {
          console.error(error);
        }
      })();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

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
    if (!form.nombre || form.precioPorHora <= 0 || form.duracionMinutos <= 0) {
      alert(t("forms.service.errors.required"));
      return;
    }

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
        placeholder={t("forms.common.description")}
        value={form.descripcion}
        onChange={change}
        className="border rounded-xl p-3 col-span-2 min-h-[120px]"
      />

      <input
        name="categoria"
        placeholder="Categoria"
        value={form.categoria}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        type="number"
        name="duracionMinutos"
        placeholder="Duracion (min)"
        value={form.duracionMinutos}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="frecuencia"
        placeholder="Frecuencia"
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
        <option value="">Trabajador no asignado</option>
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
        <option value="">Cliente no asignado</option>
        {clients.map((clientItem) => (
          <option key={clientItem.id} value={clientItem.id}>
            {clientItem.nombre} {clientItem.apellidos}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <textarea
        name="notes"
        placeholder="Notas operativas"
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
          disabled={loading}
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