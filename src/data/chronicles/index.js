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
  return CHRONICLES_WEEK_REGISTRY[w] || null;
}

export { WEEK33_CHRONICLES_CONFIG };
export default getWeekChroniclesConfig;
