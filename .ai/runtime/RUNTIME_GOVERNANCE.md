# RUNTIME GOVERNANCE — Rules for Changing the Runtime Architecture

> **Version:** 1.0 — 2026-07-14
> **Status:** FROZEN
> **Owner:** Runtime Architecture Lead

---

## 0. Core Principle

**No Runtime may hardcode Blueprint assumptions.** The Runtime must be generic enough to survive Blueprint evolution without rewrites. When Blueprint V6 ships, the Runtime adapts through a documented process (RUNTIME_EVOLUTION.md), not by editing hardcoded assumptions.

---

## 1. When Blueprint Changes

```
Blueprint V5 → V6 ships
     │
     ▼
┌─ EVOLUTION RUNTIME ─────────────────────────────────────────┐
│ 1. Runtime Architect reads new Blueprint section             │
│ 2. Gap Analysis (what changes? what is new? what is removed?)│
│ 3. Runtime Impact Assessment (which Runtimes are affected?)  │
│ 4. Runtime Architect updates affected Runtimes               │
│ 5. Version bump on affected Runtimes                         │
│ 6. Runtime Architect updates Specs                           │
│ 7. Runtime Architect updates Agents                          │
│ 8. Runtime Architect updates Validators                      │
│ 9. Approval (Runtime Architect + PO)                         │
│ 10. Agent may now use updated Runtime                        │
└──────────────────────────────────────────────────────────────┘
     │
     ▼
PRODUCTION (new week uses updated Runtime)
```

**Rule: Never modify production directly during evolution.** All changes go through the Runtime → Spec → Agent chain first.

---

## 2. When Runtime Changes

Any change to a Runtime document triggers this process:

### 2.1 For any Runtime (except EVOLUTION)

```
Runtime document changed (e.g., LANGUAGE_CORE_SPEC.md)
     │
     ▼
1. Version bump (1.0 → 1.1 or 1.0 → 2.0 for major)
2. Review: Runtime Architect reviews all changes
3. Governance Check:
   - Is any downstream Runtime affected?
   - Does this change break the loading order?
   - Does this introduce circular dependencies?
4. Update downstream Runtimes if needed
5. Update RUNTIME_INDEX.md if new doc added
6. Update RUNTIME_DEPENDENCY_GRAPH.md if dependency changed
7. Approval (Runtime Architect + affected Runtime owners)
8. Document in RUNTIME_CHANGELOG_PROPOSAL.md
9. Agents may now use updated Runtime
```

### 2.2 For EVOLUTION Runtime only

```
EVOLUTION document changed
     │
     ▼
1. Major version bump (e.g., 1.0 → 2.0)
2. Full review of all Runtimes (comprehensive audit)
3. Approval required: Runtime Architect + PO + all Runtime owners
4. All Runtimes must be re-validated for consistency
```

---

## 3. When Agent Needs Change

```
New agent needed (or existing agent behavior change)
     │
     ▼
1. Determine which Runtime the change belongs to
2. Runtime owner proposes update
3. Update the Runtime document
4. Update the Agent document (.claude/agents/*.md)
5. Update the Skill document (.claude/skills/*.md) if applicable
6. Runtime Architect reviews cross-cutting impact
7. Approval (Runtime Architect + affected Runtime owner)
8. Agents may now use updated configuration
```

---

## 4. When Validator Needs Change

```
New validation check needed (or existing check removed)
     │
     ▼
1. Determine which Runtime the check belongs to
2. Runtime owner proposes validator change
3. Update validator script (production_kit/tools/ or tools/)
4. Update RUNTIME_VALIDATION (code_quality_gate.sh check list)
5. Update `.claude/skills/content-check/SKILL.md`
6. Runtime Architect reviews: does this change break existing weeks?
7. If breaking: schedule as migration task (fix old weeks first)
8. If non-breaking: apply immediately to next week
9. Approval (QA Lead + Runtime Architect)
```

---

## 5. When Schema Needs Migration

```
Schema field renamed (e.g., meaning_vi → definition_vi)
     │
     ▼
1. EVOLUTION RUNTIME triggers migration
2. Determine migration scope (which weeks affected?)
3. Write migration plan (RUNTIME_CHANGELOG_PROPOSAL.md item)
4. Runtime Architect estimates effort
5. Schedule as repair task (not production task)
6. Apply migration (REPAIR Runtime owns this)
7. Re-validate affected weeks (VALIDATION Runtime)
8. Update Language Runtime spec to reflect new canonical
9. Mark old field as "deprecated alias" (not removed yet)
10. Next week production uses new canonical field only
```

---

## 6. Approval Requirements

| Change type | Approver required | Timeout |
|---|---|---|
| Runtime document update | Runtime Architect + affected owner | No timeout |
| Blueprint → Runtime propagation | Runtime Architect + PO | 1 week |
| Validator change (non-breaking) | QA Lead + Runtime Architect | No timeout |
| Validator change (breaking) | QA Lead + Runtime Architect + PO | Schedule first |
| Schema migration | Runtime Architect + REPAIR owner | 2 weeks max |
| New Runtime creation | Runtime Architect + PO + all owners | 1 week |
| EVOLUTION document change | All: Runtime Architect + PO + all owners | 2 weeks |
| PRODUCTION workflow change | Production Lead + Runtime Architect | 1 week |

