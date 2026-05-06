# AGENT SELF-CHECK WORKFLOW — Lesson Plan Quality Rules

This document is the **mandatory checklist** every agent MUST verify before finalising any week's lesson-plan JSON.
Running `python3 pipeline/validate_lesson_plan.py <week>` enforces all rules below automatically.

---

## BƯỚC 0.7 — Lesson-Plan Quality Checklist (RUN BEFORE SAVING)

### PART 1: READING INPUT

| Rule | Correct ✓ | Wrong ✗ |
|------|-----------|---------|
| First content line = dictation blank | `Title: ________________________________________` | `'What is Living?'` or `'Title: "Our Future Dreams"'` |
| Skip rule: first line starts with `Stage` | OK — no dictation blank needed | — |
| Skip rule: first line ≥ 200 chars | OK — it IS the story prose (W28 format) | — |
| `[ Sub-total: ___ / 6 ]` present | ✓ | Missing |

**Fix command:** `python3 pipeline/fix_parts_1_5_6_7_8.py <week>`

---

### PART 2: VOCABULARY PRACTICE

| Rule | Correct ✓ | Wrong ✗ |
|------|-----------|---------|
| Items numbered `1. word (Vietnamese: ...)` | ✓ | Unnumbered list |
| Sub-total per session | `[ Sub-total: ___ / 7 ]` (S1=7, S2=6, S3=5) | Missing |
| Each week has 18 vocab words | `vocab_tiers` has 18 entries | 5 words only |

---

### PART 3: SENTENCE SHADOWING

| Rule | Correct ✓ | Wrong ✗ |
|------|-----------|---------|
| L1–L5 all present and numbered | `L1:`, `L2:`, ... `L5:` | Missing levels or unnumbered |
| Each level has numbered sentences | `1. sentence` | `sentence` (no number) |
| Sub-total per level | `[ Sub-total: ___ / N ]` | Missing |

---

### PART 5: ERROR CORRECTION

| Rule | Correct ✓ | Wrong ✗ |
|------|-----------|---------|
| Items numbered | `1. 'error sentence.'` | `Type A: error sentence.` |
| Each item has Mistake/Correction line | `→ Mistake: ____________________ \| Correction: skeleton` | `→ ___________` (blank arrow) |
| Sub-total at end | `[ Sub-total: ___ / 5 ]` | Missing |

**Fix command:** `python3 pipeline/fix_parts_1_5_6_7_8.py <week>`

---

### PART 6: STEM/CLIL

| Rule | Correct ✓ | Wrong ✗ |
|------|-----------|---------|
| If Extended Task exists → items numbered | `1. I can ________ because ________` | Unnumbered frames |
| Sub-total at end | `[ Sub-total: ___ / N ]` | Missing |

---

### PART 7: QUICK PRODUCTION

| Rule | Correct ✓ | Wrong ✗ |
|------|-----------|---------|
| All items numbered | `1. Write "nông trại" in English: ___` | Unnumbered |
| Sub-total at end | `[ Sub-total: ___ / N ]` | Missing |

**Fix command:** `python3 pipeline/fix_parts_1_5_6_7_8.py <week>`

---

### PART 8: MY PORTFOLIO

| Rule | Correct ✓ | Wrong ✗ |
|------|-----------|---------|
| Sub-total at end | `[ Sub-total: ___ / N ]` | Missing |

**Fix command:** `python3 pipeline/fix_parts_1_5_6_7_8.py <week>`

---

## BƯỚC 0.8 — Validate & Save

```bash
# 1. Fix any PART 1/5/6/7/8 formatting issues
python3 pipeline/fix_parts_1_5_6_7_8.py <week>

# 2. Validate all rules (must show 0 errors)
python3 pipeline/validate_lesson_plan.py <week>

# 3. Generate DOCX
python3 pipeline/gen_lp_docx.py <week>
```

---

## BƯỚC 0.9 — Commit Template

```bash
git add public/data/lessons/W<N>.json mcp-server/data/lessons/W<N>.json
git commit -m "fix(W<N>): <short description of changes>

- PART 1: dictation blank set correctly
- PART 5: numbered Mistake/Correction + Sub-total
- PART 6/7/8: numbered + Sub-total"
git push origin main
```

---

## History — Why These Rules Exist

| Date | Issue | Root cause | Fix |
|------|-------|-----------|-----|
| 2026-Jan | W37-42 PART 1: story title appearing instead of blank | `build_from_docx.py` puts title as first content line | `fix_part1()` in `fix_parts_1_5_6_7_8.py` |
| 2026-Jan | W37-42 PART 5: old `Type A: error → ___` format | `build_from_docx.py` generates legacy format | `fix_part5()` fallback with "Type A/B/C" stripping |
| 2026-Jan | W37-42 PART 6/7/8: no numbering, no Sub-total | Same pipeline issue | `fix_part6/7/8()` functions |
| 2026-Jan | W1-36, W49-53: same issues discovered by new schema check | New schema checks added to `validate_lesson_plan.py` | `fix_parts_1_5_6_7_8.py 1-36` + `49-53` |

---

## Quick Reference — Key Files

| File | Purpose |
|------|---------|
| `pipeline/fix_parts_1_5_6_7_8.py` | Fixes PART 1/5/6/7/8 format issues; run on any week range |
| `pipeline/validate_lesson_plan.py` | Schema validator; 53/53 must pass before DOCX gen |
| `pipeline/gen_lp_docx.py` | Generate printable DOCX from JSON |
| `pipeline/enrich_cambridge.py` | Enrich weeks with Cambridge vocabulary (--force-vocab flag) |
| `pipeline/enrich_w37_42_direct.py` | Inline enrichment for W37-42 (no external API needed) |
