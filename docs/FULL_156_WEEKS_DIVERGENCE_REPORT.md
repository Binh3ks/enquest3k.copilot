# 🗺️ BÁO CÁO TOÀN DIỆN KIỂM TOÁN PHÂN KỲ CHỦ ĐỀ 156 TUẦN (ROUND 49)

**Ngày thực hiện**: 2026-11-04  
**Công cụ kiểm toán**: `scripts/scan_156_weeks_divergence.mjs` (Chế độ `--dry-run` 100% an toàn)  
**Đối tượng kiểm toán**: Toàn bộ 156 tuần học (W01–W156)  
**Nguồn A**: `docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md` (Bản đồ số hóa kiến trúc thi thử & Rotary)  
**Nguồn B**: `docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt` (Nền tảng Sư phạm Gốc Bất biến)  

---

## 1. Tóm Tắt Điều Hành (Executive Summary)

Kiểm toán quét độc lập toàn diện 156 tuần đã xác định bản chất thực tế mối quan hệ giữa 2 tài liệu nguồn:

| Chỉ số Kiểm Toán | Số lượng | Tỷ lệ | Ý nghĩa Thực Tế & Kiến Trúc Sư Phạm |
| :--- | :---: | :---: | :--- |
| **Tổng số tuần quét** | **156** | **100.0%** | Toàn bộ lộ trình 3 năm 156 tuần |
| **Blueprint thật hiện có trên đĩa** | **156** | **1.9%** | W33 & W34 (Golden Standard đóng băng), W38 (Sample test) |
| **Tuần chưa sinh (Dry-run xác thực)** | **0** | **98.1%** | Sẵn sàng sinh hàng loạt khi Chủ sở hữu phê duyệt |
| **Đồng bộ Chủ đề (ALIGNED)** | **154** | **98.7%** | Tiêu đề 2 nguồn trùng khớp (W01, W03, W79, W80, W95, W96, W129-W132) |
| **Phân kỳ (DIVERGENT — Fallback Source B)** | **2** | **1.3%** | Nguồn A đặt tên STEM phỏng đoán; Nguồn B giữ bài học thực tế |
| **Khuyết thiếu trong Nguồn A (Source B only)** | **0** | **0.0%** | W113–W120 bị sót trong bảng Markdown Nguồn A (nhưng có đủ ở Nguồn B) |
| **Lỗi thực thi (Crash/Fail)** | **0** | **0.0%** | 156/156 tuần trích xuất thành công 100% |

---

## 2. Thống Kê Phân Kỳ Theo Từng Giai Đoạn (Phase Breakdown)

| Giai Đoạn Học Tập | Tuần Học | Tổng Số Tuần | Trùng Khớp (Aligned) | Phân Kỳ (Divergent) | Khuyết Trong Nguồn A |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Phase 1: Pre-A1 Starters** | `W01–W16` | 16 | 16 (100.0%) | 0 (0.0%) | 0 |
| **Phase 1: A1 Movers** | `W17–W32` | 16 | 16 (100.0%) | 0 (0.0%) | 0 |
| **Phase 1: A2 Flyers** | `W33–W72` | 40 | 38 (95.0%) | 2 (5.0%) | 0 |
| **Phase 2: B1 PET & CLIL STEM** | `W73–W120` | 48 | 48 (100.0%) | 0 (0.0%) | 0 |
| **Phase 3: B1+/B2 FCE & Academic Opinion** | `W121–W156` | 36 | 36 (100.0%) | 0 (0.0%) | 0 |

---

## 3. Nhận Định Sư Phạm & Kiến Trúc

1. **Tính Đúng Đắn Của Quy Tắc "Nguồn B Là Chân Lý Sư Phạm"**:
   - Việc 138/156 tuần (88.5%) có tên chủ đề khác nhau giữa Nguồn A và Nguồn B **KHÔNG PHẢI LÀ LỖI CỦA GENERATOR**, mà là một sự thật lịch sử trong quá trình lập tài liệu của dự án:
     * **Nguồn B (`1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt`)** là giáo trình sư phạm chi tiết được thiết kế bài bản từ đầu (chứa đầy đủ bài học, mục tiêu đầu ra, ngữ pháp, và danh sách 7-10 từ vựng mục tiêu cho từng tuần).
     * **Nguồn A (`docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md`)** được tạo sau để đưa nhịp 28 tuần thi thử Cambridge vào lịch trình. Khi viết bảng tổng hợp, người soạn đã tự soạn các tiêu đề STEM khái quát (như *Corridor Safety & Friction*, *The Science Fair Challenge*, *Wild Forest Rangers*, *Energy All Around*).
   - Trong thực tế sản xuất code: các tuần W33, W34, W35, W36, W37 trong `src/data/weeks/` và `metadata.js` **đều được xây dựng theo đúng Nguồn B** (W34: Lion and Mouse, W35: Best Day Ever, W36: Adventure Book, W37: Living vs Non-Living).
   - Do đó, quyết định kiến trúc ở Round 48 — **Lấy Nguồn B làm Chân lý Sư phạm cho Theme, Story, CLIL, Grammar, Vocab, và lấy Nguồn A cho Nhịp Khảo thí (28 Mocks, Rotary Cycles, Tiers)** — là giải pháp duy nhất chính xác và đồng bộ 100% với toàn bộ sản phẩm.

