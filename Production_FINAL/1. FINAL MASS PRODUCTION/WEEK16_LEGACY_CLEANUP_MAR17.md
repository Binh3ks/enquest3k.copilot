# Week 16 Legacy File Cleanup - March 17, 2026

## 🚨 VẤN ĐỀ PHÁT HIỆN

**User phát hiện:** Week 16 chỉ có Advanced mode, THIẾU Easy mode

**Nguyên nhân:**
- Week 16 Easy mode tồn tại dưới dạng **FLAT FILE CŨ** (`week_16.js`)
- Nội dung: "My Baby Photos" - Past Simple (Irregular) ← **SAI THEME**
- Ngày tạo: January 6, 2026 (2 tháng trước)
- Kích thước: 13KB (legacy single-file format)

**Expected:**
- Week 16 Easy mode phải là **FOLDER** (`week_16/`) với 15 files
- Nội dung: "Sports Commentary" - Present Continuous (theo Syllabus mới)
- Cấu trúc giống Advanced mode (dual mode requirement)

---

## ⚙️ NGUYÊN NHÂN KỸ THUẬT

### Vite Loader Priority Issue

```javascript
// File: src/data/weeks/index.js (lines 27-50)
// Vite loader kiểm tra FLAT FILE TRƯỚC, FOLDER SAU:

if (easyModules[`../weeks_easy/week_${pad}.js`]) {
  return easyModules[...];  // ← FILE PHẲNG LUÔN THẮNG!
}
else if (easyModulesFolder[`../weeks_easy/week_${pad}/index.js`]) {
  return easyModulesFolder[...];  // ← KHÔNG BAO GIỜ CHẠY nếu flat file tồn tại
}
```

**Hậu quả:**
- Nếu `week_16.js` tồn tại → `week_16/` folder KHÔNG BAO GIỜ được load
- UI sẽ hiển thị nội dung cũ (Baby Photos) thay vì nội dung mới (Sports Commentary)
- Tương tự Week 15: "Grandma's Old Box" (cũ) load thay vì "My Day at the Park" (mới)

---

## ✅ GIẢI PHÁP ĐÃ THỰC THI

### Bước 1: Backup và Xóa File Cũ

```bash
# Thực hiện lúc 2026-03-17
mv "src/data/weeks_easy/week_16.js" \
   "src/data/weeks_easy/week_16_OLD_BABY_PHOTOS_20260317.js"
```

**Kết quả:**
```
✅ File cũ đã được backup: week_16_OLD_BABY_PHOTOS_20260317.js
✅ Không còn xung đột flat file
✅ Sẵn sàng tạo week_16/ folder mới
```

### Bước 2: Cập Nhật Workflow

**File:** `AGENT_SELF_CHECK_WORKFLOW.md`

**Thêm mới:** Step 0.5 - "CLEAN UP LEGACY FILES"

```bash
# Kiểm tra và xóa flat files cũ TRƯỚC khi tạo folder mới
WEEK_NUM=N

# Check Advanced mode
if [ -f "src/data/weeks/week_${WEEK_NUM}.js" ]; then
  mv "src/data/weeks/week_${WEEK_NUM}.js" \
     "src/data/weeks/week_${WEEK_NUM}_BACKUP_$(date +%Y%m%d).js"
fi

# Check Easy mode
if [ -f "src/data/weeks_easy/week_${WEEK_NUM}.js" ]; then
  mv "src/data/weeks_easy/week_${WEEK_NUM}.js" \
     "src/data/weeks_easy/week_${WEEK_NUM}_OLD_BACKUP_$(date +%Y%m%d).js"
fi

# Verify cleanup
! [ -f "src/data/weeks/week_${WEEK_NUM}.js" ] && echo "✅ Advanced: No conflicts"
! [ -f "src/data/weeks_easy/week_${WEEK_NUM}.js" ] && echo "✅ Easy: No conflicts"
```

**Thêm vào Self-Check:**
- [x] 🚨 **LEGACY FILES CLEANED** - No week_N.js flat files exist (both Advanced + Easy)

---

## 📊 TÌNH TRẠNG LEGACY FILES (21 WEEKS)

