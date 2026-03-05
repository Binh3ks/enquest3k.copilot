/**
 * Multi-Tier TTS Voice Service
 * Optimized fallback chain for performance + reliability
 * 
 * FALLBACK STRATEGY:
 * 1. Client Cache (IndexedDB) - Instant replay (0ms)
 * 2. Deepgram Worker API - AI Tutor only, direct to Deepgram Aura (300-500ms)
 * 3. R2 CDN (Cloudflare R2) - Pre-generated Deepgram files for static stations (<100ms)
 * 4. Browser TTS (Web Speech) - Built-in fallback (500ms) [Last resort]
 * 
 * STATION CLASSIFICATION:
 * - Static: read, new_word, dictation, shadowing, explore, word_power, ask_ai
 *   → Load pre-generated audio from R2 CDN (all generated with Deepgram)
 * - Dynamic: ai_tutor, gamehub, freetalk
 *   → Call Deepgram Worker API directly (live generation)
 * 
 * IMPORTANT: All static content is pre-generated using Deepgram Aura-2 TTS
 * and uploaded to R2. No Kokoro fallback - if R2 misses, browser TTS is used.
 * 
 * Features:
 * - Station-based voice selection (Deepgram Aura-2 voices)
 * - Pre-generated Deepgram TTS files on R2 CDN (weeks 1-8: all modes)
 * - Deepgram Worker API for dynamic AI Tutor content
 * - Client-side caching for all sources (IndexedDB)
 * - Graceful degradation: R2 → Browser TTS (no intermediate fallbacks)
 */

import { TTSCache } from './ttsCache';

// CDN Base URL for pre-generated Deepgram audio files from Cloudflare R2
const CDN_URL = import.meta.env.VITE_CDN_URL || 'https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev';

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

// Weeks that have pre-generated Deepgram files on R2 CDN
// Week 1-7: originally Kokoro (legacy), Week 8+: all Deepgram Aura-2
const CDN_WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Static stations that can use CDN (pre-generated content)
const STATIC_STATIONS = ['read', 'new_word', 'dictation', 'shadowing', 'explore', 'word_power', 'ask_ai'];

// Dynamic stations that need live generation (AI Tutor, Gamehub)
const DYNAMIC_STATIONS = ['ai_tutor', 'gamehub', 'freetalk', 'ai_story'];

