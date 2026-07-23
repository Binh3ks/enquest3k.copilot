#!/usr/bin/env python3
"""
batch_align_w1_w35.py — Batch Deepgram alignment for W1-W35.

Iterates through all 35 weeks, reads each week's videoId from shadowing.js,
and runs force_align_transcript.py to generate L3 timestamps.

Usage:
    python3 tools/batch_align_w1_w35.py [--weeks 1,2,3] [--dry-run]

Options:
    --weeks    Comma-separated week numbers to process (default: all 35)
    --dry-run  Show what would be processed without actually running
"""

import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WEEKS_DIR = ROOT / "src" / "data" / "weeks"
SENTENCES_DIR = ROOT / "src" / "data" / "video_transcripts_by_id" / "sentences"
SCRIPT = ROOT / "tools" / "force_align_transcript.py"
LOG_FILE = ROOT / "tmp" / "batch_align_log.json"


def get_video_id(week_num: int) -> str | None:
    """Extract videoId from week's shadowing.js."""
    path = WEEKS_DIR / f"week_{week_num:02d}" / "shadowing.js"
    if not path.exists():
        return None
    content = path.read_text()
    match = re.search(r'videoId:\s*["\']([^"\']+)["\']', content)
    return match.group(1) if match else None


def run_alignment(video_id: str, week_num: int) -> dict:
    """Run force_align_transcript.py for a single video."""
    start_time = time.time()
    try:
        result = subprocess.run(
            [sys.executable, str(SCRIPT), video_id],
            capture_output=True,
            text=True,
            timeout=300,  # 5 minute timeout per video
            cwd=str(ROOT),
        )
        elapsed = time.time() - start_time

        if result.returncode == 0:
            # Parse output for stats
            output = result.stdout
            segments_match = re.search(r'Segments:\s*(\d+)', output)
            words_match = re.search(r'Words:\s*(\d+)', output)
            duration_match = re.search(r'Duration:\s*([\d.]+)s', output)

            return {
                "status": "success",
                "week": week_num,
                "video_id": video_id,
                "segments": int(segments_match.group(1)) if segments_match else 0,
                "words": int(words_match.group(1)) if words_match else 0,
                "duration": float(duration_match.group(1)) if duration_match else 0,
                "elapsed": round(elapsed, 1),
            }
        else:
            return {
                "status": "failed",
                "week": week_num,
                "video_id": video_id,
                "error": result.stderr[:200] if result.stderr else "Unknown error",
                "elapsed": round(elapsed, 1),
            }
    except subprocess.TimeoutExpired:
        return {
            "status": "timeout",
            "week": week_num,
            "video_id": video_id,
            "error": "Process timed out after 300s",
            "elapsed": 300,
        }
    except Exception as e:
        return {
            "status": "error",
            "week": week_num,
            "video_id": video_id,
            "error": str(e)[:200],
            "elapsed": round(time.time() - start_time, 1),
        }


def main():
    # Parse arguments
    dry_run = "--dry-run" in sys.argv
    weeks_arg = None
    if "--weeks" in sys.argv:
        idx = sys.argv.index("--weeks")
        if idx + 1 < len(sys.argv):
            weeks_arg = [int(w.strip()) for w in sys.argv[idx + 1].split(",")]

    # Build week list
    if weeks_arg:
        weeks = weeks_arg
    else:
        weeks = list(range(1, 36))

    # Collect video IDs
    plan = []
    for week in weeks:
        vid = get_video_id(week)
        if vid:
            json_path = SENTENCES_DIR / f"{vid}.json"
            already_aligned = False
            if json_path.exists():
                try:
                    data = json.loads(json_path.read_text())
                    alignment = data.get("alignment", {})
                    if alignment.get("engine", "").startswith("deepgram"):
                        already_aligned = True
                except:
                    pass
            plan.append({"week": week, "video_id": vid, "already_aligned": already_aligned})
        else:
            plan.append({"week": week, "video_id": None, "already_aligned": False})

    # Show plan
    to_process = [p for p in plan if p["video_id"] and not p["already_aligned"]]
    skipped = [p for p in plan if p["already_aligned"]]
    missing = [p for p in plan if not p["video_id"]]

    print(f"=== Batch Alignment Plan ===")
    print(f"Total weeks: {len(weeks)}")
    print(f"To process: {len(to_process)}")
    print(f"Already aligned (skip): {len(skipped)}")
    print(f"Missing videoId: {len(missing)}")
    print()

    if to_process:
        print("Videos to process:")
        for p in to_process:
            print(f"  W{p['week']:02d}: {p['video_id']}")
        print()

    if skipped:
        print("Skipping (already aligned):")
        for p in skipped:
            print(f"  W{p['week']:02d}: {p['video_id']}")
        print()

    if missing:
        print("Missing videoId:")
        for p in missing:
            print(f"  W{p['week']:02d}: no videoId in shadowing.js")
        print()

    if dry_run:
        print("[DRY RUN] Exiting without processing.")
        return

    if not to_process:
        print("Nothing to process. All weeks already aligned.")
        return

    # Process
    results = []
    LOG_FILE.parent.mkdir(exist_ok=True)

    for i, p in enumerate(to_process):
        week = p["week"]
        vid = p["video_id"]
        print(f"\n[{i+1}/{len(to_process)}] Processing W{week:02d} ({vid})...")

        result = run_alignment(vid, week)
        results.append(result)

        # Save log after each video
        log_data = {
            "results": results,
            "summary": {
                "total": len(results),
                "success": sum(1 for r in results if r["status"] == "success"),
                "failed": sum(1 for r in results if r["status"] != "success"),
            },
        }
        LOG_FILE.write_text(json.dumps(log_data, indent=2))

        if result["status"] == "success":
            print(f"  ✅ {result['segments']} segments, {result['words']} words, "
                  f"{result['duration']:.1f}s audio ({result['elapsed']:.1f}s wall)")
        else:
            print(f"  ❌ {result['status']}: {result.get('error', 'unknown')[:80]}")

        # Rate limit: 1 second between API calls
        if i < len(to_process) - 1:
            time.sleep(1)

    # Final summary
    success = [r for r in results if r["status"] == "success"]
    failed = [r for r in results if r["status"] != "success"]

    print(f"\n=== Batch Alignment Complete ===")
    print(f"Processed: {len(results)}")
    print(f"Success: {len(success)}")
    print(f"Failed: {len(failed)}")

    if failed:
        print(f"\nFailed videos:")
        for r in failed:
            print(f"  W{r['week']:02d} ({r['video_id']}): {r['status']} - {r.get('error', '')[:60]}")

    print(f"\nLog saved to: {LOG_FILE}")


if __name__ == "__main__":
    main()
