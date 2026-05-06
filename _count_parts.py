import json, re

for week in range(29, 37):
    with open(f'mcp-server/data/lessons/W{week}.json') as f:
        d = json.load(f)
    print(f'=== W{week} ===')
    for si, s in enumerate(d['sessions']):
        for p in s['parts']:
            title = p.get('title', '')
            content = p.get('content', [])
            has_sub = any('sub-total' in str(l).lower() for l in content)
            
            if 'PART 3' in title and not has_sub:
                # Count total items by looking for numbered lines
                total_items = 0
                for line in content:
                    ls = str(line).strip()
                    if re.match(r'^\d+\.\s', ls) or re.match(r'^\[\d+\]', ls):
                        total_items += 1
                print(f'  S{si+1}: PART3 missing sub-total, counted {total_items} items')
