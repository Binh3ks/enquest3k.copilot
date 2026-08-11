# EngQuest3K — Technical Brief: 4 Gamified Experience Hubs
### Adventure-Based Exam Engine — W33 đến W46
**Phiên bản:** 1.0 | **Đối tượng:** Antigravity IDE / Dev Team | **Đối tượng người học:** Trẻ 8–11 tuổi, mục tiêu Cambridge Flyers (W72) & PET/B1 Preliminary (W156)

---

## 0. MỤC ĐÍCH TÀI LIỆU

Đây là brief kỹ thuật để build khung tổng thể (framework) cho 4 Gamified Hubs, triển khai theo 3 giai đoạn, mỗi giai đoạn build xong 1 khối và có thể test độc lập trước khi sản xuất nội dung đại trà theo tuần. Tài liệu gồm: kiến trúc dữ liệu chung, đặc tả từng trạm, pipeline sản xuất nội dung bằng AI agent, khung test/QA, và lịch sản xuất theo tuần.

**Nguyên tắc bắt buộc xuyên suốt:**
1. Mỗi trạm có 2 lớp tách biệt: **Learn Mode** (gamified, luyện tập, cho phép sai/gợi ý) và **Check Mode** (định dạng giống bài thi Cambridge thật, dùng để đo năng lực thật).
2. **Content Bank** (dữ liệu câu hỏi/bài học gốc) tách biệt hoàn toàn khỏi **Presentation Layer** (skin game, UI, animation). Đổi giao diện không được phép đụng vào ngân hàng nội dung.
3. Không dùng video — toàn bộ storytelling dùng **hình tĩnh (static illustration) + audio**, sản xuất bằng AI agent, để khớp sát định dạng thi thật (Cambridge Speaking Part 1, Writing Part 7 đều dùng tranh tĩnh) và giảm chi phí sản xuất.
4. Mọi tuyên bố "chính xác/độ phủ" phải đi kèm KPI đo được, không dùng số tuyệt đối (100%, 0%) làm tiêu chí nghiệm thu.
5. AI chấm điểm Writing/Speaking (Trạm 3, 4) phải qua bước **Calibration** với giám khảo Cambridge thật trước khi gắn nhãn "Certificate".

---

## 1. KIẾN TRÚC DỮ LIỆU TỔNG THỂ

### 1.1 Sơ đồ 3 lớp

```
┌─────────────────────────────────────────────┐
│  PRESENTATION LAYER (skin game / UI)         │
│  - Theme, nhân vật, hiệu ứng, âm thanh nền   │
│  - Khác nhau giữa Learn Mode và Check Mode   │
└───────────────────┬───────────────────────────┘
                     │ tham chiếu qua content_id
┌───────────────────▼───────────────────────────┐
│  CONTENT BANK (dữ liệu học thuật gốc)         │
│  - Câu hỏi, bài đọc, đáp án, rubric           │
│  - Gắn tag: skill, CEFR level, exam_part      │
└───────────────────┬───────────────────────────┘
                     │
┌───────────────────▼───────────────────────────┐
│  LEARNER PROGRESS LAYER                       │
│  - Log kết quả Learn Mode & Check Mode riêng  │
│  - Dùng cho Parent Dashboard & adaptive logic │
└─────────────────────────────────────────────┘
```

### 1.2 Schema Content Bank (dùng chung cho cả 4 trạm)

```json
{
  "content_id": "string (unique)",
  "station": "1 | 2 | 3 | 4",
  "skill_target": "reading | listening | grammar | logic | writing | speaking",
  "exam_reference": {
    "exam": "Flyers | PET",
    "part": "string (VD: Reading Part 2)",
    "cefr_level": "A2 | B1"
  },
  "unit_theme": "string (VD: Trại thám hiểm hang động)",
  "week": "W33...W72...W156",
  "raw_content": {
    "text": "string | null",
    "audio_asset_id": "string | null",
    "image_asset_ids": ["array"],
    "question_type": "MCQ | gap-fill | sentence-build | picture-story | dialogue"
  },
  "answer_key": "object",
  "rubric_ref": "string | null (chỉ dùng cho Writing/Speaking)",
  "difficulty_tier": "1 | 2 | 3 (dùng cho adaptive logic)",
  "qa_status": "draft | reviewed | approved"
}
```

