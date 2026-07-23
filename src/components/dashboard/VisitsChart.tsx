import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type VisitsChartPoint = {
  day: string;
  visits: number;
};

type Props = {
  data: VisitsChartPoint[];
};

export default function VisitsChart({ data }: Props) {
  return (
    <div className="rounded-[30px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_40px_rgba(15,25,30,0.08)] sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-[#1F2937]">Actividad semanal</h3>
        <span className="rounded-full border border-[#F7D7AA] bg-[#FFF5E8] px-3 py-1 text-xs font-semibold text-[#9A5A13]">
          Actualizado hoy
        </span>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="#E2F1EE" vertical={false} />
            <XAxis dataKey="day" stroke="#94A3B8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid #D8EFEA",
                boxShadow: "0 10px 28px rgba(15,25,30,0.12)",
              }}
              labelStyle={{ color: "#1F2937", fontWeight: 700 }}
            />

            <Line
              type="monotone"
              dataKey="visits"
              stroke="#0F9E98"
              strokeWidth={4}
              dot={{
                r: 6,
                fill: "#0F9E98",
              }}
              activeDot={{ r: 8, fill: "#F29A38" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}