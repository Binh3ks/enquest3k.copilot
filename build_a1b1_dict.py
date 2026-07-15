#!/usr/bin/env python3
"""
Build A1-B1 functional chunks dictionary from W1-W35 content.

Strategy: Extract 2-3 word phrases that appear 3+ times across files.
These are proven A1-B1 functional chunks used by the curriculum.

Output: production_kit/data/a1b1_functional_chunks.json
"""

import re
import json
from pathlib import Path
from collections import defaultdict, Counter

WEEKS_ADV = "/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks"
WEEKS_EASY = "/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks_easy"
DATA_DIR = "/Users/binhnguyen/Downloads/Engquest3k/production_kit/data"
CACHE_DIR = Path(DATA_DIR) / "cache"
CACHE_DIR.mkdir(parents=True, exist_ok=True)

# Load English words reference (for validation)
ENGLISH_WORDS_CACHE = CACHE_DIR / "english_words.txt"
if not ENGLISH_WORDS_CACHE.exists():
    try:
        import urllib.request
        url = "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt"
        with urllib.request.urlopen(url, timeout=10) as r:
            ENGLISH_WORDS_CACHE.write_bytes(r.read())
    except Exception as e:
        print(f"Warning: Could not download English words list: {e}")

ENGLISH_WORDS = set()
if ENGLISH_WORDS_CACHE.exists():
    for line in ENGLISH_WORDS_CACHE.read_text().split("\n"):
        if line.strip():
            ENGLISH_WORDS.add(line.strip().lower())
    print(f"Loaded {len(ENGLISH_WORDS)} English words")

# Common stop words to skip
STOP = set("""
a an the and or but if in on at to for of with from by as is am are was were be been being
have has had do does did will would shall should may might can could
i you he she it we they me him her us them my your his her its our their
this that these those there here
not no nor so than too very just
""".split())

# Blacklist: clearly free grammatical
BLACKLIST = {
    "a lot of", "a little bit", "a few", "a bit",
    "a couple of", "a kind of", "a sort of",
    "the same", "the other", "the first", "the last",
    "the best", "the worst", "the most", "the only",
    "i am", "i have", "i was", "i can", "i will",
    "you are", "you can", "you have",
    "it is", "it was", "it has",
    "we are", "we can", "we have",
    "they are", "they have", "they were",
}


def bigrams(text):
    """Generate word bigrams from text."""
    words = re.findall(r"\b[a-z']+\b", text.lower())
    return [(words[i], words[i+1]) for i in range(len(words) - 1)]


def trigrams(text):
    """Generate word trigrams from text."""
    words = re.findall(r"\b[a-z']+\b", text.lower())
    return [(words[i], words[i+1], words[i+2]) for i in range(len(words) - 2)]


def find_files():
    """Find all W1-W35 files."""
    files = []
    for week in range(1, 36):
        week_str = f"{week:02d}"
        for mode, base in [("ADV", WEEKS_ADV), ("EASY", WEEKS_EASY)]:
            for station in ["read", "explore", "dictation", "shadowing"]:
                path = Path(base) / f"week_{week_str}" / f"{station}.js"
                if path.exists():
                    files.append((week, mode, station, path))
    return files


def extract_phrases():
    """Extract 2-3 word phrases from all W1-W35 files."""
    bigram_counter = Counter()
    trigram_counter = Counter()

    files = find_files()
    print(f"Processing {len(files)} files...")

    # Common non-English / non-A1B1 words (filter out)
    NON_ENGLISH = {
        "adventure", "audio", "jpg", "png", "mp3", "max", "min",
        "tom", "sarah", "leo", "maya", "jake", "tom", "export", "default", "theme",
        "mode", "november", "october", "vietnamese", "english", "json",
        "alex", "emma", "nova", "ms", "mr", "mrs",
        # Common Spanish words seen in samples
        "amazing", "abilities", "trabajos", "siempre", "bragged", "cocina",
        "cocinar", "absorb", "choses", "loved", "smiling", "beautiful",
    }

    for week, mode, station, path in files:
        try:
            content = path.read_text()
            # Strip bold markers
            content = re.sub(r'\*\*([^*]+)\*\*', r'\1', content)
            # Strip content_vi (Vietnamese section)
            content = re.sub(r'content_vi\s*:.*?(?=\n\s*\w+\s*:|$)', '', content, flags=re.DOTALL)

            for b in bigrams(content):
                if b[0] in STOP or b[1] in STOP:
                    continue
                if b[0] in NON_ENGLISH or b[1] in NON_ENGLISH:
                    continue
                bigram_counter[b] += 1

            for t in trigrams(content):
                if t[0] in STOP or t[1] in STOP or t[2] in STOP:
                    continue
                if t[0] in NON_ENGLISH or t[1] in NON_ENGLISH or t[2] in NON_ENGLISH:
                    continue
                trigram_counter[t] += 1
        except Exception as e:
            pass

    # Keep phrases appearing 8+ times (stricter)
    common_bigrams = {p: c for p, c in bigram_counter.items() if c >= 8}
    common_trigrams = {p: c for p, c in trigram_counter.items() if c >= 8}

    return common_bigrams, common_trigrams


def is_valid_phrase(phrase):
    """Check if phrase is valid (not in blacklist, all alphabetic)."""
    joined = " ".join(phrase)
    if joined in BLACKLIST:
        return False
    if len(joined) < 5 or len(joined) > 30:
        return False
    # Filter: must be all ASCII lowercase
    if not all(ord(c) < 128 for c in joined):
        return False
    # Filter: all words must be alphabetical
    for w in phrase:
        if not w.replace("'", "").isalpha():
            return False
    # Filter: all words must be in English words list (when available)
    if ENGLISH_WORDS:
        for w in phrase:
            if w not in ENGLISH_WORDS:
                return False
    return True


def main():
    print("=== Building A1-B1 Functional Chunks Dictionary ===\n")

    bigrams, trigrams = extract_phrases()
    print(f"\nFound {len(bigrams)} common bigrams (3+ reps)")
    print(f"Found {len(trigrams)} common trigrams (3+ reps)")

    # Filter and build chunks
    chunks = set()

    # Add valid bigrams
    for phrase, count in bigrams.items():
        if is_valid_phrase(phrase):
            chunks.add(" ".join(phrase))

    # Add valid trigrams
    for phrase, count in trigrams.items():
        if is_valid_phrase(phrase):
            chunks.add(" ".join(phrase))

    # Filter out phrases starting/ending with stopwords
    chunks = {c for c in chunks if c.split()[0] not in STOP and c.split()[-1] not in STOP}

    print(f"\nAfter filtering: {len(chunks)} valid A1-B1 chunks")

    # Save
    output = Path(DATA_DIR) / "a1b1_functional_chunks.json"
    output.write_text(json.dumps(sorted(chunks), indent=2) + "\n")
    print(f"Saved to {output}")

    # Text version
    text_output = Path(DATA_DIR) / "a1b1_functional_chunks.txt"
    text_output.write_text("\n".join(sorted(chunks)) + "\n")

    # Sample
    print(f"\nSample (first 50):")
    for c in sorted(chunks)[:50]:
        print(f"  {c}")


if __name__ == "__main__":
    main()