### 1.3 Schema Learner Progress Layer

```json
{
  "learner_id": "string",
  "content_id": "string",
  "mode": "learn | check",
  "attempt_log": [
    { "timestamp": "iso8601", "result": "correct|incorrect", "hint_used": "bool" }
  ],
  "final_score": "number | null",
  "ai_score_raw": "number | null (chỉ Trạm 3/4, trước calibration)",
  "human_verified": "bool (dùng cho QA lấy mẫu)",
  "time_spent_seconds": "number"
}
```

**Yêu cầu kỹ thuật:** Tất cả sự kiện (bắt đầu phiên, hoàn thành, bỏ giữa chừng, số lần dùng gợi ý) phải được log real-time để phục vụ đo KPI ở mục 7 và Parent Dashboard ở mục 6.

---

## 2. ĐẶC TẢ TRẠM 1 — World Discovery & Story Quest

**Kỹ năng mục tiêu:** Reading & Listening Parts 1–4 (Cambridge Flyers → PET)
**Thay thế:** Read & Explore, Explore.js, Vocab, Word Power, Daily Watch

### 2.1 User Flow (Learn Mode)
1. Trẻ chọn "vùng đất" (unit theme) trên bản đồ tổng (map overview, 1 map/kỳ học).
2. Vào unit: chuỗi 4–6 khung tranh tĩnh liên tiếp kể 1 câu chuyện (không video, không animation chuyển động — chỉ hiệu ứng chuyển khung mượt: fade/slide).
3. Mỗi khung tranh có: audio kể chuyện tự động phát, các điểm chạm (hotspot) trên từ vựng để nghe phát âm + xem nghĩa minh họa (Lexical Chunks).
4. Cuối mỗi 2–3 khung tranh, xuất hiện 1 "Mật mã" (câu hỏi Cambridge MCQ/gap-fill dựa trên nội dung vừa nghe/đọc) — trả lời đúng mới mở khung tiếp theo.
5. Cuối unit: mở khóa "kho báu" (phần thưởng ảo — không phải certificate, chỉ badge trong game).

### 2.2 Check Mode
- Giao diện tối giản, không nhân vật/hiệu ứng, đúng layout bài thi Cambridge Reading/Listening thật.
- Dùng lại `content_id` từ cùng content bank nhưng render qua presentation layer "exam-style".
- Kết quả Check Mode ghi riêng vào Learner Progress, không cộng vào điểm game.

### 2.3 Yêu cầu kỹ thuật cụ thể
- Component chuỗi tranh (Story Viewer): hỗ trợ hotspot tọa độ x/y trên ảnh, mapping tới `vocab_id` trong content bank.
- Audio: format nén tốt cho mobile (AAC/MP3), có transcript đi kèm để hỗ trợ accessibility và làm dữ liệu train sau này.
- Fallback low-bandwidth: nếu mạng yếu, tự động tắt preload ảnh độ phân giải cao, dùng bản nén thấp hơn (cần 2 phiên bản ảnh: high-res và low-res, cùng `image_asset_id` gốc).

### 2.4 Acceptance Criteria (nghiệm thu framework, trước khi sản xuất đại trà)
- [ ] Story Viewer chạy được với dữ liệu mẫu (1 unit, 5 khung tranh, 3 câu hỏi) không lỗi.
- [ ] Check Mode render đúng layout thi thật từ cùng content_id.
- [ ] Log sự kiện đầy đủ: thời gian, số lần chạm hotspot, kết quả câu hỏi.
- [ ] Fallback low-bandwidth hoạt động (test bằng throttle network trong DevTools).

---

## 3. ĐẶC TẢ TRẠM 2 — Logic & Arena Battle

