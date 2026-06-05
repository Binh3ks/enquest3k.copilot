#!/usr/bin/env python3
"""
Auto-bold v3: incremental, safe. Only bolds specific chunks and does NOT overlap
with existing bolds.

Strategy: walk text as a list of (is_bold, text) runs. For each plain run, apply bolding.
Then re-merge.
"""
import json
import re
import pathlib

# Whitelist
WS = set()
for src in [
    'production_kit/data/chunks_dataset.txt',
    'production_kit/data/a1b1_functional_chunks.txt',
    'production_kit/data/oxford_collocations.txt',
    'production_kit/data/extended_collocations.txt',
]:
    p = pathlib.Path(src)
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

def parse_runs(text):
    """Parse text into list of (is_bold, text). Bold runs are the **...** spans."""
    runs = []
    i = 0
    while i < len(text):
        if text[i:i+2] == '**':
            # find matching **, but ** must not appear inside
            j = text.find('**', i+2)
            if j == -1:
                runs.append((False, text[i:]))
                return runs
            runs.append((True, text[i+2:j]))
            i = j + 2
        else:
            # find next ** or end
            j = text.find('**', i)
            if j == -1:
                runs.append((False, text[i:]))
                return runs
            runs.append((False, text[i:j]))
            i = j
    return runs

def boldify_plain(text, chunks):
    """Add ** around chunks in plain text, longest-first."""
    for chunk in chunks:
        pat = re.compile(r'(?<!\*)\b' + re.escape(chunk) + r'\b(?!\*)', re.IGNORECASE)
        text = pat.sub(f'**{chunk}**', text)
    return text

for fp in files:
    src = fp.read_text()
    m = content_re.search(src)
    if not m: continue
    quote = m.group(2)
    body = m.group(3)
    
    # Parse into runs
    runs = parse_runs(body)
    
    # Boldify each plain run
    file_changes = 0
    new_runs = []
    for is_bold, text in runs:
        if is_bold:
            new_runs.append((True, text))
        else:
            new_text = boldify_plain(text, chunks)
            if new_text != text:
                # count changes: each new ** is a new bold
                new_runs.append((False, new_text))
                file_changes += new_text.count('**') - text.count('**')
            else:
                new_runs.append((False, text))
    
    if file_changes == 0:
        continue
    
    # Reassemble
    new_body = ''
    for is_bold, text in new_runs:
        if is_bold:
            new_body += f'**{text}**'
        else:
            new_body += text
    
    if new_body == body:
        continue
    
    new_src = src[:m.start()] + m.group(1) + quote + new_body + quote + src[m.end():]
    fp.write_text(new_src)
    applied_total += file_changes
    files_changed += 1
    print(f'[v3] {fp}: {file_changes} new bolds')

print(f'\n[v3] total new bolds: {applied_total}, files changed: {files_changed}')
