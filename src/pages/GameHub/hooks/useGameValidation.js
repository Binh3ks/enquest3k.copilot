/**
 * Game Validation Hook - New GameHub
 */

import { useState, useCallback, useRef } from 'react';
import { getCumulativeVocabulary, getGameData } from '../../../config/gameAdaptation';
import { validateShowTell, buildFrameRegexes } from '../../../services/ai_tutor/games/showTellLadder';
import { validateMakeSentence } from '../../../services/ai_tutor/games/makeSentence';
import { validateSentenceExpander } from '../../../services/ai_tutor/games/sentenceExpander';
import { validateAskMeQuestion } from '../../../services/ai_tutor/games/askMe';

/**
 * Map week number to learning phase
 * Aligned to syllabus blocks and grammar progression
 * @param {number} weekNumber - Week number (1-156)
 * @returns {number} Phase number (1-11)
 */
export function getPhase(weekNumber) {
  if (weekNumber <= 8) return 1;    // Block A: W1-8 (Identity + Environment)
  if (weekNumber <= 14) return 2;   // Block A2: W9-14 (Community + Routines)
  if (weekNumber <= 18) return 3;   // Block A3: W15-18 (Present Continuous)
  if (weekNumber <= 28) return 4;   // Block B1: W19-28 (Past state, regular past)
  if (weekNumber <= 36) return 5;   // Block B2: W29-36 (Irregular past, storytelling)
  if (weekNumber <= 54) return 6;   // Block C: W37-54 (CLIL foundations)
  if (weekNumber <= 66) return 7;   // Block D: W55-66 (Cause/Effect, Problem/Solution)
  if (weekNumber <= 84) return 8;   // Block E: W67-84 (Persuasion systems)
  if (weekNumber <= 104) return 9;  // Block F: W85-104 (Advanced systems)
  if (weekNumber <= 120) return 10; // Block G: W105-120 (Project cycles)
  return 11;                        // Block H: W121-156 (Debate, synthesis)
}

const GRAMMAR_GUARD = {
  PAST_SIMPLE_VERBS: [
    'was', 'were', 'had', 'did', 'went', 'came', 'saw', 'made', 'got', 'gave',
    'took', 'told', 'found', 'knew', 'thought', 'felt', 'kept', 'left', 'met',
    'brought', 'bought', 'taught', 'caught', 'fought', 'said', 'put', 'read',
    'ate', 'drank', 'slept', 'ran', 'swam', 'sang', 'wrote', 'drew', 'played'
  ],
  PAST_SIMPLE_PHRASES: ['yesterday', 'last week', 'last month', 'last year', 'ago', 'in the past'],
  FUTURE_TENSE: ['will', 'shall', 'gonna'],
  FUTURE_PHRASES: ['going to', 'tomorrow', 'next week', 'next month', 'next year', 'in the future']
};

/**
 * Grammar Guard - Phase-based tense restrictions
 * Prevents students from using grammar structures before they are taught
 * @param {string} input - Student input text
 * @param {number} weekNumber - Current week number
 * @returns {object} { valid: boolean, error?: string }
 */
