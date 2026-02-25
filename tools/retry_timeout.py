#!/usr/bin/env python3
"""Retry 2 timeout files"""

import json
import requests
from pathlib import Path

# Config
url = 'https://binh3k-engquest3k.hf.space/tts'
audio_dir = Path('public/audio')

# 2 files timeout
files = [
    {'week': 6, 'mode': 'advanced', 'file': 'mindmap_branch_23.mp3'},
    {'week': 7, 'mode': 'easy', 'file': 'mindmap_branch_20.mp3'},
]

# Load tasks to get text
with open('tools/tts_all_tasks.json') as f:
    tasks_data = json.load(f)

print('🔄 RETRYING 2 TIMEOUT FILES')
print('=' * 60)

for item in files:
    # Find task
    task = next((t for t in tasks_data['tasks'] 
                 if t['week'] == item['week'] 
                 and t['mode'] == item['mode'] 
                 and t['filename'] == item['file']), None)
    
    if not task:
        print(f"❌ Task not found: {item}")
        continue
    
    text = task['text']
    voice = task.get('voice', 'bf_isabella')
    week_folder = f"week{item['week']}" if item['mode'] == 'advanced' else f"week{item['week']}_easy"
    output_path = audio_dir / week_folder / item['file']
    
    print(f"\n🎵 Generating: {week_folder}/{item['file']}")
    print(f"   Text: {text}")
    print(f"   Voice: {voice}")
    
    try:
        params = {'text': text, 'station': 'read', 'voice': voice}
        response = requests.get(url, params=params, timeout=60)  # 60s timeout
        response.raise_for_status()
        
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_bytes(response.content)
        
        file_size = output_path.stat().st_size
        print(f"   ✅ Success: {file_size / 1024:.1f} KB")
    except Exception as e:
        print(f"   ❌ Failed: {e}")

print('\n' + '=' * 60)
print('✅ RETRY COMPLETE')
