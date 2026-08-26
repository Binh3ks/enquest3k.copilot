#!/usr/bin/env python3
import os
import sys
import time
import base64
import requests
from pathlib import Path
from PIL import Image

def get_together_key():
    key = os.getenv("TOGETHER_API_KEY") or os.getenv("VITE_TOGETHER_API_KEY")
    if key: return key
    env_file = Path(__file__).parent.parent / ".env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            if "TOGETHER_API_KEY" in line or "TOGETHER_KEY" in line:
                if "=" in line:
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    return None

W33_CARDS = [
    ("card_a", "Cute 3D illustration of a school staircase with a sturdy metallic handrail in a bright school corridor. Pixar animation style, clean lighting, colorful edtech graphic, no text."),
    ("card_b", "Cute 3D illustration of a bright yellow Caution Wet Floor warning sign standing on reflective school floor tiles with a mop bucket nearby. Pixar animation style, no text."),
    ("card_c", "Cute 3D illustration of a clean white medical first-aid kit box with a red cross on a nurse office desk with medicine bottles. Pixar animation style, no text."),
    ("card_d", "Cute 3D illustration of a blue reusable medical cold ice pack with frosted water droplets in a freezer clinic box. Pixar animation style, clean lighting, no text."),
    ("card_e", "Cute 3D illustration of a roll of clean white medical cotton bandage inside an open white clinic medicine cabinet. Pixar animation style, no text."),
    ("card_f", "Cute 3D illustration of clear transparent science safety laboratory goggles resting on a wooden lab workbench in a chemistry classroom. Pixar animation style, no text."),
    ("card_g", "Cute 3D illustration of a colorful blue and red school backpack placed in front of green student lockers in a school locker room. Pixar animation style, no text."),
    ("card_h", "Cute 3D illustration of a cleaning mop with handle resting inside a yellow wheeled cleaning bucket in a school utility room. Pixar animation style, no text.")
]

def generate_flux_image(together_key, prompt, jpg_path, png_path):
    print(f"Generating {jpg_path.name}...")
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
    for attempt in range(3):
        try:
            res = requests.post(url, json=payload, headers=headers, timeout=60)
            if res.status_code == 200:
                data = res.json()
                b64 = data["data"][0]["b64_json"]
                img_bytes = base64.b64decode(b64)
                
                # Save PNG
                with open(png_path, "wb") as f:
                    f.write(img_bytes)
                    
                # Save JPG
                img = Image.open(png_path).convert("RGB")
                img.save(jpg_path, "JPEG", quality=92)
                print(f"  ✅ Saved {jpg_path.name} and {png_path.name}")
                return True
            else:
                print(f"  Attempt {attempt+1} failed ({res.status_code}): {res.text[:120]}")
                time.sleep(2)
        except Exception as e:
            print(f"  Exception: {e}")
            time.sleep(2)
    return False

def main():
    together_key = get_together_key()
    if not together_key:
        print("❌ No TOGETHER_API_KEY found in .env")
        sys.exit(1)
        
    out_dir_w33 = Path("public/images/week33")
    out_dir_w33.mkdir(parents=True, exist_ok=True)
    
    # 1. Generate W33 8 cards
    for name, prompt in W33_CARDS:
        jpg_p = out_dir_w33 / f"{name}.jpg"
        png_p = out_dir_w33 / f"{name}.png"
        generate_flux_image(together_key, prompt, jpg_p, png_p)
        time.sleep(1)

    # 2. Ensure W34 cards have both .jpg and .png
    out_dir_w34 = Path("public/images/week34")
    out_dir_w34.mkdir(parents=True, exist_ok=True)
    for l in "abcdefgh":
        jpg_w34 = out_dir_w34 / f"card_{l}.jpg"
        png_w34 = out_dir_w34 / f"card_{l}.png"
        if jpg_w34.exists() and not png_w34.exists():
            img = Image.open(jpg_w34)
            img.save(png_w34, "PNG")
            print(f"  ✅ Converted {png_w34.name} from JPG")
        elif png_w34.exists() and not jpg_w34.exists():
            img = Image.open(png_w34).convert("RGB")
            img.save(jpg_w34, "JPEG", quality=92)
            print(f"  ✅ Converted {jpg_w34.name} from PNG")
            
    # 3. Generate W34 mossy_rocks.jpg and .png
    mossy_jpg = out_dir_w34 / "mossy_rocks.jpg"
    mossy_png = out_dir_w34 / "mossy_rocks.png"
    generate_flux_image(
        together_key,
        "Cute 3D illustration of a peaceful mountain stream with large green mossy rocks and pebbles, sunlight filtering through tall green trees in a magical forest. Pixar animation style, clean composition, no text.",
        mossy_jpg,
        mossy_png
    )

if __name__ == "__main__":
    main()
