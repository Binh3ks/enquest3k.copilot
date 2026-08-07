#!/usr/bin/env node
/**
 * content_lint.mjs
 * ================
 * Validates read.js + explore.js content quality for EngQuest3k mass production.
 * Run immediately after creating / editing read.js or explore.js — DO NOT wait for the gate.
 *
 * Checks:
 *   [E1] Word count out of range for this mode + phase             (N-05a–f)
 *   [E2] < 8 **bold** vocabulary markers in content_en             (B-01 requires 10)
 *   [E3] Vietnamese / non-English characters found in content_en   (N-01)
 *   [E4] Banned B1+ vocabulary in Easy Mode Phase 1 (W1–54)        (N-06)
 *   [W1] Conditionally-banned term used but not in that week's vocab.js
 *   [W2] explore.js has no CLIL bold markers (< 8) despite being W37+ Advanced or W55+ Easy (N-10)
 *
 * Usage:
 *   node tools/content_lint.mjs --week N [--mode adv|easy|both] [--errors-only]
 *   npm run content:lint -- --week N
 *   npm run content:lint -- --week N --mode easy
 *   npm run content:lint -- --week N --errors-only
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..');

// ANSI colours
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN  = '\x1b[32m';
const BOLD   = '\x1b[1m';
const RESET  = '\x1b[0m';

// ─── Argument parsing ────────────────────────────────────────────────────────
const args = process.argv.slice(2);

function getArg(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
}

const weekArg  = getArg('--week') ?? args.find(a => /^\d+$/.test(a));
const modeArg  = getArg('--mode') ?? 'both';
const errorsOnly = args.includes('--errors-only');

const weekNum = parseInt(weekArg, 10);
if (isNaN(weekNum) || weekNum < 1 || weekNum > 156) {
  console.error(`\nUsage: node tools/content_lint.mjs --week N [--mode adv|easy|both] [--errors-only]\n`);
  process.exit(1);
}

// ─── Phase / word-count ranges ───────────────────────────────────────────────
function getPhase(week) {
  if (week <= 15)  return 1;  // W01–15:  85–135w (ADV)  /  80–130w (Easy)
  if (week <= 27)  return 2;  // W16–27: 145–215w (ADV)  / 110–160w (Easy)
  return 3;                    // W28+:    145–220w (ADV)  / 145–220w (Easy)
}

// [mode][phase][fileType] → [min, max] words
const RANGES = {
  easy: {
    1: { read: [80,  130], explore: [80,  140] },
    2: { read: [110, 160], explore: [120, 180] },
    3: { read: [145, 220], explore: [150, 220] },
  },
  adv: {
    1: { read: [85,  135], explore: [80,  140] },
    2: { read: [145, 215], explore: [120, 180] },
    3: { read: [145, 220], explore: [150, 220] },
  },
};

// ─── Banned vocabulary (Easy Phase 1 — W1–54) ───────────────────────────────
// These are B1+ terms inappropriate for Easy Phase 1 unless they appear in vocab.js.
// Rule N-06 from CONTENT_RULES_READ_EXPLORE.md.
const BANNED_EASY_P1 = [
  'forensic',
  'neuroscience',
  'neuroscientist',
  'oxytocin',
  'dopamine',
  'psychologist',
  'carbohydrates',
  'ancestors',
  'gracefully',
  'portrait',
  'fight-or-flight',
  'urban planner',
];

// These are banned UNLESS the word is in that week's vocab.js (exceptions from Section 5).
const CONDITIONALLY_BANNED_EASY_P1 = [
  'precipitation',
  'atmosphere',
  'evaporation',
  'gravity',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Extract content_en from a JS file.
 * Handles both:
 *   content_en: "single line string with **bold**"
 *   content_en: `
 *     multi
 *     line
 *   `
 */
function extractContentEn(text) {
  // Template literal (multiline)
  const tmpl = text.match(/content_en:\s*`([\s\S]*?)`\s*[,\n}]/);
  if (tmpl) return tmpl[1];

  // Double-quoted string (escaped newlines + quotes)
  const str = text.match(/content_en:\s*"((?:[^"\\]|\\.)*)"/);
  if (str) return str[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');

  return null;
}

/** Count words, stripping **bold** markers. */
function wordCount(text) {
  return text.replace(/\*\*/g, '').trim().split(/\s+/).filter(Boolean).length;
}

/** Count **bold** wrapped tokens in content_en. */
function boldCount(text) {
  const matches = text.match(/\*\*[^*\n]+\*\*/g);
  return matches ? matches.length : 0;
}

