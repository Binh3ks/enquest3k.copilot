import json
data = json.load(open('mcp-server/data/lessons/W35.json'))
p3_s1 = next(p for p in data['sessions'][0]['parts'] if p['title'].startswith('PART 3'))
print(f"Total: {len(p3_s1['content'])}")
for i, l in enumerate(p3_s1['content']):
    t = str(l)
    if any(x in t for x in ['L1', 'L2', 'L3', 'L4', 'L5', 'Sub-total', '\u2b1b', '\u26ab', 'Stage', 'SPEAK']):
        print(f"  [{i}] {repr(t[:80])}")
