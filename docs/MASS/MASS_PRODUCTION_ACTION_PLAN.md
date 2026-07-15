# MASS PRODUCTION ACTION PLAN
## Kế hoạch Hành động Chi tiết - Từng Bước

**Document Version**: 2.0 - CORRECTED  
**Date**: 13/01/2026  
**Status**: 🟢 READY TO EXECUTE  

---

## ✅ VERIFIED FINDINGS - Week 1 Audit Results

### A. Cấu trúc File & Schema - CORRECTED STATUS

| File | Prompt V24.2 Requirement | Week 1 Reality | Final Status |
|------|-------------------------|----------------|--------------|
| `index.js` | 13 stations + voiceConfig | ✅ 13 stations + voiceConfig | ✅ **PERFECT** |
| `ask_ai.js` | 5 prompts, context ≤10 words | ✅ 5 prompts, 6-8 words | ✅ **PERFECT** |
| `grammar.js` | 20 exercises, ratio 30/30/40 | ✅ 20 bài (6/6/8) | ✅ **PERFECT** |
| `vocab.js` | 10 words + metadata | ✅ 10 từ đầy đủ | ✅ **PERFECT** |
| `read.js` | **10 bold words**, 3 questions | ✅ 10 từ bold, 3 câu hỏi | ✅ **PERFECT** |
| `dictation.js` | Copy from read.js | ✅ Synced | ✅ **PERFECT** |
| `shadowing.js` | Copy from read.js | ✅ Synced | ✅ **PERFECT** |
| **`word_power.js`** | **3 collocations (Phase 1)** | ✅ **3 collocations confirmed** | ✅ **PERFECT** |
| **`logic.js`** | **5 puzzles + context** | ✅ **5 puzzles with full context** | ✅ **PERFECT** |
| **`explore.js`** | **10 bold words ≠ read.js** | ✅ **10 từ KHÁC (Scientists, tools, world, magnifying glass, tiny, leaves, microscope, observe, notebooks, discover)** | ✅ **PERFECT** |
| `daily_watch.js` | Priority channels + video IDs | ⚠️ Structure OK, need fetch real IDs | ⚠️ **NEEDS VIDEOS** |

---

### B. Critical Insight: Vocab in App ≠ Syllabus

**🎯 User Clarification Confirmed:**

> "vocab trong app không phải giống syllabus vì app là mở rộng cho syllabus đang dạy offline và standalone"

**Ví dụ Week 1:**

```
📚 SYLLABUS (Offline Class):
- Vocabulary Focus: name, age, student, hero, power, boy, girl, numbers 1-10
- Purpose: Core lesson vocabulary cho giáo viên dạy

📱 APP (Online Standalone):
- vocab.js (10 words): student, teacher, school, backpack, book, notebook, 
  classroom, library, scientist, name
- word_power.js (3 collocations): do homework, go to school, pay attention
- explore.js (10 words): Scientists, tools, world, magnifying glass, tiny, 
  leaves, microscope, observe, notebooks, discover

TOTAL APP VOCABULARY: 23 từ (10+3+10)
```

**📊 Relationship**:
- Syllabus = **Starting point** (core theme + grammar focus)
- App = **Expansion** (standalone learnable without teacher)
- Overlap: ~50% (e.g., "student" in both)
- App adds: Academic vocab (scientist, library, microscope) for self-study

**✅ Implication for Mass Production:**
- AI generator phải EXPAND syllabus vocab từ 7 từ → 10 từ (vocab.js)
- AI phải TẠO THÊM 3 collocations phù hợp chủ đề (word_power.js)
- AI phải CHỌN CLIL topic và 10 từ mới cho explore.js
- Không copy 100% từ syllabus - cần reasoning để expand hợp lý

---

### C. Verified Data Points

**✅ word_power.js Week 1:**
```javascript
// CONFIRMED: EXACTLY 3 collocations
1. "do homework" - Verb + Noun phrase
2. "go to school" - Verb + Prep + Noun
3. "pay attention" - Verb + Noun

// Level: A1-A2 (appropriate for Phase 1)
// All related to school theme ✅
```

**✅ logic.js Week 1:**
```javascript
// CONFIRMED: EXACTLY 5 puzzles with FULL CONTEXT

Puzzle 1: "Teacher gives 2 pencils to each student. There are 5 students. 
          How many pencils?" 
          ✅ Full story context (not just "2 × 5 = ?")
          ✅ Answer includes unit: "10 pencils"

Puzzle 2: "Teacher says: star, moon, star, moon, star. What comes next?"
          ✅ Logic pattern with context
          
Puzzle 3: "You borrow 2 books on Monday. You borrow 1 more book on Friday. 
          How many books total?"
          ✅ Real-life scenario with days
          
Puzzle 4: "What tool makes small things look BIG? (Ruler / Magnifying glass)"
          ✅ Critical thinking + vocab from explore.js
          
Puzzle 5: "Your backpack weighs 1 kilogram. You put in 2 books. 
          Each book is 1 kilogram. How much now?"
          ✅ Multi-step word problem
```

**✅ explore.js Week 1:**
```javascript
// CONFIRMED: 10 bold words DIFFERENT from read.js

read.js:     name, student, School, backpack, book, notebook, 
             classroom, teacher, library, scientist

explore.js:  Scientists, tools, world, magnifying glass, tiny, 
             leaves, microscope, observe, notebooks, discover

// Overlap: Only "notebook" variant (notebooks) - 90% unique ✅
// CLIL topic: Science tools (related to "scientist" from read.js)
```

---

## 🚀 PHASE-BY-PHASE ACTION PLAN

---

