#!/usr/bin/env python3
"""
Parse Oxford Collocations Dictionary DSL and extract all collocations.
Output: production_kit/data/oxford_collocations.json
"""

import re
import json
from pathlib import Path

DSL_PATH = "/tmp/oxford_extract/ocd_source/ocd.dsl"
OUTPUT = Path("/Users/binhnguyen/Downloads/Engquest3k/production_kit/data/oxford_collocations.json")
TEXT_OUTPUT = Path("/Users/binhnguyen/Downloads/Engquest3k/production_kit/data/oxford_collocations.txt")

def parse_dsl():
    """Extract collocations from OCD DSL."""
    with open(DSL_PATH, 'r', encoding='utf-8') as f:
        text = f.read()

    # Split by empty lines (entries are separated)
    entries = re.split(r'\n\s*\n', text)
    print(f"Total entries (with empty separator): {len(entries)}")

    collocations = set()

    for entry in entries:
        # Skip header
        if entry.startswith('#'):
            continue

        lines = entry.split('\n')
        if not lines:
            continue

        # First line is the headword (e.g., "abandon", "à la carte")
        headword = lines[0].strip()
        if not headword or headword.startswith('\t'):
            continue

        # Look for patterns:
        # [b]<phrase>[/b] is used with these nouns: [ref]X[/ref], [ref]Y[/ref]
        # [b]<phrase>[/b] is used before these nouns: [ref]X[/ref]
        # [b]<phrase>[/b] is used after these nouns: [ref]X[/ref]
        # [b]<phrase>[/b] is used with these verbs:
        # [b]<phrase>[/b] is used with these adjectives:

        # Pattern 1: ADVERB / PHRASE / VERB + X
        for line in lines:
            # Match [b]<X>[/b] is used with these nouns: [ref]A[/ref], [ref]B[/ref]
            m = re.search(r'\[b\]([^\[]+)\[/b\]\s+is used with these nouns:\s*((?:\[ref\][^\[]+\[/ref\],?\s*)+)', line)
            if m:
                head_phrase = m.group(1).strip()
                # Skip if too long (probably a sentence)
                if len(head_phrase.split()) > 4:
                    continue
                # Get all refs
                refs = re.findall(r'\[ref\]([^\[]+)\[/ref\]', m.group(2))
                for ref in refs:
                    ref = ref.strip().rstrip(',').strip()
                    # Skip if too long
                    if len(ref.split()) > 3:
                        continue
                    # Build collocation: "head_phrase + ref" or variations
                    if head_phrase and ref:
                        coll = f"{head_phrase.lower()} {ref.lower()}".strip()
                        collocations.add(coll)

            # Pattern 2: [b]<X>[/b] is used before these nouns
            m = re.search(r'\[b\]([^\[]+)\[/b\]\s+is used before these nouns:\s*((?:\[ref\][^\[]+\[/ref\],?\s*)+)', line)
            if m:
                head_phrase = m.group(1).strip()
                if len(head_phrase.split()) > 4:
                    continue
                refs = re.findall(r'\[ref\]([^\[]+)\[/ref\]', m.group(2))
                for ref in refs:
                    ref = ref.strip().rstrip(',').strip()
                    if len(ref.split()) > 3:
                        continue
                    if head_phrase and ref:
                        coll = f"{head_phrase.lower()} {ref.lower()}".strip()
                        collocations.add(coll)

            # Pattern 3: VERB + X structure: [b]<chunk>[/b] is used as the object/verb
            # Skip - too many false positives

    print(f"Total collocations extracted: {len(collocations)}")

    # Filter: only A1-B1 level (1-4 words, lowercase)
    filtered = {c for c in collocations if 1 <= len(c.split()) <= 4}

    # Filter: remove patterns with brackets or special chars
    filtered = {c for c in filtered if all(ch.isalpha() or ch == ' ' for ch in c)}

    # Filter: remove empty
    filtered = {c for c in filtered if c.strip()}

    # Filter: must be 2-4 words
    filtered = {c for c in filtered if 2 <= len(c.split()) <= 4}

    print(f"After filtering: {len(filtered)}")

    return sorted(filtered)

def main():
    print("=== Parsing Oxford Collocations Dictionary ===\n")
    collocations = parse_dsl()

    # Save JSON
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(collocations, indent=2) + "\n")
    print(f"\nSaved {len(collocations)} entries to {OUTPUT}")

    # Save text (one per line, for easy grep)
    TEXT_OUTPUT.write_text("\n".join(collocations) + "\n")
    print(f"Saved text version to {TEXT_OUTPUT}")

    # Sample
    print(f"\nSample (first 30):")
    for c in collocations[:30]:
        print(f"  {c}")

if __name__ == "__main__":
    main()
