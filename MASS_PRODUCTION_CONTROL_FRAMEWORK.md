# MASS PRODUCTION CONTROL FRAMEWORK

**Purpose**: Quy trình tự kiểm soát khi agent generate content cho tuần mới  
**Apply to**: W19-156 mass production  

---

## NGUYÊN TẮC

1. **TRANSPARENT**: Hiển thị mọi bước đang làm
2. **VALIDATED**: Check sau mỗi generation step
3. **TRACEABLE**: Log decisions và changes
4. **REVIEWABLE**: Summary cuối mỗi tuần

---

## ⚠️ CRITICAL RULE: ALWAYS OVERWRITE OLD CONTENT

**Áp dụng TRƯỚC KHI tạo bất kỳ file nào cho tuần mới**

### Quy Trình Bắt Buộc:

1. **Kiểm tra folder đã tồn tại chưa**:
   ```bash
   ls -la src/data/weeks/week_XX
   ls -la src/data/weeks_easy/week_XX
   ```

2. **Nếu folder đã tồn tại → PHẢI OVERWRITE HOÀN TOÀN**:
   - ❌ **KHÔNG BAO GIỜ** giả định nội dung cũ đúng
   - ❌ **KHÔNG BAO GIỜ** giữ lại code từ format cũ
   - ✅ **LUÔN LUÔN** dùng W16 làm template mới
   - ✅ **LUÔN LUÔN** thay thế TOÀN BỘ nội dung file

3. **Tại sao rule này quan trọng**:
   - Old files có thể dùng schema cũ (`puzzles` thay vì `questions`)
   - Old files có thể có vocabulary sai (không khớp BLUEPRINT)
   - Old files có thể có format không tương thích (`text` thay vì `sentence`)
   - Frontend chỉ nhận đúng schema của W16
   - **Thực tế:** W19 Easy mode có nội dung cũ "My Baby Album" thay vì "When I Was Small" → Logic Lab bị lỗi, production site hiển thị sai

### Cách Overwrite An Toàn:

**Khi dùng `replace_string_in_file`:**
```javascript
// ✅ ĐÚNG: Thay thế TOÀN BỘ file từ đầu đến cuối
oldString: "export default {\n  title: \"Old Content\",\n  ...\n};" // ← Toàn bộ file cũ
newString: "export default {\n  title: \"New Content\",\n  ...\n};" // ← Toàn bộ file mới

// ❌ SAI: Chỉ thay thế một phần, để lại code thừa
oldString: "title: \"Old Content\""  // ← Chỉ thay title
newString: "title: \"New Content\""  // ← Code cũ vẫn còn phía sau!
```

**Sau khi overwrite, BẮT BUỘC kiểm tra:**
```bash
# Kiểm tra file có bao nhiêu dòng (so với W16 tương ứng)
wc -l src/data/weeks_easy/week_XX/read.js
wc -l src/data/weeks_easy/week_16/read.js  # ← Reference

# Nếu file mới NHIỀU HƠN template đáng kể → có code thừa!
# Ví dụ: W16 read.js = 20 lines, W19 read.js = 45 lines → ⚠️ Nghi vấn
```

### Example - W19 Syntax Errors do Code Thừa:

**mindmap.js** - Có code thừa sau khi overwrite:
```javascript
// Line 56: Kết thúc ĐÚNG
  ]
};  // ← File nên kết thúc ở đây

// Line 57-86: CODE THỪA từ format cũ ❌
    ],
    "My family was ___.": [
      "always with me",
      ...
    ]
  }
};
export default mindMapContent;  // ← Dòng này từ format cũ!
```

**Result:** SyntaxError line 57, Cloudflare build failed ❌

---

## WORKFLOW CHO MỖI TUẦN MỚI

### PHASE 1: PRE-GENERATION CHECKS ✅

**Hiển thị trước khi bắt đầu**:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 MASS PRODUCTION: WEEK XX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 PRE-GENERATION CHECKLIST:
  ✅ BLUEPRINT data loaded for Week XX
  ✅ Gold standard (W16) template ready
  ✅ Previous week (W[XX-1]) validated clean
  ✅ API quotas checked (YouTube: OK, AI: OK)
  ✅ Git status clean (no uncommitted changes)
  
