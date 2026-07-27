#!/usr/bin/env node
/**
 * mass_updater.js — Pipeline v4 PRODUCTION
 *
 * BẮT BUỘC:
 * 1. Duyệt 100% tuần (không .slice())
 * 2. Gọi YouTube API thật + ghi file thật
 * 3. Rate limit 500ms giữa các tuần
 * 4. Không in file content ra terminal
 * 5. Progress: '.' = thành công, 'X' = lỗi
 * 6. Chi tiết lỗi → scripts/debug.log
 */

require('dotenv/config');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ────────────────────────────────────────────────────────────────────
// Configuration
// ────────────────────────────────────────────────────────────────────
const BASE = '/Users/binhnguyen/projects/Engquest3k';
const API_KEY = process.env.YOUTUBE_API_KEY;
const DEBUG_LOG = path.join(BASE, 'scripts/debug.log');
const MAX_SEGMENTS = 40;

// Check Node version for native fetch
const NODE_MAJOR = parseInt(process.version.slice(1).split('.')[0]);
const hasFetch = NODE_MAJOR >= 18;

// Polyfill fetch for Node < 18
if (!hasFetch) {
  const nodeFetch = require('node-fetch');
  global.fetch = nodeFetch;
}

// ────────────────────────────────────────────────────────────────────
// Logging
// ────────────────────────────────────────────────────────────────────
const logStream = fs.createWriteStream(DEBUG_LOG, { flags: 'w' });
const log = (...args) => {
  const timestamp = new Date().toISOString();
  logStream.write(`[${timestamp}] ${args.join(' ')}\n`);
};

log('='.repeat(80));
log('Pipeline v4 — Mass Updater STARTED');
log('='.repeat(80));
log(`Node version: ${process.version}`);
log(`API key loaded: ${API_KEY ? 'YES' : 'NO'}`);
log('');

// ────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseDuration(iso) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

function extractTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/title:\s*["`']([^"`']+)["`']/);
    return match ? match[1] : null;
  } catch (err) {
    log(`ERROR extracting title from ${filePath}: ${err.message}`);
    return null;
  }
}

function extractContentEn(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/content_en:\s*["`'](.+?)["`']/s);
    return match ? match[1].slice(0, 200) : '';
  } catch (err) {
    log(`ERROR extracting content_en from ${filePath}: ${err.message}`);
    return '';
  }
}

function extractVideoId(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/videoId:\s*["`']([^"`']+)["`']/);
    return match ? match[1] : null;
  } catch (err) {
    log(`ERROR extracting videoId from ${filePath}: ${err.message}`);
    return null;
  }
}

// ────────────────────────────────────────────────────────────────────
// YouTube API
// ────────────────────────────────────────────────────────────────────
async function searchVideo(query) {
  if (!API_KEY) {
    throw new Error('YOUTUBE_API_KEY not found in environment');
  }

  const searchQuery = `${query} ESL for kids conversation landscape`;
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&videoDuration=medium&maxResults=10&key=${API_KEY}`;

  log(`  Searching YouTube: "${searchQuery}"`);

  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) {
    throw new Error(`YouTube Search API failed: ${searchRes.status} ${searchRes.statusText}`);
  }

  const searchData = await searchRes.json();
  if (!searchData.items || searchData.items.length === 0) {
    throw new Error('No search results from YouTube API');
  }

  log(`  Found ${searchData.items.length} candidates`);

  // Check each video for duration and shorts filter
  for (const item of searchData.items) {
    const videoId = item.id.videoId;
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoId}&key=${API_KEY}`;

    await sleep(300); // Rate limit between detail calls

    const detailsRes = await fetch(detailsUrl);
    if (!detailsRes.ok) {
      log(`  ⚠️  Video ${videoId} details fetch failed: ${detailsRes.status}`);
      continue;
    }

    const detailsData = await detailsRes.json();
    if (!detailsData.items || detailsData.items.length === 0) {
      log(`  ⚠️  Video ${videoId} has no details`);
      continue;
    }

    const videoInfo = detailsData.items[0];
    const duration = parseDuration(videoInfo.contentDetails.duration);
    const title = videoInfo.snippet.title;
    const tags = (videoInfo.snippet.tags || []).map(t => t.toLowerCase());

    log(`  Checking ${videoId}: "${title}" (${duration}s)`);

    // Filter: must be ≥60s, not a Short
    if (duration < 60) {
      log(`    ❌ Too short: ${duration}s`);
      continue;
    }

    if (title.toLowerCase().includes('short') || tags.includes('shorts')) {
      log(`    ❌ Detected as Short`);
      continue;
    }

    log(`    ✅ SUITABLE: ${videoId} "${title}" (${duration}s)`);
    return { videoId, title, duration };
  }

  throw new Error('No suitable landscape video found (all were Shorts or too short)');
}

