# EngQuest3K — Claude Code Context

> **🤖 AGENTOS RUNTIME ACTIVE**: All AI coding agents must adhere to the operating procedures defined in `.ai/AGENTOS_SPEC.md`. Use `/agent-start` before beginning tasks and `/agent-finish` when wrapping up.


## 🎯 About This Project

**EngQuest3K** is an English learning app for Vietnamese K-12 students (A1→B1+ in 3 years).

- **156 weeks** curriculum (W1-W156)
- **Dual-mode**: Easy (Personal/Tier 1) vs Advanced (Global/Tier 2-3)
- **16 stations/week**: Read, Vocab, Grammar, Logic, AI Tutor, Games, etc.
- **Current production**: Weeks 1-32 deployed, Weeks 33+ in production

**Workspace**: `/Users/binhnguyen/Downloads/Engquest3k/`

---

## 🧰 Production Toolkit (Full Coverage)

### Automated Validation Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `production_kit/tools/preflight_check.sh` | Pre-production system check (6 tests) | `bash production_kit/tools/preflight_check.sh` |
| `production_kit/tools/bug_prevention_check.sh N` | Bug detection (13 patterns) | `bash production_kit/tools/bug_prevention_check.sh 33` |
| `production_kit/tools/code_quality_gate.sh N` | Quality gate (48 checks, C-01→C-48) | `bash production_kit/tools/code_quality_gate.sh 33` |
| `production_kit/tools/validate_sgmath_types.mjs N` | Singapore Math type validation | `node production_kit/tools/validate_sgmath_types.mjs 33` |
| `tools/validate_barmodels.js N` | Bar model path naming + file existence (MANDATORY) | `node tools/validate_barmodels.js 34` |
| `tools/validate_video_thumbnails.js N` | Daily Watch video thumbnail accessibility (MANDATORY) | `node tools/validate_video_thumbnails.js 34` |
| `production_kit/pipeline/build_week_lesson_plan.py` | Unified lesson plan entry point | `python3 production_kit/pipeline/build_week_lesson_plan.py 33` |
| `tools/generate_audio_deepgram.py N` | TTS generation with text-hash cache (stale audio prevention) | `python3 tools/generate_audio_deepgram.py 32 --upload` |
| `tools/update_videos.js N` | YouTube video search via Data API (MANDATORY for daily watch) | `node tools/update_videos.js 34` |
| `npm run content:lint -- --week N` | Content lint | `npm run content:lint -- --week 33 --errors-only` |
| `npm run dict:lint -- --errors-only` | Dictionary lint | `npm run dict:lint -- --errors-only` |

### Automated E2E Tests (Playwright)

| Test | Purpose | Usage |
|------|---------|-------|
| `tests/e2e/week_production.spec.js` | Week production E2E tests | `TEST_WEEK=33 npx playwright test --project=chromium` |

### Quick Validation Commands

```bash
# ALL VALIDATIONS (one command)
bash production_kit/tools/preflight_check.sh && \
bash production_kit/tools/bug_prevention_check.sh 33 && \
bash production_kit/tools/code_quality_gate.sh 33 && \
node production_kit/tools/validate_sgmath_types.mjs 33 && \
node tools/validate_barmodels.js 33 && \
node tools/validate_video_thumbnails.js 33 && \
npm run content:lint -- --week 33 --errors-only

# TTS AUDIO (auto-detects stale via text hash)
python3 tools/generate_audio_deepgram.py 32 --upload        # Init week: generate + save hash
python3 tools/generate_audio_deepgram.py 32 --audit-stale  # Report stale entries
python3 tools/generate_audio_deepgram.py 32 --force        # Re-generate everything
python3 tools/generate_audio_deepgram.py all --upload      # All weeks

# E2E Tests
TEST_WEEK=33 npx playwright test --project=chromium

# Smoke Tests (fast)
TEST_WEEK=33 npx playwright test --grep "Smoke" --project=chromium
```

---

## 📋 Production Workflow

### Main Workflow Files

1. **`production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md`**
   - 11-step production workflow (BƯỚC -1 → BƯỚC 10)
   - Mandatory checklist for every week production

2. **`production_kit/workflow/0. NEW_AGENT_ONBOARDING_PROMPT.md`**
   - Onboarding prompt for new agents
   - Copy-paste into new chat sessions

