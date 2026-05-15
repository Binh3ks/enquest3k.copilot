import json, re
from pathlib import Path

lines = open('_syllabus_v5_raw.txt').readlines()
week_starts = {}
for i, l in enumerate(lines):
    m = re.match(r'^Tuần (\d+):', l.strip())
    if m:
        week_starts[int(m.group(1))] = i

def block(wn):
    start = week_starts[wn]
    nxt = sorted([w for w in week_starts if w > wn])
    end = week_starts[nxt[0]] if nxt else start + 250
    return [l.rstrip() for l in lines[start:end] if l.strip()]

for wn in [29, 30]:
    b = block(wn)
    print(f'=== W{wn} SYLLABUS READING ===')
    in_r = False
    for l in b:
        if re.search(r'READING INPUT|\.1\s+READING', l):
            in_r = True
        if in_r and re.search(r'\.2\s+GRAMMAR|GRAMMAR FOCUS', l):
            break
        if in_r:
            print(' ', l[:120])
    print()

    # JSON
    data = json.loads(Path(f'public/data/lessons/W{wn}.json').read_text())
    sess = data['sessions'][0]
    rp = next(p for p in sess['parts'] if 'READING INPUT' in p.get('title', '').upper())
    c = rp['content']
    print(f'=== W{wn} JSON PASSAGE ===')
    ex_i = next(
        (i for i, l in enumerate(c)
         if str(l).strip().startswith('Title:') or re.match(r'^\d+[.)]\s', str(l).strip())),
        len(c)
    )
    for l in c[:ex_i]:
        if str(l).strip():
            print(' ', str(l)[:100])
    print()
