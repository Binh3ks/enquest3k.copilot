# Canonical Production Pipeline — EngQuest3K
> Software archaeology report. As of 2026-07-13. W36 deployed.

---

# Executive Summary

The repository contains **4 production workflows** at different stages of obsolescence. Exactly **1 is authoritative** for current W36+ production.

| Workflow | Location | Status | Used by |
|---|---|---|---|
| AGENT_SELF_CHECK_WORKFLOW | `production_kit/workflow/` | ⚠️ **Partially Obsolete** | legacy agent sessions |
| STANDARD_WEEK_CREATION_WORKFLOW | `production_kit/workflow/` | ⚠️ **Partially Obsolete** | week-builder skill |
| WEEK_PRODUCTION_PROMPT_V3 | `Production_FINAL/` | ❌ **Deprecated** | none (archived) |
| week-builder SKILL | `.claude/skills/week-builder/` | ✅ **Active / Authoritative** | Claude Code |

**The canonical pipeline is the `week-builder` SKILL.** It is the only document that reflects:
- W36 dual-tab schema
- On-demand audio (no batch step)
- 19 files per mode
- Image pipeline with orchestrator
- Social Quiz (W36)

All other workflows contain stale references to W16, batch audio, 17 files, and older schemas.

---

# Workflow Comparison Matrix

## 1. AGENT_SELF_CHECK_WORKFLOW.md
- **Location**: `production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md`
- **Created**: ~March 10, 2026 (internal header)
- **Size**: 1,943 lines
- **Purpose**: Full 11-step production workflow with anti-hallucination pledge, mandatory file verification protocol, pre-flight checklist
- **Current usage**: Referenced in `preflight_check.sh` output; referenced in `CLAUDE.md` §Production Workflow
- **Active maintenance**: No (last updated ~May 2026)
- **Stale references**: BƯỚC 6 batch audio (DEPRECATED), 17 files (should be 19), W16 golden standard (now W36)
- **Golden standard cited**: W6 (W1-15) + W16 (W16+)
- **Key obsolete rule**: `bash production_kit/tools/code_quality_gate.sh N` CHECK 20c "wired into Workflow Validation Gate 1" — but gate name changed
- **Dependencies**: Syllabus, Blueprint §VII.b, Week 6/7 golden standards
- **Validator chain**: preflight → bug_prevention → code_quality_gate → sgmath_types

## 2. STANDARD_WEEK_CREATION_WORKFLOW.md
- **Location**: `production_kit/workflow/`
- **Created**: ~May 30, 2026 (version 5.0 header)
- **Size**: ~500+ lines
- **Purpose**: Standard SOP with lessons from W30-35
- **Current usage**: Referenced by `week-builder` SKILL as supplementary context
- **Active maintenance**: No
- **Stale references**: W34 golden standard (should be W36), 17 files (should be 19), batch audio step, `week_34_real.js` template
- **Golden standard cited**: W34 (W16+) + W6 (W1-15)
- **Key value**: W30-35 lessons learned (7 bugs), chunk/collation rules, W36 audit tool references
- **Dependencies**: `audit_w1_w35_3tier.py`, `audit_false_chunks.py`, `fix_false_chunks.py`

## 3. WEEK_PRODUCTION_PROMPT_V3.md
- **Location**: `Production_FINAL/1. WEEK_PRODUCTION_PROMPT_V3.md`
- **Created**: V5.3 — March 3, 2026
- **Size**: ~1,500+ lines
- **Purpose**: Mass production prompt for new agents (Vietnamese-language, step-by-step)
- **Current usage**: Referenced in `.claude/settings.json` mainPrompt (stale reference)
- **Active maintenance**: ❌ **Deprecated**
- **Stale references**: Deepgram-only strategy (outdated), Card Mode skipAI architecture (changed), 10-12 turn limit (now ≥8 sparks), W7 AI Tutor golden standard, Kokoro TTS removal (obsolete), Conversation Card Mode (superseded by V28 format)
- **Golden standard cited**: W7 (AI Tutor), Week 7 schema
- **Key obsolete sections**: TTS tier breakdown (March 2026), Conversation Card Mode (replaced by V28), Scaffolding Fade System V3, GameHub Phase Progression
- **Dependencies**: Production_FINAL/1_CORE_WORKFLOW/, syllabus, blueprint, Week 7 template

