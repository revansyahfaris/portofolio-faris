import { memo } from 'react';

export const FlameFlareForeground = memo(function FlameFlareForeground() {
  return (
    <div
      className="absolute -top-[0px] -right-[800px] w-[85vw] sm:w-[65vw] md:w-[130vw] h-full z-40 pointer-events-none select-none overflow-visible rotate-[36deg]"
      style={{contain: 'layout style'}}
    >
      <div
        className="absolute inset-y-[-20%] left-[-5%] w-[115%] bg-red-600 opacity-80 grunge-jitter-c transform-gpu will-change-transform"
        style={{
          clipPath:
            'polygon(35% 100%, 45% 78%, 28% 62%, 48% 48%, 40% 30%, 62% 38%, 58% 10%, 78% 32%, 68% 52%, 90% 58%, 74% 70%, 86% 88%, 62% 80%, 52% 100%)',
        }}
      />
    </div>
  );
});
