/**
 * EngQuest3K Companion Engine (EPIC-0)
 * Manages Nova mascot evolution states based on continuous study streak days.
 */

export const NOVA_STAGES = {
  BABY: {
    id: 'baby',
    title: 'Baby Nova 🐣',
    minStreak: 0,
    avatarIcon: '🐣',
    badgeTitle: 'Sprout Learner',
    description: 'Nova is just starting the learning journey!'
  },
  EXPLORER: {
    id: 'explorer',
    title: 'Explorer Nova 🧭',
    minStreak: 3,
    avatarIcon: '🧭',
    badgeTitle: 'Curious Pathfinder',
    description: 'Nova has unlocked explorer goggles and travel gear!'
  },
  HERO: {
    id: 'hero',
    title: 'Hero Nova 🦸',
    minStreak: 7,
    avatarIcon: '🦸',
    badgeTitle: 'Master Champion',
    description: 'Nova is fully evolved with golden crown and cape!'
  }
};

/**
 * Returns Nova evolution stage based on user's streak count
 * @param {number} streakDays 
 * @returns {typeof NOVA_STAGES.BABY}
 */
export function getNovaStage(streakDays = 0) {
  if (streakDays >= 7) return NOVA_STAGES.HERO;
  if (streakDays >= 3) return NOVA_STAGES.EXPLORER;
  return NOVA_STAGES.BABY;
}
