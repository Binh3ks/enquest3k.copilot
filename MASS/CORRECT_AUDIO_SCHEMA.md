# 🎯 CẤU TRÚC WEEK CHÍNH XÁC - BASED ON ACTUAL AUDIO FILES

**Date**: January 19, 2026  
**Source**: Actual audio files in public/audio/week1/ + Code audit  
**Purpose**: CORRECT schema cho mass production Week 5-156

---

## 📊 PHÁT HIỆN QUAN TRỌNG

### ⚠️ CODE vs ACTUAL FILES MISMATCH:

**CODE (vocab.js)**: Chỉ có 1 audio field
```javascript
{
  word: "student",
  audio_word: "/audio/week1/vocab_student.mp3"  // ONLY 1!
}
```

**ACTUAL FILES (public/audio/week1/)**: Có 4 audio per word
```
vocab_student.mp3           ← word audio
vocab_def_student.mp3       ← definition audio
vocab_ex_student.mp3        ← example audio
vocab_coll_student.mp3      ← collocation audio
```

**WORDPOWER FILES**: Có 5 audio per phrase
```
wordpower_do_homework.mp3       ← word/phrase audio
wordpower_def_do_homework.mp3   ← definition audio
wordpower_ex_do_homework.mp3    ← example audio
wordpower_coll_do_homework.mp3  ← collocation audio
wordpower_model_do_homework.mp3 ← model_sentence audio
```

**⚠️ CRITICAL**: CODE THIẾU 3-4 audio fields! Cần UPDATE schema!

---

## 🎯 2 MODES STRUCTURE

### Shared Components (DÙNG CHUNG cả 2 modes):
1. **AI Tutor**: `week_XX_real.js` (1 file cho Story, Chat, Quiz, Speak tabs)
2. **Video Queries**: `video_queries.json` (1 file cho Daily Watch)

### Separate Components (RIÊNG cho mỗi mode):
1. **Stations**: 14-15 .js files với nội dung khác nhau
2. **Images**: Separate folders (`week_XX/` vs `week_XX_easy/`)
3. **Audio**: Separate folders (`week_XX/` vs `week_XX_easy/`)

---

## 📁 AUDIO FILES COUNT - CHÍNH XÁC

### Advanced Mode Audio Breakdown:

| Station | Count Formula | Week 1 Actual | Files |
|---------|---------------|---------------|-------|
| **New Words (vocab)** | 10 words × 4 audio | 40 | vocab_{word}.mp3, vocab_def_{word}.mp3, vocab_ex_{word}.mp3, vocab_coll_{word}.mp3 |
| **Word Power** | 3 phrases × 5 audio | 15 | wordpower_{phrase}.mp3, wordpower_def_{phrase}.mp3, wordpower_ex_{phrase}.mp3, wordpower_coll_{phrase}.mp3, wordpower_model_{phrase}.mp3 |
| **Read** | 1 full story | 1 | story_read.mp3 |
| **Dictation** | N sentences × 1 | 10 | dictation_1.mp3 → dictation_10.mp3 |
| **Shadowing** | N sentences + 1 full | 11 | shadowing_1.mp3 → shadowing_10.mp3, shadowing_full.mp3 |
| **Explore** | 1 full content | 1 | explore_main.mp3 |
| **Mindmap** | 6 stems + 36 branches | 42 | mindmap_stem_1-6.mp3, mindmap_branch_1-36.mp3 |
| **Ask AI** | 5 prompts | 5 | ask_ai_1.mp3 → ask_ai_5.mp3 |
| **Logic** | 5 puzzles | 5 | logic_1.mp3 → logic_5.mp3 |
| **TOTAL** | | **130** | |

**Week 1 Verification**: `ls public/audio/week1/ | wc -l` = **130 files** ✅

### Easy Mode Audio Breakdown:

