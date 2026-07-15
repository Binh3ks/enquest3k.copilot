# IMPLEMENTATION_ROADMAP.md — Operational Roadmap for Implementation Phase

> **Version:** 1.0 — 2026-07-14
> **Status:** ACTIVE
> **Owner:** Runtime Architecture Lead
> **Purpose:** Single document every future Claude Code session reads after `/start`

---

## 0. How to Use This Document

This is the **operational roadmap** for the Implementation Phase. It is **not** a Runtime document. It is **not** a Spec. It is the orchestration layer that tells future Claude sessions:

- What phase we are in
- What is frozen
- What to build next
- How to behave on session start and end

**Read order on session startup:**
1. This document (IMPLEMENTATION_ROADMAP.md)
2. `.ai/runtime/RUNTIME_INDEX.md`
3. `.ai/runtime/RUNTIME_LOADING_ORDER.md` (for mission-specific loading)
4. Mission-specific Runtime + Spec docs

**Do NOT read:** Blueprint V5 in full, all 200+ tools/ scripts, all research docs (use name search).

---

## 1. Current Project Status

| Phase | Status | Notes |
|---|---|---|
| **Architecture** | ✅ COMPLETE | 8 Runtimes, no overlap, modular |
| **Runtime** | ✅ COMPLETE | 6 canonical Runtime docs at v1.1 |
| **Specification** | ✅ COMPLETE | LANGUAGE_CORE_SPEC v1.1, LOGIC_LAB_SPEC v1.0, SHADOWING_REPAIR_RUNTIME v1.4 |
| **Review** | ✅ COMPLETE | runtime-final-review v1.1: score 8.8/10, READY_FOR_AGENT_GENERATION = YES |
| **Gap Analysis** | ✅ COMPLETE | 4 critical gaps addressed via additive Runtime extensions |
| **Implementation** | 🟡 **ACTIVE** | This document defines the work |
| **Production (W36+)** | ⏸ WAITING | Cannot start until W1-W35 repair + branch creation |

### State

```
DESIGN PHASE = COMPLETE
IMPLEMENTATION PHASE = ACTIVE
```

---

## 2. Frozen Documents

All documents below are **FROZEN** at the indicated version. Frozen means:
- No redesign
- No rewrites
- Only additive updates when Blueprint changes
- Version bumps require Runtime Architect + PO approval

### 2.1 Runtime Layer (FROZEN)

| Document | Version | Purpose | Owner | May Update? | Update Rule |
|---|---|---|---|---|---|
| `RUNTIME_INDEX.md` | 1.0 | Entry point for all Runtime docs | Runtime Architect | Yes | Add new Runtime only (no removal) |
| `RUNTIME_ARCHITECTURE.md` | 1.1 | Complete architecture | Runtime Architect | Yes (additive) | Add new § for new Runtime, no edit to existing §1-11 |
| `RUNTIME_LOADING_ORDER.md` | 1.0 | Mission-specific loading | Runtime Architect | Yes (additive) | Add new mission type, do not remove existing |
| `RUNTIME_DEPENDENCY_GRAPH.md` | 1.0 | Read vs execution deps | Runtime Architect | Yes (additive) | Add new node, update existing arrow |
| `RUNTIME_GOVERNANCE.md` | 1.1 | Change process | Runtime Architect | Yes (additive) | Add new rule, do not weaken existing |
| `RUNTIME_EVOLUTION.md` | 1.1 | Blueprint evolution process | Runtime Architect | Yes (additive) | Add new scenario, do not change pipeline |
| `SHADOWING_REPAIR_RUNTIME.md` | 1.4 | Shadowing transcript repair | Repair Architect | Yes (additive) | Add new pipeline stage, do not change existing 4 layers |

### 2.2 Spec Layer (FROZEN)

| Document | Version | Purpose | Owner | May Update? | Update Rule |
|---|---|---|---|---|---|
| `LANGUAGE_CORE_SPEC.md` | 1.1 | 7 Language Core stations | Language Architect | Yes (additive) | Add §12+ sections, do not edit §1-11 |
| `LOGIC_LAB_SPEC.md` | 1.0 | Logic Lab + Singapore Math | Logic Architect | Yes (additive) | Add new station, do not edit existing |

