"""
Audit: compare declared [ Sub-total: ___ / N ] vs actual isExLine item count
for all weeks, all sessions, all parts.
"""
import json, re, glob

ARROW = '\u2192'

def is_ex_line(t):
    t = t.strip()
    if not t: return False
    if t.startswith(ARROW) or t.startswith('\u2b1b'): return False
    if re.match(r'^[_\s]+$', t): return False
    if re.match(r'^\[\s*(Sub-total|Total)', t) or re.search(r'/\s*\d+\s*\]', t): return False
    if t.startswith('\U0001f4cb'): return False
    if re.match(r'^\d+\.\s', t) or re.match(r'^[a-p]\.\s', t): return False
    if re.match(r'^Stage\s+\d', t) or re.match(r'^(\[O\]\s*)?L[1-5]\s*[—\u2013\-]', t): return False
    if re.match(r'^Student [AB]:|^Goal:', t): return False
    if re.match(r'^Grammar sentences.*:', t) and '____' not in t: return False
    if re.match(r'^(\[O\]\s*)?[A-F]\.\s*(Stage|Dictation|Inference)', t): return False
    if re.match(r'^[A-F]\.\s*$', t): return False
    if re.match(r'^(Extension|Challenge|Design challenge):', t) and '____' not in t: return False
    if re.match(r'^Write\s+.+:\s*$', t): return False
    # Video script passage with [N] blanks — not individually scored
    if re.search(r'\[\d+\]\s*_{3,}', t): return False
    return (
        t.startswith('T / F:') or
        ('____' in t and not t.startswith(ARROW)) or
        ' -> ' in t or
        t.startswith('Base:') or
        bool(re.match(r'^Type\s+[A-Z]', t))
    )

def get_part_key(title):
    for key in ['PART 1', 'PART 2', 'PART 3', 'PART 4', 'PART 5', 'PART 6', 'PART 7', 'PART 8']:
        if title.startswith(key + ':') or title.startswith(key + ' '):
            return key
    return None

mismatches = []
for f in sorted(glob.glob('mcp-server/data/lessons/W*.json')):
    wn = re.search(r'W(\d+)', f).group(1)
    data = json.load(open(f, encoding='utf-8'))
    for si, sess in enumerate(data['sessions']):
        for p in sess['parts']:
            title = p.get('title', '')
            pk = get_part_key(title)
            if not pk: continue
            c = p.get('content', [])
            marker = next((str(l) for l in c if 'Sub-total' in str(l)), None)
            declared = None
            if marker:
                m = re.search(r'/\s*(\d+)', marker)
                if m: declared = int(m.group(1))
            actual = sum(1 for l in c if is_ex_line(str(l)))
            if declared != actual:
                mismatches.append({
                    'week': wn, 'session': si+1, 'part': pk,
                    'declared': declared, 'actual': actual, 'marker': marker
                })

print(f'Total mismatches: {len(mismatches)}')
for m in mismatches:
    print(f"  W{m['week']} S{m['session']} {m['part']}: declared={m['declared']}, actual={m['actual']}")
