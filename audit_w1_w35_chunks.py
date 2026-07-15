#!/usr/bin/env python3
"""
Audit W1-W35 read.js + explore.js for chunk/collocation validity.

Layers:
  Layer 1: Blacklist (false patterns) - hardcoded rules
  Layer 2: Pattern check (regex)
  Layer 3: Dictionary lookup (Oxford + existing chunks_a1_b1 + extra_collocations + wiktionary + learned)
  Layer 4: Stub - LLM judge (skipped, too slow for batch)

Output: audit report + auto-fix list
"""

import json
import re
import os
from pathlib import Path
from collections import defaultdict

WEEKS_ADV = "/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks"
WEEKS_EASY = "/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks_easy"
DATA_DIR = "/Users/binhnguyen/Downloads/Engquest3k/production_kit/data"

# === Layer 1: Blacklist patterns (FALSE chunks) ===
LAYER1_BLACKLIST = [
    # Doubled modifiers
    r'\b(big\s+big|small\s+small|tall\s+tall|short\s+short|good\s+good|bad\s+bad|'
    r'kind\s+kind|nice\s+nice|happy\s+happy|pretty\s+pretty|'
    r'wooden\s+wooden|golden\s+golden|plastic\s+plastic)\b',
    # Tautological adj + profession (e.g., "kind teacher" - teacher is kind)
    r'\b(kind|nice|friendly|good|great|talented|smart|clever|brilliant|skillful|'
    r'gentle|calm|quiet|hard-working)\s+'
    r'(teacher|scientist|doctor|engineer|nurse|farmer|driver|chef|artist|'
    r'musician|writer|poet|dancer|singer|painter|sculptor|designer|photographer|'
    r'pilot|mechanic|electrician|plumber|carpenter|mason|butcher|baker|'
    r'veterinarian|astronaut|programmer|architect|lawyer|judge|librarian|'
    r'accountant|manager|director|reporter|journalist|photographer|'
    r'firefighter|policeman|detective|guide|interpreter|translator)\b',
    # Adj + adj contradictions
    r'\b(big\s+small|tall\s+short|hot\s+cold|fast\s+slow|loud\s+quiet|'
    r'happy\s+sad|old\s+new|good\s+bad)\b',
    # Article+noun only (single word bolds, not multi-word)
    r'\b(a|an|the)\s+\w+\s+(and|or|with|of|in|on|at|to|for)\s+(a|an|the)\s+\w+\b',
]

# === Layer 2: Free-grammatical patterns (likely false) ===
LAYER2_PATTERNS = [
    # Verb + det + noun (free grammatical)
    (r'\b(make|do|have|get|take|give)\s+(a|an|the)\s+\w+\b', 'verb+det+noun (often free)'),
    # Adj + det + noun
    (r'\b(big|small|tall|short|hot|cold|fast|slow|good|bad|new|old|'
     r'happy|sad|angry|tired|hungry|thirsty|scared|excited|bored)\s+(a|an|the)\s+\w+\b',
     'adj+det+noun'),
    # "The + adj + noun" - generic
    (r'\bthe\s+(biggest|smallest|tallest|shortest|fastest|slowest|'
     r'best|worst|most\s+\w+|best|worst|newest|oldest)\s+\w+', 'superlative+article'),
]

# === Layer 3: Dictionary files ===
def load_dictionaries():
    """Load all collocation dictionaries."""
    collocations = set()

    # 1. Oxford
    oxford_path = Path(DATA_DIR) / "oxford_collocations.txt"
    if oxford_path.exists():
        lines = oxford_path.read_text().strip().split("\n")
        collocations.update(l.strip() for l in lines if l.strip())
        print(f"  Oxford: {len(lines)} entries")

    # 2. Existing curated
    chunks_path = Path(DATA_DIR) / "chunks_a1_b1.py"
    if chunks_path.exists():
        content = chunks_path.read_text()
        entries = re.findall(r'"([^"]+)"', content)
        collocations.update(e.lower().strip() for e in entries if e.strip())
        print(f"  chunks_a1_b1.py: {len(entries)} entries")

    # 3. Extra collocations
    extra_path = Path(DATA_DIR) / "extra_collocations.py"
    if extra_path.exists():
        content = extra_path.read_text()
        entries = re.findall(r'"([^"]+)"', content)
        collocations.update(e.lower().strip() for e in entries if e.strip())
        print(f"  extra_collocations.py: {len(entries)} entries")

    # 4. Wiktionary idioms
    wikt_path = Path(DATA_DIR) / "wiktionary_idioms.py"
    if wikt_path.exists():
        content = wikt_path.read_text()
        entries = re.findall(r'"([^"]+)"', content)
        collocations.update(e.lower().strip() for e in entries if e.strip())
        print(f"  wiktionary_idioms.py: {len(entries)} entries")

    # 5. Learned whitelist
    wl_path = Path(DATA_DIR) / "learned_whitelist.json"
    if wl_path.exists():
        data = json.loads(wl_path.read_text())
        collocations.update(e.lower().strip() for e in data if e.strip())
        print(f"  learned_whitelist.json: {len(data)} entries")

    return collocations


