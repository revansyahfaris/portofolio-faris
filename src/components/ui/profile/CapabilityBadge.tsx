import { memo } from 'react';
import type { Capability } from './types';

/** Badge kecil yang menampilkan satu kemampuan/keahlian beserta ikon dan warnanya. */
export const CapabilityBadge = memo(function CapabilityBadge({ capability }: { capability: Capability }) {
  const Icon = capability.icon;
  return (
    <div
      className={`bg-zinc-950 px-3 py-1.5 -skew-x-12 border-l-4 ${capability.color} border-y border-r border-zinc-800 flex items-center gap-1.5 shadow-[2px_2px_0px_#000] hover:scale-105 transition-transform duration-200 cursor-default`}
    >
      <Icon size={13} className="shrink-0" />
      <span className="font-bold tracking-wider text-zinc-100 text-[11px] uppercase">{capability.name}</span>
    </div>
  );
});
