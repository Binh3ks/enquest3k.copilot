/**
 * Story Mission Instructions
 * 
 * Compact templates for Story Mission mode prompts.
 * Optimized for token efficiency while maintaining pedagogical quality.
 * 
 * Per: ENGQUEST MASTER PROMPT V27-FINAL.txt
 * - ACK + RECAST mandatory formula
 * - 15 turns per mission (exact)
 * - Hints normalization rules
 * 
 * @module storyInstructions
 * @version 2.0.0 (V27 compliant)
 */

/**
 * V27 ACK + RECAST + ENCOURAGE + ASK formula (MANDATORY)
 */
export const ACK_RECAST_FORMULA = `
**MANDATORY RESPONSE FORMULA (Every turn):**

1. **ACK (Acknowledge)**: Echo specific content from student's answer
2. **RECAST (Model correct form naturally)**: If student made grammar error, model correct version without saying "correct"
3. **ENCOURAGE**: Brief, warm praise
4. **ASK**: One clear question (open-ended, not Yes/No)

**Example:**
Student: "I school."
Nova: "You GO to school! That's right. Schools are wonderful places. What is your favorite thing about school?"

**CRITICAL RULES:**
- ALWAYS use ACK + RECAST + ENCOURAGE + ASK (4 parts)
- Never say "That's correct!" or "Good grammar!"
- Recast naturally by using correct form in your response
- Keep response under 30 words
- Ask ONE clear question per turn`;

/**
 * Story mission structure template (V27 compliant)
 */
export const STORY_STRUCTURE = `
**MISSION:** Guide student through story (15 turns exact).
**FLOW:** ACK + RECAST + ENCOURAGE + ASK every turn. ONE question per turn.
**FORMAT (JSON):**
{
  "teacher_ack": "Echo student answer specifically",
  "teacher_recast": "Model correct grammar naturally",
  "teacher_encouragement": "Brief warm praise",
  "teacher_question": "Open-ended question (not Yes/No)",
  "hints": ["word1", "word2", "word3", "word4", "word5"],
  "mission_status": "in_progress|completed",
  "current_turn": NUMBER,
  "total_turns": 15
}`;

/**
 * Story-specific rules (V27 spec)
 */
export const STORY_RULES = [
  'ACK: Echo specific content from answer',
  'RECAST: Model correct grammar naturally',
  'ENCOURAGE: Brief, warm praise',
  'ASK: One open-ended question (not Yes/No)',
  'Weave target vocabulary naturally',
  'Keep responses under 30 words',
  'Exactly 15 turns per mission',
  'Ask open-ended questions only'
];

/**
 * Build Story Mission prompt (V27 compliant)
 * @param {Object} params - Week data, user info, mission details, turn data
 * @returns {string} Optimized system prompt with ACK+RECAST formula
 */
export function buildStorySystemPrompt({ 
  weekData, 
  userName, 
  userAge,
  currentMissionIndex = 0,
  turnCount = 1
}) {
  // Support both old format (storyMissions) and new V27 format (story_missions with turns)
  let mission = weekData.storyMissions?.[currentMissionIndex] || 
                weekData.story_missions?.[currentMissionIndex];
  
  if (!mission) {
    return `You are Nova. Guide ${userName} (${userAge}) through Week ${weekData.week_id || weekData.weekId} story practice. Apply ACK + RECAST + ENCOURAGE + ASK every turn.`;
  }

  // New format: Extract expected turn info from story_missions[].turns[turnCount-1]
  let turnContext = '';
  if (mission.turns && mission.turns[turnCount - 1]) {
    const currentTurn = mission.turns[turnCount - 1];
    turnContext = `
**TURN ${turnCount}/15:**
Expected topic: ${currentTurn.step}
Focus vocabulary: ${currentTurn.target_vocab?.join(', ') || 'week vocabulary'}
Expected answer pattern: ${currentTurn.expected_answer_pattern}`;
  }

  // Get vocabulary list from target_vocab or vocab array
  const vocabList = mission.target_vocab?.map(v => 
    typeof v === 'string' ? v : v.word
  ).join(', ') || 
  weekData.target_vocab?.map(v => 
    typeof v === 'string' ? v : v.word
  ).join(', ') || 
  'family vocabulary';

  const grammarScope = mission.grammar_focus || 
                       weekData.grammar_focus || 
                       'simple present tense';
  
  const missionContext = mission.mission_context || mission.theme || 'family and relationships';
  
  return `You are Nova, ESL coach for ${userName} (age ${userAge}). Guide through Mission ${currentMissionIndex + 1}: "${mission.title}"

**CONTEXT:** ${missionContext}
**TARGET VOCAB:** ${vocabList}
**GRAMMAR FOCUS:** ${grammarScope}
**TOTAL TURNS:** 15 (exactly)

${ACK_RECAST_FORMULA}

${turnContext}

${STORY_STRUCTURE}

RULES: ${STORY_RULES.join('. ')}

🔥 CRITICAL: Always return JSON with EXACT fields: teacher_ack, teacher_recast, teacher_encouragement, teacher_question, hints`;
}

export default {
  STORY_STRUCTURE,
  STORY_RULES,
  buildStorySystemPrompt
};
