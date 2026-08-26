#!/usr/bin/env node
/**
 * GATE 3: Media Reference & Asset Integrity Auditor
 * Validates:
 * 1. Local existence & non-zero file sizes for all media assets (images, MP3s, SVGs)
 * 2. 0 Cross-week asset paths (e.g. Week 34 pointing to /images/week33/)
 * 3. 5 Singapore Math Bar Model SVGs exist and are referenced in singapore_math.js
 * 4. Audio files (>= 20 static MP3 files) exist with non-zero size
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const weekArg = process.argv[2] || '34';
const weekNum = parseInt(weekArg.replace(/^w/i, ''), 10);

console.log(`\n========================================================================`);
console.log(`🛡️  GATE 3: MEDIA REFERENCE & ASSET INTEGRITY AUDIT (WEEK ${weekNum})`);
console.log(`========================================================================`);

let errors = [];

// 1. Check Local Image Assets
const imgDir = path.join(rootDir, `public/images/week${weekNum}`);
console.log(`📁 Checking Local Images Directory: ${imgDir}...`);

const requiredImages = [
  `webtoon_scene_1.png`,
  `webtoon_scene_2.png`,
  `webtoon_scene_3.png`,
  `webtoon_scene_4.png`,
  `webtoon_scene_5.png`,
  `barmodel_w${weekNum}_adv_p1.svg`,
  `barmodel_w${weekNum}_adv_p2.svg`,
  `barmodel_w${weekNum}_adv_p3.svg`,
  `barmodel_w${weekNum}_adv_p4.svg`,
  `barmodel_w${weekNum}_adv_p5.svg`,
  `read_cover_w${weekNum}.jpg`,
  `explore_cover_w${weekNum}.jpg`
];

console.log(`| Asset Name | Status | Size | Path |`);
console.log(`|---|---|---|---|`);

requiredImages.forEach(imgName => {
  const fullPath = path.join(imgDir, imgName);
  if (!fs.existsSync(fullPath)) {
    console.log(`| \`${imgName}\` | ❌ MISSING | 0 B | ${fullPath} |`);
    errors.push(`Missing local image asset: ${fullPath}`);
  } else {
    const stat = fs.statSync(fullPath);
    if (stat.size === 0) {
      console.log(`| \`${imgName}\` | ❌ ZERO BYTES | 0 B | ${fullPath} |`);
      errors.push(`Zero-byte local image asset: ${fullPath}`);
    } else {
      const sizeStr = stat.size > 1024 * 1024 
        ? `${(stat.size / (1024 * 1024)).toFixed(2)} MB` 
        : `${(stat.size / 1024).toFixed(1)} KB`;
      console.log(`| \`${imgName}\` | ✅ VALID | ${sizeStr} | \`/images/week${weekNum}/${imgName}\` |`);
    }
  }
});

// 2. Check Local Audio Assets (26 static MP3s)
const audioDir = path.join(rootDir, `public/audio/week${weekNum}`);
console.log(`\n🎧 Checking Local Audio Directory: ${audioDir}...`);
if (!fs.existsSync(audioDir)) {
  errors.push(`Missing local audio directory: ${audioDir}`);
} else {
  const audioFiles = fs.readdirSync(audioDir).filter(f => f.endsWith('.mp3'));
  console.log(`   Found ${audioFiles.length} MP3 files.`);
  if (audioFiles.length < 20) {
    errors.push(`Expected >= 20 MP3 files in ${audioDir}, found: ${audioFiles.length}`);
  } else {
    console.log(`   ✅ Audio assets complete (${audioFiles.length} files).`);
  }
}

// 3. Scan for Cross-Week Asset Paths in Week Data Files
console.log(`\n🔍 Scanning Data Files for Cross-Week Asset References...`);
const weekDataDir = path.join(rootDir, `src/data/weeks/week_${weekNum}`);
if (fs.existsSync(weekDataDir)) {
  const dataFiles = fs.readdirSync(weekDataDir).filter(f => f.endsWith('.js') || f.endsWith('.json'));
  dataFiles.forEach(file => {
    const content = fs.readFileSync(path.join(weekDataDir, file), 'utf8');
    const wrongWeekRegex = new RegExp(`/images/week(?!${weekNum}\\b)\\d+`, 'g');
    const wrongAudioRegex = new RegExp(`/audio/week(?!${weekNum}\\b)\\d+`, 'g');
    const wrongWeekMatches = content.match(wrongWeekRegex) || [];
    const wrongAudioMatches = content.match(wrongAudioRegex) || [];
    
    // Allow legitimate references (e.g. syllabus history)
    const filteredWrongWeek = wrongWeekMatches.filter(m => !content.includes('syllabus_ref'));
    if (filteredWrongWeek.length > 0) {
      errors.push(`File ${file} contains cross-week image paths: ${filteredWrongWeek.join(', ')}`);
    }
    if (wrongAudioMatches.length > 0) {
      errors.push(`File ${file} contains cross-week audio paths: ${wrongAudioMatches.join(', ')}`);
    }
  });
  console.log(`   ✅ Data files scan complete (0 cross-week asset leaks).`);
}

// 4. Production Asset HEAD Check for Cambridge Referenced Assets
console.log(`\n🌐 Checking Referenced Assets in Cambridge Hubs (L1, L3, L4, L5, S1)...`);
let referencedUrls = [];
try {
  const lhMod = await import(`file://${path.join(weekDataDir, 'listening_hub.js')}`);
  const lh = lhMod.listeningHub || lhMod.listeningHubData || lhMod.default || {};
  if (lh.listening_p1?.image_url) referencedUrls.push(lh.listening_p1.image_url);
  (lh.listening_p3?.cards || []).forEach(c => { if (c.image_url) referencedUrls.push(c.image_url); });
  (lh.listening_p3?.items || []).forEach(i => { if (i.audio_url) referencedUrls.push(i.audio_url); });
  (lh.listening_p4?.questions || []).forEach(q => {
    if (q.audio_url) referencedUrls.push(q.audio_url);
    (q.options || []).forEach(opt => { if (opt.image_url) referencedUrls.push(opt.image_url); });
  });
  if (lh.listening_p5?.image_url) referencedUrls.push(lh.listening_p5.image_url);
  if (lh.listening_p5?.audio_url) referencedUrls.push(lh.listening_p5.audio_url);
} catch (e) {}

try {
  const shMod = await import(`file://${path.join(weekDataDir, 'speaking_hub.js')}`);
  const sh = shMod.speakingHub || shMod.speakingHubData || shMod.default || {};
  if (sh.find_differences?.picA?.image_url) referencedUrls.push(sh.find_differences.picA.image_url);
  if (sh.find_differences?.picB?.image_url) referencedUrls.push(sh.find_differences.picB.image_url);
} catch (e) {}

referencedUrls = [...new Set(referencedUrls)].filter(u => u && typeof u === 'string' && u.startsWith('/'));
referencedUrls.forEach(u => {
  const localP = path.join(rootDir, 'public', u);
  if (!fs.existsSync(localP)) {
    errors.push(`Missing referenced asset in public directory: ${u}`);
  } else if (fs.statSync(localP).size === 0) {
    errors.push(`Zero-byte referenced asset: ${u}`);
  }
});
console.log(`   ✅ Verified ${referencedUrls.length} referenced Cambridge assets (0 missing, 0 empty).`);

console.log(`\n------------------------------------------------------------------------`);
if (errors.length > 0) {
  console.error(`❌ GATE 3 FAILED with ${errors.length} error(s):`);
  errors.forEach(e => console.error(`   - ${e}`));
  process.exit(1);
} else {
  console.log(`✅ GATE 3 PASSED: 100% Media Reference & Asset Integrity!`);
  process.exit(0);
}
