#!/usr/bin/env python3
"""
sync_production_docs.py
=======================
Auto-sync Production_FINAL/ documentation after production process updates.

Reads ground truth from:
  - tools/code_quality_gate.sh      (current CHECK count)
  - WEEK_PRODUCTION_CHECKLIST_V2.md (latest BUG catalog)

Then scans all active .md files in:
  Production_FINAL/1. FINAL MASS PRODUCTION/
  (skips any folder starting with _ARCHIVE)

Actions performed:
  1. Replace stale check counts (any N != current) in "N checks", "ALL N PASSED", etc.
  2. Report any BUG-N entries present in checklist but missing from LESSONS_LEARNED.md

Usage:
  python3 tools/sync_production_docs.py            # apply changes
  python3 tools/sync_production_docs.py --dry-run  # preview only (no writes)
"""

import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GATE_SCRIPT  = os.path.join(ROOT, "tools", "code_quality_gate.sh")
CHECKLIST    = os.path.join(ROOT, "WEEK_PRODUCTION_CHECKLIST_V2.md")
DOCS_ROOT    = os.path.join(ROOT, "Production_FINAL", "1. FINAL MASS PRODUCTION")
LESSONS_FILE = os.path.join(DOCS_ROOT, "6_LESSONS_LEARNED", "PRODUCTION_LESSONS_LEARNED.md")
SKIP_DIRS    = ["_ARCHIVE"]

DRY_RUN = "--dry-run" in sys.argv


# ─── 1. GROUND TRUTH EXTRACTION ──────────────────────────────────────────────

def get_check_count():
    """Count lines matching '^# CHECK N:' in the gate script."""
    if not os.path.exists(GATE_SCRIPT):
        print(f"[ERROR] Gate script not found: {GATE_SCRIPT}")
        sys.exit(1)
    with open(GATE_SCRIPT, encoding="utf-8") as f:
        count = sum(1 for line in f if re.match(r"^# CHECK \d+:", line))
    if count == 0:
        print("[ERROR] No '# CHECK N:' lines found in gate script — check format.")
        sys.exit(1)
    return count


def get_bug_ids_from_checklist():
    """Return sorted list of unique BUG-N IDs defined in the checklist."""
    if not os.path.exists(CHECKLIST):
        print(f"[WARN] Checklist not found: {CHECKLIST}")
        return []
    with open(CHECKLIST, encoding="utf-8") as f:
        raw = f.read()
    ids = sorted(set(int(n) for n in re.findall(r"\bBUG-(\d+)\b", raw)))
    return ids


# ─── 2. CHECK-COUNT REPLACEMENT ──────────────────────────────────────────────

def apply_check_count_fixes(content, current_count):
    """
    Replace stale check counts in documentation text.
    Patterns handled:
      - "31 checks" / "34 checks"  → "38 checks"
      - "ALL 31 PASSED"             → "ALL 38 PASSED"
      - "All 31 checks passed"      → "All 38 checks passed"
      - "ALL 31 CHECKS PASSED"      → "ALL 38 CHECKS PASSED"
      - "(31 checks)"               → "(38 checks)"
    Any integer N ≠ current_count is replaced when found in these patterns.
    """
    c = str(current_count)
    orig = content

    def replace_if_stale(m, replacement):
        num = m.group(1)
        return replacement.format(c=c, num=num) if num != c else m.group(0)

    # "N checks" / "N check"
    content = re.sub(
        r"\b(\d{1,3})((?:\s+checks?)\b)",
        lambda m: (c + m.group(2)) if m.group(1) != c else m.group(0),
        content, flags=re.IGNORECASE
    )

    # "ALL N PASSED" or "ALL N CHECKS PASSED" or "ALL N CHECK PASSED"
    content = re.sub(
        r"\bALL\s+(\d{1,3})\s+(CHECKS?\s+)?PASSED\b",
        lambda m: f"ALL {c} {m.group(2) or ''}PASSED" if m.group(1) != c else m.group(0),
        content
    )

    # "(N checks)" parenthesized
    content = re.sub(
        r"\((\d{1,3})((?:\s+checks?)\))",
        lambda m: f"({c}{m.group(2)}" if m.group(1) != c else m.group(0),
        content, flags=re.IGNORECASE
    )

    return content, content != orig


