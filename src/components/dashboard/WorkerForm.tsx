import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  createWorker,
  type CreateWorkerWithAccountResult,
  updateWorker,
  type Worker,
} from "../../services/workerService";

interface Props {
  worker?: Worker | null;
  onSaved: (options?: { close?: boolean }) => void;
}

export default function WorkerForm({
  worker,
  onSaved,
}: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [activationLink, setActivationLink] = useState("");
  const [activationToken, setActivationToken] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

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

  async function copyActivationLink() {
    try {
      await navigator.clipboard.writeText(activationLink);
      setCopyMessage("Enlace copiado correctamente");
      window.setTimeout(() => setCopyMessage(""), 2200);
    } catch (error) {
      console.error(error);
      setCopyMessage(t("forms.common.errors.generic"));
      window.setTimeout(() => setCopyMessage(""), 2200);
    }
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
        onSaved({ close: true });
      } else {
        const result: CreateWorkerWithAccountResult = await createWorker(form);
        const url = new URL("/activate-account", window.location.origin);
        url.searchParams.set("token", result.activationToken);

        const safeActivationLink = url.toString().replace(/\s+/g, "");
        setActivationLink(safeActivationLink);
        setActivationToken(result.activationToken);
        setCopyMessage("");
        onSaved({ close: false });
      }
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

      {activationLink && (
        <div className="col-span-2 mt-2 rounded-2xl border border-[#D8EFEA] bg-[#F7FCFB] p-4">
          <p className="text-sm font-semibold text-slate-800">
            Cuenta de trabajador creada. Comparte este enlace de activacion con el trabajador:
          </p>

          <textarea
            readOnly
            value={activationLink}
            rows={3}
            onFocus={(event) => event.currentTarget.select()}
            className="mt-3 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-700"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyActivationLink}
              className="rounded-xl bg-[#0F9E98] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0B817C]"
            >
              Copiar enlace
            </button>

            <button
              type="button"
              onClick={() => window.open(activationLink, "_blank", "noopener,noreferrer")}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Abrir enlace
            </button>
          </div>

          {copyMessage && (
            <p className="mt-2 text-sm font-semibold text-[#0F9E98]">{copyMessage}</p>
          )}

          <p className="mt-2 break-all text-xs text-slate-500">Token: {activationToken}</p>
        </div>
      )}

    </div>
  );
}