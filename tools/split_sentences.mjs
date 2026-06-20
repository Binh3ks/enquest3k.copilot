#!/usr/bin/env node
/**
 * split_sentences.mjs — Generate video_transcripts_sentences.json
 *
 * Reads from video_transcripts_cleaned.json (already has ASR fixes + punctuation).
 * Outputs video_transcripts_sentences.json with the same structure.
 *
 * The cleaned JSON segments already have proper periods added by clean_transcripts.mjs.
 * YouTube ASR segments are inherently noisy — without NLP/LLM, these are the best output.
 * Phase 3 will add deepsegment or LLM-based cleansing for better sentence splitting.
 *
 * Usage: node tools/split_sentences.mjs [--dry-run] [--debug VIDEO_ID]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const INPUT = path.join(ROOT, 'src/data/video_transcripts_cleaned.json');
const OUTPUT = path.join(ROOT, 'src/data/video_transcripts_sentences.json');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const debugIdx = args.indexOf('--debug');
const debugVideo = debugIdx >= 0 ? args[debugIdx + 1] : null;

const data = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
const result = {};
let totalSegs = 0, totalVideos = 0;

for (const [videoId, entry] of Object.entries(data)) {
  if (entry.error) {
    result[videoId] = { error: entry.error, videoId };
    continue;
  }
  totalVideos++;

  // Use cleaned segments directly — already have periods and ASR fixes
  const sentences = (entry.segments || [])
    .filter(s => s.text && s.text.trim().length > 0)
    .map((s, i) => ({
      id: i + 1,
      text: s.text.trim(),
      start: s.start,
      duration: s.duration,
    }));

  totalSegs += sentences.length;

  result[videoId] = {
    text: sentences.map(s => s.text).join(' '),
    segments: sentences,
    fetchedAt: entry.fetchedAt || new Date().toISOString(),
  };

  if (debugVideo === videoId) {
    console.log(`\n${videoId}: ${sentences.length} sentences`);
    sentences.forEach((s, i) => {
      const wc = s.text.replace(/[.!?]+$/, '').split(/\s+/).length;
      console.log(`  ${(i + 1).toString().padStart(2)}. [${wc.toString().padStart(2)}w] ${s.text}  [${s.start.toFixed(1)}s-${(s.start + s.duration).toFixed(1)}s]`);
    });
  }
}

if (!dryRun) {
  fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2), 'utf8');
  console.log(`Output: ${OUTPUT}`);
}

console.log(`Total: ${totalVideos} videos, ${totalSegs} sentences`);
