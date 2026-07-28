import { memo } from 'react';

export const Banner3D = memo(function Banner3D() {
  return (
    <div className="absolute top-[68vh] right-[2vw] sm:right-[5vw] lg:right-[8vw] z-50 pointer-events-none select-none flex flex-col items-end gap-1">
      {/* BANNER 1: "PROFILE" */}
      <div className="[perspective:1000px] [transform-style:preserve-3d]">
        <div
          className="flex items-center gap-1 sm:gap-2 bg-white text-black p-2 sm:p-3 -skew-x-12 border-4 border-black shadow-[10px_10px_0px_#000,-4px_-4px_0px_#10b981] transform-gpu [transform-style:preserve-3d]"
          style={{
            transform: 'rotateX(20deg) rotateY(60deg) rotateZ(-4deg) translateZ(30px)',
          }}
        >
          <span className="font-serif font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter uppercase inline-block -rotate-3 text-emerald-500 drop-shadow-[2px_2px_0px_#000]">P</span>
          <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl tracking-tight uppercase inline-block rotate-2">R</span>
          <span className="font-serif font-black text-3xl sm:text-5xl md:text-6xl tracking-widest uppercase inline-block -rotate-6 bg-black text-white px-1.5 shadow-[3px_3px_0px_#10b981]">O</span>
          <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl uppercase inline-block rotate-3">F</span>
          <span className="font-mono font-black text-3xl sm:text-5xl md:text-6xl uppercase inline-block -rotate-2 text-emerald-500 drop-shadow-[2px_2px_0px_#000]">I</span>
          <span className="font-serif font-black text-2xl sm:text-4xl md:text-5xl uppercase inline-block rotate-6">L</span>
          <span className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase inline-block -rotate-3 bg-teal-600 text-white px-1 shadow-[3px_3px_0px_#000]">E</span>
        </div>
      </div>

      {/* BANNER 2: "STATUS" */}
      <div className="[perspective:800px] [transform-style:preserve-3d] -mr-8 sm:-mr-16 -mt-4 sm:-mt-6">
        <div
          className="flex items-center gap-1 sm:gap-2 bg-teal-600 text-white p-2 sm:p-2.5 -skew-x-12 border-4 border-black shadow-[12px_12px_0px_#000] transform-gpu [transform-style:preserve-3d]"
          style={{
            transform: 'rotateX(10deg) rotateY(-60deg) rotateZ(-4deg) translateZ(-30px) translateY(20px)',
          }}
        >
          <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl tracking-tight uppercase inline-block -rotate-6 bg-black text-white px-2 shadow-[2px_2px_0px_#fff]">S</span>
          <span className="font-serif font-black text-3xl sm:text-5xl md:text-6xl uppercase inline-block rotate-3 text-cyan-300 drop-shadow-[2px_2px_0px_#000]">T</span>
          <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl uppercase inline-block -rotate-2">A</span>
          <span className="font-serif font-black text-3xl sm:text-5xl md:text-6xl uppercase inline-block rotate-6 text-black drop-shadow-[2px_2px_0px_#fff]">T</span>
          <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl uppercase inline-block -rotate-3">U</span>
          <span className="font-serif font-black text-3xl sm:text-5xl md:text-6xl uppercase inline-block rotate-2 text-cyan-300 drop-shadow-[2px_2px_0px_#000]">S</span>
        </div>
      </div>
    </div>
  );
});
