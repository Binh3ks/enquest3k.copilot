# 🧠 EngQuest3K Production Bug Instincts

> Auto-extracted from 34+ known production bugs (W12-W34).  
> These instincts prevent recurring mistakes during mass production.  
> Confidence level reflects how many times each bug has occurred.

---

## 📋 CRITICAL BUGS (confidence: 0.9) — STOP IMMEDIATELY IF DETECTED

### B1: NEVER Copy `**bold**` Into dictation.js or shadowing.js
```
TRIGGER:  Khi copy text từ read.js vào sentences[]
ACTION:    LUÔN strip '**' — grep '\\*\\*' trước khi save
FIX:       sed 's/\*\*//g' trước khi paste
```
- **Bug history:** W27, W24 — TTS đọc "star star word star star" thay vì "word"
- **Verification:** `grep '\*\*' src/data/weeks/week_N/dictation.js` → phải EMPTY
- **Also applies to:** shadowing.js

### B-GH: NEVER Use Single-Source Pool for Story Remix Game Distractors
```
TRIGGER:  Khi xây distractor pool cho StoryRemixGame (Sentence Blitz)
ACTION:    LUÔN lấy distractors từ NHIỀU nguồn: fill + mc options + fallback pool
FIX:       buildDistractorPool() — dùng cả MC options, thêm FALLBACK_POOL
```
- **Bug history:** W10, W11 — tất cả fill answers là "but"/"at" → pool chỉ 1 từ → chỉ hiển thị 1 option
- **Root cause:** Chỉ lấy answer từ fill-type exercises, không lấy từ mc options
- **File:** `src/pages/GameHub/games/StoryRemixGame.jsx` → `buildDistractorPool()`
- **Audit:** `grep "answer.*but\|answer.*at" grammar.js` → nếu tất cả giống nhau → dùng MC options

### B-AI: NEVER Use Case-Sensitive Compare for Question Word Bank Buttons
```
TRIGGER:  Khi so sánh button label với correctWord trong ask_ai.js
ACTION:    LUÔN dùng .toUpperCase() cho cả 2 bên
FIX:       word.toUpperCase() === correctWord.toUpperCase()
```
- **Bug history:** W1-W27 — button "What" vs correctWord "WHAT" → luôn WRONG
- **Root cause:** Button labels render as "What"/"When" nhưng correctWord trong data luôn UPPERCASE
- **File:** `src/modules/ask_ai/AskAi.jsx` → `handleWordSelect`
- **Verification:** Chọn đúng từ → phải hiển thị xanh, không phải "WRONG!"

### B2: NEVER Use Python for .js/.jsx Files
```
TRIGGER:  Khi tạo hoặc edit .js/.jsx file
ACTION:    LUÔN dùng Node.js với fs.writeFileSync() hoặc heredoc
FIX:       Viết script .mjs thay vì .py
```
- **Bug history:** W12-W13 — 36% of bugs từ Python-generated JS
- **Verification:** Kiểm tra xem file được tạo bởi Python script nào

### B3: NEVER Forget metadata.js Update
```
TRIGGER:  Khi tạo content cho week N
ACTION:    LUÔN cập nhật metadata.js với week title THỰC SỰ
FIX:       Không được để "Week N" generic title
```
- **Bug history:** B6 — Sidebar hiện "Week N" generic
- **Verification:** `grep "Week N" src/data/weeks/metadata.js` → phải KHÔNG có

### B4: NEVER Skip R2 Git Commit Sau Upload Images
```
TRIGGER:  Sau khi upload images lên R2 bằng wrangler
ACTION:    LUÔN git add + commit public/images/weekN/
FIX:       Cloudflare Pages deploy từ git, KHÔNG từ R2 wrangler
```
- **Bug history:** W26 — 21 images upload R2 nhưng không commit git
- **Verification:** `git status public/images/weekN/` → phải SẠCH

### B5: NEVER Use Singapore Math Type Names: addition/subtraction/multiplication/division
```
TRIGGER:  Khi viết singapore_math.js
ACTION:    CHỈ dùng: part_whole | comparison | missing_part | groups | before_after
FIX:       Đây KHÔNG phải renderer types
```
- **Bug history:** W22-W24, W28+ — silent fallback to part_whole
- **Verification:** `grep -E "addition|subtraction|multiplication|division" singapore_math.js` → EMPTY

