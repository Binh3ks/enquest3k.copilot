/**
 * Station State Helper - Persist and restore station progress
 * Master Prompt V23 - Progressive Saving Enhancement
 * 
 * Lưu state của từng station vào localStorage để khi user chuyển tab/reload
 * thì không mất progress.
 */

const STORAGE_PREFIX = 'engquest_station_';

/**
 * Save station state to localStorage
 * @param {string} weekId - Week number
 * @param {string} stationKey - Station key (e.g., 'grammar', 'vocab')
 * @param {object} state - State object to save (e.g., { completed: [1,2,3], currentIndex: 3 })
 */
export const saveStationState = (weekId, stationKey, state) => {
  try {
    const key = `${STORAGE_PREFIX}${weekId}_${stationKey}`;
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    console.error('Save station state error:', e);
  }
};

/**
 * Load station state from localStorage
 * @param {string} weekId - Week number
 * @param {string} stationKey - Station key
 * @returns {object|null} - Saved state or null
 */
export const loadStationState = (weekId, stationKey) => {
  try {
    const key = `${STORAGE_PREFIX}${weekId}_${stationKey}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error('Load station state error:', e);
    return null;
  }
};

/**
 * Clear station state (useful when week is completed)
 * @param {string} weekId - Week number
 * @param {string} stationKey - Station key
 */
export const clearStationState = (weekId, stationKey) => {
  try {
    const key = `${STORAGE_PREFIX}${weekId}_${stationKey}`;
    localStorage.removeItem(key);
  } catch (e) {
    console.error('Clear station state error:', e);
  }
};

/**
 * Clear all states for a week (when week is reset)
 * @param {string} weekId - Week number
 */
export const clearWeekStates = (weekId) => {
  try {
    const keys = Object.keys(localStorage);
    const prefix = `${STORAGE_PREFIX}${weekId}_`;
    keys.forEach(key => {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    });
  } catch (e) {
    console.error('Clear week states error:', e);
  }
};
