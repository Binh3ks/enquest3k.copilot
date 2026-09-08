# EngQuest3K — Phản biện Thiết kế Triệt để: Micro-Step UI, Mascot & Onboarding

*Phản biện với vai trò chuyên gia ESL Pedagogy & EdTech Product Design*

---

## 1. NGUYÊN TẮC "MỘT TASK — MỘT MÀN HÌNH" & CHIA NHỎ TƯƠNG TÁC

### 1.1 Tại sao Duolingo chia nhỏ — và EngQuest KHÔNG NÊN sao chép 100%

Duolingo chia nhỏ vì **mỗi câu hỏi độc lập hoàn toàn** — câu 1 dạy "el gato", câu 2 dạy "la casa", không có narrative thread. Đây là **drill-based learning** (luyện tập tách biệt).

EngQuest có điểm khác biệt cốt lõi: **câu chuyện liên tục** (STEM Story, Social Story). Nếu chia "Jake was walking down the corridor" thành 1 màn hình riêng, "Suddenly a boy slipped" thành màn khác — **phá vỡ mạch đọc** (reading flow), là tội lớn nhất trong ESL Reading Comprehension.

### 1.2 Chia nhỏ Ở ĐÂU thì đúng, ở đâu thì SAI

| Hoạt động | Chia nhỏ? | Lý do |
|---|---|---|
| **Story Karaoke (Gear 2)** | ✅ **NÊN** chia từng câu thành 1 step | Mỗi câu là 1 đơn vị shadowing độc lập. Listen → Shadow → ✅ Next. Hoàn hảo cho micro-step. |
| **Retell to Nova (Gear 3)** | ✅ **NÊN** chia 3 step rõ ràng | Step 1: Listen → Step 2: Practice (scaffolding) → Step 3: Record. Đã đúng rồi. |
| **3D Webtoon (Gear 1)** | ⚠️ **CHỈ chia theo Scene** | 3-4 scenes, mỗi scene = 1 screen. Nhưng TRONG mỗi scene, text + image + hotspot phải cùng 1 view (không tách text sang screen riêng). |
| **CLIL Explorer (Gear 4)** | ⚠️ **Chia theo đoạn, KHÔNG theo câu** | Đoạn văn ~120 từ chia thành 2-3 chunks, mỗi chunk kết thúc bằng 1 comprehension question. Nhưng không chia câu lẻ. |
| **Battle Arena games** | ✅ **NÊN** chia từng câu hỏi = 1 screen | Word Blitz, Sentence Smash, Math Quest — mỗi item độc lập, progress bar chạy dần. Hoàn hảo. |
| **Story Writer (Zone 3)** | ❌ **KHÔNG NÊN** chia quá nhỏ | Viết là quá trình sáng tạo liên tục. Chia "viết câu 1" → screen riêng → "viết câu 2" → screen riêng = giết chết creative flow. Chỉ nên chia thành 3 phase: Plan → Write → Review. |

### 1.3 Công thức "Micro-Step" đúng cho EngQuest

```
ĐÚNG:  1 micro-step = 1 đơn vị tương tác có feedback tức thì
SAI:   1 micro-step = 1 câu text bất kể context

Ví dụ ĐÚNG cho Story Karaoke (7 câu):
┌─────────────────────────────────┐
│  Sentence 1 of 7    ████░░░░   │
│                                 │
│  "Jake was walking carefully    │
│   down the school corridor."    │
│                                 │
│       🔊 Listen    🎤 Shadow    │
│                                 │
│  [Đã shadow] → ⭐ +10 XP       │
│              ▶ Next Sentence    │
└─────────────────────────────────┘

Ví dụ SAI cho 3D Webtoon:
┌──────────────────┐  ┌──────────────────┐
│ Screen 1:        │  │ Screen 2:        │
│ [Chỉ có ảnh]     │→ │ [Chỉ có text]    │
│ Không text       │  │ Không ảnh        │
└──────────────────┘  └──────────────────┘
↑ Tách ảnh và text = phá vỡ multimodal learning
```

### 1.4 Progress Bar — Yếu tố quyết định cảm giác "sắp xong"

Duolingo thành công không phải vì chia nhỏ, mà vì **progress bar chạy dần trước mắt**. EngQuest cần áp dụng điều này:

- **Mỗi Gear** có progress bar riêng ở top: `████████░░ 6/8 steps`
- **Mỗi Quest** (nhóm 3-4 task) có progress ring trên card
- **Tuần** có progress bar tổng: `12/16 activities completed`

