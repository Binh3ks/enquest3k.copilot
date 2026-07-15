# RUNTIME ARCHITECTURE — Complete Runtime System for EngQuest

> **Version:** 1.0 — 2026-07-14
> **Status:** FROZEN
> **Owner:** Runtime Architecture Lead

---

## 0. Architectural Principles

1. **One responsibility per Runtime.** Each Runtime owns exactly one concern. No overlap allowed.
2. **Runtime is independent of Blueprint version.** Runtime may not hardcode Blueprint assumptions.
3. **Spec is downstream of Runtime.** Spec captures current state; Runtime defines the process.
4. **Agent is downstream of Spec.** Agent uses Spec to perform tasks.
5. **Production is downstream of Agent.** Agent executes against production data.
6. **Every Runtime has a documented loading order.** See `RUNTIME_LOADING_ORDER.md`.
7. **Every Runtime has a self-evolution path.** See `RUNTIME_EVOLUTION.md`.
8. **No Runtime may directly modify production code.** Agent must mediate.

---

## 1. CORE RUNTIME

### Owns
- Path conventions (`src/data/weeks/week_NN/`, `src/data/weeks_easy/week_NN/`)
- File naming (`vocab.js`, `grammar.js`, `read.js`, etc.)
- Export patterns (`export default {...}` for data; named exports only for special cases)
- Hard rules (`.ai/never_rules/PRODUCTION_NEVER_RULES.md` first 15 sections; read first)
- File structure invariants (no Python-generated .js files; no nested data/ folders)

### Does NOT own
- Workflow steps
- Content authoring
- Validation rules (delegated to VALIDATION Runtime)

### Contract
- Defines "what a runtime file looks like" — every other Runtime depends on this
- First Runtime to load (Phase 1 of `RUNTIME_LOADING_ORDER.md`)

### Key files
- `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` (50+ hard rules)
- `.ai/architecture/REPOSITORY_MAP.md` (file inventory)

---

## 2. PRODUCTION RUNTIME

### Owns
- 11-step week production workflow (BƯỚC -1 → 11)
- Golden standard cloning strategy (W6 → W16 → W36)
- Checkpoint system (CP0-CP9)
- Subagent orchestration (content-writer → quality-reviewer)
- Session state schema (`.ai/memory/CURRENT.md`)
- Resume-safe image pipeline state
- 3-cycle error recovery max rule
- Per-station progress schema (`useStationProgress`)

### Does NOT own
- Station content (delegated to LANGUAGE Runtime)
- Media generation (delegated to MEDIA Runtime)
- Validation rules (delegated to VALIDATION Runtime)

### Contract
- Defines "how a week is produced" — every production Agent must follow this
- Entry point: `.claude/skills/week-builder/SKILL.md`

### Key files
- `.claude/skills/week-builder/SKILL.md` (canonical 11-step workflow)
- `.claude/skills/week-pipeline/SKILL.md` (subagent orchestration)
- `.ai/agents/week-production/*.md` (10 runtime docs: ROLE, CONTEXT, PROCESS, etc.)
- `.claude/agents/content-writer.md` (Sonnet subagent)
- `.claude/agents/quality-reviewer.md` (validation subagent)
- `production_kit/reference/W35_SUB_TAB_LAUNCH_GUIDE.md` (W35 sub-tab plan)
- `production_kit/reference/W40_DEBATE_LAUNCH_GUIDE.md` (W40 debate plan)

---

## 3. LANGUAGE RUNTIME

### Owns
- All 7 Language Core station schemas (vocab, word match, grammar, dictation, shadowing, word power, writing)
- Station runtime behavior (component contract, state machine, validation integration)
- Cross-station dependencies (read.js is source of truth; vocab cascades to 6+ stations)
- Authoring rules (chunk-first, no single-word bolds, no forced chunks)
- Media classification per station (NO MEDIA / PROMPT Only / Auto Generated / External Search)
- W35 + W36 schema drift documentation
- Field aliasing rules (e.g., `definition_vi` OR `meaning_vi`)
- Future station extension points

