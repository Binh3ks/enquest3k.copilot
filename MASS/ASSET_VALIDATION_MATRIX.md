# ASSET VALIDATION MATRIX - BẮT BUỘC

**Version**: 1.1 FINAL - CRITICAL FIXES
**Date**: January 20, 2026
**Purpose**: Matrix validation bắt buộc cho assets, đếm số lượng, kiểm tra syntax

**⚠️ CRITICAL UPDATE**: Added folder naming rules and vocab content differentiation requirements

---

## 🚨 CRITICAL RULES - MUST FOLLOW

### ❌ FOLDER NAMING PATTERN (BẮT BUỘC)
```
✅ CORRECT:
public/audio/week4/          (no underscore, no leading zero)
public/audio/week4_easy/
public/images/week4/
public/images/week5/
public/images/week5_easy/

❌ WRONG - WILL BREAK APP:
public/audio/week_04/        ❌ Has underscore
public/audio/week_05/        ❌ Has underscore and leading zero
public/audio/week_4/         ❌ Has underscore
```

**Pattern**: `week<number>` for Advanced, `week<number>_easy` for Easy
**No underscores before number, no leading zeros!**

### ❌ VOCAB CONTENT DIFFERENTIATION (BẮT BUỘC)
```
✅ CORRECT - Week 4 Example:
Advanced: happy, sad, funny, friendly, excited, playing, reading, drawing, singing, dancing
Easy:     like, love, smile, cry, laugh, play, help, want, feel, give

❌ WRONG - Week 5 ERROR:
Advanced: bedroom, kitchen, bathroom, living room, bed, chair, table, house, mystery, explore
Easy:     bedroom, kitchen, bathroom, living room, bed, chair, table, house, mystery, explore
          ^^^ GIỐNG HỆT NHAU - LỖI MASS PRODUCTION!
```

**Rule**: Easy mode MUST have different vocab words than Advanced (simpler, more basic)
**If vocab is identical → Mass production script is broken!**

---

## 📊 ASSET COUNT MATRIX (BẮT BUỘC)

### ADVANCED MODE - Per Week

| Station | Audio Files | Image Files | Total Assets | Naming Pattern | Validation Rule |
|---------|-------------|-------------|--------------|----------------|-----------------|
| **vocab.js** | 40 files | 10 images | 50 | `vocab_<word>.mp3`<br>`vocab_def_<word>.mp3`<br>`vocab_ex_<word>.mp3`<br>`vocab_coll_<word>.mp3`<br>`vocab_<word>.jpg` | ✅ 10 words × 4 audio + 10 images<br>❌ If not 40 audio → FAIL |
| **word_power.js** | 12 files | 3 images | 15 | `wordpower_<phrase>.mp3`<br>`wordpower_def_<phrase>.mp3`<br>`wordpower_ex_<phrase>.mp3`<br>`wordpower_coll_<phrase>.mp3`<br>`wordpower_<phrase>.jpg` | ✅ 3 phrases × 4 audio + 3 images<br>⚠️ NOTE: Has audio_model field (5th audio) in Week 4<br>❌ If not 12-15 audio → FAIL |
| **word_match.js** | 0 files | 0 images | 0 | N/A | ✅ Pure logic game, no assets |
| **read.js** | 1 file | 1 image | 2 | `read_explore_main.mp3`<br>`read_cover.jpg` | ✅ 1 full passage audio + 1 cover<br>❌ NOT `read_main.mp3` |
| **grammar.js** | 0 files | 0 images | 0 | N/A | ✅ NO audio (text exercises only) |
| **dictation.js** | 14 files | 0 images | 14 | `dictation_<number>.mp3` | ✅ 14 sentences (copied from read.js)<br>❌ If ≠ read sentence count → FAIL |
| **shadowing.js** | 15 files | 0 images | 15 | `shadowing_<number>.mp3`<br>`shadowing_full.mp3` | ✅ 14 sentences + 1 full<br>❌ Must = dictation count + 1 |
| **writing.js** | 0 files | 0 images | 0 | N/A | ✅ NO audio (text prompt only) |
| **ask_ai.js** | 5 files | 0 images | 5 | `ask_ai_<number>.mp3` | ✅ 5 prompt audio files |
| **logic.js** | 5 files | 0 images | 5 | `logic_<number>.mp3` | ✅ 5 puzzle audio files<br>❌ NO images for logic puzzles |
| **explore.js** | 1 file | 1 image | 2 | `explore_narration.mp3`<br>`explore_cover.jpg` | ✅ 1 narration + 1 cover |
| **mindmap.js** | 42 files | 0 images | 42 | `mindmap_stem_<1-6>.mp3`<br>`mindmap_branch_<1-36>.mp3` | ✅ 6 stems + 36 branches = 42<br>❌ If not exactly 42 → FAIL |
| **daily_watch.js** | 0 files | 0 images | 0 | N/A | ✅ NO audio (YouTube videos only) |
| **video_queries.json** | 0 files | 0 images | 0 | N/A | ✅ JSON only, no assets |
| **TOTAL** | **138 audio** | **15 images** | **153** | | ❌ If count mismatch → REGENERATE |

