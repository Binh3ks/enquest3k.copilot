#!/usr/bin/env python3
"""
Generate audio files using Google Cloud Text-to-Speech API (REST API with key)
Usage: python3 generate_audio_google_key.py <week> <mode>
Example: python3 generate_audio_google_key.py 2 both
"""

import os
import re
import json
import sys
import requests
import base64
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Google TTS REST API endpoint
GOOGLE_TTS_URL = "https://texttospeech.googleapis.com/v1/text:synthesize"
GOOGLE_API_KEY = os.getenv("GOOGLE_TTS_API_KEY")

if not GOOGLE_API_KEY:
    print("❌ Error: GOOGLE_TTS_API_KEY not found in .env file")
    sys.exit(1)

print(f"✅ Google TTS API key found: {GOOGLE_API_KEY[:20]}...")

# Voice configurations
VOICE_CONFIG = {
    "advanced": {
        "name": "en-US-Journey-D",  # Male voice
        "ssmlGender": "MALE"
    },
    "easy": {
        "name": "en-US-Journey-F",  # Female voice
        "ssmlGender": "FEMALE"
    }
}

def synthesize_speech(text, voice_name, output_path):
    """Call Google TTS REST API to generate audio"""
    
    # Determine voice gender
    gender = "MALE" if "Journey-D" in voice_name else "FEMALE"
    
    payload = {
        "input": {"text": text},
        "voice": {
            "languageCode": "en-US",
            "name": voice_name,
            "ssmlGender": gender
        },
        "audioConfig": {
            "audioEncoding": "MP3"
        }
    }
    
    params = {"key": GOOGLE_API_KEY}
    
    try:
        response = requests.post(GOOGLE_TTS_URL, json=payload, params=params)
        response.raise_for_status()
        
        result = response.json()
        audio_content = base64.b64decode(result["audioContent"])
        
        # Save to file
        with open(output_path, "wb") as f:
            f.write(audio_content)
        
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Error calling Google TTS API: {e}")
        if hasattr(e.response, 'text'):
            print(f"Response: {e.response.text}")
        return False

def get_project_paths(week, mode):
    """Get all relevant paths for the week"""
    root_dir = Path(__file__).parent.parent.resolve()
    week_id = f"week_{str(week).zfill(2)}"
    
    data_dir = "weeks" if mode == "advanced" else "weeks_easy"
    
    return {
        "root": root_dir,
        "week_dir": root_dir / "src" / "data" / data_dir / week_id,
        "audio_dir": root_dir / "public" / "audio" / week_id / mode,
        "mode": mode,
        "week": week,
        "week_id": week_id
    }

def extract_sentences(file_path):
    """Extract sentences from a JS data file"""
    if not file_path.exists():
        return []
    
    content = file_path.read_text(encoding='utf-8')
    
    # Remove comments
    content = re.sub(r'//.*?$', '', content, flags=re.MULTILINE)
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    
    sentences = []
    
    # Extract sentences from different patterns
    patterns = [
        r'"sentence":\s*"([^"]+)"',           # "sentence": "..."
        r'"text":\s*"([^"]+)"',               # "text": "..."
        r'"question":\s*"([^"]+)"',           # "question": "..."
        r'"word":\s*"([^"]+)"',               # "word": "..."
        r'"definition":\s*"([^"]+)"',         # "definition": "..."
        r'"passage":\s*`([^`]+)`',            # "passage": `...`
        r'"passage":\s*"([^"]+)"',            # "passage": "..."
    ]
    
    for pattern in patterns:
        matches = re.findall(pattern, content, re.DOTALL)
        for match in matches:
            # Clean up the text
            cleaned = match.strip()
            cleaned = re.sub(r'\\n', ' ', cleaned)
            cleaned = re.sub(r'\s+', ' ', cleaned)
            if cleaned and len(cleaned) > 1:
                sentences.append(cleaned)
    
    return sentences

def get_audio_filename(index, text):
    """Generate consistent filename for audio"""
    # Create a simple identifier from text
    text_id = re.sub(r'[^a-z0-9]+', '_', text.lower())[:30]
    return f"{index:03d}_{text_id}.mp3"

