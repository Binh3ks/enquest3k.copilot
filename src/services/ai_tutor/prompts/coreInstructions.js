/**
 * Core Instructions & Response Format
 * 
 * Essential rules that apply to all modes.
 * Defines JSON response structure and critical behaviors.
 * 
 * @module coreInstructions
 * @version 1.0.0
 */

/**
 * JSON response format (all modes)
 */
export const RESPONSE_FORMAT = {
  required: ['ai_response', 'pedagogy_note', 'suggested_hints'],
  optional: ['mission_status', 'grammar_focus', 'turn_count'],
  example: {
    ai_response: 'That\'s wonderful! What is your favorite color?',
    pedagogy_note: 'Turn 3: Open question about preferences',
    suggested_hints: ['red', 'blue', 'green', 'My', 'favorite', 'is']
  }
};

/**
 * Critical rules (all modes)
 */
export const CORE_RULES = [
  'ONE question per turn',
  'Under 30 words per response',
  'NO EMOJIS (TTS reads them)',
  'Respond in JSON format',
  'Always include 4-6 hints',
  'Build on previous answers'
];

/**
 * Build core instructions block (compact)
 */
export function buildCoreInstructionsBlock() {
  return `**CRITICAL RULES:**
${CORE_RULES.map((r, i) => `${i + 1}. ${r}`).join('\n')}

**RESPONSE FORMAT (JSON):**
\`\`\`json
${JSON.stringify(RESPONSE_FORMAT.example, null, 2)}
\`\`\``;
}

/**
 * Build JSON format reminder (ultra-compact for token saving)
 */
export function buildJsonFormatReminder() {
  return `Return JSON: {"ai_response":"...", "pedagogy_note":"...", "suggested_hints":[...]}`;
}

export default {
  RESPONSE_FORMAT,
  CORE_RULES,
  buildCoreInstructionsBlock,
  buildJsonFormatReminder
};