## 4. week-builder SKILL.md
- **Location**: `.claude/skills/week-builder/SKILL.md`
- **Created**: July 10, 2026 (from CURRENT.md timestamps)
- **Size**: ~300 lines
- **Purpose**: Complete 11-step production workflow for W36+ — clone golden standard, create 19 files, generate images, fetch transcripts, build, test, commit
- **Current usage**: Active — loaded when user says "build week 36", "create W36", "produce week 38"
- **Active maintenance**: ✅ **Yes** — most recent production workflow
- **Golden standard cited**: W36 (ADV + Easy, 19 files) + W36 `week_36_real.js`
- **Key correct references**: dual-tab read (read_stem + read_social), social_quiz.js, on-demand audio, image pipeline orchestrator, 5 distinct voices
- **Dependencies**: `production_kit/reference/Syllabus_V5_PublicationReady.docx`, `ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` §VII.b, `production_kit/tools/preflight_check.sh`, `production_kit/tools/bug_prevention_check.sh`, `production_kit/tools/code_quality_gate.sh`, `production_kit/tools/validate_sgmath_types.mjs`, `tools/generate_logiclab_barmodels.py`, `tools/update_videos.js`, `tools/validate_barmodels.js`, `tools/validate_video_thumbnails.js`, `tools/image_pipeline/orchestrator.mjs`, `tools/fetch_video_transcripts.js`, `tools/clean_transcripts.mjs`, `tools/split_transcripts.py`

---

# Dependency Graph

```
┌──────────────────────────────────────────────────────────────────────┐
│  USER INPUT: "build week N" / "produce week N"                       │
└────────────────────────────┬───────────────────────────────────────────┘
                             ▼
              ┌──────────────────────────────┐
              │ week-builder SKILL.md       │  ◄── AUTHORITATIVE (July 2026)
              │ .claude/skills/week-builder/│
              └──────────────┬───────────────┘
                             │ loads
                             ▼
┌────────────────────────────────────────────────────────────────────┐
│  REFERENCES (read at runtime)                                        │
│  production_kit/reference/Syllabus_V5_PublicationReady.docx        │
│  ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md §VII.b                  │
│  production_kit/never_rules/PRODUCTION_NEVER_RULES.md              │
│  CLAUDE.md (runtime context)                                        │
└────────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────────┐
│  EXECUTION STEPS (BƯỚC -1 → 11)                                    │
│                                                                      │
│  BƯỚC -1  → preflight_check.sh                                     │
│  BƯỚC 0   → cp W36 golden standard (19 files × 2 modes + real.js)  │
│  BƯỚC 1   → video_queries.json                                      │
│  BƯỚC 2   → update_videos.js + validate_video_thumbnails.js        │
│  BƯỚC 3   → generate_logiclab_barmodels.py + validate_barmodels.js  │
│  BƯỚC 4   → edit 19 ADV + 19 Easy files (Node.js only)            │
│  BƯỚC 5   → content:lint + dict:lint + bug_prevention +           │
│              code_quality_gate + validate_sgmath_types               │
│  BƯỚC 6   → on-demand audio (no batch step)                        │
│  BƯỚC 7   → image_pipeline/orchestrator.mjs                        │
│  BƯỚC 8   → fetch_video_transcripts.js + clean_transcripts.mjs +  │
│              split_transcripts.py                                    │
│  BƯỚC 9   → npm run build                                          │
│  BƯỚC 10  → browser test (ADV + Easy)                              │
│  BƯỚC 11  → git commit                                             │
└────────────────────────────────────────────────────────────────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │ post-edit-validate.cjs       │  ◄── auto-runs after every Edit/Write
              │ .claude/hooks/              │      (lint → build → rollback on fail)
              └──────────────────────────────┘

═══════════════════════════════════════════════════════════════════════

CALLS (who invokes which workflow):
  USER → week-builder SKILL (primary entry point)
  preflight_check.sh → references AGENT_SELF_CHECK_WORKFLOW.md
  CLAUDE.md → references AGENT_SELF_CHECK_WORKFLOW.md + toolkit scripts
  .claude/settings.json mainPrompt → WEEK_PRODUCTION_PROMPT_V3 (stale)
  STANDARD_WEEK_CREATION_WORKFLOW.md → week-builder SKILL (cross-references)

DEPRECATED CALL CHAIN:
  USER → WEEK_PRODUCTION_PROMPT_V3.md (if agent reads settings.json mainPrompt)
    → references W7 golden standard (WRONG for W36+)
    → references batch audio (WRONG — on-demand only)
    → references 14-17 file schema (WRONG — 19 files)

═══════════════════════════════════════════════════════════════════════

AGENT ECOSYSTEM:
  Claude Code (.claude/)
    ├── agent-start.cjs     → reads CURRENT.md, ACTIVE.md, architecture
    ├── agent-finish.cjs    → writes CURRENT.md, HISTORY.md, SESSION.md
    ├── hooks.json          → defines engquest-* slash commands
    ├── skills/
    │   ├── week-builder/   ◄── active workflow entry point
    │   ├── week-pipeline/  → chains content-writer + quality-reviewer subagents
    │   ├── content-check/  → standalone validation
    │   └── shadowing-debug/
    └── agents/
        ├── content-writer.md    → subagent for week-pipeline
        └── quality-reviewer.md  → subagent for week-pipeline

  AgentOS (.ai/)
    ├── START.md            → load CURRENT.md → memory → decisions
    ├── FINISH.md           → persist state → move tasks
    ├── AGENTOS_SPEC.md     → lifecycle definition
    ├── architecture/
    │   ├── ARCHITECTURE.md → §5 Rules (links to never_rules/)
    │   └── SUBSYSTEMS.md   → 37 subsystems
    └── memory/
        ├── CURRENT.md       → live state (references W36 as latest)
        └── SESSION.md      → per-session logs
```