**Kỹ năng mục tiêu:** Grammar (câu ghép), Singapore Math/Logical Thinking
**Thay thế:** Grammar, Word Match, Logic Lab, Game Hub, Weekly Review
**Ưu tiên build đầu tiên (Giai đoạn 1)** — ít phụ thuộc AI mở, không cần media nặng.

### 3.1 User Flow (Learn Mode)
1. **Sentence Builder Battle**: hiển thị "dòng sông"/"quái vật chặn đường", trẻ kéo-thả khối từ (word blocks) để ghép câu đúng cấu trúc ngữ pháp (VD: Past Continuous + When/While). Đúng → hiệu ứng cầu hiện ra/quái vật lùi. Sai → khối rung nhẹ + gợi ý (không mất điểm ngay, cho thử lại tối đa 2 lần trước khi hiện đáp án).
2. **Singapore Bar Model Quest**: hiển thị bài toán dạng sơ đồ thanh, trẻ kéo-thả để dựng mô hình đúng rồi nhập đáp án số.
3. **Flash Arena**: chế độ đấu thẻ từ vựng tốc độ (timed), so điểm với AI hoặc bạn bè (leaderboard nội bộ lớp/nhóm, không public toàn hệ thống).

### 3.2 Check Mode
- Bài test Grammar/Logic định dạng chuẩn Cambridge (không kéo-thả trang trí, chọn đáp án dạng chuẩn).

### 3.3 Cơ chế thích ứng độ khó (Adaptive Logic)
```
NẾU sai 2 lần liên tiếp cùng dạng ngữ pháp (grammar_tag)
  → hiện nút "Học lại mẹo" (mini explainer 30 giây) trước khi cho thử lại
NẾU đúng liên tiếp 5 câu cùng độ khó
  → mở khóa "Elite Challenge" (difficulty_tier cao hơn, thiên B1 PET)
```
Logic này đọc từ field `difficulty_tier` và `attempt_log` trong Learner Progress Layer — không cần AI, chỉ rule-based.

### 3.4 Yêu cầu kỹ thuật cụ thể
- Component kéo-thả (drag-and-drop) cho word blocks và bar model — cần hỗ trợ touch trên tablet/mobile mượt.
- Engine chấm rule-based cho câu ghép: so khớp cấu trúc câu (không chỉ so khớp chuỗi text tuyệt đối — cần cho phép thứ tự từ linh hoạt nếu ngữ pháp vẫn đúng, VD nhận nhiều đáp án đúng cho 1 câu hỏi mở).
- Leaderboard: chỉ hiển thị trong phạm vi nhóm/lớp đã đăng ký, không lộ thông tin định danh trẻ ra ngoài nhóm.

### 3.5 Acceptance Criteria
- [ ] Sentence Builder chạy đúng với ≥3 dạng ngữ pháp mẫu (Past Continuous, Clauses of Reason, Connectors).
- [ ] Bar Model Quest chấm đúng với dữ liệu mẫu Singapore Math A2.
- [ ] Adaptive logic kích hoạt đúng theo rule ở mục 3.3 (test bằng cách giả lập chuỗi sai/đúng liên tiếp).
- [ ] Check Mode hiển thị đúng câu hỏi từ content bank, giao diện tối giản.

---

## 4. ĐẶC TẢ TRẠM 3 — Studio Storyteller

**Kỹ năng mục tiêu:** Writing Part 7 (3-Picture Storyteller), đạt điểm tuyệt đối theo rubric Cambridge
**Thay thế:** Write & Speak, Dictation

### 4.1 User Flow
1. Hiển thị 3 tranh tĩnh (theo đúng format Cambridge Writing Part 7) — dùng ảnh do AI agent sản xuất theo pipeline ở mục 8.
2. Trẻ viết "kịch bản phim" (script) mô tả câu chuyện qua 3 tranh, trong ô nhập liệu.
3. Word Bank Pills: các cụm từ gợi ý (Action Verbs, Connectors, Cumulative Chunks) hiển thị dạng "hạt năng lượng" nổi bên cạnh, trẻ chạm để chèn vào bài viết. Dùng cụm càng "đắt giá" (tag `advanced_chunk: true` trong content bank) thì chỉ số "Movie Quality" tăng.
4. Sau khi hoàn thành, hệ thống chấm 2 lớp (xem 4.2).