/** Return true if the string contains Vietnamese Unicode characters. */
const VIET_RE = /[àáâãăắặẵẳẫấầảạẹẻẽêếềệểễđíìỉĩịóòỏõọốồổỗộơớờởỡợúùủũụứừửữựýỳỷỹỵÀÁÂÃĂẮẶẴẲẪẤẦẢẠẸẺẼÊẾỀỆỂỄĐÍÌỈĨỊÓÒỎÕỌỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤỨỪỬỮỰÝỲỶỸỴ]/;
function hasVietnamese(text) {
  return VIET_RE.test(text);
}

/** Load the word set from vocab.js for a given week+mode. */
function loadVocabWords(weekPad, isEasy) {
  const dir = isEasy
    ? path.join(BASE, `src/data/weeks_easy/week_${weekPad}`)
    : path.join(BASE, `src/data/weeks/week_${weekPad}`);
  const vocabFile = path.join(dir, 'vocab.js');
  if (!fs.existsSync(vocabFile)) return new Set();
  const text = fs.readFileSync(vocabFile, 'utf-8');
  return new Set(
    [...text.matchAll(/\bword:\s*['"]([^'"]+)['"]/g)]
      .map(m => m[1].toLowerCase())
  );
}

// ─── Per-file lint ────────────────────────────────────────────────────────────
function lintFile(filePath, fileType, label, weekNum, isEasy) {
  const errors   = [];
  const warnings = [];

  if (!fs.existsSync(filePath)) {
    errors.push(`[E0] File not found: ${filePath}`);
    return { errors, warnings };
  }

  const text      = fs.readFileSync(filePath, 'utf-8');
  const contentEn = extractContentEn(text);

  if (!contentEn) {
    errors.push(`[E0] Cannot extract content_en from ${label} — check file format`);
    return { errors, warnings };
  }

  const phase   = getPhase(weekNum);
  const modeKey = isEasy ? 'easy' : 'adv';
  const [minW, maxW] = RANGES[modeKey][phase][fileType];

  // [E1] Word count range
  const wc = wordCount(contentEn);
  if (wc < minW) {
    errors.push(`[E1] Word count too short: ${wc}w (min ${minW}w for ${modeKey.toUpperCase()} P${phase} ${fileType})`);
  } else if (wc > maxW) {
    errors.push(`[E1] Word count too long: ${wc}w (max ${maxW}w for ${modeKey.toUpperCase()} P${phase} ${fileType})`);
  }

  // [E5] 4-Category Pedagogical Chunk Audit (Orphaned Prepositions, Bad Pronouns, Day Names, Punctuation)
  const BAD_PRONOUNS_AUX = new Set(['i', 'he', 'she', 'it', 'we', 'they', 'you', 'my', 'his', 'her', 'their', 'our', 'was', 'were', 'had', 'have', 'has', 'did', 'do', 'does', 'then', 'then i', 'using', 'and', 'or', 'but', 'so', 'because', 'said mia', 'said leo']);
  const ORPHANED_PREPS = new Set(['walked to', 'looked at', 'sat down with', 'went to', 'listened to', 'talked to', 'ran to', 'flew to', 'came to', 'pointed at', 'pointed to', 'shouted at', 'smiled at', 'drove to', 'returned to', 'belonged to']);

  const bolds = Array.from(contentEn.matchAll(/\*\*(.*?)\*\*/g)).map(m => m[1]);
  for (const b of bolds) {
    const clean = b.trim();
    const lower = clean.toLowerCase();

    if (/[.,!?;:]$/.test(clean)) {
      errors.push(`[E5] Punctuation inside bold tag: '**${clean}**'`);
    }
    if (BAD_PRONOUNS_AUX.has(lower)) {
      errors.push(`[E5] Bad standalone pronoun/auxiliary chunk: '**${clean}**'`);
    }
    if (/^(saturday|sunday|monday|tuesday|wednesday|thursday|friday)/.test(clean)) {
      errors.push(`[E5] Uncapitalized day name in chunk: '**${clean}**'`);
    }
    if (ORPHANED_PREPS.has(lower)) {
      errors.push(`[E5] Orphaned preposition without target object: '**${clean}**'`);
    }
    if (/^panel (one|two|three|four|five|1|2|3|4|5)$/i.test(lower)) {
      errors.push(`[E5] Isolated panel name without preposition 'In': '**${clean}**'`);
    }
  }

  // [E2] Bold word count (target 10, error below 8)
  const bc = boldCount(contentEn);
  if (bc === 0) {
    errors.push(`[E2] ${label}: no **bold** vocabulary markers found in content_en — add 10 vocab words in **word** format`);
  } else if (bc < 8) {
    errors.push(`[E2] ${label}: only ${bc} **bold** markers — need ≥8 (target 10, one per vocab word)`);
  } else if (bc < 10) {
    warnings.push(`[W3] ${label}: ${bc} **bold** markers — target is exactly 10 (one per vocab word)`);
  }

  // [E3] Vietnamese characters in content_en
  if (hasVietnamese(contentEn)) {
    const idx = contentEn.search(VIET_RE);
    const snippet = contentEn.substring(Math.max(0, idx - 20), idx + 25).trim();
    errors.push(`[E3] ${label}: Vietnamese characters in content_en → "...${snippet}..."\n       Vietnamese belongs in content_vi only (N-01)`);
  }

  // [E4] Banned vocabulary (Easy Phase 1 only)
  if (isEasy && phase === 1) {
    const lower = contentEn.toLowerCase();
    for (const term of BANNED_EASY_P1) {
      if (lower.includes(term)) {
        errors.push(`[E4] ${label}: banned B1+ term "${term}" in Easy Phase 1 (N-06)\n       Remove or replace with an A1–A2 alternative.`);
      }
    }
    // Conditionally banned: only a warning, requires checking vocab.js
    const vocabWords = loadVocabWords(String(weekNum).padStart(2, '0'), isEasy);
    for (const term of CONDITIONALLY_BANNED_EASY_P1) {
      if (lower.includes(term) && !vocabWords.has(term)) {
        warnings.push(`[W1] ${label}: "${term}" used but is NOT in this week's vocab.js — only allowed if it IS a target word (N-06 exception)\n       Path: ${vocabFile(weekNum, isEasy)}`);
      }
    }
  }

  return { errors, warnings };
}

