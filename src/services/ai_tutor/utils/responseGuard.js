/**
 * RESPONSE GUARD - ENHANCED
 * 
 * This module provides TWO LAYERS of protection:
 * 1. PRE-GENERATION: Schema validation (structure enforcement)
 * 2. POST-GENERATION: Content repair (block repeats, fix grammar, enforce limits)
 */

import { canonicalizeQuestion } from '../turnManager';

/**
 * Banned phrases that must NEVER appear in AI responses
 */
const BANNED_PHRASES = [
  /what do you think\??/gi,
  /what do you think about/gi,
  /what do you think of/gi,
  /how do you feel about/gi,
  /any thoughts\??/gi,
  /your thoughts\??/gi,
  /let me ask you something/gi,
  /that is a good question! let me ask you/gi,
  /that's interesting\.?/gi,    // 🔥 NEW: Generic chat
  /tell me more\.?/gi,          // 🔥 NEW: Generic chat
  /can you explain\??/gi,       // 🔥 NEW: Generic chat
  /why do you say that\??/gi,   // 🔥 NEW: Generic chat
  /what else\??/gi,             // 🔥 NEW: Generic probing
  /anything else\??/gi,         // 🔥 NEW: Generic probing
  /how interesting\.?/gi,       // 🔥 NEW: Generic chat
  /can you tell me more\??/gi   // 🔥 NEW: Duplicate ban
];

/**
 * Grammar error patterns to fix (A0-A1 compliance)
 */
const GRAMMAR_FIXES = [
  // Fix: "Are you a student, today?" → "Are you a student?"
  { pattern: /are you a student,\s*today\?/gi, fix: 'Are you a student?' },
  { pattern: /do you like school,\s*today\?/gi, fix: 'Do you like school?' },
  // Fix: Stray commas before question marks
  { pattern: /,\s*\?/g, fix: '?' },
  // Fix: Double spaces
  { pattern: /\s{2,}/g, fix: ' ' },
];

/**
 * Extract student name from user message
 */