### B6: NEVER Leave week_NN_real.js ở Root Level
```
TRIGGER:  Khi tạo AI Tutor data
ACTION:    LUÔN đặt trong: src/data/weeks/week_NN/week_NN_real.js
FIX:       KHÔNG đặt ở: src/data/weeks/week_NN_real.js
```
- **Bug history:** W28 — PronunciationTab blank
- **Verification:** `ls src/data/weeks/week_*/week_*_real.js` → phải TỒN TẠI

### B7: NEVER Use `correct:` Field in Grammar Exercises
```
TRIGGER:  Khi viết grammar.js
ACTION:    LUÔN dùng `answer:` không phải `correct:`
FIX:       GrammarEngine không validate `correct:` fields
```
- **Bug history:** W24-W30 — Grammar always marked wrong
- **Verification:** `grep "correct:" grammar.js` → phải EMPTY hoặc comment

### B8: NEVER Write Grammar Exercises with `answer: ""` Empty
```
TRIGGER:  Khi viết grammar.js exercises
ACTION:    LUÔN fill in real answer
FIX:       Empty answer = always marked wrong
```
- **Bug history:** W30 Easy — 8 exercises always wrong
- **Verification:** `grep 'answer: ""' grammar.js` → phải EMPTY

### B9: NEVER Write Unscramble Without `words:` Array
```
TRIGGER:  Khi tạo unscramble exercises trong grammar.js
ACTION:    LUÔN include `words: ["word1", "word2", ...]` array
FIX:       KHÔNG embed words trong `[w1/w2/w3]` string
```
- **Bug history:** W28 — crash when parsing
- **Verification:** Kiểm tra unscramble exercises có `words:` array

### B10: NEVER Use Curly Quotes in Answer Strings
```
TRIGGER:  Khi viết answers trong bất kỳ station nào
ACTION:    LUÔN dùng ASCII apostrophe `'` không phải `'`
FIX:       Normalization mismatch giữa user input và expected answer
```
- **Bug history:** W34 — user typed 'nhưng hệ thống expect '
- **Verification:** `grep "[''']" *.js` → phải EMPTY

---

## ⚠️ COMMON BUGS (confidence: 0.8) — REVIEW CAREFULLY

### B11: NEVER Copy Easy Content từ Advanced
```
TRIGGER:  Khi tạo content cho Easy mode
ACTION:    LUÔN viết content KHÁC (Grade 2-3 level)
FIX:       Easy = Personal context, simpler vocabulary
```
- **Bug history:** W24 — students learn same content twice
- **Verification:** So sánh nội dung read.js ADV vs EASY

### B12: NEVER Skip Bold Words Trong read.js
```
TRIGGER:  Khi viết read.js content
ACTION:    LUÔN bold ≥ 10 vocabulary words (W16+: ≥ 13)
FIX:       100% vocab coverage trong story
```
- **Bug history:** Multiple weeks — students can't identify vocab
- **Verification:** `grep -o '\*\*[^*\n]+\*\*' read.js | wc -l` ≥ vocab count

### B13: NEVER Use hash(branchText) for Mindmap Audio URLs
```
TRIGGER:  Khi tạo mindmap.js audio URLs
ACTION:    LUÔN dùng: hash(fullSentence) where fullSentence = stemText.replace('___', branchText)
FIX:       Branch text alone causes R2 path collision
```
- **Bug history:** W-MAY2026-MINDMAP — Multiple stems share same hash
- **Verification:** Kiểm tra tất cả branch hashes trong mindmap là UNIQUE

### B14: NEVER Replace `___` with "blank" in TTS
```
TRIGGER:  Khi chuẩn bị text cho VoiceService
ACTION:    LUÔN giữ nguyên `___` — cleanTextForTTS() tự convert
FIX:       TTS sẽ literally đọc "blank" nếu revert
```
- **Bug history:** W-MAY2026-TTS — TTS says "blank" during playback
- **Verification:** Kiểm tra voiceService.js cleanTextForTTS function

