# 🔍 COMPLETE PROCESS VALIDATION & FIXES

**Date**: January 18, 2026  
**Status**: Rà soát toàn bộ quy trình từ đầu

---

## 📋 USER REQUIREMENTS (Từ Chat Session)

### Yêu cầu 1: Dictation & Shadowing
> "Dictation và shadowing là copy nguyên xi nội dung từ read.js sang và tách thành từng câu"

**Verified**: ✅ Week 4 có 14 sentences (Advanced), 10 sentences (Easy)

### Yêu cầu 2: Easy vs Advanced
> "app có 2 mode là easy và advanced với số lượng assets khác nhau đôi chút"

**Verified**: ✅ 
- Advanced: 138 audio files, week_04/
- Easy: 116 audio files, week_04_easy/

### Yêu cầu 3: Video Script
> "Cũng phải kiểm tra script tạo video xem quy trình tạo video queries và lọc video theo các kênh ưu tiên và whitelist"

**Verified**: ✅ update_videos.js có đầy đủ:
- 60 channels in whitelist (organized by topic)
- Priority filtering (Grammar → English Singsing, Story → Little Fox/Vooks)
- Auto-append "ESL for kids"

### Yêu cầu 4: Mass Production Ready
> "giờ hãy đảm bảo hệ thống spec, template, data và prompts đã chuẩn cho tuần 5"

**Status**: ❌ QUY TRÌNH SAI - Cần sửa toàn bộ

---

## 🚨 ROOT CAUSE: SAI HOÀN TOÀN KIẾN TRÚC

### Phát Hiện:

**Week 4 REALITY** (Golden Standard):
```
src/data/weeks/week_04/
├── vocab.js          ← Station file
├── read.js           ← Station file
├── grammar.js        ← Station file
├── dictation.js      ← Station file
├── shadowing.js      ← Station file
├── writing.js        ← Station file
├── ask_ai.js         ← Station file
├── logic.js          ← Station file
├── explore.js        ← Station file
├── word_power.js     ← Station file
├── mindmap.js        ← Station file
├── daily_watch.js    ← Station file
└── index.js          ← Main index
```

**KHÔNG CÓ**:
- ❌ week_04_real.js (AI Tutor format)
- ❌ story_missions array
- ❌ objectives with question_variants
- ❌ AI Tutor schema

**CHỈ CÓ**:
- ✅ 13 station files độc lập
- ✅ index.js tổng hợp tất cả stations
- ✅ Simple export format

---

## 🔧 CÁC FILE SAI & CẦN SỬA

### 1. MASS/SPECS/week_05_spec.json ❌

**Current (SAI)**:
```json
{
  "story_missions": {
    "format": "question_variants",
    "count": 3,
    "objectives_distribution": [9, 10, 11],
    "total_objectives": 30
  }
}
```

**Should Be (ĐÚNG)**:
```json
{
  "stations": {
    "required": [
      "vocab", "read", "grammar", "dictation", "shadowing",
      "writing", "ask_ai", "logic", "explore", "word_power",
      "mindmap", "daily_watch", "index"
    ],
    "format": "station_files",
    "count": 13
  }
}
```

---

### 2. MASS/tools/generate_spec.cjs ❌

**Current**: Generates AI Tutor spec với missions

**Should**: Generate stations spec matching Week 4

**Fix Required**: Rewrite entire spec generation logic

---

### 3. MASS/PROMPTS/*.txt ⚠️

**Files to KEEP**:
- ✅ 08_STATIONS_CORE.txt
- ✅ 09_STATIONS_ADVANCED.txt  
- ✅ 10_STATIONS_EASY.txt
- ✅ 12_ASSET_GENERATION.txt

**Files to IGNORE** (for now):
- ⏸️ 01-07 (AI Tutor related)
- ⏸️ week_template_*.js (AI Tutor format)

---

### 4. MASS/tools/create_week.cjs ✅

**Current**: Fixed! Now checks 13 station files

**Reads**: Correct prompts (08, 09, 10, 12)

**Validates**: All 13 required files exist

---

## ✅ CORRECT WORKFLOW

### Step 1: Generate Spec (Fixed)
```bash
node MASS/tools/generate_spec.cjs 5
```

**Output**: `MASS/SPECS/week_05_spec.json`

**Structure**:
```json
{
  "week_id": 5,
  "title_en": "...",
  "topic": "...",
  "grammar_focus": "...",
  "target_vocab_words": [...],
  "stations": {
    "required": ["vocab", "read", ...],
    "format": "station_files"
  }
}
```

---

### Step 2: Show Instructions
```bash
node MASS/tools/create_week.cjs 5
```

**Shows**:
1. Prompts to read: 08, 09, 10, 12
2. Reference: Week 4 structure
3. Output: 13 station files

---

### Step 3: AI Generates 13 Files

