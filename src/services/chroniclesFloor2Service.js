/**
 * chroniclesFloor2Service.js — Dedicated content provider for Chronicles Floor 2 Door 3 (Ancient Scroll Cloze)
 * 
 * Provides week-specific CLIL cloze passages with 4 distinct blanks, contextual sentence segments,
 * and 4 semantically appropriate distractors for W33-W37, plus a deterministic fallback for unauthored weeks.
 */

export const WEEKLY_ANCIENT_SCROLL_DATA = {
  33: {
    weekNumber: 33,
    title: 'The Principles of Friction & Safety',
    sentence: 'Rubber shoes create strong friction to prevent dangerous slips on wet corridor floors.',
    segments: [
      { text: '', isBlank: true, blankId: 'b0', expectedWord: 'Rubber' },
      { text: ' shoes create strong ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b1', expectedWord: 'friction' },
      { text: ' to ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b2', expectedWord: 'prevent' },
      { text: ' dangerous ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b3', expectedWord: 'slips' },
      { text: ' on wet corridor floors.', isBlank: false },
    ],
    blanks: [
      { id: 'b0', word: 'Rubber', slotIndex: 0 },
      { id: 'b1', word: 'friction', slotIndex: 1 },
      { id: 'b2', word: 'prevent', slotIndex: 2 },
      { id: 'b3', word: 'slips', slotIndex: 3 },
    ],
    distractors: ['Smooth', 'ice', 'cause', 'falls'],
  },
  34: {
    weekNumber: 34,
    title: 'The Lion and the Grateful Mouse',
    sentence: 'The tiny mouse used sharp teeth to chew the thick net and set the mighty lion free.',
    segments: [
      { text: 'The tiny ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b0', expectedWord: 'mouse' },
      { text: ' used sharp ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b1', expectedWord: 'teeth' },
      { text: ' to chew the thick ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b2', expectedWord: 'net' },
      { text: ' and set the mighty ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b3', expectedWord: 'lion' },
      { text: ' free.', isBlank: false },
    ],
    blanks: [
      { id: 'b0', word: 'mouse', slotIndex: 0 },
      { id: 'b1', word: 'teeth', slotIndex: 1 },
      { id: 'b2', word: 'net', slotIndex: 2 },
      { id: 'b3', word: 'lion', slotIndex: 3 },
    ],
    distractors: ['hunter', 'forest', 'rope', 'roar'],
  },
  35: {
    weekNumber: 35,
    title: 'An Unforgettable Camping Adventure',
    sentence: 'We pitched our tent near the clear river and watched bright stars illuminate the quiet forest.',
    segments: [
      { text: 'We pitched our ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b0', expectedWord: 'tent' },
      { text: ' near the clear ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b1', expectedWord: 'river' },
      { text: ' and watched bright ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b2', expectedWord: 'stars' },
      { text: ' illuminate the quiet ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b3', expectedWord: 'forest' },
      { text: '.', isBlank: false },
    ],
    blanks: [
      { id: 'b0', word: 'tent', slotIndex: 0 },
      { id: 'b1', word: 'river', slotIndex: 1 },
      { id: 'b2', word: 'stars', slotIndex: 2 },
      { id: 'b3', word: 'forest', slotIndex: 3 },
    ],
    distractors: ['fire', 'mountain', 'cloud', 'morning'],
  },
  36: {
    weekNumber: 36,
    title: "The Explorer's Mountain Journal",
    sentence: 'Braving steep mountain trails, young explorers recorded rare wildlife and mapped secret paths.',
    segments: [
      { text: 'Braving steep mountain ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b0', expectedWord: 'trails' },
      { text: ', young ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b1', expectedWord: 'explorers' },
      { text: ' recorded rare ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b2', expectedWord: 'wildlife' },
      { text: ' and mapped secret ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b3', expectedWord: 'paths' },
      { text: '.', isBlank: false },
    ],
    blanks: [
      { id: 'b0', word: 'trails', slotIndex: 0 },
      { id: 'b1', word: 'explorers', slotIndex: 1 },
      { id: 'b2', word: 'wildlife', slotIndex: 2 },
      { id: 'b3', word: 'paths', slotIndex: 3 },
    ],
    distractors: ['compass', 'island', 'cave', 'ocean'],
  },
  37: {
    weekNumber: 37,
    title: 'Classifying Living Organisms',
    sentence: 'All living creatures need clean water and nutritious food to grow, breathe, and reproduce.',
    segments: [
      { text: 'All living ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b0', expectedWord: 'creatures' },
      { text: ' need clean ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b1', expectedWord: 'water' },
      { text: ' and nutritious ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b2', expectedWord: 'food' },
      { text: ' to grow, ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b3', expectedWord: 'breathe' },
      { text: ', and reproduce.', isBlank: false },
    ],
    blanks: [
      { id: 'b0', word: 'creatures', slotIndex: 0 },
      { id: 'b1', word: 'water', slotIndex: 1 },
      { id: 'b2', word: 'food', slotIndex: 2 },
      { id: 'b3', word: 'breathe', slotIndex: 3 },
    ],
    distractors: ['rocks', 'plastic', 'metal', 'sunlight'],
  },
};

