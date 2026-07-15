// tools/image_pipeline/orchestrator.mjs
//
// Full image generation pipeline for W30-35 covers across all station types.
//
// Flow per unique image file:
//   1. Read source week data → extract per-slot context (word/phrase/title/topic)
//   2. Build slot-appropriate prompt (vocab=word+def, covers=title+theme, etc)
//   3. Call Nano Banana (Gemini 3 Pro Image Preview) free tier
//   4. Save local to public/images/weekN/  (idempotent: skip if file already exists)
//   5. Upload to R2 engquest-images bucket via wrangler
//   6. Replace all /images/weekN/file.jpg refs in source js with R2 CDN URL
//
// State tracked at .ai/memory/image_pipeline_state.json — resume-safe.
//
// Usage:
//   node tools/image_pipeline/orchestrator.mjs --week 30
//   node tools/image_pipeline/orchestrator.mjs --week 30..35
//   node tools/image_pipeline/orchestrator.mjs --week 30 --dry-run
//   node tools/image_pipeline/orchestrator.mjs --week 30 --skip-upload   (local only)
//   node tools/image_pipeline/orchestrator.mjs --week 30 --skip-update   (no source edit)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');

const R2_BUCKET    = 'engquest-images';
const R2_CDN_BASE  = 'https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev';
const MODEL        = process.env.IMG_MODEL || 'gemini-2.5-flash-image';   // 'gemini-2.5-flash-image' | 'sd3-medium' | 'flux-schnell'
const STATE_FILE   = path.join(ROOT, '.ai', 'memory', 'image_pipeline_state.json');

// ─── Image style templates ──────────────────────────────────────────────────
// FLUX.1-schnell: describe only what SHOULD appear; never mention text/watermark
const STYLE_SQUARE = `
Square 1:1 digital illustration for a children's education app.
Clean, friendly cartoon style with soft pastel colours.
One central object or scene on a plain light background, no words, no letters, no signs.
`;

const STYLE_WIDE = `
Wide 16:9 digital banner illustration for a children's education app.
Friendly cartoon style, soft pastel colours, clear focal point.
Full scene on a plain background, no words, no letters, no signs.
`;

const STYLE_CARD = `
Square 1:1 digital card illustration for a children's vocabulary game.
Clean, friendly cartoon style, bright colours, simple composition.
One object or scene on a plain background, no words, no letters, no signs.
`;

// ─── CLI parsing ────────────────────────────────────────────────────────────
function parseArgs() {
  const a = process.argv.slice(2);
  const o = { weeks: [], dryRun: false, skipUpload: false, skipUpdate: false, only: [], force: false };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '--week') {
      const v = a[++i];
      if (v.includes('..')) { const [f, t] = v.split('..').map(Number); for (let w = f; w <= t; w++) o.weeks.push(w); }
      else o.weeks = v.split(',').map(Number);
    } else if (a[i] === '--dry-run')     o.dryRun = true;
    else if (a[i] === '--skip-upload')   o.skipUpload = true;
    else if (a[i] === '--skip-update')   o.skipUpdate = true;
    else if (a[i] === '--only')          o.only = a[++i].split(',').map(s => s.trim());
    else if (a[i] === '--force')          o.force = true;
  }
  if (!o.weeks.length) { console.error('Usage: --week N | --week from..to'); process.exit(1); }
  return o;
}

