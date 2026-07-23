#!/usr/bin/env python3
"""
replace_videos.py — Replace specific weeks' shadowing videos with new YouTube IDs.

Pipeline: yt-dlp → Deepgram Nova-2 → Pipeline v4 repair → save to JSON

Usage:
    python3 tools/replace_videos.py --map '{"W07": "VIDEO_ID_1", "W10": "VIDEO_ID_2", ...}'

Or interactive mode:
    python3 tools/replace_videos.py
    > W07: VIDEO_ID_1
    > W10: VIDEO_ID_2
    > done
"""

import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WEEKS_DIR = ROOT / "src/data/weeks"
SENTENCES_DIR = ROOT / "src/data/video_transcripts_by_id/sentences"
RAW_DIR = ROOT / "src/data/video_transcripts_by_id/raw"
CLEANED_DIR = ROOT / "src/data/video_transcripts_by_id/cleaned"
TMP_DIR = ROOT / "tmp"

# ── Step 1: Clean up old data ─────────────────────────────────────

def get_old_video_id(week_num: int) -> str | None:
    """Get the current videoId from shadowing.js."""
    path = WEEKS_DIR / f"week_{week_num:02d}/shadowing.js"
    if not path.exists():
        return None
    content = path.read_text()
    match = re.search(r'videoId:\s*["\']([^"\']+)["\']', content)
    return match.group(1) if match else None


def clean_old_data(video_id: str):
    """Remove old audio, transcript JSON, and raw data for a video ID."""
    deleted = []
    for subdir in ["sentences", "raw", "cleaned"]:
        path = ROOT / f"src/data/video_transcripts_by_id/{subdir}/{video_id}.json"
        if path.exists():
            path.unlink()
            deleted.append(f"{subdir}/{video_id}.json")

    audio_path = TMP_DIR / f"{video_id}.mp3"
    if audio_path.exists():
        audio_path.unlink()
        deleted.append(f"tmp/{video_id}.mp3")

    return deleted


def update_shadowing_js(week_num: int, old_vid: str, new_vid: str):
    """Update the videoId in shadowing.js for a specific week."""
    path = WEEKS_DIR / f"week_{week_num:02d}/shadowing.js"
    if not path.exists():
        return False
    content = path.read_text()
    if old_vid not in content:
        return False
    new_content = content.replace(old_vid, new_vid)
    path.write_text(new_content)
    return True


# ── Step 2: Download audio ────────────────────────────────────────

def download_audio(video_id: str) -> Path | None:
    """Download audio via yt-dlp."""
    out_path = TMP_DIR / f"{video_id}.mp3"
    TMP_DIR.mkdir(exist_ok=True)

    print(f"  [download] Fetching audio for {video_id}...")
    url = f"https://www.youtube.com/watch?v={video_id}"
    cmd = [
        "yt-dlp", "--js-runtimes", "node",
        "-x", "--audio-format", "mp3", "--audio-quality", "0",
        "-o", str(out_path), url,
    ]
    try:
        result = subprocess.run(
            cmd, capture_output=True, text=True, timeout=120, cwd=str(ROOT)
        )
        if result.returncode == 0 and out_path.exists():
            size = out_path.stat().st_size
            print(f"  [download] OK: {size / 1024:.0f} KB")
            return out_path
        else:
            print(f"  [download] FAILED: {result.stderr[:200]}")
            return None
    except subprocess.TimeoutExpired:
        print(f"  [download] TIMEOUT")
        return None


# ── Step 3: Deepgram transcription ────────────────────────────────

def load_api_key() -> str:
    """Load DEEPGRAM_API_KEY from .env."""
    env_path = ROOT / ".env"
    if not env_path.exists():
        return os.getenv("DEEPGRAM_API_KEY", "")
    for line in env_path.read_text().split("\n"):
        line = line.strip()
        if line.startswith("DEEPGRAM_API_KEY=") and not line.startswith("#"):
            return line.split("=", 1)[1].strip()
    return os.getenv("DEEPGRAM_API_KEY", "")


def transcribe_with_deepgram(audio_path: Path, api_key: str) -> dict | None:
    """Send audio to Deepgram Nova-2 and return full response."""
    import urllib.request

    audio_bytes = audio_path.read_bytes()
    print(f"  [deepgram] Sending {len(audio_bytes)} bytes...")

    params = "?model=nova-2&timestamps=true&diarize=true&smart_format=true&utterances=true&language=en"
    url = f"https://api.deepgram.com/v1/listen{params}"
    req = urllib.request.Request(
        url, data=audio_bytes,
        headers={
            "Authorization": f"Token {api_key}",
            "Content-Type": "audio/mpeg",
        },
    )
    try:
        resp = urllib.request.urlopen(req, timeout=300)
        data = json.loads(resp.read())
        words = data.get("results", {}).get("channels", [{}])[0].get("alternatives", [{}])[0].get("words", [])
        utterances = data.get("results", {}).get("utterances", [])
        print(f"  [deepgram] OK: {len(words)} words, {len(utterances)} utterances")
        return data
    except Exception as e:
        print(f"  [deepgram] FAILED: {e}")
        return None