### EASY MODE - Per Week

| Station | Audio Files | Image Files | Total Assets | Difference from Advanced |
|---------|-------------|-------------|--------------|--------------------------|
| **vocab.js** | 40 files | 10 images | 50 | ✅ SAME as Advanced |
| **word_power.js** | 12 files | 3 images | 15 | ✅ SAME as Advanced |
| **word_match.js** | 0 files | 0 images | 0 | ✅ SAME |
| **read.js** | 1 file | 1 image | 2 | ✅ SAME (shorter text) |
| **grammar.js** | 0 files | 0 images | 0 | ✅ SAME (NO audio) |
| **dictation.js** | 12 files | 0 images | 12 | ⚠️ 12 sentences (not 14!) |
| **shadowing.js** | 13 files | 0 images | 13 | ⚠️ 12 sentences + 1 full = 13 |
| **writing.js** | 0 files | 0 images | 0 | ✅ SAME (NO audio) |
| **ask_ai.js** | 5 files | 0 images | 5 | ✅ SAME |
| **logic.js** | 5 files | 0 images | 5 | ✅ SAME |
| **explore.js** | 1 file | 1 image | 2 | ✅ SAME |
| **mindmap.js** | 42 files | 0 images | 42 | ✅ SAME (6 stems + 36 branches) |
| **daily_watch.js** | 1 file | 0 images | 1 | ✅ SAME |
| **video_queries.json** | 0 files | 0 images | 0 | ✅ SAME |
| **TOTAL** | **130 audio** | **15 images** | **145** | ❌ 8 fewer audio than Advanced (dictation -2, shadowing -2) |

---

## 🔍 CRITICAL VALIDATION RULES

### Rule 1: Audio Field Presence

```javascript
// ✅ CORRECT - vocab.js (4 audio fields per word)
{
  id: 1,
  word: "happy",
  audio_word: "/audio/week4/vocab_happy.mp3",           // ✅ MUST EXIST
  audio_definition: "/audio/week4/vocab_def_happy.mp3", // ✅ MUST EXIST
  audio_example: "/audio/week4/vocab_ex_happy.mp3",     // ✅ MUST EXIST
  audio_collocation: "/audio/week4/vocab_coll_happy.mp3" // ✅ MUST EXIST
}

// ❌ WRONG - Missing audio fields
{
  id: 1,
  word: "happy",
  audio_word: "/audio/week4/vocab_happy.mp3" // ❌ FAIL: Missing 3 fields
}
```

**Validation**:
```javascript
// Check vocab.js has 4 audio fields per word
vocab.forEach((word, i) => {
  const requiredFields = ['audio_word', 'audio_definition', 'audio_example', 'audio_collocation'];
  requiredFields.forEach(field => {
    if (!word[field]) {
      console.error(`❌ vocab[${i}] missing ${field}`);
      process.exit(1);
    }
  });
});
```

---

### Rule 2: Word Power Audio (SAME as Vocab!)

