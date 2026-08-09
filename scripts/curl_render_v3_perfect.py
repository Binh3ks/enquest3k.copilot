#!/usr/bin/env python3
"""
Production Image Generator Script for Engquest3k
- Provider: Google AI Studio (Imagen 3 Direct Engine)
- Model: imagen-3.0-generate-002
- Resolution: 1024x1024 (aspect_ratio 1:1)
- Prompt Standard: 100% RAW string prompts from image prompt text files (v3)
- Rate Limit / Quota Handling: Exponential Backoff (60s-120s) with 0 third-party fallbacks
"""

import os
import re
import time
import base64
import requests

MODEL_NAME = "imagen-3.0-generate-002"

def get_api_key():
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("VITE_GEMINI_API_KEY")
    if not api_key:
        # Fallback to key from .env
        env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
        if os.path.exists(env_path):
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    if line.startswith("VITE_GEMINI_API_KEY=") or line.startswith("GEMINI_API_KEY="):
                        val = line.split("=", 1)[1].strip()
                        if val and not val.startswith("AQ."):
                            api_key = val
    return api_key

def parse_prompt_file(filepath, week_folder):
    items = []
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            m = re.search(r'Filename:\s*([a-zA-Z0-9_]+\.jpg)\.\s*(.*)', line)
            if m:
                filename = m.group(1)
                prompt = m.group(2)
                if 'read_' in filename or 'explore_' in filename:
                    continue
                full_path = os.path.join("public/images", week_folder, filename)
                items.append((full_path, prompt))
    return items

def generate_imagen3_card(api_key, prompt, output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generate?key={api_key}"
    
    payload = {
        "prompt": prompt,
        "number_of_images": 1,
        "aspect_ratio": "1:1",
        "safety_filter_level": "block_only_high",
        "person_generation": "allow_adult"
    }
    
    backoff = 60
    max_retries = 5
    
    for attempt in range(max_retries):
        try:
            resp = requests.post(api_url, json=payload, timeout=45)
            if resp.status_code == 200:
                data = resp.json()
                images = data.get("images", [])
                if images:
                    img_b64 = images[0].get("generatedImages", [{}])[0].get("bytesBase64Encoded")
                    if img_b64:
                        raw_bytes = base64.b64decode(img_b64)
                        with open(output_path, "wb") as f:
                            f.write(raw_bytes)
                        print(f"✅ Saved 1024x1024 Imagen 3 JPEG ({len(raw_bytes)} B) -> {output_path}")
                        return True
            elif resp.status_code in (429, 403):
                print(f"⚠️ Google Imagen 3 API HTTP {resp.status_code} (Quota Exhausted/Forbidden). Sleeping {backoff}s (Attempt {attempt+1}/{max_retries})...")
                time.sleep(backoff)
                backoff = min(backoff * 2, 120)
            else:
                print(f"❌ Error HTTP {resp.status_code}: {resp.text[:200]}")
                time.sleep(10)
        except Exception as e:
            print(f"⚠️ Connection exception for {output_path}: {e}. Sleeping {backoff}s...")
            time.sleep(backoff)
            
    print(f"❌ Failed to generate {output_path} via Google Imagen 3 API. Quota exhausted or key restricted.")
    return False

def main():
    api_key = get_api_key()
    if not api_key:
        print("❌ CRITICAL: Missing GEMINI_API_KEY. Please provide a valid Google AI Studio API Key.")
        return
        
    p36 = "Production_FINAL_DEPRECATED/IMAGE PROMPTS/week_36_image_prompts.txt"
    p37 = "Production_FINAL_DEPRECATED/IMAGE PROMPTS/week_37_image_prompts.txt"
    
    items36 = parse_prompt_file(p36, "week36")
    items37 = parse_prompt_file(p37, "week37")
    all_items = items36 + items37
    
    print(f"🚀 Google AI Studio Imagen 3 ({MODEL_NAME}) Generator (1024x1024, {len(all_items)} items)...")
    
    success = 0
    for idx, (filepath, prompt) in enumerate(all_items, start=1):
        print(f"[{idx}/{len(all_items)}] Generating {filepath}...")
        ok = generate_imagen3_card(api_key, prompt, filepath)
        if ok:
            success += 1
        time.sleep(2.0)
        
    print(f"🎉 Production Imagen 3 Flashcards generation complete! ({success}/{len(all_items)} succeeded)")

if __name__ == '__main__':
    main()