### 2.3 Research Layer (REFERENCE ONLY)

| Document | Purpose | Status |
|---|---|---|
| `runtime-final-review.md` (v1.1) | Final architecture review | Reference |
| `runtime-freeze-review.md` (v1.0) | Runtime freeze review | Reference |
| `runtime-final-gap-analysis.md` (v1.0) | 16 gaps identified | Reference |
| `IMPLEMENTATION_AUDIT.md` (v1.0) | Full reverse-engineering | Reference |
| `BLUEPRINT_VS_IMPLEMENTATION.md` (v1.0) | Blueprint vs impl diff | Reference |
| `RUNTIME_RECOMMENDATIONS.md` (v1.0) | Migration roadmap | Reference |
| `RUNTIME_CHANGELOG_PROPOSAL.md` (v1.0) | Item-level migration | Reference |
| `SHADOWING_REPAIR_RUNTIME.md` reviews (v12-v14) | Shadowing reviews | Reference |

**Research layer is NOT frozen.** New research docs may be added. Existing ones are reference-only.

### 2.4 Blueprint (IMMUTABLE)

| Document | Status |
|---|---|
| `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` | IMMUTABLE — Curriculum Lead owns |
| `production_kit/reference/Syllabus_V5_PublicationReady.docx` | IMMUTABLE — Curriculum Lead owns |

---

## 3. Current Priorities (Implementation Order)

### Priority Order

| Priority | Item | Why this order |
|---|---|---|
| **P1** | Shadowing Repair Agent | W1-W35 has 35 broken weeks. Cannot branch until we know which weeks are salvageable vs need repair. |
| **P2** | Repair Toolchain | Repair Agent needs tools (migrate_shadowing.mjs, IPA repair, transcript cleanup). Without tools, Agent cannot execute. |
| **P3** | Production Agent | Once W1-W35 is repaired and branched, Production Agent can generate W36+. |
| **P4** | Validation Toolchain | Validators must run after each production. Built alongside Production Agent, not before. |
| **P5** | Media Toolchain | Media (image/audio/video) is per-week. Once Production Agent works on a week, Media fills in. |
| **P6** | Mass Week Production | W36 → W156 = 121 weeks. Only start after all agents and tools work end-to-end on W36. |

### Why this order minimizes production risk

1. **Repair FIRST** because W1-W35 contains known defects (template bugs, placeholders, missing IPA). Until these are known, we cannot plan W36+.
2. **Toolchain BEFORE Mass Production** because tools must exist before agents can use them.
3. **Validation alongside Production** because every week needs validation before commit.
4. **Media LAST** because Media is per-week overhead, not a blocker.
5. **Mass Production LAST** because we must prove end-to-end on W36 before scaling to W156.

---

## 4. Agent Inventory

> **No implementation.** Planning only. These are the Agents to be built, in priority order.

### 4.1 P1 — Shadowing Repair Agent

| Field | Description |
|---|---|
| **Purpose** | Detect and repair broken shadowing artifacts in W1-W35 |
| **Inputs** | W1-W35 week data (`shadowing.js`, `shadowing_ipa.js`), `SHADOWING_REPAIR_RUNTIME.md` |
| **Outputs** | Repaired `shadowing.js` + `shadowing_ipa.js` per week + repair report |
| **Runtime deps** | REPAIR, LANGUAGE §5 (Shadowing), VALIDATION |
| **Spec deps** | `LANGUAGE_CORE_SPEC.md` §5 (Shadowing) |
| **Validation deps** | `bug_prevention_check.sh` (B22, B23, B25), `code_quality_gate.sh` (CHECK 42) |
| **Human approval** | PO reviews each week's repair before commit |
| **Completion criteria** | All 35 weeks have valid `shadowing.js` + `shadowing_ipa.js` (≥50% IPA, real Vietnamese, content_en matches read.js) |

