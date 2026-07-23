import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: string;
  badge?: string;
  path?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  badge,
  path,
}: Props) {
  const navigate = useNavigate();

  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#6B7280]">{title}</p>
          <h2 className="mt-3 text-4xl font-bold text-[#1F2937] sm:text-5xl">{value}</h2>
          {(trend || badge) && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {trend && (
                <span className="rounded-full border border-[#CDE9E5] bg-[#ECFAF8] px-2.5 py-1 text-xs font-semibold text-[#0F9E98]">
                  {trend}
                </span>
              )}
              {badge && (
                <span className="rounded-full border border-[#F7D7AA] bg-[#FFF5E8] px-2.5 py-1 text-xs font-semibold text-[#9A5A13]">
                  {badge}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DDF7F5] text-[#0F9E98] transition duration-300 group-hover:bg-[#0F9E98] group-hover:text-white sm:h-16 sm:w-16">
          <Icon size={30} />
        </div>
      </div>
    </>
  );

  if (path) {
    return (
      <button
        onClick={() => navigate(path)}
        className="group w-full rounded-3xl border border-[#DDF0ED] bg-white p-5 text-left shadow-[0_12px_30px_rgba(15,25,30,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#CDE9E5] hover:shadow-[0_20px_40px_rgba(15,25,30,0.10)] sm:p-6"
      >
        {content}
      </button>
    );
  }

  return (
    <div className="group rounded-3xl border border-[#DDF0ED] bg-white p-5 shadow-[0_12px_30px_rgba(15,25,30,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#CDE9E5] hover:shadow-[0_20px_40px_rgba(15,25,30,0.10)] sm:p-6">
      {content}
    </div>
  );
}