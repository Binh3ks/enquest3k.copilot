/**
 * aiProxy.js — Frontend ↔ Backend AI Bridge
 *
 * ALL calls to LLM providers (Gemini, Groq, Cerebras, Together) go through
 * the mcp-server backend (/api/ai/generate). API keys are NEVER in the browser
 * bundle. This file replaces all direct VITE_*_API_KEY usage for AI calls.
 *
 * Only safe public values stay as VITE_ vars:
 *   VITE_API_URL   — backend base URL (not a secret)
 *   VITE_CDN_URL   — Cloudflare R2 CDN URL (not a secret)
 *   VITE_EDGE_TTS_URL — Kokoro HF Space URL (not a secret)
 *   VITE_TTS_WORKER_URL — CF Worker URL (not a secret)
 */

import { useUserStore } from '../stores/useUserStore';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

/**
 * Build auth headers from Zustand store token
 */
function getAuthHeaders() {
  const token = useUserStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * generateConversation — Replaces callCerebras / callGroq / callGemini / callTogether
 *
 * Sends the full OpenAI-compatible messages array to the backend, which runs
 * its own provider failover (Cerebras → Groq → Together → Gemini).
 *
 * @param {Array}  messages - [{role: 'system'|'user'|'assistant'|'model', content: string}]
 * @returns {Promise<{ai_response, pedagogy_note, suggested_hints, raw, provider}>}
 */
export async function generateConversation(messages) {
  const response = await fetch(`${API_BASE}/ai/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const errBody = await response.text().catch(() => '');
    throw new Error(`AI proxy ${response.status}: ${errBody}`);
  }

  const data = await response.json();
  const content = data.text || '';

  // Parse the JSON string returned by the AI
  try {
    const parsed = JSON.parse(content);
    const aiResponse = parsed.ai_response || parsed.response || content;
    if (!aiResponse || aiResponse.length < 3) throw new Error('Response too short');
    return {
      ai_response: aiResponse,
      pedagogy_note: parsed.pedagogy_note || '',
      suggested_hints: parsed.suggested_hints || [],
      raw: content,
      provider: data.provider || 'backend',
    };
  } catch {
    // Non-JSON or parse failure — return as-is
    let clean = content.replace(/```json|```/g, '').trim();
    if (clean.length > 3 && !clean.includes('?')) clean += ' What about you?';
    return {
      ai_response: clean || 'Good! Tell me more.',
      pedagogy_note: 'parse-fallback',
      suggested_hints: [],
      raw: content,
      provider: data.provider || 'backend',
    };
  }
}

/**
 * generateText — Simple single-prompt call (replaces callGemini in aiProviders.js)
 *
 * @param {string} prompt
 * @returns {Promise<string>} The AI text response
 */
export async function generateText(prompt) {
  const result = await generateConversation([{ role: 'user', content: prompt }]);
  return result.ai_response;
}

/**
 * proxyTTS — Routes OpenAI TTS through the backend (/api/ai/tts)
 * Replaces direct VITE_OPENAI_API_KEY usage in tts.js + ttsEngine.js
 *
 * @param {string} text
 * @param {{voice?: string, model?: string, speed?: number}} options
 * @returns {Promise<Blob|null>} Audio MP3 blob, or null on failure
 */
export async function proxyTTS(text, options = {}) {
  try {
    const response = await fetch(`${API_BASE}/ai/tts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ text, ...options }),
    });

    if (!response.ok) return null;

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('audio')) {
      return await response.blob();
    }

    // Backend returns { audioError: true } when OpenAI key missing/quota
    return null;
  } catch (err) {
    console.warn('[aiProxy.proxyTTS] Error:', err.message);
    return null;
  }
}

/**
 * proxyGoogleTTS — Routes Google TTS through the backend (/api/ai/google-tts)
 * Replaces direct VITE_GOOGLE_TTS_API_KEY usage in voiceService.js
 *
 * @param {string} text
 * @param {{voice?: string, languageCode?: string}} options
 * @returns {Promise<Blob|null>}
 */
export async function proxyGoogleTTS(text, options = {}) {
  try {
    const response = await fetch(`${API_BASE}/ai/google-tts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ text, ...options }),
    });

    if (response.ok) {
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('audio')) return await response.blob();
    }
    return null;
  } catch (err) {
    console.warn('[aiProxy.proxyGoogleTTS] Error:', err.message);
    return null;
  }
}

/**
 * proxyDeepgramTTS — Routes Deepgram Aura TTS through the backend (/api/ai/deepgram-tts)
 * High quality, cost-effective alternative to Google TTS
 *
 * @param {string} text
 * @param {{voice?: string}} options - voice model (default: aura-asteria-en)
 * @returns {Promise<Blob|null>}
 */
export async function proxyDeepgramTTS(text, options = {}) {
  try {
    const response = await fetch(`${API_BASE}/ai/deepgram-tts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ text, voice: options.voice || 'aura-asteria-en' }),
    });

    if (response.ok) {
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('audio')) {
        return await response.blob();
      }
    }
    return null;
  } catch (err) {
    console.warn('[aiProxy.proxyDeepgramTTS] Error:', err.message);
    return null;
  }
}

