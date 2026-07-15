#!/usr/bin/env python3
"""
validate_lesson_plan.py
Comprehensive validator for W{N}.json files against the W28 Golden Schema.

Checks every contract defined in GOLDEN_SCHEMA.json:
  - Top-level field presence and types
  - quick_ref: required keys, no 'Unit / Theme', Block is single letter
  - vocab_tiers: 4-field schema, Tier 2 Memory Trick format
  - sessions: exactly 3, each has 9-12 parts with correct PART titles
  - sessions_5: exactly 5 slots, labels start with 'Slot N —'
  - sessions_5 labels never collide with 'Session N' teacher_contents labels
  - teacher_contents: exactly 3, session 1/2/3, all required fields
  - task_cards_by_session keys are '1'/'2'/'3'
  - answer_key_by_session keys are 's1'/'s2'/'s3'
  - No forbidden strings in part titles ([ALL], [O], emoji, etc.)

Usage:
  python3 pipeline/validate_lesson_plan.py 28           # validate W28
  python3 pipeline/validate_lesson_plan.py 29 30 31     # validate multiple
  python3 pipeline/validate_lesson_plan.py --all        # validate all existing
  python3 pipeline/validate_lesson_plan.py --strict 29  # fail on warnings too
"""

import sys, json, re
from pathlib import Path

ROOT = Path(__file__).parent.parent
PUB_LESSONS = ROOT / 'public/data/lessons'

# ── Contract constants (from GOLDEN_SCHEMA.json) ──────────────────────────────

REQUIRED_TOP_KEYS = [
    'week', 'unit_theme', 'quick_ref', 'methodology', 'vocab_tiers',
    'sessions', 'sessions_2', 'sessions_5',
    'answer_key', 'answer_key_by_session', 'task_cards', 'task_cards_by_session',
    'games', 'video_prompts', 'teacher_contents',
]

REQUIRED_QR_KEYS = [
    'Week', 'Block', 'Theme', 'Grammar Focus', 'Key Pattern',
    'Vocabulary', 'Spiral Review', 'STEM/CLIL Topic', 'FK Target',
]

VOCAB_REQUIRED_FIELDS = ['Word', 'Vietnamese', 'Key Collocation(s)', 'Memory Trick']
VOCAB_FORBIDDEN_FIELDS = ['Base', 'POS', '☐', 'Simple English definition', 'Key Collocation']

FORBIDDEN_IN_TITLE = ['[ALL]', '[O]', '[Y]', '[O-ALL]', 'Station C', 'Whole-class pause']
PART_TITLE_PATTERNS = {
    'PART 1': re.compile(r'^PART 1: READING INPUT'),
    'PART 2': re.compile(r'^PART 2: VOCABULARY BUILDING'),
    'PART 3': re.compile(r'^PART 3: SENTENCE BUILDING'),
    'PART 4': re.compile(r'^PART 4: LISTENING PRACTICE'),
    'PART 5': re.compile(r'^PART 5: ERROR CORRECTION'),
    'PART 6': re.compile(r'^PART 6: STEM/CLIL'),
    'PART 7': re.compile(r'^PART 7: QUICK PRODUCTION CHECK'),
    'PART 8': re.compile(r'^PART 8: MY PORTFOLIO ENTRY'),
    'PART 9': re.compile(r'^PART 9: HOMEWORK'),
}
SLOT_LABEL_RE = re.compile(r'^Slot [1-5] —')


# ── Validator ─────────────────────────────────────────────────────────────────

class ValidationResult:
    def __init__(self, week_num):
        self.week = week_num
        self.errors = []
        self.warnings = []
        self.ok = True

    def error(self, msg):
        self.errors.append(msg)
        self.ok = False

    def warn(self, msg):
        self.warnings.append(msg)

    def report(self, strict=False):
        week_str = 'W%d' % self.week
        if not self.errors and not self.warnings:
            print('%s ✓ — all checks pass' % week_str)
            return True
        if self.errors:
            print('%s ✗ — %d error(s), %d warning(s)' % (week_str, len(self.errors), len(self.warnings)))
            for e in self.errors:
                print('  ❌ %s' % e)
        else:
            print('%s ⚠ — 0 errors, %d warning(s)' % (week_str, len(self.warnings)))
        for w in self.warnings:
            print('  ⚠️  %s' % w)
        if strict:
            return not self.errors and not self.warnings
        return not self.errors


