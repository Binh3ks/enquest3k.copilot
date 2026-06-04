#!/usr/bin/env python3
"""
Merge all collocation sources into a master dictionary.
"""

import re
import json
from pathlib import Path

DATA_DIR = Path("/Users/binhnguyen/Downloads/Engquest3k/production_kit/data")
OUTPUT = DATA_DIR / "extended_collocations.json"
OUTPUT_TXT = DATA_DIR / "extended_collocations.txt"

# Sources (priority order)
SOURCE_FILES = [
    DATA_DIR / "oxford_collocations.txt",  # C2 ground truth
    DATA_DIR / "a1b1_functional_chunks.txt",  # A1-B1 from curriculum
    DATA_DIR / "extended_collocations.json",  # PDF sources
    DATA_DIR / "html_collocations.json",  # HTML sources
]

# Existing curated
CURATED = [
    "chunks_a1_b1.py",
    "extra_collocations.py",
    "wiktionary_idioms.py",
]


def load_txt(path):
    if not path.exists():
        return set()
    return set(line.strip().lower() for line in path.read_text().split('\n') if line.strip())


def load_json(path):
    if not path.exists():
        return set()
    data = json.loads(path.read_text())
    return set(e.lower().strip() for e in data if e)


def load_curated(fname):
    path = DATA_DIR / fname
    if not path.exists():
        return set()
    content = path.read_text()
    entries = re.findall(r'"([^"]+)"', content)
    return set(e.lower().strip() for e in entries if 2 <= len(e.split()) <= 4)


def main():
    all_collocations = set()

    print("=== Loading Sources ===\n")

    # 1. Oxford (C2)
    s = load_txt(SOURCE_FILES[0])
    print(f"  Oxford: {len(s)}")
    all_collocations.update(s)

    # 2. A1-B1 functional
    s = load_txt(SOURCE_FILES[1])
    print(f"  A1-B1 functional: {len(s)}")
    all_collocations.update(s)

    # 3. Extended (PDFs)
    s = load_json(SOURCE_FILES[2])
    print(f"  Extended (PDFs): {len(s)}")
    all_collocations.update(s)

    # 4. HTML
    s = load_json(SOURCE_FILES[3])
    print(f"  HTML sources: {len(s)}")
    all_collocations.update(s)

    # 5. Existing curated
    for fname in CURATED:
        s = load_curated(fname)
        print(f"  {fname}: {len(s)}")
        all_collocations.update(s)

    # 6. Learned whitelist
    wl_path = DATA_DIR / "learned_whitelist.json"
    if wl_path.exists():
        s = set(e.lower().strip() for e in json.loads(wl_path.read_text()))
        print(f"  learned_whitelist: {len(s)}")
        all_collocations.update(s)

    # Filter: 2-4 words, lowercase, ASCII
    filtered = set()
    for c in all_collocations:
        c = c.lower().strip()
        if not (2 <= len(c.split()) <= 4):
            continue
        if not all(ord(ch) < 128 for ch in c):
            continue
        filtered.add(c)

    print(f"\n=== TOTAL: {len(filtered)} unique collocations ===\n")

    # Save
    OUTPUT.write_text(json.dumps(sorted(filtered), indent=2) + "\n")
    OUTPUT_TXT.write_text("\n".join(sorted(filtered)) + "\n")
    print(f"Saved to {OUTPUT}")


if __name__ == "__main__":
    main()
