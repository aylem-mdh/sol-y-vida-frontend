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
  return (
    <header className="bg-white rounded-3xl shadow-sm px-8 py-6 flex justify-between items-center border border-slate-100">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">{title}</h1>

        <p className="text-gray-500 mt-2 text-lg">{subtitle}</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative text-2xl">
          🔔
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            👤
          </div>

          <div>
            <p className="font-semibold text-slate-800">{name}</p>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}