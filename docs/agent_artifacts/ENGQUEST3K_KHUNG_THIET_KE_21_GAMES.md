# KHUNG THIẾT KẾ CHUẨN — 21 MINI-GAME ENGQUEST3K CHRONICLES
**Vai trò áp dụng**: Game designer giáo dục + ESL curriculum designer
**Ngày**: 2026-09-12 | **Thay thế**: cách làm cũ (sửa từng game rời rạc, tick theo báo cáo code)

---

## 0. Vì sao văn bản này tồn tại

6 game Floor 6-7 đã được tick "hoàn thành" dựa trên: build pass + công thức xác suất đúng + code logic đúng. Nhưng playtest thật cho thấy **3 tiêu chí đó không đủ** — game vẫn có thể: không chuyển động thật, chạy quá nhanh không đọc kịp, luật chơi không ai hiểu nổi mà không cần giải thích.

Thay vì vá từng lỗi riêng lẻ (đã làm và đã thất bại), văn bản này định nghĩa **5 nguyên tắc thiết kế bắt buộc** + **1 schema chuẩn** mà MỌI game trong 21 game (6 Floor 6-7 + 15 mini-game/tuần) phải đáp ứng, để Antigravity dùng làm khung audit + redesign thống nhất — không phải sửa vá theo phản ứng.

---

## 1. Năm nguyên tắc thiết kế bắt buộc

### N1 — Skill-Mechanic Fusion (Gắn kỹ năng vào hành động, không tách rời)
Định nghĩa "GAME THẬT" (không phải "có hoạt hình" hay "không phải multiple-choice"): **nếu bịt hết nội dung ngôn ngữ, người chơi PHẢI không còn cách thắng nào khác ngoài đoán mò/brute-force**. Kỹ năng ngôn ngữ là input duy nhất quyết định hành động đúng, tại đúng thời điểm rủi ro xảy ra (đồng thời, không tách rời đọc-xong-rồi-mới-hành-động).

### N2 — Legible Real-Time (Chuyển động nhưng phải ĐỌC KỊP)
Chuyển từ "quiz tĩnh" sang "chuyển động" không có nghĩa là nhanh hơn khả năng đọc của học sinh mục tiêu. Bắt buộc tính **ngân sách thời gian (pacing budget)** trước khi code:

> T(đọc nội dung ngôn ngữ) + T(ra quyết định) ≤ T(engine cho phép trước khi rủi ro xảy ra)

Nếu chưa đo được 2 vế này bằng số cụ thể (giây), thiết kế CHƯA xong — không phải chi tiết kỹ thuật, mà là điều kiện tiên quyết.

### N3 — Self-Evident Controls (Hiểu luật chơi trong 5 giây đầu, không cần giải thích)
Người chơi không được yêu cầu tự suy luận ý nghĩa 1 cơ chế mới (VD: "Aim là gì, tại sao Strike"). Mọi cơ chế phải có **affordance ngay trên màn hình gắn liền hành động** (label tại chỗ, không phải hướng dẫn dài riêng biệt phải đọc trước).