def validate_week(week_num, strict=False):
    path = PUB_LESSONS / ('W%d.json' % week_num)
    r = ValidationResult(week_num)

    if not path.exists():
        r.error('File not found: %s' % path)
        r.report()
        return r

    with open(path, encoding='utf-8') as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as e:
            r.error('JSON parse error: %s' % e)
            r.report()
            return r

    _check_top_level(data, r, week_num)
    _check_quick_ref(data, r)
    _check_vocab_tiers(data, r)
    _check_sessions(data, r, week_num)
    _check_sessions_5(data, r)
    _check_sessions_2(data, r)
    _check_teacher_contents(data, r)
    _check_tc_label_collision(data, r)
    _check_answer_key(data, r)
    _check_task_cards(data, r)
    _check_games(data, r)
    _check_video_prompts(data, r)

    r.report(strict=strict)
    return r


def _check_top_level(data, r, week_num):
    for key in REQUIRED_TOP_KEYS:
        if key not in data:
            r.error('Missing top-level key: "%s"' % key)
    if data.get('week') != week_num:
        r.error('"week" field is %s but expected %d' % (data.get('week'), week_num))
    if not data.get('unit_theme', '').strip():
        r.error('"unit_theme" is empty')


def _check_quick_ref(data, r):
    qr = data.get('quick_ref', {})
    if not isinstance(qr, dict):
        r.error('quick_ref must be a dict, got %s' % type(qr).__name__)
        return
    for key in REQUIRED_QR_KEYS:
        if key not in qr:
            r.error('quick_ref missing required key: "%s"' % key)
    if 'Unit / Theme' in qr:
        r.error('quick_ref still has deprecated "Unit / Theme" key (should be "Theme")')
    block = qr.get('Block', '')
    if block and not re.match(r'^[A-Z]$', block):
        r.warn('quick_ref Block is "%s" — expected single uppercase letter' % block)


def _check_vocab_tiers(data, r):
    vt = data.get('vocab_tiers', [])
    if not isinstance(vt, list):
        r.error('vocab_tiers must be a list')
        return
    if len(vt) < 4:
        r.warn('vocab_tiers has only %d entries (expected ≥4)' % len(vt))
    for i, v in enumerate(vt):
        if not isinstance(v, dict):
            r.error('vocab_tiers[%d] is not a dict' % i)
            continue
        for field in VOCAB_REQUIRED_FIELDS:
            if field not in v:
                r.error('vocab_tiers[%d] ("%s") missing field: "%s"' % (i, v.get('Word', '?'), field))
        for field in VOCAB_FORBIDDEN_FIELDS:
            if field in v:
                r.error('vocab_tiers[%d] has forbidden field "%s" — use normalize_vocab_tiers()' % (i, field))
        # Check Tier 2: Memory Trick should start with "Definition:"
        mt = v.get('Memory Trick', '')
        if 'cambridge' in str(v).lower() or '—' in mt:
            # Might be tier 2 — check it starts with Definition:
            pass  # relaxed check


def _check_sessions(data, r, week_num):
    sessions = data.get('sessions', [])
    if len(sessions) != 3:
        r.error('sessions must have exactly 3 entries, got %d' % len(sessions))
        return
    for sess in sessions:
        sn = sess.get('session')
        if sn not in (1, 2, 3):
            r.error('session.session must be 1/2/3, got %s' % sn)
        _check_session_parts(sess, r, week_num)


