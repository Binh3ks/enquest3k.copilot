"""
fix_w28_final.py — Comprehensive final fixes for W28 data
Fixes:
1. Malformed question lines (trailing underscores from split bug)
2. Sub-total lines: restore short blank ___
3. Example item 0: fill in answers (no student blanks in model)
4. Homework vocab a–p labels → numbers (1., 2., …)
5. Missing sub-total markers (PART 1, PART 4 S2, PART 6, PART 8)
6. GV activity cue headers at correct timestamps
"""
import json, re
from pathlib import Path

ROOT = Path(__file__).parent

SENT = '_' * 60   # full-sentence blank
WORD = '_' * 20   # word blank

# ── Part scoring table ────────────────────────────────────────────────────────
# Maps (session, part_title_keyword) → sub-total value
PART_SCORES = {
    (1, 'PART 1'): 6,   # T/F×2 + topic + who + hare-did + fill-in
    (2, 'PART 1'): 6,
    (3, 'PART 1'): 6,
    (2, 'PART 4'): 7,   # global + 5-match + dictation
    (1, 'PART 6'): 4,   # T/F + which faster + maths + bus scenario
    (2, 'PART 6'): 3,
    (3, 'PART 6'): 3,
    (1, 'PART 8'): 5,
    (2, 'PART 8'): 5,
    (3, 'PART 8'): 10,  # free writing → rubric
}

# ── GV activity cues ──────────────────────────────────────────────────────────
GV_CUES = {
    # (session, part_keyword, position): (label, name, minutes)
    # position: 'end' = append to end of part; 'start' = prepend to start of part
    (1, 'PART 2', 'end'):   '📋 GV Activity ①: Transport Flash-Introduction (3 min) — xem Teacher\'s Contents tab',
    (1, 'PART 9', 'start'): '📋 GV Activity ③: Speed Translation Drill (2 min) — xem Teacher\'s Contents tab',
    (2, 'PART 9', 'start'): '📋 GV Activity ③: Tortoise or Hare? Quick-fire (2 min) — xem Teacher\'s Contents tab',
    (3, 'PART 1', 'end'):   '📋 GV Activity ①: Round-Robin Story Chain (5 min) — xem Teacher\'s Contents tab',
    (3, 'PART 9', 'start'): '📋 GV Activity ③: Trophy Ceremony (3 min) — xem Teacher\'s Contents tab',
}

# S2 Activity ② happens WITHIN PART 3 — inject after L3 block
S2_L3_CUE = '📋 GV Activity ②: Comparison Chains (3 min) — xem Teacher\'s Contents tab'


def fix_trailing_blanks(content):
    """
    Remove trailing underscores from lines where the next line is already a pure blank.
    This fixes lines that were incorrectly left with underscores after splitting.
    """
    result = []
    for i, line in enumerate(content):
        s = str(line)
        # Look ahead: is the next line a pure blank (30+ underscores)?
        next_s = str(content[i + 1]) if i + 1 < len(content) else ''
        next_is_blank = bool(re.match(r'^[_\s]{30,}$', next_s.strip()))
        # Current line ends with 20+ underscores AND has alphabetic content before them?
        if next_is_blank and re.search(r'\w.*\s{0,3}_{20,}\s*$', s):
            s = re.sub(r'\s+_{20,}\s*$', '', s).rstrip()
        result.append(s)
    return result


def fix_subtotal_blank(content):
    """Restore short blank in [ Sub-total: / N ] lines."""
    result = []
    for line in content:
        s = str(line)
        # Replace expanded blank in [ Sub-total: __..__ / N ]
        fixed = re.sub(r'\[\s*Sub-total:\s*_{2,}\s*/\s*(\d+)\s*\]',
                       r'[ Sub-total: ___ / \1 ]', s)
        result.append(fixed)
    return result


def fix_example_item0(content):
    """Fill in blanks in the 'done for you' example item."""
    result = []
    i = 0
    while i < len(content):
        s = str(content[i])
        # Detect the model answer line for T/F example
        if (s.startswith('→ F.') or s.startswith('→ T.')) and '[fast / proud]' in s:
            # Fill in the blanks
            s = s.replace('He was very ____________________ and ____________________. [fast / proud]',
                          'He was very fast and proud.')
        result.append(s)
        i += 1
    return result


LETTER_MAP = {chr(ord('a') + i): str(i + 1) for i in range(16)}  # a→1 … p→16


def fix_vocab_labels(content):
    """Convert lettered vocab labels (a., b., …) to numbers in PART 9 content."""
    result = []
    for line in content:
        s = str(line)
        m = re.match(r'^([a-p])\. (.+)$', s)
        if m:
            s = f'{LETTER_MAP[m.group(1)]}. {m.group(2)}'
        result.append(s)
    return result


