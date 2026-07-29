// src/lib/sfx.ts

class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      // Warm-up AudioContext pada gestur interaksi pertama user (click, pointerdown, keydown)
      const initAudio = () => {
        this.initCtx();
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        // Unbind listener setelah initialized
        window.removeEventListener('pointerdown', initAudio);
        window.removeEventListener('keydown', initAudio);
        window.removeEventListener('touchstart', initAudio);
      };

      window.addEventListener('pointerdown', initAudio, { passive: true });
      window.addEventListener('keydown', initAudio, { passive: true });
      window.addEventListener('touchstart', initAudio, { passive: true });

      // Opsi cadangan: Inisialisasi saat browser idle (jika didukung)
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          this.initCtx();
        });
      }
    }
  }

  private initCtx(): void {
    if (!this.ctx && typeof window !== 'undefined') {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      } catch {
        // Fallback silent jika browser memblokir Web Audio
      }
    }
  }

  // Pastikan AudioContext dalam keadaan 'running' saat hendak membunyikan audio
  private ensureContextRunning(): boolean {
    if (!this.ctx) {
      this.initCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return !!this.ctx && this.ctx.state === 'running';
  }

  public playHover(): void {
    if (!this.enabled || !this.ensureContextRunning()) return;

    try {
      const ctx = this.ctx!;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Guard dari audio failure
    }
  }

  public playSelect(): void {
    if (!this.enabled || !this.ensureContextRunning()) return;

    try {
      const ctx = this.ctx!;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Guard dari audio failure
    }
  }
}

// Export instansi tunggal (Singleton)
export const sfx = new SoundEffects();