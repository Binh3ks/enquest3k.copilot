#!/usr/bin/env python3
"""
Generate mindmap audio for Week 3 EASY MODE
Different vocabulary from Advanced mode (simpler words)
"""

import os
import re
import sys
from pathlib import Path
from dotenv import load_dotenv
import requests
import base64

# Load environment
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_TTS_API_KEY") or os.getenv("VITE_GOOGLE_TTS_API_KEY")

if not GOOGLE_API_KEY:
    print("❌ Error: GOOGLE_TTS_API_KEY not found in .env")
    sys.exit(1)

def get_google_tts(text, voice_name, output_path):
    """Generate audio using Google TTS."""
    url = f"https://texttospeech.googleapis.com/v1/text:synthesize?key={GOOGLE_API_KEY}"
    
    payload = {
        "input": {"text": text},
        "voice": {
            "languageCode": "en-US",
            "name": voice_name
        },
        "audioConfig": {
            "audioEncoding": "MP3"
        }
    }
    
    response = requests.post(url, json=payload)
    response.raise_for_status()
    
    audio_content = response.json()["audioContent"]
    audio_data = base64.b64decode(audio_content)
    
    with open(output_path, "wb") as out:
        out.write(audio_data)
    
    file_size = len(audio_data)
    return file_size

def main():
    week = 3
    mode = "easy"
    
    root_dir = Path(__file__).parent.parent.resolve()
    week_id_str = f"week_{str(week).zfill(2)}"
    
    data_path = root_dir / "src" / "data" / "weeks_easy" / week_id_str / "mindmap.js"
    audio_dir = root_dir / "public" / "audio" / f"week{week}_easy"
    
    # Create audio directory
    audio_dir.mkdir(parents=True, exist_ok=True)
    
    # Read mindmap.js
    content = data_path.read_text(encoding="utf-8")
    
    voice = "en-US-Neural2-F"  # Softer voice for Easy mode
    tasks = []
    
    print(f"\n📝 Extracting text from {data_path.name} (EASY MODE)...")
    
    # Extract centerStems - only "text" field
    center_stems_match = re.search(r'centerStems\s*:\s*\[([\s\S]*?)\]', content)
    if center_stems_match:
        stem_objects = re.findall(r'{\s*text:\s*["\']([^"\']+)["\']', center_stems_match.group(1))
        print(f"   Found {len(stem_objects)} center stems")
        for i, text in enumerate(stem_objects):
            # Remove ___ blanks
            clean_text = text.replace("___", "").strip()
            # Remove trailing period after blank removal
            clean_text = re.sub(r'\.\s*$', '', clean_text).strip()
            if clean_text:
                clean_text = clean_text + "."
            tasks.append({"text": clean_text, "filename": f"mindmap_stem_{i+1}.mp3"})
            print(f"      Stem {i+1}: '{clean_text}'")
    
    # Extract branchLabels - only "text" field
    branch_labels_match = re.search(r'branchLabels\s*:\s*{([\s\S]*?)}\s*}', content)
    if branch_labels_match:
        branch_arrays = re.findall(r'\[([\s\S]*?)\]', branch_labels_match.group(1))
        branch_index = 1
        print(f"   Found {len(branch_arrays)} branch arrays")
        for array_content in branch_arrays:
            branches = re.findall(r'{\s*text:\s*["\']([^"\']+)["\']', array_content)
            for text in branches:
                clean_text = text.strip()
                tasks.append({"text": clean_text, "filename": f"mindmap_branch_{branch_index}.mp3"})
                branch_index += 1
        print(f"   Total branches: {branch_index - 1}")
    
    # Generate audio
    print(f"\n🎤 Generating {len(tasks)} audio files (EASY MODE)...")
    print(f"   Voice: {voice}")
    print(f"   Output: {audio_dir}/\n")
    
    success_count = 0
    total_size = 0
    
    for i, task in enumerate(tasks, 1):
        output_path = audio_dir / task["filename"]
        try:
            file_size = get_google_tts(task["text"], voice, output_path)
            total_size += file_size
            success_count += 1
            size_kb = file_size / 1024
            print(f"   [{i:2d}/{len(tasks)}] ✅ {task['filename']} ({size_kb:.1f}KB) - \"{task['text']}\"")
        except Exception as e:
            print(f"   [{i:2d}/{len(tasks)}] ❌ {task['filename']} - Error: {e}")
    
    # Summary
    print(f"\n{'='*70}")
    print(f"✅ EASY MODE generation complete!")
    print(f"   Success: {success_count}/{len(tasks)} files")
    print(f"   Total size: {total_size / 1024:.1f} KB")
    print(f"   Output directory: {audio_dir}")
    print(f"{'='*70}\n")

if __name__ == "__main__":
    main()
