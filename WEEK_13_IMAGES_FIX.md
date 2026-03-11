# FIX: Week 13 Images Not Displaying

**Date:** March 11, 2026  
**Status:** ✅ READY TO FIX  
**Action Required:** Set environment variable in Cloudflare Pages

## 🔍 Problem Analysis

**Symptom:** 
- Week 13 images show as broken/missing on deployed site (enquest3k.pages.dev)
- Images work fine locally during development

**Root Cause:**
1. ❌ Images uploaded to R2 CDN but **NOT committed to git** (public/images/week13/ is untracked)
2. ❌ Cloudflare Pages deployment doesn't have Week 13 images (only has what's in git)
3. ❌ `VITE_IMAGES_CDN_URL` env var not set → app tries to load from local path `/images/week13/breakfast.jpg`
4. ❌ imageUrl.js had wrong CDN URL in documentation

**Why This Happened:**
- auto_rename.py renamed images from PNG to JPG
- Images uploaded to R2 successfully (verified with curl)
- BUT images folder not added to git
- Deployment can't find images at local path

## ✅ Solution

### Option 1: Use R2 CDN (RECOMMENDED) ⭐

**Advantages:**
- ✅ Faster load times (CDN vs static hosting)
- ✅ Smaller git repo (no large binary files)
- ✅ Images already on R2 (30 files uploaded)

**Steps:**

1. **Go to Cloudflare Dashboard:**
   https://dash.cloudflare.com → Workers & Pages → engquest3k → Settings → Environment variables

2. **Add new environment variable:**
   ```
   Variable name:  VITE_IMAGES_CDN_URL
   Value:          https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev
   ```

3. **Apply to both environments:**
   - ✅ Production
   - ✅ Preview

4. **Save**
   - Cloudflare will automatically trigger a new deployment
   - Wait 2-3 minutes for deployment to complete

5. **Verify:**
   - Visit: https://enquest3k.pages.dev/week/13/new_words
   - Images should now load from R2 CDN

### Option 2: Commit Images to Git (NOT RECOMMENDED)

**Disadvantages:**
- Larger git repo (~9 MB for Week 13 images)
- Slower git operations
- Need to repeat for every future week

**Steps (if you really want to):**
```bash
git add public/images/week13/ public/images/week13_easy/
git commit -m "feat(week13): add images to static assets"
git push
```

## 🧪 Testing

### Test R2 CDN URLs (Manual Verification)

```bash
# Week 13 Advanced
curl -I https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev/images/week13/breakfast.jpg
curl -I https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev/images/week13/toothbrush.jpg

# Week 13 Easy  
curl -I https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev/images/week13_easy/breakfast.jpg
curl -I https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev/images/week13_easy/teeth.jpg

# All should return: HTTP/1.1 200 OK ✅
```

### Test on Deployed Site (After Setting Env Var)

1. Open: https://enquest3k.pages.dev/week/13/new_words
2. Open browser DevTools (F12) → Network tab
3. Filter by "Images"
4. Should see requests to: `pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev/images/week13/*.jpg`
5. All should return 200 status

## 📊 Files Status

**Local Files:**
```
✅ public/images/week13/         (15 files, 4.4 MB) - NOT in git
✅ public/images/week13_easy/    (15 files, 4.5 MB) - NOT in git
```

**R2 CDN (engquest-images bucket):**
```
✅ images/week13/         (15 files) - UPLOADED
✅ images/week13_easy/    (15 files) - UPLOADED
```

**Git Status:**
```
?? public/images/week13/         (untracked)
?? public/images/week13_easy/    (untracked)
```

## 🔧 What Was Fixed in Code

**1. src/utils/imageUrl.js**
   - ❌ BEFORE: `pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev` (audio bucket)
   - ✅ AFTER:  `pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev` (images bucket)

**2. .env.example**
   - Added: `VITE_IMAGES_CDN_URL=https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev`
   - Added: `VITE_CDN_URL=https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev` (audio)

**3. Local .env**
   - Added: `VITE_IMAGES_CDN_URL=https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev`

## 📚 Related Files

- [tools/upload_week_images_r2.py](../tools/upload_week_images_r2.py) - Upload script (already run)
- [tools/auto_rename.py](../tools/auto_rename.py) - Rename script (already run)
- [src/utils/imageUrl.js](../src/utils/imageUrl.js) - Image URL resolver
- [.env.example](../.env.example) - Environment variable template

## 🎯 Next Week Prevention

**Checklist for Week 14+ Images:**

1. Create folders FIRST:
   ```bash
   mkdir -p public/images/week14 public/images/week14_easy
   ```

2. Generate images (DALL-E/Midjourney)

3. Download to correct folders

4. Rename with auto_rename.py:
   ```bash
   python3 auto_rename.py 14
   ```

5. Upload to R2:
   ```bash
   python3 tools/upload_week_images_r2.py 14
   ```

6. **DO NOT commit to git** (use CDN via env var)

7. Images will automatically work on deployed site ✅

## ✅ Summary

**Changes Committed:**
- ✅ Updated imageUrl.js with correct CDN URL
- ✅ Updated .env.example with VITE_IMAGES_CDN_URL
- ✅ Updated local .env with VITE_IMAGES_CDN_URL

**Action Required (You):**
- ⏳ Set `VITE_IMAGES_CDN_URL` in Cloudflare Pages dashboard
- ⏳ Verify images load on deployed site

**Images on R2:**
- ✅ 30 files uploaded (15 Advanced + 15 Easy)
- ✅ All accessible via CDN
- ✅ Ready to serve once env var is set

---

**Created:** March 11, 2026  
**Cause:** Week 13 images not committed to git + env var not set  
**Solution:** Set VITE_IMAGES_CDN_URL in Cloudflare Pages
