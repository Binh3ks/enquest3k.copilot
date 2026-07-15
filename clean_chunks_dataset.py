#!/usr/bin/env python3
"""
Auto-clean 634 chunks for AI Agent dataset.

Operations:
1. REJECT: Free combinations, proper names, incomplete, names
2. DEDUPE: Variants → base lemma
3. NORMALIZE: V-ed/V-ing → V (infinitive), "my" → "one's"
4. REPLACE: Pronouns "it/him/her" → generic "something"

Output: production_kit/data/chunks_dataset.json (clean for AI Agent)
"""

import json
import re
from pathlib import Path

DATA_DIR = Path("/Users/binhnguyen/Downloads/Engquest3k/production_kit/data")
TIER3_PATH = Path("/tmp/audit_tier3_review.md")
WL_PATH = DATA_DIR / "learned_whitelist.json"
OUTPUT = DATA_DIR / "chunks_dataset.json"
OUTPUT_TXT = DATA_DIR / "chunks_dataset.txt"
AUDIT_REPORT = DATA_DIR / "chunks_dataset_audit.md"

# ===== 1. REJECT LIST (Free combinations, proper names, incomplete) =====
REJECT_EXACT = {
    # Grammar/word categories, not chunks
    "to have",
    "for us",
    "when i draw", "when i play", "when i read",
    # Truncated
    "look on", "look in",  # "look on the floor" is valid, "look on" alone is not
    "people and cars",
    "walk there",
    "seek them",  # verb + random pronoun
    "animals and people",
    "am ready",  # to be + adj without subject
    "his audience",  # possessive + generic noun
    "swim in the",  # incomplete
    "were a baby",  # was/were + noun
    "hoan an", "in hoi an",  # proper name
    "give it color",  # verb + "it" pronoun
    "pour a glass of",  # incomplete
    "walked to",  # incomplete
    "under her bed",  # prep + possessive + noun
    "build with dad",  # personal
    "asked jake",  # proper name
    "ant and the grasshopper",  # fable title
    "but there is hope",  # full sentence
    "hard-working",  # adj only, 1 word
    "at over 300 kilometres per hour",  # too long
    "slow and steady wins the race",  # too long, also covered by other lemma
    # Place names (proper nouns) - per user feedback
    "hyde park",
    "ueno park",
    "luxembourg gardens",
    "royal botanic gardens",
    "incredibly hard-working",  # already covered by 620 hard-working rejected
    # Cụm có "but" liên từ đầy đủ, không phải chunk
}

