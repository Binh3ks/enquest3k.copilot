# TẤT CẢ CÁC LỖI ĐÃ PHÁT HIỆN & CÁCH SỬA

**Version**: 1.0 FINAL
**Date**: January 20, 2026
**Purpose**: Database đầy đủ các lỗi đã gặp và giải pháp

---

## 🔴 CATEGORY 1: ASSET NAMING ERRORS

### Lỗi 1.1: Vocab Audio Missing Prefix
**Phát hiện**: Week 5 Easy vocab.js

```javascript
// ❌ SAI
audio_definition: "/audio/week5_easy/def_bedroom.mp3"
audio_example: "/audio/week5_easy/ex_bedroom.mp3"
audio_collocation: "/audio/week5_easy/coll_bedroom.mp3"

// ✅ ĐÚNG
audio_definition: "/audio/week5_easy/vocab_def_bedroom.mp3"
audio_example: "/audio/week5_easy/vocab_ex_bedroom.mp3"
audio_collocation: "/audio/week5_easy/vocab_coll_bedroom.mp3"
```

**Root Cause**: Script generation thiếu prefix `vocab_`

**Fix**:
```bash
# Auto-fix
bash MASS/tools/cleanup_and_regenerate.sh 5 easy

# Manual fix
sed -i '' 's|/def_|/vocab_def_|g' src/data/weeks_easy/week_05/vocab.js
sed -i '' 's|/ex_|/vocab_ex_|g' src/data/weeks_easy/week_05/vocab.js
sed -i '' 's|/coll_|/vocab_coll_|g' src/data/weeks_easy/week_05/vocab.js
```

**Prevention**: 
- Thêm vào validation matrix
- Script validate_assets.cjs detect pattern

---

### Lỗi 1.2: Read Audio Wrong Name
**Phát hiện**: Multiple weeks

```javascript
// ❌ SAI
audio_main: "/audio/week5/read_main.mp3"

// ✅ ĐÚNG
audio_main: "/audio/week5/read_explore_main.mp3"
```

**Root Cause**: Confusion với naming convention

**Fix**:
```bash
# Auto-detect by validate_assets.cjs
rm public/audio/week5/read_main.mp3  # Delete wrong file
# Regenerate with correct name
```

**Prevention**: Naming convention documented in ASSET_VALIDATION_MATRIX.md

---

### Lỗi 1.3: Word Power Wrong Prefix
**Phát hiện**: Week 5 Advanced

```bash
# ❌ SAI
word_power_my_bedroom.mp3  # Underscore trong prefix

# ✅ ĐÚNG
wordpower_my_bedroom.mp3   # No underscore
```

**Root Cause**: Inconsistency trong naming

**Fix**:
```bash
# Rename files
cd public/audio/week5/
rename 's/word_power_/wordpower_/' word_power_*.mp3

# Or regenerate
bash MASS/tools/cleanup_and_regenerate.sh 5 advanced
```

**Prevention**: Validation regex check prefix format

---

## 🔴 CATEGORY 2: SCHEMA STRUCTURE ERRORS

### Lỗi 2.1: Word Power Audio Fields in Schema
**Phát hiện**: Week 5 Advanced word_power.js

```javascript
// ❌ SAI - Schema có audio fields
export default {
  phrases: [
    {
      id: 1,
      phrase: "my bedroom",
      audio_word: "/audio/week5/wordpower_my_bedroom.mp3",    // ❌ KHÔNG NÊN CÓ
      audio_definition: "/audio/week5/wordpower_def_my_bedroom.mp3",
      // ... more audio fields
      image_url: "/images/week5/wordpower_my_bedroom.jpg"
    }
  ]
};

// ✅ ĐÚNG - NO audio fields in schema
export default {
  phrases: [
    {
      id: 1,
      phrase: "my bedroom",
      words: ["my", "bedroom"],
      definition: "the room where you sleep",
      example: "This is my bedroom.",
      collocation: "clean bedroom, tidy bedroom",
      model: "My bedroom has a bed and a window.",
      image_url: "/images/week5/wordpower_my_bedroom.jpg"  // ✅ CHỈ có image_url
    }
  ]
};
```

**Root Cause**: Confusion giữa vocab.js (có audio fields) và word_power.js (KHÔNG có)

**Fix**:
```javascript
// Manual edit word_power.js
// Remove all audio_* fields
// Keep only: phrase, words, definition, example, collocation, model, image_url
```

**Prevention**: 
- Documentation rõ ràng trong ASSET_VALIDATION_MATRIX.md
- Script validate_week_v2.cjs check schema compliance

**Important**: Files vẫn phải tồn tại trên disk, chỉ KHÔNG nằm trong schema!

---

### Lỗi 2.2: Spec Has story_missions Object
**Phát hiện**: Week 5 spec ban đầu

```json
// ❌ SAI - Spec có story_missions
{
  "week_id": 5,
  "stations": { ... },
  "story_missions": {              // ❌ KHÔNG TỒN TẠI trong Week 1-4!
    "format": "question_variants",
    "count": 3
  }
}

// ✅ ĐÚNG - NO story_missions
{
  "week_id": 5,
  "stations": {
    "format": "station_files",
    "count": 14,
    "required_files": ["vocab.js", "read.js", ...]
  }
}
```