📊 WEEK XX SPECS:
  Theme: [theme from BLUEPRINT]
  Grammar: [grammar focus]
  Vocabulary: [10 target words]
  Phase: [1/2/3]
  Special: [any unique requirements]

🔧 GENERATION PLAN:
  [x] Videos (daily_watch.js) - 45 min
  [x] AI Tutor (week_XX_real.js) - 30 min
  [x] Core Stations (vocab, grammar, etc.) - 20 min
  [x] Activity Stations (games, explore, etc.) - 15 min
  [x] Easy Mode (auto-simplify) - 10 min
  [x] Metadata (index, video_queries) - 5 min
  
  Total: ~90 minutes
  Files: 35 (1 AI Tutor + 17 Advanced + 17 Easy)

▶️  Starting generation...
```

---

### PHASE 2: GENERATION WITH LIVE PROGRESS 🔄

**Hiển thị từng component đang làm**:

#### Component 1: Videos (daily_watch.js)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📹 STEP 1/6: VIDEOS (daily_watch.js)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 BLUEPRINT Analysis:
  Grammar: [e.g., "Past Simple - irregular verbs"]
  Keywords: [went, saw, came, ate, made]
  Video hints: [stories about yesterday, daily routines]

🎬 Video Search Queries (5 slots):
  Slot 1 (Grammar 1): "past simple irregular verbs song kids"
  Slot 2 (Grammar 2): "yesterday actions story ESL children"
  Slot 3 (Story): "Little Fox past tense story"
  Slot 4 (Vocab): "action verbs past tense kids"
  Slot 5 (Science): "SciShow Kids time travel history"

🔎 Fetching videos from YouTube API...
  ✅ Slot 1: Found "Irregular Verbs Song" (KidsTV123) - 3:42
  ✅ Slot 2: Found "What Did You Do Yesterday?" (English Singsing) - 2:15
  ✅ Slot 3: Found "The Time Machine" (Little Fox) - 5:30
  ✅ Slot 4: Found "Simple Past Actions" (Fun Kids English) - 3:00
  ✅ Slot 5: Found "How Time Works" (SciShow Kids) - 4:15

✓ CHECK 1: Grammar alignment
  Goal: Past Simple irregular verbs
  Slot 1: ✅ Directly teaches went/saw/came
  Slot 2: ✅ Story context for past actions
  Slot 3: ✅ Time travel = past tense context
  Status: PASS

✓ CHECK 2: Duplicate detection
  Running: node tools/check_duplicates.js 19
  ✅ No duplicates found across W1-18

✓ CHECK 3: Content appropriateness
  Ages: 6-12 years
  Language: Simple vocabulary
  Length: All videos 2-6 minutes ✅
  
📝 Writing: src/data/weeks/week_19/daily_watch.js
  ✅ File created (10 lines, 1.1 KB)

✅ VIDEOS COMPLETE (12 minutes)
```

#### Component 2: AI Tutor (week_19_real.js)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 STEP 2/6: AI TUTOR (week_19_real.js)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 Input Data:
  BLUEPRINT Week 19: [theme, grammar, vocab]
  Master Prompt V23: Loaded
  Template: W16 structure (3 missions)

🎯 Generation Strategy:
  Mission 1: Warm-up conversation (turns 1-5)
    Focus: Student describes past actions
    Pattern: "I [past verb]..." 
    Vocab: went, saw, came, ate, made
    
  Mission 2: Story interaction (turns 6-10)
    Focus: Narrating yesterday's activities
    Pattern: "Yesterday, I [verb]-ed..."
    Scaffolding: Timeline prompts
    
  Mission 3: Science connection (turns 11-12)
    Focus: Time concepts, cause-effect in past
    Pattern: Advanced past discussions
    
🧠 Calling Claude API for generation...
  Model: claude-sonnet-3.5
  Tokens: ~4000 estimated
  Context: BLUEPRINT + Master Prompt + W16 template

⏳ Generating (estimated 45 seconds)...
  ✅ Generated 3 missions (total 520 lines)

✓ CHECK 4: Schema validation
  ✅ week_id: 19 present
  ✅ target_vocab: 10 words with phonetics
  ✅ story_missions: 3 missions found
  ✅ Mission 1: 12 conversation_topics ✅
  ✅ Mission 2: story_arc with 3 phases ✅
  ✅ Mission 3: completion_message ✅

