'use client';

import React, { useMemo } from 'react';

function Star({
  x,
  y,
  scale = 1,
  rotation = 0,
  opacity = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
  opacity?: number;
}) {
  const starPath =
    'M 0 -50 L 14.6 -15.4 L 47.5 -15.4 L 20.9 3.8 L 30.9 38.1 L 0 19 L -30.9 38.1 L -20.9 3.8 L -47.5 -15.4 L -14.6 -15.4 Z';

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}
      opacity={opacity}
    >
      {/* <path d={starPath} fill="#dc2626" transform="scale(2.2)" />
      <path d={starPath} fill="#09090b" transform="scale(1.75)" />
      <path d={starPath} fill="#dc2626" transform="scale(1.35)" />
      <path d={starPath} fill="#09090b" transform="scale(0.95)" />
      <path d={starPath} fill="#dc2626" transform="scale(0.55)" /> */}

      <path d={starPath} fill="#1defcf" transform="scale(2.2)" />
      <path d={starPath} fill="#09090b" transform="scale(1.75)" />
      <path d={starPath} fill="#1defcf" transform="scale(1.35)" />
      <path d={starPath} fill="#09090b" transform="scale(0.95)" />
      <path d={starPath} fill="#1defcf" transform="scale(0.55)" />
    </g>
  );
}

function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export default function PersonaStarsBackground({
  cols = 23,
  rows = 15,
}: {
  cols?: number;
  rows?: number;
}) {
  const stars = useMemo(() => {
    const generatedStars = [];
    let seed = 42;

    const viewW = 1200; // sedikit lebih lebar dari viewBox biar nutup tepi
    const viewH = 700;
    const cellW = viewW / cols;
    const cellH = viewH / rows;

    let id = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Posisi dasar di tengah sel grid
        const baseX = col * cellW + cellW / 2 - 100;
        const baseY = row * cellH + cellH / 2 - 50;

        // Jitter (offset acak kecil) supaya nggak kaku kayak grid sempurna
        // Range jitter dibatasi ~40% dari ukuran sel biar tetap nggak overlap parah antar sel
        const jitterX = (seededRandom(seed++) - 0.5) * cellW * 0.7;
        const jitterY = (seededRandom(seed++) - 0.5) * cellH * 0.7;

        const x = baseX + jitterX;
        const y = baseY + jitterY;

        // Distribusi ukuran tetap variatif seperti sebelumnya
        const scaleRand = seededRandom(seed++);
        let scale = 0.25 + scaleRand * 0.5;

        if (scaleRand > 0.88) {
          scale = 1.1 + seededRandom(seed++) * 0.7;
        }

        const rotation = seededRandom(seed++) * 360 - 180;

        generatedStars.push({ id: id++, x, y, scale, rotation, opacity: 1 });
      }
    }

    return generatedStars.sort((a, b) => a.scale - b.scale);
  }, [cols, rows]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-zinc-950">
      <svg
        className="w-full h-full object-cover opacity-75"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {stars.map((star) => (
            <Star
              key={star.id}
              x={star.x}
              y={star.y}
              scale={star.scale}
              rotation={star.rotation}
              opacity={star.opacity}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}