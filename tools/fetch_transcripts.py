#!/usr/bin/env python3
"""
fetch_transcripts.py — Fetch YouTube transcripts, preferring manual captions.

Strategy (matching shadowingenglish.com):
1. Try youtube-transcript-api first (faster, simpler)
2. Fall back to yt-dlp with node runtime (more reliable, avoids IP blocks)
3. Prefer manual captions (en, en-GB, en-US) over auto-generated
4. Saves to src/data/video_transcripts.json

Usage:
  python3 tools/fetch_transcripts.py                  # All videos
  python3 tools/fetch_transcripts.py --video VIDEO_ID  # Single video
"""

import json
import re
import sys
import os
import time
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'src/data/video_transcripts.json'
SHADOWING_DIR = ROOT / 'src/data/weeks'

# Collect all videoIds from shadowing.js files
def collect_video_ids():
    videos = {}
    for week_dir in sorted(SHADOWING_DIR.iterdir()):
        if not week_dir.name.startswith('week_'):
            continue
        shadowing_file = week_dir / 'shadowing.js'
        if not shadowing_file.exists():
            continue
        content = shadowing_file.read_text()
        m = re.search(r'videoId:\s*["\']([^"\']+)["\']', content)
        if m:
            vid_id = m.group(1)
            week_num = week_dir.name.replace('week_', '')
            if vid_id not in videos:
                videos[vid_id] = []
            videos[vid_id].append(week_num)
    return videos


def parse_vtt(vtt_text):
    """Parse WebVTT subtitle format into segments with start time and duration."""
    segments = []
    # Remove VTT header
    vtt_text = re.sub(r'^WEBVTT.*?\n\n', '', vtt_text, count=1, flags=re.DOTALL)

    # Split by cue blocks
    cue_pattern = re.compile(
        r'(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3}).*?\n(.*?)(?=\n\n|\n\d|\Z)',
        re.DOTALL
    )

    for m in cue_pattern.finditer(vtt_text):
        start_str = m.group(1)
        end_str = m.group(2)
        text = m.group(3).strip()

        # Remove VTT formatting tags
        text = re.sub(r'<[^>]+>', '', text)
        text = re.sub(r'&amp;', '&', text)
        text = re.sub(r'&lt;', '<', text)
        text = re.sub(r'&gt;', '>', text)
        text = re.sub(r'&#39;', "'", text)
        text = re.sub(r'&quot;', '"', text)

        # Convert time to seconds
        def time_to_sec(t):
            h, m, s = t.split(':')
            return int(h) * 3600 + int(m) * 60 + float(s)

        start = time_to_sec(start_str)
        end = time_to_sec(end_str)
        duration = end - start

        if text:
            segments.append({
                'text': text,
                'start': round(start, 2),
                'duration': round(duration, 2)
            })

    return segments


def fetch_with_ytdlp(video_id):
    """Fetch transcript using yt-dlp with node runtime + web_safari client + cookies."""
    with tempfile.TemporaryDirectory() as tmpdir:
        output_template = os.path.join(tmpdir, f'video.%(ext)s')

        # Find cookies file (project root //tmp/youtube_cookies_main.txt)
        cookies_path = Path("/tmp/youtube_cookies_main.txt")
        if not cookies_path.exists():
            cookies_path = ROOT / "cookies" / "youtube.txt"

        # Build command with multiple fallbacks
        base_args = [
            'yt-dlp',
            '--js-runtimes', 'node',
            '--skip-download',
            '--write-auto-sub',
            '--write-sub',
            '--sub-lang', 'en,en-GB,en-US',
            '--convert-subs', 'vtt',
        ]

        if cookies_path.exists():
            base_args.extend(['--cookies', str(cookies_path)])

        # Try multiple player clients
        clients = ['web_safari', 'web_creator', 'ios', 'web', 'android']
        for client in clients:
            args = base_args + [
                '--extractor-args', f'youtube:player_client={client}',
                '-o', output_template,
                f'https://www.youtube.com/watch?v={video_id}'
            ]
            try:
                result = subprocess.run(args, capture_output=True, text=True, timeout=45, cwd=tmpdir)
                if result.returncode == 0:
                    vtt_files = list(Path(tmpdir).glob('*.vtt'))
                    if vtt_files:
                        manual = [f for f in vtt_files if '.auto.' not in f.name]
                        chosen = manual[0] if manual else vtt_files[0]
                        vtt_text = chosen.read_text(encoding='utf-8', errors='ignore')
                        segments = parse_vtt(vtt_text)
                        if segments:
                            return {
                                'segments': segments,
                                'caption_type': 'manual' if '.auto.' not in chosen.name else 'auto',
                                'language': chosen.stem.split('.')[-1] if '.' in chosen.stem else 'en',
                                'client': client
                            }, None
            except subprocess.TimeoutExpired:
                continue
            except Exception:
                continue

        return None, 'all yt-dlp clients failed'


