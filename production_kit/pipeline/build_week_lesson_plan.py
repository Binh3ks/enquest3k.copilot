#!/usr/bin/env python3
"""
pipeline/build_week_lesson_plan.py
════════════════════════════════════════════════════════════════════════════════
Unified entry-point for building lesson plans across all week ranges.

Pipeline selection (automatic):
  W01-53  →  build_from_docx.py      (DOCX reference exists)
  W54+    →  generate_ai_week.py      (AI generation, no DOCX)

Full flow per week:
  1. Build JSON  (build_from_docx.py  or  generate_ai_week.py)
  2. Generate DOCX  (gen_lp_docx.py)
  3. Validate        (validate_lesson_plan.py)
  4. Print summary

Usage:
  python3 pipeline/build_week_lesson_plan.py 28          # single week
  python3 pipeline/build_week_lesson_plan.py 28 29 30   # multiple weeks
  python3 pipeline/build_week_lesson_plan.py 1-53       # range
  python3 pipeline/build_week_lesson_plan.py --docx-only 28   # regenerate DOCX from existing JSON only
  python3 pipeline/build_week_lesson_plan.py --docx-only 28 29  # multiple, DOCX only
  python3 pipeline/build_week_lesson_plan.py --skip-docx 28   # build + validate, skip DOCX
  python3 pipeline/build_week_lesson_plan.py --help     # show help
"""

import sys
import subprocess
import argparse
from pathlib import Path
from typing import List, Tuple

# ── Colour constants ────────────────────────────────────────────────────────────
C_RESET  = "\033[0m"
C_GREEN  = "\033[92m"
C_RED    = "\033[91m"
C_YELLOW = "\033[93m"
C_CYAN   = "\033[96m"
C_BOLD   = "\033[1m"

PIPELINE_CUTOVER = 53   # W01-53 → DOCX pipeline; W54+ → AI pipeline


def colour(text: str, colour_code: str) -> str:
    return f"{colour_code}{text}{C_RESET}"


def eprint(text: str, colour_code: str = C_RESET) -> None:
    print(colour(text, colour_code), file=sys.stderr)


def run_command(cmd: List[str], cwd: Path = None) -> Tuple[int, str, str]:
    """Run a command, return (returncode, stdout, stderr)."""
    result = subprocess.run(
        cmd,
        cwd=cwd,
        capture_output=True,
        text=True,
    )
    return result.returncode, result.stdout, result.stderr


def parse_weeks(args: List[str]) -> List[int]:
    """Parse week numbers from command-line args.

    Handles:  single ints (28), ranges (1-53), and mixed lists.
    """
    weeks: List[int] = []
    for arg in args:
        arg = arg.strip()
        if "-" in arg:
            parts = arg.split("-")
            if len(parts) != 2:
                raise ValueError(f"Invalid range: '{arg}' (use N-M)")
            start, end = int(parts[0]), int(parts[1])
            if start > end:
                raise ValueError(f"Invalid range: {start}-{end} (start > end)")
            weeks.extend(range(start, end + 1))
        else:
            weeks.append(int(arg))
    return sorted(set(weeks))


def classify_weeks(weeks: List[int]) -> Tuple[List[int], List[int]]:
    """Split weeks into docx_pipeline (W01-53) and ai_pipeline (W54+)."""
    docx_weeks = sorted(w for w in weeks if w <= PIPELINE_CUTOVER)
    ai_weeks   = sorted(w for w in weeks if w > PIPELINE_CUTOVER)
    return docx_weeks, ai_weeks


def build_pipeline_script() -> Path:
    return Path(__file__).parent


def step_header(step_num: int, title: str) -> str:
    divider = "─" * 60
    return f"\n{divider}\n  Step {step_num}: {title}\n{divider}"


def step_success(step_num: int, title: str) -> None:
    print(colour(f"  ✓ Step {step_num} PASSED — {title}", C_GREEN))


