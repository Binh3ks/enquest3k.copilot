# WEEK 15-18 COMPLETE AUDIT REPORT
**Date**: March 25, 2025  
**Scope**: All 35 files per week (1 AI Tutor + 17 Advanced + 17 Easy)  
**Tool**: validate_week_complete.js  

---

## EXECUTIVE SUMMARY

Validated **4 gold standard weeks** (W15-18) to establish baseline for mass production of W19-156. Found **critical inconsistencies** that MUST be fixed before using as template.

### Completion Status

| Week | Files | Completion | Status | Critical Issues |
|------|-------|------------|--------|----------------|
| W15  | 32/35 | 91.4% | ⚠️  INCOMPLETE | Missing singapore_math (OK for W15), Easy video_queries.json |
| W16  | 35/35 | 100% | ⚠️  SCHEMA ISSUE | AI Tutor uses `weekId` not `week_id` |
| W17  | 34/35 | 97.1% | 🔴 HIGH PRIORITY | AI Tutor format different, Easy video_queries.json missing |
| W18  | 34/35 | 97.1% | 🔴 HIGH PRIORITY | AI Tutor format different, Easy video_queries.json missing |

**Overall**: NO week is 100% production-ready. All have schema or consistency issues.

---

## ISSUE #1: INCONSISTENT AI TUTOR SCHEMA (CRITICAL 🔴)

### Finding

AI Tutor files use **2 different formats**:

#### Format A (W15 - Complex):
```javascript
const week15RealData = {
  week_id: 15,          // ✅ snake_case
  phase: 1,
  block: "A",
  unit: 1,
  week_number: 15,
  title: "Week 15: The Busy Park",
  // ... full metadata
  target_vocab: [/* 10 words with full details */],
  story_missions: [
    // 3 missions with 90 objectives total
    // Each objective has 3 variants = 270 questions
  ]
}
```
- **Lines**: 711  
- **Size**: 34.4 KB  
- **Story Missions**: Expected 3 (has all structure)  
- **Questions**: Has `choices:` field (3 occurrences)  

#### Format B (W16-18 - Simplified):
```javascript
const week17RealData = {
  weekId: 17,          // ❌ camelCase (inconsistent!)
  week_number: 17,
  title: "Weather & Clothes",
  // ... minimal metadata
  target_vocab: [/* 13 words */],
  story_missions: [
    // 1 long mission with conversation flow
    // freetalk scenarios embedded
  ]
}
```
- **Lines**: 469-535  
- **Size**: 30-33 KB  
- **Story Missions**: 1 mission with conversation flow (NOT 3 traditional missions)  
- **Questions**: W17 has 1 `choices:`, W18 has 0  

### Impact

❌ **Cannot use W15-18 as gold standard templates without picking ONE format**

Options:
1. **Use Format A (W15)**: Complex, 3 missions, 270 questions - matches MASS_PRODUCTION_COMPLETE_SCOPE.md spec
2. **Use Format B (W16-18)**: Simpler, 1 mission, conversation flow - lighter but less structured

### Recommendation

**Decision needed before proceeding**:
- If Format A is correct → W16-18 need to be **regenerated** with 3 missions
- If Format B is correct → Update MASS_PRODUCTION_COMPLETE_SCOPE.md spec

**Blocking**: Cannot start mass production until format standardized.

---

## ISSUE #2: NAMING CONVENTION INCONSISTENCY (HIGH 🟠)

### Finding

Field name `week_id` vs `weekId`:

| Week | Field Name | Convention | Lines |
|------|-----------|------------|-------|
| W15  | `week_id: 15` | snake_case | 711 |
| W16  | `weekId: 16` | camelCase | 535 |
| W17  | `weekId: 17` | camelCase | 469 |
| W18  | `weekId: 18` | camelCase | 473 |

### Impact

- AI Tutor code expects `week_id` (based on validator logic)
- 3 out of 4 weeks use `weekId` (camelCase)
- **Validation script failed** on W16-18 because looking for `week_id:`

### Solution

**Standardize to `week_id` (snake_case)**:
- Matches other fields: `story_missions`, `target_vocab`, `week_number`
- More consistent with database conventions
- Update W16-18 AI Tutor files:
  ```diff
  - weekId: 16,
  + week_id: 16,
  ```

