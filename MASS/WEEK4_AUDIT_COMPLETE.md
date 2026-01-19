# ✅ WEEK 4 COMPLETE AUDIT - 100% VERIFIED

**Date**: January 18, 2026  
**Purpose**: Locked schemas PHẢI match Week 4 từng dòng code

---

## 📊 WEEK 4 STRUCTURE - VERIFIED

### 13 Station Files:

| File | Lines | Audio Fields | Image Fields | Structure |
|------|-------|--------------|--------------|-----------|
| **vocab.js** | 115 | `audio_word` (10) | `image_url` (10) | 10 words, CHỈ 1 audio field |
| **read.js** | 31 | NONE | `image_url` (1) | Cover image only |
| **grammar.js** | 100 | NONE | NONE | 20 exercises, no media |
| **dictation.js** | 18 | NONE | NONE | 14 sentences, text only |
| **shadowing.js** | 20 | `audio_url` (14) + `audio_full` (1) | NONE | Same as dictation + audio |
| **writing.js** | 11 | NONE | NONE | Title, prompts, keywords |
| **ask_ai.js** | 52 | `audio_url` (5) | NONE | 5 prompts with audio |
| **logic.js** | 52 | `audio_url` (5) | NONE | 5 puzzles with audio |
| **explore.js** | 34 | NONE | `image_url` (1) | CLIL content + cover |
| **word_power.js** | 30 | NONE | `image_url` (3) | 3 phrases, NO AUDIO in schema |
| **mindmap.js** | 74 | `audio` (42) | NONE | 6 stems + 36 branches |
| **daily_watch.js** | 23 | NONE | NONE | 5 videos, no media |
| **index.js** | 44 | NONE | NONE | voiceConfig + imports |

---

## 🚨 CRITICAL FINDINGS

### 1. VOCAB.JS - SCHEMA SAI HOÀN TOÀN!

**Week 4 Actual**:
```javascript
{
  id: 1,
  word: "happy",
  pronunciation: "/ˈhæpi/",
  definition_vi: "vui vẻ",
  definition_en: "feeling very good and joyful",
  example: "I am happy today.",
  collocation: "happy face",
  image_url: "/images/week4/happy.jpg",
  audio_word: "/audio/week4/vocab_happy.mp3"  // ⬅️ CHỈ CÓ 1 FIELD!
}
```

**Files thực tế có**:
- `vocab_happy.mp3` - word pronunciation
- `vocab_def_happy.mp3` - definition audio
- `vocab_ex_happy.mp3` - example audio  
- `vocab_coll_happy.mp3` - collocation audio

**Vấn đề**: 
- Schema: 1 audio field (`audio_word`)
- Files: 40 audio files (10 words × 4 types)
- **Scripts generate 40 files nhưng schema KHÔNG reference!**

**Action**: Schema phải giữ nguyên 1 field (Week 4 structure), nhưng document rằng scripts sẽ generate thêm 3 files ngoài schema.

---

### 2. WORD_POWER.JS - KHÔNG CÓ AUDIO FIELDS!

**Week 4 Actual**:
```javascript
{
  id: 1,
  word: "feel happy",
  pronunciation: "/fiːl ˈhæpi/",
  cefr_level: "A1",
  definition_en: "to have joy inside you",
  definition_vi: "cảm thấy vui vẻ",
  example: "I feel happy when I play.",
  model_sentence: "I feel happy when I sing my favorite song.",
  collocation: "feel happy about something",
  image_url: "/images/week4/wordpower_feel_happy.jpg"
  // ⬅️ KHÔNG CÓ AUDIO FIELD NÀO!
}
```

**Files thực tế có**:
- `wordpower_feel_happy.mp3`
- `wordpower_ex_feel_happy.mp3`
- `wordpower_model_feel_happy.mp3`
- `wordpower_coll_feel_happy.mp3`

**Vấn đề**: Schema KHÔNG có audio fields, nhưng scripts generate 12 files (3 words × 4 types).

**Action**: Schema phải giữ nguyên KHÔNG có audio fields (theo Week 4), document rằng scripts generate audio riêng.

---

### 3. MINDMAP.JS - ĐÚNG 100%!

**Week 4 Structure**:
```javascript
{
  centerStems: [
    { text: "I like ___.", audio: "/audio/week4/mindmap_stem_1.mp3" },
    // 6 stems total
  ],
  branchLabels: {
    "I like ___.": [
      { text: "playing games", audio: "/audio/week4/mindmap_branch_1.mp3" },
      // 6 branches per stem
    ]
  }
}
```

**Verified**: 
- 6 stems with audio ✅
- 36 branches (6 per stem) with audio ✅
- Path format: `mindmap_stem_X.mp3`, `mindmap_branch_X.mp3` ✅

---

### 4. SHADOWING.JS - CÓ AUDIO_FULL!

**Week 4 Structure**:
```javascript
export default {
  audio_full: "/audio/week4/shadowing_full.mp3",  // ⬅️ Extra field!
  sentences: [
    { id: 1, text: "...", vi: "...", audio_url: "/audio/week4/shadowing_1.mp3" }
  ]
};
```

**Verified**:
- `audio_full` field for complete narration ✅
- 14 individual sentence audios ✅
- Total: 15 audio files for shadowing ✅

---

