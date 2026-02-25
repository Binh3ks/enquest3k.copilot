#!/usr/bin/env python3
"""
REGENERATE_MINDMAP.PY - Fix corrupted mindmap audio files
Regenerate ALL 509 mindmap files with correct text from tts_all_tasks.json
"""

import json
import requests
import time
from pathlib import Path

# Config
ROOT = Path(__file__).parent.parent
TASKS_FILE = ROOT / "tools/tts_all_tasks.json"
AUDIO_DIR = ROOT / "public/audio"
HF_SPACE_URL = "https://binh3k-engquest3k.hf.space/tts"

def load_mindmap_tasks():
    """Load mindmap tasks from JSON"""
    with open(TASKS_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    tasks = [t for t in data['tasks'] if t['station'] == 'mindmap']
    return tasks

def generate_audio(text, voice, output_path):
    """Generate audio using HF Space Kokoro API"""
    try:
        params = {
            'text': text,
            'station': 'read',  # Use 'read' station for clear pronunciation
            'voice': voice
        }
        
        response = requests.get(HF_SPACE_URL, params=params, timeout=30)
        response.raise_for_status()
        
        # Save MP3
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_bytes(response.content)
        
        file_size = output_path.stat().st_size
        return True, file_size
    
    except requests.Timeout:
        return False, "Timeout (30s)"
    except Exception as e:
        return False, str(e)

def main():
    print("🔧 MINDMAP AUDIO REGENERATION")
    print("=" * 60)
    
    # Load tasks
    tasks = load_mindmap_tasks()
    print(f"📊 Total mindmap tasks: {len(tasks)}")
    
    # Ask confirmation
    print("\n⚠️  WARNING: This will regenerate ALL mindmap files")
    print(f"   Estimated time: {len(tasks) * 4 / 60:.1f} minutes")
    confirm = input("\nContinue? (y/n): ").strip().lower()
    if confirm != 'y':
        print("❌ Cancelled")
        return
    
    # Regenerate
    generated = 0
    failed = 0
    start_time = time.time()
    
    for i, task in enumerate(tasks, 1):
        week = task['week']
        mode = task['mode']
        filename = task['filename']
        text = task['text']
        voice = task.get('voice', 'bf_isabella')
        
        # Determine output path
        week_folder = f"week{week}" if mode == 'advanced' else f"week{week}_easy"
        output_path = AUDIO_DIR / week_folder / filename
        
        # Generate
        print(f"[{i}/{len(tasks)}] Generating: {week_folder}/{filename}")
        print(f"            Text: {text[:60]}...")
        
        success, result = generate_audio(text, voice, output_path)
        
        if success:
            generated += 1
            print(f"            ✅ Saved: {result / 1024:.1f} KB")
        else:
            failed += 1
            print(f"            ❌ Failed: {result}")
        
        # Progress update every 10 files
        if i % 10 == 0:
            elapsed = time.time() - start_time
            avg_time = elapsed / i
            eta = avg_time * (len(tasks) - i) / 60
            print(f"\n📊 Progress: {i}/{len(tasks)} ({i/len(tasks)*100:.1f}%)")
            print(f"   Generated: {generated} | Failed: {failed}")
            print(f"   ETA: {eta:.1f} minutes\n")
        
        # Rate limiting
        time.sleep(0.5)
    
    # Summary
    elapsed = time.time() - start_time
    print("\n" + "=" * 60)
    print("✅ REGENERATION COMPLETE")
    print(f"⏱️  Time: {elapsed / 60:.1f} minutes")
    print(f"✅ Generated: {generated} files")
    print(f"❌ Failed: {failed} files")
    
    if generated > 0:
        print("\n📤 Next step: Upload to R2 CDN")
        print("   Run: ./tools/upload_audio_to_r2.sh")

if __name__ == "__main__":
    main()
