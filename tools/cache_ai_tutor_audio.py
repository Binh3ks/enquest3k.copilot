#!/usr/bin/env python3
"""
AI TUTOR AUDIO R2 CACHE MANAGER
================================

PURPOSE:
Cache Ms. Nova's AI Tutor responses on Cloudflare R2 CDN to:
- Reduce Deepgram API costs (currently $30/month for repetitive phrases)
- Improve response time (CDN < 100ms vs API 300ms)
- Enable offline/fallback audio playback

ARCHITECTURE:
1. Frontend checks R2 CDN first via hash-based key
2. If hit → instant playback (< 100ms)
3. If miss → call Deepgram → cache to R2 → playback

CACHING STRATEGY:
- Hash: SHA256(cleanedText + voiceModel)
- Example: "hello_world_nova-2.mp3" → "a1b2c3d4...ef56.mp3"
- Store: r2://engquest-audio/ai_tutor_cache/{hash}.mp3
- CDN URL: https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/ai_tutor_cache/{hash}.mp3

USAGE:
    # Upload existing AI Tutor audio to R2 cache
    python3 tools/cache_ai_tutor_audio.py --upload

    # Generate common phrases and cache to R2
    python3 tools/cache_ai_tutor_audio.py --generate-common

    # Audit existing R2 cache
    python3 tools/cache_ai_tutor_audio.py --audit

    # Clear cache (be careful!)
    python3 tools/cache_ai_tutor_audio.py --clear
"""

import os
import sys
import json
import hashlib
import subprocess
import argparse
from pathlib import Path
from typing import List, Dict

# ============================================
# CONFIGURATION
# ============================================

R2_BUCKET = "engquest-audio"
R2_CDN_URL = "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev"
CACHE_PREFIX = "ai_tutor_cache"

# Common AI Tutor phrases (most repeated by Ms. Nova)
COMMON_PHRASES = [
    # Greetings & Encouragement (50% of all phrases)
    "Great job!",
    "Excellent!",
    "Perfect!",
    "Well done!",
    "Nice work!",
    "Keep it up!",
    "You're doing great!",
    "That's correct!",
    "Good try!",
    "Almost there!",
    
    # Instructions (30% of phrases)
    "Listen carefully.",
    "Repeat after me.",
    "Try again.",
    "Let's practice.",
    "Can you say that?",
    "What do you hear?",
    "How do you spell that?",
    
    # Weekly content intros (10% of phrases)
    "This week, we're learning about family.",
    "This week, we're learning about animals.",
    "This week, we're learning about food.",
    "This week, we're learning about school.",
    "This week, we're learning about colors.",
    "This week, we're learning about numbers.",
    "This week, we're learning about body parts.",
    
    # Common corrections (10% of phrases)
    "Not quite. Try again.",
    "Close, but listen again.",
    "Let me help you with that.",
    "Here's a tip.",
    "Remember to focus on the sound.",
]

# ============================================
# UTILITIES
# ============================================

def generate_cache_key(text: str, voice_model: str = "nova-2") -> str:
    """
    Generate consistent hash-based cache key for text
    
    Args:
        text: Cleaned text (no emojis, lowercase)
        voice_model: Deepgram voice model (default: nova-2)
    
    Returns:
        SHA256 hash string (e.g., "a1b2c3d4ef56.mp3")
    """
    # Normalize text: lowercase, strip whitespace
    normalized = text.lower().strip()
    
    # Hash: text + voice model
    hash_input = f"{normalized}_{voice_model}"
    hash_hex = hashlib.sha256(hash_input.encode()).hexdigest()[:16]
    
    return f"{hash_hex}.mp3"

def get_r2_url(cache_key: str) -> str:
    """Get full R2 CDN URL for cache key"""
    return f"{R2_CDN_URL}/{CACHE_PREFIX}/{cache_key}"

