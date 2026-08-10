#!/usr/bin/env python3
"""
Batch Generator for Week 36 (v6 Rich Context Standard)
- Provider: Primary Together.ai (black-forest-labs/FLUX.1-schnell) -> Fallback Google AI Studio
- Target: All 31 files (3 Covers + 20 Vocab + 8 Word Power)
- Prompt: 100% RAW string prompts from week_36_image_prompts.txt (v6 Rich Context)
- Output: 1024x1024 High Quality JPEGs overwritten to public/images/week36/
"""

import os
import re
import time
import base64
import requests

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

def parse_w36_v6_prompts():
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
                full_path = os.path.join("public/images/week36", filename)
                items.append((full_path, prompt))
    return items

def generate_together_ai(together_key, prompt, output_path):
    url = "https://api.together.xyz/v1/images/generations"
    headers = {
        "Authorization": f"Bearer {together_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "black-forest-labs/FLUX.1-schnell",
        "prompt": prompt,
        "width": 1024,
        "height": 1024,
        "steps": 4,
        "n": 1,
        "response_format": "b64_json"
    }
    try:
        resp = requests.post(url, json=payload, headers=headers, timeout=35)
        if resp.status_code == 200:
            data = resp.json()
            items = data.get("data", [])
            if items and "b64_json" in items[0]:
                img_bytes = base64.b64decode(items[0]["b64_json"])
                if len(img_bytes) > 20000:
                    with open(output_path, "wb") as f:
                        f.write(img_bytes)
                    print(f"🎉 [Together.ai FLUX.1-schnell] Saved 1024x1024 ({len(img_bytes)} B) -> {output_path}")
                    return True, len(img_bytes)
        print(f"⚠️ [Together.ai] HTTP {resp.status_code}: {resp.text[:150]}")
    except Exception as e:
        print(f"⚠️ [Together.ai] Exception: {e}")
    return False, 0

def generate_google_fallback(gemini_key, prompt, output_path):
    print(f"🔄 Switching to [FALLBACK: Google AI Studio] for {output_path}...")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key={gemini_key}"
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    try:
        resp = requests.post(url, json=payload, timeout=45)
        if resp.status_code == 200:
            data = resp.json()
            cands = data.get("candidates", [])
            if cands:
                parts = cands[0].get("content", {}).get("parts", [])
                for p in parts:
                    if "inlineData" in p:
                        raw_bytes = base64.b64decode(p["inlineData"]["data"])
                        with open(output_path, "wb") as f:
                            f.write(raw_bytes)
                        print(f"✅ [FALLBACK: Google AI Studio] Saved 1024x1024 ({len(raw_bytes)} B) -> {output_path}")
                        return True, len(raw_bytes)
    except Exception as e:
        print(f"⚠️ [Fallback Google] Exception: {e}")
    return False, 0

def main():
    together_key, gemini_key = get_env_keys()
    items = parse_w36_v6_prompts()
    print(f"🚀 Generating all {len(items)} Week 36 images (v6 Rich Context) using Together.ai FLUX.1-schnell...")
    
    results = []
    for idx, (filepath, prompt) in enumerate(items, start=1):
        print(f"[{idx}/{len(items)}] Processing {os.path.basename(filepath)}...")
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        ok, size = generate_together_ai(together_key, prompt, filepath)
        if not ok and gemini_key:
            ok, size = generate_google_fallback(gemini_key, prompt, filepath)
        if ok:
            results.append((os.path.basename(filepath), size))
        time.sleep(0.5)
        
    print("\n================ RENDER REPORT W36 (v6 Rich Context) ================")
    for fname, size in results:
        print(f"  - {fname:<25}: {size:7d} B ({size/1024:.1f} KB)")
    print(f"Total: {len(results)}/{len(items)} rendered successfully.")

if __name__ == '__main__':
    main()
