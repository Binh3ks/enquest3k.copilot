#!/usr/bin/env python3
"""Audit video content vs week syllabus topics."""

import json, re
from pathlib import Path

# Parse week titles from metadata.js using regex
week_titles = {}
meta = Path("src/data/weeks/metadata.js").read_text()
for m in re.finditer(r"(\d+):\s*\{\s*title_en:\s*\"([^\"]+)\"", meta):
    week_titles[int(m.group(1))] = m.group(2)

# Get videoIds from shadowing.js (ADV preferred)
video_ids = {}
for week in range(1, 37):
    ws_str = f"W{week:02d}"
    for base in ["src/data/weeks"]:
        f = Path(base) / f"week_{week:02d}" / "shadowing.js"
        if not f.exists():
            continue
        m = re.search(r"videoId:\s*['\"]([^'\"]+)['\"]", f.read_text())
        if m:
            video_ids[ws_str] = m.group(1)
            break

# Get first few sentences from each transcript
print("| Week | Week Topic | VideoId | First 2-3 sentences (topic hint) |")
print("|------|-----------|---------|----------------------------------|")

mismatches = []
for ws in range(1, 37):
    ws_str = f"W{ws:02d}"
    vid = video_ids.get(ws_str, "?")
    topic = week_titles.get(ws, "?")

    f = Path("src/data/video_transcripts_by_id/sentences") / f"{vid}.json"
    if f.exists():
        data = json.loads(f.read_text())
        segs = data.get("segments", [])
        # Skip first segment (often intro music/channel name)
        content_segs = [s for s in segs if not s["text"].startswith("[") and "english" not in s["text"].lower() and len(s["text"]) > 3]
        first3 = "; ".join(s["text"][:60] for s in content_segs[:3])
    else:
        first3 = "NO TRANSCRIPT"

    print(f"| {ws_str} | {topic} | {vid} | {first3} |")
