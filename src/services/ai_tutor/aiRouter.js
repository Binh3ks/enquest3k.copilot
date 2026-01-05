/**
 * AI Router - Multi-Layer LLM Switching Engine
 *
 * SMART PRIORITY SYSTEM:
 * Layer 1: Groq (llama-3.3-70b-versatile) - Ultra-fast (< 500ms)
 * Layer 2: Gemini 2.0 Flash - Auto-fallback on errors (400/429/500)
 *
 * V5 PEDAGOGICAL GUARDRAILS:
 * - Grammar Guard: Validates AI responses against week grammar scope
 * - Talk Ratio Guard: Enforces AI:Student word ratio ≤ 0.8
 * - Auto-regeneration: If violations detected, retry with stricter instruction
 * - Deterministic fallback: Safe responses on persistent errors
 *
 * CRITICAL FIXES:
 * - Groq: Try first for speed
 * - Gemini: Auto-fallback on Groq errors (rate limit, server errors)
 * - JSON: Enforce strict format (no markdown, no backticks)
 * - Roles: Only 'user'/'model' for Gemini (prevents 400 errors)
 */

import axios from 'axios';
import { validateAIResponse, getRegenerationInstruction, getGrammarSummary } from './grammarGuard.js';
import { enforceTalkRatio, getConciseInstruction, getTalkRatioSummary } from './talkRatioGuard.js';

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
    model: 'llama-3.3-70b-versatile', // 🔥 FIX: Updated model (3.1 deprecated)
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
 * Send message to AI with automatic provider fallback + Grammar Guard
 * @param {Object} params - Request parameters
 * @param {string} params.systemPrompt - System instructions
 * @param {Array} params.chatHistory - [{role, content}]
 * @param {string} params.userMessage - Latest user input
 * @param {string} params.preferredProvider - 'groq' | 'gemini' | 'auto'
 * @param {number} params.weekId - Current week (for grammar validation)
 * @param {boolean} params.skipGrammarGuard - Skip grammar validation (default: false)
 * @returns {Promise<AIResponse>}
 */