### 4.2 P2 — Repair Toolchain

| Field | Description |
|---|---|
| **Purpose** | Provide CLI tools the Repair Agent invokes |
| **Tools** | `tools/migrate_shadowing.mjs` (existing), `tools/clean_transcripts.mjs` (existing), `tools/curate_shadowing_videos.js` (existing), new `tools/repair_shadowing.mjs` (TBD), new `tools/repair_ipa.mjs` (TBD) |
| **Runtime deps** | REPAIR, MEDIA |
| **Spec deps** | `SHADOWING_REPAIR_RUNTIME.md` |
| **Completion criteria** | All repair tools accept W-N as input and produce validated output |

### 4.3 P3 — Production Agent

| Field | Description |
|---|---|
| **Purpose** | Generate new weeks W36+ following 11-step workflow |
| **Inputs** | Syllabus DOCX, target week number, golden standard W36 |
| **Outputs** | 19 ADV + 19 Easy + 1 AI Tutor files per week |
| **Runtime deps** | PRODUCTION, LANGUAGE, MEDIA, VALIDATION |
| **Spec deps** | `LANGUAGE_CORE_SPEC.md`, `LOGIC_LAB_SPEC.md` |
| **Validation deps** | All 7 validators (preflight, bug_prevention, code_quality_gate, sgmath_types, barmodels, thumbnails, content_lint) |
| **Human approval** | PO reviews each week before commit |
| **Completion criteria** | First W36 production: 39 files created, all 7 validators PASS, PO approved, committed |

### 4.4 P4 — Validation Toolchain

| Field | Description |
|---|---|
| **Purpose** | Wrap 7 existing validators in a unified runner |
| **Tools** | `tools/run_validators.sh` (TBD) — invokes all 7 validators in order, returns SHIP/FIX/BLOCKER |
| **Runtime deps** | VALIDATION |
| **Spec deps** | All Specs |
| **Completion criteria** | `node tools/run_validators.js N` returns 0 on SHIP, 1 on FIX, 2 on BLOCKER |

### 4.5 P5 — Media Toolchain

| Field | Description |
|---|---|
| **Purpose** | Orchestrate image prompt → human → upload → R2 → data file update |
| **Tools** | `tools/image_pipeline/orchestrator.mjs` (existing), `tools/curate_shadowing_videos.js` (existing), new `tools/prompt_template.mjs` (TBD) |
| **Runtime deps** | MEDIA |
| **Completion criteria** | For any W-N: agent writes prompts → human creates images → orchestrator uploads → R2 verified → data file updated |

### 4.6 P6 — Mass Week Production

| Field | Description |
|---|---|
| **Purpose** | Generate W36 → W156 = 121 weeks |
| **Inputs** | Syllabus, 121 weeks of topics |
| **Outputs** | 121 × 39 files = 4,719 files |
| **Runtime deps** | All |
| **Spec deps** | All |
| **Completion criteria** | All 121 weeks: validators PASS, content reviewed, PO approved, committed |

---

## 5. Tool Inventory

> **No implementation.** Planning only. Categorize every tool that is still missing or needs to be built.

### 5.1 Repair (P1-P2)

| Tool | Status | Priority | Runtime owner |
|---|---|---|---|
| `tools/migrate_shadowing.mjs` | Existing | P2 | REPAIR |
| `tools/clean_transcripts.mjs` | Existing | P2 | REPAIR |
| `tools/curate_shadowing_videos.js` | Existing | P2 | REPAIR |
| `tools/repair_shadowing.mjs` | **MISSING** | P2 | REPAIR |
| `tools/repair_ipa.mjs` | **MISSING** | P2 | REPAIR |
| `tools/validate_shadowing_repair.mjs` | **MISSING** | P2 | REPAIR + VALIDATION |

### 5.2 Production (P3)

