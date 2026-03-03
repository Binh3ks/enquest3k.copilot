#!/usr/bin/env python3
"""
Configure CORS for Cloudflare R2 bucket to allow browser audio playback.

Run this once to enable cross-origin audio loading from the web app.
"""

import boto3
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# R2 credentials (S3-compatible)
R2_ENDPOINT = os.getenv('R2_ENDPOINT', 'https://your-account-id.r2.cloudflarestorage.com')
R2_ACCESS_KEY = os.getenv('R2_ACCESS_KEY_ID')
R2_SECRET_KEY = os.getenv('R2_SECRET_ACCESS_KEY')
R2_BUCKET = os.getenv('R2_BUCKET_NAME', 'engquest-audio')

def configure_cors():
    """Set CORS policy on R2 bucket to allow browser audio playback."""
    
    # Initialize S3 client for R2
    s3 = boto3.client(
        's3',
        endpoint_url=R2_ENDPOINT,
        aws_access_key_id=R2_ACCESS_KEY,
        aws_secret_access_key=R2_SECRET_KEY,
        region_name='auto'
    )
    
    # CORS configuration for audio playback
    cors_config = {
        'CORSRules': [
            {
                'AllowedOrigins': ['*'],  # Allow all origins (or specify your domain)
                'AllowedMethods': ['GET', 'HEAD'],  # Only read operations
                'AllowedHeaders': ['*'],  # Allow all headers
                'ExposeHeaders': ['ETag', 'Content-Length', 'Content-Type'],
                'MaxAgeSeconds': 3600  # Cache preflight for 1 hour
            }
        ]
    }
    
    try:
        # Apply CORS configuration
        s3.put_bucket_cors(
            Bucket=R2_BUCKET,
            CORSConfiguration=cors_config
        )
        print(f"✅ CORS configured for bucket: {R2_BUCKET}")
        print("   - Allowed origins: * (all)")
        print("   - Allowed methods: GET, HEAD")
        print("   - Max age: 3600s")
        
        # Verify configuration
        response = s3.get_bucket_cors(Bucket=R2_BUCKET)
        print(f"\n✅ Verified CORS rules: {len(response['CORSRules'])} rule(s) active")
        
    except Exception as e:
        print(f"❌ Failed to configure CORS: {e}")
        return False
    
    return True

if __name__ == '__main__':
    print("Configuring CORS for R2 bucket...\n")
    success = configure_cors()
    exit(0 if success else 1)
