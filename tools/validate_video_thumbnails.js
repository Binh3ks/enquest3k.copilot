#!/usr/bin/env node
/**
 * Validate daily watch video thumbnails are accessible (200 OK).
 *
 * Usage: node tools/validate_video_thumbnails.js 34
 *
 * Checks:
 * 1. All videoIds return 200 for YouTube thumbnail
 * 2. Required fields present: videoId, title, thumb
 * 3. videoId format (11 chars, alphanumeric + dash/underscore)
 *
 * Exit code: 0 = pass, 1 = fail, 2 = no file found
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const WEEK = parseInt(process.argv[2]);
if (!WEEK) {
  console.error(`Usage: node tools/validate_video_thumbnails.js <WEEK_NUMBER>`);
  process.exit(1);
}

const PAD = String(WEEK).padStart(2, '0');

async function loadWeek(mode) {
  const suffix = mode === 'easy' ? '_easy' : '';
  const f = path.join(ROOT, `src/data/weeks${suffix}/week_${PAD}/daily_watch.js`);
  if (!fs.existsSync(f)) return null;
  try {
    const mod = await import(`file://${f}`);
    const data = mod.default || mod;
    return { mode, data };
  } catch(e) {
    return null;
  }
}

function checkThumbnail(videoId) {
  return new Promise(resolve => {
    const url = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    https.get(url, { timeout: 5000 }, res => {
      resolve({ status: res.statusCode, url });
    }).on('error', e => resolve({ status: 0, url, error: e.message }));
  });
}

function validateVideoId(id) {
  return /^[A-Za-z0-9_-]{11}$/.test(id);
}

async function main() {
  let errors = 0;
  let total = 0;
  const allResults = [];

  const results = await Promise.all([loadWeek('adv'), loadWeek('easy')]);

  for (const result of results) {
    if (!result) continue;
    const { mode, data } = result;
    const videos = Array.isArray(data.videos) ? data.videos : [];

    for (const v of videos) {
      total++;

      // Check required fields
      const missing = [];
      if (!v.videoId) missing.push('videoId');
      if (!v.title) missing.push('title');
      if (!v.thumb) missing.push('thumb');
      if (missing.length > 0) {
        console.error(`❌ [${mode.toUpperCase()}] Video ${v.id}: MISSING FIELDS: ${missing.join(', ')}`);
        errors++;
        continue;
      }

      // Check videoId format
      if (!validateVideoId(v.videoId)) {
        console.error(`❌ [${mode.toUpperCase()}] Video ${v.id}: BAD videoId "${v.videoId}" (must be 11 chars)`);
        errors++;
        continue;
      }

      // Check thumbnail accessible
      const { status } = await checkThumbnail(v.videoId);
      if (status === 200) {
        console.log(`✅ [${mode.toUpperCase()}] "${v.title.substring(0, 40)}..." → ${v.videoId} (${status})`);
      } else {
        console.error(`❌ [${mode.toUpperCase()}] "${v.title.substring(0, 40)}..." → ${v.videoId} (${status})`);
        errors++;
      }
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Video Thumbnail Validation — Week ${PAD}`);
  console.log(`${'─'.repeat(50)}`);
  console.log(`Total: ${total} | Errors: ${errors}`);

  if (errors > 0) {
    console.error(`\n❌ FAILED — ${errors} video(s) have issues`);
    process.exit(1);
  } else if (total === 0) {
    console.warn(`⚠️  No videos found`);
    process.exit(2);
  } else {
    console.log(`\n✅ PASS — All ${total} video thumbnails accessible`);
    process.exit(0);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
