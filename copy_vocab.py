#!/usr/bin/env python3
import os
import shutil

# Mapping: old vocab -> new vocab
mapping = {
    'happy': 'relax',
    'sad': 'comfortable',
    'funny': 'organize',
    'friendly': 'admire',
    'excited': 'peaceful',
    'playing': 'welcome',
    'reading': 'spacious',
    'drawing': 'cozy',
    'singing': 'treasure',
    'dancing': 'sanctuary'
}

source_dir = '/Users/binhnguyen/Downloads/Engquest3k/public/audio/week4'
dest_dir = '/Users/binhnguyen/Downloads/Engquest3k/public/audio/week5'

audio_types = ['', 'def_', 'ex_', 'coll_']

for old_word, new_word in mapping.items():
    for audio_type in audio_types:
        src_file = os.path.join(source_dir, f'vocab_{audio_type}{old_word}.mp3')
        dst_file = os.path.join(dest_dir, f'vocab_{audio_type}{new_word}.mp3')
        
        if os.path.exists(src_file):
            shutil.copy2(src_file, dst_file)
            print(f'✅ Copied: {old_word}({audio_type}) -> {new_word}({audio_type})')
        else:
            print(f'❌ Missing: {src_file}')

print("\n✅ All vocab files copied and renamed!")
