/**
 * dict_lint.mjs
 *
 * Validates src/data/dictionary.json for common quality errors.
 * Run automatically via `npm run dict:lint`.
 * Run as pre-commit step to block bad entries from being pushed.
 *
 * Checks:
 *   [E1] Banned example patterns (generic / meaningless)
 *   [E2] Unaccented Vietnamese in the `meaning` field
 *   [E3] Empty or missing required fields (word, meaning, example)
 *   [W1] Example sentence too short (< 5 words)
 *   [W2] Example sentence doesn't contain the word (or a close form)
 *
 * Exit code:
 *   0 = clean
 *   1 = errors found (blocks commit)
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ERRORS_ONLY = process.argv.includes('--errors-only');  // suppress W-level output
const DICT_PATH = resolve(__dirname, '../src/data/dictionary.json');

const normalizeLookupKey = (value = '') => value
  .toLowerCase()
  .replace(/[^a-z0-9\s'-]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

// ── Banned example patterns ──────────────────────────────────────────────────
// Any example matching one of these regex patterns is rejected.
const BANNED_EXAMPLE_PATTERNS = [
  {
    re: /plays an important role/i,
    msg: 'Generic filler: "plays an important role". Write a real contextual sentence.',
  },
  {
    re: /is over there\.?$/i,
    msg: 'Placeholder: "X is over there." Write a real contextual sentence.',
  },
  {
    re: /^This is about \w/i,
    msg: 'Placeholder: "This is about X." Write a real contextual sentence.',
  },
  {
    re: /is something we should know/i,
    msg: 'Generic filler: "is something we should know." Write a real contextual sentence.',
  },
  {
    re: /helps us daily\.?$/i,
    msg: 'Generic filler: "helps us daily." Write a real contextual sentence.',
  },
  {
    re: /is here\.?$/i,
    msg: 'Vague placeholder: "X is here." Write a real contextual sentence.',
  },
];

// ── Unaccented Vietnamese detector ───────────────────────────────────────────
// Vietnamese words that are commonly written without diacritics.
// Format: regex that should NOT appear in the `meaning` field as-is.
const UNACCENTED_VI_PATTERNS = [
  { re: /\btoi qua\b/i,    correct: 'tối qua' },
  { re: /\bhom qua\b/i,    correct: 'hôm qua' },
  { re: /\btuan truoc\b/i, correct: 'tuần trước' },
  { re: /\btham tu\b/i,    correct: 'thám tử' },
  { re: /\bmanh moi\b/i,   correct: 'manh mối' },
  { re: /\bkhat nuoc\b/i,  correct: 'khát nước' },
  { re: /\btuc gian\b/i,   correct: 'tức giận' },
  { re: /\bchan nan\b/i,   correct: 'chán nản' },
  { re: /\bso hai\b/i,     correct: 'sợ hãi' },
  { re: /\blo lang\b/i,    correct: 'lo lắng' },
  { re: /\bbuon phien\b/i, correct: 'buồn phiền' },
  { re: /\bvui ve\b/i,     correct: 'vui vẻ' },
  { re: /\bro rang\b/i,    correct: 'rõ ràng' },
  { re: /\bmet moi\b/i,    correct: 'mệt mỏi' },
  { re: /\bvu an\b/i,      correct: 'vụ án' },
  { re: /\bcau hoi\b/i,    correct: 'câu hỏi' },
  { re: /\bcau tra loi\b/i,correct: 'câu trả lời' },
  { re: /\btao ra\b/i,     correct: 'tạo ra' },
  { re: /\bgap giay\b/i,   correct: 'gấp (giấy)' },
  { re: /\bco ve\b/i,      correct: 'cọ vẽ' },
  { re: /\bto mau\b/i,     correct: 'tô màu' },
  { re: /\btinh doi xung\b/i, correct: 'tính đối xứng' },
  { re: /\bbinh tinh\b/i,  correct: 'bình tĩnh' },
  { re: /\bngac nhien\b/i, correct: 'ngạc nhiên' },
  // Generic catch-all: meaning is pure ASCII (no Vietnamese diacritics at all)
  // but is multi-word and looks like it should be Vietnamese
  {
    re: (meaning) => {
      if (!meaning || meaning.length < 4) return false;
      const hasDiacritics = /[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝĂĐƠƯ]/.test(meaning);
      const isMultiWord = meaning.trim().split(/\s+/).length >= 2;
      const isAllASCII = /^[a-zA-Z0-9\s\(\)\/\-,\.'"]+$/.test(meaning);
      // Flag only if: multi-word, no diacritics at all, entirely ASCII-looking Vietnamese
      const looksVietnamese = /\b(toi|hom|tuan|tham|manh|khat|gian|chan|hai|lang|phien|rang|moi|tinh|binh|nhien|sau|truoc|qua)\b/i.test(meaning);
      return isAllASCII && isMultiWord && looksVietnamese && !hasDiacritics;
    },
    custom: true,
    correct: '(add proper Vietnamese diacritics)',
  },
];

// ── Load dictionary ───────────────────────────────────────────────────────────
const raw = JSON.parse(readFileSync(DICT_PATH, 'utf-8'));
const entries = Array.isArray(raw) ? raw : Object.values(raw);

// ── Run checks ────────────────────────────────────────────────────────────────
const errors = [];
const warnings = [];

for (const entry of entries) {
  const { word, meaning, example } = entry;
  if (!word) continue;

  // [E3] Missing required fields
  if (!meaning || meaning.trim() === '') {
    errors.push(`[E3] "${word}": missing 'meaning' field`);
  }
  if (!example || example.trim() === '') {
    errors.push(`[E3] "${word}": missing 'example' field`);
  }

  // [E1] Banned example patterns
  if (example) {
    for (const { re, msg } of BANNED_EXAMPLE_PATTERNS) {
      if (re.test(example)) {
        errors.push(`[E1] "${word}": ${msg}\n       Got: "${example}"`);
        break;
      }
    }
  }

  // [E2] Unaccented Vietnamese in meaning
  if (meaning) {
    for (const pattern of UNACCENTED_VI_PATTERNS) {
      const matched = pattern.custom
        ? pattern.re(meaning)
        : pattern.re.test(meaning);
      if (matched) {
        errors.push(`[E2] "${word}": unaccented Vietnamese in meaning → should be "${pattern.correct}"\n       Got: "${meaning}"`);
        break;
      }
    }
  }

  // [W1] Example too short
  if (example) {
    const wordCount = example.trim().split(/\s+/).length;
    if (wordCount < 5) {
      warnings.push(`[W1] "${word}": example has only ${wordCount} word(s) — aim for 6+\n       Got: "${example}"`);
    }
  }

  // [W2] Example doesn't contain the word (lenient: checks stem)
  if (example && word.length > 3) {
    const stem = word.toLowerCase().replace(/(ing|ed|s|es|er|est|ly)$/, '');
    if (stem.length > 3 && !example.toLowerCase().includes(stem)) {
      warnings.push(`[W2] "${word}": example may not use the word (stem "${stem}" not found)\n       Got: "${example}"`);
    }
  }
}

// ── Bold-chunk coverage checks ───────────────────────────────────────────────
const dictKeys = new Map();
for (const entry of entries) {
  const key = normalizeLookupKey(entry.word || '');
  if (key) dictKeys.set(key, entry);
}

const contentFiles = [
  ...globSync(resolve(__dirname, '../src/data/weeks/week_*/read.js')),
  ...globSync(resolve(__dirname, '../src/data/weeks/week_*/explore.js')),
  ...globSync(resolve(__dirname, '../src/data/weeks_easy/week_*/read.js')),
  ...globSync(resolve(__dirname, '../src/data/weeks_easy/week_*/explore.js')),
];

