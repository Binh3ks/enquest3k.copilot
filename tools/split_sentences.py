#!/usr/bin/env python3
"""
split_sentences.py — Split raw ASR transcripts into proper English sentences.

Uses NLTK's sentence tokenizer on concatenated raw text, then maps timestamps
back to each sentence using word-level interpolation from the raw segments.

Output: video_transcripts_sentences.json

Usage: python3 tools/split_sentences.py [--video VIDEO_ID] [--dry-run] [--debug VIDEO_ID]
"""

import json
import re
import sys
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INPUT = ROOT / 'src/data/video_transcripts.json'
OUTPUT = ROOT / 'src/data/video_transcripts_sentences.json'

# NLTK sentence tokenizer
import nltk
try:
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    nltk.download('punkt_tab', quiet=True)
from nltk.tokenize import sent_tokenize

# ASR cleanup
ASR_FIXES = [
    (re.compile(r'\bD hey\b', re.I), 'Hey'),
    (re.compile(r'\bD he\b', re.I), 'He'),
    (re.compile(r'\bD it\b', re.I), 'It'),
    (re.compile(r'\bD they\b', re.I), 'They'),
    (re.compile(r'\bD I\b'), 'I'),
    (re.compile(r'\bIm\b'), "I'm"),
    (re.compile(r'\bIve\b'), "I've"),
    (re.compile(r'\bIll\b'), "I'll"),
    (re.compile(r'\bId\b'), "I'd"),
    (re.compile(r'\bdont\b'), "don't"),
    (re.compile(r'\bcant\b'), "can't"),
    (re.compile(r'\bwont\b'), "won't"),
    (re.compile(r'\bisnt\b'), "isn't"),
    (re.compile(r'\bdidnt\b'), "didn't"),
    (re.compile(r'\bdoesnt\b'), "doesn't"),
    (re.compile(r'\bcouldnt\b'), "couldn't"),
    (re.compile(r'\bwouldnt\b'), "wouldn't"),
    (re.compile(r'\bshes\b'), "she's"),
    (re.compile(r'\bhes\b'), "he's"),
    (re.compile(r'\bwhos\b'), "who's"),
    (re.compile(r'\byoure\b'), "you're"),
    (re.compile(r'\btheyre\b'), "they're"),
]


def clean_text(text):
    """Apply ASR error fixes and normalize."""
    c = text.strip()
    for pat, rep in ASR_FIXES:
        c = pat.sub(rep, c)
    c = re.sub(r'\s+', ' ', c).strip()
    if c:
        c = c[0].upper() + c[1:]
    return c


def build_word_timeline(segments):
    """Build word-level timeline from ASR segments.
    Each word gets start time and duration based on its position in the segment.
    Returns list of (word, start, duration).
    """
    timeline = []
    for seg in segments:
        text = seg.get('text', '').strip()
        if not text:
            continue
        words = text.split()
        seg_start = seg.get('start', 0)
        seg_dur = seg.get('duration', 0)
        word_dur = seg_dur / max(len(words), 1)

        for i, word in enumerate(words):
            timeline.append({
                'word': word,
                'start': seg_start + i * word_dur,
                'duration': word_dur,
            })
    return timeline


def split_into_sentences(text):
    """Split unpunctuated text into sentences using NLTK.
    NLTK works best with punctuation, so we add light punctuation first
    using simple heuristics, then let NLTK do the final split.
    """
    if not text.strip():
        return []

    # NLTK's sent_tokenize needs some punctuation to work well.
    # Add periods at natural break points before tokenizing.
    words = text.split()

    # Heuristic: add period after words that are likely sentence ends
    punctuated = []
    for i, word in enumerate(words):
        punctuated.append(word)
        w = word.lower().rstrip("',.")
        next_w = words[i + 1].lower().rstrip("',.") if i + 1 < len(words) else None

        # Don't add punctuation after these words (fragment indicators)
        if w in ('a', 'an', 'the', 'of', 'for', 'in', 'on', 'at', 'to', 'from',
                 'with', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'has',
                 'have', 'had', 'be', 'been', 'which', 'who', 'that', 'it',
                 'they', 'he', 'she', 'we', 'you', 'my', 'your', 'their',
                 'into', 'about', 'than', 'not', 'so', 'if', 'when', 'while'):
            continue

        # Add period if next word is a strong sentence starter
        starters = ('hey', 'so', 'yes', 'no', 'well', 'now', 'then',
                    'do', 'does', 'did', 'is', 'are', 'was', 'were',
                    'have', 'has', 'had', 'can', 'could', 'will', 'would',
                    'this', 'that', 'these', 'those', 'if', 'when', 'where',
                    'how', 'what', 'why', 'hey', 'oh', 'ok', 'okay')
        if next_w and next_w in starters:
            punctuated[-1] = word + '.'
            continue

        # Add period after common sentence-ender words
        enders = ('today', 'right', 'too', 'also', 'here', 'there', 'now',
                  'yes', 'no', 'together', 'green', 'oxygen', 'sunlight',
                  'water', 'food', 'light', 'tree', 'plants', 'sunbath',
                  'that', 'too', 'one', 'them', 'it', 'out')
        if w in enders and i > 0:
            punctuated[-1] = word + '.'
            continue

    punctuated_text = ' '.join(punctuated)

    # Use NLTK to split into sentences
    sentences = sent_tokenize(punctuated_text)

    return sentences


