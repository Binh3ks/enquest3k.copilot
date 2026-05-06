import json
data = json.load(open('mcp-server/data/lessons/W31.json'))
for si in (0, 1):
    p3 = next(p for p in data['sessions'][si]['parts'] if p['title'].startswith('PART 3'))
    print(f"S{si+1}: Total={len(p3['content'])}")
    for i, l in enumerate(p3['content']):
        t = str(l)
        if any(x in t for x in ['L1', 'L2', 'L3', 'L4', 'L5', 'Sub-total', '\u2b1b']):
            print(f"  [{i}] {repr(t[:80])}")
