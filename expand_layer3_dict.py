#!/usr/bin/env python3
"""
Expand Layer 3 collocation dictionary using Datamuse API + English words list.

Adds new entries to:
- production_kit/data/chunks_a1_b1.py (curated main dict)
- production_kit/data/extra_collocations.py (extended)
- production_kit/data/learned_whitelist.json (auto-grown)
"""

import json
import re
import time
import urllib.request
import urllib.parse
from pathlib import Path

DATA_DIR = Path("/Users/binhnguyen/Downloads/Engquest3k/production_kit/data")
CACHE_DIR = DATA_DIR / "cache"
CACHE_DIR.mkdir(parents=True, exist_ok=True)

DATAMUSE = "https://api.datamuse.com/words"

# Curated seeds: A1-B1 vocabulary from current W1-W35 content
SEEDS_VERBS = [
    "save", "protect", "reduce", "recycle", "plant", "clean", "carry", "burn",
    "make", "take", "cut", "throw", "turn", "act", "build", "blow", "fall",
    "climb", "race", "work", "play", "eat", "drink", "read", "write", "watch",
    "ride", "drive", "stop", "start", "open", "close", "push", "pull",
    "shine", "melt", "rise", "feel", "look", "laugh", "cry", "shout"
]

SEEDS_ADJECTIVES = [
    "clean", "fresh", "renewable", "harmful", "happy", "sad", "tired", "excited",
    "high", "low", "fast", "slow", "big", "small", "hot", "cold", "warm",
    "loud", "quiet", "soft", "hard", "rough", "smooth", "heavy", "light"
]

SEEDS_NOUNS = [
    "tree", "forest", "ocean", "river", "mountain", "air", "water", "land",
    "planet", "world", "city", "home", "room", "door", "window", "wall",
    "energy", "power", "food", "water", "park", "school", "field"
]

def fetch_datamuse(query, cache_key=None, max_results=20):
    """Fetch from Datamuse API with cache."""
    if cache_key:
        cache_path = CACHE_DIR / f"datamuse_{cache_key}.json"
        if cache_path.exists():
            return json.loads(cache_path.read_text())

    try:
        # Strip any pre-existing max= to avoid duplicate param
        clean_query = re.sub(r'&?max=\d+', '', query)
        url = f"{DATAMUSE}?{clean_query}&max={max_results}"
        with urllib.request.urlopen(url, timeout=10) as resp:
            data = json.loads(resp.read())
            if cache_key:
                cache_path.write_text(json.dumps(data, indent=2))
            time.sleep(0.3)  # rate limit
            return data
    except Exception as e:
        print(f"  Error: {e}")
        return []

def expand_verb_collocations():
    """Find common collocations: verb + noun (e.g., 'heavy traffic')."""
    results = set()
    # Datamuse returns single words; we build adj+noun from rel_jja queries
    for noun in ["rain", "traffic", "wind", "sun", "energy", "pollution", "air",
                 "water", "smoke", "earth", "planet", "forest", "ocean", "tree"]:
        # Find adjectives that modify this noun
        data = fetch_datamuse(f"words?rel_jja={noun}&max=15", cache_key=f"jja_{noun}")
        for item in data:
            word = item.get("word", "")
            if word and 3 <= len(word) <= 12 and word.isalpha():
                results.add(f"{word} {noun}")
    return results

def expand_adj_noun():
    """Find noun + noun (e.g., 'air pollution', 'water pollution')."""
    results = set()
    base_nouns = ["pollution", "energy", "power", "waste", "emissions",
                  "resources", "footprint", "habitat", "species"]
    for noun in base_nouns:
        # rel_jjb finds nouns that this noun follows (adj + noun)
        data = fetch_datamuse(f"words?rel_jjb={noun}&max=15", cache_key=f"jjb_{noun}")
        for item in data:
            word = item.get("word", "")
            if word and 3 <= len(word) <= 12 and word.isalpha():
                results.add(f"{word} {noun}")
    return results

def expand_verb_prep():
    """Find phrasal verbs by searching compound words."""
    results = set()
    for verb in SEEDS_VERBS:
        # md=f returns frequency; we look for known phrasal verb patterns
        data = fetch_datamuse(f"words?sp={verb}+*&md=f&max=30", cache_key=f"phrasal_{verb}")
        for item in data:
            word = item.get("word", "")
            if word.startswith(verb + " ") and 4 <= len(word) <= 25:
                results.add(word)
    return results

def merge_into_existing(new_entries):
    """Merge new entries into existing dictionaries."""
    # Read existing chunks_a1_b1.py
    chunks_path = DATA_DIR / "chunks_a1_b1.py"
    if chunks_path.exists():
        content = chunks_path.read_text()
        existing = set(re.findall(r'"([^"]+)"', content))
    else:
        existing = set()

    # Filter new entries: deduplicate, remove existing
    new_unique = new_entries - existing

    # Filter: only A1-B1 level (no academic/jargon)
    blacklist = {
        "in the late", "as a result of", "in the united states",
        "the united states", "the new york", "the european union",
        "united states of america"
    }
    new_unique = {e for e in new_unique if not any(b in e for b in blacklist)}

    # Filter: must be 2-4 words, lowercase
    new_unique = {e for e in new_unique if 2 <= len(e.split()) <= 4}

    return new_unique

def save_to_learned_whitelist(entries):
    """Add new entries to learned_whitelist.json."""
    wl_path = DATA_DIR / "learned_whitelist.json"
    if wl_path.exists():
        existing = set(json.loads(wl_path.read_text()))
    else:
        existing = set()

    new_entries = entries - existing
    if new_entries:
        combined = sorted(existing | new_entries)
        wl_path.write_text(json.dumps(combined, indent=2) + "\n")
        print(f"  Added {len(new_entries)} entries to learned_whitelist.json")
    else:
        print(f"  No new entries to add")

def main():
    print("=== Expanding Layer 3 Dictionary ===\n")

    print("Step 1: Verb + Noun collocations...")
    vn = expand_verb_collocations()
    print(f"  Found {len(vn)} unique verb-noun patterns\n")

    print("Step 2: Adj + Noun collocations...")
    an = expand_adj_noun()
    print(f"  Found {len(an)} unique adj-noun patterns\n")

    print("Step 3: Verb + Prep (phrasal verbs)...")
    vp = expand_verb_prep()
    print(f"  Found {len(vp)} unique phrasal verbs\n")

    all_new = vn | an | vp
    print(f"Total unique candidates: {len(all_new)}\n")

    print("Step 4: Merge with existing...")
    unique_new = merge_into_existing(all_new)
    print(f"  After dedup + filter: {len(unique_new)} new entries\n")

    print("Step 5: Save to learned_whitelist.json...")
    save_to_learned_whitelist(unique_new)

    # Print sample
    sample = list(unique_new)[:20]
    print(f"\nSample new entries:")
    for s in sample:
        print(f"  - {s}")

if __name__ == "__main__":
    main()