def fetch_with_api(video_id):
    """Fetch transcript using youtube-transcript-api (faster but may be blocked)."""
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
        ytt = YouTubeTranscriptApi()
        transcript_list = ytt.list(video_id)
    except Exception as e:
        return None, f'list_failed: {str(e)[:100]}'

    # Find manual captions first
    manual = None
    auto = None
    for t in transcript_list:
        lang = t.language_code.lower()
        if not t.is_generated:
            if lang in ('en', 'en-gb', 'en-us', 'en-au'):
                manual = t
                break
            elif manual is None:
                manual = t
        else:
            if lang == 'en' or lang.startswith('en'):
                auto = t

    chosen = manual or auto
    if not chosen:
        return None, 'no_english_captions'

    caption_type = 'manual' if not chosen.is_generated else 'auto'
    lang_code = chosen.language_code

    try:
        transcript = ytt.fetch(video_id, languages=[lang_code])
        segments = []
        for seg in transcript.snippets:
            text = seg.text.strip()
            text = re.sub(r'\s+', ' ', text)
            if text:
                segments.append({
                    'text': text,
                    'start': round(seg.start, 2),
                    'duration': round(seg.duration, 2)
                })
        return {
            'segments': segments,
            'caption_type': caption_type,
            'language': lang_code
        }, None
    except Exception as e:
        return None, f'fetch_failed: {str(e)[:100]}'


def fetch_transcript(video_id):
    """Try youtube-transcript-api first, fall back to yt-dlp."""
    data, err = fetch_with_api(video_id)
    if data and data.get('segments'):
        return data, None
    api_err = err or 'unknown'

    # Fall back to yt-dlp
    data, err = fetch_with_ytdlp(video_id)
    if data and data.get('segments'):
        return data, None
    ytdlp_err = err or 'unknown'

    return None, f'api:{api_err[:40]}; ytdlp:{ytdlp_err[:40]}'


def main():
    args = sys.argv[1:]
    dry_run = '--dry-run' in args
    target_idx = args.index('--video') if '--video' in args else -1
    filter_video = args[target_idx + 1] if target_idx >= 0 else None

    video_map = collect_video_ids()
    print(f'Found {len(video_map)} unique videos across all weeks')

    existing = {}
    if OUTPUT.exists():
        existing = json.loads(OUTPUT.read_text())

    result = {}
    stats = {'manual': 0, 'auto': 0, 'error': 0, 'skipped': 0}

    for vid_id, weeks in video_map.items():
        if filter_video and vid_id != filter_video:
            if vid_id in existing:
                result[vid_id] = existing[vid_id]
            continue

        print(f'  {vid_id} (W{",".join(weeks)})...', end=' ', flush=True)
        data, error = fetch_transcript(vid_id)

        if error:
            print(f'ERROR: {error}')
            result[vid_id] = {'error': error, 'videoId': vid_id}
            stats['error'] += 1
        else:
            result[vid_id] = {
                'segments': data['segments'],
                'text': ' '.join(s['text'] for s in data['segments']),
                'fetchedAt': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
                'captionType': data.get('caption_type', 'unknown'),
                'language': data.get('language', 'en')
            }
            caption_type = data.get('caption_type', 'unknown')
            stats[caption_type] = stats.get(caption_type, 0) + 1
            print(f'{caption_type} ({data.get("language", "en")}) — {len(data["segments"])} segments')

        time.sleep(0.5)

    for vid_id in existing:
        if vid_id not in result:
            result[vid_id] = existing[vid_id]

    if not dry_run:
        OUTPUT.write_text(json.dumps(result, indent=2))
        print(f'\nOutput: {OUTPUT}')

    print(f'\nStats: {stats}')


if __name__ == '__main__':
    main()