// ─── State persistence ──────────────────────────────────────────────────────
function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8')); } catch { return {}; }
}
function saveState(state) {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ─── API key loader (mirrors test_nano_banana.js) ───────────────────────────
function loadApiKeys() {
  const keys = [];

  // 1. Load VITE_GEMINI_API_KEY from .env (primary — last declared wins for override)
  try {
    const envPath = path.join(ROOT, '.env');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    // Use a regex with global flag and take the LAST match (override semantics)
    const allMatches = [...envContent.matchAll(/^VITE_GEMINI_API_KEY=([^\s\n]+)/gm)];
    if (allMatches.length) {
      // Last entry wins
      keys.push(allMatches[allMatches.length - 1][1]);
    }
  } catch { /* .env not present — continue */ }

  // 2. Load additional keys from API keys.txt (backup, may be expired)
  try {
    const content = fs.readFileSync(path.join(ROOT, 'API keys.txt'), 'utf-8');
    let inG = false;
    for (const line of content.split('\n')) {
      if (line.includes('GEMINI_API_KEY')) {
        inG = true;
        const m = line.match(/(AIzaSy[a-zA-Z0-9_-]+|AQ\.[a-zA-Z0-9_-]+)/);
        if (m) keys.push(m[1]);
      } else if (inG && line.trim().match(/^(AIzaSy|AQ\.)/)) {
        const m = line.match(/(AIzaSy[a-zA-Z0-9_-]+|AQ\.[a-zA-Z0-9_-]+)/);
        if (m) keys.push(m[1]);
      } else if (line.trim() && !line.trim().match(/^(AIzaSy|AQ\.)/) && inG) inG = false;
    }
  } catch { /* API keys.txt not present */ }

  return keys;
}

function loadHfToken() {
  try {
    const envContent = fs.readFileSync(path.join(ROOT, '.env'), 'utf-8');
    // VITE_HF_TOKEN takes priority — last defined wins (override semantics)
    const viteMatches = [...envContent.matchAll(/^VITE_HF_TOKEN=([^\s\n]+)/gm)];
    if (viteMatches.length) return viteMatches[viteMatches.length - 1][1];
    const plainMatches = [...envContent.matchAll(/^HF_TOKEN=([^\s\n]+)/gm)];
    if (plainMatches.length) return plainMatches[plainMatches.length - 1][1];
    return null;
  } catch { return null; }
}

const API_KEYS = loadApiKeys();
const HF_TOKEN = loadHfToken();
let keyIdx = 0;

// ─── Image generation — multi-backend dispatcher ────────────────────────────
// MODEL env var selects backend:
//   'sd3-medium'             → Stability AI SD3-medium via HF (best no-text support)
//   'flux-schnell'           → Hugging Face FLUX.1-schnell (fast, but generates text)
//   'gemini-2.5-flash-image' → Google Gemini free-tier

async function generateGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEYS[keyIdx]}`;
  const payload = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 8192,
      responseModalities: ["TEXT", "IMAGE"],
    },
  });
  const res = await fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { throw new Error(`HTTP ${res.status} non-JSON: ${text.slice(0, 200)}`); }
  if (json.error) {
    const msg = (json.error.message || '').toLowerCase();
    if (msg.includes('key') || msg.includes('expired') || msg.includes('invalid'))
      throw new Error('KEY_INVALID');
    if (msg.includes('quota') || json.error.code === 429)
      throw new Error(`QUOTA: ${json.error.message}`);
    throw new Error(`API: ${json.error.message}`);
  }
  const d = json.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!d) throw new Error('No image data returned');
  return Buffer.from(d, 'base64');
}

const NEGATIVE_PROMPT = 'text, letters, words, writing, captions, labels, signs, watermark, logo, signature, font, typography, title, header, banner, alphanumeric, alphabet, numbers, digits, book covers, screens, displays, UI, blurry, low quality, distorted';

async function generateSd3Medium(prompt) {
  if (!HF_TOKEN) throw new Error('HF_TOKEN not found in .env');
  const url = 'https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-3-medium-diffusers';
  const payload = JSON.stringify({
    inputs: prompt.trim(),
    parameters: {
      width: 1024,
      height: 1024,
      num_inference_steps: 25,
      guidance_scale: 7.5,
      negative_prompt: NEGATIVE_PROMPT,
    },
  });
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${HF_TOKEN}` },
    body: payload,
  });
  const ct = res.headers.get('content-type') || '';
  if (!res.ok) {
    const body = await res.text();
    if (res.status === 429) throw new Error(`QUOTA: HF rate limit - ${body.slice(0, 100)}`);
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
  }
  if (!ct.startsWith('image/')) {
    const body = await res.text();
    throw new Error(`Non-image response (${ct}): ${body.slice(0, 200)}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1000) throw new Error(`Image too small (${buf.length} bytes)`);
  return buf;
}

async function generateFluxSchnell(prompt) {
  if (!HF_TOKEN) throw new Error('HF_TOKEN not found in .env');
  const url = 'https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell';
  // FLUX is sensitive to negative text — we use positive-only scene descriptions
  const cleanedPrompt = prompt.trim()
    + '. Pure visual scene. No text, no letters, no writing, no captions, no labels, no signs, no watermarks anywhere in the image.';
  const payload = JSON.stringify({
    inputs: cleanedPrompt,
    parameters: { width: 1024, height: 1024, num_inference_steps: 4 },
  });
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${HF_TOKEN}` },
    body: payload,
  });
  const ct = res.headers.get('content-type') || '';
  if (!res.ok) {
    const body = await res.text();
    if (res.status === 429) throw new Error(`QUOTA: HF rate limit - ${body.slice(0, 100)}`);
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
  }
  if (!ct.startsWith('image/')) {
    const body = await res.text();
    throw new Error(`Non-image response (${ct}): ${body.slice(0, 200)}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1000) throw new Error(`Image too small (${buf.length} bytes)`);
  return buf;
}

async function generateImage(prompt) {
  if (MODEL === 'sd3-medium')   return generateSd3Medium(prompt);
  if (MODEL === 'flux-schnell') return generateFluxSchnell(prompt);
  return generateGemini(prompt);
}

// ─── Wrangler R2 upload ─────────────────────────────────────────────────────
function uploadToR2(localPath, rk) {
  try {
    execFileSync('npx', ['wrangler', 'r2', 'object', 'put',
      `${R2_BUCKET}/${rk}`, `--file=${localPath}`, '--remote'],
      { stdio: 'pipe', timeout: 60_000 });
    return true;
  } catch (e) {
    console.error(`    wrangler error: ${e.message?.slice(0, 200)}`);
    return false;
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────
const pad2 = n => String(n).padStart(2, '0');
const cleanPath = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function stripBold(s) { return s?.replace(/\*\*([^*]+)\*\*/g, '$1') || ''; }

// ─── Reference prompt map (Production_FINAL vetted prompts) ───────────────
// Maps local image path (e.g. "week32/vocab_early.jpg") to the exact verified
// prompt from Production_FINAL. Uses these when available (overriding auto-generated)
// for consistency with previously-vetted image quality.
let REFERENCE_PROMPTS = {};
try {
  const mapPath = path.join(__dirname, 'prompts_map.json');
  REFERENCE_PROMPTS = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
} catch {
  // ignore — fall back to auto-generated prompts
}

const STYLE_SUFFIX = 'Watercolor illustration style. Soft, child-friendly colours, gentle hand-painted texture. No text, no letters, no words, no labels, no watermarks, no signs anywhere in the image.';

function extractField(text, key) {
  const re = new RegExp(`^\\s*${key}:\\s*["'\`]([^"'\`]*?)["'\`]`, 'm');
  const m = text.match(re);
  return m ? m[1].trim() : null;
}

// ─── Scan all source files for a week → build unique image tasks ────────────
function scanWeek(week) {
  const tasks = [];  // { localPath, ref, sourceFiles[], slot, context }

  for (const modeTag of ['ADV', 'EASY']) {
    const base = modeTag === 'EASY'
      ? path.join(ROOT, 'src', 'data', 'weeks_easy', `week_${pad2(week)}`)
      : path.join(ROOT, 'src', 'data', 'weeks',      `week_${pad2(week)}`);
    if (!fs.existsSync(base)) continue;

    // Pre-load all files + their refs for primary-file lookup
    const fileCache = {};  // fname → {fp, raw, slot, refs}
    for (const fname of fs.readdirSync(base).filter(f => f.endsWith('.js'))) {
      const fp  = path.join(base, fname);
      const raw = fs.readFileSync(fp, 'utf-8');
      fileCache[fname] = { fp, raw, slot: slotType(fname), refs: extractRefs(fname, raw) };
    }

    for (const fname of Object.keys(fileCache)) {
      if (SKIP_FILES.has(fname)) continue;  // skip out-of-scope stations
      const { fp: sourceFp, raw: sourceRaw, refs } = fileCache[fname];
      for (const ref of refs) {
        // Infer correct slot from filename, not from the file that happens to mention it
        const inferredSlot = inferSlot(ref);
        if (!inferredSlot) continue; // skip out-of-scope slots (e.g. mission covers)
        const lp = path.join(ROOT, 'public', ref);

        const existing = tasks.find(t => t.ref === ref);
        if (existing) {
          existing.sourceFiles.push(sourceFp);
        } else {
          // Find the "primary" file for this image to build context
          let ctxFile = fname, ctxRaw = sourceRaw;
          for (const priority of SLOT_PRIORITY) {
            if (fileCache[priority]?.refs.includes(ref)) {
              ctxFile = fileCache[priority].fp;
              ctxRaw  = fileCache[priority].raw;
              break;
            }
          }
          tasks.push({
            ref,
            localPath: lp,
            sourceFiles: [sourceFp],
            slot: inferredSlot,
            week,
            context: buildContext(path.basename(ctxFile), ctxRaw, ref),
          });
        }
      }
    }
  }
  return tasks;
}

function slotType(fname) {
  if (fname === 'vocab.js')             return 'vocab';
  if (fname === 'word_power.js')        return 'word_power';
  if (fname === 'read.js')              return 'read_cover';
  if (fname === 'explore.js')           return 'explore_cover';
  if (fname === 'singapore_math.js')    return 'math_cover';
  if (fname === 'logic.js' || fname === 'logic_science.js') return 'logic_lab';
  if (fname === 'grammar.js')           return 'grammar_cover';
  if (fname === 'word_match.js')        return 'word_match';
  return 'other';
}

function extractRefs(fname, content) {
  const re = fname === 'word_match.js'
    ? /image:\s*["']([^"']+)["']/g
    : /image_url:\s*["']([^"']+)["']/g;
  return [...content.matchAll(re)]
    .map(m => m[1])
    // Normalize R2 URLs back to local /images/... paths (in case source was updated after upload)
    .map(p => p.startsWith(R2_CDN_BASE + '/') ? '/' + p.slice(R2_CDN_BASE.length + 1) : p)
    .filter(p => !p.includes('barmodel_'));
}

// Priority: which file "owns" a given image slot.
// Covers may be referenced by ask_ai/dictation/etc but context lives in the primary station file.
const SLOT_PRIORITY = ['read.js','explore.js','singapore_math.js','logic.js',
  'logic_science.js','grammar.js','vocab.js','word_power.js','word_match.js'];

// Skip these files from SCANNING entirely (out-of-scope stations)
// NOTE: word_match.js is NOT skipped — its refs must be included in source updates
const SKIP_FILES = new Set(['ask_ai.js','writing.js','games.js','dictation.js',
  'shadowing.js','shadowing_ipa.js','mindmap.js','daily_watch.js']);

function inferSlot(ref) {
  const b = path.basename(ref).toLowerCase();
  // SKIP: out-of-scope slots
  if (b.startsWith('mission'))         return null;   // AI Tutor missions
  if (b.startsWith('sparktalk_'))      return null;   // AI Tutor spark talk
  if (b.startsWith('story_'))          return null;   // writing station picture
  if (/^logic_q\d+_easy/.test(b))      return null;   // W31 EASY logic question images
  if (/^science_q\d+_easy/.test(b))    return null;   // W31 EASY science question images
  if (b.startsWith('read_cover'))      return 'read_cover';
  if (b.startsWith('explore_cover'))   return 'explore_cover';
  if (b.startsWith('math_cover'))      return 'math_cover';
  if (b.startsWith('logic_cover') || b.startsWith('logiclab_')) return 'logic_lab';
  if (b.startsWith('grammar_cover'))   return 'grammar_cover';
  if (b.startsWith('wordmatch_cover')) return 'word_match_cover';
  if (b.startsWith('wordpower_') || b.startsWith('wp_')) return 'word_power';
  if (b.startsWith('vocab_'))          return 'vocab';
  // Generic name like "artist.jpg", "engineer.jpg" — check vocab first
  return 'vocab';
}

// ─── Build per-slot context string for prompt ───────────────────────────────
function buildContext(fname, fileContent, ref) {
  const basename = path.basename(ref);
  const slug     = basename.replace(/\.(jpg|png)$/i, '').toLowerCase();

  // For vocab/word_match images we need per-word context
  if (fname === 'vocab.js') {
    // Parse all vocab entries with regex
    const entryRe = /\{[^{}]*?\}/g;
    const wordRe = /word:\s*["']([^"']+)["']/;
    const defRe  = /definition_en:\s*["']([^"']+)["']/;
    const entries = [...fileContent.matchAll(entryRe)]
      .map(m => m[0])
      .filter(b => wordRe.test(b));
    for (const block of entries) {
      const w = (block.match(wordRe) || [])[1] || '';
      const wSlug = w.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
      if (slug.includes(wSlug)) {
        const def = (block.match(defRe) || [])[1] || '';
        return { type: 'vocab', word: w, definition: stripBold(def) };
      }
    }
    // Fallback: derive word from filename
    const word = slug.replace(/^vocab_/, '').replace(/_/g, ' ');
    return { type: 'vocab', word, definition: '' };
  }

  if (fname === 'word_power.js') {
    const entryRe = /\{[^{}]*?\}/g;
    const wordRe = /word:\s*["']([^"']+)["']/;
    const defRe  = /definition_en:\s*["']([^"']+)["']/;
    const exRe   = /example:\s*["']([^"']+)["']/;
    const entries = [...fileContent.matchAll(entryRe)]
      .map(m => m[0])
      .filter(b => wordRe.test(b));
    const slugNorm = slug.replace(/^wordpower_|^wp_/, '');
    for (const block of entries) {
      const w = (block.match(wordRe) || [])[1] || '';
      const wSlug = w.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
      if (slugNorm.includes(wSlug)) {
        const def = (block.match(defRe) || [])[1] || '';
        const ex  = (block.match(exRe)  || [])[1] || '';
        return { type: 'word_power', phrase: w, definition: stripBold(def), example: stripBold(ex) };
      }
    }
    const phrase = slug.replace(/^wordpower_|^wp_/, '').replace(/_/g, ' ');
    return { type: 'word_power', phrase, definition: '', example: '' };
  }

  if (fname === 'read.js') {
    const title    = extractField(fileContent, 'title_en') || extractField(fileContent, 'title') || '';
    const contentF = (fileContent.match(/content_en:\s*[`"']([\s\S]*?)[`"'],?\s*\n/) || [])[1] || '';
    return { type: 'read_cover', title, snippet: stripBold(contentF).slice(0, 200) };
  }

  if (fname === 'explore.js') {
    const title    = extractField(fileContent, 'title_en') || extractField(fileContent, 'title') || '';
    const contentF = (fileContent.match(/content_en:\s*[`"']([\s\S]*?)[`"'],?\s*\n/) || [])[1] || '';
    return { type: 'explore_cover', title, snippet: stripBold(contentF).slice(0, 200) };
  }

  if (fname === 'singapore_math.js') {
    const title = extractField(fileContent, 'title') || '';
    const intro = extractField(fileContent, 'intro_en') || '';
    return { type: 'math_cover', title, intro };
  }

  if (fname === 'logic.js' || fname === 'logic_science.js') {
    const title = extractField(fileContent, 'title') || '';
    return { type: 'logic_lab', title };
  }

  if (fname === 'grammar.js') {
    const title = extractField(fileContent, 'title_en') || extractField(fileContent, 'title') || '';
    return { type: 'grammar_cover', title };
  }

  if (fname === 'word_match.js') {
    // Same images as vocab — derive word from filename
    const word = slug.replace(/_/g, ' ');
    return { type: 'word_match', word };
  }

  return { type: 'other', basename: path.basename(ref) };
}

// ─── Generate prompt per context type ───────────────────────────────────────
function makePrompt(ctx, week, ref) {
  // 1. If a vetted reference prompt exists for this exact file, use it
  const refKey = `week${week}/${ref ? path.basename(ref) : ''}`;
  if (ref && REFERENCE_PROMPTS[refKey]) {
    const refPrompt = REFERENCE_PROMPTS[refKey];
    // Determine aspect ratio suffix from slot type
    const isWide = ['read_cover', 'explore_cover'].includes(ctx.type);
    return refPrompt + '. ' + (isWide ? 'Wide 16:9 banner format.' : 'Square 1:1 format.') + ' ' + STYLE_SUFFIX;
  }

  switch (ctx.type) {
    case 'vocab':
      return `${STYLE_SQUARE}\nA scene showing: ${ctx.word}.\nMeaning: ${ctx.definition || ctx.word}.\n${STYLE_SUFFIX}`;

    case 'word_power':
      return `${STYLE_SQUARE}\nA scene of the action: ${ctx.phrase}.\nMeaning: ${ctx.definition || ctx.phrase}.\nExample: ${ctx.example}.\n${STYLE_SUFFIX}`;

    case 'read_cover':
      return `${STYLE_WIDE}\nA scene illustrating the children's story titled ${ctx.title}.\nStory theme: ${ctx.snippet}.\nMood: warm, inviting, age-appropriate.\n${STYLE_SUFFIX}`;

    case 'explore_cover':
      return `${STYLE_WIDE}\nA scene illustrating a topic for curious young learners: ${ctx.title}.\nTopic summary: ${ctx.snippet}.\n${STYLE_SUFFIX}`;

    case 'math_cover':
      return `${STYLE_SQUARE}\nA simple math scene with picnic-themed objects, baskets, sandwiches, fruits arranged for counting practice.\n${STYLE_SUFFIX}`;

    case 'logic_lab':
      return `${STYLE_SQUARE}\nA friendly science-themed scene: ${ctx.title}.\nSimple objects like plants, animals, weather elements.\n${STYLE_SUFFIX}`;

    case 'grammar_cover':
      return `${STYLE_SQUARE}\nA friendly illustration about language learning: ${ctx.title}.\nReading and writing scene with books and pencils.\n${STYLE_SUFFIX}`;

    case 'word_match':
      return `${STYLE_CARD}\nA single object representing: ${ctx.word}.\n${STYLE_SUFFIX}`;

    default:
      return `${STYLE_SQUARE}\nA friendly educational illustration.\n${STYLE_SUFFIX}`;
  }
}

// ─── Update source files ────────────────────────────────────────────────────
function updateSources(sourceFiles, ref, r2Url) {
  let updated = 0;
  for (const fp of sourceFiles) {
    const content = fs.readFileSync(fp, 'utf-8');
    const newContent = content.replaceAll(ref, r2Url);
    if (newContent !== content) {
      fs.writeFileSync(fp, newContent);
      updated++;
    }
  }
  return updated;
}

// ─── Main ───────────────────────────────────────────────────────────────────
const opts   = parseArgs();
const state  = loadState();
const DRY    = opts.dryRun;
const NO_UP  = opts.skipUpload;
const NO_SRC = opts.skipUpdate;

console.log('🎨 Image Pipeline (full slot coverage)');
console.log(`   weeks      : ${opts.weeks.join(', ')}`);
console.log(`   dry-run    : ${DRY}`);
console.log(`   skip-upload: ${NO_UP}`);
console.log(`   skip-update: ${NO_SRC}\n`);

let ok = 0, fail = 0, skip = 0;

for (const week of opts.weeks) {
  const tasks = scanWeek(week);
  console.log(`── W${pad2(week)}: ${tasks.length} unique images to process ──`);

  for (let i = 0; i < tasks.length; i++) {
    const t = tasks[i];
    const sk = `${week}/${t.ref}`;
    const done = state[sk]?.status === 'uploaded';
    const localExists = fs.existsSync(t.localPath);
    const fnameOnly = path.basename(t.ref);

    // --only filter: skip files not in the list
    if (opts.only.length > 0) {
      if (!opts.only.includes(fnameOnly)) { skip++; continue; }
    }

    if (done && localExists && !opts.force) { skip++; continue; }
    // R2 URL already in source — but file is missing locally (so re-gen needed).
    // Skip only if no --force AND local file exists already on R2.
    if (!localExists && !opts.force && t.sourceFiles.some(f => {
      const c = fs.readFileSync(f, 'utf-8');
      return c.includes(R2_CDN_BASE + t.ref) || c.includes(t.ref);
    })) { skip++; continue; }

    const tag = `${t.slot}`.padEnd(13);
    const fname = fnameOnly.padEnd(30);
    if (process.env.DEBUG_PIPE) console.error(`  TRACE i=${i} sk=${sk} done=${done} localExists=${localExists} force=${opts.force} only=${opts.only.includes(fnameOnly)}`);
    console.log(`  [${i+1}/${tasks.length}] ${tag} ${fname}  context=${t.context.type}`);

    if (DRY) {
      const prompt = makePrompt(t.context, week, t.ref);
      console.log(`    prompt preview: ${prompt.slice(0, 200).replace(/\n/g, ' ')}...`);
      skip++;
      continue;
    }

    // Generate with retry logic
    const prompt = makePrompt(t.context, week, t.ref);
    let buf;
    const MAX_RETRIES = 3;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        buf = await generateImage(prompt);
        break;
      } catch (e) {
        if (e.message === 'KEY_INVALID' && keyIdx + 1 < API_KEYS.length) {
          keyIdx++;
          console.log(`    🔑 rotating to key #${keyIdx + 1}`);
          // retry immediately
          buf = await generateImage(prompt);
          break;
        } else if (e.message.startsWith('QUOTA:')) {
          const waitSec = 30 + (attempt - 1) * 15;  // 30s, 45s, 60s
          console.error(`    ⏳ quota — wait ${waitSec}s (attempt ${attempt}/${MAX_RETRIES})`);
          await new Promise(r => setTimeout(r, waitSec * 1000));
          // continue to retry
        } else if (e.message === 'No image data returned') {
          // Transient — wait briefly and retry
          if (attempt < MAX_RETRIES) {
            const retryWait = 10 + (attempt - 1) * 10;  // 10s, 20s
            console.error(`    ⚠️  no image data — retry ${attempt}/${MAX_RETRIES} in ${retryWait}s`);
            await new Promise(r => setTimeout(r, retryWait * 1000));
            // continue
          } else {
            console.error(`    ❌ gen failed: ${e.message} (after ${MAX_RETRIES} attempts)`);
            fail++; buf = null; break;
          }
        } else {
          console.error(`    ❌ gen failed: ${e.message}`);
          fail++; buf = null; break;
        }
      }
    }
    if (!buf) continue;
    fs.mkdirSync(path.dirname(t.localPath), { recursive: true });
    fs.writeFileSync(t.localPath, buf);
    console.log(`    ✅ local: ${(buf.length / 1024).toFixed(0)} KB`);

    // Upload
    if (!NO_UP) {
      const rk = t.ref.replace(/^\/?images\//, 'images/');
      const uploaded = uploadToR2(t.localPath, rk);
      if (uploaded) {
        const r2u = `${R2_CDN_BASE}/${rk}`;
        console.log(`    ✅ R2: ${r2u}`);
        state[sk] = { status: 'uploaded', r2: r2u };
        if (!NO_SRC) updateSources(t.sourceFiles, t.ref, r2u);
      } else {
        state[sk] = { status: 'gen_only' };
        fail++;
      }
    } else {
      state[sk] = { status: 'local_only' };
    }
    saveState(state);
    ok++;

    // Rate limit: 6s between requests (conservative for free tier — long prompts hit bursts)
    await new Promise(r => setTimeout(r, 6000));
  }
  console.log('');
}

console.log(`\n📊 Done  ✅ ${ok}  ⏭️ ${skip}  ❌ ${fail}`);