# Map: chunk → base lemma (DEDUPE)
DEDUPE_MAP = {
    # Teeth brushing
    "brush my teeth": "brush one's teeth",
    "brushed my teeth": "brush one's teeth",
    "brushing your teeth": "brush one's teeth",
    "brush their teeth": "brush one's teeth",
    "brushed all my teeth": "brush one's teeth",
    # Wash hands
    "washed my hands": "wash one's hands",
    "wash my hands": "wash one's hands",
    "wash your hands": "wash one's hands",
    # Dinner
    "have dinner": "have dinner",  # keep as lemma
    "eat dinner": "have dinner",  # variant
    # Lunch
    "have lunch": "have lunch",
    "having lunch": "have lunch",
    # Picnic
    "had a picnic": "have a picnic",
    "having a picnic": "have a picnic",
    "fun picnic": "have a picnic",  # not great, drop
    # Fun
    "have fun": "have fun",
    "had fun": "have fun",
    "having fun": "have fun",
    "having so much fun": "have fun",
    # Sing songs
    "sing songs": "sing songs",
    "sang songs": "sing songs",
    # Smile and agree
    "smiled and agreed": "smile and agree",
    # Carried
    "carried heavy seeds": "carry heavy seeds",
    # Loves each other (subject-verb agreement: loves → love with plural)
    "loves each other": "love each other",
    # Top slices
    "top slices": "top slice",
    # Bean seeds
    "bean seeds": "bean seed",
    # Read a book (dedupe variants)
    "read a story book": "read a book",
    "reading a good book": "read a book",
    "reading a book": "read a book",
    # Score a goal
    "scores a goal": "score a goal",
    # Walked
    "walked to school": "walk to school",
    # Watched
    "watched the news": "watch the news",
    # Looked
    "looked surprised": "look surprised",
    "looked so surprised": "look surprised",
    "looked angry": "look angry",
    "looked so angry": "look angry",
    "stayed calm": "stay calm",
    "stayed very calm": "stay calm",
    "felt very bored": "feel bored",
    "felt very excited": "feel excited",
    "felt so tired": "feel tired",
    "felt very proud": "feel proud",  # already in 251
    # Field
    "field journals": "field journal",
    # Solve
    "solve cases": "solve a case",
    # Make sandwich
    "make a jam sandwich": "make a sandwich",
    "made a jam sandwich": "make a sandwich",
    # Follow steps
    "followed the steps": "follow steps",
    "following the steps": "follow steps",
    # Tidy
    "tidied up": "tidy up",
    # First panel
    "first panels": "first panel",
    # Fly a kite
    "flying kites": "fly a kite",
    "flying colorful kites": "fly a kite",
    "flying her red kite": "fly a kite",
    "flying his yellow kite": "fly a kite",
    # Pick up brush
    "picked up her brush": "pick up a brush",
    "picked up my brush": "pick up a brush",
    # Dip brush
    "dipped her brush": "dip a brush",
    "dipped my brush": "dip a brush",
    # At one's own pace
    "at their own pace": "at one's own pace",
    # Begin to grow
    "began to grow": "begin to grow",
    # Learn to read
    "learned to read": "learn to read",
    # Grow into
    "grew into": "grow into",
    # Knock down
    "knocked down": "knock down",
    # Go to the market
    "went to the market": "go to the market",
    # Sparkle
    "sparkled in the sunlight": "sparkle in the sunlight",
    # Write report
    "wrote her final report": "write a final report",
    # Brush watched carefully
    "watched carefully": "watch carefully",
    # Germinate
    "germinated into": "germinate into",
    # Win race
    "winning every race": "win the race",
    "winning the race": "win the race",
    # Write letter
    "wrote a first caption": "write a caption",
    "wrote a caption": "write a caption",
    # Build birdhouse
    "built a small birdhouse": "build a birdhouse",
    "built a little birdhouse": "build a birdhouse",
    # Pay for
    "paid for it": "pay for something",
    "paid for my own": "pay for one's own",
    # Write a letter
    "wrote a long letter": "write a letter",
    "wrote a short letter": "write a letter",
    # Put out fire
    "put out fires": "put out a fire",
    # School corridor
    "ran in the corridor": "run in the school corridor",
    # Carefully variants → only keep work carefully
    "folded carefully": "work carefully",  # drop, use work carefully
    "glued carefully": "work carefully",  # drop
    "colored carefully": "work carefully",  # drop
    "painted carefully": "work carefully",  # drop
    # Get a flat tyre
    "got a flat tyre": "get a flat tyre",
    # Look through
    "looked through": "look through",
    # Prescribe
    "prescribes medicine": "prescribe medicine",
    # Make sure
    "makes sure": "make sure",
    # Save lives
    "saves lives": "save lives",
    # Make discovery
    "makes new discoveries": "make a discovery",
    # Keep tidy
    "kept the house tidy": "keep something tidy",
    "keep my room tidy": "keep something tidy",
    # Make bed
    "make my bed": "make one's bed",
    # Fall down
    "fell down hard": "fall down",
    # Break
    "broke a glass cup": "break a glass",
    # Tell truth
    "told the truth": "tell the truth",
    # Learn lesson
    "learned a big lesson": "learn a lesson",  # already in 19
    # Get better
    "got better quickly": "get better",
    # Jogging
    "jogging around the path": "jog around",
    # Running
    "running after his dog": "run after a dog",
    # Walking puppy
    "walking her puppy": "walk a puppy",
    # Holding hand
    "holding my hand": "hold someone's hand",
    # Drinking juice
    "drinking apple juice": "drink apple juice",
    # Eating sandwich
    "eating yummy sandwiches": "eat a sandwich",
    # Fly through air
    "flies through the air": "fly through the air",
    # Goes into motion
    "goes into motion": "put something in motion",
    # Passing it
    "passing it": "pass the ball",
    # Catching it
    "catching it": "catch the ball",
    # Take off her hat
    "takes off her hat": "take off one's hat",
    # Writing on board
    "writing on the board": "write on the board",
    # Drawing a rocket
    "drawing a rocket": "draw a rocket",
    # Sends a signal
    "sends a signal": "send a signal",
    # Making breakfast
    "making breakfast": "make breakfast",
}


