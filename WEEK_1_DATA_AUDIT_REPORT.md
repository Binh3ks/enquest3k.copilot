# 🚨 WEEK 1 DATA AUDIT REPORT - CRITICAL ISSUES FOUND

**Date:** December 28, 2024  
**Auditor:** AI Assistant  
**Benchmark:** Week 19 + Master Prompt V23  
**Status:** ❌ **FAILED - 5 CRITICAL ERRORS + 3 MINOR ISSUES**

---

## 📊 EXECUTIVE SUMMARY

Week 1 data has **5 CRITICAL ERRORS** that break UI functionality and **3 MINOR ISSUES** that violate Blueprint/Prompt V23 requirements. These errors MUST be fixed before Week 1 can be used in production.

**Impact:** 
- ❌ Bold words won't work (UI click-to-define broken)
- ❌ Schema mismatch causes data validation failures
- ⚠️ Audio paths may 404 (naming convention mismatch)
- ⚠️ Missing fields cause component crashes

---

## 🔴 CRITICAL ERRORS (5 ISSUES)

### ❌ **ERROR #1: Bold Words Format Incorrect (read.js)**
**Location:** `/src/data/weeks/week_01/read.js` line 5  
**Current (WRONG):**
```javascript
content_en: `My *name* is Alex. I am a *student* in a big *school*...`
```

**Should Be (CORRECT):**
```javascript
content_en: `My **name** is Alex. I am a **student** in a big **school**...`
```

**Impact:** 
- UI click-to-define feature WILL NOT WORK
- Blueprint requirement: "Exactly 10 bold words using Markdown `**word**`"
- ReadingExplore component searches for `**word**` pattern, not `*word*`

**Root Cause:** Generator used single asterisk (italic) instead of double asterisk (bold)

---

### ❌ **ERROR #2: Bold Words Format Incorrect (explore.js)**
**Location:** `/src/data/weeks/week_01/explore.js` line 5  
**Current (WRONG):**
```javascript
content_en: `*Scientists* use special *tools* to help them learn...`
```

**Should Be (CORRECT):**
```javascript
content_en: `**Scientists** use special **tools** to help them learn...`
```

**Impact:** Same as Error #1 - UI feature broken

---

### ❌ **ERROR #3: WordPower Schema Mismatch**
**Location:** `/src/data/weeks/week_01/wordpower.js`  

**Week 1 Has (WRONG):**
```javascript
{
  word: "do homework",
  definition_en: "...",
  definition_vi: "...",
  example_en: "...",     // ❌ Should be just 'example'
  example_vi: "...",     // ❌ Should NOT exist
  model_sentence_en: "...",  // ❌ Should be just 'model_sentence'
  model_sentence_vi: "...",  // ❌ Should NOT exist
  image_url: "...",
  audio_word: "...",
  audio_def: "...",
  audio_ex: "...",
  audio_model: "..."
}
```

**Week 19 Has (CORRECT):**
```javascript
{
  id: 1,                    // ✅ MISSING in Week 1
  word: "look back",
  pronunciation: "/lʊk bæk/",  // ✅ MISSING in Week 1
  cefr_level: "A2",        // ✅ MISSING in Week 1
  definition_en: "...",
  definition_vi: "...",
  example: "...",          // ✅ Only English version
  model_sentence: "...",   // ✅ Only English version
  collocation: "look back on",  // ✅ MISSING in Week 1
  image_url: "..."
}
```

**Missing Fields in Week 1:**
1. ❌ `id` (required for array indexing)
2. ❌ `pronunciation` (required for UI display)
3. ❌ `cefr_level` (required for difficulty indication)
4. ❌ `collocation` (required for Blueprint compliance)

**Wrong Fields in Week 1:**
1. ❌ `example_en` should be `example` (English only)
2. ❌ `example_vi` should NOT exist (Vietnamese removed in Phase 1)
3. ❌ `model_sentence_en` should be `model_sentence`
4. ❌ `model_sentence_vi` should NOT exist

