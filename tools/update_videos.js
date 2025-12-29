import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const ROOT_DIR = path.resolve(path.dirname(__filename), '..');
const OVERRIDE_FILE = path.join(ROOT_DIR, 'src/data/video_tasks.json');

// --- API KEY AUTO-LOADING FROM API keys.txt ---
const loadApiKeys = () => {
    const keyFilePath = path.join(ROOT_DIR, 'API keys.txt');
    if (fs.existsSync(keyFilePath)) {
        try {
            const content = fs.readFileSync(keyFilePath, 'utf8');
            const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
            const keys = { youtube: [], gemini: [], google_tts: [], openai: [] };
            lines.forEach(line => {
                if (line.includes('Youtube Data API')) {
                    const matches = line.match(/AIzaSy[a-zA-Z0-9_-]+/g) || [];
                    keys.youtube.push(...matches);
                } else if (line.includes('GEMINI_API_KEY')) {
                    const matches = line.match(/AIzaSy[a-zA-Z0-9_-]+/g) || [];
                    keys.gemini.push(...matches);
                } else if (line.includes('Google Cloude Text to speech')) {
                    const match = line.match(/AIzaSy[a-zA-Z0-9_-]+/);
                    if (match) keys.google_tts.push(match[0]);
                } else if (line.includes('OpenAI TTS')) {
                    const match = line.match(/sk-proj-[a-zA-Z0-9_-]+/);
                    if (match) keys.openai.push(match[0]);
                } else {
                    const aiMatch = line.match(/AIzaSy[a-zA-Z0-9_-]+/);
                    if (aiMatch && !keys.youtube.includes(aiMatch[0])) keys.youtube.push(aiMatch[0]);
                }
            });
            return keys;
        } catch (e) {
            console.warn('⚠️  Failed to read API keys.txt:', e.message);
        }
    }
    return null;
};

const apiKeys = loadApiKeys();
let API_KEY = process.env.YOUTUBE_API_KEY || "";
if (!API_KEY && apiKeys && apiKeys.youtube.length > 0) {
    API_KEY = apiKeys.youtube[0];
    console.log(`✅ Loaded YouTube API key from API keys.txt`);
} 

const WHITELIST = [
  "English Singsing", "Super Simple Songs", "British Council", "WOW English", 
  "Dream English", "Numberblocks", "SciShow Kids", "Nat Geo Kids", 
  "Smile and Learn", "Homeschool Pop", "Storyline Online", "Peppa Pig", 
  "Cocomelon", "Little Baby Bum", "Dr Binocs", "Happy Learning", "Jack Hartmann"
];

// Fallback videos by purpose - all ESL kids appropriate
const FALLBACK_VIDEOS = {
  GRAMMAR: { id: "ZBGr2qbzYoo", title: "English Singsing - Grammar for Kids", duration: "03:30", sim_duration: 210 },
  TOPIC: { id: "mXMofxtDPUQ", title: "Vocabulary for Kids - English Singsing", duration: "04:00", sim_duration: 240 },
  SCIENCE: { id: "V4Ij8hE5TsI", title: "Science for Kids - Learning Video", duration: "05:00", sim_duration: 300 },
  DEFAULT: { id: "e54m6XOpRgU", title: "English for Kids - Super Simple Songs", duration: "03:00", sim_duration: 180 }
};
const MIN_DURATION = 60;   // Minimum 1 minute - avoid shorts
const MAX_DURATION = 900;  // Maximum 15 minutes

const extractVideoId = (url) => {
  const patterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/, /^([a-zA-Z0-9_-]{11})$/];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return url;
};