```bash
# Kiểm tra tất cả Easy mode weeks:
ls -d src/data/weeks_easy/week_* | head -21

# Kết quả:
week_01/  ✅ folder (modern)
week_02/  ✅ folder
...
week_14/  ✅ folder
week_15/  ✅ folder
week_16.js ❌ FLAT FILE (đã backup → week_16_OLD_BABY_PHOTOS_20260317.js)
week_17.js ❌ FLAT FILE (cần cleanup khi tạo Week 17)
week_18/  ✅ folder (nhưng cũng có week_18.js - xung đột tiềm ẩn!)
week_19/  ✅ folder
week_20/  ✅ folder
week_21/  ✅ folder
```

**Cần cleanup cho các tuần sau:**
- Week 17: Có `week_17.js` flat file
- Week 18: Có CẢ `week_18.js` VÀ `week_18/` (xung đột Vite loader!)

---

## 🎯 QUY TRÌNH MỚI CHO CÁC TUẦN SAU

### BƯỚC 0.5: Cleanup Legacy Files (MANDATORY)

**Thời gian:** 30 giây  
**Thực hiện:** TRƯỚC khi tạo folder week_N/

```bash
# Replace N với số tuần
WEEK_NUM=17  # Example

# Auto-cleanup script
if [ -f "src/data/weeks/week_${WEEK_NUM}.js" ] || \
   [ -f "src/data/weeks_easy/week_${WEEK_NUM}.js" ]; then
  echo "⚠️  Found legacy flat files - cleaning up..."
  
  # Backup Advanced
  [ -f "src/data/weeks/week_${WEEK_NUM}.js" ] && \
    mv "src/data/weeks/week_${WEEK_NUM}.js" \
       "src/data/weeks/week_${WEEK_NUM}_BACKUP_$(date +%Y%m%d).js"
  
  # Backup Easy
  [ -f "src/data/weeks_easy/week_${WEEK_NUM}.js" ] && \
    mv "src/data/weeks_easy/week_${WEEK_NUM}.js" \
       "src/data/weeks_easy/week_${WEEK_NUM}_OLD_BACKUP_$(date +%Y%m%d).js"
  
  echo "✅ Cleanup complete"
else
  echo "✅ No legacy files - ready to create folders"
fi
```

---

## ✅ XÁC NHẬN SẴN SÀNG WEEK 16

### Checklist Cuối Cùng:

- [x] ✅ Syllabus đọc (Week 16: Sports Commentary, Present Continuous, 10 vocab)
- [x] ✅ Blueprint V5.0 đọc (70/30 strategy, W16 = Universal)
- [x] ✅ python-docx installed (can read .docx Syllabus)
- [x] ✅ Environment tested (Node v25.2.1, golden standards exist)
- [x] ✅ Validation rules loaded (10 bold words, 40 audio, quality gates)
- [x] ✅ **Legacy week_16.js CLEANED (backed up to week_16_OLD_BABY_PHOTOS_20260317.js)**
- [x] ✅ **Workflow updated (Step 0.5 added)**
- [x] ✅ **DUAL MODE requirement confirmed (Advanced + Easy folders)**

### Week 16 Production Plan:

**BƯỚC 0.5 Output (Week 16):**
```
🔍 Checking for legacy flat files (week_16.js)...
✅ Advanced: No flat file conflicts
✅ Easy: No flat file conflicts (backed up to week_16_OLD_BABY_PHOTOS_20260317.js)
✅ Ready to create week_16/ folders
```

**BƯỚC 3:** Create Advanced `week_16/` folder (15 files, clone from Week 6)  
**BƯỚC 4:** Create Easy `week_16/` folder (15 files, clone from Week 6 Easy)

---

## 📝 BÀI HỌC

1. **Vite loader priority:** Flat files ALWAYS win over folders → MUST cleanup first
2. **Migration incomplete:** Weeks 1-11 legacy → Weeks 12+ modern, but some weeks stuck in transition
3. **Dual mode mandatory:** Every week MUST have BOTH Advanced + Easy (same structure)
4. **Workflow enforcement:** Step 0.5 now MANDATORY for all weeks 12+

---

**Date:** March 17, 2026  
**Action:** Legacy cleanup complete + workflow updated  
**Status:** ✅ READY FOR WEEK 16 PRODUCTION (DUAL MODE)
