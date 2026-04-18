#!/usr/bin/env python3
"""
Rename downloaded cover images and upload to Cloudflare R2.

Images are in:  public/images/W1-29_16:4/
Named:          download.png  (index 0 = prompt 1 = read_cover_w01)
                download (1).png  (index 1 = prompt 2 = explore_cover_w01)
                download (2).png  (index 2 = prompt 3 = read_cover_w02)
                ...
                download (57).png (index 57 = prompt 58 = explore_cover_w29)

Even indices  (0, 2, 4, ...) → read_cover_w{week}
Odd indices   (1, 3, 5, ...) → explore_cover_w{week}
Week 1-9  → zero-padded filename:  read_cover_w01.jpg
Week 10+  → no padding:            read_cover_w10.jpg
Each file is placed in public/images/week{N}/ and uploaded to R2 as
images/week{N}/read_cover_w{N}.jpg  (replacing the old cover).
"""
import subprocess
import sys
from pathlib import Path
from PIL import Image

BASE      = Path(__file__).parent.parent
SRC_DIR   = BASE / "public" / "images" / "W1-29_16:4"
IMG_DIR   = BASE / "public" / "images"
BUCKET    = "engquest-images"
R2_PREFIX = "images"

def week_str(week: int) -> str:
    return f"{week:02d}" if week <= 9 else str(week)

FOLDER_EXCEPTIONS = {9: "week09"}  # week9 folder is named week09

def week_folder(week: int) -> str:
    return FOLDER_EXCEPTIONS.get(week, f"week{week}")

def build_mapping():
    """Return list of (src_path, dest_path, r2_key) for all 58 files."""
    mapping = []
    for idx in range(58):
        week = (idx // 2) + 1
        kind = "read_cover" if idx % 2 == 0 else "explore_cover"
        fname = f"{kind}_w{week_str(week)}.jpg"
        # source file name
        src_name = "download.png" if idx == 0 else f"download ({idx}).png"
        src_path = SRC_DIR / src_name
        # destination
        wfolder = week_folder(week)
        dest_path = IMG_DIR / wfolder / fname
        r2_key = f"{R2_PREFIX}/{wfolder}/{fname}"
        mapping.append((src_path, dest_path, r2_key, idx))
    return mapping

def convert_and_save(src: Path, dest: Path):
    img = Image.open(src).convert("RGB")
    img.save(dest, "JPEG", quality=90, optimize=True)

def upload(local_path: Path, r2_key: str) -> bool:
    result = subprocess.run(
        [
            "npx", "wrangler", "r2", "object", "put",
            f"{BUCKET}/{r2_key}",
            f"--file={local_path}",
            "--content-type=image/jpeg",
            "--cache-control=public, max-age=86400",
            "--remote"
        ],
        capture_output=True, text=True, timeout=30
    )
    return result.returncode == 0, result.stderr

def main(start_idx: int = 0):
    mapping = build_mapping()

    # Verify all source files exist before starting
    missing = [m[0] for m in mapping if not m[0].exists()]
    if missing:
        print(f"❌ Missing source files ({len(missing)}):")
        for p in missing:
            print(f"   {p.name}")
        sys.exit(1)

    subset = mapping[start_idx:]
    print(f"✅ Starting from index {start_idx} ({len(subset)} files)...")
    print("=" * 65)

    ok, fail = 0, 0
    for src_path, dest_path, r2_key, idx in subset:
        week = (idx // 2) + 1
        kind = "read" if idx % 2 == 0 else "explore"
        label = f"W{week:02d} {kind}"

        # Convert PNG → JPG
        try:
            convert_and_save(src_path, dest_path)
        except Exception as e:
            print(f"  ❌ [{idx:02d}] {label} — convert failed: {e}")
            fail += 1
            continue

        # Upload to R2
        success, stderr = upload(dest_path, r2_key)
        if success:
            print(f"  ✅ [{idx:02d}] {label} → {r2_key}")
            ok += 1
        else:
            print(f"  ❌ [{idx:02d}] {label} → upload failed: {stderr.strip()[:80]}")
            fail += 1

    print("=" * 65)
    print(f"Done: {ok} uploaded, {fail} failed.")

if __name__ == "__main__":
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    main(start)