def add_subtotal_if_missing(content, sess_num, part_keyword):
    """Add [ Sub-total: ___ / N ] at end of part if missing."""
    key = (sess_num, part_keyword)
    if key not in PART_SCORES:
        return content
    # Check if already has sub-total
    for line in content:
        if 'Sub-total' in str(line):
            return content
    n = PART_SCORES[key]
    return list(content) + [f'[ Sub-total: ___ / {n} ]']


def inject_gv_cues(content, sess_num, part_keyword):
    """Inject GV activity cue lines at start/end of specific parts."""
    start_cue = GV_CUES.get((sess_num, part_keyword, 'start'))
    end_cue = GV_CUES.get((sess_num, part_keyword, 'end'))

    result = list(content)
    # Insert at end (before sub-total line if present)
    if end_cue:
        # Find sub-total line index if it exists
        st_idx = next((i for i, l in enumerate(result) if 'Sub-total' in str(l)), len(result))
        result.insert(st_idx, end_cue)

    # Insert at start
    if start_cue:
        result.insert(0, start_cue)

    return result


def inject_s2_l3_cue(content):
    """Inject S2 Activity ② cue after L3 block in PART 3 (before L4)."""
    result = []
    for i, line in enumerate(content):
        s = str(line)
        result.append(s)
        # Inject after the L3 section ends = when we see L4 header
        if re.match(r'^L4\s*[—–\-]', s) and not any(S2_L3_CUE in str(l) for l in result):
            # Insert the cue BEFORE L4 (i.e., after we just appended L4, insert before it)
            result.insert(len(result) - 1, S2_L3_CUE)
    return result


def process_part(part, sess_num):
    """Apply all fixes to a single part."""
    title = part.get('title', '')
    content = list(part.get('content', []))

    # Detect part keyword
    part_kw = None
    for pk in ['PART 1', 'PART 2', 'PART 3', 'PART 4', 'PART 5',
               'PART 6', 'PART 7', 'PART 8', 'PART 9']:
        if pk in title:
            part_kw = pk
            break

    if not part_kw:
        return part

    # Apply fixes in order
    content = fix_trailing_blanks(content)
    content = fix_subtotal_blank(content)
    content = fix_example_item0(content)

    if part_kw == 'PART 9':
        content = fix_vocab_labels(content)

    if part_kw == 'PART 3' and sess_num == 2:
        content = inject_s2_l3_cue(content)

    content = add_subtotal_if_missing(content, sess_num, part_kw)
    content = inject_gv_cues(content, sess_num, part_kw)

    part = dict(part)
    part['content'] = content
    return part


def main():
    json_paths = [
        ROOT / 'mcp-server/data/lessons/W28.json',
        ROOT / 'public/data/lessons/W28.json',
    ]

    for json_path in json_paths:
        print(f'\nProcessing {json_path.name}...')
        with open(json_path, encoding='utf-8') as f:
            d = json.load(f)

        for key in ['sessions', 'sessions_2', 'sessions_5']:
            for session in d.get(key, []):
                sess_num = session.get('session', 0)
                session['parts'] = [process_part(p, sess_num) for p in session.get('parts', [])]

        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(d, f, ensure_ascii=False, indent=2)
        print(f'  ✓ Saved')

    # Sync lessonPlans.json
    lp_path = ROOT / 'public/data/lessonPlans.json'
    with open(lp_path, encoding='utf-8') as f:
        lp = json.load(f)
    with open(ROOT / 'mcp-server/data/lessons/W28.json', encoding='utf-8') as f:
        d28 = json.load(f)
    if 'W28' in lp:
        lp['W28'] = d28
        with open(lp_path, 'w', encoding='utf-8') as f:
            json.dump(lp, f, ensure_ascii=False, indent=2)
    print('\n  ✓ lessonPlans.json synced')

    # Verification
    print('\n=== VERIFICATION ===')
    for key in ['sessions']:
        for s in d28.get(key, []):
            sn = s['session']
            for p in s.get('parts', []):
                title = p['title'][:40]
                # Check sub-total lines
                for line in p.get('content', []):
                    ls = str(line)
                    if 'Sub-total' in ls:
                        print(f'  S{sn} {title}: {ls}')
                    # Check for long trailing blanks in non-blank lines
                    if re.search(r'\w.*_{20,}\s*$', ls):
                        print(f'  TRAILING BLANK? S{sn} {title}: {repr(ls)[:80]}')

    # Check example item 0
    for s in d28.get('sessions', []):
        if s['session'] == 1:
            for p in s.get('parts', []):
                if 'PART 3' in p['title']:
                    for line in p.get('content', []):
                        if 'fast and proud' in str(line) or ('Example' in str(line)):
                            print(f'\n  EXAMPLE FIX: {repr(str(line))[:80]}')

    print('\nDone!')


if __name__ == '__main__':
    main()