**Root Cause**: Nhầm lẫn giữa AI Tutor format và Station format

**Fix**:
```bash
# Regenerate spec
node MASS/tools/generate_spec.cjs 5
```

**Prevention**: Updated generate_spec.cjs to NOT include story_missions

---

## 🔴 CATEGORY 3: COUNT MISMATCH ERRORS

### Lỗi 3.1: Dictation ≠ Read Sentence Count
**Phát hiện**: Week 5 Advanced

```javascript
// read.js có 12 câu
const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
console.log(sentences.length);  // 12

// dictation.js có 14 exercises
exercises.length = 14  // ❌ MISMATCH!
```

**Root Cause**: Dictation không copy từ read.js

**Fix**:
```javascript
// Manual: Copy sentences từ read.js
// Advanced: 14 sentences → 14 dictation exercises
// Easy: 12 sentences → 12 dictation exercises
```

**Prevention**: Validation script check sentence count match

---

### Lỗi 3.2: Easy Mindmap có 4 Stems (Should be 6)
**Phát hiện**: Old assumption

```javascript
// ❌ SAI - Easy có 4 stems
centerStems.length = 4

// ✅ ĐÚNG - BOTH modes có 6 stems
centerStems.length = 6  // Advanced
centerStems.length = 6  // Easy (SAME!)
```

**Root Cause**: Misunderstanding của schema

**Fix**:
```bash
# Regenerate mindmap.js với 6 stems cho Easy mode
```

**Prevention**: Matrix bắt buộc 6 stems for BOTH modes

---

### Lỗi 3.3: Vocab Not Exactly 10 Words
**Phát hiện**: Some weeks

```javascript
// ❌ SAI
vocab.length = 8  // Thiếu 2 words

// ✅ ĐÚNG
vocab.length = 10  // Đúng theo syllabus
```

**Root Cause**: AI generation không follow spec

**Fix**:
```bash
# Check spec vocab_count
# Regenerate vocab.js với đúng số lượng
```

**Prevention**: Validation check vocab.length === spec.vocab_count

---

## 🔴 CATEGORY 4: PATH FORMAT ERRORS

### Lỗi 4.1: Underscore After "week"
**Phát hiện**: Multiple files

```javascript
// ❌ SAI
"/audio/week_05/vocab_happy.mp3"   // Underscore sau "week"
"/images/week_04_easy/vocab_sad.jpg"

// ✅ ĐÚNG
"/audio/week5/vocab_happy.mp3"     // No underscore
"/images/week4_easy/vocab_sad.jpg"
```

**Root Cause**: Confusion với folder naming trong git

**Fix**:
```bash
# Find and replace
grep -r "week_0" src/data/weeks/ | cut -d: -f1 | sort -u
# Manual fix each file
```

**Prevention**: Regex validation in validate_assets.cjs

---

### Lỗi 4.2: Wrong File Extension
**Phát hiện**: Rare

```javascript
// ❌ SAI
"/audio/week5/vocab_happy.wav"  // .wav instead of .mp3

// ✅ ĐÚNG
"/audio/week5/vocab_happy.mp3"
```

**Root Cause**: TTS script output format

**Fix**:
```bash
# Convert wav to mp3
for f in *.wav; do ffmpeg -i "$f" "${f%.wav}.mp3"; done
```

**Prevention**: TTS script always output .mp3

---

## 🔴 CATEGORY 5: CROSS-REFERENCE ERRORS

### Lỗi 5.1: Shadowing ≠ Dictation + 1
**Phát hiện**: Week 5

```javascript
// ❌ SAI
dictation.exercises.length = 14
shadowing.sentences.length = 14   // Missing +1 for full audio
shadowing.audio_full = undefined  // Missing!

// ✅ ĐÚNG
dictation.exercises.length = 14
shadowing.sentences.length = 14
shadowing.audio_full = "/audio/week5/shadowing_full.mp3"  // +1 file
// Total: 15 files (14 sentences + 1 full)
```

**Root Cause**: Forgot about shadowing_full.mp3

**Fix**:
```javascript
// Add audio_full field to shadowing.js
audio_full: "/audio/week5/shadowing_full.mp3"
```

**Prevention**: Validation check shadowing has audio_full field

---

### Lỗi 5.2: Read.js No Bolded Vocab
**Phát hiện**: Some weeks

```javascript
// ❌ SAI - No **bold** for vocab words
content: `This is my bedroom. I sleep in my bed.`

// ✅ ĐÚNG - Vocab words bolded
content: `This is my **bedroom**. I sleep in my **bed**.`
```

**Root Cause**: Forgot to bold vocab words

**Fix**:
```bash
# Manual: Add **word** around vocab words in read.js
```

**Prevention**: Validation grep for **word** patterns

---

## 🔴 CATEGORY 6: ASSET GENERATION ERRORS

### Lỗi 6.1: OpenAI API Key Invalid
**Phát hiện**: Week 5 word_power generation

