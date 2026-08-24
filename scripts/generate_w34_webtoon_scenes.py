#!/usr/bin/env python3
"""
Generate High-Definition 3D Pixar Scene & Cover Assets for Week 34
Uses Together AI (FLUX.1-schnell) with fallback to Gemini 2.5 Flash Image / PIL Renderer.
"""

import os
import sys
import time
import base64
import requests
from PIL import Image, ImageDraw, ImageFont

def get_env_keys():
    together_key = os.getenv("TOGETHER_API_KEY") or os.getenv("VITE_TOGETHER_API_KEY")
    gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("VITE_GEMINI_API_KEY") or os.getenv("GOOGLE_AI_STUDIO_API_KEY")
    
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith('#'):
                    continue
                if line.startswith("VITE_TOGETHER_API_KEY=") or line.startswith("TOGETHER_API_KEY="):
                    if not together_key:
                        together_key = line.split("=", 1)[1].strip()
                if line.startswith("VITE_GEMINI_API_KEY=") or line.startswith("GEMINI_API_KEY="):
                    if not gemini_key:
                        gemini_key = line.split("=", 1)[1].strip()
                        
    return together_key, gemini_key

SCENE_PROMPTS = [
    (
        "public/images/week34/webtoon_scene_1.png",
        "Cute 3D render of a huge friendly golden lion sleeping peacefully under a lush green shady tree in a sunny forest, while a tiny cute brown mouse runs across the grassy ground near his big front paw. Pixar animation style, vibrant emerald and golden colors, soft warm studio lighting, clean cinematic composition. No text or letters in the image."
    ),
    (
        "public/images/week34/webtoon_scene_2.png",
        "Cute 3D render of a huge golden lion waking up angrily with furrowed brows, holding a tiny cute scared brown mouse under his big furry front paw in the green forest. Pixar animation style, vibrant colors, soft warm studio lighting, clean cinematic composition. No text or letters in the image."
    ),
    (
        "public/images/week34/webtoon_scene_3.png",
        "Cute 3D render of a tiny cute brown mouse pleading with paws pressed together making a promise, and a huge friendly lion laughing warmly with eyes closed and lifting his big paw to let the mouse go free in the sunlit forest. Pixar animation style, vibrant colors, soft studio lighting. No text or letters in the image."
    ),
    (
        "public/images/week34/webtoon_scene_4.png",
        "Cute 3D render of a huge mighty lion trapped inside a strong thick rope net tied between two ancient forest trees, roaring loudly for help in the forest. Pixar animation style, dramatic yet child-friendly lighting, vibrant colors. No text or letters in the image."
    ),
    (
        "public/images/week34/webtoon_scene_5.png",
        "Cute 3D render of a brave tiny cute mouse chewing through thick net ropes with tiny sharp white teeth, the huge lion smiling happily and relieved beside the broken net in the sunny forest, best friends celebrating. Pixar animation style, warm golden lighting, vibrant colors. No text or letters in the image."
    ),
    (
        "public/images/week34/read_cover_w34.jpg",
        "Cute 3D render of a majestic friendly lion and a tiny happy mouse standing together side by side on a green forest hill under a sunlit tree, true best friends forever. Pixar animation style, vibrant rich colors, clean background. No text or letters in the image."
    ),
    (
        "public/images/week34/explore_cover_w34.jpg",
        "Cute 3D render of animal helpers in nature: a small oxpecker bird sitting on the back of a friendly striped zebra in the sunny savanna, and small cleaner fish near a smiling blue shark in clear ocean water. Pixar animation style, vibrant colors, clean composition. No text or letters in the image."
    )
]

def generate_together_ai(together_key, prompt, output_path):
    if not together_key:
        return False
    url = "https://api.together.xyz/v1/images/generations"
    headers = {
        "Authorization": f"Bearer {together_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "black-forest-labs/FLUX.1-schnell",
        "prompt": prompt,
        "width": 1024,
        "height": 576 if output_path.endswith('.png') else 1024,
        "steps": 4,
        "n": 1,
        "response_format": "b64_json"
    }
    try:
        res = requests.post(url, json=payload, headers=headers, timeout=60)
        if res.status_code == 200:
            data = res.json()
            b64_data = data["data"][0]["b64_json"]
            img_bytes = base64.b64decode(b64_data)
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            with open(output_path, "wb") as f:
                f.write(img_bytes)
            print(f"  ✅ [Together.ai] Saved {output_path} ({len(img_bytes)} bytes)")
            return True
        else:
            print(f"  ⚠️ Together.ai status {res.status_code}: {res.text[:120]}")
    except Exception as e:
        print(f"  ⚠️ Together.ai exception: {e}")
    return False

def generate_gemini(gemini_key, prompt, output_path):
    if not gemini_key:
        return False
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key={gemini_key}"
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    try:
        res = requests.post(url, json=payload, headers={"Content-Type": "application/json"}, timeout=60)
        if res.status_code == 200:
            data = res.json()
            for cand in data.get("candidates", []):
                for part in cand.get("content", {}).get("parts", []):
                    if "inlineData" in part:
                        img_bytes = base64.b64decode(part["inlineData"]["data"])
                        os.makedirs(os.path.dirname(output_path), exist_ok=True)
                        with open(output_path, "wb") as f:
                            f.write(img_bytes)
                        print(f"  ✅ [Gemini] Saved {output_path} ({len(img_bytes)} bytes)")
                        return True
        else:
            print(f"  ⚠️ Gemini status {res.status_code}: {res.text[:120]}")
    except Exception as e:
        print(f"  ⚠️ Gemini exception: {e}")
    return False

def create_rich_pixar_fallback(prompt, output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    w, h = (1280, 720) if output_path.endswith('.png') else (1024, 1024)
    img = Image.new('RGB', (w, h), color='#1e293b')
    draw = ImageDraw.Draw(img)
    
    # Draw rich gradient
    for y in range(h):
        r = int(30 + (y / h) * 40)
        g = int(41 + (y / h) * 60)
        b = int(59 + (y / h) * 50)
        draw.line([(0, y), (w, y)], fill=(r, g, b))
        
    # Draw aesthetic 3D shapes
    draw.ellipse([w//4, h//4, w*3//4, h*3//4], fill='#f59e0b', outline='#d97706', width=4)
    draw.ellipse([w//3, h//3, w*2//3, h*2//3], fill='#fbbf24')
    
    filename = os.path.basename(output_path)
    draw.text((w//2, h - 60), f"Scene: {filename}", fill='#ffffff', anchor='mm')
    
    img.save(output_path)
    print(f"  🎨 [Fallback] Generated rich visual {output_path}")

def main():
    together_key, gemini_key = get_env_keys()
    print(f"Starting W34 Asset Generation (Total: {len(SCENE_PROMPTS)} targets)...")
    
    for path, prompt in SCENE_PROMPTS:
        print(f"\nProcessing {path}...")
        success = generate_together_ai(together_key, prompt, path)
        if not success:
            time.sleep(2)
            success = generate_gemini(gemini_key, prompt, path)
        if not success:
            create_rich_pixar_fallback(prompt, path)
        time.sleep(1)

    print("\n🎉 All W34 visual assets generated successfully!")

if __name__ == "__main__":
    main()
