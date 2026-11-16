// Web Audio API Sound Synthesizer (Zero external dependencies, 100% offline)

let audioCtx = null;
let bgmOscillators = [];
let bgmGainNode = null;
let isBgmPlaying = false;
let isSfxMuted = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Mechanical keyboard click sound
export function playKeyClick(type = 'default') {
  if (isSfxMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // High click (key actuation)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(type === 'enter' ? 1800 : 2800 + Math.random() * 400, now);
    filter.Q.setValueAtTime(3.5, now);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(type === 'enter' ? 320 : 450 + Math.random() * 80, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);

    // Deep thud (bottom out)
    const thud = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(type === 'enter' ? 80 : 120, now);
    thud.frequency.exponentialRampToValueAtTime(40, now + 0.06);

    thudGain.gain.setValueAtTime(0.08, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    thud.connect(thudGain);
    thudGain.connect(ctx.destination);

    thud.start(now);
    thud.stop(now + 0.07);
  } catch (e) {
    // Graceful fallback
  }
}

// Celebration / Success Chord
export function playSuccessChime() {
  if (isSfxMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0, now + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.65);
    });
  } catch (e) {}
}

// Mini-game Catch Sound
export function playCatchSound(isBug = false) {
  if (isSfxMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (isBug) {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  } catch (e) {}
}

// Background Lo-fi Harmony Synthesizer
const chords = [
  [261.63, 329.63, 392.0, 493.88], // Cmaj7
  [220.0, 261.63, 329.63, 392.0],   // Am7
  [174.61, 220.0, 261.63, 329.63], // Fmaj7
  [196.0, 246.94, 293.66, 349.23], // G7
];

let chordInterval = null;

export function toggleBgm(enabled) {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (!enabled) {
    if (chordInterval) {
      clearInterval(chordInterval);
      chordInterval = null;
    }
    if (bgmGainNode) {
      try {
        bgmGainNode.gain.setValueAtTime(bgmGainNode.gain.value, ctx.currentTime);
        bgmGainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      } catch (e) {}
    }
    isBgmPlaying = false;
    return false;
  }

  isBgmPlaying = true;
  let chordIndex = 0;

  function playChord() {
    if (!isBgmPlaying) return;
    const currentChord = chords[chordIndex];
    chordIndex = (chordIndex + 1) % chords.length;

    const now = ctx.currentTime;
    currentChord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600 + idx * 80, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.025, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.9);
    });
  }

  playChord();
  chordInterval = setInterval(playChord, 3000);
  return true;
}

export function toggleSfx() {
  isSfxMuted = !isSfxMuted;
  return !isSfxMuted;
}
