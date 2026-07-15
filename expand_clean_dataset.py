#!/usr/bin/env python3
"""
Expand clean dataset with 182 remaining chunks from re-audit.
Apply REJECT, DEDUPE, NORMALIZE.

Output: production_kit/data/chunks_dataset.json (updated)
"""

import json
import re
from pathlib import Path

DATA_DIR = Path("/Users/binhnguyen/Downloads/Engquest3k/production_kit/data")
TIER3_V2 = Path("/tmp/tier3_v2.txt")
DATASET_JSON = DATA_DIR / "chunks_dataset.json"
DATASET_TXT = DATA_DIR / "chunks_dataset.txt"
DATASET_AUDIT = DATA_DIR / "chunks_dataset_audit.md"

# REJECT for batch 2
REJECT_EXACT_BATCH2 = {
    "eat breakfast",  # typo - English: eat breakfast → use "have breakfast"
    "eat lunch",  # typo
    "look up",  # too generic, truncated
    "play with",  # too generic
    "speak to",  # too generic
    "walk to",  # too generic
    "bake a cake",  # specific
    "use a recipe",  # specific
    "follow a recipe",  # specific
    "famous author",  # mixed lang typo - famous (Spanish) → well-known author
    "beautiful park",  # typo - beautiful → beautiful
    "amazing things",  # typo
    "favorite place",  # typo
    "official report",  # typo
    "specific order",  # typo
    "important clue",  # typo
    "great adventure",  # typo
    "exciting adventures",  # typo
    "popular tradition",  # typo
    "special memories",  # typo
    "official report",  # typo
    "forensic science",  # typo
    "warm sunlight",  # typo
    "absorbs water",  # typo
    "lovely grandmother",  # typo
    "lovely personality",  # typo
}

# DEDUPE + NORMALIZE
DEDUPE_BATCH2 = {
    "work together": "work together",
    "work hard": "work hard",
    "wake up": "wake up",
    "wake up early": "wake up early",
    "fall asleep": "fall asleep",
    "eat breakfast": "have breakfast",
    "eat lunch": "have lunch",
    "make food": "make food",
    "draw pictures": "draw pictures",
    "watch tv": "watch TV",
    "learn about": "learn about",
    "last week": "last week",
    "last night": "last night",
    "picked up": "pick up",
    "pick up": "pick up",
    "big brother": "big brother",
    "little sister": "little sister",
    "every evening": "every evening",
    "every afternoon": "every afternoon",
    "every time": "every time",
    "read books": "read books",
    "busy streets": "busy street",
    "busy street": "busy street",
    "tall building": "tall building",
    "tall buildings": "tall building",
    "next time": "next time",
    "next summer": "next summer",
    "green fields": "green field",
    "green leaf": "green leaf",
    "slide down": "slide down",
    "quiet place": "quiet place",
    "quiet street": "quiet street",
    "loving family": "loving family",
    "playing soccer": "play soccer",
    "played soccer": "play soccer",
    "sunny days": "sunny day",
    "sunny day": "sunny day",
    "old photos": "old photo",
    "natural world": "natural world",
    "yesterday morning": "yesterday morning",
    "woke up early": "wake up early",
    "answered clearly": "answer clearly",
    "wrote every answer": "write every answer",
    "without hesitation": "without hesitation",
    "special visitor": "special visitor",
    "emotional day": "emotional day",
    "sharp knife": "sharp knife",
    "soft brush": "soft brush",
    "played all day": "play all day",
    "street musician": "street musician",
    "fun weekend": "fun weekend",
    "returned home": "return home",
    "day three": "day three",
    "day five": "day five",
    "rich soil": "rich soil",
    "warm water": "warm water",
    "pretty flower": "pretty flower",
    "tall stem": "tall stem",
    "tiny sprout": "tiny sprout",
    "small boat": "small boat",
    "slow hare": "slow hare",
    "wonderful trip": "wonderful trip",
    "fresh strawberries": "fresh strawberry",
    "put everything away": "put everything away",
    "looked around": "look around",
    "shone through": "shine through",
    "saturday morning": "Saturday morning",
    "long grass": "long grass",
    "little roof": "little roof",
    "walk carefully": "walk carefully",
    "cold pack": "cold pack",
    "gathered seeds": "gather seeds",
    "stored food": "store food",
    "warm sunshine": "warm sunshine",
    "high mountains": "high mountain",
    "throwing away plastic": "throw away plastic",
    "act now": "act now",
    "cutting down trees": "cut down trees",
    "green forests": "green forest",
    "polar ice": "polar ice",
    "sea levels": "sea level",
    "blue oceans": "blue ocean",
    "young scientist": "young scientist",
    "happy day": "happy day",
    "each other": "each other",
    "talk about": "talk about",
    "makes food": "make food",
    "warm smile": "warm smile",
    "brown eyes": "brown eyes",
    "happy smile": "happy smile",
    "wears glasses": "wear glasses",
    "round face": "round face",
    "feel happy": "feel happy",
    "the living room": "the living room",
    "mystery house": "mystery house",
    "blank paper": "blank paper",
    "sharp scissors": "sharp scissors",
    "water bottle": "water bottle",
    "noisy place": "noisy place",
    "less busy": "less busy",
    "yellow bus": "yellow bus",
    "big green field": "big green field",
    "many animals": "many animal",
    "tall trees": "tall tree",
    "delicious food": "delicious food",
    "run fast": "run fast",
    "special talents": "special talent",
    "classical music": "classical music",
    "daily routine": "daily routine",
    "wonderful time": "wonderful time",
    "rainy days": "rainy day",
    "live broadcast": "live broadcast",
    "modern technology": "modern technology",
    "TV station": "TV station",
    "picks up": "pick up",
    "old map": "old map",
    "old temple": "old temple",
    "wooden bridge": "wooden bridge",
    "small villages": "small village",
    "before dinner": "before dinner",
    "laughed together": "laugh together",
    "famous scientists": "famous scientist",
    "full story": "full story",
    "a little upset": "a little upset",
    "little upset": "a little upset",
    "right order": "right order",
    "main character": "main character",
    "comic strip": "comic strip",
    "speech bubble": "speech bubble",
    "folk tales": "folk tale",
    "comic strips": "comic strip",
    "everyday life": "everyday life",
    "speech bubbles": "speech bubble",
    "life cycle": "life cycle",
    "warm sun": "warm sun",
    "sunny window": "sunny window",
    "bus stop": "bus stop",
    "slow tortoise": "slow tortoise",
    "yellow taxi": "yellow taxi",
    "steady wins": "steady wins",
    "perfect choice": "perfect choice",
    "magic carpet": "magic carpet",
    "magic trip": "magic trip",
    "cheese sandwiches": "cheese sandwich",
    "waved back": "wave back",
    "soft blanket": "soft blanket",
    "said hello": "say hello",
    "stay healthy": "stay healthy",
    "chemical reaction": "chemical reaction",
    "wooden shelf": "wooden shelf",
    "soft cotton": "soft cotton",
    "stone bowl": "stone bowl",
    "cold metal": "cold metal",
    "great place": "great place",
    "little birdhouse": "little birdhouse",
    "pocket money": "pocket money",
    "fell down": "fall down",
    "immediate danger": "immediate danger",
    "short story": "short story",
    "fossil fuels": "fossil fuel",
    "renewable energy": "renewable energy",
    "solar power": "solar power",
    "warm blanket": "warm blanket",
    "greenhouse effect": "greenhouse effect",
    "must protect": "must protect",
    "local market": "local market",
}