```javascript
// ✅ ĐÚNG - word_power.js HAS audio fields (giống vocab)
export default {
  words: [
    {
      id: 1,
      word: "feel happy",
      audio_word: "/audio/week4/wordpower_feel_happy.mp3",           // ✅ MUST EXIST
      audio_definition: "/audio/week4/wordpower_def_feel_happy.mp3",  // ✅ MUST EXIST
      audio_example: "/audio/week4/wordpower_ex_feel_happy.mp3",      // ✅ MUST EXIST
      audio_collocation: "/audio/week4/wordpower_coll_feel_happy.mp3", // ✅ MUST EXIST
      audio_model: "/audio/week4/wordpower_model_feel_happy.mp3"       // ⚠️ OPTIONAL (Week 4 has it)
    }
  ]
};

// Total: 3 phrases × 4-5 audio = 12-15 files
```

**Validation**:
```javascript
// Check word_power.js has 4 audio fields per phrase (5 if has model)
wordPower.words.forEach((phrase, i) => {
  const requiredFields = ['audio_word', 'audio_definition', 'audio_example', 'audio_collocation'];
  requiredFields.forEach(field => {
    if (!phrase[field]) {
      console.error(`❌ word_power[${i}] missing ${field}`);
      process.exit(1);
    }
  });
  
  // audio_model is optional but common in Week 4+
  if (phrase.audio_model) {
    console.log(`✅ word_power[${i}] has audio_model (5 audio files)`);
  }
});
```

---

### Rule 3: Dictation = Read Sentences

```javascript
// ✅ CORRECT - Advanced
dictation.exercises.length = 14
shadowing.sentences.length = 14
shadowing.audio_full exists = true
TOTAL shadowing audio files = 15 (14 + 1)

// ✅ CORRECT - Easy
dictation.exercises.length = 12
shadowing.sentences.length = 12
shadowing.audio_full exists = true
TOTAL shadowing audio files = 13 (12 + 1)

// ❌ WRONG
shadowing.sentences.length !== dictation.exercises.length
```

**Validation**:
```javascript
if (shadowing.sentences.length !== dictation.exercises.length) {
  console.error(`❌ Shadowing (${shadowing.sentences.length}) ≠ Dictation (${dictation.exercises.length})`);
  process.exit(1);
}

if (!shadowing.audio_full) {
  console.error(`❌ Missing shadowing.audio_full`);
  process.exit(1);
}
```

---

### Rule 5: Mindmap = 6 Stems + 36 Branches

```javascript
// ✅ CORRECT - BOTH Advanced and Easy
{
  centerStems: [
    { text: "Stem 1", audio: "/audio/week4/mindmap_stem_1.mp3" },
    { text: "Stem 2", audio: "/audio/week4/mindmap_stem_2.mp3" },
    { text: "Stem 3", audio: "/audio/week4/mindmap_stem_3.mp3" },
    { text: "Stem 4", audio: "/audio/week4/mindmap_stem_4.mp3" },
    { text: "Stem 5", audio: "/audio/week4/mindmap_stem_5.mp3" },
    { text: "Stem 6", audio: "/audio/week4/mindmap_stem_6.mp3" }
  ],
  branchLabels: {
    "Stem 1": [
      { text: "Branch 1", audio: "/audio/week4/mindmap_branch_1.mp3" },
      // ... 5 more (6 per stem)
    ],
    // ... 5 more stems × 6 branches = 36 branches
  }
}

// VALIDATION:
centerStems.length = 6 ✅
branchLabels[each_stem].length = 6 ✅
TOTAL branches = 6 × 6 = 36 ✅
TOTAL audio files = 6 + 36 = 42 ✅

// ❌ WRONG - Easy has 4 stems (OLD MISTAKE)
centerStems.length = 4 // ❌ FAIL!
```

