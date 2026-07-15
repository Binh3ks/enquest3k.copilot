# WEEK 5 COMPREHENSIVE AUDIT REPORT
**Date**: January 20, 2026  
**Purpose**: Complete inventory of Week 5 vs Week 4 - Identify all gaps and missing content

---

## 📊 EXECUTIVE SUMMARY

**Status**: ⚠️ INCOMPLETE - Multiple critical assets missing

**Overall Completion**:
- ✅ Station Files: 100% (29/29 files)
- ⚠️ Advanced Audio: 24% (33/138 files)
- ❌ Easy Mode Audio: 0% (0/116 files)
- ✅ Advanced Images: 133% (20/15 files - EXCEEDED)
- ❌ Easy Mode Images: 0% (0/15 files)

---

## 📂 FILE STRUCTURE ANALYSIS

### Station Files (JavaScript)

| Location | Week 4 | Week 5 | Status |
|----------|--------|--------|--------|
| **Advanced** (src/data/weeks/) | 15 files | 15 files | ✅ COMPLETE |
| **Easy** (src/data/weeks_easy/) | 14 files | 14 files | ✅ COMPLETE |
| **AI Tutor** | week_04_real.js | week_05_real.js | ✅ COMPLETE |

**Files Present in Both:**
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
15. index.js

---

## 🖼️ IMAGE ASSETS ANALYSIS

### Week 4 Images (15 files)
**Location**: `public/images/week4/`

```
bathroom.jpg, bed.jpg, bedroom.jpg, chair.jpg, door.jpg,
explore.jpg, good.jpg, house.jpg, kitchen.jpg, lamp.jpg,
living_room.jpg, mystery.jpg, nice.jpg, table.jpg, window.jpg
```

### Week 5 Images (20 files) 
**Location**: `public/images/week_05/`

```
bathroom.jpg, bed.jpg, bedroom.jpg, big.jpg, chair.jpg,
door.jpg, explore.jpg, good.jpg, house.jpg, kitchen.jpg,
lamp.jpg, living_room.jpg, mystery.jpg, nice.jpg, 
read_cover_w05.jpg, read_cover_w05_easy.jpg,
room.jpg, table.jpg, window.jpg, wp_match.jpg, wp_reward.jpg
```

**Extra files in Week 5**:
- ✅ big.jpg (NEW)
- ✅ room.jpg (NEW)
- ✅ read_cover_w05.jpg (NEW)
- ✅ read_cover_w05_easy.jpg (NEW)
- ✅ wp_match.jpg (NEW)
- ✅ wp_reward.jpg (NEW)

**Status**: ✅ Week 5 has MORE images than Week 4 (GOOD)

### Week 4 Easy Images (15 files)
**Location**: `public/images/week4_easy/`

### Week 5 Easy Images (0 files)
**Location**: `public/images/week_05_easy/`
**Status**: ❌ MISSING - Need to generate 15 images

---

## 🔊 AUDIO ASSETS ANALYSIS (CRITICAL GAPS)

### Week 4 Advanced Audio (138 files)
**Location**: `public/audio/week4/`

**Breakdown by type:**
- Ask AI prompts: 5 files
- Dictation sentences: 14 files
- Logic puzzles: 5 files
- Mindmap stems: 6 files
- Mindmap branches: 36 files
- Shadowing sentences: 15 files
- Reading narration: 1 file
- Explore narration: 1 file
- Writing prompts: 0 files
- Vocab words: ~50+ files (various types)
- Other: ~5 files

### Week 5 Advanced Audio (33 files) ❌
**Location**: `public/audio/week_05/`

**What EXISTS:**
- 10 vocab words (basic) - bedroom, kitchen, bathroom, living_room, bed, chair, table, house, mystery, explore
- 10 vocab words (duplicate with path prefix)
- 12 dictation sentences (sent_1.mp3 - sent_12.mp3)
- 1 story narration (story_read.mp3)

**What's MISSING (105 files):**

1. **Ask AI Audio (5 files)** ❌
   - ask_ai_1.mp3 through ask_ai_5.mp3
   - Need to extract from ask_ai.js prompts

