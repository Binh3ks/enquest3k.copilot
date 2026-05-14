#!/usr/bin/env python3
"""Audit lesson plan JSONs for missing reading passages."""
import json, glob
from collections import defaultdict

results = []
for path in sorted(glob.glob('public/data/lessons/W*.json')):
    week = int(path.split('W')[1].replace('.json',''))
    try:
        d = json.load(open(path))
    except:
        continue
    sessions = d.get('sessions', [])
    for j, s in enumerate(sessions):
        for p in s.get('parts', []):
            title = p.get('title', '')
            if 'READING INPUT' in title.upper():
                BASE = 'READING INPUT'
                ai = title.upper().find(BASE) + len(BASE)
                rest = title[ai:].strip()
                has_passage = len(rest) > 50
                results.append((week, j+1, has_passage, rest[:70]))

missing = [(w,s,r) for w,s,h,r in results if not h]
print(f'Missing reading passages: {len(missing)} sessions across weeks\n')

by_week = defaultdict(list)
for w, s, r in missing:
    by_week[w].append((s, r))

for w in sorted(by_week):
    items = by_week[w]
    print(f'  W{w}: {len(items)} sessions missing passage')
    for sess, rest in items:
        print(f'    Session {sess}: title ends with → {rest!r}')