export function extractStudentName(userMessage) {
  if (!userMessage) return null;
  
  const msg = userMessage.toLowerCase().trim();
  
  // Pattern: "my name is X"
  let match = msg.match(/my name is (\w+)/i);
  if (match) return capitalizeFirst(match[1]);
  
  // Pattern: "I'm X" or "I am X"
  match = msg.match(/i(?:'m| am) (\w+)/i);
  if (match && !['a', 'the', 'very', 'so', 'happy', 'sad', 'excited'].includes(match[1].toLowerCase())) {
    return capitalizeFirst(match[1]);
  }
  
  // Pattern: "call me X"
  match = msg.match(/call me (\w+)/i);
  if (match) return capitalizeFirst(match[1]);
  
  return null;
}

/**
 * Capitalize first letter
 */
function capitalizeFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Check if response contains banned phrases
 */
export function containsBannedPhrase(text) {
  if (!text) return false;
  
  for (const pattern of BANNED_PHRASES) {
    if (pattern.test(text)) {
      console.warn('🚫 Response guard: Banned phrase detected:', pattern);
      return true;
    }
  }
  
  return false;
}

/**
 * Remove banned phrases from text
 */
export function removeBannedPhrases(text) {
  if (!text) return text;
  
  let cleaned = text;
  
  for (const pattern of BANNED_PHRASES) {
    cleaned = cleaned.replace(pattern, '').trim();
  }
  
  // Clean up multiple spaces and punctuation
  cleaned = cleaned.replace(/\s+/g, ' ');
  cleaned = cleaned.replace(/\s+([.,!?])/g, '$1');
  cleaned = cleaned.replace(/([.,!?])\s*\1+/g, '$1'); // Remove duplicate punctuation
  
  return cleaned.trim();
}

/**
 * Count words in text
 */
function countWords(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
}

/**
 * Truncate text to max words
 */
function truncateToWords(text, maxWords) {
  if (!text) return text;
  
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  
  // Truncate and add proper ending
  let truncated = words.slice(0, maxWords).join(' ');
  
  // If last word doesn't end with punctuation, add question mark or period
  if (!/[.!?]$/.test(truncated)) {
    // If original had a question, end with ?
    if (text.includes('?')) {
      truncated += '?';
    } else {
      truncated += '.';
    }
  }
  
  return truncated;
}

/**
 * Replace generic greetings with student name
 */
function personalizeWithName(text, studentName) {
  if (!text || !studentName) return text;
  
  // Don't ask for name again if we know it
  if (/what is your name\??/gi.test(text) || /what'?s your name\??/gi.test(text)) {
    // Replace with a personalized question
    text = text.replace(/what is your name\??/gi, `Nice to meet you, ${studentName}!`);
    text = text.replace(/what'?s your name\??/gi, `Nice to meet you, ${studentName}!`);
  }
  
  // Replace "you" with student name in some contexts
  text = text.replace(/Nice to meet you!/gi, `Nice to meet you, ${studentName}!`);
  text = text.replace(/Great job!/gi, `Great job, ${studentName}!`);
  text = text.replace(/You are wonderful!/gi, `You are wonderful, ${studentName}!`);
  
  return text;
}

/**
 * Fix common grammar errors (A0-A1 compliance)
 */
function fixGrammarErrors(text) {
  if (!text) return text;
  
  let fixed = text;
  for (const { pattern, fix } of GRAMMAR_FIXES) {
    fixed = fixed.replace(pattern, fix);
  }
  
  return fixed;
}

/**
 * Check if question was already asked (prevent repeats)
 */
export function isQuestionRepeated(question, askedQuestions = []) {
  if (!question) return false;
  
  const canonical = canonicalizeQuestion(question);
  if (!canonical) return false;
  
  return askedQuestions.includes(canonical);
}

/**
 * Main guard function: filters and cleans AI response
 * 
 * @param {string} aiResponse - Raw AI response text
 * @param {Object} context - Context with studentName, askedQuestions, turnManager state
 * @param {number} maxWords - Maximum words allowed (default 15)
 * @returns {string} - Cleaned, safe response
 */
export function guardResponse(aiResponse, context = {}, maxWords = 15) {
  if (!aiResponse || typeof aiResponse !== 'string') {
    console.warn('⚠️ Response guard: Invalid response', aiResponse);
    // 🔥 Return step question if available, not generic
    if (context.nextStepQuestion) {
      return context.nextStepQuestion;
    }
    return 'What is your name?';
  }
  
  let cleaned = aiResponse;
  
  // Step 1: Fix grammar errors (A0-A1 compliance)
  const originalText = cleaned;
  cleaned = fixGrammarErrors(cleaned);
  if (cleaned !== originalText) {
    console.log('🔧 Response guard: Fixed grammar error');
  }
  
  // Step 2: Remove banned phrases
  if (containsBannedPhrase(cleaned)) {
    console.warn('🚫 Response guard: Removing banned phrases from:', cleaned);
    cleaned = removeBannedPhrases(cleaned);
    
    // 🔥 If response is now too short or empty, use step question
    if (!cleaned || cleaned.length < 5) {
      if (context.nextStepQuestion) {
        cleaned = context.nextStepQuestion;
      } else {
        cleaned = 'Great!';
      }
    }
  }
  
  // Step 3: Block asking for name if we already know it
  if (context.studentName) {
    if (/what is your name\??/gi.test(cleaned) || /what'?s your name\??/gi.test(cleaned)) {
      console.warn('🚫 Response guard: Blocked asking name - already known:', context.studentName);
      cleaned = cleaned.replace(/what is your name\??/gi, `Nice to meet you, ${context.studentName}!`);
      cleaned = cleaned.replace(/what'?s your name\??/gi, `Nice to meet you, ${context.studentName}!`);
    }
    
    // Personalize
    cleaned = personalizeWithName(cleaned, context.studentName);
  }
  
  // Step 4: Enforce word limit
  const wordCount = countWords(cleaned);
  if (wordCount > maxWords) {
    console.warn(`⚠️ Response guard: Truncating ${wordCount} words to ${maxWords}`);
    cleaned = truncateToWords(cleaned, maxWords);
  }
  
  // Step 6: Final validation - must have actual content
  if (cleaned.length < 5) {
    console.error('❌ Response guard: Response too short after cleaning:', cleaned);
    // 🔥 Use step question if available
    if (context.nextStepQuestion) {
      cleaned = context.nextStepQuestion;
    } else {
      cleaned = 'What is your name?';
    }
  }
  
  // Log if changed
  if (cleaned !== aiResponse) {
    console.log('✅ Response guard applied:');
    console.log('  Before:', aiResponse);
    console.log('  After:', cleaned);
  }
  
  return cleaned;
}

/**
 * Generate fallback hints from mission step key
 */
function generateFallbackHints(stepKey, nextStepQuestion) {
  const hintMap = {
    name: ['My', 'name', 'is', 'I', 'am'],
    age: ['I', 'am', 'years', 'old', 'seven', 'eight', 'nine', 'ten'],
    student: ['Yes', 'I', 'am', 'student', 'No'],
    feeling: ['I', 'feel', 'happy', 'good', 'excited', 'sad'],
    school_like: ['Yes', 'I', 'like', 'school', 'No'],
    grade: ['I', 'am', 'in', 'grade', 'first', 'second', 'third'],
    friends: ['Yes', 'I', 'have', 'friends', 'No', 'many'],
    has_backpack: ['Yes', 'I', 'have', 'backpack', 'No'],
    backpack_color: ['My', 'backpack', 'is', 'blue', 'red', 'green', 'black'],
    has_books: ['Yes', 'I', 'have', 'books', 'No'],
    has_notebook: ['Yes', 'I', 'have', 'notebook', 'No'],
    backpack_contents: ['I', 'have', 'pencil', 'pen', 'eraser', 'book'],
    like_backpack: ['Yes', 'I', 'like', 'my', 'backpack', 'No'],
    backpack_weight: ['My', 'backpack', 'is', 'heavy', 'light'],
    teacher_nice: ['Yes', 'my', 'teacher', 'is', 'nice', 'kind'],
    teacher_funny: ['Yes', 'my', 'teacher', 'is', 'funny', 'No'],
    like_teacher: ['Yes', 'I', 'like', 'my', 'teacher', 'No'],
    teacher_name: ['My', 'teacher', 'name', 'is', 'Ms', 'Mr'],
    school_size: ['Yes', 'my', 'school', 'is', 'big', 'small'],
    like_school: ['Yes', 'I', 'like', 'school', 'No'],
    classroom: ['Yes', 'my', 'classroom', 'is', 'nice', 'big']
  };
  
  return hintMap[stepKey] || ['I', 'am', 'my', 'is', 'Yes', 'No'];
}

/**
 * 🎯 MASTER ARTIFACT: Build teacher text from ACK + RECAST + QUESTION
 */
function buildTeacherText(ack, recast, question) {
  const parts = [];
  
  // Add punctuation to ACK and RECAST for natural flow
  if (ack && ack.trim()) {
    const ackText = ack.trim();
    parts.push(ackText.endsWith('!') ? ackText : ackText + '!');
  }
  if (recast && recast.trim()) {
    const recastText = recast.trim();
    parts.push(recastText.endsWith('!') || recastText.endsWith('.') ? recastText : recastText + '!');
  }
  if (question && question.trim()) {
    parts.push(question.trim());
  }
  
  return parts.join(' ');
}

/**
 * 🎯 MASTER ARTIFACT: Guard full AI response object
 * Handles new format: { teacher_ack, teacher_recast, question_text, suggested_hints }
 * Forces canonical question from Turn Manager
 */
export function guardResponseObject(responseObj, context = {}, maxWords = 15) {
  if (!responseObj) return responseObj;
  
  // 🔥 CRITICAL: Parse JSON from ai_response if needed
  let parsed = responseObj;
  if (responseObj.ai_response && typeof responseObj.ai_response === 'string') {
    try {
      // Try to parse JSON from ai_response field
      const jsonMatch = responseObj.ai_response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedJson = JSON.parse(jsonMatch[0]);
        parsed = { ...responseObj, ...parsedJson };
        console.log('🔧 Response guard: Parsed JSON from ai_response');
      }
    } catch (e) {
      console.warn('⚠️ Response guard: Failed to parse JSON from ai_response:', e.message);
    }
  }
  
  // 🔥 ONE BRAIN: Get TurnManager from context (REQUIRED for Story Mission)
  const turnManager = context.turnManager;
  
  if (turnManager) {
    // Get current step for canonical question and hints
    const nextStep = context.isOpeningTurn 
      ? turnManager.missionSteps[0] 
      : turnManager.getNextStep();
    
    // Override with canonical question and hints from step definition
    context.currentStepKey = nextStep?.key;
    context.canonicalQuestion = nextStep?.question;
    context.canonicalHints = nextStep?.hints || [];
    context.studentName = turnManager.studentName;
    
    console.log('🔒 ResponseGuard: stepKey=' + context.currentStepKey + ' | canonical="' + context.canonicalQuestion + '"');
  }
  
  // 🎯 ENFORCE MS. NOVA STRUCTURE
  let ack = parsed.teacher_ack || '';
  let recast = parsed.teacher_recast || '';
  let question = parsed.teacher_question || parsed.question_text || '';
  
  // 🔥 DETECT CLOSING TURN (goodbye step)
  const isClosingTurn = context.currentStepKey === 'goodbye' || 
                        (turnManager && turnManager.askedStepKeys.length >= turnManager.missionSteps.length - 1);
  
  // 🔥 OPENING TURN: No ACK/RECAST (student hasn't spoken yet)
  if (context.isOpeningTurn) {
    ack = '';
    recast = '';
    
    // 🔥 Use mission.nova_greeting (from week_01_real.js)
    if (context.mission?.nova_greeting) {
      question = context.mission.nova_greeting;
      console.log('🎯 Opening: Using mission greeting:', context.mission.nova_greeting);
    } else if (context.canonicalQuestion) {
      question = context.canonicalQuestion;
      console.warn('⚠️ mission.nova_greeting not found, using canonical question');
    }
  } else if (isClosingTurn) {
    // 🎉 CLOSING TURN: ACK + RECAST + GOODBYE (no question)
    if (!ack || ack.trim() === '') {
      ack = 'Wonderful!';
    }
    if (!recast || recast.trim() === '') {
      recast = 'You completed all the steps!';
    }
    question = 'Great job!';
    console.log('🎉 Closing turn: Mission complete!');
  } else {
    // 🔥 NORMAL TURN: Force ACK + RECAST + QUESTION
    
    // Force ACK (if missing or too long)
    if (!ack || ack.trim() === '' || ack.split(' ').length > 3) {
      ack = 'Great!';
      console.warn('⚠️ AI missing ACK, using fallback:', ack);
    }
    
    // Force RECAST (if missing) - Use context-aware fallback
    if (!recast || recast.trim() === '' || recast.length < 3) {
      // Try to create a context-aware recast based on current step
      if (context.currentStepKey === 'name') {
        recast = 'I heard your name!';
      } else if (context.currentStepKey === 'age') {
        recast = 'I know your age now!';
      } else if (context.currentStepKey === 'student' || context.currentStepKey === 'like_school') {
        recast = 'Thank you for telling me!';
      } else {
        recast = 'I heard you!';
      }
      console.warn('⚠️ AI missing RECAST, using context-aware fallback:', recast);
    }
    
    // Force canonical question
    if (context.canonicalQuestion) {
      question = context.canonicalQuestion;
      console.log('🔒 Forced canonical: stepKey=' + context.currentStepKey + ' | question="' + question + '"');
    }
  }
  
  // 🚨 Check for banned phrases
  const fullText = `${ack} ${recast} ${question}`;
  if (containsBannedPhrase(fullText)) {
    console.warn('🚨 Response guard: BANNED phrase detected, cleaning');
    ack = removeBannedPhrases(ack);
    recast = removeBannedPhrases(recast);
  }
  
  // 🎯 OPENING TURN: Skip ACK/RECAST cleaning (they should be empty)
  // Only clean ACK/RECAST for non-opening turns
  if (ack.trim() !== '') {
    ack = guardResponse(ack, context, 3); // ACK max 3 words
  }
  if (recast.trim() !== '') {
    recast = guardResponse(recast, context, 8); // RECAST max 8 words
  }
  
  // Build final teacher text (question only if ACK/RECAST are empty)
  const teacherText = buildTeacherText(ack, recast, question);
  
  // 🔥 CRITICAL: Use hints from step definition (ignore AI hints)
  let hints = context.canonicalHints || [];
  
  if (!hints || hints.length === 0) {
    // Fallback only if step definition has no hints
    console.warn('⚠️ Response guard: No canonical hints, using fallback');
    hints = parsed.suggested_hints || responseObj.suggested_hints || [];
  } else {
    console.log('✅ Using canonical hints from step definition:', hints);
  }
  
  if (Array.isArray(hints) && hints.length > 0) {
    // Clean existing hints
    hints = hints
      .map(h => String(h).replace(/[.,!?;:]/g, '').trim())
      .filter(h => h.length > 0 && h.length < 12);
    hints = [...new Set(hints)];
    
    if (hints.length < 4) {
      const fallback = generateFallbackHints(context.nextStepKey, question);
      hints = [...hints, ...fallback].slice(0, 6);
      hints = [...new Set(hints)];
    } else if (hints.length > 8) {
      hints = hints.slice(0, 8);
    }
  }
  
  // 🔥 LOG ENFORCED STRUCTURE
  console.log('🎯️ Enforced Ms. Nova structure:', {
    ack: ack || '(none)',
    recast: recast || '(none)',
    question: question,
    combined: teacherText,
    hints: hints
  });
  
  console.log('🛡️ Response guard: Validated response');
  
  return {
    teacher_ack: ack,
    teacher_recast: recast,
    teacher_question: question,
    question_text: question, // Legacy compatibility
    suggested_hints: hints,
    ai_response: teacherText // Legacy field for compatibility
  };
}
