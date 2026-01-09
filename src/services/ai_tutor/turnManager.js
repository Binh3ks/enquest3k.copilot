/**
 * TURN MANAGER - Story Mission State Machine
 * 
 * Manages conversation state for Story Missions to ensure:
 * 1. No repeated questions
 * 2. Student name remembered
 * 3. Deterministic step progression
 * 4. Natural conversation flow
 */

import { resetFollowUpTracking } from './utils/responseGuard.js';

/**
 * Canonicalize a question to a consistent key for comparison
 * This prevents asking the same question in different forms
 */
function canonicalizeQuestion(question) {
  if (!question) return '';
  
  let normalized = question.toLowerCase().trim();
  
  // Remove punctuation
  normalized = normalized.replace(/[?.!,]/g, '');
  
  // Normalize common variations
  const patterns = [
    // Name variations
    { pattern: /what(?:'?s| is) your name/, canonical: 'name' },
    { pattern: /(?:tell me )?your name/, canonical: 'name' },
    
    // Age variations
    { pattern: /how old (?:are )?you/, canonical: 'age' },
    { pattern: /what(?:'?s| is) your age/, canonical: 'age' },
    
    // Student status
    { pattern: /are you (?:a )?student/, canonical: 'student' },
    
    // Feelings
    { pattern: /how (?:are|do) you feel/, canonical: 'feeling' },
    { pattern: /are you (?:happy|excited|nervous)/, canonical: 'feeling' },
    
    // Backpack (Mission 2)
    { pattern: /do you have (?:a )?backpack/, canonical: 'has_backpack' },
    { pattern: /what color (?:is )?(?:your )?backpack/, canonical: 'backpack_color' },
    { pattern: /(?:what(?:'?s| is) )?in (?:your )?backpack/, canonical: 'backpack_contents' },
    { pattern: /do you have (?:any )?books/, canonical: 'has_books' },
    { pattern: /do you have (?:a )?notebook/, canonical: 'has_notebook' },
    { pattern: /do you like (?:your )?backpack/, canonical: 'like_backpack' },
    { pattern: /(?:is )?(?:your )?backpack (?:heavy|light)/, canonical: 'backpack_weight' },
    { pattern: /(?:is )?(?:your )?backpack (?:new|old)/, canonical: 'backpack_age' },
    
    // Teacher (Mission 3)
    { pattern: /(?:is )?(?:your )?teacher (?:nice|kind)/, canonical: 'teacher_nice' },
    { pattern: /(?:is )?(?:your )?teacher funny/, canonical: 'teacher_funny' },
    { pattern: /do you like (?:your )?teacher/, canonical: 'like_teacher' },
    { pattern: /what(?:'?s| is) (?:your )?teacher(?:'?s| ) name/, canonical: 'teacher_name' },
    { pattern: /(?:is )?(?:your )?school big/, canonical: 'school_size' },
    { pattern: /do you like (?:your )?school/, canonical: 'like_school' },
    { pattern: /(?:is )?(?:your )?classroom (?:nice|big)/, canonical: 'classroom' },
  ];
  
  for (const { pattern, canonical } of patterns) {
    if (pattern.test(normalized)) {
      return canonical;
    }
  }
  
  // Fallback: return first 5 words as key
  const words = normalized.split(/\s+/).slice(0, 5).join(' ');
  return words || normalized;
}

/**
 * Detect if student message is asking a question
 */
function isStudentQuestion(message) {
  if (!message) return false;
  
  const msg = message.trim().toLowerCase();
  
  // Check for question mark
  if (msg.includes('?')) return true;
  
  // Check for question patterns
  const questionStarters = [
    /^what/,
    /^where/,
    /^when/,
    /^who/,
    /^why/,
    /^how/,
    /^do you/,
    /^are you/,
    /^can you/,
    /^did you/,
    /^will you/,
    /^have you/,
    /^is your/,
  ];
  
  return questionStarters.some(pattern => pattern.test(msg));
}

/**
 * 🎯 MASTER ARTIFACT: Mission-specific deterministic step lists
 * Each mission has its own ordered stepKey sequence with CANONICAL questions
 */
function getMissionSteps(missionId, missionTitle) {
  const steps = {
    1: [ // Mission 1: Self-Introduction (First Day at School)
      { key: 'name', question: 'What is your name?', hints: ['My', 'name', 'is', 'I', 'am'] },
      { key: 'age', question: 'How old are you?', hints: ['I', 'am', 'years', 'old', 'eight', 'seven'] },
      { key: 'student', question: 'Are you a student?', hints: ['Yes', 'I', 'am', 'student', 'No'] },
      { key: 'like_school', question: 'Do you like school?', hints: ['Yes', 'I', 'like', 'school', 'No'] },
      { key: 'grade', question: 'What grade are you in?', hints: ['I', 'am', 'in', 'grade', 'one', 'two'] },
      { key: 'friends', question: 'Do you have friends?', hints: ['Yes', 'I', 'have', 'friends', 'many'] },
      { key: 'goodbye', question: null, hints: [] }
    ],
    2: [ // Mission 2: Backpack Adventure
      { key: 'have_backpack', question: 'Do you have a backpack?', hints: ['Yes', 'I', 'have', 'backpack', 'No'] },
      { key: 'color', question: 'What color is your backpack?', hints: ['My', 'backpack', 'is', 'blue', 'red', 'green'] },
      { key: 'inside_items', question: 'What is inside your backpack?', hints: ['I', 'have', 'books', 'pencils', 'notebook'] },
      { key: 'books_count', question: 'How many books do you have?', hints: ['I', 'have', 'two', 'three', 'four', 'books'] },
      { key: 'pencil_case', question: 'Do you have a pencil case?', hints: ['Yes', 'I', 'have', 'pencil', 'case'] },
      { key: 'favorite_item', question: 'What is your favorite item in your backpack?', hints: ['My', 'favorite', 'is', 'book', 'toy'] },
      { key: 'goodbye', question: null, hints: [] }
    ],
    3: [ // Mission 3: Teacher & School
      { key: 'teacher_name', question: "What is your teacher's name?", hints: ['My', 'teacher', 'name', 'is', 'Ms', 'Mr'] },
      { key: 'teacher_nice', question: 'Is your teacher nice?', hints: ['Yes', 'my', 'teacher', 'is', 'nice'] },
      { key: 'teacher_funny', question: 'Is your teacher funny?', hints: ['Yes', 'my', 'teacher', 'is', 'funny'] },
      { key: 'favorite_subject', question: 'What is your favorite subject?', hints: ['My', 'favorite', 'is', 'math', 'English', 'art'] },
      { key: 'class_rules', question: 'What are the class rules?', hints: ['We', 'must', 'listen', 'be', 'quiet', 'raise', 'hand'] },
      { key: 'say_thanks', question: 'Do you say thank you to your teacher?', hints: ['Yes', 'I', 'say', 'thank', 'you'] },
      { key: 'goodbye', question: null, hints: [] }
    ]
  };
  
  return steps[missionId] || steps[1];
}

/**
 * Turn Manager Class
 * Maintains state for a Story Mission conversation
 */
export class TurnManager {
  constructor(missionId, missionTitle) {
    // 🔥 CRITICAL: Enforce numeric missionId (hard error on NaN/undefined)
    const numericId = Number(missionId);
    if (isNaN(numericId) || numericId === 0) {
      const error = `❌ FATAL: TurnManager missionId must be valid number, got: ${missionId} (type: ${typeof missionId})`;
      console.error(error);
      throw new Error(error);
    }
    
    this.missionId = numericId;
    this.missionTitle = missionTitle;
    this.studentName = null;
    this.askedStepKeys = []; // 🔥 Array for ordered tracking
    this.lastAskedStepKey = null;
    this.currentStepIndex = 0;
    this.missionSteps = getMissionSteps(numericId, missionTitle);
    this.conversationHistory = [];
    
    console.log('🎯 TurnManager created for Mission', numericId, '| Title:', missionTitle);
    console.log('📋 Mission steps:', this.missionSteps.map(s => s.key).join(' → '));
  }
  
  /**
   * Update student name from message
   */
  captureStudentName(message) {
    if (!message) return;
    
    const msg = message.toLowerCase().trim();
    
    // Pattern: "my name is X"
    let match = msg.match(/my name is (\w+)/i);
    if (match) {
      this.studentName = this.capitalize(match[1]);
      return;
    }
    
    // Pattern: "I'm X" or "I am X" (but not "I am happy")
    match = msg.match(/i(?:'m| am) (\w+)/i);
    if (match && !['a', 'the', 'very', 'so', 'happy', 'sad', 'excited', 'student'].includes(match[1].toLowerCase())) {
      this.studentName = this.capitalize(match[1]);
      return;
    }
    
    // Pattern: "call me X"
    match = msg.match(/call me (\w+)/i);
    if (match) {
      this.studentName = this.capitalize(match[1]);
    }
  }
  
  capitalize(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  
  /**
   * Mark a step key as asked
   */
  markStepAsked(stepKey) {
    if (stepKey && stepKey !== 'goodbye' && !this.askedStepKeys.includes(stepKey)) {
      this.askedStepKeys.push(stepKey);
      this.lastAskedStepKey = stepKey;
      console.log('📝 TurnManager: Marked step as asked:', stepKey, '| Total asked:', this.askedStepKeys.length);
    }
  }
  
  /**
   * 🎯 MASTER ARTIFACT: Get canonical question for current stepKey
   * This ensures question text is deterministic and never varies
   */
  getCanonicalQuestion(stepKey) {
    const step = this.missionSteps.find(s => s.key === stepKey);
    return step ? step.question : null;
  }
  
  /**
   * Check if a step has been asked already
   */
  wasStepAsked(stepKey) {
    return this.askedStepKeys.includes(stepKey);
  }
  
  /**
   * Get next mission step (skip already asked)
   */
  getNextStep() {
    console.log('🔍 TurnManager: Finding next step | currentIndex:', this.currentStepIndex, '| askedStepKeys:', this.askedStepKeys);
    
    // 🔥 CRITICAL: Skip already-asked steps
    for (let i = this.currentStepIndex; i < this.missionSteps.length; i++) {
      const step = this.missionSteps[i];
      
      // Always return goodbye step when reached
      if (step.key === 'goodbye') {
        console.log('🏁 TurnManager: Reached goodbye step');
        return step;
      }
      
      // Skip if already asked
      if (this.askedStepKeys.includes(step.key)) {
        console.log('⏭️ TurnManager: Skipping already-asked step:', step.key, '(index', i, ')');
        continue;
      }
      
      // Found unasked step
      console.log('✅ TurnManager: Next step found:', step.key, '(index', i, ')');
      this.currentStepIndex = i; // Update current index
      return step;
    }
    
    // All steps asked - return closing
    console.log('🏁 TurnManager: All steps asked, returning closing');
    return this.missionSteps[this.missionSteps.length - 1];
  }
  
  /**
   * Process a turn and decide next action
   */
  processTurn(userMessage, isQuestion = false) {
    console.log('🎯 TurnManager: Processing turn | Student question?', isQuestion, '| Current index:', this.currentStepIndex);
    
    // Capture student name if present
    if (userMessage) {
      this.captureStudentName(userMessage);
    }
    
    // 🔥 FIXED: Do NOT advance index here - let getNextStep() find the next unanswered step
    // The index will update when getNextStep() finds an unasked step
    if (userMessage && userMessage.trim().length > 0 && this.lastAskedStepKey) {
      console.log('👉 TurnManager: Student replied to:', this.lastAskedStepKey);
      // getNextStep() will find the next unasked step automatically
    }
    
    const nextStep = this.getNextStep();
    
    if (isQuestion) {
      // Student asked a question - answer then steer to next step
      console.log('❓ TurnManager: Student question detected, will answer and steer to:', nextStep.key);
      return {
        type: 'answer_and_steer',
        nextStep: nextStep,
        studentName: this.studentName
      };
    }
    
    if (nextStep.key === 'goodbye') {
      console.log('🔚 TurnManager: Goodbye turn');
      return {
        type: 'goodbye',
        studentName: this.studentName
      };
    }
    
    // Normal turn - ask next step
    console.log('💬 TurnManager: Normal turn, asking step:', nextStep.key);
    this.markStepAsked(nextStep.key); // 🔥 Mark BEFORE returning
    
    return {
      type: 'ask_next',
      nextStep: nextStep,
      studentName: this.studentName
    };
  }
  
  /**
   * Get state for debugging
   */
  getState() {
    return {
      missionId: this.missionId,
      missionTitle: this.missionTitle,
      studentName: this.studentName,
      currentStepIndex: this.currentStepIndex,
      askedStepKeys: [...this.askedStepKeys], // 🔥 Array copy
      lastAskedStepKey: this.lastAskedStepKey,
      totalSteps: this.missionSteps.length
    };
  }
  
  /**
   * Get full state for LLM prompt injection
   */
  getFullState() {
    const nextStep = this.getNextStep();
    return {
      missionId: this.missionId,
      missionTitle: this.missionTitle,
      studentName: this.studentName,
      askedStepKeys: [...this.askedStepKeys], // 🔥 Array copy
      currentStepIndex: this.currentStepIndex,
      totalSteps: this.missionSteps.length,
      turnsRemaining: this.missionSteps.length - this.currentStepIndex - 1,
      lastAskedStepKey: this.lastAskedStepKey,
      nextStepKey: nextStep?.key,
      nextStepQuestion: nextStep?.question,
      isGoodbye: nextStep?.key === 'goodbye',
      allSteps: this.missionSteps.map(s => ({ key: s.key, question: s.question }))
    };
  }
}

/**
 * 🔥 ONE BRAIN: Singleton registry (prevents duplicate instances)
 */
const turnManagerRegistry = new Map(); // key: missionId (numeric)

/**
 * Register a TurnManager instance (throws if duplicate)
 */
export function registerTurnManager(turnManager) {
  const id = turnManager.missionId;
  
  if (turnManagerRegistry.has(id)) {
    console.log('♻️ TurnManager: Reusing existing manager for mission', id);
    return turnManagerRegistry.get(id);
  }
  
  turnManagerRegistry.set(id, turnManager);
  console.log('✅ TurnManager: Registered new manager for mission', id);
  return turnManager;
}

/**
 * Get TurnManager by missionId (returns null if not registered)
 */
export function getTurnManager(missionId) {
  const numericId = Number(missionId);
  if (isNaN(numericId)) {
    console.error('❌ getTurnManager: Invalid missionId', missionId);
    return null;
  }
  return turnManagerRegistry.get(numericId) || null;
}

/**
 * Reset TurnManager for a mission
 */
export function resetTurnManager(missionId) {
  const numericId = Number(missionId);
  turnManagerRegistry.delete(numericId);
  
  // 🔥 FIX: Also clear follow-up question tracking
  resetFollowUpTracking(numericId);
  
  console.log('🔄 TurnManager: Reset for mission', numericId);
}

/**
 * Export utilities for use elsewhere
 */
export { canonicalizeQuestion, isStudentQuestion, getMissionSteps };
