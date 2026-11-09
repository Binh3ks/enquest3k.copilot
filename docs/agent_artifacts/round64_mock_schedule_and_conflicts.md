# BÁO CÁO TÁI CẤU TRÚC LỊCH THI MOCK EXAM (156 TUẦN) & PHÂN TÍCH XUNG ĐỘT TOÀN DIỆN

> **Phiên bản:** Round 64 — Quyết định Kiến trúc Sư phạm
> **Quy tắc mới:** Chu kỳ cố định **đúng 4 tuần / 1 bài Mock Exam** xuyên suốt toàn bộ 156 tuần (W4, W8, W12, ... W156 = 39 tuần mock).
> **Phân định Stage:**
> - **Stage 1 (Tuần 1 – 72):** Định dạng **Cambridge YLE Flyers (A2)** (18 tuần mock).
> - **Stage 2 (Tuần 73 – 156):** Định dạng **Cambridge B1 Preliminary / PET** (21 tuần mock).
> - **Trạng thái Lite Mode (W01–W16):** Tạm hoãn (Deferred) — W4, W8, W12, W16 thuộc dải Lite Mode, không build engine lúc này.

## I. BẢNG TỔNG HỢP TOÀN BỘ 39 TUẦN MOCK THEO LỊCH MỚI

| STT | Tuần Mock | Khung tuần kiểm tra | Stage & Định dạng | Trạng thái Blueprint hiện tại | Thuộc Mock cũ? | Đánh giá & Xung đột |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| 1 | **W4** | W1–W4 | Stage 1 (Flyers A2) | `rotary_practice (false)` | ❌ Không (Mới) | Thuộc dải Lite Mode (W01–W16) — Tạm hoãn (Deferred) |
| 2 | **W8** | W5–W8 | Stage 1 (Flyers A2) | `rotary_practice (false)` | ❌ Không (Mới) | Thuộc dải Lite Mode (W01–W16) — Tạm hoãn (Deferred) |
| 3 | **W12** | W9–W12 | Stage 1 (Flyers A2) | `rotary_practice (false)` | ❌ Không (Mới) | Thuộc dải Lite Mode (W01–W16) — Tạm hoãn (Deferred) |
| 4 | **W16** | W13–W16 | Stage 1 (Flyers A2) | `full_mock (true)` | ✅ Có | Thuộc dải Lite Mode (W01–W16) — Tạm hoãn (Deferred) |
| 5 | **W20** | W17–W20 | Stage 1 (Flyers A2) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 6 | **W24** | W21–W24 | Stage 1 (Flyers A2) | `full_mock (true)` | ✅ Có | Khớp hoàn toàn với mock cũ (giữ nguyên cờ) |
| 7 | **W28** | W25–W28 | Stage 1 (Flyers A2) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 8 | **W32** | W29–W32 | Stage 1 (Flyers A2) | `full_mock (true)` | ✅ Có | Khớp hoàn toàn với mock cũ (giữ nguyên cờ) |
| 9 | **W36** | W33–W36 | Stage 1 (Flyers A2) | `rotary_practice (false)` | ❌ Không (Mới) | 🚨 **Xung đột & Đề xuất Pilot:** Có 24 file rác cũ; W33-W35 đã hoàn tất 100% -> Ứng viên Pilot số 1 |
| 10 | **W40** | W37–W40 | Stage 1 (Flyers A2) | `rotary_practice (false)` | ❌ Không (Mới) | 🚨 **Xung đột Staging:** Đã sinh content rotary ở R63 (giữ nguyên tại staging) |
| 11 | **W44** | W41–W44 | Stage 1 (Flyers A2) | `rotary_practice (false)` | ❌ Không (Mới) | 🚨 **Xung đột Staging:** Đã sinh content rotary ở R63 (giữ nguyên tại staging) |
| 12 | **W48** | W45–W48 | Stage 1 (Flyers A2) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 13 | **W52** | W49–W52 | Stage 1 (Flyers A2) | `full_mock (true)` | ✅ Có | Khớp hoàn toàn với mock cũ (giữ nguyên cờ) |
| 14 | **W56** | W53–W56 | Stage 1 (Flyers A2) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 15 | **W60** | W57–W60 | Stage 1 (Flyers A2) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 16 | **W64** | W61–W64 | Stage 1 (Flyers A2) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 17 | **W68** | W65–W68 | Stage 1 (Flyers A2) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 18 | **W72** | W69–W72 | Stage 1 (Flyers A2) | `full_mock (true)` | ✅ Có | Khớp hoàn toàn với mock cũ (giữ nguyên cờ) |
| 19 | **W76** | W73–W76 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 20 | **W80** | W77–W80 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 21 | **W84** | W81–W84 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 22 | **W88** | W85–W88 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 23 | **W92** | W89–W92 | Stage 2 (PET B1) | `full_mock (true)` | ✅ Có | Khớp hoàn toàn với mock cũ (giữ nguyên cờ) |
| 24 | **W96** | W93–W96 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 25 | **W100** | W97–W100 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 26 | **W104** | W101–W104 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 27 | **W108** | W105–W108 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 28 | **W112** | W109–W112 | Stage 2 (PET B1) | `full_mock (true)` | ✅ Có | Khớp hoàn toàn với mock cũ (giữ nguyên cờ) |
| 29 | **W116** | W113–W116 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 30 | **W120** | W117–W120 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 31 | **W124** | W121–W124 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 32 | **W128** | W125–W128 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 33 | **W132** | W129–W132 | Stage 2 (PET B1) | `full_mock (true)` | ✅ Có | Khớp hoàn toàn với mock cũ (giữ nguyên cờ) |
| 34 | **W136** | W133–W136 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 35 | **W140** | W137–W140 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 36 | **W144** | W141–W144 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 37 | **W148** | W145–W148 | Stage 2 (PET B1) | `rotary_practice (false)` | ❌ Không (Mới) | Cần đổi cờ blueprint `isFullMock: true` khi được duyệt |
| 38 | **W152** | W149–W152 | Stage 2 (PET B1) | `full_mock (true)` | ✅ Có | Khớp hoàn toàn với mock cũ (giữ nguyên cờ) |
| 39 | **W156** | W153–W156 | Stage 2 (PET B1) | `full_mock (true)` | ✅ Có | Khớp hoàn toàn với mock cũ (giữ nguyên cờ) |