| Tool | Status | Priority | Runtime owner |
|---|---|---|---|
| `tools/update_videos.js` | Existing | P3 | MEDIA |
| `tools/generate_logiclab_barmodels.py` | Existing | P3 | MEDIA |
| `tools/fetch_video_transcripts.js` | Existing | P3 | MEDIA |
| `tools/split_transcripts.py` | Existing | P3 | MEDIA |
| `tools/clone_week.sh` | **MISSING** | P3 | PRODUCTION (wraps BƯỚC 0) |
| `tools/generate_week.sh` | **MISSING** | P3 | PRODUCTION (wraps BƯỚC 4) |

### 5.3 Validation (P4)

| Tool | Status | Priority | Runtime owner |
|---|---|---|---|
| `production_kit/tools/preflight_check.sh` | Existing | P4 | VALIDATION |
| `production_kit/tools/bug_prevention_check.sh` | Existing | P4 | VALIDATION |
| `production_kit/tools/code_quality_gate.sh` | Existing | P4 | VALIDATION |
| `production_kit/tools/validate_sgmath_types.mjs` | Existing | P4 | VALIDATION |
| `tools/validate_barmodels.js` | Existing | P4 | VALIDATION |
| `tools/validate_video_thumbnails.js` | Existing | P4 | VALIDATION |
| `tools/content_lint.mjs` | Existing | P4 | VALIDATION |
| `tools/dict_lint.mjs` | Existing | P4 | VALIDATION |
| `tools/run_validators.sh` | **MISSING** | P4 | VALIDATION (wrapper) |
| `tools/check_educational.mjs` | **MISSING** | P4 | VALIDATION (CHECK 47-52) |

### 5.4 Media (P5)

| Tool | Status | Priority | Runtime owner |
|---|---|---|---|
| `tools/image_pipeline/orchestrator.mjs` | Existing | P5 | MEDIA |
| `tools/generate_audio_deepgram.py` | Existing | P5 | MEDIA |
| `tools/image_pipeline/upload_only.mjs` | Existing | P5 | MEDIA |
| `tools/image_pipeline/audit.mjs` | Existing | P5 | MEDIA |
| `tools/prompt_template.mjs` | **MISSING** | P5 | MEDIA |

### 5.5 Utility (Cross-cutting)

| Tool | Status | Priority | Runtime owner |
|---|---|---|---|
| `tools/migrate_vocab_schema.mjs` | **MISSING** | Tier 2 | EVOLUTION |
| `tools/drift_detector.mjs` | **MISSING** | Tier 2 | EVOLUTION |
| `tools/consistency_check.mjs` | **MISSING** | Tier 2 | EVOLUTION |

---

## 6. Git Strategy

### Current State

- **Main branch:** W1-W36 (with W1-W35 defects)
- **W1-W35:** Known defects (template bugs, placeholders, missing IPA)
- **W36:** Golden standard (current production)
- **W37+:** Not yet started

### Agreed Workflow

```
Phase 1: REPAIR (W1-W35)
  → Work on main branch
  → Repair Agent + PO review each week
  → Commit repaired weeks incrementally
  → DO NOT add new production work

Phase 2: BRANCH (after Phase 1 complete)
  → Create new branch: feature/w36-production
  → Freeze W1-W35 (no more changes to W1-W35)
  → W36 becomes the first immutable production week
  → Main branch now contains: repaired W1-W35 + frozen W36

Phase 3: PRODUCE (on feature/w36-production)
  → Production Agent generates W37 → W156
  → Each week: PR → review → merge to feature/w36-production
  → Final release: merge feature/w36-production → main

Phase 4: FREEZE
  → W37-W156 produced
  → Main branch: 156 weeks + runtime + specs
  → Production complete
```

### Hard Rules

- ❌ **No new production work before branching.** P1-P6 must complete on main.
- ❌ **No W1-W35 edits after branch creation.** Phase 2 freezes them forever.
- ❌ **No merges to main without PO approval** for each week.
- ✅ **Repair first.** W1-W35 is the foundation.
- ✅ **Branch second.** Phase 1 must complete before Phase 3.

### Branch Naming

