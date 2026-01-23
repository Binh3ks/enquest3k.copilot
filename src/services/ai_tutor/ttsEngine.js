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

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const GOOGLE_TTS_API_KEY = 'AIzaSyAtggk9xPlVt-P34qtSSFqKRx5lJkCO8gU'; // Google Cloud Text-to-Speech API

const GOOGLE_TTS_ENDPOINT = 'https://texttospeech.googleapis.com/v1/text:synthesize';
const OPENAI_TTS_ENDPOINT = 'https://api.openai.com/v1/audio/speech';

// Audio cache for repeated phrases
const audioCache = new Map();

// Current playback state
let currentAudio = null;
let isPlaying = false;
let isSpeaking = false; // 🔥 Lock to prevent concurrent TTS calls
let lastTTSCall = 0; // 🔥 Debounce timestamp

const TTS_DEBOUNCE_DELAY = 500; // 500ms minimum between TTS calls

// TTS Engine configuration
const TTS_CONFIG = {
  gemini: {
    enabled: true, // 🔥 Using Google Cloud Text-to-Speech
    voice: 'en-US-Studio-O', // 🎙️ Studio quality, energetic female voice (clearer than Neural2-F)
    speed: 0.85 // 🎓 Slower for ESL learners (user requested)
  },
  openai: {
    enabled: !!OPENAI_API_KEY,
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
 * @returns {Promise<AudioResponse>}
 */
export async function textToSpeech(text, { autoPlay = true, preferredLayer = 'auto' } = {}) {
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
    geminiEnabled: TTS_CONFIG.gemini.enabled,
    openaiEnabled: TTS_CONFIG.openai.enabled
  });

  // Check cache first (use cleaned text for cache key)
  const cacheKey = `${cleanedText.substring(0, 100)}_${preferredLayer}`;
  if (audioCache.has(cacheKey)) {
    console.log('✅ TTS: Using cached audio');
    const cachedUrl = audioCache.get(cacheKey);
    if (autoPlay) {
      await playAudio(cachedUrl);
    }
    isSpeaking = false; // 🔥 Release lock for cached audio
    return {
      success: true,
      audioUrl: cachedUrl,
      layer: 'cache',
      text
    };
  }

  // Try layers in order (Google Cloud TTS → OpenAI → Puter → Browser)
  const layers = preferredLayer === 'auto'
    ? ['gemini', 'openai', 'puter', 'browser'] // 🔥 Full fallback chain
    : [preferredLayer, 'browser']; // Always fallback to browser

  console.log('🔄 TTS: Trying layers in order:', layers);

  for (const layer of layers) {
    try {
      console.log(`🔊 TTS: Attempting layer ${layer}...`);
      let audioUrl = null;

      switch (layer) {
        case 'gemini':
          if (TTS_CONFIG.gemini.enabled) {
            audioUrl = await callGeminiTTS(cleanedText); // 🧹 Use cleaned text
          }
          break;
        
        case 'openai':
          if (TTS_CONFIG.openai.enabled) {
            audioUrl = await callOpenAITTS(cleanedText); // 🧹 Use cleaned text
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
        // Cache the result
        audioCache.set(cacheKey, audioUrl);
        
        console.log(`✅ TTS: ${layer} successful!`);
        
        // Auto-play if requested
        if (autoPlay) {
          await playAudio(audioUrl);
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
// LAYER 1: GOOGLE CLOUD TEXT-TO-SPEECH
// ============================================

async function callGeminiTTS(text) {
  if (!GOOGLE_TTS_API_KEY) {
    throw new Error('Google TTS API key not configured');
  }

  try {
    console.log('🔊 Google Cloud TTS: Requesting LINEAR16 (PCM) audio generation...');

    const response = await axios.post(
      `${GOOGLE_TTS_ENDPOINT}?key=${GOOGLE_TTS_API_KEY}`,
      {
        input: { text },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-Studio-O', // 🎙️ Studio quality - energetic, clear female voice
          ssmlGender: 'FEMALE'
        },
        audioConfig: {
          audioEncoding: 'LINEAR16', // 🔥 PCM16 format (requires WAV header)
          sampleRateHertz: 24000, // 24kHz sample rate
          speakingRate: 0.8, // 🎓 Slower speed for clearer pronunciation (user requested 0.8x)
          pitch: 0.5, // ⚡ Reduced pitch (high pitch slows down encoding)
          volumeGainDb: 0
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    const audioContent = response.data?.audioContent;
    if (!audioContent) {
      throw new Error('No audio data in Google TTS response');
    }

    console.log('✅ Google Cloud TTS: Received PCM16 data, injecting WAV header...');

    // Decode base64 to raw PCM buffer
    const binaryString = atob(audioContent);
    const pcmBuffer = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      pcmBuffer[i] = binaryString.charCodeAt(i);
    }

    // 🔥 Inject WAV header for browser playback
    const wavBlob = injectWavHeader(pcmBuffer, 24000);
    const audioUrl = URL.createObjectURL(wavBlob);

    console.log('✅ Google Cloud TTS: WAV audio ready for immediate playback');
    return audioUrl;

  } catch (error) {
    console.error('❌ Google Cloud TTS failed:', error.message);
    throw error;
  }
}

// ============================================
// LAYER 2: OPENAI TTS
// ============================================

async function callOpenAITTS(text) {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await axios.post(
    OPENAI_TTS_ENDPOINT,
    {
      model: TTS_CONFIG.openai.model,
      input: text,
      voice: TTS_CONFIG.openai.voice,
      speed: TTS_CONFIG.openai.speed
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer',
      timeout: 30000
    }
  );

  // Convert arraybuffer to blob URL
  const blob = new Blob([response.data], { type: 'audio/mpeg' });
  const audioUrl = URL.createObjectURL(blob);
  
  return audioUrl;
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
 */
async function playAudio(audioUrlOrIdentifier) {
  // Stop any currently playing audio
  stopAudio();

  if (audioUrlOrIdentifier === 'browser_synthesis_played') {
    // Already played via speechSynthesis (was played inline)
    console.log('✅ Browser TTS already played inline');
    isPlaying = true;
    return;
  }

  // Create and play audio element
  console.log('🔊 Playing audio from URL:', audioUrlOrIdentifier);
  currentAudio = new Audio(audioUrlOrIdentifier);
  isPlaying = true;

  currentAudio.onended = () => {
    console.log('✅ Audio playback ended');
    isPlaying = false;
    currentAudio = null;
  };

  currentAudio.onerror = () => {
    console.warn('⚠️ Audio error (cleaned up)');
    isPlaying = false;
    currentAudio = null;
  };

  // 🔥 Proper error handling for play() to prevent AbortError
  try {
    const playPromise = currentAudio.play();
    if (playPromise !== undefined) {
      await playPromise.catch(error => {
        // Handle common play() interruption errors gracefully
        if (error.name === 'AbortError') {
          console.warn('🔊 Audio play() was interrupted (normal behavior)');
        } else if (error.name === 'NotAllowedError') {
          console.warn('🔊 Audio play() not allowed by browser policy');
        } else {
          console.error('🔊 Audio play() error:', error);
        }
        isPlaying = false;
        currentAudio = null;
      });
    }
  } catch (error) {
    console.error('🔊 Audio play() setup error:', error);
    isPlaying = false;
    currentAudio = null;
  }
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
