#!/usr/bin/env python3
"""
Add surface forms (plurals, to-infinitive, V-ed) to chunks_dataset.

This ensures app can lookup exact bold chunk text from read.js/explore.js,
not just the standardized lemma form.
"""

import json
import re
from pathlib import Path

DATA_DIR = Path("/Users/binhnguyen/Downloads/Engquest3k/production_kit/data")
DATASET_JSON = DATA_DIR / "chunks_dataset.json"

# Load current dataset
with open(DATASET_JSON) as f:
    data = json.load(f)

# Build lookup set
existing = {item["standardized_chunk"] for item in data}

# Get all surface forms (raw_text + variants)
all_forms = set()
for item in data:
    all_forms.add(item["standardized_chunk"])
    all_forms.add(item["raw_text"])
    for v in item.get("variants", []):
        all_forms.add(v)

print(f"Current dataset: {len(data)} standardized chunks")
print(f"All forms (raw + lemma + variants): {len(all_forms)}")

# Save enriched dataset with surface forms
# Build new entries for surface forms
new_entries = []
for item in data:
    std = item["standardized_chunk"]
    raw = item["raw_text"]
    variants = item.get("variants", [])

    # The item already has raw + variants as additional forms
    # We just need to add ALL surface forms found in explore.js
    # These should already be in raw/variants

# Extract all surface forms that appear in W1-W35 content
# Read all read.js + explore.js files
WEEKS_ADV = Path("/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks")
WEEKS_EASY = Path("/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks_easy")

# Extract all bold chunks from files
content_chunks = set()
for week in range(1, 36):
    week_str = f"{week:02d}"
    for base in [WEEKS_ADV, WEEKS_EASY]:
        for station in ["read", "explore"]:
            path = base / f"week_{week_str}" / f"{station}.js"
            if path.exists():
                try:
                    content = path.read_text()
                    for match in re.finditer(r'\*\*([^*\n]+?)\*\*', content):
                        chunk = match.group(1).strip().rstrip('.,!?;:').strip()
                        if chunk and all(ord(ch) < 128 for ch in chunk) and 2 <= len(chunk.split()) <= 4:
                            content_chunks.add(chunk.lower())
                except Exception:
                    pass

print(f"Surface forms in W1-W35 content: {len(content_chunks)}")

# Check coverage
missing = content_chunks - all_forms
print(f"Missing in dataset: {len(missing)}")

# Add missing surface forms as new entries
for chunk in sorted(missing):
    # Try to find the lemma form
    found_lemma = None
    for item in data:
        if chunk == item["raw_text"] or chunk in item.get("variants", []):
            found_lemma = item["standardized_chunk"]
            break
        # Check if chunk could be a variant of standardized
        # (e.g., steel rails → steel rail)
        std = item["standardized_chunk"]
        if std in chunk or chunk in std:
            # Check if just plural/possessive difference
            if chunk.replace("rails", "rail") == std.replace("rails", "rail"):
                found_lemma = std
                break

    if found_lemma:
        # Add as variant
        for item in data:
            if item["standardized_chunk"] == found_lemma:
                if "variants" not in item:
                    item["variants"] = []
                if chunk not in item["variants"]:
                    item["variants"].append(chunk)
                break
    else:
        # Add as new entry
        # Determine type
        first_word = chunk.split()[0]
        if first_word in {"to", "a", "the", "an"}:
            # Skip - probably grammar
            continue

        # Classify CEFR (rough)
        cefr = "A1"

        # Classify type
        words = chunk.split()
        if words[0] in {"at", "in", "on", "by", "for", "with", "from", "to", "of", "about", "into", "through", "because", "instead", "without", "after", "before", "since", "until", "during", "between", "among", "against", "across", "behind", "beyond", "near", "off", "over", "under", "up", "down", "around"}:
            chunk_type = "Phrasal Preposition"
        elif any(c in chunk for c in ["rails", "passengers", "kilometres", "vehicles", "trees", "animals", "people", "children", "books", "places"]):
            chunk_type = "Plural Noun Collocation"
        else:
            chunk_type = "Verb-Noun Collocation"

        data.append({
            "raw_text": chunk,
            "standardized_chunk": chunk,
            "cefr_level": cefr,
            "type": chunk_type,
            "reasoning": "Surface form from W1-W35 content (auto-added)",
            "variants": [chunk]
        })

# Save
DATASET_JSON.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
print(f"\nFinal dataset: {len(data)} entries")

# Recount missing
new_all_forms = set()
for item in data:
    new_all_forms.add(item["standardized_chunk"])
    new_all_forms.add(item["raw_text"])
    for v in item.get("variants", []):
        new_all_forms.add(v)

still_missing = content_chunks - new_all_forms
print(f"Still missing: {len(still_missing)}")
if still_missing:
    print("Sample missing:")
    for c in sorted(still_missing)[:20]:
        print(f"  - {c}")