def format_deepgram_json(data: dict, video_id: str) -> dict:
    """Format Deepgram response into our JSON schema (pre-repair format)."""
    words = data["results"]["channels"][0]["alternatives"][0]["words"]
    utterances = data["results"].get("utterances", [])

    speaker_ids = set(u.get("speaker", 0) for u in utterances)
    speaker_map = {str(sid): f"Speaker{sid}" for sid in sorted(speaker_ids)}

    dg_idx = 0
    segments = []
    for i, u in enumerate(utterances):
        u_start = u["start"]
        u_end = u["end"]
        matched_words = []
        while dg_idx < len(words):
            w = words[dg_idx]
            if w["start"] >= u_start - 0.05 and w["end"] <= u_end + 0.05:
                w_end = w["end"] if w["end"] > w["start"] else w["start"] + 0.05
                matched_words.append({
                    "word": w["word"],
                    "start": round(w["start"], 2),
                    "end": round(w_end, 2),
                    "confidence": round(w.get("confidence", 0), 3),
                })
                dg_idx += 1
            elif w["start"] < u_start - 0.05:
                dg_idx += 1
            else:
                break

        start = matched_words[0]["start"] if matched_words else u_start
        end = matched_words[-1]["end"] if matched_words else u_end
        duration = round(end - start, 2)

        segments.append({
            "id": i + 1,
            "text": u["transcript"],
            "speaker": speaker_map.get(str(u.get("speaker", 0)), "Speaker0"),
            "start": round(start, 2),
            "duration": duration,
            "words": matched_words,
            "confidence": round(u.get("confidence", 0), 3),
        })

    full_text = " ".join(s["text"] for s in segments)
    total_duration = words[-1]["end"] if words else 0

    return {
        "videoId": video_id,
        "text": full_text,
        "segments": segments,
        "speakerMap": speaker_map,
        "alignment": {
            "engine": "deepgram-nova-2",
            "alignedAt": __import__("datetime").datetime.utcnow().isoformat() + "Z",
            "dgWordCount": len(words),
            "dgUtteranceCount": len(utterances),
            "matchedSegments": len(segments),
            "totalDuration": round(total_duration, 2),
        },
        "fetchedAt": __import__("datetime").datetime.utcnow().isoformat() + "Z",
    }


# ── Step 4: Pipeline v4 repair ────────────────────────────────────

def run_pipeline_v4(video_id: str):
    """Run the repair pipeline on a single video."""
    # Import repair functions directly
    sys.path.insert(0, str(ROOT / "tools"))
    from repair_transcripts import (
        pre_split_multi_sentence, merge_utterances,
        fix_dangling, split_long_segments
    )

    json_path = SENTENCES_DIR / f"{video_id}.json"
    if not json_path.exists():
        print(f"  [repair] No file to repair: {json_path}")
        return

    data = json.loads(json_path.read_text())
    segments = data.get("segments", [])
    if not segments:
        print(f"  [repair] No segments to repair")
        return

    before = len(segments)

    # Pipeline v4: pre_split → merge → split_long
    segments = pre_split_multi_sentence(segments)
    segments = merge_utterances(segments)
    segments = split_long_segments(segments)

    # Final renumber
    for i, seg in enumerate(segments):
        seg["id"] = i + 1

    after = len(segments)

    # Update data
    data["segments"] = segments
    data["text"] = " ".join(s["text"] for s in segments)
    data["repairedAt"] = __import__("datetime").datetime.utcnow().isoformat() + "Z"
    data["repairInfo"] = {
        "version": 4,
        "beforeSegments": before,
        "afterSegments": after,
    }

    json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    print(f"  [repair] {before}→{after} segments (v4)")


# ── Main ───────────────────────────────────────────────────────────

def parse_week_id(s: str) -> tuple:
    """Parse 'W07: VIDEO_ID' or '07 VIDEO_ID' into (7, 'VIDEO_ID')."""
    s = s.strip()
    if ":" in s:
        week_str, vid = s.split(":", 1)
    else:
        parts = s.split()
        if len(parts) < 2:
            return None, None
        week_str, vid = parts[0], parts[1]

    week_str = week_str.upper().replace("W", "")
    try:
        week_num = int(week_str)
    except ValueError:
        return None, None

    return week_num, vid.strip()


