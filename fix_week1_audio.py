#!/usr/bin/env python3
"""
Fix Week 1 Easy audio - Only regenerate files with "Alex" and "Lily" names
"""
import os
import sys
from pathlib import Path

# Add tools directory to path
sys.path.insert(0, str(Path(__file__).parent / 'tools'))

from generate_audio_deepgram import tts_deepgram, upload_to_r2, VOICE_MAP

# Load API key
from dotenv import load_dotenv
load_dotenv()

DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY", "")

# Output directory
OUTPUT_DIR = Path("public/audio/week1_easy")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Files to regenerate (text → filename)
FILES_TO_GENERATE = {
    # Shadowing station (use narration voice - male)
    "My name is Alex.": ("shadowing_2.mp3", "narration"),
    "My friend is Lily.": ("shadowing_5.mp3", "narration"),
    
    # Read station full text (use narration voice - male)
    "Hi! My name is Alex. I am at school. This is my desk and chair. My friend is Lily. I have a pen in my bag. I see a picture and a door. I like my classroom!": ("read_explore_main.mp3", "narration"),
}

def main():
    print("🔧 Fixing Week 1 Easy Audio (only files with Alex/Lily)")
    print(f"📁 Output: {OUTPUT_DIR}")
    print(f"🎯 Files to regenerate: {len(FILES_TO_GENERATE)}")
    print()
    
    if not DEEPGRAM_API_KEY:
        print("❌ ERROR: DEEPGRAM_API_KEY not found in .env")
        sys.exit(1)
    
    success_count = 0
    
    for text, (filename, voice_role) in FILES_TO_GENERATE.items():
        output_path = OUTPUT_DIR / filename
        voice_model = VOICE_MAP[voice_role][0]  # Get Deepgram model
        
        print(f"🎙️  Generating: {filename}")
        print(f"    Text: {text[:60]}...")
        print(f"    Voice: {voice_model}")
        
        # Generate audio
        success = tts_deepgram(text, voice_model, output_path)
        
        if success:
            file_size = output_path.stat().st_size / 1024  # KB
            print(f"    ✅ Generated ({file_size:.1f} KB)")
            
            # Upload to R2
            print(f"    📤 Uploading to R2...")
            r2_path = f"audio/week1_easy/{filename}"
            if upload_to_r2(output_path, r2_path):
                print(f"    ✅ Uploaded to R2: {r2_path}")
                success_count += 1
            else:
                print(f"    ⚠️  R2 upload failed (file generated locally)")
        else:
            print(f"    ❌ Generation failed")
        
        print()
    
    print(f"✨ Done! {success_count}/{len(FILES_TO_GENERATE)} files regenerated and uploaded")
    
    if success_count == len(FILES_TO_GENERATE):
        print("\n🎉 Success! Now tell users to:")
        print("   1. Hard refresh browser (Cmd+Shift+R)")
        print("   2. Or clear IndexedDB cache:")
        print("      DevTools → Application → IndexedDB → tts-cache → DELETE")

if __name__ == "__main__":
    main()
