#!/usr/bin/env python3
"""Generate read_explore_main.mp3 for Week 12 using Deepgram TTS"""

import os
import requests
from pathlib import Path

# Deepgram API setup
DEEPGRAM_API_KEY = os.environ.get("DEEPGRAM_API_KEY", "")
if not DEEPGRAM_API_KEY:
    print("❌ DEEPGRAM_API_KEY not found in environment")
    exit(1)

# Week 12 story content (CORRECTED: "Today" not "Tonight")
STORY_TEXT = """Today is the school talent show! Many children showcase their amazing abilities. Sarah can sing beautifully on stage. She sings a popular song and the audience loves it. Tom can dance with energy and style. He dances to fast music with impressive moves. Mike can run faster than anyone in his grade. He runs around the track in record time. Emma can jump very high over obstacles. She jumps with perfect form and lands gracefully. Jack can climb steep walls at the climbing gym. He climbs to the top quickly and waves to everyone. Lisa can draw detailed portraits and landscapes. She draws a beautiful picture for the show. Ben can ride his skateboard with amazing tricks. He rides smoothly and performs flips. Amy can swim long distances without stopping. She swims with excellent technique. David can cook simple but delicious meals. He cooks a tasty snack on stage. Rachel can play the piano with passion. She plays a beautiful melody that touches everyone's heart. Every child has unique talents!"""

# Output file
OUTPUT_PATH = Path("public/audio/week12/read_explore_main.mp3")
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

print(f"🎙️ Generating {OUTPUT_PATH.name} with Deepgram Aura-2 (aura-2-orion-en)...")
print(f"📝 Text length: {len(STORY_TEXT)} characters")

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
