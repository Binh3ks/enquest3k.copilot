#!/usr/bin/env python3
"""
GENERATE_KOKORO_CDN.PY - Kokoro TTS Generator with R2 Upload
1. Generate từ HF Space Kokoro API
2. Save local (backup)
3. Upload lên Cloudflare R2 → CDN ngay
"""

import os
import requests
import time
import json
import subprocess
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).parent.parent
PUBLIC_AUDIO = ROOT / "public/audio"
TASKS_FILE = ROOT / "tools/tts_all_tasks.json"

# HF Space Kokoro API
HF_SPACE_URL = "https://binh3k-engquest3k.hf.space"

# Voice mapping (HF Space station names)
STATION_MAP = {
    "am_adam": "dictation",      # Male voice
    "am_michael": "dictation",   # Alternative male
    "af_bella": "new_word",      # Female vocab
    "af_sarah": "new_word",      # Alternative female
    "af_nicole": "explore",      # Story voice
    "af_sky": "read",            # Default female
    "bf_emma": "ask_ai",         # British female
    "bf_isabella": "ask_ai",     # Alternative British
}

def generate_audio_from_hf(text, output_path, voice="af_sky", max_retries=3):
    """Generate audio using HF Space Kokoro API"""
    for attempt in range(max_retries):
        try:
            # Map voice to station (HF Space uses station parameter)
            station = STATION_MAP.get(voice, "read")
            
            # Call HF Space API
            url = f"{HF_SPACE_URL}/tts?text={quote(text)}&station={quote(station)}"
            
            response = requests.get(url, timeout=30)
            
            if response.status_code == 200 and len(response.content) > 1000:
                # Ensure output directory exists
                output_path.parent.mkdir(parents=True, exist_ok=True)
                
                # Save MP3
                output_path.write_bytes(response.content)
                return True
            
            if attempt < max_retries - 1:
                time.sleep(2)  # Wait before retry
        
        except requests.exceptions.Timeout:
            print(f"⏱️  Timeout: {output_path.name}")
            if attempt < max_retries - 1:
                time.sleep(2)
        except Exception as e:
            print(f"⚠️  Error generating {output_path.name}: {e}")
            if attempt < max_retries - 1:
                time.sleep(2)
    
    return False

def upload_to_r2(local_path, r2_key):
    """Upload file to Cloudflare R2 using wrangler CLI"""
    try:
        # Use wrangler to upload (requires wrangler installed and configured)
        result = subprocess.run(
            ["wrangler", "r2", "object", "put", 
             f"engquest-audio/{r2_key}",
             "--file", str(local_path)],
            capture_output=True,
            text=True,
            timeout=30
        )
        return result.returncode == 0
    except:
        return False