> [!IMPORTANT]
> **Nguyên tắc vàng**: Không bao giờ để user nhìn thấy "7 câu còn lại" dạng danh sách dài. Chỉ hiện **1 câu hiện tại + progress bar** cho biết mình đang ở đâu. Danh sách đầy đủ chỉ hiện khi user chủ động bấm xem.

---

## 2. ONBOARDING JOURNEY — "Lexio chào đón em"

### 2.1 Benchmark: Duolingo vs Khan Academy Kids vs Epic!

| App | Onboarding | Thời lượng | Điểm mạnh | Điểm yếu |
|---|---|---|---|---|
| **Duolingo** | Placement test → chọn goal → lesson đầu tiên | 3-5 phút | Cảm giác thành tựu ngay lần đầu | Không có story, khô khan |
| **Khan Academy Kids** | Mascot Kodi giới thiệu → 1 mini-game tutorial | 2 phút | Mascot dẫn dắt, ấm áp | Quá đơn giản cho 8-10 tuổi |
| **Epic!** | Chọn sách yêu thích → AI recommend | 1 phút | Nhanh, không rào cản | Không dạy cách dùng app |

### 2.2 Đề xuất Onboarding cho EngQuest (5 bước, ~4 phút)

```
BƯỚC 1 — "Chào! Mình là Lexio!" (30 giây)
┌────────────────────────────────────┐
│                                    │
│     [Lexio mascot animation]       │
│     Chớp mắt + vẫy tay            │
│                                    │
│  "Hi! I'm Lexio! 🦊               │
│   I'm your English buddy!"        │
│                                    │
│  "What's your name?"               │
│  ┌────────────────────┐            │
│  │ [Input name]       │            │
│  └────────────────────┘            │
│                                    │
│         [ Continue → ]             │
└────────────────────────────────────┘

BƯỚC 2 — "How old are you?" (10 giây)
→ Chọn 6-7 / 8-9 / 10-11
→ Quyết định Mode A (Gentle) hay Mode B (Challenge)
→ KHÔNG hỏi "trình độ tiếng Anh" (trẻ không biết trả lời)

BƯỚC 3 — Mini-Quest thử sức (2 phút)
→ 1 mini 3D Webtoon scene (3 slide) + 1 quiz question
→ Lexio dẫn: "Tap the ✨ glowing dots!"
→ Hoàn thành → "🌟 Amazing! You found all 3!"
→ Mục đích: dạy cách tương tác chính (tap, listen, shadow)

BƯỚC 4 — "Meet Nova!" (20 giây)
→ Giới thiệu Nova (AI tutor voice)
→ "Nova will read stories for you. Listen!"
→ Phát 1 câu demo → "Now YOUR turn — say it!"
→ Mục đích: dạy cơ chế shadowing

BƯỚC 5 — "Your Quest Map" (30 giây)
→ Hiện Quest Map tuần đầu tiên
→ Lexio: "Each week, you have 5 quests!"
→ Highlight Quest 1 đang glow
→ "Ready? Let's start your first quest!"
→ → → Chuyển thẳng vào Quest 1
```

### 2.3 Nguyên tắc Onboarding cho trẻ 6-10

1. **Không text dài** — chỉ 1-2 dòng/screen, Lexio nói bằng giọng (TTS)
2. **Không giải thích — cho trải nghiệm** — thay vì "app này có 4 zone", cho trẻ thử 1 mini-quest
3. **Reward ngay lần đầu** — XP + stars + confetti ngay trong onboarding
4. **Skip button ẩn nhỏ** — cho phụ huynh/giáo viên, nhưng trẻ không dễ thấy
5. **Lưu progress onboarding** — nếu đóng app giữa chừng, quay lại đúng bước

---

## 3. THIẾT KẾ MASCOT LEXIO — Animated Character

### 3.1 Tại sao Lexio cần là NHÂN VẬT, không phải CHỮ

Hiện tại "Lexio" chỉ là text xanh lá (`#58cc02`, font Nunito 800) trong Sidebar. **Không có hình ảnh mascot**. Đây là lãng phí lớn nhất trong app — mascot là công cụ engagement mạnh nhất cho trẻ 6-10 tuổi.

### 3.2 Đề xuất hình dáng Lexio