**Impact:** 
- Component may crash when accessing `wordpower[0].id` (undefined)
- UI won't display pronunciation
- Vietnamese sentences violate Blueprint morphing rules

---

### ❌ **ERROR #4: Audio Path Naming Mismatch**
**Location:** Multiple files  

**Week 1 Uses:**
```javascript
audio_url: "/audio/week01/..."  // ❌ 'week01' (2 digits)
```

**Week 19 Uses:**
```javascript
audio_url: null  // ✅ Script injects path, OR uses "/audio/week19/..." (no leading zero)
```

**Correct Pattern (from WEEK_19_COMPLETE_REFERENCE.md):**
```
/audio/week1/read_explore_main.mp3   (NO leading zero)
/audio/week19/read_explore_main.mp3  (NO leading zero)
```

**Impact:**
- Audio files may 404 if stored as `week1/` but data references `week01/`
- Inconsistent naming causes maintenance issues

**Note:** This may not break immediately if folders are named correctly, but violates convention.

---

### ❌ **ERROR #5: Sentence Count Violation**
**Location:** `read.js` and `explore.js`  

**Week 1 read.js:**
```javascript
content_en: `My name is Alex. I am a student in a big school. My school has many classrooms and a library. I love reading books in the library. Every day, I bring my backpack, pencils, and notebooks to class. My teacher, Ms. Johnson, is very kind. She teaches us English and Science. I am happy to learn new things every day. I want to be a scientist when I grow up.`
```
**Sentence count:** 9 sentences  
**Requirement:** Advanced mode = 8-12 sentences ✅ **PASS**

**Week 1 explore.js:**
```javascript
content_en: `Scientists use special tools to help them learn about the world. A magnifying glass makes small things look bigger. A microscope helps scientists see tiny things that we cannot see with our eyes. Thermometers measure temperature to tell us if something is hot or cold. Rulers and measuring tapes help scientists measure size and distance. Test tubes hold liquids for experiments. With these tools, scientists can make amazing discoveries!`
```
**Sentence count:** 7 sentences  
**Requirement:** Advanced mode = 8-12 sentences ❌ **FAIL (needs 1 more sentence)**

**Impact:** Violates Prompt V23 + Blueprint sentence count requirements

---

## ⚠️ MINOR ISSUES (3 ISSUES)

### ⚠️ **ISSUE #1: index.js File Naming Inconsistency**
**Location:** `/src/data/weeks/week_01/index.js` line 3  

**Current:**
```javascript
import wordpower from './wordpower.js';
```

**Week 19 Uses:**
```javascript
import word_power from './word_power.js';  // Underscore naming
```

**Issue:** Week 1 uses `wordpower.js` (no underscore), Week 19 uses `word_power.js` (with underscore)

**Impact:** Minor - works either way, but inconsistent with Week 19 reference

---

### ⚠️ **ISSUE #2: Extra File (quiz.js)**
**Location:** `/src/data/weeks/week_01/`  

Week 1 has 16 files (includes `quiz.js`), Week 19 has 15 files (includes `video_queries.json` but no `quiz.js`)

**Question:** Is `quiz.js` a new station or leftover from old structure?

**Impact:** Minor - doesn't break anything, but not documented in Prompt V23

---

### ⚠️ **ISSUE #3: Missing Video Queries File**
**Location:** `/src/data/weeks/week_01/video_queries.json`  

Week 19 has this file for video generation tracking. Week 1 Advanced has it, but check if Week 1 Easy mode has it.

**Impact:** Minor - only affects video regeneration workflow

---

## 📋 DETAILED COMPARISON TABLE

