import json, re

for wsi in [('26',0), ('29',2), ('30',0), ('28',1), ('43',0), ('43',2)]:
    w, si = wsi
    data = json.load(open(f'mcp-server/data/lessons/W{w}.json'))
    for p in data['sessions'][si]['parts']:
        if not p['title'].startswith('PART 4'): continue
        print(f'W{w} S{si+1}:')
        for i, l in enumerate(p['content']):
            t = str(l)
            if 'ictation' in t or 'Sub-total' in t or re.match(r'^\d+\.', t.strip()):
                print(f'  [{i}] {repr(t[:110])}')
        break
