# Production Environment Audit
> Canonical: `.claude/skills/week-builder/SKILL.md`. Audit date: 2026-07-13.

---

# Executive Summary

The repository is in a **split-state**: the canonical workflow exists (week-builder SKILL, July 2026) but the entire surrounding context infrastructure still points to obsolete workflows. No fewer than **47 files** contain stale references. The most critical finding: `.claude/settings.json` routes new agents to an archived copy of a partially-obsolete workflow, and the `content-writer` subagent — the core executor of the week-pipeline — is hardwired to read the deprecated AGENT_SELF_CHECK_WORKFLOW.

**Repository Health Score: 4/10** — canonical workflow exists and is correct, but zero surrounding infrastructure has been updated to route to it.

---

# Repository Health Score

| Dimension | Score | Notes |
|---|---|---|
| Canonical workflow | 10/10 | week-builder SKILL is correct, current, and complete |
| Agent routing | 2/10 | settings.json routes to archive; content-writer reads obsolete |
| Documentation | 4/10 | CLAUDE.md still lists AGENT_SELF_CHECK_WORKFLOW as primary |
| Active scripts | 10/10 | All validators in BƯỚC 5 are correct |
| Active golden standards | 10/10 | W36 files are correct |
| Obsolete doc mass | 2/10 | 47+ files reference deprecated workflows |

---

# Active References

These references are **correct** and lead to current information.

## Canonical Workflow
| File | Role |
|---|---|
| `.claude/skills/week-builder/SKILL.md` | Authoritative workflow (July 2026, W36) |
| `.claude/skills/week-pipeline/SKILL.md` | Subagent orchestration |
| `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` | 50+ hard rules |
| `production_kit/reference/Syllabus_V5_PublicationReady.docx` | Curriculum reference |
| `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` | Spec reference |
| `CLAUDE.md` §Toolkit (validators) | Correct validator commands |

## Active Golden Standards
| File | Role |
|---|---|
| `src/data/weeks/week_36/` | 19 ADV files |
| `src/data/weeks_easy/week_36/` | 19 Easy files |
| `src/data/weeks/week_36_real.js` | AI Tutor V28 |

## Active Validators (BƯỚC 5 chain)
```
preflight_check.sh         ✅
bug_prevention_check.sh N   ✅
code_quality_gate.sh N      ✅
validate_sgmath_types.mjs N ✅
npm run content:lint        ✅
npm run dict:lint           ✅
validate_barmodels.js N     ✅
validate_video_thumbnails.js N ✅
```

---

# Deprecated References

## Critical (blocks correct execution)

### D1 — settings.json mainPrompt
```
File:        .claude/settings.json
Lines:       51
Reference:   "Production_FINAL/1. FINAL MASS PRODUCTION/1_CORE_WORKFLOW/
              AGENT_SELF_CHECK_WORKFLOW.md"
Status:      ❌ Routes to ARCHIVED copy of partially-obsolete workflow
Why obsolete:
  - Golden standard = W16 (should be W36)
  - File count = 17 (should be 19)
  - Batch audio BƯỚC 6 present (on-demand only)
  - AI Tutor V7 format (should be V28)
  - References Week 7 template instead of Week 36
Impact:     New agents spawned with settings context get wrong workflow
Confidence: HIGH — confirmed in file content
Migration:  Remove or update mainPrompt to point to
            .claude/skills/week-builder/SKILL.md
```

### D2 — settings.json onboarding / toolkitGuide / syllabus / blueprint
```
File:        .claude/settings.json
Lines:       52–59
References:  All point into Production_FINAL/ archive subdirectory:
  onboarding    → Production_FINAL/1. FINAL MASS PRODUCTION/
                   1_CORE_WORKFLOW/0. NEW_AGENT_ONBOARDING_PROMPT.md
  toolkitGuide  → Production_FINAL/1. FINAL MASS PRODUCTION/
                   1_CORE_WORKFLOW/TOOLKIT_INTEGRATION.md
  syllabus     → Production_FINAL/1. FINAL MASS PRODUCTION/
                   2_REFERENCE_DOCS/Syllabus_V5_PublicationReady.docx
  blueprint    → Production_FINAL/.../ENGQUEST_BLUEPRINT...docx
  stemIntegration → Production_FINAL/.../STEM_INTEGRATION...docx
Why obsolete:
  - All routed through Production_FINAL/ archive path
  - Source-of-truth references (production_kit/) already exist
Impact:     Redundant routing through archive layer
Confidence: HIGH
Migration:  Update paths to production_kit/reference/ equivalents
```

