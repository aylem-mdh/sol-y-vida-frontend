import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function testBackend() {
    try {
      const res = await axios.get("https://localhost:7131/api/Clients");
      console.log("Backend responde:", res.data);
      alert("Backend conectado correctamente ✅");
    } catch (err) {
      console.error("Error backend:", err);
      alert("Error conectando backend ❌");
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://localhost:7131/api/Auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token || response.data.Token;

      localStorage.setItem("token", token);

      if (role === "admin") navigate("/admin");
      if (role === "worker") navigate("/worker");
      if (role === "family") navigate("/family");
    } catch (err) {
      console.error(err);
      setError("Email o contraseña incorrectos");
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

        <h2 className="text-3xl font-bold text-slate-800 text-center">
          Acceder
        </h2>

        <p className="text-gray-500 text-center mt-3">
          Inicia sesión en tu cuenta
        </p>

        {error && (
          <p className="text-red-500 text-center mt-4 font-semibold">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-slate-200"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-slate-200"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-slate-200"
          >
            <option value="admin">Administradora</option>
            <option value="worker">Trabajador</option>
            <option value="family">Familia</option>
          </select>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg transition">
            Entrar
          </button>

          <button
            type="button"
            onClick={testBackend}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg transition"
          >
            Test Backend
          </button>
        </form>
      </div>
    </div>
  );
}