### 4.2 Chấm điểm — 2 lớp tách biệt (quan trọng)
**Lớp Rule-based (hiển thị ngay, độ tin cậy cao):**
- Đếm số câu dùng đúng thì quá khứ (regex/NLP đơn giản theo động từ bất quy tắc + đuôi -ed).
- Đếm số câu ghép (có connector: when/while/because/so...).
- Hiển thị ngay dạng "chỉ số" (VD: "Đã dùng 3/5 thì quá khứ, 2/3 câu ghép") — không gắn nhãn điểm số Cambridge chính thức.

**Lớp AI Content Feedback (gắn nhãn "tham khảo" cho đến khi calibration đạt ngưỡng — xem mục 9):**
- AI đánh giá mạch truyện, độ phù hợp nội dung với 3 tranh, độ sáng tạo.
- Hiển thị dạng "Movie Quality Score" — ghi rõ trạng thái: `verified` (sau calibration đạt ngưỡng) hoặc `practice_only` (trước khi đạt ngưỡng).

### 4.3 Yêu cầu kỹ thuật cụ thể
- Text editor tối giản, hỗ trợ chèn cụm từ gợi ý bằng 1 chạm (không phá cấu trúc câu đang gõ).
- API riêng cho rule-based checker (chạy client-side hoặc server nhẹ, không cần gọi AI cho phần này để tiết kiệm chi phí/độ trễ).
- API gọi AI feedback (model ngôn ngữ) — tách endpoint riêng, có timeout và fallback nếu AI lỗi (không chặn trẻ hoàn thành bài).

### 4.4 Acceptance Criteria
- [ ] Rule-based checker chấm đúng với ≥10 bài mẫu đã biết đáp án (test set nội bộ).
- [ ] Word Bank Pills chèn đúng vị trí con trỏ, không lỗi định dạng.
- [ ] AI feedback trả về trong <5 giây với bài mẫu, có fallback khi timeout.
- [ ] Nhãn `practice_only` hiển thị đúng mặc định cho đến khi có xác nhận calibration pass.

---

## 5. ĐẶC TẢ TRẠM 4 — Nova Talk Show & Exam Simulator

**Kỹ năng mục tiêu:** Speaking Part 1–4, đạt 5/5 Khiên Cambridge Speaking
**Thay thế:** Mindmap, Ask AI, Shadowing, AI Tutor Nova

### 5.1 Chế độ 1 — Podcast Studio (Shadowing)
- Trẻ nghe + nhại giọng theo audio mẫu (không cần video, chỉ audio + hình tĩnh minh họa nhân vật đang nói).
- AI chấm ngữ điệu/phát âm (Pronunciation Radar), hiển thị dạng sao (1–3 sao) — gắn nhãn `practice_only` cho đến khi calibration đạt ngưỡng (mục 9).

### 5.2 Chế độ 2 — Nova Live Talk Show
- Nova (AI) dùng lại 3 tranh trẻ vừa tạo kịch bản ở Trạm 3 làm chủ đề hội thoại.
- **Không dùng mốc "Turn 15" cố định.** Thay bằng điều kiện kết thúc động:

```
Hội thoại kết thúc KHI:
  (đã thu thập đủ bằng chứng cho cả 4 tiêu chí Speaking Part 1-4)
  HOẶC (đã đạt turn tối đa an toàn = 20, để tránh hội thoại vô hạn)

NẾU trẻ im lặng/không phản hồi > 2 lượt liên tiếp:
  → Nova chuyển sang câu hỏi gợi ý dễ hơn (difficulty_tier -1), không tính là "fail"
```

- Kết thúc hội thoại: xuất "Thẻ Kết Quả" (không gọi là "Cambridge Certificate" cho đến khi calibration đạt ngưỡng — xem mục 9). Trước đó gọi là "Thẻ Luyện Tập".