### D3 — content-writer.md reads AGENT_SELF_CHECK_WORKFLOW
```
File:        .claude/agents/content-writer.md
Line:        22
Reference:   "Read production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md
              before editing if you have not already"
Status:      ⚠️ AGENT_SELF_CHECK_WORKFLOW is partially obsolete
Why obsolete:
  - Golden standard = W6 (W1-15) + W16 (W16+)
  - week-builder SKILL uses W36 (W36+) + W6 (W1-15)
  - File count = 17 not 19
  - Batch audio BƯỚC 6 present
Impact:     content-writer subagent gets stale content rules when it reads
            this before editing; week-pipeline SKILL bypasses this by
            embedding correct instructions in the subagent prompt
Confidence: MEDIUM — file explicitly says "if you have not already",
            and week-pipeline provides correct instructions inline
Migration:  Remove the reference from content-writer.md;
            SKILL.md already provides correct instructions inline
```

## High (misleading or redundant)

### D4 — CLAUDE.md §Production Workflow
```
File:        CLAUDE.md
Lines:       74–83
Reference:   production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md
             (listed as #1 "THE canonical production guide")
Status:      ⚠️ Partially obsolete for W36+
Why obsolete:
  - Lists AGENT_SELF_CHECK_WORKFLOW as canonical, not week-builder SKILL
  - week-builder SKILL is the actual canonical (July 2026)
  - AGENT_SELF_CHECK_WORKFLOW was written ~March 2026
Impact:     Agents reading CLAUDE.md §Production Workflow see the wrong
            workflow entry point
Confidence: HIGH
Migration:  Replace entry #1 with .claude/skills/week-builder/SKILL.md
```

### D5 — CLAUDE.md CHECK 20c enforcement
```
File:        CLAUDE.md
Line:        464
Reference:   "CHECK 20c wired into AGENT_SELF_CHECK_WORKFLOW.md
              Validation Gate 1 (mandatory stop)"
Why obsolete:
  - AGENT_SELF_CHECK_WORKFLOW uses "Validation Gate 1" naming
  - week-builder SKILL uses "BƯỚC 5" naming
  - Gate name change not reflected here
Impact:     Misleading reference to a gate name that no longer exists
Confidence: MEDIUM
Migration:  Update to reference BƯỚC 5 of week-builder SKILL
```

### D6 — content-writer.md full stale instruction set
```
File:        .claude/agents/content-writer.md
Lines:       22–28
Reference:   AGENT_SELF_CHECK_WORKFLOW.md (as above)
             + Week 16 golden standard instruction
             + "W17+: 4 comprehension questions" (correct)
             + "grammar.js: answer: not correct:" (correct)
             + "voiceConfig in index.js: 5 distinct voices" (correct)
Why obsolete:
  - week-builder SKILL explicitly says "Clone from src/data/weeks/week_16/"
    — but W36 is now the standard for W36+, W16 for W16-W35
  - If content-writer follows the week-pipeline SKILL, it gets W36
    as the golden standard; if it follows content-writer.md alone,
    it gets W16 for all weeks
Impact:     Potential golden standard mismatch if content-writer
            follows content-writer.md without SKILL context
Confidence: MEDIUM
Migration:  Update content-writer.md to reference W36 for W36+
```

## Medium (stale but contained)

### D7 — preflight_check.sh output hint
```
File:        production_kit/tools/preflight_check.sh
Line:        near bottom
Reference:   "Follow AGENT_SELF_CHECK_WORKFLOW.md (Steps 0→10)"
Why obsolete:
  - Week-builder SKILL uses BƯỚC -1 → 11 naming
  - Step 0→10 vs BƯỚC -1→11 mismatch
Impact:     Minor — printed hint is informational only
Confidence: HIGH
Migration:  Update hint to reference week-builder SKILL
```

