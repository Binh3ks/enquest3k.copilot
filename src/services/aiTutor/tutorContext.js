/**
 * TUTOR CONTEXT BUILDER
 * Always includes: weekId, topic, grammar, vocab, difficulty
 * Never allows AI calls without context
 */

import syllabusDB from '../../data/syllabus_database';
import { TutorDifficulty, DifficultyConstraints, LearnerStyle } from './tutorModes';

/**
 * Build complete context for AI Tutor
 * @param {Object} weekData - Week content data
 * @param {string} mode - Tutor mode
 * @param {Object} options - Additional options
 * @returns {TutorContext}
 */
export function buildTutorContext(weekData, mode, options = {}) {
  const weekId = weekData?.weekId || 1;
  const weekInfo = syllabusDB[weekId] || {};
  
  // Determine difficulty
  const difficulty = options.difficulty || (
    weekId <= 14 ? TutorDifficulty.EASY :
    weekId <= 50 ? TutorDifficulty.NORMAL :
    TutorDifficulty.CHALLENGE
  );
  
  // Extract vocab
  const vocabList = weekData?.stations?.new_words?.vocab || [];
  const coreVocab = vocabList.slice(0, 10).map(v => v.word);
  const bonusVocab = vocabList.slice(10, 20).map(v => v.word);
  
  // Build context
  const context = {
    weekId,
    unitTitle: weekData?.weekTitle_en || 'English Learning',
    topic: weekInfo.topic?.[0] || 'English',
    grammarFocus: weekInfo.grammar?.join(', ') || 'basic grammar',
    mathFocus: weekInfo.math || 'counting',
    scienceFocus: weekInfo.science || 'observation',
    coreVocab,
    bonusVocab,
    difficulty,
    
    learner: {
      level: weekId <= 14 ? 'beginner' : weekId <= 50 ? 'intermediate' : 'advanced',
      style: options.learnerStyle || LearnerStyle.NORMAL,
      name: options.learnerName
    },
    
    constraints: DifficultyConstraints[difficulty],
    
    gates: {
      debateUnlocked: weekId >= 15
    },
    
    memory: options.memory || {
      lastMathHashes: [],
      lastScienceHashes: [],
      lastTopics: [],
      vocabMastery: {}
    },
    
    mode
  };
  
  return context;
}

/**
 * Validate context before AI call
 * @param {TutorContext} context
 * @throws {Error} if context is invalid
 */
export function validateContext(context) {
  if (!context) {
    throw new Error('[TutorContext] Context is required');
  }
  
  if (!context.weekId) {
    throw new Error('[TutorContext] weekId is required');
  }
  
  if (!context.mode) {
    throw new Error('[TutorContext] mode is required');
  }
  
  if (!context.coreVocab || context.coreVocab.length === 0) {
    throw new Error('[TutorContext] coreVocab is required');
  }
  
  if (!context.constraints) {
    throw new Error('[TutorContext] constraints are required');
  }
  
  return true;
}

/**
 * Get adaptive constraints based on learner memory
 * @param {Object} memory - Long-term memory
 * @param {Object} baseConstraints - Base constraints
 * @returns {Object} Adjusted constraints
 */
export function getAdaptiveConstraints(memory, baseConstraints) {
  const constraints = { ...baseConstraints };
  
  // Adjust based on learner style
  if (memory.learnerProfile?.style === 'shy') {
    constraints.userMinWords = Math.max(3, constraints.userMinWords - 2);
    // Scaffold earlier for shy learners
  } else if (memory.learnerProfile?.style === 'confident') {
    constraints.userMinWords += 2;
    constraints.userTargetWords += 3;
  }
  
  // Adjust based on average sentence length
  if (memory.learnerProfile?.avgSentenceLength) {
    const avg = memory.learnerProfile.avgSentenceLength;
    if (avg < 5) {
      constraints.userMinWords = Math.max(3, constraints.userMinWords - 1);
    } else if (avg > 12) {
      constraints.userTargetWords += 2;
    }
  }
  
  return constraints;
}
