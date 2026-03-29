#!/usr/bin/env python3
"""
Delete stale Week 22 audio from R2 to force fresh on-demand TTS generation.
Root cause: dataHooks.js injects path-based audio_url for dictation/shadowing/explore.
If old W22 content was ever played, those R2 paths hold stale audio.
This deletes both normal + easy mode prefixes.
"""

import boto3
import os
from dotenv import load_dotenv

load_dotenv()

# R2 credentials
s3 = boto3.client(
    service_name='s3',
    endpoint_url=os.getenv('R2_ENDPOINT_URL'),
    aws_access_key_id=os.getenv('R2_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('R2_SECRET_ACCESS_KEY'),
    region_name='auto'
)

BUCKET_NAME = 'engquest-audio'
PREFIXES = [
    'audio/week22/',
    'audio/week22_easy/',
]

all_objects = []

for prefix in PREFIXES:
    print(f"🔍 Listing objects in {BUCKET_NAME}/{prefix}...")
    try:
        paginator = s3.get_paginator('list_objects_v2')
        pages = paginator.paginate(Bucket=BUCKET_NAME, Prefix=prefix)
        for page in pages:
            if 'Contents' in page:
                all_objects.extend(page['Contents'])
    except Exception as e:
        print(f"❌ Error listing {prefix}: {e}")
        exit(1)

if not all_objects:
    print("✅ No stale files found - R2 is already clean for W22!")
    exit(0)

print(f"\n📦 Found {len(all_objects)} stale files:")
for obj in all_objects:
    print(f"  - {obj['Key']}")

print(f"\n🗑️  Deleting {len(all_objects)} stale W22 audio files...")

# Delete in batches of 1000 (S3 limit)
for i in range(0, len(all_objects), 1000):
    batch = all_objects[i:i+1000]
    delete_keys = [{'Key': obj['Key']} for obj in batch]
    try:
        response = s3.delete_objects(
            Bucket=BUCKET_NAME,
            Delete={'Objects': delete_keys}
        )
        deleted_count = len(response.get('Deleted', []))
        errors = response.get('Errors', [])
        if errors:
            for err in errors:
                print(f"  ⚠️  Failed to delete {err['Key']}: {err['Message']}")
        print(f"  ✅ Deleted batch {i//1000 + 1}: {deleted_count} files")
    except Exception as e:
        print(f"❌ Error deleting batch: {e}")
        exit(1)

print(f"\n🎉 SUCCESS! Deleted {len(all_objects)} stale W22 audio files.")
print("\n📋 Next steps:")
print("  1. git commit + push the code changes")
print("  2. Deploy to Cloudflare Pages")
print("  3. Test W22 dictation + shadowing - will auto-generate fresh TTS with correct text")
print("  4. Test W22 explore - will auto-generate fresh narration audio")
