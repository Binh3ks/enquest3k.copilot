#!/usr/bin/env python3
"""Fetch YouTube transcripts for all shadowing videos.
Uses youtube_transcript_api package (pip install youtube-transcript-api).
Preserves existing manually-split transcripts with good data."""

import json, os, re, sys
from pathlib import Path
from datetime import datetime, timezone

try:
    from youtube_transcript_api import YouTubeTranscriptApi
    from youtube_transcript_api.formatters import JSONFormatter
except ImportError:
    print("❌ youtube_transcript_api not installed.")
    print("   Run: pip3 install youtube-transcript-api")
    sys.exit(1)

TRANSCRIPT_DIR = Path("src/data/video_transcripts_by_id/sentences")
TRANSCRIPT_DIR.mkdir(parents=True, exist_ok=True)

# Step 1: Collect all videoIds from shadowing.js (ADV + Easy)
def get_all_video_ids():
    video_ids = set()
    mappings = {}  # videoId → list of (mode, week)

    for week in range(1, 37):
        week_str = f"{week:02d}"
        for mode, base in [("ADV", "src/data/weeks"), ("Easy", "src/data/weeks_easy")]:
            shadow_file = Path(base) / f"week_{week_str}" / "shadowing.js"
            if not shadow_file.exists():
                continue
            content = shadow_file.read_text()
            m = re.search(r"videoId:\s*['\"]([^'\"]+)['\"]", content)
            if m:
                vid = m.group(1)
                video_ids.add(vid)
                mappings.setdefault(vid, []).append(f"{mode}W{week_str}")
    return video_ids, mappings

# Step 2: Check if existing transcript is good enough to keep
def needs_fetch(video_id):
    """Check if we need to fetch transcript for this video."""
    transcript_file = TRANSCRIPT_DIR / f"{video_id}.json"

    if not transcript_file.exists():
        return True, "no file"

    try:
        data = json.loads(transcript_file.read_text())
        if "error" in data:
            return True, "error file"
        segs = data.get("segments", [])
        if len(segs) < 3:
            return True, "too few segments"
        # Check if timestamps are real (not all same value)
        starts = [s.get("start", 0) for s in segs]
        unique_starts = len(set(starts))
        if unique_starts < len(starts) * 0.3:
            return True, "broken timestamps"
        return False, f"OK ({len(segs)} segs)"
    except:
        return True, "parse error"

# Step 3: Fetch transcript using youtube_transcript_api
def fetch_transcript(video_id):
    """Fetch auto-captions for a video."""
    try:
        # Try English first, then any language
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['en', 'en-US', 'en-GB'])
        except Exception:
            transcript = YouTubeTranscriptApi.get_transcript(video_id)

        # Convert to our format
        segments = []
        full_text_parts = []
        for entry in transcript:
            text = entry.get("text", "").strip()
            if not text:
                continue
            # Clean auto-caption artifacts
            text = text.replace("\n", " ").strip()
            segments.append({
                "start": round(entry.get("start", 0), 2),
                "duration": round(entry.get("duration", 0), 2),
                "text": text
            })
            full_text_parts.append(text)

        if not segments:
            return None, "no segments parsed"

        return {
            "text": " ".join(full_text_parts),
            "segments": segments,
            "videoId": video_id,
            "source": "youtube-transcript-api",
            "fetchedAt": datetime.now(timezone.utc).isoformat(),
            "rawCaptionCount": len(segments),
        }, None

    except Exception as e:
        err_str = str(e)
        if "No transcripts were found" in err_str or "Could not retrieve" in err_str:
            return None, "no English captions"
        return None, err_str[:100]

# Step 4: Save transcript
def save_transcript(video_id, data):
    output_file = TRANSCRIPT_DIR / f"{video_id}.json"
    with open(output_file, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# Main
print("=== FETCHING MISSING TRANSCRIPTS ===\n")

video_ids, mappings = get_all_video_ids()
print(f"Found {len(video_ids)} unique video IDs across all weeks\n")

fetched = 0
skipped = 0
errors = 0

for vid in sorted(video_ids):
    weeks_str = ", ".join(mappings[vid])
    needed, reason = needs_fetch(vid)

    if not needed:
        print(f"  ✅ {vid} ({weeks_str}) — {reason}")
        skipped += 1
        continue

    print(f"  🔄 {vid} ({weeks_str}) — {reason}... ", end="", flush=True)

    data, err = fetch_transcript(vid)
    if err:
        print(f"❌ {err}")
        errors += 1
        continue

    save_transcript(vid, data)
    seg_count = len(data.get("segments", []))
    dur = data["segments"][-1]["start"] + data["segments"][-1]["duration"] if data["segments"] else 0
    print(f"✅ {seg_count} segs, {dur:.0f}s")
    fetched += 1

print(f"\n=== SUMMARY ===")
print(f"  Total videos: {len(video_ids)}")
print(f"  Already OK: {skipped}")
print(f"  Fetched: {fetched}")
print(f"  Errors: {errors}")
