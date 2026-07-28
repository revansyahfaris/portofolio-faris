import { memo } from 'react';
import type { CSSProperties } from 'react';
import { SectionCard } from './SectionCard';

const IDENTITY_STYLE: CSSProperties = {
  transform:
    'perspective(400px) rotateY(28deg) rotateX(4deg) rotateZ(18deg) translateZ(-40px) translateX(450px) translateY(100px)',
};

interface IdentityCardProps {
  name: string;
  tagline: string;
}

export const IdentityCard = memo(function IdentityCard({ name, tagline }: IdentityCardProps) {
  return (
    <SectionCard className="md:pl-4 w-full sm:max-w-[750px]" style={IDENTITY_STYLE}>
      <div className="pr-20 sm:pr-32 md:pr-40 lg:pr-24 max-w-[100%]">
        <h2 className="font-serif font-black text-2xl sm:text-3xl md:text-xl tracking-tight text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
          {name}
        </h2>
        <p className="font-mono text-xs text-teal-400 font-bold tracking-widest uppercase mt-0.5">{tagline}</p>
      </div>
    </SectionCard>
  );
});
