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
// RATE LIMITER - FIX GROQ 429 ERRORS
// ============================================

class RateLimiter {
  constructor(maxRequests = 20, windowMs = 60000) {
    this.maxRequests = maxRequests; // 20 requests
    this.windowMs = windowMs; // per 60 seconds
    this.requests = [];
    this.backoffMs = 0;
  }
  
  async waitForSlot() {
    // Apply exponential backoff if set
    if (this.backoffMs > 0) {
      console.log(`⏳ Rate limit backoff: waiting ${this.backoffMs}ms`);
      await new Promise(resolve => setTimeout(resolve, this.backoffMs));
      this.backoffMs = Math.min(this.backoffMs * 2, 10000); // Max 10s
    }
    
    // Clean old requests outside window
    const now = Date.now();
    this.requests = this.requests.filter(t => now - t < this.windowMs);
    
    // If at limit, wait until oldest request expires
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.windowMs - (now - oldestRequest) + 100; // +100ms buffer
      console.log(`⏳ Rate limit: waiting ${waitTime}ms (${this.requests.length}/${this.maxRequests})`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.requests = this.requests.filter(t => Date.now() - t < this.windowMs);
    }
    
    // Record this request
    this.requests.push(Date.now());
  }
  
  setBackoff(ms) {
    this.backoffMs = ms;
  }
  
  resetBackoff() {
    this.backoffMs = 0;
  }
}

// ============================================
// 🔥 GROQ RATE LIMITER - Prevent 429 errors
// ============================================

class GroqRateLimiter {
  constructor() {
    this.requestsInWindow = 0;
    this.windowStartTime = Date.now();
    this.windowDuration = 60000; // 1 minute
    this.maxRequests = 25; // Conservative limit
  }

  async waitForSlot() {
    const now = Date.now();
    const elapsed = now - this.windowStartTime;

    // Reset window if expired
    if (elapsed >= this.windowDuration) {
      this.requestsInWindow = 0;
      this.windowStartTime = now;
    }

    // If quota available, use it
    if (this.requestsInWindow < this.maxRequests) {
      this.requestsInWindow++;
      const remaining = this.maxRequests - this.requestsInWindow;
      console.log(`✅ Groq quota OK (${this.requestsInWindow}/${this.maxRequests}, ${remaining} remaining)`);
      return;
    }

    // Quota full - wait for window reset
    const waitTime = this.windowDuration - elapsed;
    console.warn(`⏳ Groq quota FULL (${this.requestsInWindow}/${this.maxRequests}), waiting ${Math.ceil(waitTime/1000)}s...`);
    
    await new Promise(resolve => setTimeout(resolve, waitTime));
    
    // Reset after waiting
    this.requestsInWindow = 1;
    this.windowStartTime = Date.now();
    console.log('✅ Groq quota RESET, slot available');
  }

  reset() {
    this.requestsInWindow = 0;
    this.windowStartTime = Date.now();
    console.log('🔄 Groq rate limiter manually reset');
  }

  getStatus() {
    const now = Date.now();
    const elapsed = now - this.windowStartTime;
    const windowRemaining = Math.max(0, this.windowDuration - elapsed);
    
    return {
      used: this.requestsInWindow,
      limit: this.maxRequests,
      available: this.maxRequests - this.requestsInWindow,
      windowRemainingMs: windowRemaining
    };
  }
}

// Create global instance
const groqLimiter = new GroqRateLimiter();

// Export control functions
export function resetGroqLimiter() {
  groqLimiter.reset();
}

export function getGroqLimiterStatus() {
  return groqLimiter.getStatus();
}

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
 * 3. Filter by mission context (school, family, etc.)
 */
// 🔥 Track recently used fallbacks to avoid repetition
const recentFallbacks = [];
const MAX_RECENT = 5;

