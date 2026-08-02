'use client';

import React, { useEffect, useRef, memo } from 'react';

/** Path SVG bentuk bintang, dipakai ulang untuk setiap bintang yang digambar di canvas. */
const STAR_PATH_STR =
  'M 0 -50 L 14.6 -15.4 L 47.5 -15.4 L 20.9 3.8 L 30.9 38.1 L 0 19 L -30.9 38.1 L -20.9 3.8 L -47.5 -15.4 L -14.6 -15.4 Z';

/** Pembangkit angka pseudo-acak berbasis seed, agar posisi bintang konsisten antar render. */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return Math.abs(x - Math.floor(x));
}

/**
 * StarsBackground
 *
 * Latar belakang berupa medan bintang yang digambar sekali ke <canvas> (bukan animasi
 * berkelanjutan). Penggambaran sengaja ditunda sampai Largest Contentful Paint (LCP)
 * terdeteksi selesai (lewat PerformanceObserver), supaya proses menggambar ratusan
 * bintang ini tidak bersaing dengan elemen utama untuk waktu render di awal muat halaman.
 */
export default memo(function StarsBackground({
  cols = 34,
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

    const path2D = new Path2D(STAR_PATH_STR);

    // Fungsi Render Canvas Bintang
    const renderStars = () => {
      if (!canvas || !canvas.parentElement) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const displayWidth = canvas.parentElement.clientWidth || window.innerWidth;
      const displayHeight = canvas.parentElement.clientHeight || window.innerHeight;

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;

      ctx.save();
      ctx.scale(dpr, dpr);

      const stars: Array<{
        x: number;
        y: number;
        scale: number;
        rotation: number;
      }> = [];
      let seed = 42;

      const cellW = displayWidth / cols;
      const cellH = displayHeight / rows;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const baseX = col * cellW + cellW / 2;
          const baseY = row * cellH + cellH / 2;

          seed += 1;
          const jitterX = (seededRandom(seed) - 0.5) * cellW * 1.25;
          seed += 1;
          const jitterY = (seededRandom(seed) - 0.5) * cellH * 1.25;

          const x = baseX + jitterX;
          const y = baseY + jitterY;

          seed += 1;
          const scaleRand = seededRandom(seed);

          let scale = 0.35 + scaleRand * 0.45;

          if (scaleRand > 0.85) {
            seed += 1;
            scale = 1.0 + seededRandom(seed) * 0.6;
          }

          seed += 1;
          const rotation = (seededRandom(seed) * 360 - 180) * (Math.PI / 180);

          stars.push({ x, y, scale, rotation });
        }
      }

      stars.sort((a, b) => a.scale - b.scale);

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      for (let i = 0; i < stars.length; i++) {
        const { x, y, scale, rotation } = stars[i];

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        ctx.save();
        ctx.scale(scale * 2.2, scale * 2.2);
        ctx.fillStyle = '#138d7b';
        ctx.fill(path2D);
        ctx.restore();

        ctx.save();
        ctx.scale(scale * 1.75, scale * 1.75);
        ctx.fillStyle = '#09090b';
        ctx.fill(path2D);
        ctx.restore();

        ctx.save();
        ctx.scale(scale * 1.35, scale * 1.35);
        ctx.fillStyle = '#138d7b';
        ctx.fill(path2D);
        ctx.restore();

        ctx.save();
        ctx.scale(scale * 0.95, scale * 0.95);
        ctx.fillStyle = '#09090b';
        ctx.fill(path2D);
        ctx.restore();

        ctx.save();
        ctx.scale(scale * 0.55, scale * 0.55);
        ctx.fillStyle = '#138d7b';
        ctx.fill(path2D);
        ctx.restore();

        ctx.restore();
      }

      const shadowWidth = displayWidth * 0.55;
      const gradient = ctx.createLinearGradient(0, 0, shadowWidth, 0);
      gradient.addColorStop(0, '#09090b');
      gradient.addColorStop(0.5, 'rgba(9, 9, 11, 0.55)');
      gradient.addColorStop(1, 'rgba(9, 9, 11, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, shadowWidth, displayHeight);

      ctx.restore();
    };

    // Strategi penundaan render: gambar bintang baru dipicu setelah LCP tercatat,
    // dengan beberapa jalur fallback di bawah untuk memastikan tetap tergambar.
    let hasRendered = false;

    const triggerRenderOnce = () => {
      if (hasRendered) return;
      hasRendered = true;
      renderStars();
    };

    // PerformanceObserver untuk mendeteksi kapan LCP selesai dicat ke layar
    let po: PerformanceObserver | null = null;

    try {
      if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
        po = new PerformanceObserver((entryList) => {
          if (entryList.getEntries().length > 0) {
            triggerRenderOnce();
            po?.disconnect();
          }
        });

        // observe entry LCP dengan buffered: true agar tidak kelewatan jika LCP sudah terjadi
        po.observe({
          type: 'largest-contentful-paint',
          buffered: true,
        } as PerformanceObserverInit);
      } else {
        // Fallback untuk browser yang tidak mendukung PerformanceObserver
        setTimeout(triggerRenderOnce, 800);
      }
    } catch {
      // Fallback jika 'type: largest-contentful-paint' ditolak oleh browser tertentu
      setTimeout(triggerRenderOnce, 800);
    }

    // Safety timeout: memastikan bintang tetap dirender jika entri LCP gagal ter-trigger
    const safetyTimeout = setTimeout(triggerRenderOnce, 2000);

    const handleVisibility = () => {
      if (!document.hidden) triggerRenderOnce();
    };

    const handleResize = () => {
      // Resize hanya memicu re-render jika canvas sudah pernah dirender sekali
      if (hasRendered) renderStars();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('resize', handleResize);

    return () => {
      if (po) po.disconnect();
      clearTimeout(safetyTimeout);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
    };
  }, [cols, rows]);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-zinc-950 hero-breathe"
      style={{ contain: 'strict' }}
    >
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </div>
  );
});