import { memo } from 'react';
import type { EquipmentItem } from './types';

/** Satu baris entri pada daftar equipment (label dan nilai/keterangannya). */
export const EquipmentCard = memo(function EquipmentCard({ item }: { item: EquipmentItem }) {
  return (
    <div className="bg-zinc-950 p-2 border border-zinc-700">
      <span className="text-[10px] text-zinc-400 block font-bold">{item.label}</span>
      <span className="font-bold text-white">{item.value}</span>
    </div>
  );
});
