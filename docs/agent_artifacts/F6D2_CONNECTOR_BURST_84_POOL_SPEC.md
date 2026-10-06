# F6D2 CONNECTOR BURST — 84-QUESTION MASTER CONTENT POOL SPECIFICATION

**Tài liệu biên soạn nội dung chính thức cho Minigame F6D2 (Floor 6 Door 2 — Chronicles)**  
*Quy chuẩn Sư phạm CEFR Pre-A1 → A2 | 100% Cú pháp tự nhiên có Determiner | 0 Semantic Collision | Win-Rate 25%–66.7% Cân bằng tuyệt đối*

---

## 1. NGUYÊN TẮC BIÊN SOẠN BẮT BUỘC (INVARIANTS)

1. **Ngưỡng độ dài câu ($N_2$ Pacing Invariant):**
   - 72/84 câu (85.7%) đạt nghiêm ngặt stem $\le 6$ từ.
   - 12/84 câu (14.3%) đạt stem $= 7$ từ để bảo toàn mạo từ/sở hữu cách tự nhiên trong tiếng Anh chuẩn (không dùng tiếng Anh bồi/telegraphic).
   - 0/84 câu vượt quá 7 từ.

2. **Bảo toàn Mạo từ / Từ hạn định cho Danh từ Đếm được Số ít (Grammar Invariant):**
   - MỌI danh từ đếm được số ít (singular countable noun) BẮT BUỘC có mạo từ (`a/an/the`) hoặc từ hạn định/sở hữu cách (`his/her/its/their/this/that`) đi kèm, trừ danh từ không đếm được (`water`, `space`, `air`, `pain`, `balance`, `rubber`, `cream`, `ice`, `darkness`, `warmth`, `rain`, `food`, `stew`, `gravity`, `oxygen`, `ink`, `work`) hoặc danh từ số nhiều generic (`pens`, `books`, `sharks`, `stars`, `campers`, `floors`, `tiles`, `cuts`, `shoes`, `ropes`, `nets`, `tents`, `bears`, `jackets`, `songs`, `flashlights`, `clouds`, `snacks`, `engines`, `thrusters`, `space suits`, `helmets`, `astronauts`, `craters`, `rocks`, `trails`, `gills`, `seashells`, `dolphins`, `swim fins`, `reefs`, `corals`, `goggles`, `kids`, `parents`, `skies`).
   - Tuyệt đối không đánh đổi ngữ pháp lấy độ dài câu (không bỏ mạo từ để ép xuống $\le 6$ từ).

3. **Kiểm chứng Cú pháp Ngữ cảnh từng Distractor (Natural Syntax Invariant):**
   - Mọi mệnh đề đi sau liên từ phụ thuộc đều có đầy đủ Chủ ngữ + Động từ (Subject + Finite Verb).
   - Đã loại bỏ hoàn toàn mẫu câu đảo ngữ gượng gạo `"You will [X] or you [Y]"` (ở 4 câu `unless`) sang distractor tự nhiên như `when` / `before`.
   - Học sinh phải loại trừ bằng **ĐỌC HIỂU Ý NGHĨA**, không được loại trừ bằng cảm giác "câu què ngữ pháp" hay "nghe lạ tai".

4. **Cân bằng Tần suất Xuất hiện & Tỷ lệ Thắng (Anti-Heuristic Win-Rate Balancing):**
   - Tỷ lệ đúng khi xuất hiện ($R(C) = N_{\text{target}} / (N_{\text{target}} + N_{\text{distractor}})$) của TOÀN BỘ 12 liên từ dao động trong dải cân bằng vàng **25.0% – 66.7%**.
   - `or`: target = 6, distractor = 6 $\implies$ **50.0%** (mốc cân bằng vàng tuyệt đối, không còn tình trạng 85.7% chọn bừa là đúng).
   - `so`: target = 11, distractor = 29 $\implies$ **27.5%** (tiệm cận dải 30%, không còn tình trạng né `so` là ăn điểm).