| Component | Week 19 (Reference) | Week 1 (Current) | Status |
|-----------|-------------------|------------------|--------|
| **read.js bold words** | `**word**` ✅ | `*word*` ❌ | ❌ FAIL |
| **explore.js bold words** | `**word**` ✅ | `*word*` ❌ | ❌ FAIL |
| **read.js sentence count** | 9 sentences ✅ | 9 sentences ✅ | ✅ PASS |
| **explore.js sentence count** | 10 sentences ✅ | 7 sentences ❌ | ❌ FAIL |
| **vocab.js structure** | Has collocation ✅ | Has collocation ✅ | ✅ PASS |
| **wordpower.js fields** | id, pronunciation, cefr_level, collocation ✅ | Missing all 4 ❌ | ❌ FAIL |
| **wordpower.js bilingual** | English only ✅ | Has _vi fields ❌ | ❌ FAIL |
| **dictation/shadowing match** | Same 8 sentences ✅ | Same 8 sentences ✅ | ✅ PASS |
| **mindmap structure** | centerStems + branchLabels ✅ | Same ✅ | ✅ PASS |
| **daily_watch count** | 5 videos ✅ | 5 videos ✅ | ✅ PASS |
| **voiceConfig present** | Yes ✅ | Yes ✅ | ✅ PASS |
| **audio path format** | `/audio/week19/` ✅ | `/audio/week01/` ⚠️ | ⚠️ WARNING |

**SCORE: 7/12 PASS = 58% COMPLIANCE**

---

## 🔧 PROMPT V23 GAPS IDENTIFIED

Based on Week 1 audit, Prompt V23 is MISSING these critical specifications:

### **GAP #1: Bold Words Syntax Not Explicit Enough**
**Current Prompt V23 says:**
```markdown
- ⚠️ MANDATORY: Exactly 10 bold words using Markdown **word**
```

**Should Say:**
```markdown
- ⚠️ MANDATORY: Exactly 10 bold words using DOUBLE ASTERISKS: **word** (NOT single asterisk *word*)
- UI searches for `**word**` pattern to enable click-to-define feature
- Example: "My **name** is Alex." (CORRECT)
- Example: "My *name* is Alex." (WRONG - this is italic, not bold)
```

### **GAP #2: WordPower Schema Not Documented**
**Current Prompt V23:** References "same schema as week 19" but doesn't list fields

**Should Add:**
```markdown
### wordpower.js (word_power.js) Schema (Phase 1 - 3 items):
REQUIRED FIELDS:
- id: number (1, 2, 3)
- word: string (collocation like "do homework")
- pronunciation: string ("/duː ˈhoʊmwɜːrk/")
- cefr_level: string ("A1", "A2", "B1")
- definition_en: string (English definition)
- definition_vi: string (Vietnamese definition)
- example: string (English ONLY - NO example_vi field)
- model_sentence: string (English ONLY - NO model_sentence_vi field)
- collocation: string (common usage pattern)
- image_url: string (path to image)

FORBIDDEN FIELDS:
- ❌ example_en, example_vi (use 'example' only)
- ❌ model_sentence_en, model_sentence_vi (use 'model_sentence' only)
- ❌ audio_word, audio_def, audio_ex, audio_model (script injects these)
```

### **GAP #3: Audio Path Naming Not Specified**
**Should Add:**
```markdown
### Audio Path Naming Convention:
- Week 1-9: `/audio/week1/`, `/audio/week2/`, ... (NO leading zero)
- Week 10+: `/audio/week10/`, `/audio/week19/`, ... (NO leading zero)
- Easy mode: `/audio/week1_easy/`, `/audio/week19_easy/`

WRONG EXAMPLES:
- ❌ `/audio/week01/` (don't use leading zero)
- ❌ `/audio/wk1/` (don't abbreviate)
```

### **GAP #4: Sentence Count Enforcement Not Strong Enough**
**Current Prompt V23:** Lists requirement but doesn't emphasize validation

**Should Add:**
```markdown
⚠️ CRITICAL VALIDATION CHECKPOINT:
Before generating ANY content, COUNT SENTENCES:
1. Split content_en by period (.)
2. Count resulting sentences
3. Easy mode: MUST have 6-8 sentences
4. Advanced mode: MUST have 8-12 sentences
5. If count wrong, REGENERATE content until correct

DO NOT PROCEED if sentence count is wrong!
```