## PHASE 0: PRE-FLIGHT CHECKS (Jan 13-14, 2026)
### Duration: 1-2 days | Owner: QA + Dev Lead

### Objective
Verify all systems operational before production starts.

---

### Step 0.1: Final Week 1 Audit
**Duration**: 2 hours  
**Owner**: QA Lead

**Checklist**:
```bash
# Terminal commands:
cd /Users/binhnguyen/Downloads/Engquest3k

# 1. File existence check
ls -la src/data/weeks/week_01/*.js | wc -l
# Expected output: 14 files

# 2. Syntax validation
for file in src/data/weeks/week_01/*.js; do 
  echo "Checking $file..."
  node --check "$file"
done
# Expected: No errors

# 3. Start dev server
npm run dev
# Expected: Runs on localhost:5173

# 4. Manual UI test
# Navigate to Week 1 in browser
# Check: All 15 station tabs render
# Check: Text content displays correctly
# Check: No console errors
```

**Expected Results**:
- [ ] All 17 files present (14 .js + 1 .json + index.js + video_queries.json)
- [ ] No syntax errors
- [ ] Week 1 renders on localhost without errors
- [ ] All stations clickable and display content

**Exit Criteria**: ✅ All checkboxes passed

---

### Step 0.2: Asset Verification
**Duration**: 1 hour  
**Owner**: QA Lead

**Checklist**:
```bash
# Audio files
ls public/audio/week1/*.mp3 | wc -l
# Expected: ~65 files (Advanced mode)

ls public/audio/week1_easy/*.mp3 | wc -l
# Expected: ~70 files (Easy mode)

# Image files
ls public/images/week1/*.jpg | wc -l
# Expected: ~30 files

# Test playback
# Open localhost:5173/week/1
# Click vocab word → Audio plays ✅
# Click dictation → Audio plays ✅
# View images → Display correctly ✅
```

**Expected Results**:
- [ ] Audio files present and playable
- [ ] Images present and display
- [ ] No 404 errors in browser console

**Exit Criteria**: ✅ All media assets functional

---

### Step 0.3: Tool Inventory & Testing
**Duration**: 3 hours  
**Owner**: Dev Lead

**Task A: Verify Existing Tools**

```bash
# 1. Audio generation
node tools/batch_manager.js 1 1
# Expected: Generates ~135 files, no errors

# 2. Image generation
node tools/generate_images_nano.js 1 both
# Expected: Creates/updates images, uses Gemini API

# 3. Video fetching
node tools/update_videos.js 1
# Expected: Updates daily_watch.js with real YouTube IDs

# 4. Database registration
node tools/update_db_smart.js 1
# Expected: Week 1 entry in syllabus_database.js (already exists, should skip)
```

**Expected Results**:
- [ ] `batch_manager.js` - ✅ Works, generates audio
- [ ] `generate_images_nano.js` - ✅ Works, creates images
- [ ] `update_videos.js` - ✅ Works, fetches YouTube data
- [ ] `update_db_smart.js` - ✅ Works, safe insertion

**Task B: Document Missing Tool**

Create spec document for `generate_week.js`:

```markdown
# GENERATE_WEEK.JS SPECIFICATION

## Purpose
Generate 17 .js files for a given week using:
- Syllabus data (theme, grammar, basic vocab)
- Master Prompt V24.2 schemas
- GPT-4/Gemini AI for expansion

## Input
- Week ID (1-144)
- Mode (advanced/easy/both)

## Output
- 17 files in src/data/weeks/week_XX/
- 17 files in src/data/weeks_easy/week_XX/

## Process
1. Load syllabus entry for week X
2. Call GPT-4 API with Master Prompt V24.2 context
3. Generate vocab.js (expand 7→10 words)
4. Generate ask_ai.js (create 5 A0 prompts)
5. Generate grammar.js (expand pattern→20 exercises)
6. Generate logic.js (create 5 contextual puzzles)
7. Generate explore.js (select CLIL topic + 10 new words)
8. Generate word_power.js (create 3 collocations)
9. Generate read.js (write passage using 10 vocab)
10. Copy read.js → dictation.js, shadowing.js
11. Generate writing.js, mindmap.js, word_match.js
12. Generate video_queries.json (search keywords)
13. Validate all outputs against schemas
14. Write files to disk

## API Requirements
- OpenAI GPT-4 API key OR Gemini 1.5 Pro
- Cost: ~$1.50 per week (50k tokens)

## Validation Rules
- ask_ai.js: All contexts ≤10 words, A0 patterns only
- grammar.js: Exactly 20 exercises, ratio 30/30/40
- vocab.js: Exactly 10 words
- word_power.js: Exactly 3 collocations
- logic.js: Exactly 5 puzzles
- explore.js: 10 bold words ≠ read.js words
```

**Exit Criteria**: 
- [ ] Tool spec documented
- [ ] All existing tools tested and working
- [ ] API keys confirmed in `API keys.txt`

---

## PHASE 1: INFRASTRUCTURE SETUP (Jan 14-16, 2026)
### Duration: 3 days | Owner: Dev Team

### Objective
Create missing tools and automate workflow.

---

### Step 1.1: Create `generate_week.js` Tool
**Duration**: 1 day (8 hours)  
**Owner**: Senior Dev

**Implementation Plan**:

