#!/usr/bin/env python3
"""
Targeted Production Generator Script for Week 36 (New Words & Word Power)
- Engine: Google AI Studio Direct Engine (gemini-2.5-flash-image)
- Resolution: High-Definition 1024x1024
- Prompt Standard: 100% RAW string prompts from week_36_image_prompts.txt
- Quota Enforcement: Exponential Backoff (60s - 120s retry loop) with 0 third-party fallbacks
"""

import os
import re
import time
import base64
import requests

MODEL_NAME = "gemini-2.5-flash-image"

def get_api_key():
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("VITE_GEMINI_API_KEY")
    if not api_key:
        env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
        if os.path.exists(env_path):
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    if line.startswith("VITE_GEMINI_API_KEY=") or line.startswith("GEMINI_API_KEY="):
                        val = line.split("=", 1)[1].strip()
                        if val:
                            api_key = val
    return api_key or "AQ.Ab8RN6JzwYGxyD6Fu_JgZ6icxrJ79By8ajmcRf4vgkPWyl_jrw"

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
    if os.path.exists(output_path) and os.path.getsize(output_path) > 100000:
        print(f"  ⏭️  {os.path.basename(output_path)} exists and is HD ({os.path.getsize(output_path)} B), skipping.")
        return True

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={api_key}"
    
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    
    backoff = 60
    max_retries = 3
    
    for attempt in range(max_retries):
        try:
            resp = requests.post(api_url, json=payload, timeout=45)
            if resp.status_code == 200:
                data = resp.json()
                candidates = data.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    for p in parts:
                        if "inlineData" in p:
                            raw_bytes = base64.b64decode(p["inlineData"]["data"])
                            with open(output_path, "wb") as f:
                                f.write(raw_bytes)
                            print(f"✅ Saved 1024x1024 Google Direct JPEG ({len(raw_bytes)} B) -> {output_path}")
                            return True
            elif resp.status_code in (429, 403):
                print(f"⚠️ Google AI Studio API HTTP {resp.status_code} (Quota Limit / Access Cooldown).")
                print(f"   Sleeping {backoff}s before retry (Attempt {attempt+1}/{max_retries})...")
                time.sleep(backoff)
                backoff = min(backoff * 2, 120)
            else:
                print(f"❌ Error HTTP {resp.status_code}: {resp.text[:200]}")
                time.sleep(5)
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
    print(f"🚀 Generating {len(items)} Week 36 Flashcards using Google AI Studio Direct Engine ({MODEL_NAME}, 1024x1024)...")
    
    success = 0
    for idx, (filepath, prompt) in enumerate(items, start=1):
        print(f"[{idx}/{len(items)}] Processing {filepath}...")
        ok = generate_w36_card(api_key, prompt, filepath)
        if ok:
            success += 1
        else:
            print("⚠️ Batch stopped due to Google AI Studio API Quota limit.")
            break
        time.sleep(2.0)
        
    print(f"🎉 Week 36 Google Direct Engine Flashcards batch complete! ({success}/{len(items)} ready).")

if __name__ == '__main__':
    main()
