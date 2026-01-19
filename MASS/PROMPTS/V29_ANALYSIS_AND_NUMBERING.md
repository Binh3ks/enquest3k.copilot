# V29 PROMPT ANALYSIS & NUMBERING
**Date**: 18/01/2026
**Purpose**: Đối chiếu V28 vs V29, đánh số thứ tự prompts, và dry run validation

---

## I. V28 STRUCTURE ANALYSIS (5,368 lines)

### Main Sections in V28:

```
Line 1-256:      🔥 CRITICAL CHANGES & GOLDEN STANDARD REFERENCE
Line 257-1154:   🔥 V28 CHANGES (ACK/RECAST format)
Line 1155-1189:  📝 DEVELOPER NOTES
Line 1190-1361:  🚀 MASS PRODUCTION WORKFLOW
Line 1362-1740:  🔍 VALIDATION CHECKLIST
Line 1741-1759:  I. OBJECTIVE
Line 1760-1791:  II. APP ARCHITECTURE OVERVIEW
Line 1792-2012:  III. CEFR LEVEL GUIDELINES (A0/A0++/A1/A2-B1/B2-C1)
Line 2013-3068:  IV. FILE SCHEMAS (14 station files + index.js)
  ├── index.js (voice config, registration)
  ├── read.js (reading passage + questions)
  ├── vocab.js (10 words with objects)
  ├── ask_ai.js (5 question prompts)
  ├── daily_watch.js (5 videos)
  ├── grammar.js (20 exercises)
  ├── dictation.js (sentences from read.js)
  ├── shadowing.js (same as dictation + audio)
  ├── writing.js (keywords + question)
  ├── explore.js (CLIL content)
  ├── logic.js (math word problems)
  ├── word_power.js (collocations)
  ├── word_match.js (10 pairs from vocab)
  ├── mindmap.js (speaking stems)
  └── video_queries.json (queries for videos)
Line 3069-3108:  V. AI TUTOR DATA FILES (week_XX_real.js)
Line 3109-3132:  VI. QUALITY CHECKLIST
Line 3133-3146:  VII. PHASE-LEVEL SUMMARY
Line 3147-3182:  VIII. EXECUTION ORDER
Line 3183-3241:  IX. AUDIO NAMING & TEXT CLEANING
Line 3242-3262:  X. COMMON MISTAKES
Line 3263-3329:  XI. ASSET GENERATION & SAFETY
Line 3330-3641:  XII. AI TUTOR INTEGRATION (missions structure)
Line 3642-3746:  XIII. GAME HUB INTEGRATION
Line 3747-5368:  XIV. AI TUTOR ARCHITECTURE (detailed prompts)
```

### Key Content in V28:

1. **CEFR Guidelines** (Lines 1792-2012):
   - A0/A0++ vocabulary rules (Tier 1 only, max 2 syllables)
   - Grammar patterns (present simple only)
   - Sentence length (5-8 words Easy, 8-14 Advanced)
   - Forbidden patterns (past tense, conditionals)

2. **Station Schemas** (Lines 2013-3068):
   - 14 complete station file schemas with examples
   - Cross-reference rules (vocab → read → dictation)
   - CEFR level requirements per station
   - Asset paths (audio, images)

3. **AI Tutor Structure** (Lines 3330-5368):
   - week_XX_real.js metadata
   - story_missions array (3 missions)
   - objectives structure (canonical_question vs question_variants)
   - Week 1-3 vs Week 4+ differences
   - FreeTalk knowledge structure
   - Hybrid Variant System (Week 4+)
   - Student question invitations
   - ACK/RECAST/QUESTION format (V28 changes)

4. **Mass Production Workflow** (Lines 1190-1361):
   - 9-step pipeline
   - Automated validation scripts
   - Asset generation commands
   - Backup procedures

5. **Common Errors** (Lines 3242-3329):
   - Logic.js key errors
   - Video queries key errors
   - Missing daily_watch registration
   - Cover image URL errors
   - Voice repetition issues

---

## II. V29 MODULE SYSTEM ANALYSIS (5,000 lines across 11 files)

### Current File Structure:

```
MASS_PROMPTS/
├── V29_MASTER_ORCHESTRATOR.txt (500 lines)
├── V29_STATIONS_CORE.txt (300 lines)
├── V29_STATIONS_ADVANCED.txt (600 lines)
├── V29_STATIONS_EASY.txt (500 lines)
├── V29_STATIONS_EXAMPLES.txt (400 lines)
├── V29_AI_TUTOR_CORE.txt (400 lines)
├── V29_AI_TUTOR_SCHEMA_BASIC.txt (300 lines)
├── V29_AI_TUTOR_SCHEMA_VARIANT.txt (400 lines)
├── V29_AI_TUTOR_EXAMPLES.txt (600 lines)
├── V29_WORKFLOW_CORE.txt (300 lines)
├── V29_WORKFLOW_VALIDATION.txt (300 lines)
└── V29_WORKFLOW_TESTING.txt (300 lines)
```

