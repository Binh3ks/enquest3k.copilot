#!/usr/bin/env python3
"""
Audit bold consistency for W1-W35 read.js + explore.js (ADV + Easy).

Detects 4 patterns of bold inconsistency and proposes fixes:

  A. Inconsistent bolding — same chunk phrase, different bolded lengths
     across files (e.g., **slow and steady wins** vs **steady wins**).

  B. 3+ adjacent bolds — multiple `**...**` next to each other with no
     non-whitespace gap. If joined phrase ∈ dictionary → auto-merge.
     If joined phrase ∉ dictionary → flag for unbold.

  C. Valid-in-dict-not-bolded — chunk in `src/data/dictionary.json` but
     the corresponding text in content_en is plain. Auto-bold if safe.

  D. 4-bold split — `**X** ... **Y** **Z** ... **W**` with stopword gaps,
     joined phrase ∈ dictionary. Auto-merge.

Auto-fix logic (only with --apply):
  - Pattern B (in dict): merge into one bold.
  - Pattern B (not in dict): unbold all chunks in the run.
  - Pattern C: bold the chunk in plain text (longest-first, no overlap).
  - Pattern D: merge with stopword gap preserved.
  - Pattern A: report only (no auto-fix; needs human canonical choice).

Usage:
  python3 scripts/audit_bold_consistency.py [--apply] [--week N] [--mode adv|easy|both]

Output:
  production_kit/data/bold_consistency_audit.json
  production_kit/data/bold_consistency_audit.md
  production_kit/data/bold_consistency_fixes.diff (only if --apply)
"""
import argparse
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DICT_PATH = REPO / "src/data/dictionary.json"
WEEKS_DIRS = {
    "adv": REPO / "src/data/weeks",
    "easy": REPO / "src/data/weeks_easy",
}
OUT_DIR = REPO / "production_kit/data"

# Stopwords used to detect split-bolds (Pattern D).
STOPWORDS = {
    "and", "or", "the", "a", "an",
    "of", "in", "on", "at", "to", "for", "with", "by",
    "is", "are", "was", "were", "be", "been",
    "but", "so", "yet",
}

# Bolds that are intentional single-word bolds (proper names, abbreviations).
# These are tolerated even though our rule says 0 single-word bolds.
SINGLE_WORD_ALLOWLIST = {
    "kindergarten", "birdhouse", "shady", "fable", "luna", "luo", "pangu",
    "helen", "tony", "bingo", "lily", "dr.", "mr.", "mrs.", "ms.",
}

