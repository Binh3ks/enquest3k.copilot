#!/usr/bin/env python3
"""Split monolithic video transcript JSONs into per-video files.
Run from repo root: python3 tools/split_transcripts.py
Generates src/data/video_transcripts_by_id/{cleaned,sentences,raw}/<videoId>.json
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src', 'data')
OUT = {
    'cleaned':   os.path.join(SRC, 'video_transcripts_by_id', 'cleaned'),
    'sentences': os.path.join(SRC, 'video_transcripts_by_id', 'sentences'),
    'raw':       os.path.join(SRC, 'video_transcripts_by_id', 'raw'),
}
INPUTS = {
    'cleaned':   os.path.join(SRC, 'video_transcripts_cleaned.json'),
    'sentences': os.path.join(SRC, 'video_transcripts_sentences.json'),
    'raw':       os.path.join(SRC, 'video_transcripts.json'),
}

for d in OUT.values():
    os.makedirs(d, exist_ok=True)

total = 0
for kind, path in INPUTS.items():
    with open(path) as f:
        data = json.load(f)
    out_dir = OUT[kind]
    for video_id, entry in data.items():
        entry['videoId'] = video_id  # inject for runtime lookup map
        out_path = os.path.join(out_dir, f'{video_id}.json')
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(entry, f, ensure_ascii=False, separators=(',', ':'))
    print(f'{kind}: wrote {len(data)} files')
    total += len(data)
print(f'TOTAL: {total} files')