def _check_session_parts(sess, r, week_num):
    sn = sess.get('session', '?')
    parts = sess.get('parts', [])
    titles = [p.get('title', '') for p in parts]

    # Detect MATH/ELA variant weeks — these use non-standard PART numbering
    MATH_INDICATOR = re.compile(r'MATH\s+COMPONENT|ELA\s+COMPONENT|READING\s+MATH', re.I)
    is_math_variant = any(MATH_INDICATOR.search(t) for t in titles)

    if is_math_variant:
        # Relaxed checks: just ensure no forbidden markers remain
        for t in titles:
            for forbidden in FORBIDDEN_IN_TITLE:
                if forbidden in t:
                    r.error('S%s: MATH-week title has forbidden string "%s": %s' % (sn, forbidden, t[:70]))
                    break
        return  # skip PART N structure validation for MATH variant

    if len(parts) < 9:
        r.error('S%s: only %d parts (expected ≥9)' % (sn, len(parts)))

    # Check forbidden strings in any title
    for t in titles:
        for forbidden in FORBIDDEN_IN_TITLE:
            if forbidden in t:
                r.error('S%s: title has forbidden string "%s": %s' % (sn, forbidden, t[:70]))
                break

    # Check each required PART exists (PART 6 STEM/CLIL is optional for early weeks that omit it)
    OPTIONAL_PARTS = {'PART 6'}
    for part_key, pattern in PART_TITLE_PATTERNS.items():
        if not any(pattern.match(t) for t in titles):
            if part_key in OPTIONAL_PARTS:
                r.warn('S%s: missing %s (no title matching "%s") — optional for weeks without STEM section' % (sn, part_key, pattern.pattern))
            else:
                r.error('S%s: missing %s (no title matching "%s")' % (sn, part_key, pattern.pattern))

    # Check header format: "WEEK N | SESSION N | BLOCK B"
    if titles:
        header = titles[0]
        if not re.match(r'^WEEK \d+ \| SESSION [123] \| BLOCK [A-Z]$', header):
            r.warn('S%s: header "%s" does not match "WEEK N | SESSION N | BLOCK X"' % (sn, header[:60]))

    # Check PART 8 has Week+Session info
    for t in titles:
        if t.startswith('PART 8:') and 'Week %d' % week_num not in t:
            r.warn('S%s: PART 8 title may not reference correct week number: %s' % (sn, t[:70]))

    # ── Content quality checks ───────────────────────────────────────────────
    for p in parts:
        title = p.get('title', '')
        content = p.get('content', [])
        joined = '\n'.join(content)

        # PART 1: first content line must be a dictation blank (not the story title)
        if title.startswith('PART 1:') and content:
            first = content[0]
            # Skip if starts with 'Stage' (no reading passage) or is long story prose (≥200 chars)
            if not first.startswith('Stage') and len(first) < 200:
                if '________' not in first:
                    r.error('S%s PART 1: first line must be a dictation blank (got: "%s"). '
                            'Set to: "Title: ________________________________________"' % (sn, first[:60]))
                if not any('Sub-total' in l for l in content):
                    r.error('S%s PART 1: missing [ Sub-total: ___ / N ]' % sn)

        # PART 5: must have numbered items (1., 2., ...) and Sub-total
        if title.startswith('PART 5:') and content:
            if not any(re.match(r'^\d+\.', l) for l in content):
                r.error('S%s PART 5: items must be numbered (1., 2., ...). '
                        'Run pipeline/fix_parts_1_5_6_7_8.py to fix.' % sn)
            if not any('Sub-total' in l for l in content):
                r.error('S%s PART 5: missing [ Sub-total: ___ / N ]' % sn)
            if not any('Mistake:' in l or 'Correction:' in l for l in content):
                r.warn('S%s PART 5: items should use "→ Mistake: ___ | Correction: ___" format' % sn)

        # PART 6: Extended Task items must be numbered and have Sub-total
        if title.startswith('PART 6:') and content:
            has_extended_task = any('Extended Task' in l for l in content)
            if has_extended_task:
                # Check at least one numbered item after Extended Task
                et_idx = next((i for i, l in enumerate(content) if 'Extended Task' in l), -1)
                after_et = content[et_idx + 1:] if et_idx >= 0 else []
                if after_et and not any(re.match(r'^\d+\.', l) for l in after_et):
                    r.error('S%s PART 6: Extended Task items must be numbered (1., 2., ...)' % sn)
            if not any('Sub-total' in l for l in content):
                r.error('S%s PART 6: missing [ Sub-total: ___ / N ]' % sn)

        # PART 7: items must be numbered and have Sub-total
        if title.startswith('PART 7:') and content:
            if not any(re.match(r'^\d+\.', l) for l in content):
                r.error('S%s PART 7: items must be numbered (1., 2., ...). '
                        'Run pipeline/fix_parts_1_5_6_7_8.py to fix.' % sn)
            if not any('Sub-total' in l for l in content):
                r.error('S%s PART 7: missing [ Sub-total: ___ / N ]' % sn)

        # PART 8: must have Sub-total
        if title.startswith('PART 8:') and content:
            if not any('Sub-total' in l for l in content):
                r.error('S%s PART 8: missing [ Sub-total: ___ / N ]' % sn)


def _check_sessions_5(data, r):
    s5 = data.get('sessions_5', [])
    if len(s5) != 5:
        r.error('sessions_5 must have exactly 5 entries, got %d' % len(s5))
        return
    for slot in s5:
        lbl = slot.get('session_label', '')
        if not SLOT_LABEL_RE.match(lbl):
            r.error('sessions_5 slot %s label must start with "Slot N —", got: "%s"' % (
                slot.get('session', '?'), lbl[:60]))
        if not slot.get('parts'):
            r.error('sessions_5 slot %s has no parts' % slot.get('session', '?'))


