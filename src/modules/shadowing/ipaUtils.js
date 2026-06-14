/**
 * ipaUtils.js — IPA rendering helpers for shadowing station.
 *
 * Stress levels:
 *   0 = unstressed (function words) → gray
 *   1 = primary stress → red/bold
 *   2 = secondary stress → blue
 */

// Color classes for stress levels
export const STRESS_COLORS = {
  0: { text: 'text-slate-500', underline: 'border-slate-400', bg: '' },
  1: { text: 'text-rose-600', underline: 'border-rose-500', bg: 'bg-rose-50' },
  2: { text: 'text-blue-600', underline: 'border-blue-400', bg: 'bg-blue-50' },
};

/**
 * Get color classes for a stress level.
 * @param {number} stress - 0, 1, or 2
 */
export function getStressStyle(stress) {
  return STRESS_COLORS[stress] || STRESS_COLORS[0];
}

// ── IPA data loading via import.meta.glob (Vite-compatible) ──────

const advIpaModules = import.meta.glob('../../data/weeks/week_*/shadowing_ipa.js');
const easyIpaModules = import.meta.glob('../../data/weeks_easy/week_*/shadowing_ipa.js');

const ipaCache = new Map();

/**
 * Load IPA data for a specific week and mode.
 * @param {number} weekNum
 * @param {string} mode - 'advanced' or 'easy'
 * @returns {Promise<Object|null>} - { [sentenceId]: [{ word, ipa, stress }] }
 */
export async function loadIpaData(weekNum, mode) {
  const padded = String(weekNum).padStart(2, '0');
  const cacheKey = `${padded}_${mode}`;
  if (ipaCache.has(cacheKey)) return ipaCache.get(cacheKey);

  const globMap = mode === 'easy' ? easyIpaModules : advIpaModules;
  const path = mode === 'easy'
    ? `../../data/weeks_easy/week_${padded}/shadowing_ipa.js`
    : `../../data/weeks/week_${padded}/shadowing_ipa.js`;

  if (globMap[path]) {
    try {
      const mod = await globMap[path]();
      const data = mod.default || null;
      ipaCache.set(cacheKey, data);
      return data;
    } catch {
      ipaCache.set(cacheKey, null);
      return null;
    }
  }

  ipaCache.set(cacheKey, null);
  return null;
}
