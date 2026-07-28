import { memo } from 'react';

export const SectionFooter = memo(function SectionFooter() {
  return (
    <footer className="relative z-40 flex items-center justify-between pt-3 text-xs font-mono shrink-0">
      <div className="flex items-center gap-4 text-zinc-500">
        <span className="flex items-center gap-1">
          <span className="text-white font-bold bg-zinc-800 px-1.5 py-0.5 text-[10px] -skew-x-12">D-PAD</span> NAVIGATE
        </span>
        <span className="hidden sm:flex items-center gap-1">
          <span className="text-white font-bold bg-zinc-800 px-1.5 py-0.5 text-[10px] -skew-x-12">X</span> DETAILS
        </span>
      </div>
    </footer>
  );
});
