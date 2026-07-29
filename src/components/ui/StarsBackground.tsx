'use client';

import React, { useEffect, useRef, memo } from 'react';

const STAR_PATH_STR =
  'M 0 -50 L 14.6 -15.4 L 47.5 -15.4 L 20.9 3.8 L 30.9 38.1 L 0 19 L -30.9 38.1 L -20.9 3.8 L -47.5 -15.4 L -14.6 -15.4 Z';

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return Math.abs(x - Math.floor(x));
}

export default memo(function StarsBackground({
  cols = 26,
  rows = 14,
}: {
  readonly cols?: number;
  readonly rows?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let isVisible = true;

    // 📍 Support High-DPI / Retina Display agar bintang tajam
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.parentElement?.clientWidth || 1200;
    const displayHeight = canvas.parentElement?.clientHeight || 700;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    ctx.scale(dpr, dpr);

    const path2D = new Path2D(STAR_PATH_STR);
    const stars: Array<{ x: number; y: number; scale: number; rotation: number }> = [];
    let seed = 42;

    const cellW = displayWidth / cols;
    const cellH = displayHeight / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const baseX = col * cellW + cellW / 2 - 100;
        const baseY = row * cellH + cellH / 2 - 50;

        seed += 1;
        const jitterX = (seededRandom(seed) - 0.5) * cellW * 0.7;
        seed += 1;
        const jitterY = (seededRandom(seed) - 0.5) * cellH * 0.7;

        const x = baseX + jitterX;
        const y = baseY + jitterY;

        seed += 1;
        const scaleRand = seededRandom(seed);
        let scale = 0.25 + scaleRand * 0.5;

        if (scaleRand > 0.88) {
          seed += 1;
          scale = 1.1 + seededRandom(seed) * 0.7;
        }

        seed += 1;
        const rotation = (seededRandom(seed) * 360 - 180) * (Math.PI / 180);

        stars.push({ x, y, scale, rotation });
      }
    }

    stars.sort((a, b) => a.scale - b.scale);

    const draw = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      for (let i = 0; i < stars.length; i++) {
        const { x, y, scale, rotation } = stars[i];

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        // Layer 1: Teal Outer
        ctx.save();
        ctx.scale(scale * 2.2, scale * 2.2);
        ctx.fillStyle = '#1defcf';
        ctx.fill(path2D);
        ctx.restore();

        // Layer 2: Dark
        ctx.save();
        ctx.scale(scale * 1.75, scale * 1.75);
        ctx.fillStyle = '#09090b';
        ctx.fill(path2D);
        ctx.restore();

        // Layer 3: Teal Mid
        ctx.save();
        ctx.scale(scale * 1.35, scale * 1.35);
        ctx.fillStyle = '#1defcf';
        ctx.fill(path2D);
        ctx.restore();

        // Layer 4: Dark Inner
        ctx.save();
        ctx.scale(scale * 0.95, scale * 0.95);
        ctx.fillStyle = '#09090b';
        ctx.fill(path2D);
        ctx.restore();

        // Layer 5: Teal Center
        ctx.save();
        ctx.scale(scale * 0.55, scale * 0.55);
        ctx.fillStyle = '#1defcf';
        ctx.fill(path2D);
        ctx.restore();

        ctx.restore();
      }
    };

    draw();

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) draw();
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [cols, rows]);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-zinc-950"
      style={{ contain: 'strict' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-75 transform-gpu"
      />
    </div>
  );
});