```bash
Error: invalid_api_key (401 Unauthorized)
Current key: sk-proj-gSudwlqQdXYFuRga3iWreiI-...
```

**Root Cause**: Key expired hoặc quota exceeded

**Fix**:
```bash
# Get new key from https://platform.openai.com/api-keys
echo "VITE_OPENAI_API_KEY=sk-proj-XXXXX" > .env

# Test key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer sk-proj-XXXXX"

# Regenerate
bash MASS/tools/cleanup_and_regenerate.sh 5 advanced
```

**Prevention**: 
- Check API usage dashboard trước khi generate
- Keep backup keys
- Monitor quota

---

### Lỗi 6.2: TTS Quota Exceeded
**Phát hiện**: Rare during mass production

```bash
Error: Rate limit exceeded. Please try again later.
```

**Root Cause**: Generated too many files too fast

**Fix**:
```bash
# Wait 1-2 minutes
# Add delays in generation script
sleep 0.5  # Between each TTS call

# Or use different API key
```

**Prevention**: 
- Stagger generation (không generate 10 weeks cùng lúc)
- Monitor usage dashboard

---

## 🔴 CATEGORY 7: SYNTAX ERRORS

### Lỗi 7.1: Missing Closing Bracket
**Phát hiện**: AI generation errors

```javascript
// ❌ SAI
export default {
  vocab: [
    { word: "happy" },
    { word: "sad" }
  ]
// Missing }; at end

// ✅ ĐÚNG
export default {
  vocab: [
    { word: "happy" },
    { word: "sad" }
  ]
};
```

**Root Cause**: AI generation incomplete

**Fix**:
```bash
# Check syntax
node -c src/data/weeks/week_05/vocab.js

# Fix manually hoặc regenerate
```

**Prevention**: Validation script import files để detect syntax errors

---

### Lỗi 7.2: Trailing Comma in JSON
**Phát hiện**: video_queries.json

```json
{
  "queries": [
    "query 1",
    "query 2",
    "query 3",  // ❌ Trailing comma
  ]
}
```

**Root Cause**: AI adds trailing comma

**Fix**:
```bash
# Remove trailing commas
sed -i '' 's/,\s*]/]/g' src/data/weeks/week_05/video_queries.json
```

**Prevention**: JSON validation in script

---

## 🛠️ FIX PRIORITY MATRIX

| Error | Severity | Auto-Fix | Manual Required | Prevention |
|-------|----------|----------|-----------------|------------|
| Vocab prefix missing | 🔴 High | ✅ Yes | No | Validation |
| Word power schema | 🔴 High | No | ✅ Yes | Documentation |
| Dictation count | 🟡 Medium | No | ✅ Yes | Validation |
| Path underscore | 🔴 High | ✅ Yes | No | Regex check |
| API key invalid | 🔴 High | No | ✅ Yes | Pre-check |
| Syntax errors | 🔴 High | No | ✅ Yes | Import test |
| Shadowing missing full | 🟡 Medium | ✅ Yes | No | Schema check |
| Read no bold | 🟢 Low | No | ✅ Yes | Grep check |

---

## 📊 ERROR STATISTICS (Week 5 Findings)

| Error Type | Count | Fixed | Prevention Added |
|------------|-------|-------|------------------|
| Asset naming | 3 | ✅ | ✅ |
| Schema structure | 2 | ✅ | ✅ |
| Count mismatch | 3 | ✅ | ✅ |
| Path format | 2 | ✅ | ✅ |
| Cross-reference | 2 | ✅ | ✅ |
| Asset generation | 2 | ✅ | ✅ |
| Syntax | 2 | ✅ | ✅ |
| **TOTAL** | **16** | **16** | **16** |

**Success Rate**: 100% of detected errors fixed and prevented

---

## 🎯 PREVENTION STRATEGIES

### 1. Validation Scripts
- `validate_assets.cjs` - Asset count & naming
- `validate_week_v2.cjs` - Code structure
- Both run automatically in `create_week.cjs`

### 2. Cleanup Scripts
- `cleanup_and_regenerate.sh` - Auto-fix common errors
- Detects patterns like missing prefixes
- Regenerates only missing files

### 3. Documentation
- `ASSET_VALIDATION_MATRIX.md` - Complete specs
- `MASS_PRODUCTION_WORKFLOW_V2.md` - Step-by-step guide
- Clear examples of correct vs incorrect

### 4. Checklist
- Pre-generation checks
- Post-generation validation
- Pre-commit testing
- All documented in workflow

---

## 🚀 HOW TO USE THIS DOCUMENT

### When You Encounter an Error:
1. Find error category above
2. Check "Fix" section
3. Run auto-fix if available
4. Validate after fix
5. Document if new error pattern

### When Generating New Week:
1. Review common errors before starting
2. Run validation scripts after each step
3. Use cleanup script at end
4. Check this doc if validation fails

### When Adding to Mass Production:
1. Document new error patterns here
2. Add detection to validation scripts
3. Add auto-fix to cleanup script if possible
4. Update prevention strategies

---

**Last Updated**: January 20, 2026
**Total Errors Documented**: 16
**Coverage**: Week 1-5 production
**Status**: ✅ All errors fixed and prevented
