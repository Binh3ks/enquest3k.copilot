import json, re

ARROW = '\u2192'

def is_ex_line(t):
    t = t.strip()
    if not t or t.startswith(ARROW) or t.startswith('\u2b1b'): return False
    if re.match(r'^[_\s]+$', t): return False
    if re.match(r'^\[\s*(Sub-total|Total)', t) or re.search(r'/\s*\d+\s*\]', t): return False
    if re.match(r'^\d+\.\s', t) or re.match(r'^[a-p]\.\s', t): return False
    if re.match(r'^Stage\s+\d', t) or re.match(r'^(\[O\]\s*)?L[1-5]\s*[—\u2013\-]', t): return False
    if re.match(r'^(Extension|Challenge|Design challenge):', t) and '____' not in t: return False
    if re.match(r'^Write\s+.+:\s*$', t): return False
    if re.search(r'\[\d+\]\s*_{3,}', t): return False
    return (
        t.startswith('T / F:') or
        ('____' in t and not t.startswith(ARROW)) or
        ' -> ' in t or
        t.startswith('Base:') or
        bool(re.match(r'^Type\s+[A-Z]', t))
    )

data = json.load(open('mcp-server/data/lessons/W27.json'))
for p in data['sessions'][0]['parts']:
    if not p['title'].startswith('PART 3'):
        continue
    print('=== Counted as exercise ===')
    for l in p['content']:
        if is_ex_line(str(l)):
            print(' +', repr(str(l)[:90]))
    print('\n=== NOT counted but has ____ ===')
    for l in p['content']:
        t = str(l).strip()
        if '____' in t and not is_ex_line(t):
            print(' -', repr(t[:90]))
    break