const getDetails = (id) => new Promise((resolve) => {
  if (!API_KEY || !id) return resolve(null);
  https.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${id}&key=${API_KEY}`, (res) => {
    let d = ''; res.on('data', c=>d+=c);
    res.on('end', () => { 
      try { 
        const j = JSON.parse(d); 
        if (j.items?.length) {
          const item = j.items[0];
          const dur = parseDuration(item.contentDetails.duration);
          return resolve({ ...dur, title: item.snippet.title });
        }
        resolve(null); 
      } catch { resolve(null); } 
    });
  });
});

const parseDuration = (iso) => {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const h=parseInt(match[1]||0), m=parseInt(match[2]||0), s=parseInt(match[3]||0);
  return { duration: `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`, sim_duration: h*3600+m*60+s };
};

// Extract meaningful keywords from query (ignore common words)
const STOP_WORDS = ['for', 'kids', 'children', 'song', 'video', 'esl', 'english', 'learn', 'learning', 'educational', 'the', 'and', 'with', 'story', 'stories'];

// CRITICAL keywords - if query contains KEY, title MUST contain one of VALUES
const GRAMMAR_REQUIREMENTS = {
  'was were': ['was', 'were', 'verb to be'],           // Must have was/were
  'there was': ['there was', 'there were'],            // Must have "there was/were"
  'there were': ['there was', 'there were'],
  'can cannot': ['can', "can't", 'cannot'],
  'present simple': ['present simple', 'do does', 'every day'],
  'present continuous': ['present continuous', 'ing', 'now'],
};

const extractKeywords = (query) => {
  return query.toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.includes(w));
};

// Check if video title matches query - STRICT for grammar, looser for topics
const titleMatchesQuery = (title, query, purpose = 'TOPIC') => {
  const titleLower = title.toLowerCase();
  const queryLower = query.toLowerCase();
  
  // For GRAMMAR: Must contain the actual grammar structure
  if (purpose === 'GRAMMAR') {
    // Check GRAMMAR_REQUIREMENTS first - these are MANDATORY
    for (const [pattern, required] of Object.entries(GRAMMAR_REQUIREMENTS)) {
      if (queryLower.includes(pattern)) {
        // MUST have at least one of the required words/phrases in title
        const hasRequired = required.some(r => titleLower.includes(r));
        return hasRequired; // Return immediately - no fallback
      }
    }
    
    // For grammar queries without specific requirements:
    // Accept if title contains "grammar" explicitly
    if (titleLower.includes('grammar')) return true;
    
    // Or 50% of keywords must match
    const keywords = extractKeywords(query);
    const matchCount = keywords.filter(kw => titleLower.includes(kw)).length;
    return matchCount >= Math.ceil(keywords.length * 0.5);
  }
  
  // For TOPIC/SCIENCE: 30% keyword match (more lenient)
  const keywords = extractKeywords(query);
  const matchCount = keywords.filter(kw => titleLower.includes(kw)).length;
  const minMatches = Math.max(1, Math.ceil(keywords.length * 0.3));
  return matchCount >= minMatches;
};

const search = async (q, usedVideoIds = new Set(), purpose = 'TOPIC') => {
  if(!API_KEY) return null;
  return new Promise((resolve) => {
    https.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q + " for kids")}&type=video&safeSearch=strict&maxResults=20&videoEmbeddable=true&key=${API_KEY}`, (res) => {
      let d=''; res.on('data', c=>d+=c);
      res.on('end', async () => {
        try {
          const j=JSON.parse(d);
          if(!j.items || j.items.length === 0) {
            console.log(`      🔍 No results for: "${q}"`);
            return resolve(null);
          }
          
          // Priority 1: Whitelist channels + title matches query + not used
          const whitelistVideos = j.items.filter(i => WHITELIST.some(w => i.snippet.channelTitle.toLowerCase().includes(w.toLowerCase())));
          for (const vid of whitelistVideos) {
            if (usedVideoIds.has(vid.id.videoId)) continue;
            const matches = titleMatchesQuery(vid.snippet.title, q, purpose);
            if (!matches) continue;
            const det = await getDetails(vid.id.videoId);
            if (det && det.sim_duration >= MIN_DURATION && det.sim_duration <= MAX_DURATION) {
              return resolve({ id: vid.id.videoId, title: vid.snippet.title });
            }
          }
          
          // Priority 2: Safe videos + title matches query + not used
          // Filter out: non-English, music videos, covers, lyrics, karaoke
          const safeVideos = j.items.filter(i => {
            const title = i.snippet.title.toLowerCase();
            // Exclude non-English
            if (/spanish|español|niños|russ|arab|hindi|shorts|português|française|deutsch|italiano|日本語|한국어|中文/i.test(title)) return false;
            // Exclude music videos, covers, lyrics (not educational)
            if (/official music video|cover|lyrics|karaoke|mv|remix|ft\.|feat\./i.test(title)) return false;
            return true;
          });
          for (const vid of safeVideos) {
            if (usedVideoIds.has(vid.id.videoId)) continue;
            const matches = titleMatchesQuery(vid.snippet.title, q, purpose);
            if (!matches) continue;
            const det = await getDetails(vid.id.videoId);
            if (det && det.sim_duration >= MIN_DURATION && det.sim_duration <= MAX_DURATION) {
              return resolve({ id: vid.id.videoId, title: vid.snippet.title });
            }
          }
          
          // Debug: show first few results that didn't match
          console.log(`      🔍 "${q}" → ${j.items.length} results, none matched ${purpose} filter`);
          resolve(null);
        } catch(e) { 
          console.log(`      ❌ Error: ${e.message}`);
          resolve(null); 
        }
      });
    });
  });
};
const getMasterQueriesPath = (weekId) => {
  const weekStr = String(weekId).padStart(2, '0');
  return path.join(ROOT_DIR, `src/data/weeks/week_${weekStr}/video_queries.json`);
};

