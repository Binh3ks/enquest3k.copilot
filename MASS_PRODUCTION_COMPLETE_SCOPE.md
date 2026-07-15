# 🏭 MASS PRODUCTION - COMPLETE SCOPE ANALYSIS
## Ngày: 24 Tháng 3, 2026

---

## ⚠️ CRITICAL REALIZATION

**Previous workflow** chỉ cover **Daily Watch (videos)** = **1/35 files = 2.8%** công việc!

Mỗi tuần cần generate **35 files**, không phải 1 file.

---

## 📊 COMPLETE FILE STRUCTURE PER WEEK

### 🎯 AI Tutor Component (1 file)
```
src/data/weeks/
└── week_XX_real.js      (~30-34KB, ~800-1000 lines)
    ├── week_id, title, theme
    ├── target_vocab: 10 words
    ├── story_missions: 3 missions
    │   ├── Mission 1: 10 objectives × 3 variants = 30 questions
    │   ├── Mission 2: 10 objectives × 3 variants = 30 questions
    │   └── Mission 3: 10 objectives × 3 variants = 30 questions
    ├── freetalk_scenarios: 5 scenarios
    ├── debate_topics: 3 topics
    └── pronunciation_drills: 7 items
```

**Status**: ❌ **No workflow yet**

---

### 📚 Station Components (17 files × 2 modes = 34 files)

#### Folder: `src/data/weeks/week_XX/` (Advanced)

**1. daily_watch.js** (~50 lines)
```javascript
export default {
  videos: [
    { id: 1, title: "...", videoId: "...", duration: "..." },
    // 5 videos total
  ]
}
```
**Status**: ✅ **Workflow complete** (MASS_PRODUCTION_WORKFLOW_V2_FINAL.md)

---

**2. read.js** (~100-150 lines)
```javascript
export default {
  story: {
    title_en: "...",
    title_vi: "...",
    paragraphs: [
      { id: 1, text_en: "...", text_vi: "...", audio_url: "..." },
      // 8-12 paragraphs
    ],
    comprehension: [
      { id: 1, question_en: "...", options: [...], correct: 0 },
      // 5 questions
    ]
  }
}
```
**Status**: ❌ **No workflow yet**

---

**3. dictation.js** (~80-100 lines)
```javascript
export default {
  sentences: [
    { 
      id: 1, 
      text_en: "...", 
      meaning: "...",  // NOT translation_vi!
      audio_url: "...", 
      words: ["word1", "word2", ...] 
    },
    // 8 sentences
  ]
}
```
**Status**: ❌ **No workflow yet**  
**Known Issue**: Phải dùng `meaning` không phải `translation_vi` (schema bug từ past)

---

**4. shadowing.js** (~120-150 lines)
```javascript
export default {
  dialogue: {
    title_en: "...",
    title_vi: "...",
    audio_full: "...",
    script: [
      { 
        id: 1, 
        speaker: "A", 
        text_en: "...", 
        text_vi: "...",
        audio_url: "...",
        pause_duration: 2000 
      },
      // 10-15 lines
    ]
  }
}
```
**Status**: ❌ **No workflow yet**

---

**5. vocab.js** (~60-80 lines)
```javascript
export default {
  words: [
    {
      id: 1,
      word: "...",
      meaning: "...",
      phonetic: "/.../",,
      example_en: "...",
      example_vi: "...",
      image_url: "...",
      audio_url: "..."
    },
    // 10 words
  ]
}
```
**Status**: ❌ **No workflow yet**

---

**6. grammar.js** (~100-120 lines)
```javascript
export default {
  rule: {
    title_en: "Present Continuous",
    title_vi: "Thì hiện tại tiếp diễn",
    pattern: "S + am/is/are + V-ing",
    examples: [
      { en: "I am playing.", vi: "Tôi đang chơi." },
      // 5 examples
    ],
    exercises: [
      {
        id: 1,
        question_en: "She ___ (play) tennis.",
        options: ["play", "plays", "is playing", "playing"],
        correct: 2
      },
      // 8 exercises
    ]
  }
}
```
**Status**: ❌ **No workflow yet**

---