```javascript
// tools/generate_week.js - Skeleton

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({ apiKey: loadApiKey() });

async function generateWeek(weekId, mode = 'both') {
  console.log(`🏗️  Generating Week ${weekId} (${mode} mode)...`);
  
  // 1. Load syllabus data
  const syllabusEntry = loadSyllabusData(weekId);
  
  // 2. Load Master Prompt V24.2 schemas
  const schemas = loadPromptSchemas();
  
  // 3. Generate content via GPT-4
  const content = await generateWithAI(syllabusEntry, schemas);
  
  // 4. Validate outputs
  const validation = validateContent(content);
  if (!validation.passed) {
    console.error('❌ Validation failed:', validation.errors);
    return;
  }
  
  // 5. Write files
  const modes = mode === 'both' ? ['advanced', 'easy'] : [mode];
  for (const m of modes) {
    writeWeekFiles(weekId, content[m], m);
  }
  
  console.log(`✅ Week ${weekId} generated successfully!`);
}

async function generateWithAI(syllabusEntry, schemas) {
  // Call GPT-4 with structured prompt
  const prompt = buildPrompt(syllabusEntry, schemas);
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: 'You are an ESL content generator...' },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' }
  });
  
  return JSON.parse(response.choices[0].message.content);
}

function validateContent(content) {
  const errors = [];
  
  // Validate ask_ai.js
  if (content.ask_ai.prompts.length !== 5) {
    errors.push('ask_ai must have exactly 5 prompts');
  }
  content.ask_ai.prompts.forEach((p, i) => {
    const wordCount = p.context_en.split(' ').length;
    if (wordCount > 10) {
      errors.push(`ask_ai prompt ${i+1}: context too long (${wordCount} words)`);
    }
  });
  
  // Validate grammar.js
  if (content.grammar.exercises.length !== 20) {
    errors.push('grammar must have exactly 20 exercises');
  }
  
  // Validate vocab.js
  if (content.vocab.vocab.length !== 10) {
    errors.push('vocab must have exactly 10 words');
  }
  
  // Validate word_power.js
  if (content.word_power.words.length !== 3) {
    errors.push('word_power must have exactly 3 collocations');
  }
  
  // Validate logic.js
  if (content.logic.puzzles.length !== 5) {
    errors.push('logic must have exactly 5 puzzles');
  }
  
  // Validate explore.js bold words ≠ read.js
  const readWords = extractBoldWords(content.read.content_en);
  const exploreWords = extractBoldWords(content.explore.content_en);
  const overlap = readWords.filter(w => exploreWords.includes(w));
  if (overlap.length > 2) {
    errors.push(`explore has ${overlap.length} duplicate words with read (max 2)`);
  }
  
  return { passed: errors.length === 0, errors };
}

// Export main function
export { generateWeek };

// CLI interface
if (process.argv[2]) {
  const weekId = parseInt(process.argv[2]);
  const mode = process.argv[3] || 'both';
  generateWeek(weekId, mode);
}
```

**Testing Plan**:
```bash
# Test with Week 2 (known syllabus data)
node tools/generate_week.js 2 advanced

# Expected output:
# ✅ 17 files created in src/data/weeks/week_02/
# ✅ All validations passed
# ✅ No syntax errors
```

**Deliverables**:
- [ ] `generate_week.js` file created
- [ ] Integrated with OpenAI API
- [ ] Validation logic implemented
- [ ] Tested with Week 2
- [ ] Documentation written

**Exit Criteria**: Tool generates valid Week 2 content

---

### Step 1.2: Create `validate_week.js` Tool
**Duration**: 4 hours  
**Owner**: Mid-level Dev

**Purpose**: Automated validation after generation

```javascript
// tools/validate_week.js

export async function validateWeek(weekId) {
  console.log(`🔍 Validating Week ${weekId}...`);
  
  const checks = {
    fileCount: checkFileCount(weekId),
    syntaxErrors: checkSyntax(weekId),
    askAiCompliance: checkAskAI(weekId),
    grammarRatio: checkGrammar(weekId),
    vocabCount: checkVocab(weekId),
    wordPowerCount: checkWordPower(weekId),
    logicCount: checkLogic(weekId),
    exploreUniqueness: checkExplore(weekId)
  };
  
  const passed = Object.values(checks).every(c => c.passed);
  
  if (passed) {
    console.log('✅ All validations passed!');
  } else {
    console.error('❌ Validation failures:');
    Object.entries(checks).forEach(([name, result]) => {
      if (!result.passed) {
        console.error(`  - ${name}: ${result.error}`);
      }
    });
  }
  
  return checks;
}

function checkAskAI(weekId) {
  const askAiPath = `src/data/weeks/week_${weekId.toString().padStart(2,'0')}/ask_ai.js`;
  const askAi = require(askAiPath).default;
  
  // Check count
  if (askAi.prompts.length !== 5) {
    return { passed: false, error: `Expected 5 prompts, got ${askAi.prompts.length}` };
  }
  
  // Check context length
  for (let i = 0; i < askAi.prompts.length; i++) {
    const wordCount = askAi.prompts[i].context_en.split(' ').length;
    if (wordCount > 10) {
      return { passed: false, error: `Prompt ${i+1} context too long: ${wordCount} words` };
    }
  }
  
  // Check A0 patterns (simple heuristic)
  const forbiddenPatterns = [
    /How do (they|we|you all)/i,
    /What does (it|he|she)/i,
    /Where can I/i,
    /Why (is|are|do)/i
  ];
  
  for (let i = 0; i < askAi.prompts.length; i++) {
    const answers = askAi.prompts[i].answer;
    for (const answer of answers) {
      for (const pattern of forbiddenPatterns) {
        if (pattern.test(answer)) {
          return { passed: false, error: `Prompt ${i+1} uses forbidden A1 pattern: ${answer}` };
        }
      }
    }
  }
  
  return { passed: true };
}

// CLI
if (process.argv[2]) {
  validateWeek(parseInt(process.argv[2]));
}
```