3. **`production_kit/workflow/TOOLKIT_INTEGRATION.md`**
   - How to integrate toolkit into workflow

### Reference Documents (SINGLE SOURCE OF TRUTH)

1. **Syllabus**: `production_kit/reference/Syllabus_V5_PublicationReady.docx`
   - Contains all 156 weeks (W1-W156) curriculum details
   - Grammar focus, vocabulary, reading texts, writing tasks
   - **ALWAYS read this file for Week N content**

2. **Blueprint**: `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md`
   - Technical specifications for content structure

### Comprehension Question Standard (read.js)

**Số câu hỏi mỗi tuần:**

| Level | Tuần | Câu hỏi |
|--------|-------|----------|
| A1 | W1–W16 | 3 câu |
| A2–B1 | W17–W156 | 4 câu |

**Scaffolding bắt buộc cho 100% câu hỏi đọc hiểu:**

| Trường | Mô tả |
|---------|--------|
| `answer: [...]` | Multi-answer — ≥2 đáp án chấp nhận được |
| `clue_statement` | Câu gợi ý ngắn (1 câu hoàn chỉnh trả lời đúng) |
| `hint_en` | Gợi ý bằng tiếng Anh (1 phrase) |
| `hint_vi` | Gợi ý bằng tiếng Việt (1 phrase) |

Explore.js: không cần câu hỏi chính thức (0q — là activity tự do).

### Bug Prevention Reference

- **`production_kit/never_rules/PRODUCTION_NEVER_RULES.md`** — 50+ production rules with **Why:** and **Source:** for each
- **`PRODUCTION_BUG_INSTINCTS.md`** — 20 documented bugs with confidence scoring
- **Critical bugs (confidence 0.9)**: `**bold**` in TTS files, `correct:` vs `answer:`, wrong Singapore Math types

### Singapore Math CPA Scaffolding (from data analysis + Blueprint)

| Week range | CPA Stage | Bar model? | Problem types |
|-----------|-----------|-----------|--------------|
| W1-W16 | `language` | ❌ No bar model rendered | part_whole (add/sub) |
| W17-W34 EASY | `concrete` | ✅ Bar model renders | + missing_part, comparison |
| W17-W34 ADV | `pictorial` | ✅ Bar model renders | + groups, before_after |

**Bar model label logic (draw_part_whole in generate_logiclab_barmodels.py):**
- ADDITION ("in total?" / "altogether?"): bar shows **Total:?**, Part A + Part B
- SUBTRACTION ("left" / "remaining" / "in 2 trips"): bar shows **Total: known**, Part A + Part B:?
- **NEVER use `is_total_first` for both** — this caused W34 EASY P1 to show Total=18 instead of Total:?

**Mindmap structure (May 23, 2026 — pending restructure):**
- Target: 6 stems = 2 affirmative + 2 negative + 2 question
- Each stem needs `type` field: `"affirmative"` | `"negative"` | `"question"`
- Mix question stems: in-story + everyday English/personal
- Branches use collocations matching stem type

### AI Tutor Content Rules

AI Tutor = `src/data/weeks/week_NN_real.js` (NOT `ask_ai.js`). Required fields:
- `chunk_focus[]` — array of 3-5 key collocations/phrases from read.js for AI to reinforce
- `knowledge_base` empathy rule — "NEVER say 'Great!' after a student describes an injury or negative experience"
- `opening_narrative` — from AI's perspective ("I am your AI teacher"), not student's
- `phase_questions` — empathetic framing (e.g., "That sounds stressful!", "Poor Jake!")
- `spark_talk` bridge — empathetic transition after safety/accident topics ("I am sorry to hear that — accidents can be scary!")

---

## 📁 Key Paths

### Week Data
```
src/data/weeks/week_NN/           # Advanced mode (16 files)
src/data/weeks_easy/week_NN/      # Easy mode (16 files)
src/data/weeks/week_NN_real.js     # AI Tutor data
```

### Golden Standards
```
Week 36 (NEW — W36+): dual-tab read (STEM + Social Stories), Social Quiz, W35-evolved schemas
Week 16 (legacy W16-35): 19 files structure, flat read.js
Week 6 (W1-15): 15 files structure
Week 7 (W1-15): AI Tutor template
```

