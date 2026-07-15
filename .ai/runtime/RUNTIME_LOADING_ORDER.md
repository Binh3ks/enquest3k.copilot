# RUNTIME LOADING ORDER — How Future Agents Load Context

> **Version:** 1.0 — 2026-07-14
> **Status:** FROZEN
> **Owner:** Runtime Architecture Lead

---

## 0. Core Rule

**Agents must NEVER load the whole repository.** Each Agent loads only the minimum context required for its mission. This document defines exactly what to load and in what order.

---

## 1. Decision Tree (Top of Every Agent Run)

```
┌──────────────────────────────────────────────────────┐
│ PHASE 0: Always load (one-time, <500 tokens)          │
│   1. .ai/runtime/RUNTIME_INDEX.md                    │
│   2. .ai/architecture/ARCHITECTURE.md                │
│   → Determine mission                                │
└──────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────┐
│ PHASE 1: Mission classification (1 of 6)             │
│   A. Produce new week                                 │
│   B. Repair existing week                            │
│   C. Validate week                                   │
│   D. Add new feature (Blueprint V6+)                 │
│   E. Fix runtime bug                                 │
│   F. Onboard (no specific task)                      │
└──────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────┐
│ PHASE 2: Mission-specific Runtime load                │
│   (see §2 below)                                      │
└──────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────┐
│ PHASE 3: Optional Spec load (only if needed)          │
│   (see §3 below)                                      │
└──────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────┐
│ PHASE 4: Execute                                       │
│   (Agent does work)                                   │
└──────────────────────────────────────────────────────┘
```

---

## 2. Mission-Specific Loading

### Mission A: Produce new week (W37+)

**Load in order:**

1. **CORE** (always)
   - `.ai/runtime/RUNTIME_INDEX.md` (already in Phase 0)
   - `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` (50+ hard rules)

2. **PRODUCTION**
   - `.claude/skills/week-builder/SKILL.md` (canonical 11-step workflow)
   - `.ai/agents/week-production/SOURCE_OF_TRUTH.md` (which docs are authoritative)
   - `.ai/agents/week-production/EXECUTION_FLOW.md` (5-stage flow)
   - `.ai/agents/week-production/CHECKPOINTS.md` (CP0-CP9)
   - `.ai/agents/week-production/ERROR_RECOVERY.md` (3-cycle max rule)

3. **LANGUAGE** (only for Language Core stations)
   - `.ai/specs/LANGUAGE_CORE_SPEC.md` (7 stations: vocab, word match, grammar, dictation, shadowing, word power, writing)
   - W36 data files (golden standard): `src/data/weeks/week_36/*.js`
   - **Do NOT read W35 data files unless explicitly needed** (W35 has known defects)

4. **MEDIA** (only if producing media for the new week)
   - If image: `tools/image_pipeline/orchestrator.mjs` (read top 100 lines for entry)
   - If audio: `tools/generate_audio_deepgram.py` (read top 100 lines)
   - If video: `tools/update_videos.js` (read top 100 lines)
   - If shadowing transcript: `tools/fetch_video_transcripts.js`, `tools/clean_transcripts.mjs`, `tools/split_transcripts.py`
   - **Do NOT read all 200+ tools/ scripts** (use name search)

5. **VALIDATION** (only when running validators)
   - `.claude/skills/content-check/SKILL.md`
   - 7 validator scripts: `preflight_check.sh`, `bug_prevention_check.sh`, `code_quality_gate.sh`, `validate_sgmath_types.mjs`, `validate_barmodels.js`, `validate_video_thumbnails.js`, `content_lint.mjs`, `dict_lint.mjs`

6. **Blueprint** (only if week needs new schema fields)
   - `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` (read specific section, not whole file)
   - `production_kit/reference/Syllabus_V5_PublicationReady.docx` (read with docx parser for the target week)

