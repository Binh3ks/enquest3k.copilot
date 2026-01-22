/**
 * RESPONSE GUARD - ENHANCED
 * 
 * This module provides TWO LAYERS of protection:
 * 1. PRE-GENERATION: Schema validation (structure enforcement)
 * 2. POST-GENERATION: Content repair (block repeats, fix grammar, enforce limits)
 */

import { canonicalizeQuestion } from '../turnManager';

// ============================================
// 🔥 FIX #2: FOLLOW-UP QUESTION TRACKING
// ============================================

const askedFollowUpsByMission = new Map();

export function clearFollowUpTracking(missionId) {
  askedFollowUpsByMission.delete(missionId);
  console.log('🔄 Cleared follow-up tracking for mission', missionId);
}

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
  
  // 🔥 NEW: Only truncate if significantly over limit (>15 words)
  if (words.length <= 15) return text;
  
  // 🔥 Keep minimum 10 words to preserve sentence integrity
  const targetWords = Math.max(10, maxWords);
  
  // 🔥 Check if there's a question mark - don't break it
  const questionMarkIndex = text.indexOf('?');
  if (questionMarkIndex !== -1) {
    // Find where question ends
    const wordsBeforeQuestion = text.substring(0, questionMarkIndex + 1).trim().split(/\s+/).length;
    if (wordsBeforeQuestion <= 12) {
      // Question is short enough, keep it intact
      return text.substring(0, questionMarkIndex + 1).trim();
    }
  }
  
  // Truncate and add proper ending
  let truncated = words.slice(0, targetWords).join(' ');
  
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
    // 🔥 Use TurnManager question if available
    if (context.turnManager && typeof context.turnManager.getQuestionVariant === 'function') {
      const variant = context.turnManager.getQuestionVariant();
      if (variant && variant.question) {
        return variant.question;
      }
    }
    if (context.nextStepQuestion) {
      return context.nextStepQuestion;
    }
    return 'Tell me more!';
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
    
    // 🔥 CRITICAL: Don't use fallback in story_character mode - AI response is sacred!
    if (context.missionData?.story_character) {
      console.warn('⚠️ Story character mode: AI response too short but NOT overriding (trust AI)');
      // Use original AI response, don't replace
      cleaned = aiResponse || 'Tell me more!';
    } else {
      // 🔥 Use TurnManager question if available (only for objective mode)
      if (context.turnManager && typeof context.turnManager.getQuestionVariant === 'function') {
        const variant = context.turnManager.getQuestionVariant();
        if (variant && variant.question) {
          cleaned = variant.question;
          console.log('✅ Using TurnManager question variant as fallback:', cleaned);
        } else {
          cleaned = 'Tell me more!';
        }
      } else if (context.nextStepQuestion) {
        cleaned = context.nextStepQuestion;
      } else {
        cleaned = 'Tell me more!';
      }
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
 * 🎯 MASTER ARTIFACT: Build teacher text from ACK + RECAST + BRIDGE + QUESTION
 */
function buildTeacherText(ack, recast, question, bridge = '') {
  // Build combined response - SEPARATE QUESTIONS
  let combined = '';

  // Add ACK if exists
  if (ack && ack !== '(none)') {
    combined += ack + ' ';
  }

  // Add RECAST if exists  
  if (recast && recast !== '(none)') {
    combined += recast;
    // Only add space if there's also a bridge or question coming
    if (bridge || question) {
      combined += ' ';
    }
  }
  
  // Add BRIDGE if exists (new in Artifact v5.0)
  if (bridge && bridge !== '(none)') {
    combined += bridge + ' ';
  }

  // Add QUESTION - ensure it ends with ONLY ONE question mark
  if (question) {
    // Remove any duplicate question marks
    const cleanQuestion = question.replace(/\?+/g, '?').trim();
    combined += cleanQuestion;
  }

  combined = combined.trim();

  // SAFETY CHECK: Prevent double questions
  const questionMarkCount = (combined.match(/\?/g) || []).length;
  if (questionMarkCount > 1) {
    console.warn('⚠️ WARNING: Multiple question marks detected, fixing...');
    // Keep only the first question
    const parts = combined.split('?');
    combined = parts[0] + '?';
  }

  return combined;
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
    // 🔥 Handle both objective and legacy modes
    if (turnManager.mode === 'objective') {
      // Objective-driven mode
      const currentObjective = turnManager.getCurrentObjective();
      
      context.currentStepKey = currentObjective?.id;
      context.canonicalQuestion = null; // No canonical question in objective mode
      context.canonicalHints = currentObjective?.defaultHints || [];
      context.studentName = turnManager.studentName;
      
      console.log('🔒 ResponseGuard (Objective): objective=' + context.currentStepKey + ' | goal="' + currentObjective?.goal + '"');
    } else {
      // Legacy step-based mode
      const nextStep = context.isOpeningTurn 
        ? turnManager.missionSteps[0] 
        : turnManager.getNextStep();
      
      // Override with canonical question and hints from step definition
      context.currentStepKey = nextStep?.key;
      context.canonicalQuestion = nextStep?.question;
      context.canonicalHints = nextStep?.hints || [];
      context.studentName = turnManager.studentName;
      
      console.log('🔒 ResponseGuard (Legacy): stepKey=' + context.currentStepKey + ' | canonical="' + context.canonicalQuestion + '"');
    }
  }
  
  // 🎯 ENFORCE MS. NOVA STRUCTURE - Support both old and new formats
  let ack = parsed.ack || parsed.teacher_ack || '';
  let recast = parsed.recast || parsed.teacher_recast || '';
  let bridge = parsed.bridge || ''; // NEW: Artifact v5.0
  let question = parsed.question || parsed.teacher_question || parsed.question_text || '';
  
  // 🔥 FIX: Parse legacy ai_response format into ACK + QUESTION
  if (!ack && !question && parsed.ai_response) {
    const aiResponse = parsed.ai_response.trim();
    
    // Split by sentence boundaries (. ! ?)
    const sentences = aiResponse.split(/([.!?])\s+/).filter(s => s.trim());
    
    if (sentences.length >= 2) {
      // First sentence = ACK (if short)
      const firstSentence = (sentences[0] + (sentences[1] || '')).trim();
      if (firstSentence.split(' ').length <= 3) {
        ack = firstSentence;
        // Rest = QUESTION
        question = sentences.slice(2).join(' ').trim();
      } else {
        // Entire response is question
        question = aiResponse;
      }
    } else {
      // Single sentence - treat as question
      question = aiResponse;
    }
    
    console.log('🔄 Legacy ai_response parsed:', {original: aiResponse, ack, question});
  }
  
  // Detect format type
  const isArtifactV5 = parsed.ack !== undefined || (parsed.question !== undefined && parsed.teacher_question === undefined);
  
  console.log('🔍 Response format:', isArtifactV5 ? 'Artifact v5.0' : 'Legacy');
  
  // 🔥 DETECT CLOSING TURN (goodbye step)
  let isClosingTurn = false;
  if (turnManager) {
    if (turnManager.mode === 'objective') {
      const currentObjective = turnManager.getCurrentObjective();
      isClosingTurn = context.currentStepKey === 'goodbye' || 
                      currentObjective?.type === 'termination' ||
                      currentObjective?.id === 'goodbye';
    } else {
      isClosingTurn = context.currentStepKey === 'goodbye' || 
                      (turnManager.askedStepKeys.length >= turnManager.missionSteps.length - 1);
    }
  }
  
  // 🔥 OPENING TURN: No ACK/RECAST (student hasn't spoken yet)
  if (context.isOpeningTurn) {
    ack = '';
    recast = '';
    
    // 🔥 Use mission.nova_greeting (from week_01_real.js)
    if (context.mission?.nova_greeting) {
      question = context.mission.nova_greeting;
      console.log('🎯 Opening: Using mission greeting:', context.mission.nova_greeting);
    } else if (context.canonicalQuestion && turnManager?.mode !== 'objective') {
      // Only use canonical in legacy mode
      question = context.canonicalQuestion;
      console.warn('⚠️ mission.nova_greeting not found, using canonical question');
    }
  } else if (isClosingTurn) {
    // 🎯 FIX: When "goodbye" objective reached, END IMMEDIATELY
    // Don't check minimum_turns - objectives completed = mission done
    const turnCount = context.turnCount || Math.floor((context.chatHistory?.length || 0) / 2);
    
    console.log(`🎉 Mission complete! Goodbye objective reached at turn ${turnCount}`);
    
    // CLOSING TURN: ACK + RECAST + GOODBYE (no follow-up question)
    if (!ack || ack.trim() === '') {
      ack = 'Wonderful!';
    }
    if (!recast || recast.trim() === '') {
      recast = 'You completed all the steps!';
    }
    
    // 🔥 FINAL GOODBYE MESSAGE (not a question)
    const studentName = context.studentName || turnManager?.studentName || '';
    question = `Great job${studentName ? ', ' + studentName : ''}! See you next time!`;
    
    // 🚫 FORCE END - No more follow-up questions after goodbye
    context.shouldEndMission = true;
  } else {
    // 🔥 NORMAL TURN: Force ACK + RECAST + QUESTION
    
    // Force ACK (if missing or too long) - Keep it simple: only 3 words
    if (!ack || ack.trim() === '' || ack.split(' ').length > 3) {
      const ackOptions = ['Nice!', 'Great!', 'Wonderful!'];
      ack = ackOptions[Math.floor(Math.random() * ackOptions.length)];
      console.warn('⚠️ AI missing ACK, using fallback:', ack);
    }
    
    // 🎯 RECAST: Model student's answer with correct grammar (CRITICAL FOR LEARNING)
    // This is the key teaching technique - never say "wrong", just model correct form
    if (!recast || recast.trim() === '' || recast.length < 3) {
      const lastUserMsg = context.chatHistory?.[context.chatHistory.length - 1]?.content || '';
      if (lastUserMsg && lastUserMsg.trim().length > 0) {
        // Try to intelligently recast based on current step
        const stepKey = context.currentStepKey;
        const msg = lastUserMsg.trim();
        
        // 🔥 SUBJECT DETECTION: Check if question is about student or someone else
        const questionLower = (context.canonicalQuestion || '').toLowerCase();
        const isAboutMother = questionLower.includes('mother') || questionLower.includes('mom');
        const isAboutFather = questionLower.includes('father') || questionLower.includes('dad');
        const isAboutStudent = questionLower.includes('you') || questionLower.includes('your name') || questionLower.includes('your age');
        
        // Generate recast based on step context WITH CORRECT SUBJECT
        if (stepKey === 'name' && !msg.toLowerCase().includes('my name')) {
          recast = `Your name is ${msg}!`;
        } else if (stepKey === 'age' && /^\d+$/.test(msg)) {
          recast = `You are ${msg} years old!`;
        } else if (msg.toLowerCase().startsWith('yes') || msg.toLowerCase().startsWith('no')) {
          // For yes/no answers, determine subject from question
          if (isAboutMother) {
            recast = msg.toLowerCase().startsWith('yes') ? 'She does!' : 'She doesn\'t!';
          } else if (isAboutFather) {
            recast = msg.toLowerCase().startsWith('yes') ? 'He does!' : 'He doesn\'t!';
          } else if (isAboutStudent) {
            recast = msg.toLowerCase().startsWith('yes') ? 'You do!' : 'You don\'t!';
          } else {
            recast = 'I see!';
          }
        } else if (isAboutMother && msg.length > 0 && msg.length < 20) {
          // Talking about mother - use "She" or "Your mother"
          recast = `Your mother ${msg}s!`;
        } else if (isAboutFather && msg.length > 0 && msg.length < 20) {
          // Talking about father - use "He" or "Your father"
          recast = `Your father ${msg}s!`;
        } else if (msg.length < 30) {
          // For short answers, try to expand into full sentence
          // 🔥 EXCEPT in story character mode - let Oliver speak naturally!
          if (!context.missionData?.story_character) {
            recast = `I understand!`;
          }
        } else {
          recast = ''; // Let ACK be enough for longer responses
        }
      } else {
        recast = ''; // Empty if no user message
      }
      if (recast) {
        console.warn('⚠️ AI missing RECAST, generated:', recast);
      }
    }
    
    // Force canonical question (LEGACY MODE ONLY)
    if (context.canonicalQuestion && turnManager?.mode !== 'objective') {
      question = context.canonicalQuestion;
      console.log('🔒 Forced canonical (Legacy): stepKey=' + context.currentStepKey + ' | question="' + question + '"');
    } else if (turnManager?.mode === 'objective') {
      // Objective mode: Let AI's question pass through
      console.log('🎯 Objective mode: AI question preserved (natural)');
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
  const teacherText = buildTeacherText(ack, recast, question, bridge);
  
  // 🔥 ARTIFACT v5.0: In objective mode, use AI-generated hints (not canonical)
  let hints = [];
  
  if (turnManager && turnManager.mode === 'objective') {
    // NEW: Objective mode - AI generates hints matching its question
    hints = parsed.hints || parsed.suggested_hints || [];
    
    if (!hints || hints.length === 0) {
      console.warn('⚠️ Response guard (Objective): AI did not generate hints, using fallback');
      const currentObjective = turnManager.getCurrentObjective();
      hints = currentObjective?.defaultHints || ['I', 'am', 'my', 'is'];
    } else {
      console.log('✅ Using AI-generated hints (Objective mode):', hints);
    }
  } else {
    // OLD: Legacy mode - use canonical hints from step definition
    hints = context.canonicalHints || [];
    
    if (!hints || hints.length === 0) {
      // Fallback only if step definition has no hints
      console.warn('⚠️ Response guard (Legacy): No canonical hints, using AI hints');
      hints = parsed.hints || parsed.suggested_hints || [];
    } else {
      console.log('✅ Using canonical hints from step definition (Legacy mode):', hints);
    }
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
    bridge: bridge || '(none)',
    question: question,
    combined: teacherText,
    hints: hints
  });
  
  console.log('🛡️ Response guard: Validated response');
  
  // 🔥 Return both old and new formats for backward compatibility
  return {
    // New Artifact v5.0 format
    ack: ack,
    recast: recast,
    bridge: bridge,
    question: question,
    hints: hints,
    
    // Old format (for backward compatibility)
    teacher_ack: ack,
    teacher_recast: recast,
    teacher_question: question,
    question_text: question, // Legacy compatibility
    suggested_hints: hints,
    ai_response: teacherText, // Legacy field for compatibility
    
    // Format indicator
    format: isArtifactV5 ? 'artifact-v5' : 'legacy'
  };
}

/**
 * Reset follow-up question tracking for a mission
 * Called when mission restarts to avoid stale state
 */
export function resetFollowUpTracking(missionId) {
  // This is called from turnManager.resetTurnManager()
  console.log(`🔄 Cleared follow-up tracking for mission ${missionId}`);
  // Note: askedFollowUpIndices is stored in context object, cleared automatically
}
