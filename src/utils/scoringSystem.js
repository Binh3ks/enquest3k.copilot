/**
 * EngQuest3k Scoring System
 *
 * This module provides star calculation and badge management for the progress system.
 * Stars are awarded based on completion percentage/score.
 * Badges are achievements unlocked by completing specific milestones.
 */

import { getCollectionById } from '../data/collectionConfig.js';

/**
 * Calculate stars based on score/percentage
 * @param {number} score - Score from 0-100
 * @returns {number} Stars from 0-3
 * 
 * Star Breakdown:
 * - 0-59%: 0 stars (incomplete)
 * - 60-79%: ⭐ (1 star - basic completion)
 * - 80-89%: ⭐⭐ (2 stars - good work)
 * - 90-100%: ⭐⭐⭐ (3 stars - excellent!)
 */
export const calculateStars = (score) => {
  if (typeof score !== 'number' || score < 0) return 0;
  if (score >= 90) return 3;
  if (score >= 80) return 2;
  if (score >= 60) return 1;
  return 0;
};

/**
 * Get star display with emoji
 * @param {number} stars - Number of stars (0-3)
 * @returns {string} Star emoji string
 */
export const getStarDisplay = (stars) => {
  const starMap = {
    0: '',
    1: '⭐',
    2: '⭐⭐',
    3: '⭐⭐⭐'
  };
  return starMap[stars] || '';
};

/**
 * Calculate total stars earned for a week
 * @param {Object} weekProgress - Week progress object from progressCache
 * @returns {Object} { totalStars, maxStars, stations: [] }
 */
export const calculateWeekStars = (weekProgress) => {
  if (!weekProgress || typeof weekProgress !== 'object') {
    return { totalStars: 0, maxStars: 0, stations: [] };
  }

  const stations = Object.entries(weekProgress).map(([stationId, data]) => {
    const score = data.score || 0;
    const stars = calculateStars(score);
    return {
      stationId,
      score,
      stars,
      isCompleted: data.isCompleted || false
    };
  });

  const totalStars = stations.reduce((sum, s) => sum + s.stars, 0);
  const maxStars = stations.length * 3; // Each station can earn up to 3 stars

  return {
    totalStars,
    maxStars,
    stations,
    percentage: maxStars > 0 ? Math.round((totalStars / maxStars) * 100) : 0
  };
};

/**
 * Get color class for star display based on star count
 * @param {number} stars - Number of stars (0-3)
 * @returns {string} Tailwind color classes
 */
export const getStarColorClass = (stars) => {
  const colorMap = {
    0: 'text-slate-300',
    1: 'text-yellow-400',
    2: 'text-orange-400',
    3: 'text-amber-500'
  };
  return colorMap[stars] || 'text-slate-300';
};

/**
 * Check if a week is 100% complete
 * @param {number} weekId
 * @param {Object} weekCompletion - { weekId: percentage }
 * @returns {boolean}
 */
export const isWeekComplete = (weekId, weekCompletion) =>
  (weekCompletion[weekId] || 0) >= 100;

/**
 * Check if all weeks in a collection are 100% complete
 * @param {Object} collection - Collection definition with weekRange
 * @param {Object} weekCompletion - { weekId: percentage }
 * @returns {boolean}
 */
export const isCollectionComplete = (collection, weekCompletion) => {
  if (!collection || !collection.weekRange) return false;
  for (let w = collection.weekRange[0]; w <= collection.weekRange[1]; w++) {
    if ((weekCompletion[w] || 0) < 100) return false;
  }
  return true;
};

/**
 * Check if a week has all 3-star stations (perfect week)
 * @param {number} weekId
 * @param {Object} weekStars - { weekId: { totalStars, maxStars } }
 * @returns {boolean}
 */
export const isPerfectWeek = (weekId, weekStars) => {
  const stars = weekStars[weekId];
  return stars && stars.maxStars > 0 && stars.totalStars === stars.maxStars;
};

/**
 * Get total stars across all weeks
 * @param {Object} weekStars
 * @returns {number}
 */
export const getTotalStarsAcrossWeeks = (weekStars) =>
  Object.values(weekStars).reduce((sum, s) => sum + (s.totalStars || 0), 0);

/**
 * Check if user earned a badge
 * @param {string} badgeId - Badge identifier
 * @param {Object} userData - User data with progress
 * @returns {boolean} Whether badge is earned
 */
export const checkBadgeEarned = (badgeId, userData) => {
  const { progressCache, badges = [] } = userData;

  // Already earned
  if (badges.includes(badgeId)) return true;

  // Badge earning logic based on badge type
  switch (badgeId) {
    case 'first_week':
      return Object.keys(progressCache).some(weekId => {
        const weekStars = calculateWeekStars(progressCache[weekId]);
        return weekStars.percentage === 100;
      });

    case 'five_weeks':
      return Object.keys(progressCache).filter(weekId => {
        const weekStars = calculateWeekStars(progressCache[weekId]);
        return weekStars.percentage === 100;
      }).length >= 5;

    case 'ten_weeks':
      return Object.keys(progressCache).filter(weekId => {
        const weekStars = calculateWeekStars(progressCache[weekId]);
        return weekStars.percentage === 100;
      }).length >= 10;

    case 'perfect_week':
      return Object.keys(progressCache).some(weekId => {
        const weekStars = calculateWeekStars(progressCache[weekId]);
        return weekStars.totalStars === weekStars.maxStars && weekStars.maxStars > 0;
      });

    case 'star_collector':
      const allStars = Object.values(progressCache).reduce((total, weekProg) => {
        return total + calculateWeekStars(weekProg).totalStars;
      }, 0);
      return allStars >= 50;

    case 'dedication':
      const completedWeeks = Object.keys(progressCache).filter(weekId => {
        const weekStars = calculateWeekStars(progressCache[weekId]);
        return weekStars.percentage === 100;
      }).length;
      return completedWeeks >= 20;

    case 'champion':
      const perfectWeeks = Object.keys(progressCache).filter(weekId => {
        const weekStars = calculateWeekStars(progressCache[weekId]);
        return weekStars.totalStars === weekStars.maxStars && weekStars.maxStars > 0;
      }).length;
      return perfectWeeks >= 5;

    case 'collection_1':
    case 'collection_2':
    case 'collection_3': {
      const collection = getCollectionById(badgeId);
      if (!collection) return false;
      const weekCompletion = userData.weekCompletion || {};
      return isCollectionComplete(collection, weekCompletion);
    }

    default:
      return false;
  }
};

/**
 * Get all newly earned badges
 * @param {Object} userData - User data with progress and current badges
 * @returns {Array} Array of newly earned badge IDs
 */
export const getNewlyEarnedBadges = (userData) => {
  const allBadgeIds = [
    'first_week',
    'five_weeks',
    'ten_weeks',
    'perfect_week',
    'star_collector',
    'dedication',
    'champion',
    'collection_1',
    'collection_2',
    'collection_3',
  ];

  const currentBadges = userData.badges || [];
  
  return allBadgeIds.filter(badgeId => 
    !currentBadges.includes(badgeId) && checkBadgeEarned(badgeId, userData)
  );
};

export default {
  calculateStars,
  getStarDisplay,
  calculateWeekStars,
  getStarColorClass,
  checkBadgeEarned,
  getNewlyEarnedBadges,
  isWeekComplete,
  isCollectionComplete,
  isPerfectWeek,
  getTotalStarsAcrossWeeks,
};
