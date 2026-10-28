# BÁO CÁO NGHIỆM THU GÓI 003B: SỬA CODE & NỘI DUNG — PRODUCTION VERIFIED

- **Mã gói**: GÓI 003B (Bước 2: Sửa Code/Data & Bước 3: Verify Production Thật)
- **Production URL**: `https://app.bkbacademy.vn/week/34`
- **Commit Production Đang Chạy**: `efe32bb3ee1f37c455a1d0478717dd04626ede8f` (short: `efe32bb3`)
- **Trạng thái**: ✅ **PASS TOÀN BỘ 100% (0 LỖI)**
- **Thời gian nghiệm thu**: 2026-10-28T03:25:00Z

---

## 1. TRẢ LỜI CÂU HỎI BẮT BUỘC (Mục 4)
**Câu hỏi:** Chuỗi *"Where does the mouse live?"* bị Gate 15 v2 bắt là prompt_question cố định trong data tuần hay text tự do do học sinh gõ?

**Trả lời kèm trích dẫn code & data thực tế:**
1. Chuỗi này là **câu hỏi khảo thí cố định theo tuần** (Examiner Question) của Cambridge Flyers Speaking Part 2, biết trước mỗi tuần:
   - Trong `src/data/weeks/week_34/speaking_hub.js` (dòng 39):
     ```javascript
     examiner_questions: [
       { id: "eq1", text: "Where does the mouse live?", audio_url: "/audio/week34/info_exchange_q1.mp3" },
       ...
     ]
     ```
   - Trong `src/components/cambridge/InformationExchangeP2.jsx` (dòng 50):
     ```javascript
     nova_question: (raw.examiner_questions && raw.examiner_questions[i]?.text) || `What is the ${item.label.toLowerCase().replace('?','')} of ${examPerson}?`
     ```
2. **Nguyên nhân từng kích hoạt `window.speechSynthesis` / runtime TTS trước đó:**
   - Trong `InfoExchangeZone.jsx`, khi vào màn hình, sau 500ms `useEffect` tự động gọi `VoiceService.speak(...)` phát câu hỏi #1. Do trình duyệt chặn Autoplay (`NotAllowedError`), `VoiceService.js:421` đã bắt exception và tự ý kích hoạt `this.webFallback(cleanedText)` gọi `window.speechSynthesis.speak()`.
   - Ngoài ra, trước đây `audio_url` trỏ nhầm vào `exam_intro_S2.mp3` thay vì file mp3 riêng của câu hỏi.
3. **Giải pháp đã triệt tiêu:**
   - Đã sinh file MP3 tĩnh: `/audio/week34/info_exchange_q1.mp3` (13,824 bytes).
   - Đã sửa `VoiceService.js` loại bỏ hoàn toàn `webFallback` khi autoplay bị chặn.
   - Tuyệt đối KHÔNG có bất kỳ lời gọi nào tới `texttospeech.googleapis.com` hay `window.speechSynthesis.speak()` trên toàn bộ 15 quest.

---

## 2. TỔNG HỢP CÁC SỬA ĐỔI ĐÃ TRIỂN KHAI

### Nhóm 1: Shared Components & System Config (Commit `8a1761fd`)
1. **`InformationExchangeP2.jsx`**:
   - Xóa hardcode `"Jake"` / `"Tom"` tại các dòng 203, 236, 593, 595. Đọc động nhân vật từ `data.table_b?.person` (Milo) và `data.table_a?.person` (Leo).
   - Chuẩn hóa đọc `.items` thay vì `.fields`.
   - Pha 1 Intro & Pha 2 Transition gọi MP3 tĩnh `/audio/week${week}/info_exchange_intro_p1.mp3` và `_p2.mp3`.
   - Dòng câu hỏi examiner gắn trực tiếp `audio_url` tĩnh (`info_exchange_q1..q4.mp3`).
2. **`InfoExchangeZone.jsx`**:
   - Xóa placeholder hardcode `"Tom"` (dòng 689) -> đổi thành placeholder trung lập `"e.g. Where does the character live?"`.
   - Xóa text tai nạn W33 cứng ở dòng 410 -> đọc động `infoExData?.model_dialogue_text`.
   - Cập nhật hiển thị `+50 XP & +2 Speaking Shields`.