**Do NOT load:**
- `.ai/research/IMPLEMENTATION_AUDIT.md` (already used by Runtime Architect; runtime doesn't need it)
- `.ai/research/BLUEPRINT_VS_IMPLEMENTATION.md` (audit doc, not for production)
- All 200+ tools/ scripts (use name search)
- All other stations' runtime modules (vocab runtime if producing grammar, etc.)

---

### Mission B: Repair existing week (W1-W35)

**Load in order:**

1. **CORE** (always)
2. **REPAIR**
   - `.ai/runtime/SHADOWING_REPAIR_RUNTIME.md` (canonical repair spec)
   - `tools/migrate_shadowing.mjs` (legacy migration)
3. **LANGUAGE** (only for the station being repaired)
   - `.ai/specs/LANGUAGE_CORE_SPEC.md` (target station section only)
   - W36 golden standard for comparison
4. **VALIDATION** (must pass after repair)
   - `code_quality_gate.sh`
   - `bug_prevention_check.sh`

**Do NOT load:**
- PRODUCTION Runtime (repair is not production)
- MEDIA Runtime (repair is fix-existing, not generate-new)
- All other stations

---

### Mission C: Validate week

**Load in order:**

1. **CORE** (always)
2. **VALIDATION** (primary)
   - `.claude/skills/content-check/SKILL.md`
   - 7 validator scripts
3. **LANGUAGE** (only if specific station check fails)
   - `.ai/specs/LANGUAGE_CORE_SPEC.md` (the failing station's section)

**Do NOT load:**
- PRODUCTION Runtime
- MEDIA Runtime
- REPAIR Runtime
- Implementation Audit (audit is for architects, not validators)

---

### Mission D: Add new feature (Blueprint V6+)

**Load in order:**

1. **CORE** (always)
2. **EVOLUTION** (primary)
   - `.ai/runtime/RUNTIME_EVOLUTION.md` (evolution process)
3. **Blueprint** (the change)
   - `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` (read relevant section)
4. **Runtime gap analysis** (does any existing Runtime absorb this feature?)
5. **New Spec** (if new station: write new SPEC.md or extend LANGUAGE_CORE_SPEC.md)
6. **New Validator** (if new check needed: extend code_quality_gate.sh)
7. **New Agent** (only if existing subagents can't handle it — rare)

**Do NOT load:**
- All existing validator scripts (unless extending)
- All existing station runtimes (unless modifying)
- Production FOLDER (Production_FINAL/ is archived)

---

### Mission E: Fix runtime bug

**Load in order:**

1. **CORE** (always)
2. **Specific Runtime** (the one containing the bug)
3. **Specific module** (e.g., `src/modules/shadowing/Shadowing.jsx`)
4. **Tests** (Playwright E2E if available)
5. **Validator** (must pass after fix)

**Do NOT load:**
- Other Runtimes
- Other modules in the same Runtime
- Blueprint (unless bug is in spec interpretation)

---

### Mission F: Onboard (no specific task)

**Load in order:**

1. **CORE** (always)
2. **PRODUCTION** (overview only)
3. **RUNTIME_ARCHITECTURE.md** (complete picture)

**Do NOT load:**
- Specific Specs
- Validators
- Runtime modules
- Workflow docs

---

## 3. Spec Loading Rules

| When you need to… | Load |
|---|---|
| Author a Language Core station | `.ai/specs/LANGUAGE_CORE_SPEC.md` (full) |
| Validate a Language Core station | `.ai/specs/LANGUAGE_CORE_SPEC.md` (specific station section) |
| Add a new Language Core station | `.ai/specs/LANGUAGE_CORE_SPEC.md` + RUNTIME_EVOLUTION.md |
| Add a Logic Lab feature | `.ai/specs/LOGIC_LAB_SPEC.md` |
| Add an AI Tutor feature | (out of Language Runtime scope — see AI Tutor spec) |

---

## 4. Token Budget Guidelines

| Agent type | Recommended max load | Enforcement |
|---|---|---|
| Sonnet (content-writer) | 30,000 tokens | Skill `content-writer.md` instructs |
| Sonnet (quality-reviewer) | 20,000 tokens | Skill `content-check` instructs |
| Opus (architect) | 60,000 tokens | Manual |
| Runtime Architect | 100,000 tokens | No hard limit |

**If load exceeds budget, STOP and unload non-essential docs.**

---

## 5. Loading Order Anti-Patterns (FORBIDDEN)

❌ Loading the whole `src/` tree
❌ Loading all 200+ `tools/` scripts
❌ Loading all validator scripts when only running 1
❌ Loading the whole Blueprint (only relevant sections)
❌ Loading W1-W35 data files (W36+ is golden standard)
❌ Loading the Implementation Audit (only Runtime Architects do)

---

## 6. Example: Agent "produce-week" Full Loading Order

```
PHASE 0 (always)
1. .ai/runtime/RUNTIME_INDEX.md
2. .ai/architecture/ARCHITECTURE.md

PHASE 1
→ Mission: "Produce W37"

PHASE 2
3. .claude/skills/week-builder/SKILL.md           [PRODUCTION]
4. .ai/agents/week-production/SOURCE_OF_TRUTH.md  [PRODUCTION]
5. .ai/agents/week-production/EXECUTION_FLOW.md   [PRODUCTION]
6. .ai/agents/week-production/CHECKPOINTS.md      [PRODUCTION]
7. .ai/agents/week-production/ERROR_RECOVERY.md   [PRODUCTION]
8. production_kit/never_rules/PRODUCTION_NEVER_RULES.md  [CORE]

PHASE 3 (only Language Core stations)
9. .ai/specs/LANGUAGE_CORE_SPEC.md               [LANGUAGE]

PHASE 3b (only if media needed)
10. tools/image_pipeline/orchestrator.mjs (top 100 lines)  [MEDIA]
11. tools/update_videos.js (top 100 lines)                 [MEDIA]
12. tools/fetch_video_transcripts.js (top 50 lines)         [MEDIA]

PHASE 3c (only if validation needed)
13. .claude/skills/content-check/SKILL.md          [VALIDATION]
14. production_kit/tools/preflight_check.sh        [VALIDATION]
15. production_kit/tools/code_quality_gate.sh      [VALIDATION]

PHASE 4
→ Execute 11-step workflow
```

**Total loaded**: ~12 files, ~25,000 tokens (well within Sonnet budget)

---

*Version: 1.0 — Frozen 2026-07-14*
