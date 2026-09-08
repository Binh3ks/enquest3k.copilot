# BÁO CÁO TỔNG KIỂM TOÁN TOÀN DIỆN W33 — KIẾN TRÚC, SCHEMA, TÍNH NĂNG & NỘI DUNG

**Thời gian thực hiện**: 2026-08-15  
**Codebase**: `EngQuest3K`  
**Phương pháp**: Quét trực tiếp codebase, chạy lệnh thực tế, kiểm tra từng dòng mã và console output. Không sử dụng tài liệu tường thuật cũ.

---

## 0. QUY TẮC NHÃN ĐỘ TIN CẬY
- ✅ **Đã xác minh trực tiếp**: Đã kiểm tra code thực tế hoặc chạy lệnh CLI trong đợt này.
- ⚠️ **Suy luận**: Dựa trên tên biến/file/comment, chưa kiểm thử tương tác UI thực tế.
- ❌ **Không tìm thấy**: Đã tìm kiếm bằng `grep_search` nhưng không có trong codebase.

---

## PHẦN A — KIẾN TRÚC & SCHEMA

### Trạm 1: Đọc & Khám Phá (WorldDiscoveryHub)
- ✅ **A.1 Cấu trúc thư mục & Route thực tế**:
  - Route: `/hub/station-1` (hoặc `/week/33/hub/1`)
  - Thư mục: [`src/modules/cambridge_suite/WorldDiscoveryHub.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/cambridge_suite/WorldDiscoveryHub.jsx)
  - Data: [`src/data/weeks/week_33/reading_hub.js`](file:///Users/binhnguyen/projects/Engquest3k/src/data/weeks/week_33/reading_hub.js) & [`src/data/weeks/week_33/read.js`](file:///Users/binhnguyen/projects/Engquest3k/src/data/weeks/week_33/read.js)

- ✅ **A.2 Schema dữ liệu thực tế (`reading_hub.js`)**:
```javascript
export default {
  title: "Corridor Incident & School Care",
  vocab: [
    { word: "corridor", ipa: "/ˈkɔːrɪdɔːr/", meaning_vi: "hành lang", example: "Jake walked carefully down the school corridor." },
    // 20 từ vựng cốt lõi + lexical chunks...
  ],
  story_scenes: [
    {
      scene_id: 'scene_1',
      title_en: 'Scene 1: Walking Down the Corridor',
      description_en: 'Jake was walking **carefully** down the school **corridor** after science class.',
      image_url: '/images/week33/webtoon_scene_1.png',
      lexical_chunks: [
        { word: 'corridor', chunk: 'school corridor', x: 45, y: 55 },
        { word: 'carefully', chunk: 'walking carefully', x: 25, y: 40 }
      ]
    },
    // 5 scenes độc bản...
  ],
  reading_part3_story: {
    title: "Nova's Story Discovery — Tom's Morning Adventure",
    story_text: "Tom had a very eventful Saturday morning...",
    questions: [
      { id: "r3_q01", question: "Why did Tom knock his alarm clock off the table?", options: [{ label: "A", text: "...", isCorrect: true }] }
    ]
  }
};
```

- ✅ **A.3 Components**:
  - `WorldDiscoveryHub.jsx` ([`src/modules/cambridge_suite/WorldDiscoveryHub.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/cambridge_suite/WorldDiscoveryHub.jsx)): Component wrapper chính điều hướng sub-tabs.
  - `HoverWord.jsx` ([`src/components/common/HoverWord.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/components/common/HoverWord.jsx)): Universal Text Parser bọc 100% từ đơn & cụm collocations với Dual-Layer dictionary lookup & Stealth Mode filtering.
  - `InlineTextClozeDropdown.jsx` ([`src/components/cambridge/InlineTextClozeDropdown.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/components/cambridge/InlineTextClozeDropdown.jsx)): Cambridge Reading Part 4 interactive gap-fill story.

- ✅ **A.4 Thuật toán Engine & Key Logic**:
  - **Stealth Mode**: `HoverWord.jsx` nhận prop `isStealthMode={true}`. Khi `isStealthMode={true}`, biến `const isTarget = tier === 1` trả về `false`, ép style từ vựng về dạng text thường (`generalWordClass`), triệt hạ 100% rò rỉ đáp án bằng thị giác trong bài test.

---

