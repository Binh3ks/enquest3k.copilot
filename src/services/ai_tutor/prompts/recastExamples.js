/**
 * Recast Technique Examples
 * 
 * Teaching technique where errors are corrected through modeling
 * rather than explicit correction. Compact examples for AI guidance.
 * 
 * @module recastExamples
 * @version 1.0.0
 */

/**
 * Compact recast examples (common errors)
 */
export const RECAST_EXAMPLES = {
  'to_be': [
    { error: 'I am 9 age', recast: 'Oh, you are 9 years old!' },
    { error: 'He am happy', recast: 'Yes, he is happy!' }
  ],
  'plural': [
    { error: 'I have two dog', recast: 'Two dogs! That\'s wonderful!' },
    { error: 'Three book', recast: 'Three books, great!' }
  ],
  'possession': [
    { error: 'This is I book', recast: 'Oh, this is your book!' },
    { error: 'He name is Tom', recast: 'His name is Tom, nice!' }
  ],
  'articles': [
    { error: 'I have cat', recast: 'You have a cat! Lovely!' },
    { error: 'I like apple', recast: 'You like apples! Me too!' }
  ],
  'word_order': [
    { error: 'Blue my shirt', recast: 'Your shirt is blue!' },
    { error: 'Speak English I', recast: 'You speak English!' }
  ]
};

/**
 * Recast technique rules (compressed)
 */
export const RECAST_RULES = [
  'Model correct form naturally',
  'Never say "wrong" or "incorrect"',
  'Keep it conversational',
  'ONE recast per turn maximum',
  'Then move forward with question'
];

/**
 * Generate recast guidance block (compact)
 */
export function buildRecastBlock() {
  return `**RECAST TECHNIQUE:** If student makes error, model correct form naturally. Example: Student says "I have 9 age" → You say "Oh, you are 9 years old! That's great!" Then ask your next question. NEVER say "wrong" or "actually". ${RECAST_RULES.join('. ')}.`;
}

/**
 * Get relevant recast examples for grammar focus
 */
export function getRecastExamples(grammarFocus = '') {
  const focus = grammarFocus.toLowerCase();
  
  if (focus.includes('to be') || focus.includes('am/is/are')) {
    return RECAST_EXAMPLES.to_be;
  }
  if (focus.includes('plural')) {
    return RECAST_EXAMPLES.plural;
  }
  if (focus.includes('possess')) {
    return RECAST_EXAMPLES.possession;
  }
  if (focus.includes('article')) {
    return RECAST_EXAMPLES.articles;
  }
  
  // Return mix of common examples
  return [
    ...RECAST_EXAMPLES.to_be.slice(0, 1),
    ...RECAST_EXAMPLES.plural.slice(0, 1)
  ];
}

export default {
  RECAST_EXAMPLES,
  RECAST_RULES,
  buildRecastBlock,
  getRecastExamples
};
