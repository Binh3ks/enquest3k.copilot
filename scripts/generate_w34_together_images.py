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

def generate_flux_image(together_key, prompt, jpg_path, png_path=None):
    print(f"Generating {jpg_path.name} via Together AI (FLUX.1-schnell)...")
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
    for attempt in range(4):
        try:
            res = requests.post(url, json=payload, headers=headers, timeout=60)
            if res.status_code == 200:
                data = res.json()
                b64 = data["data"][0]["b64_json"]
                img_bytes = base64.b64decode(b64)
                
                # Save temp/PNG if needed
                tmp_png = jpg_path.with_suffix('.png')
                with open(tmp_png, "wb") as f:
                    f.write(img_bytes)
                    
                # Save JPG
                img = Image.open(tmp_png).convert("RGB")
                img.save(jpg_path, "JPEG", quality=95)
                if png_path and png_path != tmp_png:
                    img.save(png_path, "PNG")
                print(f"  ✅ Saved {jpg_path.name} ({len(img_bytes)} bytes)")
                return True
            else:
                print(f"  Attempt {attempt+1} failed ({res.status_code}): {res.text[:150]}")
                time.sleep(3)
        except Exception as e:
            print(f"  Attempt {attempt+1} exception: {e}")
            time.sleep(3)
    return False

def main():
    together_key = get_together_key()
    if not together_key:
        print("❌ No TOGETHER_API_KEY found!")
        sys.exit(1)
        
    out_dir = Path("public/images/week34")
    out_dir.mkdir(parents=True, exist_ok=True)
    
    images_to_generate = [
        (
            out_dir / "mossy_rocks.jpg",
            out_dir / "mossy_rocks.png",
            "Cute 3D illustration of a peaceful forest stream with large green mossy rocks, sparkling crystal clear water, sunlight filtering through tall green trees in a magical sunlit woodland. Pixar animation style, vibrant rich colors, soft studio lighting, clean composition, no text."
        ),
        (
            out_dir / "card_b.jpg",
            out_dir / "card_b.png",
            "Cute 3D illustration of a hunter camp in a green forest with thick rope net traps and wooden poles, tents and campfire in the background. Pixar animation style, vibrant colors, clean lighting, no text."
        ),
        (
            out_dir / "card_d.jpg",
            out_dir / "card_d.png",
            "Cute 3D illustration of a blue reusable water bottle resting on a mossy rock by a flowing riverbank in a sunlit forest. Pixar animation style, vibrant colors, clean lighting, no text."
        )
    ]
    
    for jpg_p, png_p, prompt in images_to_generate:
        success = generate_flux_image(together_key, prompt, jpg_p, png_p)
        if not success:
            print(f"❌ Failed to generate {jpg_p.name}")
            sys.exit(1)
        time.sleep(1)
        
    print("\n🎉 All 3 L4 images generated successfully via Together AI FLUX.1-schnell!")

if __name__ == "__main__":
    main()
