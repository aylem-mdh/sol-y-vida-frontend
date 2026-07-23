import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login as loginRequest } from "../services/authService";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const response = await loginRequest({ email: normalizedEmail, password });
      const token = response.token;

      if (!token) {
        setError(t("login.errors.noToken"));
        return;
      }

      const resolvedRole = response.role;

      if (!resolvedRole) {
        setError(t("login.errors.noRole"));
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", resolvedRole);

      if (resolvedRole === "admin") navigate("/admin");
      if (resolvedRole === "worker") navigate("/worker");
      if (resolvedRole === "family") navigate("/family");

      if (resolvedRole === "client") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setError(t("login.errors.clientDisabled"));
      }
    } catch (err) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        if (!err.response) {
          setError(t("login.errors.noServer"));
          return;
        }

        if (err.response.status === 401 || err.response.status === 400) {
          setError(t("login.errors.invalidCredentials"));
          return;
        }
      }

      setError(t("login.errors.generic"));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#072B61] via-[#0B4EA2] to-[#2563EB] flex items-center justify-center p-6">
      <div className="w-full max-w-[520px] bg-white rounded-[32px] shadow-2xl p-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#0B4EA2]">Sol y Vida</h1>
          <p className="text-orange-500 font-semibold tracking-wide mt-2">
            CUIDADOS
          </p>
        </div>

        <h2 className="text-3xl font-bold text-slate-800 text-center">Bienvenido</h2>

        <p className="text-gray-500 text-center mt-3">
          {t("login.subtitle")}
        </p>

        {error && (
          <p className="text-red-500 text-center mt-4 font-semibold">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder={t("login.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-slate-200"
          />

          <input
            type="password"
            placeholder={t("login.password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-slate-200"
          />

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg transition">
            {t("common.login")}
          </button>

          <p className="text-center text-sm text-slate-500">
            <Link to="/reset-password" className="font-semibold text-[#0B4EA2] hover:underline">
              {t("login.forgotPassword")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}