#!/usr/bin/env python3
"""
Extract collocations from 5 local PDF sources.
Combine with existing Oxford + A1-B1 dicts.
"""

import re
import json
from pathlib import Path

OUTPUT_DIR = Path("/Users/binhnguyen/Downloads/Engquest3k/production_kit/data")
COLLOCATIONS_OUT = OUTPUT_DIR / "extended_collocations.json"
COLLOCATIONS_TXT = OUTPUT_DIR / "extended_collocations.txt"

# Sources
SOURCES = {
    "1000_english": "/tmp/1000-english-collocations-ebook.txt",
    "b1_cambridge": "/tmp/506887-b1-preliminary-vocabulary-list.txt",
    "in_context": "/tmp/Collocations-in-Context.txt",
    "intermediate": "/tmp/English Collocations in Use Intermediate - Study Guide Notes.txt",
    "advanced": "/tmp/English-Collocations-in-Use-Advanced.txt",
}

# Common stopwords
STOP = set("""
a an the and or but if in on at to for of with from by as
is am are was were be been being
have has had do does did will would shall should may might can could
i you he she it we they me him her us them my your his its our their
this that these those there here
not no nor so than too very just only also
""".split())


def extract_from_pdf(filepath, source_name):
    """Extract collocations from PDF text."""
    if not Path(filepath).exists():
        return set()

    content = Path(filepath).read_text()
    collocations = set()

    # Method 1: Look for "word1 word2" patterns (lowercase, 2-3 words)
    # Lines like "take a picture" or "make a decision"
    lines = content.split('\n')
    for line in lines:
        line = line.strip().lower()
        # Skip too long/short lines
        if not line or len(line) < 4 or len(line) > 50:
            continue
        # Skip lines with special chars
        if any(c in line for c in '[]{}=*#<>|\\'):
            continue
        # Must contain only ASCII
        if not all(ord(c) < 128 for c in line):
            continue
        # Must be lowercase
        if line != line.lower():
            continue
        # 2-3 words
        words = line.split()
        if not (2 <= len(words) <= 3):
            continue
        # First/last word: not pure stopword
        if words[0] in STOP or words[-1] in STOP:
            continue
        # Each word: alphabetical
        if not all(w.isalpha() for w in words):
            continue
        collocations.add(line)

    return collocations


def merge_with_existing(new_collocations):
    """Merge with existing Oxford + A1-B1 + curated dicts."""
    all_set = set(new_collocations)

    # Load Oxford
    oxford = OUTPUT_DIR / "oxford_collocations.txt"
    if oxford.exists():
        for line in oxford.read_text().split('\n'):
            line = line.strip().lower()
            if 2 <= len(line.split()) <= 4:
                all_set.add(line)

    # Load A1-B1
    a1b1 = OUTPUT_DIR / "a1b1_functional_chunks.txt"
    if a1b1.exists():
        for line in a1b1.read_text().split('\n'):
            line = line.strip().lower()
            if line:
                all_set.add(line)

    # Load learned whitelist
    wl = OUTPUT_DIR / "learned_whitelist.json"
    if wl.exists():
        data = json.loads(wl.read_text())
        for e in data:
            all_set.add(e.lower().strip())

    # Load existing curated
    for fname in ["chunks_a1_b1.py", "extra_collocations.py", "wiktionary_idioms.py"]:
        fpath = OUTPUT_DIR / fname
        if fpath.exists():
            content = fpath.read_text()
            entries = re.findall(r'"([^"]+)"', content)
            for e in entries:
                e = e.lower().strip()
                if 2 <= len(e.split()) <= 4:
                    all_set.add(e)

    return all_set


def main():
    print("=== Extracting Collocations from 5 Local PDFs ===\n")

    all_new = set()
    source_counts = {}

    for source, path in SOURCES.items():
        colls = extract_from_pdf(path, source)
        source_counts[source] = len(colls)
        all_new.update(colls)
        print(f"  {source}: {len(colls)} unique phrases")

    # Remove duplicates
    print(f"\nTotal unique before merge: {len(all_new)}")

    # Merge with existing
    all_combined = merge_with_existing(all_new)
    print(f"Total after merge with Oxford+A1-B1+curated: {len(all_combined)}")

    # Save
    COLLOCATIONS_OUT.write_text(json.dumps(sorted(all_combined), indent=2) + "\n")
    COLLOCATIONS_TXT.write_text("\n".join(sorted(all_combined)) + "\n")
    print(f"\nSaved to:")
    print(f"  {COLLOCATIONS_OUT}")
    print(f"  {COLLOCATIONS_TXT}")

    # Show sample of new
    new_only = all_new - all_combined
    print(f"\nSample new entries (from PDFs only):")
    for c in sorted(all_new)[:30]:
        print(f"  {c}")


if __name__ == "__main__":
    main()
