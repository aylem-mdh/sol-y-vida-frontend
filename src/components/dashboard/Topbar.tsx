import {
  Bell,
  Search,
  Globe,
  ChevronDown,
} from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  name: string;
  role: string;
};

export default function Topbar({
  title,
  subtitle,
  name,
  role,
}: Props) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Buenos días"
      : hour < 20
      ? "Buenas tardes"
      : "Buenas noches";

  return (
    <header className="bg-white rounded-3xl shadow-card border border-border px-8 py-6 flex items-center justify-between">

      {/* IZQUIERDA */}

      <div>

        <h1 className="text-4xl font-bold text-text">
          {title}
        </h1>

        <p className="text-text-light mt-2">
          {subtitle}
        </p>

        <p className="text-primary font-semibold mt-3">
          {greeting}, {name} 👋
        </p>

      </div>

      {/* DERECHA */}

      <div className="flex items-center gap-5">

        {/* Buscador */}

        <div className="hidden lg:flex items-center gap-3 bg-background border border-border rounded-2xl px-4 py-3 w-72">

          <Search size={18} className="text-primary" />

          <input
            placeholder="Buscar..."
            className="bg-transparent border-none outline-none w-full text-text"
          />

        </div>

        {/* Idioma */}

        <button className="flex items-center gap-2 bg-background border border-border rounded-2xl px-4 py-3 hover:bg-secondary transition">

          <Globe size={18} className="text-primary" />

          <span className="font-semibold text-text">
            ES
          </span>

          <ChevronDown size={16} />

        </button>

        {/* Notificaciones */}

        <button className="relative w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center hover:bg-secondary transition">

          <Bell size={22} className="text-primary" />

          <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-danger text-white text-[10px] flex items-center justify-center font-bold">
            3
          </span>

        </button>

        {/* Usuario */}

        <div className="flex items-center gap-4 bg-background border border-border rounded-2xl px-5 py-3">

          <div className="w-14 h-14 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center shadow-card">

            {name.charAt(0)}

          </div>

          <div>

            <p className="font-bold text-text">
              {name}
            </p>

            <p className="text-sm text-text-light">
              {role}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}