/**
 * Week Data Utility
 * Provides access to week-specific curriculum data
 */

// Import all weeks
import week1 from './weeks/week_01.js';

/**
 * Get current week data by weekId
 * @param {string} weekId - Format: 'week-1', 'week-2', etc.
 * @returns {Object} Week data with vocabulary, grammar, topic, etc.
 */
export function getCurrentWeekData(weekId) {
  // Convert 'week-1' to 'week1' or handle both formats
  const normalizedId = weekId.replace(/[_-]/g, '').toLowerCase();
  
  const weekMap = {
    'week1': week1,
    'week01': week1,
  };

  const weekData = weekMap[normalizedId];

  if (!weekData) {
    console.warn(`Week data not found for ${weekId}, using default`);
    return getDefaultWeekData();
  }

  return weekData;
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
