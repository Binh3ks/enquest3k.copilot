#!/usr/bin/env python3
"""
Fix capitalization for chunks that appear at the start of a sentence.
"""
import re, pathlib

WEEKS = [pathlib.Path('src/data/weeks'), pathlib.Path('src/data/weeks_easy')]
files = []
for w in range(1, 36):
    for base in WEEKS:
        for st in ['read', 'explore']:
            p = base / f'week_{w:02d}' / f'{st}.js'
            if p.exists() and '_OLD' not in str(p) and 'BACKUP' not in str(p):
                files.append(p)

content_re = re.compile(r"(content_en:\s*)([`'\"])([\s\S]*?)\2", re.MULTILINE)
fixed_files = 0
total_fixes = 0

# Chunks to skip (function words, pronouns)
SKIP = {'there is', 'there are', 'it is', 'he is', 'she is', 'i am', 'you are',
        'we are', 'they are', 'this is', 'that is', 'these are', 'those are',
        'a', 'an', 'the', 'and', 'or', 'but', 'so', 'if', 'when', 'while',
        'one', 'two', 'three', 'first', 'second', 'last', 'next',
        'after', 'before', 'during', 'until', 'since',
        'every', 'each', 'some', 'many', 'much', 'few', 'all', 'any',
        'in', 'on', 'at', 'by', 'for', 'to', 'of', 'with', 'from', 'as', 'into', 'about'}

for fp in files:
    src = fp.read_text()
    m = content_re.search(src)
    if not m: continue
    quote = m.group(2)
    body = m.group(3)
    new_body = body
    
    # Find lowercase-starting bolds that should be capitalized at sentence start
    # Pattern: after `. ` (period+space) or start of string, then `**lowercase**`
    # We need to be careful: only capitalize if it's actually at sentence start
    
    # 1. At very start of content_en
    new_body = re.sub(r'^\*\*([a-z][^*]+?)\*\*', lambda m: f'**{m.group(1).capitalize()}**' if m.group(1).split()[0] not in SKIP else m.group(0), new_body, count=1)
    
    # 2. After period+space (or newline) + first chunk in new sentence
    def fix_after_punct(match):
        punct = match.group(1)
        chunk = match.group(2)
        first_word = chunk.split()[0]
        if first_word in SKIP:
            return match.group(0)
        return f'{punct}**{chunk.capitalize() if chunk == chunk.lower() else chunk}**'
    
    new_body = re.sub(r'([.!?]\s+)\*\*([a-z][^*\n]+?)\*\*', fix_after_punct, new_body)
    new_body = re.sub(r'(\n\s+)\*\*([a-z][^*\n]+?)\*\*', fix_after_punct, new_body)
    
    # Count changes
    changes = sum(1 for _ in re.finditer(r'\*\*([A-Z][^*\n]+?)\*\*', new_body)) - \
              sum(1 for _ in re.finditer(r'\*\*([A-Z][^*\n]+?)\*\*', body))
    
    if new_body != body:
        new_src = src[:m.start()] + m.group(1) + quote + new_body + quote + src[m.end():]
        fp.write_text(new_src)
        fixed_files += 1
        total_fixes += max(0, changes)
        print(f'[cap] {fp}: {changes} capitalizations')

print(f'\n[cap] fixed {fixed_files} files, {total_fixes} total')
