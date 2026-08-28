# WEEK CREATION WORKFLOW - STANDARD OPERATING PROCEDURE

> **Version:** 6.0 | **Date:** 2026-08-07 | **Status:** MANDATORY
> **Golden Template:** Week 36 (W16+), Week 6 (W1-15)
> **Source:** AGENT_SELF_CHECK_WORKFLOW.md + W30-36 Lessons Learned

---

## AGENT INSTRUCTION - READ FIRST

```
MỖI KHI LÀM GÌ THÌ LUÔN CẬP NHẬT WORKFLOW/TOOLKIT:

1. Khi tạo tuần mới → cập nhật file count, station names, bugs
2. Khi fix bug → thêm vào checklist
3. Khi tạo tool/script mới → thêm vào toolkit
4. Khi thay đổi quy trình → cập nhật workflow
5. Khi hoàn thành → commit workflow cùng với code

KHÔNG LÀM XONG RỒI QUÊN.
```

---

## CRITICAL RULES (ANTI-HALLUCINATION)

### MUST DO:
- Read Syllabus for Week N content
- Clone AI Tutor from **Week 34** template
- **Clone Stations from Week 36 template (W16+)** or **Week 6** (W1-15)
- Create index.js and stations for **BOTH** modes (19 files per mode = 38 total files per week)
- Use **Node.js** for ALL .js file creation (NO Python)
- Validate syntax **IMMEDIATELY** after EACH file
- Assign **5 DISTINCT voices** in voiceConfig per mode
- Test **BOTH modes** separately (Advanced AND Easy)
- **Pedagogical ESL Chunking Standard (Linear Thinking A1-A2)**:
  1. Complete Verb Phrases: DO NOT orphan prepositions (e.g. `walked to the park`, `looked at the comic strip`).
  2. Prepositional Setting Context: Keep context intact (`In Panel One`, `In Panel Two`).
  3. Target Grammar Focus: Past simple + complement/adverb (`was sunny and warm`, `walked slowly`).
  4. Collocations & Compound Nouns: `Saturday morning`, `comic strip`, `speech bubble`.
- **Mandatory Quality Audit & Sync**:
  - Run `npm run audit:chunks` to guarantee 0 chunking/dictionary errors.
  - Run `node scripts/sync_all_dictionaries.js` & `node scripts/rebuild_central_dictionary.js` to ensure 100% dictionary alignment.
- Run bug_prevention_check.sh N after each phase
- Browser test BEFORE deploy
- Use `problems: []` NOT `questions: []` in singapore_math.js
- Use correct bar_model paths: `barmodel_w{NN}_{mode}_p{n}_v1.jpg`
- Include daily_watch in index.js stations object
- **AI TUTOR: Audit Story Mission AND Spark Talk before commit**

