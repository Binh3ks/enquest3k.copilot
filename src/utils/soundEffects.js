/**
 * soundEffects.js
 * High-performance, zero-latency Web Audio API synthesizer for UI and Arcade Sound Effects.
 * 0 bytes downloaded, works offline, perfectly tuned for children's ears (pleasant, cheerful frequencies).
 */

import useArcadeStore from '../stores/useArcadeStore';

let audioCtx = null;
let lastSoundTime = {};

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Throttle sound to prevent audio clipping on spam clicks
function canPlaySound(soundName, minIntervalMs = 60) {
  const now = Date.now();
  if (lastSoundTime[soundName] && (now - lastSoundTime[soundName] < minIntervalMs)) {
    return false;
  }
  lastSoundTime[soundName] = now;
  return true;
}

/**
 * 1. Bubble Pop Sound (Bubbly, soft, cheerful)
 */
export function playPopSound(pitchMultiplier = 1.0) {
  try {
    const sfxEnabled = useArcadeStore.getState().sfxEnabled ?? true;
    if (!sfxEnabled || !canPlaySound('pop', 40)) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const startFreq = 400 * pitchMultiplier;
    const endFreq = 950 * pitchMultiplier;
    const now = ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.07);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch (_) {}
}

/**
 * 2. Laser Cannon Blast (Sci-fi zapper)
 */
export function playLaserSound() {
  try {
    const sfxEnabled = useArcadeStore.getState().sfxEnabled ?? true;
    if (!sfxEnabled || !canPlaySound('laser', 70)) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.14);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  } catch (_) {}
}

/**
 * 3. Correct / Target Hit Sound (Ascending major chord chime)
 */
export function playCorrectSound() {
  try {
    const sfxEnabled = useArcadeStore.getState().sfxEnabled ?? true;
    if (!sfxEnabled || !canPlaySound('correct', 200)) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteStart = now + idx * 0.055;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteStart);

      gain.gain.setValueAtTime(0.001, noteStart);
      gain.gain.linearRampToValueAtTime(0.24, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteStart);
      osc.stop(noteStart + 0.3);
    });
  } catch (_) {}
}

/**
 * 4. Friendly Wrong / Miss Sound (Gentle low double boing)
 */
export function playWrongSound() {
  try {
    const sfxEnabled = useArcadeStore.getState().sfxEnabled ?? true;
    if (!sfxEnabled || !canPlaySound('wrong', 250)) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(160, now + 0.09);
    osc.frequency.setValueAtTime(180, now + 0.1);
    osc.frequency.linearRampToValueAtTime(130, now + 0.22);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  } catch (_) {}
}

/**
 * 5. UI Button Click (Crisp, snappy wooden tap)
 */
export function playButtonClick() {
  try {
    const sfxEnabled = useArcadeStore.getState().sfxEnabled ?? true;
    if (!sfxEnabled || !canPlaySound('click', 50)) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.035);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  } catch (_) {}
}

/**
 * 6. Car Drift / Skid Squeak (Playful tire screech)
 */
export function playDriftSound() {
  try {
    const sfxEnabled = useArcadeStore.getState().sfxEnabled ?? true;
    if (!sfxEnabled || !canPlaySound('drift', 120)) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(750, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.18);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  } catch (_) {}
}

/**
 * 7. Retro 8-bit Coin Sound (Mario style bonus)
 */
export function playCoinSound() {
  try {
    const sfxEnabled = useArcadeStore.getState().sfxEnabled ?? true;
    if (!sfxEnabled || !canPlaySound('coin', 150)) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    gain.gain.setValueAtTime(0.16, now);
    gain.gain.setValueAtTime(0.16, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (_) {}
}

/**
 * 8. Victory Fanfare (Celebratory grand chords)
 */
export function playVictoryFanfare() {
  try {
    const sfxEnabled = useArcadeStore.getState().sfxEnabled ?? true;
    if (!sfxEnabled || !canPlaySound('victory', 1000)) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    const chords = [
      { notes: [523.25, 659.25, 783.99], delay: 0.00, dur: 0.16 }, // C maj
      { notes: [587.33, 739.99, 880.00], delay: 0.18, dur: 0.16 }, // D maj
      { notes: [659.25, 830.61, 987.77], delay: 0.36, dur: 0.20 }, // E maj
      { notes: [783.99, 987.77, 1174.66, 1567.98], delay: 0.58, dur: 0.55 }, // High G maj flourish
    ];

    const now = ctx.currentTime;

    chords.forEach(chord => {
      chord.notes.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + chord.delay;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.16, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, start + chord.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + chord.dur + 0.05);
      });
    });
  } catch (_) {}
}

/**
 * 9. Global Click Sound Listener
 * Attaches delegated click listener so interactive buttons across all tasks & stations produce tactile audio feedback.
 */
let isGlobalClickInstalled = false;

export function initGlobalClickSound() {
  if (typeof window === 'undefined' || isGlobalClickInstalled) return;
  isGlobalClickInstalled = true;

  document.addEventListener('pointerdown', (e) => {
    try {
      const interactiveEl = e.target?.closest?.('button, [role="button"], a, input[type="button"], input[type="submit"], [data-clickable="true"]');
      if (interactiveEl && !interactiveEl.hasAttribute('data-no-click-sound')) {
        playButtonClick();
      }
    } catch (_) {}
  }, { passive: true });
}