---

## III. CONTENT MAPPING: V28 → V29

| V28 Section | Lines | V29 File | Status |
|-------------|-------|----------|--------|
| **Critical Changes** | 1-256 | ❌ MISSING | Need V29_CRITICAL_CHANGES.txt |
| **V28 Format Updates** | 257-1154 | ✅ WORKFLOW_CORE | Covered in workflow |
| **Developer Notes** | 1155-1189 | ✅ WORKFLOW_CORE | Covered |
| **Mass Production Workflow** | 1190-1361 | ✅ WORKFLOW_CORE | Fully covered |
| **Validation Checklist** | 1362-1740 | ✅ WORKFLOW_VALIDATION | Fully covered |
| **Objective** | 1741-1759 | ✅ MASTER_ORCHESTRATOR | Covered |
| **App Architecture** | 1760-1791 | ✅ STATIONS_CORE | Covered |
| **CEFR Guidelines** | 1792-2012 | ❌ MISSING | Need V29_CEFR_GUIDELINES.txt |
| **Station Schemas** | 2013-3068 | ✅ STATIONS (4 files) | Fully covered |
| **AI Tutor Data** | 3069-3108 | ✅ AI_TUTOR_CORE | Covered |
| **Quality Checklist** | 3109-3132 | ✅ WORKFLOW_VALIDATION | Covered |
| **Phase Summary** | 3133-3146 | ❌ MISSING | Need in CEFR_GUIDELINES |
| **Execution Order** | 3147-3182 | ✅ WORKFLOW_CORE | Covered |
| **Audio Naming** | 3183-3241 | ❌ MISSING | Need V29_ASSET_GENERATION.txt |
| **Common Mistakes** | 3242-3262 | ✅ WORKFLOW_VALIDATION | Covered |
| **Asset Generation** | 3263-3329 | ❌ MISSING | Need V29_ASSET_GENERATION.txt |
| **AI Tutor Integration** | 3330-3641 | ✅ AI_TUTOR (4 files) | Fully covered |
| **Game Hub** | 3642-3746 | ❌ MISSING | Need V29_GAME_HUB.txt |
| **AI Tutor Architecture** | 3747-5368 | ✅ AI_TUTOR (4 files) | Fully covered |

### ⚠️ MISSING CONTENT IN V29 (5 sections):

1. **CRITICAL CHANGES & GOLDEN STANDARD** (256 lines):
   - Always reference previous weeks
   - target_vocab format rules
   - Week 1-3 vs Week 4+ comparison
   - Recent bug fixes documentation

2. **CEFR LEVEL GUIDELINES** (220 lines):
   - A0/A0++ vocabulary rules (Tier 1, max 2 syllables)
   - Grammar patterns (present simple only)
   - Sentence length guidelines
   - Forbidden patterns list
   - Phase-level summary

3. **ASSET GENERATION** (147 lines):
   - Audio naming conventions
   - Text cleaning rules
   - Image generation prompts
   - Asset safety protocol

4. **GAME HUB INTEGRATION** (105 lines):
   - Logic Lab enhancements
   - Game mechanics

5. **COMMON ERROR PATTERNS** (20 lines):
   - Already partially covered in WORKFLOW_VALIDATION
   - Need more specific examples

---

## IV. CORRECTED FILE NUMBERING (Execution Order)

### 🎯 Proper Workflow Order:

**Phase 1: Setup & Planning**
1. `01_MASTER_ORCHESTRATOR.txt` - Read first, decide which files to read
2. `02_CRITICAL_CHANGES.txt` - **NEW** - Read always, recent bugs
3. `03_CEFR_GUIDELINES.txt` - **NEW** - Read for CEFR rules

**Phase 2: AI Tutor Generation**
4. `04_AI_TUTOR_CORE.txt` - Execution guide
5. `05_AI_TUTOR_SCHEMA_BASIC.txt` - Week 1-3 format
6. `06_AI_TUTOR_SCHEMA_VARIANT.txt` - Week 4+ format
7. `07_AI_TUTOR_EXAMPLES.txt` - Reference examples

**Phase 3: Station Generation**
8. `08_STATIONS_CORE.txt` - Execution guide
9. `09_STATIONS_ADVANCED.txt` - 14 Advanced schemas
10. `10_STATIONS_EASY.txt` - 14 Easy schemas
11. `11_STATIONS_EXAMPLES.txt` - Reference examples