function vocabFile(weekNum, isEasy) {
  const pad = String(weekNum).padStart(2, '0');
  return isEasy
    ? `src/data/weeks_easy/week_${pad}/vocab.js`
    : `src/data/weeks/week_${pad}/vocab.js`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const weekPad     = String(weekNum).padStart(2, '0');
const phase       = getPhase(weekNum);
const modesToCheck = modeArg === 'both' ? ['adv', 'easy'] : [modeArg === 'easy' ? 'easy' : 'adv'];

console.log(`\n${BOLD}📝 content:lint — Week ${weekPad} (Phase ${phase})${RESET}\n`);

let totalErrors   = 0;
let totalWarnings = 0;
const results     = [];

for (const mode of modesToCheck) {
  const isEasy   = mode === 'easy';
  const weekDir  = isEasy
    ? path.join(BASE, `src/data/weeks_easy/week_${weekPad}`)
    : path.join(BASE, `src/data/weeks/week_${weekPad}`);

  for (const fileType of ['read', 'explore']) {
    const filePath = path.join(weekDir, `${fileType}.js`);
    const label    = `${mode.toUpperCase()}/${fileType}.js`;
    const { errors, warnings } = lintFile(filePath, fileType, label, weekNum, isEasy);
    totalErrors   += errors.length;
    totalWarnings += warnings.length;
    results.push({ label, errors, warnings });
  }
}

// ─── Report ──────────────────────────────────────────────────────────────────
for (const { label, errors, warnings } of results) {
  if (errors.length === 0 && warnings.length === 0) {
    console.log(`  ${GREEN}✔ ${label}${RESET}`);
    continue;
  }
  console.log(`  ${label}:`);
  for (const e of errors) {
    console.log(`    ${RED}${e}${RESET}`);
  }
  if (!errorsOnly) {
    for (const w of warnings) {
      console.log(`    ${YELLOW}${w}${RESET}`);
    }
  }
}

console.log('');
if (totalErrors === 0 && totalWarnings === 0) {
  console.log(`${GREEN}✔ content:lint PASSED — all read.js + explore.js OK.${RESET}\n`);
} else if (totalErrors === 0) {
  console.log(`${GREEN}content:lint PASSED${errorsOnly ? '' : ` (${totalWarnings} warning(s) — review above)`}.${RESET}\n`);
} else {
  console.log(`${RED}${BOLD}content:lint FAILED — ${totalErrors} error(s). Fix before committing.${RESET}`);
  console.log(`Tip: Review CONTENT_RULES_READ_EXPLORE.md for full rules.\n`);
}

process.exit(totalErrors > 0 ? 1 : 0);
