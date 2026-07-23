#!/usr/bin/env python3
"""
repair_transcripts.py — Batch transcript repair & segmentation v3.

Merges short Deepgram utterances into natural shadowing segments.

Core philosophy: ACCUMULATE until complete, NEVER flush incomplete.
A segment is complete when it ends with sentence-ending punctuation
(. ! ? ;) or is a natural short interjection.

Rules:
1. ACCUMULATE on comma, trailing conjunction, or continuation words.
2. FLUSH only on: sentence-ender (. ! ? ;), speaker change, or max length.
3. Never end a segment with a dangling auxiliary, preposition, or conjunction.
4. SKIP W11 (golden standard).

Usage:
    python3 tools/repair_transcripts.py [--weeks 1,2,3] [--dry-run]
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SENTENCES_DIR = ROOT / "src" / "data" / "video_transcripts_by_id" / "sentences"
GOLDEN_VIDEO = "curo8LPPA5Y"

# Max words before force-flush (prevents runaway merging)
MAX_WORDS = 20

# Sentence-ending punctuation
SENTENCE_ENDERS = re.compile(r'[.!?;:]\s*$')

# Discourse markers that start new natural segments
# When a segment starts with one of these AND buffer has ≥6 words, flush first
DISCOURSE_MARKERS = re.compile(
    r'^(?:Then|So|Well|Okay|Now|Next|After that|Finally|Also|But|However|'
    r'Meanwhile|Anyway|Actually|Honestly|Luckily|Unfortunately|'
    r'On Monday|On Tuesday|On Wednesday|On Thursday|On Friday|On Saturday|On Sunday|'
    r'In the morning|In the afternoon|In the evening|'
    r'First|Second|Third|Last|Usually|Sometimes|Often|Always|Never|'
    r'That\'s why|The thing is|You know|I mean|By the way)',
    re.IGNORECASE
)

# Minimum buffer words before a discourse marker can trigger a flush
DISCOURSE_MIN_WORDS = 6

# Natural short completions (always flush-able)
SHORT_COMPLETIONS = re.compile(
    r'^(?:'
    r'yes\.?|no\.?|ok\.?|okay\.?|sure\.?|right\.?|well\.?|oh\.?|wow\.?|'
    r'hey\.?|hi\.?|hello\.?|bye\.?|thanks\.?|thank you\.?|sorry\.?|'
    r'please\.?|great\.?|nice\.?|good\.?|perfect\.?|excellent\.?|'
    r'wonderful\.?|fantastic\.?|exactly\.?|absolutely\.?|definitely\.?|'
    r'certainly\.?|of course\.?|I see\.?|I know\.?|I understand\.?|'
    r'me too\.?|you too\.?|no problem\.?|you\'re welcome\.?'
    r')(?:\s*)?$',
    re.IGNORECASE
)


def flush_buffer(buf_segs, buf_words, buf_text_parts, merged):
    """Flush buffer into a merged segment."""
    if not buf_segs:
        return
    first_seg = buf_segs[0]
    last_seg = buf_segs[-1]

    if buf_words:
        start = buf_words[0]["start"]
        end = buf_words[-1]["end"]
        duration = round(end - start, 2)
    else:
        start = first_seg["start"]
        duration = round(last_seg["start"] + last_seg["duration"] - start, 2)

    merged_text = " ".join(buf_text_parts)
    merged_text = re.sub(r'\s+', ' ', merged_text).strip()

    confs = [s.get("confidence", 0.9) for s in buf_segs if s.get("confidence")]
    avg_conf = round(sum(confs) / len(confs), 3) if confs else 0.9

    merged.append({
        "id": len(merged) + 1,
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


def pre_split_multi_sentence(segments: list) -> list:
    """Split utterances that contain multiple sentences.

    Deepgram sometimes outputs "Sentence A. Sentence B." as one utterance.
    This splits them so the merge logic can handle each sentence separately.
    """
    result = []
    SENTENCE_SPLIT = re.compile(r'(?<=[.!?])\s+(?=[A-Z])')

    for seg in segments:
        text = seg.get("text", "").strip()
        words = seg.get("words", [])

        # Only split if text contains multiple sentences AND has enough words
        parts = SENTENCE_SPLIT.split(text)
        if len(parts) <= 1 or len(words) <= 5:
            result.append(seg)
            continue

        # Split words proportionally across parts
        total_words = len(words)
        word_idx = 0
        for part in parts:
            part_word_count = len(part.split())
            part_words = words[word_idx:word_idx + part_word_count]
            word_idx += part_word_count

            if not part_words:
                continue

            # Estimate timing proportionally
            ratio = part_word_count / total_words
            dur = round(seg.get("duration", 0) * ratio, 2)

            result.append({
                "id": len(result) + 1,
                "text": part.strip(),
                "speaker": seg.get("speaker", "Speaker0"),
                "start": round(seg["start"] + sum(
                    round(seg.get("duration", 0) * len(p.split()) / total_words, 2)
                    for p in parts[:parts.index(part)]
                ), 2),
                "duration": dur,
                "words": part_words,
                "confidence": seg.get("confidence", 0.9),
            })
        # Handle any remaining words
        if word_idx < total_words:
            remaining = words[word_idx:]
            if remaining:
                result.append({
                    "id": len(result) + 1,
                    "text": " ".join(w["word"] for w in remaining),
                    "speaker": seg.get("speaker", "Speaker0"),
                    "start": seg["start"],
                    "duration": seg.get("duration", 0),
                    "words": remaining,
                    "confidence": seg.get("confidence", 0.9),
                })

    # Renumber
    for i, seg in enumerate(result):
        seg["id"] = i + 1

    return result


def merge_utterances(segments: list) -> list:
    """Merge utterances into natural shadowing segments.

    Strategy: ACCUMULATE until complete, NEVER flush incomplete.

    Flush triggers (in order of priority):
    1. Speaker changed
    2. Buffer ends with sentence-ender (. ! ? ;)
    3. Buffer is a natural short completion ("Yes." "OK." "I know.")
    4. Buffer exceeds MAX_WORDS (safety valve)
    """
    if not segments:
        return []

    merged = []
    buf_segs = []
    buf_words = []
    buf_text_parts = []

    def get_buf_text():
        return " ".join(buf_text_parts).strip()

    for seg in segments:
        speaker = seg.get("speaker", "Speaker0")
        text = seg.get("text", "").strip()
        words = seg.get("words", [])

        if buf_segs:
            buf_speaker = buf_segs[0].get("speaker", "Speaker0")
            buf_text = get_buf_text()
            buf_word_count = len(buf_words)

            should_flush = False

            # RULE 1: Speaker changed → always flush
            if speaker != buf_speaker:
                should_flush = True
            # RULE 2: Buffer ends with sentence-ender → complete thought
            elif SENTENCE_ENDERS.search(buf_text):
                should_flush = True
            # RULE 3: Buffer is a natural short completion
            elif SHORT_COMPLETIONS.match(buf_text):
                should_flush = True
            # RULE 4: Next segment starts with discourse marker AND buffer
            # has enough words → natural breath group boundary
            elif (buf_word_count >= DISCOURSE_MIN_WORDS
                  and DISCOURSE_MARKERS.match(text)):
                should_flush = True
            # RULE 5: Buffer too long → force flush (safety valve)
            elif buf_word_count >= MAX_WORDS:
                should_flush = True

            if should_flush:
                flush_buffer(buf_segs, buf_words, buf_text_parts, merged)

        buf_segs.append(seg)
        buf_text_parts.append(text)
        buf_words.extend(words)

    # Flush remaining
    flush_buffer(buf_segs, buf_words, buf_text_parts, merged)

    # Renumber IDs
    for i, seg in enumerate(merged):
        seg["id"] = i + 1

    return merged


def fix_dangling(segments: list, max_passes: int = 5) -> list:
    """Post-process: merge segments ending with dangling elements.

    A dangling segment ends with: comma, conjunction, auxiliary, preposition.
    These are merged FORWARD with the next segment to form a complete thought.
    Runs multiple passes until no dangling segments remain.
    """
    if not segments:
        return []

    DANGLING = re.compile(
        r'(?:[,]\s*$'
        r'|\s+(?:and|but|or|so|because|then|that|which|who|where|when|if|'
        r'although|while|until|since|after|before|however|also|too|just|'
        r'only|very|really|quite|still|already|even|almost|enough|yet|'
        r'maybe|perhaps)\s*$'
        r'|\s+(?:is|are|was|were|have|has|had|do|does|did|can|could|'
        r'will|would|shall|should|may|might|must|need|used|going)\s*$'
        r'|\s+(?:in|on|at|to|for|with|from|by|about|into|through|'
        r'between|under|over|behind|near|during|without|within|across|'
        r'along|around|before|after|toward|upon|against)\s*$'
        r')',
        re.IGNORECASE
    )

    for pass_num in range(max_passes):
        merged_any = False
        new_segs = []
        i = 0
        while i < len(segments):
            seg = segments[i]
            text = seg.get("text", "").rstrip()

            # Check if this segment is dangling AND there's a next segment
            if DANGLING.search(text) and i + 1 < len(segments):
                next_seg = segments[i + 1]
                # Merge this segment FORWARD into the next
                merged_text = re.sub(r'\s+', ' ', seg["text"] + " " + next_seg["text"]).strip()
                merged_words = seg.get("words", []) + next_seg.get("words", [])
                merged_duration = round(
                    (next_seg.get("start", 0) + next_seg.get("duration", 0)) - seg["start"], 2
                )
                merged_conf = round(
                    (seg.get("confidence", 0.9) + next_seg.get("confidence", 0.9)) / 2, 3
                )
                new_segs.append({
                    "id": len(new_segs) + 1,
                    "text": merged_text,
                    "speaker": seg.get("speaker", "Speaker0"),
                    "start": seg["start"],
                    "duration": merged_duration,
                    "words": merged_words,
                    "confidence": merged_conf,
                })
                i += 2  # Skip both segments (consumed into merged)
                merged_any = True
            else:
                new_segs.append(seg)
                i += 1

        segments = new_segs
        if not merged_any:
            break

    # Renumber
    for i, seg in enumerate(segments):
        seg["id"] = i + 1

    return segments


def split_long_segments(segments: list, max_words: int = 15) -> list:
    """Force-split segments exceeding max_words at clause boundaries.

    For ESL kids (A1+, ages 6-12), no segment can exceed 15 words.
    If a segment is too long, force-split at:
      1. Conjunctions: and, but, so, because, then, which, who, where, when, if
      2. Commas already in the text
      3. Fallback: hard split at max_words (last resort)

    Each split produces a syntactically digestible chunk (S+V+O or clause).
    """
    result = []
    for seg in segments:
        text = seg.get("text", "").rstrip()
        words = seg.get("words", [])

        if len(words) <= max_words:
            result.append(seg)
            continue

        # Recursive forced split
        chunks = _force_split_text(text, words, max_words)

        for chunk_text, chunk_words in chunks:
            if not chunk_words:
                continue
            result.append({
                "id": len(result) + 1,
                "text": chunk_text.strip(),
                "speaker": seg.get("speaker", "Speaker0"),
                "start": chunk_words[0]["start"],
                "duration": round(chunk_words[-1]["end"] - chunk_words[0]["start"], 2),
                "words": chunk_words,
                "confidence": seg.get("confidence", 0.9),
            })

    return result


def _force_split_text(text: str, words: list, max_words: int) -> list:
    """Recursively split text into chunks ≤ max_words at clause boundaries.

    Returns list of (text_chunk, words_chunk) tuples.
    """
    if len(words) <= max_words:
        return [(text, words)]

    # Build word-level text for boundary detection
    word_texts = [w["word"] for w in words]

    # Strategy 1: Find conjunctions to split BEFORE
    # But only if left side has ≥3 words (complete clause)
    CONJUNCTIONS = {
        "and", "but", "so", "because", "then", "which", "who",
        "where", "when", "if", "although", "while", "until",
        "since", "after", "before", "that",
    }

    best_split_idx = -1
    for i in range(3, min(max_words + 1, len(words))):
        wt = word_texts[i].lower().rstrip(".,!?;:'")
        if wt in CONJUNCTIONS:
            # Prefer splits near the middle of the max_words window
            # Score: closer to midpoint = better
            distance_from_mid = abs(i - max_words // 2)
            if best_split_idx < 0 or distance_from_mid < abs(best_split_idx - max_words // 2):
                best_split_idx = i

    # Strategy 2: If no conjunction found, split at comma positions
    # But only if left side has ≥3 words
    if best_split_idx < 0:
        for i in range(3, min(max_words + 1, len(words))):
            if word_texts[i - 1].endswith(","):
                best_split_idx = i
                break

    # Strategy 3: Hard split at max_words (last resort)
    if best_split_idx < 0:
        best_split_idx = max_words

    # Build split texts
    part1_words = words[:best_split_idx]
    part2_words = words[best_split_idx:]

    part1_text = " ".join(w["word"] for w in part1_words)
    part2_text = " ".join(w["word"] for w in part2_words)

    # Recurse on each part if still too long
    result = []
    if len(part1_words) > 0:
        result.extend(_force_split_text(part1_text, part1_words, max_words))
    if len(part2_words) > 0:
        result.extend(_force_split_text(part2_text, part2_words, max_words))

    return result


def repair_week(video_id: str) -> dict:
    """Repair a single week's transcript JSON."""
    json_path = SENTENCES_DIR / f"{video_id}.json"
    if not json_path.exists():
        return {"status": "missing", "video_id": video_id}

    data = json.loads(json_path.read_text())
    segments = data.get("segments", [])

    if not segments:
        return {"status": "empty", "video_id": video_id}

    before_count = len(segments)
    before_avg_words = sum(len(s.get("words", [])) for s in segments) / before_count

    # Pre-split multi-sentence utterances
    segments = pre_split_multi_sentence(segments)

    # Merge short same-speaker utterances into complete thoughts
    merged = merge_utterances(segments)

    # Force-split long segments at clause boundaries (AFTER merge)
    # merge may create long segments; split breaks them into ≤15 words
    merged = split_long_segments(merged)

    # Final renumber
    for i, seg in enumerate(merged):
        seg["id"] = i + 1

    after_count = len(merged)
    after_avg_words = sum(len(s.get("words", [])) for s in merged) / after_count if merged else 0

    # Validate: no segment should end with dangling comma or conjunction
    dangling_count = 0
    for s in merged:
        text = s["text"].rstrip()
        if text.endswith(",") or re.search(r'\s+(and|but|or|so|because|then|which|who|where|when|if)\s*$', text, re.I):
            dangling_count += 1

    data["segments"] = merged
    data["text"] = " ".join(s["text"] for s in merged)
    data["repairedAt"] = __import__("datetime").datetime.utcnow().isoformat() + "Z"
    data["repairInfo"] = {
        "version": 3,
        "beforeSegments": before_count,
        "afterSegments": after_count,
        "beforeAvgWords": round(before_avg_words, 1),
        "afterAvgWords": round(after_avg_words, 1),
        "merged": before_count - after_count,
        "danglingFragments": dangling_count,
    }

    json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")

    return {
        "status": "success",
        "video_id": video_id,
        "before": before_count,
        "after": after_count,
        "merged": before_count - after_count,
        "avg_words": round(after_avg_words, 1),
        "dangling": dangling_count,
    }