def step_failure(step_num: int, title: str, detail: str = "") -> None:
    msg = colour(f"  ✗ Step {step_num} FAILED — {title}", C_RED)
    if detail:
        msg += f"\n  {detail}"
    print(msg, file=sys.stderr)


# ── Pipeline steps ─────────────────────────────────────────────────────────────

def build_json_weeks(
    weeks: List[int],
    pipeline_dir: Path,
    dry_run: bool = False,
) -> List[Tuple[int, bool]]:
    """Call build_from_docx.py for W01-53 weeks."""
    results: List[Tuple[int, bool]] = []
    for w in weeks:
        padded = f"W{w:02d}"
        print(colour(f"\n  Building JSON for {padded} via build_from_docx.py …", C_CYAN))
        cmd = [sys.executable, str(pipeline_dir / "build_from_docx.py"), str(w)]
        if dry_run:
            cmd.append("--dry-run")
        rc, stdout, stderr = run_command(cmd)
        if rc == 0:
            step_success(1, f"JSON built for {padded}")
            results.append((w, True))
        else:
            step_failure(1, f"JSON build for {padded}", stderr.strip()[:300])
            results.append((w, False))
    return results


def build_json_ai_weeks(
    weeks: List[int],
    pipeline_dir: Path,
    dry_run: bool = False,
) -> List[Tuple[int, bool]]:
    """Call generate_ai_week.py for W54+ weeks."""
    results: List[Tuple[int, bool]] = []
    for w in weeks:
        padded = f"W{w:03d}"
        print(colour(f"\n  Building JSON for {padded} via generate_ai_week.py …", C_CYAN))
        cmd = [sys.executable, str(pipeline_dir / "generate_ai_week.py"), str(w)]
        if dry_run:
            cmd.append("--dry-run")
        rc, stdout, stderr = run_command(cmd)
        if rc == 0:
            step_success(1, f"JSON built for {padded}")
            results.append((w, True))
        else:
            step_failure(1, f"JSON build for {padded}", stderr.strip()[:300])
            results.append((w, False))
    return results


def generate_docx_weeks(
    weeks: List[int],
    pipeline_dir: Path,
) -> List[Tuple[int, bool]]:
    """Call gen_lp_docx.py to produce DOCX from JSON."""
    results: List[Tuple[int, bool]] = []
    padded_list = " ".join(f"{w}" for w in weeks)
    print(colour(f"\n  Generating DOCX for weeks {padded_list} via gen_lp_docx.py …", C_CYAN))
    cmd = [sys.executable, str(pipeline_dir / "gen_lp_docx.py")] + [str(w) for w in weeks]
    rc, stdout, stderr = run_command(cmd)
    if rc == 0:
        step_success(2, f"DOCX generated for {padded_list}")
        # Mark all weeks as succeeded
        for w in weeks:
            results.append((w, True))
    else:
        step_failure(2, f"DOCX generation", stderr.strip()[:300])
        for w in weeks:
            results.append((w, False))
    return results


def validate_weeks(
    weeks: List[int],
    pipeline_dir: Path,
) -> List[Tuple[int, bool]]:
    """Call validate_lesson_plan.py to validate JSON."""
    results: List[Tuple[int, bool]] = []
    for w in weeks:
        padded = f"W{w:02d}" if w <= PIPELINE_CUTOVER else f"W{w:03d}"
        print(colour(f"\n  Validating {padded} via validate_lesson_plan.py …", C_CYAN))
        cmd = [sys.executable, str(pipeline_dir / "validate_lesson_plan.py"), str(w)]
        rc, stdout, stderr = run_command(cmd)
        if rc == 0:
            step_success(3, f"Validation passed for {padded}")
            results.append((w, True))
        else:
            step_failure(3, f"Validation failed for {padded}", stderr.strip()[:300])
            results.append((w, False))
    return results


# ── Summary ─────────────────────────────────────────────────────────────────────

