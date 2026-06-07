#!/usr/bin/env python3
"""
Sync W32 dictation.js / shadowing.js content_en to match read.js content_en.

read.js was updated by auto-bold v2 to add new bolds. dictation.js and
shadowing.js still have older bolds. This script syncs them so B22 check
(content_en must match) passes.
"""
import re
from pathlib import Path

REPO = Path('/Users/binhnguyen/Downloads/Engquest3k')
WEEKS = [
    ('adv', 'week_32', 'src/data/weeks'),
    ('easy', 'week_32', 'src/data/weeks_easy'),
]

content_re_search = re.compile(r'content_en:\s*(.)')

def extract_content_en(source):
    """Return (body, body_start, body_end) where body is the content_en string body."""
    m = content_re_search.search(source)
    if not m:
        return None, None, None
    quote = m.group(1)
    body_start = m.end()
    i = body_start
    while i < len(source):
        if source[i] == '\\':
            i += 2
        elif source[i] == quote:
            return source[body_start:i], body_start, i
        else:
            i += 1
    return None, None, None


for mode, week, base in WEEKS:
    base_path = REPO / base / week
    read_path = base_path / 'read.js'
    read_src = read_path.read_text()
    read_body, _, _ = extract_content_en(read_src)
    if not read_body:
        print(f"SKIP {read_path}: no content_en found")
        continue

    for st in ('dictation', 'shadowing'):
        target_path = base_path / f'{st}.js'
        if not target_path.exists():
            continue
        src = target_path.read_text()
        body, bs, be = extract_content_en(src)
        if not body:
            print(f"SKIP {target_path}: no content_en found")
            continue
        if body == read_body:
            print(f"OK {target_path}: already in sync")
            continue
        # Replace the body
        new_src = src[:bs] + read_body + src[be:]
        target_path.write_text(new_src)
        print(f"FIXED {target_path}: {len(body)} → {len(read_body)} chars")

print("\nDone.")
