import { memo } from 'react';
import type { CSSProperties } from 'react';
import { SectionCard } from './SectionCard';

const DEGREE_STYLE: CSSProperties = {
  transform:
    'perspective(400px) rotateY(28deg) rotateX(4deg) rotateZ(-6deg) translateZ(-40px) translateX(275px) translateY(20px) scale(0.9)',
};

/** Kartu yang menampilkan informasi pendidikan (jurusan dan universitas). */
export const DegreeCard = memo(function DegreeCard() {
  return (
    <SectionCard className="md:pl-4 w-full sm:max-w-[750px]" style={DEGREE_STYLE}>
      <div className="pr-20 sm:pr-32 md:pr-40 lg:pr-12 max-w-[50%] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 text-zinc-950 font-black font-serif px-2.5 py-1 text-sm -rotate-3 border border-black shadow-[2px_2px_0px_#000]">
            01
          </div>
          <div>
            <span className="font-mono text-[10px] text-zinc-300 font-bold uppercase block tracking-wider">
              DEGREE / AFFILIATION
            </span>
            <h3 className="font-serif font-black text-xs xs:text-base text-white tracking-wider uppercase">
              COMPUTER ENGINEERING <span className="text-xs text-zinc-400 font-sans font-normal">{'/'} UNDIP</span>
            </h3>
          </div>
        </div>
      </div>
    </SectionCard>
  );
});
