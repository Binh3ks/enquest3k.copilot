import json, re, glob

for f in sorted(glob.glob("mcp-server/data/lessons/W*.json")):
    w = re.search(r'W(\d+)', f).group(1)
    data = json.load(open(f))
    for si, s in enumerate(data['sessions']):
        for p in s['parts']:
            if not p['title'].startswith('PART 2'):
                continue
            content = p['content']
            # Find Dictation lines
            for i, l in enumerate(content):
                t = str(l).strip()
                if re.match(r'^[A-F]\.\s*(Stage|Dictation)', t) or 'Dictation' in t:
                    # Print context: this line + next 6 lines
                    print(f"\nW{w} S{si+1} PART2:")
                    for j in range(i, min(i+8, len(content))):
                        print(f"  [{j}] {repr(str(content[j])[:100])}")
                    break
