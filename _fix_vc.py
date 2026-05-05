import json, re
from pathlib import Path

ROOT = Path('.')

with open(ROOT / 'mcp-server/data/lessons/W28.json', encoding='utf-8') as f:
    d = json.load(f)

for key in ['sessions', 'sessions_2', 'sessions_5']:
    for s in d.get(key, []):
        for p in s.get('parts', []):
            if 'PART 9' in p.get('title', ''):
                content = p['content']
                for i, ln in enumerate(content):
                    ls = str(ln)
                    if ls.startswith('"') and 'Practice 3 times' in ls:
                        fixed = re.sub(
                            r'\s*Practice 3 times[.,]?\s*(Then\s+record\s+your\s+video!\s*|Then\s+record!\s*)?',
                            ' ',
                            ls
                        )
                        fixed = re.sub(r'  +', ' ', fixed)
                        content[i] = fixed
                        print(f'  Fixed [{key}] S{s["session"]}')

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

print('Verify:')
for s in d.get('sessions', []):
    for p in s.get('parts', []):
        if 'PART 9' in p.get('title', ''):
            for ln in p['content']:
                ls = str(ln)
                if ls.startswith('"') and 'Practice 3 times' in ls:
                    print(f'  STILL: {repr(ls[:80])}')
print('Clean!')