### D8 — AgentOS REPOSITORY_MAP.md
```
File:        .ai/architecture/REPOSITORY_MAP.md
Lines:       36, 55
Reference:   Production_FINAL/ archived (correct — marked Archive)
             AGENT_SELF_CHECK_WORKFLOW (root copy) (says "canonical version
             lives in production_kit/workflow/")
Why obsolete:
  - REPOSITORY_MAP itself is correct (marks Production_FINAL as Archive)
  - But it still says AGENT_SELF_CHECK_WORKFLOW is the "11-step
    production workflow" when week-builder SKILL is the canonical
Impact:     Documents the wrong canonical
Confidence: MEDIUM
Migration:  Update to reference week-builder SKILL as canonical
```

### D9 — AgentOS ARCHITECTURE.md
```
File:        .ai/architecture/ARCHITECTURE.md
Line:        110
Reference:   production_kit/workflow/ — "11-step production workflow"
Why obsolete: Same as D8 — references old workflow path
Impact:     Low — informational
Confidence: MEDIUM
Migration:  Update reference
```

### D10 — AgentOS SUBSYSTEMS.md
```
File:        .ai/architecture/SUBSYSTEMS.md
Lines:       305–309
Reference:   Lists AGENT_SELF_CHECK_WORKFLOW.md as main workflow doc
             "Unknowns: Whether STANDARD_WEEK_CREATION_WORKFLOW.md and
              the master AGENT_SELF_CHECK_WORKFLOW.md are still in sync"
Why obsolete:
  - week-builder SKILL is the canonical
  - "Unknowns" question is now answered: they are NOT in sync
Impact:     Documentation stale
Confidence: MEDIUM
Migration:  Update to reference week-builder SKILL; close the Unknowns
```

## Archive (large, inactive, no routing risk)

### D11 — Production_FINAL/ directory
```
Path:        Production_FINAL/
Files:       ~50+ files across subdirectories
Status:      ❌ All deprecated
References to:
  WEEK_PRODUCTION_PROMPT_V3.md (primary mass production prompt, V5.3 Mar 2026)
  QUICK_REF.md (Vietnamese quick reference)
  WORKFLOW_AUDIT_MAR17.md
  CONSOLIDATION_SUMMARY_MAR17.md
  PRODUCTION_SUMMARY_MAR2026.md
  MASTER_PROMPT_AUDIT_MAR17.md
  MASTER PROMPT/ (copy of prompts at Mar 10 state)
  MASTER PROMPT_BACKUP_Mar10/ (earlier backup)
Why obsolete:
  - Golden standard = W7/W16 (should be W36)
  - File count = 14-17 (should be 19)
  - Batch audio (should be on-demand)
  - TTS architecture V5.3 (superseded twice)
  - AI Tutor Card Mode V5 (superseded by V28)
  - WEEK_PRODUCTION_PROMPT_V3.md: "14 files" schema
Impact:     If explored by a new agent, massive confusion
Confidence: HIGH
Migration:  Move entire Production_FINAL/ to Production_FINAL_DEPRECATED/
```

### D12 — MASS_Final/ directory
```
Path:        MASS_Final/
Files:       ~10+ files (WEEK_PRODUCTION_PROMPT.md, V2.md copies, etc.)
Status:      ❌ Deprecated (pre-V3 era)
References:  8-step workflow (superseded by 11 steps), Week 7 golden
Why obsolete:
  - Earliest production workflow version
  - Superseded by WEEK_PRODUCTION_PROMPT_V2 then V3
Impact:     Low — already superseded twice over
Confidence: HIGH
Migration:  Move to Production_FINAL_DEPRECATED/MASS_Final/
```

### D13 — WEEK_PRODUCTION_PROMPT_V2.1.md references
```
Path:        WEEK2_GOLDEN_STANDARD_COMPARISON_REPORT.md
             src/data/weeks/week_02_real.js
             src/data/weeks/week_02_real_OLD_BACKUP.js
Files:       4 files total
Reference:   "Generated per: WEEK_PRODUCTION_PROMPT_V2.1.md (Jan 27, 2026)"
Status:      ❌ Deprecated (W2 was produced in January 2026)
Impact:     Low — these files are the actual produced content
Confidence: HIGH
Migration:  No action needed for data files; audit report can be archived
```

