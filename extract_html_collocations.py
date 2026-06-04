#!/usr/bin/env python3
"""Extract collocations from downloaded HTML files."""

import re
import json
from html.parser import HTMLParser
from pathlib import Path

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.skip = False
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style', 'nav', 'header', 'footer', 'aside', 'form'):
            self.skip = True
    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'nav', 'header', 'footer', 'aside', 'form'):
            self.skip = False
    def handle_data(self, data):
        if not self.skip:
            self.text.append(data)


STOP = set("""
a an the and or but if in on at to for of with from by as
is am are was were be been being
have has had do does did will would shall should may might can could
i you he she it we they me him her us them my your his its our their
this that these those there here
not no nor so than too very just only also
""".split())


def extract(filepath):
    content = Path(filepath).read_text(encoding='utf-8', errors='ignore')
    p = TextExtractor()
    p.feed(content)
    text = ' '.join(p.text).lower()

    # Find candidate collocations
    candidates = set()
    # Pattern: lowercase words
    for match in re.finditer(r'\b([a-z]+(?:\s+[a-z]+){1,3})\b', text):
        phrase = match.group(1).strip()
        words = phrase.split()
        if not (2 <= len(words) <= 3):
            continue
        if words[0] in STOP or words[-1] in STOP:
            continue
        if any(len(w) < 2 or len(w) > 12 for w in words):
            continue
        candidates.add(phrase)

    return candidates


def main():
    sources = {
        'myenglishpages': '/tmp/myenglishpages.html',
        'aland': '/tmp/aland.html',
        'englishrevealed': '/tmp/englishrevealed.html',
    }

    all_new = set()
    for name, path in sources.items():
        if Path(path).exists():
            colls = extract(path)
            print(f"  {name}: {len(colls)} phrases")
            all_new.update(colls)

    print(f"\nTotal unique: {len(all_new)}")

    # Save
    output = Path('/Users/binhnguyen/Downloads/Engquest3k/production_kit/data/html_collocations.json')
    output.write_text(json.dumps(sorted(all_new), indent=2) + '\n')
    print(f"Saved to: {output}")

    # Show sample
    print(f"\nSample (first 30):")
    for c in sorted(all_new)[:30]:
        print(f"  {c}")


if __name__ == "__main__":
    main()
