/**
 * TTS Engine - Multi-layered Text-to-Speech System
 *
 * 4-layer fallback architecture for maximum reliability:
 * Layer 1: Google Cloud Text-to-Speech (PRIMARY - Neural voice with PCM16→WAV conversion)
 * Layer 2: OpenAI TTS (BACKUP - High quality, Whisper-based)
 * Layer 3: Puter.js TTS (Cloud fallback - not yet implemented)
 * Layer 4: Browser Speech Synthesis (LAST RESORT - Offline fallback)
 *
 * Features:
 * - Auto-play on AI response
 * - Audio caching for repeated phrases
 * - Playback queue management
 * - PCM to WAV conversion for Google Cloud TTS LINEAR16 audio
 */

import axios from 'axios';

// 🔥 Get API base URL for backend calls
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// ============================================
// WAV ENCODING UTILITY (for PCM data from Google Cloud TTS)
// ============================================

/**
 * Inject WAV header into raw PCM16 buffer from Google Cloud TTS
 * Google Cloud TTS returns LINEAR16 (raw PCM) which browsers cannot play directly
 * This function wraps the PCM data with a proper WAV header for playback
 *
 * @param {Uint8Array|ArrayBuffer} pcmBuffer - Raw PCM16 audio data from Google TTS
 * @param {number} sampleRate - Sample rate (default: 24000 Hz for Google TTS)
 * @returns {Blob} WAV audio blob ready for browser playback
 */
export function injectWavHeader(pcmBuffer, sampleRate = 24000) {
  const numChannels = 1; // Mono
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;

  // Ensure pcmBuffer is Uint8Array
  const pcmData = pcmBuffer instanceof ArrayBuffer
    ? new Uint8Array(pcmBuffer)
    : pcmBuffer;

  const dataLength = pcmData.length;
  const buffer = new ArrayBuffer(44 + dataLength);
  const view = new DataView(buffer);

  // WAV header construction
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // RIFF chunk descriptor
  writeString(0, 'RIFF'); // ChunkID
  view.setUint32(4, 36 + dataLength, true); // ChunkSize
  writeString(8, 'WAVE'); // Format

  // fmt sub-chunk
  writeString(12, 'fmt '); // Subchunk1ID
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * numChannels * bytesPerSample, true); // ByteRate
  view.setUint16(32, numChannels * bytesPerSample, true); // BlockAlign
  view.setUint16(34, bitsPerSample, true); // BitsPerSample

  // data sub-chunk
  writeString(36, 'data'); // Subchunk2ID
  view.setUint32(40, dataLength, true); // Subchunk2Size

  // Copy PCM data after header
  const wavData = new Uint8Array(buffer);
  wavData.set(pcmData, 44);

  return new Blob([buffer], { type: 'audio/wav' });
}

// Alias for backward compatibility
export const encodeWAV = injectWavHeader;

// ============================================
// CONFIGURATION
// ============================================

import { proxyTTS, proxyGoogleTTS, proxyDeepgramTTS } from '../aiProxy.js';
import useTTSStore from '../../stores/useTTSStore.js';
import { getCommonPhraseFilename, getCommonPhrasePath, getCommonPhraseURL } from './commonPhrases.js';

// Audio cache for repeated phrases (in-memory)
const audioCache = new Map();

// TTS Worker URL (same as stations)
const TTS_WORKER_URL = import.meta.env.VITE_TTS_WORKER_URL || 'https://engquest-tts-worker.binhkhoi08.workers.dev';

// R2 CDN configuration
const R2_CDN_URL = 'https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev';

// Current playback state
let currentAudio = null;
let isPlaying = false;
let isSpeaking = false; // 🔥 Lock to prevent concurrent TTS calls
let lastTTSCall = 0; // 🔥 Debounce timestamp

const TTS_DEBOUNCE_DELAY = 500; // 500ms minimum between TTS calls

