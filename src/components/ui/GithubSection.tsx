// src/components/ui/GithubSection.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function GithubSection() {
  const [shouldRenderChart, setShouldRenderChart] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Hanya render elemen SVG / Chart kompleks saat section sudah mendekati viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRenderChart(true);
          observer.disconnect(); // Sekali render, matikan observer
        }
      },
      { rootMargin: '200px' } // Pre-load 200px sebelum user sampai ke section ini
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full py-12">
      {shouldRenderChart ? (
        /* Komponen SVG / Chart Github Raksasa kamu di sini */
        <div className="github-chart-wrapper">
          {/* SVG Nodes */}
        </div>
      ) : (
        /* Placeholder ringan agar tidak memicu layout thrashing */
        <div className="w-full h-64 bg-zinc-900/50 animate-pulse rounded-lg border border-zinc-800" />
      )}
    </div>
  );
}