### D14 — production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md
```
File:        production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md
Status:      ⚠️ Partially obsolete
Stale elements:
  - Golden standard = W6 (W1-15) + W16 (W16+)
  - File count = 17 (should be 19)
  - Batch audio BƯỚC 6 present
  - References Week 7 AI Tutor template (V7 format, not V28)
Active elements:
  - 11-step structure (BƯỚC -1 → 10) — same as week-builder SKILL
  - Pre-flight checklist logic — still correct
  - File verification protocol — still partially correct
  - Chunk-first authoring rules — still correct
  - Grammar, Singapore Math, question scaffolding rules — correct
Impact:     If read directly (not via week-builder SKILL), agent gets
            wrong golden standard and stale batch-audio step
Confidence: HIGH
Migration:  Add deprecation header; point to week-builder SKILL
```

### D15 — production_kit/workflow/STANDARD_WEEK_CREATION_WORKFLOW.md
```
File:        production_kit/workflow/STANDARD_WEEK_CREATION_WORKFLOW.md
Status:      ⚠️ Partially obsolete
Stale elements:
  - Header says "Golden Template: Week 34 (W16+), Week 6 (W1-15)"
  - References week_34_real.js
  - File count = 17
  - W30-35 lessons learned — some may be superseded by W36 changes
Active elements:
  - Chunk/collation rules (W36+ MANDATORY section)
  - W30-35 bug lessons (6 bugs still relevant)
  - AI Tutor audit phase (BƯỚC 6-8)
Impact:     Cross-referenced by week-builder SKILL for supplementary context;
            stale golden standard citation is the main issue
Confidence: HIGH
Migration:  Update golden standard citation to W36; add deprecation note
```

### D16 — production_kit/workflow/0. NEW_AGENT_ONBOARDING_PROMPT.md
```
File:        production_kit/workflow/0. NEW_AGENT_ONBOARDING_PROMPT.md
Status:      ⚠️ Partially obsolete
Stale elements:
  - Workspace path: /Users/binhnguyen/Downloads/Engquest3k/ (actual is
    /Users/binhnguyen/projects/Engquest3k/)
  - References WEEK_PRODUCTION_PROMPT.md
  - References Week 7 golden standard
  - "4 UI files to update" — now more files may be needed for W36
Impact:     Onboarding prompt has wrong path (will fail file reads)
Confidence: HIGH
Migration:  Update workspace path to /Users/binhnguyen/projects/Engquest3k/
```

### D17 — production_kit/workflow/NEW_SESSION_ONBOARDING.md
```
File:        production_kit/workflow/NEW_SESSION_ONBOARDING.md
Status:      ⚠️ Partially obsolete
Stale elements:
  - References /Users/binhnguyen/Downloads/Engquest3k/ (wrong path)
  - References "metadata.js update (Bug B6)"
  - References Week 6 as golden standard
Impact:     Session onboarding gets wrong paths
Confidence: HIGH
Migration:  Update workspace path; align golden standard references
```

### D18 — production_kit/workflow/TOOLKIT_INTEGRATION.md
```
File:        production_kit/workflow/TOOLKIT_INTEGRATION.md
Status:      ⚠️ Likely partially obsolete
Impact:     Unknown — not fully read during analysis
Confidence: MEDIUM
Migration:  Audit for golden standard / file count / audio references
```

---

# Dependency Map

