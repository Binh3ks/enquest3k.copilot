#!/usr/bin/env python3
import os
import time
import urllib.request
import urllib.parse

items = [
    ("public/images/week36/v19_thruster.jpg", "3D digital render of a powerful underwater submarine propeller engine thruster motor with spinning brass blades and glowing water jet streams, bright studio lighting, detailed mechanical render, clean background, no text", 99101),
    ("public/images/week36/wp1_archimedes.jpg", "3D digital render of Archimedes buoyancy law physics experiment with a floating wooden block in a clear glass container of blue water, soft studio lighting, clean simple background, no text", 99102),
    ("public/images/week36/wp3_buoyancy.jpg", "3D digital render of yellow inflatable lift bags raising a heavy wooden chest safely off seafloor to water surface, ocean physics, clean background, no text", 99103),
    ("public/images/week36/wp4_journey.jpg", "3D digital render of Marco Polo camel caravan embarking on a long journey across golden desert sand dunes under sunny blue sky, vibrant colors, clean background, no text", 99104),
    ("public/images/week36/wp8_trenches.jpg", "3D digital render of a sleek titanium research submersible craft exploring the Mariana Trench ocean floor with bright headlights and glowing deep sea creatures, clean background, no text", 99105)
]

def fetch(filepath, prompt, seed):
    encoded = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=512&height=512&nologo=true&seed={seed}"
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()
                if len(data) > 15000 and data.startswith(b'\xff\xd8'):
                    with open(filepath, 'wb') as f:
                        f.write(data)
                    print(f"✅ Saved 3D Photo Render ({len(data)} B) -> {filepath}")
                    return True
                else:
                    print(f"⚠️ Non-JPEG/Small response ({len(data)} B) for {filepath}, retry {attempt+1}")
        except Exception as e:
            print(f"⚠️ Exception for {filepath}: {e}, retry {attempt+1}")
        time.sleep(4)
    return False

def main():
    print("🚀 Fetching perfect 3D photo renders for Word Power & Thruster engine...")
    for fp, p, s in items:
        fetch(fp, p, s)
        time.sleep(3)

if __name__ == '__main__':
    main()