**Validation**:
```javascript
// Check stem count
if (mindmap.centerStems.length !== 6) {
  console.error(`❌ Mindmap must have 6 stems, got ${mindmap.centerStems.length}`);
  process.exit(1);
}

// Check branch count per stem
mindmap.centerStems.forEach((stem, i) => {
  const branches = mindmap.branchLabels[stem.text];
  if (branches.length !== 6) {
    console.error(`❌ Stem ${i+1} must have 6 branches, got ${branches.length}`);
    process.exit(1);
  }
});

// Check total audio files
const totalStemAudio = mindmap.centerStems.length; // 6
const totalBranchAudio = Object.values(mindmap.branchLabels).flat().length; // 36
const totalAudio = totalStemAudio + totalBranchAudio;
if (totalAudio !== 42) {
  console.error(`❌ Mindmap must have 42 audio files, got ${totalAudio}`);
  process.exit(1);
}
```

---

### Rule 6: File Path Syntax

```javascript
// ✅ CORRECT - Advanced
"/audio/week4/vocab_happy.mp3"
"/images/week4/vocab_happy.jpg"

// ✅ CORRECT - Easy
"/audio/week4_easy/vocab_happy.mp3"
"/images/week4_easy/vocab_happy.jpg"

// ❌ WRONG - Underscore after "week"
"/audio/week_04/vocab_happy.mp3"     // ❌ FAIL
"/images/week_04_easy/vocab_happy.jpg" // ❌ FAIL

// ❌ WRONG - Wrong extension
"/audio/week4/vocab_happy.wav"       // ❌ FAIL

// ❌ WRONG - Missing leading slash
"audio/week4/vocab_happy.mp3"        // ❌ FAIL
```

**Validation**:
```javascript
// Check all audio paths
const audioPathRegex = /^\/audio\/week\d+(_easy)?\/[a-z_0-9]+\.mp3$/;
allAudioPaths.forEach(path => {
  if (!audioPathRegex.test(path)) {
    console.error(`❌ Invalid audio path: ${path}`);
    process.exit(1);
  }
});

// Check all image paths
const imagePathRegex = /^\/images\/week\d+(_easy)?\/[a-z_0-9]+\.(jpg|png)$/;
allImagePaths.forEach(path => {
  if (!imagePathRegex.test(path)) {
    console.error(`❌ Invalid image path: ${path}`);
    process.exit(1);
  }
});
```

---

### Rule 7: Prefix Naming Convention

| Station | Prefix | Example | Common Mistake |
|---------|--------|---------|----------------|
| vocab.js | `vocab_` | `vocab_happy.mp3` | ✅ Correct |
| vocab.js (def) | `vocab_def_` | `vocab_def_happy.mp3` | ❌ NOT `def_happy.mp3` |
| vocab.js (ex) | `vocab_ex_` | `vocab_ex_happy.mp3` | ❌ NOT `ex_happy.mp3` |
| vocab.js (coll) | `vocab_coll_` | `vocab_coll_happy.mp3` | ❌ NOT `coll_happy.mp3` |
| word_power.js | `wordpower_` | `wordpower_feel_happy.mp3` | ❌ NOT `word_power_` |
| word_power.js (def) | `wordpower_def_` | `wordpower_def_feel_happy.mp3` | ✅ Correct |
| read.js | `read_explore_` | `read_explore_main.mp3` | ❌ NOT `read_main.mp3` |
| explore.js | `explore_` | `explore_narration.mp3` | ❌ NOT `explore_explore_` |
| mindmap stems | `mindmap_stem_` | `mindmap_stem_1.mp3` | ✅ Correct |
| mindmap branches | `mindmap_branch_` | `mindmap_branch_1.mp3` | ✅ Correct |
| grammar | `grammar_` | `grammar_1.mp3` | ✅ Correct |
| dictation | `dictation_` | `dictation_1.mp3` | ✅ Correct |
| shadowing | `shadowing_` | `shadowing_1.mp3` | ✅ Correct |
| shadowing (full) | `shadowing_full` | `shadowing_full.mp3` | ✅ Correct |
| logic story | `logic_story` | `logic_story.mp3` | ✅ Correct |
| logic images | `logic_` | `logic_1.jpg` | ✅ Correct |

---

## 🚨 COMMON ERRORS & FIXES

