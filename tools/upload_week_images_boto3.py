#!/usr/bin/env python3
"""
Upload Week Images to Cloudflare R2 using standard S3 Boto3 API
"""

import os
import sys
import mimetypes
from pathlib import Path
import boto3
from dotenv import load_dotenv

load_dotenv()

# Load env variables manually if dotenv didn't load from root
env_path = Path(__file__).parent.parent / ".env"
if env_path.exists():
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                os.environ.setdefault(k.strip(), v.strip())

account_id = os.getenv('CLOUDFLARE_ACCOUNT_ID', 'f089673998f42f63f5df79b47e240212')
endpoint_url = os.getenv('R2_ENDPOINT_URL') or f"https://{account_id}.r2.cloudflarestorage.com"
access_key = os.getenv('R2_ACCESS_KEY_ID')
secret_key = os.getenv('R2_SECRET_ACCESS_KEY')

s3 = boto3.client(
    service_name='s3',
    endpoint_url=endpoint_url,
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
    region_name='auto'
)

BUCKET_NAME = 'engquest-images'
BASE_PATH = Path(__file__).parent.parent / "public" / "images"

def upload_week(week_num):
    week_folder = BASE_PATH / f"week{week_num}"
    if not week_folder.exists():
        print(f"Directory {week_folder} does not exist!")
        return 0, 0
    
    files = list(week_folder.glob('*.*'))
    print(f"\n📁 Uploading {len(files)} files from {week_folder.name} to R2 ({BUCKET_NAME})...")
    
    uploaded = 0
    failed = 0
    for f in files:
        if f.is_dir(): continue
        mime_type, _ = mimetypes.guess_type(f)
        if not mime_type:
            mime_type = 'image/png' if f.suffix == '.png' else 'image/jpeg'
            
        r2_key = f"images/week{week_num}/{f.name}"
        try:
            with open(f, 'rb') as data:
                s3.put_object(
                    Bucket=BUCKET_NAME,
                    Key=r2_key,
                    Body=data,
                    ContentType=mime_type
                )
            print(f"  ✅ {r2_key} ({f.stat().st_size} bytes)")
            uploaded += 1
        except Exception as e:
            print(f"  ❌ Failed {r2_key}: {e}")
            failed += 1
            
    return uploaded, failed

def main():
    week = int(sys.argv[1]) if len(sys.argv) > 1 and sys.argv[1].isdigit() else 34
    uploaded, failed = upload_week(week)
    print(f"\n======================================================================")
    print(f"✅ R2 UPLOAD RESULT: {uploaded} succeeded, {failed} failed.")
    print(f"======================================================================")

if __name__ == '__main__':
    main()
