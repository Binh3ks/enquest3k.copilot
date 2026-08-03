#!/usr/bin/env python3
"""Fetch transcripts for videos where transcript duration < video duration.
Uses youtube_transcript_api + YouTube Data API for video duration."""

import json, os, re, sys
from pathlib import Path
from datetime import datetime, timezone
from urllib.request import urlopen, Request
from urllib.error import HTTPError

try:
    from youtube_transcript_api import YouTubeTranscriptApi
except ImportError:
    print("❌ pip3 install youtube-transcript-api"); sys.exit(1)

# Load API key
env_file = Path(__file__).parent.parent / ".env"
if env_file.exists():
    for line in env_file.read_text().splitlines():
        line = line.strip()
        if line.startswith("YOUTUBE_API_KEY="):
            os.environ["YOUTUBE_API_KEY"] = line.split("=", 1)[1]
            break

API_KEY = os.environ.get("YOUTUBE_API_KEY", "")
TRANSCRIPT_DIR = Path("src/data/video_transcripts_by_id/sentences")

# Get video duration from YouTube API
def get_video_duration(video_id):
    url = f"https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id={video_id}&key={API_KEY}"
    try:
        req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        resp = urlopen(req, timeout=10)
        data = json.loads(resp.read())
        if data.get("items"):
            iso = data["items"][0]["contentDetails"]["duration"]
            m = re.search(r"(\d+)M", iso)
            s = re.search(r"(\d+)S", iso)
            mins = int(m.group(1)) if m else 0
            secs = int(s.group(1)) if s else 0
            return mins * 60 + secs
    except:
        pass
    return None

# Get transcript duration
def get_transcript_duration(video_id):
    transcript_file = TRANSCRIPT_DIR / f"{video_id}.json"
    if not transcript_file.exists():
        return None, 0
    try:
        data = json.loads(transcript_file.read_text())
        if "error" in data:
            return None, 0
        segs = data.get("segments", [])
        if not segs:
            return None, 0
        last = segs[-1]
        dur = last.get("start", 0) + last.get("duration", 0)
        return round(dur, 1), len(segs)
    except:
        return None, 0

# Fetch transcript
def fetch_transcript(video_id):
    try:
        ytt = YouTubeTranscriptApi()
        try:
            transcript_obj = ytt.fetch(video_id, languages=['en', 'en-US', 'en-GB'])
        except:
            transcript_obj = ytt.fetch(video_id)
        # New API returns a Transcript object with snippets
        transcript = [{"start": s.start, "duration": s.duration, "text": s.text} for s in transcript_obj.snippets]

        segments = []
        full_text_parts = []
        for entry in transcript:
            text = entry.get("text", "").strip().replace("\n", " ")
            if not text:
                continue
            segments.append({
                "start": round(entry.get("start", 0), 2),
                "duration": round(entry.get("duration", 0), 2),
                "text": text
            })
            full_text_parts.append(text)

        if not segments:
            return None, "no segments"

        return {
            "text": " ".join(full_text_parts),
            "segments": segments,
            "videoId": video_id,
            "source": "youtube-transcript-api",
            "fetchedAt": datetime.now(timezone.utc).isoformat(),
            "rawCaptionCount": len(segments),
        }, None
    except Exception as e:
        return None, str(e)[:100]

# Collect video IDs
def get_all_video_ids():
    video_ids = set()
    mappings = {}
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

# Main
print("=== RE-FETCHING INCOMPLETE TRANSCRIPTS ===\n")
print("Comparing transcript duration vs video duration. Re-fetching if gap > 20%.\n")

video_ids, mappings = get_all_video_ids()
print(f"Found {len(video_ids)} unique videos\n")

# Fetch video durations in batches
video_durations = {}
ids_list = list(video_ids)
for i in range(0, len(ids_list), 50):
    batch = ids_list[i:i+50]
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
        print(f"  ⚠️ Duration API error: {e}\n")

fetched = 0
skipped = 0
errors = 0

for vid in sorted(video_ids):
    weeks_str = ", ".join(mappings[vid])
    v_dur = video_durations.get(vid)
    t_dur, t_segs = get_transcript_duration(vid)

    if v_dur is None:
        print(f"  ❓ {vid} ({weeks_str}) — no video duration")
        skipped += 1
        continue

    if t_dur is None:
        t_dur = 0

    gap = v_dur - t_dur
    gap_pct = round(gap * 100 / v_dur) if v_dur > 0 else 0

    if gap_pct <= 20:
        print(f"  ✅ {vid} ({weeks_str}) — {t_segs} segs, {t_dur}s / {v_dur}s ({gap_pct}% gap)")
        skipped += 1
        continue

    print(f"  🔄 {vid} ({weeks_str}) — {t_dur}s / {v_dur}s ({gap_pct}% gap)... ", end="", flush=True)

    data, err = fetch_transcript(vid)
    if err:
        print(f"❌ {err}")
        errors += 1
        continue

    # Save
    output_file = TRANSCRIPT_DIR / f"{vid}.json"
    with open(output_file, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    new_segs = len(data.get("segments", []))
    new_dur = data["segments"][-1]["start"] + data["segments"][-1]["duration"] if data["segments"] else 0
    new_gap = round((v_dur - new_dur) * 100 / v_dur) if v_dur > 0 else 0
    print(f"✅ {new_segs} segs, {new_dur:.0f}s ({new_gap}% gap)")
    fetched += 1

print(f"\n=== SUMMARY ===")
print(f"  Total videos: {len(video_ids)}")
print(f"  Already complete: {skipped}")
print(f"  Re-fetched: {fetched}")
print(f"  Errors: {errors}")
