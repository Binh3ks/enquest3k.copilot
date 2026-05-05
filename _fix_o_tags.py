"""
Fix W28: Remove [O] prefix from all content lines + expand PART 8 Extension writing space.
"""
import json, re
from pathlib import Path

ROOT = Path('.')

with open(ROOT / 'mcp-server/data/lessons/W28.json', encoding='utf-8') as f:
    d = json.load(f)

BLANK60 = '____________________________________________________________'

def fix_content(content):
    out = []
    i = 0
    while i < len(content):
        ln = str(content[i])

        # 1. Strip [O] prefix everywhere
        clean = re.sub(r'^\[O\]\s*', '', ln)

        # 2. PART 8 Extension: add proper writing lines if the next line is just one blank
        if clean.startswith('Extension:') and i + 1 < len(content):
            next_ln = str(content[i + 1])
            # Count how many blank lines follow
            j = i + 1
            while j < len(content) and re.match(r'^[_\s]{20,}$', str(content[j]).strip()):
                j += 1
            existing_blanks = j - (i + 1)
            out.append(clean)
            # Ensure at least 3 writing lines for rewrite tasks, 2 for sentence tasks
            needed = 3 if 'rewrite' in clean.lower() or 'what happened' in clean.lower() else 2
            blanks_to_add = max(needed, existing_blanks)
            for _ in range(blanks_to_add):
                out.append(BLANK60)
            i = j  # skip already-consumed blank lines
            continue

        out.append(clean)
        i += 1
    return out

changed = 0
for key in ['sessions', 'sessions_2', 'sessions_5']:
    for sess in d.get(key, []):
        for part in sess.get('parts', []):
            orig = part['content']
            fixed = fix_content(orig)
            if fixed != orig:
                changed += 1
            part['content'] = fixed

print(f'Fixed {changed} part content arrays')

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

# Verify
print('\n=== Remaining [O] lines ===')
for key in ['sessions']:
    for s in d.get(key, []):
        for p in s.get('parts', []):
            for ln in p.get('content', []):
                if str(ln).startswith('[O]'):
                    print(f'  STILL: {repr(str(ln))[:80]}')

print('\n=== PART 8 S1 content ===')
for s in d['sessions']:
    if s['session'] == 1:
        for p in s['parts']:
            if 'PART 8' in p['title']:
                for ln in p['content']:
                    print(f'  {repr(str(ln))[:90]}')

print('\n=== PART 8 S2 content ===')
for s in d['sessions']:
    if s['session'] == 2:
        for p in s['parts']:
            if 'PART 8' in p['title']:
                for ln in p['content']:
                    print(f'  {repr(str(ln))[:90]}')

print('\nDone!')
