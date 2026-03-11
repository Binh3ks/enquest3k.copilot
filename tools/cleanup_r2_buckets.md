# R2 Buckets Cleanup Guide - Week 13

Generated: March 11, 2026

## 🎯 Objective
Clean up misplaced files in R2 buckets to prevent future confusion.

## 📋 Current Issues Found

### `engquest-audio` bucket (AUDIO ONLY)
**Should contain:**
- ✅ `audio/` - All audio files organized by week
- ✅ `dynamic/` - AI Tutor cached audio
- ✅ `ai_tutor_cache/` - AI Tutor cache (if exists)

**WRONG - Need to delete:**
- ❌ `images/` folder - Images should be in `engquest-images` bucket
- ❌ `week1/`, `week2/`, `week3/`, etc. - Audio files at root level (should be in `audio/` folder)
- ❌ `week1_easy/`, `week2_easy/`, `week3_easy/`, etc. - Easy mode audio at root level

### `engquest-images` bucket (IMAGES ONLY)
**Should contain:**
- ✅ `images/` - All image files organized by week (week1/, week2/, week13/, week13_easy/, etc.)

**Check for:**
- ❌ Any audio files (*.mp3) - Should NOT exist here

## 🧹 Cleanup Steps

### Step 1: Verify Current Structure

**Via Cloudflare Dashboard:**
1. Go to: https://dash.cloudflare.com → R2 Object Storage
2. Open `engquest-audio` bucket
3. Verify folders listed in screenshot match above

**Via Command Line (if rclone installed):**
```bash
# Install rclone if needed
brew install rclone

# Configure for Cloudflare R2
rclone config

# List engquest-audio
rclone ls cloudflare-r2:engquest-audio --max-depth 2

# List engquest-images
rclone ls cloudflare-r2:engquest-images --max-depth 2
```

### Step 2: Delete Misplaced Files in `engquest-audio`

#### Option A: Manual Deletion (SAFEST - Recommended)

**In Cloudflare Dashboard:**
1. Navigate to R2 → `engquest-audio` bucket
2. **Delete `images/` folder:**
   - Click on `images/` folder
   - Select all files (or checkbox at top)
   - Click "Delete" → Confirm
   - Go back and delete the empty `images/` folder

3. **Delete misplaced `weekX/` folders (one by one):**
   - Delete `week1/` (and all contents)
   - Delete `week1_easy/` (and all contents)
   - Delete `week2/` (and all contents)
   - Delete `week2_easy/` (and all contents)
   - Delete `week3/` (and all contents)
   - Delete `week3_easy/` (and all contents)
   - Continue for all week folders at root level...

**⚠️ DO NOT DELETE:**
- `audio/` folder (contains all valid audio files)
- `dynamic/` folder (contains AI Tutor cache)
- `ai_tutor_cache/` folder (if exists)

#### Option B: Script Deletion (Advanced)

**Create deletion script:**

```python
#!/usr/bin/env python3
"""
cleanup_r2_audio_bucket.py - Remove misplaced files from engquest-audio bucket
"""
import subprocess
import sys

BUCKET = "engquest-audio"

# Folders to delete (at root level, NOT in audio/ or dynamic/)
FOLDERS_TO_DELETE = [
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

print(f"⚠️  WARNING: Will delete {len(FOLDERS_TO_DELETE)} folders from {BUCKET}")
print("\nFolders to delete:")
for folder in FOLDERS_TO_DELETE:
    print(f"  - {folder}")

confirm = input("\n🚦 Proceed with deletion? (type 'DELETE' to confirm): ")
if confirm != "DELETE":
    print("❌ Cancelled")
    sys.exit(0)

print("\n🗑️  Deleting folders...")
# Note: wrangler r2 object delete only works for individual files
# For folders, must delete all files inside first (requires listing)
# This is complex and better done via Dashboard

print("⚠️  Wrangler CLI doesn't support bulk folder deletion.")
print("Please use Cloudflare Dashboard to delete folders manually.")
print("\n📖 See: https://dash.cloudflare.com → R2 → engquest-audio")
```

### Step 3: Verify `engquest-images` Bucket

**Check for audio files:**
```bash
# Manual check in Dashboard
# 1. Open engquest-images bucket
# 2. Look for any .mp3 files
# 3. If found, delete them (they belong in engquest-audio/audio/)
```

### Step 4: Verify App Still Works

After cleanup:

```bash
# Test audio loading
curl -I https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week13/vocab_breakfast.mp3

# Test image loading  
curl -I https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev/images/week13/breakfast.jpg

# Both should return 200 OK
```

## ✅ Expected Final Structure

### `engquest-audio` bucket:
```
engquest-audio/
├── audio/
│   ├── week1/
│   ├── week1_easy/
│   ├── week2/
│   ├── week2_easy/
│   ├── ...
│   ├── week13/
│   └── week13_easy/
├── dynamic/
│   └── (AI Tutor generated audio)
└── ai_tutor_cache/ (optional)
```

### `engquest-images` bucket:
```
engquest-images/
└── images/
    ├── week1/
    ├── week1_easy/
    ├── week2/
    ├── week2_easy/
    ├── ...
    ├── week13/
    └── week13_easy/
```

## 📊 Storage Optimization

After cleanup, check storage usage:
- Cloudflare Dashboard → R2 → Each bucket → Metrics
- Should see reduction in storage if deleted significant data

## 🔒 Prevention for Future

**Updated checklist rules:**
1. ✅ Audio files → `engquest-audio/audio/weekXX/`
2. ✅ Images → `engquest-images/images/weekXX/`
3. ✅ AI Tutor cache → `engquest-audio/dynamic/`
4. ❌ Never put images in audio bucket
5. ❌ Never put audio files at bucket root level

**Upload scripts verified:**
- `tools/generate_audio_deepgram.py` → Uploads to `audio/weekXX/` ✅
- `tools/upload_week_images_r2.py` → Uploads to `images/weekXX/` in engquest-images ✅

## 🚨 IMPORTANT SAFETY NOTES

**DO NOT DELETE these folders:**
- `audio/` (contains all valid audio)
- `dynamic/` (AI Tutor cache)

**SAFE TO DELETE from engquest-audio:**
- `images/` (entire folder)
- `week1/`, `week2/`, ... `week13/` (at root, NOT inside audio/)
- `week1_easy/`, `week2_easy/`, ... `week13_easy/` (at root)

**How to identify safe vs unsafe:**
- ❌ Unsafe: `engquest-audio/weekX/` (root level)
- ✅ Safe: `engquest-audio/audio/weekX/` (inside audio/)

---

**Created:** March 11, 2026
**Reason:** Week 13 development revealed bucket organization issues
**Action:** Manual cleanup via Cloudflare Dashboard recommended