### Does NOT own
- Read/Explore station (separate, under "Read" subsystem per ARCHITECTURE)
- Logic Lab / Singapore Math / Social Quiz (separate, under LOGIC_LAB_SPEC)
- AI Tutor (separate, under AI Tutor subsystem)
- Mindmap, Ask AI, Daily Watch, Word Match game variant (separate subsystems)
- Media generation (delegated to MEDIA Runtime)
- Validation rules (delegated to VALIDATION Runtime)

### Contract
- Defines "what a Language Core station is and how it behaves"
- Entry point: `.ai/specs/LANGUAGE_CORE_SPEC.md`
- Spec version: 1.0 (must bump on each Blueprint evolution)

### Key files
- `.ai/specs/LANGUAGE_CORE_SPEC.md` (canonical Language Core spec)
- `.ai/specs/LOGIC_LAB_SPEC.md` (out of Language scope but adjacent)
- `src/modules/{vocab,match,grammar,dictation,shadowing,power,write_speak}/*`
- `src/data/weeks/week_NN/{vocab,word_match,grammar,dictation,shadowing,shadowing_ipa,word_power,writing}.js`
- `src/data/weeks_easy/week_NN/{same files}`

---

## 4. MEDIA RUNTIME

### Owns
- Image prompt generation (Agent writes prompts; Human creates images — see Architectural Decision #1)
- Audio generation (TTS via Deepgram Worker + R2 cache)
- Video discovery (YouTube Data API + 60-channel whitelist)
- Shadowing transcript pipeline (3-stage: fetch → clean → split)
- Per-asset classification (NO MEDIA / PROMPT ONLY / AUTO GENERATED / EXTERNAL SEARCH)
- Text-hash change detector for audio (NOT a cache — see Architectural Decision #2)
- Daily Watch ranking algorithm (whitelist bonus + grammar/topic/speech/age — see Architectural Decision #3)
- Image pipeline orchestrator state
- Bar model generation (Singapore Math)

### Does NOT own
- Content authoring (delegated to LANGUAGE Runtime)
- Validation rules (delegated to VALIDATION Runtime)

### Contract
- Defines "how every media asset is generated, stored, and refreshed"
- Entry point: `tools/` (200+ scripts, use name search)
- Critical scripts:
  - `tools/image_pipeline/orchestrator.mjs`
  - `tools/generate_audio_deepgram.py`
  - `tools/update_videos.js`
  - `tools/fetch_video_transcripts.js`
  - `tools/clean_transcripts.mjs`
  - `tools/split_transcripts.py`
  - `tools/curate_shadowing_videos.js`
  - `tools/generate_logiclab_barmodels.py`

### Critical Architectural Decisions

#### Decision #1: Image Pipeline
- **No automatic image generation.**
- Runtime generates **prompts only** (string written to `image_prompt` field or `Production_FINAL/IMAGE PROMPTS/week_NN_image_prompts.txt`).
- **Human creates images** (out-of-band, via external tool like Midjourney, DALL-E, or hand-draw).
- Agent NEVER calls image generation API directly.
- The `image_url` field in data files points to where the human-uploaded image lives (typically R2 bucket `engquest-images`).

#### Decision #2: TTS text-hash as change detector
- The `tts_manifest.json` text-hash is **NOT a cache** in the traditional sense.
- It is a **change detector**:
  - If text content changes → hash changes → regenerate audio.
  - If text content is identical → hash matches → skip regeneration.
- This means:
  - W1-W15 may have stale audio if their `text` was edited without regenerating.
  - W16+ uses on-demand Deepgram Worker; text-hash is used to gate "regenerate or serve cache" decisions.
- Implication: every text edit must be paired with audio re-generation step in workflow.

#### Decision #3: Daily Watch YouTube ranking
- **Search YouTube** via Data API.
- **Rank candidates** by combined score:
  1. Whitelist channel bonus (60 hardcoded ESL kids channels)
  2. Grammar relevance (verb tense, modal verbs match week's focus)
  3. Topic relevance (keyword match against weekly theme)
  4. Speech clarity (audio quality heuristic)
  5. Age suitability (target age range A1-B1+)
- **Final selection**: top 5 videos.
- Validator: `node tools/validate_video_thumbnails.js N` (checks HTTP 200 for all 5 thumbnails).

---

## 5. REPAIR RUNTIME

### Owns
- Shadowing transcript repair pipeline (W1-W35)
- IPA repair (stress=0 for function words, US→UK conversion)
- Sentence alignment repair (verbatim check against read.js)
- Karaoke timing validation (FAST_RATE = 0.4s/word)
- Highlight validation (rAF 60fps loop, ±0.1s tolerance)
- YouTube transcript cleanup (ASR regex set)

### Does NOT own
- New shadowing transcript generation (delegated to MEDIA Runtime)
- New week content (delegated to PRODUCTION Runtime)
- **MUST remain SEPARATE from PRODUCTION Runtime** (see Architectural Decision #4)

### Contract
- Defines "how broken shadowing artifacts are detected and fixed"
- Entry point: `.ai/runtime/SHADOWING_REPAIR_RUNTIME.md` (90KB existing doc)
- Repair scope: W1-W35 only (W36+ should not need repair)

### Critical Architectural Decision

#### Decision #4: Repair Runtime and Production Runtime MUST remain separate
- **Why**: Repair is a one-time activity for W1-W35. Production is ongoing for W36+. Mixing them creates confusion:
  - Repair scripts would interfere with production
  - Repair operations are not idempotent (re-running may break things)
  - Production must be audit-trail clean
- **How**:
  - Repair scripts live in `tools/` with `_repair_` or `_fix_` prefix
  - Production scripts are unchanged
  - Repair operations are scheduled as separate "sprints" (W1-W15 batch, W16-W25 batch, W26-W35 batch)
  - Repair results are validated before being committed to production

### Key files
- `.ai/runtime/SHADOWING_REPAIR_RUNTIME.md` (canonical repair spec)
- `tools/migrate_shadowing.mjs` (legacy migration)
- `tools/clean_transcripts.mjs` (ASR cleanup)
- `tools/curate_shadowing_videos.js` (video curation)

---

## 6. SECURITY RUNTIME

### Owns
- Secret management (`.env` files, never committed)
- R2 bucket access (engquest-audio, engquest-images)
- Cloudflare Worker auth (TTS Worker, corrections API)
- LLM provider keys (Cerebras, Groq, Together, Gemini)
- YouTube Data API key
- Deepgram API key
- R2 CORS configuration
- Path protection (no editing `public/_redirects`, `public/_headers`, `vite.config.js`)

### Does NOT own
- Content moderation (delegated to AI Tutor)
- Access control (delegated to app layer)

### Contract
- Defines "what credentials exist and how they are used"
- Entry point: `production_kit/tools/preflight_check.sh` (6 system checks)
- All credentials stored in `.env` (NEVER in version control)
- Worker URLs configurable via `VITE_*` env vars

### Key files
- `.env.example`, `.env.production`, `.env.tts.example`
- `production_kit/tools/preflight_check.sh`

---

## 7. VALIDATION RUNTIME

### Owns
- All 7 production validators (preflight, bug_prevention, code_quality_gate, sgmath_types, barmodels, thumbnails, content_lint, dict_lint)
- 80+ validation checks (CHECK 1-46 + 20b-20i + 19.5 + 24b-24e + B5-B25)
- Pass/fail criteria per check
- Validator execution order
- Validation pipeline orchestration
- BLOCKER detection (never_rule violations)
- SHIP / FIX-THEN-SHIP / BLOCKER decision logic

### Does NOT own
- Content authoring (delegated to LANGUAGE Runtime)
- Production workflow steps (delegated to PRODUCTION Runtime)
- Validator scripts (delegated to MEDIA Runtime for media-specific checks)

### Contract
- Defines "what passes and what fails for a week to ship"
- Entry point: `.claude/skills/content-check/SKILL.md`
- Decision tree:
  - **SHIP** — all 7 PASS (SKIP valid for missing data files) → commit
  - **FIX-THEN-SHIP** — some FAIL → fix → re-run only failing validator (max 3 cycles)
  - **BLOCKER** — hard rule violation → stop immediately, surface to user

### Key files
- `production_kit/tools/preflight_check.sh` (6 checks)
- `production_kit/tools/bug_prevention_check.sh` (13 patterns)
- `production_kit/tools/code_quality_gate.sh` (48+ checks)
- `production_kit/tools/validate_sgmath_types.mjs` (5 valid types)
- `tools/validate_barmodels.js`
- `tools/validate_video_thumbnails.js`
- `tools/content_lint.mjs`
- `tools/dict_lint.mjs`
- `.claude/skills/content-check/SKILL.md` (orchestration)

---

## 8. EVOLUTION RUNTIME

### Owns
- Blueprint evolution process (when Blueprint V6 ships, how to update Runtime)
- Gap analysis process (Runtime vs new Blueprint)
- Schema migration (W1-W35 → W36 canonical → W37+ canonical)
- Versioning (Runtime, Spec, Agent, Validator, Workflow)
- Cross-Runtime change propagation
- Future Runtime creation (when no existing Runtime fits)

### Does NOT own
- Specific Runtime implementations (delegated to each Runtime's owner)
- Blueprint content (delegated to Curriculum Lead)

### Contract
- Defines "how the entire Runtime Architecture evolves when Blueprint or requirements change"
- Entry point: `.ai/runtime/RUNTIME_EVOLUTION.md`
- Trigger conditions: Blueprint version bump, new station added, new validator added, new media pipeline added, schema drift detected

### Key files
- `.ai/runtime/RUNTIME_EVOLUTION.md` (this version)
- `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` (Blueprint)

---

## 9. RUNTIME INTERACTION MAP

```
CORE ──────► defines path/file rules for ──────► all other Runtimes
                                                       │
PRODUCTION ─► uses CORE paths ─► orchestrates ─► PRODUCTION agents
                       │
LANGUAGE ─► defines content for ─► PRODUCTION agents
                       │
MEDIA ─────► generates media for ─► PRODUCTION + LANGUAGE
                       │
REPAIR ─────► fixes W1-W35 only ─► must not interact with PRODUCTION
                       │
SECURITY ───► provides credentials to ─► MEDIA + PRODUCTION + LANGUAGE
                       │
VALIDATION ─► validates output of ─► PRODUCTION + LANGUAGE + MEDIA + REPAIR
                       │
EVOLUTION ───► updates ─► all Runtimes when Blueprint changes
```

---

## 10. NO OVERLAP DECLARATION

| Concern | Owned by | NOT owned by |
|---|---|---|
| Path conventions | CORE | (no other Runtime defines paths) |
| File structure | CORE | (no other Runtime) |
| 11-step workflow | PRODUCTION | (no other Runtime) |
| Checkpoint system | PRODUCTION | (no other Runtime) |
| Station schemas | LANGUAGE | (PRODUCTION only knows the file exists, not its schema) |
| Station runtime code | LANGUAGE | (PRODUCTION only orchestrates) |
| Image generation | MEDIA | (LANGUAGE knows what images are needed; MEDIA knows how to generate) |
| Audio generation | MEDIA | (same as images) |
| Video discovery | MEDIA | (LANGUAGE knows what topics; MEDIA searches) |
| Transcript pipeline | MEDIA | (LANGUAGE knows what sentences; MEDIA fetches) |
| Shadowing repair | REPAIR | (PRODUCTION generates new; REPAIR fixes old) |
| Validation rules | VALIDATION | (PRODUCTION runs the workflow; VALIDATION defines pass/fail) |
| Credential management | SECURITY | (no other Runtime) |
| Version migration | EVOLUTION | (no other Runtime) |
| Schema migration | EVOLUTION | (no other Runtime) |
| Future Runtime creation | EVOLUTION | (no other Runtime) |

---

## 11. SUMMARY TABLE

| Runtime | Owns | Entrypoint | Owner | When updated |
|---|---|---|---|---|
| **CORE** | Paths, files, hard rules | `.ai/architecture/REPOSITORY_MAP.md` + `PRODUCTION_NEVER_RULES.md` | Runtime Architect | When new hard rules are added |
| **PRODUCTION** | Week production workflow | `.claude/skills/week-builder/SKILL.md` | Production Lead | When workflow changes |
| **LANGUAGE** | 7 Language Core station specs | `.ai/specs/LANGUAGE_CORE_SPEC.md` | Language Architect | When stations change |
| **MEDIA** | Image/audio/video/transcript generation | `tools/` (name search) | Media Architect | When pipelines change |
| **REPAIR** | Shadowing transcript repair | `.ai/runtime/SHADOWING_REPAIR_RUNTIME.md` | Repair Architect | When repair scripts change |
| **SECURITY** | Credentials, secrets, R2, API keys | `production_kit/tools/preflight_check.sh` | DevOps | When keys rotate |
| **VALIDATION** | 80+ checks, pass/fail logic | `.claude/skills/content-check/SKILL.md` | QA Lead | When validators change |
| **EVOLUTION** | Blueprint → Runtime update process | `.ai/runtime/RUNTIME_EVOLUTION.md` | Runtime Architect | When Blueprint changes |

---

*Version: 1.0 — Frozen 2026-07-14*

---

## 12. VALIDATION RUNTIME — Educational Quality Checks (ADDENDUM v1.1)

> **Added:** 2026-07-14 — Final gap analysis
> **Status:** FROZEN — additive only

### 12.1 New Educational Validators (to be implemented)

| Check | What it validates | Severity | Source |
|---|---|---|---|
| **CHECK 47** | CEFR word-count range (from content_lint E1, now in quality gate) | 🔴 BLOCKER | content_lint.mjs E1 |
| **CHECK 48** | Grammar progression (week's grammar_focus matches allowed structures) | 🔴 BLOCKER | Blueprint §Grammar Progression |
| **CHECK 49** | Vocabulary load per passage (≤3 new words per sentence in read.js) | 🟡 WARNING | LANGUAGE §12.3 |
| **CHECK 50** | Sentence length per CEFR level (A1 ≤12 words, A2 ≤15, B1 ≤20) | 🟡 WARNING | LANGUAGE §12.4 |
| **CHECK 51** | IPA coverage (≥50% of shadowing sentences have shadowing_ipa.js entries) | 🟡 WARNING | LANGUAGE §12.11 |
| **CHECK 52** | Cross-station regeneration (dictation + shadowing content_en match read.js) | 🔴 BLOCKER | CHECK 42 (already exists) |

### 12.2 Decision Tree

```
Agent produces week
  ↓
Run existing validators (7 validators, 80+ checks)
  ↓
Also run new educational validators (CHECK 47-52)
  ↓
All PASS (or valid SKIP) → SHIP
Some FAIL → FIX-THEN-SHIP (max 3 cycles)
BLOCKER → STOP
```

### 12.3 How educational checks differ from technical checks

- **Technical checks:** schema, field presence, file existence, exact counts
- **Educational checks:** CEFR appropriateness, grammar progression, vocab load, sentence length, IPA coverage, cross-station consistency

**Educational checks are NOT yet implemented in validators.** They are documented here as requirements for the Runtime. When VALIDATION Runtime is updated, these checks will be added to `code_quality_gate.sh`.

---

*Version: 1.1 — 2026-07-14 (additive update)*

---

## 13. MEDIA RUNTIME — Media Lifecycle Specification (ADDENDUM v1.1)

> **Added:** 2026-07-14 — Final gap analysis
> **Status:** FROZEN — additive only

### 13.1 Media Lifecycle (per asset type)

| Stage | Description | Owner |
|---|---|---|
| **Prompt** | Human/Agent writes the prompt | LANGUAGE Runtime (defines what) + Agent (writes) |
| **Generation** | Prompt → media asset (image, audio, video) | MEDIA Runtime (orchestrator, TTS, YouTube API) |
| **Approval** | Human reviews asset (image, video) | PO + Production Lead |
| **Storage** | Asset uploaded to R2 bucket | MEDIA Runtime (orchestrator) |
| **Versioning** | Asset path includes version (`_v1.jpg`) | MEDIA Runtime |
| **Replacement** | Old asset replaced when new one generated | MEDIA Runtime |
| **Deprecation** | Old asset removed from R2 after replacement | MEDIA Runtime + Production Lead |

### 13.2 Asset Type Ownership

| Asset Type | Source | Storage | Lifecycle |
|---|---|---|---|
| Vocab images | Human (via prompt) | R2 `engquest-images/vocab/...` | Prompt → Generate → Upload → Replace on regen |
| Word Power images | Human (via prompt) | R2 `engquest-images/wordpower/...` | Same |
| Read cover images | Human (via prompt) | R2 `engquest-images/read/...` | Same |
| Explore cover images | Human (via prompt) | R2 `engquest-images/explore/...` | Same |
| Writing story images | Human (via prompt) | R2 `engquest-images/writing/...` | Same |
| Bar model images | Auto (Python script) | R2 `engquest-images/barmodels/...` | Generate → Upload → Never replace |
| Daily Watch videos | External (YouTube API) | YouTube embed (not hosted) | Search → Validate thumbnail → Use |
| Shadowing transcripts | External + Auto (3-stage) | `video_transcripts_by_id/{cleaned,sentences,raw}/*.json` | Fetch → Clean → Split |
| Audio (TTS) | Auto (Deepgram Worker) | R2 `engquest-audio/audio/weekN/...` | On-demand → Cache |
| IPA | Manual + Auto (CMU dict) | `shadowing_ipa.js` (manual) + runtime (CMU) | Manual first, CMU fallback |

### 13.3 Prompt Asset Specification (canonical)

**Location:** `production_kit/prompts/week_NN/`

**Files:**
```
week_NN_image_prompts.txt        # vocab + wordpower + covers
week_NN_writing_prompts.txt      # writing picture_mode
week_NN_social_prompts.txt       # social_quiz (if map_visual needed)
```

**Format:**
```
Filename: vocab_submarine.jpg
Prompt: A watercolor illustration of a submarine exploring the deep ocean, with a child looking through the porthole. Soft blue tones, friendly cartoon style, no text on image.
Style: watercolor children book illustration

Filename: wordpower_protect_planet.jpg
Prompt: ...
```

**Owner:** MEDIA Runtime owns the file format and location. LANGUAGE Runtime documents what prompts are needed per station.

### 13.4 Image Pipeline Workflow (Decision #1 reinforcement)

1. Agent writes prompt → `production_kit/prompts/week_NN_image_prompts.txt`
2. Human creates image externally (Midjourney, DALL-E, etc.)
3. Human uploads image to R2 (or Agent via orchestrator)
4. Agent updates `image_url` field in data files
5. VALIDATION Runtime validates image exists on disk (CHECK 32)

**Agent NEVER calls image generation API directly.** This is Decision #1 — hard rule.

### 13.5 Audio Pipeline Workflow (Decision #2 reinforcement)

1. Agent authors text in `read.js` / `dictation.js` / `shadowing.js`
2. TTS text-hash is computed (SHA-256 of normalized text)
3. Hash stored in `tts_manifest.json` as change detector
4. First user play → Deepgram Worker checks hash
5. If hash matches → serve from R2 cache
6. If hash differs (text changed) → regenerate via Deepgram Aura-2
7. Update hash in manifest

**Text-hash is NOT a cache.** It is a change detector. Every text edit MUST trigger a hash check.

### 13.6 Video Pipeline Workflow (Decision #3 reinforcement)

1. Agent authors `video_queries.json` (priority_search + backup_search)
2. `node tools/update_videos.js N --reset` calls YouTube Data API
3. Candidates ranked by:
   - Whitelist channel bonus (60 channels hardcoded in `update_videos.js`)
   - Grammar relevance (verb tense, modal verbs match)
   - Topic relevance (keyword match)
   - Speech clarity (audio quality heuristic)
   - Age suitability (A1-B1+)
4. Top 5 videos selected
5. `node tools/validate_video_thumbnails.js N` validates all 5 thumbnails (HTTP 200)
6. Output written to `daily_watch.js`

### 13.7 Bar Model Workflow

1. `python3 tools/generate_logiclab_barmodels.py N --skip-existing`
2. Reads `singapore_math.js` problem data
3. Generates SVG/PNG per problem (5 problems × 2 modes = 10 images)
4. Naming: `barmodel_w{NN}_{mode}_p{n}_v1.jpg`
5. `node tools/validate_barmodels.js N` validates paths + file existence
6. R2 upload via `python3 tools/upload_week_images_r2.py N`

---

*Version: 1.1 — 2026-07-14 (additive update)*