- `feature/w36-production` — main development branch
- `repair/w{N}-shadowing` — per-week repair branches (merged to main)
- `release/v1.0` — final release branch

---

## 7. Human Approval Gates

> **Do not automate these.** Each requires explicit PO approval.

| Gate | Trigger | Approver | Documentation |
|---|---|---|---|
| **G1: Repair Runtime complete** | After all repair tools built | PO + Runtime Architect | Sign-off in `.ai/research/runtime-final-review.md` |
| **G2: Repair Agent ready** | After Agent implementation complete | PO | Test report from Repair Agent |
| **G3: W1-W15 repaired** | After P1-P2 complete for W1-W15 | PO | Per-week repair report |
| **G4: W16-W25 repaired** | After P1-P2 complete for W16-W25 | PO | Per-week repair report |
| **G5: W26-W35 repaired** | After P1-P2 complete for W26-W35 | PO | Per-week repair report |
| **G6: Branch creation** | After G3-G5 all signed | PO + Runtime Architect | `git checkout -b feature/w36-production` |
| **G7: Production Agent ready** | After Agent implementation complete | PO | Test report from Production Agent on W36 |
| **G8: First W36 generation** | After Production Agent passes W36 test | PO | Full W36 production: 39 files + all 7 validators PASS |
| **G9: Validators complete** | After educational validators (CHECK 47-52) added | PO + QA Lead | `code_quality_gate.sh` output |
| **G10: Media Toolchain complete** | After image/audio/video pipelines tested on W36 | PO | E2E test report |
| **G11: First W37 production** | After P1-P6 complete + G6-G10 signed | PO | W37 validators PASS |
| **G12: Mass production W36-W156** | After G11 signed | PO | Per-week sign-off during mass production |

**Total: 12 approval gates.** Each is a hard checkpoint. No Agent may bypass.

---

## 8. Session Startup Rules

Every future Claude Code session MUST follow this protocol:

### 8.1 On `/start`

```
Step 1: Read this document (IMPLEMENTATION_ROADMAP.md)
  → Confirm: which phase are we in? (Repair, Branch, Produce, Mass)
  → Confirm: what is the current priority item?

Step 2: Read `.ai/runtime/RUNTIME_INDEX.md`
  → Confirm: which Runtime is the current focus?

Step 3: Read `.ai/runtime/RUNTIME_LOADING_ORDER.md`
  → Determine: which mission is this session? (A: produce, B: repair, C: validate, D: feature, E: bug, F: onboard)
  → Load only the required Runtime + Spec docs

Step 4: Read the current priority's spec
  → P1: SHADOWING_REPAIR_RUNTIME.md
  → P2: same as P1
  → P3: LANGUAGE_CORE_SPEC.md + LOGIC_LAB_SPEC.md
  → P4: code_quality_gate.sh comments
  → P5: RUNTIME_ARCHITECTURE.md §13
  → P6: All Specs

Step 5: Begin work
```

### 8.2 Hard Rules for Every Session

- ❌ **NEVER redesign the Runtime.** All Runtime docs are FROZEN.
- ❌ **NEVER rewrite Specs.** All Specs are FROZEN.
- ❌ **NEVER load the whole repository.** Use name search.
- ❌ **NEVER load W1-W35 data unless explicitly working on repair.**
- ❌ **NEVER modify production code without PO approval.**
- ✅ **Always reference existing docs.** Do not duplicate.
- ✅ **Always work in current priority order** (P1 → P6).
- ✅ **Always ask for human approval at gates** (G1-G12).
- ✅ **Always commit only after validators PASS + PO approves.**

### 8.3 What This Session Should NOT Do

- Do NOT redesign Runtime docs
- Do NOT add new Runtimes
- Do NOT modify production code (W36+)
- Do NOT modify W1-W35 (until P1 is active)
- Do NOT skip validators
- Do NOT bypass approval gates

---

## 9. Session Shutdown Rules

Every future Claude Code session MUST follow this protocol on `/finish`:

### 9.1 On `/finish`