def align_sentences_to_timeline(sentence_texts, timeline):
    """Map each sentence to timestamps using word-level timeline.

    Strategy: For each sentence, find which words in the timeline match,
    then use the first word's start time and last word's end time.
    """
    result = []
    timeline_idx = 0

    for sent in sentence_texts:
        sent_words = re.findall(r"[A-Za-z']+", sent)
        if not sent_words:
            continue

        # Find the start of this sentence in the timeline
        start_time = None
        end_time = None
        matched_words = 0

        # Search forward from current position
        search_start = timeline_idx
        for tl_idx in range(search_start, len(timeline)):
            tl_word = re.sub(r"[^A-Za-z']", "", timeline[tl_idx]['word']).lower()
            sent_word = sent_words[0].lower() if sent_words else ''

            if tl_word == sent_word or (matched_words == 0 and tl_idx == search_start):
                if start_time is None:
                    start_time = timeline[tl_idx]['start']

                # Check how many words match
                temp_idx = tl_idx
                temp_matched = 0
                for sw in sent_words:
                    while temp_idx < len(timeline):
                        tl_w = re.sub(r"[^A-Za-z']", "", timeline[temp_idx]['word']).lower()
                        if tl_w == sw.lower():
                            temp_matched += 1
                            temp_idx += 1
                            break
                        temp_idx += 1
                    else:
                        break

                if temp_matched >= len(sent_words) * 0.5:  # At least 50% match
                    matched_words = temp_matched
                    # Find end time
                    end_idx = min(tl_idx + len(sent_words) - 1, len(timeline) - 1)
                    end_time = timeline[end_idx]['start'] + timeline[end_idx]['duration']
                    timeline_idx = tl_idx + len(sent_words)
                    break

        if start_time is not None and end_time is not None:
            result.append({
                'text': clean_text(sent),
                'start': round(start_time, 2),
                'duration': round(end_time - start_time, 2),
            })
        elif start_time is not None:
            # Fallback: estimate duration from word count
            result.append({
                'text': clean_text(sent),
                'start': round(start_time, 2),
                'duration': round(len(sent_words) * 0.4, 2),  # ~400ms per word
            })

    return result


def main():
    args = sys.argv[1:]
    dry_run = '--dry-run' in args
    debug_video = None
    if '--debug' in args:
        idx = args.index('--debug')
        if idx + 1 < len(args):
            debug_video = args[idx + 1]
    filter_video = None
    if '--video' in args:
        idx = args.index('--video')
        if idx + 1 < len(args):
            filter_video = args[idx + 1]

    with open(INPUT, 'r') as f:
        data = json.load(f)

    result = {}
    total_before = 0
    total_after = 0

    for video_id, entry in data.items():
        if 'error' in entry:
            result[video_id] = {'error': entry['error'], 'videoId': video_id}
            continue
        if filter_video and video_id != filter_video:
            continue

        segments = entry.get('segments', [])
        total_before += len(segments)

        # Step 1: Build word timeline from raw segments
        timeline = build_word_timeline(segments)

        # Step 2: Concatenate all text (raw, no periods)
        full_text = ' '.join(s.get('text', '').strip() for s in segments if s.get('text', '').strip())

        # Step 3: Split into sentences using NLTK
        sentences = split_into_sentences(full_text)

        # Step 4: Align sentences to timestamps
        aligned = align_sentences_to_timeline(sentences, timeline)

        total_after += len(aligned)

        result[video_id] = {
            'text': ' '.join(s['text'] for s in aligned),
            'segments': aligned,
            'fetchedAt': entry.get('fetchedAt', ''),
        }

        if debug_video == video_id:
            print(f'\n{video_id}: {len(segments)} segments -> {len(aligned)} sentences')
            for i, s in enumerate(aligned):
                wc = len(s['text'].split())
                print(f'  {i+1:2}. [{wc:2}w] {s["text"]}  [{s["start"]:.1f}s-{s["start"]+s["duration"]:.1f}s]')

    if not dry_run:
        with open(OUTPUT, 'w') as f:
            json.dump(result, f, indent=2)
        print(f'Output: {OUTPUT}')

    print(f'\nTotal: {total_before} segments -> {total_after} sentences')
    print(f'Videos: {len(result)}')


if __name__ == '__main__':
    main()
