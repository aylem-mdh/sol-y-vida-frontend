import { useEffect, useState } from "react";
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

    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="grid grid-cols-2 gap-5">

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

        <option value="">Selecciona un cliente</option>

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

        <option value="">Selecciona un trabajador</option>

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
        placeholder="Observaciones"
        className="border rounded-xl p-3 col-span-2 min-h-[120px]"
      />

      <div className="col-span-2 flex justify-end">

        <button
          disabled={loading}
          onClick={save}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-2xl font-bold"
        >
          {loading
            ? "Guardando..."
            : visit
            ? "Guardar cambios"
            : "Crear visita"}
        </button>

      </div>

    </div>

  );
}