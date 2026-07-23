#!/usr/bin/env python3
"""
repair_transcripts.py — Batch transcript repair & segmentation.

Merges short Deepgram utterances into proper sentences, matching
W11's golden standard format.

Rules (frozen):
1. Merge consecutive same-speaker utterances until ≥3 words OR sentence-ending punctuation
2. Recompute L2 start/duration from first/last word
3. Rebuild L3 words[] from merged utterances
4. Regenerate top-level text from all segments
5. SKIP W11 (golden standard)

Usage:
    python3 tools/repair_transcripts.py [--weeks 1,2,3] [--dry-run]
"""

import json
import re
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SENTENCES_DIR = ROOT / "src" / "data" / "video_transcripts_by_id" / "sentences"

# W11 video ID — skip (golden standard)
GOLDEN_VIDEO = "curo8LPPA5Y"

# Minimum words per merged sentence
MIN_WORDS = 3

# Sentence-ending punctuation
SENTENCE_ENDERS = re.compile(r'[.!?]$')


def merge_utterances(segments: list) -> list:
    """Merge short same-speaker utterances into proper sentences.

    Frozen logic from W11 golden standard:
    - Accumulate words from consecutive same-speaker segments
    - Flush when: ≥3 words AND (sentence-ender OR speaker change OR next segment has ≥3 words)
    - Never merge across speaker boundaries
    """
    if not segments:
        return []

    merged = []
    buf_segs = []
    buf_words = []
    buf_text_parts = []

    def flush():
        """Flush accumulated buffer into a merged segment."""
        if not buf_segs:
            return
        # Build merged segment
        first_seg = buf_segs[0]
        last_seg = buf_segs[-1]

        # L2 from first/last word
        if buf_words:
            start = buf_words[0]["start"]
            end = buf_words[-1]["end"]
            duration = round(end - start, 2)
        else:
            start = first_seg["start"]
            duration = round(last_seg["start"] + last_seg["duration"] - start, 2)

        # Merge text — join with space, clean up double spaces
        merged_text = " ".join(buf_text_parts)
        merged_text = re.sub(r'\s+', ' ', merged_text).strip()

        # Average confidence
        confs = [s.get("confidence", 0.9) for s in buf_segs if s.get("confidence")]
        avg_conf = round(sum(confs) / len(confs), 3) if confs else 0.9

        merged.append({
            "id": len(merged) + 1,  # will be renumbered
            "text": merged_text,
            "speaker": first_seg.get("speaker", "Speaker0"),
            "start": round(start, 2),
            "duration": duration,
            "words": buf_words.copy(),
            "confidence": avg_conf,
        })

        buf_segs.clear()
        buf_words.clear()
        buf_text_parts.clear()

    for seg in segments:
        speaker = seg.get("speaker", "Speaker0")
        text = seg.get("text", "").strip()
        words = seg.get("words", [])

        # Check if we should flush before adding this segment
        if buf_segs:
            buf_speaker = buf_segs[0].get("speaker", "Speaker0")
            buf_word_count = len(buf_words)
            buf_text = " ".join(buf_text_parts).strip()
            has_sentence_ender = bool(SENTENCE_ENDERS.search(buf_text))

            # Flush conditions:
            # 1. Speaker changed
            # 2. Buffer has ≥3 words AND sentence ends with punctuation
            # 3. Buffer has ≥MIN_WORDS words AND next segment also has ≥MIN_WORDS (natural break)
            should_flush = False
            if speaker != buf_speaker:
                should_flush = True
            elif buf_word_count >= MIN_WORDS and has_sentence_ender:
                should_flush = True
            elif buf_word_count >= MIN_WORDS and len(words) >= MIN_WORDS:
                should_flush = True

            if should_flush:
                flush()

        # Add current segment to buffer
        buf_segs.append(seg)
        buf_text_parts.append(text)
        buf_words.extend(words)

    # Flush remaining
    flush()

    # Renumber IDs
    for i, seg in enumerate(merged):
        seg["id"] = i + 1

    return merged


