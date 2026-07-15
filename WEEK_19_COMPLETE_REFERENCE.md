# ENGQUEST WEEK 19 COMPLETE STRUCTURE REFERENCE
## (Dùng làm chuẩn cho tất cả các tuần mới)

## I. DATA FILES COUNT & MAPPING
**EXACTLY 14 files per mode (Advanced + Easy = 28 files total)**

1. read.js → `read_explore` station
2. vocab.js → `new_words` station
3. word_power.js → `word_power` station
4. grammar.js → `grammar` station
5. dictation.js → `dictation` station
6. shadowing.js → `shadowing` station
7. explore.js → `explore` station
8. mindmap.js → `mindmap_speaking` station
9. daily_watch.js → `daily_watch` station
10. logic.js → `logic_lab` station (FILE named logic.js, STATION key is logic_lab)
11. ask_ai.js → `ask_ai` station
12. word_match.js → `word_match` station
13. writing.js → `writing` station
14. index.js → Exports all stations with weekId, weekTitle, stations object

---

## II. ITEM COUNTS PER STATION (STRICT)

### Phase 1 (Weeks 1-54) - ĐÃ XÁC NHẬN TỪ WEEK 19:
| Station | Items | Notes |
|---------|-------|-------|
| **read.js** | 1 story | ~100-150 words |
| **vocab.js** | 10 words | Core vocabulary |
| **word_power.js** | 3 collocations | Simple phrases |
| **grammar.js** | 20 exercises | Mixed mc/fill/unscramble |
| **dictation.js** | 8 sentences | Same as shadowing, from read.js |
| **shadowing.js** | 8 sentences | Same as dictation, from read.js |
| **explore.js** | 1 article | ~120-180 words, CLIL content |
| **mindmap.js** | 6 stems + 36 branches | 6 × 6 structure |
| **daily_watch.js** | **5 videos** | 1-2 grammar + 2-3 topic/science |
| **logic.js** | 5 puzzles | Contextual word problems |
| **ask_ai.js** | 5 prompts | Scenarios with context |
| **word_match.js** | 10 pairs | Uses vocab list |
| **writing.js** | 3+3 prompts | Topic + grammar prompts |

### Phase 2 (Weeks 55-120):
- word_power: 5 items (synonyms/antonyms)
- logic: 7 items
- Khác giống Phase 1

### Phase 3 (Weeks 121+):
- word_power: 7 items (idioms/phrasal verbs)
- logic: 10 items
- Khác giống Phase 1

---

## III. AUDIO FILES MAPPING (138 total per mode for Phase 1)

### read.js → 1 audio
- `read_explore_main.mp3` (from content_en)

### explore.js → 1 audio
- `explore_main.mp3` (from content_en)

### vocab.js → 40 audio (10 words × 4 each)
- `vocab_[word].mp3`
- `vocab_def_[word].mp3`
- `vocab_ex_[word].mp3`
- `vocab_coll_[word].mp3`

### word_power.js → 12 audio (3 words × 4 each)
- `wordpower_[word].mp3`
- `wordpower_def_[word].mp3`
- `wordpower_ex_[word].mp3`
- `wordpower_model_[word].mp3`

### dictation.js → 8 audio
- `dictation_[1-8].mp3`

### shadowing.js → 8 audio
- `shadowing_[1-8].mp3`
- **Note:** No `shadowing_full.mp3` in week 19

### logic.js → 5 audio
- `logic_[1-5].mp3` (from question_en)

### ask_ai.js → 5 audio
- `ask_ai_[1-5].mp3` (from context_en)

### mindmap.js → 42 audio (6 stems + 36 branches)
- `mindmap_stem_[1-6].mp3`
- `mindmap_branch_[1-36].mp3` (numbered sequentially, not nested)

### grammar.js, daily_watch.js, word_match.js, writing.js → 0 audio

**TOTAL: 1 + 1 + 40 + 12 + 8 + 8 + 5 + 5 + 42 = 122 audio**
*(Note: Week 19 has 138 files - may include extra grammar examples or other audio)*

---

## IV. IMAGE FILES MAPPING (15 total per mode)

### vocab.js → 10 images
- `/images/weekXX/[word].jpg` (e.g., `quiet.jpg`, `field.jpg`)
- **No prefix** for vocab images

### word_power.js → 3 images
- `/images/weekXX/wordpower_[word].jpg` (e.g., `wordpower_look_back.jpg`)
- **WITH prefix** `wordpower_`

### read.js → 1 cover image
- `/images/weekXX/read_cover_wXX.jpg` (16:9 ratio)

### explore.js → 1 cover image
- `/images/weekXX/explore_cover_wXX.jpg` (16:9 ratio)

**TOTAL: 10 + 3 + 1 + 1 = 15 images**

---

## V. VIDEO FILES (5 per mode, BOTH modes share same videos)

### daily_watch.js → EXACTLY 5 videos
```javascript
videos: [
  { id: 1, title: "...", videoId: "...", duration: "...", sim_duration: ..., thumb: "..." },
  { id: 2, ... },
  { id: 3, ... },
  { id: 4, ... },
  { id: 5, ... }  // MUST have 5th video
]
```