**Time**: 2 minutes (3 files, 1 line each)

---

## ISSUE #3: MISSING VIDEO_QUERIES.JSON IN EASY MODE (MEDIUM 🟡)

### Finding

| Week | Advanced Has File? | Easy Has File? | Status |
|------|-------------------|----------------|--------|
| W15  | ✅ Yes | ❌ No | Inconsistent |
| W16  | ✅ Yes | ✅ Yes | Correct |
| W17  | ✅ Yes | ❌ No | Inconsistent |
| W18  | ✅ Yes | ❌ No | Inconsistent |

### Analysis

**Purpose of video_queries.json**:
- Metadata for video search queries
- Used by `generate_video_queries.js`
- Contains week theme, grammar focus, video hints

**Why Easy mode might not need it**:
- Videos are identical between Advanced and Easy modes
- daily_watch.js is byte-identical across both modes
- File is metadata-only (not runtime data)

### Impact

- Validation script expects 35 files (including video_queries.json in Easy)
- 3 out of 4 weeks missing this file in Easy mode
- **NOT blocking** - videos work fine without it

### Solution Options

**Option A (Recommended)**: Exclude video_queries.json from Easy mode validator
- Update validator to expect 34 files in Easy (not 35)
- Document: "Easy mode uses Advanced videos, no separate queries needed"

**Option B**: Copy file from Advanced to Easy
- `cp weeks/week_XX/video_queries.json weeks_easy/week_XX/`
- Pro: Consistent file count
- Con: Redundant data, maintenance overhead

**Decision**: Go with Option A (exclude from Easy validation)

---

## ISSUE #4: MISSING SINGAPORE_MATH.JS IN W15 (LOW 🟢)

### Finding

| Week | Advanced | Easy | Expected? |
|------|----------|------|-----------|
| W15  | ❌ No | ❌ No | No (W15 < W16) |
| W16  | ✅ Yes | ✅ Yes | Yes |
| W17  | ✅ Yes | ✅ Yes | Yes |
| W18  | ✅ Yes | ✅ Yes | Yes |

### Analysis

**Singapore Math** starts from **Week 16** per design:
- W1-15: logic.js (general logic puzzles)
- W16+: logic.js + singapore_math.js (bar model problems)

W15 has `logic.js` instead, which is correct.

### Impact

✅ **No issue** - This is by design. Validator already handles this correctly.

---

## ISSUE #5: AI TUTOR FILE SIZE VARIANCE (MEDIUM 🟡)

### Finding

| Week | Lines | Size | story_missions | choices field | Assessment |
|------|-------|------|----------------|---------------|------------|
| W15  | 711   | 34KB | 1 occurrence | 3 found | ✅ Full format |
| W16  | 535   | 33KB | 1 occurrence | 3 found | ⚠️  Compressed? |
| W17  | 469   | 30KB | 1 occurrence | 1 found | 🔴 Simplified format |
| W18  | 473   | 30KB | 1 occurrence | 0 found | 🔴 Simplified format |

### Analysis

**Expected structure** (per MASS_PRODUCTION_COMPLETE_SCOPE.md):
- 3 story missions (30 objectives each = 90 total)
- Each objective has 3 variants = 270 questions
- Expected ~800-1000 lines

**Actual structure**:
- W15: Appears to have full structure (711 lines acceptable if condensed)
- W16: 535 lines (possibly compressed but has structure)
- W17-18: 469-473 lines (clearly simplified format)

### Questions to Investigate

1. Does W15 actually have 3 missions × 30 objectives × 3 variants?
2. Or does W15 also use simplified format?
3. Which format should be the standard?

### Action Required

**Manual review**:
```bash
# Count objectives in each file
grep -c "objective_id:" src/data/weeks/week_15_real.js
grep -c "objective_id:" src/data/weeks/week_16_real.js
grep -c "objective_id:" src/data/weeks/week_17_real.js
grep -c "objective_id:" src/data/weeks/week_18_real.js

# Check mission structure
grep "mission_id:" src/data/weeks/week_15_real.js | head -5
```

---

## STATION FILES VALIDATION SUMMARY

### Advanced Mode Stations (weeks/week_XX/)

