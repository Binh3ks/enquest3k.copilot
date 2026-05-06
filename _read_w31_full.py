import json
data = json.load(open('mcp-server/data/lessons/W31.json'))
for si in (0, 1):
    p3 = next(p for p in data['sessions'][si]['parts'] if p['title'].startswith('PART 3'))
    print(f"\n=== S{si+1} PART 3 ({len(p3['content'])} lines) ===")
    for i, l in enumerate(p3['content']):
        print(f"  [{i:2}] {repr(str(l)[:100])}")
