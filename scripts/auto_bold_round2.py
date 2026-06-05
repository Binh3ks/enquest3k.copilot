#!/usr/bin/env python3
"""
Round 2 auto-bold (careful): for each content_en, replace **...** with placeholders,
then boldify, then restore. Placeholders use unique random tokens that won't match \b.
"""
import json
import re
import pathlib
import secrets

WS = set()
p = pathlib.Path('production_kit/data/chunks_dataset.txt')
if p.exists():
    for line in p.read_text().splitlines():
        line = line.strip().lower()
        if line and 2 <= len(line.split()) <= 4 and all(ord(c) < 128 for c in line):
            WS.add(line)
for fn in ['chunks_a1_b1.py','extra_collocations.py','wiktionary_idioms.py']:
    pp = pathlib.Path('production_kit/data')/fn
    if pp.exists():
        for m in re.findall(r'"([^"]+)"', pp.read_text()):
            m=m.strip().lower()
            if 2 <= len(m.split()) <= 4 and all(ord(c) < 128 for c in m):
                WS.add(m)
lp = pathlib.Path('production_kit/data/learned_whitelist.json')
if lp.exists():
    for v in json.loads(lp.read_text()):
        v=v.lower().strip()
        if 2 <= len(v.split()) <= 4 and all(ord(c) < 128 for c in v):
            WS.add(v)
for f in ['oxford_collocations.txt', 'extended_collocations.txt', 'a1b1_functional_chunks.txt']:
    pp = pathlib.Path('production_kit/data')/f
    if pp.exists():
        for line in pp.read_text().splitlines():
            line = line.strip().lower()
            if line and 2 <= len(line.split()) <= 4 and all(ord(c) < 128 for c in line):
                WS.add(line)
print(f'whitelist total: {len(WS)}')

chunks = sorted(WS, key=lambda s: (-len(s), s))

WEEKS = [pathlib.Path('src/data/weeks'), pathlib.Path('src/data/weeks_easy')]
files = []
for w in range(1, 36):
    for base in WEEKS:
        for st in ['read', 'explore']:
            p = base / f'week_{w:02d}' / f'{st}.js'
            if p.exists() and '_OLD' not in str(p) and 'BACKUP' not in str(p):
                files.append(p)

content_re = re.compile(r"(content_en:\s*)([`'\"])([\s\S]*?)\2", re.MULTILINE)
applied_total = 0
files_changed = 0

# Build a regex that matches "**...**" but won't match placeholders
# Use a random token that includes NO word chars and is unique per process
# Run a single time across all files
TOKEN_PREFIX = f'__BBLDPH_{secrets.token_hex(4)}_'

for fp in files:
    src = fp.read_text()
    m = content_re.search(src)
    if not m: continue
    quote = m.group(2)
    body = m.group(3)
    
    # Find existing **...** spans and replace with placeholders
    bold_spans = list(re.finditer(r'\*\*([^*\n]+?)\*\*', body))
    if not bold_spans and not chunks:
        continue
    placeholders = []
    plain = body
    for i, bm in enumerate(bold_spans):
        original = bm.group(0)
        # use a placeholder with a non-word-char token so \b...\\b won't match inside
        placeholder = f'\x01{TOKEN_PREFIX}{i}\x02'
        placeholders.append(original)
        plain = plain.replace(original, placeholder, 1)
    
    # Now boldify chunks in plain
    new_plain = plain
    file_changes = 0
    for chunk in chunks:
        # Use a regex that won't match across placeholders
        # The placeholder uses \x01, \x02 which are non-word chars
        # So \bchunk\b will only match outside placeholders
        pat = re.compile(r'\b' + re.escape(chunk) + r'\b', re.IGNORECASE)
        new_plain, n = pat.subn(f'**{chunk}**', new_plain)
        if n: file_changes += n
    
    if file_changes == 0:
        continue
    
    # Restore placeholders
    final_body = new_plain
    for i, original in enumerate(placeholders):
        final_body = final_body.replace(f'\x01{TOKEN_PREFIX}{i}\x02', original, 1)
    
    if final_body == body:
        continue
    
    new_src = src[:m.start()] + m.group(1) + quote + final_body + quote + src[m.end():]
    fp.write_text(new_src)
    applied_total += file_changes
    files_changed += 1
    print(f'[auto-bold-r2] {fp}: {file_changes} new bolds')

print(f'\n[auto-bold-r2] total new bolds: {applied_total}, files changed: {files_changed}')
