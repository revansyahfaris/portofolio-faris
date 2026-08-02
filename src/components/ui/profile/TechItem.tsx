import { memo } from 'react';

/** Satu entri pada daftar tech stack. */
export const TechItem = memo(function TechItem({ tech }: { tech: string }) {
  return (
    <div className="bg-zinc-950 px-3 py-1.5 border-l-2 border-emerald-400 text-zinc-100 text-[11px] font-bold">
      {tech}
    </div>
  );
});