export const VoiceService = {
  /**
   * Main function to make AI Tutor speak with multi-tier fallback
   * @param {string} text - Text to speak
   * @param {string} station - Station ID (read, new_word, dictation, ask_ai, shadowing, explore, word_power)
   * @param {string} audioUrl - Optional pre-known audio URL (from station data)
   * @param {number} weekNumber - Week number (for CDN lookup)
   * @param {string} mode - Mode ('advanced' or 'easy')
   * @param {boolean} instant - If true, play browser TTS immediately for AI Tutor (Deepgram worker will cache for next replay)
   * @returns {Promise<void>}
   */
  async speak(text, station = 'read', audioUrl = null, weekNumber = null, mode = 'advanced', instant = false) {
    // Clean text for TTS (remove emojis, normalize abbreviations)
    const cleanedText = this.cleanTextForTTS(text);
    
    // 🔍 TIER 1: Check Client Cache first (instant replay, 0ms)
    const cachedUrl = await TTSCache.get(cleanedText, station);
    if (cachedUrl) {
      console.log(`[TTS] ✅ Cache hit (0ms)`);
      return this.playAudio(cachedUrl, true);
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

      // ── Phase 1: Worker (Deepgram or R2 HIT) ─────────────────────────────
      const workerPromise = this.useGoogleTTS(cleanedText, station);
      let audioBlob = null;
      let workerErr = null;

      try {
        audioBlob = await Promise.race([
          workerPromise,
          new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 5000))
        ]);
      } catch (err) {
        workerErr = err;
      }

      if (audioBlob) {
        await TTSCache.set(cleanedText, station, audioBlob);
        const blobUrl = URL.createObjectURL(audioBlob);
        console.log(`[TTS] ✅ Worker won (${(audioBlob.size / 1024).toFixed(1)}KB)`);
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
            await TTSCache.set(cleanedText, station, blob);
            console.log(`[TTS] 💾 Late Deepgram cached for next replay`);
          }
        })
        .catch(() => {});

      return;
    }
    
    // 🌐 TIER 2: Try R2 CDN (all static stations with audioUrl)
    // All static content should be pre-generated with Deepgram and uploaded to R2
    if (isStaticStation && audioUrl && weekNumber && CDN_WEEKS.includes(weekNumber)) {
      try {
        console.log(`[TTS] Trying R2 CDN for week ${weekNumber} ${mode}...`);
        await this.useCDN(cleanedText, station, audioUrl, weekNumber, mode);
        console.log(`[TTS] ✅ R2 CDN success (~100ms)`);
        return;
      } catch (err) {
        console.warn(`[TTS] R2 CDN miss: ${err.message}`);
        console.warn(`[TTS] ⚠️ Audio file should exist on R2 - please regenerate week ${weekNumber}`);
      }
    }
    
    // 🔊 TIER 4: Browser TTS (last resort)
    console.warn('[TTS] ⚠️ Using browser TTS as last resort');
    this.webFallback(cleanedText);
  },

  /**
   * Pre-cache TTS audio WITHOUT playing (for background prefetch)
   * Only caches from R2 CDN - does not generate new audio
   */
  async prefetch(text, station = 'read', audioUrl = null, weekNumber = null, mode = 'advanced') {
    const cleanedText = this.cleanTextForTTS(text);

    // Already cached? Nothing to do
    const cached = await TTSCache.get(cleanedText, station);
    if (cached) return;

    const isStaticStation = STATIC_STATIONS.includes(station);

    // Try R2 CDN (only for static stations with pre-generated audio)
    if (isStaticStation && audioUrl && weekNumber && CDN_WEEKS.includes(weekNumber)) {
      try {
        const cleanPath = audioUrl.startsWith('/') ? audioUrl.slice(1) : audioUrl;
        const cdnUrl = `${CDN_URL}/${cleanPath}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const response = await fetch(cdnUrl, { signal: controller.signal, cache: 'force-cache', headers: { 'Accept': 'audio/mpeg' } });
        clearTimeout(timeoutId);
        if (response.ok) {
          const blob = await response.blob();
          await TTSCache.set(cleanedText, station, blob);
          return;
        }
      } catch {}
    }

    // Don't generate audio in prefetch - only cache what's already on R2
    // If R2 miss, the speak() function will handle fallback to browser TTS
  },

  /**
   * Clean text for TTS - remove emojis, normalize abbreviations
   * @param {string} text - Raw text from AI
   * @returns {string} - Cleaned text ready for TTS
   */
  cleanTextForTTS(text) {
    let cleaned = text;

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
    
    // 5. Remove underscores (mindmap placeholders) - replace with blank
    cleaned = cleaned.replace(/_{2,}/g, 'blank'); // ___ → "blank"
    cleaned = cleaned.replace(/_/g, ' '); // Single _ → space
    
    // 6. Fix common TTS pronunciation issues
    cleaned = cleaned.replace(/\bI'm\b/g, 'I am');
    cleaned = cleaned.replace(/\byou're\b/gi, 'you are');
    cleaned = cleaned.replace(/\bwe're\b/gi, 'we are');
    
    // 7. Fix homograph: "live" (verb /lɪv/) vs "live" (adj /laɪv/)
    //    "I live with" → should be /lɪv/ not /laɪv/
    //    Context: "live with", "live in", "I live", "you live", "we live", "they live"
    cleaned = cleaned.replace(/\b(I|you|we|they|who do you)\s+live\b/gi, '$1 liv');
    cleaned = cleaned.replace(/\blive with\b/gi, 'liv with');
    cleaned = cleaned.replace(/\blive in\b/gi, 'liv in');
    
    return cleaned;
  },

  /**
   * TIER 2: Load pre-generated Deepgram audio from R2 CDN
   * @param {string} text - Text to speak
   * @param {string} station - Station ID
   * @param {string} audioUrl - Pre-known URL from station data (e.g., /audio/week8_easy/dictation_1.mp3)
   * @param {number} weekNumber - Week number
   * @param {string} mode - Mode ('advanced' or 'easy')
   * @returns {Promise<void>}
   */
  async useCDN(text, station, audioUrl, weekNumber, mode) {
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
        throw new Error(`CDN returned ${response.status}`);
      }
      
      // Got audio from CDN!
      const audioBlob = await response.blob();
      
      // Cache locally for instant replay
      await TTSCache.set(text, station, audioBlob);
      
      // Play immediately
      const audioUrl = URL.createObjectURL(audioBlob);
      return this.playAudio(audioUrl, true);
      
    } catch (error) {
      clearTimeout(timeoutId);
      throw new Error(`CDN fetch failed: ${error.message}`);
    }
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
   */
  async useGoogleTTS(text, station = 'ai_tutor') {
    // ── Route 1: Via Cloudflare Worker (Deepgram + R2 cache) ─────────────────
    if (TTS_WORKER_URL) {
      const savedVoice = localStorage.getItem('tts_voice') || '';
      let workerUrl = `${TTS_WORKER_URL}/tts?text=${encodeURIComponent(text)}&station=${encodeURIComponent(station)}`;
      if (savedVoice) workerUrl += `&voice=${encodeURIComponent(savedVoice)}`;
      const res = await fetch(workerUrl);
      if (!res.ok) throw new Error(`TTS Worker HTTP ${res.status}`);
      const blob = await res.blob();
      const cacheHit = res.headers.get('X-Cache') === 'HIT';
      const ttsSource = res.headers.get('X-TTS-Source') || 'hf-space';
      const sourceLabel = cacheHit ? `☁️ R2 ${ttsSource}` : `🎤 Deepgram ${ttsSource}`;
      console.log(`[TTS] ✅ Worker ${sourceLabel} (${(blob.size / 1024).toFixed(1)}KB)`);
      return blob;
    }

    // ── Route 2: Backend proxy fallback (dev/testing mode) ──
    return await proxyGoogleTTS(text, { voice: GOOGLE_TTS_VOICE, languageCode: 'en-US' });
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
        await TTSCache.set(text, station, audioBlob);
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
   * Play audio from blob URL
   * @param {string} audioUrl - Blob URL
   * @param {boolean} revokeAfter - Revoke URL after playback (for memory cleanup)
   * @returns {Promise<void>}
   */
  playAudio(audioUrl, revokeAfter = true) {
    const audio = new Audio(audioUrl);
    const savedRate = parseFloat(localStorage.getItem('tts_speed') || '1.0');
    audio.playbackRate = (savedRate >= 0.7 && savedRate <= 1.0) ? savedRate : 1.0;

    return new Promise((resolve, reject) => {
      audio.onended = () => {
        if (revokeAfter) URL.revokeObjectURL(audioUrl);
        resolve();
      };
      audio.onerror = (err) => {
        if (revokeAfter) URL.revokeObjectURL(audioUrl);
        reject(err);
      };
      audio.play().catch(reject);
    });
  },

  /**
   * Prefetch TTS in background — tries Google TTS first, falls back to HF Space.
   */
  async prefetchKokoro(text, station) {
    try {
      console.log(`[TTS] 🔄 Prefetching (Google TTS)...`);
      const audioBlob = await this.useGoogleTTS(text, station);
      await TTSCache.set(text, station, audioBlob);
      console.log(`[TTS] ✅ Google TTS prefetched and cached (${(audioBlob.size / 1024).toFixed(1)}KB)`);
    } catch {
      // Fallback to HF Space
      try {
        console.log(`[TTS] 🔄 Prefetching (HF Space fallback)...`);
        const audioBlob = await this._fetchFromPool(text, station, 30000);
        await TTSCache.set(text, station, audioBlob);
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
  webFallback(text) {
    if (!('speechSynthesis' in window)) {
      console.error('❌ Web Speech API not supported in this browser');
      return;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Ensure voices are loaded
    const voices = synth.getVoices();
    if (voices.length === 0) {
      // If voices are not loaded, wait for the event
      synth.onvoiceschanged = () => this.webFallback(text);
      return;
    }
    
    // --- NEW VOICE SELECTION LOGIC ---
    // We want a clear, young, female voice. "Google US English" is often a great choice.
    
    // Priority 1: Google's standard high-quality female voice
    let preferredVoice = voices.find(v => v.name === 'Google US English' && v.lang === 'en-US');

    // Priority 2: Other high-quality browser voices if Google's isn't available
    if (!preferredVoice) {
      preferredVoice = voices.find(v => 
        v.lang.startsWith('en-') && 
        (v.name.includes('Aria') || v.name.includes('Jenny') || v.name.includes('Michelle') || v.name.includes('Samantha'))
      );
    }
    
    // Priority 3: Any available female voice
    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.lang.startsWith('en-') && v.name.includes('Female'));
    }
    
    // Final Fallback: Any English voice
    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.lang.startsWith('en-')) || voices[0];
    }
    
    utterance.voice = preferredVoice;
    utterance.rate = 1.0; // Normal rate for clarity
    utterance.pitch = 1.1; // Slightly higher pitch for a younger feel
    utterance.volume = 1.0;
    
    console.log(`[TTS] 🎙️ Using voice: ${preferredVoice?.name || 'default'}`);
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
