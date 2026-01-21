# MASS PRODUCTION WORKFLOW - HOÀN CHỈNH VỚI VALIDATION

**Version**: 2.1 FINAL - CRITICAL FIXES
**Date**: January 20, 2026
**Purpose**: Quy trình mass production đầy đủ với validation bắt buộc

**⚠️ CRITICAL UPDATE**: Added folder naming rules and vocab differentiation checks

---

## 🚨 CRITICAL PRE-CHECKS (MUST DO FIRST!)

### 1. Folder Naming Validation
```bash
# ✅ CORRECT folder pattern
public/audio/week<number>/          # NO underscore, NO leading zero
public/audio/week<number>_easy/
public/images/week<number>/
public/images/week<number>_easy/

# Example:
week4/          ✅ CORRECT
week5/          ✅ CORRECT
week10/         ✅ CORRECT
week_05/        ❌ WRONG (has underscore)
week_5/         ❌ WRONG (has underscore)
```

**Before creating folders**:
```bash
# Check existing pattern
ls -1 public/audio/ | grep week

# Should see: week1, week2, week3, week4... NOT week_01, week_02
```

### 2. Vocab Content Differentiation Check
```bash
# MUST verify vocab is different between modes
diff <(grep "word:" src/data/weeks/week_<N>/vocab.js) \
     <(grep "word:" src/data/weeks_easy/week_<N>/vocab.js)

# Should show DIFFERENT words:
# Advanced: More complex vocabulary
# Easy: Simpler, more basic words

# ❌ If output is empty → vocab is IDENTICAL → FAIL!
```

---

## 🎯 OVERVIEW

Quy trình mass production đã được nâng cấp với:
- ✅ Asset validation matrix bắt buộc
- ✅ Automatic cleanup & regeneration
- ✅ Error detection và reporting chi tiết
- ✅ Zero tolerance cho syntax errors

**Thời gian ước tính**: ~60-90 phút per week (bao gồm AI generation + assets)

---

## 📋 4-STEP WORKFLOW

### STEP 1: Generate Spec (5 phút)
```bash
node MASS/tools/generate_spec.cjs <week_number>
```

**Output**: `MASS/SPECS/week_XX_spec.json`

**Validation**:
- ✅ Has `stations` object with 14 files
- ✅ Has `vocab_count = 10`
- ✅ Has `grammar_focus` từ syllabus
- ❌ NO `story_missions` object (sai schema!)

---

### STEP 2: Generate Stations (40-50 phút)
```bash
node MASS/tools/create_week.cjs <week_number>
```

**AI phải tạo 14 files** vào `src/data/weeks/week_XX/`:
1. vocab.js
2. read.js
3. grammar.js
4. dictation.js
5. shadowing.js
6. writing.js
7. ask_ai.js
8. logic.js
9. explore.js
10. word_power.js
11. mindmap.js
12. daily_watch.js
13. word_match.js
14. video_queries.json

**Script sẽ tự động**:
- Show prompts cần đọc
- Validate code structure
- Check asset requirements
- Report missing files

**Validation tự động**:
- ✅ Syntax check từng file
- ✅ Cross-reference (dictation = read sentences)
- ✅ Audio field presence (vocab 4 fields, word_power NO fields)
- ✅ Mindmap structure (6 stems + 36 branches)

---

### STEP 3: Generate Assets (20-30 phút)

#### Option A: Manual Generation
```bash
# Advanced mode
node tools/generate_complete_audio.js <week> advanced
node tools/generate_images_nano.js <week> advanced
node MASS/tools/validate_assets.cjs <week> advanced

# Easy mode
node tools/generate_complete_audio.js <week> easy
node tools/generate_images_nano.js <week> easy
node MASS/tools/validate_assets.cjs <week> easy
```

#### Option B: Automatic Cleanup & Regeneration ⭐ RECOMMENDED
```bash
# Tự động xóa files sai, tạo lại files thiếu, validate
bash MASS/tools/cleanup_and_regenerate.sh <week> advanced
bash MASS/tools/cleanup_and_regenerate.sh <week> easy
```

**Validation matrix bắt buộc**:

| Mode | Audio Files | Image Files | Total |
|------|-------------|-------------|-------|
| Advanced | 141 | 20 | 161 |
| Easy | 137 | 20 | 157 |

**Script sẽ kiểm tra**:
- ✅ Vocab: 40 audio (10 words × 4) + 10 images
- ✅ Word Power: 15 audio (3 phrases × 5) + 3 images
- ✅ Mindmap: 42 audio (6 + 36)
- ✅ Dictation: 14 audio (Advanced) / 12 audio (Easy)
- ✅ Shadowing: 15 audio (Advanced) / 13 audio (Easy)
- ✅ Naming convention: `vocab_`, `wordpower_`, `mindmap_stem_`, etc.
- ✅ Path format: `/audio/weekX/` (NOT `/audio/week_X/`)

