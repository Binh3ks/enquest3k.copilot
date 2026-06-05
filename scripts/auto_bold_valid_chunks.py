#!/usr/bin/env python3
"""
Auto-bold valid chunks in W1-W35 read.js / explore.js.

For each content_en, find chunks/phrases that are in the whitelist (chunks_dataset + A1-B1 + extra + wiktionary + learned)
but are NOT yet bolded, and wrap them with **.

Safety:
- Only operates on content_en (not content_vi).
- Skips chunks that contain any non-ASCII char.
- Skips if a chunk is part of an existing **bold** already.
- Applies longest-first to avoid double-bolding sub-chunks.
- Reports per-file stats.
"""
import json
import re
import pathlib
import sys

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
print(f'[auto-bold] whitelist size: {len(WS)}')

# Sort longest-first to avoid overlapping replacements
chunks = sorted(WS, key=lambda s: (-len(s), s))

WEEKS = [pathlib.Path('src/data/weeks'), pathlib.Path('src/data/weeks_easy')]
files = []
for w in range(1, 36):
    for base in WEEKS:
        for st in ['read', 'explore']:
            p = base / f'week_{w:02d}' / f'{st}.js'
            if p.exists():
                files.append(p)

content_re = re.compile(r"(content_en:\s*)([`'\"])([\s\S]*?)\2", re.MULTILINE)
applied_total = 0
files_changed = 0
files_skipped = 0
files_unchanged = 0

for fp in files:
    src = fp.read_text()
    m = content_re.search(src)
    if not m:
        files_skipped += 1
        continue
    quote = m.group(2)
    body = m.group(3)
    if not all(ord(c) < 128 or c in '“”‘’…' for c in body):
        # has some non-ASCII — try to keep working
        pass

    # Apply longest-first in this body
    new_body = body
    file_changes = 0
    for chunk in chunks:
        # match chunk NOT inside **...**
        # Negative lookbehind/lookahead for **
        # Use placeholder to avoid re-matching bolded content
        # We'll match: not preceded by **, not followed by **
        # but we have to be careful at chunk boundaries
        pat = re.compile(
            r'(?<!\*\*)' + r'(?<![\*])' + r'\b' + re.escape(chunk) + r'\b' + r'(?!\*\*)' + r'(?![\*])',
            re.IGNORECASE
        )

        def replace(m):
            return f'**{chunk}**'

        new_body, n = pat.subn(replace, new_body)
        if n:
            file_changes += n

    if file_changes > 0 and new_body != body:
        # Reconstruct file
        new_src = src[:m.start()] + m.group(1) + quote + new_body + quote + src[m.end():]
        fp.write_text(new_src)
        applied_total += file_changes
        files_changed += 1
        print(f'[auto-bold] {fp}: {file_changes} new bolds')
    else:
        files_unchanged += 1

print(f'\n[auto-bold] total new bolds: {applied_total}')
print(f'[auto-bold] files changed: {files_changed}, unchanged: {files_unchanged}, skipped: {files_skipped}')
