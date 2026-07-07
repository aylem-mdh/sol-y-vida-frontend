export default function ClientsTable() {
  const clients = [
    {
      name: "Carmen López",
      zone: "Torremolinos",
      worker: "María García",
      status: "Activo",
    },
    {
      name: "Antonio Ruiz",
      zone: "Benalmádena",
      worker: "Laura Pérez",
      status: "Pendiente",
    },
    {
      name: "María Sánchez",
      zone: "Fuengirola",
      worker: "José Martín",
      status: "Activo",
    },
    {
      name: "Pedro Gómez",
      zone: "Mijas",
      worker: "Ana Torres",
      status: "Pausado",
    },
  ];

  const badge = {
    Activo: "bg-green-100 text-green-700",
    Pendiente: "bg-orange-100 text-orange-700",
    Pausado: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-slate-800">
          Clientes recientes
        </h3>

        <input
          placeholder="Buscar cliente..."
          className="px-4 py-3 rounded-xl border border-slate-200 w-[260px]"
        />
      </div>

      <div className="space-y-4">
        {clients.map((client) => (
          <div
            key={client.name}
            className="grid grid-cols-4 items-center p-4 rounded-2xl bg-slate-50"
          >
            <div>
              <p className="font-semibold">{client.name}</p>
            </div>

            <div className="text-gray-600">{client.zone}</div>

            <div className="text-gray-600">{client.worker}</div>

            <div>
              <span
                className={`px-3 py-2 rounded-full text-sm font-semibold ${badge[client.status as keyof typeof badge]}`}
              >
                {client.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}