### 5.3 Yêu cầu kỹ thuật cụ thể
- Speech-to-text cho giọng trẻ em: cần đánh giá độ chính xác riêng cho nhóm tuổi 8–11 (khác với STT tối ưu cho người lớn) — nên test với mẫu giọng trẻ thật trước khi build UI hoàn chỉnh.
- Session state machine cho hội thoại: lưu trạng thái "đã cover tiêu chí nào" real-time để quyết định câu hỏi tiếp theo và điều kiện kết thúc.
- Giới hạn turn tối đa = 20 (an toàn kỹ thuật, tránh vòng lặp vô hạn hoặc chi phí API không kiểm soát).

### 5.4 Acceptance Criteria
- [ ] State machine kết thúc đúng điều kiện (test giả lập: đủ 4 tiêu chí sớm ở turn 8 → kết thúc sớm; không đủ đến turn 20 → kết thúc cưỡng bức).
- [ ] Nova chuyển câu hỏi dễ hơn đúng khi trẻ im lặng 2 lượt (test giả lập).
- [ ] STT test với ≥10 mẫu giọng trẻ thật, ghi nhận tỷ lệ nhận diện đúng làm baseline.
- [ ] Thẻ kết quả hiển thị đúng nhãn `practice_only` mặc định.

---

## 6. PARENT DASHBOARD (xuyên suốt, build từ Giai đoạn 1)

### 6.1 Yêu cầu chức năng
- Mapping mỗi hoạt động game → kỹ năng Cambridge tương ứng, hiển thị đơn giản: *"Con vừa hoàn thành: Reading Part 2 – Gap-fill, đạt 8/10"*.
- Biểu đồ tiến độ theo tuần (dùng dữ liệu Check Mode, không dùng điểm Learn Mode để tránh nhiễu do gamification).
- Không cần thiết kế phức tạp ở bản đầu — ưu tiên mapping rõ ràng hơn là giao diện đẹp.

### 6.2 Data source
Đọc trực tiếp từ Learner Progress Layer (mục 1.3), lọc theo `mode: check` để đảm bảo số liệu phản ánh năng lực thật.

---

## 7. KHUNG TEST TỔNG THỂ (dùng cho mọi trạm)

### 7.1 Loại test cần có ngay từ khung ban đầu
| Loại test | Mục đích | Tần suất |
|---|---|---|
| Unit test logic chấm điểm (rule-based) | Đảm bảo engine chấm đúng với bộ dữ liệu mẫu đã biết đáp án | Mỗi lần đổi logic |
| Integration test Content Bank ↔ Presentation Layer | Đảm bảo đổi UI không làm sai lệch nội dung hiển thị | Mỗi sprint |
| Load test Story Viewer / Talk Show | Đảm bảo mượt trên thiết bị tầm trung, mạng yếu | Trước mỗi lần launch giai đoạn |
| QA thủ công lấy mẫu (human review) | Bắt lỗi nội dung không phù hợp trẻ em, lỗi nhân vật không nhất quán | 10% nội dung mỗi tuần sản xuất |
| Calibration test (Trạm 3/4) | So AI score với giám khảo thật | Trước khi launch Giai đoạn 3 chính thức |

### 7.2 Môi trường test đề xuất
- **Sandbox mode**: cho phép QA chạy toàn bộ 1 unit (bất kỳ trạm nào) mà không ảnh hưởng dữ liệu tiến độ thật của trẻ.
- **Seed data set**: chuẩn bị sẵn 1 bộ dữ liệu mẫu tối thiểu cho cả 4 trạm (đã có ở các mục 2–5) để build và test framework trước khi sản xuất nội dung thật.

---

## 8. PIPELINE SẢN XUẤT NỘI DUNG BẰNG AI AGENT (Trạm 1 & 3, hình tĩnh + audio)

### 8.1 Quy trình 3 bước

