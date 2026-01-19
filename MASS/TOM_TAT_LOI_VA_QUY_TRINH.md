# 📋 TÓM TẮT - CÁC LỖI ĐÃ SỬA & QUY TRÌNH ĐÚNG

**Date**: January 18, 2026  
**Status**: ✅ HOÀN THÀNH  

---

## 🔴 5 LỖI NGHIÊM TRỌNG ĐÃ PHÁT HIỆN & SỬA

### 1. ❌ Spec có `story_missions` (AI Tutor format - KHÔNG TỒN TẠI trong Week 1-4)

**Phát hiện**: 
```json
// SAI - Week 5 spec có:
{
  "story_missions": {
    "format": "question_variants",
    "count": 3,
    "objectives_distribution": [9, 10, 11]
  }
}
```

**Thực tế Week 4**: 
- KHÔNG có file `week_04_real.js`
- KHÔNG có missions/objectives structure
- CHỈ CÓ 14 station files độc lập

**Đã sửa**: 
```json
// ĐÚNG - Week 5 spec giờ có:
{
  "stations": {
    "format": "station_files",
    "count": 14,
    "required_files": ["vocab.js", "read.js", ..., "video_queries.json"]
  }
}
```

**File sửa**: `MASS/tools/generate_spec.cjs` (lines 253-271)

---

### 2. ❌ Script check 13 files, nhưng Week 4 có 14 files

**Phát hiện**:
```javascript
// SAI - Script check 13 files:
const requiredFiles = [
  'vocab.js', 'read.js', ..., 'index.js'  // Thiếu video_queries.json!
];
```

**Thực tế Week 4**:
```bash
$ ls -1 src/data/weeks/week_04/ | wc -l
14  # ← 14 files, không phải 13!
```

**Đã sửa**:
```javascript
// ĐÚNG - Script check 14 files:
const requiredFiles = [
  'vocab.js', 'read.js', ..., 'index.js', 'video_queries.json'  // ✅ 14 files
];
```

**File sửa**: `MASS/tools/create_week.cjs` (lines 112-116)

---

### 3. ❌ Stations list không match Week 4

**Phát hiện**:
```json
// SAI - Old spec:
"stations": {
  "required": [
    "vocab", "read", "dictation", "spelling", "grammar",
    "listen", "speak", "conversation", "writing",
    "free_talk", "ask_ai", "daily_watch", "game_hub", "mindmap"
  ]
}
```

**Problems**:
- ❌ Missing: `shadowing`, `logic`, `explore`, `word_power`
- ❌ Extra: `spelling`, `listen`, `speak`, `conversation`, `free_talk`, `game_hub`

**Thực tế Week 4 có 14 files**:
1. vocab.js
2. read.js
3. grammar.js
4. dictation.js
5. shadowing.js ← Missing in old!
6. writing.js
7. ask_ai.js
8. logic.js ← Missing in old!
9. explore.js ← Missing in old!
10. word_power.js ← Missing in old!
11. mindmap.js
12. daily_watch.js
13. index.js
14. video_queries.json

**Đã sửa**: Updated spec to list exact 14 files

---

### 4. ❌ Script tìm `week_XX_real.js` (file không tồn tại)

**Phát hiện**:
```javascript
// SAI:
const weekFile = path.join(__dirname, '../../src/data/weeks', 
  `week_${String(weekId).padStart(2, '0')}_real.js`);  // ❌ Không tồn tại!

if (fs.existsSync(weekFile)) { ... }
```

**Thực tế**: Week 4 KHÔNG có `week_04_real.js`, chỉ có folder `week_04/` với 14 files

**Đã sửa**:
```javascript
// ĐÚNG:
const weekDir = path.join(__dirname, '../../src/data/weeks', 
  `week_${String(weekId).padStart(2, '0')}`);  // ✅ Check folder

const requiredFiles = [...];  // 14 files
const existingFiles = requiredFiles.filter(f => 
  fs.existsSync(path.join(weekDir, f))
);
```

---

### 5. ❌ Console messages inconsistent

**Phát hiện**: Một số chỗ nói "13 files", một số chỗ nói "14 files"

**Đã sửa**: ALL messages now say "14 files"

---

## ✅ QUY TRÌNH ĐÚNG (4 BƯỚC)

### BƯỚC 1: Generate Spec
```bash
node MASS/tools/generate_spec.cjs 5
```

**Output**: `MASS/SPECS/week_05_spec.json`
- ✅ NO `story_missions`
- ✅ Has `stations.format = "station_files"`
- ✅ Has `stations.count = 14`
- ✅ Has 14 `required_files`
- ✅ References Week 4 as Golden Standard

---

### BƯỚC 2: Show AI Instructions
```bash
node MASS/tools/create_week.cjs 5
```

**Shows**:
- ✅ Prompts to read: 08, 09, 10, 12
- ✅ Spec location: week_05_spec.json
- ✅ Reference: Week 4 (Golden Standard)
- ✅ Output: 14 station files
- ✅ Status: 0/14 files found → Wait for AI

---

### BƯỚC 3: AI Generates 14 Files

