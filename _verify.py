import json, re
with open('mcp-server/data/lessons/W28.json') as f:
    d = json.load(f)

sess1 = d['sessions'][0]

for p in sess1['parts']:
    title = p['title']
    if 'PART 1' in title and 'PART 9' not in title:
        print('=== PART 1 ===')
        for l in p['content']:
            print(repr(str(l))[:90])

    elif 'PART 3' in title:
        print('\n=== PART 3 example item 0 area ===')
        content = p['content']
        for i, l in enumerate(content):
            ls = str(l)
            if 'Example' in ls or 'fast and proud' in ls:
                for k in range(max(0, i-1), min(len(content), i+5)):
                    print(f'  {k}: {repr(str(content[k]))[:90]}')
                break

    elif 'PART 9' in title:
        print('\n=== PART 9 first 6 lines ===')
        for i, l in enumerate(p['content'][:6]):
            print(f'  {i}: {repr(str(l))[:90]}')
        print('  ...')
        for l in p['content']:
            if 'GV Activity' in str(l):
                print(f'  GV: {repr(str(l))[:90]}')

    elif 'PART 2' in title:
        print('\n=== PART 2 last 4 lines ===')
        for l in p['content'][-4:]:
            print(f'  {repr(str(l))[:90]}')
