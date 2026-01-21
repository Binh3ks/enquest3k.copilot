#!/usr/bin/env python3
"""
Week Data Files URL Checker
Verifies all required URLs are present in station data files
Usage: python3 check_urls.py <week_number>
"""
import re
import os
import sys

def count_urls(file_path, patterns):
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        counts = {}
        for name, pattern in patterns.items():
            counts[name] = len(re.findall(pattern, content))
        return counts
    except FileNotFoundError:
        return None

def check_week(week_num, mode='advanced'):
    """Check a specific week's data files for required URLs"""
    
    folder = f'src/data/weeks/week_{week_num:02d}' if mode == 'advanced' else f'src/data/weeks_easy/week_{week_num:02d}'
    mode_label = 'ADVANCED' if mode == 'advanced' else 'EASY'
    
    print("=" * 70)
    print(f"{mode_label} MODE - Week {week_num:02d} URL Check")
    print("=" * 70)
    
    errors = []
    warnings = []
    
    # vocab.js
    vocab_patterns = {
        'image_url': r'image_url:',
        'audio_word': r'audio_word:',
        'audio_definition': r'audio_definition:',
        'audio_example': r'audio_example:',
        'audio_collocation': r'audio_collocation:'
    }
    vocab_counts = count_urls(f'{folder}/vocab.js', vocab_patterns)
    if vocab_counts:
        print(f"\n✓ vocab.js:")
        for k, v in vocab_counts.items():
            print(f"  {k}: {v}")
        
        if mode == 'advanced':
            if vocab_counts['image_url'] != 10:
                errors.append(f"vocab.js: Expected 10 image_url, got {vocab_counts['image_url']}")
            for field in ['audio_word', 'audio_definition', 'audio_example', 'audio_collocation']:
                if vocab_counts[field] != 10:
                    errors.append(f"vocab.js: Expected 10 {field}, got {vocab_counts[field]}")
        else:  # easy mode
            if vocab_counts['image_url'] != 10:
                errors.append(f"vocab.js: Expected 10 image_url, got {vocab_counts['image_url']}")
            if vocab_counts['audio_word'] != 10:
                errors.append(f"vocab.js: Expected 10 audio_word, got {vocab_counts['audio_word']}")
            # Easy should NOT have other audio fields
            if vocab_counts['audio_definition'] > 0 or vocab_counts['audio_example'] > 0:
                warnings.append(f"vocab.js: Easy mode should only have audio_word, not definition/example/collocation")
    else:
        errors.append("vocab.js: File not found")

    # word_power.js
    wp_patterns = {
        'image_url': r'image_url:',
        'audio_word': r'audio_word:',
        'audio_definition': r'audio_definition:',
        'audio_example': r'audio_example:',
        'audio_collocation': r'audio_collocation:',
        'audio_model': r'audio_model:'
    }
    wp_counts = count_urls(f'{folder}/word_power.js', wp_patterns)
    if wp_counts:
        print(f"\n✓ word_power.js:")
        for k, v in wp_counts.items():
            print(f"  {k}: {v}")
        
        if wp_counts['image_url'] != 3:
            errors.append(f"word_power.js: Expected 3 image_url, got {wp_counts['image_url']}")
        for field in ['audio_word', 'audio_definition', 'audio_example', 'audio_collocation', 'audio_model']:
            if wp_counts[field] != 3:
                errors.append(f"word_power.js: Expected 3 {field}, got {wp_counts[field]}")
    else:
        errors.append("word_power.js: File not found")

    # read.js
    read_patterns = {'image_url': r'image_url:', 'audio_url': r'audio_url:'}
    read_counts = count_urls(f'{folder}/read.js', read_patterns)
    if read_counts:
        print(f"\n✓ read.js:")
        for k, v in read_counts.items():
            print(f"  {k}: {v}")
        
        if read_counts['image_url'] == 0:
            errors.append("read.js: Missing cover image_url")
        if read_counts['audio_url'] == 0:
            errors.append("read.js: Missing audio_url for narration")
    else:
        errors.append("read.js: File not found")

    # explore.js
    explore_counts = count_urls(f'{folder}/explore.js', read_patterns)
    if explore_counts:
        print(f"\n✓ explore.js:")
        for k, v in explore_counts.items():
            print(f"  {k}: {v}")
        
        if explore_counts['image_url'] == 0:
            errors.append("explore.js: Missing cover image_url")
        if explore_counts['audio_url'] == 0:
            errors.append("explore.js: Missing audio_url for narration")
    else:
        errors.append("explore.js: File not found")

    # dictation, shadowing, ask_ai, logic
    for station in ['dictation', 'shadowing', 'ask_ai', 'logic']:
        counts = count_urls(f'{folder}/{station}.js', {'audio_url': r'audio_url:'})
        if counts:
            print(f"\n✓ {station}.js:")
            print(f"  audio_url: {counts['audio_url']}")
            
            if counts['audio_url'] == 0:
                errors.append(f"{station}.js: Missing audio_url fields")
        else:
            errors.append(f"{station}.js: File not found")

    # mindmap (check for audio fields - should be auto-filled by script)
    mindmap_patterns = {'mindmap_stem': r'mindmap_stem_', 'mindmap_branch': r'mindmap_branch_'}
    mindmap_counts = count_urls(f'{folder}/mindmap.js', mindmap_patterns)
    if mindmap_counts:
        print(f"\n✓ mindmap.js:")
        print(f"  mindmap_stem audio: {mindmap_counts['mindmap_stem']}")
        print(f"  mindmap_branch audio: {mindmap_counts['mindmap_branch']}")
        
        if mindmap_counts['mindmap_stem'] != 6:
            warnings.append(f"mindmap.js: Expected 6 stems, got {mindmap_counts['mindmap_stem']}")
        if mindmap_counts['mindmap_branch'] != 36:
            warnings.append(f"mindmap.js: Expected 36 branches, got {mindmap_counts['mindmap_branch']}")
    else:
        errors.append("mindmap.js: File not found")

    # daily_watch.js
    daily_watch_patterns = {'videos': r'videoId:', 'thumb': r'thumb:'}
    daily_counts = count_urls(f'{folder}/daily_watch.js', daily_watch_patterns)
    if daily_counts:
        print(f"\n✓ daily_watch.js:")
        print(f"  videos: {daily_counts['videos']}")
        print(f"  thumbnails: {daily_counts['thumb']}")
        
        if daily_counts['videos'] != 5:
            errors.append(f"daily_watch.js: Expected 5 videos, got {daily_counts['videos']}")
    else:
        errors.append("daily_watch.js: File not found")

    # Summary
    print("\n" + "=" * 70)
    if errors:
        print(f"❌ ERRORS FOUND ({len(errors)}):")
        for err in errors:
            print(f"  - {err}")
    else:
        print("✅ All required URLs present!")
    
    if warnings:
        print(f"\n⚠️  WARNINGS ({len(warnings)}):")
        for warn in warnings:
            print(f"  - {warn}")
    
    return len(errors) == 0

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 check_urls.py <week_number>")
        print("Example: python3 check_urls.py 5")
        sys.exit(1)
    
    week = int(sys.argv[1])
    
    print(f"\n🔍 Checking Week {week:02d} Data Files...\n")
    
    adv_ok = check_week(week, 'advanced')
    print("\n")
    easy_ok = check_week(week, 'easy')
    
    print("\n" + "=" * 70)
    if adv_ok and easy_ok:
        print("✅ BOTH MODES PASS - Ready for asset generation!")
        sys.exit(0)
    else:
        print("❌ FAILED - Fix URLs before generating assets")
        sys.exit(1)

