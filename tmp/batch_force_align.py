#!/usr/bin/env python3
"""Batch force_align_transcript.py + merge_fragments.py for all videos."""

import json, subprocess, sys, os, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Get all videoIds from shadowing.js
def get_all_video_ids():
    video_ids = set()
    for week in range(1, 37):
        ws = f"{week:02d}"
        for base in ["src/data/weeks", "src/data/weeks_easy"]:
            f = Path(base) / f"week_{ws}" / "shadowing.js"
            if not f.exists(): continue
            m = re.search(r"videoId:\s*['\"]([^'\"]+)['\"]", f.read_text())
            if m: video_ids.add(m.group(1))
    return sorted(video_ids)

# Check if already aligned (has word-level timestamps)
def has_alignment(vid):
    f = Path("src/data/video_transcripts_by_id/sentences") / f"{vid}.json"
    if not f.exists(): return False
    try:
        data = json.loads(f.read_text())
        return any("words" in s for s in data.get("segments", []))
    except:
        return False

print("=== BATCH FORCE ALIGNMENT + MERGE ===\n")

video_ids = get_all_video_ids()
print(f"Found {len(video_ids)} unique videos\n")

aligned = 0
skipped = 0
errors = 0

for vid in video_ids:
    if has_alignment(vid):
        print(f"  ✅ {vid} — already aligned")
        skipped += 1
        continue

    # Step 1: force_align
    print(f"  🔄 {vid} — aligning... ", end="", flush=True)
    try:
        result = subprocess.run(
            [sys.executable, "tools/force_align_transcript.py", vid],
            capture_output=True, text=True, timeout=120, cwd=str(ROOT)
        )
        if result.returncode != 0:
            print(f"❌ align failed: {result.stderr[:100]}")
            errors += 1
            continue
        # Extract summary
        for line in result.stdout.splitlines():
            if "Segments:" in line:
                print(f"✓ {line.strip()}", end=" ")
                break
    except subprocess.TimeoutExpired:
        print("❌ timeout")
        errors += 1
        continue

    # Step 2: merge fragments
    try:
        result = subprocess.run(
            [sys.executable, "tmp/merge_fragments.py", vid],
            capture_output=True, text=True, timeout=30, cwd=str(ROOT)
        )
        merge_msg = result.stdout.strip().split("\n")[-1] if result.stdout else "no output"
        print(f"→ {merge_msg}")
    except:
        print("→ merge skipped")

    aligned += 1

print(f"\n=== SUMMARY ===")
print(f"  Already aligned: {skipped}")
print(f"  Newly aligned: {aligned}")
print(f"  Errors: {errors}")
print(f"  Total: {len(video_ids)}")
