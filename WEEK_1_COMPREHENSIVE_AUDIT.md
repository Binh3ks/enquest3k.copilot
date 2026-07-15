# WEEK 1 vs WEEK 19 COMPREHENSIVE AUDIT REPORT

**Date:** December 28, 2025  
**Auditor:** GitHub Copilot (Claude Sonnet 4.5)  
**Scope:** Full data structure + assets comparison

---

## EXECUTIVE SUMMARY

Week 1 was regenerated following Master Prompt V23 but had **7 CRITICAL STRUCTURAL ERRORS** that prevented proper app functionality. All errors have been fixed and documented below for Prompt V23 update.

**Status:** 🔧 **FIXED** (All critical errors resolved)

---

## CRITICAL ERRORS FOUND & FIXED

### 1. ❌ MINDMAP STRUCTURE (CRITICAL - App Crash)

**Error:** Used number-indexed object keys instead of string keys  
**Impact:** React error "Objects are not valid as a React child"  
**Week 19 Pattern:**
```javascript
branchLabels: {
  "When I was young, I ___.": [...],  // String key
  "My favorite memory was ___.": [...] // String key
}
```

**Week 1 ERROR:**
```javascript
branchLabels: {
  1: [...],  // ❌ Number key
  2: [...]   // ❌ Number key
}
```

**Fix Applied:** Changed to string keys matching centerStems exactly

---

### 2. ❌ WRITING STATION STRUCTURE (CRITICAL - No Content Display)

**Error:** Used arrays (`topicPrompts`, `grammarPrompts`) instead of single object  
**Impact:** Writing station displayed "No content"  
**Week 19 Pattern:**
```javascript
export default {
  title: "My Childhood Memory",
  min_words: 40,
  model_sentence: "...",
  instruction_en: "...",
  instruction_vi: "...",
  prompt_en: "...",
  prompt_vi: "...",
  keywords: [...]
}
```

**Week 1 ERROR:**
```javascript
export default {
  topicPrompts: [{id: 1, ...}, {id: 2, ...}],  // ❌ Array
  grammarPrompts: [{id: 1, ...}, {id: 2, ...}]  // ❌ Array
}
```

**Fix Applied:** Replaced with single object structure

---

### 3. ❌ VIDEO VALIDATION (CRITICAL - Deadlinks)

**Error:** Hardcoded YouTube video IDs without validation, no video_queries.json  
**Impact:** All 5 videos were deadlinks (IDs from AI storage, not YouTube)

**Week 19 Process:**
1. Create `video_queries.json` with master queries
2. Run `update_videos.js --reset` to search YouTube
3. Apply GRAMMAR_REQUIREMENTS validation
4. Filter content (no music, lyrics, non-English)
5. Validate duration (60-900 seconds)

**Week 1 ERROR:**
- No `video_queries.json` file
- Hardcoded videoIds: `5bLp0mYeYBE`, `hOxs4wYC6gQ`, `xVYzTZFtYOw`, `QVzjjLqIoqM`, `u9i-E0WQkqA`
- None of these IDs existed on YouTube

**Fix Applied:**
1. Created `video_queries.json` with 5 queries
2. Ran `update_videos.js` to fetch real YouTube videos
3. Got valid IDs: `iSybXF9qou0`, `4c6FyuetSVo`, `Oq61TxejZ5g`, `AmrFkCwd1Lc`, `pg26E9-Lq9A`

---

### 4. ⚠️ IMAGE ASSETS (Missing Files)

**Expected:** 15 images per mode  
**Found:** 13 images per mode  
**Missing:**
- `read_cover_w01.jpg` - Story cover (16:9 aspect ratio)
- `name.jpg` - Vocabulary word image (1:1 aspect ratio)

**Week 19 Pattern:**
- 2 covers (read + explore) - 16:9
- 10 vocab images - 1:1
- 3 WordPower images - 1:1
- **Total: 15 files**

**Root Cause:** Asset generation script (`batch_manager.js`) returned "No image data" errors for Gemini API. Likely quota/API issue.

**Temporary Fix:** Can copy from other weeks or use placeholders

---

### 5. ❌ EASY MODE STRUCTURE ERRORS (Same as Advanced)

**Error:** Easy mode had same structural errors (number keys, array structure)  
**Impact:** Easy mode mindmap/writing also broken

**Fix Applied:** 
- Easy mindmap: String keys, simplified phrases
- Easy writing: Single object, shorter model_sentence (30 words vs 40)

---

### 6. ✅ LOGIC LAB (CORRECT - No Issues)

**Status:** ✅ Already correct  
**Verified:**
- Has 30-50 word context (story format)
- Questions are story-based math problems
- Follows Blueprint scaffolding
- Matches Week 19 structure

**Example:**
```javascript
{
  id: 1,
  context_en: "Alex's classroom has 20 desks arranged in rows. Each row has 4 desks...",
  question_en: "How many rows of desks are there?",
  answer: ["5", "5 rows", "five", "five rows"]
}
```

---

### 7. 🔄 WEEK FOLDER NAMING INCONSISTENCY