| Station File | W15 | W16 | W17 | W18 | Notes |
|--------------|-----|-----|-----|-----|-------|
| daily_watch.js | ✅ 10L | ✅ 10L | ✅ 10L | ✅ 10L | All identical format |
| read.js | ✅ 45L | ✅ 13L | ✅ 13L | ✅ 31L | Size varies |
| dictation.js | ✅ 117L | ✅ 35L | ✅ 29L | ✅ 34L | W15 much larger |
| shadowing.js | ✅ 118L | ✅ 36L | ✅ 31L | ✅ 36L | W15 much larger |
| vocab.js | ✅ 155L | ✅ 187L | ✅ 187L | ✅ 187L | Consistent W16+ |
| grammar.js | ✅ 35L | ✅ 35L | ✅ 35L | ✅ 35L | Perfect consistency |
| games.js | ✅ 153L | ✅ 178L | ✅ 190L | ✅ 190L | Growing trend |
| word_match.js | ✅ 15L | ✅ 20L | ✅ 18L | ✅ 18L | Stable |
| word_power.js | ✅ 50L | ✅ 107L | ✅ 107L | ✅ 107L | W16+ larger |
| writing.js | ✅ 11L | ✅ 11L | ✅ 11L | ✅ 12L | Consistent |
| ask_ai.js | ✅ 45L | ✅ 45L | ✅ 45L | ✅ 45L | Perfect consistency |
| explore.js | ✅ 55L | ✅ 78L | ✅ 62L | ✅ 48L | Variable |
| mindmap.js | ✅ 63L | ✅ 63L | ✅ 63L | ✅ 63L | Perfect consistency |
| logic.js | ✅ 61L | ✅ 68L | ✅ 68L | ✅ 68L | W16+ consistent |
| singapore_math.js | N/A | ✅ 70L | ✅ 70L | ✅ 70L | W16+ perfect |
| video_queries.json | ✅ 59L | ✅ 59L | ✅ 39L | ✅ 39L | W17+ smaller |
| index.js | ✅ 50L | ✅ 54L | ✅ 54L | ✅ 54L | Stable |

**Key Observations**:
- ✅ **Perfect consistency**: grammar.js, ask_ai.js, mindmap.js, singapore_math.js
- ⚠️  **W15 outliers**: dictation (117L vs ~30L), shadowing (118L vs ~35L), read (45L vs ~15L)
- ✅ **W16+ stable**: vocab, word_power, logic consistent across W16-18

**Conclusion**: W15 uses different format for some stations. **W16-18 more consistent** as gold standard.

### Easy Mode Stations (weeks_easy/week_XX/)

| Station File | W15 | W16 | W17 | W18 | Consistency |
|--------------|-----|-----|-----|-----|-------------|
| daily_watch.js | ✅ 10L | ✅ 10L | ✅ 10L | ✅ 10L | ✅ Perfect |
| read.js | ✅ 38L | ✅ 13L | ✅ 13L | ✅ 31L | ⚠️  Variable |
| dictation.js | ✅ 92L | ✅ 29L | ✅ 25L | ✅ 29L | ⚠️  W15 outlier |
| shadowing.js | ✅ 93L | ✅ 30L | ✅ 26L | ✅ 29L | ⚠️  W15 outlier |
| vocab.js | ✅ 115L | ✅ 148L | ✅ 148L | ✅ 148L | ✅ W16+ consistent |
| grammar.js | ✅ 35L | ✅ 178L | ✅ 181L | ✅ 60L | 🔴 Highly variable! |
| games.js | ✅ 153L | ✅ 163L | ✅ 163L | ✅ 189L | ✅ Stable |
| word_match.js | ✅ 15L | ✅ 18L | ✅ 18L | ✅ 16L | ✅ Stable |
| word_power.js | ✅ 50L | ✅ 107L | ✅ 107L | ✅ 107L | ✅ W16+ consistent |
| writing.js | ✅ 11L | ✅ 11L | ✅ 11L | ✅ 12L | ✅ Perfect |
| ask_ai.js | ✅ 45L | ✅ 45L | ✅ 45L | ✅ 46L | ✅ Near perfect |
| explore.js | ✅ 48L | ✅ 74L | ✅ 59L | ✅ 44L | ⚠️  Variable |
| mindmap.js | ✅ 63L | ✅ 63L | ✅ 63L | ✅ 63L | ✅ Perfect |
| logic.js | ✅ 61L | ✅ 68L | ✅ 68L | ✅ 68L | ✅ W16+ perfect |
| singapore_math.js | N/A | ✅ 70L | ✅ 70L | ✅ 70L | ✅ Perfect |
| video_queries.json | ❌ No | ✅ 59L | ❌ No | ❌ No | 🔴 Missing 3/4 |
| index.js | ✅ 51L | ✅ 55L | ✅ 55L | ✅ 54L | ✅ Stable |

