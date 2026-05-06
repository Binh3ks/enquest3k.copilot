import json, re

issues = []
for wk in range(37, 43):
    d = json.load(open('public/data/lessons/W%d.json' % wk))
    for sess in d['sessions']:
        sn = sess['session']
        for p in sess['parts']:
            title = p['title']
            content = p['content']

            # PART 3: check L item counts
            if title.startswith('PART 3'):
                level_counts = {}
                cur = None
                for l in content:
                    m = re.match(r'^(L[1-5])\s*[—\-]', l.strip())
                    if m:
                        cur = m.group(1)
                        level_counts[cur] = 0
                    elif cur and re.match(r'^\d+\.', l.strip()):
                        level_counts[cur] += 1
                for lv, cnt in sorted(level_counts.items()):
                    expected = 10 if lv in ('L1', 'L2', 'L3', 'L4') else 5
                    if cnt != expected:
                        issues.append('W%d S%d PART3 %s: %d items (expected %d)' % (wk, sn, lv, cnt, expected))

            # PART 4: dictation blank + sub-total
            if title.startswith('PART 4'):
                has_blank = any('____' in l and l.strip().startswith('1.') for l in content)
                has_sub = any('Sub-total' in l for l in content)
                if not has_blank:
                    issues.append('W%d S%d PART4: no dictation blank line (1. _____)' % (wk, sn))
                if not has_sub:
                    issues.append('W%d S%d PART4: missing Sub-total' % (wk, sn))

            # PART 8: sub-total
            if title.startswith('PART 8'):
                if not any('Sub-total' in l for l in content):
                    issues.append('W%d S%d PART8: missing Sub-total' % (wk, sn))

            # PART 7: all items numbered
            if title.startswith('PART 7'):
                unnumbered = [l for l in content if l.strip()
                              and not re.match(r'^\d+\.', l.strip())
                              and 'Sub-total' not in l
                              and not l.strip().startswith('[')
                              and not l.strip().startswith('☐')]
                if unnumbered:
                    issues.append('W%d S%d PART7: %d unnumbered items e.g. %r' % (wk, sn, len(unnumbered), unnumbered[0][:60]))

for i in issues:
    print(i)
print()
print('Total issues: %d' % len(issues))