---

### STEP 4: Final Validation (5 phút)
```bash
# Validate code + assets
node MASS/tools/validate_week_v2.cjs <week>
node MASS/tools/validate_assets.cjs <week> advanced
node MASS/tools/validate_assets.cjs <week> easy

# Test in UI
npm run dev
# Navigate to http://localhost:5173/week/<week>

# Commit khi pass hết
git add src/data/weeks/week_XX/
git add src/data/weeks_easy/week_XX/
git add public/audio/weekX/
git add public/audio/weekX_easy/
git add public/images/weekX/
git add public/images/weekX_easy/
git commit -m "Week X: <Title> - Complete with assets"
```

---

## 🚨 COMMON ERRORS & FIXES

### Error 1: Missing `vocab_` Prefix
```bash
# ❌ Sai
/audio/week5_easy/def_bedroom.mp3

# ✅ Đúng
/audio/week5_easy/vocab_def_bedroom.mp3
```

**Fix**:
```bash
bash MASS/tools/cleanup_and_regenerate.sh 5 easy
```

---

### Error 2: Word Power Schema Confusion
```javascript
// ❌ SAI - Thêm audio fields vào schema
{
  phrases: [
    {
      id: 1,
      audio_word: "/audio/week5/wordpower_my_bedroom.mp3" // ❌ WRONG!
    }
  ]
}

// ✅ ĐÚNG - NO audio fields in schema
{
  phrases: [
    {
      id: 1,
      phrase: "my bedroom",
      image_url: "/images/week5/wordpower_my_bedroom.jpg" // ✅ CORRECT
    }
  ]
}
```

**Files vẫn phải tồn tại**:
- `wordpower_my_bedroom.mp3`
- `wordpower_def_my_bedroom.mp3`
- `wordpower_ex_my_bedroom.mp3`
- `wordpower_coll_my_bedroom.mp3`
- `wordpower_model_my_bedroom.mp3`

---

### Error 3: Dictation ≠ Read Sentence Count
```bash
# Check read sentence count
grep -o '\.' src/data/weeks/week_05/read.js | wc -l

# Should match dictation.exercises.length
# Advanced: 14 sentences
# Easy: 12 sentences
```

**Fix**: Regenerate dictation.js copying from read.js

---

### Error 4: Easy Mindmap với 4 Stems
```javascript
// ❌ SAI - Cũ nghĩ Easy có 4 stems
centerStems.length = 4

// ✅ ĐÚNG - BOTH modes có 6 stems
centerStems.length = 6  // ✅ Advanced
centerStems.length = 6  // ✅ Easy (SAME!)
```

**Validation**: Script sẽ báo lỗi nếu ≠ 6 stems

---

### Error 5: Wrong Path Format
```javascript
// ❌ SAI
"/audio/week_05/vocab_happy.mp3"  // Underscore sau "week"
"/audio/week05/vocab_happy.wav"   // Wrong extension

// ✅ ĐÚNG
"/audio/week5/vocab_happy.mp3"    // No underscore, .mp3
```

---

## 🔍 VALIDATION CHECKLIST

### Before Generation:
- [ ] Run `generate_spec.cjs` first
- [ ] Check spec has `stations` object (NOT `story_missions`)
- [ ] Verify 14 required files listed in spec

### After Station Generation:
- [ ] All 14 files exist in `src/data/weeks/week_XX/`
- [ ] No syntax errors (script auto-checks)
- [ ] Dictation sentences = Read sentences
- [ ] Shadowing sentences = Dictation sentences
- [ ] Word power has NO audio fields in schema
- [ ] Vocab has 4 audio fields per word

### After Asset Generation:
- [ ] Advanced: 141 audio + 20 images
- [ ] Easy: 137 audio + 20 images
- [ ] All paths use correct prefix (`vocab_`, `wordpower_`, etc.)
- [ ] All paths use format `/audio/weekX/` (NOT `week_X`)
- [ ] Mindmap has 42 audio files (BOTH modes)
- [ ] Test in UI - all audio plays, all images show

### Before Commit:
- [ ] Run `validate_assets.cjs` for both modes → PASS
- [ ] Test 3-5 stations in UI manually
- [ ] Check no broken images (404)
- [ ] Check no missing audio (silent stations)
- [ ] Git add ONLY changed files

---

## 🛠️ TROUBLESHOOTING

### "OpenAI API key invalid"
```bash
# Check .env file
cat .env | grep VITE_OPENAI_API_KEY

# Update with new key
echo "VITE_OPENAI_API_KEY=sk-proj-XXXXX" >> .env

# Test key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer sk-proj-XXXXX"
```

### "Audio count mismatch"
```bash
# Count actual files
ls -1 public/audio/week5/ | wc -l

# Should be 141 for advanced, 137 for easy

# Regenerate if mismatch
bash MASS/tools/cleanup_and_regenerate.sh 5 advanced
```

