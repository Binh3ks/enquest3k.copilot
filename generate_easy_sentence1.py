#!/usr/bin/env python3
"""Generate dictation_1.mp3 and shadowing_1.mp3 for Week 12 Easy mode with corrected content"""

import os
import requests
from pathlib import Path

# Deepgram API setup
DEEPGRAM_API_KEY = "e625a4cf1058b49ecabba8942b1f7e88f048ca34"

# Correct sentence 1
SENTENCE_1 = "Today is the school talent show!"

files_to_generate = [
    {
        "path": "public/audio/week12_easy/dictation_1.mp3",
        "voice": "aura-2-asteria-en",  # Female for dictation
        "text": SENTENCE_1
    },
    {
        "path": "public/audio/week12_easy/shadowing_1.mp3",
        "voice": "aura-2-orion-en",  # Male for shadowing
        "text": SENTENCE_1
    }
]

for file_info in files_to_generate:
    output_path = Path(file_info["path"])
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    url = f"https://api.deepgram.com/v1/speak?model={file_info['voice']}"
    
    headers = {
        "Authorization": f"Token {DEEPGRAM_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {"text": file_info["text"]}
    
    print(f"🎙️ Generating {output_path.name} [{file_info['voice']}]...")
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=60)
        response.raise_for_status()
        
        output_path.write_bytes(response.content)
        file_size_kb = output_path.stat().st_size / 1024
        print(f"✅ SUCCESS: {output_path} ({file_size_kb:.1f} KB)")
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Error for {output_path.name}: {e}")
        continue

print("\n✅ Done generating sentence 1 audio files!")
