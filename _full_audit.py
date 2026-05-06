"""
Full audit of W30-W36 vs W29 golden standard.
Checks every tab, every part, every field.
"""
import json, os

BASE = os.path.dirname(os.path.abspath(__file__))

GOLDEN_VT_COUNT = 10  # W29 has 10 vocab items
GOLDEN_TC_FIELDS = ['session_label','reading_passage','listening_script','grammar_notes','speaking_notes','stem_extension','in_class_speaking','vc_answer_key']
GOLDEN_PART_COUNTS = {  # W29 S1 golden minimums
    'SPIRAL REVIEW': 3,
    'PART 1': 6,
    'PART 2': 20,  # vocab section - must be rich
    'PART 3': 50,  # Cambridge exercises - must be rich
    'PART 4': 8,
    'PART 5': 5,
    'PART 6': 6,
    'PART 7': 5,
    'PART 8': 4,
    'PART 9': 25,
}

issues_by_week = {}

for n in range(29, 37):
    path = os.path.join(BASE, 'mcp-server/data/lessons/W%d.json' % n)
    w = json.load(open(path, encoding='utf-8'))
    issues = []

    # 1. vocab_tiers
    vt = w.get('vocab_tiers', [])
    issues.append('[vocab_tiers] count=%d%s' % (len(vt), ' ✓' if len(vt) >= 8 else ' ✗ NEEDS MORE'))
    for i, v in enumerate(vt):
        word = v.get('Word','?')
        mt = v.get('Memory Trick','')
        vn = v.get('Vietnamese','')
        col = v.get('Key Collocation(s)','')
        problems = []
        if not mt: problems.append('missing Memory Trick')
        if not vn: problems.append('missing Vietnamese')
        if not col: problems.append('missing Collocation')
        if problems:
            issues.append('  [vocab_tiers][%d] "%s": %s' % (i, word, ', '.join(problems)))

    # 2. quick_ref
    qr = w.get('quick_ref', {})
    for key in ['Grammar Focus', 'Key Pattern', 'Vocabulary', 'Theme']:
        if not qr.get(key):
            issues.append('[quick_ref] missing: %s' % key)

    # 3. sessions - all 3 sessions, all parts
    sessions = w.get('sessions', [])
    if len(sessions) != 3:
        issues.append('[sessions] count=%d (expected 3)' % len(sessions))
    for sess in sessions:
        sn = sess['session']
        parts = sess.get('parts', [])
        part_map = {}
        for p in parts:
            title = p.get('title','')
            for key in GOLDEN_PART_COUNTS:
                if key in title:
                    part_map[key] = (p, len(p.get('content',[])))
        for key, min_lines in GOLDEN_PART_COUNTS.items():
            if key not in part_map:
                issues.append('[sessions][S%d] MISSING part: %s' % (sn, key))
            else:
                _, cnt = part_map[key]
                marker = '✓' if cnt >= min_lines else '✗'
                if cnt < min_lines:
                    issues.append('[sessions][S%d][%s] %s lines (min %d)' % (sn, key, cnt, min_lines))

    # 4. sessions_5
    s5 = w.get('sessions_5', [])
    if len(s5) != 5:
        issues.append('[sessions_5] count=%d (expected 5)' % len(s5))
    for slot in s5:
        slot_n = slot.get('slot', slot.get('session','?'))
        parts = slot.get('parts', [])
        if len(parts) < 3:
            issues.append('[sessions_5][slot%s] only %d parts' % (slot_n, len(parts)))

    # 5. answer_key
    ak = w.get('answer_key', [])
    if len(ak) < 10:
        issues.append('[answer_key] count=%d (expected 10+)' % len(ak))

    # 6. task_cards
    tc_cards = w.get('task_cards', [])
    if len(tc_cards) < 30:
        issues.append('[task_cards] count=%d (expected 30+)' % len(tc_cards))

    # 7. games
    g = w.get('games', [])
    if len(g) < 2:
        issues.append('[games] count=%d (expected 2+)' % len(g))

    # 8. teacher_contents
    tc = w.get('teacher_contents', [])
    if len(tc) != 3:
        issues.append('[teacher_contents] count=%d (expected 3)' % len(tc))
    for s in tc:
        sn = s.get('session','?')
        for field in GOLDEN_TC_FIELDS:
            val = s.get(field)
            if val is None:
                issues.append('[teacher_contents][S%s] MISSING field: %s' % (sn, field))
            elif isinstance(val, str) and len(val.strip()) < 50:
                issues.append('[teacher_contents][S%s][%s] too short: %d chars' % (sn, field, len(val.strip())))
            elif isinstance(val, dict):
                text = val.get('text','')
                if len(text) < 20:
                    issues.append('[teacher_contents][S%s][%s] dict.text too short: %d chars' % (sn, field, len(text)))

    issues_by_week[n] = issues

# Print report
print('=' * 70)
print('FULL AUDIT REPORT: W29-W36 vs Golden Standard')
print('=' * 70)
for n in range(29, 37):
    issues = issues_by_week[n]
    errors = [i for i in issues if '✗' in i or 'MISSING' in i or 'too short' in i or 'NEEDS' in i or 'only' in i]
    print()
    print('--- W%d: %d ISSUES ---' % (n, len(errors)))
    for i in issues:
        if '✗' in i or 'MISSING' in i or 'too short' in i or 'NEEDS' in i or 'only' in i:
            print('  ERR: %s' % i)
        elif '✓' not in i:
            print('  INF: %s' % i)