## II. ĐỐI CHIẾU VÀ BẢO TOÀN NỘI DUNG ĐÃ XÁC THỰC

### 1. Nội dung đã Merge vào Production (`src/data/weeks/`)
Bao gồm 9 tuần Rotary đã được duyệt và merge:
- **Tuần 35:** 35 % 4 = 3 -> Rotary Practice (Không xung đột)
- **Tuần 38:** 38 % 4 = 2 -> Rotary Practice (Không xung đột)
- **Tuần 78:** 78 % 4 = 2 -> Rotary Practice (Không xung đột)
- **Tuần 125:** 125 % 4 = 1 -> Rotary Practice (Không xung đột)
- **Tuần 39 (Mới merge R64):** 39 % 4 = 3 -> Rotary Practice (Không xung đột)
- **Tuần 41 (Mới merge R64):** 41 % 4 = 1 -> Rotary Practice (Không xung đột)
- **Tuần 43 (Mới merge R64):** 43 % 4 = 3 -> Rotary Practice (Không xung đột)
- **Tuần 45 (Mới merge R64):** 45 % 4 = 1 -> Rotary Practice (Không xung đột)
- **Tuần 46 (Mới merge R64):** 46 % 4 = 2 -> Rotary Practice (Không xung đột)
-> **Kết luận:** 100% nội dung đã merge đều nằm ngoài lịch mock mới. Không có bất kỳ tuần nào bị ảnh hưởng hay cần rollback.

### 2. Hai tuần Frozen Golden Masters (W33 & W34)
- **Tuần 33:** 33 % 4 = 1 -> Rotary Practice
- **Tuần 34:** 34 % 4 = 2 -> Rotary Practice
-> **Kết luận:** Cả hai tuần Golden Master đều là tuần Rotary thông thường, tuyệt đối không bị lịch mock 4 tuần xâm phạm. 100% hash bảo vệ được giữ nguyên.

## III. BẢNG PHÂN TÍCH 16 TUẦN MOCK CŨ BỊ HỦY (RETIRED TO ROTARY PRACTICE)

Các tuần sau đây trước đây được đánh dấu là `full_mock` trong `blueprint.json` (theo lịch ~5 tuần cũ). Theo lịch 4 tuần mới, các tuần này **không còn là tuần mock** và sẽ quay lại hàng đợi sản xuất Rotary Practice chuẩn (15 quests):

