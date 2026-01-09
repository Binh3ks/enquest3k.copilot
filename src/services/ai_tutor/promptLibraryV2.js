/**
 * Prompt Library - Optimized Version
 * 
 * Token-efficient prompt building using modular templates.
 * ~60% reduction from original 918 lines through:
 * - Modular architecture
 * - Compact templates
 * - Removed redundancy
 * - Smart context injection
 * 
 * @module promptLibrary
 * @version 2.0.0
 * @created 2026-01-06
 */

import { buildPersonaBlock } from './prompts/persona.js';
import { buildStorySystemPrompt } from './prompts/storyInstructions.js';
import { buildFreeTalkSystemPrompt } from './prompts/freeTalkInstructions.js';
import { buildRecastBlock } from './prompts/recastExamples.js';
import { buildJsonFormatReminder } from './prompts/coreInstructions.js';

/**
 * Build Story Mission prompt (optimized)
 * 
 * @param {Object} params
 * @param {Object} params.weekData - Week content
 * @param {string} params.userName - Student name
 * @param {number} params.userAge - Student age
 * @param {number} params.missionId - Current mission index
 * @returns {string} System prompt
 */
export function buildStoryPrompt({ 
  weekData, 
  userName, 
  userAge, 
  missionId = 0 
}) {
  const persona = buildPersonaBlock();
  const instructions = buildStorySystemPrompt({ 
    weekData, 
    userName, 
    userAge, 
    currentMissionIndex: missionId 
  });
  const recast = buildRecastBlock();
  const format = buildJsonFormatReminder();
  
  return `${persona}

${instructions}

${recast}

${format}`;
}

/**
 * Build Free Talk prompt (optimized)
 * 
 * @param {Object} params
 * @param {Object} params.weekData - Week content
 * @param {string} params.userName - Student name
 * @param {number} params.userAge - Student age
 * @param {number} params.turnCount - Current turn number
 * @returns {string} System prompt
 */
export function buildFreeTalkPrompt({ 
  weekData, 
  userName, 
  userAge, 
  turnCount = 0 
}) {
  const persona = buildPersonaBlock();
  const instructions = buildFreeTalkSystemPrompt({ 
    weekData, 
    userName, 
    userAge, 
    turnCount 
  });
  const recast = buildRecastBlock();
  const format = buildJsonFormatReminder();
  
  return `${persona}

${instructions}

${recast}

${format}`;
}

/**
 * Build generic prompt (for other modes)
 * 
 * @param {Object} params
 * @param {string} params.mode - Mode name
 * @param {Object} params.weekData - Week content
 * @param {string} params.userName - Student name
 * @returns {string} System prompt
 */
export function buildGenericPrompt({ mode, weekData, userName }) {
  const persona = buildPersonaBlock();
  const vocabList = weekData.vocab?.words?.map(v => v.word).join(', ') || 'basic words';
  const format = buildJsonFormatReminder();
  
  return `${persona}

MODE: ${mode.toUpperCase()}
STUDENT: ${userName}
WEEK: ${weekData.weekId}
VOCAB: ${vocabList}

${buildRecastBlock()}

${format}`;
}

// Export for backward compatibility with old imports
export {
  buildPersonaBlock,
  buildStorySystemPrompt,
  buildFreeTalkSystemPrompt,
  buildRecastBlock,
  buildJsonFormatReminder
};

export default {
  buildStoryPrompt,
  buildFreeTalkPrompt,
  buildGenericPrompt
};
