#!/usr/bin/env python3
"""
Generate cover images using DALL-E 3 at 1792x1024, then crop center to 4:1 ratio (2048x512).
Usage:
  python3 tools/generate_covers_dalle3.py           # all 58 images
  python3 tools/generate_covers_dalle3.py 1 10      # prompts 1 to 10
  python3 tools/generate_covers_dalle3.py 5         # prompt 5 only (start=end=5)

Output: tools/covers_dalle3_output/<filename>.jpg
"""

import os
import re
import sys
import time
import requests
from pathlib import Path
from PIL import Image
from io import BytesIO
import openai

# === CONFIG ===
SCRIPT_DIR = Path(__file__).parent
ROOT_DIR = SCRIPT_DIR.parent
PROMPTS_FILE = ROOT_DIR / "Production_FINAL" / "IMAGE PROMPTS" / "covers_w01-w29_DETAIL_16x4.txt"
OUTPUT_DIR = ROOT_DIR / "public" / "images" / "covers_4x1_new"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

TARGET_W, TARGET_H = 2048, 512   # Final output size (4:1)
GEN_W, GEN_H = 1792, 1024        # DALL-E 3 max wide size (7:4)

# === API KEY ===
def load_api_key():
    api_key_file = ROOT_DIR / "API keys.txt"
    content = api_key_file.read_text(encoding="utf-8")
    match = re.search(r"OpenAI TTS:\s*(\S+)", content)
    if not match:
        raise RuntimeError("OpenAI API key not found in 'API keys.txt'")
    return match.group(1)

# === PARSE PROMPTS ===
def parse_prompts(path):
    """
    Returns list of (index, filename, english_prompt) from the prompts file.
    Each non-empty line starts with: N. Hãy ... Filename: xxx.jpg. <english prompt>
    """
    results = []
    text = Path(path).read_text(encoding="utf-8")
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        # Extract line number
        m_num = re.match(r"^(\d+)\.", line)
        if not m_num:
            continue
        idx = int(m_num.group(1))

        # Extract filename
        m_fn = re.search(r"Filename:\s*([\w_\-\.]+\.jpg)", line, re.IGNORECASE)
        if not m_fn:
            continue
        filename = m_fn.group(1)

        # Extract English prompt (everything after "Filename: xxx.jpg.")
        m_prompt = re.search(r"Filename:\s*[\w_\-\.]+\.jpg\.\s*(.+)$", line, re.IGNORECASE)
        if not m_prompt:
            continue
        prompt = m_prompt.group(1).strip()

        results.append((idx, filename, prompt))

    results.sort(key=lambda x: x[0])
    return results

# === GENERATE ONE IMAGE ===
def generate_and_save(client, idx, filename, prompt, dry_run=False):
    output_path = OUTPUT_DIR / filename
    if output_path.exists():
        print(f"⏭️  [{idx}] {filename} already exists, skipping.")
        return True

    if dry_run:
        print(f"[DRY RUN] [{idx}] Would generate: {filename}")
        return True

    print(f"🎨 [{idx}] Generating {filename} ...")
    print(f"   Prompt: {prompt[:80]}...")

    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size=f"{GEN_W}x{GEN_H}",   # 1792x1024 (7:4 ratio)
            quality="standard",          # "hd" costs 2x — use "standard" for batch
            n=1,
        )
        image_url = response.data[0].url

        # Download
        img_data = requests.get(image_url, timeout=60).content
        img = Image.open(BytesIO(img_data)).convert("RGB")
        w, h = img.size
        print(f"   Downloaded: {w}x{h}")

        # Crop center band to 4:1 ratio
        # From height h, compute crop height = w/4
        crop_h = w // 4
        top = (h - crop_h) // 2
        bottom = top + crop_h
        img_cropped = img.crop((0, top, w, bottom))

        # Resize to target
        img_final = img_cropped.resize((TARGET_W, TARGET_H), Image.LANCZOS)

        # Save as JPEG quality 90
        img_final.save(output_path, "JPEG", quality=90, optimize=True)
        size_kb = output_path.stat().st_size // 1024
        print(f"✅ Saved: {filename} ({TARGET_W}x{TARGET_H}, {size_kb} KB)")
        return True

    except openai.RateLimitError as e:
        print(f"⚠️  Rate limit hit. Waiting 60s... ({e})")
        time.sleep(60)
        return False
    except openai.BadRequestError as e:
        print(f"❌ [{idx}] Content policy or bad request: {e}")
        return False
    except Exception as e:
        print(f"❌ [{idx}] Failed {filename}: {e}")
        return False

# === MAIN ===
def main():
    args = sys.argv[1:]
    start_idx = 1
    end_idx = 58

    if len(args) == 1:
        start_idx = end_idx = int(args[0])
    elif len(args) == 2:
        start_idx, end_idx = int(args[0]), int(args[1])

    dry_run = "--dry-run" in sys.argv
    if dry_run:
        print("=== DRY RUN MODE ===")

    api_key = load_api_key()
    client = openai.OpenAI(api_key=api_key)

    all_prompts = parse_prompts(PROMPTS_FILE)
    batch = [(i, fn, p) for (i, fn, p) in all_prompts if start_idx <= i <= end_idx]

    print(f"\n📋 Cover Generator — DALL-E 3 (1792x1024 → crop → 2048x512)")
    print(f"   Prompts {start_idx}–{end_idx}: {len(batch)} images")
    print(f"   Output: {OUTPUT_DIR}\n")

    success = 0
    failed = 0
    failed_list = []

    for i, (idx, filename, prompt) in enumerate(batch):
        ok = generate_and_save(client, idx, filename, prompt, dry_run=dry_run)
        if ok:
            success += 1
        else:
            failed += 1
            failed_list.append((idx, filename))

        # Rate limit: 5s between requests (DALL-E 3: ~5 req/min on free tier)
        if i < len(batch) - 1 and not dry_run:
            time.sleep(5)

    print(f"\n{'='*50}")
    print(f"✅ Success: {success}  ❌ Failed: {failed}")
    if failed_list:
        print("Failed items:")
        for idx, fn in failed_list:
            print(f"  {idx}. {fn}")
    print(f"\nOutput folder: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
