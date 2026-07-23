import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { activateAccount } from "../services/authService";
import { useTranslation } from "react-i18next";

export default function ActivateAccount() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const urlToken = useMemo(() => searchParams.get("token") ?? "", [searchParams]);
  const [token, setToken] = useState(urlToken);
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!token.trim() || !password.trim()) {
      setError(t("activatePage.errors.required"));
      return;
    }

    try {
      setSaving(true);
      await activateAccount(token.trim(), password);
      setMessage(t("activatePage.success"));
      setPassword("");
    } catch (activationError) {
      console.error(activationError);
      setError(t("activatePage.errors.failed"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#FFFFFF_100%)] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#D8EFEA] bg-white p-8 shadow-[0_18px_42px_rgba(15,25,30,0.12)]">
        <h1 className="text-2xl font-bold text-[#1F2937]">{t("activatePage.title")}</h1>
        <p className="mt-2 text-sm text-[#4B5563]">{t("activatePage.subtitle")}</p>

        {error && <p className="mt-4 rounded-xl bg-[#FFF5E8] px-4 py-3 text-sm text-[#9A5A13]">{error}</p>}
        {message && <p className="mt-4 rounded-xl bg-[#ECFAF8] px-4 py-3 text-sm text-[#0F9E98]">{message}</p>}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder={t("activatePage.token")}
            className="w-full rounded-xl border border-[#D7E5E3] px-4 py-3"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t("activatePage.newPassword")}
            className="w-full rounded-xl border border-[#D7E5E3] px-4 py-3"
          />
          <button
            disabled={saving}
            className="w-full rounded-2xl bg-[#0F9E98] py-3 font-semibold text-white transition duration-300 hover:bg-[#0B817C] disabled:bg-slate-400"
          >
            {saving ? t("activatePage.activating") : t("activatePage.submit")}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          <Link to="/login" className="font-semibold text-[#0B4EA2] hover:underline">
            {t("activatePage.backToLogin")}
          </Link>
        </p>
      </div>
    </div>
  );
}
