# Review Report — Logic Lab

> **Reviewer:** Claude Opus 4.7  
> **Review date:** 2026-07-14  
> **Sources reviewed:** Blueprint V5 §3.3/§6.4/§7.3, W36 golden standard (ADV + Easy), W35 launch guide, validation scripts, week-builder SKILL.md

---

## 1. Evidence Summary

### What was verified

| Source | Lines reviewed | Key findings |
|---|---|---|
| Blueprint V5 §3.3 | L880–1100 | Logic Lab triple-tab spec, flexible allocation, Social Quiz types reference §7.3 |
| Blueprint V5 §7.3 | L2460–2537 | Social Quiz question type reference, balance rule (50/30/20) |
| Blueprint V5 checklist | L1780–1840 | Logic Lab "15 questions total" guideline, word count scaffolding |
| W36 ADV logic_science.js | Full file | 8 questions (4 logic, 4 science), uses `correct:` field |
| W36 ADV singapore_math.js | Full file | 5 problems, uses `answer: []` (string array), `bar_model` paths |
| W36 ADV social_quiz.js | Full file | 5 questions, uses `correct:` and `explanation` (not `explanation_en`) |
| W36 Easy logic_science.js | Full file | 5 questions (3 logic, 2 science) |
| W36 Easy singapore_math.js | Full file | 5 problems, same schema as ADV |
| W36 Easy social_quiz.js | Full file | 4 questions, all `geography_mcq` or `history_mcq` |
| W36 ADV index.js | L11–16, L30 | `logic_lab` alias import, `stations.logic_lab` key |
| W36 Easy index.js | L11–16, L30 | `logic_science` direct import, same `stations.logic_lab` key |
| validate_sgmath_types.mjs | Full file | 5 valid types, answer[] string check, bar_model path check |
| validate_barmodels.js | Full file | Path naming, file existence, file size ≥1KB, type-semantic sanity check |
| generate_logiclab_barmodels.py | First 50 lines | 16 diagram types, 1600×900 px, PIL renderer |
| W35_SUB_TAB_LAUNCH_GUIDE.md | L100–300 | W35 planned distribution: 3+5+7=15 |

---

## 2. Implementation Differences (W36 vs Blueprint)

### 2.1 Question Count Exceeds Blueprint Guideline

| Tab | Blueprint guideline | W36 ADV actual | W36 Easy actual |
|---|---|---|---|
| Logic & Science | 3–7 | **8** (exceeds upper bound) | 5 (within range) |
| Singapore Math | 5 (always) | 5 ✓ | 5 ✓ |
| Social Quiz | 3–7 | 5 (within range) | 4 (within range) |
| **Total** | **15 max** | **18** (exceeds) | **14** (within) |

**Impact:** The spec documents this as a flexible range (15–18) rather than a hard cap of 15, because the W36 golden standard itself exceeds 15. This is a deliberate deviation from Blueprint §3.3.

### 2.2 Field Name Differences Across Tabs

This is the most important finding for production agents. Each tab uses **different field names** for the correct answer and explanation:

| Field | Logic & Science | Singapore Math | Social Quiz |
|---|---|---|---|
| Correct answer | `correct:` (string) | `answer: []` (string array) | `correct:` (string) |
| Explanation | `explanation_en:` | N/A (uses hints) | `explanation:` (no suffix) |
| Vietnamese | N/A | `hint_vi:` | `question_vn:` |
| Hints | None | `hint_en:` + `hint_vi:` | None |
| Vocabulary | None | None | `vocab: []` |

**This is NOT a bug — it is the established pattern.** Each tab evolved independently and uses the field names from its own history. The spec documents all three schemas faithfully.

### 2.3 Social Quiz Question Types

W36 only uses `geography_mcq` and `history_mcq`. Blueprint §7.3 lists 6 types including `history_timeline`, `geography_reasoning`, `cultural_geography`, and `geography_application`. The W36 golden standard does not use these extended types.

**Impact:** The spec lists all Blueprint types but notes that W36 only demonstrates the two basic types. Production agents should introduce variety gradually.

### 2.4 ADV vs Easy Import Alias

ADV index imports `logic_science.js` with alias `logic_lab`:
```js
import logic_lab from './logic_science.js';
```

Easy index imports directly:
```js
import logic_science from './logic_science.js';
```

Both pass the data under `stations.logic_lab` key. The alias difference is an implementation detail that does not affect the spec.

---

## 3. Blueprint Differences

### 3.1 Blueprint §3.3 Tab Distribution

Blueprint describes three allocation options:

| Profile | L&S | Math | Social | Total |
|---|---|---|---|---|
| STEM-heavy | 7 | 5 | 3 | 15 |
| Social-heavy | 3 | 5 | 7 | 15 |
| Balanced | 5 | 5 | 5 | 15 |

**W36 actual (ADV):** 8 + 5 + 5 = **18** — exceeds all Blueprint profiles.

