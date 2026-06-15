#!/usr/bin/env node
/**
 * fetch_video_transcripts.js — Fetch YouTube transcripts for all pre-curated
 * shadowing videos and cache as JSON. Tier 1 of the transcript pipeline.
 *
 * Output: src/data/video_transcripts.json
 * Schema: { [videoId]: { text: string, segments: [{text, start, duration}] } }
 *
 * Usage:
 *   node tools/fetch_video_transcripts.js              # Fetch all
 *   node tools/fetch_video_transcripts.js --only 19    # Fetch only W19
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { YoutubeTranscript } from 'youtube-transcript';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const OUTPUT_PATH = path.join(ROOT, 'src', 'data', 'video_transcripts.json');
const WEEKS_DIR = path.join(ROOT, 'src', 'data', 'weeks');
const WEEKS_EASY_DIR = path.join(ROOT, 'src', 'data', 'weeks_easy');

const args = process.argv.slice(2);
const onlyArg = args.indexOf('--only');
const ONLY_WEEK = onlyArg >= 0 ? parseInt(args[onlyArg + 1]) : null;

function getShadowingFiles(mode) {
  const dir = mode === 'easy' ? WEEKS_EASY_DIR : WEEKS_DIR;
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(d => /^week_\d{2}$/.test(d) && fs.statSync(path.join(dir, d)).isDirectory())
    .map(d => ({ week: parseInt(d.split('_')[1]), path: path.join(dir, d, 'shadowing.js') }));
}

function getVideoIdsFromShadowFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const m = content.match(/videoId:\s*"([^"]+)"/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

async function fetchOne(videoId) {
  try {
    const segments = await YoutubeTranscript.fetchTranscript(videoId);
    if (!segments || segments.length === 0) return null;
    const fullText = segments.map(s => s.text).join(' ').replace(/\s+/g, ' ').trim();
    return {
      text: fullText,
      segments: segments.map(s => ({
        text: s.text,
        start: s.offset / 1000,  // convert ms to seconds
        duration: s.duration / 1000,
      })),
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    return { error: err.message, videoId };
  }
}

async function main() {
  console.log('\n=== Fetching YouTube Transcripts (Tier 1) ===\n');

  // Load existing cache
  let cache = {};
  if (fs.existsSync(OUTPUT_PATH)) {
    try {
      cache = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'));
      console.log(`Loaded existing cache: ${Object.keys(cache).length} videos\n`);
    } catch { /* ignore */ }
  }

  const modes = ['advanced', 'easy'];
  const todo = new Map();  // videoId -> [{week, mode}]

  for (const mode of modes) {
    const files = getShadowingFiles(mode);
    for (const { week, path: filePath } of files) {
      if (ONLY_WEEK && week !== ONLY_WEEK) continue;
      const videoId = getVideoIdsFromShadowFile(filePath);
      if (!videoId) continue;
      if (!todo.has(videoId)) todo.set(videoId, []);
      todo.get(videoId).push({ week, mode, filePath });
    }
  }

  console.log(`Found ${todo.size} unique videos to fetch\n`);

  let fetched = 0, skipped = 0, failed = 0;

  for (const [videoId, sources] of todo) {
    if (cache[videoId] && !cache[videoId].error && !args.includes('--force')) {
      skipped++;
      continue;
    }
    process.stdout.write(`  [${++fetched + skipped}/${todo.size}] ${videoId} (used in W${sources.map(s => s.week).join(',W')} ${sources[0].mode})... `);
    const result = await fetchOne(videoId);
    if (result && !result.error) {
      cache[videoId] = result;
      console.log(`✓ ${result.segments.length} segments`);
    } else {
      cache[videoId] = { error: result?.error || 'unknown', videoId };
      failed++;
      console.log(`✗ ${result?.error || 'no segments'}`);
    }
    // Rate limit: 500ms between requests
    await new Promise(r => setTimeout(r, 500));
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(cache, null, 2), 'utf8');

  console.log(`\n--- Summary ---`);
  console.log(`Fetched: ${fetched}`);
  console.log(`Skipped (cached): ${skipped}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total in cache: ${Object.keys(cache).length}`);
  console.log(`Output: ${OUTPUT_PATH}`);

  if (failed > 0) {
    console.log(`\nFailed videos:`);
    for (const [id, data] of Object.entries(cache)) {
      if (data.error) console.log(`  - ${id}: ${data.error}`);
    }
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
