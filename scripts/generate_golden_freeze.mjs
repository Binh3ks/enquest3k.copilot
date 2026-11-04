#!/usr/bin/env node
/**
 * Auto-Freeze & Manifest Generator (Generic W01–W156)
 * docs/WEEK_PRODUCTION_SOP.md (v2.2.0) — Giai đoạn 5: Đóng Băng Chất Lượng & Tạo Manifest Hash
 * Spec finalized in Round 26 (re-activated Round 46 with W33 as Golden Standard).
 *
 * Capabilities:
 * 1. Explicit Whitelist File Scanning (Core Data Hubs, Specs, Governance, Wordlists).
 * 2. Active Reference Media Extraction (Bidirectional validation for all referenced Audio & Images).
 * 3. Fail-Loud Missing Media Gate (Blocks freeze generation if any referenced media is missing/zero-byte).
 * 4. SHA-256 Cryptographic Hashing for ALL Protected Sources, Wordlists, Audios & Images.
 * 5. Generates immutable docs/W{N}_GOLDEN_FREEZE_MANIFEST.json.
 * 6. Generates self-contained verification guard scripts/guard_golden_w{N}_freeze.mjs.
 *
 * Usage:
 *   node scripts/generate_golden_freeze.mjs [weekNum]
 *   node scripts/generate_golden_freeze.mjs 33
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const rootDir = process.cwd();

// Parse target week number
const rawArg = process.argv.find(a => /^\d+$/.test(a) || /^w\d+$/i.test(a)) || process.argv[2] || '33';
const weekNum = parseInt(String(rawArg).replace(/^w/i, ''), 10);

if (!weekNum || isNaN(weekNum) || weekNum < 1 || weekNum > 156) {
  console.error(`❌ FATAL: Invalid week number "${rawArg}". Expected an integer between 1 and 156.`);
  process.exit(1);
}

console.log('========================================================================');
console.log(`🧊 AUTO-FREEZE GENERATOR — WEEK ${weekNum} (GOLDEN STANDARD PIPELINE)`);
console.log(`📄 SOP Giai đoạn 5: Đóng Băng Chất Lượng & Tạo Manifest Hash`);
console.log('========================================================================\n');

const weekDataDir = path.join(rootDir, `src/data/weeks/week_${weekNum}`);
if (!fs.existsSync(weekDataDir)) {
  console.error(`❌ FATAL: Week data directory not found at: ${weekDataDir}`);
  process.exit(1);
}

// ── 1. EXPLICIT WHITELIST SOURCE FILES ───────────────────────────────────────
console.log('📁 [1/5] Identifying Canonical Protected Source Files (Explicit Whitelist)...');
const canonicalHubNames = [
  'reading_hub.js',
  'listening_hub.js',
  'writing_hub.js',
  'speaking_hub.js',
  'skill_practice_hub.js',
  'vocab.js'
];

// Check read.js if present
if (fs.existsSync(path.join(weekDataDir, 'read.js'))) {
  canonicalHubNames.push('read.js');
}

const protectedSourceFiles = [];
for (const hubName of canonicalHubNames) {
  const rel = `src/data/weeks/week_${weekNum}/${hubName}`;
  const abs = path.join(rootDir, rel);
  if (!fs.existsSync(abs)) {
    console.error(`❌ FATAL: Required canonical hub file missing: ${rel}`);
    process.exit(1);
  }
  protectedSourceFiles.push(rel);
}

// Optional Spec and Governance Docs
const specFileRel = `docs/GATE15_SPEC_W${weekNum}.json`;
if (fs.existsSync(path.join(rootDir, specFileRel))) {
  protectedSourceFiles.push(specFileRel);
}

const pedDocRel = `docs/W${weekNum}_PEDAGOGICAL_CONTENT_REVIEW.md`;
if (fs.existsSync(path.join(rootDir, pedDocRel))) {
  protectedSourceFiles.push(pedDocRel);
}

// Official Cambridge Wordlists
const officialWordlists = [
  'src/data/official_wordlists/starters_pre_a1.json',
  'src/data/official_wordlists/movers_a1.json',
  'src/data/official_wordlists/flyers_a2.json'
].filter(f => fs.existsSync(path.join(rootDir, f)));

console.log(`   ✅ Protected Data Files:   ${protectedSourceFiles.length}`);
console.log(`   ✅ Reference Wordlists:     ${officialWordlists.length}`);

// ── 2. ACTIVE REFERENCE MEDIA EXTRACTION ────────────────────────────────────
console.log('\n🔍 [2/5] Extracting Active Referenced Media Assets (Audio & Images)...');

let allDataContent = '';
const dataFiles = fs.readdirSync(weekDataDir).filter(f => f.endsWith('.js') || f.endsWith('.json'));
dataFiles.forEach(file => {
  allDataContent += '\n' + fs.readFileSync(path.join(weekDataDir, file), 'utf8');
});

// Extract audio URLs: /audio/week{N}/...
const audioRegex = new RegExp(`/audio/week${weekNum}/[a-zA-Z0-9_\\-\\.]+\\.(?:mp3|wav|ogg)`, 'g');
const referencedAudioUrls = [...new Set(allDataContent.match(audioRegex) || [])].sort();

// Extract image URLs: /images/week{N}/...
const imageRegex = new RegExp(`/images/week${weekNum}/[a-zA-Z0-9_\\-\\.]+\\.(?:png|jpg|jpeg|svg|webp)`, 'g');
const referencedImageUrls = [...new Set(allDataContent.match(imageRegex) || [])];

// Base required images (Webtoon scenes, bar models, covers)
const baseImages = [
  `webtoon_scene_1.png`, `webtoon_scene_2.png`, `webtoon_scene_3.png`, `webtoon_scene_4.png`, `webtoon_scene_5.png`,
  `barmodel_w${weekNum}_adv_p1.svg`, `barmodel_w${weekNum}_adv_p2.svg`, `barmodel_w${weekNum}_adv_p3.svg`, `barmodel_w${weekNum}_adv_p4.svg`, `barmodel_w${weekNum}_adv_p5.svg`,
  `read_cover_w${weekNum}.jpg`, `explore_cover_w${weekNum}.jpg`
];

baseImages.forEach(img => {
  const url = `/images/week${weekNum}/${img}`;
  if (!referencedImageUrls.includes(url)) {
    referencedImageUrls.push(url);
  }
});
referencedImageUrls.sort();

console.log(`   Active Referenced Audio:   ${referencedAudioUrls.length} files`);
console.log(`   Active Referenced Images:  ${referencedImageUrls.length} files`);

// ── 3. FAIL-LOUD MISSING MEDIA ASSET CHECK ──────────────────────────────────
console.log('\n🛡️  [3/5] Verifying Physical Media Existence & Non-Zero File Size...');
const missingAssets = [];
const protectedAudioFiles = [];
const protectedImageFiles = [];

referencedAudioUrls.forEach(url => {
  const relPath = `public${url}`;
  const absPath = path.join(rootDir, relPath);
  if (!fs.existsSync(absPath)) {
    missingAssets.push(`${relPath} (MISSING ON DISK)`);
  } else if (fs.statSync(absPath).size === 0) {
    missingAssets.push(`${relPath} (ZERO-BYTE CORRUPTED FILE)`);
  } else {
    protectedAudioFiles.push(relPath);
  }
});

referencedImageUrls.forEach(url => {
  const relPath = `public${url}`;
  const absPath = path.join(rootDir, relPath);
  if (!fs.existsSync(absPath)) {
    missingAssets.push(`${relPath} (MISSING ON DISK)`);
  } else if (fs.statSync(absPath).size === 0) {
    missingAssets.push(`${relPath} (ZERO-BYTE CORRUPTED FILE)`);
  } else {
    protectedImageFiles.push(relPath);
  }
});

if (missingAssets.length > 0) {
  console.error(`🚨 FAIL-LOUD: Cannot freeze Week ${weekNum}! Found ${missingAssets.length} missing/corrupted media assets:`);
  missingAssets.forEach(m => console.error(`   - ${m}`));
  process.exit(1);
}

console.log(`   ✅ 100% of ${protectedAudioFiles.length} audio files physically verified.`);
console.log(`   ✅ 100% of ${protectedImageFiles.length} image files physically verified.`);

// ── 4. CRYPTOGRAPHIC HASHING & MANIFEST CREATION ────────────────────────────
console.log('\n🔒 [4/5] Computing SHA-256 Hashes for Immutable Golden Freeze Manifest...');

const protectedFileHashes = {};
const hashFile = (relPath) => {
  const absPath = path.join(rootDir, relPath);
  const buf = fs.readFileSync(absPath);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  protectedFileHashes[relPath] = hash;
  return hash;
};

// 1. Data Hubs & Specs
protectedSourceFiles.forEach(hashFile);

// 2. Official Wordlists
officialWordlists.forEach(hashFile);

// 3. Audio Assets
protectedAudioFiles.forEach(hashFile);

// 4. Image Assets
protectedImageFiles.forEach(hashFile);

const totalProtected = Object.keys(protectedFileHashes).length;
console.log(`   ✅ Successfully computed SHA-256 hashes for ${totalProtected} total files.`);

// Extract theme & CEFR level from reading_hub.js
let theme = `Week ${weekNum} Theme`;
let cefrLevel = 'A2 Flyers / Stage 1 Young Learners (Ages 7–10)';
try {
  const rhContent = fs.readFileSync(path.join(weekDataDir, 'reading_hub.js'), 'utf8');
  const themeMatch = rhContent.match(/theme:\s*["']([^"']+)["']/i);
  if (themeMatch) theme = themeMatch[1];
  const cefrMatch = rhContent.match(/cefr_level:\s*["']([^"']+)["']/i);
  if (cefrMatch) cefrLevel = `${cefrMatch[1]} / Stage 1 Young Learners (Ages 7–10)`;
} catch (_) {}

// Build manifest structure
const manifestData = {
  manifestVersion: "1.0.0",
  goldenStandardVersion: "1.0.0",
  weekNumber: weekNum,
  theme: theme,
  cefrLevel: cefrLevel,
  freezeDate: new Date().toISOString(),
  lifecycleState: "GOLDEN_FROZEN",
  rotaryCycle: {
    cycleNumber: Math.ceil((weekNum - 32) / 4) || 1,
    testedSkills: ["listening_p1", "listening_p2", "listening_p3"],
    shieldCount: 3
  },
  taskInventory: [
    { id: "gear1_webtoon", day: 1, zone: 1, name: "Scene Explorer", type: "practice" },
    { id: "gear2_karaoke", day: 1, zone: 1, name: "Voice Shadow", type: "practice" },
    { id: "gear3_retell", day: 1, zone: 1, name: "Story Retell", type: "practice" },
    { id: "gear4_clil", day: 2, zone: 2, name: "Fact Finder", type: "practice" },
    { id: "science_lab", day: 2, zone: 2, name: "Action Lab", type: "practice" },
    { id: "science_report", day: 2, zone: 2, name: "Discovery Report", type: "practice" },
    { id: "word_blitz", day: 3, zone: 3, name: "Speed Match", type: "practice" },
    { id: "sentence_smash", day: 3, zone: 3, name: "Grammar Duel", type: "practice" },
    { id: "math_quest", day: 3, zone: 3, name: "Math Quest", type: "practice" },
    { id: "story_writer", day: 4, zone: 4, name: "Story Writer", type: "practice" },
    { id: "broadcast_studio", day: 4, zone: 4, name: "Video Challenge", type: "practice" },
    { id: "info_exchange", day: 4, zone: 4, name: "Info Exchange", type: "practice" },
    { id: "boss_listening", day: 5, zone: 5, name: "Listening Shield", type: "assessment" },
    { id: "boss_reading", day: 5, zone: 5, name: "Reading & Writing Shield", type: "assessment" },
    { id: "weekly_review", day: 5, zone: 5, name: "Speaking & Passport", type: "assessment" }
  ],
  criticalMediaSummary: {
    totalStaticMP3s: protectedAudioFiles.length,
    totalImagesAndSVGs: protectedImageFiles.length,
    barModelSVGs: protectedImageFiles.filter(f => f.includes('barmodel_')).length,
    webtoonScenes: protectedImageFiles.filter(f => f.includes('webtoon_scene_')).length,
    covers: protectedImageFiles.filter(f => f.includes('cover')).length
  },
  validationSuite: [
    { gate: "Gate 3", script: `scripts/gate3_media_integrity.mjs ${weekNum}`, target: "0 missing referenced media assets" },
    { gate: "Gate 4", script: `scripts/gate4_chunk_bolding.mjs ${weekNum}`, target: "0 single-word bolding defects" },
    { gate: "Gate 11", script: `scripts/gate11_content_richness.mjs ${weekNum}`, target: "Richness & lexical variety standard" },
    { gate: "Gate 12", script: `scripts/gate12_comprehensive_cefr.mjs ${weekNum}`, target: "CEFR level alignment" },
    { gate: "Gate 15", script: `scripts/gate15_production_dom_assertions.mjs ${weekNum}`, target: "15/15 Quests clean DOM assertions & screenshot dedup" },
    { gate: "Freeze Guard", script: `scripts/guard_golden_w${weekNum}_freeze.mjs`, target: "100% SHA-256 integrity verification" }
  ],
  protectedSourceFiles: protectedSourceFiles,
  protectedFileHashes: protectedFileHashes
};

const manifestPath = path.join(rootDir, `docs/W${weekNum}_GOLDEN_FREEZE_MANIFEST.json`);
fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2) + '\n', 'utf8');
console.log(`   💾 Manifest written to: ${path.relative(rootDir, manifestPath)}`);

// ── 5. GENERATE GUARD SCRIPT ────────────────────────────────────────────────
console.log('\n🛡️  [5/5] Generating Automated Freeze Guard Script...');

const guardScriptContent = `#!/usr/bin/env node
/**
 * GUARD GOLDEN FREEZE — WEEK ${weekNum}
 * Generated automatically by Auto-Freeze Generator
 * docs/WEEK_PRODUCTION_SOP.md (v2.2.0) — Giai đoạn 5: Đóng Băng Chất Lượng & Tạo Manifest Hash
 *
 * Verifies 100% Cryptographic SHA-256 integrity of:
 * - Core Data Hubs & Read Stories
 * - Cambridge Wordlists
 * - Spec & Governance Manifests
 * - Active Referenced Audio Assets (MP3)
 * - Active Referenced Image & Bar Model SVG Assets
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const rootDir = process.env.PROJECT_ROOT ? path.resolve(process.env.PROJECT_ROOT) : process.cwd();
const manifestArg = process.argv.find(a => a.startsWith('--manifest='));
const manifestPath = manifestArg
  ? path.resolve(manifestArg.split('=')[1])
  : path.resolve(rootDir, 'docs/W${weekNum}_GOLDEN_FREEZE_MANIFEST.json');

if (!fs.existsSync(manifestPath)) {
  console.error(\`❌ CRITICAL: Golden Freeze Manifest not found at: \${manifestPath}\`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const protectedHashes = manifest.protectedFileHashes || {};
const totalExpected = Object.keys(protectedHashes).length;

console.log('========================================================================');
console.log('🛡️  ENGQUEST3K — W${weekNum} GOLDEN FREEZE CRYPTOGRAPHIC INTEGRITY GUARD');
console.log(\`🔖 Manifest Version: \${manifest.manifestVersion} | Standard Version: \${manifest.goldenStandardVersion}\`);
console.log(\`📅 Freeze Date: \${manifest.freezeDate}\`);
console.log(\`🔒 Total Protected Files to Verify: \${totalExpected}\`);
console.log('========================================================================\\n');

// 1. Data Hub Structural Contract Check
console.log('--- 1. Data Hub Structural Integrity Check ---');
const weekDataDir = path.resolve(rootDir, 'src/data/weeks/week_${weekNum}');
const requiredHubFiles = ['reading_hub.js', 'listening_hub.js', 'writing_hub.js', 'speaking_hub.js', 'vocab.js'];
let structurePass = true;

for (const hubFile of requiredHubFiles) {
  const hubPath = path.join(weekDataDir, hubFile);
  if (!fs.existsSync(hubPath)) {
    console.error(\`  ❌ [STRUCTURAL DEFECT] Missing required hub file: \${hubFile}\`);
    structurePass = false;
  } else {
    const content = fs.readFileSync(hubPath, 'utf8');
    if (content.length < 100) {
      console.error(\`  ❌ [STRUCTURAL DEFECT] Hub file \${hubFile} is unexpectedly small / truncated\`);
      structurePass = false;
    }
  }
}

if (!structurePass) {
  console.error('\\n🚨 DATA HUB STRUCTURAL CHECK FAILED!');
  process.exit(1);
}
console.log('  ✅ 100% of required data hub structural contracts verified.\\n');

// 2. Cryptographic SHA-256 Hash Verification
console.log('--- 2. Cryptographic SHA-256 Hash Verification ---');
let allMatch = true;
const discrepancies = [];
const stats = { data: 0, wordlist: 0, spec: 0, audio: 0, image: 0 };

for (const [relPath, expectedHash] of Object.entries(protectedHashes)) {
  const absPath = path.resolve(rootDir, relPath);

  let cat = '[FILE]';
  if (relPath.includes('src/data/weeks/')) { cat = '[DATA HUB]'; stats.data++; }
  else if (relPath.includes('official_wordlists/')) { cat = '[WORDLIST]'; stats.wordlist++; }
  else if (relPath.includes('docs/')) { cat = '[SPEC/GOV]'; stats.spec++; }
  else if (relPath.includes('public/audio/')) { cat = '[AUDIO]'; stats.audio++; }
  else if (relPath.includes('public/images/')) { cat = '[IMAGE]'; stats.image++; }

  if (!fs.existsSync(absPath)) {
    allMatch = false;
    discrepancies.push({ file: relPath, category: cat, error: 'FILE MISSING / DELETED' });
    console.error(\`  ❌ \${cat} [MISSING] \${relPath}\`);
    continue;
  }

  const content = fs.readFileSync(absPath);
  const actualHash = crypto.createHash('sha256').update(content).digest('hex');

  if (actualHash !== expectedHash) {
    allMatch = false;
    discrepancies.push({ file: relPath, category: cat, expected: expectedHash, actual: actualHash });
    console.error(\`  ❌ \${cat} [CORRUPTED / MODIFIED] \${relPath}\`);
    console.error(\`     Expected SHA-256: \${expectedHash}\`);
    console.error(\`     Actual SHA-256:   \${actualHash}\`);
  } else {
    console.log(\`  ✅ \${cat} [LOCKED] \${relPath} (SHA-256: \${actualHash.slice(0, 16)}...)\`);
  }
}

console.log('\\n========================================================================');
console.log('📊 W${weekNum} INTEGRITY SUMMARY:');
console.log(\`- Data Hubs:           \${stats.data} locked\`);
console.log(\`- Cambridge Wordlists: \${stats.wordlist} locked\`);
console.log(\`- Spec & Governance:   \${stats.spec} locked\`);
console.log(\`- Audio MP3 Assets:    \${stats.audio} locked\`);
console.log(\`- Image & SVG Assets:  \${stats.image} locked\`);
console.log(\`- Total Files:         \${totalExpected - discrepancies.length}/\${totalExpected} locked\`);
console.log('========================================================================');

if (allMatch) {
  console.log('🎉 W${weekNum} GOLDEN MASTER INTEGRITY VERIFIED: 100% OF PROTECTED FILES LOCKED!');
  console.log('========================================================================\\n');
  process.exit(0);
} else {
  console.error(\`🚨 GOLDEN FREEZE VIOLATION: \${discrepancies.length} protected file(s) altered!\`);
  discrepancies.forEach(d => {
    if (d.expected) {
      console.error(\`  - \${d.category} \${d.file}: Expected \${d.expected.slice(0, 16)}... Got \${d.actual.slice(0, 16)}...\`);
    } else {
      console.error(\`  - \${d.category} \${d.file}: \${d.error}\`);
    }
  });
  console.error('Do NOT modify frozen W${weekNum} content without following the formal Change Control Procedure.');
  console.log('========================================================================\\n');
  process.exit(1);
}
`;

const guardScriptPath = path.join(rootDir, `scripts/guard_golden_w${weekNum}_freeze.mjs`);
fs.writeFileSync(guardScriptPath, guardScriptContent, { encoding: 'utf8', mode: 0o755 });
console.log(`   💾 Guard script written to: ${path.relative(rootDir, guardScriptPath)}`);

console.log('\n========================================================================');
console.log(`🎉 AUTO-FREEZE GENERATION COMPLETE FOR WEEK ${weekNum}!`);
console.log(`1. Manifest: ${path.relative(rootDir, manifestPath)} (${totalProtected} protected assets)`);
console.log(`2. Guard:    ${path.relative(rootDir, guardScriptPath)}`);
console.log(`Test run:   node scripts/guard_golden_w${weekNum}_freeze.mjs`);
console.log('========================================================================\n');

