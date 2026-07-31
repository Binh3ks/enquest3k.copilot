#!/usr/bin/env node
/**
 * sync_timestamps.cjs — Re-align sentence timestamps using Deepgram Nova-2
 *
 * Flow:
 *   1. Read sentences/<videoId>.json → existing sentences
 *   2. Download EXACT synced audio (bestaudio m4a, no padding)
 *   3. Send audio → Deepgram Nova-2 → word-level timestamps
 *   4. Map sentences text → Deepgram words via Levenshtein sliding window
 *   5. Write updated timestamps back to sentences/<videoId>.json
 *
 * Usage:
 *   node scripts/sync_timestamps.cjs 07
 *   DEEPGRAM_API_KEY=xxx node scripts/sync_timestamps.cjs 07
 */

require('dotenv/config');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE = '/Users/binhnguyen/projects/Engquest3k';
const TMP_DIR = path.join(BASE, 'tmp');
const DEEPGRAM_MODEL = 'nova-2';
const DEEPGRAM_PARAMS = {
  model: DEEPGRAM_MODEL,
  timestamps: 'true',
  diarize: 'true',
  smart_format: 'true',
  utterances: 'true',
  language: 'en',
};

function log(msg) { console.log(`[align] ${msg}`); }

// Step 1: Download audio (bestaudio m4a — no conversion, keeps sync)
function downloadAudio(videoId) {
  const outPath = path.join(TMP_DIR, `${videoId}.m4a`);
  if (fs.existsSync(outPath)) { log(`Audio exists: ${outPath}`); return outPath; }
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });
  log(`Downloading audio for ${videoId} (bestaudio m4a)...`);
  try {
    execSync(
      `yt-dlp --js-runtimes node -f "bestaudio[ext=m4a]" -o "${outPath}" "https://www.youtube.com/watch?v=${videoId}"`,
      { encoding: 'utf8', timeout: 120000, stdio: 'pipe' }
    );
    log(`Downloaded: ${outPath}`);
    return outPath;
  } catch (e) { throw new Error(`yt-dlp failed: ${e.message.slice(0, 300)}`); }
}

// Step 2: Transcribe with Deepgram Nova-2
async function transcribeWithDeepgram(audioPath) {
  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) throw new Error('DEEPGRAM_API_KEY not found');
  const audioBytes = fs.readFileSync(audioPath);
  log(`Sending ${audioBytes.length} bytes to Deepgram Nova-2...`);
  const query = Object.entries(DEEPGRAM_PARAMS).map(([k, v]) => `${k}=${v}`).join('&');
  const res = await fetch(`https://api.deepgram.com/v1/listen?${query}`, {
    method: 'POST',
    headers: { 'Authorization': `Token ${apiKey}`, 'Content-Type': 'audio/mpeg' },
    body: audioBytes,
  });
  if (!res.ok) throw new Error(`Deepgram ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return await res.json();
}

// Step 3: Levenshtein + sliding window alignment
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n; if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) {
      const cost = a[i-1] === b[j-1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost);
    }
  return dp[m][n];
}

function findBestSpan(sentence, dgWords, searchStart) {
  const sentNorm = normalize(sentence);
  const sentLen = sentNorm.split(' ').length;
  let best = { score: Infinity, startIdx: searchStart, endIdx: Math.min(searchStart + sentLen + 5, dgWords.length) };
  for (let ws = searchStart; ws < Math.min(searchStart + 40, dgWords.length); ws++) {
    for (let we = ws + Math.max(sentLen - 3, 2); we < Math.min(ws + sentLen + 12, dgWords.length); we++) {
      const span = dgWords.slice(ws, we).map(w => w.word).join(' ');
      const score = levenshtein(sentNorm, normalize(span)) + Math.abs(we - ws - sentLen) * 0.5;
      if (score < best.score) best = { score, startIdx: ws, endIdx: we };
    }
  }
  if (best.startIdx >= dgWords.length) return null;
  // Ensure endIdx is within bounds
  best.endIdx = Math.min(best.endIdx, dgWords.length - 1);
  return best;
}

// Step 4: Main
async function main() {
  const weekNum = process.argv[2];
  if (!weekNum) { console.error('Usage: node scripts/sync_timestamps.cjs <weekNum>'); process.exit(1); }
  const padded = weekNum.padStart(2, '0');
  const shadowingContent = fs.readFileSync(`src/data/weeks/week_${padded}/shadowing.js`, 'utf8');
  const videoId = (shadowingContent.match(/videoId:\s*["'`]([^"'`]+)["'`]/) || [])[1];
  if (!videoId) { log('ERROR: No videoId'); process.exit(1); }
  log(`Week ${padded} — Video: ${videoId}`);

  const sentencesPath = `src/data/video_transcripts_by_id/sentences/${videoId}.json`;
  if (!fs.existsSync(sentencesPath)) { log(`ERROR: No ${sentencesPath}`); process.exit(1); }
  const existing = JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
  const sentences = (existing.segments || []).map((s, i) => ({
    id: s.id || (i + 1),
    text: (s.text || '').trim(),
  })).filter(s => s.text.length > 0);
  log(`Found ${sentences.length} sentences`);

  // Download + transcribe
  const audioPath = downloadAudio(videoId);
  const dg = await transcribeWithDeepgram(audioPath);
  const dgWords = dg.results?.channels?.[0]?.alternatives?.[0]?.words || [];
  log(`Deepgram: ${dgWords.length} words`);
  if (dgWords.length === 0) { log('No words from Deepgram'); process.exit(1); }

  // Align: map each sentence text to Deepgram word indexes via Levenshtein
  let dgIdx = 0;
  const aligned = [];
  for (const sent of sentences) {
    const span = findBestSpan(sent.text, dgWords, dgIdx);
    if (span) {
      const start = Math.round(dgWords[span.startIdx].start * 100) / 100;
      const end = Math.round(dgWords[span.endIdx].end * 100) / 100;
      const duration = Math.round((end - start) * 100) / 100;
      aligned.push({ id: sent.id, text: sent.text, start, duration });
      dgIdx = span.endIdx; // advance past matched words
      log(`  [${sent.id}] "${sent.text.slice(0, 50)}..." -> ${start}s (${span.endIdx - span.startIdx}w)`);
    } else {
      // Fallback: keep existing timestamps
      const orig = existing.segments?.find(s => s.id === sent.id);
      aligned.push({ id: sent.id, text: sent.text, start: orig?.start || 0, duration: orig?.duration || 0 });
      log(`  [${sent.id}] "${sent.text.slice(0, 50)}..." -> kept original`);
    }
  }

  // Write back
  existing.segments = aligned;
  existing.alignment = {
    engine: `deepgram-${DEEPGRAM_MODEL}`,
    alignedAt: new Date().toISOString(),
    dgWordCount: dgWords.length,
    matchedSegments: aligned.filter(a => a.start > 0).length,
    totalDuration: Math.round(dgWords[dgWords.length - 1].end * 100) / 100,
  };
  fs.writeFileSync(sentencesPath, JSON.stringify(existing, null, 2) + '\n');
  log(`Updated ${sentencesPath} with ${aligned.length} aligned segments`);
}

main().catch(err => { log(`FATAL: ${err.message}`); process.exit(1); });
