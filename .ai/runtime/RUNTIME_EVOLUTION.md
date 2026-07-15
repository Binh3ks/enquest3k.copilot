# RUNTIME EVOLUTION — Self-Evolving Runtime System

> **Version:** 1.0 — 2026-07-14
> **Status:** FROZEN
> **Owner:** Runtime Architecture Lead

---

## 0. Core Principle

**No runtime may hardcode Blueprint assumptions.** The Runtime must be generic enough to survive Blueprint evolution without rewrites. When Blueprint V6 ships, the Runtime adapts through a documented process — not by editing hardcoded assumptions.

---

## 1. Evolution Trigger Conditions

A Runtime evolution is triggered when **ANY** of the following occurs:

1. **Blueprint version bump** (V5 → V6) — Curriculum Lead publishes new spec
2. **New station added** to Blueprint
3. **New tab added** to an existing station
4. **New field added** to an existing station schema
5. **New media asset** introduced (e.g., AR/VR)
6. **New validator check** required
7. **Schema field renamed or removed** (requires migration)
8. **New content type** introduced (e.g., Debate, OREO)
9. **Production tooling change** (new TTS provider, new image gen API)
10. **Runtime bug** discovered in production

---

## 2. Evolution Pipeline (6 stages)

```
Stage 1: Blueprint Review
   ↓
Stage 2: Gap Analysis
   ↓
Stage 3: Runtime Update
   ↓
Stage 4: Spec Update
   ↓
Stage 5: Agent Update
   ↓
Stage 6: Production
```

### Stage 1: Blueprint Review
**Owner:** Runtime Architect + Curriculum Lead

**Inputs:** New Blueprint version, new section, new field

**Activities:**
- Read the new Blueprint section in full
- Identify the "intent" (what the new feature is supposed to enable)
- Identify the "shape" (what data, what UI, what workflow)
- Document in `.ai/research/blueprint-vN-review.md`

**Outputs:**
- Blueprint review document
- Trigger decision (proceed to Stage 2 or defer?)

**Exit criteria:** Blueprint intent + shape documented; Runtime Architect signs off.

---

### Stage 2: Gap Analysis
**Owner:** Runtime Architect

**Inputs:** Blueprint review document, all Runtime documents

**Activities:**
- For each Runtime, ask: "Does this Blueprint change affect me?"
- For affected Runtimes, document the impact (which docs, which sections, which dependencies)
- Decide: does any existing Runtime absorb this change, or is a new Runtime needed?
- Estimate effort per affected Runtime
- Document in `.ai/research/gap-analysis-vN.md`

**Outputs:**
- Gap analysis document
- Affected Runtimes list
- New Runtime decision (yes/no)
- Effort estimate

**Exit criteria:** Gap analysis document signed off by all affected Runtime owners.

---

### Stage 3: Runtime Update
**Owner:** Affected Runtime owners (one per Runtime)

**Inputs:** Gap analysis, all Runtime documents

**Activities (per Runtime):**
- Update the Runtime's canonical document (e.g., LANGUAGE_CORE_SPEC.md)
- Add new section, modify existing section, or remove deprecated section
- Update validation rules
- Update cross-Runtime dependencies
- Update version (1.0 → 1.1 minor, 1.0 → 2.0 major)
- Update RUNTIME_INDEX.md
- Update RUNTIME_DEPENDENCY_GRAPH.md

**Outputs:**
- Updated Runtime documents
- Version bump record
- Changelog entry in RUNTIME_CHANGELOG_PROPOSAL.md

**Exit criteria:** Each affected Runtime has new version; RUNTIME_INDEX + RUNTIME_DEPENDENCY_GRAPH reflect changes.

---

### Stage 4: Spec Update
**Owner:** Language Architect (for LANGUAGE Runtime), Logic Architect (for LOGIC_LAB)

**Inputs:** Updated Runtime document

**Activities:**
- For each new feature, document the canonical spec:
  - Purpose
  - Schema (every field)
  - Validation rules
  - Cross-station dependencies
  - Generation workflow
  - Media classification
- For each schema migration, document the alias strategy
- Update approval checklist

**Outputs:**
- Updated spec (LANGUAGE_CORE_SPEC, LOGIC_LAB_SPEC, or new spec)

**Exit criteria:** Spec reflects all Runtime changes.

---

### Stage 5: Agent Update
**Owner:** Production Lead (for subagents), Runtime Architect (for new agents)

**Inputs:** Updated Runtime, updated Spec

