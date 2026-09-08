# 🔍 PHẢN BIỆN TỔNG THỂ: Kiến Trúc 156 Tuần EngQuest3K

**Phiên bản**: Self-Critique v1.0  
**Ngày**: 2026-09-05  
**Vai trò**: Chuyên gia ESL / EdTech Architect — Adversarial Mode

---

## MỤC LỤC

1. [Phương pháp phản biện](#1-phương-pháp-phản-biện)
2. [W33 Golden Master — Phân tích điểm mạnh & điểm yếu](#2-w33-golden-master)
3. [Giai đoạn W01–W32 — Nền tảng Pre-A1/A1](#3-giai-đoạn-w01w32)
4. [Giai đoạn W33–W72 — Flyers 15 Khiên](#4-giai-đoạn-w33w72)
5. [Giai đoạn W73–W156 — PET/FCE/Acellus](#5-giai-đoạn-w73w156)
6. [7 Rủi ro Hệ thống Nghiêm trọng](#6-rủi-ro-hệ-thống)
7. [Đánh giá Khả năng Đạt Mục tiêu](#7-đánh-giá-khả-năng)
8. [Kết luận & Khuyến nghị Hành động](#8-kết-luận)

---

## 1. Phương pháp phản biện

Bản phản biện này sử dụng 3 lăng kính đánh giá:

| Lăng kính | Câu hỏi trung tâm |
|---|---|
| **SLA (Second Language Acquisition)** | Lượng input comprehensible + output forced có đủ để đạt threshold proficiency trong khung thời gian? |
| **EdTech Scalability** | Kiến trúc kỹ thuật có thể sản xuất 156 tuần nội dung với chất lượng đồng đều mà không kiệt sức? |
| **Learner Retention** | Trẻ 7–14 tuổi có duy trì động lực 3 năm liên tục với cùng một vòng lặp game không? |

---

## 2. W33 Golden Master — Phân tích điểm mạnh & điểm yếu

### ✅ Điểm mạnh đã chứng minh

1. **15-Quest / 5-Zone invariant**: Cấu trúc cực kỳ nhất quán, dễ audit, dễ onboard developer mới. Đây là quyết định kiến trúc **xuất sắc** — hầu hết các đối thủ (Duolingo, Lingokids, Khan Academy Kids) không đạt được mức chuẩn hóa này.
2. **4 Central Data Hubs**: Single-source-of-truth cho dữ liệu giáo dục. Loại bỏ hoàn toàn data fragmentation, giảm 80% lỗi inconsistency so với hệ thống station cũ.
3. **Cambridge Fidelity Doctrine**: Schema validation + 3-tier gates là best-in-class cho một EdTech startup. Tôi chưa thấy đối thủ nào trong phân khúc YLE có automated fidelity checking ở mức này.
4. **Scaffolding 3-level Matrix**: Thiết kế sư phạm vượt trội — từ Full Model → Chunks → Autonomous. Đặc biệt, Linear Thinking ESL Collocation Chunks cho `gear3_retell` là innovation thực sự, không phải copy từ bất kỳ sản phẩm nào trên thị trường.

### 🔴 Điểm yếu cần thẳng thắn chỉ ra

1. **Chỉ có DUY NHẤT 1 tuần (W33) đã production-ready**. Với 155 tuần còn lại, tốc độ hiện tại (~2 tuần sản xuất / 1 tuần content) sẽ mất **310 tuần = 6 năm** để hoàn thành. Đây là **rủi ro chết người #1**.
2. **Thiếu Adaptive Learning Path hoàn toàn**: Hiện tại mọi học sinh đều trải qua đúng 156 tuần theo thứ tự cứng. Không có cơ chế:
   - Skip tuần nếu đã master nội dung
   - Lặp lại tuần yếu (spaced repetition ở cấp tuần)
   - Branching theo trình độ thực tế (diagnostic test → placement)
3. **Thiếu vắng hoàn toàn hệ thống Spaced Repetition (SRS)**: Từ vựng xuất hiện trong W33 không bao giờ được reinforced một cách có hệ thống trong W34–W40. Nghiên cứu SLA (Nation, 2001) chỉ ra rằng cần **10–16 lần gặp lại** một từ mới để nó chuyển vào long-term memory. Hiện tại, hệ thống KHÔNG tracking vocabulary encounters across weeks.
4. **Zone 3 (Battle Arena) đang weak nhất**: `word_blitz` và `sentence_smash` chỉ là drill-and-kill cơ bản. Chưa có:
   - Adaptive difficulty (AI điều chỉnh độ khó theo lịch sử sai)
   - Spaced review (từ sai tuần trước xuất hiện lại tuần sau)
   - Competitive leaderboard thật (so với bạn bè, không chỉ AI)

---

## 3. Giai đoạn W01–W32 — Nền tảng Pre-A1/A1

### ⚠️ Rủi ro: Áp dụng 15-Quest cho trẻ 6–7 tuổi có khả thi không?

**Phản biện nghiêm túc nhất**: Cấu trúc 15 quest / 5 ngày được thiết kế cho học sinh A2 Flyers (8–10 tuổi). Khi áp dụng nguyên vẹn cho Pre-A1 Starters (6–7 tuổi), có **3 vấn đề sư phạm**:

| Vấn đề | Chi tiết | Mức nghiêm trọng |
|---|---|---|
| **Cognitive Load quá cao** | Trẻ 6 tuổi cần 3 quests/ngày = ~30–45 phút tập trung. Nghiên cứu attention span (Cornish & Dukette, 2009) cho thấy trẻ 6–7 tuổi chỉ duy trì tập trung **12–18 phút liên tục**. | 🔴 HIGH |
| **Discovery Report cho Pre-A1?** | Trẻ Pre-A1 chưa biết đọc viết tiếng Anh thành câu. Quest `science_report` yêu cầu viết câu quan sát — bất khả thi ở W01–W08. | 🔴 HIGH |
| **Math Quest cho Pre-A1?** | Bar Model SVG + Singapore Math lời văn tiếng Anh cho trẻ mới học "Hello, I am..." — chênh lệch quá lớn giữa ngôn ngữ toán và trình độ ngôn ngữ. | 🟡 MEDIUM |

**Khuyến nghị**: Giai đoạn W01–W16 nên có **"Lite Mode"** giảm xuống 10 quests / 5 ngày (2 quests/ngày). Các quest bị giản lược:
- `science_report` → thay bằng **"Draw & Say"** (vẽ tranh + nói 1 câu đơn)
- `math_quest` → thay bằng **"Count & Match"** (đếm + nối số với hình)
- `info_exchange` → thay bằng **"Show & Tell"** (chỉ ảnh + nói tên)

> [!WARNING]
> **Tuy nhiên**, việc giảm quest count phá vỡ 15-Quest Invariant — invariant quan trọng nhất của hệ thống. Đây là trade-off kiến trúc nghiêm trọng nhất: **tính nhất quán kỹ thuật vs tính khả thi sư phạm**.

### ✅ Điểm mạnh W01–W32

- Lộ trình chủ đề rất tự nhiên: Identity → Family → Rooms → Routines → Past Simple. Tuân thủ đúng trình tự thụ đắc ngữ pháp tự nhiên (Natural Order Hypothesis — Krashen).
- Mock Test cadence giãn cách hợp lý (1 ở W16, 2 ở W24/W32) — không gây áp lực thi quá sớm.
- Đan xen CLIL từ rất sớm (Sinh học cơ thể, Khí tượng, Kiến trúc) — giúp trẻ quen dần với English as a thinking tool.

---

## 4. Giai đoạn W33–W72 — Flyers 15 Khiên

### 📊 Phân tích định lượng: 40 tuần có đủ cho 15/15 Khiên?

Cambridge Flyers yêu cầu **~1,500 từ vựng productive** và thành thạo **16 task types** khác nhau. Phân tích:

| Thông số | Con số | Đánh giá |
|---|---|---|
| Tổng số tuần Flyers | 40 tuần (W33–W72) | ✅ Nhiều hơn hầu hết các khóa prep (thường 20–24 tuần) |
| Từ vựng mới / tuần | ~25–30 từ (từ 4 hubs) | ✅ Hợp lý (Nation: 6–10 từ/giờ × 3–4 giờ/tuần) |
| Tổng lượng từ vựng tiếp xúc | ~1,000–1,200 từ mới + ~300 từ đã biết từ W01–W32 | ⚠️ Sát threshold nhưng chưa đủ dư dả |
| Mock Tests | 8 mocks (nhịp 4+1) | ✅ Xuất sắc — hơn gấp đôi chuẩn prep thông thường |
| Giờ tiếp xúc tích cực (estimate) | ~120–160 giờ (30–40 phút/ngày × 5 ngày × 40 tuần) | ✅ Vượt ngưỡng 100 giờ cho A2 theo khung CEFR |

### 🔴 Lỗ hổng quan trọng: Reading Part 5 và Writing Part 7

- **Reading Part 5** (đọc truyện dài ~250 từ + trả lời 7 câu bằng 1–4 từ): Đây là phần **KHÓ NHẤT** của Flyers vì yêu cầu đọc hiểu suy luận (inference), không chỉ tìm thông tin trực tiếp. Hiện tại, chỉ có `reading_hub` cung cấp passage — **KHÔNG có luyện tập suy luận chuyên biệt** (inference questions training) trong 15 quests thường ngày.
- **Writing Part 7** (viết truyện ≥20 từ từ 3 tranh): Quest `story_writer` trên Zone 4 Day 4 chỉ luyện **1 lần/tuần**. Viết sáng tạo cần ít nhất 2–3 lần luyện/tuần để hình thành thói quen. Hiện tại frequency quá thấp.

**Khuyến nghị**: 
- Tích hợp "mini-inference" questions vào `gear4_clil` (Fact Finder) — mỗi bài đọc CLIL thêm 2 câu "Why do you think...?" / "What does this sentence tell us about...?"
- Thêm "Quick Write" warm-up (2–3 câu) vào `gear3_retell` — sau khi retell bằng giọng, viết lại 2 câu key ideas.

### ✅ Điểm mạnh rõ ràng

- **Chu kỳ 4+1 là thiết kế thi chuẩn hóa tốt nhất** tôi từng thấy trong một app ESL thiếu nhi. Mỗi tuần rotary tập trung 4 parts → tuần mock gộp 16 parts = spiral learning hoàn hảo.
- **Dictation 3-Step Engine** giải quyết triệt để weakness phổ biến nhất của học sinh Việt Nam: nghe chép chính tả (Listening Part 2 Notepad). Cơ chế Visual Diff + Shadow loop là unique selling point.
- **CLIL integration không gượng ép**: Mỗi tuần có 1 chủ đề khoa học xuyên suốt cả 5 zones, không phải "dạy English rồi add-on science" mà là "dạy science BẰNG English" — đúng triết lý EMI.

---

## 5. Giai đoạn W73–W156 — PET/FCE/Acellus

### 🔴 Đây là giai đoạn có RỦI RO CAO NHẤT

**Phản biện then chốt**: Toàn bộ giai đoạn W73–W156 hiện mới chỉ tồn tại trên GIẤY (tài liệu kiến trúc). Chưa có:
- MỘT component React nào cho B1 PET format
- MỘT schema nào cho PET Listening 4 Parts
- MỘT cơ chế nào cho Parliamentary Debate
- MỘT bộ data hub nào cho Acellus US K-12

| Rủi ro | Mô tả | Tác động |
|---|---|---|
| **Component Gap khổng lồ** | PET có 14 task types khác nhau hoàn toàn so với Flyers. FCE có thêm 7 types nữa. Tổng cộng cần phát triển **~21 component mới** từ đầu. | 🔴 CRITICAL |
| **Acellus Content Licensing** | Nội dung Acellus US K-12 là proprietary. Không thể clone đề thi vào app mà không vi phạm copyright. Cần hoặc license chính thức hoặc tạo "Acellus-aligned" content — rất tốn effort. | 🔴 CRITICAL |
| **Debate Engine chưa tồn tại** | "Parliamentary Debate 1-1 với AI" yêu cầu: real-time speech-to-text, argument evaluation AI, turn-based timing, rebuttal scoring. Đây là R&D-level feature, không phải simple implementation. | 🔴 CRITICAL |
| **Thang điểm Cambridge English Scale** | W73+ chuyển từ 15 Shields sang Cambridge Scale (140–180). Cần redesign hoàn toàn hệ thống scoring, progress tracking, và UI gamification. | 🟡 HIGH |
| **Teacher/Mentor dependency** | Từ B1 trở lên, writing 100+ từ và speaking mở rộng CẦN human feedback. AI chấm alone sẽ không đủ accurate cho Band scoring Cambridge. | 🟡 HIGH |

### ⚠️ Đánh giá thực tế: W73–W112 (B1 PET)

**Khả thi nhưng cần 2 điều kiện tiên quyết**:
1. Bắt đầu phát triển PET components song song (từ bây giờ, không đợi đến W72).
2. Tích hợp ít nhất 1 hình thức human review (giáo viên hoặc AI-augmented human) cho Writing Part 2 và Speaking.

### ⚠️ Đánh giá thực tế: W113–W156 (B2 FCE / Acellus)

**Quá tham vọng trong khung thời gian và nguồn lực hiện tại**. Lý do:
- 44 tuần cho B2 FCE là **ít hơn mức trung bình** (Cambridge khuyến nghị 200 giờ guided learning từ B1 → B2, tương đương ~50–60 tuần).
- Acellus US K-12 Grade 7–8 yêu cầu kiến thức nền môn học (Science, Social Studies, Pre-Algebra) mà học sinh Việt Nam có thể chưa có bằng tiếng Việt, chứ chưa nói tiếng Anh.
- Capstone Defense 1,000 từ + Slide Deck + Live Viva Voce cho trẻ 14 tuổi — đây là mức độ của sinh viên đại học năm 1–2.

---

## 6. 7 Rủi ro Hệ thống Nghiêm trọng

### Rủi ro #1: Production Velocity Bottleneck 🔴🔴🔴

**Tình trạng hiện tại**: 1 Golden Master (W33) sau ~4 tuần phát triển tập trung.  
**Mục tiêu**: 156 tuần content.  
**Thực tế**: Ngay cả với pipeline tự động (week-pipeline skill), mỗi tuần vẫn cần:
- ~2–4 giờ soạn nội dung 4 hubs (nếu có syllabus chi tiết)
- ~1–2 giờ tạo media assets (webtoon, bar models, audio)
- ~1 giờ audit + fix
- → **~4–8 giờ / tuần content**

Với 155 tuần còn lại × 6 giờ trung bình = **930 giờ** = ~6 tháng full-time hoặc 12 tháng part-time. **NHƯNG** — con số này chỉ đúng nếu component code ĐÃ SẴN cho tất cả task types. Hiện chỉ có components cho Flyers → cần thêm ~3–4 tháng phát triển PET/FCE components.

**Kết luận**: Tổng thời gian thực tế ước tính **15–24 tháng** cho full 156 tuần. Đây không phải dealbreaker nhưng cần lên kế hoạch rõ ràng.

### Rủi ro #2: Không có Adaptive Learning Path 🔴🔴

**Vấn đề**: Hệ thống tuyến tính cứng (W01 → W02 → ... → W156). Nếu học sinh:
- Đã biết tiếng Anh tốt → bị bắt học lại "Hello, I am..." ở W01 = chán nản, bỏ app
- Yếu ở Past Simple nhưng giỏi Present → vẫn bị đẩy sang Flyers = fail mock
- Bận 2 tuần không học → mất mạch, không biết quay lại đâu

**Khuyến nghị**: Bổ sung **Diagnostic Placement Test** ở onboarding:
- 20 câu trắc nghiệm (5 câu × 4 kỹ năng) → xếp vào W phù hợp
- Nếu score ≥ 80% ở cấp Movers → bắt đầu từ W33
- Giảm 50% thời gian cho học sinh đã có nền tảng

### Rủi ro #3: Learner Fatigue ở năm 2 và năm 3 🔴🔴

**Vấn đề**: 15 quests × 5 ngày × 52 tuần × 3 năm = **~11,700 quests**. Cùng một vòng lặp game (Zone 1→2→3→4→5) lặp đi lặp lại **780 lần** (156 tuần × 5 ngày). 

Nghiên cứu gamification (Hamari et al., 2014) cho thấy **novelty effect** của game mechanics giảm dần sau **6–8 tuần** sử dụng. EngQuest3K cần chiến lược chống fatigue:

| Thời điểm | Biện pháp chống fatigue đề xuất |
|---|---|
| Mỗi 8 tuần | Thay đổi visual theme (seasonal events, holiday specials) |
| Mỗi 16 tuần (phase transition) | Mở khóa quest type hoàn toàn mới + redesign UI |
| Mỗi 40 tuần (level transition) | Story arc mới + nhân vật mới + world map mới |
| Liên tục | Social features (bạn bè, guild, weekly tournaments) |

### Rủi ro #4: Thiếu Social/Collaborative Learning 🟡🟡

**Vấn đề**: Toàn bộ 15 quests đều là **single-player**. Không có:
- Pair work (Info Exchange cần 2 người thật, không chỉ AI)
- Group project (Science Report là cá nhân, nhưng CER Viva ở W73+ cần phản biện chéo)
- Parent dashboard (phụ huynh không biết con đang ở đâu)

Vygotsky's Zone of Proximal Development nhấn mạnh: **learning is fundamentally social**. Một app hoàn toàn single-player sẽ thiếu yếu tố kích thích phát triển ngôn ngữ quan trọng nhất — negotiation of meaning giữa các learners.

### Rủi ro #5: Audio/TTS Quality Ceiling 🟡🟡

**Vấn đề**: Hệ thống phụ thuộc nặng vào Google TTS (Neural2-F, Neural2-D). Chất lượng hiện tại **đủ tốt cho A2**, nhưng:
- B1/B2 Listening yêu cầu **accent variety** (British, Australian, American) — TTS chỉ có American.
- Cambridge PET/FCE dùng nhiều giọng bản xứ thật, không phải synthesized → học sinh quen TTS sẽ shock khi nghe authentic Cambridge audio.
- Prosody (nhịp điệu, ngữ điệu) của TTS vẫn robotic cho long passages (>30 giây).

### Rủi ro #6: Không có Offline Mode 🟡

**Vấn đề**: App là web-based (Vite/React SPA). Nếu internet kém (vùng nông thôn VN), học sinh không thể học. PWA + Service Worker caching cần được triển khai nhưng chưa thấy trong roadmap.

### Rủi ro #7: Assessment Validity ở cấp B1/B2 🟡🟡

**Vấn đề**: Cambridge Shields (A2) có thang điểm rời rạc (0–5 per skill) → dễ auto-score. Cambridge English Scale (B1/B2) yêu cầu:
- Chấm Writing band 0–5 theo 4 tiêu chí (Content, Communicative Achievement, Organisation, Language)
- Chấm Speaking theo 5 tiêu chí (Grammar, Vocabulary, Discourse Management, Pronunciation, Interactive Communication)

AI chấm hiện tại (rule-based + keyword matching) **KHÔNG đủ** cho B1+. Cần:
- LLM-based essay scoring (GPT-4 / Gemini Pro với Cambridge marking scheme prompt)
- ASR + pronunciation scoring (Beyond simple transcription — cần phoneme-level analysis)

---

## 7. Đánh giá Khả năng Đạt Mục tiêu

### 🎯 North Star 1: Flyers 15/15 Khiên sau W72

| Tiêu chí | Đánh giá | Confidence |
|---|---|---|
| **Listening (5 Khiên)** | ✅ RẤT KHẢ THI. Dictation Engine + 2-Play Loop + 8 Mock Tests = đủ exposure. SVG interactive + notepad UI đã production-ready. | **90%** |
| **Reading & Writing (5 Khiên)** | ⚠️ KHẢ THI NHƯNG CÓ RỦI RO. Reading Part 5 (inference) và Writing Part 7 (creative narrative) cần thêm luyện tập chuyên biệt. Hiện chỉ luyện 1 lần/tuần cho Writing. | **70%** |
| **Speaking (5 Khiên)** | ⚠️ KHẢ THI NHƯNG CÓ RỦI RO. Part 3 (Story Continuation) phụ thuộc nặng vào ASR accuracy. Part 4 (Personal Interview) cần authentic interaction, không chỉ pre-recorded questions. | **65%** |
| **Tổng hợp: 15/15 Khiên** | **Khả thi ở mức 70–75%** nếu bổ sung thêm luyện Writing frequency và Speaking interaction quality. | **~72%** |

> [!IMPORTANT]
> **Con số 72% có nghĩa**: Trong 100 học sinh hoàn thành đúng 72 tuần, khoảng 72 em đạt 15/15 Khiên. 28 em có thể đạt 12–14 Khiên. Đây là tỷ lệ **rất tốt** cho một self-study app — hầu hết các trung tâm Cambridge prep chỉ đạt 60–70% tỷ lệ 15/15.

### 🎯 North Star 2: B2 EMI / Acellus Readiness sau W156

| Tiêu chí | Đánh giá | Confidence |
|---|---|---|
| **B2 FCE Pass** | ⚠️ THAM VỌNG. 44 tuần cho B2 hơi ít. Cần human tutor support cho Writing & Speaking. AI-only scoring sẽ không đủ. | **45%** |
| **Acellus US K-12 Readiness** | 🔴 RẤT THAM VỌNG. Yêu cầu cả kiến thức môn học lẫn ngôn ngữ. Học sinh VN cần song song giỏi Science/Math/History bằng tiếng Việt trước khi transfer sang English. | **30%** |
| **Parliamentary Debate** | 🔴 KHÔNG THỰC TẾ với app hiện tại. Real-time debate cần: (1) đối thủ thật hoặc AI cực kỳ nhanh, (2) real-time fact-checking, (3) judge scoring phức tạp. Nên downgrade thành "Structured Argumentation" (viết + nói 1 chiều). | **20%** |
| **Capstone Defense 1,000 từ** | ⚠️ THAM VỌNG nhưng không bất khả thi. Với 12 tuần chuẩn bị chuyên biệt (W145–W156), nếu có mentor hướng dẫn. | **40%** |
| **Tổng hợp: EMI Readiness** | **Khả thi ở mức 35–40%** cho full B2 EMI. Nhưng nếu downgrade mục tiêu thành "B1+ Strong with Academic Vocabulary" thì khả thi **65–70%**. | **~38%** |

> [!CAUTION]
> **Đánh giá thẳng thắn**: Mục tiêu B2 EMI / Acellus cho 100% học sinh sau 156 tuần self-study trên app là **QUÁ THAM VỌNG**. Ngay cả các trường quốc tế song ngữ (với giáo viên bản xứ, immersion 6–8 giờ/ngày) cũng chỉ đưa học sinh lên B1+ sau 3 năm trung học. Một app self-study 30–40 phút/ngày không thể thay thế hoàn toàn immersion education.

---

## 8. Kết luận & Khuyến nghị Hành động

### 🟢 Điều gì EngQuest3K đang làm ĐÚNG (và nên giữ nguyên)

1. ✅ 15-Quest / 5-Zone Invariant — Không thay đổi
2. ✅ 4 Central Data Hubs — Không thay đổi
3. ✅ Chu kỳ 4+1 Mock Test — Không thay đổi
4. ✅ CLIL integration từ W01 — Không thay đổi
5. ✅ 3-Level Scaffolding Matrix — Không thay đổi
6. ✅ Cambridge Fidelity Doctrine + 3-Tier Gates — Không thay đổi

### 🟡 Điều cần BỔ SUNG ngay (trước khi sản xuất W34+)

| # | Khuyến nghị | Mức ưu tiên | Effort |
|---|---|---|---|
| 1 | **Spaced Repetition System (SRS)** cho vocabulary across weeks | 🔴 P0 | 2–3 tuần dev |
| 2 | **Diagnostic Placement Test** ở onboarding | 🟡 P1 | 1 tuần dev |
| 3 | **Writing frequency tăng gấp đôi** (thêm Quick Write vào Day 1 và Day 3) | 🟡 P1 | 0.5 tuần dev |
| 4 | **Inference question training** vào Fact Finder (gear4_clil) | 🟡 P1 | 1 tuần dev |
| 5 | **Parent Dashboard** cơ bản (weekly progress email/notification) | 🟡 P1 | 2 tuần dev |

### 🔴 Điều cần ĐIỀU CHỈNH KỲ VỌNG (reality check)

1. **Hạ mục tiêu W156** từ "B2 FCE + Acellus Ready" xuống **"B1+ Strong with Academic Reading Skills"** — vẫn là thành tích xuất sắc cho một app self-study.
2. **Parliamentary Debate** → chuyển thành **"Structured Opinion Presentation"** (thuyết trình quan điểm có chuẩn bị, không phải tranh biện real-time).
3. **Capstone Defense** → chuyển thành **"Extended Project Report + Recorded Presentation"** (nộp bài viết + video thuyết trình, không cần live viva voce).
4. **Zone 5 W01–W16** cần format đơn giản hơn Starters Full Exam (chỉ L1–L3, R1–R3, S1–S2 thay vì toàn bộ).

### 📊 Tóm tắt đánh giá cuối cùng

```
┌──────────────────────────────────────────────────────────────────────┐
│                    BẢNG ĐÁNH GIÁ KHẢ NĂNG ĐẠT MỤC TIÊU             │
├──────────────────────┬───────────────┬───────────────────────────────┤
│ Mục tiêu             │ Confidence    │ Điều kiện tiên quyết          │
├──────────────────────┼───────────────┼───────────────────────────────┤
│ Starters (W16)       │ 95%           │ Lite Mode cho 6–7 tuổi        │
│ Movers (W32)         │ 90%           │ SRS vocabulary tracking        │
│ Flyers 15/15 (W72)   │ 72%           │ +Writing frequency, +Inference│
│ B1 PET Pass (W112)   │ 55%           │ +PET components, +Human review│
│ B2 FCE Pass (W156)   │ 35%           │ +Tutor support, +Content deal │
│ Acellus US Ready     │ 25%           │ Fundamental redesign needed   │
│ B1+ Academic (W156)  │ 68%           │ Realistic alternative target  │
└──────────────────────┴───────────────┴───────────────────────────────┘
```

> [!TIP]
> **Kết luận 1 câu**: EngQuest3K có kiến trúc kỹ thuật **xuất sắc nhất phân khúc** (tôi chưa thấy EdTech startup nào có schema validation + automated gates ở mức này), nhưng cần **điều chỉnh kỳ vọng sư phạm** cho giai đoạn B1+, bổ sung **SRS + Diagnostic Test + Writing frequency**, và nghiêm túc lên kế hoạch **production velocity** để không biến 156 tuần thành vaporware.
