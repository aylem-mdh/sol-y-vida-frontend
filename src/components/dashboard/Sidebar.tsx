import {
  LayoutDashboard,
  Globe,
  Users,
  UserCog,
  HeartHandshake,
  CalendarDays,
  UsersRound,
  Star,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin",
    },
    {
      icon: Globe,
      label: "Ver Web",
      path: "/",
    },
    {
      icon: Users,
      label: "Clientes",
      path: "/clients",
    },
    {
      icon: UserCog,
      label: "Trabajadores",
      path: "/workers",
    },
    {
      icon: HeartHandshake,
      label: "Servicios",
      path: "/services",
    },
    {
      icon: CalendarDays,
      label: "Visitas",
      path: "/visits",
    },
    {
      icon: UsersRound,
      label: "Familiares",
      path: "/family-members",
    },
    {
      icon: Star,
      label: "Valoraciones",
      path: "#",
    },
    {
      icon: BarChart3,
      label: "Informes",
      path: "#",
    },
    {
      icon: Settings,
      label: "Configuración",
      path: "#",
    },
  ];

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <aside className="w-72 min-h-screen bg-primary text-white flex flex-col shadow-card">

      {/* Logo */}

      <div className="px-8 py-8 border-b border-white/20">

        <h1 className="text-3xl font-extrabold tracking-tight">
          Sol y Vida
        </h1>

        <p className="mt-2 text-blue-50 font-medium tracking-widest uppercase text-xs">
          Cuidados
        </p>

      </div>

      {/* Menú */}

      <nav className="flex-1 px-4 py-6 space-y-2">

        {items.map(({ icon: Icon, label, path }) => {

          const active = location.pathname === path;

          return (

            <button
              key={label}
              onClick={() => path !== "#" && navigate(path)}
              className={`group w-full flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                active
                  ? "bg-white text-primary shadow-lg"
                  : "text-white hover:bg-white/20"
              }`}
            >

              <Icon
                size={22}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span className="font-semibold">
                {label}
              </span>

            </button>

          );
        })}

      </nav>

      {/* Soporte */}

      <div className="mx-4 mb-5 rounded-3xl bg-white/15 p-5 backdrop-blur">

        <p className="text-sm text-blue-50">
          Soporte
        </p>

        <h3 className="mt-2 text-2xl font-bold">
          626 406 477
        </h3>

        <p className="mt-1 text-sm text-blue-100">
          Disponible 24/7
        </p>

      </div>

      {/* Logout */}

      <div className="p-4 border-t border-white/20">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 rounded-2xl bg-white text-primary py-4 font-bold hover:scale-[1.02] transition"
        >
          <LogOut size={20} />

          Cerrar sesión

        </button>

      </div>

    </aside>
  );
}