### B15: NEVER Add `prompt_en`/`prompt_vi`/`hint_en` vào ask_ai.js
```
TRIGGER:  Khi tạo ask_ai.js
ACTION:    KHÔNG thêm các fields không hợp lệ này
FIX:       Dùng schema W1-14, W15-28, W29-42 đúng format
```
- **Bug history:** W28-31 — Invalid fields cause parsing errors
- **Verification:** `grep -E "prompt_en|prompt_vi|hint_en" ask_ai.js` → EMPTY

### B16: NEVER Create Roleplay Contexts trong ask_ai.js
```
TRIGGER:  Khi viết nova_says trong ask_ai.js
ACTION:    nova_says PHẢI là single simple sentence
FIX:       KHÔNG phải roleplay hay advice-seeking context
```
- **Bug history:** W28 — Advanced dùng long roleplay contexts
- **Verification:** Kiểm tra nova_says length ≤ 100 chars

### B17: NEVER Forget `freetalk_knowledge` in week_NN_real.js
```
TRIGGER:  Khi tạo AI Tutor data
ACTION:    LUÔN thêm freetalk_knowledge với ≥8 facts
FIX:       Missing = FreeTalk AI có no context
```
- **Bug history:** W17, W18, W20-28 — FreeTalk responses generic
- **Verification:** `grep "freetalk_knowledge" week_*_real.js` → PHẢI CÓ

### B18: NEVER Skip Spark Talk Cards
```
TRIGGER:  Khi tạo week_NN_real.js
ACTION:    LUÔN có spark_talk array với ≥2 cards, mỗi card ≥3 frames
FIX:       Spark Talk tab sẽ hiện "No topics available"
```
- **Bug history:** W1-W30 đã backfilled
- **Verification:** Kiểm tra spark_talk array length ≥ 2

### B19: NEVER Use `topic_talk_prompt` in ask_ai.js
```
TRIGGER:  Khi tạo ask_ai.js
ACTION:    Topic Talk đã được REMOVE khỏi Ask AI
FIX:       Free speaking thuộc về AI Tutor tab
```
- **Bug history:** W28+ — topic_talk prompt nhầm vào ask_ai
- **Verification:** `grep "topic_talk" ask_ai.js` → EMPTY

### B20: NEVER Put Audio URL Mismatch Giữa dictation và shadowing
```
TRIGGER:  Khi tạo audio_url paths
ACTION:    dictation.js và shadowing.js phải CHIA SẺ same R2 paths
FIX:       Prevents double R2 storage, ensures audio consistency
```
- **Bug history:** W27 — Mixed naming `_NN` vs `_sN`
- **Verification:** So sánh audio_url paths giữa 2 files

---

## 🔍 PRE-PRODUCTION CHECKLIST (Run Before Creating Any Content)

### Week-Independent Checks
- [ ] Đọc Blueprint + Syllabus cho target week
- [ ] Clone từ golden standard (Week 16)
- [ ] Verify tất cả 16 files được clone đúng
- [ ] Test Deepgram API: `python3 -c "..."` (model: aura-orion-en)
- [ ] Test R2 upload: `npx wrangler r2 object put ... --remote`
- [ ] Verify Node.js ≥ 18: `node --version`

### Per-File Checks
- [ ] vocab.js: ĐÚNG 13 words (W16+)
- [ ] read.js: ≥ 13 bold words (100% vocab coverage)
- [ ] explore.js: ≥ 13 bold words + CLIL content
- [ ] grammar.js: 20 exercises, dùng `answer:` not `correct:`
- [ ] ask_ai.js: ĐÚNG schema format (W1-14/W15-28/W29-42)
- [ ] mindmap.js: `hash(fullSentence)`, ≥3 personal stems
- [ ] dictation.js: KHÔNG có `**` markers
- [ ] shadowing.js: KHÔNG có `**` markers
- [ ] singapore_math.js: Valid type names (KHÔNG addition/subtraction/...)
- [ ] writing.js: MANDATORY sentence_frames (W31+)
- [ ] week_NN_real.js: freetalk_knowledge + spark_talk + target_vocab

