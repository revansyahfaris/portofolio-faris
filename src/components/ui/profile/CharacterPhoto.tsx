import { memo } from 'react';
import Image from 'next/image';

export const CharacterPhoto = memo(function CharacterPhoto() {
  return (
    <div className="absolute -bottom-16 -right-24 w-[65vw] sm:w-[50vw] md:w-[38vw] lg:w-[70vw] h-[65vh] sm:h-[110vh] z-30 pointer-events-none select-none flex items-end justify-end">
      <div className="relative w-full h-full transform transition-transform duration-500 hover:scale-105 origin-bottom-right">
        <Image
          src="https://res.cloudinary.com/iyerv9sc/image/upload/f_auto,q_auto/v1785295087/Untitled_design_-_2026-07-27T103842.226_dflj9u.png"
          alt="Profile Photo - Muhammad Faris Revansyah"
          fill
          priority
          sizes="(max-width: 640px) 65vw, (max-width: 1024px) 50vw, 70vw"
          className="object-contain object-bottom filter contrast-125 saturate-80"
        />
      </div>
    </div>
  );
});