**7. games.js** (~40-50 lines)
```javascript
export default {
  games: [
    { title: "Memory Match", url: "#", description: "..." },
    { title: "Word Search", url: "#", description: "..." },
    { title: "Sentence Builder", url: "#", description: "..." }
  ]
}
```
**Status**: ❌ **No workflow yet**

---

**8. word_match.js** (~50-60 lines)
```javascript
export default {
  pairs: [
    { id: 1, word_en: "happy", word_vi: "vui vẻ" },
    // 10 pairs
  ]
}
```
**Status**: ❌ **No workflow yet**

---

**9. word_power.js** (~60-80 lines)
```javascript
export default {
  activities: [
    {
      id: 1,
      type: "synonym",
      word: "happy",
      options: ["sad", "joyful", "angry", "tired"],
      correct: 1
    },
    // 8 activities
  ]
}
```
**Status**: ❌ **No workflow yet**

---

**10. writing.js** (~70-90 lines)
```javascript
export default {
  prompts: [
    {
      id: 1,
      title_en: "My Family",
      title_vi: "Gia đình tôi",
      instruction_en: "Write 5 sentences about your family.",
      instruction_vi: "Viết 5 câu về gia đình bạn.",
      hints: ["Use: my, I have, ...", ...],
      sample_answer: "I have a big family. My father is..."
    },
    // 3 prompts
  ]
}
```
**Status**: ❌ **No workflow yet**

---

**11. ask_ai.js** (~100-150 lines)
```javascript
export default {
  contexts: [
    {
      id: 'grammar_help',
      title_en: "Grammar Help",
      title_vi: "Hỗ trợ ngữ pháp",
      system_prompt: "You are a grammar tutor...",
      examples: [
        { question: "What is present continuous?", answer: "..." },
        // 5 examples
      ]
    },
    // 4 contexts
  ]
}
```
**Status**: ❌ **No workflow yet**

---

**12. explore.js** (~80-100 lines)
```javascript
export default {
  topics: [
    {
      id: 1,
      title_en: "Animals",
      title_vi: "Động vật",
      content_en: "...",
      content_vi: "...",
      image_url: "...",
      quiz: [
        { question: "...", options: [...], correct: 0 },
        // 3 questions
      ]
    },
    // 3 topics
  ]
}
```
**Status**: ❌ **No workflow yet**

---

**13. mindmap.js** (~60-80 lines)
```javascript
export default {
  central_topic: "Family",
  branches: [
    {
      id: 1,
      label: "Members",
      sub_branches: ["Father", "Mother", "Sister", "Brother"]
    },
    // 5 main branches
  ]
}
```
**Status**: ❌ **No workflow yet**

---

**14. logic.js / logic_science.js** (~100-120 lines)
```javascript
export default {
  challenges: [
    {
      id: 1,
      type: "pattern",
      question_en: "What comes next? 2, 4, 6, 8, __",
      question_vi: "Số tiếp theo là? 2, 4, 6, 8, __",
      options: ["9", "10", "12", "14"],
      correct: 1,
      explanation_en: "The pattern is +2",
      explanation_vi: "Quy luật là +2"
    },
    // 8 challenges
  ]
}
```
**Status**: ❌ **No workflow yet**

---

**15. singapore_math.js** (từ W16+ only) (~100-120 lines)
```javascript
export default {
  problems: [
    {
      id: 1,
      problem_en: "John has 5 apples. Mary gives him 3 more. How many apples does John have now?",
      problem_vi: "...",
      model_drawing: "...", // bar model representation
      steps: [
        "Start with 5",
        "Add 3",
        "5 + 3 = 8"
      ],
      answer: 8
    },
    // 6 problems
  ]
}
```
**Status**: ❌ **No workflow yet**  
**Note**: Only for W16+ (CLIL integration phase)

---

**16. video_queries.json** (~20-30 lines)
```json
{
  "week_id": 16,
  "queries": [
    "present continuous song for kids",
    "Little Fox story",
    "action verbs vocabulary",
    "SciShow Kids science"
  ]
}
```
**Status**: ⚠️ **Generated by video workflow**, but separate from daily_watch.js

---