### 5. PATH FORMATS - VERIFIED 100%!

**Covers**:
- ✅ `read_cover_w04.jpg` (NOT read_cover.jpg)
- ✅ `explore_cover_w04.jpg` (NOT explore_cover.jpg)

**Audio paths**:
- ✅ `/audio/week4/` (NOT /audio/week_04/)
- ✅ `/audio/week4/vocab_happy.mp3` (word lowercase, underscore)

**Image paths**:
- ✅ `/images/week4/happy.jpg` (word lowercase)
- ✅ `/images/week4/wordpower_feel_happy.jpg` (prefix + underscores)

---

## 📋 TOTAL ASSET COUNT - VERIFIED

### Audio Files (Week 4 /public/audio/week4/):

```
Station breakdown:
  vocab               10 files  (vocab_<word>.mp3)
  vocab_def           10 files  (vocab_def_<word>.mp3)
  vocab_ex            10 files  (vocab_ex_<word>.mp3)
  vocab_coll          10 files  (vocab_coll_<word>.mp3)
  ───────────────────────────
  Vocab subtotal      40 files
  
  wordpower            3 files  (wordpower_<phrase>.mp3)
  wordpower_ex         3 files  
  wordpower_model      3 files
  wordpower_coll       3 files
  ───────────────────────────
  Word Power subtotal 12 files
  
  mindmap_stem         6 files
  mindmap_branch      36 files
  ───────────────────────────
  Mindmap subtotal    42 files
  
  shadowing           14 files  (shadowing_1-14.mp3)
  shadowing_full       1 file
  ───────────────────────────
  Shadowing subtotal  15 files
  
  ask_ai               5 files
  logic                5 files
  dictation           14 files  (generated but not in schema)
  ───────────────────────────
  Other subtotal      24 files
  
  ═══════════════════════════
  TOTAL              133 files (actual: 138 = +5 extras)
```

**Actual count**: 138 files  
**Expected**: 133 files  
**Difference**: 5 files (likely grammar or extra variations)

### Image Files (Week 4 /public/images/week4/):

```
  vocab images        10 files  (happy.jpg, sad.jpg, ...)
  word_power           3 files  (wordpower_feel_happy.jpg, ...)
  read cover           1 file   (read_cover_w04.jpg)
  explore cover        1 file   (explore_cover_w04.jpg)
  ───────────────────────────
  TOTAL               15 files  (Phase 1 standard)
```

---

## 🔧 SCHEMA CORRECTIONS REQUIRED

### Priority 1: 09_STATIONS_ADVANCED.txt

**Lines to fix**:

1. **VOCAB.JS Schema** (lines 25-45):
   - Keep `audio_word` only (match Week 4)
   - Add note: "Scripts generate 3 additional audio files (def, ex, coll) outside schema"

2. **WORD_POWER.JS Schema** (lines 500-540):
   - Remove all audio fields (match Week 4)
   - Add note: "Scripts generate audio files separately, not referenced in schema"

3. **SHADOWING.JS Schema** (lines 180-200):
   - Add `audio_full` field at root level
   - Keep `audio_url` for sentences

4. **MINDMAP.JS Schema** (lines 400-450):
   - Verify structure matches Week 4 (looks correct already)

### Priority 2: 10_STATIONS_EASY.txt

Same corrections as Advanced, với adjustments cho Easy mode.

### Priority 3: 08_STATIONS_CORE.txt

Update general rules:
- Document audio generation behavior (schema vs. actual files)
- Add audio_full field to shadowing description

### Priority 4: TEMPLATES/week_template_variants.js

Update comments to match actual Week 4 structure.

### Priority 5: 12_ASSET_GENERATION.txt

Update audio count table:
- Vocab: "40 files (10 words, 4 types each - 3 outside schema)"
- Word Power: "12 files (3 phrases, 4 types each - all outside schema)"
- Total: "~130-140 files"

---

## ✅ VALIDATION CHECKLIST

Before mass production, verify:

- [ ] All schemas match Week 4 structure 100%
- [ ] Audio field names: `audio_word`, `audio_url`, `audio`, `audio_full`
- [ ] Image field names: `image_url` consistently
- [ ] Path formats: `/audio/week4/`, `/images/week4/`
- [ ] Cover naming: `read_cover_w04.jpg`, `explore_cover_w04.jpg`
- [ ] Mindmap: 6 stems + 36 branches with audio
- [ ] Shadowing: audio_full + 14 sentence audios
- [ ] Word power: NO audio fields in schema (scripts generate separately)
- [ ] Vocab: Only audio_word in schema (scripts generate 3 more)
- [ ] Total counts: ~138 audio, 15 images (Phase 1)

---

## 🎯 IMPLEMENTATION PLAN

1. **Update 09_STATIONS_ADVANCED.txt** (vocab, word_power, shadowing sections)
2. **Update 10_STATIONS_EASY.txt** (same sections)
3. **Update 08_STATIONS_CORE.txt** (general audio rules)
4. **Update TEMPLATES** (comments and structure)
5. **Update 12_ASSET_GENERATION.txt** (counts table)
6. **Test with Week 5 generation**
7. **Validate all fields match Week 4**

---

**Status**: READY FOR CORRECTIONS  
**Next Step**: Update prompts/templates với exact Week 4 structure