---

# Active Components

## Workflow
| Component | Location | Status |
|---|---|---|
| `week-builder` SKILL | `.claude/skills/week-builder/SKILL.md` | ✅ Active — authoritative |
| `week-pipeline` SKILL | `.claude/skills/week-pipeline/SKILL.md` | ✅ Active — subagent orchestration |
| AgentOS lifecycle | `.ai/` | ✅ Active |

## Golden Standards
| Component | Location | Status |
|---|---|---|
| W36 ADV (19 files) | `src/data/weeks/week_36/` | ✅ Active |
| W36 Easy (19 files) | `src/data/weeks_easy/week_36/` | ✅ Active |
| W36 AI Tutor | `src/data/weeks/week_36_real.js` | ✅ Active |

## Validators (referenced by week-builder BƯỚC 5)
| Script | Status |
|---|---|
| `production_kit/tools/preflight_check.sh` | ✅ Active |
| `production_kit/tools/bug_prevention_check.sh N` | ✅ Active |
| `production_kit/tools/code_quality_gate.sh N` | ✅ Active |
| `production_kit/tools/validate_sgmath_types.mjs N` | ✅ Active |
| `npm run content:lint -- --week N --errors-only` | ✅ Active |
| `npm run dict:lint -- --errors-only` | ✅ Active |
| `tools/validate_barmodels.js N` | ✅ Active |
| `tools/validate_video_thumbnails.js N` | ✅ Active |

## Auto-Validation
| Component | Status |
|---|---|
| `post-edit-validate.cjs` hook | ✅ Active — runs after every Edit/Write |
| Hook triggers | ✅ Active — lint → build → auto-rollback |

## Reference Documents
| Document | Status |
|---|---|
| `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` | ✅ Active — 50+ rules |
| `production_kit/reference/Syllabus_V5_PublicationReady.docx` | ✅ Active |
| `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` | ✅ Active |

---

# Deprecated Components

## Workflows
| Workflow | Deprecated Because |
|---|---|
| `WEEK_PRODUCTION_PROMPT_V3.md` | TTS architecture wrong (batch vs on-demand), golden standard = W7, file count = 14-17 not 19, Card Mode replaced by V28 |
| `AGENT_SELF_CHECK_WORKFLOW.md` | Golden standard = W6/W16 not W36, file count = 17 not 19, batch audio step still present as BƯỚC 6, AI Tutor uses old V7 format not V28 |
| `STANDARD_WEEK_CREATION_WORKFLOW.md` | Golden standard = W34 not W36, references `week_34_real.js` instead of `week_36_real.js`, file count references need updating |

## Rules
| Rule | Deprecated Because |
|---|---|
| Batch audio generation (`python3 tools/generate_audio_deepgram.py N --upload`) | W16+ uses on-demand Deepgram Worker. Batch step removed from week-builder SKILL. |
| 17 files per mode | W36 uses 19 files (added social_quiz.js, evolved schemas). |
| `week_NN_real.js` using `export default` | W36 uses `module.exports` for AI Tutor data file. |
| AI Tutor V7 format | Superseded by V28 format (spark_talk with ≥8 frames, V28 field names). |
| 14-file schema | Old V23 schema from `docs/4. MASTER PROMPT V23-FINAL.md`. |

## Golden Standards
| Golden Standard | Deprecated Because |
|---|---|
| W6 (stations) | Was for W1-15 only; now W1-15 uses W36 schema too |
| W7 (AI Tutor) | W7 `week_07_real.js` uses old V7 format; W36 uses V28 |
| W16 (stations) | Was W16+ template; now W36 is the standard for W36+ |
| W34 (stations) | Was cited in STANDARD_WEEK_CREATION_WORKFLOW; now superseded by W36 |

