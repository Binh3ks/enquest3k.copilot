/**
 * Response Parser - Centralized AI Response Processing
 * 
 * Handles JSON parsing, validation, and normalization of AI responses
 * from multiple providers (Groq, Gemini) with different formats.
 * 
 * @module responseParser
 * @version 1.0.0
 * @created 2026-01-06
 */

/**
 * Parse AI response from various formats to standardized structure
 * 
 * Supports:
 * - JSON string with structured fields
 * - Plain text responses
 * - Markdown-wrapped JSON (```json ... ```)
 * - Partial JSON responses
 * 
 * @param {string|Object} rawResponse - Raw response from AI
 * @param {Object} fallback - Fallback response if parsing fails
 * @returns {Object} Normalized response object
 * 
 * @example
 * const response = parseAIResponse('{"ai_response": "Hello!", "suggested_hints": ["hi", "hello"]}');
 * // Returns: { ai_response: "Hello!", pedagogy_note: "", suggested_hints: ["hi", "hello"], raw: "..." }
 */
export function parseAIResponse(rawResponse, fallback = null) {
  // Handle null/undefined
  if (!rawResponse) {
    console.warn('⚠️ responseParser: Empty response received');
    return fallback || getDefaultFallback();
  }

  // If already an object, normalize it
  if (typeof rawResponse === 'object') {
    return normalizeResponse(rawResponse, rawResponse);
  }

  // Try to parse as JSON
  try {
    // Remove markdown code blocks if present
    let cleanedResponse = rawResponse;
    
    // Remove ```json ... ``` or ``` ... ``` wrappers
    if (cleanedResponse.includes('```')) {
      const jsonMatch = cleanedResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        cleanedResponse = jsonMatch[1];
      }
    }
    
    // Try parsing
    const parsed = JSON.parse(cleanedResponse);
    return normalizeResponse(parsed, rawResponse);
    
  } catch (error) {
    // JSON parsing failed - treat as plain text
    console.warn('⚠️ responseParser: JSON parse failed, using plain text fallback');
    return {
      ai_response: rawResponse.replace(/```json|```/g, '').trim(),
      pedagogy_note: 'Plain text response (non-JSON)',
      suggested_hints: [],
      mission_status: null,
      grammar_focus: null,
      raw: rawResponse
    };
  }
}

/**
 * Normalize parsed response to standard structure
 * Handles both old format (teacher_*) and new Artifact v5.0 format (ack, recast, bridge, question, hints)
 * @private
 */
function normalizeResponse(parsed, rawResponse) {
  // 🔥 Parse hints - split phrases into individual words
  let hintsArray = [];
  
  // Support both old (suggested_hints) and new (hints) field names
  if (Array.isArray(parsed.hints)) {
    hintsArray = parsed.hints;
  } else if (Array.isArray(parsed.suggested_hints)) {
    hintsArray = parsed.suggested_hints;
  }
  
  // 🔥 FIX: If hints contain phrases like "I have..." or "in my backpack", split them
  const individualWords = [];
  for (const hint of hintsArray) {
    if (typeof hint === 'string') {
      // Remove punctuation and split by spaces
      const words = hint
        .replace(/[.,;:!?…\.]+/g, '') // Remove all punctuation
        .split(/\s+/)                  // Split by whitespace
        .filter(w => w.length > 0);   // Remove empty strings
      
      individualWords.push(...words);
    }
  }
  
  // Deduplicate and keep only unique words
  const uniqueHints = [...new Set(individualWords)];
  
  console.log('🔄 Hints normalization:', hintsArray, '→', uniqueHints);
  
  // 🔥 NEW: Support Artifact v5.0 format (ack, recast, bridge, question, hints)
  const isArtifactFormat = parsed.ack !== undefined || parsed.question !== undefined;
  
  if (isArtifactFormat) {
    // New format: {ack, recast, bridge, question, hints}
    return {
      ack: parsed.ack || '',
      recast: parsed.recast || '',
      bridge: parsed.bridge || '',
      question: parsed.question || '',
      hints: uniqueHints,
      mission_status: parsed.mission_status || null,
      grammar_focus: parsed.grammar_focus || null,
      raw: rawResponse,
      format: 'artifact-v5'
    };
  } else {
    // Old format: {teacher_ack, teacher_recast, teacher_question, suggested_hints}
    // Also handle legacy ai_response format
    return {
      ai_response: parsed.ai_response || parsed.response || parsed.content || '',
      pedagogy_note: parsed.pedagogy_note || parsed.note || '',
      suggested_hints: uniqueHints,
      mission_status: parsed.mission_status || null,
      grammar_focus: parsed.grammar_focus || null,
      raw: rawResponse,
      format: 'legacy'
    };
  }
}

