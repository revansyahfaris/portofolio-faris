'use client';

import { useEffect, useState } from 'react';
import type { GithubStats } from '@/lib/github/types';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface State {
  status: Status;
  data: GithubStats | null;
  error: string | null;
}

const INITIAL_STATE: State = { status: 'idle', data: null, error: null };

/**
 * Mengambil statistik GitHub dari route internal /api/github.
 *
 * Pengambilan sengaja ditunda sampai parameter enabled bernilai true — section
 * GitHub berada jauh di bawah halaman, dan memanggil API saat halaman baru dimuat
 * berarti bersaing dengan pemuatan konten yang sebenarnya sedang dilihat pengguna.
 * Section memicunya ketika bagian tersebut mendekati viewport.
 *
 * AbortController memastikan permintaan dibatalkan bila komponen dilepas sebelum
 * balasan tiba, mencegah pembaruan state pada komponen yang sudah tidak ada.
 */
export function useGithubStats(enabled: boolean) {
  const [state, setState] = useState<State>(INITIAL_STATE);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    setState({ status: 'loading', data: null, error: null });

    async function load() {
      try {
        const response = await fetch('/api/github', { signal: controller.signal });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error ?? 'Gagal memuat data GitHub.');
        }

        setState({ status: 'success', data: payload as GithubStats, error: null });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setState({
          status: 'error',
          data: null,
          error: error instanceof Error ? error.message : 'Gagal memuat data GitHub.',
        });
      }
    }

    load();
    return () => controller.abort();
  }, [enabled]);

  return state;
}
