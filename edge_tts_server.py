#!/usr/bin/env python3
"""
Edge TTS Server - Generate natural speech using Microsoft Edge TTS
Port: 8000
"""

from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import edge_tts
import asyncio
import os
import hashlib
from pathlib import Path

app = Flask(__name__)
CORS(app)

# Cache directory for generated audio
CACHE_DIR = Path(__file__).parent / "public" / "audio_cache"
CACHE_DIR.mkdir(parents=True, exist_ok=True)

# Voice settings
VOICE = "en-US-AriaNeural"  # Female voice, natural and clear
RATE = "+0%"  # Normal speed
VOLUME = "+0%"  # Normal volume

def get_cache_path(text, voice):
    """Generate cache filename from text and voice"""
    text_hash = hashlib.md5(f"{text}_{voice}".encode()).hexdigest()
    return CACHE_DIR / f"{text_hash}.mp3"

async def generate_speech(text, voice):
    """Generate speech using Edge TTS"""
    communicate = edge_tts.Communicate(text, voice, rate=RATE, volume=VOLUME)
    cache_path = get_cache_path(text, voice)
    
    # Check cache
    if cache_path.exists():
        print(f"✅ Cache hit: {text[:30]}...")
        return cache_path
    
    # Generate new audio
    print(f"🔊 Generating: {text[:30]}...")
    await communicate.save(str(cache_path))
    return cache_path

@app.route('/tts', methods=['GET', 'POST'])
def text_to_speech():
    """Generate speech from text"""
    try:
        # Support both GET (query params) and POST (JSON body)
        if request.method == 'GET':
            text = request.args.get('text', '')
            voice = request.args.get('voice', VOICE)
            # Map voice aliases
            if voice == 'clear_woman':
                voice = VOICE
        else:
            data = request.get_json()
            text = data.get('text', '')
            voice = data.get('voice', VOICE)
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Run async generation
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        audio_path = loop.run_until_complete(generate_speech(text, voice))
        loop.close()
        
        return send_file(audio_path, mimetype='audio/mpeg')
    
    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'voice': VOICE,
        'cache_size': len(list(CACHE_DIR.glob('*.mp3')))
    })

if __name__ == '__main__':
    print("🚀 Edge TTS Server starting on http://localhost:8000")
    print(f"📁 Cache directory: {CACHE_DIR}")
    print(f"🎤 Default voice: {VOICE}")
    app.run(host='0.0.0.0', port=8000, debug=False)
