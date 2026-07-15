#!/usr/bin/env python3
"""
3-Tier Audit for W1-W35 chunks/collocations.

Tier 1: AUTO-KEEP (in Oxford OR whitelist OR existing curated dict)
Tier 2: AUTO-FIX (matches blacklist - clearly false)
Tier 3: MANUAL REVIEW (ambiguous - not in Oxford + not in blacklist)
Rewrite-needed: single-word or structurally unsuitable bolds that should be
rewritten into a better multi-word chunk if the sentence supports one.

Oxford Collocations Dictionary = ground truth for validation.
"""

import json
import re
from pathlib import Path
from collections import defaultdict

WEEKS_ADV = "/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks"
WEEKS_EASY = "/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks_easy"
DATA_DIR = "/Users/binhnguyen/Downloads/Engquest3k/production_kit/data"

# === Tier 2: AUTO-FIX (clearly false patterns) ===
TIER2_BLACKLIST = [
    (r'\b(big\s+big|small\s+small|tall\s+tall|short\s+short|'
     r'good\s+good|bad\s+bad|kind\s+kind|nice\s+nice|happy\s+happy|'
     r'pretty\s+pretty|wooden\s+wooden|golden\s+golden|'
     r'very\s+very|really\s+really|always\s+always|'
     r'many\s+many|few\s+few|several\s+several|'
     r'long\s+long|short\s+short|fast\s+fast|slow\s+slow)\b', 'doubled-modifier'),
    (r'\b(kind|nice|friendly|good|great|talented|smart|clever|brilliant|'
     r'skillful|gentle|calm|quiet|hard-working|hardworking|strong|brave|'
     r'honest|fair|patient|creative|funny|talented)\s+'
     r'(teacher|scientist|doctor|engineer|nurse|farmer|driver|chef|'
     r'cook|artist|musician|writer|poet|dancer|singer|painter|'
     r'sculptor|designer|photographer|pilot|mechanic|electrician|'
     r'plumber|carpenter|butcher|baker|veterinarian|astronaut|'
     r'programmer|architect|lawyer|judge|librarian|accountant|'
     r'manager|director|reporter|journalist|firefighter|'
     r'policeman|detective|guide|interpreter|translator|'
     r'florist|barber|plumber|dentist|vet|soldier|pilot|farmer|'
     r'worker|helper|student|pupil|assistant|volunteer|expert)\b', 'tautological-adj-profession'),
    (r'\b(hard-working|lazy|clever|smart|stupid|busy|tiny|huge|big|small|'
     r'slow|fast|strong|weak|gentle|wild|shy|friendly|aggressive|'
     r'playful|curious|lazy|industrious|active|quiet)\s+'
     r'(ant|grasshopper|dog|cat|bird|fish|rabbit|mouse|lion|tiger|'
     r'elephant|monkey|bear|fox|wolf|snake|turtle|horse|cow|pig|'
     r'sheep|duck|chicken|goose|rooster|hawk|eagle|owl|bee|butterfly|'
     r'fox|deer|rabbit|squirrel|frog|spider|worm|ant|spider|beetle)\b', 'tautological-adj-animal'),
    (r'\b(big\s+small|tall\s+short|hot\s+cold|fast\s+slow|'
     r'loud\s+quiet|happy\s+sad|old\s+new|good\s+bad|'
     r'hard\s+soft|wet\s+dry|clean\s+dirty|empty\s+full)\b', 'contradiction'),
    (r'^(a|an|the)\s+(very|really|quite|pretty|rather|big|small|good|bad|'
     r'new|old|happy|sad|long|short|hot|cold|fast|slow|nice|kind|'
     r'easy|hard|beautiful|ugly|important)\s+\w+$', 'free-grammatical'),
]


def load_dictionaries():
    """Load CLEAN merged collocation dictionary."""
    collocations = set()

    dataset_path = Path(DATA_DIR) / "chunks_dataset.txt"
    if dataset_path.exists():
        for line in dataset_path.read_text().split("\n"):
            line = line.strip().lower()
            if line and 2 <= len(line.split()) <= 4:
                collocations.add(line)
        print(f"  Clean chunks_dataset: {len(collocations)} loaded")
    else:
        extended_path = Path(DATA_DIR) / "extended_collocations.txt"
        if extended_path.exists():
            for line in extended_path.read_text().split("\n"):
                line = line.strip().lower()
                if line and 2 <= len(line.split()) <= 4:
                    collocations.add(line)
            print(f"  Extended (fallback): {len(collocations)} loaded")

    for filename in ["chunks_a1_b1.py", "extra_collocations.py", "wiktionary_idioms.py"]:
        path = Path(DATA_DIR) / filename
        if path.exists():
            content = path.read_text()
            entries = re.findall(r'"([^"]+)"', content)
            for e in entries:
                e = e.lower().strip()
                if 2 <= len(e.split()) <= 4:
                    collocations.add(e)

    return collocations


