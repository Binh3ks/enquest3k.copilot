#!/usr/bin/env python3
"""
Emergency migration script - Add real_email column to Railway PostgreSQL
Run this locally to fix production database directly
"""
import os

# Railway PostgreSQL connection string
# Get from: Railway Dashboard → engquest3k → PostgreSQL → Connect → Connection String
DATABASE_URL = os.getenv('RAILWAY_DATABASE_URL') or input("Enter Railway DATABASE_URL: ")

try:
    import psycopg2
    from psycopg2 import sql
    
    print("🔗 Connecting to Railway PostgreSQL...")
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    print("🔧 Running migration: Add real_email column...")
    cur.execute("""
        ALTER TABLE users 
        ADD COLUMN IF NOT EXISTS real_email VARCHAR(255);
    """)
    
    print("📊 Creating index on real_email...")
    cur.execute("""
        CREATE INDEX IF NOT EXISTS idx_users_real_email 
        ON users(real_email);
    """)
    
    conn.commit()
    
    print("✅ Verifying column exists...")
    cur.execute("""
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'real_email';
    """)
    result = cur.fetchone()
    
    if result:
        print(f"✅ SUCCESS! Column created:")
        print(f"   - Name: {result[0]}")
        print(f"   - Type: {result[1]}")
        print(f"   - Nullable: {result[2]}")
    else:
        print("❌ Verification failed - column not found")
    
    cur.close()
    conn.close()
    print("\n✨ Migration completed successfully!")
    
except ImportError:
    print("❌ psycopg2 not installed")
    print("Install it with: pip install psycopg2-binary")
    exit(1)
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)
