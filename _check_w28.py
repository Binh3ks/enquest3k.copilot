import json, re
with open('mcp-server/data/lessons/W28.json') as f:
    d = json.load(f)

for s in d['sessions']:
    if s['session'] == 1:
        for p in s['parts']:
            title = p['title'][:40]
            for i, line in enumerate(p.get('content', [])):
                ls = str(line)
                if 'Sub-total' in ls or ('Total' in ls and '/' in ls):
                    print(f'{title}: line {i}: {repr(ls)[:90]}')
                if re.match(r'^(\[O\]\s*)?L[1-5]\s*[—–\-]', ls):
                    print(f'  L-header: {repr(ls)[:90]}')
                if 'done for you' in ls.lower() or 'Example (0' in ls:
                    print(f'  EXAMPLE line {i}: {repr(ls)[:80]}')
                    for k in [1,2,3]:
                        if i+k < len(p['content']):
                            print(f'  +{k}: {repr(str(p["content"][i+k]))[:90]}')