def main():
    """Generate all audio files with Kokoro + Upload to R2"""
    print("🎵 KOKORO TTS → R2 CDN GENERATOR")
    print("=" * 60)
    
    # Check HF Space connectivity
    try:
        response = requests.get(f"{HF_SPACE_URL}/health", timeout=10)
        if response.status_code == 200:
            health = response.json()
            print(f"✅ HF Space ready: {health.get('message', 'OK')}")
            if health.get('kokoro_status') != 'loaded':
                print("⚠️  Warning: Kokoro may not be loaded properly")
        else:
            print(f"❌ HF Space not responding (status: {response.status_code})")
            return
    except Exception as e:
        print(f"❌ Cannot connect to HF Space: {e}")
        print(f"   URL: {HF_SPACE_URL}")
        return
    
    # Ask about R2 upload
    upload_to_r2_enabled = input("\n📤 Upload to R2 after generation? (y/n): ").lower() == 'y'
    
    if upload_to_r2_enabled:
        # Check wrangler installed
        try:
            result = subprocess.run(["wrangler", "--version"], 
                                  capture_output=True, timeout=5)
            if result.returncode == 0:
                print("✅ Wrangler CLI ready")
            else:
                print("⚠️  Wrangler not found - will skip R2 upload")
                upload_to_r2_enabled = False
        except:
            print("⚠️  Wrangler not installed - will skip R2 upload")
            print("   Install: npm install -g wrangler")
            upload_to_r2_enabled = False
    
    print(f"\n📁 Output: {PUBLIC_AUDIO}")
    if upload_to_r2_enabled:
        print(f"📤 R2 Upload: ENABLED")
        print(f"   Bucket: engquest-audio")
    else:
        print(f"📤 R2 Upload: DISABLED (local only)")
    
    # Load tasks
    if not TASKS_FILE.exists():
        print(f"❌ Tasks file not found: {TASKS_FILE}")
        print("   Run: python3 tools/extract_all_tts.py")
        return
    
    with open(TASKS_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    tasks = data.get('tasks', [])
    print(f"📊 Total tasks: {len(tasks)}")
    
    if len(tasks) == 0:
        print("❌ No tasks found in JSON")
        return
    
    # Generate
    success_count = 0
    skip_count = 0
    failed = []
    uploaded_count = 0
    
    start_time = time.time()
    
    for i, task in enumerate(tasks, 1):
        # Determine output path
        mode_suffix = "_easy" if task['mode'] == 'easy' else ""
        week_folder = PUBLIC_AUDIO / f"week{task['week']}{mode_suffix}"
        output_path = week_folder / task['filename']
        
        # Skip if exists and > 1KB
        if output_path.exists() and output_path.stat().st_size > 1024:
            skip_count += 1
            if i % 100 == 0:
                elapsed = time.time() - start_time
                rate = i / elapsed if elapsed > 0 else 0
                eta = (len(tasks) - i) / rate if rate > 0 else 0
                print(f"⏭️  [{i}/{len(tasks)}] Skipped: {task['filename']} "
                      f"(ETA: {eta/60:.1f}min)")
            continue
        
        # Generate with correct Kokoro voice via HF Space
        success = generate_audio_from_hf(
            text=task['text'],
            output_path=output_path,
            voice=task['voice']
        )
        
        if success:
            success_count += 1
            
            # Upload to R2 if enabled
            if upload_to_r2_enabled:
                r2_key = f"week{task['week']}{mode_suffix}/{task['filename']}"
                if upload_to_r2(output_path, r2_key):
                    uploaded_count += 1
            
            # Progress update every 50 files
            if i % 50 == 0:
                elapsed = time.time() - start_time
                rate = i / elapsed if elapsed > 0 else 0
                eta = (len(tasks) - i) / rate if rate > 0 else 0
                print(f"✅ [{i}/{len(tasks)}] Generated: {task['filename']} "
                      f"| Success: {success_count} | Skipped: {skip_count} "
                      f"| ETA: {eta/60:.1f}min")
        else:
            failed.append(task['filename'])
            print(f"❌ [{i}/{len(tasks)}] FAILED: {task['filename']}")
    
    # Summary
    elapsed = time.time() - start_time
    print("\n" + "=" * 60)
    print("✅ GENERATION COMPLETE")
    print(f"⏱️  Time: {elapsed/60:.1f} minutes")
    print(f"✅ Generated: {success_count} files")
    print(f"⏭️  Skipped: {skip_count} files (already exist)")
    if upload_to_r2_enabled:
        print(f"📤 Uploaded to R2: {uploaded_count} files")
    print(f"❌ Failed: {len(failed)} files")
    
    if failed:
        print("\n❌ Failed files:")
        for f in failed[:10]:
            print(f"   - {f}")
        if len(failed) > 10:
            print(f"   ... and {len(failed) - 10} more")
    
    print(f"\n📁 Output directory: {PUBLIC_AUDIO}")
    if upload_to_r2_enabled:
        print(f"🌐 CDN URL: https://pub-YOUR_ID.r2.dev/audio/")
        print(f"   (Get YOUR_ID from Cloudflare R2 dashboard)")

if __name__ == "__main__":
    main()