**17. index.js** (~20-30 lines)
```javascript
import dailyWatch from './daily_watch.js';
import read from './read.js';
import dictation from './dictation.js';
// ... import all 17 files

export default {
  dailyWatch,
  read,
  dictation,
  shadowing,
  vocab,
  grammar,
  games,
  wordMatch,
  wordPower,
  writing,
  askAi,
  explore,
  mindmap,
  logic,
  singaporeMath,
  videoQueries
};
```
**Status**: ✅ **Auto-generated** (just imports, no content generation needed)

---

#### Folder: `src/data/weeks_easy/week_XX/` (Easy Mode)

**Same 17 files as above**, but simplified content:
- Shorter sentences (5-7 words max)
- Simpler vocabulary (CEFR A0-A1)
- Fewer exercises (5 instead of 8)
- More visual hints

**Status**: ❌ **No workflow yet**

---

## 📊 TOTAL SCOPE PER WEEK

| Component | Files | Lines | KB | Status |
|-----------|-------|-------|-----|--------|
| AI Tutor (week_XX_real.js) | 1 | ~1000 | ~33 | ❌ No workflow |
| **Stations (Advanced)** | **17** | **~1500** | **~80** | **⚠️ Only 1/17 done** |
| - daily_watch.js | 1 | ~50 | ~3 | ✅ Workflow complete |
| - read.js | 1 | ~150 | ~8 | ❌ No workflow |
| - dictation.js | 1 | ~100 | ~5 | ❌ No workflow |
| - shadowing.js | 1 | ~150 | ~8 | ❌ No workflow |
| - vocab.js | 1 | ~80 | ~5 | ❌ No workflow |
| - grammar.js | 1 | ~120 | ~6 | ❌ No workflow |
| - games.js | 1 | ~50 | ~3 | ❌ No workflow |
| - word_match.js | 1 | ~60 | ~3 | ❌ No workflow |
| - word_power.js | 1 | ~80 | ~4 | ❌ No workflow |
| - writing.js | 1 | ~90 | ~5 | ❌ No workflow |
| - ask_ai.js | 1 | ~150 | ~8 | ❌ No workflow |
| - explore.js | 1 | ~100 | ~6 | ❌ No workflow |
| - mindmap.js | 1 | ~80 | ~4 | ❌ No workflow |
| - logic.js | 1 | ~120 | ~6 | ❌ No workflow |
| - singapore_math.js | 1 | ~120 | ~6 | ❌ No workflow (W16+) |
| - video_queries.json | 1 | ~30 | ~2 | ⚠️ By video workflow |
| - index.js | 1 | ~30 | ~2 | ✅ Auto-generated |
| **Stations (Easy)** | **17** | **~1200** | **~60** | **❌ No workflow** |
| **Total per week** | **35** | **~3700** | **~173** | **❌ 97.2% incomplete** |

---

## 🚨 REALITY CHECK

### Current State:
- ✅ **Daily Watch workflow**: 45 min/week
- ❌ **16 other stations**: No workflow
- ❌ **AI Tutor**: No workflow
- ❌ **Easy mode**: No workflow

### If manual for all components:
- **35 files/week** × 138 weeks = **4,830 files**
- Estimate **2-3 hours/week** (if doing ALL manually)
- Total: **138 weeks × 2.5 hours = 345 hours = 43 working days (8h/day)**

### 🔴 THIS IS NOT SUSTAINABLE!

---

## 💡 SOLUTION: AUTOMATION STRATEGY

### Tier 1: Manual (Human validation required)
**Components**: Videos only
- **Reason**: Quality critical, content curation, duplicate detection
- **Time**: 45 min/week
- **Files**: 1/35 (2.8%)

### Tier 2: AI-Generated + Human Review
**Components**: AI Tutor, Read, Dictation, Shadowing, Grammar, Writing
- **Reason**: Content quality important, but can be AI-drafted
- **Time**: 30 min review/week
- **Files**: 7/35 (20%)
- **Scripts**: Use Master Prompt V23 + Claude/GPT-4

### Tier 3: Fully Automated (Template-based)
**Components**: Vocab, Games, Word Match, Word Power, Mindmap, Ask AI, Explore, Logic, Singapore Math
- **Reason**: Structured data, template-driven, low quality risk
- **Time**: 5 min validation/week
- **Files**: 9/35 (25.7%)
- **Scripts**: Node.js generators using BLUEPRINT data

