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
  cambridgeWordMin: 20,   // Official Cambridge Flyers Part 7 minimum (20+ words)
  engQuestStretchMin: 35, // EngQuest extension stretch goal (35-50 words)
  targetWordMin: 20,      // Primary passing threshold (Cambridge minimum 20+ words)
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
  if (!weekNum || typeof weekNum !== 'number') {
    errors.push('Week data must contain a numeric weekId or week property');
  }

  // W33+ requires 4-Hub structure or target_vocab / story_missions
  const stations = weekData.stations || weekData;
  const has4Hubs = Boolean(stations.read_explore || weekData.readingHub);
  const hasRealFields = Boolean(weekData.target_vocab || weekData.story_missions);

  if (!has4Hubs && !hasRealFields) {
    errors.push('Missing Hub 1 (read_explore or readingHub)');
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
