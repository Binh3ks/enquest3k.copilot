#!/usr/bin/env node
/**
 * repair_orchestrator.mjs — Autonomous Shadowing Repair Orchestrator
 *
 * State Machine: DISCOVERY → DIAGNOSIS → REPAIR → VALIDATION → RETRY → COMPLETE
 * Circuit Breaker: max 3 retries per rule, max 10 total cycles
 *
 * Wired micro-agents:
 *   - TextFixer: S5, S6 (deterministic punctuation/capitalization)
 *   - TimingFixer: T3, T4, T5, T6, K2, K4 (deterministic timing math)
 *
 * Usage:
 *   node tools/repair_orchestrator.mjs --week 11
 *   node tools/repair_orchestrator.mjs --week 11 --dry-run
 *   node tools/repair_orchestrator.mjs --week 11 --mode adv
 *   node tools/repair_orchestrator.mjs --week 11 --json
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
  runValidator, extractFailures, getQualityScore, getVerdict,
  logState, logRetry, logFix, logSkip, logError, logComplete, logHeader,
} from './repair_utils.mjs';
import { autoFixSimple, applyFixes } from './repair_agents/text_fixer.mjs';
import { fixTiming } from './repair_agents/timing_fixer.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── State Machine ────────────────────────────────────────────────

const STATES = Object.freeze({
  DISCOVERY: 'DISCOVERY',
  DIAGNOSIS: 'DIAGNOSIS',
  REPAIR: 'REPAIR',
  VALIDATION: 'VALIDATION',
  COMPLETE: 'COMPLETE',
});

// ─── Circuit Breaker ─────────────────────────────────────────────

const MAX_RETRIES_PER_RULE = 3;
const MAX_TOTAL_CYCLES = 5;

class CircuitBreaker {
  constructor() {
    this.attempts = new Map(); // ruleId → attempt count
    this.totalCycles = 0;
  }

  canAttempt(ruleId) {
    return (this.attempts.get(ruleId) || 0) < MAX_RETRIES_PER_RULE;
  }

  recordAttempt(ruleId) {
    this.attempts.set(ruleId, (this.attempts.get(ruleId) || 0) + 1);
  }

  incrementCycles() {
    this.totalCycles++;
  }

  shouldAbort() {
    return this.totalCycles >= MAX_TOTAL_CYCLES;
  }
}

// ─── File I/O ─────────────────────────────────────────────────────

function getShadowingPath(week) {
  const weekStr = String(week).padStart(2, '0');
  return join(ROOT, 'src', 'data', 'weeks', `week_${weekStr}`, 'shadowing.js');
}

async function loadScript(week) {
  const filePath = getShadowingPath(week);
  if (!existsSync(filePath)) return null;

  try {
    const mod = await import(filePath);
    const data = mod.default;
    return { filePath, script: data.script || [], data };
  } catch (e) {
    logError(week, `Failed to load ${filePath}: ${e.message}`);
    return null;
  }
}

function saveScript(filePath, data) {
  // Reconstruct the JS file from the data object
  const lines = ['export default {'];
  for (const [key, value] of Object.entries(data)) {
    if (key === 'script') {
      lines.push('  script: [');
      for (const s of data.script) {
        const text = JSON.stringify(s.text);
        lines.push(`    { id: ${s.id}, text: ${text}, vi: ${JSON.stringify(s.vi)}, start: ${s.start}, duration: ${s.duration} },`);
      }
      lines.push('  ],');
    } else if (typeof value === 'string') {
      lines.push(`  ${key}: ${JSON.stringify(value)},`);
    } else if (value === null) {
      lines.push(`  ${key}: null,`);
    } else {
      lines.push(`  ${key}: ${JSON.stringify(value)},`);
    }
  }
  lines.push('};');
  lines.push('');

  writeFileSync(filePath, lines.join('\n'), 'utf8');
}

// ─── Failure Clustering ───────────────────────────────────────────

// Rules handled by TextFixer (deterministic punctuation/capitalization)
const TEXT_FIX_RULES = new Set(['S5', 'S6']);

// Rules handled by TimingFixer (deterministic timing math)
const TIMING_FIX_RULES = new Set(['T3', 'T4', 'T6', 'K2', 'K4']);

// Rules that require re-alignment (not fixable by adjusting individual timings)
const REALIGNMENT_RULES = new Set(['T5']);

// Rules pending future micro-agents
const PENDING_RULES = new Set([
  'H1', 'H2', 'H3', 'H4', // IPA coverage
  'I3', 'I5',               // IPA quality
  'M4',                     // Mode pair
]);

function clusterFailures(failures) {
  const clusters = {
    textFix: [],
    timingFix: [],
    pending: [],
  };

  for (const f of failures) {
    if (TEXT_FIX_RULES.has(f.id)) {
      clusters.textFix.push(f);
    } else if (TIMING_FIX_RULES.has(f.id)) {
      clusters.timingFix.push(f);
    } else {
      clusters.pending.push(f);
    }
  }

  return clusters;
}

// ─── Repair Logic ─────────────────────────────────────────────────

function findFailingSentenceIds(failures) {
  const ids = new Set();
  for (const f of failures) {
    // Parse "ids: 14, 15, 17" from message
    const match = f.message.match(/ids?:\s*([\d,\s]+)/);
    if (match) {
      for (const idStr of match[1].split(',')) {
        const id = parseInt(idStr.trim());
        if (!isNaN(id)) ids.add(id);
      }
    }
  }
  return [...ids];
}

async function repairTextFix(script, failures, week, mode) {
  const failingIds = findFailingSentenceIds(failures);
  if (failingIds.length === 0) return 0;

  const failingSentences = script.filter(s => failingIds.includes(s.id));
  const allSentences = script.map(s => ({ id: s.id, text: s.text }));

  // Try deterministic fix first
  const autoFixes = autoFixSimple(failingSentences);

  if (autoFixes.size > 0) {
    const modified = applyFixes(script, autoFixes);
    logFix(week, 'S5/S6', `auto-fixed ${modified} sentence(s) deterministically`);
    return modified;
  }

  // If deterministic fix didn't cover all, try LLM
  // (In Phase 1, we only use deterministic fixes)
  logSkip(week, 'S5/S6', 'LLM fix not yet wired — deterministic fix did not cover all failures');
  return 0;
}

// ─── Orchestrator ─────────────────────────────────────────────────

async function orchestrate(week, options = {}) {
  const { dryRun = false, jsonOutput = false } = options;
  const breaker = new CircuitBreaker();
  let state = STATES.DISCOVERY;
  let ctx = {};

  logHeader(`Repair Orchestrator — Week ${week} [unified]`);

  while (state !== STATES.COMPLETE) {
    switch (state) {
      // ── DISCOVERY ──────────────────────────────────────────
      case STATES.DISCOVERY: {
        logState(week, state, '→ VALIDATION');

        const result = await runValidator(week);
        if (!result.ok) {
          logError(week, `Validator failed: ${result.error}`);
          state = STATES.COMPLETE;
          break;
        }

        ctx.validationData = result.data;
        state = STATES.VALIDATION;
        break;
      }

      // ── VALIDATION ─────────────────────────────────────────
      case STATES.VALIDATION: {
        const failures = extractFailures(ctx.validationData);

        if (failures.length === 0) {
          // All rules pass — check quality score
          let worstScore = 100;
          let worstVerdict = 'PASS';
          if (ctx.validationData?.weeks) {
            for (const wr of ctx.validationData.weeks) {
              const qs = getQualityScore(ctx.validationData, wr.week, wr.mode);
              const v = getVerdict(ctx.validationData, wr.week, wr.mode);
              if (qs && qs.total < worstScore) worstScore = qs.total;
              if (v && v.verdict !== 'PASS') worstVerdict = v.verdict;
            }
          }
          logComplete(week, worstVerdict, worstScore);
          state = STATES.COMPLETE;
          break;
        }

        logState(week, state, '→ DIAGNOSIS');
        ctx.failures = failures;
        state = STATES.DIAGNOSIS;
        break;
      }

      // ── DIAGNOSIS ──────────────────────────────────────────
      case STATES.DIAGNOSIS: {
        const failures = ctx.failures;
        const clusters = clusterFailures(failures);

        // Check circuit breaker
        breaker.incrementCycles();
        if (breaker.shouldAbort()) {
          logError(week, `Circuit breaker: max ${MAX_TOTAL_CYCLES} cycles reached`);
          logRemainingFailures(week, failures);
          state = STATES.COMPLETE;
          break;
        }

        // Log pending failures
        for (const f of clusters.pending) {
          logSkip(week, f.id, 'Pending Micro-Agent Implementation');
        }

        const hasTextFix = clusters.textFix.length > 0;
        const hasTimingFix = clusters.timingFix.length > 0;

        if (!hasTextFix && !hasTimingFix) {
          logError(week, 'No fixable failures remain; remaining failures are pending implementation');
          logRemainingFailures(week, failures);
          state = STATES.COMPLETE;
          break;
        }

        // Check retry budget
        let abortDueToRetries = false;
        for (const f of [...clusters.textFix, ...clusters.timingFix]) {
          if (!breaker.canAttempt(f.id)) {
            logRetry(week, breaker.attempts.get(f.id), MAX_RETRIES_PER_RULE, `${f.id} max retries reached`);
            abortDueToRetries = true;
          }
        }
        if (abortDueToRetries) {
          logRemainingFailures(week, failures.filter(f => !clusters.textFix.some(tf => tf.id === f.id) && !clusters.timingFix.some(tf => tf.id === f.id)));
          state = STATES.COMPLETE;
          break;
        }

        logState(week, state, '→ REPAIR');
        ctx.clusters = clusters;
        state = STATES.REPAIR;
        break;
      }

      // ── REPAIR ─────────────────────────────────────────────
      case STATES.REPAIR: {
        const clusters = ctx.clusters;
        let totalFixed = 0;

        const loaded = await loadScript(week);
        if (!loaded) {
          logError(week, 'Could not load shadowing.js');
          state = STATES.COMPLETE;
          break;
        }

        // Apply text fixes
        const textFailures = clusters.textFix;
        if (textFailures.length > 0) {
          const fixed = await repairTextFix(loaded.script, textFailures, week);
          totalFixed += fixed;
          for (const f of textFailures) {
            breaker.recordAttempt(f.id);
          }
        }

        // Apply timing fixes
        const timingFailures = clusters.timingFix;
        if (timingFailures.length > 0) {
          const result = fixTiming(loaded.script);
          if (result.fixed) {
            totalFixed += result.changes.length;
            for (let i = 0; i < loaded.script.length; i++) {
              loaded.script[i].start = result.script[i].start;
              loaded.script[i].duration = result.script[i].duration;
            }
            logFix(week, 'TIMING', `${result.changes.length} timing adjustments`);
          }
          for (const f of timingFailures) {
            breaker.recordAttempt(f.id);
          }
        }

        if (!dryRun && totalFixed > 0) {
          loaded.data.script = loaded.script;
          loaded.data.content_en = loaded.script.map(s => s.text).join(' ');
          saveScript(loaded.filePath, loaded.data);
          logFix(week, 'FILE', `saved ${loaded.filePath}`);
        }

        if (totalFixed === 0) {
          logError(week, 'Repair produced no changes');
          state = STATES.COMPLETE;
          break;
        }

        logState(week, state, '→ VALIDATION (re-run)');
        state = STATES.DISCOVERY;
        break;
      }
    }
  }

  // Final report
  if (jsonOutput) {
    const result = await runValidator(week);
    const data = result.ok ? result.data : null;
    const failures = data ? extractFailures(data) : [];
    let score = null;
    if (data?.weeks) {
      for (const wr of data.weeks) {
        const qs = getQualityScore(data, wr.week, wr.mode);
        if (qs && (!score || qs.total < score)) score = qs.total;
      }
    }
    console.log(JSON.stringify({
      week,
      dryRun,
      cycles: breaker.totalCycles,
      remainingFailures: failures.length,
      qualityScore: score,
    }, null, 2));
  }
}

function logRemainingFailures(week, failures) {
  if (failures.length === 0) return;
  console.log(`  Remaining failures:`);
  for (const f of failures) {
    logSkip(week, f.id, f.message.slice(0, 80));
  }
}

// ─── CLI ──────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const weekIdx = args.indexOf('--week');
  const week = weekIdx >= 0 ? parseInt(args[weekIdx + 1], 10) : null;
  const dryRun = args.includes('--dry-run');
  const jsonOutput = args.includes('--json');

  if (!week || isNaN(week)) {
    console.error('Usage: node tools/repair_orchestrator.mjs --week <N> [--dry-run] [--json]');
    process.exit(2);
  }

  return { week, dryRun, jsonOutput };
}

const opts = parseArgs();
orchestrate(opts.week, opts).catch(e => {
  console.error(`Fatal: ${e.message}`);
  process.exit(2);
});
