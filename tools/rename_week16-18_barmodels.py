"""
Rename downloaded Whisk images to the correct barmodel naming convention
for weeks 16, 17, 18 (both easy and adv modes).

Usage:
    python3 tools/rename_week16-18_barmodels.py /path/to/downloads_folder

Expected: 30 image files in the downloads folder.
Rename rule: numbered 1–30 in this order:
  1–5   = week16 easy p1–p5
  6–10  = week16 adv  p1–p5
  11–15 = week17 easy p1–p5
  16–20 = week17 adv  p1–p5
  21–25 = week18 easy p1–p5
  26–30 = week18 adv  p1–p5

OR: if files are already named with the target name → script is a no-op.
If files are ambiguous, map by sorted order.
"""

import sys
import shutil
from pathlib import Path

# Target mapping: (week, mode, problem) -> dest folder + filename
TARGETS = []
for w in [16, 17, 18]:
    for mode in ["easy", "adv"]:
        for p in range(1, 6):
            fname = f"barmodel_w{w}_{mode}_p{p}_v1.jpg"
            dest_folder = Path(__file__).parent.parent / "public" / "images" / f"week{w}"
            TARGETS.append((fname, dest_folder))


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 tools/rename_week16-18_barmodels.py /path/to/downloads")
        print()
        print("Expected 30 image files (jpg/jpeg/png) sorted alphabetically.")
        print("They will be converted to JPG and renamed + placed in public/images/week{N}/")
        sys.exit(1)

    src_dir = Path(sys.argv[1])
    if not src_dir.exists():
        print(f"ERROR: Directory not found: {src_dir}")
        sys.exit(1)

    # Collect image files
    exts = [".jpg", ".jpeg", ".png", ".webp"]
    files = sorted([f for f in src_dir.iterdir() if f.suffix.lower() in exts])

    if len(files) != 30:
        print(f"WARNING: Expected 30 files, found {len(files)}.")
        print("Files found:")
        for f in files:
            print(f"  {f.name}")
        answer = input("Continue anyway? (y/n): ")
        if answer.lower() != "y":
            sys.exit(0)

    # Ensure destination folders exist
    for _, dest_folder in TARGETS:
        dest_folder.mkdir(parents=True, exist_ok=True)

    print(f"\nRenaming {len(files)} files → {min(len(files), len(TARGETS))} targets:")
    import subprocess

    for i, (src_file, (target_name, dest_folder)) in enumerate(zip(files, TARGETS), 1):
        dest_path = dest_folder / target_name
        if src_file.suffix.lower() in [".png", ".webp"]:
            # Convert via sips
            subprocess.run(
                ["sips", "-s", "format", "jpeg", str(src_file), "--out", str(dest_path)],
                capture_output=True
            )
            print(f"  [{i:02d}] {src_file.name} → (JPG) {dest_path.relative_to(Path(__file__).parent.parent)}")
        else:
            shutil.copy2(src_file, dest_path)
            print(f"  [{i:02d}] {src_file.name} → {dest_path.relative_to(Path(__file__).parent.parent)}")

    print("\nDone! Next steps:")
    print("  1. npm run build")
    print("  2. printf 'y\\n' | python3 tools/upload_week_images_r2.py 16 17 18")
    print("  3. Verify CDN, then git add + commit + push")


if __name__ == "__main__":
    main()