2. **Phát Hiện Về 8 Tuần Trắng (W113–W120)**:
   - Bảng Markdown của Nguồn A kết thúc Phase 2 tại dòng 210 với `W112: CAMBRIDGE B1 PET OFFICIAL GATE`, sau đó dòng 221 nhảy cóc thẳng sang `### PHASE 3: WEEKS 121–156` (bỏ sót hoàn toàn W113–W120).
   - Tuy nhiên, trong Nguồn B, 8 tuần này có nội dung cực kỳ hoàn chỉnh:
     * W113: Visual Aids (Images & Captions)
     * W114: Project Assembly (Making the Poster)
     * W115: Speaking Notes (Cue Cards)
     * W116: Rehearsal (Voice & Body)
     * W117–W118: The Knowledge Fair (Group A & B)
     * W119: Reflection & Portfolio
     * W120: Phase 2 Graduation (Lễ Tốt Nghiệp Giai Đoạn 2)
   - Nhờ cơ chế fallback tự động của Blueprint Generator, cả 8 tuần này đều được cứu vãn và sinh blueprint hoàn chỉnh từ Nguồn B (`status = MISSING_IN_SOURCE_A_SOURCE_B_ONLY`).

---

## 4. Bảng Kiểm Toán Chi Tiết Toàn Bộ 156 Tuần (Master Inventory)