| Station | Count Formula | Estimate | Notes |
|---------|---------------|----------|-------|
| **New Words (vocab)** | 10 words × 4 audio | 40 | Different words from Advanced |
| **Word Power** | 3-4 phrases × 5 audio | 15-20 | May have more phrases |
| **Read** | 1 full story | 1 | Shorter story |
| **Dictation** | ~8 sentences × 1 | 8 | Fewer sentences |
| **Shadowing** | ~8 sentences + 1 full | 9 | Fewer sentences |
| **Explore** | 1 full content | 1 | Simpler content |
| **Mindmap** | 6 stems + 36 branches | 42 | Same structure |
| **Ask AI** | 5 prompts | 5 | |
| **Logic** | 5 puzzles | 5 | |
| **TOTAL** | | **~126-131** | |

**Total per Week**: Advanced 130 + Easy ~128 = **~258 audio files**

---

## 📁 IMAGES COUNT - CHÍNH XÁC

### Advanced Mode Images:

| Station | Count | Files |
|---------|-------|-------|
| **New Words (vocab)** | 10 | student.jpg, teacher.jpg, school.jpg, ... |
| **Word Power** | 3 | wordpower_do_homework.jpg, wordpower_go_to_school.jpg, wordpower_pay_attention.jpg |
| **Read Cover** | 1 | read_cover_w01.jpg |
| **Explore Cover** | 1 | explore_cover_w01.jpg |
| **TOTAL** | **15** | |

**Week 1 Verification**: `ls public/images/week1/ | wc -l` = **17 files** (có thêm 2 extras)

### Easy Mode Images:

| Station | Count | Files |
|---------|-------|-------|
| **New Words (vocab)** | 10 | name.jpg, friend.jpg, desk.jpg, chair.jpg, pen.jpg, ... (DIFFERENT from Advanced!) |
| **Word Power** | 4-7 | wordpower_*.jpg (more phrases) |
| **Read Cover** | 1 | read_cover_w01.jpg |
| **Explore Cover** | 1 | explore_cover_w01.jpg |
| **TOTAL** | **16-19** | |

**Week 1 Verification**: `ls public/images/week1_easy/ | wc -l` = **29 files** (có nhiều extras)

**Total per Week**: Advanced 17 + Easy 29 = **~46 images**

---

## 🔧 SCHEMA UPDATES REQUIRED

### 1. vocab.js Schema - CURRENT vs NEEDED:

**❌ CURRENT (THIẾU 3 audio fields)**:
```javascript
{
  id: 1,
  word: "student",
  pronunciation: "/ˈstuːdənt/",
  definition_vi: "Học sinh",
  definition_en: "A person who is learning at a school.",
  example: "I am a student at Greenwood School.",
  collocation: "good student",
  image_url: "/images/week1/student.jpg",
  audio_word: "/audio/week1/vocab_student.mp3"  // ONLY 1!
}
```

**✅ NEEDED (ĐẦY ĐỦ 4 audio fields)**:
```javascript
{
  id: 1,
  word: "student",
  pronunciation: "/ˈstuːdənt/",
  definition_vi: "Học sinh",
  definition_en: "A person who is learning at a school.",
  example: "I am a student at Greenwood School.",
  collocation: "good student",
  image_url: "/images/week1/student.jpg",
  
  // ⚠️ ADD 4 AUDIO FIELDS:
  audio_word: "/audio/week1/vocab_student.mp3",
  audio_definition: "/audio/week1/vocab_def_student.mp3",
  audio_example: "/audio/week1/vocab_ex_student.mp3",
  audio_collocation: "/audio/week1/vocab_coll_student.mp3"
}
```

**Count**: 10 words × 4 audio = **40 audio files**

---

### 2. word_power.js Schema - CURRENT vs NEEDED:

**❌ CURRENT (THIẾU TẤT CẢ audio fields)**:
```javascript
{
  id: 1,
  word: "do homework",
  pronunciation: "/duː ˈhoʊmwɜːrk/",
  cefr_level: "A1",
  definition_en: "To complete school assignments at home.",
  definition_vi: "Hoàn thành bài tập ở nhà.",
  example: "I do my homework every evening after dinner.",
  model_sentence: "Every student should do homework to practice what they learned in class.",
  collocation: "do your homework",
  image_url: "/images/week1/wordpower_do_homework.jpg"
  // ❌ NO AUDIO FIELDS!
}
```

