#!/usr/bin/env python3
"""Sync W11 dictation+shadowing: reduce items to match read.js sentence count."""
import re
from pathlib import Path

REPO = Path('/Users/binhnguyen/Downloads/Engquest3k')
WEEKS = [
    ('adv', 'week_11', 'src/data/weeks'),
    ('easy', 'week_11', 'src/data/weeks_easy'),
]
content_re_search = re.compile(r'content_en:\s*(.)')

def extract_content_en(source):
    m = content_re_search.search(source)
    if not m: return None, None, None
    quote = m.group(1)
    body_start = m.end()
    i = body_start
    while i < len(source):
        if source[i] == '\\': i += 2
        elif source[i] == quote: return source[body_start:i], body_start, i
        else: i += 1
    return None, None, None

def get_read_sentence_count(read_body):
    return len([p for p in read_body.split('.') if p.strip()])

def get_dictation_items(dictation_path):
    src = dictation_path.read_text()
    m = re.search(r'sentences:\s*\[', src)
    if not m: return []
    start = m.end()
    depth = 0
    i = start
    while i < len(src):
        if src[i] == '[': depth += 1
        elif src[i] == ']':
            if depth == 0: end = i; break
            depth -= 1
        i += 1
    block = src[start:end]
    items = re.findall(r'\{[^{}]*?id:\s*\d+[^{}]*?\}', block, re.DOTALL)
    return items

def replace_items(file_path, block_name, new_items):
    src = file_path.read_text()
    m = re.search(rf'{block_name}:\s*\[\s*\n', src)
    if not m: return False
    start = m.end()
    depth = 0
    i = start
    while i < len(src):
        c = src[i]
        if c == '[': depth += 1
        elif c == ']':
            if depth == 0: end = i; break
            depth -= 1
        i += 1
    else: return False
    new_block = ',\n  '.join(new_items) + '\n  '
    new_src = src[:start] + new_block + src[end:]
    file_path.write_text(new_src)
    return True

for mode, week, base in WEEKS:
    base_path = REPO / base / week
    read_path = base_path / 'read.js'
    read_src = read_path.read_text()
    read_body, _, _ = extract_content_en(read_src)
    if not read_body: continue
    n_target = get_read_sentence_count(read_body)
    print(f"=== {read_path} ===  target: {n_target}")
    dictation_path = base_path / 'dictation.js'
    if dictation_path.exists():
        existing_items = get_dictation_items(dictation_path)
        if len(existing_items) > n_target:
            new_items = existing_items[:n_target]
            if replace_items(dictation_path, 'sentences', new_items):
                print(f"  FIXED {dictation_path}: {len(new_items)} items (capped from {len(existing_items)})")

print("\nDone.")
