import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  createWorker,
  updateWorker,
  type Worker,
} from "../../services/workerService";

interface Props {
  worker?: Worker | null;
  onSaved: () => void;
}

export default function WorkerForm({
  worker,
  onSaved,
}: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    dni: "",
    telefono: "",
    email: "",
    especialidad: "",
  });

  useEffect(() => {
    if (worker) {
      setForm({
        nombre: worker.nombre,
        apellidos: worker.apellidos,
        dni: worker.dni,
        telefono: worker.telefono,
        email: worker.email,
        especialidad: worker.especialidad,
      });
    }
  }, [worker]);

  function change(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function save() {
    if (
      !form.nombre ||
      !form.apellidos ||
      !form.telefono ||
      !form.email
    ) {
      alert(t("forms.worker.errors.required"));
      return;
    }

    try {
      setLoading(true);

      if (worker) {
        await updateWorker(worker.id, form);
      } else {
        await createWorker(form);
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
        placeholder={t("forms.common.name")}
        value={form.nombre}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="apellidos"
        placeholder={t("forms.common.lastName")}
        value={form.apellidos}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="dni"
        placeholder={t("forms.common.idNumber")}
        value={form.dni}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="telefono"
        placeholder={t("forms.common.phone")}
        value={form.telefono}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="email"
        placeholder={t("forms.common.email")}
        value={form.email}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <input
        name="especialidad"
        placeholder={t("forms.worker.specialty")}
        value={form.especialidad}
        onChange={change}
        className="border rounded-xl p-3"
      />

      <div className="col-span-2 flex justify-end mt-4">

        <button
          disabled={loading}
          onClick={save}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-2xl font-bold"
        >
          {loading
            ? t("forms.common.saving")
            : worker
            ? t("forms.common.saveChanges")
            : t("forms.worker.save")}
        </button>

      </div>

    </div>
  );
}