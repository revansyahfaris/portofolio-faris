import { memo } from 'react';

export const FlameBackground = memo(function FlameBackground() {
  return (
    <div
      className="absolute -top-[25px] -right-[700px] w-[85vw] sm:w-[65vw] md:w-[120vw] h-full z-20 pointer-events-none select-none overflow-visible rotate-[36deg]"
      style={{ contain: 'layout style' }}
    >
      <div className="absolute inset-0 z-0 overflow-visible transform-gpu">
        {/* LAYER 5: SCREEN BLEND GLOW FLARE */}
        <svg
          className="absolute inset-y-[-44%] left-[-19%] w-[210%] h-[198%] grunge-jitter-a transform-gpu will-change-transform"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
          <polygon
            points="25,100 30,65 10,50 40,35 20,15 50,25 45,-5 70,20 60,40 85,45 65,60 80,80 50,70 40,100"
            fill="rgba(220,38,38,0.6)"
          />
        </svg>

        {/* LAYER 2: CRIMSON RED FLAME */}
        <svg
          className="absolute inset-y-[-38%] left-[-16%] w-[170%] h-[176%] grunge-jitter-a transform-gpu will-change-transform"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
          <polygon
            points="25,100 35,70 15,55 40,40 25,20 55,30 50,0 75,25 65,45 90,50 70,65 85,85 55,75 45,100"
            fill="#dc2626"
          />
        </svg>

        {/* LAYER 3: ORANGE GRUNGE FLAME */}
        <svg
          className="absolute inset-y-[-30%] left-[-10%] w-[130%] h-[160%] grunge-jitter-b transform-gpu will-change-transform"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
          <polygon
            points="30,100 40,75 20,60 45,45 35,25 60,35 55,5 80,30 68,50 92,55 72,68 88,88 60,78 50,100"
            fill="#FF5500"
          />
        </svg>

        {/* LAYER 4: AMBER CORE */}
        <svg
          className="absolute inset-y-[-20%] left-[-5%] w-[115%] h-[140%] grunge-jitter-c transform-gpu will-change-transform"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{overflow: 'visible' }}
        >
          <polygon
            points="35,100 45,78 28,62 48,48 40,30 62,38 58,10 78,32 68,52 90,58 74,70 86,88 62,80 52,100"
            fill="#fcd34d"
          />
        </svg>

      </div>
    </div>
  );
});