**Must read**:
1. `MASS/PROMPTS/08_STATIONS_CORE.txt` - Common rules
2. `MASS/PROMPTS/09_STATIONS_ADVANCED.txt` - Advanced schemas
3. `MASS/PROMPTS/10_STATIONS_EASY.txt` - Easy schemas
4. `MASS/PROMPTS/12_ASSET_GENERATION.txt` - Asset rules
5. `MASS/SPECS/week_05_spec.json` - Week data
6. `src/data/weeks/week_04/` - Reference structure

**Must generate**:
```
src/data/weeks/week_05/
├── vocab.js      (10 words, audio_word only)
├── read.js       (150-200 words Advanced, 60-80 Easy)
├── grammar.js    (20 exercises)
├── dictation.js  (from read.js, use meaning:)
├── shadowing.js  (from read.js, use vi:, add audio_full)
├── writing.js
├── ask_ai.js     (5 prompts)
├── logic.js      (5 problems)
├── explore.js
├── word_power.js (NO audio fields!)
├── mindmap.js    (6 stems + 36 branches)
├── daily_watch.js (5 videos)
└── index.js      (imports all)
```

---

### Step 4: Validate
```bash
node MASS/tools/create_week.cjs 5
```

**Checks**:
- ✅ All 13 files exist
- ✅ Schemas match Week 4
- ✅ dictation sentences = read sentences
- ✅ shadowing sentences = dictation sentences
- ✅ word_power has NO audio fields
- ✅ shadowing has audio_full + vi: key

---

### Step 5: Generate Assets
```bash
# Audio (130-140 files)
node tools/generate_audio.js 5 5

# Images (15 files)
node tools/generate_images_nano.js 5

# Videos (5 videos)
node tools/update_videos.js 5
```

---

## 🔨 IMMEDIATE ACTIONS

### Action 1: Fix generate_spec.cjs ⚡ HIGH PRIORITY

**File**: `MASS/tools/generate_spec.cjs`

**Changes**:
```javascript
// Remove AI Tutor logic
- story_missions: { format, count, objectives }

// Add stations logic  
+ stations: {
+   required: [...],
+   format: "station_files",
+   count: 13
+ }
```

---

### Action 2: Validate Prompts Content ⚡ MEDIUM

**Verify**:
- 08_STATIONS_CORE.txt matches Week 4 structure
- 09_STATIONS_ADVANCED.txt has correct schemas
- 10_STATIONS_EASY.txt has correct schemas
- 12_ASSET_GENERATION.txt has correct counts

---

### Action 3: Test Full Pipeline ⚡ HIGH

**Steps**:
1. Delete Week 5 if exists
2. Run: `node MASS/tools/generate_spec.cjs 5`
3. Verify spec structure (no missions, has stations)
4. AI generates 13 files
5. Run: `node MASS/tools/create_week.cjs 5`
6. Verify validation passes
7. Generate assets
8. Test in app

---

## 📊 CHECKLIST FOR MASS PRODUCTION

### Spec Generation:
- [ ] generate_spec.cjs creates stations structure
- [ ] No story_missions in spec
- [ ] target_vocab_words array present
- [ ] Correct CEFR level for week
- [ ] Grammar focus matches syllabus

### Content Generation:
- [ ] AI reads correct prompts (08, 09, 10, 12)
- [ ] AI references Week 4 structure
- [ ] 13 files generated (not 1)
- [ ] Each file matches Week 4 schema exactly
- [ ] dictation = read sentences (use meaning:)
- [ ] shadowing = read sentences (use vi:, add audio_full)
- [ ] word_power has NO audio fields

### Validation:
- [ ] All 13 files exist
- [ ] Schemas validated against Week 4
- [ ] Cross-references correct (dictation=shadowing)
- [ ] Audio paths correct (/audio/weekX/)
- [ ] Image paths correct (/images/weekX/)

### Asset Generation:
- [ ] Audio: 130-140 files
- [ ] Images: 15 files
- [ ] Videos: 5 files
- [ ] video_queries.json created
- [ ] All paths correct

### Dual Mode:
- [ ] Advanced folder: week_05/
- [ ] Easy folder: week_05_easy/
- [ ] Content differences verified
- [ ] Audio counts correct for each

---

## 🎯 NEXT STEPS

1. **FIX generate_spec.cjs** (30 min)
   - Remove AI Tutor logic
   - Add stations structure
   - Test with Week 5

2. **VALIDATE prompts content** (20 min)
   - Check 08, 09, 10, 12 match Week 4
   - Update if needed

3. **TEST full pipeline** (40 min)
   - Generate spec
   - AI creates 13 files
   - Validate
   - Generate assets

4. **DOCUMENT process** (20 min)
   - Update README
   - Update prompts if needed
   - Create example Week 5

**Total Time**: ~2 hours

---

**Status**: Ready to fix generate_spec.cjs first  
**Priority**: CRITICAL - Blocks all Week 5+ generation  
**Confidence**: 100% - Now understand correct structure
