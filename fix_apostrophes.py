#!/usr/bin/env python3
"""Fix unescaped apostrophes in spark_talk sections of week files."""
import re, os

BASE = 'src/data/weeks'
total_fixed = 0


def fix_line(line):
    """Replace single-quoted JS strings containing mid-word apostrophes with double-quoted strings."""
    fixes = []

    def replacer(m):
        inner = m.group(1)
        if re.search(r"\w'\w", inner):
            fixes.append(inner)
            return '"' + inner + '"'
        return m.group(0)

    new_line = re.sub(r"'([^'\\]*(?:\\.[^'\\]*)*)'", replacer, line)
    return new_line, fixes


for fname in sorted(os.listdir(BASE)):
    if not fname.endswith('_real.js'):
        continue
    path = os.path.join(BASE, fname)
    with open(path, encoding='utf-8') as f:
        lines = f.readlines()

    in_spark = False
    changed = False
    new_lines = []

    for i, line in enumerate(lines):
        if 'spark_talk:' in line:
            in_spark = True
        if in_spark and re.match(r'^  [a-z_]+:', line) and 'spark_talk' not in line:
            in_spark = False

        if in_spark:
            new_line, fixes = fix_line(line)
            if fixes:
                changed = True
                total_fixed += len(fixes)
                print(f'{fname}:{i+1}:')
                print(f'  OLD: {line.rstrip()[:100]}')
                print(f'  NEW: {new_line.rstrip()[:100]}')
            new_lines.append(new_line)
        else:
            new_lines.append(line)

    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)

print(f'\nTotal fixed: {total_fixed}')
