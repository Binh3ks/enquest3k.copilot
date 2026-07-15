/**
 * VOCAB MASTERY TRACKER
 * Tracks individual vocabulary word usage and mastery (0-100 score per word)
 * 
 * SCORING SYSTEM:
 * - Start: 0 (unknown)
 * - Successful use: +5 points
 * - Avoidance after AI suggestion: -2 points
 * - Cap: 100 (mastered)
 * 
 * USAGE DETECTION:
 * - Analyze user input for target vocab words
 * - Check if AI suggested a word but student avoided it
 * - Track frequency and context of usage
 */

// ============================================
// CONFIGURATION
// ============================================

const MASTERY_CONFIG = {
  // Score increments
  SUCCESSFUL_USE: 5,
  AVOIDANCE_PENALTY: -2,
  
  // Score boundaries
  MIN_SCORE: 0,
  MAX_SCORE: 100,
  
  // Mastery thresholds
  THRESHOLD_BEGINNER: 0,    // 0-25: Just learning
  THRESHOLD_LEARNING: 25,   // 25-50: Practicing
  THRESHOLD_FAMILIAR: 50,   // 50-75: Getting comfortable
  THRESHOLD_MASTERED: 75,   // 75-100: Confident use
  
  // Detection settings
  MIN_WORD_LENGTH: 3,       // Ignore words < 3 chars (I, am, is, etc.)
  CONTEXT_WINDOW: 5,        // Track last N turns for suggestion context
};

// ============================================
// CORE FUNCTIONS
// ============================================

/**
 * Initialize vocab mastery object from week syllabus
 * @param {Array<string>} targetVocab - Array of target vocabulary words
 * @returns {Object} vocabMastery - { word: { score, uses, lastUsed, suggested } }
 */
export function initializeVocabMastery(targetVocab) {
  const vocabMastery = {};
  
  targetVocab.forEach(word => {
    const normalizedWord = normalizeWord(word);
    vocabMastery[normalizedWord] = {
      score: 0,
      uses: 0,
      lastUsed: null,
      suggested: false,     // Whether AI recently suggested this word
      avoidances: 0,        // Count of times student avoided after suggestion
    };
  });
  
  return vocabMastery;
}

/**
 * Detect which target vocab words were used in user input
 * @param {string} userInput - Student's message
 * @param {Array<string>} targetVocab - Target vocabulary list
 * @returns {Array<string>} usedWords - Words that were detected
 */
export function detectVocabUsage(userInput, targetVocab) {
  if (!userInput || !targetVocab || targetVocab.length === 0) {
    return [];
  }
  
  const normalizedInput = userInput.toLowerCase();
  const usedWords = [];
  
  targetVocab.forEach(word => {
    const normalizedWord = normalizeWord(word);
    
    // Check for exact word match (with word boundaries)
    const wordRegex = new RegExp(`\\b${normalizedWord}\\b`, 'i');
    if (wordRegex.test(normalizedInput)) {
      usedWords.push(normalizedWord);
    }
  });
  
  return usedWords;
}

/**
 * Detect which words AI suggested (mentioned in hints or response)
 * @param {Object} aiResponse - AI response with text and hints
 * @param {Array<string>} targetVocab - Target vocabulary list
 * @returns {Array<string>} suggestedWords - Words AI suggested
 */
export function detectAISuggestions(aiResponse, targetVocab) {
  if (!aiResponse || !targetVocab || targetVocab.length === 0) {
    return [];
  }
  
  const suggestedWords = [];
  const fullText = [
    aiResponse.text || '',
    ...(aiResponse.hints || [])
  ].join(' ').toLowerCase();
  
  targetVocab.forEach(word => {
    const normalizedWord = normalizeWord(word);
    
    // Check if word appears in AI response or hints
    const wordRegex = new RegExp(`\\b${normalizedWord}\\b`, 'i');
    if (wordRegex.test(fullText)) {
      suggestedWords.push(normalizedWord);
    }
  });
  
  return suggestedWords;
}

/**
 * Update vocab mastery scores based on usage
 * @param {Object} vocabMastery - Current mastery object
 * @param {Array<string>} usedWords - Words student used
 * @param {Array<string>} suggestedWords - Words AI suggested
 * @returns {Object} updatedMastery - Updated mastery object
 */
export function updateVocabMastery(vocabMastery, usedWords, suggestedWords) {
  const updated = { ...vocabMastery };
  const now = Date.now();
  
  // Mark suggested words
  suggestedWords.forEach(word => {
    const normalizedWord = normalizeWord(word);
    if (updated[normalizedWord]) {
      updated[normalizedWord].suggested = true;
    }
  });
  
  // Process used words: +5 points
  usedWords.forEach(word => {
    const normalizedWord = normalizeWord(word);
    if (updated[normalizedWord]) {
      const current = updated[normalizedWord];
      updated[normalizedWord] = {
        ...current,
        score: Math.min(current.score + MASTERY_CONFIG.SUCCESSFUL_USE, MASTERY_CONFIG.MAX_SCORE),
        uses: current.uses + 1,
        lastUsed: now,
        suggested: false, // Reset suggestion flag after use
      };
    }
  });
  
  // Detect avoidances: -2 points for suggested but not used
  Object.keys(updated).forEach(word => {
    const entry = updated[word];
    if (entry.suggested && !usedWords.includes(word)) {
      // Word was suggested but student didn't use it
      updated[word] = {
        ...entry,
        score: Math.max(entry.score + MASTERY_CONFIG.AVOIDANCE_PENALTY, MASTERY_CONFIG.MIN_SCORE),
        avoidances: entry.avoidances + 1,
        suggested: false, // Reset suggestion flag
      };
    }
  });
  
  return updated;
}