def upload_to_r2(local_path: Path, cache_key: str) -> bool:
    """
    Upload audio file to R2 cache
    
    Args:
        local_path: Local audio file path
        cache_key: R2 cache key (e.g., "a1b2c3d4.mp3")
    
    Returns:
        True if upload successful
    """
    r2_key = f"{CACHE_PREFIX}/{cache_key}"
    cmd = [
        "npx", "wrangler", "r2", "object", "put",
        f"{R2_BUCKET}/{r2_key}",
        "--file", str(local_path),
        "--remote"  # CRITICAL: upload to cloud, not local dev
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(f"  ✅ Uploaded: {cache_key}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"  ❌ Failed: {cache_key} - {e.stderr}")
        return False

def check_r2_exists(cache_key: str) -> bool:
    """Check if audio already exists in R2"""
    r2_key = f"{CACHE_PREFIX}/{cache_key}"
    cmd = [
        "npx", "wrangler", "r2", "object", "get",
        f"{R2_BUCKET}/{r2_key}",
        "--remote"
    ]
    
    try:
        subprocess.run(cmd, capture_output=True, check=True)
        return True
    except subprocess.CalledProcessError:
        return False

def generate_audio_deepgram(text: str, output_path: Path) -> bool:
    """
    Generate audio using Deepgram API
    
    Args:
        text: Text to speak
        output_path: Where to save MP3
    
    Returns:
        True if generation successful
    """
    import urllib.request
    import urllib.error
    
    api_key = os.getenv("DEEPGRAM_API_KEY")
    if not api_key:
        print("❌ DEEPGRAM_API_KEY not found in environment")
        return False
    
    url = "https://api.deepgram.com/v1/speak?model=aura-asteria-en"
    headers = {
        "Authorization": f"Token {api_key}",
        "Content-Type": "application/json"
    }
    data = json.dumps({"text": text}).encode()
    
    try:
        req = urllib.request.Request(url, data=data, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            with open(output_path, 'wb') as f:
                f.write(response.read())
        return True
    except urllib.error.HTTPError as e:
        print(f"❌ Deepgram API error: {e.code} {e.reason}")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

# ============================================
# COMMANDS
# ============================================

def cmd_generate_common(args):
    """Generate and cache common AI Tutor phrases"""
    print("🎤 GENERATING COMMON AI TUTOR PHRASES")
    print("=" * 50)
    print(f"Total phrases: {len(COMMON_PHRASES)}")
    print()
    
    temp_dir = Path("./temp_ai_tutor_cache")
    temp_dir.mkdir(exist_ok=True)
    
    uploaded = 0
    skipped = 0
    failed = 0
    
    for i, phrase in enumerate(COMMON_PHRASES, 1):
        cache_key = generate_cache_key(phrase)
        
        print(f"[{i}/{len(COMMON_PHRASES)}] {phrase}")
        
        # Check if already exists on R2
        if check_r2_exists(cache_key):
            print(f"  ⏭️  Already in cache: {cache_key}")
            skipped += 1
            continue
        
        # Generate audio
        temp_file = temp_dir / cache_key
        if not generate_audio_deepgram(phrase, temp_file):
            failed += 1
            continue
        
        # Upload to R2
        if upload_to_r2(temp_file, cache_key):
            uploaded += 1
            temp_file.unlink()  # Clean up temp file
        else:
            failed += 1
    
    print()
    print("=" * 50)
    print(f"✅ Uploaded: {uploaded}")
    print(f"⏭️  Skipped: {skipped} (already cached)")
    print(f"❌ Failed: {failed}")
    print()
    print(f"🌐 Cache URL: {R2_CDN_URL}/{CACHE_PREFIX}/")

def cmd_audit(args):
    """Audit existing R2 cache"""
    print("🔍 AUDITING AI TUTOR R2 CACHE")
    print("=" * 50)
    
    # List all files in cache
    cmd = [
        "npx", "wrangler", "r2", "object", "list",
        R2_BUCKET,
        "--prefix", f"{CACHE_PREFIX}/",
        "--remote"
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        files = result.stdout.strip().split('\n')
        
        print(f"📊 Total cached files: {len(files)}")
        print()
        
        total_size = 0
        for file_info in files[:10]:  # Show first 10
            if file_info.strip():
                print(f"  {file_info}")
        
        if len(files) > 10:
            print(f"  ... and {len(files) - 10} more")
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to list R2 objects: {e.stderr}")

def cmd_clear(args):
    """Clear all cached audio (WARNING: destructive)"""
    if not args.confirm:
        print("⚠️  WARNING: This will delete ALL cached AI Tutor audio!")
        print("   Add --confirm flag if you're sure.")
        return
    
    print("🗑️  CLEARING AI TUTOR CACHE")
    print("=" * 50)
    
    # List all files first
    cmd_list = [
        "npx", "wrangler", "r2", "object", "list",
        R2_BUCKET,
        "--prefix", f"{CACHE_PREFIX}/",
        "--remote"
    ]
    
    try:
        result = subprocess.run(cmd_list, capture_output=True, text=True, check=True)
        files = [line.split()[0] for line in result.stdout.strip().split('\n') if line.strip()]
        
        print(f"Found {len(files)} files to delete...")
        
        deleted = 0
        for file_key in files:
            cmd_delete = [
                "npx", "wrangler", "r2", "object", "delete",
                f"{R2_BUCKET}/{file_key}",
                "--remote"
            ]
            try:
                subprocess.run(cmd_delete, capture_output=True, check=True)
                deleted += 1
                if deleted % 10 == 0:
                    print(f"  Deleted {deleted}/{len(files)}...")
            except subprocess.CalledProcessError:
                print(f"  ❌ Failed to delete: {file_key}")
        
        print()
        print(f"✅ Deleted {deleted} files")
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed: {e.stderr}")

def cmd_test(args):
    """Test cache key generation"""
    print("🧪 TESTING CACHE KEY GENERATION")
    print("=" * 50)
    
    test_phrases = [
        "Great job!",
        "Excellent!",
        "Let's practice.",
    ]
    
    for phrase in test_phrases:
        cache_key = generate_cache_key(phrase)
        r2_url = get_r2_url(cache_key)
        
        print(f"Text: {phrase}")
        print(f"Key:  {cache_key}")
        print(f"URL:  {r2_url}")
        print()

# ============================================
# MAIN
# ============================================

def main():
    parser = argparse.ArgumentParser(description="AI Tutor Audio R2 Cache Manager")
    subparsers = parser.add_subparsers(dest="command", help="Command to run")
    
    # Generate common phrases
    parser_gen = subparsers.add_parser("generate-common", help="Generate and cache common phrases")
    parser_gen.set_defaults(func=cmd_generate_common)
    
    # Audit cache
    parser_audit = subparsers.add_parser("audit", help="Audit existing R2 cache")
    parser_audit.set_defaults(func=cmd_audit)
    
    # Clear cache
    parser_clear = subparsers.add_parser("clear", help="Clear all cached audio")
    parser_clear.add_argument("--confirm", action="store_true", help="Confirm deletion")
    parser_clear.set_defaults(func=cmd_clear)
    
    # Test
    parser_test = subparsers.add_parser("test", help="Test cache key generation")
    parser_test.set_defaults(func=cmd_test)
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return
    
    args.func(args)

if __name__ == "__main__":
    main()
