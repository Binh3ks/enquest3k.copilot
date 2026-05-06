import json, re

ARROW = '\u2192'
def is_ex_line(t):
    t = t.strip()
    if not t or t.startswith(ARROW) or t.startswith('\u2b1b'): return False
    if re.match(r'^[_\s]+$', t): return False
    if re.match(r'^\[\s*(Sub-total|Total)', t) or re.search(r'/\s*\d+\s*\]', t): return False
    if re.match(r'^\d+\.\s', t) or re.match(r'^[a-p]\.\s', t): return False
    if re.match(r'^Stage\s+\d', t) or re.match(r'^(\[O\]\s*)?L[1-5]\s*[—–\-]', t): return False
    if re.match(r'^(Extension|Challenge|Design challenge):', t) and '____' not in t: return False
    if re.match(r'^Write\s+.+:\s*$', t): return False
    if re.search(r'\[\d+\]\s*_{3,}', t): return False
    return (t.startswith('T / F:') or ('____' in t and not t.startswith(ARROW)) or
            ' -> ' in t or t.startswith('Base:') or bool(re.match(r'^Type\s+[A-Z]', t)))

for wk in [27, 28, 29, 30, 31, 32]:
    data = json.load(open(f"mcp-server/data/lessons/W{wk}.json"))
    print(f"\nW{wk} PART 3:")
    for si, s in enumerate(data['sessions']):
        for p in s['parts']:
            title = p.get('title', '')
            if not title.startswith('PART 3'):
                continue
            c = p.get('content', [])
            current_l = None
            l_counts = {}
            for line in c:
                t = str(line).strip()
                m = re.match(r'^(?:\[O\]\s*)?L([1-5])\s*[——\-]', t)
                if m:
                    current_l = 'L' + m.group(1)
                    l_counts[current_l] = 0
                elif current_l and is_ex_line(t):
                    l_counts[current_l] += 1
            total = sum(l_counts.values())
            marker = next((str(l) for l in c if 'Sub-total' in str(l)), 'NO MARKER')
            summary = '  '.join(f"{k}:{v}" for k, v in l_counts.items())
            print(f"  S{si+1}: {total}pts  {marker}  | {summary}")
