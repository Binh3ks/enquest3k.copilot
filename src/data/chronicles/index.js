/**
 * index.js — Chronicles per-week configuration registry
 */
import { WEEK33_CHRONICLES_CONFIG } from './week33_config';

export const CHRONICLES_WEEK_REGISTRY = {
  33: WEEK33_CHRONICLES_CONFIG,
};

/**
 * Returns Chronicles week configuration if available, or null for fallback.
 */
export function getWeekChroniclesConfig(weekNumber) {
  const w = parseInt(weekNumber) || 33;
  if (CHRONICLES_WEEK_REGISTRY[w]) return CHRONICLES_WEEK_REGISTRY[w];
  // Fallback to maintain the 7-floor / 21-game chamber structure for any week W01-W156
  return {
    ...WEEK33_CHRONICLES_CONFIG,
    weekNumber: w,
  };
}

export { WEEK33_CHRONICLES_CONFIG };
export default getWeekChroniclesConfig;
