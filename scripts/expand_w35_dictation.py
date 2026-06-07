#!/usr/bin/env python3
"""Expand dictation+shadowing items to match read.js sentence count (B22).

Usage: python3 expand_w35_dictation.py [week]
Default: W35. Pass any week (e.g. "32") to expand that one.
"""
import re
import sys
from pathlib import Path

REPO = Path('/Users/binhnguyen/Downloads/Engquest3k')

week = sys.argv[1] if len(sys.argv) > 1 else '35'
WEEKS = [
    ('adv', f'week_{week}', 'src/data/weeks'),
    ('easy', f'week_{week}', 'src/data/weeks_easy'),
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

def get_read_sentences(read_body):
    plain = read_body.replace('**', '').replace('\\n\\n', ' ').strip()
    sents = re.split(r'(?<=[.!?])\s+', plain)
    return [s.strip() for s in sents if s.strip()]

def get_existing_meanings(file_path, key='meaning'):
    src = file_path.read_text()
    if key == 'meaning':
        return re.findall(r'meaning:\s*"([^"]+)"', src)
    return re.findall(r'\bvi:\s*"([^"]+)"', src)

def build_items(sentences, meanings, key='meaning'):
    items = []
    for i, sent in enumerate(sentences, 1):
        meaning = meanings[i-1] if i-1 < len(meanings) and meanings[i-1] else f'(cụm từ: {sent})'
        if key == 'meaning':
            items.append(f'    {{ id: {i}, text: "{sent}", meaning: "{meaning}" }}')
        else:
            items.append(f'    {{ id: {i}, text: "{sent}", vi: "{meaning}" }}')
    return items

def replace_block(file_path, block_name, new_items):
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
    sentences = get_read_sentences(read_body)
    print(f"=== {read_path} ===  {len(sentences)} sentences")
    for st in ('dictation', 'shadowing'):
        target_path = base_path / f'{st}.js'
        if not target_path.exists(): continue
        target_src = target_path.read_text()
        # Determine block: shadowing sometimes uses 'sentences', sometimes 'script'
        if re.search(r'\bsentences:\s*\[', target_src):
            block = 'sentences'
        elif re.search(r'\bscript:\s*\[', target_src):
            block = 'script'
        else:
            print(f"  SKIP {target_path}: no sentences/script block")
            continue
        if st == 'dictation':
            key = 'meaning'
        else:
            key = 'vi'
        meanings = get_existing_meanings(target_path, key=key)
        new_items = build_items(sentences, meanings, key=key)
        if replace_block(target_path, block, new_items):
            print(f"  FIXED {target_path}: {len(new_items)} items")

print("\nDone.")
