import { memo } from 'react';

export const FlameBackground = memo(function FlameBackground() {
  return (
    <div
      className="absolute -top-[25px] -right-[700px] w-[85vw] sm:w-[65vw] md:w-[120vw] h-full z-20 pointer-events-none select-none overflow-visible rotate-[36deg]"
      style={{contain: 'layout style'}}
    >
      <div className="absolute inset-0 z-0 overflow-visible">
        {/* LAYER 2: CRIMSON RED FLAME */}
        <div
          className="absolute inset-y-[-38%] left-[-16%] w-[170%] bg-red-600 grunge-jitter-a shadow-[0_0_35px_rgba(220,38,38,0.9)] transform-gpu will-change-transform"
          style={{
            clipPath:
              'polygon(20% 100%, 35% 70%, 15% 55%, 40% 40%, 25% 20%, 55% 30%, 50% 0%, 75% 25%, 65% 45%, 90% 50%, 70% 65%, 85% 85%, 55% 75%, 45% 100%)',
          }}
        />

        {/* LAYER 3: ORANGE GRUNGE FLAME */}
        <div
          className="absolute inset-y-[-30%] left-[-10%] w-[130%] bg-[#FF5500] opacity-95 grunge-jitter-b transform-gpu will-change-transform"
          style={{
            clipPath:
              'polygon(30% 100%, 40% 75%, 20% 60%, 45% 45%, 35% 25%, 60% 35%, 55% 5%, 80% 30%, 68% 50%, 92% 55%, 72% 68%, 88% 88%, 60% 78%, 50% 100%)',
            backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.25) 15%, transparent 16%)',
            backgroundSize: '6px 6px',
          }}
        />

        {/* LAYER 4: AMBER CORE */}
        <div
          className="absolute inset-y-[-20%] left-[-5%] w-[115%] bg-amber-300 opacity-90 grunge-jitter-c transform-gpu will-change-transform"
          style={{
            clipPath:
              'polygon(35% 100%, 45% 78%, 28% 62%, 48% 48%, 40% 30%, 62% 38%, 58% 10%, 78% 32%, 68% 52%, 90% 58%, 74% 70%, 86% 88%, 62% 80%, 52% 100%)',
          }}
        />

        {/* LAYER 5: SCREEN BLEND GLOW FLARE */}
        <div
          className="absolute inset-y-[-10%] left-[-12%] w-[140%] bg-red-600/60 grunge-jitter-a transform-gpu will-change-transform"
          style={{
            clipPath:
              'polygon(25% 100%, 38% 72%, 18% 58%, 42% 42%, 28% 22%, 58% 32%, 52% 2%, 78% 28%, 68% 48%, 92% 52%, 72% 68%, 88% 88%, 58% 78%, 48% 100%)',
            mixBlendMode: 'screen',
          }}
        />
      </div>
    </div>
  );
});