**Testing**:
```bash
node tools/validate_week.js 1
# Expected: ✅ All validations passed (Week 1 is golden standard)

node tools/validate_week.js 2
# Expected: Pass/fail based on Week 2 generation quality
```

**Deliverables**:
- [ ] `validate_week.js` created
- [ ] 8 validation checks implemented
- [ ] Tested with Week 1 (should pass)
- [ ] Documentation written

---

### Step 1.3: Create `mass_produce_week.sh` Automation Script
**Duration**: 2 hours  
**Owner**: DevOps

**Purpose**: Single command to generate week + assets

```bash
#!/bin/bash
# tools/mass_produce_week.sh

set -e  # Exit on any error

WEEK_ID=$1
MODE=${2:-both}  # Default: both modes

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

if [ -z "$WEEK_ID" ]; then
  echo -e "${RED}❌ Usage: ./tools/mass_produce_week.sh <WEEK_ID> [advanced|easy|both]${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}🚀 MASS PRODUCTION - WEEK $WEEK_ID${NC}"
echo -e "${GREEN}Mode: ${MODE^^}${NC}"
echo "=============================================="
echo ""

# ========== PHASE 1: STRUCTURE ==========
echo -e "${YELLOW}📝 PHASE 1: GENERATING CONTENT FILES${NC}"
echo "Step 1/7: Running generate_week.js..."
node tools/generate_week.js $WEEK_ID $MODE

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Failed at content generation${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Step 1 complete${NC}"
echo ""

echo "Step 2/7: Validating generated content..."
node tools/validate_week.js $WEEK_ID

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Validation failed. Please review errors.${NC}"
  read -p "Continue anyway? (y/N): " confirm
  if [[ ! $confirm =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi
echo -e "${GREEN}✅ Step 2 complete${NC}"
echo ""

echo "Step 3/7: Registering in database..."
node tools/update_db_smart.js $WEEK_ID

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Failed at database registration${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Step 3 complete${NC}"
echo ""

echo -e "${YELLOW}⏸️  MANUAL CHECKPOINT:${NC}"
echo "   → Start dev server: npm run dev"
echo "   → Navigate to: localhost:5173"
echo "   → Check Week $WEEK_ID in dropdown"
echo "   → Verify all 15 stations display"
echo ""
read -p "Press ENTER when UI test passes..." 

# ========== PHASE 2: ASSETS ==========
echo ""
echo -e "${YELLOW}🎨 PHASE 2: GENERATING ASSETS${NC}"

echo "Step 4/7: Generating audio files..."
node tools/batch_manager.js $WEEK_ID $WEEK_ID
echo -e "${GREEN}✅ Step 4 complete (~135 audio files)${NC}"
echo ""

echo "Step 5/7: Generating images..."
node tools/generate_images_nano.js $WEEK_ID $MODE
echo -e "${GREEN}✅ Step 5 complete (~60 images)${NC}"
echo ""

echo "Step 6/7: Fetching YouTube videos..."
node tools/update_videos.js $WEEK_ID
echo -e "${GREEN}✅ Step 6 complete (5 videos)${NC}"
echo ""

echo -e "${YELLOW}🎉 PHASE 3: FINAL VERIFICATION${NC}"
echo "Step 7/7: Manual QA required"
echo "   → Reload localhost:5173"
echo "   → Test audio playback (vocab, dictation, read)"
echo "   → Verify images display"
echo "   → Verify videos play"
echo ""
echo -e "${GREEN}✅ Week $WEEK_ID production COMPLETE!${NC}"
echo ""
echo "Summary:"
echo "  - Content files: src/data/weeks/week_$WEEK_ID/"
echo "  - Audio files: public/audio/week$WEEK_ID/"
echo "  - Image files: public/images/week$WEEK_ID/"
echo "  - Database: syllabus_database.js updated"
echo ""
```

**Make executable**:
```bash
chmod +x tools/mass_produce_week.sh
```

**Testing**:
```bash
./tools/mass_produce_week.sh 2 both
# Expected: Runs all 7 steps, pauses for manual checks
```

**Deliverables**:
- [ ] `mass_produce_week.sh` created
- [ ] Tested with Week 2
- [ ] Error handling implemented
- [ ] Manual checkpoints added

---

### Step 1.4: Populate `weekDataLibrary` in `update_db_smart.js`
**Duration**: 4 hours  
**Owner**: Content Team

**Purpose**: Add metadata for Weeks 1-54

```javascript
// tools/update_db_smart.js - Add to weekDataLibrary

const weekDataLibrary = {
  1: {
    title: "The Young Scholar",
    grammar: ["Subject Pronouns", "Verb to be"],
    math: ["Counting 1-10"],
    science: ["Scientist tools"],
    topic: ["School day", "Student life"]
  },
  2: {
    title: "My Family Squad",
    grammar: ["This is my...", "Possession"],
    math: ["Counting family members"],
    science: ["Life cycle intro"],
    topic: ["Family relationships"]
  },
  3: {
    title: "The Mirror Game",
    grammar: ["She is tall", "She has long hair"],
    math: ["Measuring height"],
    science: ["Human senses"],
    topic: ["Appearance description"]
  },
  // ... Continue for Weeks 4-54
  // Data source: docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt
};
```

**Process**:
1. Open syllabus file
2. Extract Week 1-54 data
3. Format as JavaScript objects
4. Add to `update_db_smart.js`
5. Test: `node tools/update_db_smart.js 2` (should work)

