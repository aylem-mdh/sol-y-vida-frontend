import { useEffect, useState } from "react";
import {
  createClient,
  updateClient,
} from "../../services/clientService";

interface Client {
  id?: number;
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
}

interface Props {
  client: Client | null;
  onCreated: () => void;
}

const emptyClient: Client = {
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
};

export default function ClientForm({
  client,
  onCreated,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<Client>(emptyClient);

  useEffect(() => {
    if (client) {
      setForm(client);
    } else {
      setForm(emptyClient);
    }
  }, [client]);

  function change(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function save() {
    setError("");

    if (
      !form.nombre ||
      !form.apellidos ||
      !form.dni ||
      !form.telefono ||
      !form.email
    ) {
      setError("Rellena los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);

      if (client?.id) {
        await updateClient(client.id, form);
        alert("Cliente actualizado correctamente ✅");
      } else {
        await createClient(form);
        alert("Cliente creado correctamente ✅");
      }

      onCreated();

      setForm(emptyClient);
    } catch (err) {
      console.error(err);
      setError("Ha ocurrido un error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-8">
        {client ? "Editar Cliente" : "Nuevo Cliente"}
      </h2>

      {error && (
        <div className="mb-6 rounded-xl bg-red-100 text-red-700 p-4 font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-5">

        <input
          name="nombre"
          value={form.nombre}
          onChange={change}
          placeholder="Nombre"
          className="border rounded-xl p-3"
        />

        <input
          name="apellidos"
          value={form.apellidos}
          onChange={change}
          placeholder="Apellidos"
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
          placeholder="DNI"
          className="border rounded-xl p-3"
        />

        <input
          name="numeroSeguridadSocial"
          value={form.numeroSeguridadSocial}
          onChange={change}
          placeholder="Número Seguridad Social"
          className="border rounded-xl p-3"
        />

        <input
          name="direccion"
          value={form.direccion}
          onChange={change}
          placeholder="Dirección"
          className="border rounded-xl p-3"
        />

        <input
          name="ciudad"
          value={form.ciudad}
          onChange={change}
          placeholder="Ciudad"
          className="border rounded-xl p-3"
        />

        <input
          name="codigoPostal"
          value={form.codigoPostal}
          onChange={change}
          placeholder="Código Postal"
          className="border rounded-xl p-3"
        />

        <input
          name="telefono"
          value={form.telefono}
          onChange={change}
          placeholder="Teléfono"
          className="border rounded-xl p-3"
        />

        <input
          name="email"
          value={form.email}
          onChange={change}
          placeholder="Email"
          className="border rounded-xl p-3"
        />

      </div>

      <div className="flex gap-4 mt-8">

        <button
          disabled={loading}
          onClick={save}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-4 rounded-2xl font-bold transition"
        >
          {loading
            ? "Guardando..."
            : client
            ? "Guardar cambios"
            : "Guardar cliente"}
        </button>

        <button
          onClick={onCreated}
          className="bg-slate-200 hover:bg-slate-300 px-8 py-4 rounded-2xl font-bold transition"
        >
          Cancelar
        </button>

      </div>
    </div>
  );
}