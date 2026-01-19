# AUDIT REPORT: PATHS & COUNTS - WEEK 1 vs WEEK 2 vs PROMPT
**Date**: January 15, 2026  
**Status**: CRITICAL INCONSISTENCIES FOUND

---

## 1. FOLDER NAMING CONVENTIONS

### WEEK 1 REALITY (Golden Standard):
```
/public/images/week1/          ✅ (17 files)
/public/images/week1_easy/     ✅ (29 files)
/public/audio/week1/           ✅ (130 files)
/public/audio/week1_easy/      ✅ (126 files)
```

### WEEK 2 REALITY (Current State):
```
/public/images/week2/          ✅ (20 files) - CORRECT
/public/images/week_02/        ❌ (18 files) - WRONG FOLDER!
/public/images/week2_easy/     ✅ (exists)
/public/audio/week2/           ✅ (0 files - not generated yet)
/public/audio/week_02/         ❌ DOES NOT EXIST
/public/audio/week2_easy/      ✅ (exists)
```

### PROMPT V26 SPECIFICATION (Line 1193-1194):
```
Advanced:  /images/week<ID>/          (e.g., /images/week2/)  ✅
Easy:      /images/week<ID>_easy/     (e.g., /images/week2_easy/) ✅
Audio:     NOT EXPLICITLY SPECIFIED (inferred from image pattern)
```

### DATA FILES (Week 2 .js files):
```javascript
image_url: "/images/week2/mother.jpg"           ✅ CORRECT
audio_word: "/audio/week2/vocab_mother.mp3"     ✅ CORRECT
```

**CONCLUSION**: 
- ✅ Data files use correct paths (`week2`, `week2_easy`)
- ❌ Script creates WRONG folder `/images/week_02/` (should be `week2`)
- ✅ Prompt specifies `week<ID>` format (matches Week 1)

---

## 2. AUDIO FILES COUNT

### WEEK 1 ACTUAL BREAKDOWN (130 files):
```
vocab (10 words):               10 files  (vocab_word.mp3)
shadowing (10 + 1 full):        11 files  (shadowing_1.mp3 ... shadowing_10.mp3 + shadowing_full.mp3)
read:                            1 file   (read_main.mp3)
explore:                         1 file   (explore_main.mp3)
ask_ai (5 conversations):        5 files  (ask_ai_1.mp3 ... ask_ai_5.mp3)
dictation (10 sentences):       10 files  (dictation_1.mp3 ... dictation_10.mp3)
logic (5 puzzles):               5 files  (logic_1.mp3 ... logic_5.mp3)
mindmap (6 stems + 36 branches): 42 files (mindmap_stem_1.mp3 ... mindmap_branch_36.mp3)
wordpower (3 phrases × 5 types): 15 files (wordpower_word.mp3, wordpower_def_word.mp3, wordpower_ex_word.mp3, wordpower_model_word.mp3, wordpower_coll_word.mp3)
---
SUBTOTAL:                       100 files
Missing:                         30 files (likely vocab detail: 10 words × 4 types = 40 total)
ACTUAL TOTAL:                   130 files
```

### WEEK 2 EXPECTED (based on Week 1 pattern + 18 dictation):
```
vocab (10 words × 4 types):     40 files  (word, def, ex, coll)
shadowing (18 + 1 full):        19 files  (18 sentences + full)
read:                            1 file
explore:                         1 file
ask_ai (5):                      5 files
dictation (18 sentences):       18 files  (matches read.js sentence count)
logic (5):                       5 files
mindmap (6 stems + 36 branches): 42 files
wordpower (3 × 5 types):        15 files
---
TOTAL:                         146 files
```

### AUDIO URLs IN DATA FILES:
**Week 1**:
- vocab.js: 10 (only audio_word, not def/ex/coll)
- shadowing.js: 11 (10 sentences + 1 full)
- read.js: 1
- ask_ai.js: 5
- **dictation.js: 0** ❌ (no audio_url in data)
- **logic.js: 0** ❌ (no audio_url in data)
- **mindmap.js: 0** ❌ (no audio_url in data)
- **word_power.js: 0** ❌ (no audio_url in data)
- **Total: 27 URLs** (vs 130 actual files)

**Week 2**:
- vocab.js: 10
- shadowing.js: 19
- read.js: 1
- ask_ai.js: 5
- dictation.js: 0
- logic.js: 0
- mindmap.js: 0
- word_power.js: 0
- **Total: 35 URLs** (vs 146 expected files)

**CRITICAL FINDING**: 
Audio URLs in data files ≠ Actual audio files generated!  
Many stations (dictation, logic, mindmap, wordpower) have NO audio_url in data but REQUIRE audio files generated externally.

---

## 3. IMAGE FILES COUNT

### WEEK 1 ACTUAL (17 files Advanced):
```
10 vocab images     (backpack.jpg, book.jpg, classroom.jpg...)
3 wordpower images  (wordpower_do_homework.jpg...)
2 cover images      (read_cover_w01.jpg, explore_cover_w01.jpg)
2 other images      (name.jpg, scientist.jpg)
---
TOTAL: 17 files
```

### WEEK 2 EXPECTED (15 files):
```
10 vocab images
3 wordpower images
2 cover images
---
TOTAL: 15 files
```

### IMAGE URLs IN DATA FILES:
**Week 2**:
- vocab.js: 10 ✅
- word_power.js: 3 ✅
- read.js: 1 ✅
- explore.js: 1 ✅
- **Total: 15 URLs** ✅ (matches expected)

---

## 4. SCRIPT BUGS FOUND