**Deliverables**:
- [ ] Weeks 1-54 added to weekDataLibrary
- [ ] Tested with sample weeks (2, 10, 20, 30, 40, 50)
- [ ] Git commit

---

## PHASE 2: PILOT PRODUCTION (Jan 16-17, 2026)
### Duration: 2 days | Owner: Full Team

### Objective
Generate Week 2 as proof-of-concept and refine workflow.

---

### Step 2.1: Generate Week 2 (Advanced Mode Only)
**Duration**: 2 hours  
**Owner**: Dev Lead + Content Lead

**Execution**:
```bash
# Generate content
node tools/generate_week.js 2 advanced

# Review output
ls -la src/data/weeks/week_02/
# Expected: 17 files

# Validate
node tools/validate_week.js 2
```

**Manual Review Checklist**:
- [ ] Read `ask_ai.js`: Are contexts ≤10 words? Are answers A0-compliant?
- [ ] Read `vocab.js`: Are 10 words appropriate for "Family" theme?
- [ ] Read `grammar.js`: Is ratio 30/30/40? Do examples use family vocab?
- [ ] Read `read.js`: Does passage flow naturally? Are 10 words bolded?
- [ ] Read `explore.js`: Is CLIL topic related? Are words different from read.js?
- [ ] Read `word_power.js`: Are 3 collocations family-related?
- [ ] Read `logic.js`: Do 5 puzzles have full context? Answers include units?

**If issues found**:
1. Document in issue tracker
2. Adjust prompts in `generate_week.js`
3. Re-generate Week 2
4. Repeat until satisfied

**Exit Criteria**: Week 2 Advanced content approved by Content Lead

---

### Step 2.2: Register Week 2 & Test UI
**Duration**: 30 minutes  
**Owner**: QA Lead

```bash
# Register
node tools/update_db_smart.js 2

# Start dev server
npm run dev

# Manual UI test:
# 1. Open localhost:5173
# 2. Select Week 2 from dropdown
# 3. Check all 15 stations render
# 4. Read text content (no media yet)
# 5. Verify no console errors
```

**Exit Criteria**: Week 2 displays correctly in UI

---

### Step 2.3: Generate Assets for Week 2
**Duration**: 1 hour  
**Owner**: Dev Team

```bash
# Audio
node tools/batch_manager.js 2 2
# Expected: ~65 audio files in public/audio/week2/

# Images
node tools/generate_images_nano.js 2 advanced
# Expected: ~30 images in public/images/week2/

# Videos
node tools/update_videos.js 2
# Expected: daily_watch.js updated with 3-5 video IDs
```

**Exit Criteria**: All assets generated without errors

---

### Step 2.4: Final QA for Week 2
**Duration**: 2 hours  
**Owner**: QA Team

**Comprehensive Test**:
```
✅ Content Quality:
[ ] Vocabulary appropriate for age 6-10
[ ] Grammar exercises clear and correct
[ ] Read passage flows naturally
[ ] Explore topic educational and interesting

✅ CEFR Compliance:
[ ] Ask AI questions are A0-level only
[ ] No complex sentence structures
[ ] Vocabulary max 2 syllables

✅ Media Functionality:
[ ] Vocab audio plays on click
[ ] Dictation audio plays sentence-by-sentence
[ ] Read passage audio plays full story
[ ] Images display correctly
[ ] Videos embed and play

✅ User Experience:
[ ] Navigation smooth (prev/next week)
[ ] Station tabs switch correctly
[ ] No broken links or 404 errors
[ ] Mobile responsive (test on phone)
```

**Bug Tracking**:
- Log all issues in Google Sheet
- Priority: Critical (blocks) / High / Medium / Low
- Assign to dev for fixes

**Exit Criteria**: ≤3 Low-priority bugs remaining

---

### Step 2.5: Retrospective & Workflow Refinement
**Duration**: 1 hour  
**Owner**: All Leads

**Discussion Topics**:
1. What went well?
2. What slowed us down?
3. What can be automated further?
4. What validations are missing?
5. Is generation quality acceptable?

**Action Items**:
- Update `generate_week.js` based on learnings
- Add new validation rules if needed
- Document best practices
- Estimate time for next weeks

**Deliverables**:
- [ ] Retrospective notes document
- [ ] Updated tool scripts
- [ ] Refined workflow diagram

**Exit Criteria**: Team agrees Week 2 process is repeatable

---

## PHASE 3: BATCH PRODUCTION (Jan 17 - Mar 3, 2026)
### Duration: 6 weeks | Owner: Production Team

### Objective
Mass produce Weeks 3-54 (52 weeks total) with quality assurance.

---

### Sprint Structure

**Sprint 3.1: Weeks 3-10 (Jan 17-24, 2026)**
- Velocity: 1 week per day
- Duration: 8 days
- Deep QA: Week 5, Week 10

**Sprint 3.2: Weeks 11-20 (Jan 25 - Feb 3, 2026)**
- Velocity: 1 week per day
- Duration: 10 days
- Deep QA: Week 15, Week 20

**Sprint 3.3: Weeks 21-30 (Feb 4-13, 2026)**
- Velocity: 1 week per day
- Duration: 10 days
- Deep QA: Week 25, Week 30

**Sprint 3.4: Weeks 31-40 (Feb 14-23, 2026)**
- Velocity: 1 week per day
- Duration: 10 days
- Deep QA: Week 35, Week 40

**Sprint 3.5: Weeks 41-48 (Feb 24 - Mar 3, 2026)**
- Velocity: 1 week per day
- Duration: 8 days
- Deep QA: Week 45, Week 48

