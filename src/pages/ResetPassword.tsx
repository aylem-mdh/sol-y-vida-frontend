import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { forgotPassword, resetPassword } from "../services/authService";
import { useTranslation } from "react-i18next";

export default function ResetPassword() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const presetToken = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

  const [email, setEmail] = useState("");
  const [token, setToken] = useState(presetToken);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loadingRecover, setLoadingRecover] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);

  async function requestRecovery(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError(t("resetPasswordPage.errors.emailRequired"));
      return;
    }

    try {
      setLoadingRecover(true);
      const response = await forgotPassword(email.trim());
      setMessage(response.resetToken
        ? t("resetPasswordPage.messages.recoveryToken", { token: response.resetToken })
        : t("resetPasswordPage.messages.recoveryRequested"));
    } catch (recoverError) {
      console.error(recoverError);
      setError(t("resetPasswordPage.errors.recovery"));
    } finally {
      setLoadingRecover(false);
    }
  }

  async function submitReset(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!token.trim() || !newPassword.trim()) {
      setError(t("resetPasswordPage.errors.tokenPasswordRequired"));
      return;
    }

    try {
      setLoadingReset(true);
      await resetPassword(token.trim(), newPassword);
      setMessage(t("resetPasswordPage.messages.updated"));
      setNewPassword("");
    } catch (resetError) {
      console.error(resetError);
      setError(t("resetPasswordPage.errors.update"));
    } finally {
      setLoadingReset(false);
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#FFFFFF_100%)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl rounded-3xl border border-[#D8EFEA] bg-white p-8 shadow-[0_18px_42px_rgba(15,25,30,0.12)]">
        <h1 className="text-2xl font-bold text-[#1F2937]">{t("resetPasswordPage.title")}</h1>
        <p className="mt-2 text-sm text-[#4B5563]">{t("resetPasswordPage.subtitle")}</p>

        {error && <p className="mt-4 rounded-xl bg-[#FFF5E8] px-4 py-3 text-sm text-[#9A5A13]">{error}</p>}
        {message && <p className="mt-4 rounded-xl bg-[#ECFAF8] px-4 py-3 text-sm text-[#0F9E98]">{message}</p>}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <form onSubmit={requestRecovery} className="space-y-4 rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5">
            <h2 className="font-bold text-[#1F2937]">{t("resetPasswordPage.step1")}</h2>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("resetPasswordPage.email")}
              className="w-full rounded-xl border border-[#D7E5E3] px-4 py-3"
            />
            <button disabled={loadingRecover} className="w-full rounded-2xl bg-[#0F9E98] py-3 font-semibold text-white disabled:bg-slate-400">
              {loadingRecover ? t("resetPasswordPage.requesting") : t("resetPasswordPage.requestLink")}
            </button>
          </form>

          <form onSubmit={submitReset} className="space-y-4 rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5">
            <h2 className="font-bold text-[#1F2937]">{t("resetPasswordPage.step2")}</h2>
            <input
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder={t("resetPasswordPage.recoveryToken")}
              className="w-full rounded-xl border border-[#D7E5E3] px-4 py-3"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder={t("resetPasswordPage.newPassword")}
              className="w-full rounded-xl border border-[#D7E5E3] px-4 py-3"
            />
            <button disabled={loadingReset} className="w-full rounded-2xl bg-[#0F9E98] py-3 font-semibold text-white disabled:bg-slate-400">
              {loadingReset ? t("resetPasswordPage.updating") : t("resetPasswordPage.updatePassword")}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-slate-500">
          <Link to="/login" className="font-semibold text-[#0B4EA2] hover:underline">{t("resetPasswordPage.backToLogin")}</Link>
        </p>
      </div>
    </div>
  );
}
