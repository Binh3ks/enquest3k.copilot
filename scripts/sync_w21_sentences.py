#!/usr/bin/env python3
"""Replace sentences[] in W21 dictation+shadowing with first N sentences from read.js.

For each week (W21 ADV and Easy), grab the first 13-16 sentences from read.js
content_en, build new sentences[] entries, and write back.
"""
import re
from pathlib import Path

REPO = Path('/Users/binhnguyen/Downloads/Engquest3k')
WEEKS = [
    ('adv', 'week_21', 'src/data/weeks'),
    ('easy', 'week_21', 'src/data/weeks_easy'),
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
    """Get plain sentences from read.js body (strip ** and split on .!?)"""
    plain = read_body.replace('**', '').replace('\\n\\n', ' ').strip()
    sents = re.split(r'(?<=[.!?])\s+', plain)
    return [s.strip() for s in sents if s.strip()]

def get_existing_meanings(file_path, key='meaning'):
    """Get meanings from existing sentences[] array, ordered by id."""
    src = file_path.read_text()
    if key == 'meaning':
        return re.findall(r'meaning:\s*"([^"]+)"', src)
    return re.findall(r'\bvi:\s*"([^"]+)"', src)

def build_sentences_items(sentences, meanings, key='meaning'):
    """Build sentences[] entries."""
    items = []
    for i, sent in enumerate(sentences, 1):
        meaning = meanings[i-1] if i-1 < len(meanings) and meanings[i-1] else f'(cụm từ: {sent})'
        if key == 'meaning':
            items.append(f'    {{ id: {i}, text: "{sent}", meaning: "{meaning}" }}')
        else:
            items.append(f'    {{ id: {i}, text: "{sent}", vi: "{meaning}" }}')
    return items

def replace_sentences_block(file_path, new_items):
    """Replace the sentences[] / script[] block in the file."""
    src = file_path.read_text()
    # Find sentences: [ or script: [ and replace until ]
    m = re.search(r'(sentences|script):\s*\[\s*\n', src)
    if not m:
        return False
    start = m.end()
    # Find matching ]
    depth = 0
    i = start
    while i < len(src):
        c = src[i]
        if c == '[':
            depth += 1
        elif c == ']':
            if depth == 0:
                end = i
                break
            depth -= 1
        i += 1
    else:
        return False
    new_block = ',\n  '.join(new_items) + '\n  '
    new_src = src[:start] + new_block + src[end:]
    file_path.write_text(new_src)
    return True

for mode, week, base in WEEKS:
    base_path = REPO / base / week
    read_path = base_path / 'read.js'
    read_src = read_path.read_text()
    read_body, _, _ = extract_content_en(read_src)
    if not read_body:
        print(f"SKIP {read_path}: no content_en")
        continue
    sentences = get_read_sentences(read_body)
    print(f"=== {read_path} ===")
    print(f"  read.js has {len(sentences)} sentences")
    for st in ('dictation', 'shadowing'):
        target_path = base_path / f'{st}.js'
        if not target_path.exists():
            continue
        meanings = get_existing_meanings(target_path, key='meaning' if st == 'dictation' else 'vi')
        new_items = build_sentences_items(sentences, meanings, key='meaning' if st == 'dictation' else 'vi')
        if replace_sentences_block(target_path, new_items):
            print(f"  FIXED {target_path}: {len(sentences)} sentences")

print("\nDone.")
