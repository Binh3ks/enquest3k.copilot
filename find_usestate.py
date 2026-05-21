#!/usr/bin/env python3
import re

content = open('/Users/binhnguyen/Downloads/Engquest3k/dist/assets/index.js').read()

for m in re.finditer(r'\.useState\(', content):
    pos = m.start()
    start = m.end()
    depth = 1
    i = start
    while i < len(content) and depth > 0:
        c = content[i]
        if c == '(':
            depth += 1
        elif c == ')':
            depth -= 1
        i += 1
    initial = content[start:i-1].strip()
    # Skip simple literals and arrow functions
    if '(' in initial and '=>' not in initial:
        print(f'useState at {pos}: {repr(initial[:300])}')
        print()
