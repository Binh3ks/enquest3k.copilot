/**
 * EngQuest3K Content Data Contracts & Schema Specifications
 * Milestone 0 Contract Definition for W33+ Architecture
 */

/**
 * Task configuration parameter defaults (configurable data parameters)
 */
export const DEFAULT_TASK_CONFIG = {
  gapCount: 5,            // Reading Part 4 Open Cloze gap count (5 -> 10)
  optionCount: 3,         // Choice grid option count (3 -> 8)
  panelCount: 3,          // Picture panel count (3 -> 4)
  targetWordMin: 35,      // Writing script target word minimum (35-50 words)
  differenceSpotCount: 6, // Dual picture spot difference count
  dialogueTurnLimit: 5    // Mascot voice dialogue turn limit (5 -> 20)
};

/**
 * Validate a week data object against the canonical 4-Hub schema contract
 * @param {Object} weekData 
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateWeekContentSchema(weekData) {
  const errors = [];

  if (!weekData) {
    return { valid: false, errors: ['Week data object is null or undefined'] };
  }

  const weekNum = weekData.weekId || weekData.week;
  if (typeof weekNum !== 'number') {
    errors.push('Missing weekId or week numeric property');
  }

  const titleStr = weekData.title || weekData.weekTitle_en;
  if (!titleStr) {
    errors.push('Missing title or weekTitle_en property');
  }

  // Check 4 Hubs or stations or target_vocab
  const has4Hubs = (weekData.readingHub || weekData.stations?.read_explore) && 
                   (weekData.writingHub || weekData.stations?.writing) && 
                   (weekData.speakingHub || weekData.stations?.ask_ai);
  const hasTargetVocab = Array.isArray(weekData.target_vocab);

  if (!has4Hubs && !hasTargetVocab) {
    errors.push('Week data must contain 4 Hub objects/stations or target_vocab array');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export default {
  DEFAULT_TASK_CONFIG,
  validateWeekContentSchema
};