### Tier 4: Auto-Duplicate (Easy Mode)
**Components**: All 17 station files in Easy mode
- **Reason**: Simplified version of Advanced mode
- **Time**: 10 min validation/week
- **Files**: 17/35 (48.6%)
- **Scripts**: Auto-simplifier (reduce word count, simplify grammar)

### Tier 5: Auto-Generated (No review)
**Components**: index.js, video_queries.json
- **Reason**: Pure imports or metadata
- **Time**: 0 min (fully automated)
- **Files**: 2/35 (5.7%)

---

## 🎯 REVISED TIMELINE

### With Automation:

| Tier | Components | Time/Week | % of Work |
|------|-----------|-----------|-----------|
| 1. Manual | Videos | 45 min | 2.8% |
| 2. AI + Review | 6 stations + AI Tutor | 30 min | 20% |
| 3. Auto + Validation | 9 stations | 5 min | 25.7% |
| 4. Easy Mode | 17 stations | 10 min | 48.6% |
| 5. Full Auto | index, queries | 0 min | 2.9% |
| **Total** | **35 files** | **~90 min** | **100%** |

**Revised Estimate**: 
- **138 weeks × 90 min = 207 hours = 26 working days**
- **50% faster** than pure manual (43 days → 26 days)

---

## 📋 PHASED IMPLEMENTATION PLAN

### Phase 1: Validate Existing Weeks (W15-18) ✅ PRIORITY
**Goal**: Ensure gold standard is complete and correct

**Tasks**:
1. ✅ Daily Watch validated (W17-18 fixed)
2. ❌ Validate AI Tutor files (week_15-18_real.js)
3. ❌ Validate all 16 stations (W15-18)
4. ❌ Validate Easy mode completeness
5. ❌ Create validation scripts for each component type

**Deliverables**:
- Complete W15-18 audit report
- Validation scripts for all 35 file types
- Known issues documented

**Time**: 2-3 days

---

### Phase 2: Automation Scripts (W19 Test)
**Goal**: Create scripts to auto-generate 80% of content

**Tasks**:
1. ❌ Master Prompt integration (AI Tutor + complex stations)
2. ❌ Template generators (structured data stations)
3. ❌ Easy mode auto-simplifier
4. ❌ Validation suite (all components)
5. ❌ Test with W19 (full 35-file generation)

**Deliverables**:
- `generate_ai_tutor.js` (uses Claude/GPT-4)
- `generate_stations.js` (template-based)
- `generate_easy_mode.js` (auto-simplifier)
- `validate_week_complete.js` (checks all 35 files)

**Time**: 3-4 days

---

### Phase 3: Mass Production (W19-40)
**Goal**: Produce first batch with new automation

**Tasks**:
1. ❌ Generate W19-25 (7 weeks, Batch 1)
2. ❌ Review and fix issues
3. ❌ Optimize scripts based on learnings
4. ❌ Generate W26-40 (15 weeks, Batch 2)

**Deliverables**:
- 22 complete weeks (W19-40)
- 770 files generated (22 × 35)
- Optimized automation scripts

**Time**: 5-7 days (with automation)

---

### Phase 4: Scale Production (W41-156)
**Goal**: Complete remaining 116 weeks

**Tasks**:
1. ❌ Batch production (10-15 weeks at a time)
2. ❌ Automated validation
3. ❌ Spot-check every 10th week
4. ❌ Final QA on production

**Deliverables**:
- All 156 weeks complete
- 5,460 total files (156 × 35)
- Production-ready platform

**Time**: 15-20 days

---

## 🔧 REQUIRED AUTOMATION TOOLS

### 1. AI Tutor Generator (`tools/generate_ai_tutor.js`)
**Input**: 
- Week number
- BLUEPRINT_WEEKS data
- Master Prompt V23

**Process**:
1. Extract theme, grammar, vocab from BLUEPRINT
2. Call Claude/GPT-4 API with prompt
3. Parse response into week_XX_real.js format
4. Validate schema (90 objectives × 3 variants = 270 questions)