---

## 7. Governance Rules (Hard)

1. **No Runtime may bypass another Runtime's authority.** MEDIA Runtime does not define schemas. LANGUAGE Runtime does not generate media. PRODUCTION Runtime does not validate.
2. **No Runtime may modify production code directly.** All production changes go through Agent → commit.
3. **No Runtime may hardcode Blueprint assumptions.** Generic > specific.
4. **No Runtime may skip its own validation.** Every Runtime's output must pass VALIDATION.
5. **No Runtime may add features without updating the Spec.** Spec must be updated before Agent uses the feature.
6. **No Runtime may change another Runtime without coordination.** Coordinate via RUNTIME_GOVERNANCE process.
7. **Version bumps are mandatory.** Every Runtime change gets a version bump.
8. **Documentation first.** Runtime changes are documented before implementation.

---

## 8. Emergency Override

In case of production-critical bug (student-facing broken experience):

1. Runtime Architect declares **EMERGENCY**
2. Production Lead may apply hotfix directly (bypassing full governance)
3. Post-approval review: Runtime Architect + PO within 48 hours
4. Document the emergency change in RUNTIME_CHANGELOG_PROPOSAL.md
5. Version bump after approval

---

## 9. Governance Roles

| Role | Responsibility | Files |
|---|---|---|
| **Runtime Architect** | Owns RUNTIME_ARCHITECTURE, RUNTIME_GOVERNANCE, RUNTIME_EVOLUTION | `.ai/runtime/` |
| **Production Lead** | Owns PRODUCTION RUNTIME, Week Builder SKILL.md | `.claude/skills/week-builder/` |
| **Language Architect** | Owns LANGUAGE RUNTIME, Language Core Spec | `.ai/specs/LANGUAGE_CORE_SPEC.md` |
| **Repair Architect** | Owns REPAIR RUNTIME, Shadowing Repair Runtime | `.ai/runtime/SHADOWING_REPAIR_RUNTIME.md` |
| **QA Lead** | Owns VALIDATION RUNTIME, all validator scripts | `production_kit/tools/` |
| **Curriculum Lead** | Owns Blueprint, Syllabus | `production_kit/reference/` |
| **Product Owner (PO)** | Final approval on all governance decisions | — |

---

*Version: 1.0 — Frozen 2026-07-14*

---

## 10. Agent Guidance Rules (ADDENDUM v1.1)

> **Added:** 2026-07-14 — Final gap analysis
> **Status:** FROZEN — additive only

### 10.1 Blueprint Change Detection Checklist

When an Agent reads a new Blueprint version, it MUST look for:

1. **New station or tab** → triggers EVOLUTION Stage 1
2. **New field added** to existing station → triggers LANGUAGE Runtime update
3. **New validator rule** → triggers VALIDATION Runtime update
4. **New media type** → triggers MEDIA Runtime update
5. **Schema field renamed or removed** → triggers migration (EVOLUTION Stage 5)
6. **New week range or CEFR level** → triggers LANGUAGE Runtime update
7. **New editorial rule** → triggers CORE update

### 10.2 Runtime Section Update Mapping

| Blueprint Section | Affected Runtime | Affected Spec/Doc |
|---|---|---|
| §Grammar Progression | LANGUAGE | LANGUAGE_CORE_SPEC §12.2 |
| §Word Count Scaffolding | LANGUAGE | LANGUAGE_CORE_SPEC §12.1 |
| §70/30 Vietnamese | LANGUAGE | LANGUAGE_CORE_SPEC §12.7 |
| §STEM/Social balance | LANGUAGE | LANGUAGE_CORE_SPEC §12.8 |
| §Chunk-first rules | LANGUAGE | LANGUAGE_CORE_SPEC §12.12 |
| §Debate | LANGUAGE | LANGUAGE_CORE_SPEC §12 + new § if W40 |
| §New media type | MEDIA | No spec (tool-level) |
| §New validator rule | VALIDATION | code_quality_gate.sh |
| §New file path | CORE | REPOSITORY_MAP.md |
| §New production step | PRODUCTION | week-builder/SKILL.md |
| §New never rule | CORE | PRODUCTION_NEVER_RULES.md |

### 10.3 Spec Update Mapping

| Runtime Change | Spec to Update |
|---|---|
| Station schema changes | LANGUAGE_CORE_SPEC.md (station section) |
| New station added | LANGUAGE_CORE_SPEC.md (new section) |
| Logic Lab changes | LOGIC_LAB_SPEC.md |
| Media pipeline changes | No spec (tool-level, documented in MEDIA Runtime) |
| Validation rule added | code_quality_gate.sh comment + content-check/SKILL.md |
| Educational rule added | LANGUAGE_CORE_SPEC §12 |

### 10.4 Agent Must Follow This Order

```
Read Runtime (identify affected area)
  ↓
Read affected Spec (understand current state)
  ↓
Apply change to Runtime document
  ↓
Update affected Spec if needed
  ↓
Update validators if needed
  ↓
Update loading order if needed
  ↓
Document in RUNTIME_CHANGELOG_PROPOSAL.md
  ↓
Proceed with production
```

---

*Version: 1.1 — 2026-07-14 (additive update)*
