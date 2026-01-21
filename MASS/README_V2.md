# 🎯 ENGQUEST 3K - MASS PRODUCTION V2.0

## 📋 QUICK START

### Tạo Week Mới (4 Steps):

```bash
# Step 1: Generate Spec (5 phút)
node MASS/tools/generate_spec.cjs <week>

# Step 2: Generate Stations (40-50 phút - AI tạo 14 files)
node MASS/tools/create_week.cjs <week>

# Step 3: Generate Assets + Validate (20-30 phút)
bash MASS/tools/cleanup_and_regenerate.sh <week> advanced
bash MASS/tools/cleanup_and_regenerate.sh <week> easy

# Step 4: Test & Commit (5 phút)
npm run dev  # Test trong browser
git add src/data/weeks*/week_XX/ public/audio/weekX*/ public/images/weekX*/
git commit -m "Week X: Complete"
```

**Tổng thời gian**: ~60-90 phút per week

---

## 🆕 WHAT'S NEW IN V2.0?

### ✅ Asset Validation Matrix
- Bắt buộc kiểm tra số lượng asset chính xác
- Advanced: 141 audio + 20 images
- Easy: 137 audio + 20 images
- Auto-detect missing or incorrectly named files

### ✅ Cleanup & Regeneration Script
- Tự động xóa files sai tên
- Tự động tạo lại files thiếu
- Zero-downtime fix cho lỗi phổ biến

### ✅ Syntax Error Detection
- Kiểm tra syntax trước khi commit
- Cross-reference validation (dictation = read sentences)
- Schema compliance check

### ✅ Error Prevention
- Prefix validation (`vocab_`, `wordpower_`, etc.)
- Path format validation (`/audio/weekX/` NOT `/audio/week_X/`)
- Count validation (6 mindmap stems, 4 vocab audio fields)

---

## 📊 ASSET COUNT MATRIX

| Station | Advanced Audio | Easy Audio | Images (Both) |
|---------|----------------|------------|---------------|
| vocab.js | 40 (10×4) | 40 (10×4) | 10 |
| word_power.js | 12-15 (3×4-5) | 12-15 (3×4-5) | 3 |
| read.js | 1 | 1 | 1 |
| grammar.js | 0 | 0 | 0 |
| dictation.js | 14 | 12 | 0 |
| shadowing.js | 15 (14+1) | 13 (12+1) | 0 |
| writing.js | 0 | 0 | 0 |
| logic.js | 5 | 5 | 0 |
| ask_ai.js | 5 | 5 | 0 |
| explore.js | 1 | 1 | 1 |
| mindmap.js | 42 (6+36) | 42 (6+36) | 0 |
| daily_watch.js | 0 | 0 | 0 |
| **TOTAL** | **138** | **130** | **15** |

---

## 🔧 AVAILABLE TOOLS

### 1. validate_assets.cjs ⭐ NEW
```bash
node MASS/tools/validate_assets.cjs <week> [mode]
```
Kiểm tra tất cả assets theo matrix bắt buộc. Exit 0 = pass, Exit 1 = fail.

### 2. cleanup_and_regenerate.sh ⭐ NEW
```bash
bash MASS/tools/cleanup_and_regenerate.sh <week> [mode]
```
Tự động:
- Xóa files sai tên
- Tạo lại files thiếu
- Validate kết quả

### 3. generate_spec.cjs
```bash
node MASS/tools/generate_spec.cjs <week>
```
Tạo spec file từ syllabus database.

### 4. create_week.cjs
```bash
node MASS/tools/create_week.cjs <week>
```
Show instructions cho AI tạo 14 station files.

### 5. validate_week_v2.cjs
```bash
node MASS/tools/validate_week_v2.cjs <week>
```
Validate code structure và schema compliance.

---

## 🚨 COMMON ERRORS & AUTO-FIXES

### Error 1: Missing `vocab_` Prefix
**Symptom**: Files named `def_bedroom.mp3` thay vì `vocab_def_bedroom.mp3`

**Auto-fix**:
```bash
bash MASS/tools/cleanup_and_regenerate.sh 5 easy
```

### Error 2: Word Power Schema Confusion
**Symptom**: Schema có `audio_word` field (should NOT exist)

**Manual fix**: Xóa audio fields khỏi word_power.js, giữ chỉ `image_url`

