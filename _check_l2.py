import json, re

for w in [26, 27]:
    with open(f'mcp-server/data/lessons/W{w}.json') as f:
        d = json.load(f)
    print(f'=== W{w} ===')
    for si, s in enumerate(d['sessions'][:2]):
        for p in s['parts']:
            if 'PART 3' not in p.get('title', ''):
                continue
            content = p['content']
            in_l2 = False
            for i, l in enumerate(content):
                ls = str(l)
                if re.match(r'(\[O\]\s+)?L2\s*[—\-]', ls.strip()):
                    in_l2 = True
                    print(f'  S{si+1} L2 header: {repr(ls[:70])}')
                elif in_l2 and re.match(r'(\[O\]\s+)?L[3-5]\s*[—\-]', ls.strip()):
                    break
                elif in_l2 and ls.strip():
                    print(f'    [{i}] {repr(ls[:70])}')
            break
