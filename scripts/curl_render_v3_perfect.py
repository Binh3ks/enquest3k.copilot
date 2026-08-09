#!/usr/bin/env python3
import os
import re
import time
import subprocess
import urllib.parse

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

def fetch_with_curl(filepath, prompt, seed):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    encoded = urllib.parse.quote(prompt)
    
    for attempt in range(5):
        curr_seed = seed + attempt * 77
        url = f"https://image.pollinations.ai/prompt/{encoded}?width=512&height=512&nologo=true&seed={curr_seed}"
        cmd = [
            "curl", "-s", "-L", "-m", "45",
            "-H", "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            url, "-o", filepath
        ]
        try:
            res = subprocess.run(cmd, capture_output=True, timeout=50)
            if os.path.exists(filepath) and os.path.getsize(filepath) > 15000:
                with open(filepath, 'rb') as f:
                    if f.read(2) == b'\xff\xd8':
                        print(f"✅ Saved Standardized v3 JPEG ({os.path.getsize(filepath)} B) -> {filepath}")
                        return True
            print(f"⏳ Attempt {attempt+1} retry for {filepath}...")
            time.sleep(4)
        except Exception as e:
            print(f"⚠️ Attempt {attempt+1} exception for {filepath}: {e}")
            time.sleep(4)
    print(f"❌ Failed to fetch {filepath}")
    return False

def main():
    p36 = "Production_FINAL_DEPRECATED/IMAGE PROMPTS/week_36_image_prompts.txt"
    p37 = "Production_FINAL_DEPRECATED/IMAGE PROMPTS/week_37_image_prompts.txt"
    
    items36 = parse_prompt_file(p36, "week36")
    items37 = parse_prompt_file(p37, "week37")
    all_items = items36 + items37
    
    print(f"🚀 Perfect Curl Rendering {len(all_items)} Disney Pixar 3D Flashcards...")
    
    success = 0
    for idx, (filepath, prompt) in enumerate(all_items, start=1):
        seed = 99000 + idx * 41
        print(f"[{idx}/{len(all_items)}] Fetching {filepath}...")
        ok = fetch_with_curl(filepath, prompt, seed)
        if ok:
            success += 1
        time.sleep(3.0)
        
    print(f"🎉 Perfect Curl Standardized v3 Disney Pixar 3D Flashcards complete! ({success}/{len(all_items)} saved)")

if __name__ == '__main__':
    main()
