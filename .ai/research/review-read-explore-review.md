# Review Report — Read & Explore Product Document

> **Reviewer:** Claude Opus 4.7  
> **Review date:** 2026-07-14  
> **Documents reviewed:**
> - `.ai/research/review-read-explore.md` (Goose product review, updated in-place)
> - `.ai/research/week36-dryrun.md` (Goose W36 dryrun production plan)

---

## Overall Assessment

The Goose-authored documents are a **solid first draft** with strong structural awareness of the dual-tab architecture and Blueprint features. However, the review contains a **cluster of factual inaccuracies** around word counts and vocab counts that would cause production agents to build content outside spec. Several important architectural details about the `read.js` 3-layer schema are also missing entirely.

After in-place corrections applied to `review-read-explore.md` (see "Missing Items Added" below), the document is now **accurate and usable** as a production reference.

**Overall verdict:** ⚠ **NEEDS CORRECTIONS BEFORE FIRST USE** — corrections applied in this review cycle.

---

## Confirmed Items (✅)

These claims were verified against source-of-truth documents and match:

| # | Claim | Source verified |
|---|---|---|
| C1 | W36 ADV `read_stem` topic = submarine expedition | `src/data/weeks/week_36/read.js` — verified |
| C2 | W36 ADV `read_social` topic = Marco Polo / Silk Road | `src/data/weeks/week_36/read.js` — verified |
| C3 | Easy mode uses parallel structure with simplified text | `src/data/weeks_easy/week_36/read.js` — verified |
| C4 | Chunk-first bolding applied (`**went on**`, `**dove down**`, etc.) | Both `read.js` files — verified, no single-word bolds found |
| C5 | 4 comprehension questions per tab in read.js | Both modes, both tabs — verified |
| C6 | `key_vocabulary[]` has 5 words per tab (10 total in read.js) | Verified from `read_stem.key_vocabulary` + `read_social.key_vocabulary` |
| C7 | Each comprehension question has `answer[]`, `clue_statement`, `hint_en`, `hint_vi` | Verified from both ADV and Easy read.js files |
| C8 | `explore.js` is a flat single file (NOT dual-tabbed) | Verified — explore.js has `title_en`, `content_en`, `check_questions[]`, no `read_stem`/`read_social` keys |
| C9 | Dual-tab split applies ONLY to `read.js`, not to `explore.js` | Verified — explore.js remains a single CLIL article |
| C10 | `read_stem` is the default tab (students land on STEM first) | Confirmed by convention: `read_stem` key is listed first in schema |
| C11 | `social_quiz.js` has 5 questions in W36 | Verified: 5 MCQ questions in `social_quiz.js` |
| C12 | Chunk-first bolding rule (no single words) | Both `read.js` + `dictation.js` — verified, no single-word bolds |
| C13 | `dictation.js` reuses the same chunk-bolded text from `read_stem` | Verified: `dictation.js` content_en matches `read_stem.content_en` |
| C14 | `week_36_real.js` uses V28 format | Header says "AI Tutor — V28 Format" with `week_id`, `weekTitle_en`, `topic`, `grammar_focus`, `grammar_pattern` — verified |
| C15 | W36 is a Universal week (no Vietnamese content) | Blueprint §1.3 — W36 listed in Universal group — verified |

---

## Corrected Items (⚠ → ✅)

Errors in the original Goose document, corrected in this review:

### CORRECTED 1: ADV read_stem word count
- **Goose claim:** 140–190 words
- **Actual:** **209 words**
- **Evidence:** `wc -w` on `read_stem.content_en` = 209
- **Impact:** Future weeks (W37+) should target 140–190. W36 is acceptable as the founding sample.
- **Status in updated doc:** ✅ corrected

### CORRECTED 2: Easy read_stem word count
- **Goose claim:** 100–130 words
- **Actual:** **155 words**
- **Evidence:** `wc -w` on Easy `read_stem.content_en` = 155
- **Impact:** Same as above — acceptable for founding sample.
- **Status in updated doc:** ✅ corrected

### CORRECTED 3: Total words per mode
- **Goose claim:** ~350 total ADV (170 + 180)
- **Actual:** **397 total ADV** (209 + 188)
- **Status in updated doc:** ✅ corrected

### CORRECTED 4: W35 = dual-tab launch week
- **Goose claim (review-read-explore §5):** "W35 was the launch week for this feature; W36 confirms it as the standard W35+ pattern."
- **Actual:** W35 `read.js` is a **flat single-story schema** — no `read_stem` / `read_social` keys. Verified by reading `src/data/weeks/week_35/read.js` (40 lines total, no dual-tab).
- **W36 is the FIRST week with actual dual-tab implementation.** The Blueprint targets W35+, but W35 did not receive the dual-tab implementation.
- **Impact:** Production agents should treat W36 (not W35) as the golden reference for dual-tab read.js.
- **Status in updated doc:** ✅ corrected (§5 rewritten)

### CORRECTED 5: vocab.js entry count
- **Goose dryrun claim (§8):** "Replace all 15 vocab entries"
- **Actual:** W36 ADV `vocab.js` has **18 entries** (submarine, coral reef, compass, museum, discovery, Silk Road, merchant, explorer, government official, inspired, adventure, underwater cave, ancient, treasure, journey, wrote down, gave back, came back)
- **Evidence:** Counted from `src/data/weeks/week_36/vocab.js` lines 6-23 (18 entries)
- **Impact:** Vocab.js for W36+ should be designed to cover all 10 `key_vocabulary[]` words from both tabs plus extended shared words. The standard count is variable (18 for W36), not fixed at 15.
- **Status in updated doc:** ✅ corrected in PO checklist