**AI must generate** to `src/data/weeks/week_05/`:

1. **vocab.js** - 10 words, `audio_word` only
2. **read.js** - Story (~150-200 words, split into sentences)
3. **grammar.js** - 20 exercises on Articles A/An
4. **dictation.js** - From read.js, use `meaning:` key
5. **shadowing.js** - From read.js, use `vi:` key + `audio_full`
6. **writing.js** - Writing prompt
7. **ask_ai.js** - 5 AI prompts
8. **logic.js** - 5 logic problems
9. **explore.js** - Exploration content
10. **word_power.js** - 3 phrases, `words` array, NO audio
11. **mindmap.js** - 6 stems × 6 branches = 36 items
12. **daily_watch.js** - 5 video slots (empty)
13. **index.js** - Import all, export weekData
14. **video_queries.json** - 5 search queries

**CRITICAL Rules**:
- ✅ dictation sentences = read sentences (split by periods)
- ✅ shadowing sentences = dictation sentences (EXACT copy)
- ✅ dictation uses `meaning:` key
- ✅ shadowing uses `vi:` key + `audio_full` field
- ✅ word_power has NO audio fields
- ✅ All data from spec (vocab, grammar focus, CEFR)

---

### BƯỚC 4: Generate Assets
```bash
# Validate first
node MASS/tools/create_week.cjs 5  # ✅ Should show: All 14 files exist

# Audio (138 files Advanced, 116 Easy)
node tools/generate_audio.js 5 5

# Images (15 files)
node tools/generate_images_nano.js 5

# Videos (5 videos from 60-channel whitelist)
node tools/update_videos.js 5
```

---

## 📊 CHECKLIST - VALIDATE TRƯỚC KHI TẠO TUẦN MỚI

### Before Generation:
- [ ] Run: `node MASS/tools/generate_spec.cjs <week_number>`
- [ ] Check spec: NO `story_missions`, HAS `stations.count = 14`
- [ ] Run: `node MASS/tools/create_week.cjs <week_number>`
- [ ] Verify prompts: 08, 09, 10, 12 all exist ✅

### After AI Generates:
- [ ] Check: All 14 files exist in `src/data/weeks/week_XX/`
- [ ] Verify: dictation uses `meaning:` key
- [ ] Verify: shadowing uses `vi:` key + has `audio_full`
- [ ] Verify: word_power has NO audio fields
- [ ] Verify: dictation.sentences.length = shadowing.sentences.length
- [ ] Count: vocab.vocab.length = 10 (from spec)
- [ ] Count: grammar.exercises.length = 20

### After Assets:
- [ ] Audio files: ~138 in `public/audio/week_XX/`
- [ ] Image files: ~15 in `public/images/week_XX/`
- [ ] Videos: 5 in `daily_watch.js` with real URLs
- [ ] Test in app: Week loads without errors

---

## 🎯 FILES CHANGED

| File | Changes | Status |
|------|---------|--------|
| `MASS/tools/generate_spec.cjs` | Removed story_missions, added stations structure (14 files) | ✅ FIXED |
| `MASS/tools/create_week.cjs` | Changed from 1 file check to 14 files check, updated messages | ✅ FIXED |
| `MASS/SPECS/week_05_spec.json` | Regenerated with correct structure (no missions, 14 files) | ✅ FIXED |
| `tools/update_videos.js` | Already correct (60 channels, auto "ESL for kids") | ✅ OK |
| `tools/generate_audio.js` | Already correct (138 Advanced, 116 Easy) | ✅ OK |
| `MASS/PROMPTS/*.txt` | Already correct (no AI Tutor references) | ✅ OK |

---

## 📁 WEEK 4 STRUCTURE (GOLDEN STANDARD)

```
src/data/weeks/week_04/
├── vocab.js              (114 lines)  ← 10 words, audio_word only
├── read.js               (36 lines)   ← Story, split into sentences
├── grammar.js            (38 lines)   ← 20 exercises
├── dictation.js          (18 lines)   ← From read, use meaning:
├── shadowing.js          (20 lines)   ← From read, use vi: + audio_full
├── writing.js            (10 lines)   ← Writing prompt
├── ask_ai.js             (44 lines)   ← 5 AI prompts
├── logic.js              (49 lines)   ← 5 logic problems
├── explore.js            (37 lines)   ← Exploration
├── word_power.js         (40 lines)   ← 3 items, NO audio, words array
├── mindmap.js            (62 lines)   ← 6 stems × 6 branches
├── daily_watch.js        (9 lines)    ← 5 video slots
├── index.js              (46 lines)   ← Main export
└── video_queries.json    (11 lines)   ← 5 search queries
```

**Total**: 14 files, ~534 lines

---

## 🚀 READY FOR MASS PRODUCTION

**Status**: ✅ All systems validated and fixed

**Next**: Generate Week 5 với quy trình đúng này

**Command**:
```bash
# Step 1: Spec already generated
# Step 2: Show instructions (already ran)
# Step 3: AI generates 14 files → YOU DO THIS
# Step 4: Run assets scripts
```

**Confidence**: 100% - Đã rà soát từng dòng code, từng file, từng bước
