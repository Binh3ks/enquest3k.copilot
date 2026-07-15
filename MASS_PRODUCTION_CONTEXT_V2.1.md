# MASS PRODUCTION CONTEXT - UPDATED APRIL 11, 2026
**Version**: 2.6 (Full Lemmatizer + Complete Dictionary Quality Pass)  
**Status**: Production Ready with Universal Keyword Dictionary

---

## 🔄 WHAT CHANGED (v2.6 vs v2.5) — April 11, 2026

### Dictionary Quality: 100% Coverage + Real Examples

✅ **Full English Lemmatizer in getDictEntry** (both `ReadingExplore.jsx` + `Explore.jsx`)
   - Old: only stripped `-s/-es/-ies`
   - New: handles possessives (`today's→today`), `-ves` (shelves→shelf), `-ing` (walking→walk, writing→write, running→run double-consonant), `-ed` (stopped→stop), `-er/-est` (bigger→big), `-ly` (quickly→quick)
   - Priority: entry with meaning preferred over entry without meaning
   - Commits: `a66753a`

✅ **2018/2018 dictionary entries now have Vietnamese meanings**
   - Previous state: 1541 entries had empty `meaning` field
   - Fixed via `tools/backfill_meanings_v2.mjs`: lemmatizer + 700-word mega table
   - Covers: irregular past tense (became/began/built/flew/grew/won), contractions (don't/it's/they're), proper nouns, Vietnamese names
   - Script: `tools/backfill_meanings_v2.mjs`

✅ **204 bad template examples replaced with hand-written ESL sentences**
   - Old pattern: `"These rows are interesting to study."` / `"The wall is very important to us."`
   - All 204 replaced with natural, child-friendly context sentences
   - Examples show word in real use: classroom, family, nature, sports, daily life
   - e.g. `rows` → `"The desks are in straight rows in the classroom."`
   - e.g. `wall` → `"There is a world map on the classroom wall."`
   - Script: `tools/apply_handcrafted_examples.mjs`
   - Commit: `c4ed5c9`

⚠️ **RULE FOR NEW CHAT**: When generating dictionary examples, NEVER use filler phrases:
   - ❌ `"X is very important to us"`
   - ❌ `"These X are interesting to study"`
   - ✅ Show the word being USED in a real sentence a child would recognize

---

## 🔄 WHAT CHANGED (v2.5 vs v2.4)

### Dictionary Deployment Fix (April 10, 2026):

✅ **Import-Based Dictionary Loading**
   - Fixed production 404 error: dictionary now bundled by Vite (~608KB gzipped)
   - Changed from `fetch('/dictionary.json')` to `import dictionaryData from '../../data/dictionary.json'`
   - Removed cache-busting `dictVersion` query param (no longer needed with static import)
   - Root cause: `vite.config.js` has `publicDir: false` (media served from R2), preventing `public/` auto-copy
   - **BREAKING CHANGE**: `build_dictionary.mjs` now writes to `src/data/` only (not `public/`)

---

## 🔄 WHAT CHANGED (v2.4 vs v2.3)

### Major Additions (April 2026):

✅ **Universal Keyword Dictionary System**
   - 1900+ keywords with hover tooltips in Read & Explore
   - Browser-based pronunciation check (free, no quota)
   - On-demand TTS with R2 caching
   - Auto-extracts keywords from content (bold + important words)
   - Filters out stopwords (to be/have, articles, ultra-common)
   - **NEW SCRIPTS**: 
     - `tools/extract_keywords.mjs` - Extract from read.js + explore.js
     - `tools/build_dictionary.mjs` - Merge vocab.js data into dictionary
   - **NEW DOC**: [DICTIONARY_WORKFLOW.md](DICTIONARY_WORKFLOW.md)

✅ **Week 29/30 Bug Fixes**
   - Fixed topic_talk_prompt in ask_ai.js (all weeks 1-30 ADV + Easy)
   - Removed irregular_verb_drill conversation cards from FreeTalk
   - Fixed W29 daily_watch dead videos (3 replacements)
   - Fixed W30 Easy mindmap complexity (simplified branches)
   - Added 3rd conversation card (hard) + 3rd story mission (creative) to W29/W30
   - Fixed adventure TTS clipping (VoiceService now stops prev audio)
   - Fixed FloatingDictionary render bug ([object Object] issue)

### Infrastructure Improvements:

✅ **Cache Management**
   - Dictionary version query param for cache-busting
   - Console logging for dictionary load debugging
   - Singular fallback for plural forms (vehicles → vehicle)

✅ **UI/UX Enhancements**
   - HoverWord component with 2-tier interaction (hover tooltip + click popup)
   - Pronunciation practice with visual feedback (green/amber/red)
   - External dictionary links (Cambridge + Laban)
   - Bold vs non-bold keyword styling differentiation

---

## 🔄 WHAT CHANGED (vs v2.1)

### Repository Cleanup (March 13, 2026):

✅ **Git Repository Optimization**
   - Reduced tracked files: 6,479 → 1,600 (-75%)
   - Reduced .git/ size: 453MB → 289MB (-36%)
   - Removed: .wrangler/ cache, server folders, backup copies, doc duplicates
   - **NEW**: [GIT_COMMIT_CHECKLIST.md](GIT_COMMIT_CHECKLIST.md) - Quick reference for clean commits
   - **UPDATED**: [MASS_PRODUCTION_WORKFLOW_COMPLETE.md](MASS_PRODUCTION_WORKFLOW_COMPLETE.md) - Added Git best practices section

⚠️ **IMPORTANT**: BEFORE every commit, check [GIT_COMMIT_CHECKLIST.md](GIT_COMMIT_CHECKLIST.md) to avoid pushing:
   - .wrangler/ (dev cache)
   - node_modules/ (dependencies)
   - Backup/ folders
   - *_copy.txt (documentation duplicates)
   - Large server files

---

## 🔄 WHAT CHANGED (v2.1 vs v2.0)

### Major Improvements:

1. **Complete Audio Generation**
   - ✅ NEW: `tools/generate_complete_audio.js` script
   - Generates ALL 138+ audio files (vs 33 previously)
   - Supports both Advanced and Easy modes
   - Extracts from: vocab, dictation, shadowing, mindmap, ask_ai, logic, explore

2. **Asset Generation Workflow**
   - ✅ Standardized 4-step process for BOTH modes
   - ✅ Path format: `week_XX` (zero-padded with underscore)
   - ✅ Validation checklist integrated

3. **Easy Mode Completion**
   - ✅ Easy mode now fully supported in asset generation
   - ✅ Separate audio/image generation for Easy mode

### Bug Fixes:

1. **Audio Extraction Patterns**
   - Fixed mindmap extraction for `branchLabels:` format
   - Fixed ask_ai extraction for `context_en:` fields
   - Added support for multiple structure variations

2. **Path Consistency**
   - All new weeks use `week_XX` format
   - Scripts auto-detect format (backward compatible with `week4`)

---

## 📊 COMPLETE ASSET REQUIREMENTS

### Per Week - Advanced Mode:

**Files** (15 total):
- vocab.js, read.js, grammar.js, dictation.js, shadowing.js
- writing.js, ask_ai.js, logic.js, explore.js, word_power.js
- mindmap.js, daily_watch.js, word_match.js
- video_queries.json, index.js

**Images** (~20 files):
- 10 vocab word images
- 2-5 extra word images (adjectives, extras)
- 1 read cover image
- 1 explore cover image  
- 2 word power images (wp_match, wp_reward)
- 1 easy read cover

**Audio** (~143 files):
```
Vocab Audio (40 files):
  - 10 × word.mp3 (pronunciation)
  - 10 × vocab_def_[word].mp3 (definition)
  - 10 × vocab_ex_[word].mp3 (example)
  - 10 × vocab_coll_[word].mp3 (collocation)

Dictation (12 files):
  - dictation_1.mp3 ... dictation_12.mp3

Shadowing (12 files):
  - shadowing_1.mp3 ... shadowing_12.mp3

Mindmap (42 files):
  - mindmap_stem_1.mp3 ... mindmap_stem_6.mp3 (stems)
  - mindmap_branch_1.mp3 ... mindmap_branch_36.mp3 (branches)

Ask AI (8 files):
  - ask_ai_1.mp3 ... ask_ai_8.mp3

Logic (5 files):
  - logic_1.mp3 ... logic_5.mp3

Stories (2 files):
  - story_read.mp3 (reading passage)
  - explore_main.mp3 (explore narration)

Other:
  - Duplicate vocab files with path prefixes (~10)
```

### Per Week - Easy Mode:

**Files** (14 total):
- Same as Advanced, minus video_queries.json

**Images** (~15 files):
- 10 vocab word images
- 2-5 extra images
- Covers

**Audio** (~116 files):
- Reduced from Advanced:
  - Fewer dictation (10 vs 12)
  - Fewer shadowing (10 vs 12)
  - Fewer mindmap branches (~20 vs 36)
  - Same vocab, ask_ai, logic, stories

---

## 🚀 COMPLETE PRODUCTION WORKFLOW

### STEP 1: Generate Spec (5 min)

```bash
node MASS/tools/generate_spec.cjs <week_number>
```

**Output**: `MASS/SPECS/week_XX_spec.json`

**What it does**:
- Reads syllabus_database.js
- Extracts metadata for target week
- Locks vocabulary, grammar, theme
- Creates immutable spec file

### STEP 2: Generate AI Tutor (10 min)

```bash
node MASS/tools/generate_ai_tutor.cjs <week_number>
```

**Output**: `src/data/weeks/week_XX_real.js` (~1099 lines)

**What it does**:
- Reads spec + prompts
- Generates 3 missions (11 objectives each)
- Creates freetalk_knowledge
- Uses VARIANT schema (Week 4+ format)

### STEP 3: Generate Station Files (40 min)

**Manual** (AI-assisted):
- Read: `MASS/PROMPTS/08_STATIONS_CORE.txt`
- Read: `MASS/PROMPTS/09_STATIONS_ADVANCED.txt`
- Read: `MASS/PROMPTS/10_STATIONS_EASY.txt`
- Generate 14 Advanced files → `src/data/weeks/week_XX/`
- Generate 14 Easy files → `src/data/weeks_easy/week_XX/`

**Auto-validate**:
```bash
node MASS/tools/create_week.cjs <week_number>
```

### STEP 4: Generate Assets (20-30 min) ⭐ UPDATED

#### 4A. Advanced Mode Assets

```bash
# Images (20 files, ~2 min)
node tools/generate_images_nano.js <week_number>

# Complete Audio (143 files, ~15 min)
node tools/generate_complete_audio.js <week_number>
```

#### 4B. Easy Mode Assets

```bash
# Images (15 files, ~2 min)
node tools/generate_images_nano.js <week_number> easy

# Complete Audio (116 files, ~12 min)
node tools/generate_complete_audio.js <week_number> easy
```

#### 4C. YouTube Videos (Optional)

```bash
# Fetch and update video IDs
node tools/update_videos.js <week_number>
```

#### 4D. Dictionary Update ⭐ NEW (April 2026)

**Purpose:** Add new vocabulary to universal hover dictionary for Read & Explore stations

```bash
# Step 1: Extract keywords from new week's content
node tools/extract_keywords.mjs
# Output: tools/keywords_extracted.json (1900+ keywords)

# Step 2: Update dictionary with new vocab
node tools/build_dictionary.mjs --week <week_number>
# Output: src/data/dictionary.json (1949+ entries, bundled by Vite)

# Or rebuild entire dictionary
npm run dict:build

# Dry run to see changes without writing
npm run dict:dry-run
```

**What it does:**
- Scans `read.js` + `explore.js` for bold (`**word**`) and important non-bold keywords
- Excludes stopwords (to be/have, articles, ultra-common words)
- Merges vocab.js data (meaning_vi + definition_en + pronunciation)
- Creates minimal entries for keywords not in vocab.js
- Writes to `src/data/dictionary.json` (imported by ReadingExplore.jsx, bundled by Vite)

**Features enabled:**
- 🔊 Hover tooltip on ALL keywords (1900+ words)
- 📖 Click popup with Vietnamese meaning + English definition
- 🎤 Free pronunciation check (browser SpeechRecognition API)
- 💰 Cost: $0 (no Deepgram STT quota used)

**See:** [DICTIONARY_WORKFLOW.md](DICTIONARY_WORKFLOW.md) for complete guide

---

### STEP 5: Final Validation (5 min)

```bash
# Validate all content
node MASS/tools/create_week.cjs <week_number>

# Test in UI
npm run dev

# Navigate to Week XX to verify
```

### STEP 6: Commit

```bash
git add src/data/weeks/week_XX/
git add src/data/weeks_easy/week_XX/
git add src/data/weeks/week_XX_real.js
git add public/images/week_XX/
git add public/images/week_XX_easy/
git add public/audio/week_XX/
git add public/audio/week_XX_easy/
git add MASS/SPECS/week_XX_spec.json
git commit -m "Week XX: [Title]"
```

---

## 🛠️ KEY SCRIPTS REFERENCE

### 1. generate_complete_audio.js ⭐ NEW

**Location**: `tools/generate_complete_audio.js`

**Usage**:
```bash
node tools/generate_complete_audio.js <week_num> [mode]
node tools/generate_complete_audio.js 5          # Advanced
node tools/generate_complete_audio.js 5 easy    # Easy
```

**What it generates**:
- ✅ Vocab words (4 types × 10 = 40 files)
- ✅ Story narration (1 file)
- ✅ Dictation sentences (12 files)
- ✅ Shadowing sentences (12 files)
- ✅ Mindmap stems + branches (6 + 36 = 42 files)
- ✅ Ask AI prompts (8 files)
- ✅ Logic puzzles (5 files)
- ✅ Explore narration (1 file)

**Total**: ~143 files for Advanced, ~116 for Easy

**Extraction patterns**:
```javascript
// Vocab
word: "bedroom", definition_en: "...", example: "...", collocation: "..."

// Mindmap (handles both formats)
centerStems: [...] or stems: [...]
branchLabels: {...} or branches: [...]

// Ask AI
context_en: "You want to know..." → prompt text

// Logic
description: "..." or scenario: "..."

// Others
content_en: "..." → narration
text: "..." or sentence: "..." → audio
```

### 2. generate_images_nano.js

**Location**: `tools/generate_images_nano.js`

**Usage**:
```bash
node tools/generate_images_nano.js <week_num> [mode]
```

**What it generates**:
- Vocab word images (from vocab.js)
- Cover images (read, explore)
- Extra images (adjectives, concepts)
- Word power images

### 3. generate_spec.cjs

**Location**: `MASS/tools/generate_spec.cjs`

**What it does**:
- Extracts from syllabus_database.js
- Creates locked spec JSON
- Validates vocab count, grammar, CEFR

### 4. generate_ai_tutor.cjs

**Location**: `MASS/tools/generate_ai_tutor.cjs`

**What it does**:
- Reads spec + prompts (04, 05, 06)
- Generates week_XX_real.js
- Creates 3 missions with VARIANT schema

### 5. create_week.cjs

**Location**: `MASS/tools/create_week.cjs`

**What it does**:
- Orchestrates full workflow
- Validates station files
- Shows next steps

### 6. validate_week_v2.cjs

**Location**: `MASS/tools/validate_week_v2.cjs`

**What it does**:
- Compares vs Week 4 golden standard
- Checks CEFR compliance
- Validates cross-references

---

## 📝 PROMPTS STRUCTURE

### Core Prompts (Always Read)

1. **V29_MASTER_ORCHESTRATOR.txt**
   - Overall system architecture
   - File structure overview
   - Workflow sequence

2. **04_AI_TUTOR_CORE.txt**
   - AI Tutor generation guide
   - Mission structure rules
   - CEFR level mapping

3. **05_AI_TUTOR_METADATA.txt**
   - Metadata structure
   - Vocabulary format
   - Target_vocab rules

4. **06_AI_TUTOR_SCHEMA_VARIANT.txt**
   - VARIANT schema specification
   - question_variants format
   - Student invitation rules

### Station Prompts (For Step 3)

5. **08_STATIONS_CORE.txt**
   - Execution order
   - Cross-reference rules
   - CEFR by level

6. **09_STATIONS_ADVANCED.txt**
   - Complete schemas for 14 files
   - Advanced difficulty spec
   - 150-200 word passages

7. **10_STATIONS_EASY.txt**
   - Easy mode schemas
   - 50-80 word passages
   - Simplified grammar

---

## ✅ VALIDATION CHECKLIST

### Before Marking Week Complete:

**Station Files**:
- [ ] 15 Advanced files exist
- [ ] 14 Easy files exist
- [ ] 1 AI Tutor file exists (week_XX_real.js)
- [ ] 1 Spec file exists (week_XX_spec.json)

**Advanced Assets**:
- [ ] ~20 images in `public/images/week_XX/`
- [ ] ~143 audio files in `public/audio/week_XX/`
- [ ] All vocab words have 4 audio types
- [ ] Mindmap has 6 stems + 36 branches
- [ ] 12 dictation + 12 shadowing files

**Easy Assets**:
- [ ] ~15 images in `public/images/week_XX_easy/`
- [ ] ~116 audio files in `public/audio/week_XX_easy/`
- [ ] 10 dictation + 10 shadowing files

**Path Format**:
- [ ] All paths use `week_XX` format (zero-padded)
- [ ] No mixed `weekX` vs `week_XX` references
- [ ] Audio refs match generated locations

**Image CDN (BUG-18 prevention)**:
- [ ] Tất cả `<img>` trong components MỚI đều dùng `getImageUrl()` wrapper
- [ ] Không có `src={item.path}` hay `src={\`/images/...\`}` raw trong JSX

**TTS Station Names (BUG-19 prevention)**:
- [ ] MindMap component dùng `station='mindmap_speaking'` (KHÔNG phải `'read'`)
- [ ] Component mới đối chiếu station name vs `STATION_VOICE_KEY` trong voiceService.js
- [ ] `mindmap_speaking` có trong `STATIC_STATIONS` array

**Functional**:
- [ ] Week loads in UI without errors
- [ ] All stations accessible
- [ ] Audio plays correctly
- [ ] Images display correctly (KHÔNG thấy "[image will be generated]" placeholder)
- [ ] MindMap audio nghe to ngang với dictation/shadowing
- [ ] Easy mode toggle works

---

## 🎯 QUALITY STANDARDS

### Week 4 = Golden Standard

**Metrics**:
- 98/100 quality score
- 1108 lines AI Tutor file
- 15 station files
- 138 audio files Advanced
- 116 audio files Easy
- VARIANT schema format
- 3 missions × 11 objectives
- Free Talk 3.0 integrated

### Week 5 = Target Match

**Achieved**:
- ✅ 1099 lines AI Tutor file
- ✅ 15 Advanced + 14 Easy station files
- ✅ 143 audio files Advanced (exceeds Week 4!)
- ✅ 79 audio files Easy
- ✅ VARIANT schema format
- ✅ 3 missions × 11 objectives
- ✅ Free Talk 3.0 integrated
- ✅ 20 images Advanced

**Gaps**:
- ⚠️ Easy audio: 79 vs 116 (67% complete)
  - Missing: Extra mindmap branches
- ⚠️ Easy images: 0 vs 15 (needs fix in generator)

---

## 🔧 TROUBLESHOOTING

### Issue: Missing Audio Files

**Symptoms**: Fewer than 138 audio files after generation

**Solution**:
```bash
# Use new complete generator
node tools/generate_complete_audio.js <week> 

# Old generator only made 33 files
# node tools/generate_audio.js <week>  # ❌ DON'T USE
```

### Issue: Easy Mode Assets Missing

**Symptoms**: week_XX_easy folders empty

**Solution**:
```bash
# Generate Easy mode separately
node tools/generate_images_nano.js <week> easy
node tools/generate_complete_audio.js <week> easy
```

### Issue: Path Format Mismatch

**Symptoms**: Assets generated but not found in UI

**Check**: 
- Code references: `/audio/week_05/`
- Files location: `public/audio/week_05/` ✅
- NOT: `public/audio/week5/` ❌

**Fix**: Use week_XX format consistently

### Issue: Mindmap Audio Empty

**Symptoms**: mindmap_branch_X.mp3 files missing

**Cause**: Different mindmap.js structures
- Some use `branches: []`
- Others use `branchLabels: {}`

**Solution**: Updated extractor handles both formats

---

## 📚 REFERENCE FILES

### Golden Standards:
- **Week 4**: `src/data/weeks/week_04/` (reference structure)
- **Week 4 AI**: `src/data/weeks/week_04_real.js` (1108 lines)
- **Week 4 Audio**: `public/audio/week4/` (138 files)

### Spec Database:
- **Syllabus**: `src/data/syllabus_database.js` (ALL weeks)
- **Specs**: `MASS/SPECS/week_XX_spec.json` (locked data)

### Templates:
- **Prompts**: `MASS/PROMPTS/*.txt` (7 core files)
- **Schemas**: Embedded in prompts (09, 10)

---

## 🎓 LESSONS LEARNED (Week 5 Audit)

### What Worked Well:
1. ✅ Station file generation (subagent handled perfectly)
2. ✅ VARIANT schema consistent with Week 4
3. ✅ Spec-based generation (locked data)
4. ✅ Path consistency after fixes

### What Needed Improvement:
1. ❌ Old audio generator incomplete (33/138 files)
2. ❌ No unified asset generation command
3. ❌ Easy mode forgotten in workflow
4. ❌ No validation of asset counts

### What We Fixed:
1. ✅ Created `generate_complete_audio.js` (all types)
2. ✅ Updated MASS workflow docs
3. ✅ Added Easy mode to checklist
4. ✅ Updated validation to check assets

### Future Improvements:
1. 📌 Create unified `generate_week_assets.sh` script
2. 📌 Auto-validate asset counts before marking complete
3. 📌 Fix Easy mode image generator
4. 📌 Add progress bar for audio generation
5. 📌 Create asset diff tool (compare vs Week 4)

---

## 🟠 BUGS PHÁT HIỆN WEEK 16 — March 23, 2026

> Xem chi tiết đầy đủ: [LESSONS_LEARNED_WEEK_9-11_FOR_W12.md](LESSONS_LEARNED_WEEK_9-11_FOR_W12.md) (BUG-18/19/20)

### BUG-18: Bar Model Images 404 — Thiếu `getImageUrl()`

**Symptom:** Singapore Math sub-tab hiển thị "[Bar model image will be generated]" thay vì ảnh.

**Root Cause:** `SingaporeMathDisplay.jsx` dùng `src={problem.bar_model}` (raw path) thay vì `src={getImageUrl(problem.bar_model)}`. Trong production, images nằm trên R2 CDN → relative path → 404.

**Fix:** `import { getImageUrl } from '../../utils/imageUrl'` + wrap tất cả `src` từ data.

**🔴 RULE MỚI — BẮT BUỘC cho tất cả components:**
```jsx
// ❌ KHÔNG BAO GIỜ làm thế này:
<img src={item.image_path} />
<img src={`/images/week16/...`} />

// ✅ LUÔN LUÔN dùng:
import { getImageUrl } from '../../utils/imageUrl';
<img src={getImageUrl(item.image_path)} />
```

---

### BUG-19: MindMap TTS Dùng Sai Station String

**Symptom:** MindMap audio dùng sai giọng (narration thay vì mindmap), không load từ R2 CDN.

**Root Cause:** `MindMapSpeaking.jsx` hardcoded `station='read'` (copy-paste từ component khác). Đúng phải là `'mindmap_speaking'`.

**Fix:** Đổi tất cả 3 chỗ gọi `speakText()` trong MindMapSpeaking.jsx + thêm `'mindmap_speaking'` vào `STATIC_STATIONS` array.

**🔴 STATION NAME MAP — Tham khảo khi viết component mới:**
```
'read'             → narration voice
'dictation'        → dictation voice  
'shadowing'        → shadowing voice
'mindmap_speaking' → mindmap voice ← ĐÚNG cho MindMap
'word_power'       → vocabulary voice
'ask_ai'           → questions voice
'logic_lab'        → questions voice
```

---

### BUG-20: Giọng Nam TTS Nhỏ Hơn Giọng Nữ

**Symptom:** `aura-helios-en` (mindmap), `aura-zeus-en` (questions) nghe nhỏ hơn `aura-asteria-en` (dictation/shadowing).

**Root Cause:** Giọng nam có nhiều âm bass → perceived loudness thấp hơn (Fletcher-Munson effect). HTML5 `audio.volume` không thể > 1.0.

**Fix:** Web Audio API GainNode trong `playAudio()`:  
- `VOICE_GAIN_BOOST`: helios/orion = 1.45x, zeus = 1.40x  
- Tự động áp dụng cho tất cả stations dùng giọng nam

**ℹ️ Đã fix trong voiceService.js — không cần action thêm.**

---

## 🚀 NEXT WEEK (6-156) PRODUCTION

### Simplified Workflow:

```bash
# 1. Generate everything
node MASS/tools/generate_spec.cjs 6
node MASS/tools/generate_ai_tutor.cjs 6

# 2. Have AI generate station files (manual)
# Read prompts 08, 09, 10
# Generate 14 Advanced + 14 Easy files

# 3. Generate ALL assets
node tools/generate_images_nano.js 6
node tools/generate_complete_audio.js 6
node tools/generate_images_nano.js 6 easy
node tools/generate_complete_audio.js 6 easy

# 4. Validate
node MASS/tools/create_week.cjs 6

# 5. Test
npm run dev

# 6. Commit
git add src/data/weeks/week_06/
git add src/data/weeks_easy/week_06/
git add public/images/week_06/
git add public/images/week_06_easy/
git add public/audio/week_06/
git add public/audio/week_06_easy/
git commit -m "Week 6: [Title]"
```

### Time Estimate:
- Spec: 5 min ⚡
- AI Tutor: 10 min ⚡
- Station Files: 40 min
- Assets (all): 30 min
- Validation: 5 min
- **Total: ~90 minutes per week**

### Scaling to 156 Weeks:
- 156 weeks × 90 min = 14,040 min = **234 hours**
- With optimizations: **~200 hours** (8.3 days continuous)
- With AI automation: **~100 hours** (4.2 days)

---

## 📖 DOCUMENTATION UPDATES

**This Document**: `MASS_PRODUCTION_CONTEXT_V2.1.md`  
**Previous**: `MASS_PRODUCTION_CONTEXT_FINAL.md` (v2.0)  
**Audit Report**: `WEEK_5_COMPREHENSIVE_AUDIT.md`

**Key Changes from v2.0**:
1. ✅ Complete audio generation workflow
2. ✅ Easy mode full support
3. ✅ Path format standardized
4. ✅ Asset validation checklist
5. ✅ Troubleshooting guide
6. ✅ Lessons learned section

**Status**: Production Ready for Weeks 6-156

---

## 🎨 IMAGE GENERATION WORKFLOW (Updated Jan 20)

### Core Images (Essential - Priority 1)

**Required per week**: 15-20 images minimum

#### Method 1: Automated Generation (Recommended)
```bash
# Generate all images from data files
node tools/generate_images_nano.js <week_num>       # Advanced
node tools/generate_images_nano.js <week_num> easy  # Easy
```

**What it does**:
- Extracts all `word:` fields from vocab.js
- Generates images for each vocabulary word
- Uses Gemini API: `gemini-3-pro-image-preview`
- Saves to: `public/images/week_XX/` or `week_XX_easy/`

**Common Issues**:
1. **Safety Filter Failures**: Some prompts trigger content moderation
   - **Solution**: Use simpler prompts ("simple cartoon of a [word]")
   - **Alternative**: Copy similar images from other weeks
   
2. **API Rate Limiting**: Too many requests too quickly
   - **Solution**: Script has 1-second delay between requests
   - **Workaround**: Generate in smaller batches

3. **Script Hangs on Certain Images**:
   - **Solution**: Use Ctrl+C to cancel, continue with next image
   - **Workaround**: Create placeholder or copy from Advanced mode

#### Method 2: Manual Copy (Fast Alternative)
```bash
# For Easy mode: Copy from Advanced mode
cd public/images
mkdir -p week_XX_easy
for img in bedroom kitchen bathroom etc; do
  cp week_XX/${img}.jpg week_XX_easy/${img}.jpg
done
```

#### Method 3: Specialized Generator (For Problem Weeks)
Create custom generator like `generate_weekX_easy_images.js`:
```javascript
const images = [
  { name: 'word1.jpg', prompt: 'simple cartoon of word1' },
  { name: 'word2.jpg', prompt: 'simple cartoon of word2' },
  // ... list all needed images
];
// Generate with error handling
```

### Extended Images (Optional - Priority 2)

**Additional 15-20 images** for full coverage:

1. **Match Images** (10 files): Duplicate vocab images
   ```bash
   for img in word1 word2 word3; do
     cp ${img}.jpg match_${img}.jpg
   done
   ```

2. **Logic Puzzle Images** (5 files): Can reuse vocab images
   ```bash
   cp bedroom.jpg logic_1.jpg
   cp kitchen.jpg logic_2.jpg
   # etc...
   ```

3. **Video Thumbnails** (5 files): Simple placeholders
   ```bash
   for i in {1..5}; do
     cp cover_image.jpg video_${i}.jpg
   done
   ```

4. **Word Power Images** (5 files): Reuse main images
   ```bash
   for i in {1..5}; do
     cp vocab_image.jpg word_power_${i}.jpg
   done
   ```

### Image Requirements by Mode

#### Advanced Mode (~23 images):
- 10 vocab words
- 5-10 additional words (adjectives, verbs)
- 2 covers (read, explore)
- 1 word_power image

#### Easy Mode (~37 images):
- 10 vocab words (core)
- 10 match images (duplicates)
- 5 logic images
- 5 video thumbnails
- 5 word_power images
- 2 covers (read, explore)

**Key Insight**: Easy mode needs MORE images than Advanced due to word_match and word_power stations requiring multiple image variations.

---

## 🎬 VIDEO INTEGRATION WORKFLOW (Updated Jan 20)

### Videos Structure

**Location**: `daily_watch.js` file in each week
**Format**: YouTube embedded videos (5 per week)

### Step 1: Define Video Placeholders

Create structure in station file:
```javascript
export default {
  videos: [
    {
      id: 1,
      title_en: "Video Title",
      title_vi: "Tiêu Đề Video",
      description_en: "Description",
      description_vi: "Mô tả",
      youtube_id: "placeholder_video1",  // ← Replace this
      duration: "03:00",
      sim_duration: 180,
      thumbnail_url: "/images/week_XX_easy/video_1.jpg",
      thumb: "https://img.youtube.com/vi/VIDEO_ID/mqdefault.jpg"
    },
    // ... 4 more videos
  ]
};
```

### Step 2: Find Educational YouTube Videos

**Search Strategy**:
1. Go to YouTube.com
2. Search: "[Week Theme] for kids English learning"
   - Example: "house rooms for kids English learning"
3. Filter: Duration 2-5 minutes, kid-friendly content
4. Look for channels: Simple Kids Crafts, Kids Learning Tube, etc.

**Quality Criteria**:
- ✅ Clear English pronunciation
- ✅ Educational content (not entertainment only)
- ✅ Kid-safe (no ads, appropriate)
- ✅ 2-4 minute duration (optimal for young learners)
- ✅ Visual and engaging

### Step 3: Extract YouTube IDs

From URL: `https://www.youtube.com/watch?v=R9intHsdwLw`
Extract: `R9intHsdwLw` (everything after `v=`)

Update in file:
```javascript
youtube_id: "R9intHsdwLw",  // ✅ Real ID
thumb: "https://img.youtube.com/vi/R9intHsdwLw/mqdefault.jpg"
```

### Step 4: Update All 5 Videos

**Example (Week 5 - House Theme)**:
1. **Rooms in a House** - R9intHsdwLw (2:14)
2. **Parts of the House for Kids** - ulo7HnE5s7U (3:21)
3. **House Vocabulary** - P1IdZ4F_iQY (2:45)
4. **Home Sweet Home Song** - gFhiTxmHhzU (3:15)
5. **My Home Tour** - Bo_CBQs0Xl4 (4:12)

### Alternative: Video Query System (Future)

Some weeks use `video_queries.json` for dynamic video fetching:
```json
{
  "queries": [
    "house rooms for kids English",
    "bedroom vocabulary children",
    "kitchen items for kids",
    // ...
  ]
}
```

**Note**: Current system (Week 5+) uses direct YouTube IDs for reliability.

### Video Validation

```bash
# Test video embeds
# 1. Start dev server
npm run dev

# 2. Navigate to Week XX → Daily Watch
# 3. Click each video, verify:
#    - Video loads correctly
#    - No "Video unavailable" errors
#    - Content matches description
#    - Kid-appropriate
```

### Video Troubleshooting

**Problem**: Video won't embed
- **Cause**: Video has embedding disabled by creator
- **Solution**: Find alternative video on same topic

**Problem**: Video is deleted/private
- **Cause**: Creator removed or restricted video
- **Solution**: Update with new YouTube ID

**Problem**: Video has ads
- **Cause**: Creator monetized video
- **Solution**: Acceptable (YouTube default), or find ad-free alternative

---

## 🔍 COMPLETE ASSET CHECKLIST (Week 5 Standard)

### Easy Mode (100% Complete Example):

```
✅ Station Files: 14/14
   ├── vocab.js (40 audio URLs)
   ├── mindmap.js (42 audio URLs)
   ├── dictation.js (10 audio URLs)
   ├── shadowing.js (10 audio URLs)
   ├── ask_ai.js (8 audio URLs)
   ├── logic.js (5 audio URLs + 5 images)
   ├── explore.js (1 audio + 2 images)
   ├── read.js (1 audio + 1 image)
   ├── word_match.js (10 images)
   ├── word_power.js (5 images)
   ├── daily_watch.js (5 videos)
   ├── assessment.js
   ├── content.js
   └── story_questions.js

✅ Audio Files: 118/118
   ├── Vocab: 40 (10 words × 4 types)
   ├── Mindmap: 42 (6 stems + 36 branches)
   ├── Dictation: 10
   ├── Shadowing: 10
   ├── Ask AI: 8
   ├── Logic: 5
   ├── Explore: 1
   ├── Read: 1
   └── Word Power: 1

✅ Image Files: 37/37
   ├── Vocab: 10 core words
   ├── Covers: 2 (explore, read)
   ├── Logic: 5 puzzles
   ├── Match: 10 (word matching)
   ├── Videos: 5 (thumbnails)
   └── Word Power: 5

✅ Videos: 5/5
   └── All with real YouTube IDs

TOTAL: 174 assets (100% complete)
```

### Advanced Mode (100% Complete Example):

```
✅ Station Files: 14/14
✅ Audio Files: 143/143
✅ Image Files: 23/23
✅ Videos: 5/5

TOTAL: 185 assets (100% complete)
```

### Validation Commands:

```bash
# Count everything
echo "Station Files: $(find src/data/weeks_easy/week_05 -name '*.js' | wc -l)"
echo "Audio Files: $(find public/audio/week_05_easy -name '*.mp3' | wc -l)"
echo "Image Files: $(find public/images/week_05_easy -name '*.jpg' | wc -l)"
echo "Videos: $(grep -c 'youtube_id' src/data/weeks_easy/week_05/daily_watch.js)"

# Check for placeholders (should be 0)
grep -r "placeholder" src/data/weeks_easy/week_05/
```

---

**Status**: Production Ready for Weeks 6-156

**Last Updated**: January 20, 2026 - Post Week 5 Complete Audit

---

**End of Document** - Ready for Mass Production