**✅ NEEDED (ĐẦY ĐỦ 5 audio fields)**:
```javascript
{
  id: 1,
  word: "do homework",
  pronunciation: "/duː ˈhoʊmwɜːrk/",
  cefr_level: "A1",
  definition_en: "To complete school assignments at home.",
  definition_vi: "Hoàn thành bài tập ở nhà.",
  example: "I do my homework every evening after dinner.",
  model_sentence: "Every student should do homework to practice what they learned in class.",
  collocation: "do your homework",
  image_url: "/images/week1/wordpower_do_homework.jpg",
  
  // ⚠️ ADD 5 AUDIO FIELDS:
  audio_word: "/audio/week1/wordpower_do_homework.mp3",
  audio_definition: "/audio/week1/wordpower_def_do_homework.mp3",
  audio_example: "/audio/week1/wordpower_ex_do_homework.mp3",
  audio_collocation: "/audio/week1/wordpower_coll_do_homework.mp3",
  audio_model: "/audio/week1/wordpower_model_do_homework.mp3"
}
```

**Count**: 3 phrases × 5 audio = **15 audio files**

---

### 3. Other Stations - Already Correct:

**read.js** - ✅ CORRECT:
```javascript
{
  title: "...",
  content_en: "...",
  content_vi: "...",
  image_url: "/images/week1/read_cover_w01.jpg",
  audio_url: "/audio/week1/story_read.mp3"  // 1 audio for full story
}
```

**dictation.js** - ✅ CORRECT:
```javascript
{
  sentences: [
    { id: 1, text: "...", meaning: "...", audio_url: "/audio/week1/dictation_1.mp3" },
    // N sentences × 1 audio each
  ]
}
```

**shadowing.js** - ✅ CORRECT:
```javascript
{
  audio_full: "/audio/week1/shadowing_full.mp3",  // 1 full audio
  script: [
    { id: 1, text: "...", vi: "...", audio_url: "/audio/week1/shadowing_1.mp3" },
    // N sentences × 1 audio each + 1 full = N+1 audio
  ]
}
```

**explore.js** - ✅ CORRECT:
```javascript
{
  title_en: "...",
  content_en: "...",
  image_url: "/images/week1/explore_cover_w01.jpg",
  audio_url: "/audio/week1/explore_main.mp3"  // 1 audio for full content
}
```

**mindmap.js** - ✅ CORRECT:
```javascript
{
  centerStems: [
    { text: "...", audio: "/audio/week1/mindmap_stem_1.mp3" },
    // 6 stems × 1 audio = 6
  ],
  branchLabels: {
    "Stem 1": [
      { text: "...", audio: "/audio/week1/mindmap_branch_1.mp3" },
      // 6 branches per stem × 6 stems = 36
    ]
  }
}
```

**ask_ai.js** - ✅ CORRECT:
```javascript
{
  prompts: [
    { id: 1, context_en: "...", audio_url: "/audio/week1/ask_ai_1.mp3", ... },
    // 5 prompts × 1 audio = 5
  ]
}
```

**logic.js** - ✅ CORRECT:
```javascript
{
  puzzles: [
    { id: 1, question_en: "...", audio_url: "/audio/week1/logic_1.mp3", ... },
    // 5 puzzles × 1 audio = 5
  ]
}
```

---

## 📋 COMPLETE AUDIO & IMAGE COUNTS

### Per Week Totals:

| Asset Type | Advanced | Easy | Total |
|------------|----------|------|-------|
| **Audio Files** | 130 | ~128 | ~258 |
| **Image Files** | 17 | 29 | 46 |
| **Station Files** | 15 | 16 | 31 |
| **AI Tutor File** | 1 (shared) | 1 (shared) | 1 |
| **Video Queries** | 1 (shared) | 0 | 1 |

### Audio Breakdown Detail:

**Advanced Mode (130 files)**:
- vocab: 10 × 4 = 40
- wordpower: 3 × 5 = 15
- read: 1
- dictation: 10 (Week 1 has 10 sentences)
- shadowing: 10 + 1 = 11
- explore: 1
- mindmap: 6 + 36 = 42
- ask_ai: 5
- logic: 5
- **Total**: 130 ✅