### Error 1: Missing Audio Field Prefix
```javascript
// ❌ WRONG - Week 5 Easy vocab.js had this error
{
  audio_word: "/audio/week5_easy/bedroom.mp3",
  audio_definition: "/audio/week5_easy/def_bedroom.mp3", // ❌ Missing vocab_ prefix
}

// ✅ CORRECT
{
  audio_word: "/audio/week5_easy/vocab_bedroom.mp3",
  audio_definition: "/audio/week5_easy/vocab_def_bedroom.mp3", // ✅ Has vocab_ prefix
}
```

---

### Error 2: Word Power Schema Confusion
```javascript
// ❌ WRONG - Adding audio fields to schema (Week 5 had this)
{
  phrases: [
    {
      id: 1,
      audio_word: "/audio/week5/wordpower_my_bedroom.mp3", // ❌ NOT in schema!
    }
  ]
}

// ✅ CORRECT - NO audio fields in schema
{
  phrases: [
    {
      id: 1,
      phrase: "my bedroom",
      image_url: "/images/week5/wordpower_my_bedroom.jpg" // ✅ Only image_url
    }
  ]
}

// ✅ BUT files must exist:
// public/audio/week5/wordpower_my_bedroom.mp3
// public/audio/week5/wordpower_def_my_bedroom.mp3
// public/audio/week5/wordpower_ex_my_bedroom.mp3
// public/audio/week5/wordpower_coll_my_bedroom.mp3
// public/audio/week5/wordpower_model_my_bedroom.mp3
```

---

### Error 3: Dictation/Shadowing Count Mismatch
```javascript
// ❌ WRONG - Week 5 had dictation with 14 but read had 12 sentences
read.js sentences: 12
dictation.js exercises: 14 // ❌ FAIL!

// ✅ CORRECT - Must match
read.js sentences: 14
dictation.js exercises: 14 // ✅ PASS
shadowing.js sentences: 14 // ✅ PASS
shadowing audio files: 15 (14 + shadowing_full.mp3) // ✅ PASS
```

---

### Error 4: Easy Mindmap with 4 Stems
```javascript
// ❌ WRONG - OLD assumption was Easy has 4 stems
mindmap.centerStems.length = 4 // ❌ FAIL!

// ✅ CORRECT - Easy has SAME 6 stems as Advanced
mindmap.centerStems.length = 6 // ✅ PASS (BOTH modes)
```

---

### Error 5: Read.js Wrong Naming
```javascript
// ❌ WRONG
audio_main: "/audio/week5/read_main.mp3" // ❌ FAIL!

// ✅ CORRECT
audio_main: "/audio/week5/read_explore_main.mp3" // ✅ PASS
```

---

## 🛠️ AUTOMATED VALIDATION SCRIPT

### File: `MASS/tools/validate_assets.cjs`

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const weekNum = process.argv[2];
const mode = process.argv[3] || 'advanced'; // 'advanced' or 'easy'

if (!weekNum) {
  console.error("Usage: node validate_assets.cjs <week> [mode]");
  process.exit(1);
}

const weekId = parseInt(weekNum);
const weekStr = `week${weekId}${mode === 'easy' ? '_easy' : ''}`;
const audioDir = path.join(__dirname, '../../public/audio', weekStr);
const imageDir = path.join(__dirname, '../../public/images', weekStr);

console.log(`\n🔍 Validating Assets: Week ${weekNum} (${mode.toUpperCase()})\n`);

const errors = [];
const warnings = [];

// ===== VOCAB VALIDATION =====
console.log('📝 Validating vocab.js assets...');
const vocabWords = [
  'happy', 'sad', 'funny', 'friendly', 'excited', 
  'playing', 'mother', 'father', 'sister', 'brother'
]; // Replace with actual vocab from spec

