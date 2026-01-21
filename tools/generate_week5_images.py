#!/usr/bin/env python3
"""
Generate Week 5 images following Asset Inventory.txt exactly:
- 15 images per mode (Advanced & Easy)
- 10 vocab: {word}.jpg
- 3 word_power: wordpower_{phrase}.jpg  
- 2 covers: read_cover_w05.jpg, explore_cover_w05.jpg
"""

import os
import time
import base64
import requests
from pathlib import Path

# Load API key
api_key = os.getenv('GEMINI_API_KEY') or os.getenv('VITE_GEMINI_API_KEY')
if not api_key:
    print("❌ Missing GEMINI_API_KEY")
    exit(1)

API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generate?key={api_key}"

# Advanced Mode Vocab (10 words from week_05/vocab.js)
ADVANCED_VOCAB = [
    "sofa", "fridge", "lamp", "mirror", "rug",
    "shelf", "cabinet", "dishes", "furniture", "upstairs"
]

# Easy Mode Vocab (10 words from week_05_easy/vocab.js)
EASY_VOCAB = [
    "bedroom", "kitchen", "bathroom", "living room", "bed",
    "chair", "table", "house", "mystery", "explore"
]

# Advanced Word Power (3 phrases)
ADVANCED_WORDPOWER = [
    "sit_on_the_sofa",
    "open_the_fridge", 
    "turn_on_the_lamp"
]

# Easy Word Power (3 phrases)
EASY_WORDPOWER = [
    "go_to_bed",
    "sit_on_a_chair",
    "eat_at_the_table"
]

def generate_image(prompt, output_path):
    """Generate image using Gemini Imagen 3.0"""
    if os.path.exists(output_path) and os.path.getsize(output_path) > 0:
        print(f"  ⏭️  {os.path.basename(output_path)} exists, skipping...")
        return True
    
    payload = {
        "prompt": prompt,
        "number_of_images": 1,
        "aspect_ratio": "1:1",
        "safety_filter_level": "block_only_high",
        "person_generation": "allow_adult"
    }
    
    try:
        response = requests.post(API_URL, json=payload, timeout=30)
        data = response.json()
        
        if 'images' in data and len(data['images']) > 0:
            img_data = data['images'][0].get('generatedImages', [{}])[0].get('bytesBase64Encoded')
            if img_data:
                with open(output_path, 'wb') as f:
                    f.write(base64.b64decode(img_data))
                print(f"  ✅ {os.path.basename(output_path)}")
                return True
        
        print(f"  ❌ {os.path.basename(output_path)} - No data")
        return False
        
    except Exception as e:
        print(f"  ❌ {os.path.basename(output_path)} - {str(e)}")
        return False

def main():
    print("🍌 WEEK 5 IMAGE GENERATOR (Asset Inventory Compliant)")
    print("=" * 60)
    
    base_adv = Path("public/images/week5")
    base_easy = Path("public/images/week5_easy")
    base_adv.mkdir(parents=True, exist_ok=True)
    base_easy.mkdir(parents=True, exist_ok=True)
    
    total = 0
    
    # ADVANCED MODE
    print("\n📂 ADVANCED MODE (15 images)")
    print("-" * 60)
    
    # 1. Vocab (10)
    for word in ADVANCED_VOCAB:
        filename = f"{word.replace(' ', '_')}.jpg"
        prompt = f"simple educational illustration of {word}, cartoon style, white background"
        generate_image(prompt, base_adv / filename)
        total += 1
        time.sleep(2)
    
    # 2. Word Power (3)
    for phrase in ADVANCED_WORDPOWER:
        filename = f"wordpower_{phrase}.jpg"
        prompt_text = phrase.replace('_', ' ')
        prompt = f"educational illustration showing '{prompt_text}', cartoon style for kids"
        generate_image(prompt, base_adv / filename)
        total += 1
        time.sleep(2)
    
    # 3. Covers (2)
    generate_image("The Mystery House storybook cover, kids illustration", base_adv / "read_cover_w05.jpg")
    total += 1
    time.sleep(2)
    generate_image("Educational poster about house and furniture, colorful", base_adv / "explore_cover_w05.jpg")
    total += 1
    time.sleep(2)
    
    # EASY MODE
    print("\n📂 EASY MODE (15 images)")
    print("-" * 60)
    
    # 1. Vocab (10)
    for word in EASY_VOCAB:
        filename = f"{word.replace(' ', '_')}.jpg"
        prompt = f"simple educational illustration of {word}, cartoon style, white background, easy for kids"
        generate_image(prompt, base_easy / filename)
        total += 1
        time.sleep(2)
    
    # 2. Word Power (3)
    for phrase in EASY_WORDPOWER:
        filename = f"wordpower_{phrase}.jpg"
        prompt_text = phrase.replace('_', ' ')
        prompt = f"simple educational illustration showing '{prompt_text}', cartoon style for young kids"
        generate_image(prompt, base_easy / filename)
        total += 1
        time.sleep(2)
    
    # 3. Covers (2)
    generate_image("My House storybook cover, simple kids illustration", base_easy / "read_cover_w05.jpg")
    total += 1
    time.sleep(2)
    generate_image("Simple educational poster about my house, colorful for kids", base_easy / "explore_cover_w05.jpg")
    total += 1
    
    print("\n" + "=" * 60)
    print(f"✅ COMPLETED! Generated {total}/30 images")
    print(f"   - Advanced: public/images/week5/ (15 files)")
    print(f"   - Easy: public/images/week5_easy/ (15 files)")
    print("=" * 60)

if __name__ == "__main__":
    main()
