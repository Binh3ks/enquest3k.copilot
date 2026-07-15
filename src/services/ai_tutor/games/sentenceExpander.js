/**
 * Sentence Expander - Multi-step sentence enrichment game
 * Step 1: Unscramble base sentence
 * Step 2: Add time phrase (Phase 4+: W19+)
 * Step 3: Add location phrase (Phase 5+ Advanced or Phase 6+ Easy)
 */

import { analyzeAnswer } from '../../../utils/smartCheck';

/**
 * Validate Sentence Expander input across 3 progressive steps
 * @param {object} params - Validation parameters
 * @param {string} params.input - Student input text
 * @param {number} params.step - Current step (1-3)
 * @param {string} params.baseSentence - Target sentence for Step 1
 * @param {string[]} params.timePhrases - Available time phrases for Step 2
 * @param {string[]} params.locationPhrases - Available location phrases for Step 3
 * @param {string[]} params.baseWords - Core words that must appear in all steps
 * @param {number} params.phase - Current learning phase
 * @param {string} params.learningMode - 'easy' or 'advanced'
 * @returns {object} { correct: boolean, message: string }
 */
export function validateSentenceExpander({
  input,
  step,
  baseSentence,
  timePhrases = [],
  locationPhrases = [],
  baseWords = [],
  phase = 1,
  learningMode = 'easy'
}) {
  const clean = input.trim();
  if (!clean) {
    return { correct: false, message: 'Please type or speak your sentence.' };
  }

  // Normalize for comparison
  const normalizeForComparison = (text) => text.toLowerCase().replace(/[.!?]+$/, '').trim();
  const inputNormalized = normalizeForComparison(clean);
  
  // Check capital and punctuation (required for all steps)
  const startsWithCapital = /^[A-Z]/.test(clean);
  const hasProperEnding = /[.!?]$/.test(clean);
  
  if (!startsWithCapital) {
    return { correct: false, message: 'Start your sentence with a capital letter.' };
  }
  if (!hasProperEnding) {
    return { correct: false, message: 'End your sentence with . ! or ?' };
  }

  // STEP 1: Unscramble base sentence
  if (step === 1) {
    const targetNormalized = normalizeForComparison(baseSentence);
    
    if (inputNormalized === targetNormalized) {
      const nextStepMessage = phase >= 4
        ? '✓ Perfect! Now add WHEN this happens - choose a time phrase.'
        : '✓ Perfect! You unscrambled it! Moving to next sentence.';
      return { correct: true, message: nextStepMessage };
    }

    // Try SmartCheck for near-matches
    const smart = analyzeAnswer(clean, baseSentence, 'critical');
    if (smart.isCorrect) {
      return { correct: true, message: smart.message || 'Close enough!' };
    }

    return { correct: false, message: smart.message || 'Not quite. Try arranging the words differently.' };
  }

  // STEP 2: Add time phrase (Phase 4+: W19+)
  if (step === 2) {
    // Check all base words are present
    const missingWords = baseWords.filter(word => {
      const wordRegex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return !wordRegex.test(clean);
    });
    
    if (missingWords.length > 0) {
      return { correct: false, message: `Include the core words: ${missingWords.join(', ')}.` };
    }
    
    // Check if at least one time phrase is present
    const hasTimePhrase = timePhrases.some(phrase => {
      const phraseRegex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      return phraseRegex.test(clean);
    });
    
    if (!hasTimePhrase) {
      const examples = timePhrases.slice(0, 3).join(', ');
      return { correct: false, message: `Add a time phrase like: ${examples}.` };
    }
    
    // Count words (should be longer than base)
    const wordCount = clean.split(/\s+/).length;
    const baseWordCount = baseSentence.split(/\s+/).length;
    
    if (wordCount <= baseWordCount) {
      return { correct: false, message: 'Your sentence should be longer than the base sentence!' };
    }
    
    // SmartCheck for grammar
    const smart = analyzeAnswer(clean, clean, 'critical');
    if (smart.status === 'warning' || smart.status === 'incorrect') {
      return { correct: false, message: smart.message };
    }
    
    // Check if can access Step 3
    const canAccessStep3 = learningMode === 'advanced' ? (phase >= 5) : (phase >= 6);
    const nextStepMessage = canAccessStep3
      ? '✓ Great timing! Now add WHERE this happens - choose a location.'
      : '✓ Perfect sentence! Moving to next one.';
    
    return { correct: true, message: nextStepMessage };
  }

  // STEP 3: Add location phrase (Phase 5+ Advanced, Phase 6+ Easy)
  if (step === 3) {
    // Check all base words are present
    const missingWords = baseWords.filter(word => {
      const wordRegex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return !wordRegex.test(clean);
    });
    
    if (missingWords.length > 0) {
      return { correct: false, message: `Include the core words: ${missingWords.join(', ')}.` };
    }
    
    // Check if at least one time phrase is present
    const hasTimePhrase = timePhrases.some(phrase => {
      const phraseRegex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      return phraseRegex.test(clean);
    });
    
    if (!hasTimePhrase) {
      return { correct: false, message: 'Keep your time phrase from Step 2!' };
    }
    
    // Check if at least one location phrase is present
    const hasLocationPhrase = locationPhrases.some(phrase => {
      const phraseRegex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      return phraseRegex.test(clean);
    });
    
    if (!hasLocationPhrase) {
      const examples = locationPhrases.slice(0, 3).join(', ');
      return { correct: false, message: `Add a location phrase like: ${examples}.` };
    }
    
    // Check word count is sufficiently expanded
    const wordCount = clean.split(/\s+/).length;
    const baseWordCount = baseSentence.split(/\s+/).length;
    
    if (wordCount <= baseWordCount + 2) {
      return { correct: false, message: 'Your sentence should have both time AND location!' };
    }
    
    // SmartCheck for final grammar validation
    const smart = analyzeAnswer(clean, clean, 'critical');
    if (smart.status === 'warning' || smart.status === 'incorrect') {
      return { correct: false, message: smart.message };
    }
    
    return { correct: true, message: '✓ Amazing expanded sentence! Moving to next one.' };
  }

  return { correct: false, message: 'Try again.' };
}