**Activities:**
- Update existing subagent documentation (content-writer, quality-reviewer)
- Create new subagent if no existing one can handle the feature
- Update Skill documents (week-builder, content-check, etc.)
- Update loading order (RUNTIME_LOADING_ORDER.md)
- Update agent prompts to reference new specs
- Test the agent end-to-end on a sandbox week (e.g., W37 if Blueprint V6 adds station X)

**Outputs:**
- Updated agent files
- Updated Skill files
- Updated loading order
- Test report

**Exit criteria:** Agent can produce a valid week using the new spec.

---

### Stage 6: Production
**Owner:** Production Lead

**Inputs:** Updated Runtime, Spec, Agent

**Activities:**
- Run the production workflow on the first production week that uses the new feature
- Capture any production-time issues
- Feed issues back to Stage 2 (gap analysis) if needed
- Update production log

**Outputs:**
- First production week with new feature
- Production log
- Post-production review

**Exit criteria:** First production week shipped; PO approves.

---

## 3. Anti-Patterns (FORBIDDEN)

❌ **Editing production data to fit a new schema** (use migration scripts)
❌ **Hardcoding "W36 is the only valid schema"** (Runtimes must accept aliases)
❌ **Skipping Stage 2 (gap analysis)** (causes cascading failures)
❌ **Updating Runtime without Spec** (agents break)
❌ **Updating Spec without Runtime** (validation misses)
❌ **Production Lead changing Blueprint** (without Curriculum Lead approval)
❌ **Creating new Runtime for every change** (Runtime proliferation is anti-pattern)
❌ **Skipping test in Stage 5** (production surprises)

---

## 4. Special Cases

### 4.1 Schema field rename (e.g., meaning_vi → definition_vi)

```
Stage 1: Curriculum Lead announces rename
Stage 2: Gap analysis shows impact (LANGUAGE + VALIDATION + existing data)
Stage 3:
  - LANGUAGE: mark meaning_vi as deprecated alias; canonical is definition_vi
  - VALIDATION: accept both, prefer canonical
  - REPAIR: schedule migration of W1-W35 data
Stage 4: Spec documents both, with canonical + alias
Stage 5: Agent writes new field; runtime tolerates old field
Stage 6: First production week uses canonical only
        REPAIR migrates old weeks in background
```

### 4.2 New station added (e.g., W40 Debate)

```
Stage 1: Curriculum Lead publishes W40 Debate section
Stage 2: Gap analysis shows:
  - LANGUAGE: does Debate fit? (probably yes, since it's a speaking station)
  - PRODUCTION: does workflow change? (add a BƯỚC)
  - VALIDATION: what checks are needed?
Stage 3:
  - LANGUAGE: add Debate section to LANGUAGE_CORE_SPEC.md
  - PRODUCTION: add BƯỚC for Debate to week-builder SKILL.md
  - VALIDATION: add Debate-specific checks
Stage 4: Spec documents Debate schema, AI persona, conversation flow
Stage 5: Agent can produce W40 with Debate
Stage 6: W40 ships with Debate; PO approves
```

### 4.3 New validator check (e.g., "comprehension must have a translation")

```
Stage 1: Curriculum Lead adds rule to Blueprint
Stage 2: Gap analysis shows: only VALIDATION affected
Stage 3:
  - VALIDATION: add CHECK 47 to code_quality_gate.sh
Stage 4: Spec documents the new check
Stage 5: Agent may now run the validator
Stage 6: Apply to all W1-W35+ (may need repair batch)
```

---

## 5. Runtime Self-Audit (every 6 months)

Even without an external trigger, Runtime Architect performs a self-audit every 6 months:

1. **Inventory check** — list all Runtimes; identify orphaned or underused
2. **Dependency review** — verify RUNTIME_DEPENDENCY_GRAPH is still accurate
3. **Loading order check** — verify RUNTIME_LOADING_ORDER is still optimal
4. **Index review** — verify RUNTIME_INDEX reflects all docs
5. **Version bumps** — bump any Runtime that has drifted
6. **Spec audit** — verify all Specs reflect current Runtime
7. **Agent audit** — verify all Agents use latest Specs

**Output:** Self-audit report in `.ai/research/runtime-audit-<date>.md`

---

## 6. Future Runtime Evolution Scenarios

### 6.1 Blueprint V6 ships (assumed 2027)

Likely changes:
- New CEFR levels (B2, C1)
- New station: Writing v2 (advanced composition)
- New tab: AI Tutor Debate (W40 implementation)
- New media: AR/VR scenarios
- New validator: Auto-graded essay