export async function sendToAI({ 
  systemPrompt, 
  chatHistory = [], 
  userMessage,
  preferredProvider = 'auto',
  weekId = 1,
  skipGrammarGuard = false
}) {
  const startTime = Date.now();
  const maxRetries = 2; // Max regeneration attempts
  let attempt = 0;
  
  // Enhance system prompt with grammar scope reminder
  const enhancedSystemPrompt = !skipGrammarGuard 
    ? `${systemPrompt}\n\n🎯 GRAMMAR SCOPE FOR THIS WEEK:\n${getGrammarSummary(weekId)}\n\nYOU MUST ONLY use the allowed grammar patterns above.`
    : systemPrompt;
  
  // Build messages array
  const messages = [
    { role: 'system', content: enhancedSystemPrompt },
    ...chatHistory,
    { role: 'user', content: userMessage }
  ];

  // Grammar Guard retry loop
  while (attempt < maxRetries) {
    attempt++;

    // Auto-select provider based on availability
    if (preferredProvider === 'auto') {
      preferredProvider = PROVIDERS.groq.enabled ? 'groq' : 'gemini';
    }

    // 🔥 LAYER 1: Try Groq first for speed
    if (preferredProvider === 'groq' && PROVIDERS.groq.enabled) {
      try {
        console.log(`🚀 Layer 1: Trying Groq (attempt ${attempt}/${maxRetries})...`);
        const response = await callGroq(messages);
        
        // 🛡️ GRAMMAR GUARD VALIDATION
        if (!skipGrammarGuard) {
          const validation = validateAIResponse(response, weekId);
          if (!validation.valid) {
            console.warn(`⚠️ Grammar violations detected (attempt ${attempt}):`, validation.violations);
            
            if (attempt < maxRetries) {
              // Regenerate with stricter instruction
              const regenInstruction = getRegenerationInstruction(validation.violations, weekId);
              messages.push({
                role: 'user',
                content: regenInstruction
              });
              console.log('🔄 Regenerating with stricter grammar instruction...');
              continue; // Retry loop
            } else {
              // Max retries exceeded - use deterministic fallback
              console.error('❌ Max retries exceeded. Using deterministic fallback.');
              return {
                ai_response: "I need to practice my grammar! Let's try that again. Can you tell me more?",
                pedagogy_note: 'Grammar guard blocked response after max retries',
                suggested_hints: ['Try using simple sentences', 'Use words we learned this week'],
                provider: 'fallback',
                grammarBlocked: true,
                violations: validation.violations,
                latency: Date.now() - startTime
              };
            }
          }
        }
        
        // 🎯 TALK RATIO GUARD VALIDATION
        const talkRatioResult = enforceTalkRatio(response.ai_response || response.response || '', userMessage);
        console.log(`📊 ${getTalkRatioSummary(talkRatioResult.details)}`);
        
        if (talkRatioResult.action === 'truncated') {
          // Response was automatically truncated
          console.warn(`✂️ Response truncated: ${talkRatioResult.details.originalWords} → ${talkRatioResult.details.truncatedWords} words`);
          response.ai_response = talkRatioResult.response;
          response.talkRatioEnforced = true;
          response.talkRatioAction = 'truncated';
        } else if (talkRatioResult.action === 'regenerate' && attempt < maxRetries) {
          // Ratio violated, need to regenerate
          console.warn(`⚠️ Talk ratio violation: ${talkRatioResult.details.ratio} (max: 0.8)`);
          const conciseInstruction = getConciseInstruction(
            talkRatioResult.details.ratio,
            talkRatioResult.details.aiWords,
            talkRatioResult.details.studentWords
          );
          messages.push({
            role: 'user',
            content: conciseInstruction
          });
          console.log('🔄 Regenerating with concise instruction...');
          continue; // Retry loop
        }
        
        console.log(`✅ Groq succeeded with valid grammar + talk ratio in ${Date.now() - startTime}ms`);
        return {
          ...response,
          provider: 'groq',
          latency: Date.now() - startTime,
          grammarValidated: !skipGrammarGuard
        };
      } catch (groqError) {
        const statusCode = groqError.response?.status;
        const errorMessage = groqError.message;

        // Check if error is 400, 429, or 500 (should fallback)
        if (statusCode === 400 || statusCode === 429 || statusCode === 500) {
          console.warn(`⚠️ Groq failed (${statusCode}): ${errorMessage}`);
          console.log('🔄 Auto-switching to Layer 2: Gemini 2.0 Flash...');

          // 🔥 LAYER 2: Fallback to Gemini
          if (PROVIDERS.gemini.enabled) {
            try {
              const response = await callGemini(messages);
              
              // 🛡️ GRAMMAR GUARD VALIDATION (Gemini)
              if (!skipGrammarGuard) {
                const validation = validateAIResponse(response, weekId);
                if (!validation.valid) {
                  console.warn(`⚠️ Gemini also produced grammar violations (attempt ${attempt}):`, validation.violations);
                  
                  if (attempt < maxRetries) {
                    const regenInstruction = getRegenerationInstruction(validation.violations, weekId);
                    messages.push({
                      role: 'user',
                      content: regenInstruction
                    });
                    preferredProvider = 'gemini'; // Continue with Gemini
                    console.log('🔄 Regenerating with Gemini...');
                    continue;
                  } else {
                    console.error('❌ Gemini max retries exceeded. Using fallback.');
                    return {
                      ai_response: "Let's keep it simple! Can you tell me more using the words we learned?",
                      pedagogy_note: 'Grammar guard blocked both providers',
                      suggested_hints: ['Use simple words', 'Try "I am..." or "I have..."'],
                      provider: 'fallback',
                      grammarBlocked: true,
                      violations: validation.violations,
                      latency: Date.now() - startTime
                    };
                  }
                }
              }
              
              // 🎯 TALK RATIO GUARD VALIDATION (Gemini)
              const talkRatioResult = enforceTalkRatio(response.ai_response || response.response || '', userMessage);
              console.log(`📊 ${getTalkRatioSummary(talkRatioResult.details)}`);
              
              if (talkRatioResult.action === 'truncated') {
                console.warn(`✂️ Gemini response truncated: ${talkRatioResult.details.originalWords} → ${talkRatioResult.details.truncatedWords} words`);
                response.ai_response = talkRatioResult.response;
                response.talkRatioEnforced = true;
                response.talkRatioAction = 'truncated';
              } else if (talkRatioResult.action === 'regenerate' && attempt < maxRetries) {
                console.warn(`⚠️ Gemini talk ratio violation: ${talkRatioResult.details.ratio} (max: 0.8)`);
                const conciseInstruction = getConciseInstruction(
                  talkRatioResult.details.ratio,
                  talkRatioResult.details.aiWords,
                  talkRatioResult.details.studentWords
                );
                messages.push({
                  role: 'user',
                  content: conciseInstruction
                });
                preferredProvider = 'gemini';
                console.log('🔄 Regenerating Gemini with concise instruction...');
                continue;
              }
              
              console.log(`✅ Gemini succeeded (fallback) with valid grammar + talk ratio in ${Date.now() - startTime}ms`);
              return {
                ...response,
                provider: 'gemini',
                fallback: true,
                fallbackReason: `Groq ${statusCode}`,
                latency: Date.now() - startTime,
                grammarValidated: !skipGrammarGuard
              };
            } catch (geminiError) {
              console.error('❌ Gemini fallback also failed:', geminiError.message);
              throw new Error(`All providers failed. Groq: ${errorMessage}, Gemini: ${geminiError.message}`);
            }
          } else {
            throw new Error(`Groq failed (${statusCode}) and Gemini not available`);
          }
        } else {
          // Non-fallback errors (e.g., network issues)
          throw groqError;
        }
      }
    }

    // 🔥 If Groq not preferred or not enabled, use Gemini directly
    if (preferredProvider === 'gemini' && PROVIDERS.gemini.enabled) {
      try {
        console.log(`🚀 Using Gemini 2.0 Flash (attempt ${attempt}/${maxRetries})...`);
        const response = await callGemini(messages);
        
        // 🛡️ GRAMMAR GUARD VALIDATION
        if (!skipGrammarGuard) {
          const validation = validateAIResponse(response, weekId);
          if (!validation.valid) {
            console.warn(`⚠️ Grammar violations (attempt ${attempt}):`, validation.violations);
            
            if (attempt < maxRetries) {
              const regenInstruction = getRegenerationInstruction(validation.violations, weekId);
              messages.push({
                role: 'user',
                content: regenInstruction
              });
              console.log('🔄 Regenerating...');
              continue;
            } else {
              console.error('❌ Max retries. Using fallback.');
              return {
                ai_response: "Let's practice with simple sentences! What would you like to talk about?",
                pedagogy_note: 'Grammar guard blocked after retries',
                suggested_hints: ['Use simple grammar', 'Try "I am..." sentences'],
                provider: 'fallback',
                grammarBlocked: true,
                violations: validation.violations,
                latency: Date.now() - startTime
              };
            }
          }
        }
        
        // 🎯 TALK RATIO GUARD VALIDATION (Gemini Direct)
        const talkRatioResult = enforceTalkRatio(response.ai_response || response.response || '', userMessage);
        console.log(`📊 ${getTalkRatioSummary(talkRatioResult.details)}`);
        
        if (talkRatioResult.action === 'truncated') {
          console.warn(`✂️ Response truncated: ${talkRatioResult.details.originalWords} → ${talkRatioResult.details.truncatedWords} words`);
          response.ai_response = talkRatioResult.response;
          response.talkRatioEnforced = true;
          response.talkRatioAction = 'truncated';
        } else if (talkRatioResult.action === 'regenerate' && attempt < maxRetries) {
          console.warn(`⚠️ Talk ratio violation: ${talkRatioResult.details.ratio} (max: 0.8)`);
          const conciseInstruction = getConciseInstruction(
            talkRatioResult.details.ratio,
            talkRatioResult.details.aiWords,
            talkRatioResult.details.studentWords
          );
          messages.push({
            role: 'user',
            content: conciseInstruction
          });
          console.log('🔄 Regenerating with concise instruction...');
          continue;
        }
        
        console.log(`✅ Gemini succeeded with valid grammar + talk ratio in ${Date.now() - startTime}ms`);
        return {
          ...response,
          provider: 'gemini',
          latency: Date.now() - startTime,
          grammarValidated: !skipGrammarGuard,
          talkRatioValidated: true
        };
      } catch (geminiError) {
        throw new Error(`Gemini failed: ${geminiError.message}`);
      }
    }

    throw new Error('No AI provider available');
  }

  // Should never reach here, but just in case
  throw new Error('Grammar guard retry loop exhausted without return');
}