**Easy Mode (~128 files)**:
- vocab: 10 × 4 = 40
- wordpower: 3-4 × 5 = 15-20
- read: 1
- dictation: 8 (fewer sentences)
- shadowing: 8 + 1 = 9
- explore: 1
- mindmap: 6 + 36 = 42
- ask_ai: 5
- logic: 5
- **Total**: ~126-131

---

## 🔄 WORKFLOW UPDATES

### STEP 1: Update Schemas in Prompts

**File**: `MASS/PROMPTS/08_STATIONS_CORE.txt`

Add to vocab.js section:
```
⚠️ AUDIO FIELDS - MANDATORY 4 fields per word:
- audio_word: "/audio/week{X}/vocab_{word}.mp3"
- audio_definition: "/audio/week{X}/vocab_def_{word}.mp3"
- audio_example: "/audio/week{X}/vocab_ex_{word}.mp3"
- audio_collocation: "/audio/week{X}/vocab_coll_{word}.mp3"

Total: 10 words × 4 audio = 40 audio files
```

Add to word_power.js section:
```
⚠️ AUDIO FIELDS - MANDATORY 5 fields per phrase:
- audio_word: "/audio/week{X}/wordpower_{phrase}.mp3"
- audio_definition: "/audio/week{X}/wordpower_def_{phrase}.mp3"
- audio_example: "/audio/week{X}/wordpower_ex_{phrase}.mp3"
- audio_collocation: "/audio/week{X}/wordpower_coll_{phrase}.mp3"
- audio_model: "/audio/week{X}/wordpower_model_{phrase}.mp3"

Total: 3 phrases × 5 audio = 15 audio files
```

---

### STEP 2: Update generate_audio.js Script

**Current**: Script only generates 1 audio per vocab word
**Needed**: Generate 4 audio per vocab word + 5 per wordpower phrase

**New logic**:
```javascript
// For each vocab word:
await generateAudio(word.word, `vocab_${word.word}.mp3`);
await generateAudio(word.definition_en, `vocab_def_${word.word}.mp3`);
await generateAudio(word.example, `vocab_ex_${word.word}.mp3`);
await generateAudio(word.collocation, `vocab_coll_${word.word}.mp3`);

// For each wordpower phrase:
await generateAudio(phrase.word, `wordpower_${phrase.word}.mp3`);
await generateAudio(phrase.definition_en, `wordpower_def_${phrase.word}.mp3`);
await generateAudio(phrase.example, `wordpower_ex_${phrase.word}.mp3`);
await generateAudio(phrase.collocation, `wordpower_coll_${phrase.word}.mp3`);
await generateAudio(phrase.model_sentence, `wordpower_model_${phrase.word}.mp3`);
```

---

## 🎯 WEEK 4 DRY RUN - TODO

Sau khi update schemas, cần:

1. **Update Week 4 vocab.js**: Add 3 missing audio fields
2. **Update Week 4 word_power.js**: Add 5 audio fields
3. **Regenerate audio files**: `node tools/generate_audio.js 4 4`
4. **Verify counts**:
   ```bash
   ls public/audio/week4/ | wc -l  # Should be 130
   ls public/audio/week4_easy/ | wc -l  # Should be ~128
   ```
5. **Update index files**: Ensure proper imports
6. **Test in app**: All audio should play correctly

---

## ✅ SUMMARY

### Current State:
- ❌ Code has 1 audio field per vocab word (actual files: 4)
- ❌ Code has 0 audio fields for wordpower (actual files: 5)
- ✅ Week 1 has 130 audio files generated correctly
- ❌ Schema thiếu 3-4 audio fields

### Required Actions:
1. Update vocab.js schema: Add 3 audio fields
2. Update word_power.js schema: Add 5 audio fields
3. Update prompts with correct schemas
4. Update generate_audio.js to create all audio types
5. Regenerate all weeks with complete audio

### Correct Counts:
- **Audio per week**: ~258 files (130 Adv + 128 Easy)
- **Images per week**: ~46 files (17 Adv + 29 Easy)
- **vocab audio**: 10 × 4 = 40 per mode
- **wordpower audio**: 3 × 5 = 15 per mode
- **dictation/shadowing**: Depends on read.js sentence count (varies 8-14)

**Ready to proceed with schema updates and Week 4 dry run!**
