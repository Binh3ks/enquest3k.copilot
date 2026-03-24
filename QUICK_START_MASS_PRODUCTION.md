# 🚀 QUICK START: Mass Production Weeks 19-156

**Thời gian đọc**: 5 phút  
**Tài liệu đầy đủ**: [MASS_PRODUCTION_WORKFLOW_V2_FINAL.md](./MASS_PRODUCTION_WORKFLOW_V2_FINAL.md)

---

## ✅ CHUẨN BỊ (1 lần duy nhất)

### 1. Kiểm tra YouTube API
```bash
bash tools/check_api_quota.sh
```

**Nếu thấy** ✅ API KEY WORKING → Tiếp tục  
**Nếu thấy** ❌ QUOTA EXCEEDED → Đợi 24h hoặc dùng API key mới

### 2. Đảm bảo Git clean
```bash
git status
# Phải thấy: "working tree clean"
```

---

## 🔄 QUY TRÌNH CHO MỖI TUẦN (30-45 phút)

### BƯỚC 1: Tạo Manual Override (5 phút)

Mở `src/data/video_tasks.json` và thêm:

```json
[
  {
    "weekId": 19,
    "note": "When I Was Small - GRAMMAR: was/were past state",
    "videos": [
      { "id": 1, "purpose": "GRAMMAR", "query": "was were song for kids" },
      { "id": 2, "purpose": "GRAMMAR", "query": "I was you were past tense ESL" },
      { "id": 3, "purpose": "STORY", "query": "Little Fox baby story growing up" },
      { "id": 4, "purpose": "VOCABULARY", "query": "past present then now vocabulary" },
      { "id": 5, "purpose": "SCIENCE", "query": "SciShow Kids growing up body changes" }
    ]
  }
]
```

**⚠️ QUAN TRỌNG**: 
- Slot 1-2: Query phải chứa **từ khóa grammar** (was/were, present continuous, because/so, etc.)
- Slot 3: Bắt đầu với "Little Fox" hoặc "Vooks"
- Slot 5: Bắt đầu với "SciShow Kids" hoặc "Nat Geo Kids"
- Queries đơn giản (max 5-6 từ)

### BƯỚC 2: Fetch Videos (10 phút)

```bash
node tools/update_videos.js 19
```

**Kiểm tra output**:
- ✅ Thấy `[dotenv] injecting env` → API key loaded
- ✅ Thấy `✅ [1] Video Title` → Videos fetched thành công
- ❌ Thấy `❌ No results` → Query quá phức tạp, cần đơn giản hóa

**Mở file kiểm tra**:
```bash
cat src/data/weeks/week_19/daily_watch.js
```

**Checklist**:
- ✅ 5 videos có đầy đủ
- ✅ Titles của Slot 1-2 chứa từ khóa grammar (was/were)
- ✅ Duration trong khoảng 1:30 - 8:00

### BƯỚC 3: Kiểm tra Duplicates (5 phút)

```bash
node tools/check_duplicates.js 19
```

**Nếu thấy**:
- ✅ "No duplicates found" → Tiếp tục bước 4
- ❌ "DUPLICATE with Week X" → Thay video bị trùng

**Cách thay video bị trùng**:
1. Tìm video khác trên YouTube (search thủ công)
2. Copy videoId (từ URL `youtube.com/watch?v=VIDEOID`)
3. Sửa trong `src/data/weeks/week_19/daily_watch.js`

### BƯỚC 4: Validate & Build (5 phút)

```bash
npm run build
```

**Nếu thành công** → Thấy `✓ built in X.XXs`  
**Nếu lỗi** → Kiểm tra `export default {` có đúng không

### BƯỚC 5: Commit & Push (5 phút)

```bash
git add src/data/weeks/week_19/daily_watch.js \
        src/data/weeks_easy/week_19/daily_watch.js \
        src/data/video_tasks.json

git commit -m "feat(W19): complete video selection - Was/Were past state

✅ GRAMMAR: Was/Were (Past State)
   - Video 1: Was Were Song ✅
   - Video 2: I Was You Were ESL ✅
   
✅ STORY: Little Fox Baby Story ✅
✅ VOCABULARY: Past Present Then Now ✅
✅ SCIENCE: SciShow Kids Growing Up ✅

✅ VALIDATED:
   - No duplicates (node tools/check_duplicates.js 19)
   - Grammar keywords in titles
   - Build tested successfully
   - Follows W15 gold standard pattern"

git push origin main
```

### BƯỚC 6: Verify Production (5 phút)

Sau 2-3 phút:
1. Mở `https://enquest3k.pages.dev/week/19/daily-watch`
2. Kiểm tra:
   - ✅ 5 thumbnails hiển thị (không phải hộp xám)
   - ✅ Click video 1 → plays
   - ✅ Click video 2 → plays

