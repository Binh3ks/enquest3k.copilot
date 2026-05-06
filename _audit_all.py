import json, re, glob

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

def get_pts(part_content):
    sub = None
    for l in part_content:
        m = re.search(r'\[\s*Sub-total[^\]]*\/\s*(\d+)\s*\]', str(l))
        if m:
            sub = int(m.group(1))
            break
    if sub is not None:
        return sub
    return sum(1 for l in part_content if is_ex_line(str(l)))

# Detailed per-part audit
print("Week | Ses | P1  P2  P3  P4  P5  P6  P7  P8 | TOTAL")
print("-" * 65)
for wk in range(26, 37):
    path = f"mcp-server/data/lessons/W{wk}.json"
    try:
        data = json.load(open(path, encoding='utf-8'))
    except FileNotFoundError:
        continue
    for si, s in enumerate(data['sessions']):
        parts_pts = {}
        for p in s['parts']:
            pk = get_part_key(p.get('title', ''))
            if pk:
                parts_pts[pk] = get_pts(p['content'])
        row = [parts_pts.get(f'PART {i}', 0) for i in range(1, 9)]
        total = sum(row)
        flag = ' <<<' if total > 88 or total < 70 else ''
        print(f"W{wk:2d} | S{si+1} | {row[0]:2d}  {row[1]:2d}  {row[2]:2d}  {row[3]:2d}  {row[4]:2d}  {row[5]:2d}  {row[6]:2d}  {row[7]:2d} | {total:3d}{flag}")
    print()
