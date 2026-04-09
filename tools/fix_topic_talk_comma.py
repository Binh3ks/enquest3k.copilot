#!/usr/bin/env python3
"""
Fix: add missing trailing comma before topic_talk_prompt in all writing.js files.
The previous insertion didn't add a comma after the last array/string field.

Run: python3 tools/fix_topic_talk_comma.py
"""
import pathlib, re

BASE = pathlib.Path(__file__).parent.parent
WEEKS_ADV  = BASE / "src/data/weeks"
WEEKS_EASY = BASE / "src/data/weeks_easy"

def week_dir(n):
    return f"week_{n:02d}" if n < 10 else f"week_{n}"

fixed = 0
skipped = 0

for w in list(range(8, 29)) + [29]:  # include W29 as check
    for base in [WEEKS_ADV, WEEKS_EASY]:
        path = base / week_dir(w) / "writing.js"
        if not path.exists():
            continue
        content = path.read_text(encoding="utf-8")
        if "topic_talk_prompt" not in content:
            continue

        lines = content.split('\n')
        changed = False
        for i, line in enumerate(lines):
            if line.strip().startswith('topic_talk_prompt'):
                # Check the line before it
                prev = lines[i - 1]
                stripped = prev.rstrip()
                if stripped and not stripped.endswith(','):
                    lines[i - 1] = stripped + ','
                    changed = True
                break

        if changed:
            path.write_text('\n'.join(lines), encoding="utf-8")
            print(f"  FIXED: {path.relative_to(BASE)}")
            fixed += 1
        else:
            skipped += 1

print(f"\nFixed: {fixed}  Already correct: {skipped}")
