#!/usr/bin/env python3
import os
import time
import urllib.request
import urllib.parse

items = [
    ("public/images/week36/v14_explorer.jpg", "3D digital render of a cheerful young boy explorer character wearing a backpack holding a brass telescope and map, soft studio lighting, clean simple background, no text", 9001),
    ("public/images/week36/v15_expedition.jpg", "3D digital render of a group of young explorers with backpacks hiking up a sunny mountain trail on an adventure expedition, soft studio lighting, clean simple background, no text", 9002),
    ("public/images/week36/v16_discovery.jpg", "3D digital render of a magnifying glass magnifying a shiny gold coin partially buried in rich brown soil, soft studio lighting, clean simple background, no text", 9003),
    ("public/images/week36/v17_archaeology.jpg", "3D digital render of an archaeologist brush and trowel tool excavating ancient golden relics from dusty ruins, soft studio lighting, clean simple background, no text", 9004),
    ("public/images/week36/v18_surface.jpg", "3D digital render of calm blue ocean water surface level with gentle sunlit waves under golden sky, soft studio lighting, clean simple background, no text", 9005),
    ("public/images/week36/v19_thruster.jpg", "3D digital render of a submarine underwater propeller thruster motor spinning fast with blue bubbles, soft studio lighting, clean simple background, no text", 9006),
    ("public/images/week36/v20_manuscript.jpg", "3D digital render of an ancient rolled parchment manuscript scroll with a feather quill pen on a wooden table, soft studio lighting, clean simple background, no text", 9007)
]

def fetch_item(filepath, prompt, seed):
    encoded = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=512&height=512&nologo=true&seed={seed}"
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()
                if len(data) > 15000 and data.startswith(b'\xff\xd8'):
                    with open(filepath, 'wb') as f:
                        f.write(data)
                    print(f"✅ Saved ({len(data)} B) -> {filepath}")
                    return True
        except Exception as e:
            print(f"⚠️ Attempt {attempt+1} failed for {filepath}: {e}")
        time.sleep(3)
    return False

def main():
    print(f"🚀 Fetching remaining {len(items)} W36 vocabulary cards...")
    for fp, p, s in items:
        fetch_item(fp, p, s)
        time.sleep(3)

if __name__ == '__main__':
    main()