2. **Logic Audio (5 files)** ❌
   - logic_1.mp3 through logic_5.mp3
   - Need to extract from logic.js puzzles

3. **Mindmap Stems (6 files)** ❌
   - mindmap_stem_1.mp3 through mindmap_stem_6.mp3
   - Need to extract from mindmap.js

4. **Mindmap Branches (36 files)** ❌
   - mindmap_branch_1.mp3 through mindmap_branch_36.mp3
   - Need to extract from mindmap.js

5. **Shadowing Audio (12 files)** ❌
   - shadowing_1.mp3 through shadowing_12.mp3
   - Should match dictation sentences

6. **Explore Narration (1 file)** ❌
   - explore_main.mp3
   - Need to extract from explore.js content_en

7. **Vocab Extended Audio (40 files)** ❌
   - vocab_def_[word].mp3 (10 files - definitions)
   - vocab_ex_[word].mp3 (10 files - examples)
   - vocab_coll_[word].mp3 (10 files - collocations)
   - vocab_[word].mp3 (10 files - word only) ✅ HAVE THESE

### Week 4 Easy Audio (116 files)
**Location**: `public/audio/week4_easy/`

### Week 5 Easy Audio (0 files) ❌
**Location**: `public/audio/week_05_easy/`
**Status**: ❌ COMPLETELY MISSING - Need to generate ~116 files

---

## 🔍 PATH FORMAT INCONSISTENCY ISSUE

### Current State:
```
Week 4:  week4/      week4_easy/      (NO underscore, NO zero-padding)
Week 5:  week_05/    week_05_easy/    (underscore, zero-padded)
```

### Code References:
- Week 4 station files use: `/audio/week4/` `/images/week4/`
- Week 5 station files use: `/audio/week_05/` `/images/week_05/`

### Problem:
1. Inconsistent naming makes MASS production harder
2. Scripts need to handle both formats
3. Easy mode assets not generated for Week 5

---

## 📋 COMPLETE MISSING ASSETS INVENTORY

### PRIORITY 1: Critical Audio (Advanced Mode)

**Must generate immediately:**

1. **Mindmap Audio** (42 files)
   ```
   mindmap_stem_1.mp3 ... mindmap_stem_6.mp3
   mindmap_branch_1.mp3 ... mindmap_branch_36.mp3
   ```
   - Extract from: src/data/weeks/week_05/mindmap.js
   - Stems: 6 sentence templates
   - Branches: 36 vocabulary items

2. **Shadowing Audio** (12 files)
   ```
   shadowing_1.mp3 ... shadowing_12.mp3
   ```
   - Extract from: src/data/weeks/week_05/shadowing.js
   - Should match dictation sentences exactly

3. **Ask AI Audio** (5-8 files)
   ```
   ask_ai_1.mp3 ... ask_ai_5.mp3
   ```
   - Extract from: src/data/weeks/week_05/ask_ai.js
   - Prompt questions for AI conversations

4. **Logic Audio** (5 files)
   ```
   logic_1.mp3 ... logic_5.mp3
   ```
   - Extract from: src/data/weeks/week_05/logic.js
   - Puzzle descriptions

5. **Explore Audio** (1 file)
   ```
   explore_main.mp3
   ```
   - Extract from: src/data/weeks/week_05/explore.js
   - Full content_en narration

6. **Vocab Extended Audio** (30 files)
   ```
   vocab_def_[word].mp3 (10 files)
   vocab_ex_[word].mp3 (10 files)
   vocab_coll_[word].mp3 (10 files)
   ```
   - Extract from: src/data/weeks/week_05/vocab.js
   - definition_en, example, collocation fields

**Total Advanced Audio Missing**: 95 files

### PRIORITY 2: Easy Mode Assets (All)

**Images** (15 files) ❌
```
public/images/week_05_easy/
- All vocab word images
- Cover images
- Station-specific images
```

**Audio** (~116 files) ❌
```
public/audio/week_05_easy/
- Complete audio set like Advanced mode
- But using Easy mode simplified content
```

---

## 🎯 ROOT CAUSE ANALYSIS