def extract_bold_chunks(text):
    """Extract all **bold** phrases from text."""
    # Match **word** or **multi word** or **word with punct**
    pattern = r'\*\*([^*\n]+?)\*\*'
    chunks = re.findall(pattern, text)
    # Clean: strip leading/trailing punctuation, lowercase
    cleaned = []
    for c in chunks:
        c = c.strip().rstrip('.').rstrip(',').rstrip('!').rstrip('?').strip()
        if c and len(c) >= 3 and ' ' in c:  # multi-word only
            cleaned.append(c.lower())
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


def audit_chunk(chunk, dictionaries, full_text=""):
    """Check a chunk against Layer 1-3 rules."""
    issues = []

    # Layer 1: Blacklist
    for pattern in LAYER1_BLACKLIST:
        if re.search(pattern, chunk, re.IGNORECASE):
            issues.append(f"L1: blacklisted pattern")
            break

    # Layer 2: Pattern check
    if not issues:
        for pattern, desc in LAYER2_PATTERNS:
            if re.search(pattern, chunk, re.IGNORECASE):
                issues.append(f"L2: {desc}")
                break

    # Layer 3: Dictionary lookup
    if not issues:
        # Exact match
        if chunk.lower() in dictionaries:
            return issues  # Valid

        # Try variations (with/without articles)
        variations = [
            chunk.lower(),
            chunk.lower().replace(' a ', ' ').replace(' an ', ' ').replace(' the ', ' '),
            chunk.lower().replace('a ', '').replace('an ', '').replace('the ', '').strip(),
        ]
        for v in variations:
            if v in dictionaries:
                return issues  # Valid

        # Singular/plural variations
        for v in list(variations):
            # Try plural
            words = v.split()
            if words:
                last = words[-1]
                # Add 's' if not ending in s
                if not last.endswith('s'):
                    v_plural = ' '.join(words[:-1] + [last + 's'])
                    if v_plural in dictionaries:
                        return issues
                # Remove 's' if ends in s
                if last.endswith('s') and len(last) > 1:
                    v_singular = ' '.join(words[:-1] + [last[:-1]])
                    if v_singular in dictionaries:
                        return issues

        # Not in dictionary = potentially false
        if not issues:
            issues.append("L3: not in Oxford/curated dict")

    return issues


def main():
    print("=== Audit W1-W35 Chunks/Collocations ===\n")

    # Load dictionaries
    print("Loading dictionaries...")
    dictionaries = load_dictionaries()
    print(f"  Total collocations in dictionaries: {len(dictionaries)}\n")

    # Find files
    files = find_files()
    print(f"Found {len(files)} files (read+explore, ADV+EASY)\n")

    # Collect all unique chunks first
    print("Phase 1: Extract unique chunks from all files...")
    chunk_to_sources = defaultdict(list)
    total_chunks = 0

    for week, mode, station, path in files:
        try:
            content = path.read_text()
            chunks = extract_bold_chunks(content)
            total_chunks += len(chunks)
            for chunk in set(chunks):
                chunk_to_sources[chunk].append(f"W{week:02d}/{mode}/{station}.js")
        except Exception as e:
            print(f"  Error reading {path}: {e}")

    unique_chunks = list(chunk_to_sources.keys())
    print(f"  Total chunks found: {total_chunks}")
    print(f"  Unique chunks: {len(unique_chunks)}\n")

    # Audit each unique chunk
    print("Phase 2: Audit each unique chunk...")
    results = []
    for chunk in unique_chunks:
        issues = audit_chunk(chunk, dictionaries)
        results.append((chunk, chunk_to_sources[chunk], issues))

    # Sort: flagged first
    results.sort(key=lambda r: (len(r[2]) == 0, r[0]))

    # Categorize
    valid = [r for r in results if not r[2]]
    flagged = [r for r in results if r[2]]

    print(f"\n=== SUMMARY ===")
    print(f"Total unique chunks: {len(unique_chunks)}")
    print(f"Valid (in dictionary or no issues): {len(valid)}")
    print(f"Flagged (potential issues): {len(flagged)}")

    # Save report
    report = []
    report.append("# W1-W35 Chunk Audit Report")
    report.append(f"\nTotal unique chunks: {len(unique_chunks)}")
    report.append(f"Valid: {len(valid)}")
    report.append(f"Flagged: {len(flagged)}")

    report.append("\n## FLAGGED CHUNKS (need review)\n")
    for chunk, sources, issues in flagged:
        report.append(f"### **{chunk}**")
        report.append(f"Issues: {', '.join(issues)}")
        report.append(f"Used in ({len(sources)} files): {', '.join(sources[:5])}")
        if len(sources) > 5:
            report.append(f"  ... and {len(sources) - 5} more")
        report.append("")

    # Show top valid examples
    report.append("\n## SAMPLE VALID CHUNKS (in dictionary)\n")
    for chunk, sources, _ in valid[:50]:
        report.append(f"- {chunk}")

    report_path = "/tmp/audit_w1_w35_chunks_report.md"
    with open(report_path, 'w') as f:
        f.write('\n'.join(report))

    print(f"\nReport saved to {report_path}")

    # Show top flagged
    print(f"\n=== Top 20 FLAGGED chunks ===")
    for chunk, sources, issues in flagged[:20]:
        print(f"  ❌ {chunk} - {', '.join(issues)} - used in {len(sources)} files")

    return results


if __name__ == "__main__":
    main()