**W36 (2026-07-10):** New golden standard for W36+ production. Key differences from W16:
- read.js: dual-tab schema `read_stem` + `read_social` (STEM + Social Studies stories)
- social_quiz.js: NEW — Geography/History questions (5 ADV / 4 Easy)
- writing.js: W35-evolved schema (`model_sentence`, `story_prompts.picture_mode`, `hints.vocabulary_bank`)
- word_power.js: 8 items with `cefr_level`, `model_sentence`, `audio_model`
- mindmap.js: `centerStems[]` + `branchLabels{}` keyed by stem
- dictation.js: W35 format with `content_en` + `sentences[{text, meaning}]`
- read.js `content_en` at top level for backward compat with validators

### App Code
```
src/modules/           # Feature modules (AI Tutor, Games, etc.)
src/components/         # Reusable UI components
src/services/           # Backend services (AI, TTS, API)
src/stores/            # State management (Zustand)
src/config/            # Configuration files
```

### Production Documentation
```
production_kit/                     # Production toolkit (ACTIVE)
  workflow/                         # 11-step workflow, onboarding, toolkit guide
  never_rules/                      # Production NEVER rules (50+ rules)
  tools/                            # Validation scripts (4 scripts)
  pipeline/                         # Lesson plan pipeline (1 script)
  reference/                        # Blueprint, Syllabus, Subtab roadmap
Production_FINAL/                   # Archived/historical production docs
```

---

## 🔧 Common Commands

### Development
```bash
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Build for production
```

### Production
```bash
# Pre-flight check before starting production
bash production_kit/tools/preflight_check.sh

# After creating week content
bash production_kit/tools/bug_prevention_check.sh N
bash production_kit/tools/code_quality_gate.sh N
node production_kit/tools/validate_sgmath_types.mjs N

# E2E tests
TEST_WEEK=N npx playwright test --project=chromium
```

### Audio Generation
```bash
python3 tools/generate_audio_deepgram.py --week N
npx wrangler r2 object put engquest-audio/audio/weekN/... --remote
```

---

## ⚠️ Critical Rules

1. **NEVER** use Python to create `.js` files — use Node.js only
2. **NEVER** copy `**bold**` text into `dictation.js` or `shadowing.js`
3. **ALWAYS** use `answer:` not `correct:` in grammar exercises
4. **ALWAYS** use valid Singapore Math types: `part_whole`, `comparison`, `missing_part`, `groups`, `before_after`
5. **ALWAYS** run quality gate before committing: `bash production_kit/tools/code_quality_gate.sh N`
6. **NEVER** modify `public/_redirects`, `public/_headers`, `vite.config.js` without explicit permission
7. **AI Tutor**: ALWAYS put `chunk_focus[]` and empathetic `knowledge_base` rules in `week_XX_real.js`
8. **content_vi**: NEVER use `**bold**` markers — Vietnamese text should not trigger dictionary popups
9. **CHUNK-FIRST (May 22, 2026)**: Single-word bolds = 0 allowed (ALL weeks). W28+: ≥10 multi-word chunks/passage, 1-3/sentence. ✅ `**ran down**` | ❌ `**ran**`. CHECK 20c must pass. Source: Blueprint §VII.b.
10. **Chunk/Collocation content standard (June 1, 2026)**: chunks must be natural multi-word units; collocations must be conventional word partnerships. Apply across `read.js`, `explore.js`, `dictation.js`, `shadowing.js`, `writing.js`, and AI Tutor content (`story_text`, `opening_narrative`, `phase_questions`, `spark_talk`). Never force unnatural combinations like `made fresh food`, `brought fresh fruit`, `ate yummy sandwiches`, `kind chef`, `nice scientist`, `friendly artist`, `kind teacher is kind`, `very very tall`, `big big lion`, or `right right order`. If read.js text changes, dictation and shadowing must stay aligned. Never prioritize a bold-chunk count over natural English.
11. **Canonical-longest bold policy (June 7, 2026) — NEW content only**: When bolding a chunk concept that has multiple lengths in dict (e.g., `every day` 2-word vs `practice every day` 3-word), the **longest** form should be bolded at every occurrence. Sub-chunks (shorter forms) must NOT be bolded separately if they appear inside the super-chunk. **Do NOT retroactively fix existing files** (W1-W35) — the 153 Pattern A inconsistencies are accepted as-is; renderer handles both sub-chunk and super-chunk bold equally. Only apply this rule when **creating new content** (W36+). Source: `production_kit/data/bold_consistency_audit.json` Pattern A.
12. **NEVER overwrite shadowing.js TTS content with video transcript** (Aug 1, 2026): `shadowing.js` has TWO separate modes — **TTS mode** (`content_en` + `script[]` with `vi` translations) and **Video Transcript mode** (`script[]` with `start`/`duration` timestamps). NEVER replace TTS content with video transcript data. They serve different functions. If adding video transcript, use a SEPARATE field. Before bulk editing shadowing.js, ALWAYS read one file first to check which mode it uses. **Source:** Incident 2026-08-01 — accidentally overwrote 44 files across 23 weeks, broke TTS for all students, had to revert commit 6374d10c.
13. **Shadowing pipeline is FROZEN** (Aug 1, 2026): 3-phase pipeline documented in `production_kit/workflow/SHADOWING_PIPELINE_FROZEN.md`. Key rule: **NO LLM sentence splitting** — split manually by meaning. Read the frozen spec before any shadowing work.