**Phase 4: Asset Generation**
12. `12_ASSET_GENERATION.txt` - **NEW** - Audio/image commands

**Phase 5: Workflow & Validation**
13. `13_WORKFLOW_CORE.txt` - 5-phase pipeline
14. `14_WORKFLOW_VALIDATION.txt` - Validation rules
15. `15_WORKFLOW_TESTING.txt` - Testing procedures

**Optional Reference**
16. `16_GAME_HUB.txt` - **NEW** - Game integration (optional)

---

## V. TOKEN EFFICIENCY COMPARISON

### V28 Workflow (Old):
```
Generate Week 5:
1. Read V28 (5,368 lines) ← ALL CONTENT
2. Find relevant sections manually
3. Copy-paste examples
4. Generate AI Tutor (re-read 5,368)
5. Generate 14 stations (re-read 5,368 × 14)
───────────────────────────────
Total: 5,368 + (5,368 × 15) = 80,520 lines read
```

### V29 Workflow (New):
```
Generate Week 5:
1. Read 01_MASTER (500) + 02_CRITICAL (300) = 800
2. Read 04_AI_TUTOR_CORE (400) + 06_SCHEMA_VARIANT (400) = 800
3. Generate AI Tutor (no re-read)
4. Read 08_STATIONS_CORE (300) + 09_ADVANCED (600) = 900
5. Generate 14 stations (reuse context)
6. Read 10_EASY (500)
7. Generate 14 Easy stations (reuse context)
8. Read 13_WORKFLOW_CORE (300) for validation
───────────────────────────────
Total: 800 + 800 + 900 + 500 + 300 = 3,300 lines read
```

**Savings**: 80,520 → 3,300 = **95.9% reduction!**

---

## VI. MISSING FILES TO CREATE

### File 1: `02_CRITICAL_CHANGES.txt` (300 lines)
**Content**:
- Always reference Week 1-4 before coding
- target_vocab MUST be objects (not strings)
- Week 1-3 vs Week 4+ schema differences
- Recent bug fixes (Week 4 bugs from Jan 16-17)
- Common error patterns from V28 lines 3242-3262

### File 2: `03_CEFR_GUIDELINES.txt` (400 lines)
**Content**:
- A0/A0++ vocabulary rules (from V28 lines 1792-2012)
- Grammar patterns allowed/forbidden
- Sentence length per phase
- Question patterns (What is/Where is/Is this/Can I/Do you)
- Phase-level summary (Phase 1-5)

### File 3: `12_ASSET_GENERATION.txt` (300 lines)
**Content**:
- Audio naming conventions (from V28 lines 3183-3241)
- Text cleaning rules
- Image generation commands
- Voice config strategy (rotation)
- Asset paths (Advanced vs Easy)

### File 4: `16_GAME_HUB.txt` (200 lines)
**Content**:
- Logic Lab enhancement (from V28 lines 3642-3746)
- Game mechanics
- Math word problems format

**Total new content**: 1,200 lines

---

## VII. FINAL V29 SYSTEM (16 files, ~6,200 lines)

```
MASS_PROMPTS/
├── 01_MASTER_ORCHESTRATOR.txt (500) ✅
├── 02_CRITICAL_CHANGES.txt (300) ⏳ TO CREATE
├── 03_CEFR_GUIDELINES.txt (400) ⏳ TO CREATE
├── 04_AI_TUTOR_CORE.txt (400) ✅
├── 05_AI_TUTOR_SCHEMA_BASIC.txt (300) ✅
├── 06_AI_TUTOR_SCHEMA_VARIANT.txt (400) ✅
├── 07_AI_TUTOR_EXAMPLES.txt (600) ✅
├── 08_STATIONS_CORE.txt (300) ✅
├── 09_STATIONS_ADVANCED.txt (600) ✅
├── 10_STATIONS_EASY.txt (500) ✅
├── 11_STATIONS_EXAMPLES.txt (400) ✅
├── 12_ASSET_GENERATION.txt (300) ⏳ TO CREATE
├── 13_WORKFLOW_CORE.txt (300) ✅
├── 14_WORKFLOW_VALIDATION.txt (300) ✅
├── 15_WORKFLOW_TESTING.txt (300) ✅
└── 16_GAME_HUB.txt (200) ⏳ TO CREATE
───────────────────────────────────────
Total: 6,200 lines (vs V28: 5,368)
```

**Why more lines?**
- V28: 1 monolithic file (hard to navigate)
- V29: 16 modular files (easier to find content)
- V29: More examples and validation steps
- V29: Explicit execution order