def extract_bold_chunks(text):
    """Extract all **bold** phrases and label rewrite-needed cases explicitly."""
    pattern = r'\*\*([^*\n]+?)\*\*'
    chunks = re.findall(pattern, text)
    cleaned = []
    for c in chunks:
        raw = c.strip().rstrip('.,!?;:').strip()
        if not raw:
            continue
        if not all(ord(ch) < 128 for ch in raw):
            continue
        words = raw.split()
        if len(words) == 1:
            cleaned.append((raw.lower(), 'rewrite_needed_single_word'))
            continue
        if 2 <= len(words) <= 4:
            cleaned.append((raw.lower(), 'multi_word'))
        else:
            cleaned.append((raw.lower(), 'rewrite_needed_length'))
    return cleaned


def find_files():
    """Find all W1-W35 read.js + explore.js files."""
    files = []
    for week in range(1, 36):
        week_str = f"{week:02d}"
        for mode, base in [("ADV", WEEKS_ADV), ("EASY", WEEKS_EASY)]:
            for station in ["read", "explore"]:
                path = Path(base) / f"week_{week_str}" / f"{station}.js"
                if path.exists():
                    files.append((week, mode, station, path))
    return files


def normalize_variations(chunk):
    """Generate variations for dict lookup."""
    variations = {chunk.lower()}
    no_a = re.sub(r'\b(a|an|the)\s+', '', chunk.lower()).strip()
    if no_a != chunk.lower():
        variations.add(no_a)
    words = chunk.lower().split()
    if words:
        last = words[-1]
        if not last.endswith('s') and len(last) > 2:
            variations.add(' '.join(words[:-1] + [last + 's']))
        if last.endswith('s') and len(last) > 2:
            variations.add(' '.join(words[:-1] + [last[:-1]]))
    return variations


def tier1_check(chunk, dictionaries):
    """Check if chunk is in Oxford/whitelist."""
    variations = normalize_variations(chunk)
    for v in variations:
        if v in dictionaries:
            return True
    return False


def tier2_check(chunk):
    """Check if chunk matches blacklist patterns."""
    for pattern, desc in TIER2_BLACKLIST:
        if re.search(pattern, chunk, re.IGNORECASE):
            return desc
    return None


