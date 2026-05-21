#!/usr/bin/env node
/**
 * tools/fix_vocab_examples.mjs
 *
 * Converts W01-W21 vocab.js:
 *   1. Adds `audio_example: "/audio/weekN/vocab_ex_{slug}.mp3"` after each `audio_word` line
 *   2. Converts `collocation: "a / b"` → `collocation: ["a", "b"]`
 *
 * Safe line-by-line regex approach — preserves file structure exactly.
 *
 * Usage: node tools/fix_vocab_examples.mjs [--dry-run] [--weeks=01,02]
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE = join(__dirname, '..');

function slugify(word) {
  return word.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
}

function processFile(filePath, dryRun = false) {
  const lines = readFileSync(filePath, 'utf8').split('\n');
  const weekMatch = filePath.match(/week_(\d+)/);
  const weekNum = weekMatch ? weekMatch[1] : '00';

  // Track word value for the current word block
  let currentWord = null;
  let indent = '';
  const newLines = [];
  let changed = false;

  for (const raw of lines) {
    const line = raw;

    // Track `word: "..."` to know the current word name
    const wordMatch = line.match(/^(\s*)word:\s*"([^"]+)"/);
    if (wordMatch) {
      currentWord = wordMatch[2];
      indent = wordMatch[1];
    }

    // Skip `audio_example` lines (already added)
    if (/^\s*audio_example:\s*"/.test(line)) {
      newLines.push(line);
      continue;
    }

    // Process `audio_word: "..."` line — add comma + audio_example after
    const audioMatch = line.match(/^(\s*)audio_word:\s*"([^"]+)"/);
    if (audioMatch) {
      // Add comma to audio_word if missing
      const hasComma = line.trimEnd().endsWith(',');
      const audioLine = hasComma ? line : line + ',';
      newLines.push(audioLine);
      // Check if audio_example already exists in next few lines
      const peekAhead = lines.slice(lines.indexOf(line) + 1, lines.indexOf(line) + 4).join('');
      if (!peekAhead.includes('audio_example:')) {
        const slug = slugify(currentWord || 'word');
        newLines.push(`${audioMatch[1]}audio_example: "/audio/week${weekNum}/vocab_ex_${slug}.mp3"`);
        changed = true;
      }
      continue;
    }

    // Process `collocation: "a / b"` → array
    const colloMatch = line.match(/^(\s*)collocation:\s*"([^"]+)"/);
    if (colloMatch) {
      const parts = colloMatch[2].split('/').map(s => s.trim()).filter(Boolean);
      const quoted = parts.map(p => `"${p}"`).join(', ');
      newLines.push(`${colloMatch[1]}collocation: [${quoted}],`);
      changed = true;
      continue;
    }

    // Already an array — keep as-is
    const colloArrayMatch = line.match(/^(\s*)collocation:\s*\[/);
    if (colloArrayMatch) {
      newLines.push(line);
      continue;
    }

    newLines.push(line);
  }

  if (!dryRun && changed) {
    writeFileSync(filePath, newLines.join('\n'));
  }

  return { changed, words: lines.filter(l => /^\s*word:\s*"/.test(l)).length };
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const weekFilter = args.find(a => a.startsWith('--weeks='))?.split('=')[1]?.split(',') || null;

console.log(`\n${dryRun ? '[DRY RUN] ' : ''}Processing vocab.js files (W01-W21)...\n`);

let total = 0;
for (let week = 1; week <= 21; week++) {
  const pad = String(week).padStart(2, '0');
  if (weekFilter && !weekFilter.includes(pad)) continue;

  for (const mode of ['weeks', 'weeks_easy']) {
    const fp = join(WORKSPACE, `src/data/${mode}/week_${pad}/vocab.js`);
    if (!existsSync(fp)) continue;

    const result = processFile(fp, dryRun);
    if (result.changed) {
      total++;
      console.log(`  ${dryRun ? 'WOULD' : 'UPDATED'}: ${fp.replace(WORKSPACE + '/', '')}`);
    }
  }
}

console.log(`\n${dryRun ? '[DRY RUN] Would update' : 'Updated'} ${total} files\n`);