```
CANONICAL WORKFLOW
.claude/skills/week-builder/SKILL.md
│
├─ referenced by:
│   nothing (NOT linked from CLAUDE.md, settings.json, or content-writer.md)
│
├─ loads at runtime:
│   production_kit/reference/Syllabus_V5_PublicationReady.docx ✅
│   ENGQUEST_BLUEPRINT...V5.0.md §VII.b ✅
│   production_kit/never_rules/PRODUCTION_NEVER_RULES.md ✅
│   CLAUDE.md ✅
│
└─ BƯỚC 5 invokes validators ✅:
    preflight_check.sh
    bug_prevention_check.sh
    code_quality_gate.sh
    validate_sgmath_types.mjs
    content:lint
    dict:lint

═══════════════════════════════════════════════════════════════

CANONICAL CONTEXT (active but NOT routing to canonical)
│
├─ CLAUDE.md (root runtime context)
│   ├─ §Production Workflow → ❌ AGENT_SELF_CHECK_WORKFLOW.md (D4)
│   │                           ↑ still listed as #1 "THE canonical"
│   │   §Toolkit validators    → ✅ correct (all validators OK)
│   │   §Key Paths             → ✅ correct (W36 golden standard noted)
│   │   §Chunk-first           → ✅ correct
│   │   CHECK 20c enforcement  → ❌ AGENT_SELF_CHECK_WORKFLOW (D5)
│   │
│   └─ §Folder map: Production_FINAL/ → ✅ marked "Archived/historical"
│
├─ .claude/settings.json (agent routing)
│   ├─ mainPrompt   → ❌ Production_FINAL/.../AGENT_SELF_CHECK_WORKFLOW (D1)
│   ├─ onboarding    → ❌ Production_FINAL/.../NEW_AGENT_ONBOARDING_PROMPT (D2)
│   ├─ toolkitGuide  → ❌ Production_FINAL/.../TOOLKIT_INTEGRATION (D2)
│   ├─ syllabus     → ❌ Production_FINAL/.../Syllabus.docx (D2)
│   ├─ blueprint     → ❌ Production_FINAL/.../Blueprint.docx (D2)
│   └─ stemIntegration → ❌ Production_FINAL/.../STEM...docx (D2)
│
├─ .claude/agents/content-writer.md
│   └─ "Read AGENT_SELF_CHECK_WORKFLOW.md before editing" → ❌ D3, D6
│
└─ .ai/ (AgentOS memory layer)
    ├─ REPOSITORY_MAP.md → ❌ AGENT_SELF_CHECK_WORKFLOW as canonical (D8)
    ├─ ARCHITECTURE.md   → ❌ production_kit/workflow/ reference (D9)
    ├─ SUBSYSTEMS.md     → ❌ AGENT_SELF_CHECK_WORKFLOW as main doc (D10)
    └─ CURRENT.md        → ✅ correct (W36 noted as latest)

═══════════════════════════════════════════════════════════════

DEPRECATED WORKFLOWS (large archive mass)
│
├─ Production_FINAL/
│   ├─ WEEK_PRODUCTION_PROMPT_V3.md       → ❌ D11 (many copies)
│   ├─ QUICK_REF.md                       → ❌ D11
│   ├─ 1_CORE_WORKFLOW/
│   │   ├─ AGENT_SELF_CHECK_WORKFLOW.md   → ❌ (archived copy of D14)
│   │   ├─ 0. NEW_AGENT_ONBOARDING...     → ❌ (archived copy of D16)
│   │   └─ TOOLKIT_INTEGRATION.md         → ❌ (archived copy of D18)
│   │   └─ WEEK_PRODUCTION_PROMPT.md      → ❌ D11 (V5.3 copy)
│   ├─ 2_REFERENCE_DOCS/ (duplicates)     → ❌ D2
│   └─ 6_LESSONS_LEARNED/ (W12-W15)      → ❌ D11
│
├─ MASS_Final/                            → ❌ D12 (pre-V3 era)
│
├─ production_kit/workflow/
│   ├─ AGENT_SELF_CHECK_WORKFLOW.md       → ⚠️ D14 (active location, partially obsolete)
│   ├─ STANDARD_WEEK_CREATION_WORKFLOW.md → ⚠️ D15 (active location, partially obsolete)
│   ├─ 0. NEW_AGENT_ONBOARDING_PROMPT.md  → ⚠️ D16 (active location, partially obsolete)
│   ├─ NEW_SESSION_ONBOARDING.md          → ⚠️ D17 (active location, partially obsolete)
│   └─ TOOLKIT_INTEGRATION.md             → ⚠️ D18 (active location, unchecked)
│
└─ AgentOS .ai/ (documentation only)
    ├─ .ai/architecture/REPOSITORY_MAP.md → ❌ D8
    ├─ .ai/architecture/ARCHITECTURE.md   → ❌ D9
    └─ .ai/architecture/SUBSYSTEMS.md     → ❌ D10
```

---

# Risks

