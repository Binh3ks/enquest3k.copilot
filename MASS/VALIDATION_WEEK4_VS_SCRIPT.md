# 🚨 CRITICAL VALIDATION: Week 4 Structure vs Script Expectations

**Date**: January 18, 2026  
**Status**: ❌ SCRIPT SAI - CẦN SỬA NGAY

---

## ❌ VẤN ĐỀ PHÁT HIỆN

### Script `create_week.cjs` Yêu cầu:
```javascript
// Line 30: Expected file
const weekFile = path.join(__dirname, '../../src/data/weeks', 
  `week_${String(weekId).padStart(2, '0')}_real.js`);

// Line 107: Output location
console.log(`📝 Generate content to:`);
console.log(`   → src/data/weeks/week_${String(weekId).padStart(2, '0')}_real.js`);
```

**Script expects**: `src/data/weeks/week_05/week_05_real.js` (1 file - AI Tutor format)

---

### Week 4 Thực tế:
```bash
$ ls -1 src/data/weeks/week_04/
ask_ai.js           # Station file
daily_watch.js      # Station file  
dictation.js        # Station file
explore.js          # Station file
grammar.js          # Station file
index.js            # Main index
logic.js            # Station file
mindmap.js          # Station file
read.js             # Station file
shadowing.js        # Station file
video_queries.json  # Video data
vocab.js            # Station file
word_power.js       # Station file
writing.js          # Station file
```

**Week 4 has**: 14 STATION FILES (không có `week_04_real.js`)

---

## 🔍 ROOT CAUSE ANALYSIS

### 1. Prompts Sai Hướng
**File**: `MASS/PROMPTS/01_MASTER_ORCHESTRATOR.txt`

```plaintext
Line 90-120: PHASE 2: GENERATE AI TUTOR (1 file)
Read order:
1. V29_AI_TUTOR_CORE.txt
2. V29_AI_TUTOR_SCHEMA_BASIC.txt / V29_AI_TUTOR_SCHEMA_VARIANT.txt
3. V29_AI_TUTOR_EXAMPLES.txt

Output: /src/data/weeks/week_XX_real.js  ← ❌ File này KHÔNG TỒN TẠI trong Week 4!
```

**Reality**: Week 4 KHÔNG có AI Tutor format, CHỈ có station files!

---

### 2. Template Sai Format
**Files**: 
- `MASS/TEMPLATES/week_template_canonical.js`
- `MASS/TEMPLATES/week_template_variants.js`

```javascript
const weekTemplate = {
  week_id: ${WEEK_ID},
  story_missions: [...]  // ← AI Tutor format
}

export default weekTemplate;
```

**Issue**: Templates này là cho AI Tutor, nhưng Week 4 KHÔNG dùng format này!

---

### 3. Spec Sai Structure
**File**: `MASS/SPECS/week_05_spec.json`

```json
{
  "story_missions": {
    "format": "question_variants",  // ← AI Tutor format
    "count": 3,
    "objectives_distribution": [9, 10, 11],
    "total_objectives": 30
  }
}
```

**Issue**: Spec này định nghĩa AI Tutor missions, nhưng Week 4 KHÔNG có missions!

---

## ✅ WEEK 4 ACTUAL STRUCTURE (GOLDEN STANDARD)

### Structure:
```
src/data/weeks/week_04/
├── index.js              # Main export (imports all stations)
├── vocab.js              # 10 words with definitions
├── read.js               # Reading passage (111 words)
├── grammar.js            # 20 exercises
├── dictation.js          # 14 sentences
├── shadowing.js          # 14 sentences + audio_full
├── writing.js            # Writing prompt
├── ask_ai.js             # 5 prompts
├── logic.js              # 5 problems
├── explore.js            # Exploration content
├── word_power.js         # 3 phrases (NO audio fields)
├── mindmap.js            # 6 stems + 36 branches
├── daily_watch.js        # 5 videos
└── video_queries.json    # Video search queries
```

### Key Points:
1. **NO `week_04_real.js` file** - Đây là sai lầm lớn nhất!
2. **14 station files riêng lẻ** - Mỗi station là 1 file .js
3. **index.js imports all** - File này tổng hợp tất cả stations
4. **NO missions/objectives** - Week 4 KHÔNG có AI Tutor format
5. **Dual mode**: `weeks/` (Advanced) và `weeks_easy/` (Easy)

---

## 🔧 REQUIRED FIXES

### Fix 1: Update `create_week.cjs` Logic

**Current (WRONG)**:
```javascript
const weekFile = path.join(__dirname, '../../src/data/weeks', 
  `week_${String(weekId).padStart(2, '0')}_real.js`);
```

**Should be (CORRECT)**:
```javascript
// Check for station files existence
const weekDir = path.join(__dirname, '../../src/data/weeks', 
  `week_${String(weekId).padStart(2, '0')}`);
const requiredFiles = [
  'index.js', 'vocab.js', 'read.js', 'grammar.js', 
  'dictation.js', 'shadowing.js', 'writing.js',
  'ask_ai.js', 'logic.js', 'explore.js', 
  'word_power.js', 'mindmap.js', 'daily_watch.js'
];
```

---

### Fix 2: Update Prompts to Match Reality