| Bước | Việc | Người/AI thực hiện |
|---|---|---|
| 1. Style Guide & Character Sheet | Định nghĩa cố định: style vẽ, bảng màu, nhân vật Lexio + các nhân vật phụ tái xuất hiện, đóng gói thành prompt template + reference image cố định | Art director (người), set 1 lần dùng cho toàn bộ hệ thống |
| 2. Sinh hàng loạt | AI agent generate illustration theo từng cảnh, dùng character sheet để giữ nhất quán nhân vật qua các tranh | AI agent |
| 3. QA & duyệt | Kiểm tra: nội dung phù hợp trẻ em, nhân vật không "trôi" hình dạng giữa các cảnh, khớp đúng ngữ cảnh bài học | Người review — **bắt buộc**, không auto-publish |

### 8.2 Lưu ý kỹ thuật quan trọng
AI image generation hiện có hạn chế về **giữ nhất quán nhân vật (character consistency)** qua nhiều ảnh liên tiếp — cần khóa chặt reference image + prompt template ở bước 1. **Bắt buộc pilot 1 unit mẫu (5–6 tranh, 1 nhân vật) trước khi generate hàng loạt**, đo tỷ lệ đạt QA lần đầu để ước lượng effort cho các unit tiếp theo.

### 8.3 Audio production
- Kể chuyện: text-to-speech chất lượng cao hoặc voice actor thu sẵn theo từng đoạn transcript (không cần thu theo unit hoàn chỉnh — có thể ghép động từ các đoạn câu ngắn nếu dùng TTS, giúp tái sử dụng khi sửa nội dung).
- SFX: dùng thư viện sound effect có sẵn, không cần sản xuất riêng.

---

## 9. QUY TRÌNH CALIBRATION AI (bắt buộc trước Giai đoạn 3 chính thức)

### 9.1 Các bước
1. Thu thập 50–100 mẫu bài viết (Trạm 3) và 50–100 mẫu ghi âm (Trạm 4) từ trẻ ở độ tuổi mục tiêu (có thể lấy từ giai đoạn pilot/beta test nội bộ).
2. Giám khảo Cambridge thật hoặc giáo viên có kinh nghiệm chấm theo đúng rubric Part 7 (Writing) và Part 1–4 (Speaking), độc lập với AI.
3. Chạy AI chấm cùng bộ mẫu, tính độ lệch trung bình (band difference) so với giám khảo thật.
4. **Ngưỡng pass: độ lệch trung bình ≤ 0.5 band.**
5. Nếu đạt: mở nhãn `verified`, cho phép hiển thị "Cambridge Certificate"/điểm chính thức.
   Nếu không đạt: giữ nhãn `practice_only`, ghi log để cải thiện model, lặp lại calibration sau khi điều chỉnh.

### 9.2 Trách nhiệm
- Chuẩn bị bộ mẫu và tổ chức chấm song song: cần xác nhận trước — dùng giáo viên nội bộ hay thuê giám khảo Cambridge ngoài.
- Kết quả calibration phải được lưu lại có version, để mỗi lần đổi model AI đều re-run calibration trước khi thay đổi nhãn hiển thị.

---

## 10. LỊCH SẢN XUẤT THEO TUẦN (W33 – W46)

### GIAI ĐOẠN 1 — Trạm 2 (W33–W36)
| Tuần | Việc |
|---|---|
| W33 | Setup Content Bank schema + Learner Progress schema. Build Sentence Builder Battle (Learn Mode) với dữ liệu mẫu. |
| W34 | Build Bar Model Quest + Flash Arena. Build adaptive logic (mục 3.3). |
| W35 | Build Check Mode cho Trạm 2. Bắt đầu sản xuất nội dung thật cho 2–3 unit đầu tiên. |
| W36 | QA toàn bộ Trạm 2. Đo KPI (mục 11). Review Go/No-Go sang Giai đoạn 2. |