**Spec adaptation:** The spec documents the Blueprint profiles as guidance, not hard limits, and adds that W36 exceeds them. Production agents should target 15–18 total.

### 3.2 Blueprint §7.3 Social Quiz Types

Blueprint lists 6 Social Quiz types with a balance rule (50% Geography, 30% History, 20% Culture). W36 only uses 2 types (geography_mcq, history_mcq) and has no culture/economics questions.

**Impact:** The spec includes the full Blueprint type list but notes that W36 only demonstrates the basic types. Production agents should aim for type variety in W37+.

### 3.3 Blueprint Social Quiz "map_visual" Field

Blueprint mentions an optional `map_visual` field for Social Quiz questions. W36 does not use this field. It is not implemented in the renderer.

**Impact:** The spec does not include `map_visual` as a standard field. It may be added in a future version if the UI supports it.

---

## 4. Assumptions

| # | Assumption | Risk if wrong |
|---|---|---|
| A1 | `correct:` (string) is the correct field name for Logic & Science and Social Quiz (not `answer:`) | If renderer expects `answer:`, questions will not display correctly |
| A2 | The ADV/Easy import alias difference is intentional and stable | If unified, index.js files need updating |
| A3 | W36's 18-question total (ADV) is acceptable for production, not a one-off | If 15 is a hard cap, W36 golden standard itself is non-compliant |
| A4 | `social_quiz.js` `explanation` field (no `_en` suffix) is correct | If renderer looks for `explanation_en`, explanations will not display |
| A5 | Singapore Math `answer: []` (string array) is correct despite other tabs using `correct:` (string) | Field name mismatch is by design — each tab has its own renderer |
| A6 | `generate_logiclab_barmodels.py` handles all 5 valid Singapore Math types | If a new type is used that the generator does not support, images will be missing |
| A7 | Social Quiz must be derived from `read_social` content | If questions can be purely general-knowledge, the spec is unnecessarily restrictive |

---

## 5. Remaining Risks

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| R1 | **Field name confusion** — `correct:` vs `answer:` across tabs is a common source of copy-paste errors | ⚠ HIGH | The spec explicitly documents field names per tab. Production agents should not copy field patterns between tabs. |
| R2 | **`explanation` vs `explanation_en`** — Social Quiz uses `explanation`, Logic & Science uses `explanation_en` | ⚠ MEDIUM | The spec documents both patterns. If a renderer unifies these fields, both files must be updated. |
| R3 | **Question count exceeding 15** — W36 ADV has 18, which is 3 above Blueprint "max" | ⚠ LOW | The spec documents the range as 15–18. If a hard limit is enforced by the renderer, W36 itself needs adjustment. |
| R4 | **Social Quiz type variety** — W36 only uses 2 of 6 available types | ⚠ LOW | Production agents should introduce additional types (history_timeline, geography_reasoning) in W37+ weeks. |
| R5 | **Easy Social Quiz missing `vocab[]`** — W36 Easy social_quiz.js does not include `vocab[]` field on questions | ⚠ LOW | The spec requires `vocab[]` on all questions. Easy mode should include it for consistency. |
| R6 | **`map_visual` field undeclared** — Blueprint mentions it but W36 does not use it | ⚠ LOW | If the renderer eventually supports it, the spec needs updating. |
| R7 | **Bar model generator may not handle all future types** — W36 uses 5 basic types, but generator supports 16+ | ⚠ LOW | Generator is forward-compatible. If a new type is used, check generator support first. |

---

## 6. Spec Completeness Checklist

| Requirement from task brief | Status | Notes |
|---|---|---|
| Logic & Science purpose/objectives/schema | ✅ Complete | Section 1 |
| Singapore Math complete documentation | ✅ Complete | Section 2 — types, bar model, naming, validators, quality |
| Social Quiz documentation | ✅ Complete | Section 3 — relationship with Social Stories, types, balance |
| Media requirements per tab | ✅ Complete | Sections 1.12, 2.15, 3.14 |
| Cross-station dependencies | ✅ Complete | Sections 1.8, 2.11, 3.10 |
| Validation rules | ✅ Complete | Sections 1.9, 2.12, 3.11 |
| Product Owner checklist | ✅ Complete | Sections 1.11, 2.14, 3.13 |
| Definition of Done | ✅ Complete | Sections 1.10, 2.13, 3.12 |
| Weekly adaptation rules | ✅ Complete | Sections 1.7, 2.10, 3.8 |
| Difficulty progression | ✅ Complete | Sections 1.6, 2.9, 3.9 |
| Bar model generation workflow | ✅ Complete | Section 2.8 |
| Naming conventions | ✅ Complete | Section 2.8 |
| Production workflow | ✅ Complete | Section 5 |
| index.js integration pattern | ✅ Complete | Section 4 |
| Common errors | ✅ Complete | Section 5.3 |

---

*Review based on Blueprint V5, W36 golden standard files, validation scripts, and week-builder SKILL.md.*