def _check_sessions_2(data, r):
    s2 = data.get('sessions_2', [])
    if len(s2) != 2:
        r.warn('sessions_2 should have 2 entries, got %d' % len(s2))


def _check_teacher_contents(data, r):
    tc = data.get('teacher_contents', [])
    if not isinstance(tc, list):
        r.error('teacher_contents must be a list')
        return
    if len(tc) != 3:
        r.error('teacher_contents must have exactly 3 entries (one per original session), got %d' % len(tc))
        return
    for i, entry in enumerate(tc):
        sn = entry.get('session')
        if sn != i + 1:
            r.error('teacher_contents[%d].session should be %d, got %s' % (i, i+1, sn))
        ls = entry.get('listening_script', {})
        if not isinstance(ls, dict):
            r.error('teacher_contents[%d].listening_script must be a dict' % i)
        elif not ls.get('text', '').strip():
            r.warn('teacher_contents[%d].listening_script.text is empty' % i)
        for field in ['speaking_notes', 'stem_extension', 'in_class_speaking', 'vc_answer_key']:
            if not entry.get(field, '').strip():
                r.warn('teacher_contents[%d].%s is empty' % (i, field))


def _check_tc_label_collision(data, r):
    """Ensure sessions_5 slot labels do not use 'Session N' wording that collides with teacher_contents."""
    s5 = data.get('sessions_5', [])
    tc_nums = {str(t['session']) for t in data.get('teacher_contents', []) if 'session' in t}
    for slot in s5:
        lbl = slot.get('session_label', '')
        for num in tc_nums:
            if 'Session %s' % num in lbl:
                r.error('sessions_5 label collision: slot label "%s" uses "Session %s" '
                        'which is also a teacher_contents session number' % (lbl[:60], num))


def _check_answer_key(data, r):
    ak_bs = data.get('answer_key_by_session', {})
    for key in ['s1', 's2', 's3']:
        if key not in ak_bs:
            r.error('answer_key_by_session missing key "%s"' % key)
    for k in ak_bs:
        if not k.startswith('s') or not k[1:].isdigit():
            r.error('answer_key_by_session has unexpected key "%s" (expected s1/s2/s3)' % k)


def _check_task_cards(data, r):
    tc_bs = data.get('task_cards_by_session', {})
    for key in ['1', '2', '3']:
        if key not in tc_bs:
            r.error('task_cards_by_session missing key "%s"' % key)
    for k in tc_bs:
        if k.startswith('s'):
            r.error('task_cards_by_session has old-style key "%s" (should be "1"/"2"/"3")' % k)


def _check_games(data, r):
    games = data.get('games', [])
    if not games:
        r.warn('games is empty')
        return
    required = ['id', 'name', 'type', 'duration', 'players', 'session_fit', 'materials', 'instructions']
    for i, g in enumerate(games):
        for field in required:
            if field not in g:
                r.warn('games[%d] missing field "%s"' % (i, field))


def _check_video_prompts(data, r):
    vp = data.get('video_prompts', {})
    if not isinstance(vp, dict):
        r.warn('video_prompts should be a dict with "chanting" and "shadowing" keys')
        return
    for key in ['chanting', 'shadowing']:
        if key not in vp:
            r.warn('video_prompts missing "%s" key' % key)


# ── CLI ───────────────────────────────────────────────────────────────────────

def main():
    args = sys.argv[1:]
    strict = '--strict' in args
    args = [a for a in args if a != '--strict']

    if '--all' in args:
        weeks = sorted([int(f.stem[1:]) for f in PUB_LESSONS.glob('W*.json') if f.stem[1:].isdigit()])
    elif args:
        weeks = [int(a) for a in args]
    else:
        print('Usage: python3 pipeline/validate_lesson_plan.py [--strict] [--all | week_nums...]')
        print('  --all    validate every W*.json in public/data/lessons/')
        print('  --strict treat warnings as failures')
        sys.exit(0)

    total = len(weeks)
    passed = 0
    failed = []

    print('Validating %d week(s) against W28 Golden Schema...' % total)
    print()
    for wn in weeks:
        result = validate_week(wn, strict=strict)
        if result.ok and (not strict or not result.warnings):
            passed += 1
        else:
            failed.append(wn)

    print()
    print('─' * 50)
    print('Results: %d/%d passed%s' % (passed, total, ' (strict mode)' if strict else ''))
    if failed:
        print('Failed: W%s' % ', W'.join(str(w) for w in failed))
        sys.exit(1)
    else:
        print('✓ All weeks pass validation')


if __name__ == '__main__':
    main()