const readMasterQueries = (weekId) => {
  const filePath = getMasterQueriesPath(weekId);
  if (!fs.existsSync(filePath)) return null;
  try { return JSON.parse(fs.readFileSync(filePath, 'utf-8')); } catch { return null; }
};

const writeMasterQueries = (weekId, queries) => {
  const filePath = getMasterQueriesPath(weekId);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(queries, null, 2));
  console.log(`   📝 Saved master queries to video_queries.json`);
};

const parseExistingVideos = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const videos = [];
    const videoRegex = /\{\s*id:\s*(\d+),\s*title:\s*"([^"]*)",\s*videoId:\s*"([^"]*)",\s*duration:\s*"([^"]*)",\s*sim_duration:\s*(\d+),\s*thumb:\s*"([^"]*)"\s*\}/g;
    let match;
    while ((match = videoRegex.exec(content)) !== null) {
      videos.push({ id: parseInt(match[1]), title: match[2], videoId: match[3], duration: match[4], sim_duration: parseInt(match[5]), thumb: match[6] });
    }
    if (videos.length > 0) console.log(`   �� Found ${videos.length} existing videos`);
    return videos;
  } catch { return []; }
};

const update = async (weekId, tasks, isReset = false) => {
  console.log(`\n📺 ${isReset ? 'RESET' : 'Updating'} Week ${weekId}...`);
  const weekStr = String(weekId).padStart(2, '0');
  const outPath = path.join(ROOT_DIR, `src/data/weeks/week_${weekStr}/daily_watch.js`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  
  const existingVideos = isReset ? [] : parseExistingVideos(outPath);
  const videoMap = new Map();
  existingVideos.forEach(v => videoMap.set(v.id, v));
  
  // Track used videoIds to avoid duplicates
  const usedVideoIds = new Set();
  
  for(const t of tasks) {
    let vid = null, det = null;
    const purpose = t.purpose || 'DEFAULT';
    
    if (t.videoId) {
      const videoId = extractVideoId(t.videoId);
      if (!usedVideoIds.has(videoId)) {
        det = await getDetails(videoId);
        if (det && det.sim_duration <= MAX_DURATION) {
          vid = { id: videoId, title: det.title || t.title || "Custom Video" };
          console.log(`   🎬 Using provided videoId: ${videoId}`);
        } else if (det) console.log(`   ⚠️  Video too long (${det.duration}), searching...`);
      }
    }
    
    if (!vid && t.query) {
      vid = await search(t.query, usedVideoIds, purpose);
      if (!vid && t.backup_query) {
        console.log(`   ⚠️  No video for #${t.id}, trying backup...`);
        vid = await search(t.backup_query, usedVideoIds, purpose);
      }
    }
    
    // Use purpose-specific fallback instead of random Peppa Pig
    if (!vid) { 
      const fallback = FALLBACK_VIDEOS[purpose] || FALLBACK_VIDEOS.DEFAULT;
      // Check if fallback is already used
      if (usedVideoIds.has(fallback.id)) {
        // Use DEFAULT as ultimate fallback
        vid = FALLBACK_VIDEOS.DEFAULT;
      } else {
        vid = fallback;
      }
      console.log(`   ⚠️  Using ${purpose} fallback for #${t.id}`); 
    }
    
    // Mark this videoId as used
    usedVideoIds.add(vid.id);
    
    det = await getDetails(vid.id);
    const dur = det ? det.duration : "05:00";
    const sim = det ? det.sim_duration : 300;
    
    console.log(`   ✅ [${t.id}] ${vid.title.substring(0,45)}... (${dur})`);
    videoMap.set(t.id, { id: t.id, title: vid.title.replace(/"/g, "'").replace(/&amp;/g, '&'), videoId: vid.id, duration: dur, sim_duration: sim, thumb: `https://img.youtube.com/vi/${vid.id}/mqdefault.jpg` });
  }
  
  const finalVideos = Array.from(videoMap.values()).sort((a, b) => a.id - b.id);
  if (finalVideos.length === 0) { console.log(`   ❌ No videos!`); return; }
  
  const lines = finalVideos.map(v => `    { id: ${v.id}, title: "${v.title}", videoId: "${v.videoId}", duration: "${v.duration}", sim_duration: ${v.sim_duration}, thumb: "${v.thumb}" }`);
  const content = `export default {\n  videos: [\n${lines.join(',\n')}\n  ],\n  bonus_games: [{title: "Game", url: "#", description: "Review"}]\n};`;

  fs.writeFileSync(outPath, content);
  console.log(`   💾 Saved ${finalVideos.length} videos`);
  
  const easyPath = path.join(ROOT_DIR, `src/data/weeks_easy/week_${weekStr}/daily_watch.js`);
  fs.mkdirSync(path.dirname(easyPath), { recursive: true });
  fs.writeFileSync(easyPath, content);
  console.log(`   ✅ Synced Easy mode`);
};

const main = async () => {
  const args = process.argv.slice(2);
  const isReset = args.includes('--reset');
  const weekArg = args.find(a => !a.startsWith('--'));
  const targetWeek = weekArg ? parseInt(weekArg) : null;
  
  console.log(`\n🎬 VIDEO UPDATE TOOL`);
  console.log(`   Mode: ${isReset ? 'RESET (master queries)' : 'UPDATE (merge)'}`);
  if (targetWeek) console.log(`   Target: Week ${targetWeek}`);
  
  let overrides = [];
  if (fs.existsSync(OVERRIDE_FILE)) {
    try { overrides = JSON.parse(fs.readFileSync(OVERRIDE_FILE, 'utf-8')); if (!Array.isArray(overrides)) overrides = []; } catch { overrides = []; }
  }
  
  const weeksToProcess = new Set();
  overrides.forEach(o => { if (!targetWeek || o.weekId === targetWeek) weeksToProcess.add(o.weekId); });
  if (targetWeek && !weeksToProcess.has(targetWeek)) weeksToProcess.add(targetWeek);
  
  if (weeksToProcess.size === 0) {
    console.log(`\n❌ No weeks to process!`);
    console.log(`   Usage: node tools/update_videos.js 19`);
    console.log(`          node tools/update_videos.js 19 --reset`);
    return;
  }
  
  for (const weekId of weeksToProcess) {
    const masterQueries = readMasterQueries(weekId);
    const override = overrides.find(o => o.weekId === weekId);
    
    if (isReset) {
      if (!masterQueries) { console.log(`\n⚠️  Week ${weekId}: No master queries!`); continue; }
      await update(weekId, masterQueries.videos, true);
    } else if (override && override.videos?.length > 0) {
      console.log(`   �� Override: ${override.videos.length} videos`);
      await update(weekId, override.videos, false);
    } else if (masterQueries) {
      await update(weekId, masterQueries.videos, false);
    } else {
      console.log(`\n⚠️  Week ${weekId}: No queries found!`);
    }
  }
  
  console.log(`\n🎉 Done!`);
};

export { writeMasterQueries, update };
main();
