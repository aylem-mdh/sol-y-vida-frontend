import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="relative w-full">
      {/* LOGO */}
      <div className="absolute -top-16 -left-28 z-30">
        <img
          src="/logo.png"
          alt="Sol y Vida Cuidados"
          className="h-44 md:h-48 w-auto drop-shadow-2xl"
        />
      </div>

      {/* CAJA FLOTANTE OSCURA PREMIUM */}
      <div className="ml-32 mt-6 w-[650px] bg-slate-800/85 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 shadow-2xl">
        <div className="flex items-center gap-8">
          {/* NAV */}
          <nav className="hidden md:flex gap-4 text-white font-semibold text-lg">
            <Link to="/" className="hover:text-blue-300 transition">
              Inicio
            </Link>

            <Link to="/services" className="hover:text-blue-300 transition">
              Servicios
            </Link>

            <Link to="/about" className="hover:text-blue-300 transition">
              Nosotros
            </Link>

            <Link to="/contact" className="hover:text-blue-300 transition">
              Contacto
            </Link>
          </nav>

          {/* DERECHA */}
          <div className="flex items-center gap-2 ml-2">
            <select className="bg-slate-700 text-white border border-white/20 rounded-lg px-2 py-2 text-sm font-medium">
              <option>ES</option>
              <option>EN</option>
              <option>FR</option>
              <option>DE</option>
            </select>

            <button className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
              Acceder
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}