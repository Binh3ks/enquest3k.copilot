#!/usr/bin/env python3
"""
Local TTS Generator - Using Piper TTS
High-quality, open-source, offline TTS
"""

import json
import os
import sys
from pathlib import Path
import time
import subprocess

def install_piper():
    """Install Piper TTS"""
    print("📦 Installing Piper TTS...")
    
    # Install piper-tts
    os.system("pip3 install -q piper-tts")
    
    # Download models
    print("📥 Downloading Piper models (one-time, ~100MB)...")
    models_dir = Path.home() / ".local/share/piper/models"
    models_dir.mkdir(parents=True, exist_ok=True)
    
    # Download high-quality English models
    voices = {
        "en_US-amy-medium": "https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/amy/medium/en_US-amy-medium.onnx",
        "en_US-joe-medium": "https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/joe/medium/en_US-joe-medium.onnx",
    }
    
    for name, url in voices.items():
        model_file = models_dir / f"{name}.onnx"
        config_file = models_dir / f"{name}.onnx.json"
        
        if not model_file.exists():
            print(f"  Downloading {name}...")
            os.system(f"curl -sL {url} -o {model_file}")
            os.system(f"curl -sL {url}.json -o {config_file}")
    
    print("✅ Piper installed!")

def generate_audio_piper(text, output_path, voice="en_US-amy-medium"):
    """Generate audio using Piper TTS"""
    try:
        from piper import PiperVoice
        
        # Load voice model
        models_dir = Path.home() / ".local/share/piper/models"
        model_path = models_dir / f"{voice}.onnx"
        
        if not model_path.exists():
            return False, f"Model not found: {model_path}"
        
        # Generate audio
        voice_model = PiperVoice.load(str(model_path))
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_path, 'wb') as f:
            voice_model.synthesize(text, f)
        
        file_size = output_path.stat().st_size
        return True, file_size
        
    except Exception as e:
        return False, str(e)

def main():
    # Load tasks
    tasks_file = Path(__file__).parent / "tts_all_tasks.json"
    if not tasks_file.exists():
        print("❌ tts_all_tasks.json not found!")
        return
    
    with open(tasks_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    tasks = data['tasks']
    total = len(tasks)
    
    print(f"🎙️  Piper TTS Local Generator")
    print(f"📊 Total tasks: {total}")
    print()
    
    # Check dependencies
    try:
        import piper
    except ImportError:
        print("⚠️  Piper not installed. Installing now...")
        install_piper()
        print()
    
    # Voice mapping (Kokoro -> Piper)
    voice_map = {
        "am_adam": "en_US-joe-medium",
        "am_michael": "en_US-joe-medium",
        "af_bella": "en_US-amy-medium",
        "af_sarah": "en_US-amy-medium",
        "af_nicole": "en_US-amy-medium",
        "af_sky": "en_US-amy-medium",
        "bf_emma": "en_US-amy-medium",
        "bf_isabella": "en_US-amy-medium",
    }
    
    # Generate files
    output_base = Path("public/audio")
    skipped = 0
    generated = 0
    failed = 0
    start_time = time.time()
    
    for i, task in enumerate(tasks, 1):
        week = task['week']
        mode = task['mode']
        filename = task['filename']
        text = task['text']
        kokoro_voice = task['voice']
        
        # Map to Piper voice
        piper_voice = voice_map.get(kokoro_voice, "en_US-amy-medium")
        
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
        
        # Clean text
        cleaned_text = text.replace('___', 'blank').replace('_', ' ')
        
        # Generate
        success, result = generate_audio_piper(cleaned_text, output_path, piper_voice)
        
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
    
    # Summary
    elapsed = time.time() - start_time
    print()
    print("=" * 50)
    print("✅ GENERATION COMPLETE")
    print(f"📤 Generated: {generated} files")
    print(f"⏭️  Skipped: {skipped} files")
    print(f"❌ Failed: {failed} files")
    print(f"⏱️  Time: {elapsed/60:.1f} minutes")
    print("=" * 50)

if __name__ == "__main__":
    main()
