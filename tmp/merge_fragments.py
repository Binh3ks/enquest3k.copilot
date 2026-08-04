#!/usr/bin/env python3
"""Post-process Deepgram utterances: merge incomplete fragments.
FROZEN rules: each segment = 1 complete thought.

Merge rules:
1. Segment ending with , → merge with next
2. Segment with ≤2 words and no .?! → merge with next
3. Segment starting lowercase (continuation) → merge with previous
4. Very short segments (<0.8s) without .?! → merge with adjacent"""

import json, sys, os
from pathlib import Path

SENTENCES_DIR = Path("src/data/video_transcripts_by_id/sentences")

def is_complete(text):
    """Check if text is a complete thought (ends with . ? !)"""
    t = text.strip()
    return bool(t) and t[-1] in '.?!'

def should_merge_forward(seg):
    """This segment should merge with the NEXT one."""
    text = seg['text'].strip()
    if not text:
        return True
    # Ends with comma
    if text[-1] == ',':
        return True
    # Very short without sentence ending
    word_count = len(text.split())
    if word_count <= 2 and not is_complete(text):
        return True
    # Interjections only (Shh, Shh.) — merge with next for context
    # NOT yes/no/ok — those are complete thoughts
    if word_count == 1 and text.rstrip('.!?').lower() in ('shh', 'sh', 'psst', 'hush'):
        return True
    # Duration very short without sentence ending
    if seg.get('duration', 0) < 0.8 and not is_complete(text):
        return True
    return False

def should_merge_backward(seg):
    """This segment should merge with the PREVIOUS one."""
    text = seg['text'].strip()
    if not text:
        return True
    # Starts with lowercase (continuation)
    if text[0].islower():
        return True
    return False

def split_repeated_words(segments):
    """Split segments where repeated words are followed by a sentence.
    E.g. 'Book book It's my notebook.' → 'Book book.' + 'It's my notebook.'
    Uses word-level timestamps if available."""
    result = []
    for seg in segments:
        text = seg['text'].strip()
        words = text.split()

        # Check for repeated word pattern: word word followed by different word(s)
        if len(words) >= 3:
            # Find where repetition ends
            split_idx = None
            for i in range(1, len(words)):
                if words[i].lower().rstrip('.,!?') == words[i-1].lower().rstrip('.,!?'):
                    split_idx = i + 1
                else:
                    break

            if split_idx and split_idx < len(words):
                # Split into "Repeated words." + "Rest of sentence"
                part1_words = words[:split_idx]
                part2_words = words[split_idx:]

                part1_text = ' '.join(part1_words) + '.'
                part2_text = ' '.join(part2_words)
                # Capitalize first letter of part2
                if part2_text and part2_text[0].islower():
                    part2_text = part2_text[0].upper() + part2_text[1:]

                # Compute timestamps from word-level data if available
                word_data = seg.get('words', [])
                if word_data and split_idx <= len(word_data):
                    # Split word data
                    words1 = word_data[:split_idx]
                    words2 = word_data[split_idx:]

                    dur1 = words1[-1]['end'] - words1[0]['start'] if words1 else 0.5
                    dur2 = words2[-1]['end'] - words2[0]['start'] if words2 else 0.5

                    seg1 = {
                        'id': 0,  # will be renumbered
                        'text': part1_text,
                        'start': words1[0]['start'],
                        'duration': round(dur1, 2),
                        'words': words1,
                    }
                    seg2 = {
                        'id': 0,
                        'text': part2_text,
                        'start': words2[0]['start'],
                        'duration': round(dur2, 2),
                        'words': words2,
                    }
                else:
                    # No word data — estimate split
                    mid_time = seg['start'] + seg['duration'] * split_idx / len(words)
                    seg1 = {
                        'id': 0,
                        'text': part1_text,
                        'start': seg['start'],
                        'duration': round(mid_time - seg['start'], 2),
                    }
                    seg2 = {
                        'id': 0,
                        'text': part2_text,
                        'start': round(mid_time, 2),
                        'duration': round(seg['start'] + seg['duration'] - mid_time, 2),
                    }

                result.append(seg1)
                result.append(seg2)
                continue

        result.append(seg)

    # Re-assign IDs
    for i, seg in enumerate(result):
        seg['id'] = i + 1

    return result


def merge_fragments(segments):
    """Merge incomplete fragments into complete sentences."""
    if not segments:
        return segments

    merged = []
    buffer = dict(segments[0])  # copy

    for i in range(1, len(segments)):
        curr = segments[i]

        if should_merge_forward(buffer) or should_merge_backward(curr):
            # Merge: combine text, use buffer's start, extend duration
            buffer['text'] = buffer['text'].strip() + ' ' + curr['text'].strip()
            buffer['duration'] = round(curr['start'] + curr['duration'] - buffer['start'], 2)
            if 'words' in buffer and 'words' in curr:
                buffer['words'] = buffer.get('words', []) + curr.get('words', [])
        else:
            # Save buffer, start new
            merged.append(buffer)
            buffer = dict(curr)

    # Don't forget last buffer
    merged.append(buffer)

    # Re-assign IDs
    for i, seg in enumerate(merged):
        seg['id'] = i + 1
        seg['text'] = seg['text'].strip()

    return merged

def process_file(video_id):
    """Process a single transcript file."""
    f = SENTENCES_DIR / f"{video_id}.json"
    if not f.exists():
        return False, "no file"

    data = json.loads(f.read_text())
    segments = data.get('segments', [])
    if not segments:
        return False, "no segments"

    # Check if has word-level timestamps (Deepgram output)
    has_words = any('words' in s for s in segments)
    if not has_words:
        return False, "no word timestamps (not Deepgram)"

    original_count = len(segments)

    # Step 1: Split repeated word patterns ("Book book It's my notebook.")
    split_segs = split_repeated_words(segments)

    # Step 2: Merge incomplete fragments
    merged = merge_fragments(split_segs)

    if len(merged) == original_count:
        return False, "no merges needed"

    data['segments'] = merged
    data['text'] = ' '.join(s['text'] for s in merged)
    data['mergedAt'] = '2026-08-03T07:00:00.000Z'

    with open(f, 'w') as fh:
        json.dump(data, fh, indent=2, ensure_ascii=False)

    return True, f"{original_count} → {len(merged)} segments"

# Main
if len(sys.argv) > 1:
    # Process specific video
    vid = sys.argv[1]
    ok, msg = process_file(vid)
    print(f"{'✅' if ok else '⏭️'} {vid} — {msg}")
else:
    # Process all
    print("=== MERGING INCOMPLETE FRAGMENTS ===\n")
    files = sorted(SENTENCES_DIR.glob("*.json"))
    processed = 0
    for f in files:
        ok, msg = process_file(f.stem)
        if ok:
            print(f"  ✅ {f.stem} — {msg}")
            processed += 1
    print(f"\nMerged: {processed}/{len(files)}")