| Thuộc tính | Đề xuất | Lý do |
|---|---|---|
| **Loài** | Cáo nhỏ (fox) hoặc Cú mèo (owl) | Cáo = thông minh, nhanh nhẹn, phổ biến trong văn hóa VN. Cú = biểu tượng trí tuệ. Tránh rồng/phượng (quá formal). |
| **Phong cách** | 3D Pixar-style, mắt to tròn, đầu to thân nhỏ (chibi proportion) | Khớp với aesthetic "3D Webtoon" đã có trong app |
| **Màu chủ đạo** | Xanh lá cam (#58cc02 → gradient emerald-amber) | Kế thừa brand color đã có |
| **Phụ kiện** | Mũ thám hiểm nhỏ + ba lô sách | Khớp với theme "Quest/Explorer" |
| **Biểu cảm mặc định** | Cười tươi, mắt sáng, nghiêng đầu nhẹ | Approachable, non-threatening |

### 3.3 Animation States (CSS/Lottie)

```
IDLE (mặc định):
- Chớp mắt mỗi 3-4 giây (blink)
- Nghiêng đầu nhẹ qua lại (head tilt)
- Đuôi vẫy nhẹ (tail wag)

CELEBRATE (hoàn thành task):
- Nhảy lên (jump)
- Mắt thành ⭐ sao
- Confetti bắn ra

ENCOURAGE (khi user chưa bắt đầu > 5 giây):
- Vẫy tay (wave)
- Speech bubble: "Tap here to start! 👆"

LISTENING (khi user đang thu âm):
- Nghiêng tai về phía trước
- Mắt nhắm nhẹ (attentive listening pose)

THINKING (khi AI đang xử lý):
- Đặt tay lên cằm
- Dấu "..." phía trên đầu
```

### 3.4 Triển khai kỹ thuật

**Khuyến nghị: SVG Animation + CSS** (không cần Lottie/Rive ban đầu)

Lý do:
- SVG nhẹ (~5-15KB), không cần load thư viện ngoài
- CSS animation cho blink/tilt/bounce đủ mượt
- Dễ thay đổi màu/kích thước responsive
- Sau này upgrade lên Lottie/Rive khi cần animation phức tạp hơn

```
Cấu trúc file:
src/components/mascot/
├── LexioMascot.jsx        // Main component, nhận prop: mood="idle"|"celebrate"|"encourage"|"listening"
├── LexioMascot.css        // Animation keyframes
├── lexio_base.svg         // Body SVG (static parts)
└── lexio_expressions/     // Eye, mouth variants
    ├── eyes_default.svg
    ├── eyes_blink.svg
    ├── eyes_star.svg
    └── mouth_smile.svg
```

### 3.5 Lexio vs Nova — Phân vai rõ ràng

| | **Lexio** (Mascot) | **Nova** (AI Tutor Voice) |
|---|---|---|
| **Hình thức** | Visual character, luôn hiện trên screen | Chỉ có giọng nói (TTS), không có hình |
| **Vai trò** | Hướng dẫn UI, celebrate, encourage | Đọc story, đặt câu hỏi, chấm điểm |
| **Giọng** | Không nói (chỉ text bubble) | `en-US-Journey-F` (warm female) |
| **Khi nào xuất hiện** | Mọi lúc (sidebar/header nhỏ, full khi onboarding) | Chỉ khi có audio content |
| **Tính cách** | Vui vẻ, nghịch, like a friend | Nhẹ nhàng, kiên nhẫn, like a teacher |

---

## 4. QUEST-FIRST HOME SCREEN — Thiết kế triệt để

### 4.1 Chấp nhận: Không có user base cũ → Tự do thiết kế lại

Bạn đúng — W01-32 cũng sẽ redesign. Vậy không cần backward compatibility. Thiết kế từ zero.

### 4.2 Home Screen mới — Quest Map

```
┌──────────────────────────────────────────────┐
│ [Lexio icon]  Week 33: Corridor Safety  ⚙️   │
│              ████████░░ 8/16 steps            │
├──────────────────────────────────────────────┤
│                                              │
│  🗺️ YOUR QUEST MAP                           │
│                                              │
│  ┌─────────────────────────────────────┐     │
│  │ 🔍 THE EXPLORER        ⭐⭐⭐░░     │     │
│  │ Read the story · Find hidden items  │     │
│  │ [3D Webtoon] [Karaoke] [Vocab]      │     │
│  │                        [START →]    │     │
│  └─────────────────────────────────────┘     │
│           │ (path line)                      │
│  ┌─────────────────────────────────────┐     │
│  │ 🎙️ THE STORYTELLER     ░░░░░       │     │
│  │ Retell · Explore · Power Up         │     │
│  │                        [LOCKED 🔒]  │     │
│  └─────────────────────────────────────┘     │
│           │                                  │
│  ┌─────────────────────────────────────┐     │
│  │ ⚔️ WORD HERO           ░░░░░       │     │
│  │ Battle · Smash · Math Quest         │     │
│  │                        [LOCKED 🔒]  │     │
│  └─────────────────────────────────────┘     │
│           │                                  │
│  ┌─────────────────────────────────────┐     │
│  │ ✏️ THE CREATOR          ░░░░░       │     │
│  │ Write · Broadcast · Dictation       │     │
│  │                        [LOCKED 🔒]  │     │
│  └─────────────────────────────────────┘     │
│           │                                  │
│  ┌─────────────────────────────────────┐     │
│  │ 🏆 FINAL CHALLENGE      ░░░░░       │     │
│  │ Boss Battle · Review · Shadowing    │     │
│  │                        [LOCKED 🔒]  │     │
│  └─────────────────────────────────────┘     │
│                                              │
└──────────────────────────────────────────────┘
```

### 4.3 KHOAN — Lock hay không Lock?

> [!WARNING]
> **Đây là quyết định thiết kế quan trọng nhất cần bạn chốt.**

Có 2 hướng, cả 2 đều có trade-off thật:

**Hướng A — Soft Lock (Gợi ý, không khóa)**
- Quest 2-5 hiện màu xám nhạt nhưng vẫn bấm được
- Ưu: Tự do cho phụ huynh/giáo viên muốn skip
- Nhược: Trẻ 6 tuổi sẽ bấm lung tung, mất trình tự sư phạm

**Hướng B — Progressive Unlock (Khóa thật, mở dần)**
- Hoàn thành Quest 1 → Quest 2 mở ra (animation mở khóa)
- Ưu: Trình tự sư phạm đảm bảo 100%, cảm giác "mở khóa" = dopamine hit
- Nhược: Giáo viên muốn dạy Writing trước không được, phải có Teacher Override

**Hướng C — Hybrid (Khuyến nghị)**
- Mặc định: Progressive Unlock (khóa thật)
- Teacher/Parent mode: Bấm giữ 3 giây = mở khóa tất cả (hidden gesture, trẻ không biết)
- Best of both worlds

---

## 5. PHẢN BIỆN: "ENGQUEST KHÁC DUOLINGO Ở ĐÂU?"

### 5.1 Điểm yếu thật của Duolingo mà EngQuest phải tránh

1. **Duolingo không dạy đọc hiểu dài (Reading Comprehension)** — chỉ có câu lẻ. EngQuest có story 120-250 từ = advantage lớn.
2. **Duolingo không dạy nói liên tục (Extended Speaking)** — chỉ nhại lại 1 câu. EngQuest có Retell (nói 30-60 giây liên tục) = advantage.
3. **Duolingo không có viết tự do (Free Writing)** — chỉ dịch câu. EngQuest có Story Writer = advantage.
4. **Duolingo lặp lại vô hạn** — session không có điểm kết thúc rõ ràng. EngQuest có "Done for today! 🎉" = healthier.

### 5.2 Nhưng Duolingo LÀM TỐT HƠN EngQuest ở:

1. **Micro-feedback** — mỗi câu trả lời có animation đúng/sai ngay lập tức (EngQuest thiếu điều này ở nhiều chỗ)
2. **Progress visibility** — luôn biết mình ở đâu (EngQuest có quá nhiều thông tin cùng lúc)
3. **Session brevity** — 5 phút xong 1 lesson. EngQuest 1 gear có thể kéo 8-10 phút.
4. **Re-engagement hooks** — streak, notification, hearts. EngQuest chưa có notification system.

### 5.3 Tổng hợp: EngQuest = "Duolingo depth + Cambridge rigor"

```
Duolingo:   Game ← ← ← ← ← ← ← ← → Educational tool
EngQuest:   Game ← ← ← ← → → → → → Educational tool
Target:     Game ← ← ← ← ← ← → → → Educational tool
                              ↑
                    Sweet spot: Fun enough to retain,
                    deep enough to actually learn
```

---

## 6. TÓM LẠI — CẦN BẠN CHỐT TRƯỚC KHI CODE

| # | Quyết định | Options |
|---|---|---|
| **1** | Quest lock | A (Soft) / B (Hard) / **C (Hybrid — khuyến nghị)** |
| **2** | Mascot Lexio | Cáo / Cú mèo / Khác? |
| **3** | Onboarding | 5 bước như đề xuất / Rút gọn? |
| **4** | Chia nhỏ Gear 2 | 1 câu/screen (full Duolingo) / 3 câu/screen (compromise)? |
| **5** | Zone tabs | Xóa hoàn toàn / Giữ trong Settings? |

Khi bạn chốt 5 điểm trên, tôi sẽ dựng mockup UI trực quan và bắt đầu triển khai.
