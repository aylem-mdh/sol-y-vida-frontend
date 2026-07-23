import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  createVisit,
  updateVisit,
  type Visit,
} from "../../services/visitService";

import {
  getClients,
} from "../../services/clientService";

import {
  getWorkers,
} from "../../services/workerService";

interface Client {
  id: number;
  nombre: string;
  apellidos: string;
}

interface Worker {
  id: number;
  nombre: string;
  apellidos: string;
}

interface Props {
  visit?: Visit | null;
  onSaved: () => void;
}

export default function VisitForm({
  visit,
  onSaved,
}: Props) {
  const { t } = useTranslation();

  const [clients, setClients] = useState<Client[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fecha: "",
    observaciones: "",
    clientId: "",
    workerId: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (visit) {
      setForm({
        fecha: visit.fecha.slice(0,16),
        observaciones: visit.observaciones ?? "",
        clientId: visit.clientId.toString(),
        workerId: visit.workerId.toString(),
      });
    }
  }, [visit]);

  async function loadData() {
    const clientsData = await getClients();
    const workersData = await getWorkers();

    setClients(clientsData);
    setWorkers(workersData);
  }

  function change(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function save() {
    if (!form.fecha || !form.clientId || !form.workerId) {
      alert(t("forms.visit.errors.required"));
      return;
    }

    const dto = {
      fecha: form.fecha,
      observaciones: form.observaciones,
      clientId: Number(form.clientId),
      workerId: Number(form.workerId),
    };

    setLoading(true);

    try {

      if (visit)
        await updateVisit(visit.id,dto);
      else
        await createVisit(dto);

      onSaved();

    } catch (error) {
      console.error(error);
      alert(t("forms.visit.errors.save"));

    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

      <input
        type="datetime-local"
        name="fecha"
        value={form.fecha}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <select
        name="clientId"
        value={form.clientId}
        onChange={change}
        className="border rounded-xl p-3"
      >

        <option value="">{t("forms.visit.selectClient")}</option>

        {clients.map(client=>(
          <option
            key={client.id}
            value={client.id}
          >
            {client.nombre} {client.apellidos}
          </option>
        ))}

      </select>

      <select
        name="workerId"
        value={form.workerId}
        onChange={change}
        className="border rounded-xl p-3"
      >

        <option value="">{t("forms.visit.selectWorker")}</option>

        {workers.map(worker=>(
          <option
            key={worker.id}
            value={worker.id}
          >
            {worker.nombre} {worker.apellidos}
          </option>
        ))}

      </select>

      <textarea
        name="observaciones"
        value={form.observaciones}
        onChange={change}
        placeholder={t("forms.common.notes")}
        className="border rounded-xl p-3 col-span-2 min-h-[120px]"
      />

      <div className="col-span-2 flex justify-end">

        <button
          disabled={loading}
          onClick={save}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-2xl font-bold"
        >
          {loading
            ? t("forms.common.saving")
            : visit
            ? t("forms.common.saveChanges")
            : t("forms.visit.save")}
        </button>

      </div>

    </div>

  );
}