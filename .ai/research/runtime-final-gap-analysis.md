# runtime-final-gap-analysis.md — Final Gap Analysis for Agent Generation

> **Version:** 1.0 — 2026-07-14
> **Status:** FROZEN
> **Reviewer:** Runtime Architecture Lead
> **Goal:** Identify remaining gaps that prevent reliable mass production W36→W156

---

## 0. Executive Summary

The Runtime Architecture is structurally complete (8 Runtimes, no overlap, governance defined). This analysis identifies **16 gaps** across 8 areas that would prevent a new Agent from reliably producing weeks W36–W156. The most critical gap is the **absence of educational design rules** — without these, an Agent can produce technically-correct content that is pedagogically wrong.

**Critical (4):** Educational Design Rules missing, Educational Validators missing, Knowledge Graph missing, Media Lifecycle missing
**Moderate (6):** Content Contract gaps, Blueprint Evolution gaps, Self-learning gaps, Missing progressions
**Low (6):** Documentation gaps, efficiency improvements

---

## 1. EDUCATIONAL DESIGN — Finding 1: No CEFR Progression Table

### Current state
Blueprint mentions CEFR in passing (A1→B1+ over 3 years). content_lint.mjs has word-count ranges per phase. No document states: "Week N is at X CEFR level with Y characteristics."

### What's missing
- No mapping of week number → CEFR level
- No definition of "A1 sentence" vs "A2 sentence" vs "B1 sentence"
- No guidance on when to introduce B1+ grammar

### Where the data lives (extracted from Blueprint + validators)
```
W1-15:   Phase 1 — A1          read: 85-135w ADV, 80-130w Easy
W16-27:  Phase 2 — A1→A2        read: 145-215w ADV, 110-160w Easy
W28-54:  Phase 3 — A2→B1        read: 145-220w ADV, 145-220w Easy
W55-156: Phase 3 continued       read: 145-220w ADV, 145-220w Easy
W54 hard cap: ADV 230, Easy 200
```

### Risk: HIGH
Without this table, an Agent cannot determine "how hard a week should be."

### Recommendation: ADD to LANGUAGE §12 (Educational Design Rules)

---

## 2. EDUCATIONAL DESIGN — Finding 2: No Vocabulary Load Definition

### Current state
Blueprint says 10/13/18 words per week range. No document says: "maximum new words per sentence" or "maximum vocabulary density per passage."

### What's missing
- Vocabulary introduction rate per week
- Maximum words per sentence
- Maximum vocabulary density per reading passage
- Review frequency (when to revisit old vocab)

### Where the data lives
```
W1-15:  10 vocab words/week
W16-27: 13 vocab words/week
W28+:   18 vocab words/week
```

### Risk: MEDIUM
An Agent might create a 15-word Easy passage with 10 new words per sentence — technically valid but pedagogically overwhelming.

### Recommendation: ADD to LANGUAGE §12

---

## 3. EDUCATIONAL DESIGN — Finding 3: No Grammar Progression Table

### Current state
Blueprint §Grammar lists week ranges but not in a structured table. No document says "W22 MUST NOT use Past Simple if not yet taught."

### What's missing
- Grammar progression table (week → allowed grammar structures)
- Grammar density rules (max grammar targets per passage)
- Grammar focus consistency validation

### Where the data lives (from Blueprint)
```
W1-11:   Present Simple
W12-21:  + Present Continuous
W22-39:  + Past Simple
W40-48:  + Comparative (-er, more than)
W49-54:  + Superlative (-est, most)
W55+:    Past Continuous, Present Perfect...
```

### Risk: HIGH
CHECK 38 validates past tense consistency but NOT whether the week's grammar is actually appropriate for its position.

### Recommendation: ADD to LANGUAGE §12

---

## 4. EDUCATIONAL DESIGN — Finding 4: No Sentence Length Limits

### Current state
No validator checks maximum sentence length. No document says "A1 sentences should be ≤12 words."

### What's missing
- Maximum sentence length per CEFR level
- Recommended average sentence length per week range

### Where the data lives
- No explicit rule exists in Blueprint or validators
- Must be extracted from W36 golden standard analysis

### Risk: MEDIUM
Long sentences in W36 shadowing (12+ words per sentence) are acceptable for A2 but would be wrong for W1-W15 A1.

### Recommendation: ADD to LANGUAGE §12 + VALIDATION (new CHECK)

---

## 5. EDUCATIONAL DESIGN — Finding 5: No Speaking Progression

### Current state
Shadowing has min 8 sentences (W28+). No document defines speaking difficulty progression across weeks.

### What's missing
- Speaking sentence complexity per week range
- Shadowing sentence length per CEFR level
- Challenge mode scoring expectations per level
- W40 Debate turn count progression

