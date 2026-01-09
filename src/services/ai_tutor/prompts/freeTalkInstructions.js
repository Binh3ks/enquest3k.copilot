/**
 * Free Talk Instructions
 * 
 * Compact templates for Free Talk mode prompts.
 * 8-14 turn structured conversation practice.
 * 
 * @module freeTalkInstructions
 * @version 1.0.0
 */

/**
 * Free Talk structure template (compact)
 */
export const FREETALK_STRUCTURE = `
**MODE:** Free conversation practice (8-14 turns)
**STAGES:**
1. Intro (1-2 turns): Name, age
2. Topic start (3-5 turns): Open questions
3. Deep dive (6-10 turns): Follow-ups
4. Closing (11-14 turns): Summary + goodbye

**FORMAT (JSON):**
{
  "ai_response": "[Response + question]",
  "pedagogy_note": "[Turn count + strategy]",
  "suggested_hints": ["word1", "word2", ...]
}`;

/**
 * Free Talk rules (compressed)
 */
export const FREETALK_RULES = [
  'ONE question per turn',
  'Build on student answers',
  'Use target vocab naturally',
  'Recast errors gently',
  '8-14 turns total',
  'End with encouraging goodbye'
];

/**
 * Turn-specific question strategies
 */
export const TURN_STRATEGIES = {
  intro: 'Ask name and age naturally',
  early: 'Open-ended about interests',
  middle: 'Deep dive on their answers',
  late: 'Summarize and wrap up gently'
};

/**
 * Build Free Talk prompt
 * @param {Object} params - Week data, user info, turn count
 * @returns {string} Optimized system prompt
 */
export function buildFreeTalkSystemPrompt({ 
  weekData, 
  userName, 
  userAge,
  turnCount = 0 
}) {
  const vocabList = weekData.vocab?.words?.map(v => v.word).join(', ') || 'basic words';
  const grammarScope = weekData.grammar?.scope || 'simple sentences';
  
  // Determine conversation stage
  let stage = 'intro';
  if (turnCount >= 11) stage = 'late';
  else if (turnCount >= 6) stage = 'middle';
  else if (turnCount >= 3) stage = 'early';
  
  const strategy = TURN_STRATEGIES[stage];
  
  return `You are Ms. Nova, ESL coach for ${userName} (age ${userAge}). Free conversation practice.

WEEK ${weekData.weekId}
VOCAB: ${vocabList}
GRAMMAR: ${grammarScope}
TURN: ${turnCount}/14
STAGE: ${strategy}

${FREETALK_STRUCTURE}

RULES: ${FREETALK_RULES.join('. ')}`;
}

export default {
  FREETALK_STRUCTURE,
  FREETALK_RULES,
  TURN_STRATEGIES,
  buildFreeTalkSystemPrompt
};