| Tuần | Stage | Blueprint hiện tại | Số dư (`w % 4`) | Chủ đề hiện tại trong Blueprint | Hành động khi được phê duyệt |
| :---: | :---: | :---: | :---: | :--- | :--- |
| **W37** | Stage 1 | `isFullMock: true` | 1 | Living vs. Non-Living (Reasoning) | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W42** | Stage 1 | `isFullMock: true` | 2 | The Water Journey (Cycle) | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W47** | Stage 1 | `isFullMock: true` | 3 | Big Numbers (Place Value) | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W57** | Stage 1 | `isFullMock: true` | 1 | ELA: Problem & Solution (Sentences) / Math: Multiplication Concepts  / Toán: Khái niệm Phép nhân) | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W62** | Stage 1 | `isFullMock: true` | 2 | ELA: The Movie Trailer (Summarizing) / Math: Rounding | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W67** | Stage 1 | `isFullMock: true` | 3 | ELA: The OREO Structure / Math: Measuring Mass | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W77** | Stage 2 | `isFullMock: true` | 1 | Social Studies/ELA: World Landmarks / Math: 3D Geometry | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W82** | Stage 2 | `isFullMock: true` | 2 | ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W87** | Stage 2 | `isFullMock: true` | 3 | Human Body / Math: Elapsed Time | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W97** | Stage 2 | `isFullMock: true` | 1 | Government / Math: Percentages Intro | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W102** | Stage 2 | `isFullMock: true` | 2 | Goods & Services / Math: Total Costs | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W107** | Stage 2 | `isFullMock: true` | 3 | The Note-Taker (Summary) | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W127** | Stage 2 | `isFullMock: true` | 3 | Rebuttal Practice | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W137** | Stage 2 | `isFullMock: true` | 1 | Editing & Polishing (Word Choice) | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W142** | Stage 2 | `isFullMock: true` | 2 | Geometry Review - Area & Volume | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |
| **W147** | Stage 2 | `isFullMock: true` | 3 | Advanced Thesis Writing | Đổi cờ `isFullMock: false`, sinh content Rotary 15 Quests |

## IV. CHI TIẾT TẤT CẢ CÁC XUNG ĐỘT PHÁT HIỆN ĐƯỢC (CONFLICT REPORT)

1. **Xung đột W40 (Staging conflict):**
   - **Hiện trạng:** Đã sinh 8 file staged Rotary Practice tại `docs/agent_artifacts/staging/week_40/` trong Round 63.
   - **Vấn đề:** W40 chia hết cho 4 (`40 % 4 === 0`), do đó là tuần Mock theo lịch mới.
   - **Xử lý:** Không merge vào `src/data/weeks/`. Lưu giữ an toàn tại staging để tái sử dụng tài nguyên (ngữ pháp Comparatives, từ vựng Beast Battle) cho ngân hàng câu hỏi hoặc tuần rotary khác.

2. **Xung đột W44 (Staging conflict):**
   - **Hiện trạng:** Đã sinh 8 file staged Rotary Practice tại `docs/agent_artifacts/staging/week_44/` trong Round 63.
   - **Vấn đề:** W44 chia hết cho 4 (`44 % 4 === 0`), do đó là tuần Mock theo lịch mới.
   - **Xử lý:** Không merge vào `src/data/weeks/`. Lưu giữ an toàn tại staging để tái sử dụng tài nguyên (ngữ pháp Subtraction, từ vựng Cookie Monster) cho ngân hàng câu hỏi hoặc tuần rotary khác.

3. **Xung đột W36 (Legacy un-authored files vs New Mock status):**
   - **Hiện trạng:** Thư mục `src/data/weeks/week_36/` chứa 24 file template rác cũ từ trước Round 55; blueprint mang cờ `isFullMock: false`.
   - **Vấn đề:** W36 là tuần mock đầu tiên của Stage 1 chuẩn (`36 % 4 === 0`).
   - **Khuyến nghị:** Dọn dẹp sạch (content wipe) 24 file rác cũ và chọn W36 làm Pilot cho Mock Exam Generator.

4. **Xung đột W37 (Legacy un-authored files vs Retired Mock status):**
   - **Hiện trạng:** Thư mục `src/data/weeks/week_37/` chứa 24 file template rác cũ; blueprint mang cờ `isFullMock: true`.
   - **Vấn đề:** W37 không chia hết cho 4 (`37 % 4 === 1`), do đó trở thành tuần Rotary thông thường.
   - **Khuyến nghị:** Đổi cờ `isFullMock: false`, dọn dẹp sạch file rác và đưa vào backlog sản xuất Rotary Practice.

5. **Trường hợp W150 (Chủ đề Mock Debate):**
   - Blueprint tuần 150 ghi theme là *Mock Debate & Strategy*, nhưng `isFullMock: false` và `week_type: "rotary_practice"`.
   - Phân tích: Đây là hoạt động tranh biện giả lập trong lớp học, không phải đề thi Cambridge Mock. Giữ nguyên là tuần Rotary Practice.

## V. NGUYÊN TẮC THI HÀNH (GOVERNANCE INVARIANT)
- **TUYỆT ĐỐI CHƯA SỬA BẤT KỲ FILE `blueprint.json` NÀO** trong Round này theo đúng chỉ thị của Owner.
- Báo cáo này đóng vai trò căn cứ thiết kế để Claude và Owner rà soát trước khi ban hành lệnh cập nhật blueprint đồng loạt.
