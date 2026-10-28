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
    
    # CAMBRIDGE FLYERS LISTENING PART 3 ARCHITECTURAL INVARIANT:
    # Landscape cards A-H MUST NEVER contain target answer objects (e.g. traps, ropes, maps, bottles, compasses, flashlights, backpacks, binoculars).
    # Prompts below are 100% pure scenery/locations.
    images_to_generate = [
        (
            out_dir / "card_a.jpg",
            out_dir / "card_a.png",
            "A beautiful peaceful forest clearing surrounded by tall lush green trees, sunlight beaming down onto a carpet of soft grass and wild flowers, tranquil woodland landscape. Vibrant colors, clean educational illustration style, no people, no animals, no manmade objects, no text, no traps."
        ),
        (
            out_dir / "card_b.jpg",
            out_dir / "card_b.png",
            "A small rustic campsite clearing in a dense green forest, empty camping grounds with a simple stone fire ring with extinguished gray ashes, wooden log bench under leafy trees. Peaceful morning woodland scene, no people, no animals, no ropes, no nets, no modern gear, no text."
        ),
        (
            out_dir / "card_c.jpg",
            out_dir / "card_c.png",
            "A massive ancient oak tree trunk in a sun-dappled forest, with a natural wide hollow opening in the weathered bark at ground level, surrounded by wild mushrooms and green moss. Natural forest landscape, no animals, no people, no maps, no scrolls, no text."
        ),
        (
            out_dir / "card_d.jpg",
            out_dir / "card_d.png",
            "A gentle crystal-clear river flowing through a lush green forest, smooth pebble riverbank with rounded stones, gentle ripples in the sparkling water, willow trees hanging over the water. Serene nature scene, no people, no animals, no bottles, no plastic, no text."
        ),
        (
            out_dir / "card_e.jpg",
            out_dir / "card_e.png",
            "A scenic high rocky promontory cliff overlooking a vast green forest valley, large flat limestone lookout rock with distant mountain hills under a bright blue sky. Panoramic woodland view, no people, no animals, no compass, no instruments, no text."
        ),
        (
            out_dir / "card_f.jpg",
            out_dir / "card_f.png",
            "A mysterious natural rock cave entrance nestled in a mossy hillside forest, dark shadowed cave opening framed by wild vines and fern plants, soft morning light hitting the entrance stones. Atmospheric nature landscape, no people, no animals, no flashlights, no torches, no text."
        ),
        (
            out_dir / "card_g.jpg",
            out_dir / "card_g.png",
            "A simple plain canvas tent pitched under shady forest trees on a grassy woodland meadow, peaceful outdoor shelter setting. Clean cozy camping environment, no people, no animals, no backpacks, no bags, no gear outside, no text."
        ),
        (
            out_dir / "card_h.jpg",
            out_dir / "card_h.png",
            "A rustic wooden lookout tower standing among forest trees, tall wooden observation platform made of timber logs with a ladder leading up, overlooking green tree canopies. Forest fire watchtower landscape, no people, no animals, no binoculars, no telescope, no text."
        )
    ]
    
    for jpg_p, png_p, prompt in images_to_generate:
        success = generate_flux_image(together_key, prompt, jpg_p, png_p)
        if not success:
            print(f"❌ Failed to generate {jpg_p.name}")
            sys.exit(1)
        time.sleep(1)
        
    print("\n🎉 All 8 Listening Part 3 pure landscape images generated successfully via Together AI FLUX.1-schnell!")

if __name__ == "__main__":
    main()
