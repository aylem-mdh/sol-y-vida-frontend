import {
  House,
  Users,
  UserCog,
  HeartHandshake,
  Calendar,
  FileText,
  Star,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const items = [
    { icon: House, label: "Inicio" },
    { icon: Users, label: "Clientes" },
    { icon: UserCog, label: "Trabajadores" },
    { icon: HeartHandshake, label: "Servicios" },
    { icon: Calendar, label: "Visitas" },
    { icon: FileText, label: "Presupuestos" },
    { icon: Star, label: "Valoraciones" },
    { icon: BarChart3, label: "Informes" },
    { icon: Settings, label: "Configuración" },
  ];

  return (
    <aside className="w-[290px] min-h-screen bg-gradient-to-b from-[#072B61] via-[#0A3F88] to-[#0B4EA2] text-white flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="px-8 py-8 border-b border-white/10">
        <h1 className="text-3xl font-bold tracking-tight">Sol y Vida</h1>
        <p className="text-orange-300 text-sm mt-1 font-semibold">
          CUIDADOS
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-5 py-6 space-y-2">
        {items.map(({ icon: Icon, label }, index) => (
          <button
            key={label}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition font-medium ${
              index === 0
                ? "bg-white/15 border border-white/10 shadow-lg"
                : "hover:bg-white/10"
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Support box */}
      <div className="mx-5 mb-5 p-5 rounded-2xl bg-white/10 border border-white/10">
        <p className="text-sm text-blue-100">¿Necesitas ayuda?</p>
        <p className="text-xl font-bold text-orange-300 mt-2">
          626 406 477
        </p>
      </div>

      {/* Logout */}
      <div className="p-5 border-t border-white/10">
        <button className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 rounded-2xl py-4 font-semibold transition shadow-lg">
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}