// ============================================
// GROQ PROVIDER
// ============================================

async function callGroq(messages) {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key not configured');
  }

  // 🔥 ENFORCE STRICT JSON: Add explicit instruction to system message
  const enhancedMessages = messages.map((msg, idx) => {
    if (msg.role === 'system' && idx === 0) {
      return {
        ...msg,
        content: msg.content + '\n\n🔥 CRITICAL: Return ONLY a valid JSON object. No markdown formatting, no triple backticks, no code blocks. Just pure JSON.'
      };
    }
    return msg;
  });

  const response = await axios.post(
    GROQ_ENDPOINT,
    {
      model: PROVIDERS.groq.model,
      messages: enhancedMessages,
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
      ai_response: parsed.ai_response || parsed.response || content,
      pedagogy_note: parsed.pedagogy_note || '',
      suggested_hints: parsed.suggested_hints || [],
      raw: content
    };
  } catch (parseError) {
    console.warn('⚠️ Groq JSON parse failed, attempting fallback...');
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
  const { geminiMessages, systemInstruction } = convertToGeminiFormat(messages);

  // 🔥 STRICT JSON ENFORCEMENT: No markdown, no backticks
  const jsonSchemaInstruction = `
🔥 CRITICAL OUTPUT FORMAT:
Return ONLY a valid JSON object. No markdown formatting, no triple backticks, no code blocks. Just pure JSON.

Required JSON structure:
{
  "ai_response": "Your pedagogical response here",
  "pedagogy_note": "Internal note about teaching strategy",
  "suggested_hints": ["hint1", "hint2"]
}

PEDAGOGICAL RULES:
1. Use RECAST technique - never say "wrong", model correct form naturally
2. Example: Student says "I is happy" → You respond "Oh, you ARE happy! That's wonderful!"
3. Always ask follow-up questions to keep conversation flowing
4. Use vocabulary from the week's syllabus

REMEMBER: Output must be pure JSON only, no extra formatting!
`;

  const payload = {
    contents: geminiMessages,
    generationConfig: {
      temperature: PROVIDERS.gemini.temperature,
      maxOutputTokens: PROVIDERS.gemini.maxTokens,
      responseMimeType: 'application/json'
    }
  };

  // Add systemInstruction if available
  if (systemInstruction) {
    payload.systemInstruction = {
      parts: [{ text: systemInstruction + '\n\n' + jsonSchemaInstruction }]
    };
  }

  const response = await axios.post(
    `${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`,
    payload,
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
    console.error('⚠️ Gemini JSON parse error:', parseError.message);
    console.error('Raw response:', content);
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
 * 🔥 FIX: Ensure only "user" and "model" roles (Gemini 2.0 requirement)
 */
function convertToGeminiFormat(messages) {
  const geminiMessages = [];
  let systemInstruction = '';

  messages.forEach((msg) => {
    // Extract system prompt separately (will be used in systemInstruction field)
    if (msg.role === 'system') {
      systemInstruction = msg.content;
    }
    // Convert "user" role → Gemini "user"
    else if (msg.role === 'user') {
      geminiMessages.push({
        role: 'user',
        parts: [{ text: msg.content }]
      });
    }
    // Convert "assistant" OR "ai" role → Gemini "model"
    else if (msg.role === 'assistant' || msg.role === 'model' || msg.role === 'ai') {
      geminiMessages.push({
        role: 'model',
        parts: [{ text: msg.content }]
      });
    }
    // 🔥 Skip invalid roles (e.g., "system" in history)
    else {
      console.warn(`⚠️ Skipping invalid role in history: ${msg.role}`);
    }
  });

  return { geminiMessages, systemInstruction };
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
