"""Fix data: GV Activity -> Teacher Activity (English), PART 6 S1 sub-total /4 -> /5 + add 5th question."""
import json, re
from pathlib import Path

ROOT = Path('.')

with open(ROOT / 'mcp-server/data/lessons/W28.json', encoding='utf-8') as f:
    d = json.load(f)

replacements = [
    # GV Activity numbered cues -> Teacher Activity
    ("📋 GV Activity ①: Transport Flash-Introduction (3 min) — xem Teacher's Contents tab",
     "📋 Teacher Activity ①: Transport Flash-Introduction (3 min) — see Teacher's Contents tab"),
    ("📋 GV Activity ③: Speed Translation Drill (2 min) — xem Teacher's Contents tab",
     "📋 Teacher Activity ③: Speed Translation Drill (2 min) — see Teacher's Contents tab"),
    ("📋 GV Activity ③: Tortoise or Hare? Quick-fire (2 min) — xem Teacher's Contents tab",
     "📋 Teacher Activity ③: Tortoise or Hare? Quick-fire (2 min) — see Teacher's Contents tab"),
    ("📋 GV Activity ①: Round-Robin Story Chain (5 min) — xem Teacher's Contents tab",
     "📋 Teacher Activity ①: Round-Robin Story Chain (5 min) — see Teacher's Contents tab"),
    ("📋 GV Activity ③: Trophy Ceremony (3 min) — xem Teacher's Contents tab",
     "📋 Teacher Activity ③: Trophy Ceremony (3 min) — see Teacher's Contents tab"),
    # Inline GV reference cues
    ("📋 GV: Xem Teacher's Contents → In-Class Speaking Activities để hướng dẫn chi tiết.",
     "📋 Teacher: See Teacher's Contents → In-Class Speaking Activities for full guidance."),
]

def fix_content(content):
    result = []
    for ln in content:
        s = str(ln)
        for old, new in replacements:
            if s == old:
                s = new
                break
        result.append(s)
    return result

for key in ['sessions', 'sessions_2', 'sessions_5']:
    for sess in d.get(key, []):
        for part in sess.get('parts', []):
            part['content'] = fix_content(part['content'])

# PART 6 S1: add 5th question, fix sub-total /4 -> /5
p6_5th_question = "5. Which real-world transport would YOU choose for a city race? Give one reason."
p6_5th_answer = "→ ____________________________________________________________"

for key in ['sessions', 'sessions_2', 'sessions_5']:
    for sess in d.get(key, []):
        if sess['session'] != 1:
            continue
        for part in sess.get('parts', []):
            if 'PART 6' not in part.get('title', ''):
                continue
            content = part['content']
            # Find sub-total index
            for i, ln in enumerate(content):
                if re.match(r'^\[\s*Sub-total.*/ 4\s*\]', str(ln)):
                    content.insert(i, p6_5th_answer)
                    content.insert(i, p6_5th_question)
                    content[i + 2] = '[ Sub-total: ___ / 5 ]'
                    print(f'  Fixed PART 6 S1 [{key}]: added Q5, sub-total /4 -> /5')
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

print('\n=== VERIFICATION ===')
# Check GV activity lines
for key in ['sessions']:
    for s in d.get(key, []):
        for p in s.get('parts', []):
            for l in p.get('content', []):
                if '📋' in str(l):
                    print(f'S{s["session"]} [{p["title"][:25]}]: {str(l)[:80]}')
                    break

# Check PART 6 S1
print('\nPART 6 S1 content:')
for s in d['sessions']:
    if s['session'] == 1:
        for p in s['parts']:
            if 'PART 6' in p['title']:
                for ln in p['content']:
                    print(f'  {repr(str(ln))[:90]}')

# Check session totals
print('\nSession sub-total sums:')
for s in d.get('sessions', []):
    total = 0
    for p in s.get('parts', []):
        for ln in p.get('content', []):
            m = re.search(r'\[\s*Sub-total[^/]*/\s*(\d+)\s*\]', str(ln))
            if m:
                total += int(m.group(1))
    print(f'  S{s["session"]} total: {total}')
print('Done!')
