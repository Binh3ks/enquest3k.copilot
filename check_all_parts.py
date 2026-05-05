#!/usr/bin/env python3
"""check_all_parts.py"""
import json
for wnum in [29, 30, 31, 32, 33, 34, 35, 36]:
    w = json.load(open('public/data/lessons/W%d.json' % wnum))
    print('=== W%d ===' % wnum)
    for sn in range(3):
        s = w['sessions'][sn]
        parts = s['parts']
        n = len(parts)
        # Always: 0=header, 1=spiral, 2=PART1, 3=PART2(Grammar), 4=PART3(Listen),
        #         5=PART4(Error), 6=PART5(STEM), 7=PART6(QPC), 8=PART7(Portfolio), 9=PART8(HW)
        p1 = parts[2]
        p7_portfolio = parts[8] if n > 8 else None
        reading_first = p1['content'][0] if p1['content'] else ''
        portfolio_first = p7_portfolio['content'][0] if p7_portfolio and p7_portfolio['content'] else ''
        print('  S%d: reading="%s" | portfolio="%s"' % (sn+1, reading_first[:60], portfolio_first[:60]))
        # Find B. Vocabulary Building split
        split_idx = None
        for i, line in enumerate(p1['content']):
            if line.startswith('B. Vocab') or line.startswith('B. VOCAB'):
                split_idx = i
                break
        print('  S%d: PART1 total=%d vocab_split_at=%s' % (sn+1, len(p1['content']), split_idx))
    print()