### GIAI ĐOẠN 2 — Trạm 1 (W37–W40)
| Tuần | Việc |
|---|---|
| W37 | Setup pipeline AI agent (mục 8). Pilot 1 unit mẫu (style guide + character sheet + QA). |
| W38 | Build Story Viewer component (Learn Mode) + hotspot vocab. Generate nội dung 2–3 unit tiếp theo. |
| W39 | Build Check Mode Trạm 1. Tiếp tục sản xuất nội dung theo tuần (song song build). |
| W40 | QA toàn bộ Trạm 1. Đo KPI. Review Go/No-Go sang Giai đoạn 3. |

### GIAI ĐOẠN 3 — Trạm 3 + Trạm 4 (W41–W46)
| Tuần | Việc |
|---|---|
| W41 | Thu thập mẫu bài viết/ghi âm ban đầu (từ beta test nội bộ hoặc dữ liệu có sẵn) để chuẩn bị calibration. |
| W42 | Build Trạm 3 (rule-based checker trước, AI feedback layer sau). Bắt đầu chạy calibration song song. |
| W43 | Build Trạm 4 (state machine hội thoại, STT test với giọng trẻ em). |
| W44 | Hoàn thiện calibration Writing + Speaking, đo độ lệch band. |
| W45 | QA toàn bộ Trạm 3 + 4. Nếu calibration chưa đạt ngưỡng, giữ nhãn `practice_only` và launch ở chế độ luyện tập trước. |
| W46 | Launch chính thức (nếu đạt ngưỡng calibration) hoặc tiếp tục cải thiện model, review lại. |

---

## 11. BẢNG KPI NGHIỆM THU TỔNG HỢP

| Giai đoạn | Chỉ số | Ngưỡng đạt |
|---|---|---|
| GĐ1 (Trạm 2) | Tỷ lệ hoàn thành phiên | ≥70% |
| GĐ1 | Thời gian trung bình/phiên | 12–20 phút |
| GĐ1 | Cải thiện điểm Check Mode (tuần 1 vs tuần 4) | Có cải thiện đo được |
| GĐ2 (Trạm 1) | Tỷ lệ hoàn thành unit | ≥65% |
| GĐ2 | Tỷ lệ tranh đạt QA lần đầu | Ghi nhận thực tế ở pilot W37, dùng làm baseline |
| GĐ2 | Tính nhất quán nhân vật | Pass/fail theo review thủ công |
| GĐ3 (Trạm 3/4) | Độ lệch AI Writing vs giám khảo thật | ≤0.5 band |
| GĐ3 | Độ lệch AI Speaking vs giám khảo thật | ≤0.5 band |
| GĐ3 | Tỷ lệ hoàn thành Talk Show | ≥60% |
| Toàn hệ thống | False PASS rate (QA thủ công định kỳ) | <5% |
| Toàn hệ thống | Coverage dạng câu hỏi so với đề thi thật | ≥95%, review bởi người có chuyên môn Cambridge |

---

## 12. PHỤ LỤC — CHECKLIST BÀN GIAO MỖI GIAI ĐOẠN

**Trước khi coi 1 giai đoạn là "xong":**
- [ ] Toàn bộ Acceptance Criteria của (các) trạm trong giai đoạn đó đạt (mục 2.4 / 3.5 / 4.4 / 5.4).
- [ ] KPI ở mục 11 đo được và đạt ngưỡng (hoặc có quyết định rõ ràng go/no-go nếu chưa đạt).
- [ ] Parent Dashboard phản ánh đúng dữ liệu Check Mode của giai đoạn đó.
- [ ] QA thủ công đã lấy mẫu ≥10% nội dung sản xuất trong giai đoạn, không phát hiện lỗi nghiêm trọng (nội dung không phù hợp, sai đáp án, lỗi hiển thị).
- [ ] Với Giai đoạn 3: calibration report đã được lưu có version, nhãn hiển thị (`verified`/`practice_only`) khớp đúng kết quả calibration.

---

*Hết brief. Sẵn sàng gửi Antigravity IDE để bắt đầu Giai đoạn 1 (Trạm 2) — dữ liệu mẫu và schema đã đủ chi tiết để dựng khung test trước khi sản xuất nội dung thật theo lịch tuần ở mục 10.*
