#!/usr/bin/env python3
"""
Generate Week 2 Audio Files - Following Week 1 Golden Standard
126 files total in /dist/audio/week2/ (NO subfolders)
"""

import os
import sys
import json
import re
import time
from pathlib import Path
from dotenv import load_dotenv
import requests

# Load environment variables
load_dotenv()
API_KEY = os.getenv('GOOGLE_TTS_API_KEY')

if not API_KEY:
    print("❌ Error: GOOGLE_TTS_API_KEY not found in .env")
    sys.exit(1)

# Configuration
WEEK_NUM = 2
OUTPUT_DIR = f"/Users/binhnguyen/Downloads/Engquest3k/dist/audio/week{WEEK_NUM}"
DATA_DIR = f"/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks/week_0{WEEK_NUM}"

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

def text_to_speech(text, output_path):
    """Convert text to speech using Google Cloud TTS REST API"""
    url = f"https://texttospeech.googleapis.com/v1/text:synthesize?key={API_KEY}"
    
    headers = {"Content-Type": "application/json"}
    data = {
        "input": {"text": text},
        "voice": {
            "languageCode": "en-US",
            "name": "en-US-Neural2-C",  # Female child voice
            "ssmlGender": "FEMALE"
        },
        "audioConfig": {
            "audioEncoding": "MP3",
            "speakingRate": 0.9,
            "pitch": 2.0  # Higher pitch for children
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        
        if response.status_code == 200:
            audio_content = response.json().get('audioContent')
            if audio_content:
                import base64
                audio_data = base64.b64decode(audio_content)
                with open(output_path, 'wb') as f:
                    f.write(audio_data)
                print(f"✅ {os.path.basename(output_path)}")
                return True
            else:
                print(f"❌ No audio content for: {output_path}")
                return False
        elif response.status_code == 429:
            print(f"⏳ Rate limit hit, waiting 60s...")
            time.sleep(60)
            return text_to_speech(text, output_path)  # Retry
        else:
            print(f"❌ API Error {response.status_code}: {response.text[:200]}")
            return False
            
    except Exception as e:
        print(f"❌ Error generating {output_path}: {str(e)}")
        return False

def load_js_data(filepath):
    """Load and parse JavaScript data file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract export default {...}
    match = re.search(r'export\s+default\s+(\{[\s\S]*\});?\s*$', content)
    if not match:
        match = re.search(r'const\s+\w+\s*=\s*(\{[\s\S]*\});\s*export\s+default', content)
    
    if match:
        js_obj = match.group(1)
        # Convert JS to JSON
        js_obj = re.sub(r'(\w+):', r'"\1":', js_obj)  # Add quotes to keys
        js_obj = re.sub(r':\s*"([^"]*)"([,\}])', r': "\1"\2', js_obj)  # Fix quotes
        try:
            return json.loads(js_obj)
        except:
            return None
    return None

def generate_vocab_audio():
    """Generate 40 vocab audio files (10 words × 4 types)"""
    print("\n📚 VOCAB (40 files)...")
    vocab_file = os.path.join(DATA_DIR, 'vocab.js')
    
    with open(vocab_file, 'r') as f:
        content = f.read()
    
    # Extract vocab array
    vocab_match = re.search(r'vocab:\s*\[(.*?)\]', content, re.DOTALL)
    if not vocab_match:
        print("❌ Could not parse vocab.js")
        return
    
    vocab_section = vocab_match.group(1)
    
    # Extract each vocab item
    vocab_items = re.findall(r'\{(.*?)\}(?=\s*,|\s*\])', vocab_section, re.DOTALL)
    
    for item_str in vocab_items:
        word_match = re.search(r'word:\s*"([^"]+)"', item_str)
        def_en_match = re.search(r'definition_en:\s*"([^"]+)"', item_str)
        example_match = re.search(r'example:\s*"([^"]+)"', item_str)
        coll_match = re.search(r'collocation:\s*"([^"]+)"', item_str)
        
        if word_match:
            word = word_match.group(1)
            word_safe = word.replace(' ', '_')
            
            # 1. Word only
            text_to_speech(word, os.path.join(OUTPUT_DIR, f"vocab_{word_safe}.mp3"))
            time.sleep(0.5)
            
            # 2. Definition
            if def_en_match:
                text_to_speech(def_en_match.group(1), os.path.join(OUTPUT_DIR, f"vocab_def_{word_safe}.mp3"))
                time.sleep(0.5)
            
            # 3. Example
            if example_match:
                text_to_speech(example_match.group(1), os.path.join(OUTPUT_DIR, f"vocab_ex_{word_safe}.mp3"))
                time.sleep(0.5)
            
            # 4. Collocation
            if coll_match:
                text_to_speech(coll_match.group(1), os.path.join(OUTPUT_DIR, f"vocab_coll_{word_safe}.mp3"))
                time.sleep(0.5)

def generate_dictation_audio():
    """Generate 10 dictation audio files"""
    print("\n✍️ DICTATION (10 files)...")
    dictation_file = os.path.join(DATA_DIR, 'dictation.js')
    
    with open(dictation_file, 'r') as f:
        content = f.read()
    
    sentences = re.findall(r'\{\s*id:\s*(\d+),\s*text:\s*"([^"]+)"', content)
    
    for id_num, text in sentences[:10]:  # Only first 10
        text_to_speech(text, os.path.join(OUTPUT_DIR, f"dictation_{id_num}.mp3"))
        time.sleep(0.5)

def generate_mindmap_audio():
    """Generate 42 mindmap audio files (6 stems + 36 branches)"""
    print("\n🧠 MINDMAP (42 files)...")
    mindmap_file = os.path.join(DATA_DIR, 'mindmap.js')
    
    with open(mindmap_file, 'r') as f:
        content = f.read()
    
    # Extract center stems
    stems_match = re.search(r'centerStems:\s*\[(.*?)\]', content, re.DOTALL)
    if stems_match:
        stems = re.findall(r'"([^"]+)"', stems_match.group(1))
        for idx, stem in enumerate(stems, 1):
            text_to_speech(stem, os.path.join(OUTPUT_DIR, f"mindmap_stem_{idx}.mp3"))
            time.sleep(0.5)
    
    # Extract all branches
    branches_section = re.search(r'branchLabels:\s*\{(.*?)\}(?=\s*\};)', content, re.DOTALL)
    if branches_section:
        all_branches = re.findall(r'"\s*([^"]+)\s*"(?=\s*,|\s*\])', branches_section.group(1))
        # Filter out stem texts (they appear as keys)
        branches = [b for b in all_branches if not b.endswith('___.')]
        
        for idx, branch in enumerate(branches[:36], 1):  # Max 36
            text_to_speech(branch, os.path.join(OUTPUT_DIR, f"mindmap_branch_{idx}.mp3"))
            time.sleep(0.5)

def generate_shadowing_audio():
    """Generate 11 shadowing audio files (10 sentences + 1 full)"""
    print("\n🗣️ SHADOWING (11 files)...")
    shadowing_file = os.path.join(DATA_DIR, 'shadowing.js')
    
    with open(shadowing_file, 'r') as f:
        content = f.read()
    
    # Extract individual sentences
    sentences = re.findall(r'\{\s*id:\s*(\d+),\s*text:\s*"([^"]+)"', content)
    
    full_text = ""
    for id_num, text in sentences[:10]:
        text_to_speech(text, os.path.join(OUTPUT_DIR, f"shadowing_{id_num}.mp3"))
        full_text += text + " "
        time.sleep(0.5)
    
    # Full passage
    if full_text:
        text_to_speech(full_text.strip(), os.path.join(OUTPUT_DIR, "shadowing_full.mp3"))

def generate_wordpower_audio():
    """Generate 15 word power audio files (3 phrases × 5 types)"""
    print("\n💪 WORD POWER (15 files)...")
    wp_file = os.path.join(DATA_DIR, 'word_power.js')
    
    with open(wp_file, 'r') as f:
        content = f.read()
    
    # Extract word power items
    items = re.findall(r'\{(.*?)\}(?=\s*,|\s*\])', content, re.DOTALL)
    
    for item_str in items[:3]:  # 3 phrases
        word_match = re.search(r'word:\s*"([^"]+)"', item_str)
        def_match = re.search(r'definition_en:\s*"([^"]+)"', item_str)
        ex_match = re.search(r'example:\s*"([^"]+)"', item_str)
        model_match = re.search(r'model_sentence:\s*"([^"]+)"', item_str)
        coll_match = re.search(r'collocation:\s*"([^"]+)"', item_str)
        
        if word_match:
            phrase = word_match.group(1).replace(' ', '_')
            
            # 1. Phrase
            text_to_speech(word_match.group(1), os.path.join(OUTPUT_DIR, f"wordpower_{phrase}.mp3"))
            time.sleep(0.5)
            
            # 2. Definition
            if def_match:
                text_to_speech(def_match.group(1), os.path.join(OUTPUT_DIR, f"wordpower_def_{phrase}.mp3"))
                time.sleep(0.5)
            
            # 3. Example
            if ex_match:
                text_to_speech(ex_match.group(1), os.path.join(OUTPUT_DIR, f"wordpower_ex_{phrase}.mp3"))
                time.sleep(0.5)
            
            # 4. Model
            if model_match:
                text_to_speech(model_match.group(1), os.path.join(OUTPUT_DIR, f"wordpower_model_{phrase}.mp3"))
                time.sleep(0.5)
            
            # 5. Collocation
            if coll_match:
                text_to_speech(coll_match.group(1), os.path.join(OUTPUT_DIR, f"wordpower_coll_{phrase}.mp3"))
                time.sleep(0.5)

def generate_ask_ai_audio():
    """Generate 5 ask_ai audio files"""
    print("\n❓ ASK AI (5 files)...")
    ask_ai_file = os.path.join(DATA_DIR, 'ask_ai.js')
    
    with open(ask_ai_file, 'r') as f:
        content = f.read()
    
    questions = re.findall(r'question:\s*"([^"]+)"', content)
    
    for idx, question in enumerate(questions[:5], 1):
        text_to_speech(question, os.path.join(OUTPUT_DIR, f"ask_ai_{idx}.mp3"))
        time.sleep(0.5)

def generate_logic_audio():
    """Generate 5 logic audio files"""
    print("\n🧮 LOGIC (5 files)...")
    logic_file = os.path.join(DATA_DIR, 'logic.js')
    
    with open(logic_file, 'r') as f:
        content = f.read()
    
    problems = re.findall(r'problem:\s*"([^"]+)"', content)
    
    for idx, problem in enumerate(problems[:5], 1):
        text_to_speech(problem, os.path.join(OUTPUT_DIR, f"logic_{idx}.mp3"))
        time.sleep(0.5)

def generate_explore_audio():
    """Generate 1 explore audio file"""
    print("\n🔍 EXPLORE (1 file)...")
    explore_file = os.path.join(DATA_DIR, 'explore.js')
    
    with open(explore_file, 'r') as f:
        content = f.read()
    
    content_match = re.search(r'content_en:\s*"([^"]+)"', content)
    if content_match:
        text_to_speech(content_match.group(1), os.path.join(OUTPUT_DIR, "explore_main.mp3"))

def generate_read_audio():
    """Generate 1 read audio file"""
    print("\n📖 READ (1 file)...")
    read_file = os.path.join(DATA_DIR, 'read.js')
    
    with open(read_file, 'r') as f:
        content = f.read()
    
    content_match = re.search(r'content_en:\s*"([^"]+)"', content)
    if content_match:
        text_to_speech(content_match.group(1), os.path.join(OUTPUT_DIR, "read_explore_main.mp3"))

def main():
    print(f"🎵 GENERATING WEEK {WEEK_NUM} AUDIO FILES")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Target: 126 files total\n")
    
    start_time = time.time()
    
    generate_vocab_audio()          # 40 files
    generate_dictation_audio()       # 10 files
    generate_mindmap_audio()         # 42 files
    generate_shadowing_audio()       # 11 files
    generate_wordpower_audio()       # 15 files
    generate_ask_ai_audio()          # 5 files
    generate_logic_audio()           # 5 files
    generate_explore_audio()         # 1 file
    generate_read_audio()            # 1 file
    
    # Count generated files
    generated = len([f for f in os.listdir(OUTPUT_DIR) if f.endswith('.mp3')])
    
    elapsed = time.time() - start_time
    print(f"\n✅ COMPLETE!")
    print(f"Generated: {generated}/126 files")
    print(f"Time: {elapsed:.1f}s")
    
    if generated < 126:
        print(f"\n⚠️ Missing {126 - generated} files - check for errors above")

if __name__ == "__main__":
    main()
