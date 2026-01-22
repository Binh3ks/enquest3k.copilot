/**
 * Dynamic Roleplay Prompt Builder (Data-Driven Architecture v2.0)
 * 
 * Generates AI prompts based on roleplay scenarios defined in week data.
 * Scenarios contain: AI role, user role, context, vocab focus, opening line, guide rules, backup questions.
 * 
 * CRITICAL: This builder generates prompts, but question enforcement is done
 * at code level in responseParser.js via forceRoleplayQuestion().
 * 
 * @module roleplayPromptBuilder
 * @version 2.0 (Data-Driven)
 * @created 2026-01-22
 */

/**
 * Build roleplay prompt from scenario data
 * @param {string} scenarioId - Scenario ID (e.g., 'rp_designer', 'rp_tour', 'rp_shop')
 * @param {Object} weekData - Week data containing roleplay_scenarios array
 * @returns {Object} Prompt config {character, emoji, setting, vocabulary, aiPrompt} or null
 */
export function buildRoleplayPrompt(scenarioId, weekData) {
  // Find scenario in week data
  const scenarios = weekData?.roleplay_scenarios || [];
  const scenario = scenarios.find(s => s.id === scenarioId);
  
  if (!scenario) {
    console.error(`❌ Scenario not found: ${scenarioId}`);
    return null;
  }
  
  console.log(`✅ Building roleplay prompt for: ${scenario.title}`);
  
  // Generate AI prompt using scenario data
  const aiPrompt = generateDynamicRoleplayPrompt(scenario);
  
  return {
    id: scenario.id,
    character: scenario.ai_role,
    emoji: scenario.emoji,
    setting: scenario.context,
    vocabulary: scenario.vocab_focus,
    opening_line: scenario.opening_line,
    backup_questions: scenario.backup_questions, // CRITICAL for code enforcement
    aiPrompt: aiPrompt
  };
}

/**
 * Generate AI prompt from scenario configuration
 * @private
 * @param {Object} scenario - Scenario data object
 * @returns {string} Formatted AI prompt
 */
function generateDynamicRoleplayPrompt(scenario) {
  return `
You are ${scenario.ai_role} talking to a young ESL student (A0-A1 level).

SCENARIO: ${scenario.title}
YOUR ROLE: ${scenario.ai_role}
STUDENT ROLE: ${scenario.user_role}
CONTEXT: ${scenario.context}

VOCABULARY TO USE: ${scenario.vocab_focus.join(', ')}

🎯 PEDAGOGICAL RULES (STRICT ENFORCEMENT):

1. **USE COMPLETE SENTENCES:** Model correct grammar for ESL learners.
   ❌ "Nice!" → ✅ "That is nice!"
   ❌ "What color?" → ✅ "What color do you like?"

2. **ALWAYS END WITH A QUESTION:** Encourage student to keep speaking.
   ❌ "I like blue." → ✅ "I like blue too. What color do you want?"
   ❌ "Good choice!" → ✅ "Good choice! What else do you need?"

3. **PROVIDE CLEAR OPTIONS:** Help students with limited vocabulary.
   ❌ "What do you want?" → ✅ "What do you want? A bed, a table, or a chair?"
   
4. **REACT WARMLY:** Acknowledge what student said before asking next question.
   Pattern: [Acknowledge] + [Build on it] + [Question with options]
   
5. **KEEP IT SIMPLE:** Use A0-A1 grammar. Max 20 words per response.

BEHAVIOR GUIDE: ${scenario.guide_rules}

OPENING TASK:
If this is the first message, say: "${scenario.opening_line}"
Otherwise, respond to student and continue the roleplay.

RESPOND IN JSON FORMAT:
{
  "ai_response": "Your response here (MUST end with question + options)",
  "suggested_hints": ["word1", "word2", "word3"]
}
`;
}

/**
 * Get roleplays for a specific week
 * @param {number} weekNumber - Week number
 * @param {Object} weekData - Week data object
 * @returns {Array} Array of roleplay scenario summaries
 */
export function getRoleplaysForWeek(weekNumber, weekData) {
  console.log(`🔄 getRoleplaysForWeek called. Week: ${weekNumber}`);
  
  // Return scenarios from week data if available
  if (weekData?.roleplay_scenarios) {
    return weekData.roleplay_scenarios.map(s => ({
      id: s.id,
      label: s.title,
      emoji: s.emoji,
      character: s.ai_role,
      setting: s.context,
      vocab_focus: s.vocab_focus,
      opening_line: s.opening_line
    }));
  }
  
  // Fallback for older weeks without scenarios
  console.warn(`⚠️ No roleplay_scenarios found for week ${weekNumber}`);
  return [];
}
