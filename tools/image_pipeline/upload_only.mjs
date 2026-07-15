// tools/image_pipeline/upload_only.mjs
// Upload locally-existing images to R2 + update source js files (no image generation).
//
// Use this when:
//   - Image generation is rate-limited / credits exhausted
//   - You want to push existing local images to R2 to make them live in the app
//
// Usage:
//   node tools/image_pipeline/upload_only.mjs [--week 30..35]
//
// Skips:
//   - barmodel_*, Hãy_tạo_*, story_writing_pic.jpg (legacy)
//   - All images outside W30-W35 by default

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');

const R2_BUCKET    = 'engquest-images';
const R2_CDN_BASE  = 'https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev';

// Slot priority — same as orchestrator (for finding context file per ref)
const SLOT_PRIORITY = ['read.js','explore.js','singapore_math.js','logic.js',
  'logic_science.js','grammar.js','vocab.js','word_power.js','word_match.js'];

function inferSlot(ref) {
  const b = path.basename(ref).toLowerCase();
  if (b.startsWith('mission'))         return null;
  if (b.startsWith('sparktalk_'))      return null;
  if (b.startsWith('story_'))          return null;
  if (/^logic_q\d+_easy/.test(b))      return null;
  if (/^science_q\d+_easy/.test(b))    return null;
  if (b.startsWith('read_cover'))      return 'read_cover';
  if (b.startsWith('explore_cover'))   return 'explore_cover';
  if (b.startsWith('math_cover'))      return 'math_cover';
  if (b.startsWith('logic_cover') || b.startsWith('logiclab_')) return 'logic_lab';
  if (b.startsWith('grammar_cover'))   return 'grammar_cover';
  if (b.startsWith('wordmatch_cover')) return 'word_match_cover';
  if (b.startsWith('wordpower_') || b.startsWith('wp_')) return 'word_power';
  if (b.startsWith('vocab_'))          return 'vocab';
  return 'vocab';
}

function pad2(n) { return String(n).padStart(2, '0'); }

// CLI
const args = process.argv.slice(2);
const weeks = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--week') {
    const v = args[++i];
    if (v.includes('..')) {
      const [f, t] = v.split('..').map(Number);
      for (let w = f; w <= t; w++) weeks.push(w);
    } else {
      weeks.push(...v.split(',').map(Number));
    }
  }
}
const targetWeeks = weeks.length ? weeks : [30,31,32,33,34,35];

console.log(`📦 Upload-only: W${targetWeeks.join(', ')}\n`);

let uploaded = 0, failed = 0, updated = 0;
const failedFiles = [];

for (const week of targetWeeks) {
  for (const modeTag of ['ADV', 'EASY']) {
    const base = modeTag === 'EASY'
      ? path.join(ROOT, 'src', 'data', 'weeks_easy', `week_${pad2(week)}`)
      : path.join(ROOT, 'src', 'data', 'weeks',      `week_${pad2(week)}`);
    if (!fs.existsSync(base)) continue;

    // Pre-load file refs
    const fileRefs = {};
    for (const fname of fs.readdirSync(base).filter(f => f.endsWith('.js'))) {
      const fp  = path.join(base, fname);
      const raw = fs.readFileSync(fp, 'utf-8');
      const re = fname === 'word_match.js'
        ? /image:\s*["']([^"']+)["']/g
        : /image_url:\s*["']([^"']+)["']/g;
      // Normalize R2 URLs back to local /images/... paths
      const refs = [...raw.matchAll(re)]
        .map(m => m[1])
        .map(p => p.startsWith(R2_CDN_BASE + '/') ? '/' + p.slice(R2_CDN_BASE.length + 1) : p);
      fileRefs[fname] = { fp, refs };
    }

    for (const [fname, { refs }] of Object.entries(fileRefs)) {
      for (const ref of refs) {
        if (!inferSlot(ref)) continue;
        if (ref.includes('barmodel_')) continue;

        const localPath = path.join(ROOT, 'public', ref);
        if (!fs.existsSync(localPath)) continue;

        const r2Key = ref.replace(/^\/?images\//, 'images/');
        const r2Url = `${R2_CDN_BASE}/${r2Key}`;

        // Upload
        try {
          execFileSync('npx', ['wrangler', 'r2', 'object', 'put',
            `${R2_BUCKET}/${r2Key}`, `--file=${localPath}`, '--remote'],
            { stdio: 'pipe', timeout: 60_000 });
          uploaded++;
          process.stdout.write(`  ✅ ${r2Key}\n`);
        } catch (e) {
          failed++;
          failedFiles.push(r2Key);
          process.stderr.write(`  ❌ ${r2Key}: ${e.message?.slice(0, 100)}\n`);
          continue;
        }

        // Update source files where this ref appears
        for (const f of fs.readdirSync(base).filter(f => f.endsWith('.js'))) {
          const fp = path.join(base, f);
          const content = fs.readFileSync(fp, 'utf-8');
          if (!content.includes(ref)) continue;
          const esc = ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const re2 = new RegExp(`(["'])${esc}(["'])`, 'g');
          const updated_content = content.replace(re2, `$1${r2Url}$2`);
          if (updated_content !== content) {
            fs.writeFileSync(fp, updated_content);
            updated++;
          }
        }
      }
    }
  }
}

console.log(`\n📊 Uploaded: ${uploaded}  Updated sources: ${updated}  Failed: ${failed}`);
if (failedFiles.length) {
  console.log(`Failed files (${failedFiles.length}):`);
  failedFiles.slice(0, 10).forEach(f => console.log(`  - ${f}`));
}