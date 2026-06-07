#!/usr/bin/env python3
"""Capitalize sentence-initial bold chunks in read.js + explore.js (W1-W35).

For each content_en, find sentence boundaries (start of string, after . ! ?
followed by whitespace, or newline) followed by `**[lowercase letter]` and
capitalize the first letter of the inner word.

Example: '**on the island**, a pilot' → '**On the island**, a pilot'

Idempotent — re-running on already-capitalized text is a no-op.
"""
import re
import sys
from pathlib import Path

# Match: sentence boundary then **lowercase first letter inside **
PAT = re.compile(
    r'((?:^|[\.\!\?]\s+|[\n])\*\*)([a-zà-ỹ])([^*]*\*\*)',
    re.MULTILINE,
)


def main():
    roots = [Path("src/data/weeks"), Path("src/data/weeks_easy")]
    total = 0
    for root in roots:
        for week_dir in sorted(root.iterdir()):
            m = re.match(r"week_(\d+)$", week_dir.name)
            if not m:
                continue
            week_num = int(m.group(1))
            if week_num < 1 or week_num > 35:
                continue
            for fname in ["read.js", "explore.js"]:
                fp = week_dir / fname
                if not fp.exists():
                    continue
                content = fp.read_text()

                def repl(mo):
                    return mo.group(1) + mo.group(2).upper() + mo.group(3)

                new_content, n = PAT.subn(repl, content)
                if n > 0:
                    fp.write_text(new_content)
                    print(f"  {fp}: {n} fixed")
                    total += n
    print(f"Total: {total}")


if __name__ == "__main__":
    main()
