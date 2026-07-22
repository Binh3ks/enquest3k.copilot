#!/usr/bin/env python3
"""
force_align_transcript.py — Forced alignment via Deepgram Nova-2.

Downloads YouTube audio, sends to Deepgram for word-level timestamps,
then maps the result back to our fixed sentence transcript.

Usage:
    python3 tools/force_align_transcript.py <videoId>
    python3 tools/force_align_transcript.py curo8LPPA5Y

Requires:
    - yt-dlp (installed)
    - DEEPGRAM_API_KEY in .env or environment

Output:
    src/data/video_transcripts_by_id/sentences/<videoId>.json
    (updated with L2 start/duration + L3 words[] per sentence)
"""

import json
import os
import re
import subprocess
import sys
from pathlib import Path

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent
TMP_DIR = ROOT / "tmp"
SENTENCES_DIR = ROOT / "src" / "data" / "video_transcripts_by_id" / "sentences"

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


def transcribe_with_deepgram(audio_path: Path, api_key: str) -> list:
    """Send audio to Deepgram Nova-2 for word-level transcription."""
    import urllib.request

    audio_bytes = audio_path.read_bytes()
    print(f"[align] Sending {len(audio_bytes)} bytes to Deepgram...")

    params = "?model=nova-2&timestamps=true&smart_format=true&language=en"
    url = f"https://api.deepgram.com/v1/listen{params}"
    req = urllib.request.Request(
        url,
        data=audio_bytes,
        headers={
            "Authorization": f"Token {api_key}",
            "Content-Type": "audio/mpeg",
        },
    )
    try:
        resp = urllib.request.urlopen(req, timeout=180)
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
    print(f"[align] Deepgram returned {len(words)} words")
    return words


def normalize(text: str) -> str:
    """Normalize text for matching: lowercase, strip punctuation."""
    text = text.lower().replace("’", "'").replace("‘", "'")
    text = re.sub(r"[^a-z'\s]", "", text)
    return re.sub(r"\s+", " ", text).strip()


def find_subsequence(target_norms: list, dg_norms: list, search_from: int,
                     max_skip: int = 8) -> tuple:
    """Find target words as a subsequence in Deepgram words.

    Allows skipping up to max_skip Deepgram words between matches.
    Returns (start_idx, end_idx, matched_count) or (-1, -1, 0).
    """
    n_dg = len(dg_norms)
    n_tgt = len(target_norms)

    for dg_start in range(search_from, min(search_from + 50, n_dg)):
        if dg_norms[dg_start] != target_norms[0]:
            continue

        # Try to match from this start position
        dg_i = dg_start
        tgt_i = 0
        skip = 0

        while tgt_i < n_tgt and dg_i < n_dg and skip <= max_skip:
            if dg_norms[dg_i] == target_norms[tgt_i]:
                tgt_i += 1
                dg_i += 1
                skip = 0
            else:
                skip += 1
                dg_i += 1

        # Score: what fraction of target words were matched
        if tgt_i >= n_tgt * 0.6:  # at least 60% matched
            return dg_start, dg_i, tgt_i

    return -1, -1, 0


