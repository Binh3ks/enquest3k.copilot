#!/usr/bin/env python3
"""
Delete ALL Week 14 audio from R2 to force on-demand generation
with voiceConfig for all stations (male + female voices)
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
PREFIX = 'audio/week14/'

print(f"🔍 Listing all objects in {BUCKET_NAME}/{PREFIX}...")

# List all objects
try:
    paginator = s3.get_paginator('list_objects_v2')
    pages = paginator.paginate(Bucket=BUCKET_NAME, Prefix=PREFIX)
    
    all_objects = []
    for page in pages:
        if 'Contents' in page:
            all_objects.extend(page['Contents'])
    
    if not all_objects:
        print("✅ No files found - already clean!")
        exit(0)
    
    print(f"📦 Found {len(all_objects)} files:")
    for obj in all_objects[:10]:  # Show first 10
        print(f"  - {obj['Key']}")
    if len(all_objects) > 10:
        print(f"  ... and {len(all_objects) - 10} more")
    
    # Delete all
    print(f"\n🗑️  Deleting {len(all_objects)} files...")
    
    # Delete in batches of 1000 (S3 limit)
    for i in range(0, len(all_objects), 1000):
        batch = all_objects[i:i+1000]
        delete_keys = [{'Key': obj['Key']} for obj in batch]
        response = s3.delete_objects(
            Bucket=BUCKET_NAME,
            Delete={'Objects': delete_keys}
        )
        deleted_count = len(response.get('Deleted', []))
        print(f"  ✅ Deleted batch {i//1000 + 1}: {deleted_count} files")
    
    print(f"\n🎉 SUCCESS! Deleted {len(all_objects)} files from {PREFIX}")
    print("\n📋 Next steps:")
    print("  1. Commit + push code changes")
    print("  2. Deploy to Cloudflare Pages")
    print("  3. Test all stations - will auto-generate with correct voices:")
    print("     - read/explore: aura-orion-en (MALE)")
    print("     - new_word/word_power: aura-asteria-en (FEMALE)")
    print("     - dictation: aura-luna-en (FEMALE soft)")
    print("     - shadowing: aura-asteria-en (FEMALE clear)")
    
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)