✓ CHECK 5: Grammar alignment
  Target: Past Simple irregular verbs
  Mission 1: ✅ Uses went/saw/came in prompts
  Mission 2: ✅ "Yesterday, I..." pattern
  Mission 3: ✅ Time travel scenarios
  Status: PASS

✓ CHECK 6: Content quality
  Vocabulary level: A1-A2 ✅
  Sentence length: Max 10 words ✅
  Scaffolding: Present in every turn ✅
  Vietnamese translations: Complete ✅

📝 Writing: src/data/weeks/week_19_real.js
  ✅ File created (520 lines, 31.2 KB)

✅ AI TUTOR COMPLETE (18 minutes)
```

#### Component 3: Core Stations (vocab, grammar, etc.)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 STEP 3/6: CORE STATIONS (9 files)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔤 vocab.js (Template-based)
  Input: 10 target words from BLUEPRINT
  Template: W16 structure (187 lines)
  
  Generating:
  ✅ Word 1: went /went/ (past of go)
  ✅ Word 2: saw /sɔː/ (past of see)
  ... (8 more)
  
  ✓ CHECK 7: Images available
    Source: Unsplash API
    ✅ All 10 words have images
  
  ✓ CHECK 8: Audio files
    Source: Google TTS
    ✅ All 10 words have audio URLs
  
  📝 Writing: src/data/weeks/week_19/vocab.js
    ✅ File created (187 lines, 7.1 KB)

📖 grammar.js (Pattern-based)
  Input: Past Simple irregular verbs
  Pattern: "Subject + irregular past verb + object"
  
  Generating:
  ✅ Rule explanation (5 examples)
  ✅ Exercise set (8 questions)
  ✅ Answer key
  
  📝 Writing: src/data/weeks/week_19/grammar.js
    ✅ File created (35 lines, 3.8 KB)

📚 read.js (AI-generated story)
  Theme: Story about yesterday's adventure
  Vocabulary: Uses target words
  
  🧠 Generating with Claude...
  ✅ Story: "Yesterday's Surprise" (12 paragraphs)
  ✅ Comprehension questions (5 questions)
  
  📝 Writing: src/data/weeks/week_19/read.js
    ✅ File created (28 lines, 3.1 KB)

🎙️ dictation.js (Auto-generated)
  Source: Target vocab + grammar examples
  Count: 8 sentences
  
  ✅ Sentence 1: "I went to the park yesterday."
  ... (7 more)
  
  ✓ CHECK 9: Audio generation
    TTS: Google Cloud
    ✅ All 8 sentences have audio
  
  📝 Writing: src/data/weeks/week_19/dictation.js
    ✅ File created (32 lines, 1.7 KB)

🗣️ shadowing.js (Dialogue generation)
  Type: Past tense conversation
  Characters: 2 speakers, 10-12 lines
  
  ✅ Generated dialogue about weekend
  ✅ Timing markers added
  ✅ Full audio URL generated
  
  📝 Writing: src/data/weeks/week_19/shadowing.js
    ✅ File created (34 lines, 2.9 KB)

⚙️ Generating remaining core stations...
  ✅ word_match.js (18 lines) - Past verb pairs
  ✅ word_power.js (107 lines) - Synonyms/antonyms
  ✅ writing.js (11 lines) - 3 past tense prompts
  ✅ ask_ai.js (45 lines) - 4 AI contexts

✅ CORE STATIONS COMPLETE (22 minutes)
  Files created: 9/17
```

#### Component 4: Activity Stations (games, explore, etc.)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎮 STEP 4/6: ACTIVITY STATIONS (7 files)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎲 games.js (Link insertion)
  Theme: Past Simple games
  Sources: Wordwall, Quizizz, Kahoot
  
  ✅ Game 1: "Irregular Verbs Memory" (Wordwall)
  ✅ Game 2: "Yesterday Quiz" (Quizizz)
  ✅ Game 3: "Past Actions Race" (Kahoot)
  
  📝 Writing: src/data/weeks/week_19/games.js
    ✅ File created (185 lines, 12.0 KB)

