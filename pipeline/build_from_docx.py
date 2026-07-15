#!/usr/bin/env python3
"""
pipeline/build_from_docx.py
════════════════════════════════════════════════════════════════════════════════
WORKFLOW 1: Build lesson plans for W01-W53 from reference DOCX files.

This is the single entry point for producing lesson plan JSON from DOCX.
It combines:
  1. scripts/parse_docx_lessons.py  — parses raw content from DOCX
  2. build_lesson_plans_from_docx.py — adds teacher_contents + vocab normalization
  3. fix_w28_format.py              — transforms raw parsed data to W28 golden standard
  4. pipeline/validate_lesson_plan.py — validates output against golden schema

DOCX Coverage:
  W01-24  →  2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W01-24.docx
  W25-36  →  2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W25-36.docx
  W37-53  →  2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W37-53.docx

Output (all 5 files always updated together):
  1. public/data/lessonPlans.json
  2. public/data/lessonPlans_index.json
  3. mcp-server/data/lessonPlans_index.json
  4. mcp-server/data/lessons/W{N}.json
  5. public/data/lessons/W{N}.json

Usage:
  python3 pipeline/build_from_docx.py              # build ALL W01-53
  python3 pipeline/build_from_docx.py 1            # single week
  python3 pipeline/build_from_docx.py 1 2 3        # specific weeks
  python3 pipeline/build_from_docx.py 1-24         # range
  python3 pipeline/build_from_docx.py --no-validate # skip validation step
  python3 pipeline/build_from_docx.py --dry-run    # parse but don't write files

Pipeline Steps:
  STEP 1 → parse_docx_lessons.process_week()       [raw content from DOCX]
  STEP 2 → add_teacher_contents()                  [W28-schema teacher materials]
  STEP 3 → normalize_vocab_tiers()                 [fix Tier 1/Tier 2 field names]
  STEP 4 → transform_to_golden_format()            [W28 PART titles, sessions_5, etc.]
  STEP 5 → inject_to_all_5_files()                 [write to output files]
  STEP 6 → validate_lesson_plan()                  [schema validation]
"""

import sys, json, re, copy
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT / 'scripts'))
sys.path.insert(0, str(ROOT))

import parse_docx_lessons as pml

# Import transformation + normalization functions from existing scripts
from build_lesson_plans_from_docx import (
    extract_teacher_contents,
    parse_pipe_vocab,
    normalize_vocab_tiers,
    inject_week as inject_all_5_files,
)
from fix_w28_format import transform_week

# Lazy import validator to avoid circular deps
def _validate(week_num):
    from pipeline.validate_lesson_plan import validate_week
    return validate_week(week_num)

DOCX_MAP = {
    range(1,  25): ROOT / 'Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W01-24.docx',
    range(25, 37): ROOT / 'Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W25-36.docx',
    range(37, 54): ROOT / 'Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W37-53.docx',
}

# Cache loaded DOCX objects to avoid re-loading for multiple weeks in same file
_docx_cache = {}


def get_docx_for_week(week_num):
    """Returns (doc, paras, body_items, para_to_bi, week_ranges) for the DOCX covering week_num."""
    docx_path = None
    for rng, path in DOCX_MAP.items():
        if week_num in rng:
            docx_path = path
            break

    if docx_path is None:
        raise ValueError('Week %d is not covered by any reference DOCX (W01-53 only). '
                         'Use pipeline/generate_ai_week.py for W54+.' % week_num)

    cache_key = str(docx_path)
    if cache_key not in _docx_cache:
        if not docx_path.exists():
            raise FileNotFoundError('Reference DOCX not found: %s' % docx_path)
        print('  Loading DOCX: %s...' % docx_path.name, end='', flush=True)
        doc, paras, body_items, para_to_bi = pml.load_doc(str(docx_path))
        week_ranges, _ = pml.find_week_ranges(paras)
        _docx_cache[cache_key] = (doc, paras, body_items, para_to_bi, week_ranges)
        print(' %d weeks detected.' % len(week_ranges))

    doc, paras, body_items, para_to_bi, week_ranges = _docx_cache[cache_key]
    if week_num not in week_ranges:
        raise ValueError('Week %d not found in %s. Available: %s' % (
            week_num, docx_path.name, sorted(week_ranges.keys())))
    return doc, paras, body_items, para_to_bi, week_ranges


