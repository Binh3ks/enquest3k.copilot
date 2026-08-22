/**
 * arcadeBgm.js
 * Synthesized, low-latency, zero-byte-download Chiptune/Melodic Arcade BGM Looper.
 * Powered by Web Audio API with automatic Audio Ducking (mutes/lowers volume when TTS speaks).
 */

import useArcadeStore from '../stores/useArcadeStore';

let bgmAudioCtx = null;
let bgmGainNode = null;
let isBgmRunning = false;
let bgmIntervalId = null;
let activeOscillators = [];

function getBgmContext() {
  if (!bgmAudioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      bgmAudioCtx = new AudioContextClass();
      bgmGainNode = bgmAudioCtx.createGain();
      bgmGainNode.gain.setValueAtTime(0.08, bgmAudioCtx.currentTime); // Gentle default background volume
      bgmGainNode.connect(bgmAudioCtx.destination);
    }
  }
  if (bgmAudioCtx && bgmAudioCtx.state === 'suspended') {
    bgmAudioCtx.resume().catch(() => {});
  }
  return { ctx: bgmAudioCtx, masterGain: bgmGainNode };
}

// 8-bit pentatonic melody notes (C major scale frequencies)
const MELODY_SEQUENCE = [
  // Bar 1
  { note: 523.25, dur: 0.18, time: 0.00 }, // C5
  { note: 659.25, dur: 0.18, time: 0.25 }, // E5
  { note: 783.99, dur: 0.18, time: 0.50 }, // G5
  { note: 880.00, dur: 0.28, time: 0.75 }, // A5
  // Bar 2
  { note: 783.99, dur: 0.18, time: 1.00 }, // G5
  { note: 659.25, dur: 0.18, time: 1.25 }, // E5
  { note: 523.25, dur: 0.35, time: 1.50 }, // C5
  // Bar 3
  { note: 587.33, dur: 0.18, time: 2.00 }, // D5
  { note: 659.25, dur: 0.18, time: 2.25 }, // E5
  { note: 783.99, dur: 0.18, time: 2.50 }, // G5
  { note: 659.25, dur: 0.28, time: 2.75 }, // E5
  // Bar 4
  { note: 587.33, dur: 0.22, time: 3.00 }, // D5
  { note: 523.25, dur: 0.50, time: 3.35 }, // C5
];

const BASS_SEQUENCE = [
  { note: 130.81, dur: 0.40, time: 0.00 }, // C3
  { note: 130.81, dur: 0.40, time: 0.50 }, // C3
  { note: 174.61, dur: 0.40, time: 1.00 }, // F3
  { note: 174.61, dur: 0.40, time: 1.50 }, // F3
  { note: 196.00, dur: 0.40, time: 2.00 }, // G3
  { note: 196.00, dur: 0.40, time: 2.50 }, // G3
  { note: 130.81, dur: 0.60, time: 3.00 }, // C3
];

const LOOP_DURATION_SEC = 4.0;

function scheduleLoop(startTime) {
  const { ctx, masterGain } = getBgmContext();
  if (!ctx || !masterGain || !isBgmRunning) return;

  const bgmEnabled = useArcadeStore.getState().bgmEnabled ?? true;
  if (!bgmEnabled) return;

  // Schedule Melody (Square / Triangle wave for cute retro arcade vibe)
  MELODY_SEQUENCE.forEach(m => {
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    const noteTime = startTime + m.time;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(m.note, noteTime);

    noteGain.gain.setValueAtTime(0.001, noteTime);
    noteGain.gain.linearRampToValueAtTime(0.12, noteTime + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.001, noteTime + m.dur);

    osc.connect(noteGain);
    noteGain.connect(masterGain);

    osc.start(noteTime);
    osc.stop(noteTime + m.dur + 0.05);
    activeOscillators.push(osc);
  });

  // Schedule Bass line
  BASS_SEQUENCE.forEach(b => {
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    const noteTime = startTime + b.time;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(b.note, noteTime);

    noteGain.gain.setValueAtTime(0.001, noteTime);
    noteGain.gain.linearRampToValueAtTime(0.15, noteTime + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.001, noteTime + b.dur);

    osc.connect(noteGain);
    noteGain.connect(masterGain);

    osc.start(noteTime);
    osc.stop(noteTime + b.dur + 0.05);
    activeOscillators.push(osc);
  });
}

/**
 * Start Arcade Background Music loop
 */
export function startArcadeBgm() {
  try {
    const bgmEnabled = useArcadeStore.getState().bgmEnabled ?? true;
    if (!bgmEnabled) return;
    if (isBgmRunning) return;

    const { ctx } = getBgmContext();
    if (!ctx) return;

    isBgmRunning = true;
    let nextLoopTime = ctx.currentTime + 0.05;

    // Schedule first loop
    scheduleLoop(nextLoopTime);
    nextLoopTime += LOOP_DURATION_SEC;

    // Schedule recurring loops
    bgmIntervalId = setInterval(() => {
      if (!isBgmRunning) {
        clearInterval(bgmIntervalId);
        return;
      }
      if (ctx.currentTime + 1.0 >= nextLoopTime) {
        scheduleLoop(nextLoopTime);
        nextLoopTime += LOOP_DURATION_SEC;
      }
    }, (LOOP_DURATION_SEC * 1000) / 2);
  } catch (_) {}
}

/**
 * Stop Arcade Background Music
 */
export function stopArcadeBgm() {
  isBgmRunning = false;
  if (bgmIntervalId) {
    clearInterval(bgmIntervalId);
    bgmIntervalId = null;
  }
  activeOscillators.forEach(osc => {
    try { osc.stop(); } catch (_) {}
  });
  activeOscillators = [];
}

/**
 * Audio Ducking: lowers BGM volume to 10% during TTS / Voice interaction
 */
export function duckArcadeBgm(durationMs = 2500) {
  try {
    if (!bgmGainNode || !bgmAudioCtx) return;
    const now = bgmAudioCtx.currentTime;

    // Ramp down to 10%
    bgmGainNode.gain.cancelScheduledValues(now);
    bgmGainNode.gain.linearRampToValueAtTime(0.015, now + 0.1);

    // Ramp back up after duration
    const restoreTime = now + (durationMs / 1000);
    bgmGainNode.gain.setValueAtTime(0.015, restoreTime);
    bgmGainNode.gain.linearRampToValueAtTime(0.08, restoreTime + 0.4);
  } catch (_) {}
}
