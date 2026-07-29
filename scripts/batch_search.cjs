#!/usr/bin/env node
/**
 * Batch YouTube search + Phase 1-3 screening for remaining weeks
 * Searches for new dialogue videos for weeks that failed
 */
require('dotenv/config');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.YOUTUBE_API_KEY;
const CACHE_DIR = path.join(__dirname, '..', 'src/data/video_transcripts_by_id/cleaned');
const WEEKS_DIR = path.join(__dirname, '..', 'src/data/weeks');

// Weeks to process (excluding W01, W05, W15 which are already approved)
const WEEKS_TO_PROCESS = [
  "02","03","04","06","07","08","09","10","11","12","13","14",
  "16","17","18","19","20","21","22","23","24","25","26","27",
  "28","29","30","31","32","33","34","35","36"
];

// Phase 1: Monologue check
function phase1Check(text) {
  const lower = text.toLowerCase();
  const secondPerson = (lower.match(/(you are|you have|you like|your name|are you|do you|what's your|how are you)/g) || []).length;
  const questions = (text.match(/\?/g) || []).length;
  let hasRepeatedWords = false;
  const words = lower.split(/\s+/);
  for (let i = 0; i < words.length - 1; i++) {
    if (words[i] === words[i+1] && words[i].length > 2) { hasRepeatedWords = true; break; }
  }
  const hasNarration = (lower.match(/\b(this is my|these are my|she is|he is|i am)\b/g) || []).length;
  const has3rdPersonBias = hasNarration > secondPerson * 3;

  if (hasRepeatedWords) return { score: 0, verdict: 'FAIL', reason: 'chant/drill' };
  if (has3rdPersonBias && secondPerson < 2) return { score: 0, verdict: 'FAIL', reason: 'monologue' };
  if (questions >= 2 && secondPerson >= 2) return { score: 30, verdict: 'PASS', reason: '' };
  if (secondPerson >= 1 && questions >= 1) return { score: 20, verdict: 'PASS', reason: '' };
  return { score: 10, verdict: 'FAIL', reason: 'weak dialogue' };
}

// Phase 3: Quality scoring
function phase3Score(text, dialogueScore) {
  if (dialogueScore < 15) return 0;
  const lower = text.toLowerCase();
  const vocabWords = (lower.match(/\b(book|house|room|school|family|friend|class|teacher|student|please|thank|hello|goodbye|morning|today|like|love|help|play|read|write|eat|drink|go|come|see|look|want|need|have|are|is|pen|pencil|bag|desk|chair|gym|library|garden|kitchen|bathroom|bedroom|sport|music|dance|game|homework|lunch|breakfast|dinner|mother|father|sister|brother|grandma|grandpa|park|shop|hospital|bank|restaurant|happy|sad|angry|tired|sick|excited|hungry|thirsty)\b/g) || []).length;
  const vocabScore = Math.min(25, Math.round(vocabWords * 2));
  const grammarPatterns = (lower.match(/\b(what|where|how|this is|do you|are you|can you|i have|you have|i like|you like|let's|shall we)\b/g) || []).length;
  const grammarScore = Math.min(20, grammarPatterns * 3);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWords = sentences.length > 0 ? sentences.reduce((a, s) => a + s.trim().split(/\s+/).length, 0) / sentences.length : 20;
  const shadowScore = avgWords <= 10 ? 20 : avgWords <= 15 ? 18 : avgWords <= 20 ? 15 : avgWords <= 25 ? 10 : 5;
  const hasRepeatedWords = /\b(\w+)\s+\1\b/.test(lower);
  return dialogueScore + vocabScore + grammarScore + shadowScore + (hasRepeatedWords ? -5 : 0);
}

async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  BATCH SEARCH + PHASE 1-3 SCREENING');
  console.log('  Processing ' + WEEKS_TO_PROCESS.length + ' weeks');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log();

  const results = { passed: [], failed: [], errors: [] };

  for (const week of WEEKS_TO_PROCESS) {
    console.log('Week ' + week + ': Searching...');

    // Build search query from syllabus
    const syllabusPath = path.join(WEEKS_DIR, 'week_' + week, 'grammar.js');
    let topic = 'English conversation dialogue';
    if (fs.existsSync(syllabusPath)) {
      const content = fs.readFileSync(syllabusPath, 'utf8');
      const match = content.match(/title_en:\s*["`]([^"`]+)["`]/);
      if (match) topic = match[1];
    }

    const query = 'ESL kids ' + topic + ' conversation dialogue';

    try {
      // Search YouTube
      const searchUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + encodeURIComponent(query) + '&type=video&videoDuration=medium&videoDefinition=high&relevanceLanguage=en&maxResults=5&key=' + API_KEY;
      await sleep(1000);
      const searchRes = await fetch(searchUrl);
      if (!searchRes.ok) throw new Error('API ' + searchRes.status);
      const searchData = await searchRes.json();

      if (!searchData.items || searchData.items.length === 0) {
        results.errors.push({ week, reason: 'No search results' });
        console.log('  No results');
        continue;
      }

      let bestCandidate = null;

      for (const item of searchData.items.slice(0, 3)) {
        const vid = item.id.videoId;
        const title = item.snippet.title || '';

        // Fetch video details
        await sleep(500);
        const detailsUrl = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=' + vid + '&key=' + API_KEY;
        const detailsRes = await fetch(detailsUrl);
        if (!detailsRes.ok) continue;
        const detailsData = await detailsRes.json();
        if (!detailsData.items || !detailsData.items[0]) continue;

        const videoInfo = detailsData.items[0];
        const duration = parseDuration(videoInfo.contentDetails.duration);
        const channelTitle = videoInfo.snippet.channelTitle || '';

        // Filter: English channels only, 60-300s
        if (duration < 60 || duration > 300) continue;
        if (!/english|esl|learn/i.test(channelTitle)) continue;

        // Fetch transcript
        const transcriptPath = path.join(CACHE_DIR, vid + '.json');
        let text = '';
        if (fs.existsSync(transcriptPath)) {
          const data = JSON.parse(fs.readFileSync(transcriptPath, 'utf8'));
          text = data.text || '';
        } else {
          // Try to fetch transcript via youtube_transcript_api
          console.log('    Fetching transcript for ' + vid + '...');
          const transcript = await fetchTranscript(vid);
          text = transcript;
        }

        if (!text || text.length < 100) continue;

        // Phase 1 + 3
        const p1 = phase1Check(text);
        const p3 = phase3Score(text, p1.score);

        if (p1.verdict === 'PASS' && p3 >= 80) {
          if (!bestCandidate || p3 > bestCandidate.p3) {
            bestCandidate = { vid, title, duration, channelTitle, p1: p1.score, p3, text };
          }
        }
      }

      if (bestCandidate) {
        results.passed.push({ week, ...bestCandidate });
        console.log('  PASS: ' + bestCandidate.vid + ' P3=' + bestCandidate.p3);
      } else {
        results.errors.push({ week, reason: 'No qualified candidates found' });
        console.log('  FAILED: No qualified candidates');
      }

    } catch (err) {
      results.errors.push({ week, reason: err.message });
      console.log('  ERROR: ' + err.message);
    }

    await sleep(2000); // Rate limit
  }

  // Output summary
  console.log();
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  BATCH SEARCH RESULTS');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('PASSED: ' + results.passed.length);
  console.log('ERRORS: ' + results.errors.length);
  console.log();
  results.passed.forEach(r => console.log('W' + r.week + ' | ' + r.vid + ' | P3=' + r.p3));
  results.errors.forEach(r => console.log('W' + r.week + ' | ' + r.reason));
}

// Helper: fetch transcript
async function fetchTranscript(videoId) {
  const pyFile = path.join(__dirname, 'tmp_transcript.py');
  const pyScript = `from youtube_transcript_api import YouTubeTranscriptApi
import json, sys
ytt = YouTubeTranscriptApi()
try:
    transcript = ytt.fetch('${videoId}', languages=['en'])
    segments = [{'text': s.text.strip(), 'start': round(s.start, 2), 'duration': round(s.duration, 2)} for s in transcript.snippets if len(s.text.strip()) > 2]
    print(json.dumps(segments))
except Exception as e:
    print(json.dumps([]))
`;
  fs.writeFileSync(pyFile, pyScript, 'utf8');
  try {
    const output = execSync('python3 "' + pyFile + '"', { encoding: 'utf8', timeout: 30000 });
    const segments = JSON.parse(output.trim());
    return segments.map(s => s.text).join(' ');
  } catch (e) {
    return '';
  }
}

function parseDuration(iso) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  return (parseInt(match[1] || 0)) * 3600 + (parseInt(match[2] || 0)) * 60 + parseInt(match[3] || 0);
}

const { execSync } = require('child_process');
main().catch(console.error);
