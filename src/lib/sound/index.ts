// Web Audio API sci-fi game sound synthesizer
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export const gameAudio = {
  // Crisp tactical UI click
  playClick(enabled = true) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  },

  // Subtle futuristic hover tick
  playHover(enabled = true) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // ignore
    }
  },

  // Quest / Loot roll sound (rapid futuristic dice spinning)
  playRoll(enabled = true) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      for (let i = 0; i < 6; i++) {
        const time = ctx.currentTime + i * 0.045;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(300 + i * 150, time);

        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.04);
      }
    } catch {
      // ignore
    }
  },

  // Rewarding quest completion / milestone cleared
  playQuestComplete(enabled = true) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const time = ctx.currentTime + idx * 0.07;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.18, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.35);
      });
    } catch {
      // ignore
    }
  },

  // Level Up fanfare
  playLevelUp(enabled = true) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const chords = [
        [440, 554.37, 659.25], // A major
        [587.33, 739.99, 880], // D major
        [659.25, 830.61, 987.77], // E major
        [880, 1108.73, 1318.51], // A high
      ];
      chords.forEach((chord, idx) => {
        const time = ctx.currentTime + idx * 0.12;
        chord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, time);

          gain.gain.setValueAtTime(0.12, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(time);
          osc.stop(time + 0.4);
        });
      });
    } catch {
      // ignore
    }
  },
};