### Error 3: Dictation Count Mismatch
**Symptom**: Read có 14 sentences, dictation có 12

**Manual fix**: Copy sentences từ read.js → dictation.js

### Error 4: Wrong Path Format
**Symptom**: Path dạng `/audio/week_05/` (có underscore)

**Auto-fix**: Script sẽ detect và báo lỗi

---

## 📁 KEY DOCUMENTATION

| File | Purpose |
|------|---------|
| [ASSET_VALIDATION_MATRIX.md](ASSET_VALIDATION_MATRIX.md) | Chi tiết số lượng asset bắt buộc cho mỗi station |
| [MASS_PRODUCTION_WORKFLOW_V2.md](MASS_PRODUCTION_WORKFLOW_V2.md) | Quy trình 4 bước chi tiết với examples |
| [0. MASS_PRODUCTION_CONTEXT_FINAL.md](0.%20MASS_PRODUCTION_CONTEXT_FINAL.md) | Context cho AI generation (Week 4 golden standard) |

---

## ✅ VALIDATION CHECKLIST

### Before Generation:
- [ ] `generate_spec.cjs` đã chạy
- [ ] Spec có `stations` object (NOT `story_missions`)
- [ ] Vocab count = 10, grammar focus có data

### After Station Generation:
- [ ] 14 files tồn tại trong `src/data/weeks/week_XX/`
- [ ] No syntax errors
- [ ] Dictation sentences = Read sentences
- [ ] Word power NO audio fields in schema

### After Asset Generation:
- [ ] `validate_assets.cjs <week> advanced` → EXIT 0
- [ ] `validate_assets.cjs <week> easy` → EXIT 0
- [ ] Advanced: 141 audio + 20 images
- [ ] Easy: 137 audio + 20 images

### Before Commit:
- [ ] Test 3-5 stations trong UI
- [ ] All audio plays
- [ ] All images show
- [ ] No console errors

---

## 🎯 SUCCESS CRITERIA

Week được coi là **HOÀN THÀNH** khi:
1. ✅ Both validation scripts pass (EXIT 0)
2. ✅ UI loads week without errors
3. ✅ Audio plays in all stations
4. ✅ Images display in all stations
5. ✅ Git committed with proper message

---

## 🔍 TROUBLESHOOTING

### "OpenAI API key invalid"
```bash
# Update .env
echo "VITE_OPENAI_API_KEY=sk-proj-XXXXX" > .env

# Test key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $VITE_OPENAI_API_KEY"
```

### "Audio count mismatch"
```bash
# Count files
ls -1 public/audio/week5/ | wc -l

# Regenerate if wrong
bash MASS/tools/cleanup_and_regenerate.sh 5 advanced
```

### "Validation hangs"
```bash
# Kill with Ctrl+C
# Check syntax
node -c src/data/weeks/week_XX/vocab.js

# Fix errors, re-run
node MASS/tools/create_week.cjs XX
```

---

## 📞 NEED HELP?

1. Check [ASSET_VALIDATION_MATRIX.md](ASSET_VALIDATION_MATRIX.md) for detailed specs
2. Check [MASS_PRODUCTION_WORKFLOW_V2.md](MASS_PRODUCTION_WORKFLOW_V2.md) for step-by-step
3. Run validation script to see exact errors
4. Use cleanup script for auto-fix

---

## 📊 PROGRESS TRACKING

### Weeks Completed:
- Week 1-4: ✅ Complete (Golden standards)
- Week 5: ✅ Complete (V2.0 validation passed)
- Week 6-156: ⏳ Pending

### Statistics:
- **Total weeks**: 156
- **Completed**: 5 (3.2%)
- **Remaining**: 151 (96.8%)
- **Estimated completion**: ~151 hours (~6.3 days of work)

---

**Version**: 2.0 FINAL
**Date**: January 20, 2026
**Status**: ✅ Production Ready

---

## 🚀 NEXT ACTIONS

```bash
# Continue with Week 6
node MASS/tools/generate_spec.cjs 6
node MASS/tools/create_week.cjs 6
# ... (AI generates files)
bash MASS/tools/cleanup_and_regenerate.sh 6 advanced
bash MASS/tools/cleanup_and_regenerate.sh 6 easy

# Repeat for Week 7-156
```

**Let's build 151 more weeks! 🎉**
