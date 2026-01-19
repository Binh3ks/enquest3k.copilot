#!/usr/bin/env node
/**
 * validate_ask_ai.js
 * Validates ask_ai.js files for a given week (advanced + easy)
 * - Ensures 5 prompts
 * - context_en does NOT contain a direct question and contains an ask indicator
 * - context_en word count <= 10 (Advanced) and <= 10 (Easy)
 * - answer first element matches A0 patterns
 * - audio_url present and matches expected path
 */

const fs = require('fs');
const path = require('path');

const WEEK = process.argv[2];
if (!WEEK) {
  console.error('Usage: node tools/validate_ask_ai.js <week_number>');
  process.exit(2);
}

function loadFile(p) {
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, 'utf8');
}

function parsePrompts(content) {
  // crude parser: find occurrences of { ... } blocks inside the prompts array
  const blocks = content.match(/\{[\s\S]*?\}/g) || [];
  // filter only objects that contain id and context_en
  return blocks.filter(b => /id\s*:/.test(b) && /context_en\s*:/.test(b));
}

function getField(block, field) {
  const m = block.match(new RegExp(field + '\\s*:\\s*([`\"\'])([\\s\\S]*?)\\1'));
  return m ? m[2].trim() : null;
}

function getAnswerArray(block) {
  const m = block.match(/answer\s*:\s*\[([\s\S]*?)\]/);
  if (!m) return [];
  const items = m[1].match(/['\"]([\s\S]*?)['\"]/g) || [];
  return items.map(s => s.replace(/^['\"]|['\"]$/g,'').trim());
}

function validateMode(modePath, audioBase) {
  const errors = [];
  const content = loadFile(modePath);
  if (!content) {
    errors.push(`Missing file: ${modePath}`);
    return errors;
  }

  const prompts = parsePrompts(content);
  if (prompts.length !== 5) errors.push(`${path.basename(modePath)} must have exactly 5 prompts (found ${prompts.length})`);

  prompts.forEach((blk, idx) => {
    const ctx = getField(blk, 'context_en');
    const audio = getField(blk, 'audio_url');
    const answers = getAnswerArray(blk);

    if (!ctx) errors.push(`prompt ${idx+1}: missing context_en`);
    else {
      const wordCount = ctx.split(/\s+/).filter(Boolean).length;
      if (wordCount > 10) errors.push(`prompt ${idx+1}: context_en too long (${wordCount} words) - max 10`);
      // must contain ask indicator
      if (!/\b(ask|want|want to know)\b/i.test(ctx)) errors.push(`prompt ${idx+1}: context_en must include 'ask' or 'want' or 'want to know'`);
      // must NOT contain direct question patterns
      if (/\b(What is|Where is|Is this|Can I|Do you)\b/i.test(ctx)) errors.push(`prompt ${idx+1}: context_en must NOT contain direct question patterns`);
    }

    if (!audio) errors.push(`prompt ${idx+1}: missing or empty audio_url`);
    else {
      // audioBase will be like /audio/week2 or /audio/week2_easy
      if (!audio.startsWith(audioBase)) errors.push(`prompt ${idx+1}: audio_url should start with ${audioBase}`);
    }

    if (!answers || answers.length === 0) errors.push(`prompt ${idx+1}: missing answer array`);
    else {
      const a0 = [/^What is/i, /^Where is/i, /^Is this/i, /^Can I/i, /^Do you/i];
      if (!a0.some(rx => rx.test(answers[0]))) errors.push(`prompt ${idx+1}: answer[0] is not A0 pattern: ${answers[0]}`);
    }
  });

  return errors;
}

const weekNum = parseInt(WEEK, 10);
const weekId = `week_${String(weekNum).padStart(2,'0')}`;
const advFile = path.join('src','data','weeks',weekId,'ask_ai.js');
const easyFile = path.join('src','data','weeks_easy',weekId,'ask_ai.js');

let allErrors = [];
allErrors = allErrors.concat(validateMode(advFile, `/audio/week${weekNum}`));
allErrors = allErrors.concat(validateMode(easyFile, `/audio/week${weekNum}_easy`));

if (allErrors.length) {
  console.error('Ask-AI validation failed:');
  allErrors.forEach(e => console.error(' -', e));
  process.exit(1);
}

console.log('✅ ask_ai.js validation passed for week', WEEK);
process.exit(0);
