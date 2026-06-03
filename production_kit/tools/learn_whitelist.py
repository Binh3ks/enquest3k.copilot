#!/usr/bin/env python3
"""
Layer 3 self-learning: take Layer 4 verdicts from
/tmp/layer4_verdicts.jsonl, extract the chunks marked as VALID
(is_valid_chunk=True), and add them to a learned_whitelist.json
that validate_chunks.py can read.

Usage:
    python3 learn_whitelist.py
"""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).parent.parent.parent
VERDICTS = pathlib.Path("/tmp/layer4_verdicts.jsonl")
LEARNED = ROOT / "production_kit" / "data" / "learned_whitelist.json"
DICT_FILE = ROOT / "production_kit" / "data" / "chunks_a1_b1.py"


def main():
    if not VERDICTS.exists():
        sys.exit(f"ERROR: {VERDICTS} not found. Run layer4 first.")

    # Load existing learned whitelist
    learned = set()
    if LEARNED.exists():
        learned = set(json.loads(LEARNED.read_text()))
    print(f"Existing learned whitelist: {len(learned)} entries")

    # Parse verdicts
    new_entries = set()
    with VERDICTS.open() as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                item = json.loads(line)
            except json.JSONDecodeError:
                continue
            verdict = item.get("verdict", {})
            if verdict.get("is_valid_chunk"):
                chunk = item.get("chunk", "").strip()
                if chunk and "API error" not in verdict.get("explanation", ""):
                    if chunk.lower() not in {c.lower() for c in learned}:
                        new_entries.add(chunk)

    print(f"New VALID chunks from Layer 4: {len(new_entries)}")

    # Merge
    learned.update(new_entries)
    print(f"Total learned whitelist now: {len(learned)}")

    # Write JSON
    LEARNED.parent.mkdir(parents=True, exist_ok=True)
    sorted_list = sorted(learned)
    LEARNED.write_text(json.dumps(sorted_list, indent=2, ensure_ascii=False))
    print(f"Wrote {LEARNED}")

    # Also append to chunks_a1_b1.py as a comment section
    if DICT_FILE.exists():
        content = DICT_FILE.read_text()
        # Add LEARNED set at end if not present
        if "LEARNED = set([" not in content:
            learned_block = "\n\n# === Layer 3 self-learning from Layer 4 ===\nLEARNED = set([\n"
            for chunk in sorted_list:
                # Escape quotes
                esc = chunk.replace("'", "\\'")
                learned_block += f"    '{esc}',\n"
            learned_block += "])\n"
            content += learned_block
            DICT_FILE.write_text(content)
            print(f"Appended LEARNED to {DICT_FILE}")


if __name__ == "__main__":
    main()