### Why Assets Are Missing:

1. **generate_audio.js Script Limitations**
   - Current script only generates:
     - Vocab words (basic)
     - Story narration
     - Dictation sentences
   - Does NOT generate:
     - Mindmap audio
     - Shadowing audio
     - Ask AI audio
     - Logic audio
     - Explore audio
     - Extended vocab audio (def/ex/coll)

2. **Easy Mode Not Triggered**
   - generate_images_nano.js ran only for Advanced mode
   - generate_audio.js ran only for Advanced mode
   - No separate calls for Easy mode with week_05_easy paths

3. **No Unified Asset Generator**
   - Multiple manual steps required
   - Easy to forget components
   - No validation that all assets are generated

---

## 🚀 ACTION PLAN

### STEP 1: Generate Missing Advanced Audio (NOW)

Create enhanced audio generator that extracts:
- ✅ Mindmap stems + branches (from mindmap.js)
- ✅ Shadowing sentences (from shadowing.js)
- ✅ Ask AI prompts (from ask_ai.js)
- ✅ Logic puzzles (from logic.js)
- ✅ Explore narration (from explore.js)
- ✅ Extended vocab audio (from vocab.js)

**Script**: `tools/generate_complete_audio.js` (NEW - need to create)

### STEP 2: Generate Easy Mode Assets (NOW)

Run full asset generation for Easy mode:
```bash
node tools/generate_images_nano.js 5 easy
node tools/generate_complete_audio.js 5 easy
```

### STEP 3: Update MASS Production System

**Files to update:**

1. **MASS/tools/create_week.cjs**
   - Add automatic Easy mode generation
   - Call complete audio generator
   - Validate ALL assets before marking complete

2. **tools/generate_audio.js** → **tools/generate_complete_audio.js**
   - Expand to extract ALL audio types
   - Support Easy mode
   - Add progress tracking

3. **MASS/PROMPTS/12_ASSET_GENERATION.txt** (CREATE NEW)
   - Complete specification for asset generation
   - List ALL required audio types
   - Document naming conventions

4. **Standardize Path Format**
   - Decision: Use `week_XX` format (zero-padded with underscore)
   - Update all scripts to use consistent format
   - Create migration guide for existing weeks

---

## 📊 VALIDATION CHECKLIST

After fixes, Week 5 should have:

### Advanced Mode:
- [ ] 15 station files ✅ DONE
- [ ] 1 AI Tutor file ✅ DONE
- [ ] ~20 images ✅ DONE
- [ ] ~138 audio files ❌ NEED 105 MORE

### Easy Mode:
- [ ] 14 station files ✅ DONE
- [ ] ~15 images ❌ NEED ALL
- [ ] ~116 audio files ❌ NEED ALL

### Path Consistency:
- [ ] All paths use week_XX format
- [ ] No mixed week4 vs week_04 formats

---

## 💡 RECOMMENDATIONS FOR FUTURE WEEKS

1. **Create Unified Generator Script**
   ```bash
   node MASS/tools/generate_complete_week.cjs <week_number>
   ```
   - Single command generates EVERYTHING
   - Validates completeness before finishing

2. **Asset Generation Checklist**
   - Automatically verify asset counts
   - Compare against golden standard (Week 4)
   - Block commit if assets missing

3. **Path Standardization**
   - Enforce week_XX format in all scripts
   - Auto-detect and warn on format mismatches

4. **Documentation**
   - Create ASSET_REQUIREMENTS.md
   - List exact file counts per category
   - Reference example from complete week

---

## 🎯 NEXT IMMEDIATE ACTIONS

1. ✅ Create this audit report
2. ⏳ Create `tools/generate_complete_audio.js` script
3. ⏳ Generate 95 missing Advanced audio files
4. ⏳ Generate 15 Easy mode images
5. ⏳ Generate 116 Easy mode audio files
6. ⏳ Update MASS production scripts
7. ⏳ Final validation
8. ⏳ Update MASS_PRODUCTION_CONTEXT_FINAL.md

**Estimated Time**: 60-90 minutes for all fixes

---

**Report End** - Ready to execute fixes