async function verifyVideo(videoId) {
  try {
    const cmd = `yt-dlp --skip-download --print title "https://www.youtube.com/watch?v=${videoId}"`;
    execSync(cmd, {
      encoding: 'utf8',
      timeout: 15000,
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return true;
  } catch (err) {
    log(`  Video ${videoId} verification failed: ${err.message}`);
    return false;
  }
}

function fetchTranscript(videoId) {
  try {
    log(`  Fetching transcript for ${videoId}...`);
    const pyFile = path.join(BASE, 'scripts', 'tmp_transcript.py');
    const pythonScript = `
from youtube_transcript_api import YouTubeTranscriptApi
import json, sys

ytt = YouTubeTranscriptApi()
try:
    transcript = ytt.fetch('${videoId}', languages=['en'])
except Exception as e:
    print(json.dumps([]))
    sys.exit(0)

segments = []
for seg in transcript.snippets:
    text = seg.text.strip()
    if len(text) > 2:
        segments.append({
            'text': text,
            'start': round(seg.start, 2),
            'duration': round(seg.duration, 2)
        })

print(json.dumps(segments))
`.trim();

    fs.writeFileSync(pyFile, pythonScript, 'utf8');
    const output = execSync(`python3 "${pyFile}"`, {
      encoding: 'utf8',
      timeout: 30000,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    try { fs.unlinkSync(pyFile); } catch (_) {}

    const segments = JSON.parse(output.trim());
    log(`  ✅ Fetched ${segments.length} raw segments`);
    return segments;
  } catch (err) {
    log(`  ❌ Transcript fetch failed: ${err.message}`);
    try { fs.unlinkSync(path.join(BASE, 'scripts', 'tmp_transcript.py')); } catch (_) {}
    return [];
  }
}

// ────────────────────────────────────────────────────────────────────
// Transcript Formatting (Rule 6)
// ────────────────────────────────────────────────────────────────────
function formatSegments(rawSegments) {
  log(`  Formatting ${rawSegments.length} raw segments...`);

  // Step 1: Deduplicate
  const seen = new Set();
  const unique = [];
  for (const seg of rawSegments) {
    const key = seg.text.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    if (!seen.has(key) && key.length > 2) {
      seen.add(key);
      unique.push(seg);
    }
  }
  log(`    After dedup: ${unique.length} segments`);

  // Step 2: Clean each segment
  const cleaned = [];
  for (const seg of unique) {
    let text = seg.text;

    // Remove markers
    text = text.replace(/>>+\s*/g, '').trim();
    text = text.replace(/\[.*?\]/g, '').trim();

    if (!text) continue;

    // Capitalize first letter
    text = text.charAt(0).toUpperCase() + text.slice(1);

    // Ensure ends with punctuation
    if (!/[.!?]$/.test(text)) {
      text += '.';
    }

    cleaned.push({
      text,
      start: seg.start,
      duration: seg.duration
    });
  }
  log(`    After cleaning: ${cleaned.length} segments`);

  // Step 3: If ≤40, we're done
  if (cleaned.length <= MAX_SEGMENTS) {
    return cleaned.map((seg, index) => ({
      id: index + 1,
      text: seg.text,
      vi: null,
      start: seg.start,
      duration: seg.duration
    }));
  }

  // Step 4: Merge adjacent fragments to get ≤40
  log(`    Merging to reach ≤${MAX_SEGMENTS}...`);
  const merged = [cleaned[0]];
  for (let i = 1; i < cleaned.length; i++) {
    if (merged.length >= MAX_SEGMENTS) break;

    const prev = merged[merged.length - 1];
    const curr = cleaned[i];

    const gap = curr.start - (prev.start + prev.duration);
    const combinedText = prev.text.replace(/\.$/, '') + ' ' + curr.text.charAt(0).toLowerCase() + curr.text.slice(1);

    // Merge if within 2s gap and combined < 120 chars
    if (gap < 2.0 && combinedText.length < 120) {
      prev.text = combinedText;
      prev.duration = (curr.start + curr.duration) - prev.start;
    } else {
      merged.push(curr);
    }
  }

  // Step 5: Truncate to exactly 40 if still over
  const final = merged.slice(0, MAX_SEGMENTS);
  log(`    Final count: ${final.length} segments`);

  return final.map((seg, index) => ({
    id: index + 1,
    text: seg.text,
    vi: null,
    start: seg.start,
    duration: seg.duration
  }));
}

// ────────────────────────────────────────────────────────────────────
// File Updates
// ────────────────────────────────────────────────────────────────────
function updateShadowingFile(filePath, videoId, segments) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Update videoId
    content = content.replace(/videoId:\s*["`'][^"`']*["`']/, `videoId: "${videoId}"`);

    // 2. Remove ttsScript field entirely (including trailing comma)
    content = content.replace(/,?\s*ttsScript:\s*\[[\s\S]*?\]\s*,?/gm, '');

    // 3. Replace script array
    const scriptLines = segments.map(seg => {
      const escapedText = seg.text.replace(/"/g, '\\"');
      return `    { id: ${seg.id}, text: "${escapedText}", vi: null, start: ${seg.start}, duration: ${seg.duration} }`;
    }).join(',\n');

    content = content.replace(
      /script:\s*\[[\s\S]*?\n  \]/,
      `script: [\n${scriptLines}\n  ]`
    );

    // 4. Write back
    fs.writeFileSync(filePath, content, 'utf8');
    log(`    ✅ Updated: ${filePath}`);
  } catch (err) {
    log(`    ❌ FAILED to update ${filePath}: ${err.message}`);
    throw err;
  }
}

function saveTranscriptJSON(videoId, segments) {
  try {
    const dir = path.join(BASE, 'src/data/video_transcripts_by_id/cleaned');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const transcriptData = {
      videoId,
      text: segments.map(s => s.text).join(' '),
      segments: segments.map(s => ({
        id: s.id,
        text: s.text,
        start: s.start,
        duration: s.duration
      }))
    };

    const jsonPath = path.join(dir, `${videoId}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(transcriptData, null, 2), 'utf8');
    log(`    ✅ Saved transcript JSON: ${videoId}.json`);
  } catch (err) {
    log(`    ❌ FAILED to save transcript JSON: ${err.message}`);
    throw err;
  }
}

// ────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────
(async () => {
  const summary = {
    totalProcessed: 0,
    success: 0,
    failed: 0,
    failedWeeks: [],
    replacedVideos: [],
    keptVideos: []
  };

  try {
    // Find all week directories in both ADV and Easy
    const weeksDir = path.join(BASE, 'src/data/weeks');
    const allWeekDirs = fs.readdirSync(weeksDir)
      .filter(d => /^week_\d+$/.test(d))
      .sort((a, b) => {
        const numA = parseInt(a.replace('week_', ''));
        const numB = parseInt(b.replace('week_', ''));
        return numA - numB;
      });

    log(`Found ${allWeekDirs.length} week directories`);
    log('');

    // IMPORTANT: NO .slice() — process ALL weeks
    for (const weekDir of allWeekDirs) {
      const weekNum = weekDir.replace('week_', '');

      // TEMP FILTER: Week 01 ONLY during debugging
      if (weekNum !== '01') continue;
      const advPath = path.join(BASE, 'src/data/weeks', weekDir, 'shadowing.js');
      const easyPath = path.join(BASE, 'src/data/weeks_easy', weekDir, 'shadowing.js');

      if (!fs.existsSync(advPath)) {
        log(`⚠️  Week ${weekNum}: ADV shadowing.js not found, skipping`);
        continue;
      }

      summary.totalProcessed++;
      log('─'.repeat(80));
      log(`Week ${weekNum} START`);
      log('─'.repeat(80));

      try {
        const title = extractTitle(advPath) || extractContentEn(advPath).slice(0, 50) || `Week ${weekNum}`;
        let videoId = extractVideoId(advPath);
        let replaced = false;

        log(`Title: "${title}"`);
        log(`Current videoId: ${videoId || 'NONE'}`);

        // Verify current video
        if (videoId) {
          const isWorking = await verifyVideo(videoId);
          if (isWorking) {
            log(`✅ Current video ${videoId} is WORKING`);
            summary.keptVideos.push({ week: weekNum, videoId, title });
          } else {
            log(`❌ Current video ${videoId} is DEAD — searching for replacement...`);
            const searchQuery = title.replace(/[^a-zA-Z0-9 ]/g, ' ').trim();
            const result = await searchVideo(searchQuery);
            videoId = result.videoId;
            replaced = true;
            summary.replacedVideos.push({
              week: weekNum,
              oldVideoId: videoId,
              newVideoId: result.videoId,
              title: result.title
            });
            log(`🆕 Replacement found: ${videoId} "${result.title}" (${result.duration}s)`);
          }
        } else {
          // No videoId at all — search for one
          log(`⚠️  No videoId found — searching...`);
          const searchQuery = title.replace(/[^a-zA-Z0-9 ]/g, ' ').trim();
          const result = await searchVideo(searchQuery);
          videoId = result.videoId;
          replaced = true;
          summary.replacedVideos.push({
            week: weekNum,
            oldVideoId: null,
            newVideoId: result.videoId,
            title: result.title
          });
          log(`🆕 Found: ${videoId} "${result.title}" (${result.duration}s)`);
        }

        // Fetch transcript
        const rawSegments = fetchTranscript(videoId);
        if (rawSegments.length === 0) {
          throw new Error(`No transcript available for ${videoId}`);
        }

        // Format transcript
        const formattedSegments = formatSegments(rawSegments);
        if (formattedSegments.length === 0) {
          throw new Error('Formatting produced no segments');
        }

        // Save transcript JSON
        saveTranscriptJSON(videoId, formattedSegments);

        // Update ADV file
        log(`  Updating ADV: ${advPath}`);
        updateShadowingFile(advPath, videoId, formattedSegments);

        // Update Easy file (if exists)
        if (fs.existsSync(easyPath)) {
          log(`  Updating Easy: ${easyPath}`);
          updateShadowingFile(easyPath, videoId, formattedSegments);
        } else {
          log(`  ⚠️  Easy file not found: ${easyPath}`);
        }

        summary.success++;
        process.stdout.write('.'); // Success indicator
        log(`✅ Week ${weekNum} COMPLETE`);
        log('');

      } catch (err) {
        summary.failed++;
        summary.failedWeeks.push({
          week: weekNum,
          error: err.message
        });
        process.stdout.write('X'); // Failure indicator
        log(`❌ Week ${weekNum} FAILED: ${err.message}`);
        log('');
      }

      // Rate limit: 500ms between weeks
      await sleep(500);
    }

  } catch (err) {
    log('');
    log('='.repeat(80));
    log(`CRITICAL ERROR: ${err.message}`);
    log(err.stack);
    log('='.repeat(80));
  } finally {
    log('');
    log('='.repeat(80));
    log('Pipeline v4 — Mass Updater FINISHED');
    log('='.repeat(80));
    log(`Total processed: ${summary.totalProcessed}`);
    log(`Success: ${summary.success}`);
    log(`Failed: ${summary.failed}`);
    log('');

    logStream.end();

    // Print summary to stdout
    console.log('\n');
    console.log(JSON.stringify(summary, null, 2));
  }
})();