// TTS Engine configuration
const TTS_CONFIG = {
  deepgram: {
    enabled: true, // 🔥 PRIMARY - Deepgram Aura TTS (high quality, cost-effective)
    voice: 'aura-asteria-en', // Female, warm, friendly - perfect for Ms. Nova
    speed: {
      conversation: 1.0,   // Normal speed for conversations
      pronunciation: 0.85  // Slower for pronunciation practice (clearer for ESL learners)
    }
  },
  gemini: {
    enabled: true, // 🔥 BACKUP - Google Cloud Text-to-Speech
    voice: 'en-US-Studio-O', // 🎙️ Studio quality, energetic female voice (clearer than Neural2-F)
    speed: 0.85 // 🎓 Slower for ESL learners (user requested)
  },
  openai: {
    enabled: true, // Key is on backend (proxied via /api/ai/tts)
    model: 'tts-1',
    voice: 'nova', // Natural, warm voice
    speed: 0.85 // Match Gemini speed for consistency
  },
  puter: {
    enabled: false, // TODO: Integrate Puter.js when available
    voice: 'en-US'
  },
  browser: {
    enabled: true, // Always available as final fallback
    voice: 'Google US English', // Prefer Google voices
    rate: 0.9,
    pitch: 1.0
  }
};

// ============================================
// TEXT CLEANING UTILITY
// ============================================

/**
 * Generate cache key and R2 path for audio with context awareness
 * 
 * CACHE STRATEGY:
 * 1. Generic phrases → audio/ai_tutor/common/{name}.mp3 (66 phrases)
 * 2. Story content → audio/ai_tutor/story/week{N}/{id}.mp3 (organized by week)
 * 3. Conversation cards → audio/ai_tutor/conversation/{cardId}/{qNum}.mp3
 * 4. Vocabulary → audio/ai_tutor/vocab/{vocabId}_{lang}.mp3
 * 5. Translations → audio/ai_tutor/translation/{hash}.mp3 (may reuse)
 * 6. Dynamic content → audio/ai_tutor/dynamic/{hash}.mp3 (student-specific)
 * 
 * @param {string} text - Cleaned text to generate audio for
 * @param {Object} context - Context for organizing cache
 * @param {string} context.type - Content type: 'story'|'conversation'|'vocab'|'translation'|'dynamic'
 * @param {number} context.weekNum - Week number (for story)
 * @param {string} context.stationId - Station ID (for story)
 * @param {string} context.questionId - Question ID (for story)
 * @param {string} context.subType - Sub-type: 'prompt'|'choice_a'|'choice_b'|'feedback'|'hint'
 * @param {string} context.cardId - Card ID (for conversation)
 * @param {number} context.questionNum - Question number (for conversation)
 * @param {string} context.vocabId - Vocabulary ID (for vocab)
 * @param {string} context.language - Language code: 'en'|'vi' (for vocab/translation)
 * @returns {Promise<{cacheKey: string, audioPath: string, isStatic: boolean, category: string}>}
 */
async function generateCacheInfo(text, context = {}) {
  // ===== 1. GENERIC COMMON PHRASES =====
  const commonFilename = getCommonPhraseFilename(text);
  if (commonFilename) {
    return {
      cacheKey: commonFilename,
      audioPath: getCommonPhrasePath(commonFilename),
      isStatic: true,
      category: 'common'
    };
  }
  
  // ===== 2. STORY MISSION CONTENT (hardcoded in week data) =====
  if (context.type === 'story' && context.weekNum && context.stationId) {
    // Build descriptive filename
    const parts = [
      context.stationId,
      context.questionId,
      context.subType
    ].filter(Boolean);
    
    const filename = parts.join('_');
    
    return {
      cacheKey: filename,
      audioPath: `audio/ai_tutor/story/week${context.weekNum}/${filename}.mp3`,
      isStatic: true,
      category: 'story'
    };
  }
  
  // ===== 3. CONVERSATION CARDS (hardcoded in card data) =====
  if (context.type === 'conversation' && context.cardId) {
    const filename = context.questionNum 
      ? `q${context.questionNum}`
      : 'intro';
    
    return {
      cacheKey: `${context.cardId}_${filename}`,
      audioPath: `audio/ai_tutor/conversation/${context.cardId}/${filename}.mp3`,
      isStatic: true,
      category: 'conversation'
    };
  }
  
  // ===== 4. VOCABULARY (hardcoded words + translations) =====
  if (context.type === 'vocab' && context.vocabId) {
    const lang = context.language || 'en';
    return {
      cacheKey: `${context.vocabId}_${lang}`,
      audioPath: `audio/ai_tutor/vocab/${context.vocabId}_${lang}.mp3`,
      isStatic: true,
      category: 'vocab'
    };
  }
  
  // ===== 5. TRANSLATIONS (hash-based but organized) =====
  if (context.type === 'translation') {
    const hash = await generateHash(text + (context.language || 'en'));
    return {
      cacheKey: hash,
      audioPath: `audio/ai_tutor/translation/${hash}.mp3`,
      isStatic: false, // May reuse if same text
      category: 'translation'
    };
  }
  
  // ===== 6. TRULY DYNAMIC (student response, AI recast, ask anything) =====
  const hash = await generateHash(text);
  return {
    cacheKey: hash,
    audioPath: `audio/ai_tutor/dynamic/${hash}.mp3`,
    isStatic: false,
    category: 'dynamic'
  };
}