# Chunks in dictionary that are too generic to bold everywhere.
# These would create noise if auto-bolded in every occurrence.
# Inspired by FREE_COMBINATIONS in scripts/full_spacy_audit.py.
GENERIC_CHUNKS = {
    # there-constructions
    "there is", "there are", "there was", "there were", "there has", "there have",
    "there will", "there would", "there can", "there must",
    # generic preposition/verb phrases
    "go to", "go up", "go down", "go in", "go out", "go back", "go away",
    "go on", "go off",
    "went to", "went up", "went down", "went in", "went out", "went back",
    "go over", "go around", "go through",
    "come to", "come in", "come out", "come back", "come up", "come down",
    "came to", "came in", "came out", "came back", "came up", "came down",
    "come on", "come over", "come around",
    "get up", "get down", "get in", "get out", "get on", "get off",
    "got up", "got down", "got in", "got out", "got on", "got off",
    "next to", "near to", "close to",
    "in front of", "behind the", "next the", "by the",
    "after that", "before that", "then the", "now the", "and the", "or the",
    "to learn", "to make", "to do", "to go", "to get", "to take", "to come",
    "to see", "to know", "to find", "to give", "to tell", "to think",
    "of the", "in the", "on the", "at the", "to the", "for the", "with the",
    "by the", "from the", "as the", "is the", "are the", "was the", "were the",
    "be the", "has the", "have the", "had the", "do the", "does the",
    "did the", "and a", "or a", "with a", "in a", "on a", "at a", "to a",
    "for a", "of a", "from a", "by a", "as a", "is a", "are a", "was a",
    "were a", "be a", "has a", "have a", "had a",
    # too-generic 2-word
    "every day", "every night", "every morning", "every evening",
    "next day", "next morning", "next week", "next month", "next year",
    "last day", "last night", "last week", "last month", "last year",
    "first day", "first time", "first week", "first month", "first year",
    "many people", "many things", "many places", "many years", "many times",
    "many children", "many students", "many friends",
    "some people", "some things", "some places", "some days", "some times",
    "good day", "good morning", "good afternoon", "good evening", "good night",
    "good luck", "good job", "good idea", "good question",
    "best friend", "best friends", "best time", "best day", "best place",
    "old friend", "old friends", "old house", "old man", "old woman",
    "young man", "young woman", "young people", "young boy", "young girl",
    "big house", "big tree", "big garden", "big building", "big city",
    "small house", "small garden", "small tree", "small town", "small village",
    "tall tree", "tall man", "tall woman", "tall building", "tall girl",
    "new house", "new car", "new friend", "new friends", "new school", "new city",
    "happy family", "happy time", "happy day", "happy person",
    "long time", "long day", "long way", "long walk", "long journey",
    "short time", "short day", "short way", "short walk",
    "beautiful day", "beautiful place", "beautiful garden", "beautiful park",
    "great day", "great time", "great place", "great idea", "great job",
    "wonderful day", "wonderful time", "wonderful place",
    "lovely day", "lovely time", "lovely place", "lovely garden",
    "nice day", "nice morning", "nice place", "nice person",
    "amazing day", "amazing time", "amazing place",
    "fun day", "fun time", "fun moment", "fun game", "fun place",
    # 3-word too generic
    "in the morning", "in the afternoon", "in the evening", "at night",
    "at home", "at school", "at work", "at the park", "at the store",
    "in the kitchen", "in the garden", "in the park", "in the library",
    "on the wall", "on the floor", "on the table", "on the chair",
    "by the lake", "by the river", "by the sea", "by the window",
    "for example", "for a long time", "for a while", "for sure",
    "in fact", "in general", "in particular",
    "as well as", "as well", "as long as", "as soon as", "as far as",
    "such as", "so that", "so much", "so many", "so far", "so long",
    "a lot of", "a few of", "a couple of",
    "the nurse", "the doctor", "the teacher", "the students",
    "the children", "the people", "the family", "the friends",
    "the house", "the school", "the park", "the garden",
}


def load_dictionary():
    """Load dictionary.json as {lowercase_phrase: entry}."""
    raw = json.loads(DICT_PATH.read_text())
    out = {}
    for entry in raw:
        phrase = entry.get("word", "").strip().lower()
        if phrase:
            out[phrase] = entry
    return out


def extract_content_en(source):
    """Extract the content_en string body (without surrounding quotes)."""
    m = re.search(r'content_en:\s*[`\'"]([\s\S]*?)[`\'"]\s*[,}]', source)
    if not m:
        return None, None, None
    body = m.group(1)
    quote = source[m.start(1) - 1]
    return body, quote, (m.start(1), m.end(1))


def tokenize_runs(body):
    """Tokenize body into [(is_bold, text), ...] mirroring the renderer.

    Renderer: re.split(r'(\*\*.*?\*\*)', text). We mirror that exactly.
    """
    parts = re.split(r"(\*\*[^*\n]+?\*\*)", body)
    runs = []
    for p in parts:
        if not p:
            continue
        if p.startswith("**") and p.endswith("**") and len(p) >= 4:
            inner = p[2:-2]
            runs.append((True, inner, p))
        else:
            runs.append((False, p, p))
    return runs


def detect_pattern_b(runs, dict_lookup, file_path):
    """3+ adjacent bolds with no gap (Pattern B).

    Returns:
      list of {kind: "B", runs_idx: [i, i+1, ...], joined: str, in_dict: bool}
    """
    findings = []
    i = 0
    while i < len(runs):
        if not runs[i][0]:
            i += 1
            continue
        # Collect consecutive bolds separated only by whitespace
        start = i
        end = i
        while end + 1 < len(runs):
            if runs[end + 1][0]:
                end += 1
            elif runs[end + 1][0] is False and runs[end + 1][1].strip() == "":
                # Whitespace-only run between bolds → still part of the cluster
                end += 1
            else:
                break
        # Filter: only count actual bolds in [start..end]
        bold_indices = [k for k in range(start, end + 1) if runs[k][0]]
        if len(bold_indices) >= 3:
            joined = " ".join(runs[k][1].strip() for k in bold_indices).lower()
            joined_clean = re.sub(r"\s+", " ", joined).strip()
            in_dict = joined_clean in dict_lookup
            findings.append({
                "kind": "B",
                "file": str(file_path),
                "indices": bold_indices,
                "phrases": [runs[k][1] for k in bold_indices],
                "joined": joined_clean,
                "in_dict": in_dict,
            })
        i = end + 1
    return findings


