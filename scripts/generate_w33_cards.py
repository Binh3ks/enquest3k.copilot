#!/usr/bin/env python3
import os
import sys
import time
import base64
import requests
from pathlib import Path
from PIL import Image

def get_api_key():
    key = os.getenv("GEMINI_API_KEY") or os.getenv("VITE_GEMINI_API_KEY")
    if not key:
        env_file = Path(__file__).parent.parent / ".env"
        if env_file.exists():
            for line in env_file.read_text().splitlines():
                if line.startswith("GEMINI_API_KEY=") or line.startswith("VITE_GEMINI_API_KEY="):
                    k, v = line.split("=", 1)
                    key = v.strip().strip('"').strip("'")
                    if key: break
    return key

CARDS_W33 = [
    {
        "name": "card_a",
        "prompt": "A modern school staircase with a sturdy metallic handrail in a bright hallway, vibrant educational children's book illustration style, clean crisp vector-like digital art"
    },
    {
        "name": "card_b",
        "prompt": "A bright yellow Caution Wet Floor warning sign on shiny reflective corridor floor tiles with a mop bucket, children's storybook illustration style"
    },
    {
        "name": "card_c",
        "prompt": "A clean white medical first-aid kit box with a red cross on a wooden desk in a friendly school nurse office, children's book illustration"
    },
    {
        "name": "card_d",
        "prompt": "A blue medical cold ice pack with frost droplets stored in a freezer box, clean educational illustration style"
    },
    {
        "name": "card_e",
        "prompt": "A roll of clean white medical cotton bandage inside an open white clinic cabinet with shelves, children's book illustration"
    },
    {
        "name": "card_f",
        "prompt": "Transparent safety goggles resting on a laboratory table in a chemistry science classroom, children's book illustration"
    },
    {
        "name": "card_g",
        "prompt": "A colorful blue and red school student backpack sitting in front of metal school lockers in a locker room, children's book illustration"
    },
    {
        "name": "card_h",
        "prompt": "A cleaning mop in a yellow wheeled bucket inside a school utility maintenance closet, children's book illustration"
    }
]

def generate_image(api_key, prompt, output_jpg_path, output_png_path):
    print(f"Generating {output_jpg_path.name}...")
    models = ["imagen-3.0-generate-002", "gemini-2.5-flash-image", "gemini-2.0-flash-exp-image"]
    
    # Try Imagen 3 API first
    url = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key={api_key}"
    payload = {
        "instances": [{"prompt": prompt}],
        "parameters": {"sampleCount": 1, "aspectRatio": "1:1"}
    }
    
    for attempt in range(5):
        try:
            resp = requests.post(url, json=payload, timeout=60)
            if resp.status_code == 200:
                data = resp.json()
                b64 = data["predictions"][0]["bytesBase64Encoded"]
                img_data = base64.b64decode(b64)
                
                # Write PNG
                with open(output_png_path, "wb") as f:
                    f.write(img_data)
                    
                # Convert to JPG
                img = Image.open(output_png_path).convert("RGB")
                img.save(output_jpg_path, "JPEG", quality=92)
                print(f"  ✅ Saved {output_jpg_path.name} and {output_png_path.name}")
                return True
            elif resp.status_code == 429:
                print(f"  Rate limited, waiting 6s... (attempt {attempt+1})")
                time.sleep(6)
            else:
                print(f"  API response {resp.status_code}: {resp.text[:200]}")
                time.sleep(4)
        except Exception as e:
            print(f"  Error: {e}")
            time.sleep(4)
            
    return False

def main():
    api_key = get_api_key()
    if not api_key:
        print("No GEMINI_API_KEY found!")
        sys.exit(1)
        
    out_dir = Path("public/images/week33")
    out_dir.mkdir(parents=True, exist_ok=True)
    
    for item in CARDS_W33:
        jpg_path = out_dir / f"{item['name']}.jpg"
        png_path = out_dir / f"{item['name']}.png"
        
        # generate
        success = generate_image(api_key, item["prompt"], jpg_path, png_path)
        if not success:
            print(f"❌ Failed to generate {item['name']}")
        time.sleep(3)

if __name__ == "__main__":
    main()