---

## ✅ WHAT WEEK 1 DID RIGHT

Despite errors, Week 1 has these correct:
1. ✅ voiceConfig present and unique
2. ✅ All 14 required files exist (plus 2 extra)
3. ✅ Dictation/Shadowing sentences match (8 sentences extracted from read.js)
4. ✅ Mindmap structure correct (6 stems + 36 branches)
5. ✅ Daily Watch has exactly 5 videos
6. ✅ Vocab has collocation field
7. ✅ Ask AI has proper context (no bare questions)
8. ✅ Logic puzzles have context (not bare math drills)
9. ✅ Writing prompts exist (not placeholder)
10. ✅ Grammar exercises exist (not checked in detail)

---

## 🚨 REQUIRED FIXES FOR WEEK 1

### **Fix #1: Replace *word* with **word** (read.js)**
```javascript
// OLD:
content_en: `My *name* is Alex. I am a *student* in a big *school*. My school has many *classrooms* and a *library*. I love reading *books* in the library. Every day, I bring my *backpack*, pencils, and *notebooks* to class. My *teacher*, Ms. Johnson, is very kind. She teaches us English and *Science*.`

// NEW:
content_en: `My **name** is Alex. I am a **student** in a big **school**. My school has many **classrooms** and a **library**. I love reading **books** in the library. Every day, I bring my **backpack**, pencils, and **notebooks** to class. My **teacher**, Ms. Johnson, is very kind. She teaches us English and **Science**.`
```

### **Fix #2: Replace *word* with **word** (explore.js)**
```javascript
// OLD:
content_en: `*Scientists* use special *tools*...`

// NEW:
content_en: `**Scientists** use special **tools**...`
```

### **Fix #3: Fix WordPower Schema (wordpower.js)**
Add missing fields, remove wrong fields:
```javascript
// For EACH word object, add:
id: 1,  // Add sequential ID
pronunciation: "/duː ˈhoʊmwɜːrk/",  // Add IPA
cefr_level: "A2",  // Add CEFR level
collocation: "do your homework",  // Add common usage

// RENAME fields:
example_en → example  // Remove _en suffix
model_sentence_en → model_sentence  // Remove _en suffix

// DELETE fields:
example_vi  // Remove Vietnamese
model_sentence_vi  // Remove Vietnamese
audio_word, audio_def, audio_ex, audio_model  // Script injects these
```

### **Fix #4: Fix Audio Paths (if needed)**
If folders are named `week01/`, rename to `week1/` for consistency with Week 19.

### **Fix #5: Add 1 More Sentence to explore.js**
Current 7 sentences → Need 8-12 sentences. Add 1 sentence about scientists.

---

## 📝 UPDATED PROMPT V23 SECTIONS

Apply these additions to Master Prompt V23:

### **Section II.1 - Read.js & Explore.js (Enhanced)**
```markdown
### read.js & explore.js - Bold Words Syntax (CRITICAL)

⚠️ MANDATORY FORMAT: Use DOUBLE ASTERISKS for bold words:
- ✅ CORRECT: **word** (double asterisk = bold in Markdown)
- ❌ WRONG: *word* (single asterisk = italic, NOT bold)

**Why this matters:**
- UI component searches for `**word**` pattern to enable click-to-define
- Single asterisk `*word*` renders as italic, NOT clickable
- Blueprint requires: "10 bold words bắt buộc" for interactive feature

**Example (CORRECT):**
```javascript
content_en: `My **name** is Alex. I am a **student** in a **school**. I love **books**.`
```

**Example (WRONG - DO NOT USE):**
```javascript
content_en: `My *name* is Alex.`  // ❌ This is italic, not bold!
```

**Validation:** Before submitting, search content_en for `**` - should find exactly 20 matches (10 words × 2 asterisks each).
```

