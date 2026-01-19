#!/usr/bin/env python3
"""
Generate Week 4 Images (Advanced + Easy Mode)
Total: 28 images
- 10 vocab (Advanced)
- 10 vocab (Easy)
- 3 word_power (Advanced)
- 3 word_power (Easy)
- 2 covers already exist
"""

import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# Create directories
os.makedirs('public/images/week4', exist_ok=True)
os.makedirs('public/images/week4_easy', exist_ok=True)

print("🎨 GENERATING WEEK 4 IMAGES - ADVANCED MODE")
print("=" * 60)

# ============================================
# ADVANCED MODE - VOCAB IMAGES (10)
# ============================================
vocab_advanced = [
    ("happy", "A young child with a big smile, feeling very happy and joyful, bright sunny day, colorful background"),
    ("sad", "A child looking sad with tears, feeling down, gentle soft lighting, compassionate mood"),
    ("funny", "A child laughing at something funny, comedy scene, playful and humorous atmosphere"),
    ("friendly", "Two children being friendly and nice to each other, smiling warmly, welcoming scene"),
    ("excited", "A child jumping with excitement, very happy and energetic, dynamic action shot"),
    ("playing", "A child playing with toys or games, active and fun, colorful play environment"),
    ("reading", "A child reading a book quietly, focused and engaged, cozy reading corner"),
    ("drawing", "A child drawing with crayons or pencils, creative and artistic, art supplies visible"),
    ("singing", "A child singing happily, musical notes around, joyful performance"),
    ("dancing", "A child dancing freely, moving to music, energetic and fun movement")
]

print("\n📷 Generating 10 Vocab Images (Advanced)...")
for i, (word, prompt) in enumerate(vocab_advanced, 1):
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=f"Educational children's illustration for 6-year-olds: {prompt}. Simple, clear, child-friendly art style, bright colors, no text, safe for kids.",
            size="1024x1024",
            quality="standard",
            n=1
        )
        
        image_url = response.data[0].url
        
        # Download image
        import requests
        img_data = requests.get(image_url).content
        filename = f'public/images/week4/{word}.jpg'
        with open(filename, 'wb') as f:
            f.write(img_data)
        
        print(f"  ✅ {i}/10: {word}.jpg")
    except Exception as e:
        print(f"  ❌ {i}/10: {word} - Error: {e}")

# ============================================
# ADVANCED MODE - WORD POWER IMAGES (3)
# ============================================
word_power_advanced = [
    ("happy_face", "A child showing a happy face expression, big smile, cheerful and joyful"),
    ("feel_excited", "A child feeling very excited about something, jumping with joy"),
    ("like_reading", "A child who likes reading books, holding a favorite book happily")
]

print("\n📷 Generating 3 Word Power Images (Advanced)...")
for i, (name, prompt) in enumerate(word_power_advanced, 1):
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=f"Educational children's illustration for 6-year-olds: {prompt}. Simple, clear, child-friendly art style, bright colors, no text, safe for kids.",
            size="1024x1024",
            quality="standard",
            n=1
        )
        
        image_url = response.data[0].url
        
        # Download image
        import requests
        img_data = requests.get(image_url).content
        filename = f'public/images/week4/wp_{name}.jpg'
        with open(filename, 'wb') as f:
            f.write(img_data)
        
        print(f"  ✅ {i}/3: wp_{name}.jpg")
    except Exception as e:
        print(f"  ❌ {i}/3: wp_{name} - Error: {e}")

print("\n" + "=" * 60)
print("🎨 GENERATING WEEK 4 IMAGES - EASY MODE")
print("=" * 60)

# ============================================
# EASY MODE - VOCAB IMAGES (10)
# ============================================
vocab_easy = [
    ("happy", "A simple smiling face, very happy and joyful, basic shapes, bright yellow"),
    ("sad", "A simple sad face with tears, feeling down, soft blue tones"),
    ("funny", "A silly funny face making a joke, playful and humorous"),
    ("friendly", "Two simple smiling faces together, being friendly and nice"),
    ("excited", "A face showing excitement, eyes wide with joy, energetic"),
    ("playing", "Simple children playing with a ball, active and fun"),
    ("reading", "A child with an open book, reading quietly, simple shapes"),
    ("drawing", "A child with crayons drawing, creative and colorful"),
    ("singing", "A child singing with musical notes, joyful"),
    ("dancing", "A child dancing with simple movements, fun and happy")
]

print("\n📷 Generating 10 Vocab Images (Easy)...")
for i, (word, prompt) in enumerate(vocab_easy, 1):
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=f"Simple educational illustration for young children: {prompt}. Very simple, minimal details, bright primary colors, large clear shapes, no text, safe for kids.",
            size="1024x1024",
            quality="standard",
            n=1
        )
        
        image_url = response.data[0].url
        
        # Download image
        import requests
        img_data = requests.get(image_url).content
        filename = f'public/images/week4_easy/{word}.jpg'
        with open(filename, 'wb') as f:
            f.write(img_data)
        
        print(f"  ✅ {i}/10: {word}.jpg (Easy)")
    except Exception as e:
        print(f"  ❌ {i}/10: {word} (Easy) - Error: {e}")

# ============================================
# EASY MODE - WORD POWER IMAGES (3)
# ============================================
word_power_easy = [
    ("happy_face", "A big simple smiley face, very happy, bright yellow circle"),
    ("play_ball", "Simple stick figure playing with a ball, active and fun"),
    ("read_book", "Simple figure holding an open book, reading happily")
]

print("\n📷 Generating 3 Word Power Images (Easy)...")
for i, (name, prompt) in enumerate(word_power_easy, 1):
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=f"Very simple educational illustration for young children: {prompt}. Minimal details, bright primary colors, large clear shapes, no text, safe for kids.",
            size="1024x1024",
            quality="standard",
            n=1
        )
        
        image_url = response.data[0].url
        
        # Download image
        import requests
        img_data = requests.get(image_url).content
        filename = f'public/images/week4_easy/wp_{name}.jpg'
        with open(filename, 'wb') as f:
            f.write(img_data)
        
        print(f"  ✅ {i}/3: wp_{name}.jpg (Easy)")
    except Exception as e:
        print(f"  ❌ {i}/3: wp_{name} (Easy) - Error: {e}")

print("\n" + "=" * 60)
print("✅ COMPLETED!")
print("📊 Total Images Generated: 26")
print("   - Advanced Vocab: 10")
print("   - Advanced Word Power: 3")
print("   - Easy Vocab: 10")
print("   - Easy Word Power: 3")
print("   - Covers: 2 (already exist)")
print("=" * 60)