**Runtime impact:**
- LANGUAGE: add 2-3 new sections
- MEDIA: add AR/VR pipeline (new Runtime? or absorb?)
- VALIDATION: add 5-10 new checks
- REPAIR: may need to update W1-W35 if schemas change
- EVOLUTION: trigger Stage 1-6

### 6.2 Production tooling change (e.g., TTS provider switch)

- MEDIA: add new pipeline (e.g., Google TTS as fallback)
- SECURITY: add new credentials
- VALIDATION: add audio quality check
- No Blueprint change

### 6.3 Schema field removal (e.g., remove `theme` from writing.js)

- LANGUAGE: mark field as removed; spec documents removal
- VALIDATION: add CHECK that warns about deprecated field
- REPAIR: schedule removal migration for W1-W35
- PRODUCTION: enforce new schema for next week

---

## 7. Evolution Roles

| Role | Owns Stage |
|---|---|
| **Runtime Architect** | Stage 1, 2, 3 (overview), 6 (review) |
| **Affected Runtime owner** | Stage 3 (per Runtime) |
| **Language Architect** | Stage 4 (LANGUAGE) |
| **Logic Architect** | Stage 4 (LOGIC_LAB) |
| **Production Lead** | Stage 5, 6 |
| **Product Owner (PO)** | Stage 1, 2, 6 (final approval) |
| **Curriculum Lead** | Stage 1 (Blueprint intent) |

---

## 8. Time SLAs

| Stage | Max time |
|---|---|
| 1 (Blueprint Review) | 1 week |
| 2 (Gap Analysis) | 1 week |
| 3 (Runtime Update) | 1-2 weeks per Runtime |
| 4 (Spec Update) | 1 week |
| 5 (Agent Update) | 1-2 weeks |
| 6 (Production) | 1-4 weeks (first week + monitoring) |
| **Total** | **2-3 months** for full Blueprint V5 → V6 evolution |

---

*Version: 1.0 — Frozen 2026-07-14*

---

## 9. New Station Absorption Checklist (ADDENDUM v1.1)

> **Added:** 2026-07-14 — Final gap analysis
> **Status:** FROZEN — additive only

When Blueprint introduces a new station or tab, the Runtime Architect follows this checklist:

### 9.1 Decision Tree

```
New station/tab announced
  ↓
Is it a Language Core station?
  ├── YES → absorb into LANGUAGE Runtime
  │   ├── Add new section to LANGUAGE_CORE_SPEC.md
  │   ├── Add new validation checks to VALIDATION Runtime
  │   ├── Add new media requirements to MEDIA Runtime
  │   ├── Update station count in PRODUCTION Runtime
  │   └── Update Knowledge Graph in LANGUAGE §13
  ├── NO, is it a media pipeline?
  │   ├── YES → absorb into MEDIA Runtime
  │   └── NO, is it a production workflow change?
  │       ├── YES → absorb into PRODUCTION Runtime
  │       └── NO, is it a validation rule?
  │           ├── YES → absorb into VALIDATION Runtime
  │           └── NO, is it a repair concern?
  │               ├── YES → absorb into REPAIR Runtime
  │               └── NO → create new Runtime (last resort)
  └── NO
```

### 9.2 New Station Checklist

For every new station/tab, the Runtime Architect MUST complete:

- [ ] Identify which Runtime absorbs the new feature
- [ ] Update that Runtime's canonical document
- [ ] Add new Spec section (or create new Spec file)
- [ ] Add new validation checks
- [ ] Add new media requirements (if any)
- [ ] Update Knowledge Graph (§13 cross-station dependencies)
- [ ] Update Loading Order (RUNTIME_LOADING_ORDER.md)
- [ ] Update RUNTIME_INDEX.md
- [ ] Update RUNTIME_DEPENDENCY_GRAPH.md
- [ ] Update Station Contract Template (LANGUAGE §14)
- [ ] Update version number on affected Runtimes
- [ ] Document in RUNTIME_CHANGELOG_PROPOSAL.md

### 9.3 "New Runtime" Criteria

Only create a new Runtime if ALL of the following are true:
1. No existing Runtime can absorb the feature
2. The feature has a distinct, non-overlapping concern
3. The feature needs its own spec file
4. The feature needs its own validation chain
5. The feature is expected to evolve independently

**Do NOT create a new Runtime for:**
- Tabs within an existing station (absorb into parent Runtime)
- New fields in existing schemas (absorb into parent Runtime)
- New validators for existing checks (absorb into VALIDATION)
- New media asset types (absorb into MEDIA)

---

*Version: 1.1 — 2026-07-14 (additive update)*