def detect_pattern_d(runs, dict_lookup, file_path):
    """Split-bold with stopword gaps (Pattern D).

    Looks for pairs (or triples) of bolds separated by stopwords. Joins the
    inner text with the stopwords preserved. If joined ∈ dict → flag.
    """
    findings = []
    n = len(runs)
    i = 0
    while i < n:
        if not runs[i][0]:
            i += 1
            continue
        # Look ahead up to 5 bolds
        for span in (2, 3, 4, 5):
            if i + (span - 1) * 2 >= n:
                break
            # Build list of (bold_text, gap_text) pairs
            pieces = []
            ok = True
            last_idx = i
            for step in range(span):
                target_idx = i + step * 2
                if target_idx >= n or not runs[target_idx][0]:
                    ok = False
                    break
                pieces.append(runs[target_idx][1].strip())
                last_idx = target_idx
                if step < span - 1:
                    gap_idx = target_idx + 1
                    if gap_idx >= n or runs[gap_idx][0]:
                        ok = False
                        break
                    gap_text = runs[gap_idx][1].strip()
                    if not gap_text or not all(w in STOPWORDS for w in gap_text.split()):
                        ok = False
                        break
                    # also require the gap to fit between last_idx and last_idx+1
            if not ok:
                continue
            joined = " ".join(pieces).lower()
            joined_clean = re.sub(r"\s+", " ", joined).strip()
            if joined_clean in GENERIC_CHUNKS:
                continue
            if joined_clean in dict_lookup and joined_clean not in {
                runs[i][1].lower().strip()
            }:
                # only flag if joined is a meaningful extension
                if len(pieces) > 1 and joined_clean != runs[i][1].lower().strip():
                    findings.append({
                        "kind": "D",
                        "file": str(file_path),
                        "start_idx": i,
                        "end_idx": last_idx,
                        "pieces": pieces,
                        "joined": joined_clean,
                        "in_dict": True,
                    })
        i += 1
    return findings


def detect_pattern_c(runs, body, dict_lookup, file_path, week_num):
    """Valid-in-dict-not-bolded (Pattern C).

    Walks plain text runs; finds n-grams (2-6 words) that match a dict
    entry. Skips if the n-gram is already inside a bold.
    """
    findings = []

    # Build list of (start, end) character positions in `body` (with **
    # markers) that are inside a **...** segment.
    bold_char_spans = []
    for is_bold, txt, raw in runs:
        if is_bold:
            idx = body.find(raw)
            if idx == -1:
                continue
            inner_start = idx + 2
            inner_end = idx + 2 + len(txt)
            bold_char_spans.append((inner_start, inner_end))

    def inside_bold(start, end):
        for s, e in bold_char_spans:
            if start >= s and end <= e:
                return True
        return False

    # Build the lookup index by length
    candidates_by_len = defaultdict(list)
    for phrase in dict_lookup:
        wc = len(phrase.split())
        if 2 <= wc <= 6 and phrase not in GENERIC_CHUNKS:
            candidates_by_len[wc].append(phrase)

    # Pre-compile patterns per length (longest-first to avoid sub-match)
    patterns = {}
    for L, phrases in candidates_by_len.items():
        phrases_sorted = sorted(set(phrases), key=lambda s: (-len(s), s))
        patterns[L] = re.compile(
            r"\b(" + "|".join(re.escape(p) for p in phrases_sorted) + r")\b",
            re.IGNORECASE,
        )

    used_ranges = []  # ranges in body already flagged for bolding in this pass

    for L in sorted(patterns.keys(), reverse=True):
        for m in patterns[L].finditer(body):
            start, end = m.start(), m.end()
            if inside_bold(start, end):
                continue
            if any(not (end <= s or start >= e) for s, e in used_ranges):
                continue
            phrase = m.group(1).lower().strip()
            findings.append({
                "kind": "C",
                "file": str(file_path),
                "phrase": phrase,
                "position": (start, end),
                "preview": body[max(0, start - 15):end + 15],
            })
            used_ranges.append((start, end))
    return findings