# ─── 3. LESSONS SYNC (REPORT ONLY) ───────────────────────────────────────────

def check_lessons_file(bug_ids_in_checklist):
    """
    Compare BUG-N ids in checklist vs PRODUCTION_LESSONS_LEARNED.md.
    Returns list of missing BUG ids.
    """
    if not os.path.exists(LESSONS_FILE):
        print(f"[WARN] Lessons file not found: {LESSONS_FILE}")
        return bug_ids_in_checklist

    with open(LESSONS_FILE, encoding="utf-8") as f:
        lessons_raw = f.read()

    lessons_ids = set(int(n) for n in re.findall(r"\bBUG-(\d+)\b", lessons_raw))
    missing = sorted(b for b in bug_ids_in_checklist if b not in lessons_ids)
    return missing


# ─── 4. FILE WALKER ──────────────────────────────────────────────────────────

def collect_md_files(docs_root, skip_dirs):
    """Walk docs_root and return all .md file paths not under a skip_dirs folder."""
    result = []
    for dirpath, dirnames, filenames in os.walk(docs_root):
        # Prune skip directories in-place
        dirnames[:] = [d for d in dirnames if not any(d.startswith(s) for s in skip_dirs)]
        for fname in filenames:
            if fname.lower().endswith(".md"):
                result.append(os.path.join(dirpath, fname))
    return sorted(result)


# ─── 5. MAIN ─────────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  sync_production_docs.py")
    print(f"  Mode: {'DRY RUN (no writes)' if DRY_RUN else 'LIVE'}")
    print("=" * 60)

    # Ground truth
    current_count = get_check_count()
    bug_ids = get_bug_ids_from_checklist()
    print(f"\n[GT] Current check count  : {current_count}")
    print(f"[GT] BUG IDs in checklist : {['BUG-' + str(b) for b in bug_ids]}\n")

    if not os.path.isdir(DOCS_ROOT):
        print(f"[ERROR] DOCS_ROOT not found: {DOCS_ROOT}")
        sys.exit(1)

    md_files = collect_md_files(DOCS_ROOT, SKIP_DIRS)
    print(f"[SCAN] Found {len(md_files)} .md files under:\n       {DOCS_ROOT}\n")

    updated_files = []
    unchanged_files = []

    for fpath in md_files:
        rel = os.path.relpath(fpath, ROOT)
        try:
            with open(fpath, encoding="utf-8") as f:
                original = f.read()
        except Exception as e:
            print(f"  [SKIP] {rel} — read error: {e}")
            continue

        fixed, changed = apply_check_count_fixes(original, current_count)

        if changed:
            updated_files.append(rel)
            print(f"  [UPDATE] {rel}")
            if not DRY_RUN:
                with open(fpath, "w", encoding="utf-8") as f:
                    f.write(fixed)
        else:
            unchanged_files.append(rel)

    # BUG check on lessons file
    missing_bugs = check_lessons_file(bug_ids)

    # ─── REPORT ───────────────────────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("  SUMMARY")
    print("=" * 60)
    print(f"\n  Current check count : {current_count}")
    print(f"  Files scanned       : {len(md_files)}")
    print(f"  Files {'to update' if DRY_RUN else 'updated'}       : {len(updated_files)}")
    print(f"  Files already OK    : {len(unchanged_files)}")

    if updated_files:
        print("\n  Files changed:")
        for f in updated_files:
            print(f"    ✅ {f}")

    if missing_bugs:
        lessons_rel = os.path.relpath(LESSONS_FILE, ROOT)
        print(f"\n  ⚠️  MANUAL ACTION REQUIRED — {lessons_rel}")
        print(f"     The following BUG entries from the checklist are")
        print(f"     NOT yet in PRODUCTION_LESSONS_LEARNED.md:")
        for b in missing_bugs:
            print(f"       → BUG-{b}")
        print("     Copy the relevant BUG entries from")
        print("     WEEK_PRODUCTION_CHECKLIST_V2.md into the lessons file.")
    else:
        print("\n  ✅ PRODUCTION_LESSONS_LEARNED.md is up to date.")

    if DRY_RUN:
        print("\n  [DRY RUN] No files were written.\n")
    else:
        print("\n  Done.\n")


if __name__ == "__main__":
    main()