### "Dictation validation failed"
```bash
# Check read.js sentence count
node -e "const r = require('./src/data/weeks/week_05/read.js'); \
  console.log(r.default.content.split(/[.!?]+/).length)"

# Should match dictation count
# Fix: Edit dictation.js to match read.js
```

### "Script hangs on validation"
```bash
# Kill with Ctrl+C
# Check for syntax errors in generated files
node -c src/data/weeks/week_XX/vocab.js

# Fix syntax, then re-run
node MASS/tools/create_week.cjs XX
```

---

## 📊 MASS PRODUCTION STATISTICS

### Per Week:
- **Files tạo**: 29 files (1 AI Tutor + 14 Advanced + 14 Easy)
- **Assets**: 298 files (161 Advanced + 137 Easy)
- **Thời gian**: 60-90 phút
- **Token sử dụng**: ~100K tokens (AI generation)

### Week 5-156 (152 weeks):
- **Total files**: 4,408 files
- **Total assets**: 45,296 files
- **Total time**: ~152 hours (6.3 days)
- **Total tokens**: ~15M tokens

### With Automation:
- **Time saved**: ~40% (cleanup scripts)
- **Error rate**: <5% (validation catches early)
- **Regeneration rate**: ~10% (API issues, quota)

---

## 🎯 BEST PRACTICES

### 1. Always Validate Before Moving On
```bash
# Don't skip validation!
node MASS/tools/validate_assets.cjs 5 advanced  # Must pass
node MASS/tools/validate_assets.cjs 5 easy      # Must pass
```

### 2. Use Cleanup Script When In Doubt
```bash
# Automatic fix for most issues
bash MASS/tools/cleanup_and_regenerate.sh 5 advanced
```

### 3. Test in UI Before Commit
```bash
# Load week in browser
npm run dev
# Click through 5-10 stations
# Verify audio plays
# Verify images show
```

### 4. Commit Frequently
```bash
# Commit each week when validated
git add src/data/weeks/week_05/
git add public/audio/week5/
git commit -m "Week 5: The Mystery House - Stations only"

# Then assets
git add public/audio/week5/
git add public/images/week5/
git commit -m "Week 5: Assets (Advanced)"
```

### 5. Monitor API Usage
```bash
# Check OpenAI usage dashboard
# https://platform.openai.com/usage

# Week 5 uses ~$2-3 in TTS
# Keep under $50/day to avoid rate limits
```

---

## 📁 FILE STRUCTURE REFERENCE

```
ENGQUEST3K/
├── MASS/
│   ├── SPECS/
│   │   └── week_05_spec.json          # Step 1 output
│   ├── tools/
│   │   ├── generate_spec.cjs          # Step 1 script
│   │   ├── create_week.cjs            # Step 2 script
│   │   ├── validate_assets.cjs        # ⭐ NEW: Asset validator
│   │   ├── cleanup_and_regenerate.sh  # ⭐ NEW: Auto-fix script
│   │   └── validate_week_v2.cjs       # Code validator
│   ├── ASSET_VALIDATION_MATRIX.md     # ⭐ NEW: Complete specs
│   └── MASS_PRODUCTION_WORKFLOW_V2.md # This file
├── src/data/
│   ├── weeks/week_05/                 # 14 Advanced station files
│   └── weeks_easy/week_05/            # 14 Easy station files
└── public/
    ├── audio/
    │   ├── week5/                     # 141 audio files
    │   └── week5_easy/                # 137 audio files
    └── images/
        ├── week5/                     # 20 images
        └── week5_easy/                # 20 images
```

---

## 🚀 QUICK START

### For Week X:
```bash
# Step 1: Spec
node MASS/tools/generate_spec.cjs X

# Step 2: Stations (AI generates 14 files)
node MASS/tools/create_week.cjs X

# Step 3: Assets + Auto-fix
bash MASS/tools/cleanup_and_regenerate.sh X advanced
bash MASS/tools/cleanup_and_regenerate.sh X easy

# Step 4: Test & Commit
npm run dev  # Test manually
git add src/data/weeks*/week_0X/
git add public/audio/weekX*/ public/images/weekX*/
git commit -m "Week X: Complete"
```

---

## ✅ SUCCESS CRITERIA

Week X được coi là HOÀN THÀNH khi:
- ✅ `validate_assets.cjs X advanced` → EXIT 0
- ✅ `validate_assets.cjs X easy` → EXIT 0
- ✅ UI load week X không có errors
- ✅ Tất cả audio plays (no 404)
- ✅ Tất cả images show (no broken icons)
- ✅ Git committed với message rõ ràng

---

**Version History**:
- v1.0 (Jan 16): Initial workflow (4 steps)
- v2.0 (Jan 20): Added validation matrix, cleanup scripts, error handling