## Claude Code Settings
| Setting | Deprecated Because |
|---|---|
| `.claude/settings.json` mainPrompt → `WEEK_PRODUCTION_PROMPT_V3.md` | Points to deprecated workflow. No agent actually reads this for production. |

---

# Canonical Pipeline

The authoritative pipeline is defined entirely in `.claude/skills/week-builder/SKILL.md`.

```
USER: "build week N" / "tạo tuần N" / "produce week N"
    │
    ▼
week-builder SKILL (BƯỚC -1 → 11)
    │
    ├─ BƯỚC -1: preflight_check.sh
    ├─ BƯỚC 0:  clone W36 (19 ADV + 19 Easy + real.js)
    ├─ BƯỚC 1:  video_queries.json
    ├─ BƯỚC 2:  update_videos.js + thumbnails
    ├─ BƯỚC 3:  bar models + validate
    ├─ BƯỚC 4:  edit content (Node.js only)
    ├─ BƯỚC 5:  5-validator chain
    ├─ BƯỚC 6:  audio → ON-DEMAND (no batch)
    ├─ BƯỚC 7:  image_pipeline/orchestrator.mjs
    ├─ BƯỚC 8:  fetch + clean + split transcripts
    ├─ BƯỚC 9:  build
    ├─ BƯỚC 10: browser test
    └─ BƯỚC 11: commit
```

**Supporting prompts** (read during execution):
- `production_kit/reference/Syllabus_V5_PublicationReady.docx` — theme, grammar, vocab per week
- `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` §VII.b — chunk-first authoring rules
- `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` — all hard rules
- `CLAUDE.md` — runtime context (toolkit, validators, week schemas)

**Supporting validators** (BƯỚC 5):
- preflight_check.sh — 6 external dependency tests
- bug_prevention_check.sh — 13 pattern-based anti-bug checks
- code_quality_gate.sh — 48 checks (C-01→C-48)
- validate_sgmath_types.mjs — Singapore Math type validation
- content:lint — content schema checks
- dict:lint — dictionary validation

**Supporting golden standards**:
- `src/data/weeks/week_36/` — 19 ADV station files
- `src/data/weeks_easy/week_36/` — 19 Easy station files
- `src/data/weeks/week_36_real.js` — AI Tutor V28 data

**Supporting schemas** (extracted from W36 golden standard):
- 19 file schemas documented in `.ai/research/week-production-analysis.md`
- No single canonical schema file exists (gap)

---

# Conflicts

## C1: Stale mainPrompt in settings.json
**What**: `.claude/settings.json` mainPrompt points to `Production_FINAL/.../WEEK_PRODUCTION_PROMPT_V3.md`
**Why**: This was the main production prompt before the SKILL system was built. The SKILL system (July 2026) supersedes it, but the settings.json reference was never cleaned up.
**Risk**: If a new agent reads settings.json as its primary prompt, it gets a deprecated workflow.
**Mitigation**: No agent currently reads this reference for production. The `week-builder` SKILL is the actual entry point.

## C2: Three workflows cite different golden standards
| Workflow | Golden Standard |
|---|---|
| AGENT_SELF_CHECK_WORKFLOW.md | W6 (W1-15) + W16 (W16+) |
| STANDARD_WEEK_CREATION_WORKFLOW.md | W6 (W1-15) + W34 (W16+) |
| week-builder SKILL.md | W6 (W1-15) + W36 (W36+) |

**Why**: Workflows were written incrementally as production advanced. Each was "current" at time of writing, then superseded. They coexist because they are in different subdirectories and no cleanup was done when advancing the golden standard.

## C3: Batch audio vs on-demand audio
**What**: AGENT_SELF_CHECK_WORKFLOW.md still contains BƯỚC 6 (batch audio) and BƯỚC 7 (image upload) instructions. WEEK_PRODUCTION_PROMPT_V3.md describes Deepgram-only strategy (March 2026). week-builder SKILL says "on-demand, no batch step."
**Why**: Audio architecture changed twice: (1) Kokoro → Deepgram (V5.3), (2) batch → on-demand (W16+). Each change updated only the newest workflow.
**Risk**: Agents using old workflows will run unnecessary batch audio steps.

## C4: File count confusion
- AGENT_SELF_CHECK_WORKFLOW.md: "17 files per mode" (BƯỚC 0.5 verification)
- STANDARD_WEEK_CREATION_WORKFLOW.md: "17 files" in verification
- WEEK_PRODUCTION_PROMPT_V3.md: "14 files" (V23 schema)
- week-builder SKILL.md: "19 files" (correct for W36)
**Why**: File count grew with each new station: 14 (V23) → 16 (W16) → 17 → 19 (W36).
**Risk**: Agents using old workflows under-count files.

