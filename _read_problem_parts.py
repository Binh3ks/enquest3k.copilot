import json, re

for wk, parts in [(26, ['PART 1','PART 2','PART 3','PART 6']),
                  (31, ['PART 1','PART 2','PART 3','PART 6']),
                  (35, ['PART 1','PART 2','PART 3','PART 6']),
                  (36, ['PART 3'])]:
    data = json.load(open(f'mcp-server/data/lessons/W{wk}.json'))
    for si in ([0, 1, 2] if wk == 36 else [0]):
        s = data['sessions'][si]
        for p in s['parts']:
            pk = None
            for k in parts:
                if p['title'].startswith(k): pk = k; break
            if not pk: continue
            sub = None
            for l in p['content']:
                m = re.search(r'Sub-total.*\/\s*(\d+)', str(l))
                if m: sub = int(m.group(1)); break
            print(f'\n=== W{wk} S{si+1} {pk} (/{sub}) ===')
            print(f'  TITLE: {p["title"]}')
            for l in p['content']:
                print(f'  {repr(str(l)[:100])}')