def detect_pattern_a(all_bolds_per_file, dict_lookup):
    """Inconsistent bolding (Pattern A) across files.

    Input: dict {(mode, week, station): list of bold phrases in that file}.
    Output: list of {chunk_phrase: [variants], files: [(file, variant)]}.

    A "variant" is the bolded length-class: if all variants share the same
    word-set (just optional articles), we report it; else skip.
    """
    # Build map: canonical_phrase → list of (file, bolded_text)
    canonical_to_files = defaultdict(list)
    for (mode, week, station), bolds in all_bolds_per_file.items():
        for bold in bolds:
            canonical_to_files[bold.lower().strip()].append(
                (f"{mode}/week_{week:02d}/{station}.js", bold.strip())
            )
    # Group: a "concept" is the longest phrase; shorter variants are
    # sub-phrases that should be unified under the longest.
    canonicals = sorted(canonical_to_files.keys(), key=lambda s: (-len(s), s))
    findings = []
    for canonical in canonicals:
        if " " not in canonical:
            continue
        if canonical in GENERIC_CHUNKS:
            continue
        # Find sub-variants (other keys that are substring of canonical at
        # word boundary, OR canonical is substring of them).
        related = []
        for other in canonicals:
            if other == canonical:
                continue
            if " " not in other:
                continue
            # Word-boundary substring check
            if re.search(r"\b" + re.escape(other) + r"\b", canonical) or \
               re.search(r"\b" + re.escape(canonical) + r"\b", other):
                related.append(other)
        if not related:
            continue
        # All variants:
        variants = [canonical] + related
        # Group by length-class (number of words)
        by_length = defaultdict(list)
        for v in variants:
            wc = len(v.split())
            for f, bolded in canonical_to_files[v]:
                by_length[wc].append((f, bolded))
        if len(by_length) > 1:
            # Report
            files_list = []
            for v in variants:
                for f, bolded in canonical_to_files[v]:
                    files_list.append((f, bolded))
            findings.append({
                "kind": "A",
                "canonical_longest": max(variants, key=len),
                "variants": list(set(variants)),
                "files": files_list,
            })
    return findings


# ---------------------------------------------------------------------------
# Auto-fix helpers
# ---------------------------------------------------------------------------

def apply_fix_b(run_indices, runs, fix_kind):
    """Pattern B fix: merge or unbold the run.

    fix_kind = "merge" or "unbold".
    Returns: (new_runs, changed_bool)
    """
    if fix_kind == "merge":
        # Merge all bold inner texts with single spaces; keep whitespace
        # between them as plain run separator.
        merged_inner = " ".join(runs[i][1].strip() for i in run_indices)
        new_bold = (True, merged_inner, f"**{merged_inner}**")
        # Replace [run_indices[0]..run_indices[-1]] with new_bold, dropping
        # any whitespace-only runs in between.
        first = run_indices[0]
        last = run_indices[-1]
        new_runs = runs[:first] + [new_bold] + runs[last + 1:]
        return new_runs, True
    if fix_kind == "unbold":
        # Convert each bold to plain; keep surrounding whitespace runs.
        new_runs = list(runs)
        for i in run_indices:
            is_bold, txt, raw = new_runs[i]
            if is_bold:
                new_runs[i] = (False, txt, txt)
        return new_runs, True
    return runs, False


def apply_fix_d(start_idx, end_idx, runs):
    """Pattern D fix: merge bolds+stopword gaps into one bold."""
    pieces = []
    for k in range(start_idx, end_idx + 1):
        if runs[k][0]:
            pieces.append(runs[k][1].strip())
        else:
            gap = runs[k][1].strip()
            if gap:
                pieces.append(gap)
    merged = " ".join(pieces)
    new_bold = (True, merged, f"**{merged}**")
    new_runs = runs[:start_idx] + [new_bold] + runs[end_idx + 1:]
    return new_runs, True


