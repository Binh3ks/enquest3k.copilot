#!/usr/bin/env python3
"""
Fix Week 2 audio generation and path updates
1. Generate all audio files using Google TTS
2. Update paths from /audio/week2/ to /audio/week_02/
3. Replace placeholders with real file names
"""

import os
import re
import json
import requests
import base64
from pathlib import Path
from dotenv import load_dotenv

# Load environment
load_dotenv()

GOOGLE_TTS_URL = "https://texttospeech.googleapis.com/v1/text:synthesize"
GOOGLE_API_KEY = os.getenv("GOOGLE_TTS_API_KEY")

if not GOOGLE_API_KEY:
    print("❌ Error: GOOGLE_TTS_API_KEY not found")
    exit(1)

# Voice configuration
VOICES = {
    "advanced": "en-US-Journey-D",  # Male
    "easy": "en-US-Journey-F"        # Female
}

def synthesize_speech(text, voice_name, output_path):
    """Generate audio using Google TTS REST API"""
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
    
    try:
        response = requests.post(
            GOOGLE_TTS_URL,
            json=payload,
            params={"key": GOOGLE_API_KEY}
        )
        response.raise_for_status()
        
        result = response.json()
        audio_content = base64.b64decode(result["audioContent"])
        
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, "wb") as f:
            f.write(audio_content)
        
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def extract_text_from_file(file_path):
    """Extract all text content that needs audio"""
    content = file_path.read_text(encoding='utf-8')
    texts = []
    
    # Pattern 1: content_en in read.js
    match = re.search(r'content_en:\s*"([^"]+)"', content, re.DOTALL)
    if match:
        text = match.group(1)
        text = re.sub(r'\*\*', '', text)  # Remove bold markers
        text = re.sub(r'\\n', ' ', text)
        text = re.sub(r'\s+', ' ', text).strip()
        texts.append(("read_passage", text))
    
    # Pattern 2: vocab words (word field)
    word_pattern = r'word:\s*"([^"]+)"'
    for match in re.finditer(word_pattern, content):
        word = match.group(1)
        texts.append((f"vocab_{word}", word))
    
    # Pattern 3: vocab examples
    example_pattern = r'example:\s*"([^"]+)"'
    for idx, match in enumerate(re.finditer(example_pattern, content), 1):
        example = match.group(1)
        texts.append((f"example_{idx:02d}", example))
    
    # Pattern 4: vocab story text
    story_match = re.search(r'text:\s*"([^"]+)"', content)
    if story_match:
        story_text = story_match.group(1)
        story_text = re.sub(r'\*\*', '', story_text)
        story_text = re.sub(r'\\n', ' ', story_text)
        story_text = re.sub(r'\s+', ' ', story_text).strip()
        texts.append(("story_family", story_text))
    
    # Pattern 5: questions in ask_ai.js
    question_pattern = r'question:\s*"([^"]+)"'
    for idx, match in enumerate(re.finditer(question_pattern, content), 1):
        question = match.group(1)
        texts.append((f"question_{idx:02d}", question))
    
    # Pattern 6: answers in ask_ai.js
    answer_pattern = r'answer:\s*"([^"]+)"'
    for idx, match in enumerate(re.finditer(answer_pattern, content), 1):
        answer = match.group(1)
        texts.append((f"answer_{idx:02d}", answer))
    
    # Pattern 7: sentences in grammar.js, dictation.js, shadowing.js
    sentence_pattern = r'sentence:\s*"([^"]+)"'
    for idx, match in enumerate(re.finditer(sentence_pattern, content), 1):
        sentence = match.group(1)
        texts.append((f"sentence_{idx:02d}", sentence))
    
    # Pattern 8: passage in explore.js
    passage_match = re.search(r'passage:\s*`([^`]+)`', content)
    if passage_match:
        passage = passage_match.group(1)
        passage = re.sub(r'\*\*', '', passage)
        passage = re.sub(r'\s+', ' ', passage).strip()
        texts.append(("explore_passage", passage))
    
    # Pattern 9: instructions in writing.js
    instruction_match = re.search(r'instructions:\s*"([^"]+)"', content)
    if instruction_match:
        texts.append(("writing_instructions", instruction_match.group(1)))
    
    # Pattern 10: prompts in mindmap.js
    prompt_pattern = r'prompt:\s*"([^"]+)"'
    for idx, match in enumerate(re.finditer(prompt_pattern, content), 1):
        texts.append((f"prompt_{idx:02d}", match.group(1)))
    
    # Pattern 11: collocations in word_power.js
    collocation_pattern = r'collocation:\s*"([^"]+)"'
    for idx, match in enumerate(re.finditer(collocation_pattern, content), 1):
        if len(match.group(1)) > 3:  # Skip very short ones
            texts.append((f"collocation_{idx:02d}", match.group(1)))
    
    return texts

def main():
    root_dir = Path(__file__).parent.parent
    
    print("\n" + "="*60)
    print("🔧 Week 2 Audio Generation & Path Fix")
    print("="*60)
    
    for mode in ["advanced", "easy"]:
        print(f"\n{'='*60}")
        print(f"📁 Processing {mode.upper()} mode")
        print(f"{'='*60}")
        
        # Setup paths
        if mode == "advanced":
            data_dir = root_dir / "src" / "data" / "weeks" / "week_02"
        else:
            data_dir = root_dir / "src" / "data" / "weeks_easy" / "week_02"
        
        audio_dir = root_dir / "public" / "audio" / "week_02" / mode
        audio_dir.mkdir(parents=True, exist_ok=True)
        
        voice = VOICES[mode]
        
        # Files to process
        files = [
            "read.js",
            "vocab.js",
            "ask_ai.js",
            "grammar.js",
            "dictation.js",
            "shadowing.js",
            "explore.js",
            "writing.js",
            "logic.js",
            "mindmap.js",
            "word_power.js"
        ]
        
        total_generated = 0
        
        for file_name in files:
            file_path = data_dir / file_name
            if not file_path.exists():
                continue
            
            print(f"\n📄 {file_name}")
            texts = extract_text_from_file(file_path)
            
            if not texts:
                print(f"   ⚠️  No text found")
                continue
            
            print(f"   Found {len(texts)} text segments")
            
            for text_id, text in texts:
                if len(text) < 2:
                    continue
                
                filename = f"{text_id}.mp3"
                output_path = audio_dir / filename
                
                if output_path.exists():
                    print(f"   ⏭️  {filename} (exists)")
                    continue
                
                print(f"   🎵 Generating: {text[:50]}...")
                
                if synthesize_speech(text, voice, output_path):
                    total_generated += 1
                    size_kb = output_path.stat().st_size / 1024
                    print(f"   ✅ Saved: {filename} ({size_kb:.1f} KB)")
                else:
                    print(f"   ❌ Failed: {filename}")
        
        print(f"\n✅ {mode.upper()} mode: Generated {total_generated} audio files")
    
    print(f"\n{'='*60}")
    print("🎉 Audio generation complete!")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    main()
