'use client';

import { memo, useState } from 'react';
import { SKILLS } from './palette';
import { OPEN_SPLIT_PERCENT } from './SkillsField';

interface OpenCoreSkillsProps {
  /** Daftar kemampuan inti milik teknologi yang sedang dibuka. */
  readonly items: readonly string[];
}

/**
 * Penempatan blok "Core Skills" terhadap section.
 */
const PLACEMENT = {
  topFromSplit: 7,
  left: '12vw',
  maxWidth: '52vw',
};

/** Ukuran dan warna judul. */
const HEADING = {
  size: 12,
  coreColor: SKILLS.yellow,
  gapBelow: 2.5,
};
const HEADING_2 = {
  size: 6,
  skillsColor: SKILLS.orange,
  gapBelow: 2.5,
};

/** Ukuran dan jarak antar butir daftar. */
const LIST = {
  size: 4.5,
  columnGap: '4vw',
  rowGap: '1.3vh',
  color: SKILLS.yellow,
  selectedColor: '#ffffff',
};

/** Bentuk penanda pilihan (kotak tosca miring). */
const SELECTION = {
  skew: -9,
  rotate: -1,
  padX: 0.4,
  padY: 0.14,
  color: '#138d7b',
};

export const OpenCoreSkills = memo(function OpenCoreSkills({ items }: OpenCoreSkillsProps) {
  const [selected, setSelected] = useState(0);

  const rows = Math.ceil(items.length / 2);

  return (
    <div
      className="absolute"
      style={{
        top: `${OPEN_SPLIT_PERCENT + PLACEMENT.topFromSplit}%`,
        left: PLACEMENT.left,
        maxWidth: PLACEMENT.maxWidth,
      }}
    >
      <h3 className="font-serif leading-none">
        <span
          className="font-bold"
          style={{
            fontSize: `${HEADING.size}vh`,
            marginBottom: `${HEADING.gapBelow}vh`,
            color: HEADING.coreColor,
          }}
        >
          Core
        </span>{' '}
        <span
          className="italic"
          style={{
            fontSize: `${HEADING_2.size}vh`,
            marginBottom: `${HEADING_2.gapBelow}vh`,
            color: HEADING_2.skillsColor,
          }}
        >
          Skills
        </span>
      </h3>

      <ul
        className="list-none"
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateRows: `repeat(${rows}, auto)`,
          columnGap: LIST.columnGap,
          rowGap: LIST.rowGap,
          justifyItems: 'start',
        }}
      >
        {items.map((item, index) => {
          const isSelected = index === selected;

          return (
            <li key={item}>
              <button
                type="button"
                onClick={() => setSelected(index)}
                className="relative block whitespace-nowrap font-serif leading-none"
                style={{
                  fontSize: `${LIST.size}vh`,
                  color: isSelected ? LIST.selectedColor : LIST.color,
                }}
              >
                {/* 📍 KOTAK PENANDA BACKGROUND (Membungkus di belakang teks tanpa -z-10 yang tenggelam) */}
                {isSelected && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute block z-0"
                    style={{
                      backgroundColor: SELECTION.color,
                      transform: `rotate(${SELECTION.rotate}deg) skewX(${SELECTION.skew}deg)`,
                      transformOrigin: 'center',
                      top: `${-SELECTION.padY}em`,
                      bottom: `${-SELECTION.padY}em`,
                      left: `${-SELECTION.padX}em`,
                      right: `${-SELECTION.padX}em`,
                    }}
                  />
                )}

                {/* 📍 TEKS UTAMA (Berada di z-10 di atas kotak penanda) */}
                <span className="relative z-10">{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
});