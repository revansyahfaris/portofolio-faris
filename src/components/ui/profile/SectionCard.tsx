import type { CSSProperties, ReactNode } from 'react';

const CARD_BASE_CLASSES =
  'relative bg-zinc-900 border-4 border-black p-4 sm:p-5 pl-4 shadow-[0px_6px_0px_#10b981,-6px_-6px_0px_#10b981] antialiased';

const CARD_BASE_STYLE: CSSProperties = {
  transformOrigin: '100% 50%',
  WebkitFontSmoothing: 'antialiased',
  backfaceVisibility: 'hidden',
  willChange: 'transform',
};

interface SectionCardProps {
  className?: string;
  style: CSSProperties;
  children: ReactNode;
}

export function SectionCard({ className = '', style, children }: SectionCardProps) {
  return (
    <div className={`${CARD_BASE_CLASSES} ${className}`} style={{ ...CARD_BASE_STYLE, ...style }}>
      {children}
    </div>
  );
}
