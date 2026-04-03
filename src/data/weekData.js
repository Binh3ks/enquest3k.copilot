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
    // 🔥 PRIORITY 1: Try loading week_XX_real.js (AI Tutor syllabus)
    console.log(`🔍 Attempting to load: week_${paddedNumber}_real.js`);
    const realModule = await import(`./weeks/week_${paddedNumber}/week_${paddedNumber}_real.js`);
    console.log(`✅ Loaded REAL syllabus data for Week ${weekNumber}`);
    return realModule.default;
  } catch (realError) {
    console.warn(`⚠️ week_${paddedNumber}_real.js not found, trying fallback...`);
    
    try {
      // PRIORITY 2: Try loading regular week_XX.js
      const fallbackModule = await import(`./weeks/week_${paddedNumber}.js`);
      console.log(`✅ Loaded fallback week data for Week ${weekNumber}`);
      return fallbackModule.default;
    } catch (fallbackError) {
      console.error(`❌ No data files found for Week ${weekNumber}`);
      console.warn(`Using default data for Week ${weekNumber}`);
      return getDefaultWeekData();
    }
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
