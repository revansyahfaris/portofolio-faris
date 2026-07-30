'use client';

import { useEffect, useRef } from 'react';

export function useViewportPresence<T extends HTMLElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      el.classList.toggle('fx-paused', !entry.isIntersecting);
    }, { rootMargin: '200px', ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}