/**
 * Get default fallback response
 * @private
 */
function getDefaultFallback() {
  return {
    ai_response: "That's interesting! Tell me more?",
    pedagogy_note: 'Fallback: Empty response',
    suggested_hints: ['yes', 'no', 'I', 'like', 'my', 'is'],
    mission_status: null,
    grammar_focus: null,
    raw: null
  };
}

/**
 * Validate response completeness and quality
 * 
 * Checks:
 * - Response is not too short
 * - Response contains a question (for conversational modes)
 * - Response is in English (basic check)
 * 
 * @param {Object} response - Parsed response object
 * @param {Object} options - Validation options
 * @param {number} options.minLength - Minimum response length (default: 10)
 * @param {boolean} options.requireQuestion - Require question mark (default: false)
 * @param {boolean} options.autoFix - Auto-fix issues (default: true)
 * @returns {Object} Validated and potentially fixed response
 * 
 * @example
 * const validated = validateResponse(response, { requireQuestion: true });
 */
export function validateResponse(response, options = {}) {
  const {
    minLength = 10,
    requireQuestion = false,
    autoFix = true
  } = options;

  // Clone to avoid mutation
  const validated = { ...response };

  // Check 1: Response too short
  if (!validated.ai_response || validated.ai_response.length < minLength) {
    console.warn(`⚠️ responseParser: Response too short (${validated.ai_response?.length || 0} chars)`);
    
    if (autoFix) {
      validated.ai_response = 'Great! How are you?';
      validated.pedagogy_note += ' [Auto-fixed: Safe fallback]';
    } else {
      throw new Error(`Response too short: ${validated.ai_response?.length || 0} chars (minimum: ${minLength})`);
    }
  }

  // Check 2: Missing question (if required)
  if (requireQuestion && !validated.ai_response.includes('?')) {
    console.warn('⚠️ responseParser: Missing question mark');
    
    if (autoFix) {
      validated.ai_response += ' How about you?';
      validated.pedagogy_note += ' [Auto-fixed: Added question]';
    } else {
      throw new Error('Response missing required question');
    }
  }

  // Check 3: Missing hints for questions
  if (validated.ai_response.includes('?') && 
      (!validated.suggested_hints || validated.suggested_hints.length === 0)) {
    console.warn('⚠️ responseParser: Question asked but no hints provided');
    
    if (autoFix) {
      validated.suggested_hints = ['I', 'like', 'my', 'is', 'am', 'have'];
      validated.pedagogy_note += ' [Auto-fixed: Added basic hints]';
    }
  }

  return validated;
}

/**
 * Extract hints from response text if not provided
 * 
 * Uses heuristics to generate hints based on question type:
 * - "What is your name?" → ["My", "name", "is", "I", "am"]
 * - "How old are you?" → ["I", "am", "years", "old"]
 * - "What do you like?" → ["I", "like", "my", "favorite"]
 * 
 * @param {string} questionText - The question text
 * @param {Array} vocabWords - Optional vocabulary words to include
 * @returns {Array<string>} Array of hint words
 */