def build_single_week(week_num, dry_run=False):
    """Full pipeline for one week: parse → normalize → transform → inject → validate."""

    # ── STEP 1: Parse raw content from DOCX ──────────────────────────────────
    doc, paras, body_items, para_to_bi, week_ranges = get_docx_for_week(week_num)
    wstart, wend = week_ranges[week_num]
    data = pml.process_week(doc, paras, body_items, para_to_bi, week_num, wstart, wend)

    # Clean unit_theme (remove ═══ separator artifacts)
    if data.get('unit_theme'):
        data['unit_theme'] = re.sub(r'\s*[═=─\-━]{3,}.*$', '', data['unit_theme']).strip()

    # ── STEP 2: Add teacher_contents ─────────────────────────────────────────
    data['teacher_contents'] = extract_teacher_contents(paras, wstart, wend)

    # ── STEP 3: Normalize vocab_tiers ────────────────────────────────────────
    vt = data.get('vocab_tiers', [])
    if len(vt) == 1 and 'content' in vt[0]:
        parsed = parse_pipe_vocab(vt[0]['content'])
        if parsed:
            vt = parsed
    data['vocab_tiers'] = normalize_vocab_tiers(vt)

    # ── STEP 4: Transform to W28 golden format ────────────────────────────────
    data = transform_week(week_num, data)

    n_sess = len(data['sessions'])
    n_voc  = len(data['vocab_tiers'])
    n_tc   = len(data['teacher_contents'])
    n_s5   = len(data.get('sessions_5', []))
    print('  W%d ▶ %d sessions | %d vocab | %d teacher_contents | %d slots' % (
        week_num, n_sess, n_voc, n_tc, n_s5))

    if dry_run:
        print('  W%d [DRY RUN] — not writing files' % week_num)
        return data

    # ── STEP 5: Inject to all 5 files ─────────────────────────────────────────
    inject_all_5_files(week_num, data)

    # ── STEP 6: Generate Lesson Plan DOCX ────────────────────────────────────
    try:
        from pipeline.gen_lp_docx import generate_lp_docx
        lp_path = generate_lp_docx(week_num)
        print('  W%d [DOCX] → %s' % (week_num, lp_path.name))
    except Exception as e:
        print('  W%d [DOCX] warning: could not generate DOCX (%s)' % (week_num, e))

    return data


def parse_week_args(args):
    """Parse CLI args into a sorted list of week numbers.
    Handles: '1', '1 2 3', '1-24', '37-53'
    """
    weeks = set()
    for arg in args:
        m = re.match(r'^(\d+)-(\d+)$', arg)
        if m:
            lo, hi = int(m.group(1)), int(m.group(2))
            weeks.update(range(lo, hi + 1))
        elif arg.isdigit():
            weeks.add(int(arg))
    return sorted(weeks)


def main():
    args = sys.argv[1:]
    dry_run = '--dry-run' in args
    no_docx = '--no-docx' in args
    args = [a for a in args if a != '--no-docx']
    no_validate = '--no-validate' in args
    args = [a for a in args if not a.startswith('--')]

    if args:
        weeks = parse_week_args(args)
    else:
        # All W01-53
        weeks = list(range(1, 54))

    # Filter to only weeks covered by DOCX
    covered = [w for w in weeks if 1 <= w <= 53]
    skipped = [w for w in weeks if w not in covered]
    if skipped:
        print('WARNING: weeks %s are not in W01-53 range — skipping. '
              'Use pipeline/generate_ai_week.py for W54+.' % skipped)

    if not covered:
        print('No valid weeks to process.')
        return

    print('Building %d week(s) from DOCX: W%s...' % (len(covered), ', W'.join(str(w) for w in covered[:5])))
    if len(covered) > 5:
        print('  (and %d more)' % (len(covered) - 5))
    print()

    success = []
    failures = []

    for week_num in covered:
        try:
            build_single_week(week_num, dry_run=dry_run)
            success.append(week_num)
        except Exception as e:
            print('  W%d ✗ ERROR: %s' % (week_num, e))
            failures.append(week_num)

    print()
    print('─' * 60)
    print('Built: %d/%d weeks' % (len(success), len(covered)))
    if failures:
        print('FAILED: W%s' % ', W'.join(str(w) for w in failures))

    if not no_validate and not dry_run and success:
        print()
        print('Running validation...')
        from pipeline.validate_lesson_plan import validate_week as _validate
        val_pass = []
        val_fail = []
        for wn in success:
            r = _validate(wn)
            if r.ok:
                val_pass.append(wn)
            else:
                val_fail.append(wn)
        print()
        print('Validation: %d/%d pass' % (len(val_pass), len(success)))
        if val_fail:
            print('Validation FAILED: W%s' % ', W'.join(str(w) for w in val_fail))
            sys.exit(1)

    if failures:
        sys.exit(1)


if __name__ == '__main__':
    main()