### MUST NOT DO:
- Use Python to create .js files
- Copy Advanced content to Easy mode
- Skip syntax validation
- Skip UI imports (3 files)
- Deploy without browser test
- Forget index.js (week won't load!)
- Use `questions: []` instead of `problems: []` in singapore_math.js
- Use `correct:` instead of `answer:` in grammar.js
- Use curly quotes `'` `'` — always ASCII `'` (BUG-34)
- Fabricate YouTube videoIds for Daily Watch
- Forget to include daily_watch in index.js stations object
- **Forget to generate Shadowing video transcript** (run `fetch_transcripts.py` + `clean_transcripts.mjs` after selecting videoId)

---

## LESSONS LEARNED FROM WEEK 30-35

### W30-35 Bug #1: Spark Talk insufficient frames
```
Error: Hint disappears after turn 3-4, AI repeats same question
Cause: Sparks had only 3-4 frames but 8 target turns → cycling repeats frames
Fix: Every spark must have ≥ 8 frames with hint_en for all turns
```

### W30-35 Bug #2: Story Mission off-by-one question cycling
```
Error: Opening asks Q0, then AI asks Q0 again on first student reply
Cause: targetIndex = studentMsgCount - 1 (should be = studentMsgCount)
Fix: novaEngine.js line 439 — opening already asks phase_questions[0]
```

### W30-35 Bug #3: TurnManager conflict
```
Error: AI asks "How old are you?" in Story Mission
Cause: story_character removed from data → condition `!story_character` always TRUE
      → TurnManager created with default steps → conflicts with story_arc
Fix: Change to `if (!currentMission.story_arc)` in StoryMissionTab.jsx
```

### W30-35 Bug #4: story_character conflict with teacher role
```
Error: AI becomes "Luna" or "Tom" instead of teacher narrator
Cause: story_character data sent to AI with role description
Fix: Remove story_character from all story_mission data (keep nova_greeting only)
```

### W30-35 Bug #5: Story Mission off-topic (student asks back)
```
Error: AI ignores student and keeps asking scripted questions
Cause: Card Mode is deterministic — no LLM call for natural bridging
Fix: Detect off-topic (student asks question back OR vague <15 chars answer)
      → skip Card Mode → call LLM with soft bridge prompt
```

### W30-35 Bug #6: Circular question pairs
```
Error: Two consecutive questions about same topic (e.g., eat then drink)
Cause: Phase questions ordered without considering semantic flow
Fix: Reorder so each consecutive Q covers different story element
```

### W30-35 Bug #7: Story text inconsistency
```
Error: Backstory says "supermarket" but opening says "market"
Cause: Different writers used different words for same place
Fix: grep -rn "supermarket" week_NN/ → verify consistency in story_arc text
```

---

## CHUNK / COLLOCATION RULES (W36+ MANDATORY)

### Source of Truth
- **Oxford Collocations Dictionary** (C2): `production_kit/data/oxford_collocations.txt` (69,970 entries)
- **A1-B1 functional chunks** (built from W1-W35): `production_kit/data/a1b1_functional_chunks.txt` (~687 entries)
- **Existing curated**: `chunks_a1_b1.py` + `extra_collocations.py` + `wiktionary_idioms.py` + `learned_whitelist.json`

### MANDATORY Rules for Every Bold Chunk in read.js / explore.js

1. **MUST be in Oxford OR A1-B1 OR existing curated**
2. **NEVER match these patterns** (L1 blacklist):
   - Doubled modifiers: `big big, small small, very very, many many, long long`
   - Tautological adj+profession: `kind teacher, smart scientist, friendly artist, good cook`
   - Tautological adj+animal: `hard-working ant, lazy grasshopper, busy bee`
   - Contradictions: `big small, hot cold, old new, happy sad`
3. **MUST be 2-4 words** (no single-word bolds)
4. **MUST NOT be 1-word bolds** (e.g., `**tree**` → just `tree`)
5. **MUST NOT mix languages** (e.g., `**después**` Spanish word in English text)
6. **MUST NOT have non-ASCII characters** in `**...**` (no Vietnamese/Spanish chars)

### Verify Before Commit
```bash
# 1. Run audit
python3 audit_w1_w35_3tier.py

# 2. Tier 2 should be 0
cat /tmp/audit_tier2_fix.md  # MUST show 0 chunks
```

### Real Examples (W35)
**PASS** (in Oxford/A1-B1):
- `**burn fossil fuels**` ✓ (verb+object, common A2)
- `**greenhouse effect**` ✓ (technical term, in Oxford)
- `**climate change**` ✓ (essential topic, A2)
- `**solar power**` ✓ (noun+noun, common)
- `**renewable energy**` ✓ (adj+noun, common)

**FAIL** (L1 blacklist):
- ❌ `**a hard-working ant**` (ants are hard-working by nature)
- ❌ `**a lazy grasshopper**` (grasshoppers are lazy)
- ❌ `**good cook**` (tautological)
- ❌ `**the good news**` (free grammatical - news is good/good is not a fixed collocation with "news")
- ❌ `**walking her small dog**` (small is generic adj, not collocation)

### Audit Tool
```bash
# Quick audit
python3 production_kit/tools/audit_w1_w35_3tier.py
# Output:
#   /tmp/audit_tier1_keep.md   (in Oxford)
#   /tmp/audit_tier2_fix.md    (auto-fix candidates)
#   /tmp/audit_tier3_review.md (manual review)
#   /tmp/audit_summary.json
```

---

## PRE-PRODUCTION PHASE

### BƯỚC -1: System Check
```bash
bash production_kit/tools/preflight_check.sh
```

### BƯỚC 0: Determine Week Number
```bash
ls src/data/weeks/ | grep "week_" | sort -V | tail -1
# Result: week_35 → New week = 36
```

### BƯỚC 0.5: Read Reference Documents
```bash
# Read syllabus for vocabulary list
cat production_kit/reference/Syllabus_V5_PublicationReady.docx

# Read Speaking Drill spec (W36+)
cat production_kit/reference/SPEAKING_DRILL_SPEC.md
```

---

## CONTENT CREATION PHASE

### BƯỚC 1-5: Content Creation (see FULL CONTENT below)

---

## AI TUTOR AUDIT PHASE (MANDATORY — GATE 2)

### BƯỚC 6: Spark Talk Audit

```bash
# Count sparks and frames for the new week
node -e "
const fs = require('fs');
const w = 'N';  // Replace with actual week number
const path = 'src/data/weeks/week_' + w + '/week_' + w + '_real.js';
const src = fs.readFileSync(path, 'utf8');
const sparks = src.match(/spark_talk:\s*\[([\s\S]*?)^\s{2}\]/m);
if (!sparks) { console.log('NO spark_talk'); process.exit(1); }
const t = (sparks[1].match(/template:/g) || []).length;
const h = (sparks[1].match(/hint_en:/g) || []).length;
console.log('Spark frames:', t, 'hint_en:', h);
// W30+: every spark needs 8 frames with hint_en (2 sparks x 8 = 16 total)
if (t < 8 || h < 8) {
  console.error('FAIL: Need 8 frames with hint_en per spark');
  process.exit(1);
}
console.log('PASS: Spark talk OK');
"
```

**Every spark frame must have ALL of:**
- `template` (fill-in-the-blank sentence)
- `follow_up_q` (follow-up question)
- `hints[]` (word options for VocabCard)
- `hint_en` (full sentence for VocabCard sentence chip display)

### BƯỚC 6.1: Spark Talk Story Theme Consistency

```bash
N=36

# Check: opening_narrative/story_text/theme must match
grep -E "opening_narrative|story_text|theme" src/data/weeks/week_${N}/week_${N}_real.js | grep -i "market|supermarket|forest|park"
# Expected: 0 results (no supermarket in story text)
```

### BƯỚC 7: Story Mission Audit

```bash
N=36

# Check 1: Number of missions
node -e "
const fs = require('fs');
const src = fs.readFileSync('src/data/weeks/week_${N}/week_${N}_real.js', 'utf8');
const missions = (src.match(/mission_id:/g) || []).length;
console.log('Missions:', missions);
if (missions < 1) { console.error('FAIL: No missions'); process.exit(1); }
"
```

**For EACH mission, verify:**

1. **Circular question check** — no 2 consecutive questions about the same verb/topic:
```bash
# Look for same verb appearing in adjacent questions
grep -E "phase_questions:" -A 20 src/data/weeks/week_${N}/week_${N}_real.js | grep "?"
# Manually verify: Q1 "What did Mum eat?" + Q2 "What did Mum drink?" = OK (different)
# Q1 "What did Mum eat?" + Q2 "Did Mum eat?" = BAD (same verb)
```

2. **Story text consistency** — no supermarket/market mismatch:
```bash
grep -rn "supermarket" src/data/weeks/week_${N}/week_${N}_real.js | grep -v "dictation\|vocab\|global_vocab"
# Expected: 0 results (supermarket only in vocabulary/dictation, not in story_arc)
```

3. **Opening narrative vs story_text** — character names and locations consistent:
```bash
# Extract opening and story_text, verify character names match
grep "opening_narrative:" -A 1 src/data/weeks/week_${N}/week_${N}_real.js | head -5
grep "story_text:" -A 1 src/data/weeks/week_${N}/week_${N}_real.js | head -5
```

4. **Story character (W30-35 format) — MUST BE REMOVED:**
```bash
grep -c "story_character:" src/data/weeks/week_${N}/week_${N}_real.js
# Expected: 0 (story_character conflicts with teacher narrator role)
# If found: remove the entire story_character{} block from each mission
```

### BƯỚC 8: Run All Validations

```bash
N=36

# Full validation suite
bash production_kit/tools/bug_prevention_check.sh ${N}
bash production_kit/tools/code_quality_gate.sh ${N}
npm run content:lint -- --week ${N} --errors-only
npm run build
```

### BƯỚC 8.5: Writing Station Audit (MANDATORY)

```bash
N=36

# Verify min_words
echo "=== min_words ==="
grep -m1 "min_words" src/data/weeks/week_${N}/writing.js | grep -oP "min_words: \K\d+"
grep -m1 "min_words" src/data/weeks_easy/week_${N}/writing.js | grep -oP "min_words: \K\d+"
# Expected: ADV=45, EASY=30

# Verify sentence_frames count
echo "=== sentence_frames ==="
grep -c "template:" src/data/weeks/week_${N}/writing.js
grep -c "template:" src/data/weeks_easy/week_${N}/writing.js
# Expected: ADV=5, EASY=6-8
```

**Writing Station rules (from Blueprint):**

| Field | Easy | Advanced |
|-------|------|---------|
| `min_words` | 30 | 45 |
| `sentence_frames` count | 6-8 | 8 |
| Frame format | `template` + `blank_labels[]` | `template` + `answers[]` |
| Blanks per frame | 2-3 (simple sentences) | 1-4 (complex sentences) |
| `hints.vocabulary_bank` | ✅ Required | ✅ Required |
| `scaffolding_stage` | ✅ Required | ✅ Required |

**Per-file checks:**
- [ ] ADV: `min_words` = 45, Easy: `min_words` = 30
- [ ] ADV: 8 sentence frames, Easy: 6-7 sentence frames
- [ ] ADV: each frame has `template` + `answers[]` (full sentence answers)
- [ ] Easy: each frame has `template` + `blank_labels[]` (short label hints)
- [ ] Each frame has 2-3 blanks (Easy) / 1-4 blanks (ADV)
- [ ] `hints.vocabulary_bank` contains all keywords
- [ ] `scaffolding_stage` present
- [ ] `show_by_default` present (Easy: `true`, ADV: `false`)

**Common fixes:**
- `min_words: 160` for Easy → fix to `30`
- `min_words: 80` for ADV → fix to `45`
- Frame with 2 blanks but prompt needs 3 → expand frame template
- Missing `scaffolding_stage` → add appropriate stage

### BƯỚC 8.6: Chunk & Collocation Audit (MANDATORY)

English content must sound natural. Chunks and collocations are required for pedagogy, but never at the cost of grammar or native-speaker phrasing.

**Definitions (apply to all content):**
- **Chunk**: a multi-word phrase that naturally occurs together and forms one unit of meaning (examples: `sit next to`, `on the wall`, `had fun`, `fall asleep`)
- **Collocation**: a conventional word partnership native speakers expect (examples: `make a mistake`, `heavy rain`, `draw pictures`, `cut the grass`, `sharp knife`)

**Scope — audit ALL these files when English text changes:**
- `read.js`
- `explore.js`
- `dictation.js`
- `shadowing.js`
- `writing.js` (sentence_frames and prompt text)
- AI Tutor: `story_text`, `opening_narrative`, `phase_questions`, `spark_talk`, `freetalk_knowledge`

**Mandatory checks:**
1. Run the quality gate:
```bash
bash production_kit/tools/code_quality_gate.sh N | grep -E "20c|20e|20f"
```
2. Verify no unnatural forced collocations remain:
```bash
grep -E "made fresh|brought fresh|ate yummy|kind chef|nice scientist|friendly artist|kind teacher is kind|very very|big big|busy big|right right|inside inside|watched a street " src/data/weeks/week_NN/read.js src/data/weeks_easy/week_NN/read.js
```
3. If `read.js` text changes, verify `dictation.js` and `shadowing.js` still match the same content_en intent and story flow.
4. If grammar or vocabulary focus changes, verify AI Tutor content uses the same natural chunks and collocations.

**Common forced chunks to NEVER use:**
- `made fresh food` → `made sandwiches`
- `brought fresh fruit` → `brought strawberries`
- `ate yummy sandwiches` → `ate sandwiches`
- `kind chef` / `nice scientist` / `friendly artist` → remove unnatural adjective or use a natural phrasing
- `very very tall` / `big big lion` / `right right order` / `inside inside` → remove doubled modifier

**If a phrase sounds awkward when read aloud, rewrite it into normal English.**
- A readable passage is more important than a high bold-chunk count.

**Quick reference:**
```markdown
- [ ] read.js, explore.js, dictation.js, shadowing.js use natural chunks only
- [ ] writing.js frames use natural chunks/collocations only
- [ ] AI Tutor content uses natural chunks/collocations only
- [ ] If read.js changes, dictation/shadowing intent stays aligned
- [ ] grep + quality gate pass before commit
```

---

## DEPLOYMENT PHASE

### BƯỚC 9-13: Deploy (see original workflow below)

---

## QUICK REFERENCE

### Story Mission Format (W30-35+)

```
story_missions: [
  {
    mission_id: 1,
    title: "Mission Title",
    title_vi: "Tieng Viet",
    theme: "Theme description",
    type: "story",
    mission_context: {
      description: "...",
      target_vocab: ["word1", "word2"],
      grammar_focus: "past simple",
      response_format: "ack + recast + question",
      ack_options: ["Oh!", "Wow!", "Nice!"],
      recast_max_words: 8
    },
    // nova_greeting: "Teacher narrator opening..."  ← YES, keep this
    // story_character: { ... }                     ← NO, remove this
    opening_narrative: "Opening text with Say: scaffold",
    story_text: "Full story text...",
    story_arc: [
      {
        phase: "phase_name",
        turns: "1-3",
        phase_name: "Phase Title",
        focus: "Grammar focus",
        goal: "Student goal",
        phase_questions: [
          "Q1 with Say: scaffold?",
          "Q2 with Say: scaffold?"
        ]
      }
    ],
    minimum_turns: 8,
    maximum_turns: 12
  }
]
```

### Spark Talk Format (W30+)

```
spark_talk: [
  {
    id: 'spark_name',
    emoji: 'emoji',
    title: 'Title',
    bridge: 'Bridge text',
    seed_question: 'Opening question',
    frames: [
      {
        template: 'I ___ at school',
        hint_en: 'I AM happy at school',        ← REQUIRED (VocabularyCard sentence chip)
        follow_up_q: 'Follow-up question?',
        hints: ['happy', 'sad', 'tired']         ← REQUIRED
      }
      // ... 8 frames total
    ],
    scaffold_frames: ['frame template 1', 'frame template 2'],
    vocab_focus: ['word1', 'word2'],
    turns: 8
  }
]
```

### NovaEngine Key Lines (DO NOT CHANGE without understanding)

| Line | What | Why |
|------|------|-----|
| novaEngine.js:439 | `targetIndex = studentMsgCount` | Opening already asks Q0 |
| StoryMissionTab.jsx:333 | `if (!currentMission.story_arc)` | Skip TurnManager for story_arc missions |
| novaEngine.js:476-479 | `isOffTopic` detection | Triggers soft bridge for off-topic |

---

## LEGACY WORKFLOW (FULL)

(Kept for reference — copy sections as needed)

### PRE-PRODUCTION PHASE

#### BƯỚC -1: System Check
```bash
bash production_kit/tools/preflight_check.sh
```

#### BƯỚC 0: Determine Week Number
```bash
ls src/data/weeks/ | grep "week_" | sort -V | tail -1
```

#### BƯỚC 0.6: File Cleanup + Rollback Tag
```bash
N=36
ls src/data/weeks/week_${N}.js
ls src/data/weeks_easy/week_${N}.js
git tag pre-week-${N}-backup
```

### CONTENT CREATION PHASE

#### BƯỚC 1: Create Directories
```bash
N=36
mkdir -p src/data/weeks/week_${N}
mkdir -p src/data/weeks_easy/week_${N}
mkdir -p public/images/week${N}
mkdir -p public/audio/week${N}
mkdir -p public/audio/week${N}_easy
```

#### BƯỚC 2: Clone AI Tutor Template (Week 34)
```bash
N=36
AI_TUTOR_TEMPLATE=34
cp src/data/weeks/week_${AI_TUTOR_TEMPLATE}/week_${AI_TUTOR_TEMPLATE}_real.js \
   src/data/weeks/week_${N}/week_${N}_real.js
cp src/data/weeks_easy/week_${AI_TUTOR_TEMPLATE}/week_${AI_TUTOR_TEMPLATE}_real.js \
   src/data/weeks_easy/week_${N}/week_${N}_real.js
```

#### BƯỚC 3: Clone Station Templates
```bash
N=36
STATION_TEMPLATE=34  # W16+
# or STATION_TEMPLATE=6  # W1-15

for file in $(ls src/data/weeks/week_${STATION_TEMPLATE}/); do
  cp "src/data/weeks/week_${STATION_TEMPLATE}/$file" "src/data/weeks/week_${N}/"
done
for file in $(ls src/data/weeks_easy/week_${STATION_TEMPLATE}/); do
  cp "src/data/weeks_easy/week_${STATION_TEMPLATE}/$file" "src/data/weeks_easy/week_${N}/"
done
```

#### BƯỚC 4: Edit Content with Node.js
```bash
node << 'NODEEOF'
const fs = require('fs');
const N = 36;
const THEME = 'New Theme';
const THEME_VI = 'Chu De Moi';
const TEMPLATE = 34;
// Edit files with replace logic...
NODEEOF
```

#### BƯỚC 5: Create index.js for BOTH modes
**⚠️ This is the #1 cause of "Week N data not found" errors**

### VALIDATION PHASE (GATE 1)

#### BƯỚC 6: Structure Validation
```bash
N=36
echo "ADV files: $(ls src/data/weeks/week_${N}/*.js | wc -l) (expected: 17)"
echo "EASY files: $(ls src/data/weeks_easy/week_${N}/*.js | wc -l) (expected: 17)"
```

#### BƯỚC 7: Syntax Check
```bash
node -e "
const files = ['index.js', 'singapore_math.js', 'grammar.js', 'read.js'];
files.forEach(f => {
  try { require('./src/data/weeks/week_36/' + f); console.log('OK: ' + f); }
  catch(e) { console.error('FAIL: ' + f + ': ' + e.message); }
});
"
```

#### BƯỚC 8: Bug Prevention Check
```bash
bash production_kit/tools/bug_prevention_check.sh 36
bash production_kit/tools/code_quality_gate.sh 36
```

#### BƯỚC 9: AI Tutor Audit (MANDATORY — GATE 2)
```bash
# Run Spark Talk audit (BƯỚC 6 above)
# Run Story Mission audit (BƯỚC 7 above)
```

### UI UPDATES PHASE

#### BƯỚC 10: Update Tab Files
```bash
N=36
# Update StoryMissionTab.jsx, FreeTalkTab.jsx, gameAdaptation.js
# Add import + REAL_WEEK_DATA + weekDataMap entries
```

### DEPLOYMENT PHASE

#### BƯỚC 11: Build
```bash
npm run build
```

#### BƯỚC 12: Browser Test (MANDATORY — BOTH MODES)

**Advanced:** http://localhost:5173/week/N/vocab
**Easy:** http://localhost:5173/week/N/vocab?mode=easy

#### BƯỚC 13: Commit + Push
```bash
N=36
git add -A
git commit -m "feat(week${N}): [theme] - full stations

AI Tutor Audit:
- Spark talk: X sparks, Y frames each with hint_en
- Story missions: Z missions, circular Q checked, consistency verified
- story_character removed from all missions

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push
```

#### BƯỚC 14: Production Test
```
Advanced: https://enquest3k.pages.dev/week/N/ai_tutor?mode=advanced
Easy: https://enquest3k.pages.dev/week/N/ai_tutor?mode=easy
```

---

## SINGLE PROMPT

```
Tạo tuần [N]: Đọc production_kit/workflow/STANDARD_WEEK_CREATION_WORKFLOW.md rồi thực hiện đầy đủ các bước.
```

---

## W34-W35 BUGS CHECKLIST

Before deploying ANY week, verify ALL of:

### Structure
- [ ] `index.js` exists for BOTH modes
- [ ] `index.js` includes `daily_watch` in `stations` object
- [ ] `singapore_math.js` uses `problems: []` NOT `questions: []`
- [ ] `bar_model` paths: `barmodel_w{NN}_{mode}_p{n}_v1.jpg`

### AI Tutor - Spark Talk
- [ ] Every spark has ≥ 8 frames
- [ ] Every frame has: `template`, `follow_up_q`, `hints[]`, `hint_en`
- [ ] `turns` count matches frame count
- [ ] Story theme consistent (no supermarket in story_arc text)

### AI Tutor - Story Mission
- [ ] Each mission has `opening_narrative` with "Say:" scaffold
- [ ] `phase_questions` has no 2 consecutive questions about same verb/topic
- [ ] `opening_narrative` and `story_text` character names/locations consistent
- [ ] `supermarket` NOT in story_arc text (only in vocab/dictation if at all)
- [ ] **`story_character` REMOVED** from all missions
- [ ] `nova_greeting` kept as teacher narrator opening
- [ ] `minimum_turns` and `maximum_turns` set appropriately

### Code Quality
- [ ] Grammar has 20 exercises per mode
- [ ] VoiceConfig has 5 distinct voices
- [ ] Daily Watch has real YouTube videoIds
- [ ] UI imports updated (3 files)
- [ ] Browser test passed for BOTH modes
- [ ] Production test passed for BOTH modes

### Shadowing Transcript Generation (MANDATORY after selecting Shadowing video)

After running `node tools/update_videos.js N` and selecting the Shadowing videoId for the week:

1. **Fetch transcript** (prefers manual YouTube captions):
   ```bash
   python3 tools/fetch_transcripts.py --video <VIDEO_ID>
   ```
   - First tries manual captions (en, en-GB) — high quality, proper punctuation
   - Falls back to auto-generated if no manual exists
   - Saves to `src/data/video_transcripts.json`

2. **Clean + split into sentences**:
   ```bash
   node tools/clean_transcripts.mjs --video <VIDEO_ID>
   node tools/split_sentences.mjs
   ```
   - Manual: merges segments at `.!?` boundaries (max 10 words)
   - Auto: NLP splitting with sentence-start/ender heuristics
   - Saves to `src/data/video_transcripts_cleaned.json` and `video_transcripts_sentences.json`

3. **Verify quality** (target: 30-50 sentences per video):
   ```bash
   node tools/clean_transcripts.mjs --video <VIDEO_ID>
   # Check for sentences > 10s (these are still merged, need manual split)
   ```

4. **Browser test**: Open Shadowing station → toggle Transcript mode → verify sentences + IPA + YouTube seek

5. **Update both modes** (ADV + Easy) — same videoId is used in `week_NN/shadowing.js` for both

---

## 🔒 MASTER 16-RULE CAMBRIDGE & AUDIO FORENSIC STANDARDS (W33+) — 2026-08-28

Every new week (W33+) MUST adhere strictly to the following 16 invariant rules before release:

1. **Image ↔ Audio Factual Grounding**: Audio descriptions MUST describe ONLY what is physically visible in the image. NEVER invent ungrounded clothing, accessories, roles, or assumptions (e.g. no "Teacher David" if David is a student, no "waiting for class to start" if ungrounded).
2. **Audio Transcript Audit Before PASS**: Run Whisper ASR on 100% of generated MP3 files. Compare transcript against source hub text, UI wording, and image content. Zero word-for-word discrepancies permitted.
3. **Two-Speaker Voice Distinction**: Multi-speaker dialogues (Listening P1, P2, P3, P4, Speaking P2) MUST use acoustically distinct voices (e.g., Adult Female `en-US-Journey-F` + Student Girl `en-US-Neural2-C` or Adult Male `en-US-Neural2-D`).
4. **No Keyword Chanting in Listening Clues**: Listening Part 3 clues MUST be conversational and inferable from context. NEVER chant or repeat target answer phrases at the end of turns (e.g. NO trailing "Clean bandage. Clean bandage.").
5. **Flyers Part 1 Example Logic**: Part 1 Example MUST teach matching clearly on ONE example character (e.g., Jake). NEVER mix another scored character (e.g., Tom) into the example exchange.
6. **Flyers Part 3 Clue & Label Harmony**: Picture captions, hub `name`, hub `location_name`, and spoken audio references MUST be 100% identical in phrasing (e.g., `Nurse's Cabinet`, `First-Aid Table`, `Science Lab Desk`, `Dining Table`, `Bedroom Table`).
7. **Flyers Speaking Part 2 True Reciprocal Exchange**: Table A = Candidate asks questions from cues $\rightarrow$ Examiner answers with pre-generated static audio. Table B = Examiner asks questions via pre-generated static audio $\rightarrow$ Candidate answers from candidate card.
8. **Static MP3 Source-of-Truth Pipeline**: 100% of runtime audio MUST be pre-generated from authoritative hub source fields (`public/audio/weekXX/` & `dist/audio/weekXX/`). Zero live TTS calls during standard playback.
9. **No Hard-Coded Duplicate Audio Scripts**: Audio generation scripts MUST read directly from hub data files (`reading_hub.js`, `listening_hub.js`, `speaking_hub.js`). Never duplicate transcript strings in standalone scripts.
10. **CLIL Grammar X-Ray Conditional Rule**: If a paragraph naturally contains the grammar target, highlight genuine instances. If a scientific paragraph uses Present Simple, adapt the label dynamically (`Present Simple / Scientific Principles`) or display an educational note. NEVER show false error banners.
11. **Vocab Focus Selective Highlighting**: Vocabulary Focus highlights ONLY high-value target learning chunks/collocations, NOT every clickable dictionary word.
12. **Dictionary Completeness Rule**: 100% of glossary terms and key science terms on screen MUST exist in `vocab_dictionary_master.js` with IPA, definition, Vietnamese translation, and audio.
13. **Discovery Report Hotspot Autoplay**: Tapping evidence hotspots in Step 1 MUST immediately trigger narration audio for 0ms interactive exploration.
14. **Randomized Sentence Pills**: Step 3 word pills MUST be shuffled dynamically (Fisher-Yates) on initial mount with randomized distractor position. Sentences MUST NEVER appear pre-assembled.
15. **Chrome MCP Real-Browser QA Requirement**: All UI text, images, buttons, and audio triggers MUST be verified in the actual rendered browser via Chrome MCP / Native Host before declaring PASS.
16. **Final Human-Review Evidence Package Requirement**: Every release candidate MUST generate `.agents/W33_FINAL_HUMAN_REVIEW_EVIDENCE.md` containing full untruncated Whisper transcripts, image descriptions, and agreement matrices.
