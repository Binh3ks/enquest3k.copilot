/**
 * Week Data Utility
 * Provides access to week-specific curriculum data
 *
 * PRIORITY SYSTEM:
 * 1. REAL syllabus files (_real.js) - Official curriculum from 3-year framework
 * 2. Regular week files - Fallback when real syllabus not available
 * 3. Default data - Emergency fallback
 */

// 🔥 Import REAL syllabus data (PRIORITY 1)
import week1Real from './weeks/week_01_real.js';

// Import regular week data (PRIORITY 2 - Fallback)
import week1 from './weeks/week_01.js';

/**
 * Get current week data by weekId
 * @param {string} weekId - Format: 'week-1', 'week-2', etc.
 * @returns {Object} Week data with vocabulary, grammar, topic, etc.
 */
export function getCurrentWeekData(weekId) {
  // Convert 'week-1' to 'week1' or handle both formats
  const normalizedId = weekId.replace(/[_-]/g, '').toLowerCase();

  // 🔥 PRIORITY MAPPING: Real syllabus first, then fallback
  const realSyllabusMap = {
    'week1': week1Real,
    'week01': week1Real,
  };

  const fallbackMap = {
    'week1': week1,
    'week01': week1,
  };

  // Try real syllabus first
  let weekData = realSyllabusMap[normalizedId];

  if (weekData) {
    console.log(`✅ Using REAL syllabus data for ${weekId}`);
    return weekData;
  }

  // Fallback to regular week data
  weekData = fallbackMap[normalizedId];

  if (weekData) {
    console.warn(`⚠️ Using fallback week data for ${weekId} (real syllabus not found)`);
    return weekData;
  }

  // Final fallback to default
  console.warn(`❌ Week data not found for ${weekId}, using default`);
  return getDefaultWeekData();
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