🔍 explore.js (Topic expansion)
  Topics: 3 exploration activities
  
  ✅ Topic 1: "History of Time Measurement"
  ✅ Topic 2: "Yesterday vs Today Comparison"
  ✅ Topic 3: "Famous Past Events for Kids"
  
  📝 Writing: src/data/weeks/week_19/explore.js
    ✅ File created (56 lines, 4.2 KB)

🧠 mindmap.js (Concept mapping)
  Central: "Past Simple - Irregular Verbs"
  Branches: 5 categories
  
  ✅ Branch 1: Common verbs (go→went, see→saw)
  ✅ Branch 2: Time expressions (yesterday, last week)
  ✅ Branch 3: Sentence patterns
  ✅ Branch 4: Story words
  ✅ Branch 5: Practice activities
  
  📝 Writing: src/data/weeks/week_19/mindmap.js
    ✅ File created (63 lines, 3.9 KB)

🧩 logic.js (Puzzle generation)
  Type: Past tense logic challenges
  Count: 8 puzzles
  
  ✅ Generated 8 logic problems
  
  📝 Writing: src/data/weeks/week_19/logic.js
    ✅ File created (68 lines, 3.1 KB)

🔢 singapore_math.js (Bar models)
  Context: Word problems with past tense
  Count: 6 problems
  
  ✅ Generated 6 bar model problems
  
  📝 Writing: src/data/weeks/week_19/singapore_math.js
    ✅ File created (70 lines, 3.5 KB)

⚙️ Generating remaining...
  ✅ video_queries.json (39 lines) - Metadata
  ✅ index.js (54 lines) - Auto-imports

✅ ACTIVITY STATIONS COMPLETE (18 minutes)
  Files created: 16/17 Advanced
```

---

### PHASE 3: EASY MODE GENERATION 🔽

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📉 STEP 5/6: EASY MODE (17 files)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 Auto-Simplifier Strategy:
  Input: 17 Advanced files
  Rules:
    - Reduce sentence length: 10 words → 7 words max
    - Replace complex vocab with simpler synonyms
    - Reduce exercise count: 8 → 5
    - Add more visual hints
    - CEFR level: A0-A1 (from A1-A2)

🔄 Processing each file...
  ✅ daily_watch.js → COPY (videos identical)
  ✅ read.js → SIMPLIFY (paragraphs: 12→8, words: 150→100)
  ✅ dictation.js → SIMPLIFY (sentences: 8→6, length: 10→6 words)
  ✅ shadowing.js → SIMPLIFY (lines: 12→8)
  ✅ vocab.js → SIMPLIFY (examples: 3→2 per word)
  ✅ grammar.js → SIMPLIFY (exercises: 8→5)
  ... (11 more files)

✓ CHECK 10: Readability validation
  Tool: Flesch-Kincaid Grade Level
  Target: Grade 1-2 (Age 6-8)
  
  Results:
  ✅ read.js: Grade 1.8 ✅
  ✅ dictation.js: Grade 1.5 ✅
  ✅ shadowing.js: Grade 1.9 ✅
  Status: PASS

✓ CHECK 11: Content preservation
  ✅ Grammar focus identical
  ✅ Vocabulary preserved
  ✅ Learning objectives same
  Status: PASS

📝 Writing 17 files to src/data/weeks_easy/week_19/
  ✅ All 17 Easy files created

✅ EASY MODE COMPLETE (14 minutes)
  Files created: 17/17 Easy
```

---

### PHASE 4: FINAL VALIDATION 🔍

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 STEP 6/6: FINAL VALIDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ CHECK 12: Complete week validator
  Running: node tools/validate_week_complete.js 19
  
  📚 AI Tutor: ✅ 1 file (31.2 KB, 520 lines)
  📁 Advanced: ✅ 17/17 files
  📁 Easy: ✅ 17/17 files
  
  Total: 35/35 files (100%)
  Status: ✅ COMPLETE

✓ CHECK 13: Duplicate videos
  Running: node tools/check_duplicates.js 19
  
  Checking against W1-18...
  ✅ No duplicates found
  Status: PASS