vocabWords.forEach((word, i) => {
  // Check 4 audio files per word
  const audioFiles = [
    `vocab_${word}.mp3`,
    `vocab_def_${word}.mp3`,
    `vocab_ex_${word}.mp3`,
    `vocab_coll_${word}.mp3`
  ];
  
  audioFiles.forEach(file => {
    const filePath = path.join(audioDir, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`❌ Missing audio: ${weekStr}/${file}`);
    }
  });
  
  // Check 1 image per word
  const imageFile = `vocab_${word}.jpg`;
  const imagePath = path.join(imageDir, imageFile);
  if (!fs.existsSync(imagePath)) {
    errors.push(`❌ Missing image: ${weekStr}/${imageFile}`);
  }
});

// Expected: 10 words × 4 audio + 10 images = 50 assets
const expectedVocabAudio = 40;
const expectedVocabImages = 10;

console.log(`  Expected: ${expectedVocabAudio} audio + ${expectedVocabImages} images`);

// ===== WORD POWER VALIDATION =====
console.log('📝 Validating word_power.js assets...');
const wordPowerPhrases = ['feel_happy', 'look_sad', 'sound_funny']; // Replace with actual

wordPowerPhrases.forEach(phrase => {
  // Check 5 audio files per phrase
  const audioFiles = [
    `wordpower_${phrase}.mp3`,
    `wordpower_def_${phrase}.mp3`,
    `wordpower_ex_${phrase}.mp3`,
    `wordpower_coll_${phrase}.mp3`,
    `wordpower_model_${phrase}.mp3`
  ];
  
  audioFiles.forEach(file => {
    const filePath = path.join(audioDir, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`❌ Missing audio: ${weekStr}/${file}`);
    }
  });
  
  // Check 1 image per phrase
  const imageFile = `wordpower_${phrase}.jpg`;
  const imagePath = path.join(imageDir, imageFile);
  if (!fs.existsSync(imagePath)) {
    errors.push(`❌ Missing image: ${weekStr}/${imageFile}`);
  }
});

// Expected: 3 phrases × 5 audio + 3 images = 18 assets
console.log(`  Expected: 15 audio + 3 images`);

// ===== MINDMAP VALIDATION =====
console.log('📝 Validating mindmap.js assets...');

// Check 6 stems
for (let i = 1; i <= 6; i++) {
  const file = `mindmap_stem_${i}.mp3`;
  const filePath = path.join(audioDir, file);
  if (!fs.existsSync(filePath)) {
    errors.push(`❌ Missing audio: ${weekStr}/${file}`);
  }
}

// Check 36 branches
for (let i = 1; i <= 36; i++) {
  const file = `mindmap_branch_${i}.mp3`;
  const filePath = path.join(audioDir, file);
  if (!fs.existsSync(filePath)) {
    errors.push(`❌ Missing audio: ${weekStr}/${file}`);
  }
}

console.log(`  Expected: 42 audio (6 stems + 36 branches)`);

// ===== DICTATION/SHADOWING VALIDATION =====
console.log('📝 Validating dictation/shadowing assets...');

const dictationCount = mode === 'easy' ? 12 : 14;

// Check dictation audio
for (let i = 1; i <= dictationCount; i++) {
  const file = `dictation_${i}.mp3`;
  const filePath = path.join(audioDir, file);
  if (!fs.existsSync(filePath)) {
    errors.push(`❌ Missing audio: ${weekStr}/${file}`);
  }
}

// Check shadowing audio (same count + 1 full)
for (let i = 1; i <= dictationCount; i++) {
  const file = `shadowing_${i}.mp3`;
  const filePath = path.join(audioDir, file);
  if (!fs.existsSync(filePath)) {
    errors.push(`❌ Missing audio: ${weekStr}/${file}`);
  }
}

const shadowingFullPath = path.join(audioDir, 'shadowing_full.mp3');
if (!fs.existsSync(shadowingFullPath)) {
  errors.push(`❌ Missing audio: ${weekStr}/shadowing_full.mp3`);
}

console.log(`  Expected: ${dictationCount} dictation + ${dictationCount + 1} shadowing`);

// ===== PRINT RESULTS =====
console.log('\n' + '='.repeat(60));
if (errors.length === 0) {
  console.log('✅ ALL ASSETS VALID');
} else {
  console.log(`❌ FOUND ${errors.length} ERRORS:\n`);
  errors.forEach(err => console.log(err));
  process.exit(1);
}

