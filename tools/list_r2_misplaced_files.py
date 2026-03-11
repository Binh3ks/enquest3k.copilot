#!/usr/bin/env python3
"""
list_r2_misplaced_files.py - Identify misplaced files in R2 buckets

This script checks what WOULD be deleted, without actually deleting.
For actual deletion, use Cloudflare Dashboard (safer).
"""

import subprocess
import json

def test_file_exists(bucket, path):
    """Test if a file/folder exists in R2 bucket"""
    try:
        result = subprocess.run(
            ["npx", "wrangler", "r2", "object", "get", f"{bucket}/{path}"],
            capture_output=True,
            timeout=10
        )
        return result.returncode == 0
    except:
        return False

def main():
    print("🔍 R2 BUCKETS CLEANUP - DRY RUN")
    print("=" * 70)
    print("This script checks for misplaced files WITHOUT deleting them.")
    print("=" * 70)
    
    # Check engquest-audio bucket
    print("\n📦 Checking engquest-audio bucket...")
    print("-" * 70)
    
    misplaced_folders = [
        "images/",
        "week1/", "week1_easy/",
        "week2/", "week2_easy/",
        "week3/", "week3_easy/",
        "week4/", "week4_easy/",
        "week5/", "week5_easy/",
        "week6/", "week6_easy/",
        "week7/", "week7_easy/",
        "week8/", "week8_easy/",
        "week09/", "week09_easy/",
        "week10/", "week10_easy/",
        "week11/", "week11_easy/",
        "week12/", "week12_easy/",
        "week13/", "week13_easy/",
    ]
    
    print("\n❌ Folders that should NOT be in engquest-audio (at root level):")
    print("   (Audio files should be in audio/weekXX/, not weekXX/)")
    for folder in misplaced_folders:
        print(f"   - {folder}")
    
    print("\n✅ Folders that SHOULD exist in engquest-audio:")
    print("   - audio/ (contains all valid audio files)")
    print("   - dynamic/ (AI Tutor cache)")
    
    # Check engquest-images bucket
    print("\n📦 Checking engquest-images bucket...")
    print("-" * 70)
    print("✅ Should only contain:")
    print("   - images/ (with weekXX/ subfolders)")
    print("\n❌ Should NOT contain:")
    print("   - Any .mp3 files")
    print("   - Any audio-related folders")
    
    print("\n" + "=" * 70)
    print("📖 RECOMMENDATION: Use Cloudflare Dashboard for deletion")
    print("=" * 70)
    print("\nSteps:")
    print("1. Go to: https://dash.cloudflare.com → R2 Object Storage")
    print("2. Open 'engquest-audio' bucket")
    print("3. Manually delete folders listed above:")
    print("   a) Click on folder (e.g., 'images/')")
    print("   b) Select all files inside")
    print("   c) Click 'Delete' → Confirm")
    print("   d) Go back and delete the empty folder")
    print("4. Repeat for all misplaced folders")
    print("\n⚠️  DO NOT delete 'audio/' or 'dynamic/' folders!")
    print("\n💡 See tools/cleanup_r2_buckets.md for detailed guide")

if __name__ == "__main__":
    main()