```
Step 1: Update `.ai/memory/CURRENT.md`
  → Mark current phase status
  → Record last checkpoint
  → Note any blockers

Step 2: Update research if needed
  → Only if NEW finding emerged
  → Do NOT rewrite existing research

Step 3: Update Runtime only if Blueprint changed
  → Trigger EVOLUTION §2 (Blueprint Review → Gap Analysis → Runtime Update)
  → If no Blueprint change, do NOT touch Runtime

Step 4: NEVER rewrite frozen docs
  → No new versions without proper governance process

Step 5: Commit only implementation work
  → No "experimental" commits to main
  → No commits without validator PASS

Step 6: Update this roadmap if phase changed
  → If you completed P1, mark P1 done, P2 in progress
  → Do not delete completed items
```

### 9.2 What to Update vs What to Leave Alone

| Document | Update on `/finish`? | When |
|---|---|---|
| `.ai/memory/CURRENT.md` | ✅ Yes | Always |
| `.ai/research/*` | ⚠️ Add new only | Only if new finding |
| `.ai/runtime/*` | ❌ No | Only via EVOLUTION process |
| `.ai/specs/*` | ❌ No | Only via EVOLUTION process |
| `production_kit/reference/*` | ❌ Never | Curriculum Lead owns |
| Week data files | ⚠️ Only current priority | If working on a week |
| Production code | ⚠️ Only if needed | After PO approval |

### 9.3 Commit Discipline

- One commit per work item
- Commit message format: `<type>(<scope>): <subject>`
  - `feat(agent): Shadowing Repair Agent skeleton`
  - `fix(week35): shadowing vi translations`
  - `docs(roadmap): mark P1 complete`
- No "WIP" commits to main
- No "experimental" commits to main
- Repair commits go to main during P1-P2
- Production commits go to feature/w36-production during P3-P6

---

## 10. Success Criteria

The Implementation Phase is **complete** when ALL of the following are true:

- [ ] **P1 done:** Shadowing Repair Agent implemented and tested
- [ ] **P2 done:** Repair Toolchain complete (`repair_shadowing.mjs`, `repair_ipa.mjs`, `validate_shadowing_repair.mjs`)
- [ ] **G1 signed:** Repair Runtime complete (PO sign-off)
- [ ] **G2 signed:** Repair Agent ready (PO sign-off)
- [ ] **G3 signed:** W1-W15 repaired (all 15 weeks)
- [ ] **G4 signed:** W16-W25 repaired (all 10 weeks)
- [ ] **G5 signed:** W26-W35 repaired (all 10 weeks)
- [ ] **G6 signed:** Branch `feature/w36-production` created
- [ ] **P3 done:** Production Agent implemented
- [ ] **G7 signed:** Production Agent ready (W36 test PASS)
- [ ] **P4 done:** Validation Toolchain complete (`run_validators.sh`, `check_educational.mjs`)
- [ ] **G9 signed:** Validators complete (CHECK 47-52 implemented)
- [ ] **P5 done:** Media Toolchain complete
- [ ] **G10 signed:** Media Toolchain tested on W36
- [ ] **G8 signed:** First W36 production (39 files + 7 validators PASS)
- [ ] **G11 signed:** First W37 production (validators PASS)
- [ ] **P6 done:** Mass Week Production (W37-W156 = 120 weeks)
- [ ] **G12 signed:** Mass production sign-off

**Total: 17 success criteria. None may be skipped.**

### Phase Boundaries

- **Design Phase:** Complete (frozen 2026-07-14)
- **Repair Phase (P1-P2):** Begins on first P1 work item
- **Branch Phase (G6):** Begins after all 35 weeks repaired
- **Production Phase (P3-P6):** Begins on feature/w36-production branch
- **Freeze Phase:** When W156 is produced and merged to main

---

## 11. Reference Index (Quick Links)

