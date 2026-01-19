/**
 * VARIANT SELECTOR - Hybrid Controlled Randomness
 * 
 * Selects question/ACK/recast variants from predefined sets
 * Uses seed-based deterministic randomness for consistency
 */

/**
 * Simple hash function for seed-based selection
 * @param {string} seed - Combination of missionId + objectiveId + attempt
 * @returns {number} Hash value
 */
function hashSeed(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Select a question variant from objective
 * @param {Object} objective - Objective with question_variants array
 * @param {string} missionId - Mission identifier
 * @param {number} attempt - Attempt number (for reset/retry)
 * @returns {Object} Selected variant {question, hints}
 */
export function selectQuestionVariant(objective, missionId, attempt = 0) {
  // Fallback to canonical_question if no variants
  if (!objective.question_variants || objective.question_variants.length === 0) {
    return {
      question: objective.canonical_question || "Tell me more.",
      hints: objective.hints || ["I", "am", "my", "is"]
    };
  }
  
  // Generate seed for deterministic randomness
  const seed = `${missionId}_${objective.stepKey}_${attempt}`;
  const hash = hashSeed(seed);
  const index = hash % objective.question_variants.length;
  
  const selected = objective.question_variants[index];
  console.log(`🎲 Variant selected for ${objective.stepKey}: variant ${index + 1}/${objective.question_variants.length}`);
  
  return selected;
}

/**
 * Select an ACK variant
 * @param {Object} objective - Objective with ack_variants array
 * @param {string} missionId - Mission identifier
 * @param {number} turnNumber - Current turn number
 * @returns {string} Selected ACK
 */
export function selectAckVariant(objective, missionId, turnNumber) {
  // Fallback to default ACKs
  const ackVariants = objective.ack_variants || objective.ack_options || ["Nice!", "Great!", "Wonderful!"];
  
  // Use turnNumber for variety within same objective
  const seed = `${missionId}_${objective.stepKey}_ack_${turnNumber}`;
  const hash = hashSeed(seed);
  const index = hash % ackVariants.length;
  
  return ackVariants[index];
}

/**
 * Select a recast template
 * @param {Object} objective - Objective with recast_templates array
 * @param {string} missionId - Mission identifier
 * @param {number} turnNumber - Current turn number
 * @returns {string} Selected template
 */
export function selectRecastTemplate(objective, missionId, turnNumber) {
  const templates = objective.recast_templates || ["{X}"];
  
  // Use turnNumber for variety
  const seed = `${missionId}_${objective.stepKey}_recast_${turnNumber}`;
  const hash = hashSeed(seed);
  const index = hash % templates.length;
  
  return templates[index];
}

/**
 * Get attempt number from localStorage (for reset tracking)
 * @param {string} missionId - Mission identifier
 * @returns {number} Current attempt number
 */
export function getMissionAttempt(missionId) {
  try {
    const key = `mission_${missionId}_attempt`;
    const attempt = parseInt(localStorage.getItem(key) || '0');
    return attempt;
  } catch (error) {
    console.warn('Could not get attempt from localStorage:', error);
    return 0;
  }
}

/**
 * Increment attempt number (called on mission reset)
 * @param {string} missionId - Mission identifier
 */
export function incrementMissionAttempt(missionId) {
  try {
    const key = `mission_${missionId}_attempt`;
    const current = getMissionAttempt(missionId);
    localStorage.setItem(key, String(current + 1));
    console.log(`🔄 Mission ${missionId} attempt incremented to ${current + 1}`);
  } catch (error) {
    console.warn('Could not increment attempt in localStorage:', error);
  }
}

export default {
  selectQuestionVariant,
  selectAckVariant,
  selectRecastTemplate,
  getMissionAttempt,
  incrementMissionAttempt
};
