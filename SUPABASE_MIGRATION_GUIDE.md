# Supabase Migration Guide — Step by Step

## Overview
Migration from Railway/Neon/CockroachDB → **Supabase** (Supabase Auth + Supabase DB).
The Railway backend will connect to Supabase as its database.

---

## PHASE 1: Get Supabase Credentials

### 1.1 Service Role Key (for importing data)
1. Go to: https://supabase.com/dashboard/project/dlvjqdyvatceidzeyfnq/settings/api
2. Find **"Service Role Secret"** (under "Project API" → "service_role")
3. Copy it — it looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
4. Save it somewhere safe (don't share it publicly)

### 1.2 JWT Secret (for Railway to verify Supabase JWTs)
1. In the same page (Supabase Dashboard → Settings → API)
2. Find **"JWT Secret"**
3. Copy it — it starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
4. This is different from the Service Role Key!

### 1.3 Database Password (to build DATABASE_URL)
1. Go to: https://supabase.com/dashboard/project/dlvjqdyvatceidzeyfnq/settings/database
2. Find **"Database password"** (under "Connection Info")
3. Or use the **"Connection string"** section which gives you a ready-to-use URL
4. The connection string format is:
   ```
   postgresql://postgres.[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
   Example (with password `mypassword123`):
   ```
   postgresql://postgres.mypassword123@aws-0-xxx.pooler.supabase.com:6543/postgres
   ```

---

## PHASE 2: Import User Data into Supabase

### 2.1 Run the import (you need Service Role Key from 1.1)
```bash
export SUPABASE_SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  # from step 1.1
node import_supabase.js users.json
```

Expected output:
```
Importing into https://dlvjqdyvatceidzeyfnq.supabase.co...
  ✓ users: imported 1 rows
✓ Total rows imported: 1
Next: update Railway environment variables with Supabase DATABASE_URL
```

---

## PHASE 3: Update Railway Environment Variables

Go to: https://railway.app/project/enquest3k

### 3.1 DELETE these old variables (if they exist):
- `PG_HOST`
- `PG_USER`
- `PG_PASSWORD`
- `PG_DATABASE`
- `PG_PORT`
- `PG_SSL`

### 3.2 ADD these new variables:

**Variable 1: `DATABASE_URL`**
```
postgresql://postgres.[YOUR-DB-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```
Replace `[YOUR-DB-PASSWORD]` with your database password from step 1.3.
Replace `[REGION]` with your actual region (e.g., `ap-southeast-1` or similar).

Example:
```
postgresql://postgres.mypassword123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

**Variable 2: `SUPABASE_JWT_SECRET`**
```
[YOUR-JWT-SECRET]  # from step 1.2
```

### 3.3 Redeploy
After saving the variables, Railway will automatically redeploy.
Wait ~30 seconds for the deployment to complete.

---

## PHASE 4: Verify

1. Go to your app at https://engquest3k.vercel.app (or your custom domain)
2. Try logging in with your Supabase credentials (GitHub OAuth or email/password)
3. Check Railway logs to confirm no more "column does not exist" errors

---

## Troubleshooting

### "column does not exist" errors persist
→ Railway is still connected to the old database. Double-check DATABASE_URL is set correctly and the old PG_* variables are deleted.

### "Token is not valid" error
→ The SUPABASE_JWT_SECRET is wrong or not set. Get the correct one from Supabase Dashboard → Settings → API → JWT Secret.

### Login page shows error
→ Check Railway logs for the specific error. If it says "relation does not exist", the schema hasn't been created in Supabase (run supabase_schema.sql first).