def apply_fix_c(findings_c, body):
    """Pattern C fix: bold the matched phrases (longest-first, no overlap)."""
    # Sort by length desc, then position asc
    sorted_findings = sorted(findings_c, key=lambda f: (-len(f["phrase"]), f["position"][0]))
    used = []  # list of (start, end) already bolded
    new_body = body
    for f in sorted_findings:
        start, end = f["position"]
        # Check overlap
        overlap = any(not (end <= s or start >= e) for s, e in used)
        if overlap:
            continue
        # Apply bolding
        new_body = new_body[:start] + f"**{new_body[start:end]}**" + new_body[end:]
        # Update used ranges: account for added `**` chars
        added = 4
        new_used = []
        for s, e in used:
            if s >= end:
                new_used.append((s + added, e + added))
            else:
                new_used.append((s, e))
        new_used.append((start, end + added))
        used = new_used
    return new_body


def reconstruct_source(source, body_old, body_new, content_span):
    """Replace body_old with body_new in source at content_span."""
    s_start, s_end = content_span
    return source[:s_start] + body_new + source[s_end:]


# ---------------------------------------------------------------------------
# Main audit pipeline
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true",
                        help="Actually edit source files (default: dry-run)")
    parser.add_argument("--week", type=int, default=None,
                        help="Audit only week N (1-35)")
    parser.add_argument("--mode", choices=["adv", "easy", "both"], default="both")
    args = parser.parse_args()

    print(f"[audit-bold] loading dictionary…")
    dict_lookup = load_dictionary()
    print(f"[audit-bold] dictionary size: {len(dict_lookup)} entries")

    weeks = [args.week] if args.week else list(range(1, 36))
    modes = (["adv", "easy"] if args.mode == "both" else [args.mode])

    # Per-file findings
    file_findings = []  # list of {file, mode, week, station, B, C, D}
    all_bolds_per_file = {}  # for Pattern A

    for mode in modes:
        for w in weeks:
            for station in ("read", "explore"):
                fp = WEEKS_DIRS[mode] / f"week_{w:02d}" / f"{station}.js"
                if not fp.exists():
                    continue
                source = fp.read_text()
                body, quote, span = extract_content_en(source)
                if body is None:
                    continue
                runs = tokenize_runs(body)
                bolds_here = [r[1] for r in runs if r[0]]
                all_bolds_per_file[(mode, w, station)] = bolds_here

                Bs = detect_pattern_b(runs, dict_lookup, fp)
                Ds = detect_pattern_d(runs, dict_lookup, fp)
                Cs = detect_pattern_c(runs, body, dict_lookup, fp, w)
                file_findings.append({
                    "file": str(fp),
                    "mode": mode,
                    "week": w,
                    "station": station,
                    "B": Bs,
                    "C": Cs,
                    "D": Ds,
                })

    # Pattern A
    As = detect_pattern_a(all_bolds_per_file, dict_lookup)

    # ---- Stats ----
    total_B = sum(len(f["B"]) for f in file_findings)
    total_C = sum(len(f["C"]) for f in file_findings)
    total_D = sum(len(f["D"]) for f in file_findings)
    total_A = len(As)
    print(f"\n[audit-bold] === SUMMARY ===")
    print(f"  Pattern A (inconsistent bolding):     {total_A}")
    print(f"  Pattern B (3+ adjacent bolds):        {total_B}")
    print(f"  Pattern C (valid-in-dict-not-bolded): {total_C}")
    print(f"  Pattern D (split-bold w/ stopword):   {total_D}")

    # ---- Apply fixes (or dry-run) ----
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    fixes_applied = []
    if args.apply:
        for ff in file_findings:
            fp = Path(ff["file"])
            source = fp.read_text()
            body, quote, span = extract_content_en(source)
            if body is None:
                continue
            runs = tokenize_runs(body)
            new_runs = list(runs)
            file_changes = []

            # Pattern B: process from end to start to preserve indices
            for finding in sorted(ff["B"], key=lambda x: -x["indices"][0]):
                idxs = finding["indices"]
                # re-validate indices exist
                if any(not new_runs[i][0] for i in idxs):
                    continue
                fix_kind = "merge" if finding["in_dict"] else "unbold"
                new_runs, changed = apply_fix_b(idxs, new_runs, fix_kind)
                if changed:
                    file_changes.append({
                        "kind": "B",
                        "fix": fix_kind,
                        "phrases": finding["phrases"],
                        "joined": finding["joined"],
                        "in_dict": finding["in_dict"],
                    })

            # Pattern D: process from end to start
            for finding in sorted(ff["D"], key=lambda x: -x["start_idx"]):
                si, ei = finding["start_idx"], finding["end_idx"]
                if si >= len(new_runs) or ei >= len(new_runs):
                    continue
                new_runs, changed = apply_fix_d(si, ei, new_runs)
                if changed:
                    file_changes.append({
                        "kind": "D",
                        "fix": "merge",
                        "pieces": finding["pieces"],
                        "joined": finding["joined"],
                    })

            if file_changes:
                new_body = "".join(r[2] for r in new_runs)
                if new_body != body:
                    new_source = reconstruct_source(source, body, new_body, span)
                    fp.write_text(new_source)
                    fixes_applied.append({
                        "file": str(fp),
                        "changes": file_changes,
                    })

        # Pattern C: applied per-file
        for ff in file_findings:
            if not ff["C"]:
                continue
            fp = Path(ff["file"])
            source = fp.read_text()
            body, quote, span = extract_content_en(source)
            if body is None:
                continue
            new_body = apply_fix_c(ff["C"], body)
            if new_body != body:
                new_source = reconstruct_source(source, body, new_body, span)
                fp.write_text(new_source)
                # Append to existing entry or new entry
                existing = next((x for x in fixes_applied if x["file"] == str(fp)), None)
                if existing:
                    existing["changes"].append({
                        "kind": "C",
                        "fix": "bold",
                        "phrases": [f["phrase"] for f in ff["C"]],
                    })
                else:
                    fixes_applied.append({
                        "file": str(fp),
                        "changes": [{
                            "kind": "C",
                            "fix": "bold",
                            "phrases": [f["phrase"] for f in ff["C"]],
                        }],
                    })

    # ---- Write reports ----
    out_json = OUT_DIR / "bold_consistency_audit.json"
    out_md = OUT_DIR / "bold_consistency_audit.md"
    with out_json.open("w") as f:
        json.dump({
            "summary": {
                "A": total_A,
                "B": total_B,
                "C": total_C,
                "D": total_D,
                "files_with_issues": sum(
                    1 for ff in file_findings if ff["B"] or ff["C"] or ff["D"]
                ),
            },
            "pattern_A": As,
            "files": file_findings,
        }, f, indent=2, ensure_ascii=False)

    with out_md.open("w") as f:
        f.write("# Bold Consistency Audit — W1-W35\n\n")
        f.write(f"**Total**: A={total_A}  B={total_B}  C={total_C}  D={total_D}\n\n")
        if As:
            f.write("## Pattern A — Inconsistent bolding across files\n\n")
            for a in As[:50]:
                f.write(f"### `{a['canonical_longest']}`\n")
                f.write("Variants: " + ", ".join(f"`{v}`" for v in a["variants"]) + "\n\n")
                f.write("| File | Bolded as |\n|------|-----------|\n")
                for fil, bolded in a["files"][:20]:
                    f.write(f"| `{fil}` | `{bolded}` |\n")
                f.write("\n")
        if total_B or total_C or total_D:
            f.write("## Patterns B/C/D — Per-file issues\n\n")
            for ff in file_findings:
                if not (ff["B"] or ff["C"] or ff["D"]):
                    continue
                f.write(f"### `{ff['file']}`\n\n")
                for b in ff["B"]:
                    fix = "merge" if b["in_dict"] else "unbold"
                    f.write(f"- **[B/{fix}]** {' '.join(f'`{p}`' for p in b['phrases'])} "
                            f"→ joined: `{b['joined']}` (in_dict={b['in_dict']})\n")
                for d in ff["D"]:
                    f.write(f"- **[D/merge]** {' + '.join(f'`{p}`' for p in d['pieces'])} "
                            f"→ `{d['joined']}`\n")
                for c in ff["C"]:
                    f.write(f"- **[C/bold]** `{c['phrase']}` at {c['position']} "
                            f"({c['preview']!r})\n")
                f.write("\n")
    print(f"[audit-bold] reports written: {out_json}, {out_md}")
    if args.apply:
        print(f"[audit-bold] {len(fixes_applied)} file(s) modified")
        out_diff = OUT_DIR / "bold_consistency_fixes.json"
        with out_diff.open("w") as f:
            json.dump(fixes_applied, f, indent=2, ensure_ascii=False)
        print(f"[audit-bold] fixes logged: {out_diff}")
    else:
        print(f"[audit-bold] dry-run only. Re-run with --apply to edit files.")


if __name__ == "__main__":
    main()
