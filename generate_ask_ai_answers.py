#!/usr/bin/env python3
"""
Generate Answer Audio for Ask AI Station - Week 5
Generates MP3 files for correct answers (answer_audio_url field)
"""

import os
import time
from pathlib import Path
from gtts import gTTS

# Answer texts to generate
ADVANCED_ANSWERS = [
    "Where do you sleep?",  # answer_1
    "What is in your kitchen?",  # answer_2
    "What is this?",  # answer_3
    "Can I sit on the sofa?",  # answer_4
    "Where is the bathroom?"  # answer_5
]

EASY_ANSWERS = [
    "Where do you sleep?",  # answer_1
    "What room do you like?",  # answer_2
    "What is this?",  # answer_3
    "Can I sit?",  # answer_4
    "Where is the kitchen?"  # answer_5
]

def generate_audio(text, output_path):
    """Generate MP3 from text using gTTS"""
    try:
        tts = gTTS(text=text, lang='en', slow=False)
        tts.save(output_path)
        print(f"✅ Generated: {output_path}")
        time.sleep(0.5)  # Rate limiting
        return True
    except Exception as e:
        print(f"❌ Error generating {output_path}: {e}")
        return False

def main():
    base_dir = Path(__file__).parent / "public" / "audio"
    
    # Generate Advanced mode answers
    print("\n🎯 GENERATING ADVANCED MODE ANSWERS...")
    adv_dir = base_dir / "week5"
    adv_dir.mkdir(parents=True, exist_ok=True)
    
    for i, text in enumerate(ADVANCED_ANSWERS, 1):
        output_file = adv_dir / f"ask_ai_answer_{i}.mp3"
        print(f"\n[{i}/5] Text: '{text}'")
        generate_audio(text, str(output_file))
    
    # Generate Easy mode answers
    print("\n\n🎯 GENERATING EASY MODE ANSWERS...")
    easy_dir = base_dir / "week5_easy"
    easy_dir.mkdir(parents=True, exist_ok=True)
    
    for i, text in enumerate(EASY_ANSWERS, 1):
        output_file = easy_dir / f"ask_ai_answer_{i}.mp3"
        print(f"\n[{i}/5] Text: '{text}'")
        generate_audio(text, str(output_file))
    
    print("\n\n✅ COMPLETE!")
    print(f"Generated 5 Advanced answer audio files")
    print(f"Generated 5 Easy answer audio files")
    print(f"Total: 10 answer audio files")

if __name__ == "__main__":
    main()