**Sprint 3.6: Weeks 49-54 (Mar 3-10, 2026)**
- Velocity: 0.5 weeks per day (more review)
- Duration: 12 days (6 weeks ÷ 0.5)
- Deep QA: Week 50, Week 52, Week 54

---

### Daily Production Routine

**Morning (9am - 12pm): Generation**
```bash
# Dev Team: Generate 1 week
./tools/mass_produce_week.sh $WEEK_ID both

# Parallel: Content Team reviews previous day's output
# Fix any issues found
```

**Afternoon (1pm - 5pm): QA & Bug Fixes**
```bash
# QA Team: Test newly generated week
# Follow comprehensive checklist (see Phase 2, Step 2.4)

# Dev Team: Fix bugs from yesterday's week
# Update and re-run if needed
```

**End of Day: Status Update**
- Slack/email report: Week X status (Pass/Fail)
- If failed: What needs fixing tomorrow
- Update progress tracker

---

### Deep QA Checkpoints

**Every 5th Week** (5, 10, 15, 20, 25, 30, 35, 40, 45, 50):

**Extended Checks**:
```
✅ CEFR Deep Dive:
[ ] Run all ask_ai.js prompts through A0 validator
[ ] Check for grammar level creep (accidentally using A1 structures)
[ ] Verify vocabulary syllable count ≤2

✅ Content Coherence:
[ ] Read passage uses all 10 bold words naturally (not forced)
[ ] Grammar exercises match week's grammar focus
[ ] Logic puzzles relate to week's topic
[ ] Explore CLIL topic connects to main theme

✅ Dual-Mode Differentiation:
[ ] Easy mode is TRULY easier (not just slightly reworded)
[ ] Compare context lengths: Easy < Advanced
[ ] Compare sentence counts: Easy < Advanced
[ ] Compare vocabulary complexity: Easy < Advanced

✅ Asset Quality:
[ ] Audio pronunciation is natural (not robotic)
[ ] Images are age-appropriate and culturally neutral
[ ] Videos are from priority channels (60%+ from Tier 1)
[ ] No broken/missing assets

✅ Consistency Across Weeks:
[ ] Difficulty increases gradually (no sudden jumps)
[ ] Vocabulary builds on previous weeks
[ ] Grammar progresses logically
```

**Time Allocation**: 4 hours per checkpoint week

---

### Progress Tracking

**Metrics Dashboard** (Google Sheets or Notion):

| Week | Status | Generated Date | QA Pass | Bug Count | Time (hrs) | Notes |
|------|--------|----------------|---------|-----------|------------|-------|
| 1 | ✅ Baseline | Jan 10 | ✅ | 0 | - | Golden standard |
| 2 | ✅ Complete | Jan 16 | ✅ | 2 (Low) | 5 | Pilot successful |
| 3 | 🟡 In Progress | Jan 17 | ⏳ | - | - | |
| ... | | | | | | |

**Color Codes**:
- ✅ Green: Complete & approved
- 🟡 Yellow: In progress or pending fixes
- 🔴 Red: Blocked or failed QA

---

### Risk Mitigation

**Risk 1: API Quota Exceeded**
- **Trigger**: YouTube/Gemini API returns 429 error
- **Response**: 
  - Use fallback videos from curated list
  - Switch to backup API key
  - Wait 24 hours if quota resets daily

**Risk 2: Content Quality Degradation**
- **Trigger**: 3+ weeks in a row fail deep QA
- **Response**:
  - Pause production
  - Review prompts in `generate_week.js`
  - Regenerate failed weeks
  - Add new validation rules

**Risk 3: Team Burnout**
- **Trigger**: Velocity drops below 0.5 weeks/day
- **Response**:
  - Add extra day between sprints
  - Reduce daily target temporarily
  - Rotate team members

---

## PHASE 4: GRADUATION PREP (Mar 10-17, 2026)
### Duration: 1 week | Owner: Content Team

### Objective
Handle Weeks 49-54 which have lower syllabus detail.

---

### Special Considerations

**Weeks 49-54 Syllabus Coverage**:
```
Week 49: Future Dreams - Want to be
Week 50: Grammar Review
Week 51: Vocab & CLIL Review
Week 52: Present Perfect chunks ("Have you ever")
Week 53-54: Portfolio & Graduation Showcase
```

**Challenge**: Less prescriptive than Weeks 1-48

**Strategy**:
1. **More human oversight** (50% review instead of 20%)
2. **AI reasoning prompt**: "Weeks 49-54 are graduation prep. Synthesize content from Weeks 1-48 to create review activities."
3. **Portfolio generation**: Create templates for student work collection
4. **Graduation ceremony content**: Speech templates, certificates

---

### Enhanced Process for Weeks 49-54

**Step A: Generate with extended prompt**
```javascript
// In generate_week.js, special handling:
if (weekId >= 49 && weekId <= 54) {
  prompt += `
  SPECIAL CONTEXT: This is Phase 1 graduation prep.
  - Week 49: Future tense intro (want to be, going to be)
  - Week 50-51: Review all grammar/vocab from Weeks 1-48
  - Week 52: Introduce Present Perfect chunks (memorization only)
  - Week 53-54: Portfolio curation & graduation preparation
  
  For review weeks: Create spiraling activities that touch on 5-7 topics from earlier weeks.
  For portfolio weeks: Create self-reflection prompts and showcase templates.
  `;
}
```

**Step B: Human content review (mandatory)**
- Content Lead reviews ALL generated content
- Checks for coherence and graduation-appropriate tone
- Edits directly if needed (not just AI re-gen)

**Step C: Special assets**
- Week 54: Generate certificate template
- Week 54: Create graduation speech scaffold
- Week 53: Portfolio collection UI (if needed)

