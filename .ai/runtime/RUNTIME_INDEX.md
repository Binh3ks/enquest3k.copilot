# RUNTIME INDEX — Single Entry Point for All Runtime Documents

> **Version:** 1.0 — 2026-07-14
> **Status:** FROZEN
> **Owner:** Runtime Architecture Lead
> **Review schedule:** When next Blueprint version ships

---

## Purpose

This document is the **single entry point** for the entire Runtime Architecture. Every future Agent must read this file before loading any other Runtime document. It answers: **which Runtime do I need?**

---

## Runtime Hierarchy

```
Blueprint V5 (source of truth for curriculum)
     │
     ▼
┌─ RUNTIME INDEX (this file) ────────────────────────────────┐
│                                                              │
│  1. CORE RUNTIME          — canonical rules, path conventions│
│  2. PRODUCTION RUNTIME    — week production pipeline         │
│  3. LANGUAGE RUNTIME      — 7 Language Core stations         │
│  4. MEDIA RUNTIME         — image/audio/video/shadowing gen  │
│  5. REPAIR RUNTIME        — shadowing transcript repair      │
│  6. VALIDATION RUNTIME    — 80+ checks across 7 validators  │
│  7. EVOLUTION RUNTIME     — self-updating architecture       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Reading Order (by task)

| Task | Load these (in order) |
|---|---|
| **Produce a new week (W37+)** | RUNTIME_INDEX → CORE → PRODUCTION → LANGUAGE + MEDIA + VALIDATION → Blueprint §VII.b |
| **Repair existing week data** | RUNTIME_INDEX → CORE → REPAIR → relevant SPEC → Blueprint |
| **Validate a week** | RUNTIME_INDEX → CORE → VALIDATION → week data files |
| **Fix a bug in runtime code** | RUNTIME_INDEX → CORE → ARCHITECTURE.md → SUBSYSTEMS.md → relevant module |
| **Add new station to Blueprint** | RUNTIME_INDEX → EVOLUTION → new station → LANGUAGE + MEDIA |
| **Debug Shadowing** | RUNTIME_INDEX → REPAIR → shadowing runtime modules |
| **Understand AI Tutor** | RUNTIME_INDEX → CORE → AI Tutor (out of Language Runtime scope) |

---

## Canonical Documents

All paths relative to project root.

### Runtime layer
| Document | Location | Purpose | Owner |
|---|---|---|---|
| **RUNTIME_INDEX** | `.ai/runtime/RUNTIME_INDEX.md` | Entry point — this file | Runtime Architect |
| **RUNTIME_ARCHITECTURE** | `.ai/runtime/RUNTIME_ARCHITECTURE.md` | Complete architecture description | Runtime Architect |
| **RUNTIME_LOADING_ORDER** | `.ai/runtime/RUNTIME_LOADING_ORDER.md` | How agents load context | Runtime Architect |
| **RUNTIME_DEPENDENCY_GRAPH** | `.ai/runtime/RUNTIME_DEPENDENCY_GRAPH.md` | Blueprint→Runtime→Agent flow | Runtime Architect |
| **RUNTIME_GOVERNANCE** | `.ai/runtime/RUNTIME_GOVERNANCE.md` | Governance rules | Runtime Architect |
| **RUNTIME_EVOLUTION** | `.ai/runtime/RUNTIME_EVOLUTION.md` | Self-evolving design | Runtime Architect |

### Spec layer
| Document | Location | Purpose | Owner |
|---|---|---|---|
| **Language Core Spec** | `.ai/specs/LANGUAGE_CORE_SPEC.md` | 7 stations: vocab, word match, grammar, dictation, shadowing, word power, writing | Language Architect |
| **Logic Lab Spec** | `.ai/specs/LOGIC_LAB_SPEC.md` | Logic Lab + Singapore Math + Social Quiz | Logic Architect |
| **Shadowing Repair Runtime** | `.ai/runtime/SHADOWING_REPAIR_RUNTIME.md` | Shadowing transcript repair pipeline | Repair Architect |
| **Logic Lab (prior)** | `.ai/specs/LOGIC_LAB_SPEC.md` | Logic Lab spec (same file) | Logic Architect |

### Research layer
| Document | Location | Purpose | Owner |
|---|---|---|---|
| **IMPLEMENTATION_AUDIT** | `.ai/research/IMPLEMENTATION_AUDIT.md` | Full reverse-engineering of production ecosystem | Audit Agent |
| **BLUEPRINT_VS_IMPLEMENTATION** | `.ai/research/BLUEPRINT_VS_IMPLEMENTATION.md` | Every Blueprint vs Implementation difference | Audit Agent |
| **RUNTIME_RECOMMENDATIONS** | `.ai/research/RUNTIME_RECOMMENDATIONS.md` | Prioritized migration roadmap | Audit Agent |
| **RUNTIME_CHANGELOG_PROPOSAL** | `.ai/research/RUNTIME_CHANGELOG_PROPOSAL.md` | Migration roadmap with item IDs | Audit Agent |
| **runtime-freeze-review** | `.ai/research/runtime-freeze-review.md` | Final freeze review | Runtime Architect |

### Workflow layer
| Document | Location | Purpose | Owner |
|---|---|---|---|
| **Week Builder Skill** | `.claude/skills/week-builder/SKILL.md` | 11-step production workflow (BƯỚC -1→11) | Production Lead |
| **Week Pipeline** | `.claude/skills/week-pipeline/SKILL.md` | Subagent orchestration | Production Lead |
| **Content Check** | `.claude/skills/content-check/SKILL.md` | 7-validator chain | Production Lead |
| **Content Writer Agent** | `.claude/agents/content-writer.md` | Sonnet subagent for authoring | Production Lead |
| **Quality Reviewer Agent** | `.claude/agents/quality-reviewer.md` | Validation chain subagent | Production Lead |
| **Week Production Runtime** | `.ai/agents/week-production/` | 10-file runtime spec (CONTEXT, PROCESS, EXECUTION_FLOW, etc.) | Runtime Architect |

### Blueprint layer
| Document | Location | Purpose | Owner |
|---|---|---|---|
| **Blueprint V5** | `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` | Master technical spec (2,783 lines) | Curriculum Lead |
| **Syllabus** | `production_kit/reference/Syllabus_V5_PublicationReady.docx` | 156-week curriculum | Curriculum Lead |
| **PRODUCTION_NEVER_RULES** | `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` | 50+ hard rules | Production Lead |
| **W35 Launch Guide** | `production_kit/reference/W35_SUB_TAB_LAUNCH_GUIDE.md` | W35 sub-tab plan | Production Lead |
| **W40 Launch Guide** | `production_kit/reference/W40_DEBATE_LAUNCH_GUIDE.md` | W40 debate plan | Production Lead |

### Architecture layer
| Document | Location | Purpose | Owner |
|---|---|---|---|
| **ARCHITECTURE.md** | `.ai/architecture/ARCHITECTURE.md` | Tech stack, layers, patterns, rules | Architect |
| **REPOSITORY_MAP.md** | `.ai/architecture/REPOSITORY_MAP.md` | Top-level file inventory | Architect |
| **SUBSYSTEMS.md** | `.ai/architecture/SUBSYSTEMS.md` | Deep per-subsystem inventory (37 subsystems) | Architect |

---

## Deprecated Documents (DO NOT READ AS INSTRUCTIONS)

| Document | Location | Reason deprecated | Status |
|---|---|---|---|
| `AGENT_SELF_CHECK_WORKFLOW.md` | `production_kit/workflow/` | Replaced by Week Builder SKILL.md | Reference only |
| `STANDARD_WEEK_CREATION_WORKFLOW.md` | `production_kit/workflow/` | References W34 golden standard | Reference only |
| `0. NEW_AGENT_ONBOARDING_PROMPT.md` | `production_kit/workflow/` | Superseded by Week Builder SKILL.md | Reference only |
| `Production_FINAL/` | root | Archived historical docs | Do not edit |
| `MASS_Final/` | root | Historical mass-production archive | Do not edit |
| `SUBTAB_ROADMAP.md` | `production_kit/reference/` | Self-marks "awaiting spec" — W36 already shipped dual-tab | Reference only |

---

## Runtime Ownership

| Runtime | Owner | When to update |
|---|---|---|
| CORE | Runtime Architect | When new hard rules are added |
| PRODUCTION | Production Lead | When week-builder SKILL.md changes |
| LANGUAGE | Language Architect | When Language Core spec changes (new stations, schema updates) |
| MEDIA | Media Architect | When image pipeline / audio pipeline / video pipeline changes |
| REPAIR | Repair Architect | When shadowing transcript pipeline changes |
| VALIDATION | QA Lead | When code_quality_gate / bug_prevention / content_lint changes |
| EVOLUTION | Runtime Architect | When Blueprint version changes |

---

## Runtime Responsibilities (Summary)

| Runtime | Owns | Does NOT own |
|---|---|---|
| CORE | Path conventions, file structure, export patterns, hard rules | Workflow steps, content authoring |
| PRODUCTION | Week production workflow, golden standards, checkpoint system | Week data content, media generation |
| LANGUAGE | All 7 Language Core station schemas, runtime behavior, validation | Read/Explore, Logic Lab, AI Tutor |
| MEDIA | Image prompts, audio generation, video search, shadowing transcripts | Content authoring, week data |
| REPAIR | Shadowing transcript repair pipeline (W1-W35), IPA repair | New week content |
| VALIDATION | All 80+ validator checks, pass/fail criteria | Content authoring, production workflow |
| EVOLUTION | Blueprint evolution process, schema migration, versioning | Everything else (triggers the process) |

---

## How to Add a New Runtime

1. Write RFC in `.ai/research/` describing the need
2. Runtime Architect reviews and decides which existing Runtime absorbs the new responsibility
3. If no existing Runtime fits: create new Runtime, update this index, update RUNTIME_ARCHITECTURE.md
4. Update RUNTIME_DEPENDENCY_GRAPH.md with new node
5. Update RUNTIME_GOVERNANCE.md with new governance rules
6. Version bump RUNTIME_INDEX.md (1.0 → 1.1)

---

*Version: 1.0 — Frozen 2026-07-14*
