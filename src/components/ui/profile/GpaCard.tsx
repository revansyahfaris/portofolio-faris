import { memo } from 'react';

interface GpaCardProps {
  currentGpa: number;
  maxGpa: number;
  gpaPercentage: number;
}

export const GpaCard = memo(function GpaCard({ currentGpa, maxGpa, gpaPercentage }: GpaCardProps) {
  return (
    <div className="bg-zinc-950 p-2.5 border-l-4 border-amber-400 border-y border-r border-zinc-800 flex flex-col justify-center shadow-[2px_2px_0px_#000]">
      <div className="flex justify-between items-center text-[10px] font-bold mb-1">
        <span className="text-amber-400 tracking-wider">CUMULATIVE GPA</span>
        <span className="text-zinc-200">
          {currentGpa.toFixed(2)} / {maxGpa.toFixed(2)}
        </span>
      </div>
      <div className="w-full h-2 bg-zinc-900 border border-zinc-700 -skew-x-12 overflow-hidden p-0.5">
        <div
          className="h-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] transition-all duration-500 ease-out"
          style={{ width: `${gpaPercentage}%` }}
        />
      </div>
    </div>
  );
});
