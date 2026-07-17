import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
}: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-card border border-border p-6 hover:shadow-hover transition-all duration-300">

      <div className="flex justify-between items-start">

        <div>
          <p className="text-text-light font-medium">
            {title}
          </p>

          <h2 className="text-5xl font-bold text-text mt-4">
            {value}
          </h2>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
          <Icon
            size={30}
            className="text-primary"
          />
        </div>

      </div>
    </div>
  );
}