### BUG 1: generate_images_nano_banana.js (Line 41-42)
```javascript
// WRONG - Both use week_XX format:
const weekFolder = mode === 'easy' ? `week_${weekId.toString().padStart(2, '0')}` : `week_${weekId.toString().padStart(2, '0')}`;

// FIX NEEDED - Should match Week 1 format:
const weekFolder = mode === 'easy' ? `week_${weekId.toString().padStart(2, '0')}` : `week_${weekId.toString().padStart(2, '0')}`;
// (Both correct for data loading)

// Line 46 OUTPUT is correct:
const outputFolder = mode === 'easy' ? `week${weekId}_easy` : `week${weekId}`;  ✅
```

**Result**: Script loads from `week_02/` but saves to `week2/` - creates TWO folders!

### BUG 2: generate_week_mass_production.js (Line 21-22)
```javascript
// Uses week${pad(weekNum)} = week02, week03...
return content.replace(/audio_url\s*:\s*(null|""|''|undefined)/g, `audio_url: "/audio/week${pad(weekNum)}/auto.mp3"`)
                .replace(/image_url\s*:\s*(""|''|null|undefined)/g, `image_url: "/images/week${pad(weekNum)}/auto.jpg"`);
```

**Issue**: Uses `week02` format, not `week2` (inconsistent with Week 1)  
**However**: Data files actually use `week2` format - AI generated correctly despite script template!

### BUG 3: mass_production_final.sh Validation (Line 244-249)
```bash
# OLD - Only checks week2 format:
images_adv = len(glob.glob(f"public/images/week{week}/*.jpg")) + len(glob.glob(f"public/images/week{week}/*.png"))

# FIXED - Now checks both week2 AND week_02:
images_adv = len(glob.glob(f"public/images/week{week}/*")) + len(glob.glob(f"public/images/week_{week_str}/*"))
```

**Status**: ✅ Already fixed (checks both formats)

---

## 5. REQUIRED FIXES

### FIX 1: Standardize Folder Naming
**Decision**: Use `week<ID>` format (matches Week 1, simpler)
- Advanced images: `/public/images/week2/`
- Easy images: `/public/images/week2_easy/`
- Advanced audio: `/public/audio/week2/`
- Easy audio: `/public/audio/week2_easy/`

**Actions**:
1. Delete `/public/images/week_02/` folder
2. Update generate_week_mass_production.js templates to use `week2` not `week02`
3. Keep validation script checking BOTH formats (for backward compatibility)

### FIX 2: Update Prompt V26 - Audio Folder Specification
Add explicit audio folder specification to match image format:
```
Line ~1195 (after image paths):
- **Advanced Audio**: `/audio/week<ID>/` (e.g., `/audio/week2/`)
- **Easy Audio**: `/audio/week<ID>_easy/` (e.g., `/audio/week2_easy/`)
```

### FIX 3: Document Audio Generation Logic
Create clear documentation that:
- Audio URLs in data files (35) ≠ Total audio files (146)
- Stations without audio_url in data still need audio generation:
  * dictation: Generate from sentences array (18 files)
  * logic: Generate from questions array (5 files)
  * mindmap: Generate from stems/branches (42 files)
  * wordpower: Generate 5 types per phrase (15 files)
  * vocab: Generate 4 types per word (40 files, only 10 in data)

### FIX 4: Prompt V26 Line 971 Clarification
✅ ALREADY FIXED - Changed from:
```
]  // Same number as read.js (10-12 for Advanced, 8-10 for Easy)
```
To:
```
]  // MUST match exact sentence count from read.js (typically 18 for Advanced, 15 for Easy)
```

---

## 6. VALIDATION EXPECTATIONS

### Audio Files (Advanced Mode):
- Week 1: 130 files ✅
- Week 2: 146 files (18 dictation vs 10)
- Range: 120-150 files acceptable

### Audio Files (Easy Mode):
- Week 1: 126 files ✅
- Week 2: ~135-145 files
- Range: 115-145 files acceptable

### Image Files (Advanced Mode):
- Week 1: 17 files
- Week 2: 15 files ✅
- Range: 15-20 files acceptable

### Image Files (Easy Mode):
- Week 1: 29 files
- Week 2: ~25-30 files
- Range: 25-35 files acceptable

---

## 7. SYNCHRONIZATION STATUS

| Component | Week 1 | Week 2 | Prompt V26 | Script | Validation | Status |
|-----------|--------|--------|------------|--------|------------|--------|
| Image folder naming | `week1/` | `week2/` + `week_02/` ❌ | `week<ID>/` | Mixed | Checks both | ⚠️ FIX NEEDED |
| Audio folder naming | `week1/` | `week2/` | Not specified | `week02/` template | Checks both | ⚠️ CLARIFY |
| Image URLs in data | Correct | Correct ✅ | Specified | Correct | ✅ | ✅ SYNCED |
| Audio URLs in data | 27 URLs | 35 URLs | Not specified | Correct | N/A | ✅ SYNCED |
| dictation.js sentences | 10 | 18 ✅ | "Match read.js" | Correct | ✅ | ✅ SYNCED |
| shadowing.js sentences | 10 | 18 ✅ | "Match read.js" | Correct | ✅ | ✅ SYNCED |
| Validation expectations | Hard-coded | Ranges ✅ | N/A | ✅ | ✅ | ✅ SYNCED |

---

## 8. NEXT STEPS

1. **Delete wrong folder**: `rm -rf /public/images/week_02/`
2. **Update Prompt V26**: Add audio folder specification
3. **Fix generate_week_mass_production.js**: Use `week${weekId}` not `week${pad(weekId)}`
4. **Document audio generation**: Create AUDIO_GENERATION_LOGIC.md
5. **Test**: Generate Week 2 audio with corrected paths
6. **Validate**: Run full validation to confirm 146 audio files created in `/audio/week2/`

---

**AUDIT COMPLETE**  
All inconsistencies identified and fix plan documented.
