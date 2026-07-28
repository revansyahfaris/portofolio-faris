import { memo } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface MetricCardProps {
  icon: LucideIcon;
  iconColorClass: string;
  borderColorClass: string;
  valueColorClass: string;
  label: string;
  children: ReactNode;
}

export const MetricCard = memo(function MetricCard({
  icon: Icon,
  iconColorClass,
  borderColorClass,
  valueColorClass,
  label,
  children,
}: MetricCardProps) {
  return (
    <div
      className={`bg-zinc-950 p-2.5 border-l-4 ${borderColorClass} border-y border-r border-zinc-800 flex items-center justify-between shadow-[2px_2px_0px_#000]`}
    >
      <div className="flex flex-col">
        <span className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase flex items-center gap-1">
          <Icon size={11} className={iconColorClass} /> {label}
        </span>
        <span className={`text-lg font-black ${valueColorClass} tracking-tight mt-0.5`}>{children}</span>
      </div>
    </div>
  );
});
