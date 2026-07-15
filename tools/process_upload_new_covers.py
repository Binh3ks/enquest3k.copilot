#!/usr/bin/env python3
"""
Process new cover images from 'public/images/New Covers/' and upload to Cloudflare R2.

Source images: 1408x768 (16:9)
Processing:    Center-crop to 16:6 ratio (1408x528) → resize to 2048x768
Output:        JPEG quality 90, placed in public/images/week{N}/

Filename mapping (same as rename_upload_covers_16x4.py):
  index 0  = download.png          → read_cover_w01.jpg
  index 1  = download (1).png      → explore_cover_w01.jpg
  index 2  = download (2).png      → read_cover_w02.jpg
  ...
  index 57 = download (57).png     → explore_cover_w29.jpg

Usage:
  python3 tools/process_upload_new_covers.py           # all 58
  python3 tools/process_upload_new_covers.py 10        # start from index 10
  python3 tools/process_upload_new_covers.py --dry-run # preview only
"""

import subprocess
import sys
from pathlib import Path
from PIL import Image

BASE      = Path(__file__).parent.parent
SRC_DIR   = BASE / "public" / "images" / "New Covers"
IMG_DIR   = BASE / "public" / "images"
BUCKET    = "engquest-images"
R2_PREFIX = "images"

# Target output dimensions (16:6 ratio)
OUT_W, OUT_H = 2048, 768

FOLDER_EXCEPTIONS = {9: "week09"}

def week_str(week: int) -> str:
    return f"{week:02d}" if week <= 9 else str(week)

def week_folder(week: int) -> str:
    return FOLDER_EXCEPTIONS.get(week, f"week{week}")

def build_mapping():
    """Return list of (src_path, dest_path, r2_key, idx) for all 58 files."""
    mapping = []
    for idx in range(58):
        week = (idx // 2) + 1
        kind = "read_cover" if idx % 2 == 0 else "explore_cover"
        fname = f"{kind}_w{week_str(week)}.jpg"
        src_name = "download.png" if idx == 0 else f"download ({idx}).png"
        src_path = SRC_DIR / src_name
        wfolder = week_folder(week)
        dest_path = IMG_DIR / wfolder / fname
        r2_key = f"{R2_PREFIX}/{wfolder}/{fname}"
        mapping.append((src_path, dest_path, r2_key, idx))
    return mapping

def crop_and_save(src: Path, dest: Path):
    """Center-crop 16:9 → 16:6, resize to OUT_W x OUT_H, save as JPEG."""
    img = Image.open(src).convert("RGB")
    w, h = img.size
    # Compute crop box for target ratio
    target_ratio = OUT_W / OUT_H  # 16:6 ≈ 2.667
    crop_h = int(w / target_ratio)
    if crop_h > h:
        # Image too tall for target ratio — crop width instead
        crop_w = int(h * target_ratio)
        left = (w - crop_w) // 2
        img = img.crop((left, 0, left + crop_w, h))
    else:
        # Normal case: crop height
        top = (h - crop_h) // 2
        img = img.crop((0, top, w, top + crop_h))
    img = img.resize((OUT_W, OUT_H), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=90, optimize=True)
    return img.size

def upload(local_path: Path, r2_key: str):
    result = subprocess.run(
        [
            "npx", "wrangler", "r2", "object", "put",
            f"{BUCKET}/{r2_key}",
            f"--file={local_path}",
            "--content-type=image/jpeg",
            "--cache-control=public, max-age=86400",
            "--remote"
        ],
        capture_output=True, text=True, timeout=60
    )
    return result.returncode == 0, result.stderr

def main():
    dry_run = "--dry-run" in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    start_idx = int(args[0]) if args else 0

    mapping = build_mapping()

    # Check missing sources
    missing = [m for m in mapping if not m[0].exists()]
    if missing:
        print(f"❌ Missing source files ({len(missing)}):")
        for m in missing:
            print(f"   {m[0].name}")
        sys.exit(1)

    subset = mapping[start_idx:]
    print(f"\n🖼  New Covers Processor + R2 Uploader")
    print(f"   Source:  {SRC_DIR}")
    print(f"   Crop:    16:9 (1408×768) → 16:6 center crop → {OUT_W}×{OUT_H}")
    print(f"   Count:   {len(subset)} images (starting at index {start_idx})")
    if dry_run:
        print("   MODE:    DRY RUN\n")
    print("=" * 70)

    ok, fail = 0, 0
    failed_list = []

    for src_path, dest_path, r2_key, idx in subset:
        week = (idx // 2) + 1
        kind = "read" if idx % 2 == 0 else "explore"
        label = f"W{week:02d} {kind:7s} → {dest_path.name}"

        if dry_run:
            print(f"  [DRY] [{idx:02d}] {label}  |  r2:{r2_key}")
            ok += 1
            continue

        # Step 1: crop + convert
        try:
            size = crop_and_save(src_path, dest_path)
        except Exception as e:
            print(f"  ❌ [{idx:02d}] {label} — convert error: {e}")
            fail += 1
            failed_list.append(idx)
            continue

        # Step 2: upload
        success, stderr = upload(dest_path, r2_key)
        if success:
            kb = dest_path.stat().st_size // 1024
            print(f"  ✅ [{idx:02d}] {label}  ({size[0]}×{size[1]}, {kb}KB)")
            ok += 1
        else:
            print(f"  ❌ [{idx:02d}] {label} — upload failed: {stderr.strip()[:80]}")
            fail += 1
            failed_list.append(idx)

    print("=" * 70)
    print(f"Done: ✅ {ok} uploaded, ❌ {fail} failed.")
    if failed_list:
        print(f"Failed indices: {failed_list}")
        print(f"Retry with: python3 tools/process_upload_new_covers.py {failed_list[0]}")

if __name__ == "__main__":
    main()
