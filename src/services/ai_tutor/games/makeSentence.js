/**
 * Make a Sentence - Unscramble words to form correct sentence
 */

import { analyzeAnswer } from '../../../utils/smartCheck';

export function validateMakeSentence({ input, targetSentence }) {
  const clean = input.trim();
  if (!clean) {
    return { correct: false, message: 'Please type or speak your sentence.' };
  }

  const normalizeForComparison = (text) => text.toLowerCase().replace(/[.!?]+$/, '').trim();
  const inputNormalized = normalizeForComparison(clean);
  const targetNormalized = normalizeForComparison(targetSentence);

  if (inputNormalized === targetNormalized) {
    const startsWithCapital = /^[A-Z]/.test(clean);
    const hasProperEnding = /[.!?]$/.test(clean);
    
    if (!startsWithCapital) {
      return { correct: false, message: 'Start your sentence with a capital letter.' };
    }
    if (!hasProperEnding) {
      return { correct: false, message: 'End your sentence with . ! or ?' };
    }

    return { correct: true, message: 'Perfect! You unscrambled it!' };
  }

  const smart = analyzeAnswer(clean, targetSentence, 'critical');
  if (smart.isCorrect) {
    return { correct: true, message: smart.message || 'Close enough!' };
  }

  return { correct: false, message: smart.message || 'Not quite. Try arranging the words differently.' };
}
