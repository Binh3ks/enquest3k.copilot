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

// ── US → UK IPA conversion (phonological differences) ─────────
// Major differences for educational purposes (not 100% linguistically accurate):
//   1. /æ/ (US 'cat') → /æ/ or /ɑː/ in UK (varies by region)
//   2. /ɑ/ (US 'hot') → /ɒ/ in UK
//   3. /ɔ/ (US 'thought') → /ɔː/ in UK
//   4. /ɚ/ (US 'r-colored schwa') → /ə/ in UK (no rhoticity in RP)
//   5. /t/ between vowels → /ɾ/ in US (flap t) → /t/ in UK
//   6. /ju/ → /uː/ in UK after certain consonants (news, student)
//   7. /ɑr/ → /ɑː/ or /ə/ in UK

const US_TO_UK_RULES = [
  // ɚ (r-colored schwa) → ə (no rhoticity in RP)
  [/ɚ/g, 'ə'],
  // ɑː (US 'a' in 'hot' when long) → ɒ (UK short 'o')
  [/ɑː/g, 'ɒ'],
  // ɑ (US short 'o' in 'hot') → ɒ
  [/ɑ(?!ː)/g, 'ɒ'],
  // ɑr → ɑː in UK (car, far, park)
  [/ɑr/g, 'ɑː'],
  // ɝː (US 'r-colored' er in 'bird') → ɜː in UK
  [/ɝː/g, 'ɜː'],
  // ɝ → ɜ
  [/ɝ(?!ː)/g, 'ɜ'],
];

const COMMON_US_TO_UK = {
  'schedule': { us: '/ˈskɛdʒ.uːl/', uk: '/ˈʃɛdʒ.uːl/' },
  'progress': { us: '/ˈprɑː.ɡrɛs/', uk: '/ˈprəʊ.ɡrɛs/' },
  'project': { us: '/ˈprɑː.dʒɛkt/', uk: '/ˈprɒdʒ.ɪkt/' },
  'address': { us: '/ˈæd.rɛs/', uk: '/əˈdrɛs/' },
  'advertisement': { us: '/ˌæd.vɝːˈtaɪz.mənt/', uk: '/ədˈvɜː.tɪs.mənt/' },
  'leisure': { us: '/ˈliː.ʒɚ/', uk: '/ˈlɛʒ.ə/' },
  'lieutenant': { us: '/luːˈtɛn.ənt/', uk: '/lɛfˈtɛn.ənt/' },
  'mobile': { us: '/ˈmoʊ.bəl/', uk: '/ˈməʊ.baɪl/' },
  'often': { us: '/ˈɔːf.ən/', uk: '/ˈɒf.ən/' },
  'privacy': { us: '/ˈpraɪ.və.si/', uk: '/ˈprɪv.ə.si/' },
};

export function usToUkIpa(usIpa, word = '') {
  if (!usIpa) return usIpa;
  const cleaned = word.toLowerCase().replace(/[^a-z']/g, '');
  if (COMMON_US_TO_UK[cleaned]) {
    return COMMON_US_TO_UK[cleaned].uk;
  }
  let uk = usIpa;
  for (const [pattern, replacement] of US_TO_UK_RULES) {
    uk = uk.replace(pattern, replacement);
  }
  return uk;
}

export function convertIpaWordsToUk(ipaWords) {
  if (!ipaWords) return ipaWords;
  return ipaWords.map(w => ({
    ...w,
    ipa: w.ipa ? usToUkIpa(w.ipa, w.word) : w.ipa,
  }));
}
