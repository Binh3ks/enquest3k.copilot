import json

checks = [
    (28, 0, 'sleep'), (28, 0, 'lose'),
    (29, 0, 'holiday'), (29, 0, 'beach'), (29, 0, 'airplane'), (29, 0, 'car'),
    (31, 0, 'bird'), (31, 0, 'beautiful'), (31, 0, 'loud'),
]
for w, si, word in checks:
    d = json.load(open(f'public/data/lessons/W{w}.json'))
    for p in d['sessions'][si]['parts']:
        t = p.get('title', '')
        if 'PART 2' in t and 'VOCAB' in t.upper():
            found = any(word.lower() in str(item).lower() for item in p['content'])
            print(f'W{w} S{si+1} {word}: {"OK" if found else "MISSING"}')
            break

for w in [28, 29, 31]:
    d = json.load(open(f'public/data/lessons/W{w}.json'))
    parts = []
    for si, s in enumerate(d['sessions']):
        for p in s['parts']:
            if 'PART 2' in p.get('title', '') and 'VOCAB' in p.get('title', '').upper():
                parts.append(f'S{si+1}={len(p["content"])}')
    print(f'W{w}: {" ".join(parts)}')

d30 = json.load(open('public/data/lessons/W30.json'))
for p in d30['sessions'][0]['parts']:
    if 'WEEK 30' in p.get('title', '') and 'SESSION 1' in p.get('title', ''):
        print(f'W30 S1 header: {len(p["content"])} items')
