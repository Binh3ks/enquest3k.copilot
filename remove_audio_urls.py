#!/usr/bin/env python3
"""
Remove audio_url/audio fields from Week 16 shadowing & dictation
to force on-demand TTS generation with correct voiceConfig
"""
import re

files = [
    'src/data/weeks/week_16/shadowing.js',
    'src/data/weeks/week_16/dictation.js',
    'src/data/weeks_easy/week_16/shadowing.js',
    'src/data/weeks_easy/week_16/dictation.js'
]

for filepath in files:
    print(f'\n🔧 Processing: {filepath}')
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Count before
    audio_count_before = content.count('audio_url:') + content.count('audio:')
    audio_full_before = content.count('audio_full:')
    
    # Remove audio_url: "/audio/..." (with trailing comma)
    content = re.sub(r',\s*audio_url:\s*"[^"]+"\s*', '', content)
    
    # Remove audio: "/audio/..." (with trailing comma)  
    content = re.sub(r',\s*audio:\s*"[^"]+"\s*', '', content)
    
    # Remove audio_full: "..." line
    content = re.sub(r'\s*audio_full:\s*"[^"]+",?\s*\n', '', content)
    
    # Count after
    audio_count_after = content.count('audio_url:') + content.count('audio:')
    audio_full_after = content.count('audio_full:')
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    removed = (audio_count_before - audio_count_after) + (audio_full_before - audio_full_after)
    print(f'✅ Removed {removed} audio fields')
    
    if audio_count_after > 0 or audio_full_after > 0:
        print(f'⚠️  Still has {audio_count_after + audio_full_after} audio fields remaining!')

print('\n✅ All files processed!')