---

## 📊 Production Progress

| Metric | Value |
|---------|-------|
| Weeks deployed | 34 |
| Weeks total | 156 |
| Progress | 21.8% |
| Remaining | 122 weeks |

---

## 🆘 Debugging

### Check week data exists
```bash
ls src/data/weeks/week_33/
ls src/data/weeks_easy/week_33/
```

### Check metadata
```bash
grep "33" src/data/weeks/metadata.json
```

### Check R2 audio
```bash
npx wrangler r2 object list engquest-audio/audio/week33 --remote
```

### Clear local storage for testing
```bash
open clear_all_jan30.html
```

---

**Last updated**: May 30, 2026 (W30-35 AI Tutor fixes + Writing Station W33-35 rules)
**Toolkit version**: 5.0 (production_kit/)

---

## 🔑 AI Tutor Key Code Locations

| Component | File | Critical Lines |
|-----------|------|----------------|
| Story Mission Card Mode | `src/services/ai_tutor/novaEngine.js` | Line 439: `targetIndex = studentMsgCount` (off-by-one fix) |
| Off-topic detection | `src/services/ai_tutor/novaEngine.js` | Lines 476-479: `isOffTopic` + soft bridge trigger |
| Soft bridge prompt | `src/services/ai_tutor/tutorPrompts.js` | Lines 343-346: SOFT BRIDGE MODE template |
| TurnManager skip | `src/modules/ai_tutor/tabs/StoryMissionTab.jsx` | Line 333: `if (!currentMission.story_arc)` |
| Spark off-topic guard | `src/modules/ai_tutor/tabs/FreeTalkTab.jsx` | Line 80: `isSparkOffTopic()` |

### AI Tutor Architecture
- Story Missions: **Card Mode** (deterministic, zero latency) for normal flow
- Story Missions: **Soft Bridge Mode** (LLM call) when student goes off-topic
- Spark Talk: Deterministic frame cycling with `hint_en` sentence chip display
- LLM: Cerebras → Groq → Together → Gemini (via `apiProviderManager`)

---

## 🧭 Session & Editing Rules

These rules govern how I work in this project. They override generic defaults.

### Before any edit
1. **Read the file first** — never edit without reading it first
2. **Confirm the scope** — is this file really relevant to the task?
3. **Check git status** — know what else changed before adding more
4. **Prefer Edit over Write** — use Edit for targeted changes, Write only for new files

### Safe Auto-Approve Flow (Edit/Write — added 2026-07-05)
When `Edit(*)` or `Write(*)` succeeds, AI MUST follow this sequence:
1. **Auto-run validation**: `npm run lint -- <changed_file>` (or full `npm run lint` for new files)
2. **If test FAILS**: immediately run `git checkout -- <file>` to revert the change, then notify user with the lint error
3. **If test PASSES**: continue. For production code (src/modules, src/services), also run `npm run build` and verify it succeeds
4. **Auto-rollback for build failure**: `git checkout -- <changed_file>` if `npm run build` fails after an edit