**Video Types:**
1. **GRAMMAR** (1-2 videos): Must contain grammar keywords (e.g., "was were", "past simple")
2. **TOPIC** (1-2 videos): Related to week theme (e.g., "childhood", "memories")
3. **SCIENCE/CLIL** (1-2 videos): Science or social studies (e.g., "human growth")

**Video Generation:**
- Create `video_queries.json` with 5 search queries
- Run `node tools/update_videos.js <WEEK_ID>`
- Script auto-loads YouTube API keys from `API keys.txt`

---

## VI. SCAFFOLDING & MORPHING (Blueprint Requirements)

### Easy Mode vs Advanced Mode Content Differences:

| Aspect | Easy Mode | Advanced Mode |
|--------|-----------|---------------|
| **Context** | Personal & immediate (me, family, classroom) | Global & abstract (world, history, science) |
| **Vocabulary** | Tier 1 + Basic Tier 2 (50% from syllabus) | Tier 2 + 3 (100% academic, CLIL) |
| **Grammar** | Simple sentences, compound (and, but, so) | Complex sentences (because, although, if), relative clauses |
| **Sentence Length** | 5-8 words/sentence | 10-15 words/sentence |
| **Story Length** | 6-8 sentences (~60-80 words) | 8-12 sentences (~100-150 words) |
| **Images** | Cartoons, colorful | Real photos, diagrams |

### Context Requirements (CRITICAL):
- **Logic puzzles:** MUST have context (storytelling format), not bare calculations
  - ✅ "Tom had 5 apples. He gave 2 to his sister. How many does he have now?"
  - ❌ "5 - 2 = ?"
- **Ask AI prompts:** MUST have scenario, not direct questions
  - ✅ "You found an old photo album. The pictures are black and white..."
  - ❌ "What are old photos like?"

---

## VII. ASSET GENERATION COMMANDS (Auto-load API keys)

### 1. Audio Generation
```bash
node tools/generate_audio.js <START_WEEK> <END_WEEK>
# Reads from: API keys.txt → "Google Cloude Text to speech API key"
# Generates: ~122 MP3 files per mode in public/audio/weekXX/
```

### 2. Image Generation
```bash
node tools/batch_manager.js <START_WEEK> <END_WEEK>
# Reads from: API keys.txt → "GEMINI_API_KEY"
# Generates: 15 JPG files per mode in public/images/weekXX/
```

### 3. Video Generation
```bash
node tools/update_videos.js <WEEK_ID>
# Reads from: API keys.txt → "Youtube Data API key"
# Updates: daily_watch.js with 5 videos
# Requires: video_queries.json in week folder
```

---

## VIII. VALIDATION CHECKLIST

Before asset generation, verify:
- [ ] All 14 data files exist for BOTH modes
- [ ] Each file follows exact schema from week 19
- [ ] Item counts match: 10 vocab, 3 word_power, 5 logic, 5 ask_ai, 8 dictation, 8 shadowing, 5 videos
- [ ] Mindmap has 6 stems × 6 branches (nested object structure)
- [ ] All fields present: audio_url (null), image_url, collocation, model_sentence, etc.
- [ ] Content from syllabus (grammar, topic) + blueprint (scaffolding, morphing)
- [ ] Logic puzzles have context, Ask AI have scenarios
- [ ] Bridge files (week_XX.js) export from index.js

After asset generation, verify:
- [ ] Audio count: ~122 MP3 per mode (not 118!)
- [ ] Image count: 15 JPG per mode
- [ ] Video count: 5 entries in daily_watch.js
- [ ] All files named correctly (no typos)

---

## IX. SCRIPT SYNCHRONIZATION REQUIREMENTS

**CRITICAL:** All 3 asset generation scripts must produce IDENTICAL results whether run:
1. From command line (tools/generate_audio.js, tools/batch_manager.js, tools/update_videos.js)
2. From Admin Panel (Admin_Media_Studio.html)

**Synchronization checklist:**
- [ ] Both read from same API keys source (API keys.txt)
- [ ] Both use same week data schema detection
- [ ] Both generate same file names and counts
- [ ] Both handle Easy mode (week folder + `_easy` suffix)
- [ ] Both handle error logging identically

**If discrepancy found:** Update both scripts to match week 19 structure.

---

## X. WEEK 19 AS GOLD STANDARD

Week 19 structure is the GOLD STANDARD for all new weeks. Any new week generated must:
1. Have exact same file structure (14 files)
2. Have exact same item counts per station
3. Have exact same audio/image naming conventions
4. Have exact same schema per file
5. Follow exact same Easy/Advanced morphing rules

**Content uniqueness:** Only the content (text, stories, vocabulary) changes based on syllabus. Structure NEVER changes.

---

## XI. MINDMAP SPECIAL NOTE

**Week 19 uses NESTED OBJECT structure** for mindmap branches:
```javascript
branchLabels: {
  "Stem 1 text": ["branch1", "branch2", "branch3", "branch4", "branch5", "branch6"],
  "Stem 2 text": ["branch1", "branch2", "branch3", "branch4", "branch5", "branch6"],
  // ... 6 stems total
}
```

**Audio generation** must handle this:
- Iterate over `Object.keys(branchLabels)` → get 6 stems
- For each stem, iterate over array → get 6 branches
- Number branches sequentially 1-36 (NOT nested like stem1_branch1)

**Week 1 used FLAT ARRAY** which was incorrect. Week 19 structure is correct.