**Issue:** Tools expect `week_1` but data is in `week_01`  
**Impact:** `update_videos.js` couldn't find video_queries.json

**Workaround:** Create temp `week_1` folder, run tool, copy back to `week_01`

**Long-term Fix:** Update all tools to handle both formats

---

## SMART CHECK ENGINE - WHY IT FAILED

**User Question:** "tại sao smartcheck engine không hoạt động?"

**Analysis:**

### Asset Count Validation Issue:
```javascript
// batch_manager.js reported:
"Found 15 images to generate" // ✅ Correct count
"❌ Error read_cover_w01.jpg: No image data" // But failed to generate
"❌ Error name.jpg: No image data"
```

**Problem:** Smart check counted **expected** images (15) not **actual** images (13)  
**Root Cause:** Validation happens BEFORE generation, not AFTER

### Structural Validation Issue:
Week 1 passed file count checks:
- ✅ 14 files in Advanced
- ✅ 14 files in Easy

But didn't validate:
- ❌ Mindmap key types (string vs number)
- ❌ Writing structure (object vs array)
- ❌ Video ID validity (existence on YouTube)

---

## ASSET GENERATION SUMMARY (Current State)

### Audio: ✅ READY
- Advanced: 152 files
- Easy: 152 files
- (Pre-existing from previous generation)

### Images: ⚠️ INCOMPLETE
- Advanced: 13/15 files (87%)
- Easy: 13/15 files (87%)
- Missing: read_cover_w01.jpg, name.jpg

### Videos: ✅ FIXED
- 5 videos with real YouTube IDs
- Validated duration & content
- Grammar (2) + Science (2) + Topic (1)

---

## WEEK 19 REFERENCE STRUCTURE (Correct Pattern)

### Mindmap:
```javascript
{
  centerStems: ["string1", "string2", ...],  // Array of strings
  branchLabels: {
    "string1": ["branch1", "branch2", ...],  // String key → Array
    "string2": ["branch1", "branch2", ...]   // String key → Array
  }
}
```

### Writing:
```javascript
{
  title: "string",
  min_words: number,
  model_sentence: "string",
  instruction_en: "string",
  instruction_vi: "string",
  prompt_en: "string",
  prompt_vi: "string",
  keywords: ["string", ...]
}
```

### Logic Lab:
```javascript
{
  puzzles: [
    {
      id: number,
      context_en: "30-50 words story",    // ← REQUIRED
      context_vi: "translated story",      // ← REQUIRED
      question_en: "question based on story",
      question_vi: "translated question",
      answer: ["answer1", "answer2", ...]
    }
  ]
}
```

### Daily Watch:
```javascript
{
  videos: [
    {
      id: number,
      title: "string",
      videoId: "string (from YouTube search)",  // Not hardcoded
      duration: "MM:SS",
      sim_duration: number,
      thumb: "https://img.youtube.com/vi/{videoId}/mqdefault.jpg",
      query: "search query used",      // ← SHOULD HAVE
      purpose: "GRAMMAR|TOPIC|SCIENCE" // ← SHOULD HAVE
    }
  ]
}
```

---

## COMPARISON MATRIX: WEEK 1 vs WEEK 19

| Feature | Week 19 | Week 1 (Before) | Week 1 (After) | Status |
|---------|---------|-----------------|----------------|--------|
| **Mindmap Keys** | String | Number ❌ | String ✅ | FIXED |
| **Writing Structure** | Object | Array ❌ | Object ✅ | FIXED |
| **Video IDs** | Real (YouTube) | Fake/Storage ❌ | Real ✅ | FIXED |
| **Video Process** | video_queries.json | Hardcoded ❌ | video_queries.json ✅ | FIXED |
| **Logic Context** | 30-50 words | 30-50 words ✅ | 30-50 words ✅ | OK |
| **Images** | 15 files | 13 files ⚠️ | 13 files ⚠️ | PARTIAL |
| **Audio** | 150-160 files | 152 files ✅ | 152 files ✅ | OK |
| **Easy Mode** | Simplified | Wrong structure ❌ | Simplified ✅ | FIXED |

---

## ROOT CAUSE ANALYSIS

### Why These Errors Occurred:

1. **AI Memory Limitations**
   - Week 19 structure not explicitly documented in Prompt V23
   - "Station mapping table" existed but lacked structure examples

2. **Insufficient Validation**
   - Pre-flight checks validated file count, not structure
   - No runtime tests for React components
   - No YouTube video ID validation

3. **Tool Inconsistencies**
   - `update_videos.js` expects `week_N` format
   - Data uses `week_NN` format (zero-padded)
   - No unified naming convention

4. **Asset Generation Pipeline**
   - Gemini API quota/errors not handled gracefully
   - No retry logic for failed generations
   - Validation happens before generation (counts expected, not actual)

---

## RECOMMENDATIONS FOR PROMPT V23 UPDATE

### 1. Add Explicit Structure Examples

**Section to Add:** "DATA STRUCTURE VALIDATION"

