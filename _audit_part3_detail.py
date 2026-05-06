import json, re

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
            sub = None
            for l in c:
                m = re.search(r'Sub-total.*\/\s*(\d+)', str(l))
                if m:
                    sub = int(m.group(1))
                    break
            l1  = any(re.match(r'^L1\s*[——\-–]', str(l).strip()) for l in c)
            l2  = any(re.match(r'^L2\s*[——\-–]', str(l).strip()) for l in c)
            l3  = any(re.match(r'^L3\s*[——\-–]', str(l).strip()) for l in c)
            ol2 = any(re.match(r'^\[O\]\s*L2\s*[——\-–]', str(l).strip()) for l in c)
            ol3 = any(re.match(r'^\[O\]\s*L3\s*[——\-–]', str(l).strip()) for l in c)
            l5  = any(re.match(r'^(?:\[O\]\s*)?L5\s*[——\-–]', str(l).strip()) for l in c)
            secs = []
            if l1:  secs.append('L1')
            if l2:  secs.append('L2')
            if l3:  secs.append('L3')
            if ol2: secs.append('[O]L2')
            if ol3: secs.append('[O]L3')
            if l5:  secs.append('L5')
            print(f'W{wk} S{si+1} PART3 /{sub}: {" ".join(secs)}')
