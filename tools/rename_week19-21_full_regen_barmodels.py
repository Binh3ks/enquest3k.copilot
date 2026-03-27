from pathlib import Path
import re
import shutil
import subprocess
import sys

TARGETS = []

for p in range(1, 6):
    TARGETS.append((f"barmodel_w19_easy_p{p}_v5.jpg", Path("public/images/week19")))
for p in range(1, 6):
    TARGETS.append((f"barmodel_w19_adv_p{p}_v2.jpg", Path("public/images/week19")))
for p in range(1, 6):
    TARGETS.append((f"barmodel_w20_easy_p{p}_v3.jpg", Path("public/images/week20")))
for p in range(1, 6):
    TARGETS.append((f"barmodel_w20_adv_p{p}_v2.jpg", Path("public/images/week20")))
for p in range(1, 6):
    TARGETS.append((f"barmodel_w21_easy_p{p}_v2.jpg", Path("public/images/week21")))
for p in range(1, 6):
    TARGETS.append((f"barmodel_w21_adv_p{p}_v2.jpg", Path("public/images/week21")))

NAME_PATTERNS = [
    re.compile(r"(barmodel_w19_easy_p[1-5]_v5)_jpg", re.I),
    re.compile(r"(barmodel_w19_adv_p[1-5]_v2)_jpg", re.I),
    re.compile(r"(barmodel_w20_easy_p[1-5]_v3)_jpg", re.I),
    re.compile(r"(barmodel_w20_adv_p[1-5]_v2)_jpg", re.I),
    re.compile(r"(barmodel_w21_easy_p[1-5]_v2)_jpg", re.I),
    re.compile(r"(barmodel_w21_adv_p[1-5]_v2)_jpg", re.I),
]


def extract_target_name(filename: str):
    for pattern in NAME_PATTERNS:
        match = pattern.search(filename)
        if match:
            return f"{match.group(1)}.jpg"
    return None


def convert_or_copy(src: Path, dest: Path):
    dest.parent.mkdir(parents=True, exist_ok=True)
    if src.suffix.lower() in {'.png', '.webp'}:
        result = subprocess.run(
            ['sips', '-s', 'format', 'jpeg', str(src), '--out', str(dest)],
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            raise RuntimeError(result.stderr.strip() or f"Failed converting {src}")
    else:
        shutil.copy2(src, dest)


def main():
    if len(sys.argv) < 2:
        print('Usage: python3 tools/rename_week19-21_full_regen_barmodels.py "/path/to/source"')
        sys.exit(1)

    src_dir = Path(sys.argv[1])
    if not src_dir.exists():
        print(f'Source directory not found: {src_dir}')
        sys.exit(1)

    files = sorted([f for f in src_dir.iterdir() if f.suffix.lower() in {'.png', '.jpg', '.jpeg', '.webp'}])
    named_matches = []
    for file in files:
        target_name = extract_target_name(file.name)
        if target_name:
            named_matches.append((file, target_name))

    if len(named_matches) == 30:
        target_lookup = {name: folder for name, folder in TARGETS}
        mapping = []
        for src_file, target_name in sorted(named_matches, key=lambda item: item[1]):
            mapping.append((src_file, target_lookup[target_name] / target_name))
    else:
        if len(files) != 30:
            print(f'Expected 30 files, found {len(files)}')
            for file in files:
                print(f'  {file.name}')
            sys.exit(1)
        mapping = []
        for src_file, (target_name, target_folder) in zip(sorted(files), TARGETS):
            mapping.append((src_file, target_folder / target_name))

    for index, (src_file, dest_file) in enumerate(mapping, 1):
        convert_or_copy(src_file, dest_file)
        print(f'[{index:02d}/30] {src_file.name} -> {dest_file}')

    print('Done. Next: printf \'y\\n\' | python3 tools/upload_week_images_r2.py 19 20 21')


if __name__ == '__main__':
    main()