def print_summary(
    all_results: List[Tuple[int, bool]],
    docx_only: bool,
    skip_docx: bool,
) -> None:
    print(f"\n{'='*62}")
    print(colour(f"  {C_BOLD}LESSON PLAN BUILD SUMMARY{C_RESET}", C_BOLD))
    print(f"{'='*62}")

    if not all_results:
        print(colour("  No weeks processed.", C_YELLOW))
        return

    succeeded = [w for w, ok in all_results if ok]
    failed    = [w for w, ok in all_results if not ok]

    for w, ok in all_results:
        padded = f"W{w:02d}" if w <= PIPELINE_CUTOVER else f"W{w:03d}"
        pipeline = "DOCX" if w <= PIPELINE_CUTOVER else "AI"
        status = colour("✓ PASS", C_GREEN) if ok else colour("✗ FAIL", C_RED)
        print(f"    {status}  {padded}  ({pipeline}-pipeline)")

    print()
    if succeeded:
        print(colour(f"  Succeeded : {len(succeeded)}/{len(all_results)}", C_GREEN))
    if failed:
        print(colour(f"  Failed    : {len(failed)}/{len(all_results)}", C_RED))
    else:
        print(colour("  All steps passed.", C_GREEN))

    print(f"{'='*62}\n")

    if failed:
        eprint(
            f"Failed weeks: {', '.join(f'W{w:02d}' if w <= PIPELINE_CUTOVER else f'W{w:03d}' for w in failed)}",
            C_RED,
        )


# ── Main ────────────────────────────────────────────────────────────────────────

