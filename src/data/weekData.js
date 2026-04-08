/**
 * Week Data Utility
 * Provides access to week-specific curriculum data
 *
 * PRIORITY SYSTEM:
 * 1. REAL syllabus files (_real.js) - Official curriculum from 3-year framework
 * 2. Regular week files - Fallback when real syllabus not available
 * 3. Default data - Emergency fallback
 * 
 * ⚡ DYNAMIC LOADING: Automatically loads week_XX_real.js for any week
 */

// ─── Cambridge YLE / CEFR Level Mapping (S4.1) ───────────────────────────
// W1-14:   Pre-A1  (YLE Starters prep)
// W15-28:  A1      (Starters → Movers transition)
// W29-54:  A1+     (YLE Movers prep)
// W55-80:  A2      (Movers → Flyers transition)
// W81-120: A2+     (YLE Flyers prep)
// W121-144: B1     (B1 Preliminary prep)
// W145-156: B1+    (B1 Preliminary mastery)

export function getWeekCEFR(weekNumber) {
  const w = parseInt(weekNumber) || 1;
  if (w <= 14)  return { cefr: 'Pre-A1', cambridge: 'YLE Starters',   nextMilestone: 14,  color: 'blue'   };
  if (w <= 28)  return { cefr: 'A1',     cambridge: 'YLE Starters',   nextMilestone: 28,  color: 'emerald' };
  if (w <= 54)  return { cefr: 'A1+',    cambridge: 'YLE Movers',     nextMilestone: 54,  color: 'violet' };
  if (w <= 80)  return { cefr: 'A2',     cambridge: 'YLE Movers',     nextMilestone: 80,  color: 'amber'  };
  if (w <= 120) return { cefr: 'A2+',    cambridge: 'YLE Flyers',     nextMilestone: 120, color: 'orange' };
  if (w <= 144) return { cefr: 'B1',     cambridge: 'B1 Preliminary', nextMilestone: 144, color: 'rose'   };
  return              { cefr: 'B1+',    cambridge: 'B1 Preliminary', nextMilestone: 156, color: 'rose'   };
}

// Milestone weeks that unlock a badge
export const MILESTONE_WEEKS = [14, 28, 54, 80, 120, 156];
export const MILESTONE_BADGES = {
  14:  { label: 'Starters Ready',  emoji: '⭐' },
  28:  { label: 'A1 Complete',     emoji: '🌟' },
  54:  { label: 'Movers Ready',    emoji: '🏆' },
  80:  { label: 'A2 Complete',     emoji: '🎖️' },
  120: { label: 'Flyers Ready',    emoji: '🚀' },
  156: { label: 'B1 Champion',     emoji: '👑' },
};

/**
 * Get current week data by weekId (async)
 * @param {string} weekId - Format: 'week-1', 'week-2', etc.
 * @returns {Promise<Object>} Week data with vocabulary, grammar, topic, etc.
 */
export async function getCurrentWeekData(weekId) {
  // Convert 'week-1' to '01' (padded number)
  const weekNumber = weekId.replace(/[^0-9]/g, '');
  const paddedNumber = weekNumber.padStart(2, '0');

  try {
    // 🔥 PRIORITY 1: Try subfolder format: weeks/week_XX/week_XX_real.js
    console.log(`🔍 Attempting to load: week_${paddedNumber}/week_${paddedNumber}_real.js`);
    const realModule = await import(`./weeks/week_${paddedNumber}/week_${paddedNumber}_real.js`);
    console.log(`✅ Loaded REAL syllabus data for Week ${weekNumber} (subfolder)`);
    return realModule.default;
  } catch {
    // fall through
  }

  try {
    // 🔥 PRIORITY 2: Try root-level format: weeks/week_XX_real.js
    console.log(`🔍 Attempting to load: week_${paddedNumber}_real.js (root-level)`);
    const realModule = await import(`./weeks/week_${paddedNumber}_real.js`);
    console.log(`✅ Loaded REAL syllabus data for Week ${weekNumber} (root-level)`);
    return realModule.default;
  } catch {
    // fall through
  }

  try {
    // PRIORITY 3: Try legacy monolithic: weeks/week_XX.js
    const fallbackModule = await import(`./weeks/week_${paddedNumber}.js`);
    console.log(`✅ Loaded fallback week data for Week ${weekNumber}`);
    return fallbackModule.default;
  } catch {
    console.error(`❌ No data files found for Week ${weekNumber}`);
    console.warn(`Using default data for Week ${weekNumber}`);
    return getDefaultWeekData();
  }
}

/**
 * Get default week data structure (fallback)
 */
function getDefaultWeekData() {
  return {
    weekId: 'week-1',
    topic: 'Getting Started',
    vocabulary: [
      { word: 'hello', meaning: 'xin chào', pronunciation: 'hɛˈloʊ' },
      { word: 'goodbye', meaning: 'tạm biệt', pronunciation: 'ɡʊdˈbaɪ' },
      { word: 'thank you', meaning: 'cảm ơn', pronunciation: 'θæŋk ju' },
      { word: 'please', meaning: 'làm ơn', pronunciation: 'pliːz' },
      { word: 'yes', meaning: 'có/vâng', pronunciation: 'jɛs' },
      { word: 'no', meaning: 'không', pronunciation: 'noʊ' }
    ],
    grammar: {
      allowed: ['Simple Present', 'be verb', 'have'],
      banned: ['Simple Past', 'Future', 'Present Perfect'],
      bannedWords: ['went', 'saw', 'did', 'will', 'would', 'could', 'should', 'have been']
    }
  };
}

/**
 * Get all available weeks
 */
export function getAllWeeks() {
  return [
    { id: 'week-1', label: 'Week 1', available: true },
  ];
}

export default {
  getCurrentWeekData,
  getAllWeeks,
  getDefaultWeekData
};
