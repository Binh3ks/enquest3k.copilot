/**
 * EngQuest3K Progress & Scoring Contracts
 * Milestone 0 Progress Specifications for W33+ Architecture
 */

export const PROGRESS_LABELS = {
  PRACTICE_SCORE: 'Practice Score',
  READINESS_ESTIMATE: 'EngQuest Flyers Readiness Estimate',
  RULE_CHECK_PASSED: 'Layer 1 Rule Check Passed',
  RULE_CHECK_FAILED: 'Layer 1 Rule Check Failed'
};

/**
 * Validate an attempt payload prior to progress logging
 * @param {Object} payload 
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateAttemptPayload(payload) {
  const errors = [];

  if (!payload) {
    return { valid: false, errors: ['Attempt payload is null or undefined'] };
  }

  if (!payload.contentId && !payload.content_id) {
    errors.push('Attempt payload missing contentId/content_id property');
  }

  if (typeof payload.score !== 'number' && typeof payload.final_score !== 'number') {
    errors.push('Attempt payload missing numeric score property');
  }

  const validResults = ['correct', 'incorrect', 'minor_error', 'partial'];
  if (payload.result && !validResults.includes(payload.result)) {
    errors.push(`Invalid attempt result '${payload.result}'. Must be one of: ${validResults.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Normalize raw attempt log entry to schema 1.3 compliance
 * @param {Object} raw 
 * @returns {Object}
 */
export function normalizeAttemptLogEntry(raw = {}) {
  return {
    timestamp: raw.timestamp || new Date().toISOString(),
    result: raw.result || (raw.score >= 100 ? 'correct' : raw.score > 0 ? 'minor_error' : 'incorrect'),
    hint_used: Boolean(raw.hintUsed || raw.hint_used),
    minor_errors: Array.isArray(raw.minorErrors || raw.minor_errors) ? (raw.minorErrors || raw.minor_errors) : [],
    diagnostic_tag: raw.diagnosticTag || raw.diagnostic_tag || null
  };
}

export default {
  PROGRESS_LABELS,
  validateAttemptPayload,
  normalizeAttemptLogEntry
};
