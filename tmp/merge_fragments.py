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
    merged = merge_fragments(segments)

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
