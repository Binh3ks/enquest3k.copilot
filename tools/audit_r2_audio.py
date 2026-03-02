#!/usr/bin/env python3
"""Audit all local audio files against Cloudflare R2 CDN using concurrent requests."""
import urllib.request
import os
import concurrent.futures
from collections import defaultdict

BASE_URL = "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio"
BASE_DIR = "public/audio"
WEEKS = range(1, 21)
WORKERS = 40  # concurrent requests


def check_file(args):
    folder, filename = args
    url = f"{BASE_URL}/{folder}/{filename}"
    try:
        # Use browser User-Agent — R2 CDN blocks Python's default UA
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=8) as r:
            r.read(1)  # read 1 byte to confirm, then close
            return folder, filename, r.status
    except urllib.error.HTTPError as e:
        return folder, filename, e.code
    except Exception:
        return folder, filename, 0


def main():
    # Collect all files to check — all subdirs under public/audio/
    tasks = []
    if not os.path.isdir(BASE_DIR):
        print(f"❌ Directory not found: {BASE_DIR}")
        return

    for folder in sorted(os.listdir(BASE_DIR)):
        folder_path = os.path.join(BASE_DIR, folder)
        if not os.path.isdir(folder_path):
            continue
        files = sorted(f for f in os.listdir(folder_path) if f.endswith('.mp3'))
        for filename in files:
            tasks.append((folder, filename))

    print(f"🔍 Checking {len(tasks)} files across {len(set(t[0] for t in tasks))} folders...")
    print(f"   Using {WORKERS} concurrent connections...\n")

    missing_by_folder = defaultdict(list)
    ok = 0

    with concurrent.futures.ThreadPoolExecutor(max_workers=WORKERS) as executor:
        futures = {executor.submit(check_file, t): t for t in tasks}
        done = 0
        for future in concurrent.futures.as_completed(futures):
            folder, filename, code = future.result()
            done += 1
            if done % 100 == 0 or done == len(tasks):
                print(f"  Progress: {done}/{len(tasks)}", end='\r', flush=True)
            if code == 200:
                ok += 1
            else:
                missing_by_folder[folder].append((filename, code))

    print(f"\n{'='*55}")
    total_missing = sum(len(v) for v in missing_by_folder.values())
    print(f"✅ OK: {ok} / {len(tasks)} files")
    print(f"❌ MISSING: {total_missing} file(s)")
    print('='*55)

    if missing_by_folder:
        for folder in sorted(missing_by_folder.keys()):
            files = missing_by_folder[folder]
            print(f"\n  📁 {folder}: {len(files)} missing")
            for fname, code in sorted(files):
                print(f"     ❌ {fname} → {code}")
    else:
        print("\n🎉 All files are live on CDN!")

    return missing_by_folder


if __name__ == "__main__":
    main()