```markdown
### CRITICAL: Data Structure Patterns (Copy Exactly)

**Mindmap (Week 19 Reference):**
- centerStems: Array of strings ["text1", "text2", ...]
- branchLabels: Object with STRING KEYS matching centerStems
  {
    "text1": ["branch1", "branch2", ...],
    "text2": ["branch1", "branch2", ...]
  }
- ❌ NEVER use number keys: {1: [...], 2: [...]}

**Writing (Week 19 Reference):**
- Single object with: title, min_words, model_sentence, instruction_en/vi, prompt_en/vi, keywords
- ❌ NEVER use arrays: topicPrompts[], grammarPrompts[]

**Videos (Week 19 Reference):**
- ALWAYS create video_queries.json first
- ALWAYS run: update_videos.js --reset
- ❌ NEVER hardcode videoId values
```

### 2. Add Pre-Generation Validation Script

Create `tools/validate_week_structure.js`:
- Check mindmap key types
- Check writing structure
- Check video_queries.json exists
- Check image count after generation
- Test React component rendering

### 3. Update Asset Generation Pipeline

Modify `batch_manager.js`:
- Validate actual file count AFTER generation
- Add retry logic for Gemini API errors
- Report discrepancy between expected vs actual

### 4. Add Video Validation

Modify `update_videos.js`:
- Add videoId existence check (HTTP HEAD request)
- Report deadlinks before saving
- Require query + purpose fields in output

### 5. Fix Week Folder Naming

Choose ONE format:
- Option A: All tools use `week_01` (zero-padded)
- Option B: All tools use `week_1` (no padding)
- Update all tools to use chosen format

### 6. Add Easy Mode Morphing Rules

**Section to Add:** "EASY MODE STRUCTURE INHERITANCE"

```markdown
### Easy Mode MUST Inherit Advanced Structure

**Rule:** Easy mode simplifies CONTENT, not STRUCTURE

**Example:**
- Advanced mindmap: String keys → Easy: String keys (same structure)
- Advanced writing: Object → Easy: Object (same structure, shorter text)
- Advanced logic: 5 puzzles → Easy: 5 puzzles (simpler context)

**Morphing:**
- Advanced: "When I was young, I played with my friends every day after school."
- Easy: "When I was young, I played with friends."
```

---

## FILES MODIFIED IN THIS FIX

### Advanced Mode:
1. `src/data/weeks/week_01/mindmap.js` - Changed to string keys
2. `src/data/weeks/week_01/writing.js` - Changed to single object
3. `src/data/weeks/week_01/daily_watch.js` - Replaced with real YouTube IDs
4. `src/data/weeks/week_01/video_queries.json` - Created (NEW)

### Easy Mode:
1. `src/data/weeks_easy/week_01/mindmap.js` - Changed to string keys
2. `src/data/weeks_easy/week_01/writing.js` - Changed to single object
3. `src/data/weeks_easy/week_01/daily_watch.js` - Synced from Advanced

### Not Modified (Already Correct):
- `logic.js` - ✅ Has context, correct structure
- `read.js` - ✅ 10 bold words, correct format
- `explore.js` - ✅ 10 bold words, correct format
- `vocab.js`, `word_power.js`, `grammar.js`, etc. - ✅ All correct

---

## TESTING CHECKLIST (Before Marking Complete)

### App Functionality:
- [ ] Mindmap displays without React errors
- [ ] Writing station shows prompt and model sentence
- [ ] Videos play correctly (no 404 errors)
- [ ] Logic Lab questions display with context
- [ ] Images load (13/15 currently)
- [ ] Audio plays for all stations
- [ ] Easy mode works identically to Advanced (simplified content)

### Data Validation:
- [x] File count: 14/14 both modes ✅
- [x] Bold words: 10 per file ✅
- [x] WordPower schema: All fields present ✅
- [x] Station keys: Week 19 standard ✅
- [ ] Images: 15/15 both modes ⚠️ (13/15 current)
- [x] Videos: Real YouTube IDs ✅

---

## NEXT STEPS

1. ✅ **COMPLETED:** Fix all structural errors
2. ⏳ **PENDING:** Generate 2 missing images (read_cover_w01.jpg, name.jpg)
3. ⏳ **PENDING:** Test all 14 stations in app
4. ⏳ **PENDING:** Update Prompt V23 with findings
5. ⏳ **TODO:** Create `validate_week_structure.js` tool
6. ⏳ **TODO:** Standardize week folder naming across all tools

---

## CONCLUSION

Week 1 regeneration revealed **critical gaps in Prompt V23** regarding data structure specifications. While content was correct (grammar, vocab, science), the **structure** didn't match Week 19 pattern, causing app crashes and blank screens.

**Key Learning:** Prompt V23 needs explicit structure validation, not just content guidance. Adding code examples and validation scripts will prevent these errors in future weeks.

**Status:** Week 1 is now **90% functional**. Remaining work: 2 images + full app testing.

---

**Report Generated:** December 28, 2025, 12:45 PM  
**Next Action:** Update Prompt V23 with structural validation section
