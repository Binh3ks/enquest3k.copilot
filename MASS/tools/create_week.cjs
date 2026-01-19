#!/usr/bin/env node
/**
 * MASS PRODUCTION - STATION FILES GENERATOR (Advanced + Easy)
 * 
 * Usage: node MASS/tools/create_week.cjs <week_number>
 * Example: node MASS/tools/create_week.cjs 5
 * 
 * What it does:
 * 1. Generate spec (if not exists)
 * 2. Show AI instructions for STATIONS ONLY (14 files × 2 modes = 28 files)
 * 3. Wait for AI to generate station files
 * 4. Validate generated content against Week 4
 * 5. Report success/failure
 * 
 * NOTE: This script does NOT generate AI Tutor file (week_XX_real.js)
 *       Use generate_ai_tutor.cjs for that purpose.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const weekNum = process.argv[2];

if (!weekNum) {
  console.error("❌ Missing week number");
  console.log("\n📖 Usage: node MASS/tools/create_week.cjs <week_number>");
  console.log("📖 Example: node MASS/tools/create_week.cjs 5\n");
  process.exit(1);
}

const weekId = parseInt(weekNum);
const specFile = path.join(__d70));
console.log(`🚀 MASS PRODUCTION - STATION FILES ONLY - WEEK ${weekNum}`);
console.log('='.repeat(70) + '\n');

console.log('⚠️  NOTE: This script generates STATIONS only (28 files)');
console.log('   For AI Tutor: Run generate_ai_tutor.cjs separately
console.log('\n' + '='.repeat(60));
console.log(`🚀 MASS PRODUCTION - CREATING WEEK ${weekNum}`);
console.log('='.repeat(60) + '\n');

// ===== STEP 1: GENERATE SPEC =====
console.log('📋 STEP 1: Generate Spec\n');

if (fs.existsSync(specFile)) {
  console.log(`✅ Spec exists: ${specFile}`);
} else {
  console.log(`🔨 Generating spec for Week ${weekNum}...`);
  try {
    execSync(`node "${path.join(__dirname, 'generate_spec.cjs')}" ${weekNum}`, { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '../..')
    });
  } catch (error) {
    console.error(`\n❌ Failed to generate spec: ${error.message}`);
    process.exit(1);
  }
}

// Read spec
const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));

console.log(`\n📊 Spec Summary:`);
console.log(`   Title: ${spec.title_en} (${spec.title_vi})`);
console.log(`   CEFR: ${spec.cefr_level}`);
console.log(`   Vocab: ${spec.vocab_count} words`);
console.log(`   Topic: ${spec.topic}`);
console.log(`   Grammar: ${spe70));
console.log('🤖 STEP 2: Station Files Generation Instructions');
console.log('='.repeat(70) + '\n');

console.log('📝 Output: 28 Station Files (14 Advanced + 14 Easy)');
console.log('📏 Total: ~400-500 lines per mode');
console.log('⏱️  Time: ~40-50 minutes (both modes)\n
console.log('='.repeat(60) + '\n');

console.log('📝 Format: Station Files (14 files per week)');

// Prompts to read for station generation
const promptsToRead = [
  '08_STATIONS_CORE.txt',
  '09_STATIONS_ADVANCED.txt',
  '10_STATIONS_EASY.txt',
  '12_ASSET_GENERATION.txt'
];

console.log('\n📚 AI must read these files IN ORDER:\n');

promptsToRead.forEach((file, i) => {
  const fullPath = `MASS/PROMPTS/${file}`;
  const exists = fs.existsSync(path.join(__dirname, '../PROMPTS', file));
  console.log(`   ${i + 1}. ${fullPath} ${exists ? '✅' : '❌ MISSING'}`);
});

// Show spec and reference
console.log(`\n📄 Load data from:`);
console.log(`   - MASS/SPECS/week_${String(weekId).padStart(2, '0')}_spec.json ✅`);
console.log(`   - Reference: src/data/weeks/week_04/ (Golden Standard) ✅`);

// Show output location
console.log(`\n📝 Generate 14 station files to:`);
console.log(`   → src/data/weeks/week_${String(weekId).padStart(2, '0')}/`);
console.log(`\n⚡ Estimated tokens: ~550 lines (14 station files including video_queries.json)`);

// ===== STEP 3: WAIT FOR AI =====
console.log('\n' + '='.repeat(60));
console.log('⏳ STEP 3: Waiting for AI to generate content...');
console.log('='.repeat(60) + '\n');

console.log('🎯 AI Generation Checklist:\n');
console.log('   [ ] Read all prompt files above');
console.log('   [ ] Load spec data (locked - do not modify)');
console.log('   [ ] Reference Week 4 structure (Golden Standard)');
  console.log('   [ ] Generate 14 station files matching Week 4 schemas');
console.log('   [ ] Include video_queries.json (5 queries for YouTube search)');
console.log('   [ ] Dual mode: Generate both Advanced + Easy versions');
console.log('   [ ] Save to src/data/weeks/week_XX/\n');

// Check if files exist
const requiredFiles = [
  'vocab.js', 'read.js', 'grammar.js', 'dictation.js', 'shadowing.js',
  'writing.js', 'ask_ai.js', 'logic.js', 'explore.js', 'word_power.js',
  'mindmap.js', 'daily_watch.js', 'index.js', 'video_queries.json'
];

const existingFiles = requiredFiles.filter(f => 
  fs.existsSync(path.join(weekDir, f))
);

if (existingFiles.length === requiredFiles.length) {
  console.log(`✅ Week ${weekNum} has all ${requiredFiles.length} station files`);
  console.log('\n⏭️  Proceeding to validation...\n');
} else {
  console.log(`⏸️  Week ${weekNum} station files not found yet.`);
  console.log(`   Found: ${existingFiles.length}/${requiredFiles.length} files`);
  if (existingFiles.length > 0) {
    console.log(`   Existing: ${existingFiles.join(', ')}`);
  }
  console.log(`\n📌 After AI generates all 14 files, run validation:`);
  console.log(`   node MASS/tools/create_week.cjs ${weekNum}\n`);
  process.exit(0);
}

// ===== STEP 4: VALIDATE =====
console.log('='.repeat(60));
console.log('✅ STEP 4: Validating Generated Content');
console.log('='.repeat(60) + '\n');

try {
  execSync(`node "${path.join(__dirname, 'validate_week_v2.cjs')}" ${weekNum}`, { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '../..')
  });70));
  console.log(`🎉 SUCCESS! Week ${weekNum} Station Files Ready!`);
  console.log('='.repeat(70) + '\n');
  
  console.log('📦 Next steps:\n');
  console.log(`   1. Generate AI Tutor:`);
  console.log(`      node MASS/tools/generate_ai_tutor.cjs ${weekNum}`);
  console.log(`   `);
  console.log(`   2. Generate Assets:`);
  console.log(`      node tools/update_videos.js ${weekNum}  # ⬅️ Fetch YouTube videos`);
  console.log(`      node tools/generate_images_nano.js ${weekNum}`);
  console.log(`      node tools/generate_audio.js ${weekNum} ${weekNum}`);
  console.log(`   `);
  console.log(`   3. Test in UI:`);
  console.log(`      npm run dev`);
  console.log(`   `);
  console.log(`   4. Commit:`);
  console.log(`      git add src/data/weeks/week_${String(weekId).padStart(2, '0')}/`);
  console.log(`      git add src/data/weeks_easy/week_${String(weekId).padStart(2, '0')}/`);
  console.log(`      git commit -m "Week ${weekNum}: ${spec.title_en}"`);
  console.log('\n');
  
} catch (error) {
  console.log('\n' + '='.repeat(60));
  console.log(`❌ VALIDATION FAILED for Week ${weekNum}`);
  console.log('='.repeat(60) + '\n');
  
  console.log('🔧 Fix the errors above, then re-run:\n');
  console.log(`   node MASS/tools/create_week.cjs ${weekNum}\n`);
  
  process.exit(1);
}