3. **`TaskScreen.jsx`**:
   - Xóa fallback kép `card.items || card.fields || []` tại dòng 115 và 151 -> chuẩn hóa duy nhất `card.items || []`.
   - Thống nhất nhãn tiêu đề thẻ:
     - Thẻ A: `"Your Question Card"` (`"Your Question Card — Ask Examiner Nova"`)
     - Thẻ B: `"Your Information Card"` (`"Your Information Card — Answer Examiner Nova"`)
4. **`StoryWriting.jsx`**:
   - Truyền `audioUrl` tĩnh (`/audio/week${currentWeek}/scene_${idx + 1}.mp3`) vào `speakText` khi bấm nghe Scene.
5. **`voiceService.js`**:
   - Xóa `webFallback` gọi `speechSynthesis.speak()` khi autoplay bị chặn.
6. **`gamificationConfig.js` & `questSchedule.js`**:
   - Nâng XP của `info_exchange` từ 20 lên 50 XP (Phương án A).

### Nhóm 2: Xóa Bỏ Hoàn Toàn Dictation (Commit `c30ab03e`)
1. **`StoryWorldZone.jsx`**:
   - Xóa bỏ nút và tab `"✍️ Dictation Notepad"` trong Voice Shadow.
   - Xóa `voiceShadowMode` state và `VoiceShadowDictation` unused import.
   - Gắn audio URL tĩnh `/audio/week${activeWeek}/shadowing_${retellStepIdx + 1}.mp3` vào nút "Listen" của Scene trong Story Retell.
2. **`skill_practice_hub.js` (W34)**:
   - Xóa bỏ toàn bộ mảng 8 câu `dictation` còn sót lại.

### Nhóm 3: Dữ Liệu W34, Action Lab 3-Scenario & Static Assets (Commit `efe32bb3`)
1. **`speaking_hub.js` (W34)**:
   - Cung cấp 100% dữ kiện hoàn chỉnh cho `candidate_card` (Lion) và `examiner_card` (Mouse), không có trường `null` hay `known: false`.
   - Chuẩn hóa schema sang `.items`.
   - Gắn audio tĩnh cho 4 câu hỏi examiner: `info_exchange_q1.mp3` đến `_q4.mp3`.
2. **`skill_practice_hub.js` (W34)**:
   - Tái cấu trúc `science_lab` đạt **Invariant 3-kịch bản (`stages: [Stage 1, Stage 2, Stage 3]`)**:
     - **Stage 1 (Lookout & Early Warning)**: Warning Birds, Mighty Lion, Forest Trees, Forest Floor.
     - **Stage 2 (Trapped Lion & Teamwork Rescue)**: Brave Mouse, Trapped Lion, Hunters' Net, Anchor Tree.
     - **Stage 3 (Balanced Forest Ecosystem & Friendship)**: Forest Trees, Little Mouse, Mighty Lion, Warning Birds.
3. **Sinh & Đồng Bộ Tài Nguyên Âm Thanh / Hình Ảnh**:
   - 10 file MP3 tĩnh trong `public/audio/week34/`: `scene_1.mp3`, `scene_2.mp3`, `scene_3.mp3`, `scene_4.mp3`, `info_exchange_intro_p1.mp3`, `info_exchange_intro_p2.mp3`, `info_exchange_q1.mp3`..`_q4.mp3`.
   - 2 file sơ đồ sinh thái `public/images/week34/action_lab_diagram.png` và `.jpg`.
   - Xác nhận 8 ảnh Listening Part 3 (Forest Clearing, Hunter Camp, Tree Hollow, Riverbank, Lookout Rock, Dark Cave, Base Tent, Wooden Tower) đã có sẵn; nếu Owner cần vẽ lại theo phong cách mới thuần cảnh không vật thể thì sẵn sàng triển khai vòng riêng.

---

## 3. KẾT QUẢ KIỂM THỬ THỰC TẾ TRÊN PRODUCTION (EVIDENCE RAW)

