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

print("Week | Ses | PART3 declared | PART3 actual items")
print("-" * 52)
for wk in range(26, 37):
    try:
        data = json.load(open(f'mcp-server/data/lessons/W{wk}.json'))
    except FileNotFoundError:
        continue
    for si, s in enumerate(data['sessions']):
        for p in s['parts']:
            if not p['title'].startswith('PART 3'):
                continue
            c = p['content']
            declared = None
            for l in c:
                m = re.search(r'Sub-total.*\/\s*(\d+)', str(l))
                if m:
                    declared = int(m.group(1))
                    break
            actual = sum(1 for l in c if is_ex_line(str(l)))
            flag = ' <<< MISMATCH' if declared != actual else ''
            print(f'W{wk:2d} | S{si+1} | /{declared if declared else "?":<6} | {actual}{flag}')
