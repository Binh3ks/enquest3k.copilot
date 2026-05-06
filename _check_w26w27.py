import json, re

def count_items(content):
    count = 0
    for line in content:
        t = str(line).strip()
        if not t or t.startswith('->') or t.startswith('>>') or t.startswith('>>> '):
            continue
        if t.startswith('->') or t.startswith('\u2192'): continue
        if t.startswith('\u2b1b'): continue
        if re.match(r'^[_\s]+$', t): continue
        if re.match(r'^\[\s*(Sub-total|Total)', t) or re.search(r'/\s*\d+\s*\]', t): continue
        if t.startswith('\U0001f4cb'): continue
        if re.match(r'^Stage\s+\d', t) or re.match(r'^(\[O\]\s*)?L[1-5]\s*[--]', t): continue
        if re.match(r'^Student [AB]:|^Goal:', t): continue
        if re.match(r'^Grammar sentences.*:', t) and '____' not in t: continue
        if re.match(r'^(Extension|Challenge|Design challenge):', t) and '____' not in t: continue
        if re.match(r'^Write\s+.+:\s*$', t): continue
        if re.match(r'^(\[O\]\s*)?[A-F]\.\s*(Stage|Dictation|Inference)', t): continue
        if re.match(r'^[A-F]\.\s*$', t): continue
        # Count if it's an exercise item  
        arrow = '\u2192'
        if (t.startswith('T / F:') or
            ('____' in t and not t.startswith(arrow)) or
            ' -> ' in t or
            t.startswith('Base:') or
            re.match(r'^Type\s+[A-Z]:', t)):
            count += 1
    return count

for w in [26, 27]:
    print(f'=== W{w} ===')
    data = json.load(open(f'mcp-server/data/lessons/W{w}.json'))
    for si, sess in enumerate(data['sessions']):
        print(f'  Session {si+1}:')
        for p in sess['parts']:
            title = p.get('title', '')
            if 'HOMEWORK' in title or 'PART 9' in title or title.startswith('WEEK') or 'SPIRAL' in title:
                continue
            c = p.get('content', [])
            has_sub = any('Sub-total' in str(l) for l in c)
            n = count_items(c)
            print(f'    {title[:55]} -> items={n}, has_sub={has_sub}')