### 3.1. Gate 15 v2 Playtest Toàn Diện 15 Quest trên Production (W34)
```text
========================================================================
🛡️ GATE 15 v2: FUNCTIONAL PLAYTEST & TTS RUNTIME GUARD (W34)
Target: https://app.bkbacademy.vn
========================================================================

[1/15] Auditing Quest 1: Scene Explorer (D1)...
[2/15] Auditing Quest 2: Voice Shadow (D1)...
[3/15] Auditing Quest 3: Story Retell (D1)...
[4/15] Auditing Quest 4: Fact Finder (D2)...
[5/15] Auditing Quest 5: Action Lab (D2)...
[6/15] Auditing Quest 6: Discovery Report (D2)...
[7/15] Auditing Quest 7: Speed Match (D3)...
[8/15] Auditing Quest 8: Grammar Duel (D3)...
[9/15] Auditing Quest 9: Math Quest (D3)...
[10/15] Auditing Quest 10: Story Writer (D4)...
[11/15] Auditing Quest 11: Video Challenge (D4)...
[12/15] Auditing Quest 12: Info Exchange (D4)...
[13/15] Auditing Quest 13: Listening Shield (D5)...
[14/15] Auditing Quest 14: Reading Shield (D5)...
[15/15] Auditing Quest 15: Speaking & Passport (D5)...
  Testing Speaking Part 2 state machine progression...

========================================================================
📊 GATE 15 v2 AUDIT RESULTS
========================================================================
Total Failures Detected: 0

✅ GATE 15 v2 PASSED: 0 runtime TTS, 0 missing audios, 0 frozen phases, 0 dictation tabs.
```

### 3.2. W33 Freeze Guard & Gate 15 W33 trên Production (Zero Regression)
```text
> node scripts/guard_golden_w33_freeze.mjs
  ✅ [LOCKED] src/data/weeks/week_33/reading_hub.js (SHA-256: 0989664a86eab234...)
  ✅ [LOCKED] src/data/weeks/week_33/listening_hub.js (SHA-256: c8caa574c815f4e1...)
  ✅ [LOCKED] src/data/weeks/week_33/writing_hub.js (SHA-256: 834a0fe0aaa9a1eb...)
  ✅ [LOCKED] src/data/weeks/week_33/speaking_hub.js (SHA-256: b6e3f6a154780f11...)
  ✅ [LOCKED] src/data/weeks/week_33/skill_practice_hub.js (SHA-256: 29ef4a01e8188d00...)
  ✅ [LOCKED] src/data/weeks/week_33/vocab.js (SHA-256: 77ef5f765f3c21de...)
  ✅ [LOCKED] docs/GATE15_SPEC_W33.json (SHA-256: f78a2edcc1036b99...)
🎉 W33 GOLDEN MASTER INTEGRITY VERIFIED: 100% OF PROTECTED FILES LOCKED!

> node scripts/gate15_v2_functional_audio_playtest.mjs 33
Target: https://app.bkbacademy.vn
Total Failures Detected: 0
✅ GATE 15 v2 PASSED: 0 runtime TTS, 0 missing audios, 0 frozen phases, 0 dictation tabs.
```

### 3.3. Static Schema Uniformity & Whitelist Entity Gates
```text
> node scripts/gate_schema_uniformity.mjs 34
Total Violations: 0
✅ SCHEMA UNIFORMITY GATE PASSED: Clean schemas and zero dual-fallback patterns.

> node scripts/gate_whitelist_entities.mjs 34
Total Rogue Entity Violations: 0
✅ WHITELIST ENTITY GATE PASSED: All student-facing entities match authorized whitelist for Week 34.
```

---

## 4. BẰNG CHỨNG HÌNH ẢNH TRÊN PRODUCTION THẬT

### 4.1. Action Lab W34 (3 Scenarios, Đúng Chủ Đề Sư Tử & Chuột)
![Action Lab Interactive Live](file:///Users/binhnguyen/.gemini/antigravity-ide/brain/5b824817-1f20-4f7f-be0d-9ebbb2361075/01b_action_lab_interactive.png)

### 4.2. Info Exchange W34 (+50 XP, 4 Dữ Kiện Thật, Không Còn Tom/Jake)
![Info Exchange Live](file:///Users/binhnguyen/.gemini/antigravity-ide/brain/5b824817-1f20-4f7f-be0d-9ebbb2361075/02_info_exchange_live.png)

### 4.3. Speaking Part 2 W34 (Hết Treo Pha 1, Tiến Vào Question 1, Không TTS Runtime)
![Speaking Part 2 Live](file:///Users/binhnguyen/.gemini/antigravity-ide/brain/5b824817-1f20-4f7f-be0d-9ebbb2361075/03_speaking_p2_q1_live.png)

### 4.4. Voice Shadow W34 (Không Còn Nút "Dictation Notepad")
![Voice Shadow Live](file:///Users/binhnguyen/.gemini/antigravity-ide/brain/5b824817-1f20-4f7f-be0d-9ebbb2361075/04_voice_shadow_no_dictation_live.png)
