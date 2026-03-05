#!/usr/bin/env python3
"""
Upload images for specific weeks to Cloudflare R2
Usage: python3 tools/upload_week_images_r2.py 9 10
       python3 tools/upload_week_images_r2.py 9    # Single week
"""

import os
import sys
import subprocess
import glob
from pathlib import Path

BUCKET_NAME = "engquest-images"
R2_PREFIX = "images"
BASE_PATH = Path(__file__).parent.parent / "public" / "images"

def get_content_type(file_path):
    """Detect MIME type from file extension."""
    ext = file_path.suffix.lower()
    return {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.webp': 'image/webp',
    }.get(ext, 'application/octet-stream')

def upload_file_to_r2(local_path, r2_key):
    """Upload a single file to R2 using wrangler."""
    content_type = get_content_type(local_path)
    
    try:
        result = subprocess.run(
            [
                "npx", "wrangler", "r2", "object", "put",
                f"{BUCKET_NAME}/{r2_key}",
                f"--file={local_path}",
                f"--content-type={content_type}",
                "--cache-control=public, max-age=31536000, immutable",
                "--remote"
            ],
            capture_output=True,
            text=True,
            timeout=30
        )
        
        if result.returncode == 0:
            return True
        else:
            print(f"    ❌ Upload failed: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"    ❌ Error: {e}")
        return False

def upload_week_images(week_number):
    """Upload all images for a specific week (advanced + easy modes)."""
    week_str_padded = str(week_number).zfill(2)
    
    # Week folder names to check
    week_folders = [
        f"week{week_str_padded}",        # week09
        f"week{week_str_padded}_easy",   # week09_easy
        f"week{week_number}",            # week9 (fallback)
        f"week{week_number}_easy"        # week9_easy (fallback)
    ]
    
    total_uploaded = 0
    total_failed = 0
    
    for folder in week_folders:
        folder_path = BASE_PATH / folder
        
        if not folder_path.exists():
            continue
        
        # Find all image files
        image_files = []
        for ext in ['*.jpg', '*.jpeg', '*.png', '*.webp']:
            image_files.extend(folder_path.glob(ext))
        
        if not image_files:
            print(f"  ⚠️  No images found in {folder}")
            continue
        
        print(f"\n📁 Uploading {folder}/ ({len(image_files)} files)")
        print("─" * 60)
        
        for i, img_path in enumerate(sorted(image_files), 1):
            # R2 key: images/week09/city.jpg
            rel_path = img_path.relative_to(BASE_PATH)
            r2_key = f"{R2_PREFIX}/{rel_path}".replace('\\', '/')  # Windows compatibility
            
            # Upload
            success = upload_file_to_r2(img_path, r2_key)
            
            if success:
                print(f"  ✅ [{i}/{len(image_files)}] {img_path.name}")
                total_uploaded += 1
            else:
                print(f"  ❌ [{i}/{len(image_files)}] {img_path.name}")
                total_failed += 1
    
    return total_uploaded, total_failed

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 tools/upload_week_images_r2.py <week_numbers>")
        print("Example: python3 tools/upload_week_images_r2.py 9 10")
        sys.exit(1)
    
    # Check wrangler installed
    try:
        result = subprocess.run(["npx", "wrangler", "--version"], capture_output=True)
        if result.returncode != 0:
            print("❌ Wrangler not found. Install: npm i -g wrangler")
            sys.exit(1)
    except:
        print("❌ Wrangler not found. Install: npm i -g wrangler")
        sys.exit(1)
    
    # Parse week numbers
    week_numbers = [int(w) for w in sys.argv[1:]]
    
    print(f"\n🖼️  UPLOAD WEEK IMAGES TO CLOUDFLARE R2")
    print("=" * 70)
    print(f"Bucket   : {BUCKET_NAME}")
    print(f"Weeks    : {', '.join(map(str, week_numbers))}")
    print(f"CDN URL  : https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev")
    print("=" * 70)
    
    # Confirm
    confirm = input(f"\n🚦 Upload images for Week {', '.join(map(str, week_numbers))}? (y/n): ")
    if confirm.lower() != 'y':
        print("❌ Cancelled")
        sys.exit(0)
    
    # Upload each week
    total_uploaded = 0
    total_failed = 0
    
    for week in week_numbers:
        uploaded, failed = upload_week_images(week)
        total_uploaded += uploaded
        total_failed += failed
    
    # Summary
    print("\n" + "=" * 70)
    print(f"✅ UPLOAD COMPLETE")
    print(f"   Uploaded: {total_uploaded} files")
    print(f"   Failed  : {total_failed} files")
    print("=" * 70)
    
    if total_uploaded > 0:
        print("\n🔗 Images now available at:")
        for week in week_numbers:
            print(f"   https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/images/week{str(week).zfill(2)}/")
    
    print("\n📋 Verify images load in browser before deploying!")

if __name__ == "__main__":
    main()