/**
 * Generate SHA-256 hash for text (helper function)
 * @param {string} text - Text to hash
 * @returns {Promise<string>} 16-character hash
 */
async function generateHash(text) {
  const normalized = text.toLowerCase().trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.substring(0, 16);
}

/**
 * Check if audio exists in R2 CDN cache
 * @param {string} audioPath - R2 object key (e.g., "audio/ai_tutor/common/praise_great.mp3")
 * @returns {Promise<string|null>} R2 CDN URL if exists, null otherwise
 */
async function checkR2Cache(audioPath) {
  const r2Url = `${R2_CDN_URL}/${audioPath}`;
  
  try {
    // HEAD request to check if file exists
    const response = await fetch(r2Url, { method: 'HEAD' });
    
    if (response.ok) {
      console.log('✅ R2 cache HIT:', audioPath);
      return r2Url;
    }
  } catch (error) {
    console.log('⏩ R2 cache MISS:', audioPath);
  }
  
  return null;
}

/**
 * Upload audio to R2 via Cloudflare Worker (same as stations)
 * Worker saves audio to R2 in background via ctx.waitUntil()
 * @param {string} text - Cleaned text
 * @param {string} audioPath - R2 object key 
 * @param {string} voice - Deepgram voice
 * @returns {Promise<Blob>} - Audio blob
 */
async function generateAndCacheToR2(text, audioPath, voice) {
  // Call Worker with audioPath parameter (Worker will save to R2)
  const workerUrl = `${TTS_WORKER_URL}/tts?text=${encodeURIComponent(text)}&station=ai_tutor&voice=${voice}&path=${encodeURIComponent(audioPath)}`;
  
  console.log(`🎤 Generating via Worker with static path: ${audioPath}`);
  
  const response = await fetch(workerUrl);
  
  if (!response.ok) {
    throw new Error(`Worker returned ${response.status}`);
  }
  
  const audioBlob = await response.blob();
  const cacheHit = response.headers.get('X-Cache') === 'HIT';
  
  if (cacheHit) {
    console.log(`☁️ Worker served from R2 cache: ${audioPath}`);
  } else {
    console.log(`✅ Worker generated and cached to R2: ${audioPath} (${(audioBlob.size / 1024).toFixed(1)}KB)`);
  }
  
  return audioBlob;
  
  return audioBlob;
}

/**
 * Clean text for speech synthesis
 * - Remove emojis and icons (prevents TTS from reading "tiger face", "glowing star")
 * - Remove markdown formatting
 * - Normalize whitespace
 * @param {string} text - Raw text with emojis/icons
 * @returns {string} Cleaned text for TTS
 */
function cleanTextForSpeech(text) {
  if (!text) return '';
  
  return text
    // Remove all emojis and special characters (comprehensive regex)
    .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{FE00}-\u{FE0F}]|[\u{E0020}-\u{E007F}]|[\u{20E3}]|[\u{FE0F}]|[\u{2B50}]|[\u{2728}]|[\u{1F389}]|[\u{1F31F}]/gu, '')
    // Remove markdown bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

// ============================================
// MAIN TTS FUNCTION
// ============================================