### Runtime
- [RUNTIME_INDEX.md](.ai/runtime/RUNTIME_INDEX.md) — Entry point
- [RUNTIME_ARCHITECTURE.md](.ai/runtime/RUNTIME_ARCHITECTURE.md) — Complete architecture
- [RUNTIME_LOADING_ORDER.md](.ai/runtime/RUNTIME_LOADING_ORDER.md) — Mission-specific loading
- [RUNTIME_DEPENDENCY_GRAPH.md](.ai/runtime/RUNTIME_DEPENDENCY_GRAPH.md) — Read vs execution
- [RUNTIME_GOVERNANCE.md](.ai/runtime/RUNTIME_GOVERNANCE.md) — Change process
- [RUNTIME_EVOLUTION.md](.ai/runtime/RUNTIME_EVOLUTION.md) — Blueprint evolution
- [SHADOWING_REPAIR_RUNTIME.md](.ai/runtime/SHADOWING_REPAIR_RUNTIME.md) — Shadowing repair

### Spec
- [LANGUAGE_CORE_SPEC.md](.ai/specs/LANGUAGE_CORE_SPEC.md) — 7 Language Core stations
- [LOGIC_LAB_SPEC.md](.ai/specs/LOGIC_LAB_SPEC.md) — Logic Lab

### Review
- [runtime-final-review.md](.ai/research/runtime-final-review.md) (v1.1) — Final review
- [runtime-freeze-review.md](.ai/research/runtime-freeze-review.md) — Freeze review
- [runtime-final-gap-analysis.md](.ai/research/runtime-final-gap-analysis.md) — Gap analysis
- [IMPLEMENTATION_AUDIT.md](.ai/research/IMPLEMENTATION_AUDIT.md) — Production audit
- [BLUEPRINT_VS_IMPLEMENTATION.md](.ai/research/BLUEPRINT_VS_IMPLEMENTATION.md) — Blueprint diff

### Production
- [production_kit/never_rules/PRODUCTION_NEVER_RULES.md](production_kit/never_rules/PRODUCTION_NEVER_RULES.md) — Hard rules
- [.claude/skills/week-builder/SKILL.md](.claude/skills/week-builder/SKILL.md) — 11-step workflow
- [.claude/skills/content-check/SKILL.md](.claude/skills/content-check/SKILL.md) — 7-validator chain
- [production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md](production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md) — Blueprint V5 (immutable)

---

## 12. Document Status Summary

| Document | Status | Version | Owner |
|---|---|---|---|
| **IMPLEMENTATION_ROADMAP.md** (this) | ACTIVE | 1.0 | Runtime Architect |
| RUNTIME_INDEX.md | FROZEN | 1.0 | Runtime Architect |
| RUNTIME_ARCHITECTURE.md | FROZEN | 1.1 | Runtime Architect |
| RUNTIME_LOADING_ORDER.md | FROZEN | 1.0 | Runtime Architect |
| RUNTIME_DEPENDENCY_GRAPH.md | FROZEN | 1.0 | Runtime Architect |
| RUNTIME_GOVERNANCE.md | FROZEN | 1.1 | Runtime Architect |
| RUNTIME_EVOLUTION.md | FROZEN | 1.1 | Runtime Architect |
| SHADOWING_REPAIR_RUNTIME.md | FROZEN | 1.4 | Repair Architect |
| LANGUAGE_CORE_SPEC.md | FROZEN | 1.1 | Language Architect |
| LOGIC_LAB_SPEC.md | FROZEN | 1.0 | Logic Architect |
| runtime-final-review.md | REFERENCE | 1.1 | Runtime Architect |
| runtime-freeze-review.md | REFERENCE | 1.0 | Runtime Architect |
| runtime-final-gap-analysis.md | REFERENCE | 1.0 | Runtime Architect |
| IMLEMENTATION_AUDIT.md | REFERENCE | 1.0 | Audit Agent |
| BLUEPRINT_VS_IMPLEMENTATION.md | REFERENCE | 1.0 | Audit Agent |

---

*Version: 1.0 — 2026-07-14*
*Status: ACTIVE — Implementation Phase*
*Owner: Runtime Architecture Lead*
