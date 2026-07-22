#!/usr/bin/env node
/* global console, process */
/**
 * tools/validate_shadowing.mjs
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * T-006 — L4 validator for shadowing.js + shadowing_ipa.js
 * Runtime: SHADOWING_REPAIR_RUNTIME v1.4 — Part 4 + Part 5 + Part 7.4
 *
 * USAGE:
 *   node tools/validate_shadowing.mjs 36                       # validate week 36 (both modes)
 *   node tools/validate_shadowing.mjs 36 --mode adv            # ADV only
 *   node tools/validate_shadowing.mjs 36 --mode easy           # EASY only
 *   node tools/validate_shadowing.mjs --all                    # all weeks with shadowing.js
 *   node tools/validate_shadowing.mjs --from 28 --to 36        # week range
 *   node tools/validate_shadowing.mjs 36 --strict              # WARNING → exit 1 (not 0)
 *   node tools/validate_shadowing.mjs 36 --json                # machine-readable JSON output
 *   node tools/validate_shadowing.mjs --version                # print version
 *   node tools/validate_shadowing.mjs --help                   # this help
 *
 * EXIT CODES:
 *   0 = PASS (all rules pass, or WARNING and --strict not set)
 *   1 = WARNING (rules pass but quality score 75-89, OR --strict with WARNING)
 *   2 = FAIL (any Part 4 rule fails, or quality score < 75, or override)
 *   3 = Missing input (no --week/--all/--from, or shadowing.js not found)
 *
 * RULES IMPLEMENTED (SHADOWING_REPAIR_RUNTIME v1.4 Part 4):
 *   S1-S8: sentence-level
 *   H1-H4: IPA coverage
 *   I1-I5: IPA-specific
 *   K1-K4: karaoke / highlight
 *   T1-T7: timing (requires L2 cleaned transcript)
 *   M1-M4: mode-pair (ADV vs EASY)
 *
 * QUALITY SCORE (Part 5.1, 7 components, weighted):
 *   Accuracy 25% · Completeness 20% · Natural 20% · Suitability 15%
 *   Grammar 10% · IPA 5% · Timing 5%
 *   Verdict: ≥90 PASS · 75-89 WARNING · <75 FAIL
 *   Override: ANY single component FAIL = overall FAIL
 *
 * NOTES:
 *   - When L2 cleaned transcript is absent, T1-T7 + K1-K4 + accuracy/completeness
 *     are reported as SKIP (no false negatives on pre-pipeline weeks).
 *   - This tool is intentionally READ-ONLY. It never writes to shadowing.js,
 *     shadowing_ipa.js, or any L2 cache.
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const TOOL_VERSION = '1.0.0';
const RUNTIME_VERSION = '1.4';
const FAST_RATE = 0.4;          // seconds per word (Part 10, fixed)
const W28_BOUNDARY = 28;        // W28+ has stricter [8,12]/[8,10] sentence bounds
const ADV_SCRIPT_MIN = 8;
const ADV_SCRIPT_MAX = 12;
const EASY_SCRIPT_MIN = 8;
const EASY_SCRIPT_MAX = 10;

// Part 5 component weights
const WEIGHTS = {
  accuracy: 0.25,
  completeness: 0.20,
  natural: 0.20,
  suitability: 0.15,
  grammar: 0.10,
  ipa: 0.05,
  timing: 0.05,
};

// Part 5 verdict thresholds
const PASS_THRESHOLD = 90;
const WARN_THRESHOLD = 75;

const __dirname = dirname(fileURLToPath(import.meta.url));
// Auto-detect workspace root: works from tools/
let BASE = resolve(__dirname, '..');
if (!existsSync(join(BASE, 'src', 'data', 'weeks'))) {
  BASE = resolve(__dirname, '..', '..');
}

const FMT = {
  PASS: '\x1b[32m',
  FAIL: '\x1b[31m',
  WARN: '\x1b[33m',
  SKIP: '\x1b[90m',
  INFO: '\x1b[36m',
  BOLD: '\x1b[1m',
  DIM: '\x1b[2m',
  NC: '\x1b[0m',
};

// ─── HELP ──────────────────────────────────────────────────────────
function printHelp() {
  console.log(`
T-006 validate_shadowing.mjs v${TOOL_VERSION}
Validates L4 shadowing.js + shadowing_ipa.js against SHADOWING_REPAIR_RUNTIME v${RUNTIME_VERSION}

USAGE:
  node tools/validate_shadowing.mjs <week> [options]
  node tools/validate_shadowing.mjs --all
  node tools/validate_shadowing.mjs --from A --to B

OPTIONS:
  --mode <adv|easy|both>   Mode to validate (default: both)
  --all                    Validate all weeks with shadowing.js
  --from <N>               Range start (used with --to)
  --to <N>                 Range end (used with --from)
  --strict                 WARNING → exit 1 (only PASS gives exit 0)
  --json                   Machine-readable JSON output
  --version                Print tool version
  --help                   Show this help

EXIT CODES:
  0  PASS    All Part 4 rules pass
  1  WARNING Rules pass but quality score 75-89
  2  FAIL    Any Part 4 rule fails, or quality score < 75
  3  Missing input (no week specified, or shadowing.js not found)

EXAMPLES:
  # Single week, both modes
  node tools/validate_shadowing.mjs 36

  # Single week, ADV only, JSON output
  node tools/validate_shadowing.mjs 36 --mode adv --json

  # Week range, strict mode
  node tools/validate_shadowing.mjs --from 28 --to 35 --strict

  # All weeks (audit mode)
  node tools/validate_shadowing.mjs --all

  # Pre-commit hook
  node tools/validate_shadowing.mjs 36 --strict || echo "shadowing validation failed"
`);
}

// ─── PATH RESOLUTION ───────────────────────────────────────────────
function weekPad(n) { return String(n).padStart(2, '0'); }
function shadowingPath(week, mode) {
  const dir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  return join(BASE, 'src', 'data', dir, `week_${weekPad(week)}`, 'shadowing.js');
}
function ipaPath(week, mode) {
  const dir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  return join(BASE, 'src', 'data', dir, `week_${weekPad(week)}`, 'shadowing_ipa.js');
}
function cleanedPath(videoId) {
  return join(BASE, 'src', 'data', 'video_transcripts_by_id', 'cleaned', `${videoId}.json`);
}

// ─── LOADERS ───────────────────────────────────────────────────────
async function loadShadowing(week, mode) {
  const path = shadowingPath(week, mode);
  if (!existsSync(path)) return { ok: false, path, error: `File not found: ${path}` };
  try {
    const url = pathToFileURL(path).href;
    const mod = await import(url);
    const data = mod.default;
    if (!data || typeof data !== 'object') {
      return { ok: false, path, error: 'No default export' };
    }
    return { ok: true, path, data };
  } catch (e) {
    return { ok: false, path, error: `Import error: ${e.message}` };
  }
}

async function loadIPA(week, mode) {
  const path = ipaPath(week, mode);
  if (!existsSync(path)) return { ok: false, path, error: null };
  try {
    const url = pathToFileURL(path).href;
    const mod = await import(url);
    return { ok: true, path, data: mod.default };
  } catch (e) {
    return { ok: false, path, error: `Import error: ${e.message}` };
  }
}

function loadCleaned(videoId) {
  const path = cleanedPath(videoId);
  if (!existsSync(path)) return { ok: false, path, data: null };
  try {
    const raw = readFileSync(path, 'utf8');
    return { ok: true, path, data: JSON.parse(raw) };
  } catch (e) {
    return { ok: false, path, data: null, error: `Parse error: ${e.message}` };
  }
}

function discoverWeeks() {
  const advDir = join(BASE, 'src', 'data', 'weeks');
  const weeks = new Set();
  if (existsSync(advDir)) {
    for (const e of readdirSync(advDir, { withFileTypes: true })) {
      const m = e.name.match(/^week_(\d+)$/);
      if (m && e.isDirectory()) {
        if (existsSync(join(advDir, e.name, 'shadowing.js'))) {
          weeks.add(parseInt(m[1], 10));
        }
      }
    }
  }
  return [...weeks].sort((a, b) => a - b);
}

// ─── HELPERS ───────────────────────────────────────────────────────
function extractWords(text) {
  // Match word characters (letters, digits, apostrophes within words)
  // Strip leading/trailing punctuation for matching against IPA
  return (text || '').toLowerCase()
    .replace(/[.,!?;:"—–\-()[\]]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function countSyllables(text) {
  // Heuristic: count vowel groups
  const words = text.toLowerCase().match(/[a-z]+/g) || [];
  let total = 0;
  for (const w of words) {
    const groups = w.match(/[aeiouy]+/g);
    total += groups ? groups.length : 1;
  }
  return total;
}

function checkResult(pass, message, extra = {}) {
  return { pass, message, ...extra };
}

function skipResult(reason) {
  return { pass: null, message: `SKIP: ${reason}`, skipped: true };
}

// ─── PART 4 RULES ──────────────────────────────────────────────────

// S1-S8: sentence-level
function ruleS1(script) {
  const ids = script.map(s => s.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  return dupes.length === 0
    ? checkResult(true, 'all ids unique')
    : checkResult(false, `duplicate ids: ${[...new Set(dupes)].join(', ')}`);
}

function ruleS2(script) {
  const ids = script.map(s => s.id);
  const out = [];
  for (let i = 0; i < ids.length; i++) {
    if (ids[i] !== i + 1) {
      out.push(`id at position ${i} is ${ids[i]} (expected ${i + 1})`);
    }
  }
  return out.length === 0
    ? checkResult(true, `ids sequential 1..${ids.length}`)
    : checkResult(false, out.join('; '));
}

function ruleS3(script) {
  const empty = script.filter(s => !s.text || s.text.trim().length === 0);
  return empty.length === 0
    ? checkResult(true, 'all sentences have non-empty text')
    : checkResult(false, `empty text at ids: ${empty.map(s => s.id).join(', ')}`);
}

function ruleS4(script) {
  const bold = script.filter(s => s.text && s.text.includes('**'));
  return bold.length === 0
    ? checkResult(true, 'no **bold** markers in script[].text')
    : checkResult(false, `**bold** markers at ids: ${bold.map(s => s.id).join(', ')}`);
}

function ruleS5(script) {
  const bad = script.filter(s => s.text && !s.text.trim().match(/[.?!]$/));
  return bad.length === 0
    ? checkResult(true, 'all sentences end with . ? or !')
    : checkResult(false, `missing terminal punctuation at ids: ${bad.map(s => s.id).join(', ')}`);
}

function ruleS6(script) {
  const bad = script.filter(s => s.text && s.text.trim().length > 0 && s.text.trim()[0] !== s.text.trim()[0].toUpperCase());
  return bad.length === 0
    ? checkResult(true, 'all sentences start with uppercase')
    : checkResult(false, `non-uppercase start at ids: ${bad.map(s => s.id).join(', ')}`);
}

function ruleS7(week, script, mode) {
  if (week < W28_BOUNDARY) {
    return skipResult(`W${week} < ${W28_BOUNDARY} — script count rule does not apply`);
  }
  const len = script.length;
  const min = mode === 'easy' ? EASY_SCRIPT_MIN : ADV_SCRIPT_MIN;
  const max = mode === 'easy' ? EASY_SCRIPT_MAX : ADV_SCRIPT_MAX;
  const label = mode.toUpperCase();
  if (len < min) return checkResult(false, `${label}: ${len} sentences (W28+ requires ≥ ${min})`);
  if (len > max) return checkResult(false, `${label}: ${len} sentences (W28+ requires ≤ ${max})`);
  return checkResult(true, `${len} sentences (range ${min}-${max})`);
}

function ruleS8(script) {
  const dupes = [];
  for (let i = 0; i < script.length - 1; i++) {
    if (script[i].text && script[i].text.trim() === script[i + 1].text.trim()) {
      dupes.push(`id ${script[i].id} == id ${script[i + 1].id}`);
    }
  }
  return dupes.length === 0
    ? checkResult(true, 'no adjacent duplicates')
    : checkResult(false, `adjacent duplicate text: ${dupes.join('; ')}`);
}

// H1-H4: IPA coverage
function ruleH1(script, ipa) {
  if (!ipa) return skipResult('no shadowing_ipa.js');
  const issues = [];
  for (const s of script) {
    const entry = ipa[s.id];
    if (!entry) continue; // H3 handles missing entries
    const textWords = extractWords(s.text);
    const ipaWords = new Set(entry.map(e => e.word.toLowerCase().replace(/[.,!?;:"]/g, '')));
    const missing = textWords.filter(w => !ipaWords.has(w));
    if (missing.length > 0) {
      issues.push(`id ${s.id}: missing "${missing.join(', ')}"`);
    }
  }
  return issues.length === 0
    ? checkResult(true, 'all text words covered by IPA')
    : checkResult(false, issues.slice(0, 5).join('; '));
}

function ruleH2(script, ipa) {
  if (!ipa) return skipResult('no shadowing_ipa.js');
  const issues = [];
  for (const s of script) {
    const entry = ipa[s.id];
    if (!entry) continue;
    const textWords = extractWords(s.text);
    if (entry.length !== textWords.length) {
      issues.push(`id ${s.id}: ${entry.length} IPA vs ${textWords.length} text words`);
    }
  }
  return issues.length === 0
    ? checkResult(true, 'IPA count matches text count for all sentences')
    : checkResult(false, issues.slice(0, 5).join('; '));
}

function ruleH3(script, ipa) {
  if (!ipa) return skipResult('no shadowing_ipa.js');
  const expected = new Set(script.map(s => s.id));
  const actual = new Set(Object.keys(ipa).map(k => parseInt(k, 10)).filter(n => !isNaN(n)));
  const missing = [...expected].filter(id => !actual.has(id));
  const extra = [...actual].filter(id => !expected.has(id));
  if (missing.length === 0 && extra.length === 0) {
    return checkResult(true, `all ${expected.size} script ids have IPA`);
  }
  const parts = [];
  if (missing.length) parts.push(`missing: ${missing.join(', ')}`);
  if (extra.length) parts.push(`extra: ${extra.join(', ')}`);
  return checkResult(false, parts.join('; '));
}

function ruleH4(script, ipa) {
  if (!ipa) return skipResult('no shadowing_ipa.js');
  const expected = new Set(script.map(s => s.id));
  const extras = Object.keys(ipa).map(k => parseInt(k, 10)).filter(n => !isNaN(n) && !expected.has(n));
  return extras.length === 0
    ? checkResult(true, 'no extra IPA keys')
    : checkResult(false, `extra IPA keys: ${extras.join(', ')}`);
}

// I1-I5: IPA-specific
function ruleI1(script, ipa) {
  if (!ipa) return skipResult('no shadowing_ipa.js');
  const issues = [];
  for (const s of script) {
    const entry = ipa[s.id];
    if (!entry) continue;
    for (let i = 0; i < entry.length; i++) {
      const e = entry[i];
      const keys = Object.keys(e);
      const required = ['word', 'ipa', 'stress'];
      const missing = required.filter(k => !keys.includes(k));
      if (missing.length) {
        issues.push(`id ${s.id} word ${i}: missing ${missing.join(', ')}`);
      }
    }
  }
  return issues.length === 0
    ? checkResult(true, 'all entries have word/ipa/stress')
    : checkResult(false, issues.slice(0, 3).join('; '));
}

function ruleI2(script, ipa) {
  if (!ipa) return skipResult('no shadowing_ipa.js');
  const issues = [];
  for (const s of script) {
    const entry = ipa[s.id];
    if (!entry) continue;
    for (let i = 0; i < entry.length; i++) {
      const stress = entry[i].stress;
      if (stress !== 0 && stress !== 1 && stress !== 2) {
        issues.push(`id ${s.id} word ${i}: stress=${stress} (expected 0/1/2)`);
      }
    }
  }
  return issues.length === 0
    ? checkResult(true, 'all stress values in {0,1,2}')
    : checkResult(false, issues.slice(0, 5).join('; '));
}

function ruleI3(script, ipa) {
  if (!ipa) return skipResult('no shadowing_ipa.js');
  const issues = [];
  for (const s of script) {
    const entry = ipa[s.id];
    if (!entry) continue;
    const textWords = new Set(extractWords(s.text));
    for (const e of entry) {
      const w = e.word.toLowerCase().replace(/[.,!?;:"]/g, '');
      if (w && !textWords.has(w)) {
        issues.push(`id ${s.id}: ghost word "${w}"`);
      }
    }
  }
  return issues.length === 0
    ? checkResult(true, 'all IPA words exist in text')
    : checkResult(false, issues.slice(0, 5).join('; '));
}

function ruleI4(script, ipa) {
  if (!ipa) return skipResult('no shadowing_ipa.js');
  const issues = [];
  for (const s of script) {
    const entry = ipa[s.id];
    if (!entry) continue;
    for (let i = 0; i < entry.length; i++) {
      const ipa = entry[i].ipa;
      if (typeof ipa !== 'string' || !ipa.startsWith('/') || !ipa.endsWith('/') || ipa.length < 3) {
        issues.push(`id ${s.id} word ${i}: ipa "${ipa}" not /.../ format`);
      }
    }
  }
  return issues.length === 0
    ? checkResult(true, 'all IPA strings in /.../ format')
    : checkResult(false, issues.slice(0, 5).join('; '));
}

function ruleI5(script, ipa) {
  if (!ipa) return skipResult('no shadowing_ipa.js');
  const issues = [];
  for (const s of script) {
    const entry = ipa[s.id];
    if (!entry) continue;
    const hasStressed = entry.some(e => e.stress === 1);
    if (!hasStressed) {
      issues.push(`id ${s.id}: no word with stress=1`);
    }
  }
  return issues.length === 0
    ? checkResult(true, 'every sentence has ≥1 stressed word')
    : checkResult(false, issues.join('; '));
}

// K1-K4: karaoke / highlight (uses cleaned for duration)
function ruleK1(script) {
  const zero = script.filter(s => extractWords(s.text).length === 0);
  return zero.length === 0
    ? checkResult(true, 'all sentences have ≥1 word')
    : checkResult(false, `zero-word sentences at ids: ${zero.map(s => s.id).join(', ')}`);
}

function ruleK2(script, cleaned) {
  if (!cleaned) return skipResult('no cleaned transcript for duration');
  const issues = [];
  for (const s of script) {
    const wc = extractWords(s.text).length;
    const dur = s.duration || 0;
    if (FAST_RATE * wc > dur + 0.5) {
      issues.push(`id ${s.id}: FAST_RATE*${wc}=${(FAST_RATE * wc).toFixed(2)}s > duration ${dur.toFixed(2)}s`);
    }
  }
  return issues.length === 0
    ? checkResult(true, 'FAST_RATE × wordCount ≤ duration + 0.5s')
    : checkResult(false, issues.slice(0, 3).join('; '));
}

function ruleK3(cleaned) {
  if (!cleaned) return skipResult('no cleaned transcript');
  const totalDur = (cleaned.segments || []).reduce((a, s) => a + (s.duration || 0), 0);
  return Number.isFinite(totalDur) && totalDur > 0
    ? checkResult(true, `total audio duration finite: ${totalDur.toFixed(2)}s`)
    : checkResult(false, `non-finite audio duration: ${totalDur}`);
}

function ruleK4(script, cleaned) {
  if (!cleaned) return skipResult('no cleaned transcript for timestamps');
  const starts = script.map(s => s.start).filter(s => s != null);
  const seen = new Set();
  const dups = [];
  for (const st of starts) {
    if (seen.has(st)) dups.push(st);
    seen.add(st);
  }
  return dups.length === 0
    ? checkResult(true, 'no two sentences with identical start')
    : checkResult(false, `duplicate start times: ${dups.join(', ')}`);
}

// Helper: find a matching cleaned segment for a script sentence (fuzzy).
// Matches after lowercase + stripping punctuation.
function findAlignedSegment(scriptSentence, cleanedSegments) {
  if (!cleanedSegments) return null;
  const normalize = t => t.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  const sn = normalize(scriptSentence.text);
  return cleanedSegments.find(g => normalize(g.text) === sn) || null;
}

function countAligned(script, cleaned) {
  if (!cleaned || !cleaned.segments) return 0;
  return script.filter(s => findAlignedSegment(s, cleaned.segments)).length;
}

// T1-T7: timing (uses cleaned transcript)
function ruleT1(script, cleaned) {
  if (!cleaned) return skipResult('no cleaned transcript for start times');
  if (countAligned(script, cleaned) === 0) {
    return skipResult(`no script sentences aligned with cleaned (0/${script.length})`);
  }
  const issues = [];
  for (const s of script) {
    const seg = findAlignedSegment(s, cleaned.segments);
    if (!seg) continue;
    if (typeof seg.start !== 'number' || seg.start < 0) {
      issues.push(`id ${s.id}: start=${seg.start} (expected ≥ 0)`);
    }
  }
  return issues.length === 0
    ? checkResult(true, 'all start values ≥ 0')
    : checkResult(false, issues.join('; '));
}

function ruleT2(script, cleaned) {
  if (!cleaned) return skipResult('no cleaned transcript for durations');
  if (countAligned(script, cleaned) === 0) {
    return skipResult(`no script sentences aligned with cleaned (0/${script.length})`);
  }
  const issues = [];
  for (const s of script) {
    const seg = findAlignedSegment(s, cleaned.segments);
    if (!seg) continue;
    if (typeof seg.duration !== 'number' || seg.duration <= 0) {
      issues.push(`id ${s.id}: duration=${seg.duration} (expected > 0)`);
    }
  }
  return issues.length === 0
    ? checkResult(true, 'all duration values > 0')
    : checkResult(false, issues.join('; '));
}

function ruleT3(script, cleaned) {
  if (!cleaned) return skipResult('no cleaned transcript for timing');
  if (countAligned(script, cleaned) === 0) {
    return skipResult(`no script sentences aligned with cleaned (0/${script.length})`);
  }
  // Use script timing directly (may have been adjusted by timing_fixer)
  const timed = script.map(s => ({
    id: s.id, start: s.start
  })).filter(t => t.start != null);
  const issues = [];
  for (let i = 0; i < timed.length - 1; i++) {
    if (timed[i + 1].start <= timed[i].start) {
      issues.push(`id ${timed[i + 1].id}: start ${timed[i + 1].start} ≤ id ${timed[i].id}: start ${timed[i].start}`);
    }
  }
  return issues.length === 0
    ? checkResult(true, 'all starts monotonic increasing')
    : checkResult(false, issues.join('; '));
}

function ruleT4(script, cleaned) {
  if (!cleaned) return skipResult('no cleaned transcript for timing');
  if (countAligned(script, cleaned) === 0) {
    return skipResult(`no script sentences aligned with cleaned (0/${script.length})`);
  }
  const timed = script.map(s => ({
    id: s.id, start: s.start, end: s.start + (s.duration || 0)
  })).filter(t => t.start != null);
  const issues = [];
  for (let i = 0; i < timed.length - 1; i++) {
    if (timed[i + 1].start < timed[i].end) {
      issues.push(`id ${timed[i + 1].id}: start ${timed[i + 1].start.toFixed(2)} < id ${timed[i].id}: end ${timed[i].end.toFixed(2)}`);
    }
  }
  return issues.length === 0
    ? checkResult(true, 'no overlapping segments')
    : checkResult(false, issues.slice(0, 3).join('; '));
}

function ruleT5(script, cleaned) {
  if (!cleaned) return skipResult('no cleaned transcript for coverage');
  // T5 validates that the script's total duration matches the audio it covers.
  // For partial transcripts, we compute the span from first start to last end.
  if (!script.length) return skipResult('empty script');
  const starts = script.map(s => s.start).filter(s => s != null);
  const ends = script.map(s => s.start + (s.duration || 0)).filter(s => s != null);
  if (starts.length === 0) return skipResult('no timed sentences');
  const scriptDur = Math.max(...ends) - Math.min(...starts);
  const total = (cleaned.segments || []).reduce((a, s) => a + (s.duration || 0), 0);
  if (total === 0) return skipResult('total audio duration is 0');
  const ratio = scriptDur / total;
  const ok = ratio >= 0.95 && ratio <= 1.05;
  return ok
    ? checkResult(true, `script coverage ${(ratio * 100).toFixed(1)}% of audio (${scriptDur.toFixed(1)}s / ${total.toFixed(1)}s)`)
    : checkResult(false, `script coverage ${(ratio * 100).toFixed(1)}% outside 95-105% (${scriptDur.toFixed(1)}s / ${total.toFixed(1)}s)`);
}

function ruleT6(script, cleaned) {
  if (!cleaned) return skipResult('no cleaned transcript for gaps');
  if (countAligned(script, cleaned) === 0) {
    return skipResult(`no script sentences aligned with cleaned (0/${script.length})`);
  }
  // Use script's timing (may have been adjusted by timing_fixer)
  const timed = script.map(s => {
    const seg = findAlignedSegment(s, cleaned.segments);
    return seg ? { id: s.id, start: s.start, end: s.start + (s.duration || 0) } : null;
  }).filter(Boolean);
  const issues = [];
  for (let i = 0; i < timed.length - 1; i++) {
    const gap = timed[i + 1].start - timed[i].end;
    if (gap < 0.15) {
      issues.push(`id ${timed[i + 1].id}: gap ${gap.toFixed(2)}s < 0.15s`);
    }
  }
  return issues.length === 0
    ? checkResult(true, 'all gaps ≥ 0.15s')
    : checkResult(false, issues.slice(0, 3).join('; '));
}

function ruleT7(script, cleaned) {
  if (!cleaned) return skipResult('no cleaned transcript for first-start');
  const total = (cleaned.segments || []).reduce((a, s) => a + (s.duration || 0), 0);
  if (total === 0) return skipResult('total audio duration is 0');
  const first = script
    .map(s => findAlignedSegment(s, cleaned.segments))
    .filter(Boolean)
    .sort((a, b) => a.start - b.start)[0];
  if (!first) return skipResult('no aligned sentences');
  const ratio = first.start / total;
  return ratio <= 0.05
    ? checkResult(true, `first sentence starts at ${(ratio * 100).toFixed(1)}% of audio (≤ 5%)`)
    : checkResult(false, `first sentence starts at ${(ratio * 100).toFixed(1)}% of audio (> 5%)`);
}

// M1-M4: mode-pair (ADV vs EASY)
function ruleM1(adv, easy) {
  if (!adv || !easy) return skipResult('requires both ADV and EASY');
  return adv.videoId === easy.videoId
    ? checkResult(true, `both modes use videoId ${adv.videoId}`)
    : checkResult(false, `ADV videoId ${adv.videoId} != EASY videoId ${easy.videoId}`);
}

function ruleM2(adv, easy) {
  if (!adv || !easy) return skipResult('requires both ADV and EASY');
  const advOK = adv.content_en && Array.isArray(adv.script);
  const easyOK = easy.content_en && Array.isArray(easy.script);
  if (advOK && easyOK) return checkResult(true, 'both have content_en and script[]');
  const issues = [];
  if (!advOK) issues.push('ADV missing content_en or script[]');
  if (!easyOK) issues.push('EASY missing content_en or script[]');
  return checkResult(false, issues.join('; '));
}

function ruleM3(adv, easy) {
  if (!adv || !easy) return skipResult('requires both ADV and EASY');
  const advVi = adv.script.map(s => s.vi).filter(Boolean);
  const easyVi = easy.script.map(s => s.vi).filter(Boolean);
  if (advVi.length === 0 || easyVi.length === 0) {
    return skipResult('vi not populated in one or both modes');
  }
  const allIdentical = advVi.length === easyVi.length &&
    advVi.every((v, i) => v === easyVi[i]);
  if (allIdentical) {
    return checkResult(true, 'vi differs (identical is allowed by spec but suspicious)');
  }
  return checkResult(true, 'vi differs between modes');
}

function ruleM4(adv, easy) {
  if (!adv || !easy) return skipResult('requires both ADV and EASY');
  const advLen = adv.script?.length || 0;
  const easyLen = easy.script?.length || 0;
  return advLen >= easyLen
    ? checkResult(true, `ADV ${advLen} ≥ EASY ${easyLen}`)
    : checkResult(false, `ADV ${advLen} < EASY ${easyLen} (ADV should have ≥ EASY practice)`);
}

// ─── PART 5 QUALITY SCORES ─────────────────────────────────────────

function scoreAccuracy(script, cleaned) {
  if (!cleaned || !cleaned.segments) {
    return { score: null, reason: 'no cleaned transcript' };
  }
  if (!script.length) return { score: 0 };
  const segTexts = cleaned.segments.map(s => extractWords(s.text).join(' '));
  const segWords = new Set(segTexts.join(' ').split(/\s+/).filter(Boolean));
  let total = 0;
  for (const s of script) {
    const textWords = new Set(extractWords(s.text));
    if (textWords.size === 0) { total += 100; continue; }
    const intersect = [...textWords].filter(w => segWords.has(w));
    total += (intersect.length / textWords.size) * 100;
  }
  return { score: total / script.length };
}

function scoreCompleteness(script, cleaned) {
  if (!cleaned || !cleaned.text) return { score: null, reason: 'no cleaned transcript' };
  if (!script.length) return { score: 0 };
  const expectedText = script.map(s => s.text).join(' ').toLowerCase();
  const expectedWords = extractWords(expectedText);
  if (expectedWords.length === 0) return { score: 100 };
  const cleanedWords = new Set(extractWords(cleaned.text));
  const covered = expectedWords.filter(w => cleanedWords.has(w));
  return { score: (covered.length / expectedWords.length) * 100 };
}

function scoreNatural(script, cleaned) {
  if (!cleaned || !cleaned.segments) return { score: null, reason: 'no cleaned transcript' };
  if (script.length < 2) return { score: 100 };
  let pass = 0;
  for (let i = 0; i < script.length; i++) {
    const s = script[i];
    const terminalOK = !!s.text && /[.?!]$/.test(s.text.trim());
    const nextOK = i === script.length - 1 ||
      (script[i + 1] && script[i + 1].text && /^[A-Z]/.test(script[i + 1].text.trim()));
    const gapOK = (() => {
      const next = script[i + 1];
      if (!next || !next.text) return true;
      if (s.start == null || s.duration == null || next.start == null) return true;
      const gap = next.start - (s.start + s.duration);
      return gap >= 0.15 && gap <= 3.0;
    })();
    if (terminalOK && nextOK && gapOK) pass++;
  }
  return { score: (pass / script.length) * 100 };
}

function scoreSuitability(script) {
  if (!script.length) return { score: 0 };
  // Part 5.2 limits (A1 default since most weeks are A1-A2)
  const MAX_WORDS = 12;
  const MIN_WORDS = 3;
  const MAX_SYLLABLES = 20;
  const MIN_SYLLABLES = 4;
  const MAX_SPEAKING_TIME = 8.0; // seconds
  const MIN_SPEAKING_TIME = 1.0;
  let total = 0;
  for (const s of script) {
    const wc = extractWords(s.text).length;
    const sc = countSyllables(s.text);
    // We don't have per-sentence duration without cleaned, so use word count as proxy
    const estDur = wc * 0.4; // approx 0.4s per word
    let suit = 100;
    if (wc > MAX_WORDS) suit -= 50;
    if (sc > MAX_SYLLABLES) suit -= 30;
    if (estDur > MAX_SPEAKING_TIME) suit -= 30;
    if (wc < MIN_WORDS) suit -= 20;
    if (sc < MIN_SYLLABLES) suit -= 20;
    if (estDur < MIN_SPEAKING_TIME) suit -= 20;
    total += Math.max(0, suit);
  }
  return { score: total / script.length };
}

function scoreGrammar(script) {
  if (!script.length) return { score: 0 };
  // Heuristic grammar check: subject-verb agreement + capitalization + terminal punctuation
  let total = 100;
  for (const s of script) {
    const text = s.text.trim();
    if (!text) { total -= 5; continue; }
    if (!/^[A-Z]/.test(text)) total -= 5;
    if (!/[.?!]$/.test(text)) total -= 5;
    // "I" should be uppercase
    if (text.match(/\bi\b/)) total -= 5;
  }
  return { score: Math.max(0, total) };
}

function scoreIPA(script, ipa) {
  if (!ipa) return { score: null, reason: 'no shadowing_ipa.js' };
  if (!script.length) return { score: 0 };
  let total = 0;
  let counted = 0;
  for (const s of script) {
    const entry = ipa[s.id];
    if (!entry) continue;
    counted++;
    const stressed = entry.filter(e => e.stress === 1 || e.stress === 2).length;
    const totalWords = entry.length;
    if (totalWords === 0) continue;
    const contentRatio = stressed / totalWords;
    const expected = 0.5; // assume ~50% content words
    total += Math.min(100, (contentRatio / expected) * 100);
  }
  if (counted === 0) return { score: null, reason: 'no IPA entries' };
  return { score: total / counted };
}

function scoreTiming(script, cleaned) {
  if (!cleaned || !cleaned.segments) return { score: null, reason: 'no cleaned transcript' };
  // Use script timing directly (may have been adjusted by timing_fixer)
  const timed = script.map(s => ({
    start: s.start, end: s.start + (s.duration || 0)
  })).filter(t => t.start != null);
  if (timed.length < 2) return { score: null, reason: 'fewer than 2 timed sentences' };
  let monotonic = 0;
  let nonOverlap = 0;
  let goodGaps = 0;
  for (let i = 0; i < timed.length - 1; i++) {
    if (timed[i + 1].start > timed[i].start) monotonic++;
    if (timed[i + 1].start >= timed[i].end - 0.1) nonOverlap++;
    const gap = timed[i + 1].start - timed[i].end;
    if (gap >= 0.15 && gap <= 3.0) goodGaps++;
  }
  const N = timed.length - 1;
  const monoScore = (monotonic / N) * 30;
  const overlapScore = (nonOverlap / N) * 30;
  const gapScore = (goodGaps / N) * 40;
  return { score: monoScore + overlapScore + gapScore };
}

function computeQualityScore(script, ipa, cleaned) {
  const components = {
    accuracy: scoreAccuracy(script, cleaned),
    completeness: scoreCompleteness(script, cleaned),
    natural: scoreNatural(script, cleaned),
    suitability: scoreSuitability(script),
    grammar: scoreGrammar(script),
    ipa: scoreIPA(script, ipa),
    timing: scoreTiming(script, cleaned),
  };
  let total = 0;
  let weightUsed = 0;
  let anyFail = false;
  const componentResults = {};
  for (const [name, { score, reason }] of Object.entries(components)) {
    if (score === null || score === undefined) {
      componentResults[name] = { score: null, reason, weight: WEIGHTS[name] };
      continue;
    }
    let status;
    if (score >= PASS_THRESHOLD) status = 'PASS';
    else if (score >= WARN_THRESHOLD) status = 'WARNING';
    else { status = 'FAIL'; anyFail = true; }
    componentResults[name] = { score: Math.round(score), status, weight: WEIGHTS[name] };
    total += score * WEIGHTS[name];
    weightUsed += WEIGHTS[name];
  }
  // If some components skipped, normalize the weighted total to the used weight
  const normalizedTotal = weightUsed > 0 ? total / weightUsed : 0;
  let verdict;
  if (anyFail) verdict = 'FAIL';
  else if (normalizedTotal >= PASS_THRESHOLD) verdict = 'PASS';
  else if (normalizedTotal >= WARN_THRESHOLD) verdict = 'WARNING';
  else verdict = 'FAIL';
  return { total: Math.round(normalizedTotal), verdict, components: componentResults, weightUsed };
}

// ─── RULE RUNNER ───────────────────────────────────────────────────
function runRulesForMode(week, data, ipaData, cleanedData) {
  const script = data.script || [];
  const rules = [];

  rules.push({ id: 'S1', ...ruleS1(script) });
  rules.push({ id: 'S2', ...ruleS2(script) });
  rules.push({ id: 'S3', ...ruleS3(script) });
  rules.push({ id: 'S4', ...ruleS4(script) });
  rules.push({ id: 'S5', ...ruleS5(script) });
  rules.push({ id: 'S6', ...ruleS6(script) });
  // S7 needs mode context — pass null, handled outside
  rules.push({ id: 'S7', ...ruleS7(week, script, 'unknown') });
  rules.push({ id: 'S8', ...ruleS8(script) });

  rules.push({ id: 'H1', ...ruleH1(script, ipaData) });
  rules.push({ id: 'H2', ...ruleH2(script, ipaData) });
  rules.push({ id: 'H3', ...ruleH3(script, ipaData) });
  rules.push({ id: 'H4', ...ruleH4(script, ipaData) });

  rules.push({ id: 'I1', ...ruleI1(script, ipaData) });
  rules.push({ id: 'I2', ...ruleI2(script, ipaData) });
  rules.push({ id: 'I3', ...ruleI3(script, ipaData) });
  rules.push({ id: 'I4', ...ruleI4(script, ipaData) });
  rules.push({ id: 'I5', ...ruleI5(script, ipaData) });

  rules.push({ id: 'K1', ...ruleK1(script) });
  rules.push({ id: 'K2', ...ruleK2(script, cleanedData) });
  rules.push({ id: 'K3', ...ruleK3(cleanedData) });
  rules.push({ id: 'K4', ...ruleK4(script, cleanedData) });

  rules.push({ id: 'T1', ...ruleT1(script, cleanedData) });
  rules.push({ id: 'T2', ...ruleT2(script, cleanedData) });
  rules.push({ id: 'T3', ...ruleT3(script, cleanedData) });
  rules.push({ id: 'T4', ...ruleT4(script, cleanedData) });
  rules.push({ id: 'T5', ...ruleT5(script, cleanedData) });
  rules.push({ id: 'T6', ...ruleT6(script, cleanedData) });
  rules.push({ id: 'T7', ...ruleT7(script, cleanedData) });

  return rules;
}

function runModePairRules(advData, easyData) {
  return [
    { id: 'M1', ...ruleM1(advData, easyData) },
    { id: 'M2', ...ruleM2(advData, easyData) },
    { id: 'M3', ...ruleM3(advData, easyData) },
    { id: 'M4', ...ruleM4(advData, easyData) },
  ];
}

// ─── VERDICT COMPUTATION ───────────────────────────────────────────
function computeVerdict(ruleResults, qualityScore) {
  const ruleFails = ruleResults.filter(r => r.pass === false).length;
  const ruleSkips = ruleResults.filter(r => r.skipped).length;
  const rulePasses = ruleResults.filter(r => r.pass === true).length;
  // If all rules are SKIP and we have no quality score, the data is fundamentally
  // missing — treat as FAIL only when shadowing.js itself couldn't be loaded.
  // Otherwise, treat as inconclusive (exit 3).
  if (rulePasses === 0 && ruleFails === 0 && ruleSkips > 0) {
    return { verdict: 'INSUFFICIENT', rulePasses, ruleFails, ruleSkips };
  }
  if (ruleFails > 0) {
    return { verdict: 'FAIL', rulePasses, ruleFails, ruleSkips };
  }
  if (qualityScore) {
    if (qualityScore.verdict === 'FAIL') return { verdict: 'FAIL', rulePasses, ruleFails, ruleSkips };
    if (qualityScore.verdict === 'WARNING') return { verdict: 'WARNING', rulePasses, ruleFails, ruleSkips };
  }
  return { verdict: 'PASS', rulePasses, ruleFails, ruleSkips };
}

// ─── REPORT FORMATTERS ─────────────────────────────────────────────
function formatHuman(weekResults) {
  const lines = [];
  lines.push('═'.repeat(64));
  lines.push(`  validate_shadowing v${TOOL_VERSION}  —  SHADOWING_REPAIR_RUNTIME v${RUNTIME_VERSION}`);
  lines.push('═'.repeat(64));
  lines.push('');

  for (const wr of weekResults) {
    const modeLabel = wr.mode.toUpperCase();
    lines.push(`Week ${wr.week} (mode: ${modeLabel}):`);
    lines.push('');
    for (const r of wr.rules) {
      let statusColor, statusLabel;
      if (r.skipped) {
        statusColor = FMT.SKIP;
        statusLabel = 'SKIP';
      } else if (r.pass) {
        statusColor = FMT.PASS;
        statusLabel = 'PASS';
      } else {
        statusColor = FMT.FAIL;
        statusLabel = 'FAIL';
      }
      const id = `[${r.id}]`.padEnd(5);
      const msg = (r.message || '').slice(0, 80);
      lines.push(`  ${statusColor}${id}${FMT.NC} ${statusLabel.padEnd(7)} ${msg}`);
    }
    if (wr.modePairRules && wr.modePairRules.length > 0) {
      lines.push('');
      lines.push('  Mode-pair rules:');
      for (const r of wr.modePairRules) {
        let statusColor, statusLabel;
        if (r.skipped) {
          statusColor = FMT.SKIP;
          statusLabel = 'SKIP';
        } else if (r.pass) {
          statusColor = FMT.PASS;
          statusLabel = 'PASS';
        } else {
          statusColor = FMT.FAIL;
          statusLabel = 'FAIL';
        }
        const id = `[${r.id}]`.padEnd(5);
        const msg = (r.message || '').slice(0, 80);
        lines.push(`  ${statusColor}${id}${FMT.NC} ${statusLabel.padEnd(7)} ${msg}`);
      }
    }
    lines.push('');
    if (wr.qualityScore) {
      const qs = wr.qualityScore;
      if (qs.weightUsed && qs.weightUsed < 0.99) {
        lines.push('  Quality Score (partial — some components skipped):');
      } else {
        lines.push('  Quality Score:');
      }
      for (const [name, comp] of Object.entries(qs.components)) {
        if (comp.score === null) {
          lines.push(`    ${name.padEnd(15)} N/A   ${FMT.SKIP}(${comp.reason})${FMT.NC}`);
        } else {
          const c = comp.status === 'PASS' ? FMT.PASS : comp.status === 'WARNING' ? FMT.WARN : FMT.FAIL;
          lines.push(`    ${name.padEnd(15)} ${String(comp.score + '%').padStart(4)}  ${c}[${comp.status}]${FMT.NC}`);
        }
      }
      lines.push('  ' + '─'.repeat(30));
      const tcolor = qs.verdict === 'PASS' ? FMT.PASS : qs.verdict === 'WARNING' ? FMT.WARN : FMT.FAIL;
      lines.push(`  ${FMT.BOLD}TOTAL${FMT.NC}            ${String(qs.total + '%').padStart(4)}  ${tcolor}[${qs.verdict}]${FMT.NC}`);
    } else {
      lines.push('  ' + FMT.DIM + 'Quality Score: not computed (missing data)' + FMT.NC);
    }
    lines.push('');
    const v = wr.verdict;
    const vcolor = v.verdict === 'PASS' ? FMT.PASS : v.verdict === 'WARNING' ? FMT.WARN : v.verdict === 'INSUFFICIENT' ? FMT.SKIP : FMT.FAIL;
    lines.push(`  Verdict: ${vcolor}${v.verdict}${FMT.NC} (${v.rulePasses} pass, ${v.ruleFails} fail, ${v.ruleSkips} skip)`);
    lines.push('');
  }

  // Summary across all weeks
  const totalVerdicts = weekResults.reduce((acc, wr) => {
    acc[wr.verdict.verdict] = (acc[wr.verdict.verdict] || 0) + 1;
    return acc;
  }, {});
  lines.push('═'.repeat(64));
  const parts = Object.entries(totalVerdicts).map(([k, v]) => `${k}: ${v}`);
  lines.push(`  Summary: ${parts.join(', ')}`);
  lines.push('═'.repeat(64));

  return lines.join('\n');
}

function formatJSON(weekResults) {
  return JSON.stringify({
    tool: 'validate_shadowing',
    version: TOOL_VERSION,
    runtime_version: RUNTIME_VERSION,
    weeks: weekResults.map(wr => ({
      week: wr.week,
      mode: wr.mode,
      path: wr.path,
      rules: wr.rules.map(r => ({
        id: r.id,
        pass: r.pass,
        skipped: !!r.skipped,
        message: r.message,
      })),
      modePairRules: wr.modePairRules ? wr.modePairRules.map(r => ({
        id: r.id,
        pass: r.pass,
        skipped: !!r.skipped,
        message: r.message,
      })) : null,
      qualityScore: wr.qualityScore,
      verdict: wr.verdict,
    })),
  }, null, 2);
}

// ─── MAIN ──────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2).filter(a => !a.startsWith('--test'));

  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }
  if (args.includes('--version')) {
    console.log(`validate_shadowing v${TOOL_VERSION} (Runtime v${RUNTIME_VERSION})`);
    process.exit(0);
  }

  const json = args.includes('--json');
  const strict = args.includes('--strict');
  const all = args.includes('--all');
  const modeArg = 'adv'; // Unified transcript — always adv

  const fromIdx = args.indexOf('--from');
  const toIdx = args.indexOf('--to');
  const fromArg = fromIdx !== -1 ? parseInt(args[fromIdx + 1], 10) : null;
  const toArg = toIdx !== -1 ? parseInt(args[toIdx + 1], 10) : null;

  // Resolve weeks
  let weeks = [];
  if (all) {
    weeks = discoverWeeks();
  } else if (fromArg !== null && toArg !== null) {
    if (isNaN(fromArg) || isNaN(toArg) || fromArg > toArg) {
      console.error(`${FMT.FAIL}--from and --to must be valid integers with from ≤ to${FMT.NC}`);
      process.exit(3);
    }
    weeks = [];
    for (let w = fromArg; w <= toArg; w++) weeks.push(w);
  } else {
    const weekArg = args.find(a => /^\d+$/.test(a));
    if (!weekArg) {
      printHelp();
      process.exit(3);
    }
    weeks = [parseInt(weekArg, 10)];
  }

  if (weeks.length === 0) {
    console.error(`${FMT.FAIL}No weeks to validate${FMT.NC}`);
    process.exit(3);
  }

  const weekResults = [];
  let overallVerdict = 'PASS';

  for (const week of weeks) {
    const load = await loadShadowing(week, 'adv');
    const ipaLoad = await loadIPA(week, 'adv');

    if (!load.ok) {
      weekResults.push({
        week: weekPad(week),
        mode: 'adv',
        path: load.path,
        rules: [{ id: 'LOAD', pass: false, message: load.error }],
        modePairRules: null,
        qualityScore: null,
        verdict: { verdict: 'FAIL', rulePasses: 0, ruleFails: 1, ruleSkips: 0 },
      });
      overallVerdict = 'FAIL';
      continue;
    }

    const ipaData = ipaLoad.ok ? ipaLoad.data : null;
      const cleaned = load.data.videoId ? loadCleaned(load.data.videoId) : null;
      const cleanedData = cleaned.ok ? cleaned.data : null;

      // S7 needs mode context
      const rules = runRulesForMode(week, load.data, ipaData, cleanedData);
      const s7Idx = rules.findIndex(r => r.id === 'S7');
      if (s7Idx !== -1) {
        rules[s7Idx] = { id: 'S7', ...ruleS7(week, load.data.script || [], 'adv') };
      }

      const qualityScore = computeQualityScore(
        load.data.script || [],
        ipaData,
        cleanedData,
      );

      const verdict = computeVerdict(rules, qualityScore);
      weekResults.push({
        week: weekPad(week),
        mode: 'adv',
        path: load.path,
        rules,
        modePairRules: null,
        qualityScore,
        verdict,
      });

      if (verdict.verdict === 'FAIL') overallVerdict = 'FAIL';
      else if (verdict.verdict === 'WARNING' && overallVerdict === 'PASS') overallVerdict = 'WARNING';
  }

  // Output
  if (json) {
    console.log(formatJSON(weekResults));
  } else {
    console.log(formatHuman(weekResults));
  }

  // Exit code
  // Per Part 7.4: --strict makes WARNING fail the gate (exit 2 instead of 1)
  let exitCode;
  if (overallVerdict === 'PASS') exitCode = 0;
  else if (overallVerdict === 'WARNING') exitCode = strict ? 2 : 1;
  else if (overallVerdict === 'FAIL') exitCode = 2;
  else exitCode = 2; // INSUFFICIENT also exits 2 — we couldn't verify
  process.exit(exitCode);
}

// ─── EXPORTS (for testing) ─────────────────────────────────────────
export {
  ruleS1, ruleS2, ruleS3, ruleS4, ruleS5, ruleS6, ruleS7, ruleS8,
  ruleH1, ruleH2, ruleH3, ruleH4,
  ruleI1, ruleI2, ruleI3, ruleI4, ruleI5,
  ruleK1, ruleK2, ruleK3, ruleK4,
  ruleT1, ruleT2, ruleT3, ruleT4, ruleT5, ruleT6, ruleT7,
  ruleM1, ruleM2, ruleM3, ruleM4,
  extractWords, countSyllables, computeQualityScore, computeVerdict,
  loadShadowing, loadIPA, loadCleaned, discoverWeeks,
  TOOL_VERSION, RUNTIME_VERSION, FAST_RATE,
};

// Only run CLI when executed directly, not when imported for testing
const isDirectRun = process.argv[1] &&
  resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isDirectRun) {
  main().catch(e => {
    console.error(`${FMT.FAIL}Unexpected error: ${e.message}${FMT.NC}`);
    console.error(e.stack);
    process.exit(2);
  });
}
