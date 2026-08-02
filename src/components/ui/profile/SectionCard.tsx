import type { CSSProperties, ReactNode } from 'react';

const CARD_BASE_CLASSES =
  'relative bg-zinc-900 border-4 border-black p-4 sm:p-5 pl-4 shadow-[0px_6px_0px_#1defcf,-6px_-6px_0px_#1defcf] antialiased';

const CARD_BASE_STYLE: CSSProperties = {
  transformOrigin: '100% 50%',
  WebkitFontSmoothing: 'antialiased',
  backfaceVisibility: 'hidden',
  // will-change: transform sengaja tidak dipasang di sini karena kartu ini tidak
  // dianimasikan terus-menerus — memasangnya hanya akan mengunci layer GPU tanpa manfaat.
};

interface SectionCardProps {
  className?: string;
  style: CSSProperties;
  children: ReactNode;
}

/** Wrapper kartu dasar (border, shadow, dan transform 3D perspektif) yang dipakai oleh semua kartu di ProfileSection. */
export function SectionCard({ className = '', style, children }: SectionCardProps) {
  return (
    <div className={`${CARD_BASE_CLASSES} ${className}`} style={{ ...CARD_BASE_STYLE, ...style }}>
      {children}
    </div>
  );
}