### Where the data lives
```
Shadowing: min 8 sentences W28+
Writing: 8 frames ADV, 6-7 Easy
Tell Your Story: 30s recording, pass ≥60
```

### Risk: MEDIUM
Without progression, Agent might set same difficulty for W1 and W100.

### Recommendation: ADD to LANGUAGE §12

---

## 6. EDUCATIONAL DESIGN — Finding 6: No Writing Progression

### Current state
Writing has min_words=45 ADV / 30 Easy. No document defines how writing difficulty progresses.

### What's missing
- Sentence frame complexity per week range
- Model sentence length progression
- Vocabulary bank size progression
- Writing task complexity (topic → narrative → argument)

### Where the data lives
```
W28+: ADV min_words=45, 8 frames; Easy min_words=30, 6-7 frames
W36+: picture_mode or topic_mode (no explicit progression rule)
```

### Risk: MEDIUM
Writing tasks for W36 might be too simple for W156.

### Recommendation: ADD to LANGUAGE §12

---

## 7. EDUCATIONAL DESIGN — Finding 7: No Learning Rhythm Definition

### Current state
No document defines the "balance" across stations in a week.

### What's missing
- Time allocation per station (Blueprint says "max 60 min total")
- Station difficulty balance (not all stations hard, not all easy)
- Review vs new content ratio

### Where the data lives
```
Blueprint: "Time per week >60 min = too much content, reduce questions"
Logic Lab: max 15 questions = ~25 min
```

### Risk: LOW
Mostly an authoring concern, not a validation concern.

### Recommendation: ADD to LANGUAGE §12 as guidance, not enforcement

---

## 8. EDUCATIONAL VALIDATION — Finding 8: No CEFR Validators

### Current state
Validators check schema, counts, bold markers, word count ranges. No validator checks whether content is actually appropriate for its CEFR level.

### What's missing
- CHECK 47: CEFR word-count range validation (already exists in content_lint E1 but not in code_quality_gate)
- CHECK 48: CEFR grammar progression validation (Grammar not yet taught = BLOCKER)
- CHECK 49: CEFR vocabulary complexity validation (B1 word in A1 passage = WARNING)

### Risk: HIGH
Agent can produce technically-correct but pedagogically-wrong content.

### Recommendation: ADD to VALIDATION (new checks)

---

## 9. CONTENT CONTRACT — Finding 9: Missing Station Contracts

### Current state
LANGUAGE_CORE_SPEC.md documents 7 stations but does NOT define a uniform "station contract" for every station.

### What's missing
For each station, the spec should document:
- Required outputs (mandatory fields)
- Optional outputs (nice-to-have fields)
- Human-generated assets (what human must create)
- AI-generated assets (what Agent can generate)
- Validation ownership (who validates this station)
- Media ownership (who generates media)
- Cross-station dependencies
- Acceptance criteria (definition of done)

### Where partial data exists
- LANGUAGE_CORE_SPEC.md §1.17 (Vocab approval checklist) — this pattern should be replicated for ALL 7 stations
- LOGIC_LAB_SPEC.md has similar checklists

### Risk: MEDIUM
Agent may not know which fields are mandatory vs optional.

### Recommendation: ADD to LANGUAGE §12 as station contract templates

---

## 10. KNOWLEDGE GRAPH — Finding 10: No Cross-Station Dependency Graph

### Current state
LANGUAGE_CORE_SPEC.md §8 has a text-based dependency graph. But it doesn't answer: "If Grammar changes, what must regenerate?"

### What's missing
- Forward dependencies (Station A changes → what downstream is affected?)
- Backward dependencies (Station A requires what upstream data?)
- Regeneration rules (what to do when upstream changes)

### Where partial data exists
```
read.js ←→ dictation.js (verbatim content_en)
read.js ←→ shadowing.js (verbatim content_en)
vocab.js → word_match, word_power, ask_ai, AI Tutor, shadowing_ipa
grammar.js → week_NN_real.js (grammar_focus)
```

### Risk: MEDIUM
When an Agent edits read.js, it might forget to update dictation.js and shadowing.js.

### Recommendation: ADD to LANGUAGE §13 (Knowledge Graph with regeneration rules)

---

## 11. MEDIA CONTRACT — Finding 11: No Media Lifecycle Definition

### Current state
MEDIA Runtime documents "how to generate" but not "full lifecycle" per asset type.

### What's missing
For every media asset type:
- Prompt format
- Generation trigger
- Approval workflow
- Storage location
- Versioning strategy
- Replacement policy
- Deprecation policy
- Ownership (who owns the asset after generation)

### Where partial data exists
- LANGUAGE_CORE_SPEC.md §1.9 (Vocab media requirements table) — pattern to replicate
- SHADOWING_REPAIR_RUNTIME.md has transcript lifecycle

