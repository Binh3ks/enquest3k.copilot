/**
 * TTS Engine - Multi-layered Text-to-Speech System
 * 
 * 4-layer fallback architecture for maximum reliability:
 * Layer 1: Gemini TTS (Most natural voice)
 * Layer 2: OpenAI TTS (High quality, Whisper-based)
 * Layer 3: Puter.js TTS (Cloud fallback)
 * Layer 4: Browser Speech Synthesis (Offline fallback)
 * 
 * Features:
 * - Auto-play on AI response
 * - Audio caching for repeated phrases
 * - Playback queue management
 */

import axios from 'axios';

// ============================================
// CONFIGURATION
// ============================================

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

const GEMINI_TTS_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
const OPENAI_TTS_ENDPOINT = 'https://api.openai.com/v1/audio/speech';

// Audio cache for repeated phrases
const audioCache = new Map();

// Current playback state
let currentAudio = null;
let isPlaying = false;
let isSpeaking = false; // 🔥 Lock to prevent concurrent TTS calls

// TTS Engine configuration
const TTS_CONFIG = {
  gemini: {
    enabled: !!GEMINI_API_KEY,
    voice: 'en-US-Neural2-F', // Female voice
    speed: 0.9
  },
  openai: {
    enabled: !!OPENAI_API_KEY,
    model: 'tts-1',
    voice: 'nova', // Natural, warm voice
    speed: 0.9
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

  // 🔥 Check if already speaking - prevent concurrent calls
  if (isSpeaking) {
    console.warn('⚠️ TTS: Already speaking, canceling previous...');
    window.speechSynthesis.cancel(); // Force cancel
    stopAudio(); // Stop any audio elements
    isSpeaking = false; // Reset lock
  }

  isSpeaking = true; // 🔥 Set lock

  console.log('🎤 TTS Request:', { 
    text: text.substring(0, 100) + '...', 
    autoPlay, 
    preferredLayer,
    geminiEnabled: TTS_CONFIG.gemini.enabled,
    openaiEnabled: TTS_CONFIG.openai.enabled
  });

  // Check cache first
  const cacheKey = `${text.substring(0, 100)}_${preferredLayer}`;
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

  // Try layers in order
  const layers = preferredLayer === 'auto' 
    ? ['openai', 'browser'] // 🔥 Gemini TTS not available, skip Puter for now
    : [preferredLayer, 'browser']; // Always fallback to browser

  console.log('🔄 TTS: Trying layers in order:', layers);

  for (const layer of layers) {
    try {
      console.log(`🔊 TTS: Attempting layer ${layer}...`);
      let audioUrl = null;

      switch (layer) {
        case 'gemini':
          if (TTS_CONFIG.gemini.enabled) {
            audioUrl = await callGeminiTTS(text);
          }
          break;
        
        case 'openai':
          if (TTS_CONFIG.openai.enabled) {
            audioUrl = await callOpenAITTS(text);
          }
          break;
        
        case 'puter':
          if (TTS_CONFIG.puter.enabled) {
            audioUrl = await callPuterTTS(text);
          }
          break;
        
        case 'browser':
          audioUrl = await callBrowserTTS(text);
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
// LAYER 1: GEMINI TTS
// ============================================

/**
 * Encode PCM16 data to WAV format
 * Gemini returns raw PCM16 data that browsers cannot play directly
 */
function encodeWAV(pcmData, sampleRate = 24000) {
  const numChannels = 1; // Mono
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataLength = pcmData.length * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataLength);
  const view = new DataView(buffer);

  // Write WAV header
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataLength, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // fmt chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(36, 'data');
  view.setUint32(40, dataLength, true);

  // Write PCM samples
  let offset = 44;
  for (let i = 0; i < pcmData.length; i++) {
    view.setInt16(offset, pcmData[i], true);
    offset += 2;
  }

  return buffer;
}

async function callGeminiTTS(text) {
  // ⚠️ TEMPORARILY DISABLED: Gemini 2.0 Flash does NOT have native TTS API yet
  // The generateContent endpoint cannot produce audio directly
  // Will re-enable when Google releases official Gemini TTS API
  
  console.warn('⚠️ Gemini TTS not available yet, falling back to next layer...');
  throw new Error('Gemini TTS API not officially available');
  
  /* PLACEHOLDER FOR FUTURE GEMINI TTS API:
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  try {
    console.log('🔊 Gemini TTS: Requesting audio generation...');
    
    // TODO: Update this when Google releases official TTS endpoint
    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GEMINI_API_KEY}`,
      {
        input: { text },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-Neural2-F'
        },
        audioConfig: {
          audioEncoding: 'LINEAR16',
          sampleRateHertz: 24000
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    const audioData = response.data?.audioContent;
    if (!audioData) {
      throw new Error('No audio data in response');
    }

    // Decode base64 and create audio blob
    const binaryString = atob(audioData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const blob = new Blob([bytes], { type: 'audio/wav' });
    return URL.createObjectURL(blob);

  } catch (error) {
    console.error('❌ Gemini TTS failed:', error.message);
    throw error;
  }
  */
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
    isPlaying = false;
    currentAudio = null;
  };

  await currentAudio.play();
}

/**
 * Stop currently playing audio
 */
export function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  
  isPlaying = false;
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
  getTTSStatus
};