**Change**: `MASS/PROMPTS/01_MASTER_ORCHESTRATOR.txt`

**Remove**:
```plaintext
PHASE 2: GENERATE AI TUTOR (1 file)
Output: /src/data/weeks/week_XX_real.js
```

**Replace with**:
```plaintext
PHASE 2: GENERATE 13 STATION FILES
Output: /src/data/weeks/week_XX/*.js (13 files)

Required files:
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
13. index.js
```

---

### Fix 3: Update Spec Structure

**Change**: `MASS/SPECS/week_XX_spec.json`

**Remove**:
```json
{
  "story_missions": {
    "format": "question_variants",
    "objectives_distribution": [9, 10, 11]
  }
}
```

**Replace with**:
```json
{
  "stations": {
    "required": [
      "vocab", "read", "grammar", "dictation", "shadowing",
      "writing", "ask_ai", "logic", "explore", 
      "word_power", "mindmap", "daily_watch", "index"
    ],
    "dual_mode": true,
    "advanced_folder": "week_XX",
    "easy_folder": "week_XX_easy"
  }
}
```

---

### Fix 4: Update Templates

**Change**: `MASS/TEMPLATES/` folder

**Remove**:
- `week_template_canonical.js` (AI Tutor format)
- `week_template_variants.js` (AI Tutor format)

**Create NEW**:
- `vocab_template.js`
- `read_template.js`
- `grammar_template.js`
- `dictation_template.js`
- `shadowing_template.js`
- `writing_template.js`
- `ask_ai_template.js`
- `logic_template.js`
- `explore_template.js`
- `word_power_template.js`
- `mindmap_template.js`
- `daily_watch_template.js`
- `index_template.js`

**Each template** should match Week 4 structure EXACTLY!

---

## 📋 VALIDATION CHECKLIST

Before generating Week 5:

- [ ] Script checks for 13 station files (not 1 _real.js)
- [ ] Prompts describe station generation (not AI Tutor)
- [ ] Spec defines stations structure (not missions)
- [ ] Templates exist for each station type
- [ ] All templates match Week 4 schemas 100%
- [ ] Dual mode (Advanced + Easy) supported
- [ ] Audio/image generation scripts compatible
- [ ] Video generation script compatible

---

## 🚀 CORRECT WORKFLOW

### Step 1: Generate Spec
```bash
node MASS/tools/generate_spec.cjs 5
```
Output: `MASS/SPECS/week_05_spec.json` with stations structure

### Step 2: Show AI Instructions
```javascript
// Read prompts for STATION generation (not AI Tutor)
MASS/PROMPTS/08_STATIONS_CORE.txt
MASS/PROMPTS/09_STATIONS_ADVANCED.txt
MASS/PROMPTS/10_STATIONS_EASY.txt
```

### Step 3: AI Generates 13 Files
```
src/data/weeks/week_05/
├── vocab.js       ← From vocab_template.js + spec data
├── read.js        ← From read_template.js + spec data
├── grammar.js     ← From grammar_template.js + spec data
... (all 13 files)
```

### Step 4: Validate Structure
```bash
# Check all 13 files exist
ls -1 src/data/weeks/week_05/*.js | wc -l  # Should be 13

# Validate schemas match Week 4
node MASS/tools/validate_week_v2.cjs 5
```

### Step 5: Generate Assets
```bash
node tools/generate_audio.js 5 5
node tools/generate_images_nano.js 5
node tools/update_videos.js 5
```

---

## 📊 COMPARISON: Expected vs Reality

| Aspect | Script Expects | Week 4 Reality |
|--------|---------------|----------------|
| **File count** | 1 file (`_real.js`) | 13 files (stations) |
| **Format** | AI Tutor (missions) | Station files |
| **Structure** | `story_missions: [...]` | Individual station exports |
| **Template** | 1 template (variants) | 13 templates (1 per station) |
| **Prompts** | AI_TUTOR_*.txt | STATIONS_*.txt |
| **Validation** | Check 1 file | Check 13 files |
| **Output** | `week_XX_real.js` | `week_XX/*.js` |

---

## ✅ ACTION PLAN

### IMMEDIATE (Before Week 5):

1. **Stop current process** - Script sai hẳn hướng
2. **Rewrite `create_week.cjs`** - Check 13 files, not 1
3. **Update all prompts** - Remove AI Tutor references
4. **Create 13 templates** - 1 per station, matching Week 4
5. **Update spec structure** - Remove missions, add stations
6. **Test with Week 4** - Validate against existing structure
7. **Document changes** - Update all related files

### LONG-TERM (After Week 5):

1. Archive old AI Tutor prompts (if not needed)
2. Update README with correct workflow
3. Create validation script for 13-file structure
4. Test dual mode generation (Advanced + Easy)
5. Document asset generation compatibility

---

**Status**: ❌ CANNOT PROCEED with current script  
**Next Step**: Fix script + prompts + templates to match Week 4 reality  
**ETA**: ~2 hours to fix everything properly

---

**Last Updated**: January 18, 2026  
**Severity**: CRITICAL - Blocks all Week 5+ generation  
**Impact**: 100% - Script không thể tạo được nội dung đúng format
