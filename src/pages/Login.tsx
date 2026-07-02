import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-soft">
      {/* HERO */}
      <section className="bg-slate-900 pb-16 pt-8">
        <div className="px-6 max-w-7xl mx-auto">
          <Header />
        </div>

        <div className="text-center mt-20 text-white px-6">
          <h1 className="text-5xl font-bold">Acceder</h1>

          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Selecciona tu tipo de acceso para continuar.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-24">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FAMILY */}
          <Link
            to="/family"
            className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-2xl transition block"
          >
            <div className="text-5xl">👨‍👩‍👧</div>
            <h2 className="text-3xl font-bold mt-6 text-gray-800">Familias</h2>
            <p className="mt-4 text-gray-600">
              Consulta servicios, mensajes e historial.
            </p>
          </Link>

          {/* WORKER */}
          <Link
            to="/worker"
            className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-2xl transition block"
          >
            <div className="text-5xl">👩‍⚕️</div>
            <h2 className="text-3xl font-bold mt-6 text-gray-800">
              Trabajadores
            </h2>
            <p className="mt-4 text-gray-600">
              Gestiona turnos, disponibilidad y documentos.
            </p>
          </Link>

          {/* ADMIN */}
          <Link
            to="/admin"
            className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-2xl transition block"
          >
            <div className="text-5xl">🛠</div>
            <h2 className="text-3xl font-bold mt-6 text-gray-800">Admin</h2>
            <p className="mt-4 text-gray-600">
              Administra familias, trabajadores y solicitudes.
            </p>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}