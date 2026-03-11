# SET CLOUDFLARE PAGES ENV VAR - IMAGES CDN

**Action Required:** Add environment variable to Cloudflare Pages

## 🎯 Why This is Needed

Week 13 images are **ONLY on R2 CDN**, not committed to git.  
App needs `VITE_IMAGES_CDN_URL` to know where to load images from.

**Benefits:**
- ✅ Smaller git repo (no binary image files)
- ✅ Faster git operations
- ✅ Images load from CDN (better performance)
- ✅ Consistent with audio strategy (also R2 CDN)

## 📋 Steps

### 1. Go to Cloudflare Pages Dashboard

https://dash.cloudflare.com → Workers & Pages → **engquest3k** → Settings → **Environment variables**

### 2. Add Variable

Click **"Add variable"** (or "Edit variables")

**Variable name:**
```
VITE_IMAGES_CDN_URL
```

**Value:**
```
https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev
```

### 3. Select Environments

Apply to:
- ✅ **Production** (Required)
- ✅ **Preview** (Optional but recommended)

### 4. Save & Deploy

Click **"Save"**

Cloudflare will automatically:
- Trigger a new deployment
- Rebuild with the new env var
- Deploy in ~2-3 minutes

### 5. Verify

After deployment completes:

**Test on deployed site:**
1. Visit: https://enquest3k.pages.dev/week/13/new_words
2. Open DevTools (F12) → **Network** tab
3. Filter by **"Img"**
4. Should see requests to: `pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev/images/week13/*.jpg`
5. All should return **200 OK** ✅

**Quick test in browser console:**
```javascript
// Should output the R2 CDN URL
console.log(import.meta.env.VITE_IMAGES_CDN_URL);
// Expected: https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev
```

## 🔍 How It Works

**Code: `src/utils/imageUrl.js`**
```javascript
const IMAGES_CDN = import.meta.env.VITE_IMAGES_CDN_URL ?? '';

export function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (IMAGES_CDN) return `${IMAGES_CDN}${path}`; // ← Uses CDN if env var set
  return path; // Fallback to local (dev mode)
}
```

**Behavior:**
- ✅ **With env var:** Images load from R2 CDN  
  `https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev/images/week13/breakfast.jpg`
- ⚠️ **Without env var:** Tries local path (will 404 since images not in git)  
  `/images/week13/breakfast.jpg` → 404 Not Found

## 📊 Current Status

**Local (.env):**
```bash
✅ VITE_CDN_URL=https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev (audio)
✅ VITE_IMAGES_CDN_URL=https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev (images)
```

**Cloudflare Pages (Production):**
```bash
✅ VITE_CDN_URL=... (already set)
❌ VITE_IMAGES_CDN_URL=... (NEEDS TO BE SET)
```

**R2 Buckets:**
```bash
✅ engquest-audio: Audio files (Week 1-13)
✅ engquest-images: Image files (Week 1-13)
   └── images/week13/ (15 files)
   └── images/week13_easy/ (15 files)
```

**Git Repository:**
```bash
✅ Week 1-12 images: In git (legacy approach)
✅ Week 13 images: Only on R2 CDN (new approach)
```

## 🚀 Future Weeks

For Week 14+, same process:

1. Generate images
2. Rename with `python3 auto_rename.py 14`
3. Upload to R2: `python3 tools/upload_week_images_r2.py 14`
4. **DO NOT commit to git**
5. Images automatically work via CDN ✅

No need to set env var again (already set once).

## ⚠️ Troubleshooting

**Images still not loading after setting env var:**
1. Check deployment completed (Dashboard → Deployments)
2. Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check Network tab: Should see requests to R2 CDN
4. Verify env var in Cloudflare Pages settings

**Deployment failed:**
1. Check build logs in Cloudflare Dashboard
2. Ensure env var name is exactly: `VITE_IMAGES_CDN_URL` (case-sensitive)
3. Ensure URL doesn't have trailing slash

## 📚 Related Documentation

- [tools/upload_week_images_r2.py](tools/upload_week_images_r2.py) - Upload images to R2
- [src/utils/imageUrl.js](src/utils/imageUrl.js) - Image URL resolver
- [.env.example](.env.example) - Environment variable template

---

**Created:** March 11, 2026  
**Reason:** Week 13 images only on R2, not in git  
**Status:** ⏳ Waiting for env var to be set in Cloudflare Pages
