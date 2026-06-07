#!/usr/bin/env python3
"""Cap dictation+shadowing items to match read.js sentence count (B22 method)."""
import re
import sys
from pathlib import Path

if len(sys.argv) < 3:
    print("Usage: cap_dictation.py <week> <mode>")
    sys.exit(1)

week = sys.argv[1]  # e.g. "week_32"
mode = sys.argv[2]    # "adv" or "easy"
base = 'src/data/weeks' if mode == 'adv' else 'src/data/weeks_easy'
base_path = Path(f'/Users/binhnguyen/Downloads/Engquest3k/{base}/{week}')

content_re = re.compile(r'content_en:\s*(.)')

def extract_content_en(source):
    m = content_re.search(source)
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

def get_items(file_path, block_name):
    src = file_path.read_text()
    m = re.search(rf'{block_name}:\s*\[', src)
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
    new_block = ',\n  '.join(new_items) + '\n  '
    new_src = src[:start] + new_block + src[end:]
    file_path.write_text(new_src)
    return True

read_path = base_path / 'read.js'
read_src = read_path.read_text()
read_body, _, _ = extract_content_en(read_src)
n_target = get_read_sentence_count(read_body)
print(f"read.js B22 count: {n_target}")

for st in ('dictation', 'shadowing'):
    target_path = base_path / f'{st}.js'
    if not target_path.exists(): continue
    # Try multiple possible block names
    src = target_path.read_text()
    if re.search(r'sentences:\s*\[', src):
        block = 'sentences'
    elif re.search(r'script:\s*\[', src):
        block = 'script'
    else:
        print(f"  SKIP {target_path}: no sentences/script block")
        continue
    existing_items = get_items(target_path, block)
    if len(existing_items) > n_target:
        new_items = existing_items[:n_target]
        if replace_items(target_path, block, new_items):
            print(f"  FIXED {target_path}: {len(new_items)} items (capped from {len(existing_items)})")
