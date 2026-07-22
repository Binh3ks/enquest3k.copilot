/**
 * timing_fixer.mjs — Deterministic timing repair for shadowing.js
 *
 * Fixes: T3 (monotonic), T4 (overlaps), T6 (gaps), K2 (duration too short)
 * These are pure-math constraints — no LLM needed.
 *
 * T5 (coverage) requires re-alignment and is handled separately.
 *
 * Input:  script array from shadowing.js
 * Output: { fixed: boolean, script: array, changes: Array<{id, field, old, new}> }
 */

const MIN_GAP = 0.16;     // seconds between segments (0.01 buffer above 0.15 threshold)
const FAST_RATE = 0.4;    // seconds per word (from validate_shadowing.mjs)

/**
 * Fix timing issues in a script array.
 *
 * @param {Array<{id:number, text:string, vi:any, start:number, duration:number}>} script
 * @returns {{ fixed: boolean, script: Array, changes: Array }}
 */
export function fixTiming(script) {
  // Deep clone to avoid mutating the original
  const fixed = script.map(s => ({ ...s }));
  const changes = [];

  // Step 1: Ensure chronological order and minimum gaps (fixes T3, T4, T6)
  for (let i = 1; i < fixed.length; i++) {
    const prev = fixed[i - 1];
    const prevEnd = prev.start + prev.duration;
    const minAllowed = prevEnd + MIN_GAP;

    if (fixed[i].start < minAllowed) {
      const oldStart = fixed[i].start;
      fixed[i].start = Math.round(minAllowed * 1000) / 1000;
      changes.push({ id: fixed[i].id, field: 'start', old: oldStart, new: fixed[i].start });
    }
  }

  // Step 2: Ensure minimum duration for each segment (fixes K2)
  for (const seg of fixed) {
    const wordCount = seg.text.split(/\s+/).filter(Boolean).length;
    const minDuration = FAST_RATE * wordCount;

    if (seg.duration < minDuration) {
      const oldDuration = seg.duration;
      seg.duration = Math.round((minDuration + 0.1) * 1000) / 1000;
      changes.push({ id: seg.id, field: 'duration', old: oldDuration, new: seg.duration });
    }
  }

  return { fixed: changes.length > 0, script: fixed, changes };
}
