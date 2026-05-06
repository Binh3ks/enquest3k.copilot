import json, re

data = json.load(open('mcp-server/data/lessons/W35.json'))
for p in data['sessions'][0]['parts']:
    if not p['title'].startswith('PART 3'):
        continue
    # Count L-section headers
    ls = [str(l).strip() for l in p['content'] if re.match(r'^\[O\]\s*L[1-5]\s*', str(l).strip())]
    print('L-headers found:', len(ls))
    for h in ls:
        print(' ', repr(h[:60]))
    print('Total lines:', len(p['content']))
    # Show all numbered items per section
    current = None
    counts = {}
    for l in p['content']:
        t = str(l).strip()
        m = re.match(r'^\[O\]\s*(L[1-5])\s*[^\w]', t)
        if m:
            current = m.group(1)
            counts[current] = 0
        elif current and re.match(r'^\d+\.', t):
            counts[current] += 1
    print('Numbered items per section:', counts)
    break