def main():
    print("=== Expanding Clean Dataset (Batch 2: 182 chunks) ===\n")

    # Load current dataset
    with open(DATASET_JSON) as f:
        current = set(json.load(f))
    print(f"Current dataset: {len(current)}")

    # Read Tier 3 batch 2
    with open(TIER3_V2) as f:
        raw = [line.strip() for line in f if line.strip()]
    print(f"Tier 3 batch 2: {len(raw)}")

    # Process
    rejected = []
    added = []
    dedupe_count = 0

    for chunk in raw:
        chunk_lower = chunk.lower()
        if chunk_lower in REJECT_EXACT_BATCH2:
            rejected.append(chunk)
            continue
        if chunk_lower in DEDUPE_BATCH2:
            base = DEDUPE_BATCH2[chunk_lower]
            if base != chunk_lower:
                dedupe_count += 1
            added.append(base)
        else:
            added.append(chunk_lower)

    # Merge
    for c in added:
        current.add(c)

    # Clean: ASCII only, 2-4 words
    current = {c for c in current if all(ord(ch) < 128 for ch in c) and 2 <= len(c.split()) <= 4}

    # Sort
    final = sorted(current)

    print(f"\nRejected: {len(rejected)}")
    print(f"Dedupe transformations: {dedupe_count}")
    print(f"Final dataset: {len(final)}")

    # Save
    DATASET_JSON.write_text(json.dumps(final, indent=2) + "\n")
    DATASET_TXT.write_text("\n".join(final) + "\n")

    # Update audit report
    AUDIT_REPORT = Path(DATASET_AUDIT)
    if AUDIT_REPORT.exists():
        existing = AUDIT_REPORT.read_text()
        # Append batch 2 section
        new_section = f"\n\n## Batch 2 Expansion\n"
        new_section += f"- Input chunks: {len(raw)}\n"
        new_section += f"- Rejected: {len(rejected)}\n"
        new_section += f"- Dedupe transformations: {dedupe_count}\n"
        new_section += f"- Final dataset size: {len(final)}\n"
        new_section += f"\n### REJECTED (Batch 2)\n"
        for c in sorted(rejected):
            new_section += f"- `{c}`\n"
        AUDIT_REPORT.write_text(existing + new_section)

    print(f"\nSaved to {DATASET_JSON}")

    # Sample
    print(f"\n=== Sample FINAL dataset ===")
    for c in final[:30]:
        print(f"  {c}")


if __name__ == "__main__":
    main()
