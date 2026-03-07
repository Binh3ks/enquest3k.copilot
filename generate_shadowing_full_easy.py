#!/usr/bin/env python3
"""Generate shadowing_full.mp3 for Week 12 Easy mode using Deepgram TTS"""

import os
import requests
from pathlib import Path

# Deepgram API setup
DEEPGRAM_API_KEY = os.environ.get("DEEPGRAM_API_KEY", "")
if not DEEPGRAM_API_KEY:
    print("❌ DEEPGRAM_API_KEY not found in environment")
    exit(1)

# Week 12 Easy shadowing full text
SHADOWING_FULL_TEXT = """I have many talents! I can sing happy songs. I sing every day at home. I can dance when I hear music. I dance and have fun. I can run fast in the park. I run with my friends. I can jump over small boxes. I jump and laugh. I can climb on the playground."""

# Output file
OUTPUT_PATH = Path("public/audio/week12_easy/shadowing_full.mp3")
OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

# Deepgram TTS endpoint
url = "https://api.deepgram.com/v1/speak?model=aura-2-orion-en"  # Male narration voice

headers = {
    "Authorization": f"Token {DEEPGRAM_API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "text": SHADOWING_FULL_TEXT
}

print(f"🎙️ Generating {OUTPUT_PATH.name} with Deepgram Aura-2 (aura-2-orion-en)...")
print(f"📝 Text length: {len(SHADOWING_FULL_TEXT)} characters")

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
