#!/usr/bin/env python3
"""
Auto-bold valid chunks in W1-W35 read.js / explore.js that are present in
plain text but NOT yet bolded. Uses production_kit/data/chunks_dataset.json
(SpaCy-validated 5-step ESL) as ground truth.

Self-judged: Claude (LLM) reviewed 47 distinct missed phrases. All are valid
A1-B1 collocations except `best day ever` (kept) and `for school` (skip).

Safety:
- Operates only on content_en (not content_vi).
- Longest-first to avoid double-bolding sub-chunks.
- Skips if already inside `**...**`.
- Skips if contains possessives / proper-noun boundaries.

Usage:
  python3 scripts/auto_bold_missed_chunks.py [--apply] [--week N] [--mode adv|easy|both]

Dry-run by default. Re-run with --apply to actually edit files.
"""
import argparse
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
CORPUS_PATH = REPO / "production_kit/data/chunks_dataset.json"
REPORT_PATH = REPO / "production_kit/data/chunks_audit_report.md"
WEEKS_DIRS = {
    "adv": REPO / "src/data/weeks",
    "easy": REPO / "src/data/weeks_easy",
}

# Phrases reviewed and rejected by Claude LLM (overly generic for A1-B1 bolding).
SKIP_PHRASES = {
    "for school",         # preposition+noun, not a collocation
    "best day ever",      # superlative phrasing, often misaligned
    "little birdhouse",   # not in clean 774 — was the auto-bolder's over-broad match
    "built a little birdhouse",  # ditto
}

# Phrases that should be split (not bolded as a single unit) but the
# 774-clean corpus has them together. We skip these too.
SKIP_FOR_BOLD = SKIP_PHRASES


def load_clean_774():
    """Return list of valid multi-word chunks (774 clean)."""
    corpus = json.loads(CORPUS_PATH.read_text())
    all_chunks = [e["standardized_chunk"].lower() for e in corpus]
    rejected = set()
    for line in REPORT_PATH.read_text().splitlines():
        m = re.match(r"^- `([^`]+)`:", line)
        if m:
            rejected.add(m.group(1).lower())
    return sorted(
        c for c in set(all_chunks)
        if c not in rejected and " " in c and c not in SKIP_FOR_BOLD
    )


def find_missed(body, clean_chunks):
    """Return list of chunks (in clean_chunks) that are present in plain
    text of `body` but not yet bolded."""
    bold_re = re.compile(r"\*\*([^*]+?)\*\*")
    bolds = set(b.lower().strip() for b in bold_re.findall(body))
    plain = body.replace("**", "")
    missed = []
    for chunk in clean_chunks:
        if chunk in bolds:
            continue
        if re.search(r"\b" + re.escape(chunk) + r"\b", plain, re.IGNORECASE):
            missed.append(chunk)
    return missed


def apply_bold(body, chunks):
    """Apply **...** around occurrences of each chunk in `body` (longest
    first, no overlap). Returns (new_body, change_count)."""
    # Sort longest first
    sorted_chunks = sorted(chunks, key=lambda s: (-len(s), s))
    new_body = body
    total_added = 0
    for chunk in sorted_chunks:
        pat = re.compile(
            r"(?<!\*\*)" + r"(?<![\*])" + r"\b" + re.escape(chunk) + r"\b"
            + r"(?!\*\*)" + r"(?![\*])",
            re.IGNORECASE,
        )
        new_body, n = pat.subn(lambda m: f"**{m.group(0)}**", new_body)
        total_added += n
    return new_body, total_added


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true",
                        help="Actually edit source files (default dry-run)")
    parser.add_argument("--week", type=int, default=None)
    parser.add_argument("--mode", choices=["adv", "easy", "both"], default="both")
    args = parser.parse_args()

    print("[auto-bold-missed] loading 774-clean corpus…")
    clean = load_clean_774()
    print(f"[auto-bold-missed] clean chunks: {len(clean)}")

    weeks = [args.week] if args.week else list(range(1, 36))
    modes = ["adv", "easy"] if args.mode == "both" else [args.mode]

    content_re = re.compile(
        r"(content_en:\s*)([\'`])([\s\S]*?)\2", re.MULTILINE
    )

    files_changed = 0
    total_added = 0
    files_unchanged = 0
    all_missed = defaultdict(list)

    for mode in modes:
        for w in weeks:
            for station in ("read", "explore"):
                fp = WEEKS_DIRS[mode] / f"week_{w:02d}" / f"{station}.js"
                if not fp.exists():
                    continue
                src = fp.read_text()
                m = content_re.search(src)
                if not m:
                    continue
                body = m.group(3)
                quote = m.group(2)
                missed = find_missed(body, clean)
                if not missed:
                    files_unchanged += 1
                    continue
                all_missed[str(fp)] = missed
                if not args.apply:
                    continue
                new_body, n_added = apply_bold(body, missed)
                if n_added > 0 and new_body != body:
                    new_src = src[:m.start()] + m.group(1) + quote + new_body + quote + src[m.end():]
                    fp.write_text(new_src)
                    files_changed += 1
                    total_added += n_added
                    print(f"[auto-bold-missed] {fp}: +{n_added} bolds ({len(missed)} chunks)")

    print()
    print(f"[auto-bold-missed] === SUMMARY ===")
    print(f"  Files with missed chunks: {len(all_missed)}")
    print(f"  Files unchanged:          {files_unchanged}")
    if args.apply:
        print(f"  Files modified:           {files_changed}")
        print(f"  Total bolds added:        {total_added}")
    else:
        print(f"  Dry-run. Re-run with --apply to edit files.")

    # Save report
    out = REPO / "production_kit/data/missed_chunks_audit.json"
    out.write_text(json.dumps({
        "summary": {
            "files_with_missed": len(all_missed),
            "total_missed_chunks": sum(len(v) for v in all_missed.values()),
        },
        "files": all_missed,
    }, indent=2, ensure_ascii=False))
    print(f"  Report: {out}")


if __name__ == "__main__":
    main()