/**
 * Convert text to speech with automatic layer fallback
 * @param {string} text - Text to convert to speech
 * @param {Object} options - TTS options
 * @param {boolean} options.autoPlay - Auto-play audio immediately
 * @param {string} options.preferredLayer - 'gemini' | 'openai' | 'puter' | 'browser' | 'auto'
 * @param {string} options.mode - 'conversation' (0.8x) | 'pronunciation' (1.0x)
 * @param {Object} options.context - Cache context (type, weekNum, stationId, etc.)
 * @returns {Promise<AudioResponse>}
 */
export async function textToSpeech(text, { autoPlay = true, preferredLayer = 'auto', mode = 'conversation', speed = null, context = {} } = {}) {
  if (!text || text.trim().length === 0) {
    console.warn('⚠️ TTS: Empty text provided');
    return { success: false, error: 'Empty text' };
  }

  // 🧹 Clean text: Remove emojis, icons, markdown
  const cleanedText = cleanTextForSpeech(text);
  
  if (!cleanedText || cleanedText.trim().length === 0) {
    console.warn('⚠️ TTS: Text only contained emojis/formatting');
    return { success: false, error: 'No speakable text after cleaning' };
  }
  
  console.log('🧹 TTS: Cleaned text:', { original: text.substring(0, 50), cleaned: cleanedText.substring(0, 50) });

  // 🔥 Debounce: Prevent rapid-fire TTS calls
  const now = Date.now();
  if (now - lastTTSCall < TTS_DEBOUNCE_DELAY) {
    console.warn('⚠️ TTS: Call too soon, debouncing...');
    return { success: false, error: 'Debounced' };
  }
  lastTTSCall = now;

  // 🔥 Check if already speaking - prevent concurrent calls
  if (isSpeaking) {
    console.warn('⚠️ TTS: Already speaking, canceling previous...');
    stopAudio(); // This will reset both isSpeaking and clean up audio
    // Wait a bit for cleanup to complete
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  isSpeaking = true; // 🔥 Set lock

  console.log('🎤 TTS Request:', { 
    text: cleanedText.substring(0, 100) + '...', 
    autoPlay, 
    preferredLayer,
    deepgramEnabled: TTS_CONFIG.deepgram.enabled,
    geminiEnabled: TTS_CONFIG.gemini.enabled,
    openaiEnabled: TTS_CONFIG.openai.enabled,
    r2CacheEnabled: true // Always enabled via Worker
  });

  // 🔥 Get user preferences from TTS settings store
  const ttsStore = useTTSStore.getState();
  const userVoice = ttsStore.getVoiceConfig(); // User-selected voice
  const userSpeed = speed || ttsStore.getSpeedValue(mode); // Custom speed or store preference

  // 🔥 STEP 1: Generate cache info (check if common phrase or dynamic content)
  const { cacheKey, audioPath, isStatic, category } = await generateCacheInfo(cleanedText, context);
  
  // Log cache type for visibility
  const categoryEmoji = {
    'common': '🎯',
    'story': '📖',
    'conversation': '💬',
    'vocab': '📚',
    'translation': '🌐',
    'dynamic': '✨'
  };
  
  const emoji = categoryEmoji[category] || '💬';
  const displayKey = isStatic ? cacheKey : cacheKey.substring(0, 8) + '...';
  console.log(`${emoji} ${category.toUpperCase()}: ${displayKey}`);

  // 🔥 STEP 2: Check in-memory cache first (instant)
  const memoryCacheKey = `${audioPath}_${preferredLayer}_${userVoice}`;
  
  if (audioCache.has(memoryCacheKey)) {
    console.log('✅ TTS: Using in-memory cached audio');
    const cachedUrl = audioCache.get(memoryCacheKey);
    if (autoPlay) {
      try {
        await playAudio(cachedUrl, userSpeed);
      } catch (playError) {
        console.error('❌ Cached audio playback failed:', playError.message);
        console.log('🔄 Clearing bad cache and regenerating...');
        // Clear bad cache entry
        audioCache.delete(memoryCacheKey);
        // Fall through to regenerate audio - don't return here
      }
    }
    // Only return success if cache still valid (playback didn't error)
    if (audioCache.has(memoryCacheKey)) {
      isSpeaking = false; // 🔥 Release lock for cached audio
      return {
        success: true,
        audioUrl: cachedUrl,
        layer: 'memory_cache',
        text
      };
    }
    // If cache was cleared due to error, log and continue to regeneration
    console.log('⏩ Cache cleared, falling through to TTS generation...');
  }

  // 🔥 STEP 3: Check R2 CDN cache (< 100ms, saves Deepgram API cost)
  const r2CachedUrl = await checkR2Cache(audioPath);
  
  if (r2CachedUrl) {
    console.log('✅ TTS: Using R2 CDN cached audio');
    // Cache in memory for next time
    audioCache.set(memoryCacheKey, r2CachedUrl);
    
    if (autoPlay) {
      try {
        await playAudio(r2CachedUrl, userSpeed);
      } catch (playError) {
        console.error('❌ R2 cached audio playback failed:', playError.message);
        console.log('🔄 Clearing bad R2 cache reference and regenerating...');
        // Clear bad cache entry
        audioCache.delete(memoryCacheKey);
        // Fall through to regenerate audio
      }
    }
    // Only return success if cache still valid (playback didn't error)
    if (autoPlay === false || audioCache.has(memoryCacheKey)) {
      isSpeaking = false; // 🔥 Release lock for cached audio
      return {
        success: true,
        audioUrl: r2CachedUrl,
        layer: 'r2_cache',
        text,
        cached: true
      };
    }
    // If cache was cleared due to error, log and continue to regeneration
    console.log('⏩ R2 cache cleared, falling through to TTS generation...');
  }

  // 🔥 STEP 3: Cache miss - generate audio via TTS engines
  console.log('⏩ No cache - calling TTS API...');

  // Try layers in order (Deepgram → Google Cloud TTS → OpenAI → Browser)
  const layers = preferredLayer === 'auto'
    ? ['deepgram', 'gemini', 'openai', 'browser'] // 🔥 Full fallback chain (Deepgram first!)
    : [preferredLayer, 'browser']; // Always fallback to browser

  console.log('🔄 TTS: Trying layers in order:', layers);

  for (const layer of layers) {
    try {
      console.log(`🔊 TTS: Attempting layer ${layer}...`);
      let audioUrl = null;

      switch (layer) {
        case 'deepgram':
          if (TTS_CONFIG.deepgram.enabled) {
            audioUrl = await callDeepgramTTS(cleanedText, userVoice, audioPath); // 🎯 Pass audioPath for Worker caching
          }
          break;
        
        case 'gemini':
          if (TTS_CONFIG.gemini.enabled) {
            audioUrl = await callGeminiTTS(cleanedText, mode, audioPath); // 🎯 Pass audioPath for Worker caching
          }
          break;
        
        case 'openai':
          if (TTS_CONFIG.openai.enabled) {
            audioUrl = await callOpenAITTS(cleanedText, audioPath); // 🎯 Pass audioPath for Worker caching
          }
          break;
        
        case 'puter':
          if (TTS_CONFIG.puter.enabled) {
            audioUrl = await callPuterTTS(cleanedText); // 🧹 Use cleaned text
          }
          break;
        
        case 'browser':
          audioUrl = await callBrowserTTS(cleanedText); // 🧹 Use cleaned text
          break;
      }

      if (audioUrl) {
        // Cache the result in memory
        audioCache.set(memoryCacheKey, audioUrl);
        
        console.log(`✅ TTS: ${layer} successful! (Worker cached to R2: ${audioPath})`);
        
        // Worker already cached to R2 in background (no need for separate upload)
        // Common phrases: audio/ai_tutor/common/{name}.mp3
        // Dynamic content: audio/ai_tutor/dynamic/{hash}.mp3
        
        // Auto-play if requested
        if (autoPlay) {
          await playAudio(audioUrl, userSpeed);
        }

        isSpeaking = false; // 🔥 Release lock on success

        return {
          success: true,
          audioUrl,
          layer,
          text,
          cached: false
        };
      } else {
        console.warn(`⚠️ TTS: ${layer} returned null audioUrl`);
      }
    } catch (error) {
      console.warn(`❌ TTS: Layer ${layer} failed:`, error.message);
      // Continue to next layer
    }
  }

  console.error('❌ TTS: All layers failed!');
  isSpeaking = false; // 🔥 Release lock on failure
  
  return {
    success: false,
    error: 'All TTS layers failed',
    text
  };
}

// ============================================
// LAYER 1: DEEPGRAM AURA TTS (PRIMARY)
// ============================================

async function callDeepgramTTS(text, voice = 'aura-asteria-en', audioPath) {
  // Use Worker for generation and R2 caching
  try {
    console.log(`🎤 Deepgram TTS using voice: ${voice}, path: ${audioPath}`);
    const audioBlob = await generateAndCacheToR2(text, audioPath, voice);
    if (!audioBlob) throw new Error("Worker TTS returned null");
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error("Deepgram TTS Worker failed:", error.message);
    throw error;
  }
}

// ============================================
// LAYER 2: GOOGLE CLOUD TEXT-TO-SPEECH (BACKUP)
// ============================================

async function callGeminiTTS(text, mode, audioPath) {
  // Proxied through mcp-server - Google TTS key not in browser bundle
  // TODO: Migrate to Worker with audioPath once Worker supports Google TTS
  try {
    console.log(`🎤 Google TTS (backup), path: ${audioPath}`);
    const blob = await proxyGoogleTTS(text, {
      voice: mode === "pronunciation" ? "en-US-Standard-E" : "en-US-Studio-O",
      languageCode: "en-US"
    });
    if (!blob) throw new Error("Google TTS proxy returned null");
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Google TTS proxy failed:", error.message);
    throw error;
  }
}

// LAYER 3: OPENAI TTS
// ============================================

async function callOpenAITTS(text, audioPath) {
  // Proxied through mcp-server — key not in browser bundle
  // TODO: Migrate to Worker with audioPath once Worker supports OpenAI TTS
  console.log(`🎤 OpenAI TTS (backup), path: ${audioPath}`);
  const blob = await proxyTTS(text, {
    model: TTS_CONFIG.openai.model,
    voice: TTS_CONFIG.openai.voice,
    speed: TTS_CONFIG.openai.speed
  });
  if (!blob) throw new Error('OpenAI TTS proxy unavailable');
  return URL.createObjectURL(blob);
}

// ============================================
// LAYER 3: PUTER.JS TTS
// ============================================

async function callPuterTTS(text) {
  // TODO: Integrate Puter.js TTS when available
  // Placeholder implementation
  throw new Error('Puter.js TTS not yet implemented');
}

// ============================================
// LAYER 4: BROWSER SPEECH SYNTHESIS
// ============================================

async function callBrowserTTS(text) {
  if (!('speechSynthesis' in window)) {
    throw new Error('Browser Speech Synthesis not supported');
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Wait for voices to load
  let voices = window.speechSynthesis.getVoices();
  
  if (voices.length === 0) {
    // Wait for voices to be loaded
    await new Promise((resolve) => {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve();
      };
      // Timeout after 1 second
      setTimeout(resolve, 1000);
    });
    voices = window.speechSynthesis.getVoices();
  }

  // Create utterance
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Select best available voice
  const preferredVoices = [
    'Google US English',
    'Microsoft Zira',
    'Alex',
    'Samantha'
  ];
  
  let selectedVoice = voices.find(voice => 
    preferredVoices.some(pref => voice.name.includes(pref))
  );
  
  if (!selectedVoice) {
    selectedVoice = voices.find(voice => voice.lang.startsWith('en-US'));
  }
  
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  
  utterance.rate = TTS_CONFIG.browser.rate;
  utterance.pitch = TTS_CONFIG.browser.pitch;
  utterance.lang = 'en-US';
  
  // Play immediately and return when done
  return new Promise((resolve, reject) => {
    utterance.onend = () => {
      console.log('✅ Browser TTS completed');
      resolve('browser_synthesis_played'); // Identifier to show it played
    };
    
    utterance.onerror = (error) => {
      console.error('❌ Browser TTS error:', error);
      reject(new Error(`Browser TTS error: ${error.error}`));
    };
    
    console.log('🔊 Playing Browser TTS:', text.substring(0, 50) + '...');
    window.speechSynthesis.speak(utterance);
  });
}

// ============================================
// AUDIO PLAYBACK MANAGEMENT
// ============================================

/**
 * Play audio from URL or identifier
 * @param {string} audioUrlOrIdentifier - Audio URL or special identifier
 * @param {number} playbackSpeed - Playback speed (0.5 = half speed, 1.0 = normal, 2.0 = double speed)
 */
async function playAudio(audioUrlOrIdentifier, playbackSpeed = 1.0) {
  // Stop any currently playing audio
  stopAudio();

  if (audioUrlOrIdentifier === 'browser_synthesis_played') {
    // Already played via speechSynthesis (was played inline)
    console.log('✅ Browser TTS already played inline');
    isPlaying = true;
    return;
  }

  // Create and play audio element
  console.log('🔊 Playing audio from URL:', audioUrlOrIdentifier, `(${playbackSpeed}x speed)`);
  currentAudio = new Audio(audioUrlOrIdentifier);
  currentAudio.playbackRate = playbackSpeed; // 🎛️ Set playback speed
  isPlaying = true;

  // 🔥 Wrap playback in promise to catch load errors
  return new Promise((resolve, reject) => {
    currentAudio.onended = () => {
      console.log('✅ Audio playback ended');
      isPlaying = false;
      currentAudio = null;
      resolve();
    };

    currentAudio.onerror = (error) => {
      const errorMsg = currentAudio.error 
        ? `${currentAudio.error.code}: ${currentAudio.error.message}` 
        : 'Unknown audio load error';
      console.warn('⚠️ Audio load error:', errorMsg);
      isPlaying = false;
      currentAudio = null;
      // Reject promise so caller can handle (clear cache, retry, etc.)
      reject(new Error(`Audio load failed: ${errorMsg}`));
    };

    // 🔥 Proper error handling for play() to prevent AbortError
    const playPromise = currentAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Handle common play() interruption errors gracefully
        if (error.name === 'AbortError') {
          console.warn('🔊 Audio play() was interrupted (normal behavior)');
          resolve(); // Don't treat as error
        } else if (error.name === 'NotAllowedError') {
          console.warn('🔊 Audio play() not allowed by browser policy');
          reject(error);
        } else if (error.name === 'NotSupportedError') {
          console.error('🔊 Audio play() error - file corrupted or wrong format');
          reject(error);
        } else {
          console.error('🔊 Audio play() error:', error);
          reject(error);
        }
        isPlaying = false;
        currentAudio = null;
      });
    }
  });
}