**Critical Finding**: 
- 🔴 **grammar.js** in Easy mode is **highly inconsistent**: W15=35L, W16=178L, W17=181L, W18=60L
- This suggests different content approaches or bugs

---

## PRIORITY ACTION ITEMS

### HIGH PRIORITY (BLOCKING MASS PRODUCTION)

#### 1. Standardize AI Tutor Format ⏰ 1 day
**Decision needed**:
- [ ] Review W15 AI Tutor structure (check if it has 90 objectives)
- [ ] Compare with W16-18 simplified format
- [ ] Choose ONE format: Complex (W15) or Simple (W16-18)
- [ ] Update MASS_PRODUCTION_COMPLETE_SCOPE.md with chosen format
- [ ] If Complex: Regenerate W16-18 AI Tutor files
- [ ] If Simple: Update documentation to match W16-18 pattern

#### 2. Fix Naming Convention ⏰ 5 minutes
**Immediate fix**:
```bash
# Replace weekId with week_id in W16-18
sed -i '' 's/weekId:/week_id:/' src/data/weeks/week_16_real.js
sed -i '' 's/weekId:/week_id:/' src/data/weeks/week_17_real.js
sed -i '' 's/weekId:/week_id:/' src/data/weeks/week_18_real.js
```

#### 3. Investigate Grammar.js Variance in Easy Mode ⏰ 2 hours
**Task**:
- [ ] Read all 4 grammar.js files in Easy mode
- [ ] Identify why W16-17 are 178L but W15=35L and W18=60L
- [ ] Check if content is correct or one version is incomplete
- [ ] Standardize format across all 4 weeks

### MEDIUM PRIORITY (BEFORE W19 GENERATION)

#### 4. Update Validator Script ⏰ 30 minutes
**Changes**:
- [ ] Accept both `week_id` and `weekId` (search for either)
- [ ] Update AI Tutor line count threshold: 470-711 lines acceptable (was 500-1000)
- [ ] Exclude video_queries.json from Easy mode check (expect 16/17 files, not 17/17)
- [ ] Add specific validation for grammar.js size variance

#### 5. Create Station Comparison Tool ⏰ 1 hour
**New script**: `tools/compare_stations.js`
```javascript
// Compare same station across W15-18
// Usage: node tools/compare_stations.js grammar.js
// Output: Line counts, schema differences, content variations
```

### LOW PRIORITY (DOCUMENTATION)

#### 6. Document W15 vs W16-18 Differences ⏰ 30 minutes
**Create**: `W15_VS_W16-18_SCHEMA_DIFFERENCES.md`
- AI Tutor format differences
- Station file size variations
- Rationale for changes (if known)

#### 7. Update MASS_PRODUCTION_COMPLETE_SCOPE.md ⏰ 15 minutes
**Changes**:
- Update AI Tutor expected lines: 470-711 (not 800-1000)
- Clarify 1 mission vs 3 missions format
- Note video_queries.json not needed in Easy mode

---

## VALIDATION SCRIPT IMPROVEMENTS NEEDED

### Current Issues

1. **Too strict on line count**: Flags 470-535 lines as issue when actual range is 470-711
2. **Missing field detection**: Looks for `week_id:` but doesn't find `weekId:`
3. **video_queries.json expectation**: Should not expect in Easy mode
4. **No content validation**: Only checks file existence, not schema compliance

### Recommended Enhancements

```javascript
// Check both naming conventions
const hasWeekId = content.match(/\s+week_?[Ii]d:\s*\d+/);

// Update line count thresholds
if (lines < 450) {  // Changed from 500
  issues.push(`AI Tutor: Only ${lines} lines (expected 450-750)`);
}

// Skip video_queries.json in Easy mode
if (file === 'video_queries.json' && dirType === 'easy') {
  continue; // Optional file in Easy mode
}

// Warn on high variance (not error)
if (variance > 100 && file === 'grammar.js') {
  warnings.push(`${file} has high variance across weeks`);
}
```