---

## PHASE 5: DOCUMENTATION & HANDOFF (Mar 17-20, 2026)
### Duration: 3 days | Owner: All

### Objective
Document learnings and prepare for Phase 2 (Weeks 55+).

---

### Step 5.1: Create Content Library Documentation
**Duration**: 1 day  
**Owner**: Content Team

**Deliverables**:
```markdown
# CONTENT_LIBRARY_GUIDE.md

## Overview
52 weeks of Phase 1 content (A0/A0++ level)

## Structure
- src/data/weeks/week_01/ to week_54/
- src/data/weeks_easy/week_01/ to week_54/

## Content Types per Week
1. vocab.js - 10 core words
2. word_power.js - 3 collocations
3. read.js - Main passage (10 bold words)
4. explore.js - CLIL passage (10 different bold words)
5. grammar.js - 20 exercises (30/30/40 ratio)
6. ask_ai.js - 5 A0-level prompts
7. logic.js - 5 contextual puzzles
8. dictation.js - Copy of read.js
9. shadowing.js - Copy of read.js
10. writing.js - Writing prompt
11. mindmap.js - Speaking stems
12. daily_watch.js - 3-5 YouTube videos
13. word_match.js - Vocab pairs
14. video_queries.json - Search metadata

## Vocabulary Expansion Logic
- Syllabus provides: 5-7 core words
- App expands to: 10 words (vocab.js)
- App adds: 3 collocations (word_power.js)
- App adds: 10 CLIL words (explore.js)
- Total: 23 unique words per week

## Quality Standards
- CEFR: Strict A0 compliance
- Sentence length: Max 8 words
- Vocabulary: Max 2 syllables
- Context: Full sentences, not fragments

## Known Issues & Workarounds
[Document any recurring problems and fixes]
```

---

### Step 5.2: Tool Documentation
**Duration**: 1 day  
**Owner**: Dev Team

**Deliverables**:
```markdown
# TOOLS_REFERENCE.md

## generate_week.js
**Purpose**: Generate 17 content files from syllabus data
**Usage**: `node tools/generate_week.js <WEEK_ID> [advanced|easy|both]`
**API**: OpenAI GPT-4 Turbo
**Cost**: ~$1.50 per week
**Output**: src/data/weeks/week_XX/*.js

## batch_manager.js
**Purpose**: Generate audio files using Google TTS
**Usage**: `node tools/batch_manager.js <START> <END>`
**API**: Google Cloud Text-to-Speech Neural2
**Cost**: ~$0.13 per week
**Output**: public/audio/weekX/*.mp3

## generate_images_nano.js
**Purpose**: Generate images using Gemini
**Usage**: `node tools/generate_images_nano.js <WEEK_ID> [mode]`
**API**: Gemini Nano Banana (free tier)
**Cost**: $0
**Output**: public/images/weekX/*.jpg

## update_videos.js
**Purpose**: Fetch YouTube videos via Data API
**Usage**: `node tools/update_videos.js <WEEK_ID>`
**API**: YouTube Data API v3
**Cost**: Free (quota-based)
**Output**: Updates daily_watch.js

## update_db_smart.js
**Purpose**: Register week in database
**Usage**: `node tools/update_db_smart.js <WEEK_ID>`
**Output**: Updates src/data/syllabus_database.js

## validate_week.js
**Purpose**: Automated quality checks
**Usage**: `node tools/validate_week.js <WEEK_ID>`
**Checks**: 8 validation rules
**Output**: Pass/fail report

## mass_produce_week.sh
**Purpose**: Full workflow automation
**Usage**: `./tools/mass_produce_week.sh <WEEK_ID> [mode]`
**Duration**: ~25 minutes per week
**Includes**: All 7 steps from generation to asset creation
```

---

### Step 5.3: Lessons Learned Report
**Duration**: 1 day  
**Owner**: Project Manager

**Topics to Cover**:
1. What worked well?
2. What took longer than expected?
3. What automation could be added?
4. What validation was most useful?
5. How many bugs per week on average?
6. What was the actual cost vs estimate?
7. What should Phase 2 prepare for?

**Deliverable**: `PHASE1_RETROSPECTIVE.md`

---

### Step 5.4: Prepare for Phase 2 (Weeks 55+)
**Duration**: Ongoing (parallel with Phase 5)  
**Owner**: Senior Content Designer

**Tasks**:
1. **Analyze Weeks 55-60 from syllabus**
   - Note new grammar structures (compound sentences)
   - Note new exercise types (two-step word problems)
   - Note increased complexity (100-word writing)

2. **Draft Prompt V25 outline**
   ```markdown
   # MASTER PROMPT V25 - PHASE 2 (A1 Level)
   
   ## New Schemas Required:
   
   ### grammar.js (Phase 2)
   - New type: "compound_sentence"
   - New connector types: because, so, although, however
   - Example: { sentence1, sentence2, connector, answer }
   
   ### logic.js (Phase 2)
   - Increase to 7 puzzles (from 5)
   - New type: "two_step_word_problem"
   - Example: { question, step1, step2, answer }
   
   ### writing.js (Phase 2)
   - Min words: 100 (from 40)
   - New field: "paragraph_structure"
   - Requires: Topic sentence + 3 support + conclusion
   
   ### vocab.js (Phase 2)
   - CEFR: A1-A2 level
   - Syllables: 2-3 (from 1-2)
   - New field: "synonym" and "antonym"
   ```

3. **Manually create Weeks 55-57**
   - Use as golden standard for V25
   - Establish patterns for compound sentences
   - Test two-step math problems

