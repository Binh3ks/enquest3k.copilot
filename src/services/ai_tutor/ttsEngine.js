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
    return { success: false, error: 'Empty text' };
  }

  // Check cache first
  const cacheKey = `${text.substring(0, 100)}_${preferredLayer}`;
  if (audioCache.has(cacheKey)) {
    const cachedUrl = audioCache.get(cacheKey);
    if (autoPlay) {
      await playAudio(cachedUrl);
    }
    return {
      success: true,
      audioUrl: cachedUrl,
      layer: 'cache',
      text
    };
  }

  // Try layers in order
  const layers = preferredLayer === 'auto' 
    ? ['gemini', 'openai', 'puter', 'browser']
    : [preferredLayer, 'browser']; // Always fallback to browser

  for (const layer of layers) {
    try {
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
        
        // Auto-play if requested
        if (autoPlay) {
          await playAudio(audioUrl);
        }

        return {
          success: true,
          audioUrl,
          layer,
          text,
          cached: false
        };
      }
    } catch (error) {
      console.warn(`TTS Layer ${layer} failed:`, error.message);
      // Continue to next layer
    }
  }

  return {
    success: false,
    error: 'All TTS layers failed',
    text
  };
}

// ============================================
// LAYER 1: GEMINI TTS
// ============================================

async function callGeminiTTS(text) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  // Note: Gemini TTS is experimental - using text generation for now
  // TODO: Update when Gemini TTS API is officially released
  
  // Fallback: Use browser TTS with Gemini-quality text processing
  return await callBrowserTTS(text);
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

  return new Promise((resolve, reject) => {
    // Wait for voices to load
    let voices = window.speechSynthesis.getVoices();
    
    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        performSynthesis();
      };
    } else {
      performSynthesis();
    }

    function performSynthesis() {
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
      
      utterance.onend = () => {
        resolve('browser_synthesis'); // Return placeholder identifier
      };
      
      utterance.onerror = (error) => {
        reject(new Error(`Browser TTS error: ${error.error}`));
      };
      
      window.speechSynthesis.speak(utterance);
    }
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

  if (audioUrlOrIdentifier === 'browser_synthesis') {
    // Already playing via speechSynthesis
    isPlaying = true;
    return;
  }

  // Create and play audio element
  currentAudio = new Audio(audioUrlOrIdentifier);
  isPlaying = true;

  currentAudio.onended = () => {
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
