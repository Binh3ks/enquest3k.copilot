#!/usr/bin/env python3
"""
Targeted Production Generator Script for Week 36 (New Words & Word Power)
- Engine: Google AI Studio Imagen 3 (imagen-3.0-generate-002)
- Resolution: 1024x1024 (aspectRatio 1:1)
- Prompt Standard: 100% RAW string prompts from week_36_image_prompts.txt
- Quota Enforcement: Strict Exponential Backoff (60s-120s) with 0 third-party fallbacks
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
        env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
        if os.path.exists(env_path):
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    if line.startswith("VITE_GEMINI_API_KEY=") or line.startswith("GEMINI_API_KEY="):
                        val = line.split("=", 1)[1].strip()
                        if val and not val.startswith("AQ."):
                            api_key = val
    return api_key

def parse_w36_prompts():
    filepath = "Production_FINAL_DEPRECATED/IMAGE PROMPTS/week_36_image_prompts.txt"
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
                full_path = os.path.join("public/images/week36", filename)
                items.append((full_path, prompt))
    return items

def generate_w36_card(api_key, prompt, output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:predict?key={api_key}"
    
    payload = {
        "instances": [{"prompt": prompt}],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": "1:1",
            "outputOptions": {"mimeType": "image/jpeg"}
        }
    }
    
    backoff = 60
    max_retries = 3
    
    for attempt in range(max_retries):
        try:
            resp = requests.post(api_url, json=payload, timeout=45)
            if resp.status_code == 200:
                data = resp.json()
                predictions = data.get("predictions", [])
                if predictions:
                    img_b64 = predictions[0].get("bytesBase64Encoded")
                    if img_b64:
                        raw_bytes = base64.b64decode(img_b64)
                        with open(output_path, "wb") as f:
                            f.write(raw_bytes)
                        print(f"✅ Saved 1024x1024 Imagen 3 JPEG ({len(raw_bytes)} B) -> {output_path}")
                        return True
            elif resp.status_code in (429, 403):
                print(f"⚠️ Google AI Studio API HTTP {resp.status_code} (Quota Exhausted / Permission Denied).")
                print(f"   Sleeping {backoff}s (Attempt {attempt+1}/{max_retries})...")
                time.sleep(backoff)
                backoff = min(backoff * 2, 120)
            else:
                print(f"❌ Error HTTP {resp.status_code}: {resp.text[:200]}")
                time.sleep(10)
        except Exception as e:
            print(f"⚠️ Connection exception for {output_path}: {e}. Sleeping {backoff}s...")
            time.sleep(backoff)
            
    print(f"❌ STOPPED: Quota exhausted for {output_path}. Please update GEMINI_API_KEY in .env or wait for quota reset.")
    return False

def main():
    api_key = get_api_key()
    if not api_key:
        print("❌ CRITICAL: Missing GEMINI_API_KEY. Please set a valid Google AI Studio API Key in .env.")
        return
        
    items = parse_w36_prompts()
    print(f"🚀 Generating {len(items)} Week 36 Flashcards using Google AI Studio Imagen 3 ({MODEL_NAME}, 1024x1024)...")
    
    success = 0
    for idx, (filepath, prompt) in enumerate(items, start=1):
        print(f"[{idx}/{len(items)}] Generating {filepath}...")
        ok = generate_w36_card(api_key, prompt, filepath)
        if ok:
            success += 1
        else:
            print("⚠️ Stopping batch execution due to Google AI Studio Quota limit.")
            break
        time.sleep(2.0)
        
    print(f"🎉 Week 36 Imagen 3 Flashcards run finished ({success}/{len(items)} generated).")

if __name__ == '__main__':
    main()