**Rationale**: Edit/Write are now in `permissions.allow` (auto-approved), so this rule compensates by enforcing mandatory validation + rollback. Do NOT skip step 1 even if "obvious" change.

### Before large changes (new feature, refactor, bulk content rewrite)
- **Use EnterPlanMode** — design the approach, get approval, then implement
- **Ask for confirmation** if >5 files will be changed
- **Never run global scripts** (sed, find -exec, Python batch) without explicit approval

### Token-saving habits
- Direct answers > chain-of-thought narration
- Skip "Let me think..." preambles
- One clear action per response for iterative work
- Use `/compact` at logical phase boundaries
- Use `/review` before committing
- Use `/scope` to re-orient after returning

### Model Selection (cost optimization — added 2026-07-07)
**Default session model**: `claude-opus-4-7` (settings.local.json). When to switch with `/model <name>`:

| Task type | Use model | Reason |
|-----------|-----------|--------|
| Multi-file bug root cause analysis (>2 files, multi-reducer) | **`opus-4-8`** | Best reasoning, edge-case detection |
| Architecture planning / refactor across modules | **`opus-4-8`** | Avoids hallucination, sees long-term deps |
| Grep / Read / Scope / single-file Edit | `sonnet-4-6` | 5x cheaper, similar accuracy for routine work |
| Lesson.md / docs / commit messages | `sonnet-4-6` | Fast enough, no deep reasoning needed |
| Content lint fixes / refactor (no logic change) | `sonnet-4-6` | Mechanical transforms |
| Long sequential grep sessions (50+ tool calls) | `sonnet-4-6` | Cost adds up |
| Quick questions / yes-no / clarification | `haiku-4-6` | Cheapest, fast |

**Rule of thumb**: Default = Opus 4.7. If task feels routine (read/grep/single edit) → switch to Sonnet via `/model sonnet-4-6` BEFORE starting. If you find yourself retrying the same logic task >3 times → upgrade to Opus 4.8 immediately.

**Don't**: Bắt Opus làm grep 50 lần liên tiếp. Chi phí tăng nhanh hơn giá trị.

### Lazy Loading (token-optimized reads — added 2026-07-05)
- **Read with `offset` + `limit`** when you only need a section — never `Read` a >500-line file in full if you know the range
- **Grep first, Read second** — `grep -n "symbol"` to find the line, then `Read` with `offset` to that region only
- **For weekly audit tasks** (W1-W35): scan via `grep` patterns across multiple files in parallel, then Read only the files that matched
- **Skip re-Reading files in the same session** — Claude Code caches file state after Edit/Write
- **Bulk file enumeration**: use `Bash(ls)` or `Glob` patterns, never `Read` directory listings
- **Examples of OK vs. NOT OK**:
  - ✅ `Read(file, offset=240, limit=20)` — read 1 section
  - ❌ `Read(file)` on a 1000-line `dictionary.json`
  - ✅ `grep -rn "shadowing" src/modules/` then Read only matching files
  - ❌ `Read(src/modules/shadowing/*.jsx)` — reads ALL files in directory

### Ripgrep + Fetch Workflow (search + web docs without context bloat — added 2026-07-05)