/**
 * Get mastery level label for a score
 * @param {number} score - Mastery score (0-100)
 * @returns {string} level - beginner/learning/familiar/mastered
 */
export function getMasteryLevel(score) {
  if (score >= MASTERY_CONFIG.THRESHOLD_MASTERED) return 'mastered';
  if (score >= MASTERY_CONFIG.THRESHOLD_FAMILIAR) return 'familiar';
  if (score >= MASTERY_CONFIG.THRESHOLD_LEARNING) return 'learning';
  return 'beginner';
}

/**
 * Get color for mastery level (for UI display)
 * @param {number} score - Mastery score (0-100)
 * @returns {string} color - Tailwind color class
 */
export function getMasteryColor(score) {
  if (score >= MASTERY_CONFIG.THRESHOLD_MASTERED) return 'bg-green-500';
  if (score >= MASTERY_CONFIG.THRESHOLD_FAMILIAR) return 'bg-blue-500';
  if (score >= MASTERY_CONFIG.THRESHOLD_LEARNING) return 'bg-yellow-500';
  return 'bg-gray-400';
}

/**
 * Get words that need more practice (score < 50)
 * @param {Object} vocabMastery - Mastery object
 * @returns {Array<Object>} needsPractice - Words with score, sorted by score
 */
export function getWordsNeedingPractice(vocabMastery) {
  return Object.entries(vocabMastery)
    .filter(([_, data]) => data.score < MASTERY_CONFIG.THRESHOLD_FAMILIAR)
    .map(([word, data]) => ({ word, ...data }))
    .sort((a, b) => a.score - b.score);
}

/**
 * Get mastered words (score >= 75)
 * @param {Object} vocabMastery - Mastery object
 * @returns {Array<string>} masteredWords - List of mastered words
 */
export function getMasteredWords(vocabMastery) {
  return Object.entries(vocabMastery)
    .filter(([_, data]) => data.score >= MASTERY_CONFIG.THRESHOLD_MASTERED)
    .map(([word, _]) => word);
}

/**
 * Calculate overall mastery progress (0-100)
 * @param {Object} vocabMastery - Mastery object
 * @returns {number} progress - Average mastery score
 */
export function calculateOverallProgress(vocabMastery) {
  const words = Object.values(vocabMastery);
  if (words.length === 0) return 0;
  
  const totalScore = words.reduce((sum, data) => sum + data.score, 0);
  return Math.round(totalScore / words.length);
}

/**
 * Get words by mastery level
 * @param {Object} vocabMastery - Mastery object
 * @returns {Object} grouped - { beginner: [], learning: [], familiar: [], mastered: [] }
 */
export function groupWordsByMastery(vocabMastery) {
  const grouped = {
    beginner: [],
    learning: [],
    familiar: [],
    mastered: []
  };
  
  Object.entries(vocabMastery).forEach(([word, data]) => {
    const level = getMasteryLevel(data.score);
    grouped[level].push({ word, ...data });
  });
  
  return grouped;
}

/**
 * Generate adaptive vocab focus based on mastery
 * @param {Object} vocabMastery - Mastery object
 * @returns {string} focusPrompt - Prompt addition for AI to encourage weak words
 */
export function generateVocabFocusPrompt(vocabMastery) {
  const needsPractice = getWordsNeedingPractice(vocabMastery);
  
  if (needsPractice.length === 0) {
    return ''; // All words mastered, no special focus needed
  }
  
  // Get top 3 weakest words
  const weakWords = needsPractice.slice(0, 3).map(w => w.word);
  
  return `\n\n🎯 VOCAB FOCUS: Student needs practice with: ${weakWords.join(', ')}. Try to naturally encourage using these words in conversation (but don't force it).`;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Normalize word for consistent comparison
 * @param {string} word - Word to normalize
 * @returns {string} normalized - Lowercase, trimmed word
 */
function normalizeWord(word) {
  return word.toLowerCase().trim();
}

/**
 * Export all functions and config
 */
export default {
  initializeVocabMastery,
  detectVocabUsage,
  detectAISuggestions,
  updateVocabMastery,
  getMasteryLevel,
  getMasteryColor,
  getWordsNeedingPractice,
  getMasteredWords,
  calculateOverallProgress,
  groupWordsByMastery,
  generateVocabFocusPrompt,
  MASTERY_CONFIG,
};
