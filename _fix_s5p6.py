import json, re
from pathlib import Path
ROOT = Path('.')
with open(ROOT / 'mcp-server/data/lessons/W28.json', encoding='utf-8') as f:
    d = json.load(f)

p6_5th_question = "5. Which real-world transport would YOU choose for a city race? Give one reason."
p6_5th_answer = "\u2192 ____________________________________________________________"

for sess in d.get('sessions_5', []):
    if sess['session'] != 1:
        continue
    for part in sess.get('parts', []):
        if 'PART 6' not in part.get('title', ''):
            continue
        content = part['content']
        has_q5 = any('real-world transport' in str(l) for l in content)
        if has_q5:
            print('sessions_5 S1 PART 6 already has Q5 — skipping')
            continue
        for i, ln in enumerate(content):
            if re.match(r'^\[\s*Sub-total.*/ [34]\s*\]', str(ln)):
                content.insert(i, p6_5th_answer)
                content.insert(i, p6_5th_question)
                content[i + 2] = '[ Sub-total: ___ / 5 ]'
                print('Fixed sessions_5 S1 PART 6')
                break

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

print('Done')