| ID | Risk | Severity | Likelihood | Impact |
|---|---|---|---|---|
| R1 | settings.json mainPrompt spawns agent with archived workflow | High | Medium | Wrong golden standard, batch audio step runs, wrong file count |
| R2 | content-writer subagent reads stale AGENT_SELF_CHECK_WORKFLOW | High | Medium | week-pipeline SKILL overrides this, but direct use of content-writer.md is unsafe |
| R3 | Agent reads CLAUDE.md §Production Workflow → gets wrong entry point | High | High | week-builder SKILL is never suggested; AGENT_SELF_CHECK_WORKFLOW is |
| R4 | Agent explores Production_FINAL/ thinking it's current | Medium | Medium | Massive confusion; 50+ stale files |
| R5 | Agent explores MASS_Final/ thinking it's current | Low | Low | Clearly superseded naming |
| R6 | preflight_check.sh hint points to wrong workflow step naming | Low | Low | Informational only |
| R7 | AgentOS docs list wrong canonical | Medium | Low | Agents rarely read .ai/architecture/ |
| R8 | D16/D17 wrong workspace path in onboarding prompts | High | High | All file reads fail if these are followed |

---

# Migration Plan

Ordered by risk. Do in sequence.

## M1 — Critical: Fix settings.json routing (5 min)
```diff
- "mainPrompt": "Production_FINAL/.../AGENT_SELF_CHECK_WORKFLOW.md",
+ "mainPrompt": ".claude/skills/week-builder/SKILL.md",

- "onboarding": "Production_FINAL/.../0. NEW_AGENT_ONBOARDING...",
+ "onboarding": "production_kit/workflow/0. NEW_AGENT_ONBOARDING_PROMPT.md",

- "toolkitGuide": "Production_FINAL/.../TOOLKIT_INTEGRATION.md",
+ "toolkitGuide": "production_kit/workflow/TOOLKIT_INTEGRATION.md",

- "syllabus": "Production_FINAL/.../Syllabus...",
+ "syllabus": "production_kit/reference/Syllabus_V5_PublicationReady.docx",

- "blueprint": "Production_FINAL/.../Blueprint...",
+ "blueprint": "production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md",
```

## M2 — Critical: Fix CLAUDE.md §Production Workflow (2 min)
```diff
- 1. **`production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md`**
-    - 11-step production workflow (BƯỚC -1 → BƯỚC 10)
+ 1. **`.claude/skills/week-builder/SKILL.md`** ✅ AUTHORITATIVE
+    - 11-step production workflow for W36+ (BƯỚC -1 → 11)
+    - Always use this; older workflow files are deprecated
```

## M3 — Critical: Fix content-writer.md (2 min)
Remove the stale reference. week-pipeline SKILL already provides correct instructions inline; the stale reference should not coexist.

## M4 — High: Update production_kit/workflow/ files with deprecation banners

**AGENT_SELF_CHECK_WORKFLOW.md** — add header:
```
> ⚠️ DEPRECATED FOR W36+ (July 2026)
> Authoritative workflow: .claude/skills/week-builder/SKILL.md
> This file is kept for historical reference on validators and anti-patterns.
> DO NOT use as a production entry point.
```

**STANDARD_WEEK_CREATION_WORKFLOW.md** — update golden standard + add banner:
```diff
- Golden Template: Week 34 (W16+), Week 6 (W1-15)
+ Golden Template: Week 36 (W36+), Week 6 (W1-15)
```

## M5 — High: Fix workspace paths in onboarding prompts
D16 and D17 both reference `/Users/binhnguyen/Downloads/Engquest3k/` — must be `/Users/binhnguyen/projects/Engquest3k/`.

## M6 — Medium: Update AgentOS documentation
REPOSITORY_MAP.md, ARCHITECTURE.md, SUBSYSTEMS.md — update canonical reference from AGENT_SELF_CHECK_WORKFLOW to week-builder SKILL.

## M7 — Archive: Move Production_FINAL/ and MASS_Final/
```bash
mv Production_FINAL/ Production_FINAL_DEPRECATED/
mv MASS_Final/ Production_FINAL_DEPRECATED/MASS_Final/
```
All 50+ files inside are already obsolete. Archiving prevents accidental discovery.

## M8 — Verify: Confirm week-builder SKILL has no stale references
Audit SKILL.md for any remaining references to W16/W34/W7 as "current" golden standard. The analysis found none — SKILL is clean.