def generate_audio_for_week(week, mode):
    """Generate all audio files for a specific week and mode"""
    
    paths = get_project_paths(week, mode)
    print(f"\n{'='*60}")
    print(f"🎵 Generating Audio for Week {week} - {mode.upper()} mode")
    print(f"{'='*60}")
    
    # Create audio directory if it doesn't exist
    paths["audio_dir"].mkdir(parents=True, exist_ok=True)
    
    # Get voice configuration
    voice = VOICE_CONFIG[mode]
    voice_name = voice["name"]
    
    print(f"📁 Week directory: {paths['week_dir']}")
    print(f"🎤 Voice: {voice_name}")
    print(f"💾 Output directory: {paths['audio_dir']}")
    
    # Files to process
    data_files = [
        "read.js",
        "vocab.js",
        "grammar.js",
        "mindmap.js",
        "ask_ai.js",
        "dictation.js",
        "shadowing.js",
        "writing.js",
        "explore.js",
        "logic.js",
        "word_power.js",
        "word_match.js"
    ]
    
    total_generated = 0
    total_skipped = 0
    total_errors = 0
    
    # Process each data file
    for data_file in data_files:
        file_path = paths["week_dir"] / data_file
        
        if not file_path.exists():
            print(f"⚠️  {data_file}: File not found, skipping")
            continue
        
        print(f"\n📄 Processing {data_file}...")
        sentences = extract_sentences(file_path)
        
        if not sentences:
            print(f"   ⚠️  No sentences found")
            continue
        
        print(f"   Found {len(sentences)} sentences")
        
        # Generate audio for each sentence
        for idx, text in enumerate(sentences, 1):
            # Create filename
            filename = get_audio_filename(idx, text)
            output_path = paths["audio_dir"] / filename
            
            # Skip if already exists
            if output_path.exists():
                total_skipped += 1
                continue
            
            # Generate audio
            print(f"   [{idx}/{len(sentences)}] Generating: {text[:50]}...")
            
            success = synthesize_speech(text, voice_name, output_path)
            
            if success:
                total_generated += 1
                file_size = output_path.stat().st_size / 1024  # KB
                print(f"   ✅ Saved: {filename} ({file_size:.1f} KB)")
            else:
                total_errors += 1
                print(f"   ❌ Failed: {filename}")
    
    # Summary
    print(f"\n{'='*60}")
    print(f"📊 Summary for Week {week} - {mode.upper()}")
    print(f"{'='*60}")
    print(f"✅ Generated: {total_generated} files")
    print(f"⏭️  Skipped (already exist): {total_skipped} files")
    print(f"❌ Errors: {total_errors} files")
    print(f"{'='*60}\n")
    
    return total_generated, total_skipped, total_errors

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 generate_audio_google_key.py <week> <mode>")
        print("Example: python3 generate_audio_google_key.py 2 both")
        print("         python3 generate_audio_google_key.py 2 advanced")
        print("         python3 generate_audio_google_key.py 2 easy")
        sys.exit(1)
    
    week = int(sys.argv[1])
    mode_arg = sys.argv[2].lower()
    
    if mode_arg == "both":
        modes = ["advanced", "easy"]
    elif mode_arg in ["advanced", "easy"]:
        modes = [mode_arg]
    else:
        print(f"❌ Invalid mode: {mode_arg}. Use 'advanced', 'easy', or 'both'")
        sys.exit(1)
    
    # Process each mode
    all_stats = {"generated": 0, "skipped": 0, "errors": 0}
    
    for mode in modes:
        generated, skipped, errors = generate_audio_for_week(week, mode)
        all_stats["generated"] += generated
        all_stats["skipped"] += skipped
        all_stats["errors"] += errors
    
    # Final summary
    print(f"\n{'🎉'*30}")
    print(f"FINAL SUMMARY - Week {week}")
    print(f"{'🎉'*30}")
    print(f"✅ Total Generated: {all_stats['generated']} files")
    print(f"⏭️  Total Skipped: {all_stats['skipped']} files")
    print(f"❌ Total Errors: {all_stats['errors']} files")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    main()
