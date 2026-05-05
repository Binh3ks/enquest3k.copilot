import json, re
from pathlib import Path

ROOT = Path('.')

with open(ROOT / 'mcp-server/data/lessons/W28.json', encoding='utf-8') as f:
    d = json.load(f)

for key in ['sessions', 'sessions_2', 'sessions_5']:
    for s in d.get(key, []):
        if s['session'] != 3:
            continue
        for p in s.get('parts', []):
            if 'PART 6' not in p.get('title', ''):
                continue
            content = p['content']
            for i, ln in enumerate(content):
                ls = str(ln)
                # Fix context statement that was wrongly numbered as 1.
                if ls.startswith('1. This is exactly the Modern Race lesson'):
                    content[i] = '\u2192 ' + ls[3:]
                # Fix Q3 numbered as 2.
                elif ls.startswith('2. Which real-world transport is most like'):
                    content[i] = '3. ' + ls[3:]

for path in [ROOT / 'mcp-server/data/lessons/W28.json',
             ROOT / 'public/data/lessons/W28.json']:
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)

lp_path = ROOT / 'public/data/lessonPlans.json'
with open(lp_path, encoding='utf-8') as f:
    lp = json.load(f)
if 'W28' in lp:
    lp['W28'] = d
    with open(lp_path, 'w', encoding='utf-8') as f:
        json.dump(lp, f, ensure_ascii=False, indent=2)

print('S3 PART 6 final:')
for s in d['sessions']:
    if s['session'] == 3:
        for p in s['parts']:
            if 'PART 6' in p['title']:
                for ln in p['content']:
                    print(' ', repr(str(ln))[:95])