---

## 🔥 TIPS NHANH

### Query Guidelines
```
✅ GOOD:
- "was were song for kids"
- "present continuous what are you doing"
- "because so cause effect kids"

❌ BAD:
- "English Singsing was were sentence practice ESL educational"  
- "Little Fox story about growing up then and now comparison"
```

### Common Grammar Keywords Matrix

| Grammar Focus | Từ khóa cần có trong title (Slot 1-2) |
|--------------|---------------------------------------|
| Was/Were | was, were, past tense, verb to be past |
| Present Continuous | present continuous, -ing, what are you doing |
| Cause-Effect | because, so, cause, effect, reason, why |
| Past Simple | past simple, -ed, yesterday |
| Can/Can't | can, cannot, can't, ability |

### Troubleshooting

**Vấn đề**: "❌ No results" khi fetch
- **Fix**: Đơn giản hóa query trong `video_tasks.json` (bỏ từ thừa)

**Vấn đề**: API quota exceeded
- **Fix**: `bash tools/check_api_quota.sh` → nếu hết quota, đợi 24h hoặc dùng key mới

**Vấn đề**: Video không play trên production
- **Fix**: Kiểm tra `youtube.com/watch?v=VIDEOID` → nếu blocked/deleted, thay video khác

**Vấn đề**: Build fails với "default is not exported"
- **Fix**: Kiểm tra file bắt đầu bằng `export default {` (không phải `export const`)

---

## 📊 BATCH PRODUCTION STRATEGY

**Khuyến nghị**: Làm từng batch nhỏ thay vì tất cả 138 tuần cùng lúc

### Batch 1: W19-25 (Tuần 1)
- 7 tuần × 40 phút = 4.7 giờ
- Test kỹ W19, những tuần sau nhanh hơn
- Commit từng tuần (rollback dễ dàng nếu có lỗi)

### Batch 2: W26-40 (Tuần 2-3)
- 15 tuần × 35 phút = 8.75 giờ
- Đã quen workflow, làm nhanh hơn

### Batch 3-5: W41-156 (Tuần 4-10)
- Chia làm 3 batch × 40-50 tuần
- Kiểm tra API quota mỗi ngày
- Test randomly mỗi 10 tuần trên production

---

## ⚡ AUTOMATION SCRIPTS (Advanced)

### Check All Weeks at Once
```bash
# Kiểm tra duplicate cho nhiều tuần cùng lúc
for i in {17..25}; do
  echo "=== Week $i ==="
  node tools/check_duplicates.js $i
  echo ""
done
```

### Batch Validation
```bash
# Validate tất cả tuần từ 19-25
for i in {19..25}; do
  echo "Validating Week $i..."
  npm run build > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "✅ Week $i build OK"
  else
    echo "❌ Week $i build FAILED"
  fi
done
```

---

## 📚 REFERENCE DOCUMENTS

1. **MASS_PRODUCTION_WORKFLOW_V2_FINAL.md** - Quy trình chi tiết 7 phases
2. **W15-18 Daily Watch Files** - Gold standard examples
3. **tools/generate_video_queries.js** - BLUEPRINT_WEEKS data (156 tuần)
4. **src/data/video_tasks.json** - Manual query overrides

---

## ✅ FINAL CHECKLIST

Trước khi bắt đầu W19:

- [ ] API quota available (`bash tools/check_api_quota.sh`)
- [ ] Git working tree clean (`git status`)
- [ ] Đã đọc Quick Start này
- [ ] Đã test scripts với W17-18 (để làm quen)
- [ ] Đã chuẩn bị `video_tasks.json` cho W19

Sau khi hoàn thành W19:

- [ ] 5 videos fetched thành công
- [ ] No duplicates (`node tools/check_duplicates.js 19`)
- [ ] Build succeeds (`npm run build`)
- [ ] Committed với descriptive message
- [ ] Pushed to production
- [ ] Verified trên `enquest3k.pages.dev`

---

**🎉 READY? Bắt đầu với Week 19!**

```bash
# Step 1: Check API
bash tools/check_api_quota.sh

# Step 2: Edit video_tasks.json (add W19 queries)

# Step 3: Fetch
node tools/update_videos.js 19

# Step 4: Validate
node tools/check_duplicates.js 19
npm run build

# Step 5: Commit & Push
git add src/data/weeks/week_19/daily_watch.js \
        src/data/weeks_easy/week_19/daily_watch.js \
        src/data/video_tasks.json
git commit -m "feat(W19): complete video selection - Was/Were"
git push origin main
```

**Questions?** Tham khảo [MASS_PRODUCTION_WORKFLOW_V2_FINAL.md](./MASS_PRODUCTION_WORKFLOW_V2_FINAL.md)
