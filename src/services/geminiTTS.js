/**
 * Gemini TTS Service
 * Uses Google Cloud Text-to-Speech via Gemini API
 * Fallback chain: Gemini TTS → Puter TTS → Browser TTS
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GOOGLE_CLOUD_TTS_ENDPOINT = 'https://texttospeech.googleapis.com/v1/text:synthesize';

/**
 * Convert plain text to SSML with natural prosody (pauses, emphasis, intonation)
 * Makes Ms. Nova sound more human-like and engaging
 * @param {string} text - Plain text
 * @returns {string} SSML markup
 */
function convertToSSML(text) {
  let ssml = text;

  // 1. Add emphasis on important words (Great, Nice, Wow, Amazing, etc.)
  ssml = ssml.replace(/\b(Great|Nice|Wow|Amazing|Excellent|Perfect|Good|Cool)\b/gi, '<emphasis level="strong">$1</emphasis>');

  // 2. Add pauses after punctuation for natural rhythm
  ssml = ssml.replace(/([.!])\s+/g, '$1<break time="500ms"/> '); // Medium pause after sentences
  ssml = ssml.replace(/([?])\s+/g, '$1<break time="400ms"/> '); // Shorter pause after questions
  ssml = ssml.replace(/,\s+/g, ',<break time="250ms"/> '); // Short pause after commas

  // 3. Add prosody for questions (raise pitch at end)
  ssml = ssml.replace(/([^.!?]*\?)/g, '<prosody pitch="+10%">$1</prosody>');

  // 4. Add excitement to exclamations
  ssml = ssml.replace(/([^.!?]*!)/g, '<prosody rate="110%" pitch="+5%">$1</prosody>');

  // 5. Wrap in SSML speak tag
  return `<speak>${ssml}</speak>`;
}

/**
 * Generate TTS using Google Cloud Text-to-Speech
 * @param {string} text - Text to convert to speech
 * @param {object} options - TTS options
 * @returns {Promise<Blob|null>} Audio blob or null if failed
 */
async function generateGeminiTTS(text, options = {}) {
  const {
    languageCode = 'en-US',
    voiceName = 'en-US-Wavenet-H', // Premium quality, energetic young female - bright and engaging
    speakingRate = 1.1, // Slightly faster for more energy
    pitch = 1.5 // Youthful, clear tone
  } = options;

  // Convert plain text to SSML with natural prosody
  const ssml = convertToSSML(text);

  try {
    const response = await fetch(`${GOOGLE_CLOUD_TTS_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: { ssml }, // Use SSML instead of plain text
        voice: {
          languageCode,
          name: voiceName
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate,
          pitch
        }
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.warn('[Gemini TTS] API error:', error.error?.message || response.statusText);
      return null;
    }

    const data = await response.json();
    const audioContent = data.audioContent;
    
    // Convert base64 to blob
    const audioData = atob(audioContent);
    const audioArray = new Uint8Array(audioData.length);
    for (let i = 0; i < audioData.length; i++) {
      audioArray[i] = audioData.charCodeAt(i);
    }
    
    return new Blob([audioArray], { type: 'audio/mpeg' });
  } catch (error) {
    console.error('[Gemini TTS] Generation failed:', error);
    return null;
  }
}

/**
 * Generate TTS using Puter.com API
 * @param {string} text - Text to convert
 * @returns {Promise<Blob|null>} Audio blob or null
 */
async function generatePuterTTS(text) {
  try {
    // Puter.com provides free TTS service
    const response = await fetch('https://api.puter.com/v1/ai/txt2speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        voice: 'female',
        language: 'en-US',
        rate: 1.0
      })
    });

    if (!response.ok) {
      console.warn('[Puter TTS] API error:', response.statusText);
      return null;
    }

    const audioBlob = await response.blob();
    return audioBlob;
  } catch (error) {
    console.error('[Puter TTS] Generation failed:', error);
    return null;
  }
}

/**
 * Generate TTS using browser's built-in speech synthesis (final fallback)
 * @param {string} text - Text to speak
 * @returns {Promise<boolean>} Success status
 */
async function generateBrowserTTS(text) {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) {
      console.warn('[Browser TTS] Not supported');
      resolve(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    
    // Try to use a female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Google'))
    );
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onend = () => resolve(true);
    utterance.onerror = () => resolve(false);
    
    window.speechSynthesis.speak(utterance);
  });
}

/**
 * Main TTS function with fallback chain
 * Priority: Gemini TTS → Puter TTS → Browser TTS
 * 
 * @param {string} text - Text to convert to speech
 * @param {object} options - TTS options
 * @param {number} options.speed - Speaking rate (0.5 to 2.0)
 * @returns {Promise<{audioBlob: Blob|null, provider: string}>}
 */
export async function generateTTS(text, options = {}) {
  const { speed = 1.0 } = options;
  
  console.log('[TTS] Generating audio for:', text.substring(0, 50) + '...');
  
  // 1. Try Gemini TTS (best quality)
  if (GEMINI_API_KEY) {
    console.log('[TTS] Trying Gemini TTS...');
    const audioBlob = await generateGeminiTTS(text, { speakingRate: speed });
    if (audioBlob) {
      console.log('[TTS] ✅ Gemini TTS succeeded');
      return { audioBlob, provider: 'Gemini TTS' };
    }
  }

  // 2. Try Puter TTS (free fallback)
  console.log('[TTS] Trying Puter TTS...');
  const puterBlob = await generatePuterTTS(text);
  if (puterBlob) {
    console.log('[TTS] ✅ Puter TTS succeeded');
    return { audioBlob: puterBlob, provider: 'Puter TTS' };
  }

  // 3. Use Browser TTS (always works)
  console.log('[TTS] Using Browser TTS (final fallback)');
  await generateBrowserTTS(text);
  return { audioBlob: null, provider: 'Browser TTS' };
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