export function extractHintsFromQuestion(questionText, vocabWords = []) {
  const question = questionText.toLowerCase();
  let hints = [];

  // Pattern matching for common questions - MORE COMPREHENSIVE
  if (question.includes('what is your name') || question.includes('what\'s your name')) {
    hints = ['My', 'name', 'is', 'I', 'am'];
  } else if (question.includes('how old are you') || question.includes('what is your age')) {
    hints = ['I', 'am', 'years', 'old', 'eight', 'nine', 'ten'];
  } else if (question.includes('are you a student') || question.includes('are you a')) {
    hints = ['Yes', 'I', 'am', 'a', 'student', 'No'];
  } else if (question.includes('what do you have in your backpack') || question.includes('in your backpack')) {
    hints = ['I', 'have', 'books', 'notebook', 'in', 'my', 'backpack'];
  } else if (question.includes('what color is your backpack') || question.includes('what color')) {
    hints = ['My', 'backpack', 'is', 'blue', 'red', 'green', 'yellow'];
  } else if (question.includes('do you have books') || question.includes('do you have')) {
    hints = ['Yes', 'I', 'have', 'books', 'No', "don't"];
  } else if (question.includes('what is your teacher like') || question.includes('your teacher')) {
    hints = ['My', 'teacher', 'is', 'nice', 'kind', 'fun'];
  } else if (question.includes('what is your favorite subject') || question.includes('favorite subject')) {
    hints = ['My', 'favorite', 'subject', 'is', 'English', 'math'];
  } else if (question.includes('do you like') || question.includes('what do you like')) {
    hints = ['Yes', 'I', 'like', 'No', "don't"];
  } else if (question.includes('is this your first') || question.includes('first class')) {
    hints = ['Yes', 'this', 'is', 'my', 'first', 'No'];
  } else if (question.includes('how do you feel') || question.includes('do you feel')) {
    hints = ['I', 'feel', 'happy', 'excited', 'good', 'nervous'];
  } else {
    // Default conversational hints
    hints = ['I', 'like', 'my', 'is', 'am', 'have'];
  }

  // Add vocabulary words if provided
  if (vocabWords && vocabWords.length > 0) {
    hints = [...hints, ...vocabWords.slice(0, 3)];
  }

  // Deduplicate and scramble
  const uniqueHints = [...new Set(hints)];
  return uniqueHints.sort(() => Math.random() - 0.5).slice(0, 6);
}

/**
 * Check if response is a closing statement (no question)
 * 
 * @param {Object} response - Parsed response object
 * @returns {boolean} True if this is a closing statement
 */
export function isClosingStatement(response) {
  const text = response.ai_response || '';
  
  // Check for closing indicators
  const hasQuestion = text.includes('?');
  const hasClosingPhrases = 
    text.toLowerCase().includes('see you') ||
    text.toLowerCase().includes('great work') ||
    text.toLowerCase().includes('wonderful') ||
    text.toLowerCase().includes('goodbye') ||
    text.toLowerCase().includes('next time');

  return !hasQuestion && hasClosingPhrases;
}

/**
 * Sanitize response text (remove unsafe content)
 * 
 * @param {string} text - Response text
 * @returns {string} Sanitized text
 */
export function sanitizeResponse(text) {
  if (!text) return '';
  
  return text
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove JS injection
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Format response for TTS (Text-to-Speech)
 * 
 * Removes:
 * - Markdown formatting
 * - Code blocks
 * - Special characters that TTS misreads
 * 
 * @param {string} text - Response text
 * @returns {string} TTS-friendly text
 */
export function formatForTTS(text) {
  if (!text) return '';
  
  return text
    .replace(/\*\*/g, '') // Remove bold markdown
    .replace(/\*/g, '') // Remove italic markdown
    .replace(/`/g, '') // Remove code markers
    .replace(/\n{2,}/g, '. ') // Replace multiple newlines with period
    .replace(/\n/g, ', ') // Replace single newlines with comma
    .trim();
}

/**
 * Batch parse multiple responses
 * 
 * @param {Array} responses - Array of raw responses
 * @param {Object} fallback - Fallback for failed parses
 * @returns {Array} Array of parsed responses
 */
export function batchParseResponses(responses, fallback = null) {
  return responses.map((response, index) => {
    try {
      return parseAIResponse(response, fallback);
    } catch (error) {
      console.error(`❌ responseParser: Failed to parse response #${index}:`, error);
      return fallback || getDefaultFallback();
    }
  });
}

/**
 * Export all utilities as default object
 */
export default {
  parseAIResponse,
  validateResponse,
  extractHintsFromQuestion,
  isClosingStatement,
  sanitizeResponse,
  formatForTTS,
  batchParseResponses
};
