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
// SMART FALLBACK GENERATOR
// ============================================

/**
 * Generate contextual fallback based on conversation history
 * CRITICAL: 
 * 1. Check if student is asking US a question → Answer it!
 * 2. Never repeat questions already asked
 */
function generateContextualFallback(chatHistory = [], userMessage = '', turnCount = 0) {
  const userMsgLower = userMessage.toLowerCase().trim();
  
  // 🎯 CRITICAL: Is student ASKING US a question?
  const isStudentAsking = 
    userMsgLower.endsWith('?') ||
    userMsgLower.startsWith('how old are you') ||
    userMsgLower.startsWith('what is your') ||
    userMsgLower.startsWith('do you') ||
    userMsgLower.startsWith('are you') ||
    userMsgLower.startsWith('can you') ||
    userMsgLower.includes('your name') ||
    userMsgLower.includes('your age') ||
    userMsgLower.includes('your favorite');
  
  // If student is asking US → Answer naturally
  if (isStudentAsking) {
    // Detect what they're asking about
    if (userMsgLower.includes('how old') || userMsgLower.includes('your age')) {
      return {
        ai_response: "I am always learning, just like you! How old are YOU?",
        suggested_hints: ['I', 'am', 'years', 'old', 'eight', 'nine', 'ten'],
        pedagogy_note: 'Answering student question about age',
        provider: 'fallback-answer',
        grammarBlocked: true
      };
    }
    
    if (userMsgLower.includes('your name')) {
      return {
        ai_response: "I am Ms. Nova! What is your name?",
        suggested_hints: ['My', 'name', 'is', 'I', 'am'],
        pedagogy_note: 'Answering student question about name',
        provider: 'fallback-answer',
        grammarBlocked: true
      };
    }
    
    if (userMsgLower.includes('do you like') || userMsgLower.includes('your favorite')) {
      return {
        ai_response: "I love teaching students like you! What do YOU like?",
        suggested_hints: ['I', 'like', 'love', 'my', 'favorite', 'is'],
        pedagogy_note: 'Answering student question about preferences',
        provider: 'fallback-answer',
        grammarBlocked: true
      };
    }
    
    // Generic answer for other questions
    return {
      ai_response: "That is interesting! Tell me more.",
      suggested_hints: ['I', 'think', 'like', 'am', 'have', 'my'],
      pedagogy_note: 'Generic answer to student question',
      provider: 'fallback-answer',
      grammarBlocked: true
    };
  }
  
  // Student is NOT asking → Continue with normal fallback logic
  // Extract all AI questions from history (to avoid repeating)
  const allHistory = chatHistory.map(m => m.content.toLowerCase()).join(' ');
  const askedQuestions = [];
  
  // Detect common questions already asked
  if (allHistory.includes('what is your name') || allHistory.includes('what\'s your name')) {
    askedQuestions.push('name');
  }
  if (allHistory.includes('how old are you') || allHistory.includes('what is your age')) {
    askedQuestions.push('age');
  }
  if (allHistory.includes('are you a student')) {
    askedQuestions.push('student');
  }
  if (allHistory.includes('do you have friends')) {
    askedQuestions.push('friends');
  }
  if (allHistory.includes('do you like your school') || allHistory.includes('like school')) {
    askedQuestions.push('school');
  }
  if (allHistory.includes('what grade are you in')) {
    askedQuestions.push('grade');
  }
  if (allHistory.includes('do you like learning') || allHistory.includes('what do you like about school')) {
    askedQuestions.push('learning');
  }
  
  // Safe fallback questions (DIVERSE pool)
  const safeFallbacks = [
    {
      id: 'encouragement-1',
      response: "Good! Can you say more about that?",
      hints: ['I', 'think', 'like', 'have', 'my', 'Yes']
    },
    {
      id: 'encouragement-2',
      response: "That is great! Tell me more.",
      hints: ['I', 'am', 'have', 'like', 'about', 'my']
    },
    {
      id: 'encouragement-3',
      response: "I see! What else can you tell me?",
      hints: ['I', 'also', 'like', 'have', 'about', 'my']
    },
    {
      id: 'repeat-request',
      response: "Sorry, I did not hear you well. Can you say that again?",
      hints: ['I', 'am', 'have', 'like', 'my', 'Yes']
    },
    {
      id: 'sentence-help',
      response: "Can you use a full sentence?",
      hints: ['I', 'am', 'have', 'like', 'my', 'about']
    }
  ];
  
  // Conditional fallbacks (only use if NOT already asked)
  const conditionalFallbacks = [
    {
      id: 'excited',
      condition: !askedQuestions.includes('school'),
      response: "Are you excited about school?",
      hints: ['Yes', 'I', 'am', 'excited', 'happy', 'No']
    },
    {
      id: 'happy',
      condition: turnCount >= 5,
      response: "Are you happy today?",
      hints: ['Yes', 'I', 'am', 'happy', 'good', 'No']
    },
    {
      id: 'nice-meet',
      condition: askedQuestions.includes('name') && turnCount >= 6,
      response: "It is nice to meet you! Are you ready to learn?",
      hints: ['Yes', 'I', 'am', 'ready', 'excited', 'No']
    }
  ];
  
  // Try conditional fallbacks first
  const availableConditional = conditionalFallbacks.filter(fb => fb.condition);
  if (availableConditional.length > 0) {
    const selected = availableConditional[Math.floor(Math.random() * availableConditional.length)];
    return {
      ai_response: selected.response,
      suggested_hints: selected.hints,
      pedagogy_note: 'Smart fallback - avoiding repeated questions',
      provider: 'fallback-smart',
      grammarBlocked: true
    };
  }
  
  // Use safe fallback (random to avoid repetition)
  const selected = safeFallbacks[Math.floor(Math.random() * safeFallbacks.length)];
  return {
    ai_response: selected.response,
    suggested_hints: selected.hints,
    pedagogy_note: 'Safe fallback - encouraging continuation',
    provider: 'fallback-safe',
    grammarBlocked: true
  };
}

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
  skipGrammarGuard = false,
  turnCount = 0
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
              console.error('❌ Max retries exceeded. Using contextual fallback.');
              const fallbackResponse = generateContextualFallback(chatHistory, userMessage, turnCount);
              return {
                ...fallbackResponse,
                violations: validation.violations,
                latency: Date.now() - startTime
              };
            }
          }
        }
        
        // 🎯 TALK RATIO GUARD VALIDATION
        const talkRatioResult = enforceTalkRatio(response.ai_response || response.response || '', userMessage, turnCount);
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
                    console.error('❌ Gemini max retries exceeded. Using contextual fallback.');
                    const fallbackResponse = generateContextualFallback(chatHistory, userMessage, turnCount);
                    return {
                      ...fallbackResponse,
                      violations: validation.violations,
                      latency: Date.now() - startTime
                    };
                  }
                }
              }
              
              // 🎯 TALK RATIO GUARD VALIDATION (Gemini)
              const talkRatioResult = enforceTalkRatio(response.ai_response || response.response || '', userMessage, turnCount);
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
              console.error('❌ Max retries. Using contextual fallback.');
              const fallbackResponse = generateContextualFallback(chatHistory, userMessage, turnCount);
              return {
                ...fallbackResponse,
                violations: validation.violations,
                latency: Date.now() - startTime
              };
            }
          }
        }
        
        // 🎯 TALK RATIO GUARD VALIDATION (Gemini Direct)
        const talkRatioResult = enforceTalkRatio(response.ai_response || response.response || '', userMessage, turnCount);
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
        content: msg.content + '\n\n🔥 CRITICAL JSON FORMAT REQUIREMENTS:\n' +
                 '1. Return ONLY valid JSON (no markdown, no backticks)\n' +
                 '2. ALWAYS complete your response fully\n' +
                 '3. EVERY response MUST end with exactly ONE question\n' +
                 '4. MUST include "suggested_hints" with 4-6 words that help answer YOUR question\n' +
                 '5. Format: {"ai_response": "[complete response + question]", "pedagogy_note": "strategy", "suggested_hints": ["word1", "word2", "word3", "word4"]}\n' +
                 '6. Hints must be individual words that help build the answer to your question'
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

  // Parse JSON response with enhanced validation
  try {
    const parsed = JSON.parse(content);
    const aiResponse = parsed.ai_response || parsed.response || content;
    
    // 🔥 Validate response completeness
    if (!aiResponse || aiResponse.length < 10) {
      throw new Error('Response too short or empty');
    }
    
    // 🔥 Ensure response ends with a question
    if (!aiResponse.includes('?')) {
      console.warn('⚠️ Response missing question, adding default');
      const enhancedResponse = aiResponse + ' What do you think?';
      return {
        ai_response: enhancedResponse,
        pedagogy_note: parsed.pedagogy_note || 'Added question for engagement',
        suggested_hints: parsed.suggested_hints || [],
        raw: content
      };
    }
    
    return {
      ai_response: aiResponse,
      pedagogy_note: parsed.pedagogy_note || '',
      suggested_hints: parsed.suggested_hints || [],
      raw: content
    };
  } catch (parseError) {
    console.warn('⚠️ Groq JSON parse failed, creating structured response...');
    
    // 🔥 Smart fallback: extract text and add question if missing
    let cleanContent = content.replace(/```json|```/g, '').trim();
    if (!cleanContent.includes('?')) {
      cleanContent += ' What about you?';
    }
    
    return {
      ai_response: cleanContent,
      pedagogy_note: 'Fallback response structure',
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

  // Parse JSON response with validation (like Groq)
  try {
    const parsed = JSON.parse(content);
    const aiResponse = parsed.ai_response || parsed.response || content;
    
    // 🔥 Validate response completeness
    if (!aiResponse || aiResponse.length < 10) {
      throw new Error('Response too short or empty');
    }
    
    // 🔥 Ensure response ends with a question
    if (!aiResponse.includes('?')) {
      console.warn('⚠️ Gemini response missing question, adding default');
      const enhancedResponse = aiResponse + ' What do you think?';
      return {
        ai_response: enhancedResponse,
        pedagogy_note: parsed.pedagogy_note || 'Added question for engagement',
        suggested_hints: parsed.suggested_hints || [],
        raw: content
      };
    }
    
    return {
      ai_response: aiResponse,
      pedagogy_note: parsed.pedagogy_note || '',
      suggested_hints: parsed.suggested_hints || [],
      raw: content
    };
  } catch (parseError) {
    console.warn('⚠️ Gemini JSON parse failed, creating structured response...');
    
    // 🔥 Smart fallback: extract text and add question if missing
    let cleanContent = content.replace(/```json|```/g, '').trim();
    if (!cleanContent.includes('?')) {
      cleanContent += ' What about you?';
    }
    
    return {
      ai_response: cleanContent,
      pedagogy_note: 'Fallback response structure',
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