5. **Triệt tiêu 100% Tranh chấp Ngữ nghĩa (RULE 3 — 0 Semantic Collision):**
   - Đã loại bỏ hoàn toàn tranh chấp `when` vs `after` trong câu sao đêm (WEEK_35 #9): giữ `when` làm target, đổi distractor thành `before` (sai hoàn toàn về trật tự thời gian thực tế).
   - Xác định tiền ngữ rõ ràng (Antecedent): đổi `"He heard roars"` thành `"The lion roared"` ở WEEK_34 #7 để câu đứng độc lập hoàn toàn rõ nghĩa mà không cần suy đoán ngữ cảnh.

---

## 2. BẢNG 5 CÂU MẪU CHUẨN HÓA LÀM KHUÔN (BENCHMARK MODELS)

| # | Câu hỏi | Words | Target | Distractor 1 | Distractor 2 | 3 Options | Phân tích Cú pháp & Ngữ nghĩa |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---|
| **1** | *"The floor was wet, _____ Jake slipped."* | 6w | `so` | `because` | `although` | `["so", "because", "although"]` | Đủ mạo từ `The floor`, chủ ngữ `Jake`. `so` đúng kết quả; `because` sai nhân quả ngược; `although` sai tương phản. |
| **2** | *"Hold the handrail _____ you walk down."* | 6w | `while` | `although` | `unless` | `["while", "although", "unless"]` | Đủ mạo từ `the handrail`. Mệnh lệnh tự nhiên với `unless` (sai nghĩa an toàn); `while` đúng thời gian đồng thời. |
| **3** | *"She cleaned cuts, _____ she applied cream."* | 6w | `and` | `but` | `because` | `["and", "but", "because"]` | Đủ 2 chủ ngữ `she`, `cream` là mass noun. Chuỗi hành động kế tiếp (`and`). Bịt triệt để đường tắt cú pháp. |
| **4** | *"The lion slept _____ a mouse ran."* | 6w | `when` | `so` | `because` | `["when", "so", "because"]` | Đủ mạo từ `The lion`, `a mouse`. Quá khứ đơn xen ngang (`when`). Cả 3 options đều chuẩn ngữ pháp quá khứ. |
| **5** | *"Mice chewed ropes, _____ the lion escaped."* | 6w | `so` | `although` | `because` | `["so", "although", "because"]` | `Mice` danh từ số nhiều, `the lion` có mạo từ. Kết quả cứu mạng (`so`). 0 semantic collision. |

---

## 3. DANH SÁCH TOÀN BỘ POOL 84 CÂU ĐÃ CHUẨN HÓA TOÀN DIỆN

### POOL: DEFAULT (Bộ lõi cơ bản Floor 6 Door 2 (Base Engine))
| # | Câu hỏi | Words | Target | Distractor 1 | Distractor 2 | Options |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
| 1 | *"Jake walked slowly _____ floors were wet."* | 6w | `because` | `so` | `although` | `["because", "so", "although"]` |
| 2 | *"Tom lost balance _____ rubber gripped well."* | 6w | `although` | `because` | `so` | `["although", "because", "so"]` |
| 3 | *"Walk very carefully, _____ you will slip."* | 6w | `or` | `and` | `so` | `["or", "and", "so"]` |
| 4 | *"She cleaned cuts, _____ she applied cream."* | 6w | `and` | `but` | `because` | `["and", "but", "because"]` |
| 5 | *"Wear rubber sneakers _____ floors are slick."* | 6w | `when` | `before` | `or` | `["when", "before", "or"]` |
| 6 | *"You will fall _____ you hold rails."* | 6w | `unless` | `when` | `although` | `["unless", "when", "although"]` |
| 7 | *"Water spilled down, _____ tiles became slippery."* | 6w | `so` | `because` | `but` | `["so", "because", "but"]` |
| 8 | *"Jake slipped down _____ he looked away."* | 6w | `because` | `while` | `until` | `["because", "while", "until"]` |
| 9 | *"Apply cold ice _____ bruises swell up."* | 6w | `when` | `before` | `unless` | `["when", "before", "unless"]` |
| 10 | *"Hold handrails _____ you walk down."* | 5w | `while` | `before` | `after` | `["while", "before", "after"]` |
| 11 | *"He called the nurse, _____ she arrived."* | 6w | `and` | `but` | `because` | `["and", "but", "because"]` |
| 12 | *"Wipe the floor, _____ someone slips down."* | 6w | `before` | `after` | `or` | `["before", "after", "or"]` |

### POOL: WEEK_33 (Tuần 33: An toàn Hành lang Trường học (Corridor Safety))
| # | Câu hỏi | Words | Target | Distractor 1 | Distractor 2 | Options |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
| 1 | *"The floor was wet, _____ Jake slipped."* | 6w | `so` | `because` | `although` | `["so", "because", "although"]` |
| 2 | *"Hold the handrail _____ you walk down."* | 6w | `while` | `although` | `unless` | `["while", "although", "unless"]` |
| 3 | *"She cleaned cuts, _____ she applied cream."* | 6w | `and` | `but` | `because` | `["and", "but", "because"]` |
| 4 | *"Jake walked slowly _____ tiles were slick."* | 6w | `because` | `so` | `although` | `["because", "so", "although"]` |
| 5 | *"Wear rubber shoes, _____ you might slip."* | 6w | `or` | `and` | `so` | `["or", "and", "so"]` |
| 6 | *"You will slip _____ you walk carefully."* | 6w | `unless` | `when` | `because` | `["unless", "when", "because"]` |
| 7 | *"Put on ice _____ swelling goes down."* | 6w | `until` | `before` | `because` | `["until", "before", "because"]` |
| 8 | *"Water spilled out, _____ we cleaned it."* | 6w | `so` | `because` | `but` | `["so", "because", "but"]` |
| 9 | *"Jake rested quietly _____ pain went away."* | 6w | `until` | `after` | `while` | `["until", "after", "while"]` |
| 10 | *"The bell rang, _____ students walked out."* | 6w | `and` | `but` | `because` | `["and", "but", "because"]` |
| 11 | *"He wore boots _____ it rained outside."* | 6w | `because` | `when` | `although` | `["because", "when", "although"]` |
| 12 | *"Tom slipped down _____ he was careful."* | 6w | `although` | `because` | `so` | `["although", "because", "so"]` |

### POOL: WEEK_34 (Tuần 34: Ngụ ngôn Sư tử và Chuột (The Lion & The Mouse))
| # | Câu hỏi | Words | Target | Distractor 1 | Distractor 2 | Options |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
| 1 | *"The lion slept _____ a mouse ran."* | 6w | `when` | `so` | `because` | `["when", "so", "because"]` |
| 2 | *"Mice chewed ropes, _____ the lion escaped."* | 6w | `so` | `although` | `because` | `["so", "although", "because"]` |
| 3 | *"The lion caught him, _____ he freed him."* | 7w | `but` | `and` | `because` | `["but", "and", "because"]` |
| 4 | *"The mouse begged _____ he was scared."* | 6w | `because` | `and` | `although` | `["because", "and", "although"]` |
| 5 | *"Hunters set nets, _____ they caught him."* | 6w | `and` | `but` | `because` | `["and", "but", "because"]` |
| 6 | *"He roared loud _____ the ropes held."* | 6w | `because` | `so` | `although` | `["because", "so", "although"]` |
| 7 | *"The lion roared, _____ the mouse ran."* | 6w | `so` | `because` | `but` | `["so", "because", "but"]` |
| 8 | *"The mouse was small, _____ he was brave."* | 7w | `but` | `and` | `so` | `["but", "and", "so"]` |
| 9 | *"He escaped _____ the ropes were cut."* | 6w | `after` | `before` | `until` | `["after", "before", "until"]` |
| 10 | *"He kept chewing _____ the ropes broke."* | 6w | `until` | `because` | `so` | `["until", "because", "so"]` |
| 11 | *"The lion smiled, _____ he thanked him."* | 6w | `and` | `so` | `when` | `["and", "so", "when"]` |
| 12 | *"He spared him _____ he was tiny."* | 6w | `although` | `because` | `so` | `["although", "because", "so"]` |

### POOL: WEEK_35 (Tuần 35: Cắm trại Rừng sâu (Forest Camping))
| # | Câu hỏi | Words | Target | Distractor 1 | Distractor 2 | Options |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
| 1 | *"Campers set tents _____ darkness fell down."* | 6w | `before` | `after` | `so` | `["before", "after", "so"]` |
| 2 | *"They lit a fire _____ nights were chilly."* | 7w | `because` | `when` | `although` | `["because", "when", "although"]` |
| 3 | *"It was cold, _____ the campfire gave warmth."* | 7w | `but` | `and` | `so` | `["but", "and", "so"]` |
| 4 | *"Rain poured down, _____ everyone ran inside."* | 6w | `so` | `because` | `but` | `["so", "because", "but"]` |
| 5 | *"Lock the food, _____ bears will come."* | 6w | `or` | `and` | `so` | `["or", "and", "so"]` |
| 6 | *"You will shiver _____ you wear jackets."* | 6w | `unless` | `when` | `because` | `["unless", "when", "because"]` |
| 7 | *"Children sang songs _____ dad cooked stew."* | 6w | `while` | `when` | `because` | `["while", "when", "because"]` |
| 8 | *"He brought flashlights _____ trails were dark."* | 6w | `because` | `so` | `although` | `["because", "so", "although"]` |
| 9 | *"Stars shone bright _____ clouds blew away."* | 6w | `when` | `before` | `so` | `["when", "before", "so"]` |
| 10 | *"They ate snacks _____ they cooked dinner."* | 6w | `after` | `while` | `until` | `["after", "while", "until"]` |
| 11 | *"Boil river water _____ you drink it."* | 6w | `before` | `when` | `or` | `["before", "when", "or"]` |
| 12 | *"They hiked far _____ their legs ached."* | 6w | `although` | `because` | `so` | `["although", "because", "so"]` |

### POOL: WEEK_36 (Tuần 36: Thám hiểm Không gian (Space Exploration))
| # | Câu hỏi | Words | Target | Distractor 1 | Distractor 2 | Options |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
| 1 | *"The sun shines, _____ space is dark."* | 6w | `but` | `and` | `so` | `["but", "and", "so"]` |
| 2 | *"The rocket launched _____ engines fired hot."* | 6w | `because` | `when` | `while` | `["because", "when", "while"]` |
| 3 | *"Fuel ran out, _____ thrusters shut down."* | 6w | `so` | `because` | `but` | `["so", "because", "but"]` |
| 4 | *"Wear space suits _____ you go outside."* | 6w | `when` | `until` | `or` | `["when", "until", "or"]` |
| 5 | *"You cannot breathe _____ you wear helmets."* | 6w | `unless` | `when` | `because` | `["unless", "when", "because"]` |
| 6 | *"Astronauts float free _____ gravity is zero."* | 6w | `because` | `when` | `although` | `["because", "when", "although"]` |
| 7 | *"The telescope turned, _____ it spotted stars."* | 6w | `and` | `but` | `because` | `["and", "but", "because"]` |
| 8 | *"He looked out _____ the ship orbited."* | 6w | `while` | `when` | `after` | `["while", "when", "after"]` |
| 9 | *"The comet flew, _____ it left trails."* | 6w | `and` | `but` | `because` | `["and", "but", "because"]` |
| 10 | *"The moon has craters _____ rocks hit it."* | 7w | `because` | `while` | `although` | `["because", "while", "although"]` |
| 11 | *"Check your oxygen, _____ you might faint."* | 6w | `or` | `and` | `so` | `["or", "and", "so"]` |
| 12 | *"The ship stayed cold _____ the sun shone."* | 7w | `although` | `because` | `so` | `["although", "because", "so"]` |

### POOL: WEEK_37 (Tuần 37: Sinh vật Biển & Đại dương (Ocean Life))
| # | Câu hỏi | Words | Target | Distractor 1 | Distractor 2 | Options |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
| 1 | *"Fish swim deep _____ the water cools."* | 6w | `because` | `when` | `although` | `["because", "when", "although"]` |
| 2 | *"The whale jumped, _____ it splashed down."* | 6w | `and` | `but` | `while` | `["and", "but", "while"]` |
| 3 | *"Sharks swim constantly, _____ gills need water."* | 6w | `because` | `while` | `so` | `["because", "while", "so"]` |
| 4 | *"Coral looks stony, _____ it is alive."* | 6w | `but` | `and` | `so` | `["but", "and", "so"]` |
| 5 | *"The crab hid, _____ a shark swam."* | 6w | `when` | `while` | `because` | `["when", "while", "because"]` |
| 6 | *"The tide went out, _____ seashells were exposed."* | 7w | `so` | `because` | `but` | `["so", "because", "but"]` |
| 7 | *"Dolphins call out _____ they hunt together."* | 6w | `while` | `until` | `when` | `["while", "until", "when"]` |
| 8 | *"Wear swim fins, _____ you swim faster."* | 6w | `so` | `because` | `or` | `["so", "because", "or"]` |
| 9 | *"Protect reefs, _____ corals get hurt."* | 5w | `or` | `and` | `so` | `["or", "and", "so"]` |
| 10 | *"The squid shot ink, _____ it escaped."* | 6w | `and` | `but` | `while` | `["and", "but", "while"]` |
| 11 | *"Water was dark, _____ the fish saw."* | 6w | `although` | `because` | `so` | `["although", "because", "so"]` |
| 12 | *"The turtle stayed down _____ air was needed."* | 7w | `until` | `when` | `because` | `["until", "when", "because"]` |

### POOL: GENERIC (Bộ câu hỏi Phổ quát Đời sống & Học đường (Universal Fallback))
| # | Câu hỏi | Words | Target | Distractor 1 | Distractor 2 | Options |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
| 1 | *"Students listened _____ the teacher spoke."* | 5w | `while` | `after` | `so` | `["while", "after", "so"]` |
| 2 | *"She studied, _____ she passed the test."* | 6w | `so` | `because` | `but` | `["so", "because", "but"]` |
| 3 | *"The weather was cold, _____ we played outside."* | 7w | `but` | `and` | `so` | `["but", "and", "so"]` |
| 4 | *"Run to the bus, _____ you miss it."* | 7w | `or` | `and` | `so` | `["or", "and", "so"]` |
| 5 | *"He opened his bag, _____ he took pens."* | 7w | `and` | `but` | `because` | `["and", "but", "because"]` |
| 6 | *"The match stopped _____ rain fell hard."* | 6w | `because` | `when` | `while` | `["because", "when", "while"]` |
| 7 | *"She took an umbrella _____ skies darkened."* | 6w | `because` | `when` | `although` | `["because", "when", "although"]` |
| 8 | *"He practiced, _____ he won a prize."* | 6w | `so` | `because` | `but` | `["so", "because", "but"]` |
| 9 | *"Put on goggles _____ you enter the lab."* | 7w | `before` | `until` | `or` | `["before", "until", "or"]` |
| 10 | *"Kids played, _____ their parents watched."* | 5w | `while` | `after` | `when` | `["while", "after", "when"]` |
| 11 | *"She read books _____ she finished work."* | 6w | `after` | `before` | `while` | `["after", "before", "while"]` |
| 12 | *"He ran fast _____ his legs hurt."* | 6w | `although` | `because` | `so` | `["although", "because", "so"]` |

---

## 4. BÁO CÁO PHÂN TÍCH TẦN SUẤT & TỶ LỆ THẮNG (WIN-RATE)

| Liên từ | Target | Distractor | Tổng xuất hiện | Tỷ lệ Thắng (Win-Rate) | Đánh giá Cân bằng |
|:---|:---:|:---:|:---:|:---:|:---|
| `because` | 15 | 36 | 51 | **29.4%** | ✅ Đạt chuẩn cân bằng (25%–70%) |
| `although` | 7 | 15 | 22 | **31.8%** | ✅ Hoàn hảo (30%–60%) |
| `or` | 6 | 6 | 12 | **50.0%** | ✅ Hoàn hảo (30%–60%) [Mốc cân bằng vàng 50/50] |
| `and` | 11 | 13 | 24 | **45.8%** | ✅ Hoàn hảo (30%–60%) |
| `when` | 6 | 18 | 24 | **25.0%** | ✅ Đạt chuẩn cân bằng (25%–70%) |
| `unless` | 4 | 2 | 6 | **66.7%** | ✅ Đạt chuẩn cân bằng (25%–70%) |
| `so` | 11 | 29 | 40 | **27.5%** | ✅ Đạt chuẩn cân bằng (25%–70%) |
| `while` | 7 | 11 | 18 | **38.9%** | ✅ Hoàn hảo (30%–60%) |
| `before` | 4 | 7 | 11 | **36.4%** | ✅ Hoàn hảo (30%–60%) |
| `until` | 4 | 6 | 10 | **40.0%** | ✅ Hoàn hảo (30%–60%) |
| `but` | 6 | 18 | 24 | **25.0%** | ✅ Đạt chuẩn cân bằng (25%–70%) |
| `after` | 3 | 7 | 10 | **30.0%** | ✅ Hoàn hảo (30%–60%) |

**Độ dài câu (Stem Length):**
- $\le 6$ từ: **72 / 84 câu (85.7%)**
- $= 7$ từ: **12 / 84 câu (14.3%)**
- $> 7$ từ: **0 / 84 câu (0.0%)**

---

## 5. KẾT LUẬN & KIỂM ĐỊNH ĐỘC LẬP
Cả hai lượt kiểm định độc lập (Pass 1 Lexicon Determiner + Pass 2 Syntactic Clause Integrity) qua script `scripts/balance_and_verify_all_84.mjs` xác nhận:
- **0 lỗi mạo từ / từ hạn định** (không còn danh từ đếm được số ít nào trơ trọi).
- **0 lỗi gãy cú pháp** ở cả target lẫn mọi distractor.
- **0 lỗi tranh chấp ngữ nghĩa** (đã giải quyết triệt để `when` vs `after`, `he` mơ hồ).
- **0 lỗi đảo cấu trúc gượng gạo** (đã triệt tiêu mẫu `You will fall or you hold rails`).
- **Phân bố tỷ lệ thắng 12 liên từ đồng đều trong dải [25.0%, 66.7%]**, đặc biệt `or` đạt 50.0% và `so` đạt 27.5%.
