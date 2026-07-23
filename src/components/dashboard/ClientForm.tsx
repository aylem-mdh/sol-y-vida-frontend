import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  createClient,
  updateClient,
  type Client,
} from "../../services/clientService";
import { getWorkers, type Worker } from "../../services/workerService";

type ClientFormData = Omit<Client, "id" | "activo">;

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
};

export default function ClientForm({
  client,
  onCreated,
}: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [workers, setWorkers] = useState<Worker[]>([]);

  const [form, setForm] = useState<ClientFormData>(emptyClient);

  useEffect(() => {
    loadWorkers();
  }, []);

  useEffect(() => {
    if (client) {
      setForm(client);
    } else {
      setForm(emptyClient);
    }
  }, [client]);

  async function loadWorkers() {
    try {
      const data = await getWorkers();
      setWorkers(data);
      if (data.length > 0) {
        setForm((current) => ({
          ...current,
          assignedWorkerId: current.assignedWorkerId ?? data[0].id,
        }));
      }
    } catch (workerError) {
      console.error(workerError);
    }
  }

  function change(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "assignedWorkerId" ? Number(value) : value,
    });
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
      !form.email ||
      !form.assignedWorkerId
    ) {
      setError(t("forms.client.errors.required"));
      return;
    }

    try {
      setLoading(true);

      if (client?.id) {
        await updateClient(client.id, form);
        alert(t("forms.client.success.updated"));
      } else {
        await createClient(form);
        alert(t("forms.client.success.created"));
      }

      onCreated();

      setForm(emptyClient);
    } catch (err) {
      console.error(err);
      setError(t("forms.common.errors.generic"));
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

        <select
          name="assignedWorkerId"
          value={form.assignedWorkerId ?? ""}
          onChange={change}
          className="border rounded-xl p-3"
        >
          {workers.map((worker) => (
            <option key={worker.id} value={worker.id}>
              {worker.nombre} {worker.apellidos}
            </option>
          ))}
        </select>

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