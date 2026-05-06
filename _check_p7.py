import json, re, glob

ARROW = '\u2192'

def is_ex_line(t):
    t = t.strip()
    if not t: return False
    if t.startswith(ARROW) or t.startswith('\u2b1b'): return False
    if re.match(r'^[_\s]+$', t): return False
    if re.match(r'^\[\s*(Sub-total|Total)', t) or re.search(r'/\s*\d+\s*\]', t): return False
    if re.match(r'^\d+\.\s', t) or re.match(r'^[a-p]\.\s', t): return False
    if re.match(r'^Stage\s+\d', t) or re.match(r'^(\[O\]\s*)?L[1-5]\s*[—\u2013\-]', t): return False
    if re.match(r'^(Extension|Challenge|Design challenge):', t) and '____' not in t: return False
    if re.match(r'^Write\s+.+:\s*$', t): return False
    if re.search(r'\[\d+\]\s*_{3,}', t): return False
    return (t.startswith('T / F:') or ('____' in t and not t.startswith(ARROW)) or
            ' -> ' in t or t.startswith('Base:') or bool(re.match(r'^Type\s+[A-Z]', t)))

def get_part_key(title):
    for key in ['PART 1','PART 2','PART 3','PART 4','PART 5','PART 6','PART 7','PART 8']:
        if title.startswith(key+':') or title.startswith(key+' '):
            return key
    return None

for w in range(28, 37):
    try:
        data = json.load(open(f'mcp-server/data/lessons/W{w}.json', encoding='utf-8'))
    except Exception:
        continue
    for si, sess in enumerate(data['sessions']):
        for p in sess['parts']:
            if get_part_key(p.get('title','')) != 'PART 7':
                continue
            c = p.get('content', [])
            marker = next((str(l) for l in c if 'Sub-total' in str(l)), 'NONE')
            items = sum(1 for l in c if is_ex_line(str(l)))
            print(f'W{w} S{si+1}: declared={marker!r} | counted={items}')
            for l in c:
                print(f'   {repr(str(l)[:80])}')