for (const filePath of contentFiles) {
  const src = readFileSync(filePath, 'utf-8');
  const contentEnMatch = src.match(/content_en:\s*([`'"])([\s\S]*?)\1/);
  if (!contentEnMatch) continue;
  const contentEn = contentEnMatch[2];
  const bolds = [...contentEn.matchAll(/\*\*([^*\n]+?)\*\*/g)];
  for (const match of bolds) {
    const raw = match[1].replace(/\s+/g, ' ').trim();
    if (!raw) continue;
    const normalized = normalizeLookupKey(raw);
    if (!normalized) continue;
    if (normalized.split(/\s+/).length < 2) continue; // single-word bolds handled elsewhere

    const entry = dictKeys.get(normalized);
    if (!entry) {
      errors.push(`[E4] Missing dictionary entry for bold chunk "${raw}"\n       File: ${filePath}`);
      continue;
    }
    if (!entry.meaning || entry.meaning.trim() === '') {
      errors.push(`[E4] Bold chunk "${raw}" has dictionary entry but empty meaning\n       File: ${filePath}`);
    }
  }
}

// ── Report ────────────────────────────────────────────────────────────────────
const RED   = '\x1b[31m';
const YELLOW= '\x1b[33m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

console.log(`\n📖 dict:lint — ${entries.length} entries checked\n`);

if (errors.length > 0) {
  console.log(`${RED}✖ ${errors.length} ERROR(S) found:${RESET}\n`);
  errors.forEach(e => console.log(`  ${RED}${e}${RESET}\n`));
}

if (warnings.length > 0 && !ERRORS_ONLY) {
  console.log(`${YELLOW}⚠  ${warnings.length} WARNING(S):${RESET}\n`);
  warnings.forEach(w => console.log(`  ${YELLOW}${w}${RESET}\n`));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log(`${GREEN}✔ All entries look good!${RESET}\n`);
}

if (errors.length > 0) {
  console.log(`${RED}dict:lint FAILED — fix the errors above before committing.${RESET}\n`);
  console.log(`Tip: run  npm run dict:build  to regenerate entries, or edit dictionary.json manually.\n`);
  process.exit(1);
} else {
  console.log(`${GREEN}dict:lint PASSED${warnings.length > 0 ? (ERRORS_ONLY ? ` (${warnings.length} warnings suppressed — run without --errors-only to see)` : ' (with warnings — please review)') : ''}.${RESET}\n`);
  process.exit(0);
}
