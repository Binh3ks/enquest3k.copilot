/**
 * DYNAMIC WEEK DATA LOADER
 * 
 * Lazy loads week data on demand using import.meta.glob
 * Supports 156 weeks with zero startup overhead
 * 
 * Usage:
 *   const weekData = await loadWeekData(1);
 *   const weekData = await loadWeekData(10);
 */

// Glob pattern matches: ./weeks/week_01/index.js, ./weeks/week_02/index.js, etc.
const weekModules = import.meta.glob('./weeks/week_*/index.js');

/**
 * Load week data dynamically on demand
 * @param {number} weekId - Week number (1-156)
 * @returns {Promise<Object|null>} - Week data object or null if not found
 */
export const loadWeekData = async (weekId) => {
  // Format weekId: 1 -> '01', 10 -> '10', 156 -> '156'
  const weekKey = weekId.toString().padStart(2, '0');
  const path = `./weeks/week_${weekKey}/index.js`;

  if (!weekModules[path]) {
    console.warn(`[WeekLoader] Week ${weekId} not found at ${path}`);
    return null;
  }

  try {
    const module = await weekModules[path]();
    return module.default;
  } catch (err) {
    console.error(`[WeekLoader] Error loading week ${weekId}:`, err);
    return null;
  }
};

/**
 * Preload multiple weeks in parallel
 * Useful for prefetching adjacent weeks
 * @param {number[]} weekIds - Array of week numbers to preload
 * @returns {Promise<Object>} - Map of weekId -> weekData
 */
export const preloadWeeks = async (weekIds = []) => {
  const results = {};
  
  const promises = weekIds.map(async (id) => {
    const data = await loadWeekData(id);
    if (data) results[id] = data;
  });

  await Promise.all(promises);
  return results;
};

/**
 * Get list of available weeks (based on glob pattern)
 * Note: This requires parsing the keys, which happen at build time
 * @returns {number[]} - Array of available week numbers
 */
export const getAvailableWeeks = () => {
  const weekNumbers = [];
  const pattern = /week_(\d{2})/;
  
  Object.keys(weekModules).forEach((path) => {
    const match = path.match(pattern);
    if (match) {
      const weekNum = parseInt(match[1], 10);
      weekNumbers.push(weekNum);
    }
  });

  return weekNumbers.sort((a, b) => a - b);
};
