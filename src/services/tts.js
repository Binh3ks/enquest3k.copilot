/**
 * Runtime Text-to-Speech for Story Mission
 * Generates personalized audio on-the-fly using OpenAI TTS API or Web Speech API (free fallback)
 * 
 * WHY: Story Mission text contains placeholders ({{name}}, {{age}}, etc.)
 * that change per student, so pre-generated audio doesn't work.
 * 
 * LAYERS:
 * 1. OpenAI TTS API (premium quality, but costs money)
 * 2. Web Speech API (free, browser built-in, good for Vietnamese ESL learners)
 */

import { proxyTTS } from './aiProxy.js';
const TTS_MODEL = 'tts-1'; // or 'tts-1-hd' for higher quality
const DEFAULT_VOICE = 'shimmer'; // Clear, bright female voice for Vietnamese ESL learners

// Check if Web Speech API is available
const isWebSpeechAvailable = 'speechSynthesis' in window;

/**
 * Generate TTS audio using FREE Web Speech API (browser built-in)
 * @param {string} text - Text to speak
 * @param {object} options - Speech options
 * @returns {Promise<void>} Resolves when speech finishes
 */
export async function generateWebSpeech(text, options = {}) {
  if (!isWebSpeechAvailable) {
    console.warn('⚠️ Web Speech API not available in this browser');
    return null;
  }

  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Use English voice (best for ESL)
    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en-')) || voices[0];
    
    utterance.voice = englishVoice;
    utterance.rate = options.speed || 0.9; // Slightly slower for learners
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 1.0;
    
    utterance.onend = () => resolve();
    utterance.onerror = (error) => reject(error);
    
    speechSynthesis.speak(utterance);
  });
}

/**
 * Generate TTS audio from text using OpenAI API (PREMIUM)
 * @param {string} text - Text to convert to speech (with placeholders already replaced)
 * @param {object} options - TTS options
 * @param {string} options.voice - Voice to use (nova, alloy, echo, fable, onyx, shimmer)
 * @param {string} options.model - TTS model (tts-1 or tts-1-hd)
 * @param {number} options.speed - Speed of speech (0.25 to 4.0, default 1.0)
 * @returns {Promise<Blob>} Audio blob ready to play
 */
export async function generateTTS(text, options = {}) {
  const {
    voice = DEFAULT_VOICE,
    model = TTS_MODEL,
    speed = 1.0,
    useFree = false // Set to true to use Web Speech instead
  } = options;

  // 🆓 FREE OPTION: Use Web Speech API if requested
  if (useFree) {
    console.log('🔊 Using FREE Web Speech API (browser built-in)');
    return generateWebSpeech(text, { speed });
  }

  // 💰 PREMIUM: OpenAI TTS via backend proxy (key secured in mcp-server)
  try {
    const blob = await proxyTTS(text, { voice, model, speed });
    if (blob) return blob;

    // If proxy returns null (key missing / quota), fall back to Web Speech
    console.log('🔄 TTS proxy unavailable, falling back to Web Speech');
    return generateWebSpeech(text, { speed });
  } catch (err) {
    console.warn('OpenAI TTS proxy error:', err.message);
    return generateWebSpeech(text, { speed });
  }
}
  } catch (error) {
    console.error('TTS generation failed:', error);
    
    // Fallback to free Web Speech
    console.log('🔄 Falling back to FREE Web Speech API');
    return generateWebSpeech(text, { speed });
  }
}

/**
 * Replace placeholders in text with actual student context
 * @param {string} text - Text with placeholders ({{name}}, {{age}}, etc.)
 * @param {object} context - Student context
 * @returns {string} Personalized text
 */
export function replacePlaceholders(text, context) {
  return text
    // Support both lowercase and uppercase placeholders
    .replace(/\{\{name\}\}/gi, context.name || 'Student')
    .replace(/\{\{age\}\}/gi, context.age || '10')
    .replace(/\{\{teacherName\}\}/gi, context.teacherName || 'your teacher')
    .replace(/\{\{subject\}\}/gi, context.subject || 'English')
    .replace(/\{\{favoritePlace\}\}/gi, context.favoritePlace || 'that place')
    .replace(/\{\{friendName\}\}/gi, context.friendName || 'your friend')
    .replace(/\{\{activity\}\}/gi, context.activity || 'play')
    .replace(/\{\{object\}\}/gi, context.object || 'that');
}

