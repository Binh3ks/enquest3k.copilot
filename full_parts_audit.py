#!/usr/bin/env python3
"""full_parts_audit.py - Show all part titles and content[0] for W29-W36"""
import json

for wnum in [29, 30, 31, 32, 33, 34, 35, 36]:
    w = json.load(open('public/data/lessons/W%d.json' % wnum))
    print('=== W%d ===' % wnum)
    for sn in range(3):
        s = w['sessions'][sn]
        print('  --- S%d (%d parts) ---' % (sn+1, len(s['parts'])))
        for i, p in enumerate(s['parts']):
            t = p.get('title', '')
            c = p.get('content', [])
            c0 = c[0][:70] if isinstance(c, list) and c else ''
            print('    [%2d] %-65s | c[0]: %s' % (i, t[:65], c0[:70]))
    print()