function checkGrammarGuard(input, weekNumber) {
  const lower = input.toLowerCase();
  
  // ===== PAST TENSE GUARD (Week 19+) =====
  // Block past tense verbs and phrases before Week 19 (Block B1)
  // Use word boundary regex to avoid false positives (e.g. "read" inside "reading")
  if (weekNumber < 19) {
    for (const verb of GRAMMAR_GUARD.PAST_SIMPLE_VERBS) {
      if (new RegExp(`\\b${verb}\\b`, 'i').test(lower)) {
        return { valid: false, error: `We have not learned "${verb}" yet. Use present tense.` };
      }
    }
    for (const phrase of GRAMMAR_GUARD.PAST_SIMPLE_PHRASES) {
      if (lower.includes(phrase)) {
        return { valid: false, error: `We have not learned "${phrase}" yet.` };
      }
    }
  }
  
  // ===== FUTURE TENSE GUARD (Week 55+) =====
  // Block future tense words and phrases before Week 55 (Block D)
  if (weekNumber < 55) {
    for (const word of GRAMMAR_GUARD.FUTURE_TENSE) {
      if (new RegExp(`\\b${word}\\b`, 'i').test(lower)) {
        return { valid: false, error: `We have not learned future tense yet. Use present tense.` };
      }
    }
    for (const phrase of GRAMMAR_GUARD.FUTURE_PHRASES) {
      if (lower.includes(phrase)) {
        return { valid: false, error: `We have not learned future tense yet.` };
      }
    }
  }
  
  // ===== PRESENT CONTINUOUS CHECK (Week 15+) =====
  // Ensure proper use of present continuous from Week 15 (Block A3)
  // Note: We don't strictly enforce this, just validate proper structure
  if (weekNumber >= 15) {
    // Check if sentence has -ing verb without proper continuous form
    const hasIngVerb = /\b\w+ing\b/.test(lower);
    const hasBeVerb = /\b(is|are|am|was|were)\s+\w+ing\b/.test(lower);
    
    // If has -ing word but not in proper continuous form, might be gerund (acceptable)
    // Just ensure if using continuous, it's grammatically correct
    if (hasIngVerb && !hasBeVerb && weekNumber < 19) {
      // Between W15-18, -ing should be with be verb for present continuous
      const isGerund = /\b(like|love|enjoy|start|stop|keep)\s+\w+ing\b/.test(lower);
      if (!isGerund) {
        // Check if it's a continuous form attempt
        const words = lower.split(/\s+/);
        const ingIndex = words.findIndex(w => w.endsWith('ing'));
        if (ingIndex > 0) {
          const prevWord = words[ingIndex - 1];
          if (!['is', 'are', 'am'].includes(prevWord)) {
            // This might be incorrect continuous - but let SmartCheck handle it
            // Don't block here as -ing can be used in other contexts
          }
        }
      }
    }
  }
  
  return { valid: true };
}

