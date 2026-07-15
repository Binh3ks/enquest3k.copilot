#!/usr/bin/env python3
"""
Smart auto-bold v2 — SPAN TRACKING approach.

For each W1-W35 read.js / explore.js (ADV + Easy):
  1. Find content_en: "..." body
  2. Track all **...** SPANS in the body (start, end of inner text)
  3. For each valid chunk (in dict with VI meaning):
     a. Find all matches of the chunk in the body
     b. For each match, skip if it falls within an existing bold span
        (i.e., the chunk is already covered by a longer bold)
     c. Otherwise, mark the position for bolding
  4. Apply bolding from end to start (so positions don't shift)
  5. After bolding, verify body still has balanced ** and the body
     length matches (we didn't lose/gain chars except **).
  6. Reconstruct the file (replace body only, keep content_en: " and quote
     wrapper intact)
  7. Validate by running node --check on the file (in the calling script).
"""
import argparse
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DICT_PATH = REPO / "src/data/dictionary.json"
WEEKS_DIRS = {
    "adv": REPO / "src/data/weeks",
    "easy": REPO / "src/data/weeks_easy",
}

# Track verb/prep-like tokens that should be left alone (proper nouns etc.)
# For now, no filter — all dict multi-word phrases are valid chunks.


def load_chunks_from_dict():
    """Load multi-word chunks from dict that have a Vietnamese meaning."""
    raw = json.loads(DICT_PATH.read_text())
    out = set()
    for entry in raw:
        phrase = entry.get("word", "").strip()
        if not phrase or " " not in phrase:
            continue
        if len(phrase.split()) > 6:
            continue
        meaning = entry.get("meaning_vi") or entry.get("meaning", "")
        if not meaning or not meaning.strip():
            continue
        out.add(phrase.lower())
    return sorted(out, key=lambda s: (-len(s), s))


def find_content_en_span(source):
    """Find the body of content_en: "..." as (start_in_body, end_in_body, body_text).

    start_in_body is the position right after the opening quote.
    end_in_body is the position of the closing quote.
    body_text is the content between the quotes.

    Returns None if not found.
    """
    m = re.search(r"content_en:\s*(.)", source)
    if not m:
        return None
    quote = m.group(1)
    body_start = m.end()  # position after opening quote
    # Find the matching closing quote (no escape needed since we use double
    # quotes in production, but be careful with \")
    i = body_start
    while i < len(source):
        c = source[i]
        if c == "\\" and i + 1 < len(source):
            i += 2
            continue
        if c == quote:
            return body_start, i, source[body_start:i]
        i += 1
    return None


def get_bold_spans(body):
    """Return list of (start, end) of inner text of each **...**."""
    return [(m.start() + 2, m.end() - 2) for m in re.finditer(r"\*\*([^*\n]+?)\*\*", body)]


def span_contains_position(spans, pos):
    """True if pos is inside any span."""
    return any(s <= pos < e for s, e in spans)


def apply_smart_bold(body, chunks):
    """Apply bolding to body. Returns (new_body, list_of_added_bolds).

    Strategy:
      1. Sort chunks longest-first to avoid sub-chunk matches.
      2. For each chunk:
         a. Get current bold spans in body
         b. Find all match positions for chunk
         c. For each match, skip if inside an existing bold span
         d. Mark for bolding
      3. Apply all bolds from end to start to preserve positions.
    """
    added = []
    for chunk in chunks:
        # Build current bold spans after previous bolds
        bold_spans = get_bold_spans(body)
        # Find all matches
        positions = []
        for m in re.finditer(r"\b" + re.escape(chunk) + r"\b", body, re.IGNORECASE):
            if not span_contains_position(bold_spans, m.start()):
                positions.append((m.start(), m.end()))
        if not positions:
            continue
        # Apply from end to start
        for s, e in reversed(positions):
            body = body[:s] + "**" + body[s:e] + "**" + body[e:]
            added.append(chunk)
    return body, added


def process_file(path, chunks, dry_run=True):
    """Process one file. Returns (changed, change_count, error_msg)."""
    source = path.read_text()
    span = find_content_en_span(source)
    if not span:
        return False, 0, None
    body_start, body_end, body = span
    new_body, added = apply_smart_bold(body, chunks)
    if new_body == body:
        return False, 0, None
    if len(new_body) != len(body) + 4 * len(added):
        # Each add is 4 chars (2 open + 2 close). If delta doesn't match,
        # something's wrong.
        return False, 0, f"length mismatch: body+{4*len(added)} != actual+{len(new_body)-len(body)}"

    new_source = source[:body_start] + new_body + source[body_end:]
    if not dry_run:
        path.write_text(new_source)
    return True, len(added), None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true",
                        help="Actually edit files (default: dry-run)")
    parser.add_argument("--week", type=int, default=None, help="Only this week")
    parser.add_argument("--mode", choices=["adv", "easy", "both"], default="both")
    args = parser.parse_args()

    print("[bold-v2] loading chunks from dict...")
    chunks = load_chunks_from_dict()
    print(f"[bold-v2] {len(chunks)} multi-word chunks with VI meaning")

    weeks = [args.week] if args.week else list(range(1, 36))
    modes = (["adv", "easy"] if args.mode == "both" else [args.mode])

    files = []
    for mode in modes:
        for w in weeks:
            for st in ("read", "explore"):
                p = WEEKS_DIRS[mode] / f"week_{w:02d}" / f"{st}.js"
                if p.exists():
                    files.append(p)

    print(f"[bold-v2] scanning {len(files)} files")

    files_changed = 0
    total_added = 0
    errors = []
    chunk_appearance = Counter()
    for fp in files:
        try:
            changed, count, err = process_file(fp, chunks, dry_run=not args.apply)
            if err:
                errors.append((str(fp), err))
                print(f"  [ERROR] {fp}: {err}")
                continue
            if changed:
                files_changed += 1
                total_added += count
                # Approximate chunk count by re-scanning
                # (this is approximate; the actual list of added bolds
                # is in `added` but we discarded it above)
                chunk_appearance["(see report)"] += count
                print(f"  {fp}: +{count} bolds")
        except Exception as e:
            errors.append((str(fp), str(e)))
            print(f"  [EXCEPTION] {fp}: {e}")

    print(f"\n[bold-v2] === SUMMARY ===")
    print(f"  Files modified:    {files_changed}")
    print(f"  Total bolds added: {total_added}")
    print(f"  Errors:            {len(errors)}")
    if errors:
        for fp, err in errors:
            print(f"    {fp}: {err}")

    if not args.apply:
        print("\n[bold-v2] Dry-run only. Re-run with --apply to edit files.")


if __name__ == "__main__":
    main()
