#!/usr/bin/env python3
"""
Temporary helper: copy/move 5 generated bar model images (download*.png/jpg/jpeg)
into week folder and rename to Advanced bar model filenames.

Usage:
  python3 tools/temp_rename_adv_barmodels.py 21
  python3 tools/temp_rename_adv_barmodels.py 20 --src "/Volumes/MY DOCUMENT/Downloads"
  python3 tools/temp_rename_adv_barmodels.py 19 --move

Expected source files (default source dir):
  download.png
  download (1).png
  download (2).png
  download (3).png
  download (4).png

Mapped output names:
  barmodel_w<week>_adv_p1.jpg ... barmodel_w<week>_adv_p5.jpg
"""

import argparse
import os
import shutil
import sys
from datetime import datetime

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
DEFAULT_SRC_DIR = "/Volumes/MY DOCUMENT/Downloads"


def build_candidates(src_dir: str, index: int):
    """Return possible source names for a logical index 1..5."""
    exts = ["png", "jpg", "jpeg"]
    if index == 1:
        stems = ["download"]
    else:
        n = index - 1
        stems = [f"download ({n})", f"download({n})"]

    out = []
    for stem in stems:
        for ext in exts:
            out.append(os.path.join(src_dir, f"{stem}.{ext}"))
    return out


def resolve_source_file(src_dir: str, index: int):
    for path in build_candidates(src_dir, index):
        if os.path.exists(path):
            return path
    return None


def ensure_dir(path: str):
    if not os.path.exists(path):
        os.makedirs(path, exist_ok=True)


def backup_if_exists(path: str):
    if not os.path.exists(path):
        return None
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = f"{os.path.splitext(path)[0]}.bak_{ts}{os.path.splitext(path)[1]}"
    os.rename(path, backup_path)
    return backup_path


def main():
    parser = argparse.ArgumentParser(description="Temp rename helper for adv bar model images")
    parser.add_argument("week", type=int, help="Week number (int), e.g. 21")
    parser.add_argument("--src", default=DEFAULT_SRC_DIR, help="Source folder containing download files")
    parser.add_argument("--move", action="store_true", help="Move files instead of copy")
    args = parser.parse_args()

    if args.week < 1:
        print("ERROR: week must be >= 1")
        sys.exit(1)

    src_dir = args.src
    if not os.path.isdir(src_dir):
        print(f"ERROR: source directory not found: {src_dir}")
        sys.exit(1)

    week_str = str(args.week)
    week_pad = str(args.week).zfill(2)
    dest_dir = os.path.join(PROJECT_ROOT, "public", "images", f"week{week_str}")
    ensure_dir(dest_dir)

    print(f"Source: {src_dir}")
    print(f"Destination: {dest_dir}")
    print(f"Mode: {'MOVE' if args.move else 'COPY'}")

    failures = 0
    for i in range(1, 6):
        src_file = resolve_source_file(src_dir, i)
        target_name = f"barmodel_w{week_pad}_adv_p{i}.jpg"
        target_path = os.path.join(dest_dir, target_name)

        if not src_file:
            print(f"MISSING [{i}]: cannot find download file for index {i}")
            failures += 1
            continue

        backup_path = backup_if_exists(target_path)
        if backup_path:
            print(f"BACKUP: {os.path.basename(target_name)} -> {os.path.basename(backup_path)}")

        if args.move:
            shutil.move(src_file, target_path)
            action = "MOVED"
        else:
            shutil.copy2(src_file, target_path)
            action = "COPIED"

        print(f"{action} [{i}]: {os.path.basename(src_file)} -> {target_name}")

    if failures:
        print(f"DONE with {failures} missing file(s).")
        sys.exit(2)

    print("DONE: 5/5 Advanced bar model files prepared.")


if __name__ == "__main__":
    main()