**Built-in tools, NOT MCP wrappers** (rationale: Claude Code's `Grep` IS ripgrep 14.1.1, and `WebFetch`/`WebSearch` cover all fetch needs — adding MCP wrappers is duplicate capability + extra attack surface).

**Grep tool (= ripgrep under the hood)** — use for code search:

```bash
# Find a symbol across 14 modules in one shot
Grep pattern="useShadowingChallenge" path="src/" output_mode="files_with_matches"

# Get exact line numbers, then Read with offset
Grep pattern="getActualSegmentDuration" path="src/hooks/" -n=true output_mode="content"

# Audit W1-W35 for a specific pattern
Grep pattern="\*\*[^*]+\*\*" path="src/data/weeks/" -n=true glob="week_{01..35}*/read.js"

# Exclude noise (node_modules, dist, public)
Grep pattern="TODO" path="src/" type="js" -n=true
```

**WebFetch** — single URL, summarize via prompt:

```
# Pull latest Supabase JS SDK signature for a method
WebFetch url="https://supabase.com/docs/reference/javascript/auth-signinwithpassword"
       prompt="Extract the current signature, return type, and any breaking changes since v2.106"

# Check Playwright 1.59 release notes
WebFetch url="https://playwright.dev/docs/release-notes"
       prompt="List API changes between Playwright 1.55 and 1.59 — focus on test, expect, locator APIs"
```

**WebSearch** — multi-source discovery:

```
# Find new AI provider (Cerebras / Groq / Together / Gemini)
WebSearch query="Cerebras inference API 2026 chat completions endpoint site:docs.cerebras.ai"
```

**Decision matrix — which tool when?**

| Task | Tool | Why |
|------|------|-----|
| Find symbol in repo | `Grep` | Ripgrep 14.1.1, sub-second on 14 modules |
| Find file by path/name | `Glob` | Pattern-match, returns paths only |
| Read single file section | `Read(offset, limit)` | Lazy load only the slice you need |
| Read 1 URL page | `WebFetch` | Summarized by LLM, returns ~200 tokens vs full page |
| Research across many sources | `WebSearch` | Multi-source synthesis |
| Read >1 file at once | `Grep` (content mode) + parallel `Read(offset, limit)` | One grep returns line numbers, parallel Reads are cheap |

**Anti-patterns** (token waste):

- ❌ `Read(file)` on `dictionary.json` (5MB JSON → context overflow)
- ❌ `WebFetch` on docs to read whole page manually → ask the LLM to extract the specific signature/prompt
- ❌ Multiple separate `Grep` calls with overlapping patterns → consolidate into 1 call with regex alternation
- ❌ `Read(src/modules/*.jsx)` directory glob → always Read individual paths

**Combined workflow example — debugging W14 shadowing bug:**

1. `Grep pattern="week_14|shadowing" path="src/data/" output_mode="files_with_matches"` → 3 files
2. Parallel: `Read(W14/shadowing.js, offset=1, limit=50)` + `Read(useShadowingChallenge.js, offset=240, limit=30)`
3. `WebSearch query="Playwright 1.59 locator chain timeout"` → 1 result
4. Apply fix, `Read(W14/shadowing.js, offset=80, limit=10)` to verify before commit

Total context used: ~600 tokens vs ~3000 if done with full Reads.

### Dangerous operations (always confirm first)
- `git reset --hard`, `git push --force`
- `rm -rf` on broad paths
- SQL `DROP`/`TRUNCATE`/`DELETE` without `WHERE`
- Broad `sed` replacements

### Context management
- Compact at ~300 tool calls via `/compact`
- Start a fresh session if context gets stale
- Commit work before resetting: `git add -A && git commit`
- Save decisions to `.claude-memory/` before resetting
- After schema/template/UI/station/AI-Tutor changes: run `/update-toolkit --apply` to sync toolkit

### Output Discipline (token-saving)
- Keep responses concise during iterative work
- Avoid repeating already-known information or restating task context
- Prefer short execution updates over verbose explanations
- Prefer diffs over long before/after comparisons
- Avoid verbose reasoning unless explicitly requested
- Do not narrate internal thinking unless asked

### Chunk/Collocation content philosophy (W1-W156) — CHUNK-FIRST ENFORCEMENT (May 22, 2026)
- **Single-word bolds = 0 allowed** (ALL weeks W1-156) — enforced by CHECK 20c
- **W28+**: embed ≥10 multi-word chunks per passage, 1-3 per sentence (Cambridge Flyers focus)
- **Bold pattern**: ✅ `**ran down** the hill` | ❌ `**ran** down the hill` | ❌ `ran down **the** hill`
- Chunks are the primary teaching unit; single words are dictionary lookups
- content_vi: **no bold** — Vietnamese text should not trigger dictionary popups
- Multi-word bold chunks MUST have dictionary entries (add to `src/data/dictionary.json`)
- After clicking a bold chunk → must show meaning, not "Chưa có trong từ điển"
- dictation/shadowing: select chunk-rich sentences from read.js (W28+: 10-12 ADV / 8-10 Easy)
- AI Tutor (`week_XX_real.js`): `chunk_focus[]` must list 3-5 key collocations from read.js
- AI Tutor empathy: NEVER say "Great!" after a student describes an injury/negative event; use "I am sorry" or "That sounds painful/scary"
- **Verification**: `bash production_kit/tools/code_quality_gate.sh N | grep "20c"` — must pass before commit
- **Enforcement**: CHECK 20c wired into `AGENT_SELF_CHECK_WORKFLOW.md` Validation Gate 1 (mandatory stop)

---

## ✅ Mandatory Pre-Report Checklist

**MỌI task đều phải qua checklist này TRƯỚC KHI báo cáo "done" hoặc "clean". KHÔNG ĐƯỢC hallucinate hoàn thành.**

### Week Production (tạo tuần mới)
- [ ] Đọc Syllabus cho Week N (grammar, vocab, story content)
- [ ] Tạo đủ 16 files (hoặc 15) theo week trước
- [ ] `bash production_kit/tools/bug_prevention_check.sh N` → PASS
- [ ] `bash production_kit/tools/code_quality_gate.sh N` → PASS
- [ ] `npm run content:lint -- --week N --errors-only` → PASS
- [ ] `npm run build` → PASS
- [ ] Commit

### Story Mission Audit (Wxx-Wyy)
- [ ] Đọc đầy đủ TẤT CẢ missions trong TẤT CẢ tuần (từng file, từng dòng)
- [ ] Với MỖI mission: check `opening_narrative`, `backstory`, TẤT CẢ `phase_questions`
- [ ] Với MỖI question: check circularity (2 câu hỏi liên tiếp cùng topic/verb)
- [ ] Với MỖI question: check inconsistency (tên nhân vật, địa điểm thay đổi)
- [ ] `grep -rn "supermarket" src/data/weeks/week_NN/` → verify (expect: 0 trong story_arc text)
- [ ] `grep -c "story_character:" src/data/weeks/week_NN/week_NN_real.js` → expect: 0 (xóa hết story_character)
- [ ] Sửa TẤT CẢ issues tìm được
- [ ] `npm run build` → PASS
- [ ] Commit

### Spark Talk / AI Tutor Data (Wxx-Wyy)
- [ ] Đọc TẤT CẢ sparks trong TẤT CẢ tuần
- [ ] Với MỖI spark: verify số `frames` ≥ 8 và TẤT CẢ frames có `hint_en`
- [ ] Verify `turns` count matches frame count
- [ ] Check story theme consistency (opening/theme/story_text khớp nhau)
- [ ] `npm run build` → PASS
- [ ] Commit

### Writing Station (Wxx-Wyy)
- [ ] ADV: `min_words` = 45, Easy: `min_words` = 30
- [ ] ADV: 8 sentence frames (Easy: 6-7)
- [ ] ADV: each frame has `template` + `answers[]`; Easy: `template` + `blank_labels[]`
- [ ] ADV: 1-4 blanks/frame; Easy: 2-3 blanks/frame
- [ ] `hints.vocabulary_bank`, `scaffolding_stage`, `show_by_default` present

### Read.js Content (Wxx)
- [ ] Chunks/collocations tự nhiên: KHÔNG gượng ép adj+profession ("kind chef", "nice scientist", "friendly artist" → dùng "good cook", "engineer", "artist")
- [ ] KHÔNG doubled modifiers ("tall trees tall trees", "wooden wooden bridge")
- [ ] KHÔNG orphan chunks (chunk bold nhưng câu không hỗ trợ ngữ pháp)
- [ ] KHÔNG lặp cùng chunk/adverb >3 lần trong cùng passage
- [ ] KHÔNG circular topic (cùng cụm từ lặp lại ở 2 câu liên tiếp)
- [ ] `shadowing.js` + `dictation.js` phải khớp với `read.js` content_en
- [ ] Build CHECK 20e: `bash production_kit/tools/code_quality_gate.sh N | grep "20e"`

### Bug Fix
- [ ] Đọc code/file chứa bug — HIỂU bug trước khi fix
- [ ] Fix → show diff
- [ ] `npm run build` → PASS
- [ ] Commit

### Chính tắc verification
1. **Đọc file chứa issue** — không suy đoán từ memory
2. **Chạy command thực tế** — không "assume" nó pass
3. **Show actual output** — phải thấy dòng PASS/FAIL
4. **Chỉ mark [DONE]** khi output thực tế chứng minh pass
5. **Commit sau cùng** — không báo cáo rồi quên commit