def repair_week(video_id: str) -> dict:
    """Repair a single week's transcript JSON."""
    json_path = SENTENCES_DIR / f"{video_id}.json"
    if not json_path.exists():
        return {"status": "missing", "video_id": video_id}

    data = json.loads(json_path.read_text())
    segments = data.get("segments", [])

    if not segments:
        return {"status": "empty", "video_id": video_id}

    # Count before
    before_count = len(segments)
    before_avg_words = sum(len(s.get("words", [])) for s in segments) / before_count

    # Merge
    merged = merge_utterances(segments)

    # Count after
    after_count = len(merged)
    after_avg_words = sum(len(s.get("words", [])) for s in merged) / after_count if merged else 0

    # Update data
    data["segments"] = merged
    data["text"] = " ".join(s["text"] for s in merged)
    data["repairedAt"] = __import__("datetime").datetime.utcnow().isoformat() + "Z"
    data["repairInfo"] = {
        "beforeSegments": before_count,
        "afterSegments": after_count,
        "beforeAvgWords": round(before_avg_words, 1),
        "afterAvgWords": round(after_avg_words, 1),
        "merged": before_count - after_count,
    }

    # Save
    json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")

    return {
        "status": "success",
        "video_id": video_id,
        "before": before_count,
        "after": after_count,
        "merged": before_count - after_count,
        "avg_words": round(after_avg_words, 1),
    }


def main():
    dry_run = "--dry-run" in sys.argv
    weeks_arg = None
    if "--weeks" in sys.argv:
        idx = sys.argv.index("--weeks")
        if idx + 1 < len(sys.argv):
            weeks_arg = [int(w.strip()) for w in sys.argv[idx + 1].split(",")]

    # Build week list
    weeks = weeks_arg if weeks_arg else list(range(1, 36))

    # Map weeks to video IDs
    import re as re_mod
    week_map = {}
    for w in weeks:
        shadowing = ROOT / f"src/data/weeks/week_{w:02d}/shadowing.js"
        if shadowing.exists():
            content = shadowing.read_text()
            match = re_mod.search(r'videoId:\s*["\']([^"\']+)["\']', content)
            if match:
                vid = match.group(1)
                if vid == GOLDEN_VIDEO:
                    print(f"W{w:02d}: SKIP (golden standard {vid})")
                    continue
                week_map[w] = vid

    print(f"\n=== Transcript Repair Pipeline ===")
    print(f"Weeks to repair: {len(week_map)}")
    print(f"Skipping: W11 (golden standard)")
    print()

    if dry_run:
        for w, vid in sorted(week_map.items()):
            json_path = SENTENCES_DIR / f"{vid}.json"
            if json_path.exists():
                data = json.loads(json_path.read_text())
                segs = data.get("segments", [])
                print(f"  W{w:02d} {vid}: {len(segs)} segments")
            else:
                print(f"  W{w:02d} {vid}: FILE MISSING")
        print("\n[DRY RUN] No changes made.")
        return

    # Process
    results = []
    for w, vid in sorted(week_map.items()):
        print(f"W{w:02d} ({vid}): ", end="", flush=True)
        try:
            result = repair_week(vid)
            results.append({"week": w, **result})
            if result["status"] == "success":
                print(f"{result['before']}→{result['after']} segments "
                      f"({result['merged']} merged, avg {result['avg_words']} words)")
            else:
                print(f"{result['status']}")
        except Exception as e:
            results.append({"week": w, "video_id": vid, "status": "error", "error": str(e)})
            print(f"ERROR: {e}")

    # Summary
    success = [r for r in results if r["status"] == "success"]
    errors = [r for r in results if r["status"] != "success"]
    total_merged = sum(r.get("merged", 0) for r in success)

    print(f"\n=== Summary ===")
    print(f"Repaired: {len(success)}")
    print(f"Errors: {len(errors)}")
    print(f"Total utterances merged: {total_merged}")
    if success:
        avg_before = sum(r["before"] for r in success) / len(success)
        avg_after = sum(r["after"] for r in success) / len(success)
        print(f"Avg segments: {avg_before:.0f} → {avg_after:.0f}")


if __name__ == "__main__":
    main()