export function useGameValidation(gameId, weekNumber, learningMode = 'advanced') {
  const [gameState, setGameState] = useState(null);
  const [turnCount, setTurnCount] = useState(0);
  const vocabCache = useRef(null);

  const getVocabulary = useCallback(() => {
    if (!vocabCache.current) {
      vocabCache.current = getCumulativeVocabulary(weekNumber, learningMode);
    }
    return vocabCache.current;
  }, [weekNumber, learningMode]);

  const initializeGame = useCallback(() => {
    const vocab = getVocabulary();
    const gameConfig = getGameData(weekNumber, learningMode, gameId) || {};
    const currentPhase = getPhase(weekNumber);

    let initialState = {};
    if (gameId === 'show_tell') {
      const wordList = Array.isArray(gameConfig.word_list) && gameConfig.word_list.length > 0
        ? gameConfig.word_list
        : vocab;
      
      // Determine steps based on phase + mode (aligned to syllabus with dual-mode progression)
      let stepsTotal = 3; // Default: W1-14 (Phase 1-2) both modes
      
      // Step 4 (second sentence): Phase 3+ (W15+) both modes
      if (currentPhase >= 3) {
        stepsTotal = 4;
      }
      
      // Step 5 (connectors + mini story): Dual-mode timing
      // Advanced: Phase 4+ (W19+, connectors learned at W25)
      // Easy: Phase 6+ (W37+)
      if (learningMode === 'advanced' && currentPhase >= 4) {
        stepsTotal = 5;
      } else if (learningMode === 'easy' && currentPhase >= 6) {
        stepsTotal = 5;
      }
      
      initialState = {
        currentWord: wordList[0],
        wordIndex: 0,
        step: 1,
        stepsTotal,
        wordList,
        gameConfig,
        phase: currentPhase,
        weekNumber,
        learningMode
      };
    } else if (gameId === 'make_sentence') {
      // Sentence Expander: Multi-step progression
      // Phase 1-3 (W1-18): Step 1 only (unscramble)
      // Phase 4 (W19-28): Step 2 for both modes (+ time phrase)
      // Phase 5 (W29-36): Step 3 for Advanced, Step 2 for Easy
      // Phase 6+ (W37+): Step 3 for both modes (+ location phrase)
      let stepsTotal;
      if (currentPhase <= 3) {
        stepsTotal = 1; // Simple unscramble
      } else if (currentPhase === 4) {
        stepsTotal = 2; // Both modes: add time context
      } else if (currentPhase === 5) {
        stepsTotal = learningMode === 'advanced' ? 3 : 2;
      } else {
        stepsTotal = 3; // Both modes: full expansion
      }
      
      initialState = {
        step: 1,
        stepsTotal,
        patternIndex: 0,
        correctCount: 0,
        totalPatterns: 10,
        gameConfig,
        phase: currentPhase,
        weekNumber,
        learningMode
      };
    } else if (gameId === 'ask_me') {
      initialState = {
        contextIndex: 0,
        questionCount: 0,
        totalQuestions: 10,
        questionStep: 0,
        gameConfig,
        phase: currentPhase,
        weekNumber
      };
    }

    setGameState(initialState);
    setTurnCount(0);
    return initialState;
  }, [gameId, weekNumber, learningMode, getVocabulary]);

  const validateInput = useCallback((studentInput) => {
    if (!gameState) return { valid: false, feedback: 'Game not initialized.' };

    const grammarCheck = checkGrammarGuard(studentInput, weekNumber);
    if (!grammarCheck.valid) {
      return { valid: false, feedback: grammarCheck.error };
    }

    const vocab = getVocabulary();

    let result = { valid: true, correct: false, feedback: 'Try again.' };
    let newState = { ...gameState };

    if (gameId === 'show_tell') {
      const config = gameState.gameConfig || {};
      const framesDefault = (learningMode === 'easy' ? config.frames_easy : config.frames_advanced) || [];
      const detailsDefault = (learningMode === 'easy' ? config.details_easy : config.details_advanced) || [];
      const wordList = gameState.wordList || vocab;
      const word = gameState.currentWord || wordList[0];
      const wordKey = word?.toLowerCase();
      const frameMap = config.frame_map || {};
      const detailMap = config.detail_map || {};
      const frames = frameMap[wordKey] || framesDefault;
      const details = detailMap[wordKey] || detailsDefault;
      const frameRegexes = buildFrameRegexes(frames);

      const validation = validateShowTell({
        input: studentInput,
        step: gameState.step,
        word,
        details,
        frameRegexes,
        phase: gameState.phase || 1,
        weekNumber: gameState.weekNumber || weekNumber,
        learningMode: gameState.learningMode || learningMode // Mode-aware connector validation
      });

      if (validation.correct) {
        if (gameState.step < gameState.stepsTotal) {
          newState.step = gameState.step + 1;
        } else {
          const nextIndex = gameState.wordIndex + 1;
          newState.wordIndex = nextIndex;
          newState.currentWord = wordList[nextIndex % wordList.length];
          newState.step = 1;
        }
      }

      result = {
        valid: true,
        correct: validation.correct,
        feedback: validation.message,
        newState
      };
    }

    if (gameId === 'make_sentence') {
      const config = gameState.gameConfig || {};
      const sentences = (learningMode === 'easy' ? config.sentences_easy : config.sentences_advanced) || [];
      const currentIndex = gameState.patternIndex % Math.max(sentences.length, 1);
      const sentenceData = sentences[currentIndex] || { answer: '' };
      
      // Use Sentence Expander validation for multi-step progression
      const validation = validateSentenceExpander({
        input: studentInput,
        step: gameState.step || 1,
        baseSentence: sentenceData.answer,
        timePhrases: sentenceData.time_phrases || [],
        locationPhrases: sentenceData.location_phrases || [],
        baseWords: sentenceData.base_words || sentenceData.answer.toLowerCase().split(/\s+/),
        phase: gameState.phase || 1,
        learningMode: gameState.learningMode || learningMode
      });

      if (validation.correct) {
        // Multi-step progression logic
        if (gameState.step < gameState.stepsTotal) {
          // Advance to next step with same sentence
          newState.step = gameState.step + 1;
        } else {
          // Completed all steps, move to next sentence
          newState.patternIndex = gameState.patternIndex + 1;
          newState.correctCount = gameState.correctCount + 1;
          newState.step = 1; // Reset to step 1 for next sentence
        }
      }

      result = {
        valid: true,
        correct: validation.correct,
        feedback: validation.message,
        newState
      };
    }

    if (gameId === 'ask_me') {
      const config = gameState.gameConfig || {};
      const contexts = (learningMode === 'easy' ? config.contexts_easy : config.contexts_advanced) || [];
      const context = contexts[gameState.contextIndex % Math.max(contexts.length, 1)] || {};
      const taskType = context.task_type || 'find_question';
      const defaultRequired = learningMode === 'easy'
        ? config.required_question_words_easy
        : config.required_question_words_advanced;

      let requiredWords = defaultRequired || [];
      let requiredKeywords = context.required_keywords || [];
      let acceptedQuestions = context.acceptedQuestions || [];

      if (taskType === 'mini_interview') {
        const steps = context.steps || [];
        const step = steps[gameState.questionStep] || {};
        requiredWords = step.required_question_words || requiredWords;
        requiredKeywords = step.required_keywords || requiredKeywords;
        acceptedQuestions = step.acceptedQuestions || acceptedQuestions;
      } else if (context.required_question_words) {
        requiredWords = context.required_question_words;
      }

      const validation = validateAskMeQuestion({
        input: studentInput,
        requiredWords,
        requiredKeywords,
        acceptedQuestions
      });

      if (validation.valid) {
        if (taskType === 'mini_interview') {
          const steps = context.steps || [];
          if (gameState.questionStep < steps.length - 1) {
            newState.questionStep = gameState.questionStep + 1;
          } else {
            newState.questionStep = 0;
            newState.questionCount = gameState.questionCount + 1;
            newState.contextIndex = gameState.contextIndex + 1;
          }
        } else {
          newState.questionCount = gameState.questionCount + 1;
          newState.contextIndex = gameState.contextIndex + 1;
        }
      }

      result = {
        valid: validation.valid,
        correct: validation.valid,
        feedback: validation.message,
        newState
      };
    }

    setTurnCount((prev) => prev + 1);
    setGameState(newState);
    return { ...result, turnCount: turnCount + 1 };
  }, [gameState, gameId, weekNumber, learningMode, getVocabulary, turnCount]);

  const isGameComplete = useCallback(() => {
    if (!gameState) return false;
    if (gameId === 'show_tell') {
      const total = gameState.wordList?.length || 0;
      return total > 0 ? gameState.wordIndex >= total : false;
    }
    if (gameId === 'make_sentence') return gameState.correctCount >= gameState.totalPatterns;
    if (gameId === 'ask_me') return gameState.questionCount >= gameState.totalQuestions;
    return false;
  }, [gameState, gameId]);

  const getProgress = useCallback(() => {
    if (!gameState) return { current: 0, total: 0, percentage: 0 };
    if (gameId === 'show_tell') {
      const total = gameState.wordList?.length || 0;
      const current = Math.min(gameState.wordIndex, total);
      return { current, total, percentage: Math.round((current / total) * 100) };
    }
    if (gameId === 'make_sentence') {
      return {
        current: gameState.correctCount,
        total: gameState.totalPatterns,
        percentage: Math.round((gameState.correctCount / gameState.totalPatterns) * 100)
      };
    }
    if (gameId === 'ask_me') {
      return {
        current: gameState.questionCount,
        total: gameState.totalQuestions,
        percentage: Math.round((gameState.questionCount / gameState.totalQuestions) * 100)
      };
    }
    return { current: 0, total: 0, percentage: 0 };
  }, [gameState, gameId]);

  return {
    gameState,
    initializeGame,
    validateInput,
    isGameComplete,
    getProgress,
    turnCount,
    vocabulary: getVocabulary()
  };
}

// Export grammar guard for use in other components (e.g., StoryMissionTab)
export { checkGrammarGuard };
