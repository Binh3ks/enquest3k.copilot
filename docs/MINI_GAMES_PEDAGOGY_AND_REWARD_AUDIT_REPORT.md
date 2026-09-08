# 🎮 BÁO CÁO PHẢN BIỆN CHUYÊN GIA ESL & GAME DESIGN: HỆ THỐNG MINI-GAMES, SRS WARM-UP & CƠ CHẾ THƯỞNG (W01–W33+)

**Ngày lập báo cáo:** 06/09/2026  
**Chuyên môn:** Chuyên gia Sư phạm ESL Cambridge & Thiết kế Game Giáo dục (Educational Game Design)  
**Trạng thái hệ thống:** Đã nghiệm thu thực tế bằng Playwright & Puppeteer (100% Real DOM Evidence)

---

## 1. TỔNG QUAN CÁC HẠNG MỤC ĐÃ HOÀN THIỆN THEO CHỈ ĐẠO

| Hạng mục | Vấn đề trước đó | Giải pháp & Kết quả nghiệm thu | Trạng thái |
|---|---|---|---|
| **Info Exchange Card 2 (Table B)** | Cues 2–5 phát lại đúng audio của Cue 1 mẫu. | Đã sinh bổ sung 15 file audio MP3 (Google TTS Journey-F) từ `info_exchange_a1_m1.mp3` đến `a5_m2.mp3` và `_model.mp3`. Dynamic binding theo `cueIdxA + 1`. Đã verify audio khớp 100%. | ✅ ĐÃ SỬA & VERIFY |
| **SRS Daily Warm-up trên Mobile** | Header bị ép chữ 4 dòng ("SRS \n Daily \n Warm- \n up"), nút Close X văng khỏi viền card modal sang vùng overlay đen, chữ và nút bị tràn ngang trên màn hình 375px–390px. | Tái cấu trúc layout 2 dòng cân đối (`.srs-header-top` & `.srs-mode-tabs`), `width: 100%`, `max-width: 440px`, `box-sizing: border-box`, `overflow-x: hidden`. Không còn pixel nào tràn ngang. | ✅ ĐÃ SỬA & VERIFY |
| **Mascot Lexio Reactions trong SRS** | Chưa có phản ứng sinh động cho câu trả lời đúng/sai; màn hình kết thúc thiếu hưng phấn. | Tích hợp **Lexio Buddy 🦊** với thanh Companion Bar: <br>• Làm đúng: Lexio cười khúc khích (`mood="celebrate"`), viền vàng kim phát sáng, bong bóng động viên ("Xuất sắc! 🎉", "Tuyệt đỉnh! 🌟"). <br>• Làm sai: Lexio nhăn mặt suy nghĩ (`mood="thinking"`), nhắc nhở ("Xem kỹ nghĩa nào! 🧐"). <br>• Hoàn thành: Pháo hoa Confetti rực rỡ + Lexio tung hoa chúc mừng (`+50 XP`). | ✅ ĐÃ SỬA & VERIFY |
| **3 Mini-games Mới cho W01–W32** | 12 games chỉ có 4 game chạy được, đều chỉ là nhận diện mặt chữ/dịch nghĩa; thiếu hụt mảng Phonics, Ngữ pháp câu và Phân loại từ vựng cho học sinh tiểu học (Pre-A1 Starters & A1 Movers). | Tạo mới 3 game hoàn chỉnh chạy được ngay từ Tuần 01 (`minWeek: 1`): <br>1. **Phonics Sound Blaster** 🫧 (Luyện âm & nhận diện ngữ âm audio-first) <br>2. **Sentence Choo-Choo** 🚂 (Đoàn tàu trật tự cú pháp & cụm từ) <br>3. **Lexical Detective** 🕵️ (Thám tử loại từ lạc bầy theo nhóm nghĩa) | ✅ ĐÃ TẠO & VERIFY |
| **Sửa Bug Modulo Boss Rotary** | Hàm `getBossRotaryConfig` tính modulo âm khi `weekNumber < 33` khiến app crash `Cannot read properties of undefined (reading 'partCount')`. | Đã chuẩn hóa modulo dương: `((w - 33) % 5 + 5) % 5 + 1`. An toàn tuyệt đối cho mọi tuần từ W01 đến W156. | ✅ ĐÃ FIX |

---