**Output**: `src/data/weeks/week_XX_real.js`

**Status**: ❌ **Need to create**

---

### 2. Station Generator (`tools/generate_stations.js`)
**Input**:
- Week number
- Station type (read, dictation, shadowing, etc.)
- BLUEPRINT_WEEKS data

**Process**:
1. Load station-specific template
2. Inject week data (theme, vocab, grammar)
3. Generate content based on rules
4. Validate schema

**Output**: `src/data/weeks/week_XX/[station].js`

**Status**: ❌ **Need to create**

---

### 3. Easy Mode Generator (`tools/generate_easy_mode.js`)
**Input**: 
- Advanced mode files (17 files from week_XX/)

**Process**:
1. Read advanced file
2. Simplify:
   - Reduce sentence length (max 7 words)
   - Replace complex vocab with simpler synonyms
   - Reduce exercise count (8 → 5)
   - Add more hints
3. Write to weeks_easy/

**Output**: `src/data/weeks_easy/week_XX/[station].js`

**Status**: ❌ **Need to create**

---

### 4. Complete Week Validator (`tools/validate_week_complete.js`)
**Input**: Week number

**Checks**:
1. ✅ AI Tutor file exists and has correct schema
2. ✅ All 17 advanced stations exist
3. ✅ All 17 easy stations exist
4. ✅ No duplicate videos across weeks
5. ✅ Grammar focus matches BLUEPRINT
6. ✅ Vocab count correct (10 words)
7. ✅ Build passes

**Output**: 
```
╔════════════════════════════════════════╗
║   COMPLETE WEEK VALIDATION - W19      ║
╚════════════════════════════════════════╝

✅ AI Tutor file: 1023 lines, 90 objectives ✓
✅ Advanced stations: 17/17 files ✓
✅ Easy stations: 17/17 files ✓
✅ No duplicate videos ✓
✅ Grammar focus: "Was/Were" matches BLUEPRINT ✓
✅ Build test: Passed in 5.73s ✓

Week 19 is READY FOR PRODUCTION!
```

**Status**: ❌ **Need to create**

---

## 🎓 NEXT STEPS (IMMEDIATE)

### Step 1: Complete W15-18 Audit (Today)
```bash
# Check all components exist
for week in 15 16 17 18; do
  echo "=== Week $week ==="
  ls -1 src/data/weeks/week_${week}/ | wc -l
  ls -lh src/data/weeks/week_${week}_real.js
done

# Validate schemas
node tools/validate_week_complete.js 15
node tools/validate_week_complete.js 16
node tools/validate_week_complete.js 17
node tools/validate_week_complete.js 18
```

### Step 2: Create Validation Script (Today)
```bash
# Create comprehensive validator first
# This will reveal what's missing/broken in W15-18
cat > tools/validate_week_complete.js << 'EOF'
// Full 35-file validator
// Check: AI Tutor, 17 advanced, 17 easy, schema compliance
EOF
```

### Step 3: Document Issues (Today)
Create: `W15-18_COMPLETE_AUDIT.md`
- Which files exist
- Which files missing
- Schema issues found
- Known bugs (e.g. dictation.js uses wrong field names)

### Step 4: Prioritize Automation (Tomorrow)
Decide:
- Which components can be fully automated?
- Which need AI generation?
- Which need manual curation?

---

## 📊 SUMMARY

### Current Reality:
- ✅ **Videos**: 45 min/week workflow exists
- ❌ **34 other files**: No workflow = **97.2% incomplete**
- ❌ **Manual production**: 43 days (not sustainable)

### Proposed Solution:
- 🤖 **80% automation** (AI gen + templates)
- 👨‍💻 **20% human validation**
- ⏱️ **90 min/week** (vs 2.5 hours manual)
- 📅 **26 days total** (vs 43 days)

### First Milestone:
- ✅ Validate W15-18 completely (all 35 files)
- ✅ Create validation scripts
- ✅ Test automation with W19
- ✅ Optimize before scaling to W20-156

---

**Status**: 🚨 **CRITICAL - Need to expand scope beyond videos**

**Next Task**: Validate W15-18 AI Tutor + all stations

**Document**: Comprehensive audit coming next...
