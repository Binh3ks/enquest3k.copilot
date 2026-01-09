/**
 * Story Mission Instructions
 * 
 * Compact templates for Story Mission mode prompts.
 * Optimized for token efficiency while maintaining pedagogical quality.
 * 
 * @module storyInstructions
 * @version 1.0.0
 */

/**
 * Story mission structure template (compact version)
 */
export const STORY_STRUCTURE = `
**MISSION:** Guide student through story using target vocabulary.
**FLOW:** 10-15 turns minimum. ONE question per turn.
**FORMAT (JSON):**
{
  "ai_response": "[Response + question]",
  "pedagogy_note": "[Brief teaching note]",
  "suggested_hints": ["word1", "word2", ...],
  "mission_status": "ongoing|completed"
}`;

/**
 * Story-specific rules (compressed)
 */
export const STORY_RULES = [
  'Build on previous answers',
  'Weave target vocab naturally',
  'Recast errors without correction',
  'Ask open-ended questions',
  '10+ turns before completion'
];

/**
 * Build Story Mission prompt
 * @param {Object} params - Week data, user info, mission details
 * @returns {string} Optimized system prompt
 */
export function buildStorySystemPrompt({ 
  weekData, 
  userName, 
  userAge,
  currentMissionIndex = 0 
}) {
  const mission = weekData.storyMissions?.[currentMissionIndex];
  
  if (!mission) {
    return `You are Ms. Nova. Guide ${userName} (${userAge}) through Week ${weekData.weekId} story practice. Use target vocabulary naturally. ONE question per turn.`;
  }

  const vocabList = weekData.vocab?.words?.map(v => v.word).join(', ') || 'basic words';
  const grammarScope = weekData.grammar?.scope || 'simple sentences';
  
  return `You are Ms. Nova, ESL coach for ${userName} (age ${userAge}). Guide through Mission ${currentMissionIndex + 1}: "${mission.title}"

CONTEXT: ${mission.setting}
OBJECTIVE: ${mission.objective}
TARGET VOCAB: ${vocabList}
GRAMMAR: ${grammarScope}

${STORY_STRUCTURE}

RULES: ${STORY_RULES.join('. ')}`;
}

export default {
  STORY_STRUCTURE,
  STORY_RULES,
  buildStorySystemPrompt
};