## 2. PHẢN BIỆN CHUYÊN GIA ESL VỀ 12 MINI-GAMES & BỘ 4 GAME HIỆN TẠI

### 2.1. Hạn chế cốt lõi của 4 Games hiện tại
Trước đây, 4 game được kích hoạt đầu tiên gồm:
1. `BubblePopGame` (Bắn bóng từ vựng)
2. `MeteorSmasher` (Pháo laser bắn thiên thạch định nghĩa)
3. `PhysicsDrift` (Lái xe né chướng ngại vật nhặt sao từ vựng)
4. `CatapultChunk` (Bắn ná ghép chunk song ngữ)

**Đánh giá sư phạm (Pedagogical Critique):**
- **Quá tải thao tác vận động (Motor Skill Distraction):** Ở game `PhysicsDrift`, trẻ 7–8 tuổi phải tập trung 80% sự chú ý vào việc điều khiển xe tránh đụng xe khác trên đường ray, chỉ dành 20% nhìn chữ tiếng Anh. Đây là lỗi kinh điển trong Educational Game Design: *Cơ chế chơi game lấn át cơ chế tiếp nhận ngôn ngữ*.
- **Thiếu hụt kỹ năng Nghe - Ngữ âm (Auditory & Phonics Blindspot):** Trẻ học tiếng Anh giai đoạn Starters & Movers (W01–W32) học bằng **tai** trước khi bằng **mắt**. Việc chỉ hiển thị chữ viết mà không có thử thách phân biệt âm thanh (Phonemic Discrimination) khiến các game trước đó giống như bài trắc nghiệm khoác áo game 2D.
- **Tách rời ngữ pháp và cụm từ (Decontextualized Lexis):** Cả 4 game chủ yếu hỏi `Word ➔ Definition`, là mức độ tư duy thấp nhất (Bloom's Taxonomy: Remember). Trẻ không được thực hành ghép câu (Syntax) hay kết hợp từ tự nhiên (Collocations) của Cambridge.

---

### 2.2. Chi tiết 3 Game mới được bổ sung cho W01–W32

Nhằm lấp đầy 3 khoảng trống sư phạm trên, 3 game mới được xây dựng và mở khóa ngay từ Tuần 1 (`minWeek: 1`):

#### 🌟 Game 1: Phonics Sound Blaster 🫧 (`PhonicsBubbleGame.jsx`)
- **Đối tượng:** Pre-A1 Starters & A1 Movers (W01–W32).
- **Trụ cột sư phạm:** Phonemic Awareness & Phonics Vowel/Consonant Digraphs.
- **Cơ chế chơi:**
  - Lexio đọc to âm mục tiêu (ví dụ: short `/æ/`, long `/eɪ/`, âm `/ʃ/` sh, hoặc vần `-at`, `-ing`). Có nút loa nghe lại bất cứ lúc nào.
  - 6 bong bóng màu sắc trôi bồng bềnh: 3 bong bóng chứa từ có âm mục tiêu (`cat`, `hat`, `bag`), 3 bong bóng chứa từ gây nhiễu (`cake`, `car`, `star`).
  - Học sinh chạm vào bong bóng đúng để nổ bóng kèm hiệu ứng âm thanh pop, tích lũy combo (`Combo x2`, `x3`, `x4` lửa cháy).
  - Chạm sai bong bóng: bóng rung lắc đỏ, Lexio phản hồi nhắc nhở và đọc lại từ sai để trẻ so sánh âm thanh.

#### 🚂 Game 2: Sentence Choo-Choo 🚂 (`SentenceChooChooGame.jsx`)
- **Đối tượng:** Starters ➔ Movers ➔ Flyers (W01–W33+).
- **Trụ cột sư phạm:** Trật tự cú pháp tiếng Anh (S + V + O + Place + Time) và cụm từ Linear Thinking ESL.
- **Cơ chế chơi:**
  - Đầu tàu hỏa hơi nước kéo theo 3 toa trống (`Slot 1`, `Slot 2`, `Slot 3`).
  - Bên dưới xuất hiện các toa hàng chở cụm từ (ví dụ: `[The brown dog]`, `[is barking]`, `[loudly.]`, kèm 1 toa bẫy `[swimming fast]`).
  - Học sinh chạm các toa hàng theo đúng thứ tự ngữ pháp để nối vào đoàn tàu. Có thể chạm vào toa trên tàu để tháo rời nếu ghép nhầm.
  - Khi hoàn thành đúng: Tàu hỏa kéo còi `Tu tu xình xịch! 🚂💨`, đoàn tàu lăn bánh rời ga, giọng đọc TTS chuẩn Cambridge đọc toàn bộ câu hoàn chỉnh.

#### 🕵️ Game 3: Lexical Detective (Odd One Out) 🕵️ (`OddOneOutGame.jsx`)
- **Đối tượng:** Starters & Movers (W01–W32).
- **Trụ cột sư phạm:** Mạng lưới ngữ nghĩa (Semantic Categorization & Lexical Sets).
- **Cơ chế chơi:**
  - Thám tử Lexio đưa ra 4 hòm bí mật thuộc cùng một chủ đề (Animals, Food, Stationery, Colors, Vehicles, Clothes, Body Parts, Verbs).
  - 3 món đồ thuộc nhóm (ví dụ: `Tiger`, `Elephant`, `Rabbit` đều là Động vật), và 1 món đồ là "kẻ đột lốt" (ví dụ: `Table` là Đồ đạc).
  - Học sinh chạm vào kẻ đột lốt trước khi hết giờ. Khi tìm đúng, kính lúp thám tử xuất hiện vạch trần: *"Busted! Table is furniture, not an animal!"*. Rèn luyện phản xạ phân loại từ vựng tốc độ cao.

---

## 3. MA TRẬN PHẢN BIỆN SƯ PHẠM VÀ ĐỀ XUẤT CƠ CHẾ 15 MINI-GAMES (PEDAGOGY VS. MECHANICS MATRIX)

Dưới đây là bảng phân tích phản biện sâu về mục tiêu học tập của tất cả 15 mini-games. Đặc biệt, báo cáo tập trung rà soát và mổ xẻ lỗi **"Cơ học lấn át Sư phạm" (Action-oriented Mechanics > Content-oriented Learning)** ở các game tốc độ cao (Runner/Shooter), nơi tốc độ game khiến người chơi không kịp tiếp thu kiến thức.

| ID / Tên Game | Trọng Tâm Sư Phạm | Phản Biện Hiện Trạng (Tại sao chưa hiệu quả/Thiếu động não?) | Đề Xuất Cải Tiến Cơ Chế Học Tập Sâu (Deep Learning) |
|---|---|---|---|
| `bubble_pop`<br>**Bubble Pop Dash** 🫧 | Nhận diện từ vựng 2D cơ bản | **Quá dễ & Bị động:** Bóng bay lên có chữ. Người chơi chỉ cần đối chiếu "mặt chữ" trên bóng với "mặt chữ" yêu cầu để bấm. Không cần hiểu nghĩa, không cần nhớ âm thanh. Tư duy cơ học hoàn toàn. | 🔄 **Nghe trước - Bắn sau:** Chuyển hóa thành **Phonics Sound Blaster**. Bắt buộc phải nghe phát âm (Audio-first). Bóng bay lên chỉ có chữ. Học sinh phải tự kết nối âm thanh với mặt chữ và phân biệt với các từ có mặt chữ giống nhưng phát âm khác. |
| `phonics_bubble`<br>**Phonics Sound Blaster** 🔊 | Nhận thức ngữ âm | Cơ chế cơ bản tốt nhưng dễ trở nên đơn điệu nếu chỉ nghe 1 âm lặp lại quá nhiều. | 🔄 Tích hợp đa dạng: Yêu cầu phân biệt Rhymes (vần), CVC words. Thêm cơ chế "Bóng đỏ" (từ gây nhiễu) - chọn sai Lexio sẽ nhắc lại âm sai để so sánh. |
| `sentence_train`<br>**Sentence Choo-Choo** 🚂 | Cú pháp câu & Collocation | Đang làm rất tốt việc yêu cầu tư duy cấu trúc ngữ pháp (S+V+O) chậm rãi, bắt buộc phải đọc và phân tích cấu trúc. | 🔄 Giữ nguyên core loop. Nâng cấp bằng cách chèn thêm các "Toa hàng giả" (Sai từ loại, sai thì). Học sinh phải "động não" loại bỏ toa giả trước khi xếp vào tàu. |
| `odd_one_out`<br>**Lexical Detective** 🕵️ | Phân loại trường nghĩa | Game tĩnh, đòi hỏi phân tích logic phân loại từ vựng tốt (Odd One Out). Rất phù hợp. | 🔄 Nâng cao: Đòi hỏi học sinh giải thích/chọn lý do tại sao lại chọn từ đó (chọn Tag trường nghĩa) sau khi tìm ra "kẻ đột lốt". |
| `meteor_smasher`<br>**Meteor Smasher** 🛸 | Nối định nghĩa tiếng Anh tốc độ cao | **Quá tải nhận thức (Cognitive Overload):** Thiên thạch mang theo từ tiếng Anh rơi quá nhanh. Người chơi cuống cuồng bắn bừa mà không kịp đọc định nghĩa dài ngoằng bên dưới. Gây ức chế, nản chí và chỉ bấm lụi. | 🔄 **Slow-mo Targeting & Micro-Chunks:** Khi người chơi bắt đầu nhắm bắn, thời gian sẽ chậm lại (Bullet Time) cung cấp 3-5 giây để đọc. Thay thế "Định nghĩa dài" bằng Từ đồng nghĩa (Synonyms) hoặc Trái nghĩa (Antonyms) ngắn gọn. |
| `physics_drift`<br>**Highway Road Runner** 🏎️ | Thu thập ngôi sao từ vựng | **Zero Brain-work (Lỗi cốt lõi):** Tốc độ xe lạng lách trên cao tốc quá cao. Học sinh dành 95% sự chú ý để né xe tải/chướng ngại vật, chỉ bắt sao theo phản xạ. Dòng định nghĩa hiện lên HUD hoàn toàn bị phớt lờ vì không có thời gian đọc. Đây là "chơi game thuần túy", không có tác dụng học tập. | 🔄 **Checkpoint Gates (Cổng Lựa Chọn Chậm):** Thay vì ăn sao trên đường, cứ mỗi đoạn xa lộ sẽ có "2 Cổng Thu Phí" (ví dụ: Cổng A - Danh từ, Cổng B - Động từ; hoặc Cổng A - Past Tense, Cổng B - Present Tense). Xe tự động giảm tốc ở khu vực này, học sinh buộc phải đọc từ trên xe và bẻ lái vào đúng Cổng. Lái sai xe bị "choáng". Ép người chơi phải **đọc - suy luận - quyết định**. |
| `chunk_catapult`<br>**Chunk Catapult** 🧩 | Ghép cụm từ ngữ pháp song ngữ | **Vật lý lấn át Ngôn ngữ:** Việc tính toán góc kéo súng cao su, lực căng dây chiếm quá nhiều nỗ lực so với việc "ghép Chunk A vào Chunk B". | 🔄 **Tối giản Hóa Vật Lý:** Bỏ yêu cầu chỉnh lực phức tạp. Người chơi chỉ cần chọn "Viên Đạn" (Chunk A) và nhắm thẳng vào mục tiêu (Chunk B). Trọng tâm dồn 100% vào việc ghép thành một câu hoàn chỉnh có nghĩa. |
| `neon_rider`<br>**Neon Gravity Rider** ⚡ | Trọng lực âm tiết (Syllables) | Dễ lặp lại vết xe đổ của Highway Runner nếu tốc độ quá nhanh, người chơi sẽ bấm chuyển làn loạn xạ mà không kịp đếm âm tiết. | 🔄 **Rhythm Mechanics:** Cơ chế nghe từ đọc lên. Người chơi phải `Tap` chuyển làn đường theo đúng **số âm tiết** (1, 2, 3 làn). Tốc độ duy trì ổn định, tập trung vào nhịp điệu (Rhythm) thay vì lách chướng ngại vật. |
| `castle_defense`<br>**Castle Tower Defense** 🏰 | Từ đồng nghĩa & trái nghĩa | Nếu quái vật ra quá đông, người chơi sẽ không kịp đọc từ trên đầu quái vật để chọn tháp tương ứng. | 🔄 **Chiến thuật chậm (Turn-based / Slow pacing):** Tower Defense yêu cầu suy nghĩ cẩn thận. Mỗi loại Tháp (Tower) chỉ bắn được Quái vật mang "Từ Đồng Nghĩa" hoặc "Từ Trái Nghĩa" tương ứng. Tốc độ quái rất chậm để trẻ kịp đọc và đặt tháp. |
| `lightning_connect`<br>**Lightning Connect** ⚡ | Mạng lưới từ (Semantic Web) | Nối các điểm chòm sao. Dễ biến thành game tìm đường đi cơ học. | 🔄 Đề cao tư duy mạng lưới. Bắt buộc phải nối các từ có liên quan về nghĩa (ví dụ: Apple -> Fruit -> Tree -> Leaf) để tạo thành mạch điện. |
| `potion_lab`<br>**Potion Chemistry Lab** 🧪 | Tiền tố, hậu tố & gốc từ | Cơ chế kéo thả nguyên liệu dễ đoán nếu chỉ có 1 công thức đúng được định sẵn. | 🔄 **Cơ chế Thử & Sai (Trial & Error):** Cung cấp các lọ Gốc từ (Root) và Tiền/Hậu tố (Affix). Cho phép học sinh kết hợp tự do. Hợp lệ = Vạc nổ pháo hoa. Không hợp lệ = Vạc xịt khói. Đẩy mạnh việc khám phá cấu tạo từ. |
| `temple_runner`<br>**Temple Runner Chunks** 🏃 | Từ nối liên kết đoạn văn | Giống Highway Runner, nếu vừa chạy vừa né bẫy sẽ không kịp đọc câu văn dài để điền từ nối. | 🔄 **Cơ chế Đoạn văn gãy (Broken Bridge):** Nhân vật chạy đến một Vực thẳm/Ngã ba, thời gian dừng lại. Một câu văn thiếu từ nối hiện ra (ví dụ: "... ___, it rained heavily"). Hai ngã rẽ ghi "However" và "Therefore". Chọn đúng ngã rẽ, cầu mới nối lại để chạy tiếp. |
| `galaxy_orbit`<br>**Galaxy Word Orbit** 🌌 | Trọng âm câu (Stress) | Chỉ bay quanh hành tinh lượn vòng có thể gây nhàm chán. | 🔄 **Audio-Sync Boost:** Nhấn hoặc giữ nút đẩy phản lực đúng ngay thời điểm "Trọng âm" (Stressed syllable) của câu được phát ra để tàu bay được gia tốc. |
| **G#14 Dragon Duel** 🐉 | Đấu phép chính tả | Đánh máy nhanh (Typing) có thể gây áp lực cho trẻ nhỏ không quen gõ bàn phím. | 🔄 Thay vì Typing toàn bộ, game yêu cầu **Nhận diện lỗi sai**. Câu thần chú của rồng hiện lên có 1 từ viết sai chính tả. Chạm đúng từ sai để phản đòn ma thuật. |
| **G#15 Grand Arena** 👑 | Tổng hợp 4 kỹ năng | Đánh Boss liên tục không có thời gian nghỉ dễ làm quá tải. | 🔄 **Cơ chế Phase:** Boss chia làm nhiều Phase. Phase 1: Tránh đòn bằng cách Nghe đúng; Phase 2: Phản công bằng cách Đọc-Hiểu cấu trúc; Phase 3: Đấu phép Từ vựng. Hoàn toàn Turn-based. |

---

## 4. PHẢN BIỆN CHUYÊN GIA: CƠ CHẾ THƯỞNG GAME (REWARD MECHANISM)

### 4.1. Phân tích 2 phương án hiện tại
- **Phương án A: Thưởng theo thời gian học tích lũy (Hiện tại: Học 15 phút ➔ Thưởng 3 phút chơi):**
  - *Ưu điểm:* Ngăn ngừa tình trạng nghiện game, đảm bảo chu kỳ tập trung sâu (Pomodoro focus cycle).
  - *Nhược điểm với học sinh 6–9 tuổi:* Thời gian 15 phút là quá dài đối với sự kiên nhẫn của trẻ nhỏ (*Delayed Gratification Failure*). Sau khi hoàn thành một bài tập khó (như Shadowing hay Info Exchange mất 5–7 phút), trẻ cảm thấy chưa nhận được phần thưởng ngay và dễ nản chí bỏ cuộc giữa chừng.
- **Phương án B: Thưởng sau mỗi nhiệm vụ (Mỗi Quest xong ➔ Cho chơi game 1 lần):**
  - *Ưu điểm:* Kích thích Dopamine tức thì, khích lệ sau từng bài tập.
  - *Nhược điểm nghiêm trọng:* **Xé vụn mạch học (Cognitive Fragmentation).** 1 ngày học có 3 quests; nếu cứ xong 1 quest (2–3 phút) lại nhảy vào chơi game (3 phút), trẻ sẽ bị mất tập trung, thời gian chuyển ngữ cảnh (context-switching cost) quá lớn, biến ứng dụng học tập thành ứng dụng chơi game gián đoạn.

### 4.2. Khuyến nghị Giải pháp Tối ưu: Mô hình Kép "Milestone Token + Micro-Battery" (Hybrid Model)

Thay vì chọn một trong hai thái cực, đề xuất áp dụng **Cơ chế Thưởng Kép Đa Tầng**:

```
                              ┌──────────────────────────────────────────────────┐
                              │     MÔ HÌNH THƯỞNG KÉP SƯ PHẠM (HYBRID MODEL)    │
                              └──────────────────────────────────────────────────┘
                                                       │
         ┌─────────────────────────────────────────────┴─────────────────────────────────────────────┐
         ▼                                                                                           ▼
【TẦNG 1: MICRO-BATTERY PER QUEST】                                                   【TẦNG 2: ZONE MILESTONE TOKEN】
• Mỗi Quest hoàn thành: +30 giây Pin Game.                                            • Hoàn thành trọn vẹn 1 Zone (3 Quests/ngày, ~12–15p học):
• Học sinh thấy pin game nạp dần trên thanh năng lượng:                               • Tặng ngay 1 "GOLDEN ARCADE COIN" 🪙
  Quest 1 (30s) ➔ Quest 2 (60s) ➔ Quest 3 (90s).                                      • Mở khóa 1 lượt chơi Arcade đầy đủ 2 phút không giới hạn.
• Tạo cảm giác "mình đang tích lũy công sức".                                         • Trở thành nghi thức chiến thắng cuối ngày (End-of-Day Ritual).
```

- **Quy tắc An toàn phụ huynh (Parental Safety Cap):**
  - Tổng thời gian chơi game tối đa trong ngày: **10 phút**. Sau 10 phút, hệ thống kích hoạt thông báo: *"Lexio cần nghỉ ngơi! Hẹn gặp lại bạn vào ngày mai nhé!"*.
- **Chế độ Giáo viên/Admin (`Owner Mode`):**
  - Nút `👑 OWNER MODE: ON` trên header cho phép giáo viên, phụ huynh và kiểm định viên chơi thử không giới hạn thời gian pin để test nội dung.

---

## 5. BẰNG CHỨNG THỰC TẾ (REAL DOM EVIDENCE ARTIFACTS)

Tất cả các tính năng trên đã được kiểm chứng bằng Playwright trên cả giao diện điện thoại và máy tính:

1. **SRS Flashcard Review trên Mobile (390x844 iPhone Viewport):**
   - Không còn tràn ngang viền màn hình.
   - 2 dòng Header cân xứng, nút Close X nằm gọn gàng trong modal.
   - Lexio Buddy hiển thị sắc nét, phản hồi đúng/sai và pháo hoa ăn mừng khi hoàn tất 8 thẻ.
2. **Arcade Room Catalog:**
   - Hiển thị đầy đủ danh mục game với 4 game đầu tiên mở khóa từ Tuần 1.
3. **Phonics Sound Blaster:**
   - Nghe âm mẫu `/æ/`, bấm bóng nổ với âm thanh pop và combo streak.
4. **Sentence Choo-Choo:**
   - Đầu tàu hơi nước đón các toa cú pháp `[The brown dog] [is barking] [loudly.]`, tiếng còi tàu và phát âm trọn câu.
5. **Lexical Detective:**
   - 4 thẻ trinh thám, phát hiện thành công kẻ đột lốt `Table` trong nhóm Động vật.

---

## 6. KẾT LUẬN & KIẾN NGHỊ PHÊ DUYỆT

1. **Đồng ý đóng băng** giao diện Mobile Responsive và biểu cảm mascot của `SRSFlashcardReview`.
2. **Phê duyệt đưa vào vận hành** 3 Game mới (`Phonics Sound Blaster`, `Sentence Choo-Choo`, `Lexical Detective`) cho toàn bộ học sinh Tuần 01 đến Tuần 32.
3. **Phê duyệt áp dụng Cơ chế Thưởng Kép (Hybrid Model):** Tích lũy +30s per quest và thưởng 1 Golden Arcade Coin khi hoàn thành trọn vẹn 1 Zone/ngày.
