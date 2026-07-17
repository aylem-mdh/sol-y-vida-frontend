import { useEffect, useState } from "react";
import {
  createService,
  updateService,
  type Service,
} from "../../services/serviceService";

interface Props {
  service?: Service | null;
  onSaved: () => void;
}

export default function ServiceForm({
  service,
  onSaved,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precioPorHora: 0,
    activo: true,
  });

  useEffect(() => {
    if (service) {
      setForm({
        nombre: service.nombre,
        descripcion: service.descripcion,
        precioPorHora: service.precioPorHora,
        activo: service.activo,
      });
    }
  }, [service]);

  function change(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : name === "precioPorHora"
          ? Number(value)
          : value,
    });
  }

  async function save() {
    if (!form.nombre || form.precioPorHora <= 0) {
      alert("Completa los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);

      if (service) {
        await updateService(service.id, form);
      } else {
        await createService(form);
      }

      onSaved();
    } catch (error) {
      console.error(error);
      alert("Ha ocurrido un error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-5">

      <input
        name="nombre"
        placeholder="Nombre del servicio"
        value={form.nombre}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        type="number"
        name="precioPorHora"
        placeholder="Precio por hora (€)"
        value={form.precioPorHora}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={change}
        className="border rounded-xl p-3 col-span-2 min-h-[120px]"
      />

      <label className="flex items-center gap-3 col-span-2">
        <input
          type="checkbox"
          name="activo"
          checked={form.activo}
          onChange={change}
        />

        Activo
      </label>

      <div className="col-span-2 flex justify-end">

        <button
          disabled={loading}
          onClick={save}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-2xl font-bold"
        >
          {loading
            ? "Guardando..."
            : service
            ? "Guardar cambios"
            : "Crear servicio"}
        </button>

      </div>

    </div>
  );
}