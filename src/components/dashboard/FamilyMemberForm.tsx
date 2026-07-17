import { useEffect, useState } from "react";
import {
  createFamilyMember,
  updateFamilyMember,
  type FamilyMember,
} from "../../services/familyMemberService";

interface Props {
  familyMember?: FamilyMember | null;
  onSaved: () => void;
}

export default function FamilyMemberForm({
  familyMember,
  onSaved,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    parentesco: "",
    telefono: "",
    email: "",
    esContactoPrincipal: false,
    observaciones: "",
    clientId: 1,
  });

  useEffect(() => {
    if (familyMember) {
      setForm({
        nombre: familyMember.nombre,
        apellidos: familyMember.apellidos,
        parentesco: familyMember.parentesco,
        telefono: familyMember.telefono,
        email: familyMember.email ?? "",
        esContactoPrincipal: familyMember.esContactoPrincipal,
        observaciones: familyMember.observaciones ?? "",
        clientId: familyMember.clientId,
      });
    }
  }, [familyMember]);

  function change(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value, type, checked } =
      e.target as HTMLInputElement;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : name === "clientId"
          ? Number(value)
          : value,
    });
  }

  async function save() {
    if (!form.nombre || !form.apellidos) {
      alert("Completa los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);

      if (familyMember) {
        await updateFamilyMember(familyMember.id, form);
      } else {
        await createFamilyMember(form);
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
        placeholder="Nombre"
        value={form.nombre}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="apellidos"
        placeholder="Apellidos"
        value={form.apellidos}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="parentesco"
        placeholder="Parentesco"
        value={form.parentesco}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        type="number"
        name="clientId"
        placeholder="ID Cliente"
        value={form.clientId}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <textarea
        name="observaciones"
        placeholder="Observaciones"
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

        Contacto principal
      </label>

      <div className="col-span-2 flex justify-end">

        <button
          disabled={loading}
          onClick={save}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-2xl font-bold"
        >
          {loading
            ? "Guardando..."
            : familyMember
            ? "Guardar cambios"
            : "Crear familiar"}
        </button>

      </div>

    </div>
  );
}