### **Appendix A: Required Fields Per Station (NEW)**
```markdown
## APPENDIX A: REQUIRED FIELDS PER STATION

### wordpower.js (word_power.js) - Phase 1 Format (3 items):
```javascript
{
  id: 1,                           // REQUIRED - Sequential number
  word: "do homework",             // REQUIRED - Collocation phrase
  pronunciation: "/duː ˈhoʊmwɜːrk/",  // REQUIRED - IPA format
  cefr_level: "A2",                // REQUIRED - A1/A2/B1
  definition_en: "...",            // REQUIRED - English definition
  definition_vi: "...",            // REQUIRED - Vietnamese definition
  example: "I do my homework.",    // REQUIRED - English ONLY (no _en suffix)
  model_sentence: "After dinner...",  // REQUIRED - English ONLY (no _en suffix)
  collocation: "do your homework", // REQUIRED - Common usage pattern
  image_url: "/images/week1/..."   // REQUIRED - Image path
}
```

**FORBIDDEN FIELDS (Do NOT include):**
- ❌ example_en, example_vi (use 'example' only - English)
- ❌ model_sentence_en, model_sentence_vi (use 'model_sentence' only - English)
- ❌ audio_word, audio_def, audio_ex, audio_model (script auto-generates)

### vocab.js - Format (10 items):
```javascript
{
  id: 1,                    // REQUIRED
  word: "student",          // REQUIRED
  pronunciation: "/ˈstjuːdənt/",  // REQUIRED
  definition_vi: "Học sinh",  // REQUIRED
  definition_en: "A person who is learning.",  // REQUIRED
  example: "I am a student.",  // REQUIRED (English only)
  collocation: "good student",  // REQUIRED
  image_url: "/images/week1/student.jpg"  // REQUIRED
}
```
```

### **Section 0.6 - Step 4 Validation (Enhanced)**
```markdown
**Step 4: Validate Data Files (ENHANCED)**

Before generating assets, run these validation checks:

1. **File Count:** All 14 files exist for both modes ✅
2. **Schema Match:** All files match week 19 schema EXACTLY ✅
3. **Required Fields:** All fields present (see Appendix A) ✅
4. **BOLD WORDS SYNTAX:** Search for `**word**` pattern in read.js and explore.js
   - Run: `grep -o '\*\*[^*]*\*\*' src/data/weeks/week_XX/read.js | wc -l`
   - Expected: 10 matches (20 asterisks = 10 bold words)
   - If wrong, STOP and fix before proceeding ❌
5. **SENTENCE COUNT:** Count sentences in read.js and explore.js
   - Easy mode: 6-8 sentences required
   - Advanced mode: 8-12 sentences required
   - If wrong, STOP and regenerate content ❌
6. **WORDPOWER SCHEMA:** Check for forbidden fields
   - Should NOT have: example_vi, model_sentence_vi, audio_* fields
   - Should HAVE: id, pronunciation, cefr_level, collocation
   - If wrong, STOP and fix schema ❌

⚠️ CRITICAL: Do NOT proceed to Step 5 (asset generation) if ANY validation fails!
```

---

## 📊 FINAL VERDICT

**Week 1 Status:** ❌ **FAILED VALIDATION**  
**Must Fix:** 5 critical errors before production use  
**Prompt V23 Status:** ⚠️ **NEEDS 4 ENHANCEMENTS** to prevent future errors

**Action Items:**
1. 🔴 **URGENT:** Fix Week 1 data (5 critical errors)
2. 🔴 **URGENT:** Update Prompt V23 (4 gap fixes)
3. 🟡 **MEDIUM:** Re-validate Week 1 after fixes
4. 🟡 **MEDIUM:** Run same audit on Week 1 Easy mode
5. 🟢 **LOW:** Document quiz.js purpose (extra station or legacy?)

---

**Report Generated:** December 28, 2024  
**Next Steps:** Apply fixes to Week 1 data → Update Prompt V23 → Re-validate