/**
 * Fallback generator for unauthored weeks (W38–W156)
 */
function generateFallbackScrollData(weekNumber) {
  return {
    weekNumber,
    title: `Ancient Chronicle of Discovery (Week ${weekNumber})`,
    sentence: 'Curious scholars study ancient manuscripts to understand scientific principles and reveal hidden wisdom.',
    segments: [
      { text: 'Curious ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b0', expectedWord: 'scholars' },
      { text: ' study ancient ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b1', expectedWord: 'manuscripts' },
      { text: ' to understand scientific ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b2', expectedWord: 'principles' },
      { text: ' and reveal hidden ', isBlank: false },
      { text: '', isBlank: true, blankId: 'b3', expectedWord: 'wisdom' },
      { text: '.', isBlank: false },
    ],
    blanks: [
      { id: 'b0', word: 'scholars', slotIndex: 0 },
      { id: 'b1', word: 'manuscripts', slotIndex: 1 },
      { id: 'b2', word: 'principles', slotIndex: 2 },
      { id: 'b3', word: 'wisdom', slotIndex: 3 },
    ],
    distractors: ['legends', 'shadows', 'weapons', 'dangers'],
  };
}

/**
 * Returns scroll cloze data for the given week, preferring authored datasets (W33–W37),
 * falling back to grammarSentences/vocabItems extraction if provided, or the deterministic fallback.
 */
export function getAncientScrollDataForWeek(weekNumber, grammarSentences = [], vocabItems = []) {
  const num = Number(weekNumber) || 33;
  if (WEEKLY_ANCIENT_SCROLL_DATA[num]) {
    return WEEKLY_ANCIENT_SCROLL_DATA[num];
  }

  // If grammar sentences exist, try to construct a coherent cloze item if suitable
  if (Array.isArray(grammarSentences) && grammarSentences.length > 0 && Array.isArray(vocabItems) && vocabItems.length >= 4) {
    const firstSent = grammarSentences[0];
    const sentenceText = typeof firstSent === 'string' ? firstSent : (firstSent.sentence || firstSent.fullSentence || '');
    const words = vocabItems.filter(v => v.word && v.word.length >= 3).map(v => v.word);
    
    // Check if sentenceText contains at least 2 vocab words
    const matchingWords = words.filter(w => sentenceText.toLowerCase().includes(w.toLowerCase()));
    if (matchingWords.length >= 4) {
      const selected = matchingWords.slice(0, 4);
      const blanks = selected.map((word, idx) => ({ id: `b${idx}`, word, slotIndex: idx }));
      const otherVocab = words.filter(w => !selected.includes(w)).slice(0, 4);
      while (otherVocab.length < 4) otherVocab.push(['insight', 'balance', 'energy', 'nature'][otherVocab.length]);

      return {
        weekNumber: num,
        title: `Decoded Inscription (Week ${num})`,
        sentence: sentenceText,
        blanks,
        distractors: otherVocab,
      };
    }
  }

  return generateFallbackScrollData(num);
}
