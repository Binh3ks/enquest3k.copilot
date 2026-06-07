#!/usr/bin/env python3
"""Fix CAP first letter at sentence start in read.js + explore.js (W1-W35).

For each content_en, find sentences starting with `**[lowercase]` (bolded lowercase)
or `(space)**[lowercase]` and capitalize the first letter of the bolded chunk.

Example: '**my teacher** is kind.' → '**My teacher** is kind.'
"""
import re
from pathlib import Path

REPO = Path('/Users/binhnguyen/Downloads/Engquest3k')
WEEKS = [REPO / 'src/data/weeks', REPO / 'src/data/weeks_easy']

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

def fix_cap_in_body(body):
    """Fix leading '**[lowercase]**...' at sentence start. Return (new_body, n_fixes)."""
    # Strategy: find pattern '**[a-z]' at start of any sentence boundary.
    # Sentence boundaries: '**[a-z]' (sentence starts in bold) OR '. **[a-z]' / '! **[a-z]' / '? **[a-z]'
    # Also handle space at start of body.
    new_body = body
    n_fixes = 0
    # Pattern 1: At start of body (after a \n or space): '**lowercase'
    new_body = re.sub(
        r'(^|\n\n)\*\*([a-z])',
        lambda m: m.group(1) + '**' + m.group(2).upper(),
        new_body,
    )
    # Pattern 2: After sentence terminator '. ' / '! ' / '? ': '**[a-z]'
    new_body = re.sub(
        r'([.!?] )\*\*([a-z])',
        lambda m: m.group(1) + '**' + m.group(2).upper(),
        new_body,
    )
    return new_body, n_fixes

# Better approach: use sentence split to count
def fix_cap_v2(body):
    new_body = body
    n = 0
    # Apply multiple times to catch chain
    while True:
        old = new_body
        # Match at start OR after sentence terminator + space
        new_body = re.sub(
            r'(^|[\.\!\?] )\*\*([a-z])',
            lambda m: m.group(1) + '**' + m.group(2).upper(),
            new_body,
        )
        if new_body == old:
            break
        n += 1
    return new_body, n

total_files = 0
total_fixes = 0
for base in WEEKS:
    for w in range(1, 36):
        for st in ('read', 'explore'):
            p = base / f'week_{w:02d}' / f'{st}.js'
            if not p.exists(): continue
            src = p.read_text()
            body, bs, be = extract_content_en(src)
            if not body: continue
            new_body, _ = fix_cap_v2(body)
            if new_body != body:
                new_src = src[:bs] + new_body + src[be:]
                p.write_text(new_src)
                total_files += 1
                # Count fixes
                fixes = sum(1 for m in re.finditer(r'\*\*([A-Z])', new_body)) - sum(1 for m in re.finditer(r'\*\*([A-Z])', body))
                # Approximate: count '**[A-Z]' occurrences
                new_caps = len(re.findall(r'\*\*[A-Z]', new_body))
                old_caps = len(re.findall(r'\*\*[A-Z]', body))
                fixes = new_caps - old_caps
                total_fixes += fixes
                print(f"  {p}: +{fixes} caps")

print(f"\n=== Summary ===")
print(f"Files modified: {total_files}")
print(f"Total new capitalized bolds: {total_fixes}")
