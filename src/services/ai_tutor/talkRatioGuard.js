/**
 * Talk Ratio Guard - Enforce AI:Student Talk Ratio ≤ 0.8
 * 
 * Core Principle: Ms. Nova should speak LESS than the student
 * Production-oriented pedagogy: Student must produce language
 * 
 * From AI_TUTOR_MASTER_ARTIFACT.md:
 * "Ms. Nova speaks less than the student, adhering to a strict AI:Student Talk Ratio (<= 0.8)"
 */

// ============================================
// CONFIGURATION
// ============================================

const MAX_TALK_RATIO = 0.8; // AI can speak at most 80% of student's word count
const MIN_STUDENT_WORDS = 10; // Minimum words from student to calculate ratio (increased for early conversation)
const TRUNCATE_THRESHOLD = 2.0; // If ratio > 2.0, truncate instead of regenerate (extreme cases only)

// ============================================
// WORD COUNTING
// ============================================

/**
 * Count words in text (excludes punctuation, counts actual words)
 * @param {string} text - Text to count
 * @returns {number} Word count
 */
function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  
  // Remove punctuation and extra spaces, then split
  const cleaned = text
    .replace(/[^\w\s']|_/g, ' ')  // Keep apostrophes for contractions
    .replace(/\s+/g, ' ')
    .trim();
  
  if (!cleaned) return 0;
  
  return cleaned.split(' ').filter(word => word.length > 0).length;
}

/**
 * Calculate AI:Student talk ratio
 * @param {string} aiResponse - AI's response text
 * @param {string} studentInput - Student's input text
 * @returns {{ ratio: number, aiWords: number, studentWords: number, valid: boolean }}
 */
export function calculateTalkRatio(aiResponse, studentInput, conversationTurn = 0) {
  const aiWords = countWords(aiResponse);
  const studentWords = countWords(studentInput);
  
  // During first 5 turns of conversation, be more lenient with AI responses
  const isEarlyConversation = conversationTurn <= 5;
  const minWords = isEarlyConversation ? MIN_STUDENT_WORDS * 2 : MIN_STUDENT_WORDS;
  
  // If student said very little, don't enforce ratio (early in conversation)
  if (studentWords < minWords) {
    return {
      ratio: 0,
      aiWords,
      studentWords,
      valid: true,
      reason: isEarlyConversation 
        ? `Early conversation turn ${conversationTurn} - ratio not enforced`
        : `Student input too short (${studentWords} words < ${minWords})`
    };
  }
  
  const ratio = aiWords / studentWords;
  const valid = ratio <= MAX_TALK_RATIO;
  
  return {
    ratio: Math.round(ratio * 100) / 100, // Round to 2 decimals
    aiWords,
    studentWords,
    valid,
    reason: valid 
      ? `Ratio OK: ${aiWords}/${studentWords} = ${ratio.toFixed(2)}` 
      : `Ratio too high: ${aiWords}/${studentWords} = ${ratio.toFixed(2)} (max: ${MAX_TALK_RATIO})`
  };
}

/**
 * Validate AI response against talk ratio rule
 * @param {string} aiResponse - AI's response text
 * @param {string} studentInput - Student's last input
 * @returns {{ valid: boolean, ratio: number, shouldTruncate: boolean, reason: string }}
 */
export function validateTalkRatio(aiResponse, studentInput, conversationTurn = 0) {
  const result = calculateTalkRatio(aiResponse, studentInput, conversationTurn);
  
  // Determine if we should truncate or regenerate
  const shouldTruncate = result.ratio > TRUNCATE_THRESHOLD;
  
  return {
    valid: result.valid,
    ratio: result.ratio,
    aiWords: result.aiWords,
    studentWords: result.studentWords,
    shouldTruncate,
    shouldRegenerate: !result.valid && !shouldTruncate,
    reason: result.reason
  };
}

/**
 * Truncate AI response to meet talk ratio
 * Intelligently cuts at sentence boundaries
 * @param {string} aiResponse - Original AI response
 * @param {number} maxWords - Maximum allowed words
 * @returns {string} Truncated response
 */
export function truncateResponse(aiResponse, maxWords) {
  if (!aiResponse) return '';
  
  console.warn(`🔧 talkRatioGuard: TRUNCATING response from ${countWords(aiResponse)} words to ${maxWords} words`);
  console.warn(`🔧 talkRatioGuard: Original response:`, aiResponse);
  
  // Split into sentences (keep punctuation)
  const sentences = aiResponse.match(/[^.!?]+[.!?]+/g) || [aiResponse];
  
  let truncated = '';
  let wordCount = 0;
  
  for (const sentence of sentences) {
    const sentenceWords = countWords(sentence);
    
    if (wordCount + sentenceWords <= maxWords) {
      truncated += sentence;
      wordCount += sentenceWords;
    } else {
      // Stop adding sentences if we'd exceed limit
      break;
    }
  }
  
  // If we got at least one sentence, return it
  if (truncated.trim()) {
    console.warn(`🔧 talkRatioGuard: Truncated result:`, truncated.trim());
    return truncated.trim();
  }
  
  // Fallback: Hard truncate at word boundary
  const words = aiResponse.split(/\s+/);
  const result = words.slice(0, maxWords).join(' ') + '...';
  console.warn(`🔧 talkRatioGuard: Hard truncated result:`, result);
  return result;
}

/**
 * Generate instruction for AI to be more concise
 * Used when ratio is violated during regeneration
 * @param {number} currentRatio - Current AI:Student ratio
 * @param {number} aiWords - Current AI word count
 * @param {number} studentWords - Student word count
 * @returns {string} Instruction for AI
 */
export function getConciseInstruction(currentRatio, aiWords, studentWords) {
  const targetWords = Math.floor(studentWords * MAX_TALK_RATIO);
  
  return `
⚠️ TALK RATIO VIOLATION: You spoke too much!

Current ratio: ${currentRatio.toFixed(2)} (${aiWords} words / ${studentWords} words)
Maximum allowed: ${MAX_TALK_RATIO} (AI should speak LESS than student)

Target word count: ${targetWords} words or fewer

🎯 PEDAGOGICAL REMINDER:
Your goal is to make the STUDENT speak, not to lecture.
Keep your response SHORT and CONCISE:
- 1-2 sentences maximum
- Acknowledge briefly
- Ask ONE follow-up question

Regenerate your response with ${targetWords} words or fewer.
`.trim();
}

/**
 * Get talk ratio summary for logging
 * @param {Object} result - Result from validateTalkRatio()
 * @returns {string} Human-readable summary
 */
export function getTalkRatioSummary(result) {
  const status = result.valid ? '✅' : '❌';
  return `${status} Talk Ratio: ${result.aiWords}/${result.studentWords} = ${result.ratio.toFixed(2)} (${result.reason})`;
}

/**
 * Apply talk ratio enforcement to AI response
 * Main function used in aiRouter
 * @param {string} aiResponse - Original AI response
 * @param {string} studentInput - Student's input
 * @returns {{ response: string, enforced: boolean, action: string, details: Object }}
 */
export function enforceTalkRatio(aiResponse, studentInput, conversationTurn = 0) {
  const validation = validateTalkRatio(aiResponse, studentInput, conversationTurn);
  
  // If valid, return as-is
  if (validation.valid) {
    return {
      response: aiResponse,
      enforced: false,
      action: 'none',
      details: validation
    };
  }
  
  // If ratio is extremely high (> 1.2), truncate immediately
  if (validation.shouldTruncate) {
    const maxWords = Math.floor(validation.studentWords * MAX_TALK_RATIO);
    const truncated = truncateResponse(aiResponse, maxWords);
    
    return {
      response: truncated,
      enforced: true,
      action: 'truncated',
      details: {
        ...validation,
        originalWords: validation.aiWords,
        truncatedWords: countWords(truncated),
        newRatio: (countWords(truncated) / validation.studentWords).toFixed(2)
      }
    };
  }
  
  // Otherwise, signal for regeneration
  return {
    response: aiResponse,
    enforced: false,
    action: 'regenerate',
    details: validation
  };
}