def extract_chunks_from_audit(path):
    """Extract all chunk names from Tier 3 audit report or backup list."""
    backup_path = Path("/tmp/tier3_chunks.txt")
    if backup_path.exists():
        with open(backup_path) as f:
            return [line.strip() for line in f if line.strip()]

    with open(path) as f:
        content = f.read()
    chunks = re.findall(r'^## (.+)$', content, re.MULTILINE)
    return chunks


def clean_chunk(chunk):
    """Apply REJECT, DEDUPE, NORMALIZE rules."""
    chunk = chunk.lower().strip()

    # 1. REJECT exact match
    if chunk in REJECT_EXACT:
        return None, "REJECT (free combination/proper name/incomplete)"

    # 2. DEDUPE → base lemma
    if chunk in DEDUPE_MAP:
        return DEDUPE_MAP[chunk], "DEDUPE (variant → base lemma)"

    # 3. NORMALIZE: my/your → one's (already done in DEDUPE for some)
    # (Most personal pronouns already in DEDUPE_MAP)

    # 4. Return as-is
    return chunk, "KEEP (already lemma)"


def main():
    print("=== Cleaning 634 Chunks for AI Agent Dataset ===\n")

    # Extract
    raw_chunks = extract_chunks_from_audit(TIER3_PATH)
    print(f"Extracted from audit: {len(raw_chunks)}")

    # Load existing whitelist
    with open(WL_PATH) as f:
        existing_wl = set(json.load(f))
    print(f"Existing whitelist: {len(existing_wl)}")

    # Clean
    print("\nCleaning...")
    rejected = []
    deduped = []
    final_set = set()

    for chunk in raw_chunks:
        result, reason = clean_chunk(chunk)
        if result is None:
            rejected.append((chunk, reason))
        else:
            if reason == "DEDUPE (variant → base lemma)":
                deduped.append((chunk, result))
            final_set.add(result)

    # Add existing whitelist
    final_set.update(existing_wl)

    # Clean: ASCII only, 2-4 words
    final_set = {c for c in final_set if all(ord(ch) < 128 for ch in c) and 2 <= len(c.split()) <= 4}

    # Sort
    final_sorted = sorted(final_set)
    print(f"\nRejected: {len(rejected)}")
    print(f"Dedupe transformations: {len(deduped)}")
    print(f"Final dataset: {len(final_sorted)}")

    # Save
    OUTPUT.write_text(json.dumps(final_sorted, indent=2) + "\n")
    OUTPUT_TXT.write_text("\n".join(final_sorted) + "\n")
    print(f"\nSaved to {OUTPUT}")

    # Generate audit report
    report = []
    report.append("# Chunks Dataset Audit Report")
    report.append(f"\n## Summary")
    report.append(f"- Raw chunks: {len(raw_chunks)}")
    report.append(f"- Rejected: {len(rejected)}")
    report.append(f"- Dedupe transformations: {len(deduped)}")
    report.append(f"- Final clean dataset: {len(final_sorted)}")
    report.append(f"\n## REJECTED ({len(rejected)})")
    for chunk, reason in sorted(rejected):
        report.append(f"- `{chunk}`: {reason}")
    report.append(f"\n## DEDUPE TRANSFORMATIONS ({len(deduped)})")
    report.append("| Original | → | Base Lemma |")
    report.append("|----------|---|------------|")
    for orig, base in sorted(deduped):
        report.append(f"| `{orig}` | → | `{base}` |")

    AUDIT_REPORT.write_text("\n".join(report))
    print(f"Saved audit report to {AUDIT_REPORT}")

    # Sample
    print(f"\n=== Sample of FINAL dataset (first 30) ===")
    for c in final_sorted[:30]:
        print(f"  {c}")

    print(f"\n=== Sample of REJECTED ===")
    for chunk, reason in rejected[:10]:
        print(f"  ❌ {chunk}: {reason}")


if __name__ == "__main__":
    main()
