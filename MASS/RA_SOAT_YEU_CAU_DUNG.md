# RÀ SOÁT LẠI YÊU CẦU TRONG PHIÊN CHAT

## Yêu cầu 1: Asset Generation
> "hãy đọc lại toàn bộ code của các script generate audio, video, image và viết lại document hướng dẫn đầy đủ các script và quy trình tạo assets"

**Hiểu**: Document scripts tạo assets

---

## Yêu cầu 2: Kiểm Tra Week 4
> "đối chiếu với tuần 4, từng dòng code một"
> "phải kiểm tra thực tế tuần 4 để đảm bảo các schemas đó đúng"

**Hiểu**: Phải check Week 4 ACTUAL code, không được đoán

---

## Yêu cầu 3: Dictation/Shadowing
> "Dictation và shadowing là copy nguyên xi nội dung từ read.js sang và tách thành từng câu"

**Verified**: ✅ Week 4 có dictation.js và shadowing.js copy từ read.js

---

## Yêu cầu 4: Video Script
> "60 kênh YouTube whitelist"
> "các keyword trong tất cả các query đều phải thêm 'ESL for kids' vào cuối"

**Verified**: ✅ Updated video script

---

## Yêu cầu 5: Mass Production Week 5
> "giờ hãy đảm bảo hệ thống spec, template, data và prompts đã chuẩn cho tuần 5"
> "nếu script còn sai như vậy thì phải validate trước khi tạo"
> "liên tục validate trong quá trình này và đối chiếu với tuần 4"
> "khi cần thì phải sửa lại quy trình/spec/schema/template/script trước khi chạy tiếp"

**Hiểu**: Validate scripts với Week 4 trước khi generate Week 5

---

## PHÁT HIỆN SAI LẦM CỦA TÔI

### Sai 1: Không đọc prompt V28/V29 đúng cách
- ❌ Tôi assume AI Tutor không có trong Week 4
- ✅ **THỰC TẾ**: Week 4 CÓ week_04_real.js với story_missions!

### Sai 2: Nhầm lẫn cấu trúc
Week 4 CÓ **CẢ HAI**:
1. **week_04/** folder - 14 station files (vocab, read, grammar, etc.)
2. **week_04_real.js** - AI Tutor missions (RIÊNG BIỆT!)

```
src/data/weeks/
├── week_04/               ← Stations (14 files)
│   ├── vocab.js
│   ├── read.js
│   ├── ... (12 more)
│   └── video_queries.json
└── week_04_real.js        ← AI Tutor (1 file, riêng biệt!)
```

### Sai 3: Script generate_spec.cjs
- ❌ Tôi xóa story_missions trong spec
- ✅ **NÊN GIỮ**: story_missions vì AI Tutor cần data này!

### Sai 4: Hiểu sai "2 mode"
- ❌ Tôi nghĩ "2 mode" = Advanced/Easy chỉ khác nội dung
- ✅ **THỰC TẾ**: 2 mode cần 2 folder riêng:
  - `week_04/` - Advanced stations
  - `week_04_easy/` - Easy stations (chưa tạo?)

---

## CHUẨN XÁC WEEK 4 CÓ GÌ?

### Folder week_04/ (14 files - Stations)
```
ask_ai.js
daily_watch.js
dictation.js
explore.js
grammar.js
index.js
logic.js
mindmap.js
read.js
shadowing.js
video_queries.json
vocab.js
word_power.js
writing.js
```

### File week_04_real.js (AI Tutor - RIÊNG)
```javascript
const week4RealData = {
  week_id: 4,
  title: "Week 4: My Happy Jar",
  target_vocab: [...],      // 10 words with definitions
  story_missions: [         // 3 missions
    {
      mission_id: 1,
      objectives: [          // 9-11 objectives per mission
        {
          question_variants: [...],  // 3 variants
          target_keywords: [...],
          // ...
        }
      ]
    }
  ]
};
```

---

## CẦN TẠO GÌ CHO WEEK 5?

### 1. Stations (14 files) - week_05/ folder
- vocab.js
- read.js
- grammar.js
- dictation.js
- shadowing.js
- writing.js
- ask_ai.js
- logic.js
- explore.js
- word_power.js
- mindmap.js
- daily_watch.js
- index.js
- video_queries.json

### 2. AI Tutor (1 file) - week_05_real.js
- story_missions array (3 missions)
- objectives với question_variants
- target_vocab với definitions đầy đủ

### 3. Easy Mode (14 files) - week_05_easy/ folder
- Giống Advanced nhưng nội dung đơn giản hơn

---

## ĐÚNG HAY SAI?

Bạn nói:
> "App có 2 mode, easy và advanced mà sao cứ 14 file"

**Hiểu của tôi BÂY GIỜ**:
- ✅ Week 5 cần 14 files trong week_05/ (Advanced)
- ✅ Week 5 cần 14 files trong week_05_easy/ (Easy)
- ✅ Week 5 cần 1 file week_05_real.js (AI Tutor - riêng)

**TỔNG**: 14 + 14 + 1 = 29 files cho Week 5

> "AI tutor là 1 tính năng lớn, không tạo cùng các station (14 file) mà tạo riêng vì quá phức tạp"

**Hiểu của tôi BÂY GIỜ**:
- ✅ AI Tutor = week_XX_real.js (file riêng)
- ✅ Stations = week_XX/ folder (14 files)
- ✅ KHÔNG tạo chung, tạo riêng 2 nhóm

> "mà lại nói là không có trong tuần 4 là sao"

**SAI LẦM CỦA TÔI**:
- ❌ Tôi không tìm thấy week_04_real.js ban đầu
- ❌ Tôi nghĩ Week 4 chỉ có stations
- ✅ THỰC TẾ: Week 4 CÓ week_04_real.js với story_missions!

---

## TÓM LẠI

**Tôi đã sai vì**:
1. Không đọc kỹ prompt V28
2. Không tìm thấy week_04_real.js (nó ở ngoài folder week_04/)
3. Xóa story_missions khỏi spec (SAI!)
4. Nghĩ AI Tutor không có trong Week 4 (SAI!)
5. Không hiểu 2 mode = 2 folders riêng biệt

**Đúng là**:
- Week 4 có 14 station files + 1 AI Tutor file
- Week 5 cần tạo TƯƠNG TỰ
- Spec PHẢI có story_missions
- AI Tutor tạo RIÊNG, không chung với stations
- Easy mode = folder riêng week_XX_easy/

---

**Xin lỗi vì đã hiểu sai toàn bộ!**
