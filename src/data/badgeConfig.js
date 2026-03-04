/**
 * Badge Configuration for EngQuest3k
 * 
 * Defines all available badges and their requirements.
 * Badges are achievements unlocked by completing specific milestones.
 */

export const BADGE_DEFINITIONS = {
  first_week: {
    id: 'first_week',
    name: 'First Steps',
    nameVi: 'Bước Đầu Tiên',
    description: 'Complete your first week',
    descriptionVi: 'Hoàn thành tuần đầu tiên',
    icon: '🎯',
    color: 'bg-blue-500',
    requirement: 'Complete 1 week (100%)'
  },
  
  five_weeks: {
    id: 'five_weeks',
    name: 'Rising Star',
    nameVi: 'Ngôi Sao Đang Lên',
    description: 'Complete 5 weeks',
    descriptionVi: 'Hoàn thành 5 tuần',
    icon: '🌟',
    color: 'bg-purple-500',
    requirement: 'Complete 5 weeks (100% each)'
  },
  
  ten_weeks: {
    id: 'ten_weeks',
    name: 'Dedicated Learner',
    nameVi: 'Học Viên Kiên Trì',
    description: 'Complete 10 weeks',
    descriptionVi: 'Hoàn thành 10 tuần',
    icon: '🏆',
    color: 'bg-amber-500',
    requirement: 'Complete 10 weeks (100% each)'
  },
  
  perfect_week: {
    id: 'perfect_week',
    name: 'Perfectionist',
    nameVi: 'Người Hoàn Hảo',
    description: 'Get all 3-star ratings in a week',
    descriptionVi: 'Đạt toàn bộ 3 sao trong 1 tuần',
    icon: '✨',
    color: 'bg-yellow-500',
    requirement: 'All stations with 3 stars (90%+)'
  },
  
  star_collector: {
    id: 'star_collector',
    name: 'Star Collector',
    nameVi: 'Thợ Săn Sao',
    description: 'Collect 50 total stars',
    descriptionVi: 'Thu thập 50 sao',
    icon: '⭐',
    color: 'bg-orange-500',
    requirement: 'Accumulate 50 stars across all weeks'
  },
  
  dedication: {
    id: 'dedication',
    name: 'Master of Dedication',
    nameVi: 'Bậc Thầy Kiên Trì',
    description: 'Complete 20 weeks',
    descriptionVi: 'Hoàn thành 20 tuần',
    icon: '👑',
    color: 'bg-indigo-600',
    requirement: 'Complete 20 weeks (100% each)'
  },
  
  champion: {
    id: 'champion',
    name: 'EngQuest Champion',
    nameVi: 'Nhà Vô Địch EngQuest',
    description: 'Achieve 5 perfect weeks',
    descriptionVi: 'Đạt 5 tuần hoàn hảo (toàn 3 sao)',
    icon: '🏅',
    color: 'bg-rose-600',
    requirement: '5 weeks with all 3-star ratings'
  }
};

/**
 * Get badge definition by ID
 * @param {string} badgeId - Badge identifier
 * @returns {Object} Badge definition object
 */
export const getBadgeById = (badgeId) => {
  return BADGE_DEFINITIONS[badgeId] || null;
};

/**
 * Get all badge definitions as array
 * @returns {Array} Array of all badge objects
 */
export const getAllBadges = () => {
  return Object.values(BADGE_DEFINITIONS);
};

/**
 * Get badge display info
 * @param {string} badgeId - Badge identifier
 * @param {boolean} isEarned - Whether badge is earned
 * @param {string} language - 'en' or 'vi'
 * @returns {Object} Display info with name, description, icon, color
 */
export const getBadgeDisplay = (badgeId, isEarned = false, language = 'en') => {
  const badge = getBadgeById(badgeId);
  if (!badge) return null;

  return {
    id: badge.id,
    name: language === 'vi' ? badge.nameVi : badge.name,
    description: language === 'vi' ? badge.descriptionVi : badge.description,
    icon: badge.icon,
    color: badge.color,
    requirement: badge.requirement,
    isEarned,
    opacity: isEarned ? 'opacity-100' : 'opacity-30'
  };
};

/**
 * Get badge tier (used for sorting/priority)
 * @param {string} badgeId - Badge identifier
 * @returns {number} Tier (higher = more prestigious)
 */
export const getBadgeTier = (badgeId) => {
  const tierMap = {
    first_week: 1,
    five_weeks: 2,
    perfect_week: 2,
    ten_weeks: 3,
    star_collector: 3,
    dedication: 4,
    champion: 5
  };
  return tierMap[badgeId] || 0;
};

export default {
  BADGE_DEFINITIONS,
  getBadgeById,
  getAllBadges,
  getBadgeDisplay,
  getBadgeTier
};
