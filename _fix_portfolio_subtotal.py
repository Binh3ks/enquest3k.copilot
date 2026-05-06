import json, shutil, re

# Fix W31 S3 PART 8 portfolio sub-total back to /8 (was wrongly set to /37)
# Also fix W35 S3 PART 8 
# Original W28 pattern: S1 PART8=/6, S2=/5, S3=/10
# But W29-W36 S3 PART8 already had sub-total before our script ran

for week, si in [(31, 2), (35, 2)]:
    path = f'mcp-server/data/lessons/W{week}.json'
    with open(path) as f:
        d = json.load(f)
    s = d['sessions'][si]
    for p in s['parts']:
        title = p.get('title','')
        if 'PART 8' in title or 'PORTFOLIO' in title:
            content = p['content']
            for i, line in enumerate(content):
                if 'sub-total' in str(line).lower() and '37' in str(line):
                    content[i] = '[ Sub-total: ___ / 8 ]'
                    print(f'W{week} S{si+1} PART8: fixed back to /8')
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
    shutil.copy(path, f'public/data/lessons/W{week}.json')

# Check W35 S2 PART 3 item counts
with open('mcp-server/data/lessons/W35.json') as f:
    d = json.load(f)

s2 = d['sessions'][1]
for p in s2['parts']:
    if 'PART 3' in p.get('title',''):
        content = p['content']
        for line in content:
            m = re.search(r'[Ll]\d.*?\((\d+)\s+items?\)', str(line))
            if m:
                print(f'  W35 S2 section: {str(line)[:70]} = {m.group(1)} items')

print('Done')