/**
 * Stop currently playing audio
 */
export function stopAudio() {
  // 🔥 Properly handle audio cancellation to prevent AbortError
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0; // Reset position
      currentAudio.src = ''; // Clear source to prevent pending loads
      currentAudio = null;
    } catch (error) {
      console.warn('⚠️ Audio cleanup error (ignored):', error);
      currentAudio = null;
    }
  }
  
  // Cancel browser TTS with proper error handling
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (error) {
      console.warn('⚠️ SpeechSynthesis cancel error (ignored):', error);
    }
  }
  
  isPlaying = false;
  isSpeaking = false; // 🔥 Also reset the speaking lock
}

/**
 * Check if audio is currently playing
 */
export function isAudioPlaying() {
  return isPlaying;
}

/**
 * Clear audio cache
 */
export function clearAudioCache() {
  audioCache.clear();
}

/**
 * Get TTS engine status
 */
export function getTTSStatus() {
  return {
    layers: {
      gemini: TTS_CONFIG.gemini.enabled,
      openai: TTS_CONFIG.openai.enabled,
      puter: TTS_CONFIG.puter.enabled,
      browser: TTS_CONFIG.browser.enabled
    },
    cacheSize: audioCache.size,
    isPlaying
  };
}

// ============================================
// EXPORTS
// ============================================

export default {
  textToSpeech,
  stopAudio,
  isAudioPlaying,
  clearAudioCache,
  getTTSStatus,
  injectWavHeader, // PCM to WAV conversion for Google Cloud TTS
  encodeWAV // Alias for backward compatibility
};
