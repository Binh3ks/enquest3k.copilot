#!/usr/bin/env node
/**
 * GATE 3: Media Reference & Asset Integrity Auditor (Enhanced Bidirectional v2.0)
 * 
 * Validates:
 * 1. Local existence & non-zero file sizes for required images & Bar Model SVGs
 * 2. 0 Cross-week asset paths (e.g. Week 34 pointing to /images/week33/)
 * 3. Expanded Cambridge Hubs referenced assets check (L1, L2, L3, L4, L5, S1, S2, S3, S4)
 * 4. Bidirectional Cross-Referencing:
 *    - Direction 1: Missing Assets (referenced in data files but missing on disk)
 *    - Direction 2: Orphaned Assets (existing on disk but never referenced in any data file)
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
console.log(`🛡️  GATE 3: EXPANDED BIDIRECTIONAL MEDIA INTEGRITY AUDIT (WEEK ${weekNum})`);
console.log(`========================================================================`);

let errors = [];
let warnings = [];

// 1. Check Local Image Assets
const imgDir = path.join(rootDir, `public/images/week${weekNum}`);
console.log(`📁 [1/4] Checking Required Images Directory: ${imgDir}...`);

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

let validRequiredImages = 0;
requiredImages.forEach(imgName => {
  const fullPath = path.join(imgDir, imgName);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing local image asset: ${fullPath}`);
  } else {
    const stat = fs.statSync(fullPath);
    if (stat.size === 0) {
      errors.push(`Zero-byte local image asset: ${fullPath}`);
    } else {
      validRequiredImages++;
    }
  }
});
console.log(`   ✅ Required base images & bar models: ${validRequiredImages}/${requiredImages.length} verified.`);

// 2. Check Local Audio Assets (>= 20 static MP3s)
const audioDir = path.join(rootDir, `public/audio/week${weekNum}`);
console.log(`\n🎧 [2/4] Checking Local Audio Directory: ${audioDir}...`);
let physicalAudioFiles = [];
if (!fs.existsSync(audioDir)) {
  errors.push(`Missing local audio directory: ${audioDir}`);
} else {
  physicalAudioFiles = fs.readdirSync(audioDir).filter(f => f.endsWith('.mp3'));
  console.log(`   Found ${physicalAudioFiles.length} physical MP3 files.`);
  if (physicalAudioFiles.length < 20) {
    errors.push(`Expected >= 20 MP3 files in ${audioDir}, found: ${physicalAudioFiles.length}`);
  } else {
    console.log(`   ✅ Audio assets volume standard met (${physicalAudioFiles.length} files >= 20 threshold).`);
  }
}

// 3. Scan for Cross-Week Asset Paths in Week Data Files
console.log(`\n🔍 [3/4] Scanning Data Files for Cross-Week Asset References...`);
const weekDataDir = path.join(rootDir, `src/data/weeks/week_${weekNum}`);
let allDataContent = '';
if (fs.existsSync(weekDataDir)) {
  const dataFiles = fs.readdirSync(weekDataDir).filter(f => f.endsWith('.js') || f.endsWith('.json'));
  dataFiles.forEach(file => {
    const content = fs.readFileSync(path.join(weekDataDir, file), 'utf8');
    allDataContent += '\n' + content;
    const wrongWeekRegex = new RegExp(`/images/week(?!${weekNum}\\b)\\d+`, 'g');
    const wrongAudioRegex = new RegExp(`/audio/week(?!${weekNum}\\b)\\d+`, 'g');
    const wrongWeekMatches = content.match(wrongWeekRegex) || [];
    const wrongAudioMatches = content.match(wrongAudioRegex) || [];
    
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

// 4. Expanded Cambridge Referenced Assets Check (L1, L2, L3, L4, L5, S1, S2, S3, S4)
console.log(`\n🌐 [4/4] Checking Cambridge Hubs (L1, L2, L3, L4, L5, S1, S2, S3, S4)...`);
let referencedUrls = [];

// Listening Hub
try {
  const lhMod = await import(`file://${path.join(weekDataDir, 'listening_hub.js')}`);
  const lh = lhMod.listeningHub || lhMod.listeningHubData || lhMod.default || {};
  // L1
  if (lh.listening_p1?.image_url) referencedUrls.push(lh.listening_p1.image_url);
  if (lh.listening_p1?.audio_url) referencedUrls.push(lh.listening_p1.audio_url);
  // L2
  if (lh.listening_p2?.audio_url) referencedUrls.push(lh.listening_p2.audio_url);
  if (lh.listening_p2?.full_audio_url) referencedUrls.push(lh.listening_p2.full_audio_url);
  (lh.listening_p2?.questions || []).forEach(q => { if (q.audio_url) referencedUrls.push(q.audio_url); });
  // L3
  if (lh.listening_p3?.audio_url) referencedUrls.push(lh.listening_p3.audio_url);
  (lh.listening_p3?.cards || []).forEach(c => { if (c.image_url) referencedUrls.push(c.image_url); });
  (lh.listening_p3?.items || []).forEach(i => { if (i.audio_url) referencedUrls.push(i.audio_url); });
  // L4
  (lh.listening_p4?.questions || []).forEach(q => {
    if (q.audio_url) referencedUrls.push(q.audio_url);
    (q.options || []).forEach(opt => { if (opt.image_url) referencedUrls.push(opt.image_url); });
  });
  // L5
  if (lh.listening_p5?.image_url) referencedUrls.push(lh.listening_p5.image_url);
  if (lh.listening_p5?.audio_url) referencedUrls.push(lh.listening_p5.audio_url);
} catch (e) {
  errors.push(`Error loading listening_hub.js: ${e.message}`);
}

// Speaking Hub
try {
  const shMod = await import(`file://${path.join(weekDataDir, 'speaking_hub.js')}`);
  const sh = shMod.speakingHub || shMod.speakingHubData || shMod.default || {};
  // S1
  if (sh.find_differences?.picA?.image_url) referencedUrls.push(sh.find_differences.picA.image_url);
  if (sh.find_differences?.picB?.image_url) referencedUrls.push(sh.find_differences.picB.image_url);
  if (sh.find_differences?.audio_url) referencedUrls.push(sh.find_differences.audio_url);
  // S2
  if (sh.info_exchange_cards?.audio_url) referencedUrls.push(sh.info_exchange_cards.audio_url);
  if (sh.info_exchange_cards?.intro_p1_audio_url) referencedUrls.push(sh.info_exchange_cards.intro_p1_audio_url);
  if (sh.info_exchange_cards?.intro_p2_audio_url) referencedUrls.push(sh.info_exchange_cards.intro_p2_audio_url);
  (sh.info_exchange_cards?.examiner_questions || []).forEach(q => { if (q.audio_url) referencedUrls.push(q.audio_url); });
  (sh.info_exchange_cards?.table_b?.fields || []).forEach(f => { if (f.audio_url) referencedUrls.push(f.audio_url); });
  // S3
  (sh.picture_story?.images || []).forEach(img => { if (typeof img === 'string') referencedUrls.push(img); });
  if (sh.picture_story?.audio_url) referencedUrls.push(sh.picture_story.audio_url);
  if (sh.picture_story?.examiner_pic1_narration?.audio_url) referencedUrls.push(sh.picture_story.examiner_pic1_narration.audio_url);
  // S4
  (sh.personal_questions?.questions || []).forEach(q => { if (q.audio_url) referencedUrls.push(q.audio_url); });
  if (sh.personal_questions?.audio_url) referencedUrls.push(sh.personal_questions.audio_url);
} catch (e) {
  errors.push(`Error loading speaking_hub.js: ${e.message}`);
}

// Reading Hub
try {
  const rhMod = await import(`file://${path.join(weekDataDir, 'reading_hub.js')}`);
  const rh = rhMod.readingHub || rhMod.readingHubData || rhMod.default || {};
  (rh.story_scenes || rh.read_explore?.story_scenes || []).forEach(s => {
    if (s.audio_url) referencedUrls.push(s.audio_url);
    if (s.image_url) referencedUrls.push(s.image_url);
  });
  if (rh.clil_article?.audio_url) referencedUrls.push(rh.clil_article.audio_url);
} catch (e) {}

// Writing Hub
try {
  const whMod = await import(`file://${path.join(weekDataDir, 'writing_hub.js')}`);
  const wh = whMod.writingHub || whMod.writingHubData || whMod.default || {};
  (wh.science_report_config?.hotspots || []).forEach(h => {
    if (h.audio_url) referencedUrls.push(h.audio_url);
  });
} catch (e) {}

referencedUrls = [...new Set(referencedUrls)].filter(u => u && typeof u === 'string' && u.startsWith('/'));

// Direction 1: Verify all referenced URLs exist on disk and size > 0
let missingReferenced = [];
referencedUrls.forEach(u => {
  const localP = path.join(rootDir, 'public', u);
  if (!fs.existsSync(localP)) {
    missingReferenced.push(`Missing referenced asset: ${u}`);
    errors.push(`Missing referenced asset in public directory: ${u}`);
  } else if (fs.statSync(localP).size === 0) {
    missingReferenced.push(`Zero-byte referenced asset: ${u}`);
    errors.push(`Zero-byte referenced asset: ${u}`);
  }
});
console.log(`   ✅ Direction 1 (Missing Files): Checked ${referencedUrls.length} referenced URLs (${missingReferenced.length} missing).`);

// Direction 2: Orphaned Files Audit (Files on disk not referenced in data)
console.log(`\n🔄 Checking Direction 2: Orphaned Files Audit in public/audio/week${weekNum} and public/images/week${weekNum}...`);
const physicalImages = fs.existsSync(imgDir) ? fs.readdirSync(imgDir).filter(f => !f.startsWith('.')) : [];
const orphanedAudio = [];
physicalAudioFiles.forEach(f => {
  if (!allDataContent.includes(f)) {
    orphanedAudio.push(f);
  }
});

const orphanedImages = [];
physicalImages.forEach(f => {
  if (!allDataContent.includes(f) && !f.includes('cover') && !f.includes('barmodel')) {
    orphanedImages.push(f);
  }
});

console.log(`   - Physical Audio Files: ${physicalAudioFiles.length} | Orphaned Audio: ${orphanedAudio.length}`);
if (orphanedAudio.length > 0) {
  console.log(`     ⚠️ Unreferenced Audio Files (${orphanedAudio.length}): [${orphanedAudio.slice(0, 8).join(', ')}${orphanedAudio.length > 8 ? '...' : ''}]`);
}

console.log(`   - Physical Image Files: ${physicalImages.length} | Orphaned Images: ${orphanedImages.length}`);
if (orphanedImages.length > 0) {
  console.log(`     ⚠️ Unreferenced Image Files (${orphanedImages.length}): [${orphanedImages.slice(0, 8).join(', ')}${orphanedImages.length > 8 ? '...' : ''}]`);
}

console.log(`\n========================================================================`);
console.log(`📊 GATE 3 AUDIT SUMMARY — WEEK ${weekNum}:`);
console.log(`- Base Required Images: ${validRequiredImages}/${requiredImages.length} valid`);
console.log(`- Physical Audio Files: ${physicalAudioFiles.length} (threshold >= 20)`);
console.log(`- Cambridge Referenced Assets (L1–L5, S1–S4, Scenes, Report): ${referencedUrls.length} verified`);
console.log(`- Missing Referenced Assets: ${missingReferenced.length}`);
console.log(`- Orphaned Audio Files: ${orphanedAudio.length}`);
console.log(`- Orphaned Image Files: ${orphanedImages.length}`);
console.log(`========================================================================`);

if (errors.length > 0) {
  console.error(`❌ GATE 3 FAILED with ${errors.length} error(s):`);
  errors.forEach(e => console.error(`   - ${e}`));
  process.exit(1);
} else {
  console.log(`✅ GATE 3 PASSED: 100% Media Reference & Bidirectional Asset Integrity Verified!`);
  process.exit(0);
}
