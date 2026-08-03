#!/usr/bin/env python3
"""Split raw auto-caption transcripts into individual sentences.
Follows FROZEN rules from SHADOWING_PIPELINE_FROZEN.md:
- Split at sentence-ending punctuation (. ? !)
- Each segment = 1 complete thought
- Preserve exact words from auto-caption
- Estimate timestamps using word position within segment"""

import json, re, os
from pathlib import Path
from datetime import datetime, timezone

TRANSCRIPT_DIR = Path("src/data/video_transcripts_by_id/sentences")

# Abbreviations that end with . but are NOT sentence endings
ABBREVIATIONS = {
    'mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'jr', 'st', 'ave', 'blvd',
    'dept', 'est', 'approx', 'info', 'govt', 'dept', 'inc', 'ltd', 'corp',
    'e.g', 'i.e', 'vs', 'etc', 'no', 'nos', 'vol', 'fig', 'eq', 'ref',
    'jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
    'usa', 'uk', 'eu', 'un', 'nato', 'who', 'pm', 'am'
}

def is_abbreviation(text, pos):
    """Check if the period at position pos is part of an abbreviation."""
    # Look back from pos to find the word before the period
    word_end = pos
    word_start = pos - 1
    while word_start >= 0 and text[word_start] not in ' \n\t':
        word_start -= 1
    word_start += 1
    word = text[word_start:word_end].lower().rstrip('.')
    return word in ABBREVIATIONS

def split_into_sentences(text):
    """Split text into sentences following FROZEN rules."""
    if not text.strip():
        return []

    sentences = []
    current = []
    i = 0

    while i < len(text):
        char = text[i]
        current.append(char)

        # Check for sentence-ending punctuation
        if char in '.?!' and i + 1 < len(text):
            next_char = text[i + 1]

            # Don't split on abbreviation periods
            if char == '.' and is_abbreviation(text, i + 1):
                i += 1
                continue

            # Split condition: after .?! followed by space, newline, or end of text
            if next_char in ' \n\t' or i + 1 == len(text):
                sentence = ''.join(current).strip()
                if sentence:
                    sentences.append(sentence)
                current = []

        i += 1

    # Don't forget remaining text
    if current:
        sentence = ''.join(current).strip()
        if sentence:
            sentences.append(sentence)

    return sentences

def estimate_word_positions(segments):
    """Build a word → segment mapping for timestamp estimation."""
    word_map = []  # (word_index, segment_index, word_start_in_segment)
    for seg_idx, seg in enumerate(segments):
        words = seg['text'].split()
        for w_idx, word in enumerate(words):
            word_map.append((len(word_map), seg_idx, w_idx, len(words)))
    return word_map

def compute_sentence_timestamps(original_segs, new_sentences):
    """Map new sentences back to original segments for timestamps."""
    if not original_segs or not new_sentences:
        return []

    # Concatenate all original segment texts
    full_text = ' '.join(seg['text'] for seg in original_segs)
    full_words = full_text.split()

    # Build word-level timing from segments
    # Each segment has start + duration, distribute across its words
    seg_word_ranges = []  # (start_word_idx, end_word_idx, start_time, duration)
    word_idx = 0
    for seg in original_segs:
        words = seg['text'].split()
        n_words = len(words)
        seg_word_ranges.append((word_idx, word_idx + n_words, seg.get('start', 0), seg.get('duration', 0), n_words))
        word_idx += n_words

    def get_word_time(target_word_idx):
        """Get timestamp for a specific word index in the full text."""
        for start_w, end_w, seg_start, seg_dur, n_words in seg_word_ranges:
            if start_w <= target_word_idx < end_w:
                offset_in_seg = target_word_idx - start_w
                if n_words > 0:
                    word_dur = seg_dur / n_words
                    return seg_start + offset_in_seg * word_dur
        # Fallback: use last known time
        if seg_word_ranges:
            last = seg_word_ranges[-1]
            return last[2] + last[3]
        return 0

    # Map each new sentence to word positions
    result = []
    word_ptr = 0

    for sent_text in new_sentences:
        sent_words = sent_text.split()
        n_sent_words = len(sent_words)

        # Find start word
        start_time = get_word_time(word_ptr) if word_ptr < len(full_words) else 0

        # Advance word pointer past this sentence's words
        word_ptr += n_sent_words

        # Find end time
        if word_ptr <= len(full_words):
            end_time = get_word_time(word_ptr) if word_ptr < len(full_words) else start_time + 3
        else:
            end_time = start_time + 3

        duration = max(0.5, end_time - start_time)

        result.append({
            'text': sent_text,
            'start': round(start_time, 2),
            'duration': round(duration, 2)
        })

    return result

def process_transcript(video_id):
    """Process a single transcript file."""
    input_file = TRANSCRIPT_DIR / f"{video_id}.json"
    if not input_file.exists():
        return False, "no file"

    data = json.loads(input_file.read_text())
    if 'error' in data:
        return False, "error file"

    segments = data.get('segments', [])
    if not segments:
        return False, "no segments"

    # Check if already properly split (each segment is 1 sentence)
    already_split = True
    for seg in segments:
        text = seg['text'].strip()
        # Count sentence endings
        endings = sum(1 for c in text if c in '.?!')
        if endings > 1:
            already_split = False
            break

    if already_split:
        return False, "already split"

    # Concatenate all segment texts
    full_text = ' '.join(seg['text'] for seg in segments)

    # Split into sentences
    new_sentences = split_into_sentences(full_text)

    if not new_sentences:
        return False, "no sentences after split"

    # Compute timestamps
    timed_sentences = compute_sentence_timestamps(segments, new_sentences)

    # Build new data
    new_segs = []
    for idx, item in enumerate(timed_sentences):
        new_segs.append({
            'id': idx + 1,
            'text': item['text'],
            'start': item['start'],
            'duration': item['duration']
        })

    # Update data
    data['segments'] = new_segs
    data['text'] = ' '.join(item['text'] for item in timed_sentences)
    data['splitAt'] = datetime.now(timezone.utc).isoformat()
    data['splitMethod'] = 'frozen-rules-v1'

    # Save
    with open(input_file, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    return True, f"{len(segments)} raw → {len(new_segs)} sentences"

# Main
print("=== SENTENCE SPLITTING (FROZEN RULES) ===\n")

# Get all transcript files
transcript_files = sorted(TRANSCRIPT_DIR.glob("*.json"))
processed = 0
skipped = 0

for tf in transcript_files:
    vid = tf.stem
    ok, msg = process_transcript(vid)
    if ok:
        print(f"  ✅ {vid} — {msg}")
        processed += 1
    else:
        skipped += 1

print(f"\n=== SUMMARY ===")
print(f"  Processed: {processed}")
print(f"  Skipped: {skipped}")
print(f"  Total: {len(transcript_files)}")