### Trạm 2: Đấu Trường Nghe & Ngữ Pháp (ArenaHub)
- ✅ **A.1 Cấu trúc thư mục & Route thực tế**:
  - Route: `/hub/station-2` (hoặc `/week/33/hub/2`)
  - Thư mục: [`src/modules/cambridge_suite/ArenaHub.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/cambridge_suite/ArenaHub.jsx)
  - Data: [`src/data/weeks/week_33/listening_hub.js`](file:///Users/binhnguyen/projects/Engquest3k/src/data/weeks/week_33/listening_hub.js)

- ✅ **A.2 Components**:
  - `SVGLineMatcher.jsx`: Listening Part 1 (Draw lines matching names to characters in 3D scene).
  - `NotepadNoteCompleter.jsx`: Listening Part 2 (Notepad secret notes completion).
  - `VisualMatchingAH.jsx`: Listening Part 3 (Item hunt side-by-side matching).
  - `Station2CheckMode.jsx`: Listening Part 4 (Multiple choice 3D picture quiz).
  - `SVGColorAndWrite.jsx`: Listening Part 5 (Interactive SVG canvas coloring & writing).

---

### Trạm 3: Xưởng Viết Sáng Tạo (WritingStudioHub)
- ✅ **A.1 Cấu trúc thư mục & Route thực tế**:
  - Route: `/hub/station-3` (hoặc `/week/33/hub/3`)
  - Thư mục: [`src/modules/cambridge_suite/WritingStudioHub.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/cambridge_suite/WritingStudioHub.jsx) & [`src/modules/write_speak/StoryWriting.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/write_speak/StoryWriting.jsx)
  - Data: [`src/data/weeks/week_33/writing.js`](file:///Users/binhnguyen/projects/Engquest3k/src/data/weeks/week_33/writing.js)

- ✅ **A.4 Thuật toán Rule Engine**:
  - `evaluateCambridgeCriteria.js`:
    ```javascript
    // Lines 64-67 of src/utils/cambridgeCriteria.js
    else if (weekNum >= 33) {
      targetWords = 50;
      minConnectors = 1;
    }
    ```

---

### Trạm 4: Nova Live Talk Show (NovaTalkShowHub)
- ✅ **A.1 Cấu trúc thư mục & Route thực tế**:
  - Route: `/hub/station-4` (hoặc `/week/33/hub/4`)
  - Thư mục: [`src/modules/cambridge_suite/NovaTalkShowHub.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/cambridge_suite/NovaTalkShowHub.jsx)
  - Data: [`src/data/weeks/week_33/speaking_hub.js`](file:///Users/binhnguyen/projects/Engquest3k/src/data/weeks/week_33/speaking_hub.js)

- ✅ **A.4 Thuật toán Engine**:
  - **Thuật toán tính điểm phát âm**:
    ```javascript
    // Lines 16-37 of src/modules/cambridge_suite/NovaTalkShowHub.jsx
    const calculateSpeechAccuracy = (spokenText, targetText) => {
      const spokenWords = cleanSpoken.split(/\s+/).filter(Boolean);
      const targetWords = cleanTarget.split(/\s+/).filter(Boolean);
      let matched = 0;
      targetWords.forEach((word) => {
        if (spokenWords.includes(word)) matched++;
      });
      const accuracyScore = Math.min(100, Math.max(30, Math.round((matched / targetWords.length) * 100)));
      const fluencyScore = Math.min(100, Math.max(40, Math.round(accuracyScore * 0.95)));
      const stars = accuracyScore >= 80 ? 3 : accuracyScore >= 60 ? 2 : 1;
      return { accuracyScore, fluencyScore, stars };
    };
    ```
  - **3000ms VAD Debounce**:
    ```javascript
    // Lines 352-361 of src/components/cambridge/InformationExchangeP2.jsx
    debounceTimerRef.current = setTimeout(() => {
      if (recognitionRef.current) recognitionRef.current.stop();
    }, 3000); // 3000ms VAD timeout threshold
    ```
  - **Spaced Repetition System (SRS/Leitner)**:
    ```javascript
    // Lines 81-99 of src/services/srsService.js
    let newBox = existing.box;
    if (isCorrect) {
      newBox = Math.min(3, existing.box + 1);
    } else {
      newBox = 1;
    }
    const intervalsMs = { 1: 1 * 86400000, 2: 3 * 86400000, 3: 7 * 86400000 };
    nextReview: now + intervalsMs[newBox]
    ```

---

### A.5 Console Output Test Cases (Chạy thực tế)
```bash
================================================================
🚀 GOLD STANDARD DEEP FIELD VALIDATOR (6 GATEKEEPERS) — WEEK 33
================================================================
[Gatekeeper 1/6] No Space Before Period (/\s+\./g)            : ✅ PASS
[Gatekeeper 2/6] Zero Raw LaTeX (/\\text\{/g in listening_hub.js) : ✅ PASS
[Gatekeeper 3/6] ZERO-PII Export Check (No real_child_name in export payload) : ✅ PASS
[Gatekeeper 4/6] Vocab Count Check (vocab.length >= 20)      : ✅ PASS
[Gatekeeper 5/6] Webtoon Scenes Check (story_scenes.length >= 5) : ✅ PASS
[Gatekeeper 6/6] Index Export Check (All 4 Hub Keys Present)  : ✅ PASS
================================================================
🎉 ALL 6 GATEKEEPERS PASSED 100% FOR WEEK 33!
```

---

## PHẦN B — FEATURE INVENTORY (UX Perspective)

- ✅ **Trạm 1 Sub-tabs**:
  - `Webtoon Comic Story`: Render 5 khung tranh Webtoon 3D. Chạm vào Hotspot để nghe phát âm và xem cụm chunking.
  - `Interactive Story`: Bài đọc điền từ vào lỗ (Cambridge Reading Part 4 Standard).
  - `Reading Part 3`: Đọc truyện và trả lời 5 câu hỏi trắc nghiệm + 1 câu chọn tiêu đề đúng cho câu chuyện.
- ✅ **Trạm 2 Sub-tabs**:
  - 5 phần Listening Cambridge: P1 Draw Lines, P2 Secret Notes, P3 Item Hunt, P4 Picture Quiz, P5 Magic Color.
  - 3 Arena Games: Sentence Builder Battle, Bar Model Quest, Speed Match.
- ✅ **Trạm 3 Sub-tabs**:
  - `Write`: Mô tả 3 bức tranh (Panel 1, Panel 2, Panel 3) với Word Bank 4 nhóm từ và khung câu gợi ý.
  - `Check Mode`: 10 bài tập trắc nghiệm & điền từ kiểm tra kỹ năng viết.
- ✅ **Trạm 4 Sub-tabs**:
  - `Podcast`: Luyện phát âm shadowing theo 5 câu ngắn và 1 đoạn văn dài.
  - `Live Talk Show`: Hội thoại 5 lượt với Nova AI Examiner.
  - `Cue-Card Exchange (Part 2)`: Học sinh dùng micro đặt câu hỏi ngược lại cho Nova (Reverse Role) với bộ đếm tự ngắt 3000ms.
  - `Picture Story (Part 3)`: Hiển thị **chính xác 4 bức tranh (Picture 1, 2, 3, 4)** trên UI. Học sinh nghe đoạn mở đầu Tranh 1 và dùng mic ghi âm tiếp nối Tranh 2, 3, 4.

---

## PHẦN C — TRẠNG THÁI NGUYÊN TẮC AN TOÀN / KIẾN TRÚC

1. ✅ **Export JSON PII**: Đã kiểm tra Gatekeeper 3 (`scripts/validate_week.mjs`). Thuộc tính `real_child_name` tuyệt đối không tồn tại trong payload trả về của `exportLearnerProgressJSON` trong `src/services/learnerProgressService.js`.
2. ✅ **Zero-L1**: Tất cả các đoạn Tiếng Việt trên UI (như gợi ý, dịch nghĩa mặt sau thẻ) chỉ xuất hiện khi học sinh chủ động bấm xem hoặc chuyển tab ngôn ngữ.
3. ✅ **AI Score Labeling**: Nhãn hiển thị điểm số sử dụng định danh `Accuracy Score` & `Fluency Score` kèm sao thưởng ⭐ (1-3 sao), không giả mạo chữ ký giám khảo thật.
4. ✅ **Ảnh tĩnh + Audio only**: 100% hình ảnh là ảnh tĩnh PNG/SVG chất lượng cao, âm thanh qua Google Cloud TTS & Direct Web Speech API. Không dùng file video nặng gây trễ mạng.
5. ✅ **Đa learner**: Dynamic `learnerId` lấy từ `useUserStore((state) => state.currentUser?.id || 'guest_01')`. Không hardcode tên học sinh cố định.

---

## PHẦN D — PARENT DASHBOARD

- Route: `/dashboard` & `/dashboard/:weekId` ([`src/pages/ParentDashboard.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/pages/ParentDashboard.jsx))
- ✅ **Nguồn gốc nội dung "14 trạm" trong Parent Dashboard**:
  Nằm tại hằng số `STATION_HINTS` ([`src/pages/ParentDashboard.jsx#L11-L82`](file:///Users/binhnguyen/projects/Engquest3k/src/pages/ParentDashboard.jsx#L11)). Đây là mảng tĩnh 14 mục gợi ý cho phụ huynh từ mô hình cũ:
  1. Đọc & Khám Phá
  2. Từ Vựng Mới
  3. Ghép Từ
  4. Ngữ Pháp
  5. Shadowing
  6. Chính Tả
  7. Viết Văn
  8. Mindmap Nói
  9. Hỏi AI
  10. Logic Lab
  11. Sức Mạnh Từ Vựng
  12. Daily Watch
  13. Game Hub
  14. Ôn Tập Thông Minh (SRS)

---

## PHẦN E — GIẢI QUYẾT DỨT ĐIỂM CÁC ĐIỂM MÂU THUẪN

| # | Điểm mâu thuẫn | Câu trả lời dứt khoát + Bằng chứng Code |
|---|---|---|
| 1 | Số lượng tranh Speaking Part 3 | **Chính xác 4 bức tranh**. Code render tại `NovaTalkShowHub.jsx#L673` (`grid-cols-4`) và dữ liệu `pictureStoryData.pictures` gồm `P1, P2, P3, P4`. |
| 2 | Reading Part 3 (Trạm 1) | **Có tồn tại**. Định dạng: Đọc câu chuyện ngắn + 5 câu trắc nghiệm + 1 câu chọn tiêu đề chuẩn Cambridge Flyers (`WorldDiscoveryHub.jsx#L185`). |
| 3 | Listening 5 phần | **Đã có đầy đủ 5 phần** trong `ArenaHub.jsx`: P1 (`SVGLineMatcher.jsx`), P2 (`NotepadNoteCompleter.jsx`), P3 (`VisualMatchingAH.jsx`), P4 (`Station2CheckMode.jsx`), P5 (`SVGColorAndWrite.jsx`). |
| 4 | Mục tiêu số từ Writing Part 7 | Schema `writing.js` quy định `min_words: 20`, nhưng Cambridge Rule Engine (`cambridgeCriteria.js#L65`) áp đặt `targetWords = 50` cho Tuần 33. |
| 5 | Số Gatekeeper trong `validate_week.mjs` | **Chính xác 6 Gatekeepers**. (Kiểm tra regex space period, zero LaTeX, zero PII, vocab count >= 20, story scenes >= 5, index keys export). |
| 6 | "14 trạm" trong Parent Dashboard | Nguồn gốc từ hằng số `STATION_HINTS` gồm 14 mục trong `ParentDashboard.jsx#L11-L82`. |
| 7 | Spaced Repetition System (SRS/Leitner) | **Có tồn tại thật**. Mã nguồn tại `src/services/srsService.js` thực thi thuật toán Leitner 3 Hộp với khoảng thời gian ôn tập `1 ngày (Box 1)`, `3 ngày (Box 2)`, `7 ngày (Box 3)`. |
| 8 | Speaking Part 2 Reverse Role + Debounce 3000ms | **Có tồn tại thật**. Code tại `InformationExchangeP2.jsx#L361` cài đặt `setTimeout(..., 3000)` VAD threshold để ngắt nhận diện giọng nói khi học sinh tự đặt câu hỏi. |

---

## PHẦN F — TRẠNG THÁI BUILD & DEPLOY (CONSOLE OUTPUT)

```bash
> engquest3k@0.0.0 build
> vite build

vite v7.3.0 building client environment for production...
✓ 3728 modules transformed.
dist/assets/index.js 6,385.77 kB │ gzip: 1,517.17 kB
✓ built in 20.91s
```
**Trạng thái Build**: `SUCCESS (Zero Error)`.
