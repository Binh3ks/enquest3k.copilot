#!/usr/bin/env python3
"""Audit transcript completeness: compare transcript duration vs YouTube video duration."""

import json, os, re, subprocess, sys
from pathlib import Path
from urllib.request import urlopen, Request

# Auto-load from .env if not in environment
if not os.environ.get("YOUTUBE_API_KEY"):
    env_file = Path(__file__).parent.parent / ".env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            line = line.strip()
            if line.startswith("YOUTUBE_API_KEY="):
                os.environ["YOUTUBE_API_KEY"] = line.split("=", 1)[1]
                break

API_KEY = os.environ.get("YOUTUBE_API_KEY", "")
if not API_KEY:
    print("❌ YOUTUBE_API_KEY not set"); sys.exit(1)

# Collect videoIds from shadowing.js
def get_video_ids(base_dir, prefix):
    results = {}
    for week in range(1, 37):
        week_str = f"{week:02d}"
        shadow_file = Path(base_dir) / f"week_{week_str}" / "shadowing.js"
        if not shadow_file.exists():
            continue
        content = shadow_file.read_text()
        m = re.search(r"videoId:\s*['\"]([^'\"]+)['\"]", content)
        if m:
            results[f"{prefix}W{week_str}"] = m.group(1)
    return results

adv_videos = get_video_ids("src/data/weeks", "ADV ")
easy_videos = get_video_ids("src/data/weeks_easy", "Easy ")

# Combine and deduplicate
all_entries = {}
for k, v in {**adv_videos, **easy_videos}.items():
    if v not in all_entries.values():
        all_entries[k] = v

# Fetch video durations from YouTube API
def get_video_duration(video_id):
    url = f"https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id={video_id}&key={API_KEY}"
    try:
        req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        resp = urlopen(req, timeout=10)
        data = json.loads(resp.read())
        if data.get("items"):
            iso = data["items"][0]["contentDetails"]["duration"]
            # Parse PT##M##S
            m = re.search(r"(\d+)M", iso)
            s = re.search(r"(\d+)S", iso)
            mins = int(m.group(1)) if m else 0
            secs = int(s.group(1)) if s else 0
            return mins * 60 + secs
    except Exception as e:
        pass
    return None

# Get transcript info
def get_transcript_info(video_id):
    transcript_file = Path("src/data/video_transcripts_by_id/sentences") / f"{video_id}.json"
    if not transcript_file.exists():
        return None, None, "NO FILE"
    try:
        data = json.loads(transcript_file.read_text())
        if "error" in data:
            return None, None, "ERROR"
        segs = data.get("segments", [])
        if not segs:
            return 0, 0, "NO SEGMENTS"
        # Calculate duration from last segment
        last = segs[-1]
        duration = last.get("start", 0) + last.get("duration", 0)
        # Check for broken timestamps (same start for many segments)
        starts = [s.get("start", 0) for s in segs]
        unique_starts = len(set(starts))
        broken = unique_starts < len(segs) * 0.5  # Less than 50% unique starts
        return len(segs), round(duration, 1), "BROKEN" if broken else "OK"
    except:
        return None, None, "PARSE ERROR"

# Run audit
print("| Entry | videoId | Segments | Transcript Dur | Video Dur | Gap | Gap% | Status |")
print("|-------|---------|----------|---------------|-----------|-----|------|--------|")

# Batch fetch video durations (max 50 per API call)
video_ids = list(set(all_entries.values()))
batch_size = 50
video_durations = {}

for i in range(0, len(video_ids), batch_size):
    batch = video_ids[i:i+batch_size]
    ids_param = ",".join(batch)
    url = f"https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id={ids_param}&key={API_KEY}"
    try:
        req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        resp = urlopen(req, timeout=30)
        data = json.loads(resp.read())
        for item in data.get("items", []):
            vid_id = item["id"]
            iso = item["contentDetails"]["duration"]
            m = re.search(r"(\d+)M", iso)
            s = re.search(r"(\d+)S", iso)
            mins = int(m.group(1)) if m else 0
            secs = int(s.group(1)) if s else 0
            video_durations[vid_id] = mins * 60 + secs
    except Exception as e:
        print(f"API error: {e}")

# Print results
for entry, vid in sorted(all_entries.items()):
    segs, t_dur, t_status = get_transcript_info(vid)
    v_dur = video_durations.get(vid)

    if segs is None:
        print(f"| {entry} | {vid} | - | - | - | - | - | {t_status} |")
        continue

    if v_dur is None:
        print(f"| {entry} | {vid} | {segs} | {t_dur}s | ❓ | - | - | NO VIDEO DUR |")
        continue

    gap = v_dur - t_dur
    gap_pct = round(gap * 100 / v_dur) if v_dur > 0 else 0

    if gap_pct > 30:
        status = f"🔴 MISSING {gap_pct}%"
    elif gap_pct > 15:
        status = f"🟡 GAP {gap_pct}%"
    elif gap_pct > 5:
        status = f"⚠️ SMALL GAP {gap_pct}%"
    else:
        status = "✅ OK"

    print(f"| {entry} | {vid} | {segs} | {t_dur}s | {v_dur}s | {gap}s | {gap_pct}% | {status} |")
