import json, re

def get_part_key(title):
    for k in ['PART 1','PART 2','PART 3','PART 4','PART 5','PART 6','PART 7','PART 8']:
        if title.startswith(k+':') or title.startswith(k+' '): return k
    return None

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

for wk in [26, 27, 28, 29, 30, 31, 32]:
    data = json.load(open(f"mcp-server/data/lessons/W{wk}.json"))
    print(f"\n{'='*60}")
    print(f"W{wk}")
    for si, s in enumerate(data['sessions']):
        total = 0
        row = []
        for p in s['parts']:
            title = p.get('title','')
            c = p.get('content',[])
            pk = get_part_key(title)
            if not pk:
                continue
            marker = next((str(l) for l in c if 'Sub-total' in str(l)), None)
            if marker:
                m = re.search(r'/\s*(\d+)', marker)
                pts = int(m.group(1)) if m else 0
            else:
                pts = sum(1 for l in c if is_ex_line(str(l)))
            total += pts
            # count L-sections
            l_secs = [str(l).strip() for l in c if re.match(r'^(\[O\]\s*)?L[1-5]\s*[—–\-]', str(l).strip())]
            l_label = ','.join(re.search(r'L(\d)', x).group(0) for x in l_secs) if l_secs else ''
            row.append(f"{pk}:{pts}{'('+l_label+')' if l_label else ''}")
        print(f"  S{si+1}: {total:3d}  |  " + "  ".join(row))