4. **Set timeline for V25 completion**
   - Target: By Mar 31, 2026
   - Ready to start Week 58+ in April

---

## APPENDIX A: DAILY CHECKLIST TEMPLATE

### Morning (Day X of Production)

**9:00 AM - Standup**
- [ ] Review yesterday's completed week
- [ ] Address any blockers
- [ ] Assign today's week ID

**9:30 AM - Generation**
```bash
# Generate today's week
./tools/mass_produce_week.sh $WEEK_ID both

# Pause at manual checkpoint
# QA lead verifies UI render
```

**10:30 AM - Validation**
```bash
# Automated checks
node tools/validate_week.js $WEEK_ID

# Manual content review (10 min spot check)
# Content lead reviews ask_ai.js and read.js
```

**11:00 AM - Bug Fixes (Previous Day)**
- [ ] Review bug tracker from yesterday
- [ ] Fix Critical/High priority issues
- [ ] Re-test fixed weeks

---

### Afternoon

**1:00 PM - Asset Generation**
```bash
# Continue with today's week
# Audio
node tools/batch_manager.js $WEEK_ID $WEEK_ID

# Images  
node tools/generate_images_nano.js $WEEK_ID both

# Videos
node tools/update_videos.js $WEEK_ID
```

**2:00 PM - Comprehensive QA**
- [ ] Test all 15 stations
- [ ] Verify media playback
- [ ] Check mobile responsive
- [ ] Log any bugs in tracker

**4:00 PM - Documentation**
- [ ] Update progress tracker
- [ ] Add notes to week's row
- [ ] Calculate time spent
- [ ] Estimate remaining work

**4:30 PM - End of Day Report**
- [ ] Send status email to team
- [ ] Commit code to Git
- [ ] Prepare tomorrow's week ID

---

## APPENDIX B: BUG TRACKING TEMPLATE

### Google Sheet Columns

| Week | Bug ID | Priority | Description | Affected File | Assigned To | Status | Fixed Date | Notes |
|------|--------|----------|-------------|---------------|-------------|--------|------------|-------|
| 2 | B001 | High | Ask AI context 12 words (too long) | ask_ai.js | Dev A | ✅ Fixed | Jan 17 | Re-generated |
| 3 | B002 | Low | Typo in read passage | read.js | Dev B | ✅ Fixed | Jan 18 | Manual edit |
| ... | | | | | | | | |

### Priority Levels
- 🔴 **Critical**: Blocks production, must fix immediately
- 🟠 **High**: Affects quality, fix within 24 hours
- 🟡 **Medium**: Minor issue, fix within 3 days
- 🟢 **Low**: Cosmetic, fix when convenient

---

## APPENDIX C: COST TRACKING TEMPLATE

### Weekly Cost Log

| Week | Content Gen | Audio | Images | Videos | Total API | Human Hours | Labor Cost | Total |
|------|-------------|-------|--------|--------|-----------|-------------|------------|-------|
| 2 | $1.50 | $0.13 | $0 | $0 | $1.63 | 5 | $150 | $151.63 |
| 3 | $1.50 | $0.13 | $0 | $0 | $1.63 | 2 | $60 | $61.63 |
| ... | | | | | | | | |

### Cumulative
- **Total API Cost (Weeks 2-54)**: $86.39
- **Total Labor Hours**: 119 hours (estimated)
- **Total Labor Cost**: $3,570 (at $30/hr)
- **Grand Total**: $3,656.39

---

## APPENDIX D: CONTACT & ESCALATION

| Role | Name | Slack | Email | Responsibility |
|------|------|-------|-------|----------------|
| **Project Manager** | TBD | @pm | pm@engquest.com | Overall coordination |
| **Dev Lead** | TBD | @dev-lead | dev@engquest.com | Tools, automation |
| **Content Lead** | TBD | @content | content@engquest.com | Content quality |
| **QA Lead** | TBD | @qa | qa@engquest.com | Testing, bug tracking |

### Escalation Path
1. **Issue discovered** → Report in #bugs channel
2. **If blocks production** → Tag @dev-lead + @pm
3. **If content concern** → Tag @content + @pm
4. **If critical** → Direct message PM immediately

---

## FINAL READINESS CHECKLIST

### Before Starting Phase 1 (Infrastructure)

- [ ] All team members assigned roles
- [ ] Communication channels set up (Slack/email)
- [ ] API keys verified and accessible
- [ ] Dev environment stable (localhost runs)
- [ ] Git repository permissions granted
- [ ] Documentation folder created
- [ ] Progress tracker spreadsheet ready

### Before Starting Phase 3 (Batch Production)

- [ ] Week 2 successfully completed as pilot
- [ ] All tools tested and working
- [ ] Validation script catches errors correctly
- [ ] Team trained on daily routine
- [ ] Bug tracking system operational
- [ ] Backup plan for API failures documented

### Before Starting Phase 5 (Documentation)

- [ ] Weeks 1-54 generated and QA'd
- [ ] All assets present and functional
- [ ] Database updated with all weeks
- [ ] Known issues documented with workarounds
- [ ] Cost tracking up to date

---

## SIGN-OFF

**Infrastructure Setup (Phase 1) - Ready**: _____________  
**Signature**: _____________  
**Date**: _____________  

**Batch Production (Phase 3) - Approved to Start**: _____________  
**Signature**: _____________  
**Date**: _____________  

**Phase 1 Completion (Phase 5) - Verified**: _____________  
**Signature**: _____________  
**Date**: _____________  

---

**END OF ACTION PLAN**

**Next Document**: Prompt V25 Specification (To be created in Phase 5, Step 5.4)
