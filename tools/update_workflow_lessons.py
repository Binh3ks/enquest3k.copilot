#!/usr/bin/env python3
"""
Update mass production workflow docs with lessons learned from a given week.

Usage:
  python3 tools/update_workflow_lessons.py 25
  python3 tools/update_workflow_lessons.py 25 --dry-run
  python3 tools/update_workflow_lessons.py 25 --no-commit

Reads lessons from:
  Production_FINAL/1. FINAL MASS PRODUCTION/6_LESSONS_LEARNED/week_NN_lessons.json

Patches:
  1. Production_FINAL/1. FINAL MASS PRODUCTION/1_CORE_WORKFLOW/0. NEW_AGENT_ONBOARDING_PROMPT.md
     - ✅ ALWAYS: section  →  always_rules
     - ❌ NEVER:  section  →  never_rules
     - Date header line   →  updated to today
  2. Production_FINAL/1. FINAL MASS PRODUCTION/1_CORE_WORKFLOW/AGENT_SELF_CHECK_WORKFLOW.md
     - BƯỚC 2 self-check (real.js) → real_js_checks
     - Explore.js self-check block  → explore_checks
     - Singapore Math self-check    → math_checks
     - BƯỚC 8.5 gate check list     → gate_notes
  3. tools/mass_production_final.sh
     - Step 8.3 pre-gate checklist header comment → checklist_notes

JSON format (week_NN_lessons.json):
{
  "week": 25,
  "date": "April 5, 2026",
  "theme": "Animals at the Zoo",
  "always_rules": [
    "- **New always rule** ⚠️ **BUG-W25:** description → consequence"
  ],
  "never_rules": [
    "- Avoid doing X (W25 reason)"
  ],
  "real_js_checks": [
    "- [ ] **new_field present** — explanation ⚠️ **BUG-W25:** consequence"
  ],
  "explore_checks": [
    "- [ ] **New explore rule** ⚠️ **BUG-W25:** consequence"
  ],
  "math_checks": [
    "- [ ] **New math rule** ⚠️ **BUG-W25:** consequence"
  ],
  "gate_notes": [
    "- **CHECK 42 (W25+):** new check explanation — BUG-25"
  ],
  "checklist_notes": [
    "# [W25] new pre-gate checklist item"
  ]
}
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROD = ROOT / "Production_FINAL" / "1. FINAL MASS PRODUCTION"
LESSONS_DIR = PROD / "6_LESSONS_LEARNED"
ONBOARDING = PROD / "1_CORE_WORKFLOW" / "0. NEW_AGENT_ONBOARDING_PROMPT.md"
WORKFLOW   = PROD / "1_CORE_WORKFLOW" / "AGENT_SELF_CHECK_WORKFLOW.md"
MASS_PROD  = ROOT / "tools" / "mass_production_final.sh"

# ── anchor helpers ──────────────────────────────────────────────────────────

def insert_before(text: str, anchor: str, lines: list[str]) -> tuple[str, bool]:
    """Insert lines immediately BEFORE the first occurrence of anchor."""
    if not lines or anchor not in text:
        return text, False
    block = "\n".join(lines) + "\n"
    return text.replace(anchor, block + anchor, 1), True


def insert_after_last_bullet(text: str, section_header: str, lines: list[str], end_marker: str) -> tuple[str, bool]:
    """
    Insert bullet lines at the END of a section that starts with section_header
    and ends with end_marker. Works by finding the last bullet before end_marker.
    """
    if not lines:
        return text, False
    idx_start = text.find(section_header)
    if idx_start == -1:
        return text, False
    idx_end = text.find(end_marker, idx_start)
    if idx_end == -1:
        idx_end = len(text)
    # find last bullet in this section
    section = text[idx_start:idx_end]
    last_bullet_pos = section.rfind("\n- ")
    if last_bullet_pos == -1:
        last_bullet_pos = section.rfind("\n- [ ]")
    if last_bullet_pos == -1:
        return text, False
    # find the end of that last bullet line
    end_of_last = section.find("\n", last_bullet_pos + 1)
    if end_of_last == -1:
        end_of_last = len(section)
    insert_at = idx_start + end_of_last
    block = "\n" + "\n".join(lines)
    return text[:insert_at] + block + text[insert_at:], True


# ── patch functions ──────────────────────────────────────────────────────────

def patch_onboarding(path: Path, week: int, week_date: str,
                     always_rules: list[str], never_rules: list[str],
                     dry_run: bool) -> bool:
    text = path.read_text(encoding="utf-8")
    changed = False

    # 1. Update date header line
    import re
    new_date_line = f'> **Date**: {week_date} (W{week} lessons added)'
    text, ok = re.subn(r'> \*\*Date\*\*:.*', new_date_line, text)
    if ok:
        changed = True

    # 2. Insert ALWAYS rules before the separator "---" that follows the ALWAYS section
    if always_rules:
        text, ok = insert_after_last_bullet(text, "### ✅ ALWAYS:", always_rules, "\n---\n")
        if ok:
            changed = True
        else:
            print(f"  ⚠️  Could not find ALWAYS section anchor in {path.name}")

    # 3. Insert NEVER rules inside NEVER section
    if never_rules:
        text, ok = insert_after_last_bullet(text, "### ❌ NEVER:", never_rules, "\n### ✅ ALWAYS:")
        if ok:
            changed = True
        else:
            print(f"  ⚠️  Could not find NEVER section anchor in {path.name}")

    if not changed:
        print(f"  ℹ️  No changes needed in {path.name}")
        return False

    if not dry_run:
        path.write_text(text, encoding="utf-8")
        print(f"  ✅ Patched {path.name}")
    else:
        print(f"  [DRY-RUN] Would patch {path.name}")
    return changed


def patch_workflow(path: Path, week: int,
                   real_js_checks: list[str],
                   explore_checks: list[str],
                   math_checks: list[str],
                   gate_notes: list[str],
                   dry_run: bool) -> bool:
    text = path.read_text(encoding="utf-8")
    changed = False

    # 1. BƯỚC 2 real_js self-check: insert after last `- [ ]` before explore section
    if real_js_checks:
        # The real.js self-check ends before the explore.js section header
        text, ok = insert_after_last_bullet(
            text, "#### Self-Check Before Proceeding:", real_js_checks,
            "### ✅ BƯỚC 3:"
        )
        if ok:
            changed = True
        else:
            print(f"  ⚠️  Could not patch real_js_checks in {path.name}")

    # 2. Explore self-check: find the explore check_questions block
    if explore_checks:
        anchor = "- [ ] **Each `check_questions` item MUST use `question_en:` field`"
        # try to insert after the last explore bullet before math section
        text, ok = insert_after_last_bullet(
            text,
            "#### Explore.js self-check:",
            explore_checks,
            "#### Singapore Math self-check:"
        )
        if ok:
            changed = True
        else:
            # fallback: insert before the math section header
            math_header = "#### Singapore Math self-check:"
            if math_header in text:
                text, ok = insert_before(text, math_header, explore_checks)
                if ok:
                    changed = True

    # 3. Singapore Math self-check
    if math_checks:
        text, ok = insert_after_last_bullet(
            text,
            "#### Singapore Math self-check:",
            math_checks,
            "#### Self-Check:\n- [ ] `bash tools/code_quality_gate.sh"
        )
        if ok:
            changed = True
        else:
            print(f"  ⚠️  Could not patch math_checks in {path.name}")

    # 4. BƯỚC 8.5 gate notes: insert after last CHECK bullet before Self-Check
    if gate_notes:
        text, ok = insert_after_last_bullet(
            text,
            "#### What the 41 checks cover:",
            gate_notes,
            "\n#### Self-Check:\n- [ ] `bash tools/code_quality_gate.sh"
        )
        if ok:
            changed = True
        else:
            print(f"  ⚠️  Could not patch gate_notes in {path.name}")

    if not changed:
        print(f"  ℹ️  No changes needed in {path.name}")
        return False

    if not dry_run:
        path.write_text(text, encoding="utf-8")
        print(f"  ✅ Patched {path.name}")
    else:
        print(f"  [DRY-RUN] Would patch {path.name}")
    return changed


def patch_mass_prod(path: Path, week: int, checklist_notes: list[str], dry_run: bool) -> bool:
    if not checklist_notes:
        return False
    text = path.read_text(encoding="utf-8")
    # Insert before the closing echo of the Step 8.3 checklist
    anchor = 'echo -e "${YELLOW}---${NC}"'
    block = "\n".join(checklist_notes) + "\n"
    if anchor not in text:
        print(f"  ⚠️  Could not find Step 8.3 anchor in {path.name}")
        return False
    text = text.replace(anchor, block + anchor, 1)
    if not dry_run:
        path.write_text(text, encoding="utf-8")
        print(f"  ✅ Patched {path.name}")
    else:
        print(f"  [DRY-RUN] Would patch {path.name}")
    return True


# ── git helpers ──────────────────────────────────────────────────────────────

def git_commit_push(week: int, theme: str) -> None:
    files = [str(ONBOARDING), str(WORKFLOW), str(MASS_PROD)]
    subprocess.run(["git", "add"] + files, cwd=ROOT, check=True)
    msg = (
        f"docs(workflow): Add W{week} lessons learned — {theme}\n\n"
        f"Updated by tools/update_workflow_lessons.py {week}\n"
        f"- 0. NEW_AGENT_ONBOARDING_PROMPT.md: ALWAYS/NEVER rules\n"
        f"- AGENT_SELF_CHECK_WORKFLOW.md: BƯỚC 2 + 8.5 checks\n"
        f"- tools/mass_production_final.sh: Step 8.3 checklist\n"
    )
    subprocess.run(["git", "commit", "-m", msg], cwd=ROOT, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=ROOT, check=True)
    print(f"\n  ✅ Committed and pushed W{week} lessons")


# ── main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    ap = argparse.ArgumentParser(description="Patch workflow docs with week lessons")
    ap.add_argument("week", type=int, help="Week number, e.g. 25")
    ap.add_argument("--dry-run", action="store_true", help="Show what would change, no writes")
    ap.add_argument("--no-commit", action="store_true", help="Patch files but don't git commit/push")
    args = ap.parse_args()

    week = args.week
    week_pad = f"{week:02d}"
    lessons_file = LESSONS_DIR / f"week_{week_pad}_lessons.json"

    if not lessons_file.exists():
        print(f"❌ Lessons file not found: {lessons_file}")
        print(f"\nCreate it with this template:")
        print(json.dumps({
            "week": week,
            "date": date.today().strftime("%B %d, %Y"),
            "theme": "THEME HERE",
            "always_rules": [],
            "never_rules": [],
            "real_js_checks": [],
            "explore_checks": [],
            "math_checks": [],
            "gate_notes": [],
            "checklist_notes": []
        }, indent=2, ensure_ascii=False))
        sys.exit(1)

    with open(lessons_file, encoding="utf-8") as f:
        data = json.load(f)

    week_date = data.get("date", date.today().strftime("%B %d, %Y"))
    theme = data.get("theme", f"Week {week}")

    print(f"\n🔧 Patching workflow docs with W{week} ({theme}) lessons...")
    print(f"   Source: {lessons_file.relative_to(ROOT)}")
    print()

    any_changed = False

    any_changed |= patch_onboarding(
        ONBOARDING, week, week_date,
        data.get("always_rules", []),
        data.get("never_rules", []),
        args.dry_run
    )

    any_changed |= patch_workflow(
        WORKFLOW, week,
        data.get("real_js_checks", []),
        data.get("explore_checks", []),
        data.get("math_checks", []),
        data.get("gate_notes", []),
        args.dry_run
    )

    any_changed |= patch_mass_prod(
        MASS_PROD, week,
        data.get("checklist_notes", []),
        args.dry_run
    )

    if not any_changed:
        print("\nℹ️  Nothing changed.")
        return

    if args.dry_run:
        print("\n[DRY-RUN] No files written.")
        return

    if not args.no_commit:
        git_commit_push(week, theme)
    else:
        print(f"\n⚠️  --no-commit: files patched but NOT committed/pushed")


if __name__ == "__main__":
    main()