function generateContextualFallback(chatHistory = [], userMessage = '', turnCount = 0, missionContext = {}) {
  const userMsgLower = userMessage.toLowerCase().trim();
  const missionId = missionContext?.missionId || missionContext?.mission?.mission_id || 0;
  
  // 🔥 Mission-specific context keywords
  const missionKeywords = {
    1: ['school', 'first day', 'classroom', 'teacher', 'desk', 'subject'],
    2: ['classroom', 'desk', 'whiteboard', 'computer', 'walls', 'posters'],
    3: ['friend', 'play', 'together', 'meet', 'playground'],
    4: ['family', 'mom', 'dad', 'brother', 'sister', 'parents', 'home'],
    5: ['weekend', 'activity', 'together', 'eat', 'dinner', 'homework']
  };
  
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
  
  // Safe fallback questions (DIVERSE pool with 20+ options)
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
      id: 'encouragement-4',
      response: "Interesting! Can you explain more?",
      hints: ['I', 'mean', 'it', 'is', 'like', 'because']
    },
    {
      id: 'encouragement-5',
      response: "Nice! What do you think about that?",
      hints: ['I', 'think', 'it', 'is', 'good', 'nice']
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
    },
    {
      id: 'example-request',
      response: "Can you give me an example?",
      hints: ['For', 'example', 'like', 'I', 'have', 'is']
    },
    {
      id: 'reason-request',
      response: "Why do you think that?",
      hints: ['Because', 'I', 'think', 'it', 'is', 'like']
    },
    {
      id: 'detail-request',
      response: "What else can you remember?",
      hints: ['I', 'remember', 'also', 'there', 'was', 'is']
    }
  ];
  
  // Conditional fallbacks (only use if NOT already asked) - EXPANDED TO 20+ OPTIONS
  const conditionalFallbacks = [
    {
      id: 'school-excited',
      condition: !askedQuestions.includes('school') && !allHistory.includes('excited'),
      response: "Do you enjoy coming to school?",
      hints: ['Yes', 'I', 'enjoy', 'like', 'school', 'No']
    },
    {
      id: 'feeling',
      condition: turnCount >= 5 && !allHistory.includes('feeling'),
      response: "How are you feeling today?",
      hints: ['I', 'am', 'feeling', 'good', 'happy', 'fine']
    },
    {
      id: 'favorite-activity',
      condition: !askedQuestions.includes('learning') && !allHistory.includes('favorite'),
      response: "What activity do you enjoy most?",
      hints: ['I', 'enjoy', 'like', 'playing', 'reading', 'drawing']
    },
    {
      id: 'weekend',
      condition: !allHistory.includes('weekend'),
      response: "What do you do on weekends?",
      hints: ['I', 'go', 'play', 'stay', 'home', 'park']
    },
    {
      id: 'hobbies',
      condition: !allHistory.includes('hobby'),
      response: "Do you have any hobbies?",
      hints: ['Yes', 'I', 'like', 'drawing', 'playing', 'reading']
    },
    {
      id: 'favorite-color',
      condition: !allHistory.includes('color'),
      response: "What is your favorite color?",
      hints: ['My', 'favorite', 'color', 'is', 'blue', 'red']
    },
    {
      id: 'morning-routine',
      condition: !allHistory.includes('morning'),
      response: "What do you do in the morning?",
      hints: ['I', 'wake', 'up', 'eat', 'breakfast', 'go']
    },
    {
      id: 'after-school',
      condition: !allHistory.includes('after school'),
      response: "What do you do after school?",
      hints: ['I', 'go', 'home', 'play', 'do', 'homework']
    },
    {
      id: 'lunch',
      condition: !allHistory.includes('lunch') && !allHistory.includes('eat'),
      response: "What did you have for lunch?",
      hints: ['I', 'had', 'ate', 'rice', 'sandwich', 'noodles']
    },
    {
      id: 'books',
      condition: !allHistory.includes('book') && !askedQuestions.includes('learning'),
      response: "Do you like reading books?",
      hints: ['Yes', 'I', 'like', 'reading', 'books', 'stories']
    },
    {
      id: 'sports',
      condition: !allHistory.includes('sport') && !askedQuestions.includes('friends'),
      response: "Do you play any sports?",
      hints: ['Yes', 'I', 'play', 'soccer', 'basketball', 'No']
    },
    {
      id: 'music',
      condition: !allHistory.includes('music'),
      response: "Do you like music?",
      hints: ['Yes', 'I', 'like', 'music', 'singing', 'No']
    },
    {
      id: 'pets',
      condition: !allHistory.includes('pet') && !allHistory.includes('dog') && !allHistory.includes('cat'),
      response: "Do you have any pets?",
      hints: ['Yes', 'I', 'have', 'dog', 'cat', 'No']
    },
    {
      id: 'siblings',
      condition: !allHistory.includes('brother') && !allHistory.includes('sister'),
      response: "Do you have brothers or sisters?",
      hints: ['Yes', 'I', 'have', 'brother', 'sister', 'No']
    },
    {
      id: 'helping',
      condition: !allHistory.includes('help'),
      response: "Do you help at home?",
      hints: ['Yes', 'I', 'help', 'my', 'parents', 'clean']
    },
    {
      id: 'season',
      condition: !allHistory.includes('season') && !allHistory.includes('weather'),
      response: "What is your favorite season?",
      hints: ['My', 'favorite', 'season', 'is', 'summer', 'winter']
    },
    {
      id: 'birthday',
      condition: !allHistory.includes('birthday') && askedQuestions.includes('age'),
      response: "When is your birthday?",
      hints: ['My', 'birthday', 'is', 'in', 'January', 'May']
    },
    {
      id: 'nice-meet',
      condition: askedQuestions.includes('name') && turnCount >= 6 && !allHistory.includes('nice to meet'),
      response: "It is nice to meet you! Are you ready to learn?",
      hints: ['Yes', 'I', 'am', 'ready', 'excited', 'No']
    }
  ];
  
  // Try conditional fallbacks first (filter by condition AND avoid recent usage)
  let availableConditional = conditionalFallbacks.filter(fb => fb.condition);
  
  // 🔥 FIX: Filter by mission context if available
  if (missionId && missionKeywords[missionId]) {
    const keywords = missionKeywords[missionId];
    const contextualFallbacks = availableConditional.filter(fb => {
      const responseWords = fb.response.toLowerCase().split(' ');
      return keywords.some(kw => responseWords.includes(kw) || fb.response.toLowerCase().includes(kw));
    });
    
    // Use contextual fallbacks if found, otherwise use all available
    if (contextualFallbacks.length > 0) {
      availableConditional = contextualFallbacks;
      console.log(`🎯 Using mission-${missionId} contextual fallbacks (${contextualFallbacks.length} options)`);
    }
  }
  
  if (availableConditional.length > 0) {
    const selected = availableConditional[Math.floor(Math.random() * availableConditional.length)];
    return {
      ai_response: selected.response,
      suggested_hints: selected.hints,
      pedagogy_note: `Smart fallback - ${selected.id} (${availableConditional.length} options)`,
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
 * @param {Object} params.missionContext - Mission context for Story Mission (missionId, mission)
 * @returns {Promise<AIResponse>}
 */
export async function sendToAI({ 
  systemPrompt, 
  chatHistory = [], 
  userMessage,
  preferredProvider = 'auto',
  weekId = 1,
  skipGrammarGuard = false,
  turnCount = 0,
  missionContext = {}
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
              const fallbackResponse = generateContextualFallback(chatHistory, userMessage, turnCount, missionContext);
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

        // 🔥 FIX: Set backoff on 429 rate limit errors
        if (statusCode === 429) {
          groqLimiter.setBackoff(2000); // Start with 2s backoff
          console.warn(`⚠️ Groq rate limit (429): Setting 2s backoff`);
        }

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
                    const fallbackResponse = generateContextualFallback(chatHistory, userMessage, turnCount, missionContext);
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
              const fallbackResponse = generateContextualFallback(chatHistory, userMessage, turnCount, missionContext);
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

async function callGroq(messages, systemPrompt, options = {}) {
  if (!PROVIDERS.groq.enabled) {
    throw new Error('Groq API key not configured');
  }
  
  await groqLimiter.waitForSlot();
  
  const startTime = Date.now();
  
  try {
    const response = await axios.post(GROQ_ENDPOINT, {
      model: PROVIDERS.groq.model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: options.maxTokens || PROVIDERS.groq.maxTokens,
      temperature: options.temperature || PROVIDERS.groq.temperature,
      response_format: { type: 'json_object' }
    }, {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    const elapsed = Date.now() - startTime;
    console.log(`✅ Groq success in ${elapsed}ms`, groqLimiter.getStatus());
    
    return response.data;
    
  } catch (error) {
    const elapsed = Date.now() - startTime;
    
    if (error.response?.status === 429) {
      console.error(`⚠️ Groq 429 despite rate limiting (${elapsed}ms) - resetting limiter`);
      groqLimiter.reset();
    }
    
    console.error(`❌ Groq error in ${elapsed}ms:`, error.response?.status, error.message);
    
    throw error;
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

🚨 CRITICAL GRAMMAR RESTRICTIONS (ABSOLUTE RULES):
You are teaching English to young learners (Grade 3-4, ages 8-10). Use ONLY simple present tense and basic vocabulary.

⛔ ABSOLUTELY FORBIDDEN WORDS & PATTERNS:
- NEVER use: must, should, would, will, can (modal verbs)
- NEVER use: completed, finished, done (past participles as adjectives)
- NEVER use: -ing forms except "I am playing", "What are you doing?"
- NEVER use: could, might, may, shall, ought to
- NEVER use: complex tenses (present perfect, past perfect, future perfect)

✅ CORRECT EXAMPLES (Grade 3-4 level):
- "I like pizza" (NOT "I would like pizza")
- "Do you play soccer?" (NOT "Would you like to play?")
- "That is fun!" (NOT "That sounds fun!")
- "I am happy!" (NOT "I am feeling happy")
- "What do you do?" (NOT "What are you doing?" unless teaching present continuous)

❌ WRONG (TOO ADVANCED):
- "You completed the task well" → ✅ "Good job! You did it!"
- "You must try harder" → ✅ "Please try again!"
- "What would you like?" → ✅ "What do you want?"
- "That is interesting" → ✅ "That is cool!" or "Wow!"

PEDAGOGICAL RULES:
1. Use RECAST technique - never say "wrong", model correct form naturally
2. Example: Student says "I is happy" → You respond "Oh, you ARE happy! That's wonderful!"
3. Always ask follow-up questions to keep conversation flowing
4. Use vocabulary from the week's syllabus
5. Keep responses SHORT (under 15 words)

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