def process_replacement(week_num: int, new_vid: str, api_key: str) -> dict:
    """Process a single week replacement end-to-end."""
    print(f"\n{'='*60}")
    print(f"W{week_num:02d}: Replacing with {new_vid}")
    print(f"{'='*60}")

    # Step 1: Clean old data
    old_vid = get_old_video_id(week_num)
    if old_vid:
        deleted = clean_old_data(old_vid)
        print(f"  [clean] Deleted: {', '.join(deleted) if deleted else 'nothing'}")

        # Update shadowing.js
        if update_shadowing_js(week_num, old_vid, new_vid):
            print(f"  [update] shadowing.js: {old_vid} → {new_vid}")
        else:
            print(f"  [update] WARNING: Could not update shadowing.js")
    else:
        print(f"  [clean] No old video ID found for W{week_num:02d}")

    # Step 2: Download audio
    audio_path = download_audio(new_vid)
    if not audio_path:
        return {"week": week_num, "status": "failed", "error": "download failed"}

    # Step 3: Deepgram transcription
    deepgram_data = transcribe_with_deepgram(audio_path, api_key)
    if not deepgram_data:
        return {"week": week_num, "status": "failed", "error": "deepgram failed"}

    # Format and save raw Deepgram output
    formatted = format_deepgram_json(deepgram_data, new_vid)
    json_path = SENTENCES_DIR / f"{new_vid}.json"
    json_path.write_text(json.dumps(formatted, indent=2, ensure_ascii=False) + "\n")
    print(f"  [save] {json_path.name}: {len(formatted['segments'])} segments")

    # Step 4: Pipeline v4 repair
    run_pipeline_v4(new_vid)

    # Cleanup audio file
    if audio_path.exists():
        audio_path.unlink()

    final_segs = json.loads(json_path.read_text()).get("segments", [])
    dangling = sum(1 for s in final_segs if s["text"].rstrip().endswith(","))
    long = sum(1 for s in final_segs if len(s.get("words", [])) > 15)

    print(f"  [result] ✅ {len(final_segs)} segments, {dangling} dangling, {long} long")

    return {
        "week": week_num,
        "video_id": new_vid,
        "status": "success",
        "segments": len(final_segs),
        "dangling": dangling,
        "long": long,
    }


def main():
    api_key = load_api_key()
    if not api_key:
        print("ERROR: DEEPGRAM_API_KEY not found")
        sys.exit(1)

    # Parse replacements from args or interactive mode
    replacements = {}

    if "--map" in sys.argv:
        idx = sys.argv.index("--map")
        if idx + 1 < len(sys.argv):
            replacements = json.loads(sys.argv[idx + 1])
            # Normalize keys: "W07" → 7, "07" → 7
            normalized = {}
            for k, v in replacements.items():
                week_num, _ = parse_week_id(f"{k}: {v}")
                if week_num:
                    normalized[week_num] = v
            replacements = normalized
    else:
        print("Enter replacements (format: W07: VIDEO_ID)")
        print("Type 'done' when finished:")
        while True:
            try:
                line = input("> ").strip()
            except (EOFError, KeyboardInterrupt):
                break
            if line.lower() in ("done", "q", "quit"):
                break
            week_num, vid = parse_week_id(line)
            if week_num and vid:
                replacements[week_num] = vid
                print(f"  Queued: W{week_num:02d} → {vid}")
            else:
                print(f"  Invalid format: '{line}' (use W07: VIDEO_ID)")

    if not replacements:
        print("No replacements specified. Exiting.")
        return

    print(f"\n{'='*60}")
    print(f"REPLACEMENT PLAN: {len(replacements)} weeks")
    print(f"{'='*60}")
    for w in sorted(replacements):
        print(f"  W{w:02d}: {replacements[w]}")
    print()

    # Process each replacement
    results = []
    for week_num in sorted(replacements):
        new_vid = replacements[week_num]
        try:
            result = process_replacement(week_num, new_vid, api_key)
            results.append(result)
        except Exception as e:
            print(f"  ERROR: {e}")
            results.append({"week": week_num, "status": "error", "error": str(e)})
        # Rate limit between API calls
        time.sleep(1)

    # Summary
    success = [r for r in results if r["status"] == "success"]
    failed = [r for r in results if r["status"] != "success"]

    print(f"\n{'='*60}")
    print(f"SUMMARY: {len(success)} success, {len(failed)} failed")
    print(f"{'='*60}")
    for r in results:
        status = "✅" if r["status"] == "success" else "❌"
        detail = r.get("error") or f"{r.get('segments', 0)} segments"
        print(f"  {status} W{r['week']:02d}: {detail}")


if __name__ == "__main__":
    main()
