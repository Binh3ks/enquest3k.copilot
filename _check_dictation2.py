import json, re, glob

for f in sorted(glob.glob("mcp-server/data/lessons/W*.json")):
    w = re.search(r'W(\d+)', f).group(1)
    data = json.load(open(f))
    for si, s in enumerate(data['sessions']):
        for p in s['parts']:
            for i, l in enumerate(p['content']):
                t = str(l).strip()
                if 'ictation' in t or 'dictation' in t.lower():
                    ctx = p['content']
                    print(f"\nW{w} S{si+1} [{p['title'][:20]}]:")
                    for j in range(max(0, i-1), min(i+8, len(ctx))):
                        print(f"  [{j}] {repr(str(ctx[j])[:120])}")
                    break