/**
 * Prepare text for TTS by replacing blank patterns with natural pauses
 * @param {string} text - Text that may contain ___ blanks
 * @returns {string} TTS-optimized text
 */
export function prepareTTSText(text) {
  return text
    // Replace triple underscore with pause (dot dot dot)
    .replace(/___/g, '...')
    // Clean up any remaining underscores  
    .replace(/_+/g, '...');
}

/**
 * Generate and play TTS audio for Story Mission turn
 * @param {string} text - Text with placeholders
 * @param {object} context - Student context
 * @param {HTMLAudioElement} audioRef - Audio element reference
 * @returns {Promise<boolean>} Success status
 */
export async function playStoryMissionAudio(text, context, audioRef) {
  try {
    // 1. Replace placeholders
    const personalizedText = replacePlaceholders(text, context);
    
    // 2. Prepare text for TTS (handle underscores)
    const ttsText = prepareTTSText(personalizedText);
    
    // 3. Generate TTS audio
    const audioBlob = await generateTTS(ttsText, {
      voice: 'nova',
      model: 'tts-1',
      speed: 1.0
    });

    if (!audioBlob) {
      console.warn('TTS generation failed, falling back to text-only mode');
      return false;
    }

    // 4. Play audio
    const audioUrl = URL.createObjectURL(audioBlob);
    audioRef.src = audioUrl;
    
    await new Promise((resolve, reject) => {
      audioRef.onended = resolve;
      audioRef.onerror = reject;
      audioRef.play().catch(reject);
    });

    // 5. Cleanup
    URL.revokeObjectURL(audioUrl);
    
    return true;
  } catch (error) {
    console.error('Audio playback failed:', error);
    return false;
  }
}

/**
 * Cache for common phrases (optional optimization)
 * Reduces TTS API calls by ~30%
 */
const PHRASE_CACHE = new Map();

/**
 * Generate TTS with caching for common phrases
 * @param {string} text - Text to convert
 * @param {object} options - TTS options
 * @returns {Promise<Blob>} Audio blob
 */
export async function generateTTSWithCache(text, options = {}) {
  // Check cache first
  const cacheKey = `${text}-${options.voice || DEFAULT_VOICE}-${options.speed || 1.0}`;
  
  if (PHRASE_CACHE.has(cacheKey)) {
    console.log('🎵 Using cached TTS audio');
    return PHRASE_CACHE.get(cacheKey);
  }

  // Generate new TTS
  const audioBlob = await generateTTS(text, options);
  
  if (audioBlob) {
    // Cache for future use (limit cache size to 50 entries)
    if (PHRASE_CACHE.size >= 50) {
      const firstKey = PHRASE_CACHE.keys().next().value;
      PHRASE_CACHE.delete(firstKey);
    }
    PHRASE_CACHE.set(cacheKey, audioBlob);
  }

  return audioBlob;
}

/**
 * Pre-cache common Story Mission phrases at app startup
 */
export async function preCacheCommonPhrases() {
  const commonPhrases = [
    "What's your name?",
    "How old are you?",
    "What's your teacher's name?",
    "What's your favorite subject?",
    "Great job!",
    "Try again!",
    "You're doing awesome!",
    "Let's keep going!"
  ];

  console.log('🎵 Pre-caching common TTS phrases...');
  
  const promises = commonPhrases.map(phrase => 
    generateTTSWithCache(phrase, { voice: 'nova' })
  );

  await Promise.all(promises);
  
  console.log(`✅ Cached ${commonPhrases.length} common phrases`);
}

/**
 * Estimate TTS cost for a mission
 * @param {object} mission - Mission data
 * @returns {number} Estimated cost in USD
 */
export function estimateTTSCost(mission) {
  const totalChars = mission.steps.reduce((sum, step) => {
    return sum + (step.aiPrompt?.length || 0);
  }, 0);

  // OpenAI TTS pricing: $15 per 1M characters
  const costPer1MChars = 15;
  const estimatedCost = (totalChars / 1_000_000) * costPer1MChars;

  return estimatedCost;
}

/**
 * Get TTS analytics
 * @returns {object} TTS usage stats
 */
export function getTTSAnalytics() {
  return {
    cacheSize: PHRASE_CACHE.size,
    cacheHitRate: (PHRASE_CACHE.size > 0) 
      ? ((PHRASE_CACHE.size / (PHRASE_CACHE.size + 1)) * 100).toFixed(1) + '%'
      : '0%'
  };
}
