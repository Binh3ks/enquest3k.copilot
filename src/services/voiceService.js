/**
 * Multi-Tier TTS Voice Service
 * Optimized fallback chain for performance + reliability
 * 
 * TTS ARCHITECTURE — Two modes depending on week:
 *
 * W1-15 (pre-generated):
 *   1. Client Cache (IndexedDB) — Instant replay (0ms)
 *   2. R2 CDN direct fetch — Pre-generated Deepgram files in CDN_WEEKS (~100ms)
 *   3. Deepgram Worker — On R2 miss or dynamic content (~300-500ms)
 *   4. Browser TTS — Last resort (~500ms)
 *
 * W16+ (on-demand via Worker):
 *   1. Client Cache (IndexedDB) — Instant replay (0ms)
 *   2. TIER 2 SKIPPED — not in CDN_WEEKS (no bulk pre-generation)
 *   3. Deepgram Worker — Checks R2 first, generates on miss, saves to R2 path from audio_url
 *   4. Browser TTS — Last resort (~500ms)
 *
 *   audio_url in data files = R2 storage key. Worker generates on first play,
 *   then ALL users get R2 hit (<100ms) on subsequent plays.
 *
 * STATION CLASSIFICATION:
 * - Static (STATIC_STATIONS): read, new_word, dictation, shadowing, explore, word_power,
 *   ask_ai, mindmap_speaking, logic_lab, singapore_math, social_quiz
 *   → Use audio_url path for R2 caching (structured filenames)
 * - Dynamic (DYNAMIC_STATIONS): ai_tutor, gamehub, freetalk, ai_story
 *   → Live generation via Deepgram Worker (hash-based R2 paths)
 *
 * Features:
 * - Station-based voice selection (Deepgram Aura-2 voices via voiceConfig)
 * - W1-15: CDN_WEEKS pre-generated audio on R2 (Google TTS → uploaded manually)
 * - W16+: On-demand Worker generation with structured R2 caching per audio_url
 * - Client-side IndexedDB caching for all sources
 * - Graceful degradation: Worker → Browser TTS
 */

import { TTSCache } from './ttsCache';
import { loadWeekData } from '../data/weeks/index';

// CDN Base URL for pre-generated Deepgram audio files from Cloudflare R2
const CDN_URL = import.meta.env.VITE_CDN_URL || 'https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev';

// ─── Aura-2 Voice Roster ─────────────────────────────────────────────────────
// Youth-friendly pool: clear, energetic, natural — ages 6-15
export const AURA2_VOICES = {
  luna:    'aura-2-luna-en',    // F Young Adult American — Friendly, Natural, Engaging
  iris:    'aura-2-iris-en',    // F Young Adult American — Cheerful, Positive, Approachable
  aurora:  'aura-2-aurora-en',  // F Adult American       — Cheerful, Expressive, Energetic
  thalia:  'aura-2-thalia-en',  // F Adult American       — Clear, Confident, Energetic
  helena:  'aura-2-helena-en',  // F Adult American       — Caring, Natural, Friendly, Raspy
  pandora: 'aura-2-pandora-en', // F Adult British        — Smooth, Calm, Melodic
  aries:   'aura-2-aries-en',   // M Adult American       — Warm, Energetic, Caring
  apollo:  'aura-2-apollo-en',  // M Adult American       — Confident, Comfortable, Casual
  arcas:   'aura-2-arcas-en',   // M Adult American       — Natural, Smooth, Clear
  draco:   'aura-2-draco-en',   // M Adult British        — Warm, Approachable, Baritone
};

// Per-station-type rotation pools (31 entries → W1–W31+, wraps after 31)
// Narration: W1-4 female-only for early learners; W5+ mixed
const _V = AURA2_VOICES;
const VOICE_ROTATION = {
  narration: [
    // W1-4: female priority
    _V.luna, _V.iris, _V.aurora, _V.thalia,
    // W5-8
    _V.helena, _V.aries, _V.pandora, _V.draco,
    // W9-12
    _V.luna, _V.aurora, _V.apollo, _V.iris,
    // W13-16
    _V.thalia, _V.arcas, _V.helena, _V.draco,
    // W17-20
    _V.pandora, _V.aries, _V.luna, _V.aurora,
    // W21-24
    _V.apollo, _V.iris, _V.thalia, _V.helena,
    // W25-28
    _V.draco, _V.pandora, _V.aries, _V.arcas,
    // W29-31
    _V.luna, _V.aurora, _V.iris,
  ],
  vocabulary: [
    _V.luna,   _V.iris,    _V.thalia,  _V.aurora,  _V.apollo,
    _V.luna,   _V.iris,    _V.thalia,  _V.aurora,  _V.apollo,
    _V.luna,   _V.iris,    _V.thalia,  _V.aurora,  _V.apollo,
    _V.luna,   _V.iris,    _V.thalia,  _V.aurora,  _V.apollo,
    _V.luna,   _V.iris,    _V.thalia,  _V.aurora,  _V.apollo,
    _V.luna,   _V.iris,    _V.thalia,  _V.aurora,  _V.apollo,
    _V.luna,
  ],
  dictation: [
    _V.thalia,  _V.luna,   _V.arcas,   _V.iris,    _V.aries,
    _V.apollo,  _V.pandora,_V.helena,  _V.draco,   _V.aurora,
    _V.thalia,  _V.luna,   _V.arcas,   _V.iris,    _V.aries,
    _V.apollo,  _V.pandora,_V.helena,  _V.draco,   _V.aurora,
    _V.thalia,  _V.luna,   _V.arcas,   _V.iris,    _V.aries,
    _V.apollo,  _V.pandora,_V.helena,  _V.draco,   _V.aurora,
    _V.thalia,
  ],
  questions: [
    _V.aries,  _V.draco,   _V.aurora,  _V.apollo,  _V.iris,
    _V.thalia, _V.arcas,   _V.pandora, _V.luna,    _V.helena,
    _V.aries,  _V.draco,   _V.aurora,  _V.apollo,  _V.iris,
    _V.thalia, _V.arcas,   _V.pandora, _V.luna,    _V.helena,
    _V.aries,  _V.draco,   _V.aurora,  _V.apollo,  _V.iris,
    _V.thalia, _V.arcas,   _V.pandora, _V.luna,    _V.helena,
    _V.aries,
  ],
  mindmap: [
    _V.apollo, _V.iris,    _V.draco,   _V.aurora,  _V.aries,
    _V.luna,   _V.thalia,  _V.arcas,   _V.pandora, _V.helena,
    _V.apollo, _V.iris,    _V.draco,   _V.aurora,  _V.aries,
    _V.luna,   _V.thalia,  _V.arcas,   _V.pandora, _V.helena,
    _V.apollo, _V.iris,    _V.draco,   _V.aurora,  _V.aries,
    _V.luna,   _V.thalia,  _V.arcas,   _V.pandora, _V.helena,
    _V.apollo,
  ],
};

/** Get Aura-2 voice for a given week and station category. W1→idx0, wraps after 31. */
function getAura2Voice(weekNumber, stationCategory) {
  const pool = VOICE_ROTATION[stationCategory];
  if (!pool || !weekNumber) return null;
  return pool[(weekNumber - 1) % pool.length] || null;
}

// Google Cloud TTS → Deepgram Aura voice mapping
// Used for on-demand generation when R2 CDN misses
const GOOGLE_TO_DEEPGRAM_VOICE = {
  // Female voices
  'en-US-Neural2-C': 'aura-luna-en',      // Soft, warm (legacy only — no longer used in new weeks)
  'en-US-Neural2-F': 'aura-asteria-en',   // Natural, expressive (vocabulary, dictation, shadowing)
  'en-US-Neural2-H': 'aura-stella-en',    // Bright, clear (narration, explore)
  'en-US-Neural2-E': 'aura-asteria-en',   // Female fallback → asteria
  // Male voices
  'en-US-Neural2-B': 'aura-helios-en',    // Clean, clear, friendly (mindmap, ask-ai — week 16+)
  'en-US-Neural2-D': 'aura-orion-en',     // Deep, authoritative (legacy narration)
  'en-US-Neural2-J': 'aura-zeus-en',      // Energetic, engaging (questions)
  'en-US-Neural2-A': 'aura-orion-en',     // Fallback male
  'en-US-Neural2-I': 'aura-zeus-en',      // Fallback energetic
};

// Station → voiceConfig key mapping (for looking up correct voice)
const STATION_VOICE_KEY = {
  'read': 'narration',
  'read_explore': 'narration',  // CRITICAL: Week data uses 'read_explore' as station key
  'new_word': 'vocabulary',
  'dictation': 'dictation',
  'shadowing': 'shadowing',  // Should use same voice as dictation
  'explore': 'narration',
  'word_power': 'vocabulary',
  'ask_ai': 'questions',
  'logic_lab': 'questions',
  'singapore_math': 'questions',  // BUG-21 FIX: W16+ sub-station (bar model problems)
  'social_quiz': 'questions',    // BUG-21 FIX: W16+ sub-station (geography/history MCQ)
  'mindmap_speaking': 'mindmap',
  'ai_tutor': null,  // Dynamic content, uses saved voice preference
  'gamehub': 'questions',
  'freetalk': null,  // Dynamic content
};

// --- LEGACY: TTS SERVER PROXY POOL (kept for backward compatibility) ---
// Note: This pool is no longer used for static content (now on R2).
// Only dynamic AI Tutor content uses Deepgram worker API (via useGoogleTTS).
const _primaryUrl = import.meta.env.VITE_EDGE_TTS_URL || 'https://binh3k-engquest3k.hf.space';
const TTS_POOL = [
  _primaryUrl,
  // 'https://binh3k-engquest3k-2.hf.space', // mirror #2 (add when available)
];
let _poolIndex = 0;
function nextTTSServer() {
  const url = TTS_POOL[_poolIndex % TTS_POOL.length];
  _poolIndex++;
  return url;
}

