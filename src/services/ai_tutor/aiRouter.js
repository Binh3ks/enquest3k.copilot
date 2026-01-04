/**
 * AI Router - Multi-Provider AI Content Engine
 * 
 * Priority routing system:
 * 1. Groq (Llama-3) - Ultra-fast responses
 * 2. Gemini 2.0 Flash - Fallback for large context or errors
 * 
 * Enforces JSON schema output for Ms. Nova V5
 */

import axios from 'axios';

// ============================================
// CONFIGURATION
// ============================================

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

// Provider configuration
const PROVIDERS = {
  groq: {
    name: 'Groq',
    model: 'llama-3.1-70b-versatile', // SPEC: Updated from 3.3 to 3.1 for faster responses
    maxTokens: 1024,
    temperature: 0.7,
    enabled: !!GROQ_API_KEY,
    description: 'Ultra-fast responses (< 500ms) for Free Talk'
  },
  gemini: {
    name: 'Gemini',
    model: 'gemini-2.0-flash-exp',
    maxTokens: 2048,
    temperature: 0.7,
    enabled: !!GEMINI_API_KEY,
    description: 'Fallback for Groq errors or complex Syllabus analysis'
  }
};

// ============================================
// MAIN ROUTER FUNCTION
// ============================================

/**
 * Send message to AI with automatic provider fallback
 * @param {Object} params - Request parameters
 * @param {string} params.systemPrompt - System instructions
 * @param {Array} params.chatHistory - [{role, content}]
 * @param {string} params.userMessage - Latest user input
 * @param {string} params.preferredProvider - 'groq' | 'gemini' | 'auto'
 * @returns {Promise<AIResponse>}
 */
export async function sendToAI({ 
  systemPrompt, 
  chatHistory = [], 
  userMessage,
  preferredProvider = 'auto'
}) {
  const startTime = Date.now();
  
  // Build messages array
  const messages = [
    { role: 'system', content: systemPrompt },
    ...chatHistory,
    { role: 'user', content: userMessage }
  ];

  // Auto-select provider based on availability
  if (preferredProvider === 'auto') {
    preferredProvider = PROVIDERS.groq.enabled ? 'groq' : 'gemini';
  }

  // Try primary provider
  try {
    if (preferredProvider === 'groq' && PROVIDERS.groq.enabled) {
      const response = await callGroq(messages);
      return {
        ...response,
        provider: 'groq',
        latency: Date.now() - startTime
      };
    } else if (preferredProvider === 'gemini' && PROVIDERS.gemini.enabled) {
      const response = await callGemini(messages);
      return {
        ...response,
        provider: 'gemini',
        latency: Date.now() - startTime
      };
    }
  } catch (primaryError) {
    console.warn(`Primary provider (${preferredProvider}) failed:`, primaryError.message);
    
    // Try fallback provider
    const fallbackProvider = preferredProvider === 'groq' ? 'gemini' : 'groq';
    
    try {
      if (fallbackProvider === 'gemini' && PROVIDERS.gemini.enabled) {
        const response = await callGemini(messages);
        return {
          ...response,
          provider: 'gemini',
          fallback: true,
          latency: Date.now() - startTime
        };
      } else if (fallbackProvider === 'groq' && PROVIDERS.groq.enabled) {
        const response = await callGroq(messages);
        return {
          ...response,
          provider: 'groq',
          fallback: true,
          latency: Date.now() - startTime
        };
      }
    } catch (fallbackError) {
      console.error('Fallback provider also failed:', fallbackError.message);
      throw new Error(`All AI providers failed. Primary: ${primaryError.message}, Fallback: ${fallbackError.message}`);
    }
  }

  throw new Error('No AI provider available');
}

// ============================================
// GROQ PROVIDER
// ============================================

async function callGroq(messages) {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key not configured');
  }

  const response = await axios.post(
    GROQ_ENDPOINT,
    {
      model: PROVIDERS.groq.model,
      messages: messages,
      temperature: PROVIDERS.groq.temperature,
      max_tokens: PROVIDERS.groq.maxTokens,
      response_format: { type: 'json_object' } // Enforce JSON output
    },
    {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 15000 // 15s timeout
    }
  );

  const content = response.data.choices[0]?.message?.content || '';
  
  // Parse JSON response
  try {
    const parsed = JSON.parse(content);
    return {
      ai_response: parsed.ai_response || content,
      pedagogy_note: parsed.pedagogy_note || '',
      suggested_hints: parsed.suggested_hints || [],
      raw: content
    };
  } catch (parseError) {
    // Fallback to plain text if JSON parsing fails
    return {
      ai_response: content,
      pedagogy_note: '',
      suggested_hints: [],
      raw: content
    };
  }
}

// ============================================
// GEMINI PROVIDER
// ============================================

async function callGemini(messages) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  // Convert OpenAI-style messages to Gemini format
  const geminiMessages = convertToGeminiFormat(messages);

  const response = await axios.post(
    `${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`,
    {
      contents: geminiMessages,
      generationConfig: {
        temperature: PROVIDERS.gemini.temperature,
        maxOutputTokens: PROVIDERS.gemini.maxTokens,
        responseMimeType: 'application/json' // Enforce JSON output
      }
    },
    {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 20000 // 20s timeout (Gemini can be slower)
    }
  );

  const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  // Parse JSON response
  try {
    const parsed = JSON.parse(content);
    return {
      ai_response: parsed.ai_response || content,
      pedagogy_note: parsed.pedagogy_note || '',
      suggested_hints: parsed.suggested_hints || [],
      raw: content
    };
  } catch (parseError) {
    return {
      ai_response: content,
      pedagogy_note: '',
      suggested_hints: [],
      raw: content
    };
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Convert OpenAI-style messages to Gemini format
 */
function convertToGeminiFormat(messages) {
  const geminiMessages = [];
  let systemPrompt = '';

  messages.forEach((msg) => {
    if (msg.role === 'system') {
      systemPrompt = msg.content;
    } else if (msg.role === 'user') {
      geminiMessages.push({
        role: 'user',
        parts: [{ text: systemPrompt ? `${systemPrompt}\n\n${msg.content}` : msg.content }]
      });
      systemPrompt = ''; // Only include system prompt once
    } else if (msg.role === 'assistant') {
      geminiMessages.push({
        role: 'model',
        parts: [{ text: msg.content }]
      });
    }
  });

  return geminiMessages;
}

/**
 * Get provider status
 */
export function getProviderStatus() {
  return {
    groq: {
      available: PROVIDERS.groq.enabled,
      name: PROVIDERS.groq.name,
      model: PROVIDERS.groq.model
    },
    gemini: {
      available: PROVIDERS.gemini.enabled,
      name: PROVIDERS.gemini.name,
      model: PROVIDERS.gemini.model
    }
  };
}

/**
 * Test provider connectivity
 */
export async function testProvider(provider = 'groq') {
  try {
    const testMessages = [
      { role: 'system', content: 'You are a test assistant. Respond with JSON: {"status": "ok"}' },
      { role: 'user', content: 'Test' }
    ];

    if (provider === 'groq') {
      await callGroq(testMessages);
    } else if (provider === 'gemini') {
      await callGemini(testMessages);
    }

    return { success: true, provider };
  } catch (error) {
    return { success: false, provider, error: error.message };
  }
}

// ============================================
// EXPORTS
// ============================================

export default {
  sendToAI,
  getProviderStatus,
  testProvider
};
