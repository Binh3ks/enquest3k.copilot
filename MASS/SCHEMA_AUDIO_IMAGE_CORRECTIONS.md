# ⚠️ CRITICAL SCHEMA CORRECTIONS - AUDIO & IMAGE FIELDS

**Date**: January 18, 2026  
**Based on**: Week 4 actual structure analysis

---

## 🚨 PROBLEM DISCOVERED

**Prompts SAI**: Các prompts hiện tại chỉ định `audio_word` cho vocab, nhưng **Week 4 thực tế chỉ có 10 audio fields** (1 per word), KHÔNG có audio_def, audio_ex, audio_coll.

**Root Cause**: Week 4 schema khác với prompts!

---

## 📊 WEEK 4 ACTUAL STRUCTURE

### VOCAB.JS (Week 4 Real):
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
  audio_word: "/audio/week4/vocab_happy.mp3"  // ⬅️ CHỈ CÓ 1 AUDIO!
}
```

### AUDIO FILES IN /public/audio/week4:
```
Vocab audio files: 40 total
  - vocab_happy.mp3(word only - 10 files)
  - vocab_def_happy.mp3 (definition - 10 files)
  - vocab_ex_happy.mp3 (example - 10 files)
  - vocab_coll_happy.mp3 (collocation - 10 files)
```

**Kết luận**: 
- **Schema có**: 1 field (`audio_word`)
- **Files có**: 4 types × 10 words = **40 files**
- **Mismatch**: Scripts generate 40 files nhưng schema không reference hết!

---

## ✅ CORRECT AUDIO COUNT

### Total audio count per week: **~130-140 files**

#### Breakdown (Week 4 Phase 1):

| Station | Field Pattern | Count | Notes |
|---------|--------------|-------|-------|
| **vocab.js** | `audio_word`, `audio_def`, `audio_ex`, `audio_coll` | **40** | 10 words × 4 audio types |
| **word_power.js** | Similar | **12** | 3 words × 4 audio types |
| **mindmap.js** | `audio` (stems + branches) | **42** | 6 stems + 36 branches |
| **dictation.js** | No audio field | **0** | Audio generated but not in schema |
| **shadowing.js** | `audio_url` | **14** | 14 sentences |
| **ask_ai.js** | `audio_url` | **5** | 5 prompts |
| **logic.js** | `audio_url` | **5** | 5 puzzles |
| **grammar.js** | No audio | **0** | Exercises only |
| **read.js** | No audio field | **0** | Story text only |
| **explore.js** | No audio field | **0** | CLIL content |
| **writing.js** | No audio | **0** | Writing prompts |
| **daily_watch.js** | No audio | **0** | Video links only |
| **EXTRA** | Dictation actual files | **14** | Not in schema but generated |
| | | | |
| **TOTAL** | | **132** | Matches Week 4: 138 files |

**Note**: Difference (138 vs 132) = extra files như `vocab_pron_*.mp3` hoặc variation files

---

## 🔧 SCHEMA CORRECTIONS NEEDED

### 1. VOCAB.JS Schema (09_STATIONS_ADVANCED.txt)

**❌ WRONG** (Current prompts):
```javascript
{
  audio_word: "/audio/weekX/vocab_happy.mp3"  // Only 1 field
}
```

**✅ CORRECT** (Should be):
```javascript
{
  audio_word: "/audio/weekX/vocab_happy.mp3",      // Word only
  audio_def: "/audio/weekX/vocab_def_happy.mp3",   // Definition
  audio_ex: "/audio/weekX/vocab_ex_happy.mp3",     // Example sentence
  audio_coll: "/audio/weekX/vocab_coll_happy.mp3"  // Collocation
}
// Total: 10 words × 4 audio = 40 files
```

---

### 2. WORD_POWER.JS Schema

**❌ WRONG**:
```javascript
{
  audio: "/audio/weekX/vocab_happy.mp3"  // Generic
}
```

**✅ CORRECT**:
```javascript
{
  word: "feel happy",
  audio_word: "/audio/weekX/wordpower_feel_happy.mp3",
  audio_def: "/audio/weekX/wordpower_def_feel_happy.mp3",
  audio_ex: "/audio/weekX/wordpower_ex_feel_happy.mp3",
  audio_model: "/audio/weekX/wordpower_model_feel_happy.mp3"
}
// Total: 3 words × 4 audio = 12 files
```

---

### 3. DICTATION.JS Schema

**Current** (no audio field):
```javascript
{
  id: 1,
  text: "My name is Sam.",
  meaning: "Tên tôi là Sam."
  // ⚠️ No audio_url field
}
```

**Issue**: Audio files exist (`dictation_1.mp3`) but not referenced in schema!

**Solution**: Scripts generate audio OUTSIDE schema, validators must account for this.

---

## 📝 UPDATED ASSET COUNTS

### Audio Files per Week (Phase 1: Week 1-54):

```
Station breakdown:
  vocab.js          40 files  (10 words × 4 types)
  word_power.js     12 files  (3 words × 4 types)
  mindmap.js        42 files  (6 stems + 36 branches)
  shadowing.js      14 files  (14 sentences)
  ask_ai.js          5 files
  logic.js           5 files
  dictation files   14 files  (generated separately)
  ─────────────────────────
  TOTAL            132-140 files (depending on content)