// --- GOOGLE CLOUD TTS (Primary for dynamic content) ---
// Route: App → Cloudflare Worker (api-tts.bkbacademy.vn) → R2 cache or Google TTS
// When TTS_WORKER_URL is set: API key stays in Worker Secret (never in browser bundle)
// When TTS_WORKER_URL is empty: falls back to direct Google TTS API (dev/testing mode)
const TTS_WORKER_URL = import.meta.env.VITE_TTS_WORKER_URL || '';
import { proxyGoogleTTS } from './aiProxy.js';
const GOOGLE_TTS_VOICE = 'en-US-Journey-F'; // fallback: en-US-Neural2-F

// Deduplication map: prevents identical Worker calls firing concurrently.
// Key = Worker URL (unique per text+voice+path), Value = in-flight Promise<Blob>.
const _pendingFetches = new Map();
const _pendingDirectFetches = new Map();
const _prefetchingWeeks = new Set();

/**
 * Chunk long text into sentence-aware blocks for parallel TTS synthesis
 */
function chunkTextForTTS(text, maxChunkLen = 100) {
  if (!text || text.length <= maxChunkLen) return [text];
  const sentences = text
    .replace(/([.!?])\s+/g, '$1|SPLIT|')
    .split('|SPLIT|')
    .map(s => s.trim())
    .filter(Boolean);
  if (sentences.length <= 1) return [text];

  const chunks = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + ' ' + sentence).length > maxChunkLen && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk = currentChunk ? `${currentChunk} ${sentence}` : sentence;
    }
  }
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks.length > 0 ? chunks : [text];
}

// ─── Worker Concurrency Limiter ──────────────────────────────────────────────
// Only 1 Deepgram call at a time — prevents bandwidth contention on slow networks.
// speak() (user action, highPriority=true) jumps to front of queue.
// prefetch() (background, highPriority=false) appends to back.
let _workerActive = 0;
const _workerQueue = []; // Array of resolve functions

function _acquireWorkerSlot(highPriority = false) {
  if (_workerActive === 0) {
    _workerActive = 1;
    return Promise.resolve();
  }
  return new Promise(resolve => {
    if (highPriority) {
      _workerQueue.unshift(resolve); // jump ahead of background prefetches
    } else {
      _workerQueue.push(resolve);
    }
  });
}

function _releaseWorkerSlot() {
  if (_workerQueue.length > 0) {
    const next = _workerQueue.shift();
    next(); // keep _workerActive = 1
  } else {
    _workerActive = 0;
  }
}

// Helper: Get standard system-wide voiceConfig (Google Cloud Direct TTS)
function getVoiceConfigForWeek(weekNumber) {
  return {
    narration: 'en-US-Journey-F',
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-F',
    shadowing: 'en-US-Journey-F',
    questions: 'en-US-Neural2-D',
    mindmap: 'en-US-Neural2-D'
  };
}

// Simple client-side rate limiter: min gap between requests per server (ms)
const RATE_LIMIT_MS = 300;
let _lastRequestTime = 0;
function shouldThrottle() {
  const now = Date.now();
  if (now - _lastRequestTime < RATE_LIMIT_MS) return true;
  _lastRequestTime = now;
  return false;
}

// Concurrency limiter: max 3 simultaneous HF Space requests (user gets priority via prefetch() yielding)
const MAX_CONCURRENT_HF = 3;
let _activeHFRequests = 0;
const _hfQueue = [];
function acquireHFSlot() {
  if (_activeHFRequests < MAX_CONCURRENT_HF) {
    _activeHFRequests++;
    return Promise.resolve();
  }
  return new Promise(resolve => _hfQueue.push(resolve));
}
function releaseHFSlot() {
  if (_hfQueue.length > 0) {
    const next = _hfQueue.shift();
    next();
  } else {
    _activeHFRequests--;
  }
}

// HF Space warm-state tracking (still used for non-instant calls)
let _serverWarm = false;
let _lastSuccessTime = 0;
const WARM_WINDOW_MS = 120000;
function isServerWarm() {
  return _serverWarm && (Date.now() - _lastSuccessTime < WARM_WINDOW_MS);
}

// Per-voice gain boost: compensates for perceived loudness difference between
// male (bass) and female voices at the same RMS level (Fletcher-Munson effect).
// Female voices are already loud — no boost needed.
// Values are linear gain multipliers applied via Web Audio API GainNode.
const VOICE_GAIN_BOOST = {
  // Aura-1 legacy
  'aura-helios-en':    1.45,
  'aura-zeus-en':      1.40,
  'aura-orion-en':     1.45,
  // Aura-2 male voices
  'aura-2-draco-en':   1.40,  // Baritone British
  'aura-2-apollo-en':  1.35,  // Casual American
  'aura-2-aries-en':   1.35,  // Energetic American
  'aura-2-arcas-en':   1.40,  // Smooth American
};