### N4 — Anti-Guesswork bằng đúng công thức xác suất
Brute-force phải tính đúng loại phản hồi:
- **Đoán mù 1 lần** (không có phản hồi giữa chừng): công thức 1/n cho mỗi thử, tích lũy theo số lần được thử.
- **Đoán có phản hồi từng bước** (biết ngay đúng/sai sau mỗi hành động, có thể điều chỉnh): công thức khác hẳn — đã từng bị tính nhầm (VD: #4 cũ tính 2.88% nhưng đúng ra là 40.74%).
Ngưỡng chấp nhận: **<5% toàn game**. 5-10% cần Owner duyệt riêng có lý do. Trên 10% → bác, phải giảm tim/tăng độ khó.

### N5 — Consistent Meta-HUD (Khung giao diện đồng nhất, không ngoại lệ)
Mọi game phải hiển thị đủ 4 thứ trên màn hình chơi: (a) tên Floor + Door, (b) số tim còn lại, (c) round hiện tại/tổng, (d) XP tích lũy. Thiếu 1/4 = **chưa đạt**, bất kể cơ chế lõi đúng hay sai.

---

## 2. Schema chuẩn — bảng bắt buộc điền cho MỖI game trước khi cho phép code

| Trường | Bắt buộc điền |
|---|---|
| ID / Floor-Door | |
| Engine file (đường dẫn thật) | |
| Kỹ năng ngôn ngữ mục tiêu | |
| Core loop | input → world state → risk moment → feedback (mô tả đúng thứ tự thời gian) |
| Đồng thời hay tách rời? | (theo N1) |
| Ngân sách thời gian | T đọc + T quyết định = ? giây; T engine cho phép = ? giây (theo N2) |
| Công thức xác suất đoán mò | loại nào (mù/có phản hồi) + kết quả % (theo N4) |
| HUD có mặt trên màn hình | check 4 mục (theo N5) |
| Controls self-evident trong 5s? | Có/Không + bằng chứng |
| Bằng chứng | ảnh/gif Puppeteer bấm phím thật — không hook giả lập |
| Kết luận theo 4 tiêu chí | Đạt / Không đạt từng tiêu chí, ghi rõ tiêu chí nào fail |

**Không game nào được tick "hoàn thành" nếu bảng này chưa điền đủ và có bằng chứng thật đính kèm.**

---

## 3. Áp dụng schema — 6 game Floor 6-7 (dựa evidence hiện có, 2026-09-12)

| # | Game | N1 Skill-Mechanic | N2 Pacing | N3 Controls | N4 Anti-guess | N5 HUD | Kết luận |
|---|------|---|---|---|---|---|---|
| 1 | Synonym Storm | Đạt (đã audit) | Chưa đo cụ thể | Chưa xác nhận | Chưa xác nhận lại | Có (ảnh cho thấy) | **CẦN AUDIT LẠI đủ 5 nguyên tắc, không chỉ N1** |
| 2 | Connector Relay | Đạt | ❌ FAIL — ảnh cho thấy tốc độ road quá nhanh, hearts đã mất 1 | Chưa xác nhận | Chưa xác nhận lại | Có | **FAIL N2** |
| 3 | Word Forge Scramble | ❌ Nghi ngờ — ảnh cho thấy Leo không nhảy, platform không có bậc cao độ → có thể đã suy thoái thành bảng tĩnh dù code có animation loop | Chưa đo | Chưa xác nhận | Đạt (0.3125%, đã kiểm chứng) | Có | **FAIL N1 (nghi vấn), cần bằng chứng chuyển động thật** |
| 4 | Question Quest Runner | Nghi ngờ — 3 lựa chọn WH-question đều hợp lý cho cùng câu → có thể không phân biệt được bằng ngôn ngữ thật | Chưa đo | ❌ FAIL — không có tiêu đề Floor/Door, không rõ đang chơi gì | Đạt trên giấy (1.78%, công thức đã sửa đúng) nhưng cần verify lại theo thiết kế thật đang chạy | ❌ FAIL — thiếu title | **FAIL N3, N5; nghi vấn N1** |
| 5 | Story Sequencer | Đạt | Chưa đo | Chưa xác nhận | Đạt (4.17%, đã kiểm chứng) | Chưa xác nhận | Có ảnh "_unmounted" đúng nhưng chưa audit N2/N3/N5 |
| 6 | Word Class Balance | Nghi ngờ — luồng Aim→Strike không rõ quan hệ với việc trả lời từ loại | Chưa đo | ❌ FAIL — không giải thích Aim/Strike nghĩa là gì | Đã bị bác 1 lần (0.39% sai do model không khớp thực tế "thử lại nhiều lần"), CHƯA tính lại | ❌ FAIL — ảnh không thấy tim/round | **FAIL N3, N4 (chưa xác nhận), N5** |

**Kết luận**: 0/6 game hiện đáp ứng đủ 5 nguyên tắc với bằng chứng đầy đủ. Không game nào được coi là "hoàn thành" cho tới khi audit lại toàn bộ theo bảng ở Mục 2.

---

## 4. 15 mini-game/tuần còn lại — CHƯA audit theo schema này

Chưa có bằng chứng (ảnh/gif thật) theo 5 nguyên tắc cho nhóm này. **Không được giả định "vì build pass nên ổn"** — áp dụng đúng nguyên tắc từng bị vi phạm ở 6 game Floor 6-7. Phải audit theo Mục 2 trước khi xếp vào bất kỳ batch redesign nào.

---

## 5. Quy trình bắt buộc thay thế cách làm cũ

1. **Audit trước, không sửa code trước.** Antigravity điền bảng Mục 2 cho toàn bộ 21 game, kèm ảnh/gif Puppeteer bấm phím thật cho từng dòng "Bằng chứng". Nộp dưới dạng bảng, không viết văn dài.
2. **Owner xếp hạng ưu tiên** dựa trên số tiêu chí FAIL + mức ảnh hưởng học tập (game nào học sinh chơi nhiều nhất/dễ bỏ cuộc nhất).
3. **Redesign theo batch 3 game/lần**, chọn theo bảng xếp hạng ở bước 2 — không chọn ngẫu nhiên hay theo cảm tính.
4. Với mỗi game trong batch: bản thiết kế mới phải điền lại schema Mục 2 với **giải pháp đề xuất** (không phải code) → Owner duyệt thiết kế → mới cho code.
5. Code: fork file mới (không sửa file cũ đang chạy production), playtest Puppeteer keyboard thật, guard `import.meta.env.DEV` cho mọi test hook mới, git commit tách riêng theo loại.
6. Owner xác nhận bằng ảnh/video thật → mới mở batch tiếp theo.

---

## 6. Mẫu bảng trống để Antigravity điền (copy cho mỗi game)

```
### Game: [tên] (Floor __ Door __)
- Engine file:
- Kỹ năng ngôn ngữ:
- Core loop:
- Đồng thời/tách rời:
- Ngân sách thời gian: đọc+quyết định = __s | engine cho phép = __s
- Xác suất đoán mò: loại __ = __%
- HUD: Floor/Door [ ] | Tim [ ] | Round [ ] | XP [ ]
- Controls self-evident 5s: [Có/Không] + bằng chứng
- Bằng chứng playtest: [đường dẫn ảnh/gif]
- Kết luận: N1[ ] N2[ ] N3[ ] N4[ ] N5[ ] → Đạt/Không đạt
```
