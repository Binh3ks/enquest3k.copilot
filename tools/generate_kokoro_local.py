#!/usr/bin/env python3
"""
Local TTS Generator - Using Edge TTS (Microsoft)
Fast, reliable, high-quality alternative to HF Space
"""

import json
import os
import sys
from pathlib import Path
import time
import asyncio

def install_dependencies():
    """Install required packages"""
    print("📦 Installing Edge TTS...")
    os.system("pip3 install -q edge-tts pydub")
    
async def generate_audio_local(text, output_path, voice="af_sky"):
    """Generate audio using Edge TTS"""
    try:
        import edge_tts
        
        # Map Kokoro voices to Edge TTS voices
        voice_map = {
            "am_adam": "en-US-GuyNeural",         # Male voice 1
            "am_michael": "en-US-EricNeural",     # Male voice 2
            "af_bella": "en-US-AriaNeural",       # Female voice 1
            "af_sarah": "en-US-JennyNeural",      # Female voice 2
            "af_nicole": "en-US-SaraNeural",      # Female voice 3
            "af_sky": "en-US-MichelleNeural",     # Female voice 4
            "bf_emma": "en-GB-SoniaNeural",       # British female 1
            "bf_isabella": "en-GB-LibbyNeural",   # British female 2
        }
        
        edge_voice = voice_map.get(voice, "en-US-AriaNeural")
        
        # Generate audio
        communicate = edge_tts.Communicate(text, edge_voice)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        await communicate.save(str(output_path))
        
        file_size = output_path.stat().st_size
        return True, file_size
        
    except Exception as e:
        return False, str(e)

async def generate_batch(tasks, output_base, start_idx=0):
    """Generate a batch of audio files"""
    skipped = 0
    generated = 0
    failed = 0
    start_time = time.time()
    total = len(tasks)
    
    for i, task in enumerate(tasks, start_idx + 1):
        week = task['week']
        mode = task['mode']
        filename = task['filename']
        text = task['text']
        voice = task['voice']
        
        # Determine output path
        week_folder = f"week{week}" if mode == 'advanced' else f"week{week}_easy"
        output_path = output_base / week_folder / filename
        
        # Skip if already exists and > 1KB
        if output_path.exists() and output_path.stat().st_size > 1024:
            skipped += 1
            if i % 50 == 0:
                elapsed = time.time() - start_time
                print(f"⏭️  [{i}/{total}] Skipped {skipped}, Generated {generated}, Failed {failed} ({elapsed:.0f}s)")
            continue
        
        # Clean text (remove underscores, fix common issues)
        cleaned_text = text.replace('___', 'blank').replace('_', ' ')
        
        # Generate
        success, result = await generate_audio_local(cleaned_text, output_path, voice)
        
        if success:
            generated += 1
            if i % 10 == 0:
                elapsed = time.time() - start_time
                avg_time = elapsed / (generated + failed) if (generated + failed) > 0 else 0
                eta = avg_time * (total - i)
                print(f"✅ [{i}/{total}] Generated {filename} ({result/1024:.1f}KB) | "
                      f"ETA: {eta/60:.0f}min")
        else:
            failed += 1
            print(f"❌ [{i}/{total}] Failed {filename}: {result}")
    
    return skipped, generated, failed

def main():
    # Load tasks
    tasks_file = Path(__file__).parent / "tts_all_tasks.json"
    if not tasks_file.exists():
        print("❌ tts_all_tasks.json not found!")
        print("Run extract_all_tts.py first")
        return
    
    with open(tasks_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    tasks = data['tasks']
    total = len(tasks)
    
    print(f"🎙️  Edge TTS Local Generator")
    print(f"📊 Total tasks: {total}")
    print()
    
    # Check dependencies
    try:
        import edge_tts
    except ImportError:
        print("⚠️  Edge TTS not installed. Installing now...")
        install_dependencies()
        print("✅ Installation complete!")
        print()
    
    # Generate files
    output_base = Path("public/audio")
    start_time = time.time()
    
    skipped, generated, failed = asyncio.run(generate_batch(tasks, output_base))
    
    # Summary
    elapsed = time.time() - start_time
    print()
    print("=" * 50)
    print("✅ GENERATION COMPLETE")
    print(f"📤 Generated: {generated} files")
    print(f"⏭️  Skipped: {skipped} files (already exist)")
    print(f"❌ Failed: {failed} files")
    print(f"⏱️  Time: {elapsed/60:.1f} minutes")
    print("=" * 50)

if __name__ == "__main__":
    main()


if __name__ == "__main__":
    main()
