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

// LLM-driven pipeline modules
const { callLLM } = require('./llmClient.cjs');
const { analyzeSyllabus } = require('./syllabusAnalyzer.cjs');
const { evaluateTranscript } = require('./transcriptEvaluator.cjs');

// ────────────────────────────────────────────────────────────────────
// Configuration
// ────────────────────────────────────────────────────────────────────
const BASE = '/Users/binhnguyen/projects/Engquest3k';
const API_KEY = process.env.YOUTUBE_API_KEY;
const DEBUG_LOG = path.join(BASE, 'scripts/debug.log');
const MAX_SEGMENTS = 40;

// ────────────────────────────────────────────────────────────────────
// CLI Argument Parsing
// ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const FORCE_SEARCH = args.includes('--force-search');
const WEEK_ONLY = args.find(arg => /^\d{2}$/.test(arg))?.slice(0, 2) || null;

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

if (FORCE_SEARCH) {
  log('⚡ FORCE-SEARCH MODE: Will search for better videos even if current is working');
}

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
// Syllabus Metadata Reader
// ────────────────────────────────────────────────────────────────────
function readSyllabusMetadata(weekNum) {
  const padded = weekNum.padStart(2, '0');
  log(`  📚 readSyllabusMetadata: weekNum=${weekNum} padded=${padded}`);
  const meta = {
    topic: '',
    grammarFocus: '',
    vocabWords: [],
    vocabCollocations: [],
    readContentEn: '',
    readChunks: []
  };

  try {
    // Read grammar.js for grammar focus
    const grammarPath = path.join(BASE, 'src/data/weeks', `week_${padded}`, 'grammar.js');
    if (fs.existsSync(grammarPath)) {
      const grammarContent = fs.readFileSync(grammarPath, 'utf8');
      const titleMatch = grammarContent.match(/title_en:\s*["`']([^"`']+)["`']/);
      if (titleMatch) meta.grammarFocus = titleMatch[1];
      log(`    grammar.js: ${fs.existsSync(grammarPath) ? 'exists' : 'missing'} → "${meta.grammarFocus}"`);
    } else {
      log(`    grammar.js: MISSING at ${grammarPath}`);
    }

    // Read vocab.js for target vocabulary
    const vocabPath = path.join(BASE, 'src/data/weeks', `week_${padded}`, 'vocab.js');
    if (fs.existsSync(vocabPath)) {
      const vocabContent = fs.readFileSync(vocabPath, 'utf8');
      // Extract word entries — only actual words, not audio paths
      // Match word: "xxx" but exclude paths containing /
      const wordMatches = vocabContent.matchAll(/word:\s*["`']([^"`'/]+)["`']/g);
      for (const m of wordMatches) {
        const word = m[1].trim().toLowerCase();
        if (word.length > 1 && !word.includes('/')) {
          meta.vocabWords.push(word);
        }
      }
      // Extract collocations
      const collocMatches = vocabContent.matchAll(/collocation:\s*\[([^\]]+)\]/g);
      for (const m of collocMatches) {
        const collocs = m[1].match(/["`']([^"`']+)["`']/g);
        if (collocs) {
          for (const c of collocs) {
            const colloc = c.replace(/["`']/g, '').toLowerCase();
            if (!colloc.includes('/')) {
              meta.vocabCollocations.push(colloc);
            }
          }
        }
      }
    }

    // Read read.js for topic and content
    const readPath = path.join(BASE, 'src/data/weeks', `week_${padded}`, 'read.js');
    if (fs.existsSync(readPath)) {
      const readContent = fs.readFileSync(readPath, 'utf8');
      const titleMatch = readContent.match(/title:\s*["`']([^"`']+)["`']/);
      if (titleMatch) meta.topic = titleMatch[1];

      const contentMatch = readContent.match(/content_en:\s*["`'](.+?)["`']/s);
      if (contentMatch) {
        meta.readContentEn = contentMatch[1];
        // Extract bolded chunks
        const chunkMatches = contentMatch[1].matchAll(/\*\*([^*]+)\*\*/g);
        for (const m of chunkMatches) {
          meta.readChunks.push(m[1].toLowerCase());
        }
      }
    }

    log(`  📚 Syllabus: topic="${meta.topic}" | grammar="${meta.grammarFocus}" | vocab=${meta.vocabWords.length} words | chunks=${meta.readChunks.length}`);
  } catch (err) {
    log(`  ⚠️  Error reading syllabus: ${err.message}`);
  }

  return meta;
}

// ────────────────────────────────────────────────────────────────────
// Channel Intelligence — STRICT WHITELIST (hard reject)
// ────────────────────────────────────────────────────────────────────
const CHANNEL_WHITELIST = [
  // Primary ESL kids channels (shadowing-friendly)
  'super simple songs',
  'super simple english',
  'english singsing',
  'easy english',
  'easy english对话',
  'maple leaf learning',
  'listen and share',
  'daily english conversation',
  'english for kids',
  'kids english',
  'english with kids',
  'lets learn english',
  'learn english with tv series',
  'learn english kids',
  // British / institutional
  'british council',
  'learnenglish kids',
  'cbeebies',
  'sesame street',
  // Popular kids education
  'blippi',
  'gracie\'s corner',
  'peppa pig official',
  'cocomelon',
  'little angel',
  'dave and ava',
  'nursery rhymes',
  // Story/dialogue channels
  'story for kids',
  'kids stories',
  'english story',
  'animated story',
  'read aloud',
  // Conversation-focused
  'english conversation',
  'speaking english',
  'english dialogue',
  'talk english',
  // Broad kids education that sometimes has good content
  'khan academy kids',
  'ted-ed',
  'national geographic kids',
  'pinkfong',
  // Additional ESL channels found in search results
  'slow stories english',
  'learnenglishwithnks',
  'english learning',
  'english singing',
  'english with',
  'esl',
  'learn english with',
  'story toon',
  'rainbow sky',
];

const CHANNEL_BLACKLIST = [
  'news',
  'cnn',
  'bbc news',
  'fox news',
  'podcast',
  'lecture',
  'university',
  'college',
  'professor',
  'academic',
  'ielts',
  'toefl',
  'exam',
  'test prep',
  'gre',
  'gmat'
];

// Hardcoded video blacklist for testing (pedagogically irrelevant videos)
const VIDEO_BLACKLIST = [
  '5cYMu3RTMJU',  // Days of the Week — not school vocabulary
  '7isSwerYaQc',  // School Conversation — no target chunks
  'Fw0rdSHzWFY',  // Greeting — no target chunks
  'FZPmnw4Ws5A',  // Too long (456s), broken punctuation
];

const KIDS_KEYWORDS = ['kids', 'children', 'beginner', 'young learners', 'pre-a1', 'a1', 'family', 'simple', 'nursery', 'story'];
const CONVERSATION_KEYWORDS = ['conversation', 'dialogue', 'story', 'speaking', 'talk', 'chat', 'shadowing', 'listen and repeat'];
const NEGATIVE_KEYWORDS = ['grammar', 'lesson', 'tutorial', 'test', 'exam', 'ielts', 'toefl', 'advanced', 'vocabulary list', 'word list'];

// Anti-dangling: words that should NOT end a sentence (dangling prepositions/articles)
const DANGLING_WORDS = /^(and|to|the|a|an|my|your|his|her|its|our|their|in|on|at|for|with|is|are|was|were|do|does|did|have|has|had|can|could|will|would|shall|should|may|might|must|but|or|so|yet|if|when|while|that|which|who|whom|where|how|what|why|of|from|by|about|into|through|during|before|after|above|below|between|under|over)\.?\s*$/i;

// ────────────────────────────────────────────────────────────────────
// YouTube API — Enhanced Search with Syllabus Context
// ────────────────────────────────────────────────────────────────────
// Names that are syllabus-specific, NOT YouTube search keywords
const CHAR_NAMES = /^(alex|sophia|mason|maya|kate|clara|emma|liam|oliver|noah|lily|jack|tom|jerry|bob|sam|max|lucy|luna|leo|mia|ben|peter|anna|daisy|charlie|jackie)$/i;

// ────────────────────────────────────────────────────────────────────
// Query Formula: [ESL Modifier] + [Core Target] + [Format] + [Exclusions]
//
// Core Target = the ACTUAL pedagogical concept being taught (nouns/verbs)
// NOT the fictional syllabus unit title
// ────────────────────────────────────────────────────────────────────

// Maps syllabus topic keywords to CORE PEDAGOGICAL TARGETS
// These are what the week actually teaches — not the story/unit name
const TOPIC_MAPPING = {
  // W01: Alex's School Day → teaches school vocabulary
  'school day': 'school day first day school',
  'school': 'school day first day school',

  // W02: Family → teaches family member vocabulary
  'family': 'family members family tree',
  'family squad': 'family members family tree',

  // W03: Finding Rora → teaches park/outdoor vocabulary
  'park': 'park playground outdoor',
  'finding rora': 'park playground outdoor',

  // W04: Mystery House → teaches rooms/furniture vocabulary
  'mystery house': 'rooms house furniture',
  'house': 'rooms house furniture',
  'home': 'rooms house furniture',

  // W05: Treasure Hunt → teaches prepositions/location vocabulary
  'treasure hunt': 'prepositions place where',
  'treasure': 'prepositions place where',

  // W06: Nature Hike → teaches nature vocabulary
  'nature': 'nature plants trees',
  'hike': 'nature plants trees',

  // W07: Beaver Valley → teaches animal vocabulary
  'beaver valley': 'farm animals animal names',
  'valley': 'farm animals animal names',

  // W08: Monday Morning → teaches days/time vocabulary
  'monday morning': 'days week telling time',
  'morning routine': 'days week telling time',

  // W09: Exploring the City → teaches places vocabulary
  'exploring the city': 'places city buildings',
  'city': 'places city buildings',

  // W10: Farm Adventure → teaches farm vocabulary
  'farm adventure': 'farm animals farm',
  'farm': 'farm animals farm',

  // W11: Weekend Adventure → teaches weekend/activity vocabulary
  'weekend adventure': 'weekend activities',
  'weekend': 'weekend activities',

  // W12: School Talent Show → teaches sports/hobbies vocabulary
  'talent show': 'sports hobbies after school',

  // W13: Perfect School Day → teaches daily routine vocabulary
  'perfect school day': 'daily routine school',

  // W14: Presentation → teaches presentation/describing vocabulary
  'presentation': 'describing things adjectives',

  // W15: Park Visit → teaches park vocabulary
  'park visit': 'park outdoor',

  // W16: Soccer Game → teaches sports vocabulary
  'soccer game': 'sports ball games',

  // W17: Weather → teaches weather vocabulary
  'weather': 'weather forecast',

  // W18: News → teaches media vocabulary
  'news': 'news media',

  // W19: Grandma Moses → teaches art vocabulary
  'grandma moses': 'art painting',

  // W20: Detective Luna → teaches mystery vocabulary
  'detective luna': 'mystery detective story',

  // W21: Detective Max → teaches mystery vocabulary
  'detective max': 'mystery detective story',

  // W22: Nova Case → teaches problem-solving vocabulary
  'nova case': 'problem solving thinking',

  // W23: Art Class → teaches art vocabulary
  'art class': 'art painting',

  // W24: Emotional Monday → teaches feelings vocabulary
  'emotional monday': 'feelings emotions happy sad',

  // W25: Making a Sandwich → teaches food vocabulary
  'making a sandwich': 'food cooking',
  'sandwich': 'food cooking',

  // W26: Leo Airport → teaches travel vocabulary
  'leo airport': 'airport travel',

  // W27: Maya Nature → teaches nature vocabulary
  'maya nature': 'nature plants trees',

  // W28: Transport Race → teaches transport vocabulary
  'transport race': 'transportation vehicles',

  // W29: Magic Trip → teaches travel vocabulary
  'magic trip': 'travel vacation',

  // W30: Picnic Day → teaches food/outdoor vocabulary
  'picnic day': 'picnic food outdoor',

  // W31: Market Day → teaches shopping vocabulary
  'market day': 'market shopping',

  // W32: Tom's Story → teaches story vocabulary
  'tom story': 'storytelling narrative',

  // W33: School Monday → teaches school vocabulary
  'school monday': 'school activities Monday',

  // W34: Week 34 → generic
  'week 34': 'English conversation dialogue',

  // W35: Earth Day → teaches earth/environment vocabulary
  'earth day': 'earth environment',
  'earth': 'earth environment',

  // W36+: generic
  'default': 'English conversation dialogue',
};

// Query formula components
// YouTube Search does NOT support parenthesized boolean OR — use simple keywords
const ESL_MODIFIER = 'ESL kids conversation';
const FORMAT = 'dialogue';
const EXCLUSIONS = '-compilation -song -dance -music -nursery -rhyme -rap';

function buildSmartQuery(syllabusMeta, weekTitle) {
  // Step 1: Find the CORE PEDAGOGICAL TARGET from topic
  let coreTarget = null;

  if (syllabusMeta.topic) {
    const topicLower = syllabusMeta.topic.toLowerCase();
    // Find the longest matching key
    for (const [key, target] of Object.entries(TOPIC_MAPPING)) {
      if (key === 'default') continue;
      if (topicLower.includes(key)) {
        if (!coreTarget || key.length > coreTarget.key.length) {
          coreTarget = { key, target };
        }
      }
    }
  }

  // Step 2: Check read chunks for additional context
  if (!coreTarget && syllabusMeta.readChunks.length > 0) {
    for (const chunk of syllabusMeta.readChunks) {
      const chunkLower = chunk.toLowerCase();
      for (const [key, target] of Object.entries(TOPIC_MAPPING)) {
        if (key === 'default') continue;
        if (chunkLower.includes(key)) {
          if (!coreTarget || key.length > coreTarget.key.length) {
            coreTarget = { key, target };
          }
        }
      }
    }
  }

  // Step 2b: Check vocab words for additional context
  if (!coreTarget && syllabusMeta.vocabWords.length > 0) {
    for (const word of syllabusMeta.vocabWords) {
      const wordLower = word.toLowerCase();
      for (const [key, target] of Object.entries(TOPIC_MAPPING)) {
        if (key === 'default') continue;
        if (wordLower.includes(key) || key.includes(wordLower)) {
          if (!coreTarget || key.length > coreTarget.key.length) {
            coreTarget = { key, target };
          }
        }
      }
    }
  }

  // Step 3: Build query using the formula
  const core = coreTarget ? coreTarget.target : TOPIC_MAPPING['default'];
  return `${ESL_MODIFIER} ${core} ${FORMAT} ${EXCLUSIONS}`;
}

async function searchVideo(weekTitle, contentEn, syllabusMeta = null, weekNum = '99') {
  if (!API_KEY) {
    throw new Error('YOUTUBE_API_KEY not found in environment');
  }

  const meta = syllabusMeta || { topic: weekTitle, grammarFocus: '', vocabWords: [], readChunks: [] };
  log(`  🔍 searchVideo: topic="${meta.topic}" grammar="${meta.grammarFocus}" vocab=${meta.vocabWords.length}`);

  // ── LLM STEP 1: Generate search queries dynamically ──
  let searchQuery;
  let conversationalExpressions = [];
  try {
    log(`  🤖 Asking LLM to generate search queries...`);
    const llmResult = await analyzeSyllabus(meta, weekTitle);
    searchQuery = llmResult.searchQueries[0] || buildSmartQuery(meta, weekTitle);
    conversationalExpressions = llmResult.expressions || [];
    log(`  🤖 LLM query: "${searchQuery}"`);
    log(`  🤖 LLM expressions: ${conversationalExpressions.slice(0, 3).join(', ')}...`);
  } catch (llmErr) {
    log(`  ⚠️  LLM query generation failed: ${llmErr.message}, using fallback`);
    searchQuery = buildSmartQuery(meta, weekTitle);
  }

  // Store expressions in syllabusMeta for transcript evaluation
  meta.conversationalExpressions = conversationalExpressions;

  // NOTE: videoDuration parameter is BROKEN on YouTube Search API — it is ignored.
  // All duration filtering MUST happen post-fetch in the loop below.
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&videoDefinition=high&relevanceLanguage=en&maxResults=10&key=${API_KEY}`;

  log(`  Smart query: "${searchQuery}"`);

  // 429 retry with exponential backoff
  let searchData = null;
  for (let attempt = 0; attempt <= 3; attempt++) {
    if (attempt > 0) {
      const backoffMs = Math.pow(2, attempt) * 3000; // 6s, 12s, 24s
      log(`  ⏳ 429 retry ${attempt}/3 (waiting ${backoffMs}ms)...`);
      await sleep(backoffMs);
    }

    const searchRes = await fetch(searchUrl);
    if (searchRes.status === 429) {
      log(`  ⚠️  429 Too Many Requests — will retry...`);
      continue;
    }
    if (!searchRes.ok) {
      throw new Error(`YouTube Search API failed: ${searchRes.status} ${searchRes.statusText}`);
    }

    searchData = await searchRes.json();
    break;
  }

  if (!searchData || !searchData.items || searchData.items.length === 0) {
    throw new Error('No search results from YouTube API');
  }

  log(`  Found ${searchData.items.length} candidates — evaluating...`);

  // Collect all candidates with scores
  const candidates = [];

  for (const item of searchData.items) {
    const videoId = item.id.videoId;
    const snippet = item.snippet;

    // Fetch video details
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&id=${videoId}&key=${API_KEY}`;
    await sleep(300);

    const detailsRes = await fetch(detailsUrl);
    if (!detailsRes.ok) {
      log(`    ⚠️  ${videoId}: details fetch failed`);
      continue;
    }

    const detailsData = await detailsRes.json();
    if (!detailsData.items || detailsData.items.length === 0) {
      log(`    ⚠️  ${videoId}: no details`);
      continue;
    }

    const videoInfo = detailsData.items[0];
    const duration = parseDuration(videoInfo.contentDetails.duration);
    const title = videoInfo.snippet.title;
    const description = videoInfo.snippet.description || '';
    const channelTitle = videoInfo.snippet.channelTitle.toLowerCase();
    const tags = (videoInfo.snippet.tags || []).map(t => t.toLowerCase());
    const viewCount = parseInt(videoInfo.statistics?.viewCount || 0);

    // PRE-FILTERS (hard constraints)
    // Hardcoded video blacklist
    if (VIDEO_BLACKLIST.includes(videoId)) {
      log(`    ❌ ${videoId}: on hardcoded blacklist`);
      continue;
    }

    if (duration < 60 || duration > 900) {
      log(`    ❌ ${videoId}: duration ${duration}s out of range [60-900]`);
      continue;
    }

    // STRICT DURATION LIMIT for early weeks (W01-10): max 300s, sweet spot 60-180s
    const weekNumInt = parseInt(weekNum || '99');
    if (weekNumInt <= 10 && duration > 300) {
      log(`    ❌ ${videoId}: duration ${duration}s > 300s limit for W${weekNumInt}`);
      continue;
    }

    if (title.toLowerCase().includes('short') || tags.includes('shorts')) {
      log(`    ❌ ${videoId}: detected as Short`);
      continue;
    }

    // HARD REJECT: Channel must be on whitelist OR contain "english" in name
    const channelLower = videoInfo.snippet.channelTitle.toLowerCase();
    const isWhitelisted = CHANNEL_WHITELIST.some(wl => channelLower.includes(wl));
    const hasEnglish = channelLower.includes('english') || channelLower.includes('esl');
    if (!isWhitelisted && !hasEnglish) {
      log(`    ❌ ${videoId}: channel "${videoInfo.snippet.channelTitle}" NOT on whitelist`);
      continue;
    }

    // HARD REJECT: Blacklisted channel keywords
    const isBlacklisted = CHANNEL_BLACKLIST.some(bl => channelLower.includes(bl));
    if (isBlacklisted) {
      log(`    ❌ ${videoId}: channel "${videoInfo.snippet.channelTitle}" is BLACKLISTED`);
      continue;
    }

    // Fetch transcript for speech rate + availability check + caption quality
    const transcriptResult = await fetchTranscript(videoId);
    const transcript = transcriptResult.segments || [];
    const captionQuality = transcriptResult.quality || 'unknown';
    const hasPunctuation = transcriptResult.hasPunctuation || false;

    if (transcript.length === 0) {
      log(`    ❌ ${videoId}: no transcript available`);
      continue;
    }

    const totalWords = transcript.reduce((sum, seg) => sum + seg.text.split(/\s+/).length, 0);
    const totalMinutes = duration / 60;
    const speechRate = totalWords / totalMinutes;

    log(`    ✅ ${videoId}: "${title}" | ${duration}s | ${transcript.length} segs | ${Math.round(speechRate)} WPM | ${captionQuality}`);

    // SCORING
    let score = 0;
    const reasons = [];

    // 1. Kids keywords in title/description (30 pts)
    const textLower = (title + ' ' + description).toLowerCase();
    const kidsMatches = KIDS_KEYWORDS.filter(kw => textLower.includes(kw)).length;
    if (kidsMatches > 0) {
      const pts = Math.min(kidsMatches * 10, 30);
      score += pts;
      reasons.push(`kids:+${pts}`);
    }

    // 2. Conversation keywords (25 pts)
    const convMatches = CONVERSATION_KEYWORDS.filter(kw => textLower.includes(kw)).length;
    if (convMatches > 0) {
      const pts = Math.min(convMatches * 10, 25);
      score += pts;
      reasons.push(`conv:+${pts}`);
    }

    // 3. Transcript quality (20 pts)
    if (transcript.length >= 20 && transcript.length <= 50) {
      score += 20;
      reasons.push(`transcript:+20`);
    } else if (transcript.length >= 10) {
      score += 10;
      reasons.push(`transcript:+10`);
    }

    // 4. Speech rate (WPM) — Pacing Floor + Ceiling
    if (speechRate < 60) {
      score -= 15;
      reasons.push(`speech:-15 (dead air)`);
    } else if (speechRate < 80) {
      score += 10;
      reasons.push(`speech:+10`);
    } else if (speechRate <= 130) {
      score += 15;
      reasons.push(`speech:+15 (sweet spot)`);
    } else if (speechRate <= 150) {
      score += 5;
      reasons.push(`speech:+5`);
    } else {
      score -= 10;
      reasons.push(`speech:-10 (too fast)`);
    }

    // 5. Duration sweet spot 90-360s (10 pts)
    if (duration >= 90 && duration <= 360) {
      score += 10;
      reasons.push(`duration:+10`);
    }

    // 6. View count (quality proxy, 10 pts)
    if (viewCount >= 100000) {
      score += 10;
      reasons.push(`views:+10`);
    } else if (viewCount >= 10000) {
      score += 5;
      reasons.push(`views:+5`);
    }

    // 7. Channel already validated by hard-reject filter above — no scoring needed

    // 9. Negative keywords (-15 pts)
    const negMatches = NEGATIVE_KEYWORDS.filter(kw => textLower.includes(kw)).length;
    if (negMatches > 0) {
      const penalty = negMatches * 5;
      score -= penalty;
      reasons.push(`negative:-${penalty}`);
    }

    // 10. Caption quality (25 pts max)
    if (captionQuality === 'manual_punctuated' || captionQuality === 'cached_punctuated') {
      score += 25;
      reasons.push(`captions:+25 (${captionQuality})`);
    } else if (captionQuality === 'manual_unpunctuated' || captionQuality === 'cached_unpunctuated') {
      score += 15;
      reasons.push(`captions:+15 (${captionQuality})`);
    } else if (captionQuality === 'asr_punctuated') {
      score += 10;
      reasons.push(`captions:+10 (asr+punctuated)`);
    } else {
      // asr_unpunctuated — penalty
      score -= 10;
      reasons.push(`captions:-10 (asr unpunctuated)`);
    }

    // 11. LLM-driven semantic evaluation (replaces string-matching)
    if (syllabusMeta && syllabusMeta.vocabWords.length > 0) {
      const transcriptText = transcript.map(s => s.text).join(' ');

      // Try LLM evaluation first
      let llmEval = null;
      try {
        llmEval = await evaluateTranscript(transcriptText, syllabusMeta, weekTitle, title);
        log(`    🤖 LLM eval: score=${llmEval.score} verdict=${llmEval.verdict} (${llmEval.details?.reason || ''})`);
      } catch (llmErr) {
        log(`    ⚠️  LLM eval failed: ${llmErr.message}, falling back to string match`);
      }

      // Also compute string-match score as fallback/backup
      const transcriptLower = transcriptText.toLowerCase();
      const vocabOverlap = syllabusMeta.vocabWords.filter(vw => transcriptLower.includes(vw)).length;
      const expressionOverlap = (syllabusMeta.conversationalExpressions || [])
        .filter(expr => transcriptLower.includes(expr.toLowerCase())).length;
      const grammarWords = syllabusMeta.grammarFocus.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      const grammarOverlap = grammarWords.filter(gw => transcriptLower.includes(gw)).length;

      if (llmEval) {
        // Use LLM score as primary (0-100), normalize to our scoring scale
        const llmScore = Math.round(llmEval.score * 0.4); // 0-40 pts
        score += llmScore;
        reasons.push(`llm:${llmEval.verdict}+${llmScore} (vocab:${llmEval.details?.vocabulary_match?.count || 0}, expr:${expressionOverlap})`);

        // HARD REJECT from LLM verdict
        if (llmEval.verdict === 'FAIL' && llmEval.score < 30) {
          log(`    ❌ ${videoId}: LLM REJECT (score=${llmEval.score}, ${llmEval.details?.reason || 'unsuitable'})`);
          continue;
        }
      } else {
        // Fallback: simple string match scoring
        const vocabScore = Math.round((vocabOverlap / syllabusMeta.vocabWords.length) * 20);
        const exprScore = Math.min(expressionOverlap * 5, 15);
        const grammarScore = grammarWords.length > 0 ? Math.round((grammarOverlap / grammarWords.length) * 5) : 0;
        const fallbackScore = vocabScore + exprScore + grammarScore;
        score += fallbackScore;
        reasons.push(`fallback:${vocabOverlap}w/${expressionOverlap}e/${grammarOverlap}g:+${fallbackScore}`);

        if (vocabOverlap < 3) {
          log(`    ❌ ${videoId}: HARD REJECT — only ${vocabOverlap}/9 vocab words in transcript`);
          continue;
        }
      }
    }

    log(`      Score: ${score} | ${reasons.join(', ')}`);

    candidates.push({
      videoId,
      title,
      duration,
      transcript,
      captionQuality,
      speechRate: Math.round(speechRate),
      score,
      reasons: reasons.join(', ')
    });
  }

  // Sort by score descending
  candidates.sort((a, b) => b.score - a.score);

  if (candidates.length === 0) {
    throw new Error('No valid candidates after filtering (all failed transcript/duration checks)');
  }

  const winner = candidates[0];
  log(`  🏆 WINNER: ${winner.videoId} "${winner.title}" | Score: ${winner.score} | ${winner.speechRate} WPM`);
  log(`     Reasons: ${winner.reasons}`);

  return {
    videoId: winner.videoId,
    title: winner.title,
    duration: winner.duration,
    transcript: winner.transcript,
    captionQuality: winner.captionQuality,
    score: winner.score
  };
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

async function scoreExistingVideo(videoId, title, contentEn, syllabusMeta = null) {
  // Fetch video details
  const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&id=${videoId}&key=${API_KEY}`;
  const detailsRes = await fetch(detailsUrl);

  if (!detailsRes.ok) {
    log(`  ⚠️  Could not fetch details for existing video ${videoId}`);
    return 0;
  }

  const detailsData = await detailsRes.json();
  if (!detailsData.items || detailsData.items.length === 0) {
    log(`  ⚠️  No details for existing video ${videoId}`);
    return 0;
  }

  const videoInfo = detailsData.items[0];
  const duration = parseDuration(videoInfo.contentDetails.duration);
  const description = videoInfo.snippet.description || '';
  const channelTitle = videoInfo.snippet.channelTitle.toLowerCase();
  const tags = (videoInfo.snippet.tags || []).map(t => t.toLowerCase());
  const viewCount = parseInt(videoInfo.statistics?.viewCount || 0);

  // Fetch transcript + caption quality
  const transcriptResult = await fetchTranscript(videoId);
  const transcript = transcriptResult.segments || [];
  const captionQuality = transcriptResult.quality || 'unknown';

  if (transcript.length === 0) {
    log(`  ⚠️  No transcript for existing video ${videoId}`);
    return 0;
  }

  const totalWords = transcript.reduce((sum, seg) => sum + seg.text.split(/\s+/).length, 0);
  const totalMinutes = duration / 60;
  const speechRate = totalWords / totalMinutes;

  // SCORING (same logic as searchVideo)
  let score = 0;
  const textLower = (title + ' ' + description).toLowerCase();

  // 1. Kids keywords (30 pts)
  const kidsMatches = KIDS_KEYWORDS.filter(kw => textLower.includes(kw)).length;
  if (kidsMatches > 0) score += Math.min(kidsMatches * 10, 30);

  // 2. Conversation keywords (25 pts)
  const convMatches = CONVERSATION_KEYWORDS.filter(kw => textLower.includes(kw)).length;
  if (convMatches > 0) score += Math.min(convMatches * 10, 25);

  // 3. Transcript quality (20 pts)
  if (transcript.length >= 20 && transcript.length <= 50) score += 20;
  else if (transcript.length >= 10) score += 10;

  // 4. Speech rate (WPM) — Pacing Floor + Ceiling
  if (speechRate < 60) score -= 15;
  else if (speechRate < 80) score += 10;
  else if (speechRate <= 130) score += 15;
  else if (speechRate <= 150) score += 5;
  else score -= 10;

  // 5. Duration sweet spot (10 pts)
  if (duration >= 90 && duration <= 360) score += 10;

  // 6. View count (10 pts)
  if (viewCount >= 100000) score += 10;
  else if (viewCount >= 10000) score += 5;

  // 7. Channel whitelist (15 pts)
  if (CHANNEL_WHITELIST.some(wl => channelTitle.includes(wl))) score += 15;

  // 8. Channel blacklist (-20 pts)
  if (CHANNEL_BLACKLIST.some(bl => channelTitle.includes(bl))) score -= 20;

  // 9. Negative keywords (-15 pts)
  const negMatches = NEGATIVE_KEYWORDS.filter(kw => textLower.includes(kw)).length;
  if (negMatches > 0) score -= negMatches * 5;

  // 10. Caption quality (25 pts max)
  if (captionQuality === 'manual_punctuated' || captionQuality === 'cached_punctuated') score += 25;
  else if (captionQuality === 'manual_unpunctuated' || captionQuality === 'cached_unpunctuated') score += 15;
  else if (captionQuality === 'asr_punctuated') score += 10;
  else score -= 10;

  // 11. Vocabulary relevance (30 pts max) — STRICTLY transcript-only
  if (syllabusMeta && syllabusMeta.vocabWords.length > 0) {
    // ONLY check actual spoken words in transcript — NOT title, NOT description, NOT tags
    const transcriptLower = transcript.map(s => s.text.toLowerCase()).join(' ');

    const vocabOverlap = syllabusMeta.vocabWords.filter(vw => transcriptLower.includes(vw)).length;
    const vocabRatio = vocabOverlap / syllabusMeta.vocabWords.length;

    const chunkOverlap = syllabusMeta.readChunks.filter(rc => transcriptLower.includes(rc)).length;
    const chunkRatio = syllabusMeta.readChunks.length > 0 ? chunkOverlap / syllabusMeta.readChunks.length : 0;

    const grammarWords = syllabusMeta.grammarFocus.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const grammarOverlap = grammarWords.filter(gw => transcriptLower.includes(gw)).length;
    const grammarRatio = grammarWords.length > 0 ? grammarOverlap / grammarWords.length : 0;

    const relevanceScore = Math.round((vocabRatio * 15) + (chunkRatio * 10) + (grammarRatio * 5));
    score += relevanceScore;
    log(`    📚 Vocab relevance: +${relevanceScore} (${vocabOverlap}/${syllabusMeta.vocabWords.length} words, ${chunkOverlap} chunks, ${grammarOverlap} grammar)`);
  }

  log(`  📊 Existing video ${videoId} score: ${score} (duration: ${duration}s, ${Math.round(speechRate)} WPM, ${transcript.length} segments, ${captionQuality})`);
  return score;
}

// ────────────────────────────────────────────────────────────────────
// Rate Limiting & Retry Logic
// ────────────────────────────────────────────────────────────────────
const TRANSCRIPT_DELAY_MS = 1500; // 1.5s between transcript calls (prevents IP ban)
const MAX_RETRIES = 2;
let lastTranscriptCall = 0;

async function rateLimitedDelay() {
  const now = Date.now();
  const timeSinceLastCall = now - lastTranscriptCall;
  if (timeSinceLastCall < TRANSCRIPT_DELAY_MS) {
    const waitTime = TRANSCRIPT_DELAY_MS - timeSinceLastCall;
    await sleep(waitTime);
  }
  lastTranscriptCall = Date.now();
}

async function fetchTranscript(videoId) {
  // First, check for cached transcript
  const cachePath = path.join(BASE, 'src/data/video_transcripts_by_id/cleaned', `${videoId}.json`);
  if (fs.existsSync(cachePath)) {
    try {
      const cached = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      if (cached.segments && cached.segments.length > 0) {
        log(`  📦 Using cached transcript for ${videoId} (${cached.segments.length} segments)`);

        // Check quality from cached data
        const allText = cached.segments.map(s => s.text).join(' ');
        const hasPunctuation = /[.!?]/.test(allText);
        const quality = hasPunctuation ? 'cached_punctuated' : 'cached_unpunctuated';

        return {
          segments: cached.segments,
          quality,
          isGenerated: false,
          hasPunctuation
        };
      }
    } catch (e) {
      log(`  ⚠️  Cache read error: ${e.message}`);
    }
  }

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        const backoffMs = Math.pow(2, attempt) * 2000; // 4s, 8s
        log(`  ⏳ Retry ${attempt}/${MAX_RETRIES} for ${videoId} (waiting ${backoffMs}ms)...`);
        await sleep(backoffMs);
      }

      log(`  Fetching transcript for ${videoId}...`);
      await rateLimitedDelay();

      const pyFile = path.join(BASE, 'scripts', 'tmp_transcript.py');
      const pythonScript = `
from youtube_transcript_api import YouTubeTranscriptApi
import json, sys, re

ytt = YouTubeTranscriptApi()

# Step 1: Check available transcripts and their quality
try:
    transcript_list = ytt.list(video_id='${videoId}')
except Exception as e:
    print(json.dumps({'segments': [], 'quality': 'error', 'is_generated': True, 'has_punctuation': False}))
    sys.exit(0)

# Find English transcript, prefer manual over auto-generated
best_transcript = None
for t in transcript_list:
    if t.language_code.startswith('en'):
        if not t.is_generated:
            best_transcript = t  # Manual = best
            break
        elif best_transcript is None:
            best_transcript = t  # Auto-generated = fallback

if best_transcript is None:
    print(json.dumps({'segments': [], 'quality': 'none', 'is_generated': True, 'has_punctuation': False}))
    sys.exit(0)

# Step 2: Fetch the transcript
try:
    transcript = best_transcript.fetch()
except Exception as e:
    print(json.dumps({'segments': [], 'quality': 'error', 'is_generated': best_transcript.is_generated, 'has_punctuation': False}))
    sys.exit(0)

# Step 3: Check punctuation quality
all_text = ' '.join([s.text.strip() for s in transcript.snippets])
has_periods = bool(re.search(r'[.!?]', all_text))
word_count = len(all_text.split())
punctuation_count = len(re.findall(r'[.!?]', all_text))
# Good punctuation: at least 1 punctuation mark per 20 words
punctuation_ratio = punctuation_count / max(word_count / 20, 1)
has_good_punctuation = has_periods and punctuation_ratio >= 0.3

# Step 4: Build segments
segments = []
for seg in transcript.snippets:
    text = seg.text.strip()
    if len(text) > 2:
        segments.append({
            'text': text,
            'start': round(seg.start, 2),
            'duration': round(seg.duration, 2)
        })

# Determine quality label
if not best_transcript.is_generated and has_good_punctuation:
    quality = 'manual_punctuated'
elif not best_transcript.is_generated:
    quality = 'manual_unpunctuated'
elif has_good_punctuation:
    quality = 'asr_punctuated'
else:
    quality = 'asr_unpunctuated'

print(json.dumps({
    'segments': segments,
    'quality': quality,
    'is_generated': best_transcript.is_generated,
    'has_punctuation': has_good_punctuation,
    'punctuation_ratio': round(punctuation_ratio, 2)
}))
`.trim();

      fs.writeFileSync(pyFile, pythonScript, 'utf8');
      const output = execSync(`python3 "${pyFile}"`, {
        encoding: 'utf8',
        timeout: 30000,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      try { fs.unlinkSync(pyFile); } catch (_) {}

      const result = JSON.parse(output.trim());
      const segments = result.segments || [];
      const quality = result.quality || 'unknown';
      const isGenerated = result.is_generated !== false;
      const hasPunctuation = result.has_punctuation || false;

      // Check for IP block (0 segments = likely blocked)
      if (segments.length === 0 && attempt < MAX_RETRIES) {
        log(`  ⚠️  Got 0 segments — possible IP block, retrying...`);
        continue;
      }

      // Caption quality logging
      const qualityEmoji = quality === 'manual_punctuated' ? '🏆' :
                           quality === 'manual_unpunctuated' ? '📝' :
                           quality === 'asr_punctuated' ? '✅' : '⚠️';
      log(`  ${qualityEmoji} Caption quality: ${quality} (${segments.length} segments, punctuation: ${hasPunctuation})`);

      return { segments, quality, isGenerated, hasPunctuation };
    } catch (err) {
      log(`  ❌ Transcript fetch failed: ${err.message}`);
      try { fs.unlinkSync(path.join(BASE, 'scripts', 'tmp_transcript.py')); } catch (_) {}

      if (attempt < MAX_RETRIES) {
        log(`  ⚠️  Retrying due to error...`);
        continue;
      }
      return [];
    }
  }
  return [];
}

// ────────────────────────────────────────────────────────────────────
// Transcript Formatting — Grammar-Aware (Phase 2)
// ────────────────────────────────────────────────────────────────────

const CONJUNCTIONS = /^(and|but|because|so|then|or|yet|for|nor|when|if|while|that|which|who|whom|where|how|what|why|oh|well|yes|no|okay|ok)\b/i;

// Words that cannot end a complete sentence (function words / incomplete endings)
// These indicate the sentence is cut off mid-thought
const INCOMPLETE_ENDINGS = /^(I|he|she|it|we|they|a|an|the|my|your|his|her|its|our|their|to|in|on|at|for|with|and|but|or|so|yet|if|when|while|because|that|which|who|whom|where|how|what|why|is|are|was|were|do|does|did|have|has|had|can|could|will|would|shall|should|may|might|must|please|really|very|just|also|too|about|over|out|up|down|back|here|there|some|any|more|much|many|quite|rather)\b/i;

const MIN_WORDS = 10;   // Soft minimum — prefer longer segments
const MAX_WORDS = 35;   // Soft maximum — allow up to 35 if it preserves sentence integrity
const HARD_CEILING = 50; // Absolute maximum — must never exceed this, even for incomplete sentences

function isCompleteSentence(text) {
  const t = text.trim();
  if (t.length < 3) return false;

  // Must end with sentence-ending punctuation
  if (!/[.!?]"?\s*$/.test(t)) return false;

  // Starts with "Yes/No/Okay/Sure/Great/Good/Thank" → likely complete short response
  if (/^(Yes|No|Okay|Ok|Sure|Right|Exactly|Correct|Great|Good|Well done|Thank you|Thanks)\b/i.test(t)) return true;

  // Check last word for ANY sentence length — period alone doesn't guarantee completeness
  const clean = t.replace(/[.!?]"?\s*$/, '').trim();
  const words = clean.split(/\s+/);
  if (words.length === 0) return false;

  const lastWord = words[words.length - 1].toLowerCase().replace(/[^a-z]/g, '');
  if (INCOMPLETE_ENDINGS.test(lastWord)) return false;

  return true;
}

function isFragment(text) {
  const t = text.trim();
  if (t.length < 3) return true;
  const words = t.split(/\s+/);

  // If text ends with proper punctuation, it's NOT a fragment — even if short
  // "It's Wednesday." is a complete thought, not a fragment
  if (/[.!?]"?\s*$/.test(t)) return false;

  // Unpunctuated short text = fragment
  if (words.length < 4) return true;
  if (/^[a-z]/.test(t)) return true;
  if (CONJUNCTIONS.test(t)) return true;
  return false;
}

function splitIntoSentences(segments) {
  // Split each raw segment into individual sentence-level chunks
  // Uses smart heuristics for unpunctuated auto-captions
  const result = [];
  const TURN_WORDS = new Set(['hi','hello','hey','bye','goodbye','okay','ok','yes','no','nice','great','wow','really','so','well','thank','thanks']);

  // Sentence-starters: words that typically begin a new sentence in unpunctuated dialogue
  // WH-questions, subject pronouns, dialogue markers, conjunctions
  const SENTENCE_STARTERS = /^(how|what|where|when|why|who|i|you|he|she|it|we|they|hi|hello|hey|bye|okay|ok|yes|no|but|because|so|and|well|oh|please|let|come|go|do|are|is|that|this|there|here|my|your|his|her|our|their|very|just|also|too|nice|great|thank|wow|really|maybe|sure|right|exactly|oh|um|uh)\b/i;

  // Words that typically END a clause/thought (before a new sentence starts)
  const CLAUSE_ENDERS = /^(is|are|was|were|do|does|did|have|has|had|can|could|will|would|shall|should|may|might|must|am|been|being|go|goes|went|come|comes|came|like|likes|liked|live|lives|lived|work|works|worked|study|studies|studied|want|wants|wanted|need|needs|needed|love|loves|loved|think|thinks|thought|know|knows|knew|say|says|said|tell|tells|told|give|gives|gave|take|takes|took|make|makes|made|see|sees|saw|get|gets|got|put|puts|let|lets|try|tries|tried|help|helps|helped|play|plays|played|eat|eats|ate|drink|drinks|drank|sleep|sleeps|slept|walk|walks|walked|run|runs|ran|sit|sits|sat|stand|stands|stood|open|opens|opened|close|closes|closed|stop|stops|stopped|wait|waits|waited|start|starts|started|finish|finishes|finished|good|bad|nice|great|fine|okay|ok|well|sick|tired|happy|sad|hot|cold|big|small|long|short|old|new|young|fast|slow|easy|hard|right|wrong|here|there|now|then|today|tomorrow|yesterday|morning|afternoon|evening|night|always|never|sometimes|often|usually|really|very|too|quite|just|also|still|already|finally|maybe|sure|right|exactly|correct)\b/i;

  for (const seg of segments) {
    let text = seg.text;

    // Remove markers
    text = text.replace(/>>+\s*/g, '').trim();
    text = text.replace(/\[.*?\]/g, '').trim();
    if (!text || text.length < 3) continue;

    // Step 1: Split at existing punctuation
    let parts = text.split(/(?<=[.!?])\s+(?=[a-zA-Z])/);

    // Step 2: For unpunctuated text, use smart heuristics
    // Find split points where a new sentence likely starts
    if (parts.length <= 1) {
      const words = text.split(/\s+/);
      const splitPoints = [];

      for (let w = 1; w < words.length; w++) {
        const word = words[w].toLowerCase().replace(/[^a-z]/g, '');
        const prevWord = words[w - 1].toLowerCase().replace(/[^a-z]/g, '');

        // Rule 1: Turn markers (hi, hello, bye, okay, yes, no, nice, great, thank, wow, really)
        if (TURN_WORDS.has(word)) {
          splitPoints.push(w);
          continue;
        }

        // Rule 2: WH-questions (how, what, where, when, why, who)
        if (/^(how|what|where|when|why|who)$/i.test(word)) {
          splitPoints.push(w);
          continue;
        }

        // Rule 3: Subject pronouns AFTER a clause-ender
        // "I live in Alabama" after "nice" → split before "I"
        if (/^(i|you|he|she|it|we|they)$/i.test(word) && CLAUSE_ENDERS.test(prevWord)) {
          splitPoints.push(w);
          continue;
        }

        // Rule 4: "do you", "are you", "is it" after a clause-ender
        if (/^(do|are|is|can|will|would|could|should)$/i.test(word) && CLAUSE_ENDERS.test(prevWord)) {
          splitPoints.push(w);
          continue;
        }

        // Rule 5: Conjunctions (but, because, so, and) after 3+ words
        if (/^(but|because|so|and)$/i.test(word) && w >= 3) {
          splitPoints.push(w);
          continue;
        }
      }

      if (splitPoints.length > 0) {
        parts = [];
        let prev = 0;
        for (const sp of splitPoints) {
          if (sp > prev) {
            parts.push(words.slice(prev, sp).join(' '));
            prev = sp;
          }
        }
        if (prev < words.length) parts.push(words.slice(prev).join(' '));
      }
    }

    if (parts.length <= 1) {
      // No split — keep as one segment
      result.push({ text: text.trim(), start: seg.start, duration: seg.duration });
    } else {
      // Distribute time proportionally by word count
      const totalWords = text.split(/\s+/).length;
      let cursor = seg.start;

      for (let p = 0; p < parts.length; p++) {
        const part = parts[p];
        const partWords = part.trim().split(/\s+/).length;
        const proportion = partWords / totalWords;
        const partDuration = seg.duration * proportion;

        // Mark dialogue turns: only if starts with a turn word AND has ≥3 words
        const isFirstWord = TURN_WORDS.has(part.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, ''));
        const partWordCount = part.trim().split(/\s+/).length;

        result.push({
          text: part.trim(),
          start: cursor,
          duration: Math.round(partDuration * 100) / 100,
          isDialogueTurn: p > 0 && isFirstWord && partWordCount >= 3
        });
        cursor += partDuration;
      }
    }
  }

  return result;
}

function mergeFragments(sentences) {
  // CORE RULE: Only merge when CURRENT segment is incomplete.
  // If current ends with terminal punctuation (.), ?, !), it is a COMPLETE THOUGHT.
  // NEVER merge a complete sentence just because the next one is short.
  // Only merge orphaned fragments (unpunctuated words, dangling prepositions).
  if (sentences.length === 0) return [];

  const result = [];
  let current = { text: sentences[0].text, start: sentences[0].start, end: sentences[0].start + sentences[0].duration };

  for (let i = 1; i < sentences.length; i++) {
    const seg = sentences[i];

    // RULE 0: NEVER merge across dialogue turn boundaries
    if (seg.isDialogueTurn) {
      result.push({ text: current.text.trim(), start: current.start, duration: Math.round((current.end - current.start) * 100) / 100 });
      current = { text: seg.text, start: seg.start, end: seg.start + seg.duration };
      continue;
    }

    // RULE 1: If current is a COMPLETE SENTENCE (ends with ., ?, or !), SAVE IT.
    // Don't merge just because the next segment is short or starts lowercase.
    const currentComplete = isCompleteSentence(current.text);
    if (currentComplete) {
      result.push({ text: current.text.trim(), start: current.start, duration: Math.round((current.end - current.start) * 100) / 100 });
      current = { text: seg.text, start: seg.start, end: seg.start + seg.duration };
      continue;
    }

    // RULE 2: Current is INCOMPLETE — check if we should merge with next
    const mergedWords = current.text.split(/\s+/).length + seg.text.split(/\s+/).length;
    const withinHardCeiling = mergedWords <= HARD_CEILING;

    // Only merge if: next is a fragment/continuation AND we won't exceed ceiling
    if (withinHardCeiling) {
      current.text += ' ' + seg.text;
      current.end = seg.start + seg.duration;
    } else {
      // Even incomplete segments must be saved if they'd exceed ceiling
      result.push({ text: current.text.trim(), start: current.start, duration: Math.round((current.end - current.start) * 100) / 100 });
      current = { text: seg.text, start: seg.start, end: seg.start + seg.duration };
    }
  }

  // Push last
  result.push({ text: current.text.trim(), start: current.start, duration: Math.round((current.end - current.start) * 100) / 100 });

  return result;
}

function groupShortSentences(segments, target) {
  // If we have more than target, merge consecutive short sentences
  if (segments.length <= target) return segments;

  const result = [];
  let i = 0;

  while (i < segments.length && result.length < target) {
    const curr = segments[i];
    const currWords = curr.text.split(/\s+/).length;
    const remaining = segments.length - i;
    const slotsLeft = target - result.length;

    // Merge with next if: we still need to reduce, current is short, and there's a next
    if (remaining > slotsLeft && currWords < 12 && i + 1 < segments.length) {
      const next = segments[i + 1];
      result.push({
        text: curr.text + ' ' + next.text,
        start: curr.start,
        duration: Math.round(((next.start + next.duration) - curr.start) * 100) / 100
      });
      i += 2;
    } else {
      result.push(curr);
      i++;
    }
  }

  return result;
}

function polishSegment(text) {
  let t = text.trim();
  // Remove leading/trailing whitespace
  // Capitalize first letter
  if (t.length > 0) t = t.charAt(0).toUpperCase() + t.slice(1);
  // Ensure ends with punctuation
  if (!/[.!?]"?\s*$/.test(t)) t += '.';
  return t;
}

function formatSegments(rawSegments) {
  log(`  Formatting ${rawSegments.length} raw segments...`);

  // Step 1: Split multi-sentence segments into sentence-level chunks
  const split = splitIntoSentences(rawSegments);
  log(`    After sentence split: ${split.length} chunks`);
  log(`    Dialogue turns detected: ${split.filter(s => s.isDialogueTurn).length}`);

  // Step 1.5: Anti-dangling regex — strip periods from dangling prepositions/articles
  // YouTube auto-captions often put periods after prepositions: "Walk slowly and." → merge with next
  for (let i = 0; i < split.length; i++) {
    const text = split[i].text.trim();
    // Check if segment ends with a dangling word + period
    if (DANGLING_WORDS.test(text) && /[.!?]$/.test(text)) {
      // Strip the period — this is not a real sentence ending
      split[i].text = text.replace(/[.!?]+$/, '').trim();
      split[i].isFragment = true; // Mark as needing merge
      log(`    🔧 Anti-dangling: stripped period from "${text.slice(-20)}"`);
    }
  }

  // Step 2: Deduplicate by normalized text
  const seen = new Set();
  const deduped = [];
  for (const seg of split) {
    const key = seg.text.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
    if (!seen.has(key) && key.length > 3) {
      seen.add(key);
      deduped.push(seg);
    }
  }
  log(`    After dedup: ${deduped.length} chunks`);
  log(`    Dialogue turns after dedup: ${deduped.filter(s => s.isDialogueTurn).length}`);

  // Step 3: Merge fragments into complete sentences
  const merged = mergeFragments(deduped);
  log(`    After fragment merge: ${merged.length} segments`);

  // Step 4: Combine consecutive short non-flagged segments
  // ONLY merge tiny fragments (<4 words) that don't end with terminal punctuation
  // NEVER merge complete sentences (ending with .?!) — they are complete thoughts
  const combined = [];
  let buffer = merged[0] || null;

  for (let i = 1; i < merged.length; i++) {
    const seg = merged[i];
    const bufWords = buffer ? buffer.text.split(/\s+/).length : 0;
    const bufHasFlag = buffer && buffer.isDialogueTurn;
    const segHasFlag = seg.isDialogueTurn;

    // Check if buffer ends with terminal punctuation (complete sentence)
    const bufEndsSentence = buffer && /[.!?]"?\s*$/.test(buffer.text.trim());
    const bufIsTiny = bufWords < 4;

    // Combine ONLY if: buffer is tiny (<4 words) AND doesn't end with sentence punctuation
    // AND no turn flags AND combined won't exceed HARD_CEILING
    const combinedWords = bufWords + seg.text.split(/\s+/).length;
    if (buffer && !bufHasFlag && !segHasFlag && bufIsTiny && !bufEndsSentence && combinedWords <= HARD_CEILING) {
      buffer = {
        text: buffer.text + ' ' + seg.text,
        start: buffer.start,
        duration: Math.round(((seg.start + seg.duration) - buffer.start) * 100) / 100
      };
    } else {
      // Save buffer and start new
      if (buffer) combined.push(buffer);
      buffer = seg;
    }
  }
  if (buffer) combined.push(buffer);
  log(`    After combine short: ${combined.length} segments`);

  // Step 5: Group short sentences to fit ≤ MAX_SEGMENTS
  let final = combined;
  if (combined.length > MAX_SEGMENTS) {
    final = groupShortSentences(combined, MAX_SEGMENTS);
    log(`    After grouping: ${final.length} segments`);
  }

  // Step 6: Polish — capitalize, punctuation
  const polished = final.map((seg, i) => ({
    id: i + 1,
    text: polishSegment(seg.text),
    vi: null,
    start: seg.start,
    duration: seg.duration
  }));

  log(`    Final count: ${polished.length} segments`);
  return polished;
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

      // Optional: filter by week number (e.g., "01")
      if (WEEK_ONLY && weekNum !== WEEK_ONLY) continue;

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
        const contentEn = extractContentEn(advPath);
        const syllabusMeta = readSyllabusMetadata(weekNum);
        let videoId = extractVideoId(advPath);
        let replaced = false;
        let result = null;

        log(`Title: "${title}"`);
        log(`Current videoId: ${videoId || 'NONE'}`);
        log(`  syllabusMeta: grammar="${syllabusMeta.grammarFocus}" vocab=${syllabusMeta.vocabWords.length} chunks=${syllabusMeta.readChunks.length}`);

        // Verify current video (or skip if --force-search)
        if (videoId && !FORCE_SEARCH) {
          const isWorking = await verifyVideo(videoId);
          if (isWorking) {
            log(`✅ Current video ${videoId} is WORKING`);
            summary.keptVideos.push({ week: weekNum, videoId, title });
          } else {
            log(`❌ Current video ${videoId} is DEAD — searching for replacement...`);
            result = await searchVideo(title, contentEn, syllabusMeta, weekNum);
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
        } else if (videoId && FORCE_SEARCH) {
          // --force-search: Audit current video against new candidates
          log(`🔍 AUDIT MODE: Evaluating current video ${videoId} against new candidates...`);

          // First, score the current video
          const currentScore = await scoreExistingVideo(videoId, title, contentEn, syllabusMeta);
          log(`📊 Current video score: ${currentScore}`);

          // Then search for better candidates
          result = await searchVideo(title, contentEn, syllabusMeta, weekNum);

          // Replace if: new score is higher OR new has better caption quality
          const captionUpgrade = result.captionQuality === 'manual_punctuated' && currentScore < 90;
          const scoreHigher = result.score > currentScore;
          const scoreClose = result.score >= currentScore - 5 && captionUpgrade;

          if (scoreHigher || scoreClose) {
            log(`📊 Replacing: current=${currentScore} (${result.captionQuality}) → new=${result.score}`);
            videoId = result.videoId;
            replaced = true;
            summary.replacedVideos.push({
              week: weekNum,
              oldVideoId: videoId,
              newVideoId: result.videoId,
              title: result.title
            });
            log(`🆕 Replacement found: ${videoId} "${result.title}" (${result.duration}s, ${result.captionQuality})`);
          } else {
            log(`📊 Keeping current video (score: ${currentScore} vs ${result.score})`);
            summary.keptVideos.push({ week: weekNum, videoId, title });
          }
        } else {
          // No videoId at all — search for one
          log(`⚠️  No videoId found — searching...`);
          result = await searchVideo(title, contentEn, syllabusMeta, weekNum);
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

        // Fetch transcript (use cached from search if available, otherwise fetch fresh)
        let rawSegments;
        let captionQuality = 'unknown';
        if (result && result.transcript && result.transcript.length > 0) {
          rawSegments = result.transcript;
          captionQuality = result.captionQuality || 'unknown';
          log(`  Using ${rawSegments.length} segments from search cache (${captionQuality})`);
        } else {
          const transcriptResult = await fetchTranscript(videoId);
          rawSegments = transcriptResult.segments || [];
          captionQuality = transcriptResult.quality || 'unknown';
        }

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
