'use client';

import { memo } from 'react';

interface FlamesToggleProps {
  readonly enabled: boolean;
  readonly onToggle: () => void;
}

/**
 * SEMENTARA — alat ukur, bukan bagian rancangan. Hapus bersama perfFlags.ts.
 *
 * Mematikan lapisan api hidup-hidup supaya bedanya bisa dibaca pada halaman yang
 * sama, tanpa memuat ulang.
 *
 * Angka yang tertulis di tombol adalah taksiran memori grafis yang dilepas,
 * dihitung dari ukuran tiap lapisan dikali empat bita per piksel pada viewport
 * 1440x900. Sengaja dicantumkan supaya jelas apa yang sedang diuji — tetapi
 * tetap taksiran, dan angka sebenarnya harus dibaca dari DevTools:
 * Rendering -> Layer borders, atau panel Memory.
 */
export const FlamesToggle = memo(function FlamesToggle({
  enabled,
  onToggle,
}: FlamesToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute bottom-4 right-4 z-50 border border-white/30 bg-black/80 px-3 py-2 text-left font-mono text-[10px] leading-relaxed font-bold uppercase tracking-wider text-white backdrop-blur-sm"
    >
      <span className={enabled ? 'text-[#FF5500]' : 'text-emerald-400'}>
        {enabled ? '● api menyala' : '○ api mati'}
      </span>
      <span className="block text-white/50">
        {enabled ? 'klik untuk lepas ~74 MB' : 'klik untuk pasang lagi'}
      </span>
    </button>
  );
});