**Token efficiency**: Still 95% savings despite more total lines!

---

## VIII. DRY RUN TEST PLAN

### Test Objective:
Verify V29 prompts can generate Week 4 content identical to actual Week 4

### Test Setup:
```bash
# 1. Backup actual Week 4
cp -r src/data/weeks/week_04_real.js /tmp/week_04_backup.js
cp -r src/data/weeks/week_04/ /tmp/week_04_backup/

# 2. Delete Week 4 content
rm src/data/weeks/week_04_real.js
rm -rf src/data/weeks/week_04/

# 3. Create empty Week 4 folder
mkdir src/data/weeks/week_04
```

### Dry Run Execution:

**Step 1: AI Tutor Generation (Use V29 Prompts)**
```
Read files:
- 01_MASTER_ORCHESTRATOR.txt
- 02_CRITICAL_CHANGES.txt (when created)
- 04_AI_TUTOR_CORE.txt
- 06_AI_TUTOR_SCHEMA_VARIANT.txt (Week 4 uses variants)
- 07_AI_TUTOR_EXAMPLES.txt (optional reference)

Generate: week_04_real.js
Expected: 1,099 lines with question_variants
```

**Step 2: Advanced Stations Generation**
```
Read files:
- 08_STATIONS_CORE.txt
- 09_STATIONS_ADVANCED.txt
- 11_STATIONS_EXAMPLES.txt (optional)

Generate: 14 files in week_04/
- vocab.js (10 words as objects)
- read.js (200 words, bolded vocab)
- grammar.js (20 exercises)
- ... (11 more files)
```

**Step 3: Easy Stations Generation**
```
Read files:
- 10_STATIONS_EASY.txt

Generate: Same 14 files (Easy versions)
Expected: Simpler content, 60% different vocab
```

### Validation:

```bash
# 1. Compare AI Tutor structure
diff /tmp/week_04_backup.js src/data/weeks/week_04_real.js

# 2. Compare station files
for file in vocab read grammar; do
  diff /tmp/week_04_backup/$file.js src/data/weeks/week_04/$file.js
done

# 3. Check key features
node -e "
const w = require('./src/data/weeks/week_04_real.js').default;
console.log('Missions:', w.story_missions.length); // Should be 3
console.log('Objectives M1:', w.story_missions[0].objectives.length); // Should be 9-12
console.log('Variants:', w.story_missions[0].objectives[0].question_variants.length); // Should be 3
console.log('target_vocab type:', typeof w.target_vocab[0]); // Should be 'object'
"

# 4. Import test
node -e "
const v = require('./src/data/weeks/week_04/vocab.js').default;
console.log('Vocab count:', v.vocab.length); // Should be 10
console.log('Has definition_vi:', v.vocab[0].definition_vi ? 'YES' : 'NO'); // Should be YES
"
```

### Success Criteria:

- ✅ week_04_real.js has 3 missions
- ✅ Objectives have question_variants (3 each)
- ✅ target_vocab are objects (not strings)
- ✅ vocab.js has 10 words with all fields
- ✅ read.js bolds vocab words
- ✅ dictation.js matches read.js sentences
- ✅ All 29 files import without errors

---

## IX. NEXT ACTIONS

1. ✅ **Create missing 4 files**:
   - 02_CRITICAL_CHANGES.txt
   - 03_CEFR_GUIDELINES.txt
   - 12_ASSET_GENERATION.txt
   - 16_GAME_HUB.txt

2. ✅ **Rename existing files** with numbers:
   - V29_MASTER_ORCHESTRATOR.txt → 01_MASTER_ORCHESTRATOR.txt
   - V29_AI_TUTOR_CORE.txt → 04_AI_TUTOR_CORE.txt
   - ... (all 12 files)

3. ✅ **Dry run test**:
   - Generate Week 4 using V29 prompts
   - Compare with actual Week 4
   - Validate all 29 files

4. ✅ **Update documentation**:
   - Update MASS_PRODUCTION_CONTEXT.md
   - Update README in MASS_PROMPTS/
   - Create usage guide

---

## X. CONCLUSION

**V28 Analysis**:
- ✅ 5,368 lines thoroughly analyzed
- ✅ All sections mapped to V29
- ✅ Missing content identified (1,200 lines)

**V29 Status**:
- ✅ 12/16 files complete (75%)
- ⏳ 4 files to create (25%)
- ✅ Token efficiency: 95.9% reduction
- ⏳ Dry run test pending

**Next Step**: Create 4 missing files, then dry run test with Week 4 generation.

---

**END OF ANALYSIS**