def main():
    dry_run = "--dry-run" in sys.argv
    weeks_arg = None
    if "--weeks" in sys.argv:
        idx = sys.argv.index("--weeks")
        if idx + 1 < len(sys.argv):
            weeks_arg = [int(w.strip()) for w in sys.argv[idx + 1].split(",")]

    weeks = weeks_arg if weeks_arg else list(range(1, 36))

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

    print(f"\n=== Transcript Repair Pipeline v3 ===")
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

    results = []
    for w, vid in sorted(week_map.items()):
        print(f"W{w:02d} ({vid}): ", end="", flush=True)
        try:
            result = repair_week(vid)
            results.append({"week": w, **result})
            if result["status"] == "success":
                dangling = f", ⚠️{result['dangling']} dangling" if result["dangling"] else ""
                print(f"{result['before']}→{result['after']} segments "
                      f"({result['merged']} merged, avg {result['avg_words']} words{dangling})")
            else:
                print(f"{result['status']}")
        except Exception as e:
            results.append({"week": w, "video_id": vid, "status": "error", "error": str(e)})
            print(f"ERROR: {e}")

    success = [r for r in results if r["status"] == "success"]
    errors = [r for r in results if r["status"] != "success"]
    total_merged = sum(r.get("merged", 0) for r in success)
    total_dangling = sum(r.get("dangling", 0) for r in success)

    print(f"\n=== Summary ===")
    print(f"Repaired: {len(success)}")
    print(f"Errors: {len(errors)}")
    print(f"Total utterances merged: {total_merged}")
    print(f"Remaining dangling fragments: {total_dangling}")
    if success:
        avg_before = sum(r["before"] for r in success) / len(success)
        avg_after = sum(r["after"] for r in success) / len(success)
        print(f"Avg segments: {avg_before:.0f} → {avg_after:.0f}")


if __name__ == "__main__":
    main()
