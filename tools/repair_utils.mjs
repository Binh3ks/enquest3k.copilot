/**
 * repair_utils.mjs — Shared utilities for the Repair Orchestrator
 *
 * Provides:
 * - Robust validator execution with JSON parsing
 * - Structured logging for state transitions and retry counts
 */

import { execFile } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const VALIDATOR_PATH = resolve(__dirname, 'validate_shadowing.mjs');

// ─── Logging ──────────────────────────────────────────────────────

const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

function ts() {
  return new Date().toISOString().slice(11, 23);
}

export function logState(week, from, to) {
  console.log(`${COLORS.dim}[${ts()}]${COLORS.reset} ${COLORS.cyan}STATE${COLORS.reset}  W${week}  ${from} → ${to}`);
}

export function logRetry(week, attempt, max, reason) {
  console.log(`${COLORS.dim}[${ts()}]${COLORS.reset} ${COLORS.yellow}RETRY${COLORS.reset}  W${week}  attempt ${attempt}/${max}  (${reason})`);
}

export function logFix(week, ruleId, action) {
  console.log(`${COLORS.dim}[${ts()}]${COLORS.reset} ${COLORS.green}FIX${COLORS.reset}    W${week}  [${ruleId}] ${action}`);
}

export function logSkip(week, ruleId, reason) {
  console.log(`${COLORS.dim}[${ts()}]${COLORS.reset} ${COLORS.gray}SKIP${COLORS.reset}   W${week}  [${ruleId}] ${reason}`);
}

export function logError(week, message) {
  console.error(`${COLORS.dim}[${ts()}]${COLORS.reset} ${COLORS.red}ERROR${COLORS.reset}  W${week}  ${message}`);
}

export function logComplete(week, verdict, score) {
  const color = verdict === 'PASS' ? COLORS.green : verdict === 'WARNING' ? COLORS.yellow : COLORS.red;
  console.log(`${COLORS.dim}[${ts()}]${COLORS.reset} ${color}DONE${COLORS.reset}    W${week}  verdict=${verdict}  score=${score}%`);
}

export function logHeader(text) {
  console.log(`\n${COLORS.bold}═══ ${text} ═══${COLORS.reset}`);
}

// ─── Validator Runner ─────────────────────────────────────────────

/**
 * Run validate_shadowing.mjs with --json flag and parse the output.
 *
 * @param {number} week - Week number to validate
 * @param {string} mode - 'adv', 'easy', or 'both' (default: 'both')
 * @returns {Promise<{ok: boolean, data?: object, error?: string}>}
 */
export function runValidator(week, mode = 'adv') {
  return new Promise((resolvePromise) => {
    const args = [VALIDATOR_PATH, String(week), '--json'];

    execFile('node', args, { timeout: 30000 }, (error, stdout, stderr) => {
      // Exit code 0 = PASS, 1 = WARNING, 2 = FAIL, 3 = missing input
      // All are valid outcomes — we parse whatever stdout contains
      if (stdout && stdout.trim()) {
        try {
          const data = JSON.parse(stdout.trim());
          resolvePromise({ ok: true, data });
        } catch (e) {
          resolvePromise({ ok: false, error: `JSON parse error: ${e.message}\nRaw: ${stdout.slice(0, 500)}` });
        }
      } else {
        resolvePromise({ ok: false, error: `No output from validator. stderr: ${stderr || '(empty)'}` });
      }
    });
  });
}

/**
 * Extract all failing rules from a validator result.
 *
 * @param {object} validationData - Parsed JSON from runValidator
 * @returns {Array<{id: string, pass: boolean, skipped: boolean, message: string, week: string, mode: string}>}
 */
export function extractFailures(validationData) {
  if (!validationData?.weeks) return [];
  const failures = [];
  for (const weekResult of validationData.weeks) {
    for (const rule of weekResult.rules) {
      if (rule.pass === false && !rule.skipped) {
        failures.push({
          ...rule,
          week: weekResult.week,
          mode: weekResult.mode,
        });
      }
    }
    if (weekResult.modePairRules) {
      for (const rule of weekResult.modePairRules) {
        if (rule.pass === false && !rule.skipped) {
          failures.push({
            ...rule,
            week: weekResult.week,
            mode: 'pair',
          });
        }
      }
    }
  }
  return failures;
}

/**
 * Get the quality score for a specific week+mode.
 */
export function getQualityScore(validationData, week, mode) {
  if (!validationData?.weeks) return null;
  const wr = validationData.weeks.find(w => w.week === String(week) && w.mode === mode);
  return wr?.qualityScore || null;
}

/**
 * Get the verdict for a specific week+mode.
 */
export function getVerdict(validationData, week, mode) {
  if (!validationData?.weeks) return null;
  const wr = validationData.weeks.find(w => w.week === String(week) && w.mode === mode);
  return wr?.verdict || null;
}