if (warnings.length > 0) {
  console.log(`\n⚠️  ${warnings.length} WARNINGS:\n`);
  warnings.forEach(warn => console.log(warn));
}
console.log('='.repeat(60) + '\n');
```

---

## 🔧 CLEANUP & REGENERATION SCRIPT

### File: `MASS/tools/cleanup_and_regenerate.sh`

```bash
#!/bin/bash
# Cleanup incorrect assets and regenerate

WEEK=$1
MODE=${2:-"advanced"}

if [ -z "$WEEK" ]; then
  echo "Usage: bash cleanup_and_regenerate.sh <week> [mode]"
  exit 1
fi

WEEK_STR="week${WEEK}"
if [ "$MODE" == "easy" ]; then
  WEEK_STR="week${WEEK}_easy"
fi

AUDIO_DIR="public/audio/$WEEK_STR"
IMAGE_DIR="public/images/$WEEK_STR"

echo "🧹 Cleaning up incorrect assets..."

# Delete incorrectly named files
echo "  Removing files with wrong prefix..."
rm -f "$AUDIO_DIR/def_*.mp3" 2>/dev/null
rm -f "$AUDIO_DIR/ex_*.mp3" 2>/dev/null
rm -f "$AUDIO_DIR/coll_*.mp3" 2>/dev/null
rm -f "$AUDIO_DIR/read_main.mp3" 2>/dev/null

echo "  ✅ Cleanup complete"

echo ""
echo "🔄 Regenerating assets..."

# Run validation first
node MASS/tools/validate_assets.cjs $WEEK $MODE

if [ $? -ne 0 ]; then
  echo ""
  echo "⚠️  Validation failed. Generating missing assets..."
  
  # Generate audio
  echo "  Generating audio..."
  python3 tools/generate_audio_final.py $WEEK --mode=$MODE
  
  # Generate images
  echo "  Generating images..."
  node tools/generate_images_nano.js $WEEK $MODE
  
  # Validate again
  echo ""
  echo "✅ Regeneration complete. Running final validation..."
  node MASS/tools/validate_assets.cjs $WEEK $MODE
fi
```

---

## 📋 MASS PRODUCTION UPDATED WORKFLOW

### Updated Step 3: Generate Stations + Validate Assets

```bash
# Step 3a: Generate station files
node MASS/tools/create_week.cjs 5

# Step 3b: Validate asset requirements in code
node MASS/tools/validate_assets.cjs 5 advanced
node MASS/tools/validate_assets.cjs 5 easy

# If validation fails:
bash MASS/tools/cleanup_and_regenerate.sh 5 advanced
bash MASS/tools/cleanup_and_regenerate.sh 5 easy
```

---

## ✅ FINAL CHECKLIST

### Before Committing Week:
- [ ] Run: `node MASS/tools/validate_assets.cjs <week> advanced`
- [ ] Run: `node MASS/tools/validate_assets.cjs <week> easy`
- [ ] Check: All audio files have correct prefix
- [ ] Check: Vocab has 40 audio (10 words × 4 fields)
- [ ] Check: Word Power has 15 audio (3 phrases × 5 fields)
- [ ] Check: Mindmap has 42 audio (6 stems + 36 branches) in BOTH modes
- [ ] Check: Dictation count = Read sentence count
- [ ] Check: Shadowing count = Dictation count + 1
- [ ] Check: All paths start with `/audio/weekX/` or `/images/weekX/`
- [ ] Test: Load week in UI, check all audio plays
- [ ] Test: Check all images display (no broken icons)

### After Asset Generation:
- [ ] Verify: All audio files exist on disk at expected paths
- [ ] Verify: All image files exist on disk at expected paths
- [ ] Clean: Delete any incorrectly named files
- [ ] Regenerate: Run generation script if count mismatch

---

**Version History**:
- v1.0 (Jan 20, 2026): Initial matrix based on Week 4 golden standard and Week 5 fixes
