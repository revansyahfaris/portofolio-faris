import { memo } from 'react';

export const BackgroundWatermark = memo(function BackgroundWatermark() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <span className="absolute -left-16 -bottom-6 font-serif font-black text-[25vw] text-white/15 leading-none select-none -rotate-12 pointer-events-none">
        01
      </span>
    </div>
  );
});
