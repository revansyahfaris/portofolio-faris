import { memo } from 'react';
import Image from 'next/image';

export const CharacterPhoto = memo(function CharacterPhoto() {
  return (
    <div className="absolute -bottom-16 -right-24 w-[65vw] sm:w-[50vw] md:w-[38vw] lg:w-[70vw] h-[65vh] sm:h-[110vh] z-30 pointer-events-none select-none flex items-end justify-end">
      <div className="relative w-full h-full transform transition-transform duration-500 hover:scale-105 origin-bottom-right">
        <Image
          src="/assets/profile/photo-profile.png"
          alt="Profile Character"
          fill
          priority
          sizes="(max-width: 640px) 65vw, (max-width: 1024px) 50vw, 70vw"
          className="object-contain object-bottom filter contrast-125 saturate-80"
        />
      </div>
    </div>
  );
});