---

## GOLD STANDARD RECOMMENDATION

Based on consistency analysis:

### ✅ Use W16-18 as Primary Gold Standard

**Rationale**:
1. **More consistent schemas** across stations (vocab, word_power, logic all identical)
2. **Simpler AI Tutor format** (easier to automate generation)
3. **3 out of 4 weeks** use this pattern (W15 is outlier)
4. **singapore_math.js** included (needed for W16+)

### ⚠️ Use W15 as Reference Only

**When to use W15**:
- For weeks W1-15 (if they need the older dictation/shadowing format)
- As backup for content ideas

**Caution**:
- Has different dictation/shadowing structure (117 lines vs ~30 lines)
- AI Tutor line count higher (711 vs ~500)

---

## MASS PRODUCTION BLOCKERS

### 🔴 CRITICAL BLOCKERS (Cannot start W19 until resolved)

1. **AI Tutor format decision**: Need to choose Complex or Simple format
2. **Naming convention fix**: Must standardize week_id across all files
3. **Grammar.js investigation**: Need to understand why W15/W18 differ from W16/W17

**Estimated resolution time**: 1-2 days

### 🟡 RECOMMENDED BEFORE SCALING

4. **Update validator script**: Accept variance, proper thresholds
5. **Document schema differences**: Clear spec for generators
6. **Test W19 generation**: Validate one week fully before batch

**Estimated resolution time**: 1 day

---

## NEXT IMMEDIATE STEPS

### Today (Priority 1):

1. ✅ **Fix naming convention** (5 min):
   ```bash
   sed -i '' 's/weekId:/week_id:/' src/data/weeks/week_{16,17,18}_real.js
   ```

2. ⏰ **Investigate AI Tutor formats** (2 hours):
   ```bash
   # Count structure elements
   grep -n "mission_id:" src/data/weeks/week_15_real.js
   grep -n "objective_id:" src/data/weeks/week_15_real.js | wc -l
   grep -n "objective_id:" src/data/weeks/week_16_real.js | wc -l
   grep -n "objective_id:" src/data/weeks/week_17_real.js | wc -l
   grep -n "objective_id:" src/data/weeks/week_18_real.js | wc -l
   ```

3. ⏰ **Compare grammar.js files** (1 hour):
   ```bash
   diff -u src/data/weeks_easy/week_16/grammar.js src/data/weeks_easy/week_18/grammar.js
   ```

### Tomorrow (Priority 2):

4. ⏰ **Update validator script** with findings
5. ⏰ **Re-run complete validation** on W15-18
6. ⏰ **Choose AI Tutor format standard**
7. ⏰ **Update MASS_PRODUCTION_COMPLETE_SCOPE.md**

### Day 3 (Priority 3):

8. ⏰ **Test automation with chosen format** on W19
9. ⏰ **Document final gold standard**
10. ⏰ **Begin W19-20 generation**

---

## CONCLUSION

**W15-18 are NOT production-ready gold standards** in current state. Found:
- ❌ 2 AI Tutor format types (inconsistent)
- ❌ Naming convention mix (week_id vs weekId)
- ❌ 3/4 weeks missing Easy mode video_queries.json
- ❌ grammar.js size varies 35L to 181L inexplicably

**Must resolve format decisions and fix inconsistencies before mass-producing W19-156.**

**Estimated time to production-ready**: 2-3 days of cleanup + standardization.

---

## APPENDIX: VALIDATION COMMAND OUTPUTS

### W15 Validation
```
Total Files: 32/35
Completion: 91.4%
Issues: Missing singapore_math (expected for W15), Easy video_queries.json missing
```

### W16 Validation
```
Total Files: 35/35
Completion: 100.0%
Issues: AI Tutor missing week_id field (has weekId instead)
```

### W17 Validation
```
Total Files: 34/35
Completion: 97.1%
Issues: AI Tutor weekId + only 470 lines + Easy video_queries.json missing
```

### W18 Validation
```
Total Files: 34/35
Completion: 97.1%
Issues: AI Tutor weekId + only 474 lines + Easy video_queries.json missing
```

---

**End of Audit Report**  
**Next**: Fix critical blockers → Standardize format → Begin W19 generation
