#!/usr/bin/env python3
"""Generate read_explore_main.mp3 for Week 12 EASY mode with correct content"""

import os
import requests
from pathlib import Path

# Deepgram API setup
DEEPGRAM_API_KEY = "e625a4cf1058b49ecabba8942b1f7e88f048ca34"

# Week 12 EASY mode story content (from read.js)
STORY_TEXT = """I have many talents! I can sing happy songs. I sing every day at home. I can dance when I hear music. I dance and have fun. I can run fast in the park. I run with my friends. I can jump over small boxes. I jump and laugh. I can climb on the playground. I climb up high. I can draw pictures of my family. I draw with colors. I can ride my bike to school. I ride every morning. I can swim in the pool. I swim in summer. I can cook with my mom. I cook easy food. I can play games with friends. I play after school. What can you do?"""

# Output file
OUTPUT_PATH = Path("public/audio/week12_easy/read_explore_main.mp3")
OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

# Deepgram TTS endpoint
url = "https://api.deepgram.com/v1/speak?model=aura-2-orion-en"  # Male narration voice

headers = {
    "Authorization": f"Token {DEEPGRAM_API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "text": STORY_TEXT
}

print(f"🎙️ Generating EASY mode {OUTPUT_PATH.name} with Deepgram Aura-2 (aura-2-orion-en)...")
print(f"📝 Text length: {len(STORY_TEXT)} characters")
print(f"📝 First sentence: {STORY_TEXT[:50]}...")

try:
    response = requests.post(url, headers=headers, json=payload, timeout=60)
    response.raise_for_status()
    
    # Write audio to file
    OUTPUT_PATH.write_bytes(response.content)
    
    file_size_kb = OUTPUT_PATH.stat().st_size / 1024
    print(f"✅ SUCCESS: {OUTPUT_PATH}")
    print(f"📦 File size: {file_size_kb:.1f} KB")
    
except requests.exceptions.RequestException as e:
    print(f"❌ Deepgram error: {e}")
    if hasattr(e, 'response') and e.response is not None:
        print(f"   Response: {e.response.text}")
    exit(1)