### CORRECTED 6: Logic & Science question count
- **Goose dryrun claim (§10 V5):** "7 + 5 + 5 = 17 total"
- **Actual:** `logic_science.js` has **8 questions** (IDs 1-8: 4 logic, 4 science)
- **Evidence:** `grep -n "id:" src/data/weeks/week_36/logic_science.js` returns 8 lines
- **W36 Logic Lab total = 8 + 5 + 5 = 18**, not 17
- **Blueprint §3.3 guidance:** Logic & Science + Social Quiz = flexible (10 questions split by theme), Singapore Math = always 5. For W36 this split is 8 + 5 + 5 = 18, which is 3 more than the Blueprint "15 questions max" guideline.
- **Impact:** Production agents should not hard-code 7/5/5 split — check the Blueprint's flexible allocation guidance.

### CORRECTED 7: SUBTAB_ROADMAP.md is stale
- **Status in SUBTAB_ROADMAP.md:** "W35+: Planned Sub-Tab Split — NOT YET DEPLOYED"
- **Status in W35_SUB_TAB_LAUNCH_GUIDE.md:** Shows `read_stem.js` and `read_social.js` as separate files
- **Actual W36 implementation:** Single `read.js` with embedded `read_stem` / `read_social` keys
- **Impact:** SUBTAB_ROADMAP.md is misleading and should be updated to reflect the actual single-file-with-keys architecture. The W35_SUB_TAB_LAUNCH_GUIDE.md file structure example is also stale.

---

## Missing Items Added

These items were not present in the original Goose document and have been added in-place:

### ADDED 1: `read.js` 3-Layer Schema Detail (§6 Feature 1)
Added implementation note explaining the three-layer schema:
1. `content_en` at top level (flat, backward-compat, matches STEM story text)
2. `sentences[]` array (12 items for ADV — backward-compat for sentence-by-sentence audio)
3. `read_stem` + `read_social` objects (dual-tab data)

This is critical for production agents who need to update all three layers when editing a week's read.js.

### ADDED 2: SUBTAB_ROADMAP Staleness Warning (§6 Feature 1)
Added a note that `SUBTAB_ROADMAP.md` and `W35_SUB_TAB_LAUNCH_GUIDE.md` are both stale — they reference `read_stem.js` / `read_social.js` as separate files, which does not match actual W36 production architecture.

### ADDED 3: Vocab.js Count (§7 PO Checklist)
Added that `vocab.js` has 18 entries (not 15) to the vocabulary section of the checklist.

### ADDED 4: Word Count Measurement Table (§5)
Replaced the estimated word counts with actual measured values.

---

## Remaining Risks

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| R1 | `social_quiz.js` uses `correct:` field, not `answer:` | ⚠ Medium | This is in Logic Lab, not Grammar station. Grammar.js uses `answer:` (per NEVER rules). Logic Lab social_quiz.js uses `correct:` in the actual W36 golden standard. Production agents must match this pattern, NOT the grammar.js pattern. This should be explicitly documented. |
| R2 | Blueprint §3.2 Social Studies word count guidance (250-350 ADV) differs drastically from actual W36 (188 ADV) | ⚠ Medium | The Blueprint's recommended range is aspirational, not enforced. W36 golden standard is the real reference. For W37+, target the actual W36 range (180-210 ADV) rather than Blueprint's 250-350. |
| R3 | `content_vi` in `read_stem` and `read_social` is only 1 sentence (truncated) | ⚠ Low | W36 ADV `read_stem.content_vi` is only "Mua he nam ngoai, gia dinh toi di phieu luu bang tau ngam. Chung toi lan xuong 300 met." — not a full translation. Production agents should clarify whether full Vietnamese translation is required or just a summary. |
| R4 | Legacy `sentences[]` array in ADV read.js has 12 sentences but `read_stem.content_en` has ~17 sentences | ⚠ Low | The `sentences[]` is for backward-compat and may not cover all new dual-tab content. If any component reads only `sentences[]`, it will miss newer content. |
| R5 | W36 `dictation.js` sentences use `"meaning": "Vietnamese meaning here"` placeholder | ⚠ Low | The 10 dictation sentences all have placeholder Vietnamese translations. Production should replace these with real Vietnamese. |
| R6 | W35 is not actually dual-tab despite Blueprint saying W35+ | ⚠ Medium | Agents must treat W36 as the actual starting point for dual-tab, not W35. Blueprint text "W35+" should be interpreted as "W36+" for practical production. |

---

## APPROVED

**YES** — with conditions.

The updated `review-read-explore.md` document is now accurate and suitable for use as a production reference. All factual corrections have been applied in-place. The document correctly describes:

- ✅ The dual-tab read.js architecture (with corrected implementation detail)
- ✅ STEM Story requirements and content
- ✅ Social Studies Story requirements and content
- ✅ Corrected word counts (actual vs Blueprint targets)
- ✅ Cross-station consistency requirements
- ✅ Product Owner checklist
- ✅ Blueprint feature mapping

**Conditions for future use:**
1. **Update `SUBTAB_ROADMAP.md`** — it is stale and misleading. Either mark it as superseded by W36 golden standard, or rewrite to reflect single-file-with-keys architecture.
2. **Document the `social_quiz.js` `correct:` vs `answer:` distinction** — clarify that Logic Lab uses `correct:` (matching W36 golden) while Grammar station uses `answer:` (per NEVER rules).
3. **Add `dictation.js` Vietnamese meaning** — the 10 placeholder entries need real Vietnamese translations before W37 production.
