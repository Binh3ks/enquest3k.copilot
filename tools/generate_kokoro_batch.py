#!/usr/bin/env python3
"""
GENERATE_KOKORO_BATCH.PY - Kokoro TTS Audio Generator
Generates MP3 files từ tts_tasks_kokoro.json using Kokoro CLI
Output: Organized audio files ready for upload to R2
"""

import os
import json
import subprocess
import time
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).parent.parent
TASKS_FILE = ROOT / "tools/tts_tasks_kokoro.json"
OUTPUT_BASE = ROOT / "public/audio_kokoro"  # New folder for Kokoro files

# Kokoro CLI path (adjust if needed)
KOKORO_CLI = "kokoro"  # Assumes kokoro is in PATH

# Voice mapping to Kokoro voice codes
KOKORO_VOICES = {
    "af_sky": "af_sky",
    "af_bella": "af_bella",
    "am_adam": "am_adam"
}

class ProgressTracker:
    """Track generation progress with stats"""
    def __init__(self, total):
        self.total = total
        self.completed = 0
        self.failed = 0
        self.start_time = time.time()
        self.last_update = 0
    
    def update(self, success=True):
        """Update progress counter"""
        if success:
            self.completed += 1
        else:
            self.failed += 1
        
        # Print progress every 10 files or every 5 seconds
        now = time.time()
        if self.completed % 10 == 0 or (now - self.last_update) > 5:
            self.print_progress()
            self.last_update = now
    
    def print_progress(self):
        """Print current progress"""
        pct = (self.completed / self.total) * 100
        elapsed = time.time() - self.start_time
        rate = self.completed / elapsed if elapsed > 0 else 0
        remaining = (self.total - self.completed) / rate if rate > 0 else 0
        
        print(f"📊 Progress: {self.completed}/{self.total} ({pct:.1f}%) | "
              f"⏱️  {elapsed/60:.1f}m elapsed | "
              f"🎯 {remaining/60:.1f}m remaining | "
              f"❌ {self.failed} failed")
    
    def print_summary(self):
        """Print final summary"""
        elapsed = time.time() - self.start_time
        print("\n" + "=" * 60)
        print("✅ GENERATION COMPLETE")
        print(f"📊 Total: {self.total} files")
        print(f"✅ Success: {self.completed} files")
        print(f"❌ Failed: {self.failed} files")
        print(f"⏱️  Time: {elapsed/60:.1f} minutes")
        print(f"⚡ Rate: {self.completed/elapsed:.1f} files/second")
        print("=" * 60)

def ensure_directory(path):
    """Create directory if it doesn't exist"""
    path.mkdir(parents=True, exist_ok=True)

def generate_audio(text, voice, output_path, max_retries=2):
    """
    Generate audio using Kokoro CLI
    
    Args:
        text: Text to synthesize
        voice: Kokoro voice code (af_sky, af_bella, am_adam)
        output_path: Full path to output MP3 file
        max_retries: Number of retry attempts
    
    Returns:
        bool: Success status
    """
    for attempt in range(max_retries):
        try:
            # Kokoro command: kokoro <text> --voice <voice> --output <file>
            cmd = [
                KOKORO_CLI,
                text,
                "--voice", KOKORO_VOICES[voice],
                "--output", str(output_path),
                "--speed", "1.0",
                "--format", "mp3"
            ]
            
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=30,  # 30 second timeout per file
                check=False
            )
            
            if result.returncode == 0 and output_path.exists():
                return True
            
            if attempt < max_retries - 1:
                print(f"⚠️  Retry {attempt + 1}/{max_retries}: {output_path.name}")
                time.sleep(1)
        
        except subprocess.TimeoutExpired:
            print(f"⏱️  Timeout generating: {output_path.name}")
        except Exception as e:
            print(f"❌ Error generating {output_path.name}: {e}")
    
    return False

def generate_batch(tasks, output_base, resume_from=0):
    """
    Generate all audio files from tasks list
    
    Args:
        tasks: List of task dicts from JSON
        output_base: Base output directory
        resume_from: Task index to resume from (for interrupted runs)
    """
    total = len(tasks)
    tracker = ProgressTracker(total)
    
    print(f"🚀 Starting batch generation: {total} files")
    print(f"📁 Output: {output_base}")
    print(f"⏭️  Resume from: Task #{resume_from + 1}")
    print("=" * 60)
    
    failed_tasks = []
    
    for idx, task in enumerate(tasks):
        if idx < resume_from:
            continue
        
        # Build output path
        week_folder = f"week{task['week']}"
        if task['mode'] == 'easy':
            week_folder += "_easy"
        
        output_dir = output_base / week_folder
        ensure_directory(output_dir)
        
        output_path = output_dir / task['filename']
        
        # Skip if file already exists (resume support)
        if output_path.exists():
            file_size = output_path.stat().st_size
            if file_size > 1000:  # At least 1KB
                tracker.update(success=True)
                continue
        
        # Generate
        success = generate_audio(
            text=task['text'],
            voice=task['voice'],
            output_path=output_path
        )
        
        tracker.update(success=success)
        
        if not success:
            failed_tasks.append({
                'index': idx,
                'task': task,
                'output': str(output_path)
            })
        
        # Small delay to avoid overwhelming system
        time.sleep(0.1)
    
    tracker.print_summary()
    
    # Save failed tasks for retry
    if failed_tasks:
        failed_file = ROOT / "tools/tts_failed_tasks.json"
        failed_file.write_text(
            json.dumps(failed_tasks, indent=2, ensure_ascii=False),
            encoding='utf-8'
        )
        print(f"\n⚠️  Failed tasks saved to: {failed_file.relative_to(ROOT)}")
        print(f"   Run again with --retry to regenerate failed files")

def check_kokoro_available():
    """Check if Kokoro CLI is available"""
    try:
        result = subprocess.run(
            [KOKORO_CLI, "--version"],
            capture_output=True,
            timeout=5
        )
        return result.returncode == 0
    except:
        return False

def main():
    """Main generation workflow"""
    print("🎵 KOKORO TTS BATCH GENERATOR")
    print("=" * 60)
    
    # Check Kokoro availability
    if not check_kokoro_available():
        print("❌ ERROR: Kokoro CLI not found!")
        print("   Install from: https://github.com/remsky/Kokoro-FastAPI")
        print("   Or ensure 'kokoro' is in your PATH")
        return
    
    print("✅ Kokoro CLI detected")
    
    # Load tasks
    if not TASKS_FILE.exists():
        print(f"❌ ERROR: Tasks file not found: {TASKS_FILE}")
        print("   Run extract_tts_text.py first!")
        return
    
    print(f"📂 Loading tasks from: {TASKS_FILE.relative_to(ROOT)}")
    
    with open(TASKS_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    tasks = data['tasks']
    
    print(f"📊 Loaded {len(tasks)} tasks")
    print(f"📅 Generated: {data.get('generated_at', 'Unknown')}")
    print(f"🎤 Voices: {', '.join(KOKORO_VOICES.keys())}")
    print()
    
    # Confirm before starting
    response = input("🚦 Start generation? (y/n): ").strip().lower()
    if response != 'y':
        print("❌ Cancelled")
        return
    
    # Create output directory
    ensure_directory(OUTPUT_BASE)
    
    # Start generation
    generate_batch(tasks, OUTPUT_BASE, resume_from=0)
    
    print("\n✅ DONE! Audio files are in:")
    print(f"   {OUTPUT_BASE.relative_to(ROOT)}")
    print("\n📤 Next step: Run upload_to_r2.sh to deploy to CDN")

if __name__ == '__main__':
    main()