### Risk: LOW-MEDIUM
Mostly operational concern. Agent can learn from W36 golden standard.

### Recommendation: ADD to MEDIA §12 (Media Lifecycle per asset type)

---

## 12. BLUEPRINT EVOLUTION — Finding 12: Missing New-Station Absorption Rules

### Current state
RUNTIME_EVOLUTION.md §4.2 describes "new station added" scenario but doesn't define:
- Which Runtime absorbs it?
- Does it need a new Spec?
- Does it need new validators?
- Does it need new subagents?

### What's missing
- Station absorption decision tree
- New Station Checklist (what to create when new station arrives)

### Risk: MEDIUM
Runtime Architect may make ad-hoc decisions instead of following process.

### Recommendation: ADD to RUNTIME_EVOLUTION §9 (New Station Absorption Checklist)

---

## 13. SELF-LEARNING — Finding 13: No Drift Detection Mechanism

### Current state
RUNTIME_EVOLUTION.md §5 describes self-audit every 6 months but no automated tool exists.

### What's missing
- Script to compare Runtime docs ↔ Spec docs ↔ data files
- Script to verify Agent configs reference latest Specs
- Script to detect "stale" Runtime sections

### Risk: LOW
Runtime Architect handles manually. But for long-term, needs automation.

### Recommendation: ADD to RUNTIME_EVOLUTION §10 (Self-Audit Tooling)

---

## 14. SELF-LEARNING — Finding 14: No Agent Guidance Rules

### Current state
Runtime defines Runtimes and Specs but doesn't tell Agent: "When you read Blueprint, look for these specific changes."

### What's missing
- Blueprint change detection checklist (what to look for in Blueprint updates)
- Runtime section update mapping (Blueprint section → Runtime section)
- Spec update mapping (Runtime change → Spec section to update)

### Risk: MEDIUM
Agent may miss subtle Blueprint changes.

### Recommendation: ADD to RUNTIME_GOVERNANCE §10 (Agent Guidance Rules)

---

## 15. MEDIA — Finding 15: Prompt Assets Not Formalized

### Current state
Image prompts exist in `writing.js` image_prompt field and in legacy `Production_FINAL/IMAGE PROMPTS/` directory. Neither is formally documented in MEDIA Runtime.

### What's missing
- Canonical prompt file location
- Prompt format specification
- Prompt → orchestrator flow documentation
- Prompt ownership

### Risk: LOW-MEDIUM
Works today but architecturally unclean.

### Recommendation: ADD to MEDIA §12 (Prompt Assets Specification)

---

## 16. MEDIA — Finding 16: IPA Ownership Ambiguous

### Current state
IPA is generated in three places: manual authoring, CMU dict auto-gen (ipaUtils.js), generate_ipa.mjs script. Ownership split between LANGUAGE (schema) and MEDIA (generation) is unclear.

### What's missing
- Explicit ownership statement for IPA generation
- IPA quality requirements (minimum coverage per week)

### Risk: LOW
Works today. IPA completeness is a known issue (W36 has 6/12).

### Recommendation: ADD to LANGUAGE §5.7 (IPA ownership clarification)

---

## Summary: Gaps by Priority

### 🔴 CRITICAL (must fix before Agent generation)
1. **Educational Design Rules** — LANGUAGE §12 (new section: CEFR progression, vocab load, grammar progression, sentence length, speaking progression, writing progression, learning rhythm)
2. **Educational Validators** — VALIDATION (new checks 47-50: CEFR range, grammar progression, vocab density, sentence length)
3. **Knowledge Graph** — LANGUAGE §13 (cross-station dependency with regeneration rules)
4. **Content Contract Templates** — LANGUAGE §14 (station contract for all 7 stations)

### 🟡 MODERATE (fix within 1 month)
5. **Media Lifecycle** — MEDIA §12 (full lifecycle per asset type)
6. **New Station Absorption Checklist** — EVOLUTION §9
7. **Agent Guidance Rules** — GOVERNANCE §10
8. **Blueprint Change Detection** — EVOLUTION §10

### 🟢 LOW (fix within 3 months)
9. **Prompt Assets Specification** — MEDIA §12
10. **IPA Ownership** — LANGUAGE §5.7
11. **Learning Rhythm Guidance** — LANGUAGE §12
12. **Sentence Length Limits** — LANGUAGE §12 + VALIDATION
13. **Speaking Progression Table** — LANGUAGE §12
14. **Writing Progression Table** — LANGUAGE §12
15. **Self-Audit Tooling** — EVOLUTION §10
16. **Grammar Density Rules** — LANGUAGE §12

---

*Version: 1.0 — Frozen 2026-07-14*
