import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Lun", visits: 18 },
  { day: "Mar", visits: 24 },
  { day: "Mié", visits: 21 },
  { day: "Jue", visits: 28 },
  { day: "Vie", visits: 32 },
  { day: "Sáb", visits: 26 },
  { day: "Dom", visits: 19 },
];

export default function VisitsChart() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">
        Visitas semanales
      </h3>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="#E2E8F0" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="visits"
              stroke="#16C6C6"
              strokeWidth={4}
              dot={{
                r: 6,
                fill: "#0B4EA2",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}