## C5: Two AGENT_SELF_CHECK_WORKFLOW.md files
- `production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md` (active)
- `Production_FINAL/1. FINAL MASS PRODUCTION/1_CORE_WORKFLOW/AGENT_SELF_CHECK_WORKFLOW.md` (archived copy)
**Why**: Production_FINAL/ is an archive of the production process. Both files may differ.
**Risk**: Ambiguity about which is authoritative. Active location is `production_kit/`.

## C6: AI Tutor format conflict
- `docs/4. MASTER PROMPT V23-FINAL.md`: AI Tutor = `ask_ai.js` (14-file schema)
- `AGENT_SELF_CHECK_WORKFLOW.md`: AI Tutor = `week_07_real.js` (V7 format)
- week-builder SKILL.md: AI Tutor = `week_36_real.js` (V28 format)
**Why**: AI Tutor was a station (`ask_ai.js`) in V23, then became a separate data file in later versions, then got V28 format.
**Risk**: Agents importing old prompts may create `ask_ai.js` instead of `week_NN_real.js`.

## C7: No canonical schema file
**What**: 19 file schemas are scattered across:
- W36 golden standard files (live data)
- week-production-analysis.md (reverse-engineered documentation)
- CLAUDE.md (partial schemas)
- never_rules/ (field-level rules only)
- WEEK_PRODUCTION_PROMPT_V3.md (V23 schema)
**Why**: Schemas evolved with the app. No one consolidated them into a single reference when advancing from V23 → V28.
**Risk**: Agents must infer schemas from examples. High probability of field name errors.

---

# Risks

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| R1 | Stale `settings.json` mainPrompt points to deprecated V3 prompt | Medium | No agent reads it for production; but if a new agent is configured to use it, it gets wrong workflow |
| R2 | Three active-but-obsolete workflow files in `production_kit/workflow/` | High | Agents reading `CLAUDE.md` → production_kit/ reference get AGENT_SELF_CHECK_WORKFLOW.md which is wrong for W36+ |
| R3 | No canonical schema file | High | week-production-analysis.md partially fills gap; should be consolidated |
| R4 | week-builder SKILL not linked from CLAUDE.md | Medium | CLAUDE.md §Production Workflow lists AGENT_SELF_CHECK_WORKFLOW.md, not week-builder SKILL |
| R5 | AGENT_SELF_CHECK_WORKFLOW.md still references W6/W16 golden standards | High | Pre-flight check in week-builder correctly uses W36, but agents may read AGENT_SELF_CHECK_WORKFLOW.md directly |
| R6 | Production_FINAL/ archive not clearly labeled as deprecated | Low | Path itself signals "FINAL" + archive structure; but new agents may explore it |

---

# Migration Notes

## M1: Clean up `settings.json` mainPrompt
Remove or update the stale reference to `WEEK_PRODUCTION_PROMPT_V3.md`. No replacement needed — the SKILL system handles routing.

## M2: Archive or mark obsolete workflows
Either:
- Move `AGENT_SELF_CHECK_WORKFLOW.md` to `production_kit/archive/AGENT_SELF_CHECK_WORKFLOW_DEPRECATED.md`
- Or add a header banner: `⚠️ DEPRECATED — use .claude/skills/week-builder/SKILL.md`
- Same for `STANDARD_WEEK_CREATION_WORKFLOW.md`

## M3: Update CLAUDE.md §Production Workflow
Change:
```
1. `production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md`
   - 11-step production workflow (BƯỚC -1 → BƯỚC 10)
```
To:
```
1. `.claude/skills/week-builder/SKILL.md`
   - 11-step production workflow for W36+ (BƯỚC -1 → 11)
   - Authoritative: always use this, not older workflow files
```

## M4: Create `schemas/WEEK_DATA_V28.md`
Consolidate all 19 file schemas into one reference document. Source of truth: W36 golden standard files. This directly addresses R3 and C7.

## M5: Add golden standard changelog
Create `production_kit/GOLDEN_STANDARDS.md`:
```
W36 (2026-07)  — current standard for W36+
W16 (2026-03)  — legacy W16-W35
W6  (2026-01)  — legacy W1-W15
W7  (2026-01)  — legacy AI Tutor
```
This prevents future confusion about which golden standard applies.

## M6: Standardize on `never_rules/` as single rules source
The week-builder SKILL should link to `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` at the start of BƯỚC 4 (content editing), not just mention it in passing.
