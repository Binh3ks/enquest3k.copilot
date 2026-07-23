#!/usr/bin/env python3
"""
force_align_transcript.py — GOLDEN PIPELINE (frozen 2026-07-22).

Downloads YouTube audio → Deepgram Nova-2 → 1:1 utterance mapping → JSON.

⚠️  FROZEN SCRIPT — Do NOT modify logic without explicit user authorization.
    See PIPELINE_RULES.md for immutable constraints.

Usage:
    python3 tools/force_align_transcript.py <videoId>

Requires:
    - yt-dlp (with --js-runtimes node)
    - DEEPGRAM_API_KEY in .env or environment

Output:
    src/data/video_transcripts_by_id/sentences/<videoId>.json
"""

import json
import os
import subprocess
import sys
from pathlib import Path
from datetime import datetime, timezone

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent
TMP_DIR = ROOT / "tmp"
SENTENCES_DIR = ROOT / "src" / "data" / "video_transcripts_by_id" / "sentences"

# ── FROZEN CONSTANTS (see PIPELINE_RULES.md) ────────────────────────
DEEPGRAM_MODEL = "nova-2"
# Must always include ALL of these parameters:
DEEPGRAM_PARAMS = {
    "model": DEEPGRAM_MODEL,       # Nova-2 model
    "timestamps": "true",          # L3 word-level timestamps
    "diarize": "true",             # Speaker diarization
    "smart_format": "true",        # Punctuation + formatting
    "utterances": "true",          # Utterance-level segmentation
    "language": "en",              # English
}

load_dotenv(ROOT / ".env")


def download_audio(video_id: str) -> Path:
    """Download audio from YouTube via yt-dlp."""
    out_path = TMP_DIR / f"{video_id}.mp3"
    if out_path.exists():
        print(f"[align] Audio already exists: {out_path}")
        return out_path

    TMP_DIR.mkdir(exist_ok=True)
    print(f"[align] Downloading audio for {video_id}...")
    url = f"https://www.youtube.com/watch?v={video_id}"
    cmd = [
        "yt-dlp", "--js-runtimes", "node",
        "-x", "--audio-format", "mp3", "--audio-quality", "0",
        "-o", str(out_path), url,
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True, text=True, timeout=120)
        print(f"[align] Downloaded: {out_path}")
        return out_path
    except subprocess.CalledProcessError as e:
        print(f"[align] yt-dlp failed: {e.stderr}")
        sys.exit(1)


def transcribe_with_deepgram(audio_path: Path, api_key: str) -> dict:
    """Send audio to Deepgram Nova-2. Returns FULL response (not just words)."""
    import urllib.request

    audio_bytes = audio_path.read_bytes()
    print(f"[align] Sending {len(audio_bytes)} bytes to Deepgram...")

    query = "&".join(f"{k}={v}" for k, v in DEEPGRAM_PARAMS.items())
    url = f"https://api.deepgram.com/v1/listen?{query}"
    req = urllib.request.Request(
        url,
        data=audio_bytes,
        headers={
            "Authorization": f"Token {api_key}",
            "Content-Type": "audio/mpeg",
        },
    )
    try:
        resp = urllib.request.urlopen(req, timeout=300)
        data = json.loads(resp.read())
    except Exception as e:
        print(f"[align] Deepgram error: {e}")
        sys.exit(1)

    words = (
        data.get("results", {})
        .get("channels", [{}])[0]
        .get("alternatives", [{}])[0]
        .get("words", [])
    )
    utterances = data.get("results", {}).get("utterances", [])
    print(f"[align] Deepgram returned {len(words)} words, {len(utterances)} utterances")
    return data


