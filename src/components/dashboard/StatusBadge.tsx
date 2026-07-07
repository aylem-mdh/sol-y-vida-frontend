type Props = {
  status: "Completada" | "En curso" | "Pendiente";
};

export default function StatusBadge({ status }: Props) {
  const styles = {
    Completada: "bg-green-100 text-green-700",
    "En curso": "bg-orange-100 text-orange-600",
    Pendiente: "bg-blue-100 text-blue-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}