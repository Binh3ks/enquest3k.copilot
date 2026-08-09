#!/usr/bin/env python3
"""
Dual-Provider Production Image Generator Script for Engquest3k
- Primary Provider: Together.ai (black-forest-labs/FLUX.1-schnell)
- Fallback Provider: Google AI Studio (imagen-3.0-generate-002 / gemini-2.5-flash-image)
- Resolution: High-Definition 1024x1024
- Prompt Standard: 100% RAW string prompts (zero backend mutations)
- Zero third-party / Pollinations references
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

def parse_prompt_file(filepath, week_folder):
    items = []
    if not os.path.exists(filepath):
        print(f"⚠️ Warning: Prompt file {filepath} not found.")
        return items
        
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
                    print(f"🎉 [PRIMARY: Together.ai FLUX.1-schnell] Saved 1024x1024 ({len(img_bytes)} B) -> {output_path}")
                    return True
        print(f"⚠️ [Primary: Together.ai] HTTP {resp.status_code}: {resp.text[:150]}")
    except Exception as e:
        print(f"⚠️ [Primary: Together.ai] Exception: {e}")
    return False

def generate_google_fallback(gemini_key, prompt, output_path):
    print(f"🔄 Switching to [FALLBACK: Google AI Studio Imagen 3 / Gemini] for {output_path}...")
    models = ["gemini-2.5-flash-image", "imagen-3.0-generate-002"]
    
    for model_name in models:
        if "imagen" in model_name:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:predict?key={gemini_key}"
            payload = {
                "instances": [{"prompt": prompt}],
                "parameters": {"sampleCount": 1, "aspectRatio": "1:1", "outputOptions": {"mimeType": "image/jpeg"}}
            }
        else:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={gemini_key}"
            payload = {"contents": [{"parts": [{"text": prompt}]}]}
            
        backoff = 60
        for attempt in range(2):
            try:
                resp = requests.post(url, json=payload, timeout=45)
                if resp.status_code == 200:
                    data = resp.json()
                    if "imagen" in model_name:
                        preds = data.get("predictions", [])
                        if preds and "bytesBase64Encoded" in preds[0]:
                            raw_bytes = base64.b64decode(preds[0]["bytesBase64Encoded"])
                            with open(output_path, "wb") as f:
                                f.write(raw_bytes)
                            print(f"✅ [FALLBACK: Google AI Studio ({model_name})] Saved 1024x1024 ({len(raw_bytes)} B) -> {output_path}")
                            return True
                    else:
                        cands = data.get("candidates", [])
                        if cands:
                            parts = cands[0].get("content", {}).get("parts", [])
                            for p in parts:
                                if "inlineData" in p:
                                    raw_bytes = base64.b64decode(p["inlineData"]["data"])
                                    with open(output_path, "wb") as f:
                                        f.write(raw_bytes)
                                    print(f"✅ [FALLBACK: Google AI Studio ({model_name})] Saved 1024x1024 ({len(raw_bytes)} B) -> {output_path}")
                                    return True
                elif resp.status_code in (429, 403):
                    print(f"⚠️ [Fallback: Google {model_name}] HTTP {resp.status_code} Quota. Sleeping {backoff}s retry {attempt+1}/2...")
                    time.sleep(backoff)
            except Exception as e:
                print(f"⚠️ [Fallback: Google {model_name}] Exception: {e}")
                time.sleep(5)
    print(f"❌ [FALLBACK FAILED] Could not generate {output_path} via Google AI Studio.")
    return False

def generate_dual_image(together_key, gemini_key, prompt, output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Step 1: Primary Together.ai (FLUX.1-schnell)
    if together_key:
        ok = generate_together_ai(together_key, prompt, output_path)
        if ok:
            return True
            
    # Step 2: Fallback Google AI Studio (Imagen 3 / Gemini)
    if gemini_key:
        ok = generate_google_fallback(gemini_key, prompt, output_path)
        if ok:
            return True
            
    print(f"❌ Critical Failure: Both Primary (Together.ai) and Fallback (Google AI Studio) failed for {output_path}.")
    return False

def main():
    together_key, gemini_key = get_env_keys()
    print("🔑 Loaded API Keys:")
    print(f"   - Together.ai Key: {'✅ Found (' + together_key[:8] + '...)' if together_key else '❌ Missing'}")
    print(f"   - Gemini Key:     {'✅ Found (' + gemini_key[:8] + '...)' if gemini_key else '❌ Missing'}")
    
    p36 = "Production_FINAL_DEPRECATED/IMAGE PROMPTS/week_36_image_prompts.txt"
    p37 = "Production_FINAL_DEPRECATED/IMAGE PROMPTS/week_37_image_prompts.txt"
    
    items36 = parse_prompt_file(p36, "week36")
    items37 = parse_prompt_file(p37, "week37")
    all_items = items36 + items37
    
    print(f"🚀 Dual-Provider Generator (Together.ai FLUX.1 -> Google Imagen 3) for {len(all_items)} items...")
    
    success = 0
    for idx, (filepath, prompt) in enumerate(all_items, start=1):
        print(f"\n[{idx}/{len(all_items)}] Processing {filepath}...")
        ok = generate_dual_image(together_key, gemini_key, prompt, filepath)
        if ok:
            success += 1
        time.sleep(1.0)
        
    print(f"\n🎉 Dual-Provider Generation complete! ({success}/{len(all_items)} generated).")

if __name__ == '__main__':
    main()