def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Unified entry-point for building lesson plans (W01–53 via DOCX, W54+ via AI). "
            "Runs: build JSON → generate DOCX → validate."
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "weeks",
        nargs="*",
        metavar="N",
        help=(
            "Week number(s): single (28), multiple (28 29 30), or range (1-53). "
            "Pipeline is auto-selected: W01-53 → DOCX pipeline; W54+ → AI pipeline."
        ),
    )
    parser.add_argument(
        "--docx-only",
        nargs="+",
        type=int,
        metavar="N",
        help=(
            "Skip JSON build step. Regenerate DOCX from existing JSON only. "
            "Then validate. Example: --docx-only 28 29 30"
        ),
    )
    parser.add_argument(
        "--skip-docx",
        nargs="+",
        type=int,
        metavar="N",
        help="Skip DOCX generation. Build JSON + validate only. Example: --skip-docx 54 55",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Parse the DOCX/AI content but do not write any output files.",
    )
    args = parser.parse_args()

    # ── Determine weeks to process ──────────────────────────────────────────
    if args.docx_only is not None:
        # --docx-only takes integers directly
        weeks_to_process = sorted(args.docx_only)
        docx_only_mode = True
        skip_docx_mode = False
    elif args.skip_docx is not None:
        weeks_to_process = sorted(args.skip_docx)
        docx_only_mode = False
        skip_docx_mode = True
    else:
        if not args.weeks:
            eprint("Error: No week numbers provided. Use positional args or --docx-only / --skip-docx.", C_RED)
            parser.print_help()
            return 1
        try:
            weeks_to_process = parse_weeks(args.weeks)
        except ValueError as exc:
            eprint(f"Error: {exc}", C_RED)
            return 1
        docx_only_mode = False
        skip_docx_mode = False

    if not weeks_to_process:
        eprint("Error: No valid weeks to process.", C_RED)
        return 1

    docx_weeks, ai_weeks = classify_weeks(weeks_to_process)

    pipeline_dir = build_pipeline_script()
    root_dir     = pipeline_dir.parent

    print()
    print(colour(f"{C_BOLD}╔══════════════════════════════════════════════════════════╗{C_RESET}", C_BOLD))
    print(colour(f"{C_BOLD}║     EngQuest3K — Lesson Plan Builder                     ║{C_BOLD}", C_BOLD))
    print(colour(f"{C_BOLD}╚══════════════════════════════════════════════════════════╝{C_RESET}", C_BOLD))
    print(f"  Pipeline dir : {pipeline_dir}")
    print(f"  Working dir  : {root_dir}")
    print(f"  Weeks        : {', '.join(str(w) for w in weeks_to_process)}")
    if docx_weeks:
        print(f"  DOCX weeks   : W01-53  → {len(docx_weeks)} week(s)")
    if ai_weeks:
        print(f"  AI weeks     : W54+    → {len(ai_weeks)} week(s)")
    if docx_only_mode:
        print(colour("  Mode         : --docx-only  (skip JSON build)", C_YELLOW))
    elif skip_docx_mode:
        print(colour("  Mode         : --skip-docx  (skip DOCX generation)", C_YELLOW))
    if args.dry_run:
        print(colour("  Mode         : --dry-run", C_YELLOW))

    # ── Step 1: Build JSON ──────────────────────────────────────────────────
    all_results: List[Tuple[int, bool]] = []

    if not docx_only_mode:
        print(step_header(1, "Build JSON from source"))

        if docx_weeks:
            results = build_json_weeks(docx_weeks, pipeline_dir, dry_run=args.dry_run)
            all_results.extend(results)

        if ai_weeks:
            results = build_json_ai_weeks(ai_weeks, pipeline_dir, dry_run=args.dry_run)
            all_results.extend(results)

        # If dry-run we stop here (no files written)
        if args.dry_run:
            print(colour("\n  Dry-run complete — no files written.", C_YELLOW))
            return 0

        # If any JSON build failed, report and stop before DOCX
        failed_json = [w for w, ok in all_results if not ok]
        if failed_json:
            eprint(
                f"\n  JSON build failed for weeks: {', '.join(str(w) for w in failed_json)}",
                C_RED,
            )
            eprint("  Skipping DOCX and validation steps.", C_RED)
            print_summary(all_results, docx_only_mode, skip_docx_mode)
            return 1
    else:
        # --docx-only: mark all weeks as succeeded for the (skipped) JSON step
        for w in weeks_to_process:
            all_results.append((w, True))
        print(step_header(1, "Build JSON from source  [SKIPPED — --docx-only]"))
        print(colour("  ✓ JSON build step skipped (--docx-only mode)", C_YELLOW))

    # ── Step 2: Generate DOCX ───────────────────────────────────────────────
    if not skip_docx_mode:
        print(step_header(2, "Generate DOCX from JSON"))
        docx_results = generate_docx_weeks(weeks_to_process, pipeline_dir)
        # Merge results: keep False failures, ignore False from docx-only placeholder
        merged: List[Tuple[int, bool]] = []
        for (w, existing_ok) in all_results:
            # Find docx result for this week (if any)
            docx_ok = next((ok for ww, ok in docx_results if ww == w), True)
            merged.append((w, existing_ok and docx_ok))
        all_results = merged

        failed_docx = [w for w, ok in all_results if not ok]
        if failed_docx:
            eprint(
                f"\n  DOCX generation failed for weeks: {', '.join(str(w) for w in failed_docx)}",
                C_RED,
            )
    else:
        print(step_header(2, "Generate DOCX from JSON  [SKIPPED — --skip-docx]"))
        print(colour("  ✓ DOCX generation skipped (--skip-docx mode)", C_YELLOW))

    # ── Step 3: Validate ────────────────────────────────────────────────────
    print(step_header(3, "Validate lesson plan JSON"))
    val_results = validate_weeks(weeks_to_process, pipeline_dir)
    # Merge
    merged = []
    for (w, existing_ok) in all_results:
        val_ok = next((ok for ww, ok in val_results if ww == w), True)
        merged.append((w, existing_ok and val_ok))
    all_results = merged

    # ── Summary ─────────────────────────────────────────────────────────────
    print_summary(all_results, docx_only_mode, skip_docx_mode)

    failed_final = [w for w, ok in all_results if not ok]
    return 0 if not failed_final else 1


if __name__ == "__main__":
    sys.exit(main())
