# Image Filename Naming Convention

## Tóm tắt
Batch_manager.js giờ tạo filenames theo quy tắc chuẩn như sau:

## Quy tắc tạo filenames

### 1. Story Covers (Read + Explore)
```
{cover_type}_w{weekNumber}.jpg

Ví dụ:
  - read_cover_w20.jpg
  - explore_cover_w20.jpg
```

### 2. Vocabulary Images
```
{word}.jpg
(spaces → underscore, lowercase)

Ví dụ:
  - archaeologist.jpg
  - ancient.jpg
  - teddy_bear.jpg
```

### 3. Word Power Images
```
wordpower_{word}.jpg

Ví dụ:
  - wordpower_artifact.jpg
  - wordpower_civilization.jpg
  - wordpower_antique.jpg
```

## Data Files phải khớp

### Advanced Mode - Week 20
**vocab.js:**
```javascript
image_url: "/images/week20/{word}.jpg"
// "archaeologist" → "/images/week20/archaeologist.jpg"
// "ancient" → "/images/week20/ancient.jpg"
```

**word_power.js:**
```javascript
image_url: "/images/week20/wordpower_{word}.jpg"
// "artifact" → "/images/week20/wordpower_artifact.jpg"
```

**explore.js, read.js:**
```javascript
image_url: "/images/week20/explore_cover_w20.jpg"
image_url: "/images/week20/read_cover_w20.jpg"
```

### Easy Mode - Week 20
**vocab.js:**
```javascript
image_url: "/images/week20_easy/{word}.jpg"
// "old" → "/images/week20_easy/old.jpg"
```

**word_power.js:**
```javascript
image_url: "/images/week20_easy/wordpower_{word}.jpg"
// "antique" → "/images/week20_easy/wordpower_antique.jpg"
```

**explore.js, read.js:**
```javascript
image_url: "/images/week20_easy/explore_cover_w20.jpg"
image_url: "/images/week20_easy/read_cover_w20.jpg"
```

## Cách sử dụng

### Run batch_manager để generate images
```bash
cd /Users/binhnguyen/Downloads/engquest3k_new/Engquest3k
node tools/batch_manager.js 20 20 "YOUR_API_KEY"
```

Lệnh này sẽ:
1. Tạo tất cả covers với naming `*_w20.jpg`
2. Tạo vocab images với naming `{word}.jpg`
3. Tạo wordpower images với naming `wordpower_{word}.jpg`

### Update data files
- vocab.js: sử dụng `{word}.jpg` (từ từ điển)
- word_power.js: sử dụng `wordpower_{word}.jpg` (từ nâng cao)
- read.js, explore.js: sử dụng `read_cover_w{N}.jpg`, `explore_cover_w{N}.jpg`

## Kiểm tra consistency

Sau khi chạy batch_manager, verify filenames:
```bash
ls /images/week20/ | grep -E "^(wordpower_|read_cover|explore_cover|[a-z])" | sort
```

Tất cả phải khớp với image_url trong data files!

---
**Cập nhật: 25/12/2025**
- ✅ Batch_manager tạo filenames có quy tắc rõ ràng
- ✅ Tất cả data files (week 20 adv + easy) đã update
- ✅ Ready để generate cho các weeks khác