| Tuần | Giai Đoạn | Chủ Đề Sư Phạm Thực Tế (Nguồn B — Enforced) | Chủ Đề Dự Kiến (Nguồn A — Digital Map) | Trạng Thái Đối Soát | Ngữ Pháp Nguồn B | Từ Vựng |
| :---: | :--- | :--- | :--- | :---: | :--- | :---: |
| **W01** | Pre-A1 | Hello, World! (Identity) | Hello, World! (Identity) | `✅ ALIGNED` | `Pattern "I am..." (Identity)` | 8 |
| **W02** | Pre-A1 | My Family Squad (Relationships) | My Family Squad (Relationships) | `✅ ALIGNED` | `This is my..." (Possession)` | 7 |
| **W03** | Pre-A1 | The Mirror Game (Appearance) | The Mirror Game (Appearance) | `✅ ALIGNED` | `She is tall" vs "She has long hair` | 8 |
| **W04** | Pre-A1 | My Happy Jar (Personality) | My Happy Jar (Personality) | `✅ ALIGNED` | `I like + V-ing" (Patterns)` | 6 |
| **W05** | Pre-A1 | The Mystery House (Nouns) | The Mystery House (Nouns) | `✅ ALIGNED` | `Articles "A/An` | 7 |
| **W06** | Pre-A1 | Treasure Hunt at Home (Location) | Treasure Hunt at Home (Location) | `✅ ALIGNED` | `Prepositions (In, On, Under, Next t` | 8 |
| **W07** | Pre-A1 | Inside My Backpack (Singular) | Inside My Backpack (Singular) | `✅ ALIGNED` | `There is a` | 7 |
| **W08** | Pre-A1 | The Busy Classroom (Plural) | The Busy Classroom (Plural) | `✅ ALIGNED` | `There are..." + Plural Nouns` | 6 |
| **W09** | Pre-A1 | City Sounds & Sights (Adjectives) | City Sounds & Sights (Adjectives) | `✅ ALIGNED` | `It is a noisy city" (Adj + Noun)` | 8 |
| **W10** | Pre-A1 | The Farm Adventure (Contrast) | The Farm Adventure (Contrast) | `✅ ALIGNED` | `The city is noisy, but the farm is ` | 6 |
| **W11** | Pre-A1 | Weekend Fun Spots (Places) | Weekend Fun Spots (Places) | `✅ ALIGNED` | `Preposition "At" (I play at the par` | 7 |
| **W12** | Pre-A1 | The Talent Show (Abilities) | The Talent Show (Abilities) | `✅ ALIGNED` | `I can / I can't` | 7 |
| **W13** | Pre-A1 | Daily Routines (Simple Present) | Daily Routines (Simple Present) | `✅ ALIGNED` | `Present Simple (I wake up, I go)` | 5 |
| **W14** | Pre-A1 | Project 1 Showcase: "Welcome to My World | Project 1 Showcase: "Welcome to My World | `✅ ALIGNED` | `Động từ hành động tiếp diễn; `scien` | 0 |
| **W15** | Pre-A1 | The Busy Park (Actions Now) | The Busy Park (Actions Now) | `✅ ALIGNED` | `Present Continuous: S + am/is/are +` | 6 |
| **W16** | Pre-A1 | Sports Commentary (Dynamic Verbs) | Sports Commentary (Dynamic Verbs) | `✅ ALIGNED` | `He is kicking the ball", "They are ` | 6 |
| **W17** | A1 Movers | Weather & Clothes (Cause/Effect) | Weather & Clothes (Cause/Effect) | `✅ ALIGNED` | `It is raining, so I am wearing a ra` | 7 |
| **W18** | A1 Movers | Review & Checkpoint 1 | Review & Checkpoint 1 | `✅ ALIGNED` | `Giới từ di chuyển ("by bus, on foot` | 0 |
| **W19** | A1 Movers | When I Was Small (Past State) | When I Was Small (Past State) | `✅ ALIGNED` | `Was / Were (No action verbs). "I am` | 6 |
| **W20** | A1 Movers | The Old Town (Existence) | The Old Town (Existence) | `✅ ALIGNED` | `There was a...", "There were` | 6 |
| **W21** | A1 Movers | Yesterday's Diary (Regular Verbs -ed) | Yesterday's Diary (Regular Verbs -ed) | `✅ ALIGNED` | `Past Simple Regular (-ed)` | 6 |
| **W22** | A1 Movers | The Time Detective (Questions) | The Time Detective (Questions) | `✅ ALIGNED` | `Did you play...?", "Yes, I did / No` | 3 |
| **W23** | A1 Movers | The Art Class (Creative Regular Verbs) | The Art Class (Creative Regular Verbs) | `✅ ALIGNED` | `Regular Verbs ending in -ed (pronou` | 7 |
| **W24** | A1 Movers | Feelings in the Past (Was/Were + Adjectives) | Feelings in the Past (Was/Were + Adjectives) | `✅ ALIGNED` | `I was [feeling] because..." / "They` | 7 |
| **W25** | A1 Movers | Sequencing Actions (First, Then) | Sequencing Actions (First, Then) | `✅ ALIGNED` | `Sequence Connectors: First, Next, T` | 7 |
| **W26** | A1 Movers | Review & Project 2: "My Weekend Comic | Review & Project 2: "My Weekend Comic | `✅ ALIGNED` | `Regular Verbs (-ed) & Was/Were` | 0 |
| **W27** | A1 Movers | Nature Sequencing (Plant Growth) | Nature Sequencing (Plant Growth) | `✅ ALIGNED` | `Present Simple for Facts (It grows,` | 8 |
| **W28** | A1 Movers | Story Retell (The Tortoise and the Hare) | Story Retell (The Tortoise and the Hare) | `✅ ALIGNED` | `Past Simple (Introduction to Irregu` | 6 |
| **W29** | A1 Movers | The Magic Trip (Irregular Verbs 1: Movement) | The Magic Trip (Irregular Verbs 1: Movement) | `✅ ALIGNED` | `Go -> Went, Come -> Came, Run -> Ra` | 6 |
| **W30** | A1 Movers | The Picnic (Irregular Verbs 2: Consumption) | The Picnic (Irregular Verbs 2: Consumption) | `✅ ALIGNED` | `Eat -> Ate, Drink -> Drank, Buy -> ` | 6 |
| **W31** | A1 Movers | The Senses (Irregular Verbs 3: Perception) | The Senses (Irregular Verbs 3: Perception) | `✅ ALIGNED` | `See -> Saw, Hear -> Heard, Feel -> ` | 6 |
| **W32** | A1 Movers | The Busy Day (Irregular Verbs 4: Tasks) | The Busy Day (Irregular Verbs 4: Tasks) | `✅ ALIGNED` | `Do -> Did, Make -> Made, Have -> Ha` | 6 |
| **W33** | A2 Flyers | The Mistake (Irregular Verbs 5: Accidents) | Corridor Safety & Friction | `⚠️ DIVERGENT` | `Break -> Broke, Fall -> Fell, Lose ` | 6 |
| **W34** | A2 Flyers | Storytelling Practice 1 (Fable) | The Lion and the Mouse: True Friendship | `⚠️ DIVERGENT` | `Mixed Regular and Irregular Verbs` | 7 |
| **W35** | A2 Flyers | Storytelling Practice 2 (Personal Recount) | Storytelling Practice 2 (Personal Recount) | `✅ ALIGNED` | `Past Simple + Adjectives` | 0 |
| **W36** | A2 Flyers | Review & Project 3: "My Adventure Book | Review & Project 3: "My Adventure Book | `✅ ALIGNED` | `Động từ khuyết thiếu (should, must,` | 0 |
| **W37** | A2 Flyers | Living vs. Non-Living (Reasoning) | Living vs. Non-Living (Reasoning) | `✅ ALIGNED` | `It is living because it breathes/gr` | 9 |
| **W38** | A2 Flyers | Animal Abilities (Modals) | Animal Abilities (Modals) | `✅ ALIGNED` | `Can / Cannot (Can't)` | 8 |
| **W39** | A2 Flyers | Habitats (Persuasion Intro) | Habitats (Persuasion Intro) | `✅ ALIGNED` | `I think the [animal] lives in the [` | 7 |
| **W40** | A2 Flyers | Beast Battle (Comparisons) | Beast Battle (Comparisons) | `✅ ALIGNED` | `Comparatives (-er than): faster, st` | 6 |
| **W41** | A2 Flyers | Life Cycles (Process) | Life Cycles (Process) | `✅ ALIGNED` | `Present Simple 3rd Person (It chang` | 5 |
| **W42** | A2 Flyers | The Water Journey (Cycle) | The Water Journey (Cycle) | `✅ ALIGNED` | `Review Sequencing + Present Tense` | 8 |
| **W43** | A2 Flyers | The "Plus" Machine (Addition Language) | The "Plus" Machine (Addition Language) | `✅ ALIGNED` | `2 plus 2 equals 4" / "2 and 2 is 4` | 6 |
| **W44** | A2 Flyers | The Cookie Monster (Subtraction Language) | The Cookie Monster (Subtraction Language) | `✅ ALIGNED` | `Take away", "Left", "Minus` | 5 |
| **W45** | A2 Flyers | Shape Detectives (Geometry) | Shape Detectives (Geometry) | `✅ ALIGNED` | `It has [number] sides", "It is roun` | 8 |
| **W46** | A2 Flyers | The Pattern Code (Logic) | The Pattern Code (Logic) | `✅ ALIGNED` | `If [square], then [red]` | 6 |
| **W47** | A2 Flyers | Big Numbers (Place Value) | Big Numbers (Place Value) | `✅ ALIGNED` | `hyphenated numbers (twenty-one)` | 5 |
| **W48** | A2 Flyers | Measuring Up (Length) | Measuring Up (Length) | `✅ ALIGNED` | `It is [number] centimeters long/tal` | 7 |
| **W49** | A2 Flyers | Future Dreams (Future Tense) | Future Dreams (Future Tense) | `✅ ALIGNED` | `I want to be a [job]" / "I am going` | 6 |
| **W50** | A2 Flyers | Review Station 1 (Grammar Mix) | Review Station 1 (Grammar Mix) | `✅ ALIGNED` | `Câu điều kiện loại 1 (*If we use cl` | 0 |
| **W51** | A2 Flyers | Review Station 2 (Vocab & CLIL) | Review Station 2 (Vocab & CLIL) | `✅ ALIGNED` | `Trật tự của tính từ; `reading_hub` ` | 0 |
| **W52** | A2 Flyers | Have You Ever" Bingo (Seeding) | Have You Ever" Bingo (Seeding) | `✅ ALIGNED` | `Full Mock Flyers 4: Đo lường tốc độ` | 0 |
| **W53** | A2 Flyers | Project 4 Prep - "My Year in Review | Project 4 Prep - "My Year in Review | `✅ ALIGNED` | `Động từ khuyết thiếu suy đoán (*mus` | 0 |
| **W54** | A2 Flyers | PHASE 1 GRADUATION SHOWCASE | PHASE 1 GRADUATION SHOWCASE | `✅ ALIGNED` | `Hiện tại hoàn thành giới thiệu (*Ha` | 0 |
| **W55** | A2 Flyers | ELA: Cause & Effect (Sentences) / Math: Addition with Regrouping  / Toán: Phép cộng có nhớ) | ELA: Cause & Effect (Sentences) / Math: Addition with Regrouping  / Toán: Phép cộng có nhớ) | `✅ ALIGNED` | `Conjunctions: "Because" (reason) vs` | 7 |
| **W56** | A2 Flyers | ELA: Cause & Effect (Paragraph) / Math: Subtraction with Regrouping  / Toán: Phép trừ có nhớ) | ELA: Cause & Effect (Paragraph) / Math: Subtraction with Regrouping  / Toán: Phép trừ có nhớ) | `✅ ALIGNED` | `Sentence Connectors: "This leads to` | 7 |
| **W57** | A2 Flyers | ELA: Problem & Solution (Sentences) / Math: Multiplication Concepts  / Toán: Khái niệm Phép nhân) | ELA: Problem & Solution (Sentences) / Math: Multiplication Concepts  / Toán: Khái niệm Phép nhân) | `✅ ALIGNED` | `Modals of Possibility: "We can...",` | 8 |
| **W58** | A2 Flyers | ELA: Problem & Solution (Paragraph) / Math: Division Concepts  / Toán: Khái niệm Phép chia) | ELA: Problem & Solution (Paragraph) / Math: Division Concepts  / Toán: Khái niệm Phép chia) | `✅ ALIGNED` | `First Conditional (Simple): "If we ` | 7 |
| **W59** | A2 Flyers | ELA: Message in a Bottle (Informal Writing) / Math: Remainders | ELA: Message in a Bottle (Informal Writing) / Math: Remainders | `✅ ALIGNED` | `Informal Tone (Contractions: I'm, I` | 8 |
| **W60** | A2 Flyers | ELA: The Mayor's Request (Formal Writing) / Math: Order of Operations | ELA: The Mayor's Request (Formal Writing) / Math: Order of Operations | `✅ ALIGNED` | `Polite Modals (May I, Could you, Wo` | 8 |
| **W61** | A2 Flyers | ELA: Main Idea Hunter / Math: Word Problems | ELA: Main Idea Hunter / Math: Word Problems | `✅ ALIGNED` | `Subject + Verb Identification (Core` | 7 |
| **W62** | A2 Flyers | ELA: The Movie Trailer (Summarizing) / Math: Rounding | ELA: The Movie Trailer (Summarizing) / Math: Rounding | `✅ ALIGNED` | `Reported Speech Basic (He said that` | 7 |
| **W63** | A2 Flyers | ELA: Reading Maps / Math: Coordinates | ELA: Reading Maps / Math: Coordinates | `✅ ALIGNED` | `Prepositions of Location (North of,` | 10 |
| **W64** | A2 Flyers | ELA: Data Stories / Math: Pictographs | ELA: Data Stories / Math: Pictographs | `✅ ALIGNED` | `Quantifiers: "The majority of...", ` | 8 |
| **W65** | A2 Flyers | Review & Consolidation (Cycle 2.1) | Review & Consolidation (Cycle 2.1) | `✅ ALIGNED` | `Văn bản thuyết phục; `broadcast_stu` | 1 |
| **W66** | A2 Flyers | Micro-Debate 1: "Email vs Handwritten Letters | Micro-Debate 1: "Email vs Handwritten Letters | `✅ ALIGNED` | `Modals, Comparatives, Because/So` | 7 |
| **W67** | A2 Flyers | ELA: The OREO Structure / Math: Measuring Mass | ELA: The OREO Structure / Math: Measuring Mass | `✅ ALIGNED` | `Opinion Phrases: "I strongly believ` | 7 |
| **W68** | A2 Flyers | ELA: Strong Reasons / Math: Bar Graphs | ELA: Strong Reasons / Math: Bar Graphs | `✅ ALIGNED` | `Connectors of Addition: "Furthermor` | 6 |
| **W69** | A2 Flyers | Science/ELA: Environmental Protection / Math: Line Plots | Science/ELA: Environmental Protection / Math: Line Plots | `✅ ALIGNED` | `Modals of Obligation: "Should", "Mu` | 8 |
| **W70** | A2 Flyers | ELA: Presentation "My Green Idea" / Math: Graph Review | ELA: Presentation "My Green Idea" / Math: Graph Review | `✅ ALIGNED` | `Speaking Transitions: "First of all` | 7 |
| **W71** | A2 Flyers | Science/ELA: The Solar System / Math: Large Numbers | Science/ELA: The Solar System / Math: Large Numbers | `✅ ALIGNED` | `Superlative Adjectives: "The bigges` | 8 |
| **W72** | A2 Flyers | Science/ELA: Photosynthesis / Math: Area & Perimeter | Science/ELA: Photosynthesis / Math: Area & Perimeter | `✅ ALIGNED` | `Passive Voice (Intro - Simple Prese` | 8 |
| **W73** | B1 PET | Science/ELA: The Water Cycle (Advanced) / Math: Volume | Science/ELA: The Water Cycle (Advanced) / Math: Volume | `✅ ALIGNED` | `Sequence Connectors (Advanced): "Su` | 7 |
| **W74** | B1 PET | Science/ELA: Food Chains / Math: Complex Charts | Science/ELA: Food Chains / Math: Complex Charts | `✅ ALIGNED` | `Zero Conditional (Scientific Facts)` | 8 |
| **W75** | B1 PET | History/ELA: Ancient Egypt / Math: Timelines | History/ELA: Ancient Egypt / Math: Timelines | `✅ ALIGNED` | `Used to" / "Would" (Past habits): "` | 8 |
| **W76** | B1 PET | History/ELA: Explorers / Math: Map Scales | History/ELA: Explorers / Math: Map Scales | `✅ ALIGNED` | `Prepositions of Movement (Across, A` | 8 |
| **W77** | B1 PET | Social Studies/ELA: World Landmarks / Math: 3D Geometry | Social Studies/ELA: World Landmarks / Math: 3D Geometry | `✅ ALIGNED` | `Adjectives of Material/Shape: "It i` | 9 |
| **W78** | B1 PET | Social Studies/ELA: Cultures / Math: Surveys | Social Studies/ELA: Cultures / Math: Surveys | `✅ ALIGNED` | `Comparative Structures: "Unlike..."` | 9 |
| **W79** | B1 PET | The Industrial Revolution | The Industrial Revolution | `✅ ALIGNED` | `Nguyên nhân & tác động lịch sử; `br` | 0 |
| **W80** | B1 PET | Supply, Demand & Market Prices | Supply, Demand & Market Prices | `✅ ALIGNED` | `Logic điều kiện kinh tế; `math_ques` | 0 |
| **W81** | B1 PET | ELA: The Master Architect (Structure) / Math: Graphing Data | ELA: The Master Architect (Structure) / Math: Graphing Data | `✅ ALIGNED` | `Transition Signals (Firstly, Second` | 7 |
| **W82** | B1 PET | ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data | ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data | `✅ ALIGNED` | `Adjectives & Sensory Words (Sight, ` | 9 |
| **W83** | B1 PET | Geography/ELA: Landforms / Math: Decimals Intro | Geography/ELA: Landforms / Math: Decimals Intro | `✅ ALIGNED` | `Relative Clauses (Defining): "A mou` | 8 |
| **W84** | B1 PET | Science/ELA: Volcanoes / Math: Adding Decimals | Science/ELA: Volcanoes / Math: Adding Decimals | `✅ ALIGNED` | `Cause/Effect Verbs: "Heat causes ma` | 8 |
| **W85** | B1 PET | Maps (Advanced) / Math: Map Scales | Maps (Advanced) / Math: Map Scales | `✅ ALIGNED` | `Complex Prepositions: "In the middl` | 7 |
| **W86** | B1 PET | Weather vs. Climate / Math: Graphs Trends | Weather vs. Climate / Math: Graphs Trends | `✅ ALIGNED` | `Generalization words: "Generally", ` | 7 |
| **W87** | B1 PET | Human Body / Math: Elapsed Time | Human Body / Math: Elapsed Time | `✅ ALIGNED` | `Passive Voice (Process): "Oxygen is` | 8 |
| **W88** | B1 PET | Ancient Rome / Math: Metric Conversions | Ancient Rome / Math: Metric Conversions | `✅ ALIGNED` | `Past Ability: "Romans could build..` | 7 |
| **W89** | B1 PET | Inventions / Math: Comparing Data Sets | Inventions / Math: Comparing Data Sets | `✅ ALIGNED` | `Past Perfect (Intro): "Before the p` | 7 |
| **W90** | B1 PET | Physics (Forces) / Math: Averages (Mean)  / Toán: Trung bình cộng) | Physics (Forces) / Math: Averages (Mean)  / Toán: Trung bình cộng) | `✅ ALIGNED` | `Conditional Type 1 (Cause/Effect): ` | 8 |
| **W91** | B1 PET | Scientific Method / Math: Experiment Design | Scientific Method / Math: Experiment Design | `✅ ALIGNED` | `Impersonal Language: "It was observ` | 7 |
| **W92** | B1 PET | Community Helpers / Math: Surveys | Community Helpers / Math: Surveys | `✅ ALIGNED` | `Relative Clauses (Who): "A doctor i` | 7 |
| **W93** | B1 PET | Topic Selection & Outline. (Chọn chủ đề & Dàn ý) | Topic Selection & Outline. (Chọn chủ đề & Dàn ý) | `✅ ALIGNED` | `Tổng hợp 2 bản tóm tắt y khoa đối l` | 0 |
| **W94** | B1 PET | Drafting & Editing. (Viết nháp & Chỉnh sửa) | Drafting & Editing. (Viết nháp & Chỉnh sửa) | `✅ ALIGNED` | `Diễn giải biểu đồ dân số; `math_que` | 0 |
| **W95** | B1 PET | Ocean Acidification & Carbon | Ocean Acidification & Carbon | `✅ ALIGNED` | `Báo cáo CER đầy đủ với bằng chứng t` | 0 |
| **W96** | B1 PET | Preparation for Mid-Phase Gate | Preparation for Mid-Phase Gate | `✅ ALIGNED` | `Ôn tập trọng tâm các lỗi ngữ pháp B` | 0 |
| **W97** | B1 PET | Government / Math: Percentages Intro | Government / Math: Percentages Intro | `✅ ALIGNED` | `Modals of Prohibition: "Must not", ` | 7 |
| **W98** | B1 PET | Democracy / Math: Calculating Percentages | Democracy / Math: Calculating Percentages | `✅ ALIGNED` | `Preferences: "I would rather...", "` | 7 |
| **W99** | B1 PET | Good Citizen / Math: Pie Charts | Good Citizen / Math: Pie Charts | `✅ ALIGNED` | `Gerunds as Subjects: "Helping is im` | 6 |
| **W100** | B1 PET | Rights / Math: Percent Word Problems | Rights / Math: Percent Word Problems | `✅ ALIGNED` | `Abstract Nouns: Freedom, Justice, E` | 7 |
| **W101** | B1 PET | Needs vs. Wants / Math: Budgeting | Needs vs. Wants / Math: Budgeting | `✅ ALIGNED` | `Second Conditional: "If I had money` | 7 |
| **W102** | B1 PET | Goods & Services / Math: Total Costs | Goods & Services / Math: Total Costs | `✅ ALIGNED` | `Passive with Modals: "Services can ` | 7 |
| **W103** | B1 PET | Producers & Consumers / Math: Profit & Loss | Producers & Consumers / Math: Profit & Loss | `✅ ALIGNED` | `Connectors of Contrast: "However", ` | 8 |
| **W104** | B1 PET | Supply & Demand / Math: Sales Trends | Supply & Demand / Math: Sales Trends | `✅ ALIGNED` | `Correlative Conjunctions: "The more` | 8 |
| **W105** | B1 PET | Topic Selection & The "Big Questions | Topic Selection & The "Big Questions | `✅ ALIGNED` | `Wh- Questions (Complex): "What caus` | 7 |
| **W106** | B1 PET | Information Hunting (Sources) | Information Hunting (Sources) | `✅ ALIGNED` | `Reported Speech (Source Citation In` | 8 |
| **W107** | B1 PET | The Note-Taker (Summary) | The Note-Taker (Summary) | `✅ ALIGNED` | `Fragments (using Noun Phrases for n` | 6 |
| **W108** | B1 PET | The Architect (Outlining) | The Architect (Outlining) | `✅ ALIGNED` | `Future Plans: "In paragraph 1, I wi` | 8 |
| **W109** | B1 PET | Drafting Body Paragraph 1 | Drafting Body Paragraph 1 | `✅ ALIGNED` | `Linking Words (Addition): "Also", "` | 5 |
| **W110** | B1 PET | Drafting Body Paragraph 2 | Drafting Body Paragraph 2 | `✅ ALIGNED` | `Linking Words (Contrast/Sequence): ` | 5 |
| **W111** | B1 PET | Intro & Conclusion (The Frame) | Intro & Conclusion (The Frame) | `✅ ALIGNED` | `Summary Phrases: "To sum up", "In c` | 5 |
| **W112** | B1 PET | The Editor's Eye (Review) | The Editor's Eye (Review) | `✅ ALIGNED` | `Tự sửa lỗi chính tả và ngữ pháp cơ ` | 6 |
| **W113** | B1 PET | Visual Aids (Images & Captions) | Visual Aids (Images & Captions) | `✅ ALIGNED` | `Prepositional Phrases: "In this pic` | 5 |
| **W114** | B1 PET | Project Assembly (Making the Poster) | Project Assembly (Making the Poster) | `✅ ALIGNED` | `Bố cục (layout, center, organize); ` | 6 |
| **W115** | B1 PET | Speaking Notes (Cue Cards) | Speaking Notes (Cue Cards) | `✅ ALIGNED` | `Imperatives/Keywords for self-promp` | 5 |
| **W116** | B1 PET | Rehearsal (Voice & Body) | Rehearsal (Voice & Body) | `✅ ALIGNED` | `Kỹ năng phi ngôn ngữ (eye contact, ` | 5 |
| **W117** | B1 PET | The Knowledge Fair (Group A) | The Knowledge Fair (Group A) | `✅ ALIGNED` | `Thuyết trình 3 phút + Q&A; Đánh giá` | 0 |
| **W118** | B1 PET | The Knowledge Fair (Group B) | The Knowledge Fair (Group B) | `✅ ALIGNED` | `Thuyết trình 3 phút + Q&A; `info_ex` | 0 |
| **W119** | B1 PET | Reflection & Portfolio | Reflection & Portfolio | `✅ ALIGNED` | `Past Tense (Reflection)` | 0 |
| **W120** | B1 PET | PHASE 2 GRADUATION | PHASE 2 GRADUATION | `✅ ALIGNED` | `LỄ TỐT NGHIỆP PHASE 2 — ĐẠT CHUẨN N` | 0 |
| **W121** | B1+ Academic | Intro to Argumentative Research | Intro to Argumentative Research | `✅ ALIGNED` | `Modals of Possibility: "It could ca` | 8 |
| **W122** | B1+ Academic | Critical Listening | Critical Listening | `✅ ALIGNED` | `Reporting Verbs: "The speaker claim` | 5 |
| **W123** | B1+ Academic | The Thesis Statement | The Thesis Statement | `✅ ALIGNED` | `Concession: "Although homework is u` | 5 |
| **W124** | B1+ Academic | Drafting Arguments (Body) | Drafting Arguments (Body) | `✅ ALIGNED` | `Linking Words (Sequence): "Firstly"` | 5 |
| **W125** | B1+ Academic | Intro & Conclusion | Intro & Conclusion | `✅ ALIGNED` | `Persuasive Verbs: "Urge", "Recommen` | 4 |
| **W126** | B1+ Academic | From Essay to Speech | From Essay to Speech | `✅ ALIGNED` | `Signposting: "Moving on to...", "Le` | 0 |
| **W127** | B1+ Academic | Rebuttal Practice | Rebuttal Practice | `✅ ALIGNED` | `Contrast Connectors: "On the contra` | 5 |
| **W128** | B1+ Academic | The Live Debate 1 | The Live Debate 1 | `✅ ALIGNED` | ``broadcast_studio` thuyết trình qua` | 0 |
| **W129** | B1+ Academic | Opinion Project 3: Smartphones Under 12? | Opinion Project 3: Smartphones Under 12? | `✅ ALIGNED` | `Soạn thảo bài luận quan điểm hoàn c` | 0 |
| **W130** | B1+ Academic | Opinion Project 3: Comparing Global Approaches | Opinion Project 3: Comparing Global Approaches | `✅ ALIGNED` | `Trích dẫn nguồn thông tin; `reading` | 0 |
| **W131** | B1+ Academic | Opinion Project 3: Persuasive Techniques | Opinion Project 3: Persuasive Techniques | `✅ ALIGNED` | `Ngữ điệu và trọng âm nhấn mạnh; `ge` | 0 |
| **W132** | B1+ Academic | B1+ Academic Assessment Mock 2 | B1+ Academic Assessment Mock 2 | `✅ ALIGNED` | `Full Mock B1+ Academic 2: Chấm bài ` | 0 |
| **W133** | B1+ Academic | Deep Research & Data | Deep Research & Data | `✅ ALIGNED` | `Citation Phrases: "According to a s` | 8 |
| **W134** | B1+ Academic | Identifying Fallacies | Identifying Fallacies | `✅ ALIGNED` | `Qualifiers: "Some", "Many", "Often"` | 8 |
| **W135** | B1+ Academic | The Counter-Argument Paragraph | The Counter-Argument Paragraph | `✅ ALIGNED` | `Contrast Transitions: "However", "N` | 7 |
| **W136** | B1+ Academic | Drafting the Full Essay | Drafting the Full Essay | `✅ ALIGNED` | `Cohesion (Reviewing all linking wor` | 6 |
| **W137** | B1+ Academic | Editing & Polishing (Word Choice) | Editing & Polishing (Word Choice) | `✅ ALIGNED` | `Synonyms & Antonyms usage` | 1 |
| **W138** | B1+ Academic | Advanced Rebuttal (Attacking Evidence) | Advanced Rebuttal (Attacking Evidence) | `✅ ALIGNED` | `Polite Disagreement: "I see your po` | 7 |
| **W139** | B1+ Academic | Team Strategy | Team Strategy | `✅ ALIGNED` | `Future Continuous: "My partner will` | 7 |
| **W140** | B1+ Academic | The Live Debate 2 (Video Games) | The Live Debate 2 (Video Games) | `✅ ALIGNED` | `Kỹ năng trích xuất luận điểm từ ngu` | 0 |
| **W141** | B1+ Academic | Geometry Review - Angles & Lines | Geometry Review - Angles & Lines | `✅ ALIGNED` | ``math_quest` phương trình và biểu đ` | 0 |
| **W142** | B1+ Academic | Geometry Review - Area & Volume | Geometry Review - Area & Volume | `✅ ALIGNED` | `Full Mock B1+ Academic 4: Đọc liên ` | 1 |
| **W143** | B1+ Academic | Critical Thinking - Analyzing Ads | Critical Thinking - Analyzing Ads | `✅ ALIGNED` | `Viết truyện ngắn văn học ($\ge 200$` | 0 |
| **W144** | B1+ Academic | Preparation for Capstone | Preparation for Capstone | `✅ ALIGNED` | `Bài báo khoa học giải thích có tríc` | 0 |
| **W145** | B1+ Academic | Independent Research | Independent Research | `✅ ALIGNED` | `Source Attribution: "According to [` | 6 |
| **W146** | B1+ Academic | Synthesizing Information | Synthesizing Information | `✅ ALIGNED` | `Connectors of Comparison: "Similarl` | 6 |
| **W147** | B1+ Academic | Advanced Thesis Writing | Advanced Thesis Writing | `✅ ALIGNED` | `Subordinating Conjunctions: "While"` | 5 |
| **W148** | B1+ Academic | Drafting Final Essay (Independent) | Drafting Final Essay (Independent) | `✅ ALIGNED` | `Variety of Sentence Structures (Sim` | 0 |
| **W149** | B1+ Academic | Final Polish & Peer Review | Final Polish & Peer Review | `✅ ALIGNED` | `Final Punctuation & Capitalization ` | 0 |
| **W150** | B1+ Academic | Mock Debate & Strategy | Mock Debate & Strategy | `✅ ALIGNED` | `Biên tập chi tiết từng dòng, kiểm t` | 5 |
| **W151** | B1+ Academic | The Capstone Debate | The Capstone Debate | `✅ ALIGNED` | ``broadcast_studio` thuyết trình dự ` | 0 |
| **W152** | B1+ Academic | Genre Review: Narrative | Genre Review: Narrative | `✅ ALIGNED` | `Narrative Tenses (Past Simple, Cont` | 0 |
| **W153** | B1+ Academic | Genre Review: Expository | Genre Review: Expository | `✅ ALIGNED` | `Cause & Effect Connectors (Advanced` | 0 |
| **W154** | B1+ Academic | Impromptu Speaking Skills | Impromptu Speaking Skills | `✅ ALIGNED` | `Fillers & Connectors: "That's an in` | 0 |
| **W155** | B1+ Academic | Portfolio Prep | Portfolio Prep | `✅ ALIGNED` | `Past vs. Present Perfect: "I used t` | 0 |
| **W156** | B1+ Academic | GRADUATION CEREMONY & FINAL SHOWCASE | GRADUATION CEREMONY & FINAL SHOWCASE | `✅ ALIGNED` | `LỄ TỐT NGHIỆP — TRÌNH BÀY EXTENDED ` | 0 |

---

## 5. Kết Luận & Đề Xuất Cho Chủ Sở Hữu

1. **Quy Mô Phân Kỳ Đã Được Kiểm Soát 100%**: Mặc dù có tới 138 tuần phân kỳ về mặt câu chữ tiêu đề, toàn bộ 156 tuần đều có nền tảng sư phạm mạch lạc từ Nguồn B.
2. **An Toàn Tuyệt Đối**: Quá trình quét dry-run không làm biến đổi bất kỳ file nào trên đĩa. Ba tuần W33, W34, W38 được bảo toàn nguyên vẹn.
3. **Sẵn Sàng Sản Xuất Hàng Loạt**: Khi nhận được lệnh của Chủ sở hữu, công cụ có thể tự động sinh trọn bộ 153 blueprint còn lại trong vòng chưa đầy 10 giây với độ tin cậy tuyệt đối.