✓ CHECK 14: Grammar alignment
  Target: Past Simple irregular verbs
  
  Files checked:
  ✅ daily_watch.js: Videos teach past tense
  ✅ AI Tutor: All missions use past patterns
  ✅ vocab.js: Past verb forms present
  ✅ grammar.js: Explicit past simple rules
  ✅ read.js: Story uses past tense
  ✅ dictation.js: Sentences in past
  ✅ shadowing.js: Dialogue in past
  
  Status: 100% ALIGNED

✓ CHECK 15: Syntax validation 🔴 CRITICAL
  Running syntax check on ALL JS files before commit
  
  Command: for file in src/data/weeks*/week_19/*.js; do
             node -c "$file" || echo "ERROR: $file";
           done
  
  Checking Advanced mode (17 files)...
  ✅ daily_watch.js
  ✅ vocab.js
  ✅ grammar.js
  ✅ read.js
  ✅ dictation.js
  ✅ shadowing.js
  ✅ word_match.js
  ✅ word_power.js
  ✅ writing.js
  ✅ ask_ai.js
  ✅ explore.js
  ✅ mindmap.js
  ✅ games.js
  ✅ logic_science.js
  ✅ singapore_math.js
  ✅ video_queries.json (skip - JSON)
  ✅ index.js
  
  Checking Easy mode (17 files)...
  ✅ All 17 files pass syntax check
  
  Checking AI Tutor...
  ✅ week_19_real.js
  
  Status: ✅ ALL PASS (35 files)
  
  ⚠️ If any file fails:
     1. Read file to locate syntax error
     2. Check for leftover code from old format
     3. Verify closing brackets/braces match
     4. Re-run: node -c [filename] for detailed error

✓ CHECK 16: Old format remnants detection
  Checking for common leftover patterns after overwrite
  
  Patterns to check:
  ❌ Multiple closing `};` in same file
  ❌ Orphaned arrays after file end (], without opening [)
  ❌ Export statements appearing twice
  ❌ Old variable names (mindMapContent vs default export)
  
  Method:
  ```bash
  # Count '}' vs '{' - should be equal
  grep -o '{' file.js | wc -l
  grep -o '}' file.js | wc -l
  
  # Check for duplicate export
  grep -n "export default" file.js  # Should appear once
  ```
  
  Files checked:
  ✅ All files have balanced brackets
  ✅ No duplicate export statements
  ✅ No orphaned arrays
  
  Status: ✅ CLEAN

✓ CHECK 17: Build test
  Running: npm run build
  
  ⏳ Building...
  ✅ Build successful (6.2s)
  ✅ No TypeScript errors
  ✅ No missing imports
  
  Status: PASS

✓ CHECK 18: File size sanity
  AI Tutor: 31.2 KB ✅ (range: 30-35 KB)
  Advanced stations: 82.5 KB ✅
  Easy stations: 58.7 KB ✅
  Total: 172.4 KB ✅
  
  Status: NORMAL RANGE
  
  ⚠️ If Easy mode files are significantly LARGER than Advanced:
     → Likely contains leftover old content
     → Re-check with old format remnants detection (CHECK 16)
```

---

### PHASE 5: COMMIT & SUMMARY 📦

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 COMMITTING WEEK 19
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Git Status:
  New files: 35
  - src/data/weeks/week_19_real.js
  - src/data/weeks/week_19/*.js (17 files)
  - src/data/weeks_easy/week_19/*.js (17 files)

💾 Commit message:
  "Week 19: Past Simple Irregular Verbs - Complete
  
  GENERATED:
  - AI Tutor: 3 missions (520 lines)
  - Advanced: 17 stations (1,247 lines)
  - Easy: 17 stations (894 lines)
  
  VALIDATED:
  ✅ All 35 files present
  ✅ No duplicate videos
  ✅ Grammar 100% aligned
  ✅ Build passes
  ✅ Readability A0-A1 (Easy mode)
  
  Theme: Yesterday's Actions
  Keywords: went, saw, came, ate, made
  Videos: Past tense stories + grammar songs"

🚀 Running: git add -A && git commit && git push

✅ Committed: 35 files (2,661 lines)
✅ Pushed to: origin/main
```

---

## FINAL SUMMARY (HIỂN THỊ CUỐI MỖI TUẦN)

```
╔══════════════════════════════════════════════════════════╗
║         WEEK 19 MASS PRODUCTION COMPLETE ✅              ║
╚══════════════════════════════════════════════════════════╝

📊 STATISTICS:
  Total Time: 87 minutes (under 90 min target ✅)
  Files Created: 35/35 (100%)
  Total Lines: 2,661
  Total Size: 172.4 KB
  
  Breakdown:
  - AI Tutor: 520 lines (31.2 KB)
  - Advanced: 1,247 lines (82.5 KB)
  - Easy: 894 lines (58.7 KB)

🎯 CONTENT ALIGNMENT:
  ✅ Grammar: Past Simple irregular verbs (100% coverage)
  ✅ Vocabulary: 10 target words integrated across all files
  ✅ Theme: Yesterday's Actions (consistent narrative)
  ✅ CEFR Level: A1-A2 (Advanced) | A0-A1 (Easy)

✅ VALIDATION RESULTS:
  [✅] Pre-generation checks (5/5 passed)
  [✅] Schema validation (week_id, vocab, missions)
  [✅] Grammar alignment (all files match focus)
  [✅] Duplicate detection (0 duplicates found)
  [✅] Readability check (A0-A1 confirmed)
  [✅] **Syntax validation (35 files pass node -c)**
  [✅] **Old format remnants detection (clean)**
  [✅] Build test (6.2s, no errors)
  [✅] Complete week validator (35/35 files)
  
  Total: 18/18 checks PASSED ✅

📹 VIDEOS SELECTED:
  1. "Irregular Verbs Song" (KidsTV123) - 3:42
  2. "What Did You Do Yesterday?" (English Singsing) - 2:15
  3. "The Time Machine" (Little Fox) - 5:30
  4. "Simple Past Actions" (Fun Kids English) - 3:00
  5. "How Time Works" (SciShow Kids) - 4:15

🤖 AI TUTOR MISSIONS:
  Mission 1: "Yesterday Interview" (turns 1-5)
    - Focus: Personal past experiences
    - Pattern: "I went/saw/came..."
    
  Mission 2: "Story Time" (turns 6-10)
    - Focus: Narrative practice
    - Pattern: "Yesterday, I... Then I..."
    
  Mission 3: "Time Travel Science" (turns 11-12)
    - Focus: Advanced concepts
    - Pattern: Past cause-effect

📚 STATIONS CREATED:
  Core Learning:
  ✅ vocab.js - 10 past verbs with visuals
  ✅ grammar.js - Past simple rules + 8 exercises
  ✅ read.js - "Yesterday's Surprise" story
  ✅ dictation.js - 8 past tense sentences
  ✅ shadowing.js - Weekend conversation
  
  Practice Activities:
  ✅ word_match.js - Present→Past matching
  ✅ word_power.js - Verb transformations
  ✅ writing.js - 3 past tense prompts
  ✅ games.js - 3 interactive games
  ✅ explore.js - Time & history topics
  ✅ mindmap.js - Past simple concept map
  ✅ logic.js - 8 past tense puzzles
  ✅ singapore_math.js - 6 word problems
  
  Support:
  ✅ ask_ai.js - 4 AI helper contexts
  ✅ daily_watch.js - 5 videos
  ✅ video_queries.json - Search metadata
  ✅ index.js - Module exports

📉 EASY MODE:
  ✅ 17 files auto-simplified
  ✅ Sentence length: 10→7 words max
  ✅ Exercises reduced: 8→5
  ✅ Readability: Grade 1.8 average

🚀 DEPLOYMENT:
  ✅ Committed to Git (SHA: a3f5c9d)
  ✅ Pushed to origin/main
  ✅ Build deployed successfully

⏭️  NEXT: Week 20 (Comparative Adjectives)
  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 CHECKLIST FOR REVIEW:
  [ ] Manual review AI Tutor conversation flow
  [ ] Test one video link (spot check)
  [ ] Verify grammar examples accuracy
  [ ] Check vocabulary images load correctly
  
  (Optional - if any concerns raised above, review those files)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💾 ALL CHANGES SAVED TO:
  - src/data/weeks/week_19_real.js
  - src/data/weeks/week_19/ (17 files)
  - src/data/weeks_easy/week_19/ (17 files)

✅ Week 19 production complete and validated.
```

---

## ERROR HANDLING PROTOCOL

Nếu bất kỳ check nào FAIL:

```
❌ CHECK FAILED: [check name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 Issue: [description]
📍 Location: [file/component]
🔍 Details:
  - Expected: [what should be]
  - Actual: [what is]
  - Impact: [HIGH/MEDIUM/LOW]

🛠️  RESOLUTION OPTIONS:

Option 1 (Automatic Fix):
  Action: [what agent will do]
  Confidence: [HIGH/MEDIUM/LOW]
  Risk: [any risks]
  
Option 2 (Manual Review):
  Reason: [why manual review needed]
  Instructions: [specific instructions for user]
  
Option 3 (Skip & Flag):
  Justification: [why it's acceptable to skip]
  Follow-up: [note for later review]

⏸️  PAUSING generation until resolution...
```

**Agent sẽ**:
1. **STOP ngay** khi có check FAIL
2. **Hiển thị** issue rõ ràng với context
3. **Đề xuất** fix options với confidence level
4. **Chờ** user decision trước khi continue
5. **Log** issue vào tracking file

---

## TRACKING FILE

Mỗi tuần tạo log file: `WEEK_XX_GENERATION_LOG.md`

```markdown
# Week XX Generation Log

**Date**: [date]
**Time**: [HH:MM start] - [HH:MM end]
**Duration**: [actual minutes]

## Checks Passed: X/16

✅ Check 1: Grammar alignment
✅ Check 2: Duplicate videos
... [list all]

## Issues Found: X

[If any issues, list with resolution]

## Manual Reviews Needed: X

[List any items flagged for review]

## Files Generated: 35/35

[Full file list with sizes]
```

---

## INTEGRATION VỚI EXISTING TOOLS

Workflow sẽ gọi các tools hiện có:

```bash
# Pre-checks
bash tools/check_api_quota.sh

# During generation
node tools/fetch_videos.js 19
node tools/check_duplicates.js 19

# Final validation
node tools/validate_week_complete.js 19
npm run build
```

Tất cả outputs được parse và hiển thị trong framework.

---

## COMPLIANCE CHECKLIST

Mỗi tuần PHẢI có:

- [ ] 18 validation checks passed (including syntax + old format remnants)
- [ ] 35 files created
- [ ] Build successful
- [ ] Git committed with descriptive message
- [ ] Summary report generated
- [ ] No blockers for next week
- [ ] **NEW:** All files pass `node -c` syntax check
- [ ] **NEW:** No leftover code from old format detected

**Nếu thiếu bất kỳ item nào → Week INCOMPLETE, không proceed sang tuần sau.**

---

## USAGE BY AGENT

```javascript
// Pseudo-code for agent workflow

async function generateWeek(weekNumber) {
  // Phase 1: Pre-checks
  console.log(`╔══════════════════════════════════╗`);
  console.log(`║  WEEK ${weekNumber} GENERATION   ║`);
  console.log(`╚══════════════════════════════════╝\n`);
  
  const preChecks = await runPreGenerationChecks(weekNumber);
  if (!preChecks.allPassed) {
    throw new Error('Pre-checks failed');
  }
  
  // Phase 2: Generate with live progress
  const components = [
    'videos', 'ai_tutor', 'core_stations', 
    'activity_stations', 'easy_mode', 'metadata'
  ];
  
  for (const component of components) {
    console.log(`\n━━━━ ${component.toUpperCase()} ━━━━\n`);
    const result = await generateComponent(weekNumber, component);
    
    // Run checks after each component
    const checks = await validateComponent(result);
    displayChecks(checks);
    
    if (checks.hasCriticalFailure) {
      await handleFailure(checks);
      return; // Stop generation
    }
  }
  
  // Phase 3: Final validation
  const finalValidation = await runFinalValidation(weekNumber);
  displayFinalValidation(finalValidation);
  
  // Phase 4: Commit & Summary
  await commitWeek(weekNumber);
  displaySummary(weekNumber);
}
```

---

**END OF CONTROL FRAMEWORK**

Mọi generation từ W19-156 sẽ follow framework này.
User sẽ thấy:
- Mọi bước đang làm
- Mọi check đang chạy
- Mọi decision được log
- Summary cuối mỗi tuần