def map_utterances_to_segments(deepgram_data: dict) -> list:
    """Map Deepgram utterances 1:1 to segments. ZERO text modification.

    This is the core of the frozen pipeline:
    - Each utterance becomes one segment
    - Text is EXACTLY what Deepgram produced (no rewriting)
    - L3 words[] come from the global word array, matched by time range
    - L2 start/duration computed from first/last word timestamps
    """
    words = (
        deepgram_data["results"]["channels"][0]["alternatives"][0]["words"]
    )
    utterances = deepgram_data["results"]["utterances"]

    # Build speaker map from diarization
    speaker_ids = set(u.get("speaker", 0) for u in utterances)
    # Default mapping: spk 0=first speaker, 1=second, etc.
    # Override with video-specific names if known
    speaker_map = {}
    for sid in sorted(speaker_ids):
        speaker_map[str(sid)] = f"Speaker{sid}"

    dg_idx = 0
    segments = []

    for i, u in enumerate(utterances):
        u_start = u["start"]
        u_end = u["end"]

        # Collect words within this utterance's time window
        matched_words = []
        while dg_idx < len(words):
            w = words[dg_idx]
            if w["start"] >= u_start - 0.05 and w["end"] <= u_end + 0.05:
                # Fix zero-duration artifacts (Deepgram punctuation/short connectors)
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

        # L2 from first/last word
        if matched_words:
            start = matched_words[0]["start"]
            end = matched_words[-1]["end"]
            duration = round(end - start, 2)
        else:
            start = u_start
            duration = round(u_end - u_start, 2)

        speaker_id = str(u.get("speaker", 0))

        segments.append({
            "id": i + 1,
            "text": u["transcript"],  # 1:1 — EXACT Deepgram text
            "speaker": speaker_map.get(speaker_id, f"Speaker{speaker_id}"),
            "start": round(start, 2),
            "duration": duration,
            "words": matched_words,
            "confidence": round(u.get("confidence", 0), 3),
        })

    return segments, speaker_map


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 tools/force_align_transcript.py <videoId>")
        sys.exit(1)

    video_id = sys.argv[1]
    api_key = os.getenv("DEEPGRAM_API_KEY", "")
    if not api_key:
        print("[align] DEEPGRAM_API_KEY not found")
        sys.exit(1)

    # Load or create JSON
    json_path = SENTENCES_DIR / f"{video_id}.json"
    if json_path.exists():
        existing = json.loads(json_path.read_text())
    else:
        existing = {"videoId": video_id}

    # Download audio
    audio_path = download_audio(video_id)

    # Transcribe with Deepgram (frozen parameters)
    deepgram_data = transcribe_with_deepgram(audio_path, api_key)

    words = (
        deepgram_data["results"]["channels"][0]["alternatives"][0]["words"]
    )
    utterances = deepgram_data["results"].get("utterances", [])
    if not words:
        print("[align] No words returned — aborting")
        sys.exit(1)

    # Map 1:1 (frozen logic — no text modification)
    segments, speaker_map = map_utterances_to_segments(deepgram_data)

    # Update JSON
    existing["segments"] = segments
    existing["speakerMap"] = speaker_map
    existing["fetchedAt"] = datetime.now(timezone.utc).isoformat()
    existing["alignment"] = {
        "engine": f"deepgram-{DEEPGRAM_MODEL}",
        "alignedAt": datetime.now(timezone.utc).isoformat(),
        "dgWordCount": len(words),
        "dgUtteranceCount": len(utterances),
        "matchedSegments": len(segments),
        "totalDuration": round(words[-1]["end"], 2),
    }

    json_path.write_text(json.dumps(existing, indent=2, ensure_ascii=False) + "\n")
    print(f"[align] Saved {len(segments)} segments to {json_path.name}")

    # Summary
    print(f"\n[align] Summary:")
    print(f"  Segments: {len(segments)}")
    print(f"  Words: {len(words)}")
    print(f"  Speakers: {set(s['speaker'] for s in segments)}")
    print(f"  Duration: {existing['alignment']['totalDuration']:.2f}s")


if __name__ == "__main__":
    main()
