# WEEK 9-11 COVER IMAGE PROMPTS
**Theme-Specific | HYBRID Approach**

---

## WEEK 9: CITY SOUNDS & SIGHTS

**Theme:** Loud & Quiet Sounds, Urban Environment  
**Grammar:** Adjectives (loud/quiet)  
**Vocabulary:** car, bus, train, city, bell, honk, loud, quiet, street, traffic

### 📖 READ COVER (Advanced)
**Filename:** `read_cover_w09.jpg`  
**Prompt:**
```
3D illustration of two diverse children reading a book with pop-up city skyline, tall buildings and cars emerging from pages, urban adventure theme, Pixar style, vibrant colors, soft studio lighting, clean background.
```

### 🔍 EXPLORE COVER (Advanced)
**Filename:** `explore_cover_w09.jpg`  
**Prompt:**
```
3D illustration of diverse children exploring a vibrant city street with tall buildings, looking at busy traffic and modern architecture through magnifying glass, urban discovery adventure, Pixar style, vibrant colors, soft studio lighting, clean background.
```

### 📖 READ COVER (Easy)
**Filename:** `read_cover_w09.jpg`  
**Prompt:**
```
3D illustration of two diverse children reading a book with pop-up city skyline, tall buildings and cars emerging from pages, urban adventure theme, Pixar style, vibrant colors, soft studio lighting, clean background.
```

### 🔍 EXPLORE COVER (Easy)
**Filename:** `explore_cover_w09.jpg`  
**Prompt:**
```
3D illustration of diverse children exploring a vibrant city street with tall buildings, looking at busy traffic and modern architecture through magnifying glass, urban discovery adventure, Pixar style, vibrant colors, soft studio lighting, clean background.
```

---

## WEEK 10: THE FARM ADVENTURE

**Theme:** Farm Animals & Life  
**Grammar:** Action verbs (walk, eat, live, give)  
**Vocabulary:** farm, cow, chicken, horse, pig, sheep, walk, eat, live, give

### 📖 READ COVER (Advanced)
**Filename:** `read_cover_w10.jpg`  
**Prompt:**
```
3D illustration of two happy children reading a book with 3D farm animals (cow, chicken) jumping out of pages, green countryside scenery, Pixar style, vibrant colors, soft studio lighting, clean background.
```

### 🔍 EXPLORE COVER (Advanced)
**Filename:** `explore_cover_w10.jpg`  
**Prompt:**
```
3D illustration of diverse children exploring a beautiful farm landscape with magnifying glass, green fields with cows and chickens, peaceful countryside discovery, Pixar style, vibrant colors, soft studio lighting, clean background.
```

### 📖 READ COVER (Easy)
**Filename:** `read_cover_w10.jpg`  
**Prompt:**
```
3D illustration of two happy children reading a book with 3D farm animals (cow, chicken) jumping out of pages, green countryside scenery, Pixar style, vibrant colors, soft studio lighting, clean background.
```

### 🔍 EXPLORE COVER (Easy)
**Filename:** `explore_cover_w10.jpg`  
**Prompt:**
```
3D illustration of diverse children exploring a beautiful farm landscape with magnifying glass, green fields with cows and chickens, peaceful countryside discovery, Pixar style, vibrant colors, soft studio lighting, clean background.
```

---

## WEEK 11: WEEKEND FUN SPOTS

**Theme:** Places (park, playground, library, supermarket, restaurant, zoo)  
**Grammar:** Preposition "at" (I play at the park)  
**Vocabulary:** park, playground, school, library, supermarket, restaurant, zoo, play, read, buy

### 📖 READ COVER (Advanced)
**Filename:** `read_cover_w11.jpg`  
**Prompt:**
```
3D illustration of two happy children reading a book with pop-up playground and park scenes, slides and swings emerging from pages, weekend fun theme, Pixar style, vibrant colors, soft studio lighting, clean background.
```

### 🔍 EXPLORE COVER (Advanced)
**Filename:** `explore_cover_w11.jpg`  
**Prompt:**
```
3D illustration of diverse children exploring different weekend fun spots (playground, park, library) with magnifying glass, discovering exciting places to play, Pixar style, vibrant colors, soft studio lighting, clean background.
```

### 📖 READ COVER (Easy)
**Filename:** `read_cover_w11.jpg`  
**Prompt:**
```
3D illustration of two happy children reading a book with pop-up playground and park scenes, slides and swings emerging from pages, weekend fun theme, Pixar style, vibrant colors, soft studio lighting, clean background.
```

### 🔍 EXPLORE COVER (Easy)
**Filename:** `explore_cover_w11.jpg`  
**Prompt:**
```
3D illustration of diverse children exploring different weekend fun spots (playground, park, library) with magnifying glass, discovering exciting places to play, Pixar style, vibrant colors, soft studio lighting, clean background.
```

---

## SUMMARY

**TOTAL: 12 IMAGES** (6 advanced + 6 easy)
- **Week 9:** 2 advanced + 2 easy = 4 images
- **Week 10:** 2 advanced + 2 easy = 4 images  
- **Week 11:** 2 advanced + 2 easy = 4 images

---

## WORKFLOW

### 1. Generate Images (Nano Banana / DALL-E 3)
- Copy each prompt individually
- Set image size: **1024x1024** or **1792x1024** (landscape recommended)
- Generate with DALL-E 3 or similar model
- Download images (Nano Banana format: `download.png`, `download (1).png`, etc.)

### 2. Rename Files
```bash
# Week 9
python3 auto_rename.py 9

# Week 10  
python3 auto_rename.py 10

# Week 11
python3 auto_rename.py 11
```

### 3. Upload to R2
```bash
# Week 9
python3 tools/upload_week_images_r2.py 9

# Week 10
python3 tools/upload_week_images_r2.py 10

# Week 11
python3 tools/upload_week_images_r2.py 11
```

### 4. Verify on Production
- **Week 9:** https://enquest3k.pages.dev/week/09/read_explore
- **Week 10:** https://enquest3k.pages.dev/week/10/read_explore
- **Week 11:** https://enquest3k.pages.dev/week/11/read_explore

---

## NOTES

✅ **Prompts are theme-specific** (HYBRID approach implemented)  
✅ **auto_rename.py supports BOTH naming patterns:**
  - Old: `N_N_*.png` (number prefix)
  - New: `download.png`, `download (N).png` (Nano Banana format)
  
⚠️ **Important:** Covers for advanced/easy use SAME prompts (consistent visual branding)

🎯 **Quality Check:** Verify images match Week theme before uploading to R2
