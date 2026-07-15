#!/usr/bin/env node
/**
 * tools/validate_sgmath_types.mjs
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Runtime validation for singapore_math.js — catches invalid type names
 * BEFORE they cause silent failures in the renderer.
 *
 * SILENT FAILURE SCENARIO:
 *   If singapore_math.js uses type: "addition" or "subtraction" (invalid names),
 *   the SingaporeMathDisplay renderer silently falls back to "part_whole" — no
 *   error, no warning. Students see wrong bar models. Agent never finds out.
 *
 * VALID TYPES (from Blueprint §6.4):
 *   part_whole | comparison | missing_part | groups | before_after
 *
 * INVALID TYPES (silently fail → wrong rendering):
 *   addition | subtraction | multiplication | division
 *   ADD | SUB | MUL | DIV | plus | minus | times | divided
 *   any other string not in the valid list
 *
 * ALSO VALIDATES:
 *   - answer[] must be string array ["5","five"], NOT object array [{label:"5"}]
 *   - bar_model must be string path, NOT object
 *   - hint_en, hint_vi required (not "hints: [...]")
 *   - All 5 items present (W16+)
 *   - All type names valid (NOT addition/subtraction/etc.)
 *   - Exactly 5 items per mode
 *
 * USAGE:
 *   node production_kit/tools/validate_sgmath_types.mjs 33       # validate week 33
 *   node production_kit/tools/validate_sgmath_types.mjs 33 easy  # easy mode only
 *   node production_kit/tools/validate_sgmath_types.mjs 33 adv   # advanced only
 *   node production_kit/tools/validate_sgmath_types.mjs --all    # all deployed weeks
 *
 * EXIT CODE: 0 = all PASS, 1 = any FAIL
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const VALID_TYPES = new Set([
  'part_whole',
  'comparison',
  'missing_part',
  'groups',
  'before_after'
]);

const INVALID_TYPES = new Set([
  'addition', 'subtraction', 'multiplication', 'division',
  'ADD', 'SUB', 'MUL', 'DIV',
  'plus', 'minus', 'times', 'divided',
  'add', 'sub', 'mult', 'div',
  'sum', 'difference', 'product', 'quotient'
]);

const __dirname = dirname(fileURLToPath(import.meta.url));
// Auto-detect workspace root: works from tools/ or production_kit/tools/
let BASE = resolve(__dirname, '..');
if (!existsSync(join(BASE, 'src', 'data', 'weeks'))) {
  BASE = resolve(__dirname, '..', '..');
}

const FMT = {
  PASS: '\x1b[32m',
  FAIL: '\x1b[31m',
  WARN: '\x1b[33m',
  INFO: '\x1b[36m',
  BOLD: '\x1b[1m',
  NC: '\x1b[0m',
};

function validateFile(filePath, label) {
  const errors = [];
  const warnings = [];
  const typeCounts = {};

  if (!existsSync(filePath)) {
    return { errors: [`File not found: ${filePath}`], warnings, typeCounts, totalItems: 0 };
  }

  const src = readFileSync(filePath, 'utf8');

  // Extract each question block: { id: N, type: "...", ... }
  // Match the full object for each question item
  const questionBlocks = [];
  let searchFrom = 0;
  while (true) {
    // Find "id:" followed by a number
    const idMatch = src.indexOf('id:', searchFrom);
    if (idMatch === -1) break;

    // Find the nearest preceding { — this is the current question's opening brace
    let openBrace = -1;
    for (let i = idMatch - 1; i >= 0; i--) {
      if (src[i] === '{') { openBrace = i; break; }
    }
    if (openBrace === -1) break;

    // Find the matching closing } — count nesting level
    let depth = 0;
    let closeBrace = -1;
    for (let i = openBrace; i < src.length; i++) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}') {
        depth--;
        if (depth === 0) { closeBrace = i; break; }
      }
    }

    if (closeBrace === -1) break;

    const blockText = src.slice(openBrace, closeBrace + 1);
    questionBlocks.push({ id: questionBlocks.length + 1, block: blockText });
    searchFrom = closeBrace + 1;
  }

  if (questionBlocks.length === 0) {
    errors.push(`${label}: no question blocks found`);
    return { errors, warnings, typeCounts, totalItems: 0 };
  }

  for (const q of questionBlocks) {
    const block = q.block;
    const idx = q.id;
    const prefix = `${label}[${idx}]`;

    // Extract type
    const typeMatch = block.match(/\btype:\s*["']([^"']+)["']/);
    const t = typeMatch ? typeMatch[1] : null;

    if (!t) {
      errors.push(`${prefix}: missing type field`);
    } else {
      typeCounts[t] = (typeCounts[t] || 0) + 1;
      if (!VALID_TYPES.has(t)) {
        if (INVALID_TYPES.has(t)) {
          errors.push(
            `${prefix}: INVALID type "${t}" — silently renders as "part_whole". ` +
            `Valid: ${[...VALID_TYPES].join(' | ')}`
          );
        } else {
          errors.push(`${prefix}: unknown type "${t}" — valid: ${[...VALID_TYPES].join(' | ')}`);
        }
      }
    }

    // Extract required fields
    if (!block.match(/\bquestion_en:/)) errors.push(`${prefix}: missing question_en`);
    if (!block.match(/\bbar_model:/)) errors.push(`${prefix}: missing bar_model`);

    const hasAnswer = block.match(/\banswer:\s*\[([^\]]*)\]/);
    if (!block.match(/\banswer:/)) {
      errors.push(`${prefix}: missing answer`);
    } else if (hasAnswer) {
      const answerContent = hasAnswer[1].trim();
      // Check for object format (wrong)
      if (answerContent.includes('{')) {
        errors.push(`${prefix}: answer is object array — must be string array ["5","five"]`);
      } else if (!answerContent) {
        errors.push(`${prefix}: answer array is empty`);
      }
    }

    if (!block.match(/\bhint_en:/)) errors.push(`${prefix}: missing hint_en`);
    if (!block.match(/\bhint_vi:/)) errors.push(`${prefix}: missing hint_vi`);

    // Check bar_model is string (not object)
    const barMatch = block.match(/\bbar_model:\s*(["'])(.+?)\1/);
    if (barMatch && barMatch[2].startsWith('{')) {
      errors.push(`${prefix}: bar_model is an object — must be string path "/images/..."`);
    }

    // Check for wrong field "hints:" instead of "hint_en:"
    if (block.match(/\bhints:\s*\[/)) {
      errors.push(`${prefix}: uses "hints: [...]" array — must be "hint_en: ..." string`);
    }
  }

  if (questionBlocks.length !== 5) {
    warnings.push(`${label}: ${questionBlocks.length} items (W16+ standard = 5)`);
  }

  // Check type diversity
  const uniqueTypes = Object.keys(typeCounts);
  if (uniqueTypes.length === 1 && questionBlocks.length >= 5) {
    warnings.push(`${label}: all 5 items use same type "${uniqueTypes[0]}" — consider mixing types`);
  }

  return { errors, warnings, typeCounts, totalItems: questionBlocks.length };
}

function run(args) {
  const mode = args.includes('easy') ? 'easy' : args.includes('adv') ? 'adv' : 'both';
  const all = args.includes('--all');
  const weekArg = args.find(a => !a.startsWith('--') && !['easy','adv'].includes(a));
  const weeks = [];

  if (all) {
    try {
      const entries = readdirSync(join(BASE, 'src/data/weeks'), { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && entry.name.match(/^week_\d+$/)) {
          const n = parseInt(entry.name.replace('week_', ''), 10);
          if (!isNaN(n) && n >= 16) weeks.push(n);
        }
      }
    } catch { /* ignore */ }
  } else if (weekArg) {
    weeks.push(parseInt(weekArg, 10));
  }

  if (weeks.length === 0) {
    console.log(`${FMT.WARN}Usage:${FMT.NC}`);
    console.log(`  node tools/validate_sgmath_types.mjs 33       # validate week 33`);
    console.log(`  node tools/validate_sgmath_types.mjs 33 easy  # easy only`);
    console.log(`  node tools/validate_sgmath_types.mjs 33 adv   # advanced only`);
    console.log(`  node tools/validate_sgmath_types.mjs --all    # all deployed weeks`);
    process.exit(1);
  }

  let grandTotal = 0, grandErrors = 0;
  const allResults = [];

  for (const week of weeks) {
    const weekPad = String(week).padStart(2, '0');
    const advPath = join(BASE, `src/data/weeks/week_${weekPad}/singapore_math.js`);
    const easyPath = join(BASE, `src/data/weeks_easy/week_${weekPad}/singapore_math.js`);

    if (mode === 'both' || mode === 'adv') {
      if (existsSync(advPath)) {
        allResults.push({ week: weekPad, mode: 'ADV', ...validateFile(advPath, `ADV/W${weekPad}`) });
      }
    }
    if (mode === 'both' || mode === 'easy') {
      if (existsSync(easyPath)) {
        allResults.push({ week: weekPad, mode: 'EAS', ...validateFile(easyPath, `EAS/W${weekPad}`) });
      }
    }
  }

  let allPassed = true;
  for (const r of allResults) {
    grandTotal++;
    const prefix = `${FMT.BOLD}[${r.mode} W${r.week}]${FMT.NC}`;

    if (r.errors.length > 0) {
      allPassed = false;
      grandErrors += r.errors.length;
      console.log(`${prefix} ${FMT.FAIL}FAIL${FMT.NC}`);
      for (const e of r.errors) console.log(`     ${FMT.FAIL}✗${FMT.NC}  ${e}`);
    } else {
      console.log(`${prefix} ${FMT.PASS}PASS${FMT.NC} (${r.totalItems} items)`);
    }

    for (const w of r.warnings) console.log(`     ${FMT.WARN}⚠${FMT.NC}  ${w}`);

    const types = Object.entries(r.typeCounts).map(([t, c]) => `${t}: ${c}`).join(', ');
    if (types) console.log(`     ${FMT.INFO}Types:${FMT.NC} ${types}`);
  }

  console.log('');
  if (allPassed) {
    console.log(`${FMT.PASS}✅ ALL ${grandTotal} FILE(S) PASSED${FMT.NC}`);
    process.exit(0);
  } else {
    console.log(`${FMT.FAIL}❌ ${grandErrors} ERROR(S) in ${grandTotal} file(s) — FIX before proceeding${FMT.NC}`);
    process.exit(1);
  }
}

run(process.argv.slice(2));