// Shared AudioContext (one per page is the Web Audio API recommendation)
let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx || _audioCtx.state === 'closed') {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (_audioCtx.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}

// CDN_WEEKS = weeks with manually pre-generated audio on R2.
// Emptied Apr 2026: Aura-2 voice rotation requires Worker-mediated cache invalidation.
// All weeks now go through the Cloudflare Worker (/tts?path=...&voice=...).
// Worker checks the stored model; if voice changed, regenerates and overwrites R2.
const CDN_WEEKS = [];  // All on-demand via Worker

// Static stations that can use CDN (pre-generated content)
const STATIC_STATIONS = ['read', 'new_word', 'dictation', 'shadowing', 'explore', 'word_power', 'ask_ai', 'mindmap_speaking', 'logic_lab', 'singapore_math', 'social_quiz'];

// Dynamic stations that need live generation (AI Tutor, Gamehub)
const DYNAMIC_STATIONS = ['ai_tutor', 'gamehub', 'freetalk', 'ai_story'];

export const VoiceService = {
  // Track the currently playing Audio instance so new requests can stop it
  _currentAudio: null,
  // Set by pauseTTS so the NEXT audio that gets created (e.g. from
  // playAll's advance-to-next-sentence) auto-pauses when its onplay
  // fires. Reset by resumeTTS or by playAudio on a fresh start.
  _shouldPauseNext: false,

  /**
   * Main function to make AI Tutor speak with multi-tier fallback
   * @param {string} text - Text to speak
   * @param {string} station - Station ID (read, new_word, dictation, ask_ai, shadowing, explore, word_power)
   * @param {string} audioUrl - Optional pre-known audio URL (from station data)
   * @param {number} weekNumber - Week number (for CDN lookup)
   * @param {string} mode - Mode ('advanced' or 'easy')
   * @param {boolean} instant - If true, play browser TTS immediately for AI Tutor (Deepgram worker will cache for next replay)
   * @param {object} voiceConfig - Optional voiceConfig object from week data (for on-demand generation)
   * @param {function} onPlayStart - Optional callback fired when audio actually begins emitting sound
   * @returns {Promise<void>}
   */
  async speak(text, station = 'read', audioUrl = null, weekNumber = null, mode = 'advanced', instant = false, voiceConfig = null, onPlayStart = null) {
    // Clean text for TTS (remove emojis, normalize abbreviations)
    const cleanedText = this.cleanTextForTTS(text);
    this._lastText = cleanedText;
    
    // Auto-detect weekNumber from URL or localStorage if not provided
    if (!weekNumber && typeof window !== 'undefined') {
      const match = window.location.pathname.match(/\/week\/(\d+)/i);
      if (match && match[1]) {
        weekNumber = parseInt(match[1], 10);
      } else {
        const storedWeek = localStorage.getItem('current_week');
        if (storedWeek) weekNumber = parseInt(storedWeek, 10);
      }
    }

    // Load voiceConfig if not provided and weekNumber is available
    if (!voiceConfig && weekNumber) {
      voiceConfig = await getVoiceConfigForWeek(weekNumber);
    }
    
    // Extract voice for this station (Google voiceConfig priority)
    const voiceKey = STATION_VOICE_KEY[station] || 'narration';
    const googleVoice = voiceConfig?.[voiceKey];
    const deepgramVoice =
      (voiceKey && weekNumber ? getAura2Voice(weekNumber, voiceKey) : null) ||
      (googleVoice ? (GOOGLE_TO_DEEPGRAM_VOICE[googleVoice] || googleVoice) : null);
    const cacheVoice = googleVoice || deepgramVoice;

    // Volume compensation: bass male voices are quieter than female voices
    this._speakGain = VOICE_GAIN_BOOST[deepgramVoice] || 1.0;
    
    // 🎵 TIER 0: Pre-generated Static Multi-Voice MP3 priority (if live on CDN/Storage)
    if (audioUrl) {
      const fullAudioPath = audioUrl.startsWith('http')
        ? audioUrl
        : (audioUrl.startsWith('/') ? audioUrl : `/audio/week${weekNumber || 33}/${audioUrl}`);
      try {
        const headRes = await fetch(fullAudioPath, { method: 'HEAD' }).catch(() => null);
        const contentType = headRes?.headers.get('content-type') || '';
        if (headRes && headRes.ok && (contentType.includes('audio') || contentType.includes('mpeg') || contentType.includes('octet-stream'))) {
          console.log(`[TTS] 🎧 Playing verified static MP3 from: ${fullAudioPath}`);
          await this.playAudio(fullAudioPath, false, true, onPlayStart);
          return;
        }
      } catch (staticErr) {
        console.warn(`[TTS] Static MP3 unavailable or failed (${fullAudioPath}), falling through to Multi-Voice Synthesis: ${staticErr.message}`);
      }
    }

    // 👥 MULTI-VOICE DIALOGUE SYNTHESIS & CACHE ENGINE
    // Detects scripts with multiple characters (Girl, Boy, Man, Woman, Nova, Teacher, Nurse, Headmaster)
    // Synthesizes distinct male & female Google Neural2 / Journey voices and stitches them seamlessly.
    const isDialogue = /(?:^|\n|\.\s+)(Girl|Boy|Man|Woman|Nova|Teacher|Nurse|Headmaster|Jake|Tom):\s*/i.test(text);
    if (isDialogue) {
      const dialogueCachedUrl = await TTSCache.get(cleanedText, station, 'multivoice_v2', audioUrl);
      if (dialogueCachedUrl) {
        console.log(`[TTS] 🎭 Multi-Voice Dialogue Cache Hit (0ms) [station: ${station}]`);
        return this.playAudio(dialogueCachedUrl, true, false, onPlayStart);
      }

      try {
        console.log(`[TTS] 🎭 Synthesizing Multi-Voice Dialogue on-the-fly (W${weekNumber || 33} / ${station})...`);
        const combinedBlob = await this.synthesizeMultiVoiceDialogue(text);
        if (combinedBlob) {
          await TTSCache.set(cleanedText, station, combinedBlob, 'multivoice_v2', audioUrl);
          const blobUrl = URL.createObjectURL(combinedBlob);
          return this.playAudio(blobUrl, true, false, onPlayStart);
        }
      } catch (dErr) {
        console.warn(`[TTS] ⚠️ Multi-Voice dialogue synthesis failed, falling back: ${dErr.message}`);
      }
    }

    // 🎓 GOOGLE CLOUD TTS DIRECT OVERRIDE (Enabled for all 36 weeks)
    const useGoogleDirect = true;
    if (useGoogleDirect) {
      const targetVoice = googleVoice || (station === 'narration' || station === 'read' || station === 'explore' || station === 'shadowing' ? 'en-US-Journey-F' : (station === 'mindmap_speaking' || station === 'questions' || station === 'logic_lab' ? 'en-US-Neural2-D' : 'en-US-Neural2-F'));
      
      // Check Client Cache first for Google Direct voice
      const googleCachedUrl = await TTSCache.get(cleanedText, station, targetVoice, audioUrl);
      if (googleCachedUrl) {
        console.log(`[TTS] 🎓 Google Cloud TTS Direct Cache Hit (0ms) [voice: ${targetVoice}] [station: ${station}]`);
        return this.playAudio(googleCachedUrl, true, false, onPlayStart);
      }

      try {
        console.log(`[TTS] 🎓 Google Cloud TTS Direct Generating (W${weekNumber || '?'} / ${station}) [Voice: ${targetVoice}]`);
        const audioBlob = await this.useGoogleTTSDirect(cleanedText, targetVoice);
        if (audioBlob) {
          await TTSCache.set(cleanedText, station, audioBlob, targetVoice, audioUrl);
          const blobUrl = URL.createObjectURL(audioBlob);
          return this.playAudio(blobUrl, true, false, onPlayStart);
        }
      } catch (gErr) {
        console.warn(`[TTS] ⚠️ Google Cloud TTS Direct failed, falling back: ${gErr.message}`);
      }
    }

    // 🔍 TIER 1: Check Client Cache for standard voices (Aura-2 / legacy)
    const cachedUrl = await TTSCache.get(cleanedText, station, cacheVoice, audioUrl);
    if (cachedUrl) {
      console.log(`[TTS] ✅ Cache hit (0ms) [voice: ${cacheVoice || 'default'}]`);
      return this.playAudio(cachedUrl, true, false, onPlayStart);
    }
    
    // Determine if this station uses static CDN or needs dynamic generation
    const isStaticStation = STATIC_STATIONS.includes(station);
    const isDynamicStation = DYNAMIC_STATIONS.includes(station);

    // 🚀 INSTANT MODE (DYNAMIC stations only):
    // Worker now uses Deepgram Aura — no cold start, always returns 200.
    //   R2 HIT  → ~100ms
    //   R2 MISS → Worker calls Deepgram → ~300-500ms
    // Budget 5s timeout (covers R2 check + Deepgram + Vietnam network).
    // Browser TTS fallback only if Worker truly fails (very rare).
    if (instant && isDynamicStation) {
      let browserPlayed = false;

      // Extract voice from voiceConfig
      const voiceKey = STATION_VOICE_KEY[station];
      const googleVoice = voiceConfig?.[voiceKey];
      const deepgramVoice = googleVoice ? GOOGLE_TO_DEEPGRAM_VOICE[googleVoice] : null;

      // ── Phase 1: Worker (Deepgram or R2 HIT) ─────────────────────────────
      const workerPromise = this.useGoogleTTS(cleanedText, station, deepgramVoice, audioUrl, true /* highPriority */);
      let audioBlob = null;
      let workerErr = null;

      try {
        audioBlob = await Promise.race([
          workerPromise,
          new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 1500))
        ]);
      } catch (err) {
        workerErr = err;
      }

      if (audioBlob) {
        await TTSCache.set(cleanedText, station, audioBlob, deepgramVoice || cacheVoice, audioUrl);
        const blobUrl = URL.createObjectURL(audioBlob);
        console.log(`[TTS] ✅ Worker won (${(audioBlob.size / 1024).toFixed(1)}KB) [voice: ${deepgramVoice || cacheVoice || 'default'}]`);
        return this.playAudio(blobUrl, true);
      }

      // ── Fallback: Worker failed or timed out ─────────────────────────────
      // Deepgram is normally <500ms — reaching here means network error.
      // Cache the late response silently for next replay.
      browserPlayed = true;
      const reason = workerErr?.message === 'timeout' ? 'timeout (5s)' : 'error';
      console.warn(`[TTS] ⚠ Worker ${reason} – browser TTS fallback`);
      this.webFallback(cleanedText);

      workerPromise
        .then(async (blob) => {
          if (blob) {
            await TTSCache.set(cleanedText, station, blob, deepgramVoice || cacheVoice, audioUrl);
            console.log(`[TTS] 💾 Late Deepgram cached for next replay [voice: ${deepgramVoice || cacheVoice || 'default'}]`);
          }
        })
        .catch(() => {});

      return;
    }
    
    // 🌐 TIER 2: Try R2 CDN (all static stations with audioUrl)
    // All static content should be pre-generated with Deepgram and uploaded to R2
    // If R2 miss, falls back to on-demand generation via Worker
    if (isStaticStation && audioUrl && weekNumber && CDN_WEEKS.includes(weekNumber)) {
      try {
        console.log(`[TTS] Trying R2 CDN for week ${weekNumber} ${mode}...`);
        await this.useCDN(cleanedText, station, audioUrl, weekNumber, mode, voiceConfig);
        console.log(`[TTS] ✅ R2 CDN success (~100ms)`);
        return;
      } catch (err) {
        console.warn(`[TTS] R2 CDN miss: ${err.message}`);
        // On R2 miss: generate on-demand with correct voice for this station
        if (voiceConfig && TTS_WORKER_URL) {
          try {
            // Voice already extracted above for cache check
            console.log(`[TTS] 🎤 Generating on-demand: ${station} with ${deepgramVoice || 'default'}`);
            
            // Pass audioUrl so Worker saves to exact R2 path (not hash-based)
            const audioBlob = await this.useGoogleTTS(cleanedText, station, deepgramVoice, audioUrl);
            await TTSCache.set(cleanedText, station, audioBlob, deepgramVoice || cacheVoice, audioUrl);
            const blobUrl = URL.createObjectURL(audioBlob);
            return this.playAudio(blobUrl, true);
          } catch (genErr) {
            console.warn(`[TTS] On-demand generation failed: ${genErr.message}`);
          }
        }
        // Continue to fallback below
      }
    }

    // 🎙️ TIER 3: Deepgram Worker (first-play ~20-30s; <500ms R2 hit after)
    // On timeout: late-play handler keeps waiting — audio plays cleanly when ready.
    // Browser TTS only fires for genuine HTTP/network errors, NOT slow generation.
    try {
      const svc = this;
      const fetchPromise = this.useGoogleTTS(cleanedText, station, deepgramVoice, audioUrl, true /* highPriority */);
      let audioBlob = null;
      try {
        audioBlob = await Promise.race([
          fetchPromise,
          new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 1500))
        ]);
      } catch (raceErr) {
        if (raceErr.message === 'timeout') {
          console.warn('[TTS] ⚡ Worker taking >1.5s — starting instant browser TTS while caching Deepgram audio in background...');
          // Cache Deepgram blob in background when it finishes so replay is instant 0ms
          fetchPromise.then(async (blob) => {
            if (!blob) return;
            await TTSCache.set(cleanedText, station, blob, deepgramVoice || cacheVoice, audioUrl);
            console.log('[TTS] 💾 Background Deepgram audio cached successfully!');
          }).catch(() => {});
          // Fall through to browser TTS below for 0s instant speech!
          throw new Error('instant_fallback');
        }
        throw raceErr;
      }
      if (audioBlob) {
        await TTSCache.set(cleanedText, station, audioBlob, deepgramVoice || cacheVoice, audioUrl);
        const blobUrl = URL.createObjectURL(audioBlob);
        console.log(`[TTS] ✅ Deepgram worker (static fallback) [voice: ${deepgramVoice || cacheVoice || 'default'}]`);
        return this.playAudio(blobUrl, true);
      }
    } catch (err) {
      console.warn(`[TTS] Deepgram worker failed: ${err.message}`);
    }

    // 🔊 TIER 4: Browser TTS (last resort)
    console.warn('[TTS] ⚠️ Using browser TTS as last resort');
    this.webFallback(cleanedText);
  },

  /**
   * Pre-cache TTS audio WITHOUT playing (for background prefetch)
   * Now generates audio via Deepgram Worker with proper path & voice
   */
  async prefetch(text, station = 'read', audioPath = null, weekNumber = null, mode = 'advanced', voice = null) {
    const cleanedText = this.cleanTextForTTS(text);

    // 🎓 GOOGLE CLOUD TTS DIRECT PREFETCH OVERRIDE (Enabled for all 36 weeks)
    const useGoogleDirect = true;
    if (useGoogleDirect) {
      const voiceConfig = await getVoiceConfigForWeek(weekNumber);
      const voiceKey = STATION_VOICE_KEY[station];
      const targetVoice = voice || voiceConfig?.[voiceKey] || (station === 'narration' || station === 'read' || station === 'explore' || station === 'shadowing' ? 'en-US-Journey-F' : 'en-US-Neural2-F');
      
      const cached = await TTSCache.get(cleanedText, station, targetVoice, audioPath);
      if (cached) return;
      
      try {
        console.log(`[Prefetch] 🎓 Google Cloud TTS Direct Prefetching (W${weekNumber || '?'} / ${station}) [Voice: ${targetVoice}]`);
        const blob = await this.useGoogleTTSDirect(cleanedText, targetVoice);
        if (blob) {
          await TTSCache.set(cleanedText, station, blob, targetVoice, audioPath);
          console.log(`[Prefetch] 🎓 Google Cloud TTS Direct Cached: ${cleanedText.substring(0, 30)}... [Voice: ${targetVoice}]`);
        }
      } catch (err) {
        console.warn(`[Prefetch] Google Cloud TTS Direct prefetch failed: ${err.message}`);
      }
      return;
    }

    // If voice not provided, auto-detect: Aura-2 rotation first, then legacy voiceConfig
    if (!voice && weekNumber) {
      const voiceKey = STATION_VOICE_KEY[station];
      const aura2 = voiceKey ? getAura2Voice(weekNumber, voiceKey) : null;
      if (aura2) {
        voice = aura2;
        console.log(`[Prefetch] 🎯 Aura-2 rotation: ${voice} (${voiceKey}, W${weekNumber})`);
      } else {
        const voiceConfig = await getVoiceConfigForWeek(weekNumber);
        if (voiceConfig && voiceKey) {
          const googleVoice = voiceConfig[voiceKey];
          if (googleVoice) {
            voice = GOOGLE_TO_DEEPGRAM_VOICE[googleVoice] || googleVoice;
            console.log(`[Prefetch] 🎯 Legacy voice: ${voice} (from ${voiceKey})`);
          }
        }
      }
    }

    let finalVoice = voice;

    // Already cached? Nothing to do (check with voice-specific cache key)
    const cached = await TTSCache.get(cleanedText, station, finalVoice, audioPath);
    if (cached) return;

    const isStaticStation = STATIC_STATIONS.includes(station);

    // Try R2 CDN first (only for static stations with pre-generated audio)
    if (isStaticStation && audioPath && weekNumber && CDN_WEEKS.includes(weekNumber)) {
      try {
        const cleanPath = audioPath.startsWith('/') ? audioPath.slice(1) : audioPath;
        const cdnUrl = `${CDN_URL}/${cleanPath}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const response = await fetch(cdnUrl, { signal: controller.signal, cache: 'force-cache', headers: { 'Accept': 'audio/mpeg' } });
        clearTimeout(timeoutId);
        if (response.ok) {
          const blob = await response.blob();
          await TTSCache.set(cleanedText, station, blob, finalVoice, audioPath);
          return;
        }
      } catch {}
    }

    // Generate via Deepgram Worker, using audioPath as the R2 storage key.
    // For W16+ (on-demand): audioPath is a structured path like /audio/week16/mindmap_stem_1.mp3
    // — Worker will save there so future callers get an R2 hit.
    // Historical note: safePath=null was used during W16 content migration to avoid stale R2 hits.
    // That transition is complete; always pass audioPath for structured caching.
    const safePath = audioPath;
    try {
      const blob = await this.useGoogleTTSDirect(cleanedText, finalVoice);
      if (blob) {
        await TTSCache.set(cleanedText, station, blob, finalVoice, safePath);
        console.log(`[Prefetch] 💾 Google Direct Generated & cached (${(blob.size/1024).toFixed(1)}KB): ${cleanedText.substring(0, 30)}... [voice: ${finalVoice}]`);
      }
    } catch (error) {
      console.warn(`[Prefetch] ⚠️ Failed to generate:`, error.message);
      // Prefetch is non-critical, don't throw
    }
  },

  /**
   * Pre-generate ALL TTS audio for an entire week across all stations
   * Triggered on first opening a week page so all audio is pre-cached in 0ms IndexedDB!
   */
  async prefetchEntireWeek(weekNumber = 36, mode = 'advanced') {
    if (!weekNumber) return;
    const weekKey = `w${weekNumber}_${mode}`;
    if (_prefetchingWeeks.has(weekKey)) return;
    _prefetchingWeeks.add(weekKey);

    console.log(`[Prefetch] 🚀 Starting Full Week ${weekNumber} (${mode}) Google Cloud TTS Pre-generation...`);

    try {
      const isEasy = mode === 'easy';
      const weekData = await loadWeekData(weekNumber, isEasy);
      const voiceConfig = weekData?.voiceConfig || {};

      if (!weekData) return;

      const itemsToPrefetch = [];

      // ⚡ Priority 1: Synthesize read.js narrative FIRST with Google Direct TTS & phonetic rules (<0.5s)!
      const readItems = [];
      if (weekData.stations?.read_explore) {
        const re = weekData.stations.read_explore;
        if (re.read_stem?.narrative) readItems.push({ text: re.read_stem.narrative.replace(/\*\*/g, ''), station: 'read', voice: voiceConfig?.narration || 'en-US-Journey-F', audioPath: null });
        if (re.read_social?.narrative) readItems.push({ text: re.read_social.narrative.replace(/\*\*/g, ''), station: 'read', voice: voiceConfig?.narration || 'en-US-Journey-F', audioPath: null });
        if (re.content_en) readItems.push({ text: re.content_en.replace(/\*\*/g, ''), station: 'read', voice: voiceConfig?.narration || 'en-US-Journey-F', audioPath: null });
      }
      if (weekData.stations?.explore) {
        const ex = weekData.stations.explore;
        if (ex.content_en) readItems.push({ text: ex.content_en.replace(/\*\*/g, ''), station: 'explore', voice: voiceConfig?.narration || 'en-US-Journey-F', audioPath: null });
      }

      if (readItems.length > 0) {
        console.log(`[Prefetch] 🔥 Synthesizing read.js narrative FIRST (${readItems.length} items)...`);
        await Promise.all(readItems.map(item => this.prefetch(item.text, item.station, item.audioPath, weekNumber, mode, item.voice).catch(() => {})));
        console.log(`[Prefetch] ⚡ read.js narrative 100% pre-cached!`);
      }

      // Vocabulary
      const vocabList = Array.isArray(weekData.stations?.new_words)
        ? weekData.stations.new_words
        : (weekData.stations?.new_words?.vocab || []);
      vocabList.forEach(v => {
        if (v.word) itemsToPrefetch.push({ text: v.word, station: 'new_word', voice: voiceConfig?.vocabulary || 'en-US-Neural2-F', audioPath: v.audio_word });
        if (v.definition_en) itemsToPrefetch.push({ text: v.definition_en, station: 'new_word', voice: voiceConfig?.vocabulary || 'en-US-Neural2-F' });
        if (v.example_sentence) itemsToPrefetch.push({ text: v.example_sentence, station: 'new_word', voice: voiceConfig?.vocabulary || 'en-US-Neural2-F' });
      });

      // Word Power
      const wordPowerList = Array.isArray(weekData.stations?.word_power)
        ? weekData.stations.word_power
        : (weekData.stations?.word_power?.phrases || []);
      wordPowerList.forEach(p => {
        if (p.phrase || p.word) itemsToPrefetch.push({ text: p.phrase || p.word, station: 'word_power', voice: voiceConfig?.vocabulary || 'en-US-Neural2-F' });
        if (p.example) itemsToPrefetch.push({ text: p.example, station: 'word_power', voice: voiceConfig?.vocabulary || 'en-US-Neural2-F' });
      });

      // Shadowing
      const shadowingList = Array.isArray(weekData.stations?.shadowing)
        ? weekData.stations.shadowing
        : (weekData.stations?.shadowing?.script || weekData.stations?.shadowing?.sentences || []);
      shadowingList.forEach(s => {
        const txt = s.text || s.text_en;
        if (txt) itemsToPrefetch.push({ text: txt.replace(/\*\*/g, ''), station: 'shadowing', voice: voiceConfig?.shadowing || 'en-US-Journey-F', audioPath: s.audio_url });
      });

      // Dictation
      const dictationList = weekData.stations?.dictation?.sentences || weekData.stations?.dictation?.script || weekData.stations?.dictation?.items || [];
      dictationList.forEach(s => {
        const txt = s.text_en || s.text;
        if (txt) itemsToPrefetch.push({ text: txt.replace(/\*\*/g, ''), station: 'dictation', voice: voiceConfig?.dictation || 'en-US-Neural2-F', audioPath: s.audio_url });
      });

      // AI Tutor Opening Narratives & Prompts (Matching StoryMissionTab en-US-Journey-F voice)
      const realData = weekData.weekRealData || weekData;
      const missions = realData.story_missions || realData.missions || weekData.story_missions || [];
      missions.forEach(m => {
        const txt = m.opening_narrative || m.nova_greeting;
        if (txt) itemsToPrefetch.push({ text: txt.replace(/\*\*/g, ''), station: 'story', voice: 'en-US-Journey-F' });
      });
      const sparkTalk = realData.spark_talk || weekData.spark_talk || [];
      sparkTalk.forEach(s => {
        const txt = s.seed_question || s.text_en;
        if (txt) itemsToPrefetch.push({ text: txt.replace(/\*\*/g, ''), station: 'ask_ai', voice: voiceConfig?.questions || 'en-US-Neural2-D' });
      });

      // Ask AI prompts (Situations)
      if (weekData.stations?.ask_ai?.prompts) {
        weekData.stations.ask_ai.prompts.forEach(p => {
          const txt = p.nova_says || p.context_en;
          if (txt) itemsToPrefetch.push({ text: txt.replace(/\*\*/g, ''), station: 'ask_ai', voice: voiceConfig?.questions || 'en-US-Neural2-D' });
        });
      }

      // Mindmap
      if (weekData.stations?.mindmap?.prompts) {
        weekData.stations.mindmap.prompts.forEach(mp => {
          if (mp.question) itemsToPrefetch.push({ text: mp.question, station: 'mindmap_speaking', voice: voiceConfig?.mindmap || 'en-US-Neural2-D' });
        });
      }

      // Cambridge Listening Hub Multi-Voice Dialogues
      const lh = weekData.stations?.listening_hub || weekData.listeningHubData || weekData;
      if (lh.listening_p1?.passage_audio_script) {
        itemsToPrefetch.push({ text: lh.listening_p1.passage_audio_script, station: 'questions', voice: 'multivoice_v2', audioPath: lh.listening_p1.audio_url });
      }
      if (lh.listening_p3?.passage_audio_script) {
        itemsToPrefetch.push({ text: lh.listening_p3.passage_audio_script, station: 'questions', voice: 'multivoice_v2', audioPath: lh.listening_p3.audio_url });
      }
      if (Array.isArray(lh.listening_p3?.items)) {
        lh.listening_p3.items.forEach(it => {
          if (it.audio_text) itemsToPrefetch.push({ text: it.audio_text, station: 'questions', voice: 'multivoice_v2', audioPath: it.audio_url });
        });
      }
      if (Array.isArray(lh.listening_p4_questions)) {
        lh.listening_p4_questions.forEach(q => {
          if (q.audio_script) itemsToPrefetch.push({ text: q.audio_script, station: 'questions', voice: 'multivoice_v2', audioPath: q.audio_url });
        });
      }
      if (lh.listening_p5?.audio_script) {
        itemsToPrefetch.push({ text: lh.listening_p5.audio_script, station: 'questions', voice: 'multivoice_v2', audioPath: lh.listening_p5.audio_url });
      }

      console.log(`[Prefetch] 📦 Week ${weekNumber} queue created (${itemsToPrefetch.length} items). Synthesizing Google Direct in background...`);

      // Throttled batch synthesis (2 items per batch + 100ms breather to prevent HTTP 429 rate limits)
      const BATCH_SIZE = 2;
      for (let i = 0; i < itemsToPrefetch.length; i += BATCH_SIZE) {
        const batch = itemsToPrefetch.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(item =>
          this.prefetch(item.text, item.station, item.audioPath, weekNumber, mode, item.voice).catch(() => {})
        ));
        await new Promise(r => setTimeout(r, 100));
      }

      console.log(`[Prefetch] ✅ Week ${weekNumber} Full Google Direct TTS Pre-generation Complete!`);
    } catch (err) {
      console.warn(`[Prefetch] Failed week ${weekNumber} prefetch:`, err.message);
    } finally {
      _prefetchingWeeks.delete(weekKey);
    }
  },

  /**
   * Clean text for TTS - remove emojis, normalize abbreviations
   * @param {string} text - Raw text from AI
   * @returns {string} - Cleaned text ready for TTS
   */
  cleanTextForTTS(text) {
    let cleaned = text;

    // 0. Strip markdown bold markers (**word**) — must come first to avoid TTS reading "star star"
    cleaned = cleaned.replace(/\*\*/g, '');

    // 1. Replace common abbreviations BEFORE emoji removal
    cleaned = cleaned.replace(/\bMs\.\s+Nova\b/gi, 'Miss Nova');
    cleaned = cleaned.replace(/\bMs\.\b/gi, 'Miss');
    cleaned = cleaned.replace(/\bMr\.\b/gi, 'Mister');
    cleaned = cleaned.replace(/\bDr\.\b/gi, 'Doctor');
    
    // 1.5. Normalize slashes and dashes for natural speech
    // "Yes/No" → "Yes or No"
    cleaned = cleaned.replace(/\bYes\s*\/\s*No\b/gi, 'Yes or No');
    cleaned = cleaned.replace(/([A-Za-z]+)\s*\/\s*([A-Za-z]+)/g, '$1 or $2');
    
    // "20-30 meters" → "20 to 30 meters" (range dash)
    cleaned = cleaned.replace(/(\d+)\s*-\s*(\d+)/g, '$1 to $2');
    
    // 2. Remove ALL emojis and special characters (comprehensive regex)
    // This catches: emoticons, symbols, pictographs, transport, flags, etc.
    cleaned = cleaned.replace(/[\u{1F000}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu, '');
    
    // 3. Remove extra symbols that TTS might mispronounce
    cleaned = cleaned.replace(/[⭐✨🎯💬🔊👋👇🙋‍♀️🎉🌟]/g, '');
    
    // 4. Normalize punctuation (multiple spaces, etc.)
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    // 5. Remove underscores (mindmap stem placeholders) - use a comma for a
    //    natural pause so TTS reads "I am, a picture." not "I am blank a picture."
    cleaned = cleaned.replace(/_{2,}/g, ','); // ___ → natural pause via comma
    cleaned = cleaned.replace(/_/g, ' ');     // Single _ → space
    // Collapse double commas or comma at end that may arise
    cleaned = cleaned.replace(/,\s*,/g, ',');
    cleaned = cleaned.replace(/,\s*\./g, '.');
    
    // 6. Fix common TTS pronunciation issues
    cleaned = cleaned.replace(/\bI'm\b/g, 'I am');
    cleaned = cleaned.replace(/\byou're\b/gi, 'you are');
    cleaned = cleaned.replace(/\bwe're\b/gi, 'we are');
    
    // 7. Fix homograph: "live" (verb /lɪv/) vs "live" (adj /laɪv/)
    //    "I live with" → should be /lɪv/ not /laɪv/
    //    Context: "live with", "live in", "I live", "you live", "we live", "they live"

    // 8. Vietnamese Proper Nouns & Cultural Terms Phonetic Normalization for English TTS
    const VI_PROPER_NOUNS = [
      [/\bHoi\s*An\b/gi, 'Hoyahn'],
      [/\bHa\s*Noi\b/gi, 'Hahnoy'],
      [/\bDa\s*Nang\b/gi, 'Danang'],
      [/\bSaigon\b/gi, 'Saigon'],
      [/\bHo\s+Chi\s+Minh\b/gi, 'Ho Chi Minh'],
      [/\bAo\s*Dai\b/gi, 'Owdye'],
      [/\bBanh\s*Mi\b/gi, 'Bahnmee'],
      [/\bPho\b/gi, 'Fuh']
    ];
    for (const [regex, phonetic] of VI_PROPER_NOUNS) {
      cleaned = cleaned.replace(regex, phonetic);
    }
    cleaned = cleaned.replace(/\blive with\b/gi, 'liv with');
    cleaned = cleaned.replace(/\blive in\b/gi, 'liv in');
    
    // 8. Enforce terminal punctuation for single words / short terms (<= 3 words)
    //    Deepgram Aura-2 / Neural TTS requires terminal punctuation ('.') to trigger sentence-final
    //    acoustic boundaries, ensuring 100% full plosive articulation for final consonants (/t/, /d/, /k/, /p/)
    //    and suffix schwas (/ər/ in explorer, /ənt/ in merchant, /ənt/ in went, /aʊnd/ in found).
    const words = cleaned.split(/\s+/);
    if (words.length <= 3 && !/[.!?]$/.test(cleaned)) {
      cleaned += '.';
    }

    return cleaned;
  },

  /**
   * TIER 2: Load pre-generated Deepgram audio from R2 CDN
   * If R2 miss, generates on-demand via Worker and caches to R2
   * @param {string} text - Text to speak
   * @param {string} station - Station ID
   * @param {string} audioUrl - Pre-known URL from station data (e.g., /audio/week8_easy/dictation_1.mp3)
   * @param {number} weekNumber - Week number
   * @param {string} mode - Mode ('advanced' or 'easy')
   * @param {object} voiceConfig - Optional voiceConfig from week data
   * @returns {Promise<void>}
   */
  async useCDN(text, station, audioUrl, weekNumber, mode, voiceConfig = null) {
    // Extract voice: Aura-2 rotation → legacy voiceConfig
    const voiceKey = STATION_VOICE_KEY[station];
    const googleVoice = voiceConfig?.[voiceKey];
    const deepgramVoice =
      (voiceKey && weekNumber ? getAura2Voice(weekNumber, voiceKey) : null) ||
      (googleVoice ? (GOOGLE_TO_DEEPGRAM_VOICE[googleVoice] || googleVoice) : null);
    const cacheVoice = deepgramVoice || googleVoice;
    
    // If audio URL is provided by station data, use it directly
    let cdnUrl;
    
    if (audioUrl) {
      // Station data provides specific file (e.g., /audio/week1/shadowing_1.mp3)
      // Convert to CDN URL — strip only the leading slash, keep 'audio/' folder prefix
      const cleanPath = audioUrl.startsWith('/') ? audioUrl.slice(1) : audioUrl;
      cdnUrl = `${CDN_URL}/${cleanPath}`;
    } else {
      // Generate CDN URL based on text hash (for dynamic lookup)
      const textHash = this.hashText(text);
      const weekFolder = mode === 'easy' ? `week${weekNumber}_easy` : `week${weekNumber}`;
      cdnUrl = `${CDN_URL}/${weekFolder}/${station}_${textHash}.mp3`;
    }
    
    // Fetch from CDN with 5-second timeout (CDN should be fast)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    try {
      const response = await fetch(cdnUrl, {
        signal: controller.signal,
        cache: 'no-cache',  // Always revalidate — avoids stale audio after R2 re-uploads
        headers: { 'Accept': 'audio/mpeg' }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        // R2 miss - generate on-demand if voiceConfig available
        if (response.status === 404 && voiceConfig && TTS_WORKER_URL) {
          console.log(`[TTS] R2 miss (404) - generating on-demand...`);
          return await this.generateOnDemand(text, station, audioUrl, voiceConfig);
        }
        throw new Error(`CDN returned ${response.status}`);
      }
      
      // Got audio from CDN!
      const audioBlob = await response.blob();
      
      // Cache locally for instant replay (with voice-specific key)
      await TTSCache.set(text, station, audioBlob, cacheVoice, audioUrl);

      // Play immediately
      const blobUrl = URL.createObjectURL(audioBlob);
      return this.playAudio(blobUrl, true);

    } catch (error) {
      clearTimeout(timeoutId);
      // If network error and voiceConfig available, try on-demand generation
      if (error.name === 'TypeError' && voiceConfig && TTS_WORKER_URL) {
        console.warn(`[TTS] CDN network error - trying on-demand generation...`);
        return await this.generateOnDemand(text, station, audioUrl, voiceConfig);
      }
      throw new Error(`CDN fetch failed: ${error.message}`);
    }
  },

  /**
   * Generate audio on-demand via Worker when R2 CDN misses
   * Worker will generate + save to R2 for next request
   * @param {string} text - Text to speak
   * @param {string} station - Station ID  
   * @param {string} audioPath - R2 path (e.g., /audio/week14/dictation_7.mp3)
   * @param {object} voiceConfig - voiceConfig from week data
   * @returns {Promise<void>}
   */
  async generateOnDemand(text, station, audioPath, voiceConfig) {
    // Determine which voice to use based on station
    const voiceKey = STATION_VOICE_KEY[station];
    if (!voiceKey) {
      throw new Error(`No voice mapping for station: ${station}`);
    }

    // Get Google voice ID from voiceConfig
    const googleVoice = voiceConfig[voiceKey];
    if (!googleVoice) {
      throw new Error(`No voice in voiceConfig for key: ${voiceKey}`);
    }

    // Convert Google voice to Deepgram voice
    const deepgramVoice = GOOGLE_TO_DEEPGRAM_VOICE[googleVoice];
    if (!deepgramVoice) {
      console.warn(`[TTS] No Deepgram mapping for ${googleVoice}, using default`);
    }

    // Clean audio path (remove leading slash for R2 path)
    const cleanPath = audioPath.startsWith('/') ? audioPath.slice(1) : audioPath;

    // Compute content hash for stale-detection
    const contentHash = await this.computeContentHash(text);

    // Call Worker with path + voice + vh for on-demand generation
    let workerUrl = `${TTS_WORKER_URL}/tts?text=${encodeURIComponent(text)}&station=${encodeURIComponent(station)}&vh=${encodeURIComponent(contentHash)}`;
    workerUrl += `&path=${encodeURIComponent(cleanPath)}`;
    if (deepgramVoice) {
      workerUrl += `&voice=${encodeURIComponent(deepgramVoice)}`;
    }
    
    console.log(`[TTS] 🎤 Generating on-demand: ${station} with ${deepgramVoice || 'default voice'}`);
    
    const res = await fetch(workerUrl);
    if (!res.ok) {
      throw new Error(`Worker returned ${res.status}`);
    }
    
    const audioBlob = await res.blob();
    const cacheHit = res.headers.get('X-Cache') === 'HIT';
    const source = res.headers.get('X-TTS-Source') || 'deepgram';
    
    console.log(`[TTS] ✅ ${cacheHit ? '☁️ R2' : '🎤 Generated'} (${(audioBlob.size / 1024).toFixed(1)}KB) - now cached to R2: ${cleanPath}`);
    
    // Cache locally for instant replay (with voice-specific key)
    await TTSCache.set(text, station, audioBlob, deepgramVoice, audioPath);

    // Play immediately
    const blobUrl = URL.createObjectURL(audioBlob);
    return this.playAudio(blobUrl, true);
  },

  /**
   * TIER 1.5 (AI Tutor only): Deepgram Aura-2 via Worker API — ~300-500ms
   * 
   * Used exclusively for dynamic AI Tutor content that needs real-time generation.
   * Flow:
   *   1. Cloudflare Worker (VITE_TTS_WORKER_URL set) → R2 cache check → Deepgram Aura-2
   *      API key hidden in Worker Secret, never in browser bundle.
   *   2. Fallback: Direct proxy if worker unavailable (dev/testing mode).
   * 
   * Returns audio Blob.
   * 
   * @param {string} text - Text to speak
   * @param {string} station - Station ID for cache key
   * @param {string|null} voice - Optional Deepgram voice (e.g., 'aura-asteria-en')
   * @param {string|null} audioPath - Optional R2 path for static content (e.g., '/audio/week14/shadowing_1.mp3')
   */
  async useGoogleTTS(text, station = 'ai_tutor', voice = null, audioPath = null, highPriority = false) {
    // ── Route 1: Via Cloudflare Worker (Deepgram + R2 cache) ─────────────────
    if (TTS_WORKER_URL) {
      // Use provided voice, or get from localStorage (AI Tutor preference)
      const voiceToUse = voice || localStorage.getItem('tts_voice') || '';

      // Compute content hash for stale-detection (vh param).
      // Append version '_v16' to force Worker R2 to invalidate old un-punctuated audio blobs
      const contentHash = await this.computeContentHash(text + '_v16');
      let workerUrl = `${TTS_WORKER_URL}/tts?text=${encodeURIComponent(text)}&station=${encodeURIComponent(station)}&vh=${encodeURIComponent(contentHash)}&v=16`;
      if (voiceToUse) workerUrl += `&voice=${encodeURIComponent(voiceToUse)}`;
      
      // Pass audioPath for static content (so Worker saves to exact R2 path)
      if (audioPath) {
        const cleanPath = audioPath.startsWith('/') ? audioPath.slice(1) : audioPath;
        workerUrl += `&path=${encodeURIComponent(cleanPath)}`;
        console.log(`[TTS] 🔧 Worker Call:`, {
          station,
          voice: voiceToUse,
          path: cleanPath,
          textPreview: text.substring(0, 50) + '...'
        });
      } else {
        console.warn(`[TTS] ⚠️ NO audioPath provided! Will save to dynamic/`);
      }
      
      // Content-based dedup key: same text+voice = same audio regardless of R2 path/station.
      // Prevents speak() and prefetch() launching duplicate Deepgram calls when they use
      // different station/path params for identical content.
      const dedupKey = `${text}::${voiceToUse}`;

      // ── highPriority (speak): join in-flight if already generating ────────
      if (highPriority) {
        if (_pendingFetches.has(dedupKey)) {
          console.log(`[TTS] ♻️ speak() joining in-flight prefetch (same content)`);
          return _pendingFetches.get(dedupKey);
        }
        // Nothing in flight — fire directly (no queue, fresh timeout window)
        const res = await fetch(workerUrl);
        if (!res.ok) throw new Error(`TTS Worker HTTP ${res.status}`);
        const blob = await res.blob();
        const cacheHit = res.headers.get('X-Cache') === 'HIT';
        const ttsSource = res.headers.get('X-TTS-Source') || 'deepgram';
        console.log(`[TTS] ✅ Worker ${cacheHit ? '☁️ R2' : '🎤 Deepgram'} ${ttsSource} (${(blob.size / 1024).toFixed(1)}KB)`);
        return blob;
      }

      // ── background prefetch: dedup + concurrency queue ───────────────────
      if (_pendingFetches.has(dedupKey)) {
        console.log(`[TTS] ♻️ Dedup – sharing in-flight request (same content)`);
        return _pendingFetches.get(dedupKey);
      }

      // Concurrency limit: 1 background prefetch at a time (speak bypassed above)
      await _acquireWorkerSlot(false);

      const fetchPromise = fetch(workerUrl)
        .then(async (res) => {
          if (!res.ok) throw new Error(`TTS Worker HTTP ${res.status}`);
          const blob = await res.blob();
          const cacheHit = res.headers.get('X-Cache') === 'HIT';
          const ttsSource = res.headers.get('X-TTS-Source') || 'hf-space';
          const sourceLabel = cacheHit ? `☁️ R2 ${ttsSource}` : `🎤 Deepgram ${ttsSource}`;
          console.log(`[TTS] ✅ Worker ${sourceLabel} (${(blob.size / 1024).toFixed(1)}KB)`);
          return blob;
        })
        .finally(() => {
          _pendingFetches.delete(dedupKey);
          _releaseWorkerSlot();
        });

      _pendingFetches.set(dedupKey, fetchPromise);
      return fetchPromise;
    }

    // ── Route 2: Backend proxy fallback (dev/testing mode) ──
    return await proxyGoogleTTS(text, { voice: GOOGLE_TTS_VOICE, languageCode: 'en-US' });
  },

  /**
   * Direct Google Cloud TTS API call using VITE_GOOGLE_TTS_API_KEY
   * (Used for Week 36 testing with en-US-Journey-F & en-US-Neural2-F)
   */
  async useGoogleTTSDirect(text, voice = 'en-US-Journey-F') {
    const apiKey = import.meta.env.VITE_GOOGLE_TTS_API_KEY || import.meta.env.GOOGLE_TTS_API_KEY;
    if (!apiKey) throw new Error('Missing VITE_GOOGLE_TTS_API_KEY in environment');

    // Normalize invalid voice names for Google Cloud TTS (e.g. Neural2-B -> Neural2-D)
    let safeVoice = voice || 'en-US-Journey-F';
    if (safeVoice === 'en-US-Neural2-B') safeVoice = 'en-US-Neural2-D';

    const dedupKey = `${safeVoice}::${text}`;
    if (_pendingDirectFetches.has(dedupKey)) {
      console.log(`[TTS] ♻️ Joining in-flight Google Direct TTS request for: ${text.substring(0, 30)}...`);
      return _pendingDirectFetches.get(dedupKey);
    }

    const fetchPromise = (async () => {
      const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text },
          voice: { languageCode: 'en-US', name: safeVoice },
          audioConfig: { audioEncoding: 'MP3' }
        })
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(`Google Cloud TTS API ${res.status}: ${errText}`);
      }

      const data = await res.json();
      if (!data.audioContent) throw new Error('No audioContent returned by Google Cloud TTS');

      const binaryString = window.atob(data.audioContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return new Blob([bytes.buffer], { type: 'audio/mp3' });
    })();

    _pendingDirectFetches.set(dedupKey, fetchPromise);
    try {
      return await fetchPromise;
    } finally {
      _pendingDirectFetches.delete(dedupKey);
    }
  },

  /**
   * Synthesize multi-speaker dialogue scripts by splitting character lines,
   * synthesizing each with assigned male/female Google Neural2/Journey voices,
   * and concatenating into a seamless single audio blob via Web Audio API.
   */
  async synthesizeMultiVoiceDialogue(rawText) {
    if (!rawText) return null;

    // Pattern to detect speaker markers: (Nova|Girl|Boy|Man|Woman|Teacher|Nurse|Headmaster|Jake|Tom):
    const speakerPattern = /(Nova|Girl|Boy|Man|Woman|Teacher|Nurse|Headmaster|Jake|Tom):\s*/gi;
    const tagMatches = [...rawText.matchAll(speakerPattern)];
    const lines = [];

    if (tagMatches.length > 0) {
      // 1. Text before first speaker tag (if any)
      if (tagMatches[0].index > 0) {
        const intro = rawText.substring(0, tagMatches[0].index).trim();
        if (intro) {
          lines.push({ speaker: 'nova', text: intro });
        }
      }

      // 2. Each turn between tag[i] and tag[i+1] — captures full sentences 100%
      for (let i = 0; i < tagMatches.length; i++) {
        const currentMatch = tagMatches[i];
        const speaker = currentMatch[1].toLowerCase();
        const startPos = currentMatch.index + currentMatch[0].length;
        const endPos = (i + 1 < tagMatches.length) ? tagMatches[i + 1].index : rawText.length;
        const speechContent = rawText.substring(startPos, endPos).trim();
        if (speechContent) {
          lines.push({ speaker, text: speechContent });
        }
      }
    } else {
      // Fallback: split by newlines if formatted line by line
      const rawLines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
      for (const rl of rawLines) {
        const m = rl.match(/^(Nova|Girl|Boy|Man|Woman|Teacher|Nurse|Headmaster|Jake|Tom):\s*(.+)$/i);
        if (m) {
          lines.push({ speaker: m[1].toLowerCase(), text: m[2].trim() });
        } else {
          lines.push({ speaker: 'nova', text: rl });
        }
      }
    }

    if (lines.length === 0) return null;

    // Voice mapping for distinct characters with contrasting timbre & gender
    const getVoiceForSpeaker = (speaker) => {
      switch (speaker) {
        case 'boy':
        case 'jake':
        case 'tom':
          return 'en-US-Journey-D'; // Young energetic male voice
        case 'man':
        case 'headmaster':
          return 'en-US-Neural2-D'; // Adult baritone male voice
        case 'woman':
        case 'nurse':
        case 'teacher':
          return 'en-US-Neural2-F'; // Adult gentle female voice
        case 'girl':
          return 'en-US-Journey-F'; // Young female voice
        case 'nova':
        default:
          return 'en-US-Journey-F'; // Host / Narrator
      }
    };

    // Synthesize all lines concurrently
    const blobPromises = lines.map(async (line) => {
      const voice = getVoiceForSpeaker(line.speaker);
      const cleanLine = this.cleanTextForTTS(line.text);
      return this.useGoogleTTSDirect(cleanLine, voice);
    });

    const blobs = await Promise.all(blobPromises);
    const validBlobs = blobs.filter(Boolean);
    if (validBlobs.length === 0) return null;

    // Decode each blob into AudioBuffer using Web Audio API
    const ctx = getAudioCtx();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const audioBuffers = [];
    for (const blob of validBlobs) {
      const ab = await blob.arrayBuffer();
      const decoded = await ctx.decodeAudioData(ab);
      audioBuffers.push(decoded);
    }

    // Concatenate AudioBuffers with 350ms natural conversational pause
    const pauseSeconds = 0.35;
    const sampleRate = audioBuffers[0].sampleRate;
    const pauseSamples = Math.floor(pauseSeconds * sampleRate);
    
    let totalLength = 0;
    audioBuffers.forEach((b, idx) => {
      totalLength += b.length;
      if (idx < audioBuffers.length - 1) totalLength += pauseSamples;
    });

    const compositeBuffer = ctx.createBuffer(1, totalLength, sampleRate);
    const outputData = compositeBuffer.getChannelData(0);
    let offset = 0;

    for (let i = 0; i < audioBuffers.length; i++) {
      const buf = audioBuffers[i];
      const channelData = buf.getChannelData(0);
      outputData.set(channelData, offset);
      offset += buf.length;
      if (i < audioBuffers.length - 1) {
        offset += pauseSamples;
      }
    }

    return this.audioBufferToWavBlob(compositeBuffer);
  },

  /**
   * Helper: Convert Web Audio API AudioBuffer to WAV Blob
   */
  audioBufferToWavBlob(buffer) {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    const length = buffer.length;
    const byteRate = sampleRate * blockAlign;
    const dataSize = length * blockAlign;
    const headerSize = 44;
    const totalSize = headerSize + dataSize;
    const arrayBuffer = new ArrayBuffer(totalSize);
    const view = new DataView(arrayBuffer);

    function writeString(offset, string) {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }

    writeString(0, 'RIFF');
    view.setUint32(4, totalSize - 8, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);

    const channelData = buffer.getChannelData(0);
    let offset = 44;
    for (let i = 0; i < length; i++) {
      let sample = channelData[i];
      sample = Math.max(-1, Math.min(1, sample));
      sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
      view.setInt16(offset, sample, true);
      offset += 2;
    }

    return new Blob([view], { type: 'audio/wav' });
  },

  /**
   * TIER 3: Use HF Space / Proxy Pool for Kokoro + Edge TTS
   */
  async useKokoroTTS(text, station = 'read') {
    return this.fetchWithRetry(text, station, 2);
  },

  /**
   * Internal: fetch audio blob from the proxy pool (one attempt, rotates server).
   * Throws on failure so callers can catch and fall back.
   */
  async _fetchFromPool(text, station, timeoutMs = 30000) {
    await acquireHFSlot();
    try {
    if (shouldThrottle()) {
      await new Promise(r => setTimeout(r, RATE_LIMIT_MS));
    }
    const server = nextTTSServer();
    const url = `${server}/tts?text=${encodeURIComponent(text)}&station=${encodeURIComponent(station)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`Server ${server} returned ${response.status}`);
      const blob = await response.blob();
      console.log(`[TTS] ✅ Pool fetch OK from ${server} (${(blob.size / 1024).toFixed(1)}KB)`);
      return blob;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
    } finally {
      releaseHFSlot();
    }
  },

  /**
   * Fetch TTS from proxy pool with retry logic (rotates servers on each attempt)
   */
  async fetchWithRetry(text, station, maxAttempts = 2) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const audioBlob = await this._fetchFromPool(text, station, 30000);
        await TTSCache.set(text, station, audioBlob, null);  // Legacy method, no voice
        const audioUrl = URL.createObjectURL(audioBlob);
        return this.playAudio(audioUrl, true);
      } catch (error) {
        // Don't retry on abort - user navigated away, further attempts are pointless
        if (error.name === 'AbortError' || error.message?.includes('aborted')) throw error;
        const isLast = attempt === maxAttempts;
        console.warn(`[TTS Pool] Attempt ${attempt}/${maxAttempts} failed: ${error.message}`);
        if (isLast) throw new Error(`TTS pool failed after ${maxAttempts} attempts: ${error.message}`);
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  },

  /**
   * Generate simple hash from text (for CDN lookup without pre-known URLs)
   * @param {string} text - Text to hash
   * @returns {string} - Hash string
   */
  hashText(text) {
    // Simple hash for filename generation (not cryptographic)
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  },

  /**
   * Compute SHA-256 hex digest for content staleness detection.
   * Used as vh (verify hash) param sent to TTS Worker. The Worker stores
   * this hash in R2 metadata and compares on subsequent requests — if the
   * source text changed (e.g. mindmap.js rewritten), the hash won't match
   * and the Worker regenerates audio on-demand, overwriting the stale file.
   * @param {string} text - Text to hash (MUST match what Worker receives)
   * @returns {Promise<string>} Hex SHA-256 digest
   */
  async computeContentHash(text) {
    const normalised = text.trim().toLowerCase();
    const data = new TextEncoder().encode(normalised);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  },

  /**
   * Pause the currently playing TTS audio (HTML5 audio element).
   * Used by Shadowing station's inline pause button. Always calls
   * pause() — it's a no-op if the audio is already paused, and we
   * saw a regression where a brief window between audio.play() and
   * the `paused` flag flipping to false caused pauseTTS() to no-op
   * (TTS kept playing after the pause button was clicked).
   *
   * Also sets a `shouldPause` flag so the NEXT audio created by
   * playAll's advance-to-next-sentence (which fires right after a
   * sentence ends) gets paused as soon as its onplay fires —
   * otherwise the user's pause click races against the auto-advance
   * and the next sentence plays before pause takes effect.
   */
  pauseTTS() {
    this._shouldPauseNext = true;
    if (this._currentSourceNode) {
      try { this._currentSourceNode.stop(); } catch (_) {}
      this._currentSourceNode = null;
    }
    if (this._currentAudio) {
      try { this._currentAudio.pause(); return true; }
      catch { return false; }
    }
    return false;
  },

  stopAudio() {
    this._shouldPauseNext = true;
    if (this._currentSourceNode) {
      try { this._currentSourceNode.stop(); } catch (_) {}
      this._currentSourceNode = null;
    }
    if (this._currentAudio) {
      try { this._currentAudio.pause(); this._currentAudio.currentTime = 0; } catch (_) {}
      this._currentAudio = null;
    }
  },

  stop() {
    this.stopAudio();
  },

  /**
   * Resume the currently paused TTS audio.
   */

  resumeTTS() {
    this._shouldPauseNext = false;
    if (!this._currentAudio) return Promise.resolve(false);
    return this._currentAudio.play().then(() => true, () => false);
  },

  /**
   * Play audio from blob URL
   * @param {string} audioUrl - Blob URL
   * @param {boolean} revokeAfter - Revoke URL after playback (for memory cleanup)
   * @returns {Promise<void>}
   */
  async playAudio(audioUrl, revokeAfter = true, throwOnError = false, onPlayStart = null) {
    // Stop any currently playing audio before starting a new one
    if (this._currentAudio) {
      try { this._currentAudio.pause(); this._currentAudio.currentTime = 0; } catch (_) {}
      this._currentAudio = null;
    }
    if (this._currentSourceNode) {
      try { this._currentSourceNode.stop(); } catch (_) {}
      this._currentSourceNode = null;
    }

    // 🚀 ULTRA-LOW LATENCY PATH FOR BLOBS: Use Web Audio API AudioBufferSourceNode on Desktop
    // On Mobile (iOS / Android), HTML5 Audio is preferred to preserve native Bluetooth headset routing (A2DP / HFP)
    // and prevent audio from leaking out of the built-in phone speaker.
    const isMobile = typeof navigator !== 'undefined' && (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent)));

    if (!isMobile && typeof audioUrl === 'string' && (audioUrl.startsWith('blob:') || audioUrl.startsWith('data:'))) {
      try {
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;

        const savedRate = parseFloat(localStorage.getItem('shadowing_speed') || localStorage.getItem('tts_speed') || '1.0');
        const rate = (savedRate >= 0.5 && savedRate <= 2.0) ? savedRate : 1.0;
        source.playbackRate.value = rate;

        const gain = this._speakGain || 1.0;
        const gainNode = ctx.createGain();
        gainNode.gain.value = gain;

        source.connect(gainNode);
        gainNode.connect(ctx.destination);

        this._currentSourceNode = source;
        const startTime = ctx.currentTime;
        this._currentAudio = {
          get currentTime() {
            return (ctx.currentTime - startTime) * rate;
          },
          get duration() {
            return audioBuffer.duration;
          },
          get playbackRate() {
            return rate;
          },
          paused: false
        };

        console.log(`[TTS] ⚡ Playing Blob via Web Audio API 0ms latency engine (${audioBuffer.duration.toFixed(2)}s, rate: ${rate}x)`);

        return new Promise((resolve) => {
          source.onended = () => {
            if (this._currentSourceNode === source) this._currentSourceNode = null;
            this._currentAudio = null;
            if (revokeAfter) URL.revokeObjectURL(audioUrl);
            resolve();
          };
          source.start(0);
          if (onPlayStart) {
            try { onPlayStart({ duration: audioBuffer.duration }); } catch (_) {}
          }
        });
      } catch (webAudioErr) {
        console.warn('[TTS] Web Audio API playback failed, falling back to HTML5 Audio:', webAudioErr.message);
        if (throwOnError) throw webAudioErr;
        // Fall through to HTML5 Audio below if Web Audio API decode fails
      }
    }

    // HTML5 Audio path (native mobile Bluetooth headset routing & desktop fallback)
    const audio = new Audio(audioUrl);
    this._currentAudio = audio;
    const savedRate = parseFloat(localStorage.getItem('shadowing_speed') || localStorage.getItem('tts_speed') || '1.0');
    audio.playbackRate = (savedRate >= 0.5 && savedRate <= 2.0) ? savedRate : 1.0;

    return new Promise((resolve, reject) => {
      let started = false;
      const handlePlaying = () => {
        if (!started) {
          started = true;
          if (onPlayStart) {
            try { onPlayStart({ duration: audio.duration || 0 }); } catch (_) {}
          }
        }
      };

      // 🎯 STRICT: Only listen to 'playing' (sound actually outputting to speaker/headphones)
      // DO NOT listen to 'play' because 'play' fires optimistically before sound emits
      audio.addEventListener('playing', handlePlaying, { once: true });

      audio.onended = () => {
        if (this._currentAudio === audio) this._currentAudio = null;
        if (revokeAfter) URL.revokeObjectURL(audioUrl);
        resolve();
      };

      audio.onerror = (err) => {
        if (this._currentAudio === audio) this._currentAudio = null;
        if (revokeAfter) URL.revokeObjectURL(audioUrl);
        if (throwOnError) {
          reject(new Error('Audio playback failed'));
          return;
        }
        console.warn(`[TTS Telemetry] ⚠️ Audio playback error [err=${err?.message || 'unknown'}], triggering Web Speech fallback...`);
        this.webFallback(this._lastText || '');
        resolve();
      };

      audio.play().catch((err) => {
        const errName = err?.name || 'Error';
        console.warn(`[TTS Telemetry] ⚠️ Audio play() rejected [name=${errName}, message=${err?.message}]`);

        // 🔄 SMART RETRY: If AbortError (Audio Focus switched by mic initialization), retry once after 150ms
        if (errName === 'AbortError') {
          console.log('[TTS Telemetry] ⏳ AbortError detected (Audio Focus switch) -> Retrying play() in 150ms...');
          setTimeout(() => {
            if (this._currentAudio !== audio) return; // Superceded by another playback
            // Re-register playing listener in case previous one was consumed or dropped
            audio.removeEventListener('playing', handlePlaying);
            audio.addEventListener('playing', handlePlaying, { once: true });

            audio.play().then(() => {
              console.log('[TTS Telemetry] ✅ Audio play() retry SUCCESSFUL after Audio Focus switch');
            }).catch((retryErr) => {
              console.warn(`[TTS Telemetry] ⚠️ Audio play() retry failed [name=${retryErr?.name}], falling back to Web Speech...`);
              if (this._currentAudio === audio) this._currentAudio = null;
              if (revokeAfter) URL.revokeObjectURL(audioUrl);
              this.webFallback(this._lastText || '');
              resolve();
            });
          }, 150);
        } else {
          // Fatal errors (NotAllowedError, NotSupportedError...) -> Immediate fallback
          if (this._currentAudio === audio) this._currentAudio = null;
          if (revokeAfter) URL.revokeObjectURL(audioUrl);
          if (throwOnError) {
            reject(err);
            return;
          }
          console.warn(`[TTS Telemetry] ⚠️ Fatal audio error [name=${errName}], falling back to Web Speech...`);
          this.webFallback(this._lastText || '');
          resolve();
        }
      });
    });
  },

  /**
   * Prefetch TTS in background — tries Google TTS first, falls back to HF Space.
   */
  async prefetchKokoro(text, station) {
    try {
      console.log(`[TTS] 🔄 Prefetching (Google TTS)...`);
      const audioBlob = await this.useGoogleTTS(text, station);
      await TTSCache.set(text, station, audioBlob, null);  // Legacy method, no voice
      console.log(`[TTS] ✅ Google TTS prefetched and cached (${(audioBlob.size / 1024).toFixed(1)}KB)`);
    } catch {
      // Fallback to HF Space
      try {
        console.log(`[TTS] 🔄 Prefetching (HF Space fallback)...`);
        const audioBlob = await this._fetchFromPool(text, station, 30000);
        await TTSCache.set(text, station, audioBlob, null);  // Legacy method, no voice
        console.log(`[TTS] ✅ HF Space prefetched and cached (${(audioBlob.size / 1024).toFixed(1)}KB)`);
      } catch (error) {
        throw new Error(`Prefetch failed: ${error.message}`);
      }
    }
  },

  /**
   * Fallback to Web Speech API (browser built-in)
   * @param {string} text - Text to speak
   */
  _activeUtterance: null,

  webFallback(text) {
    if (!('speechSynthesis' in window)) {
      console.error('❌ Web Speech API not supported in this browser');
      return;
    }

    const synth = window.speechSynthesis;
    if (synth.paused) {
      synth.resume();
    }
    
    let rawText = (text || '').trim();
    if (!rawText) return;

    const wordCount = rawText.split(/\s+/).length;
    const isSingleWord = wordCount <= 2;
    
    // Clean text: strip any leading/trailing quotes or punctuation for pure speech synthesis
    let cleanText = rawText.replace(/^["'\s]+|["'\s]+$/g, '');

    // Cancel any previous utterance to avoid queue buildup
    try { synth.cancel(); } catch {}

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // CRITICAL FIX FOR CHROME V8 GARBAGE COLLECTION BUG:
    // Store utterance in persistent instance property so V8 GC does NOT collect it mid-word
    this._activeUtterance = utterance;
    
    utterance.onend = () => {
      if (this._activeUtterance === utterance) {
        this._activeUtterance = null;
      }
    };
    utterance.onerror = () => {
      if (this._activeUtterance === utterance) {
        this._activeUtterance = null;
      }
    };

    // Ensure voices are loaded
    const voices = synth.getVoices();
    if (voices.length === 0) {
      synth.onvoiceschanged = () => this.webFallback(text);
      return;
    }
    
    // --- HIGH QUALITY VOICE SELECTION LOGIC ---
    let preferredVoice = voices.find(v => v.name === 'Google US English' && v.lang === 'en-US');

    if (!preferredVoice) {
      preferredVoice = voices.find(v => 
        v.lang.startsWith('en-') && 
        (v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Victoria') || v.name.includes('Aria') || v.name.includes('Jenny') || v.name.includes('Michelle'))
      );
    }
    
    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.lang.startsWith('en-') && v.name.includes('Female'));
    }
    
    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.lang.startsWith('en-')) || voices[0];
    }
    
    utterance.voice = preferredVoice;
    utterance.rate = isSingleWord ? 0.90 : 1.0; // Clear 0.90 pace for single word cards so ending consonants (cave, wrote, came, gave, made) are crystal clear
    utterance.pitch = 1.0; // Natural pitch
    utterance.volume = 1.0;
    
    console.log(`[TTS] 🎙️ Using browser voice: ${preferredVoice?.name || 'default'} (rate: ${utterance.rate}, text: "${cleanText}")`);
    synth.speak(utterance);
  }

  // Future: Add logToCloud() when Supabase is configured
};

export default VoiceService;

/** Called externally (e.g. ttsPreload) when HF Space is confirmed warm */
export function markServerWarm() {
  _serverWarm = true;
  _lastSuccessTime = Date.now();
  console.log('[TTS] 🔥 Server marked WARM (HF Space ready as fallback)');
}