def match_words_to_sentences(deepgram_words: list, sentences: list) -> list:
    """Match Deepgram words to sentences using subsequence matching.

    For sentences whose text closely matches the audio, we get exact L3
    timestamps. For sentences that are simplified/edited versions of the
    audio (or don't exist in the audio at all), we mark them and use
    fallback timing.
    """
    dg_norms = [normalize(w["word"]) for w in deepgram_words]
    result = []
    search_from = 0

    for sent in sentences:
        sent_norm = normalize(sent["text"])
        target_words = sent_norm.split()

        match_start, match_end, matched_count = find_subsequence(
            target_words, dg_norms, search_from
        )

        if match_start >= 0 and matched_count >= 2:
            # Collect all Deepgram words in the match range
            range_words = deepgram_words[match_start:match_end]

            # Extract only the words that match our sentence (in order)
            matched_l3 = []
            ti = 0
            for w in range_words:
                if ti < len(target_words) and normalize(w["word"]) == target_words[ti]:
                    matched_l3.append({
                        "word": w["word"],
                        "start": round(w["start"], 2),
                        "end": round(w["end"], 2),
                    })
                    ti += 1

            # If we filtered too aggressively, use all range words
            if len(matched_l3) < len(target_words) * 0.4:
                matched_l3 = [
                    {"word": w["word"], "start": round(w["start"], 2), "end": round(w["end"], 2)}
                    for w in range_words
                ]

            start = matched_l3[0]["start"]
            end = matched_l3[-1]["end"]
            duration = round(end - start, 2)

            search_from = match_end
            status = f"✅ matched dg[{match_start}:{match_end}] words={len(matched_l3)}"

            result.append({
                "id": sent["id"],
                "text": sent["text"],
                "start": round(start, 2),
                "duration": duration,
                "words": matched_l3,
            })
        else:
            # No match — text doesn't exist in this audio
            status = f"❌ no match (text not in audio)"
            result.append({
                "id": sent["id"],
                "text": sent["text"],
                "start": 0,
                "duration": 0,
                "words": [],
            })

        print(f"  [{sent['id']:2d}] {status}")

    return result


def validate(segments: list) -> tuple:
    """Validate output segments."""
    issues = []
    matched = sum(1 for s in segments if s["words"])
    unmatched = len(segments) - matched

    if unmatched > 0:
        issues.append(f"{unmatched}/{len(segments)} sentences have no words (not in audio)")

    # Check that matched segments have increasing timestamps
    prev_end = 0
    for s in segments:
        if s["words"] and s["start"] < prev_end - 0.1:
            issues.append(f"Segment {s['id']} start {s['start']} < previous end {prev_end}")
        if s["words"]:
            prev_end = s["start"] + s["duration"]

    return len(issues) == 0, issues


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 tools/force_align_transcript.py <videoId>")
        sys.exit(1)

    video_id = sys.argv[1]
    api_key = os.getenv("DEEPGRAM_API_KEY", "")
    if not api_key:
        print("[align] DEEPGRAM_API_KEY not found")
        sys.exit(1)

    # Load existing sentences
    json_path = SENTENCES_DIR / f"{video_id}.json"
    if not json_path.exists():
        print(f"[align] No sentences file: {json_path}")
        sys.exit(1)

    existing = json.loads(json_path.read_text())
    sentences = existing.get("segments", [])
    print(f"[align] Loaded {len(sentences)} sentences from {video_id}.json")

    # Download audio
    audio_path = download_audio(video_id)

    # Transcribe
    deepgram_words = transcribe_with_deepgram(audio_path, api_key)
    if not deepgram_words:
        print("[align] No words returned — aborting")
        sys.exit(1)

    # Match words to sentences
    aligned = match_words_to_sentences(deepgram_words, sentences)

    # Validate
    ok, issues = validate(aligned)
    if issues:
        print("[align] Notes:")
        for issue in issues:
            print(f"  - {issue}")

    # Update JSON
    existing["segments"] = aligned
    existing["fetchedAt"] = __import__("datetime").datetime.utcnow().isoformat() + "Z"
    existing["alignment"] = {
        "engine": "deepgram-nova-2",
        "alignedAt": __import__("datetime").datetime.utcnow().isoformat() + "Z",
        "dgWordCount": len(deepgram_words),
        "matchedSentences": sum(1 for s in aligned if s["words"]),
    }
    json_path.write_text(json.dumps(existing, indent=2, ensure_ascii=False) + "\n")
    print(f"[align] Saved: {json_path}")

    # Summary
    matched = [s for s in aligned if s["words"]]
    unmatched = [s for s in aligned if not s["words"]]
    print(f"\n[align] Summary:")
    print(f"  Total sentences: {len(aligned)}")
    print(f"  Matched (in audio): {len(matched)}")
    print(f"  Unmatched (not in audio): {len(unmatched)}")
    if matched:
        print(f"  First word: {matched[0]['start']:.2f}s")
        print(f"  Last word:  {matched[-1]['start'] + matched[-1]['duration']:.2f}s")
    if unmatched:
        print(f"  Unmatched sentences: {[s['id'] for s in unmatched]}")


if __name__ == "__main__":
    main()