```

### Image Files per Week:

**Phase 1 (Week 1-54)**: **15 images**
```
  vocab images      10 files  (happy.jpg, sad.jpg, ...)
  word_power        3 files   (wordpower_feel_happy.jpg, ...)
  read cover        1 file    (read_cover_w04.jpg)
  explore cover     1 file    (explore_cover_w04.jpg)
```

**Phase 2 (Week 55-120)**: **17 images** (+2 wordpower)
**Phase 3 (Week 121-144)**: **19 images** (+2 more wordpower)

---

## 🎯 IMPLICATIONS FOR MASS PRODUCTION

### 1. Templates Need Update
- `MASS/TEMPLATES/week_template_variants.js` needs 4 audio fields for vocab
- Add audio count documentation

### 2. Prompts Need Correction
- `09_STATIONS_ADVANCED.txt`: Update vocab schema with 4 audio fields
- `10_STATIONS_EASY.txt`: Same correction
- `12_ASSET_GENERATION.txt`: Update audio count table

### 3. Validators Need Adjustment
- Don't expect audio_url in dictation.js schema
- But verify dictation_X.mp3 files exist in /public/audio/

### 4. Scripts Are Correct
- `generate_audio.js` already generates 4 audio types per vocab word
- `generate_images_nano.js` generates correct counts
- No script changes needed

---

## 🔗 FILES TO UPDATE

1. **MASS/PROMPTS/09_STATIONS_ADVANCED.txt** (lines 25-45)
   - Add 4 audio fields to vocab schema
   - Update rules section with audio count

2. **MASS/PROMPTS/10_STATIONS_EASY.txt** (similar section)
   - Same corrections

3. **MASS/PROMPTS/12_ASSET_GENERATION.txt** (audio table)
   - Update vocab row: "40 files (10 words × 4 types)"
   - Update word_power row: "12 files (3 words × 4 types)"
   - Add TOTAL row: "~130-140 files"

4. **MASS/TEMPLATES/week_template_variants.js**
   - Add audio fields to vocab structure comment

5. **MASS/ASSET_GENERATION_SCRIPTS.md** (already correct!)
   - No changes needed, already shows 130-140 count

---

## ✅ VERIFICATION COMMANDS

```bash
# Count vocab audio files (should be 40)
find public/audio/week4 -name "vocab_*.mp3" | wc -l

# Count mindmap audio (should be 42)
find public/audio/week4 -name "mindmap_*.mp3" | wc -l

# Count all audio (should be ~130-140)
find public/audio/week4 -name "*.mp3" | wc -l

# Count images (should be 15 for Phase 1)
find public/images/week4 -name "*.jpg" | wc -l
```

---

**Last Updated**: January 18, 2026  
**Status**: CRITICAL - Schema mismatch discovered, prompts need immediate correction