### Post-File Checks
- [ ] `grep '\*\*' dictation.js shadowing.js` → EMPTY
- [ ] `grep 'correct:' grammar.js` → EMPTY
- [ ] `grep -E 'addition|subtraction' singapore_math.js` → EMPTY
- [ ] `grep -E "'''" *.js` → EMPTY
- [ ] `node --input-type=module < file.js` → Syntax OK

### Pre-Commit Checks
- [ ] `bash tools/code_quality_gate.sh N` → 0 ERRORS
- [ ] `npm run content:lint -- --week N --errors-only` → 0 ERRORS
- [ ] `npm run dict:lint -- --errors-only` → 0 ERRORS
- [ ] Browser test: Week loads correctly, no fallback
- [ ] `git status public/images/weekN/` → SẠCH
- [ ] `git add . && git commit` → Complete

---

## 📊 BUG STATISTICS (W12-W34)

| Bug ID | Occurrences | Severity | Status |
|--------|-------------|----------|--------|
| B1: **bold** in TTS | 3 | CRITICAL | FIXED |
| B2: Python for JS | 5 | CRITICAL | FIXED |
| B3: metadata.js blank | 2 | CRITICAL | FIXED |
| B4: R2 no git commit | 2 | CRITICAL | FIXED |
| B5: Wrong SM types | 4 | CRITICAL | FIXED |
| B6: root-level real.js | 1 | CRITICAL | FIXED |
| B7: correct: field | 7 | HIGH | FIXED |
| B8: empty answer | 2 | HIGH | FIXED |
| B9: no words array | 1 | HIGH | FIXED |
| B10: curly quotes | 2 | MEDIUM | FIXED |
| B11: copy ADV→EASY | 3 | MEDIUM | FIXED |
| B12: missing bold | 5 | MEDIUM | FIXED |
| B13: mindmap hash | 1 | CRITICAL | FIXED |
| B14: ___ → blank | 1 | CRITICAL | FIXED |
| B15: invalid fields | 2 | HIGH | FIXED |
| B16: roleplay in ask_ai | 1 | HIGH | FIXED |
| B17: no freetalk_knowledge | 3 | MEDIUM | FIXED |
| B18: missing spark_talk | 5 | MEDIUM | FIXED |
| B19: topic_talk in ask_ai | 1 | MEDIUM | FIXED |
| B20: audio URL mismatch | 2 | MEDIUM | FIXED |

**Total: 34 bugs across 23 weeks of production**

---

## 🧪 AUTOMATED VERIFICATION

Run these commands to catch bugs automatically:

```bash
# 1. Check for **bold** in TTS-sensitive files
grep '\*\*' src/data/weeks/week_N/dictation.js \
       src/data/weeks/week_N/shadowing.js && echo "B1: FOUND ** IN TTS FILES"

# 2. Check for wrong grammar field
grep "correct:" src/data/weeks/week_N/grammar.js && echo "B7: FOUND correct: FIELD"

# 3. Check for invalid Singapore Math types
grep -E "addition|subtraction|multiplication|division" \
  src/data/weeks/week_N/singapore_math.js && echo "B5: INVALID SM TYPES"

# 4. Check for curly quotes
grep "[''']" src/data/weeks/week_N/*.js && echo "B10: CURLY QUOTES FOUND"

# 5. Check for empty grammar answers
grep 'answer: ""' src/data/weeks/week_N/grammar.js && echo "B8: EMPTY ANSWER FOUND"

# 6. Run full quality gate
bash tools/code_quality_gate.sh N

# 7. Run content lint
npm run content:lint -- --week N --errors-only

# 8. Run dictionary lint
npm run dict:lint -- --errors-only
```

---

## 📚 RELATED DOCUMENTATION

- `Production_FINAL/1. FINAL MASS PRODUCTION/1_CORE_WORKFLOW/AGENT_SELF_CHECK_WORKFLOW.md`
- `0. NEW_AGENT_ONBOARDING_PROMPT.md` (Bug section)
- `BUG_FIXES_CRITICAL.md`
- `CONTENT_RULES_READ_EXPLORE.md`

---

*Last updated: May 17, 2026 — 34 bugs documented, all FIXED*
*Confidence scoring: 0.9 = seen 3+ times, 0.8 = seen 2+ times*