def main():
    print("=== 3-Tier Audit: W1-W35 Chunks/Collocations ===\n")

    print("Loading dictionaries...")
    dictionaries = load_dictionaries()
    print(f"  Total: {len(dictionaries)} entries\n")

    files = find_files()
    print(f"Found {len(files)} files\n")

    print("Extracting unique chunks...")
    chunk_to_sources = defaultdict(list)
    for week, mode, station, path in files:
        try:
            content = path.read_text()
            chunks = extract_bold_chunks(content)
            for chunk, kind in chunks:
                chunk_to_sources[(chunk, kind)].append(f"W{week:02d}/{mode}/{station}.js")
        except Exception:
            pass

    unique_chunks = list(chunk_to_sources.keys())
    print(f"  Total unique: {len(unique_chunks)}\n")

    print("Classifying into 3 tiers...")
    tier1_keep = []
    tier2_fix = []
    tier3_review = []
    rewrite_needed = []

    for chunk, kind in unique_chunks:
        sources = chunk_to_sources[(chunk, kind)]

        if kind != 'multi_word':
            rewrite_needed.append((chunk, kind, sources))
            continue

        fix_reason = tier2_check(chunk)
        if fix_reason:
            tier2_fix.append((chunk, fix_reason, sources))
            continue

        if tier1_check(chunk, dictionaries):
            tier1_keep.append((chunk, sources))
            continue

        tier3_review.append((chunk, sources))

    tier2_fix.sort(key=lambda r: r[0])
    tier1_keep.sort(key=lambda r: r[0])
    tier3_review.sort(key=lambda r: -len(r[1]))
    rewrite_needed.sort(key=lambda r: (r[1], r[0]))

    print(f"\n=== TIER SUMMARY ===")
    print(f"Tier 1 (AUTO-KEEP, in Oxford):       {len(tier1_keep)}")
    print(f"Tier 2 (AUTO-FIX, blacklist match):  {len(tier2_fix)}")
    print(f"Tier 3 (MANUAL REVIEW, ambiguous):   {len(tier3_review)}")
    print(f"Rewrite-needed (single/too-long):    {len(rewrite_needed)}")
    print(f"Total: {len(unique_chunks)}")

    report_dir = "/tmp"
    tier1_path = f"{report_dir}/audit_tier1_keep.md"
    tier2_path = f"{report_dir}/audit_tier2_fix.md"
    tier3_path = f"{report_dir}/audit_tier3_review.md"
    rewrite_path = f"{report_dir}/audit_rewrite_needed.md"
    summary_path = f"{report_dir}/audit_summary.json"

    with open(tier1_path, 'w') as f:
        f.write("# Tier 1: AUTO-KEEP (in Oxford/curated dict)\n")
        f.write(f"Total: {len(tier1_keep)} chunks\n\n")
        for chunk, sources in tier1_keep:
            f.write(f"- {chunk} ({len(sources)} files)\n")
    print(f"\nSaved: {tier1_path}")

    with open(tier2_path, 'w') as f:
        f.write("# Tier 2: AUTO-FIX (blacklist match)\n")
        f.write(f"Total: {len(tier2_fix)} chunks\n\n")
        f.write("Only unbold these if no better in-sentence replacement chunk exists.\n\n")
        for chunk, reason, sources in tier2_fix:
            f.write(f"## {chunk}\n")
            f.write(f"Reason: {reason}\n")
            f.write(f"Used in {len(sources)} files: {', '.join(sources[:5])}")
            if len(sources) > 5:
                f.write(f" ... and {len(sources) - 5} more")
            f.write("\n\n")
    print(f"Saved: {tier2_path}")

    with open(tier3_path, 'w') as f:
        f.write("# Tier 3: MANUAL REVIEW (ambiguous - not in Oxford, not in blacklist)\n")
        f.write(f"Total: {len(tier3_review)} chunks\n\n")
        f.write("Each chunk: verify if real collocation, then:\n")
        f.write("- Add to learned_whitelist.json if valid\n")
        f.write("- Rewrite/unbold if false\n\n")
        for chunk, sources in tier3_review:
            f.write(f"## {chunk}\n")
            f.write(f"Used in {len(sources)} files: {', '.join(sources[:5])}")
            if len(sources) > 5:
                f.write(f" ... and {len(sources) - 5} more")
            f.write("\n\n")
    print(f"Saved: {tier3_path}")

    with open(rewrite_path, 'w') as f:
        f.write("# Rewrite-needed bolds\n")
        f.write(f"Total: {len(rewrite_needed)} bolds\n\n")
        f.write("These are NOT valid final fixes for strip-only auto-fix. Rewrite to a meaningful multi-word chunk if the sentence supports one; otherwise remove bold.\n\n")
        for chunk, reason, sources in rewrite_needed:
            f.write(f"## {chunk}\n")
            f.write(f"Kind: {reason}\n")
            f.write(f"Used in {len(sources)} files: {', '.join(sources[:5])}")
            if len(sources) > 5:
                f.write(f" ... and {len(sources) - 5} more")
            f.write("\n\n")
    print(f"Saved: {rewrite_path}")

    summary = {
        "total_chunks": len(unique_chunks),
        "tier1_keep": len(tier1_keep),
        "tier2_fix": len(tier2_fix),
        "tier3_review": len(tier3_review),
        "rewrite_needed": len(rewrite_needed),
        "tier2_fix_list": [(c, r, len(s)) for c, r, s in tier2_fix],
        "tier3_review_list": [(c, len(s)) for c, s in tier3_review[:200]],
        "rewrite_needed_list": [(c, k, len(s)) for c, k, s in rewrite_needed[:200]],
    }
    with open(summary_path, 'w') as f:
        json.dump(summary, f, indent=2)
    print(f"Saved: {summary_path}")

    print(f"\n=== Tier 2 (AUTO-FIX) - Top 20 ===")
    for chunk, reason, sources in tier2_fix[:20]:
        print(f"  ❌ {chunk} - {reason} ({len(sources)} files)")

    print(f"\n=== Tier 3 (REVIEW) - Top 30 by usage ===")
    for chunk, sources in tier3_review[:30]:
        print(f"  ⚠️  {chunk} ({len(sources)} files)")

    print(f"\n=== Rewrite-needed - Top 30 ===")
    for chunk, reason, sources in rewrite_needed[:30]:
        print(f"  ✍️  {chunk} - {reason} ({len(sources)} files)")


if __name__ == "__main__":
    main()
