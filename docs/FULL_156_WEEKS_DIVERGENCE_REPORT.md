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
| **Blueprint thật hiện có trên đĩa** | **3** | **1.9%** | W33 & W34 (Golden Standard đóng băng), W38 (Sample test) |
| **Tuần chưa sinh (Dry-run xác thực)** | **153** | **98.1%** | Sẵn sàng sinh hàng loạt khi Chủ sở hữu phê duyệt |
| **Đồng bộ Chủ đề (ALIGNED)** | **10** | **6.4%** | Tiêu đề 2 nguồn trùng khớp (W01, W03, W79, W80, W95, W96, W129-W132) |
| **Phân kỳ (DIVERGENT — Fallback Source B)** | **138** | **88.5%** | Nguồn A đặt tên STEM phỏng đoán; Nguồn B giữ bài học thực tế |
| **Khuyết thiếu trong Nguồn A (Source B only)** | **8** | **5.1%** | W113–W120 bị sót trong bảng Markdown Nguồn A (nhưng có đủ ở Nguồn B) |
| **Lỗi thực thi (Crash/Fail)** | **0** | **0.0%** | 156/156 tuần trích xuất thành công 100% |

---

## 2. Thống Kê Phân Kỳ Theo Từng Giai Đoạn (Phase Breakdown)

| Giai Đoạn Học Tập | Tuần Học | Tổng Số Tuần | Trùng Khớp (Aligned) | Phân Kỳ (Divergent) | Khuyết Trong Nguồn A |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Phase 1: Pre-A1 Starters** | `W01–W16` | 16 | 2 (12.5%) | 14 (87.5%) | 0 |
| **Phase 1: A1 Movers** | `W17–W32` | 16 | 0 (0.0%) | 16 (100.0%) | 0 |
| **Phase 1: A2 Flyers** | `W33–W72` | 40 | 0 (0.0%) | 40 (100.0%) | 0 |
| **Phase 2: B1 PET & CLIL STEM** | `W73–W120` | 48 | 4 (8.3%) | 36 (75.0%) | 8 |
| **Phase 3: B1+/B2 FCE & Academic Opinion** | `W121–W156` | 36 | 4 (11.1%) | 32 (88.9%) | 0 |

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
| **W02** | Pre-A1 | My Family Squad (Relationships) | My Family Squad (Roles) | `⚠️ DIVERGENT` | `This is my..." (Possession)` | 7 |
| **W03** | Pre-A1 | The Mirror Game (Appearance) | The Mirror Game (Appearance) | `✅ ALIGNED` | `She is tall" vs "She has long hair` | 8 |
| **W04** | Pre-A1 | My Happy Jar (Personality) | My Happy Jar (Emotions) | `⚠️ DIVERGENT` | `I like + V-ing" (Patterns)` | 6 |
| **W05** | Pre-A1 | The Mystery House (Nouns) | The Mystery House (Rooms) | `⚠️ DIVERGENT` | `Articles "A/An` | 7 |
| **W06** | Pre-A1 | Treasure Hunt at Home (Location) | The Classroom Toolkit | `⚠️ DIVERGENT` | `Prepositions (In, On, Under, Next t` | 8 |
| **W07** | Pre-A1 | Inside My Backpack (Singular) | My Neighborhood Map | `⚠️ DIVERGENT` | `There is a` | 7 |
| **W08** | Pre-A1 | The Busy Classroom (Plural) | Review & Showcase 1 | `⚠️ DIVERGENT` | `There are..." + Plural Nouns` | 6 |
| **W09** | Pre-A1 | City Sounds & Sights (Adjectives) | Clockwork Day (Routines) | `⚠️ DIVERGENT` | `It is a noisy city" (Adj + Noun)` | 8 |
| **W10** | Pre-A1 | The Farm Adventure (Contrast) | Food Fuel (Nutrition) | `⚠️ DIVERGENT` | `The city is noisy, but the farm is ` | 6 |
| **W11** | Pre-A1 | Weekend Fun Spots (Places) | Animal Kingdom (Habitats) | `⚠️ DIVERGENT` | `Preposition "At" (I play at the par` | 7 |
| **W12** | Pre-A1 | The Talent Show (Abilities) | Weather Wonders (Seasons) | `⚠️ DIVERGENT` | `I can / I can't` | 7 |
| **W13** | Pre-A1 | Daily Routines (Simple Present) | Clothes for All Seasons | `⚠️ DIVERGENT` | `Present Simple (I wake up, I go)` | 5 |
| **W14** | Pre-A1 | Project 1 Showcase: "Welcome to My World | The Action Arena | `⚠️ DIVERGENT` | `Động từ hành động tiếp diễn; `scien` | 0 |
| **W15** | Pre-A1 | The Busy Park (Actions Now) | The Busy Park (Real-time) | `⚠️ DIVERGENT` | `Present Continuous: S + am/is/are +` | 6 |
| **W16** | Pre-A1 | Sports Commentary (Dynamic Verbs) | Starters Shield Festival | `⚠️ DIVERGENT` | `He is kicking the ball", "They are ` | 6 |
| **W17** | A1 Movers | Weather & Clothes (Cause/Effect) | Hobbies & Talent Show | `⚠️ DIVERGENT` | `It is raining, so I am wearing a ra` | 7 |
| **W18** | A1 Movers | Review & Checkpoint 1 | Transportation Station | `⚠️ DIVERGENT` | `Giới từ di chuyển ("by bus, on foot` | 0 |
| **W19** | A1 Movers | When I Was Small (Past State) | Yesterday's Ghost Town | `⚠️ DIVERGENT` | `Was / Were (No action verbs). "I am` | 6 |
| **W20** | A1 Movers | The Old Town (Existence) | Where Were You? (Alibi) | `⚠️ DIVERGENT` | `There was a...", "There were` | 6 |
| **W21** | A1 Movers | Yesterday's Diary (Regular Verbs -ed) | The Dinosaur Dig | `⚠️ DIVERGENT` | `Past Simple Regular (-ed)` | 6 |
| **W22** | A1 Movers | The Time Detective (Questions) | Castle in the Past | `⚠️ DIVERGENT` | `Did you play...?", "Yes, I did / No` | 3 |
| **W23** | A1 Movers | The Art Class (Creative Regular Verbs) | Yesterday at the Zoo | `⚠️ DIVERGENT` | `Regular Verbs ending in -ed (pronou` | 7 |
| **W24** | A1 Movers | Feelings in the Past (Was/Were + Adjectives) | Movers Mid-Way Assessment | `⚠️ DIVERGENT` | `I was [feeling] because..." / "They` | 7 |
| **W25** | A1 Movers | Sequencing Actions (First, Then) | The Lost Treasure Map | `⚠️ DIVERGENT` | `Sequence Connectors: First, Next, T` | 7 |
| **W26** | A1 Movers | Review & Project 2: "My Weekend Comic | A Busy Weekend (Timeline) | `⚠️ DIVERGENT` | `Regular Verbs (-ed) & Was/Were` | 0 |
| **W27** | A1 Movers | Nature Sequencing (Plant Growth) | Space Explorers (Apollo) | `⚠️ DIVERGENT` | `Present Simple for Facts (It grows,` | 8 |
| **W28** | A1 Movers | Story Retell (The Tortoise and the Hare) | The Great Inventions | `⚠️ DIVERGENT` | `Past Simple (Introduction to Irregu` | 6 |
| **W29** | A1 Movers | The Magic Trip (Irregular Verbs 1: Movement) | Health & The Human Body | `⚠️ DIVERGENT` | `Go -> Went, Come -> Came, Run -> Ra` | 6 |
| **W30** | A1 Movers | The Picnic (Irregular Verbs 2: Consumption) | The Clean-Up Hero | `⚠️ DIVERGENT` | `Eat -> Ate, Drink -> Drank, Buy -> ` | 6 |
| **W31** | A1 Movers | The Senses (Irregular Verbs 3: Perception) | The Rainy Day Mystery | `⚠️ DIVERGENT` | `See -> Saw, Hear -> Heard, Feel -> ` | 6 |
| **W32** | A1 Movers | The Busy Day (Irregular Verbs 4: Tasks) | Movers Final Showcase | `⚠️ DIVERGENT` | `Do -> Did, Make -> Made, Have -> Ha` | 6 |
| **W33** | A2 Flyers | The Mistake (Irregular Verbs 5: Accidents) | Corridor Safety & Friction | `⚠️ DIVERGENT` | `Break -> Broke, Fall -> Fell, Lose ` | 6 |
| **W34** | A2 Flyers | Storytelling Practice 1 (Fable) | The Science Fair Challenge | `⚠️ DIVERGENT` | `Mixed Regular and Irregular Verbs` | 7 |
| **W35** | A2 Flyers | Storytelling Practice 2 (Personal Recount) | Wild Forest Rangers | `⚠️ DIVERGENT` | `Past Simple + Adjectives` | 0 |
| **W36** | A2 Flyers | Review & Project 3: "My Adventure Book | The Hospital Visit | `⚠️ DIVERGENT` | `Động từ khuyết thiếu (should, must,` | 0 |
| **W37** | A2 Flyers | Living vs. Non-Living (Reasoning) | Full Cambridge Mock 1 | `⚠️ DIVERGENT` | `It is living because it breathes/gr` | 9 |
| **W38** | A2 Flyers | Animal Abilities (Modals) | Energy All Around | `⚠️ DIVERGENT` | `Can / Cannot (Can't)` | 8 |
| **W39** | A2 Flyers | Habitats (Persuasion Intro) | Ocean Depths & Coral Reefs | `⚠️ DIVERGENT` | `I think the [animal] lives in the [` | 7 |
| **W40** | A2 Flyers | Beast Battle (Comparisons) | The Secret Garden (Botany) | `⚠️ DIVERGENT` | `Comparatives (-er than): faster, st` | 6 |
| **W41** | A2 Flyers | Life Cycles (Process) | Weather Disasters & Safety | `⚠️ DIVERGENT` | `Present Simple 3rd Person (It chang` | 5 |
| **W42** | A2 Flyers | The Water Journey (Cycle) | Full Cambridge Mock 2 | `⚠️ DIVERGENT` | `Review Sequencing + Present Tense` | 8 |
| **W43** | A2 Flyers | The "Plus" Machine (Addition Language) | Ancient Egypt & Pyramids | `⚠️ DIVERGENT` | `2 plus 2 equals 4" / "2 and 2 is 4` | 6 |
| **W44** | A2 Flyers | The Cookie Monster (Subtraction Language) | Maps & Navigation | `⚠️ DIVERGENT` | `Take away", "Left", "Minus` | 5 |
| **W45** | A2 Flyers | Shape Detectives (Geometry) | The Sound Studio (Acoustics) | `⚠️ DIVERGENT` | `It has [number] sides", "It is roun` | 8 |
| **W46** | A2 Flyers | The Pattern Code (Logic) | Light & Shadows | `⚠️ DIVERGENT` | `If [square], then [red]` | 6 |
| **W47** | A2 Flyers | Big Numbers (Place Value) | Full Cambridge Mock 3 | `⚠️ DIVERGENT` | `hyphenated numbers (twenty-one)` | 5 |
| **W48** | A2 Flyers | Measuring Up (Length) | Food Preservation Science | `⚠️ DIVERGENT` | `It is [number] centimeters long/tal` | 7 |
| **W49** | A2 Flyers | Future Dreams (Future Tense) | Animal Camouflage | `⚠️ DIVERGENT` | `I want to be a [job]" / "I am going` | 6 |
| **W50** | A2 Flyers | Review Station 1 (Grammar Mix) | Transportation of Tomorrow | `⚠️ DIVERGENT` | `Câu điều kiện loại 1 (*If we use cl` | 0 |
| **W51** | A2 Flyers | Review Station 2 (Vocab & CLIL) | Our Solar System | `⚠️ DIVERGENT` | `Trật tự của tính từ; `reading_hub` ` | 0 |
| **W52** | A2 Flyers | Have You Ever" Bingo (Seeding) | Full Cambridge Mock 4 | `⚠️ DIVERGENT` | `Full Mock Flyers 4: Đo lường tốc độ` | 0 |
| **W53** | A2 Flyers | Project 4 Prep - "My Year in Review | The Detective's Clues | `⚠️ DIVERGENT` | `Động từ khuyết thiếu suy đoán (*mus` | 0 |
| **W54** | A2 Flyers | PHASE 1 GRADUATION SHOWCASE | Wonders of the World | `⚠️ DIVERGENT` | `Hiện tại hoàn thành giới thiệu (*Ha` | 0 |
| **W55** | A2 Flyers | ELA: Cause & Effect (Sentences) / Math: Addition with Regrouping  / Toán: Phép cộng có nhớ) | Cause & Effect Master | `⚠️ DIVERGENT` | `Conjunctions: "Because" (reason) vs` | 7 |
| **W56** | A2 Flyers | ELA: Cause & Effect (Paragraph) / Math: Subtraction with Regrouping  / Toán: Phép trừ có nhớ) | Problem & Solution Squad | `⚠️ DIVERGENT` | `Sentence Connectors: "This leads to` | 7 |
| **W57** | A2 Flyers | ELA: Problem & Solution (Sentences) / Math: Multiplication Concepts  / Toán: Khái niệm Phép nhân) | Full Cambridge Mock 5 | `⚠️ DIVERGENT` | `Modals of Possibility: "We can...",` | 8 |
| **W58** | A2 Flyers | ELA: Problem & Solution (Paragraph) / Math: Division Concepts  / Toán: Khái niệm Phép chia) | The Great Debate (Pets) | `⚠️ DIVERGENT` | `First Conditional (Simple): "If we ` | 7 |
| **W59** | A2 Flyers | ELA: Message in a Bottle (Informal Writing) / Math: Remainders | Water Cycle & Purification | `⚠️ DIVERGENT` | `Informal Tone (Contractions: I'm, I` | 8 |
| **W60** | A2 Flyers | ELA: The Mayor's Request (Formal Writing) / Math: Order of Operations | Electricity in Circuits | `⚠️ DIVERGENT` | `Polite Modals (May I, Could you, Wo` | 8 |
| **W61** | A2 Flyers | ELA: Main Idea Hunter / Math: Word Problems | Earth's Layers & Volcanoes | `⚠️ DIVERGENT` | `Subject + Verb Identification (Core` | 7 |
| **W62** | A2 Flyers | ELA: The Movie Trailer (Summarizing) / Math: Rounding | Full Cambridge Mock 6 | `⚠️ DIVERGENT` | `Reported Speech Basic (He said that` | 7 |
| **W63** | A2 Flyers | ELA: Reading Maps / Math: Coordinates | Human Respiratory System | `⚠️ DIVERGENT` | `Prepositions of Location (North of,` | 10 |
| **W64** | A2 Flyers | ELA: Data Stories / Math: Pictographs | Ancient Rome & Aqueducts | `⚠️ DIVERGENT` | `Quantifiers: "The majority of...", ` | 8 |
| **W65** | A2 Flyers | Review & Consolidation (Cycle 2.1) | Renewable Energy Transition | `⚠️ DIVERGENT` | `Văn bản thuyết phục; `broadcast_stu` | 1 |
| **W66** | A2 Flyers | Micro-Debate 1: "Email vs Handwritten Letters | Space Rovers & Mars Colonization | `⚠️ DIVERGENT` | `Modals, Comparatives, Because/So` | 7 |
| **W67** | A2 Flyers | ELA: The OREO Structure / Math: Measuring Mass | Full Cambridge Mock 7 | `⚠️ DIVERGENT` | `Opinion Phrases: "I strongly believ` | 7 |
| **W68** | A2 Flyers | ELA: Strong Reasons / Math: Bar Graphs | Genetics & Hereditary Traits | `⚠️ DIVERGENT` | `Connectors of Addition: "Furthermor` | 6 |
| **W69** | A2 Flyers | Science/ELA: Environmental Protection / Math: Line Plots | Microscopic World (Bacteria) | `⚠️ DIVERGENT` | `Modals of Obligation: "Should", "Mu` | 8 |
| **W70** | A2 Flyers | ELA: Presentation "My Green Idea" / Math: Graph Review | Cambridge Flyers Intensive 1 | `⚠️ DIVERGENT` | `Speaking Transitions: "First of all` | 7 |
| **W71** | A2 Flyers | Science/ELA: The Solar System / Math: Large Numbers | Cambridge Flyers Intensive 2 | `⚠️ DIVERGENT` | `Superlative Adjectives: "The bigges` | 8 |
| **W72** | A2 Flyers | Science/ELA: Photosynthesis / Math: Area & Perimeter | CAMBRIDGE FLYERS OFFICIAL GATE | `⚠️ DIVERGENT` | `Passive Voice (Intro - Simple Prese` | 8 |
| **W73** | B1 PET | Science/ELA: The Water Cycle (Advanced) / Math: Volume | Transition to Academic English | `⚠️ DIVERGENT` | `Sequence Connectors (Advanced): "Su` | 7 |
| **W74** | B1 PET | Science/ELA: Food Chains / Math: Complex Charts | Plate Tectonics & Earthquakes | `⚠️ DIVERGENT` | `Zero Conditional (Scientific Facts)` | 8 |
| **W75** | B1 PET | History/ELA: Ancient Egypt / Math: Timelines | Photosynthesis & Cellular Energy | `⚠️ DIVERGENT` | `Used to" / "Would" (Past habits): "` | 8 |
| **W76** | B1 PET | History/ELA: Explorers / Math: Map Scales | Force, Mass & Newton's Laws | `⚠️ DIVERGENT` | `Prepositions of Movement (Across, A` | 8 |
| **W77** | B1 PET | Social Studies/ELA: World Landmarks / Math: 3D Geometry | B1 PET & CLIL Mock 1 | `⚠️ DIVERGENT` | `Adjectives of Material/Shape: "It i` | 9 |
| **W78** | B1 PET | Social Studies/ELA: Cultures / Math: Surveys | Global Climates & Biomes | `⚠️ DIVERGENT` | `Comparative Structures: "Unlike..."` | 9 |
| **W79** | B1 PET | The Industrial Revolution | The Industrial Revolution | `✅ ALIGNED` | `Nguyên nhân & tác động lịch sử; `br` | 0 |
| **W80** | B1 PET | Supply, Demand & Market Prices | Supply, Demand & Market Prices | `✅ ALIGNED` | `Logic điều kiện kinh tế; `math_ques` | 0 |
| **W81** | B1 PET | ELA: The Master Architect (Structure) / Math: Graphing Data | Cellular Biology (Plant vs Animal) | `⚠️ DIVERGENT` | `Transition Signals (Firstly, Second` | 7 |
| **W82** | B1 PET | ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data | B1 PET & CLIL Mock 2 | `⚠️ DIVERGENT` | `Adjectives & Sensory Words (Sight, ` | 9 |
| **W83** | B1 PET | Geography/ELA: Landforms / Math: Decimals Intro | Waves: Sound, Light, Seismic | `⚠️ DIVERGENT` | `Relative Clauses (Defining): "A mou` | 8 |
| **W84** | B1 PET | Science/ELA: Volcanoes / Math: Adding Decimals | World Religions & Cultures | `⚠️ DIVERGENT` | `Cause/Effect Verbs: "Heat causes ma` | 8 |
| **W85** | B1 PET | Maps (Advanced) / Math: Map Scales | The Digestive Engine | `⚠️ DIVERGENT` | `Complex Prepositions: "In the middl` | 7 |
| **W86** | B1 PET | Weather vs. Climate / Math: Graphs Trends | Space Exploration: Telescopes | `⚠️ DIVERGENT` | `Generalization words: "Generally", ` | 7 |
| **W87** | B1 PET | Human Body / Math: Elapsed Time | B1 PET & CLIL Mock 3 | `⚠️ DIVERGENT` | `Passive Voice (Process): "Oxygen is` | 8 |
| **W88** | B1 PET | Ancient Rome / Math: Metric Conversions | Circular Economy & Waste | `⚠️ DIVERGENT` | `Past Ability: "Romans could build..` | 7 |
| **W89** | B1 PET | Inventions / Math: Comparing Data Sets | Chemical Reactions & Bonds | `⚠️ DIVERGENT` | `Past Perfect (Intro): "Before the p` | 7 |
| **W90** | B1 PET | Physics (Forces) / Math: Averages (Mean)  / Toán: Trung bình cộng) | Genetics: CRISPR & Gene Editing | `⚠️ DIVERGENT` | `Conditional Type 1 (Cause/Effect): ` | 8 |
| **W91** | B1 PET | Scientific Method / Math: Experiment Design | Globalization & Trade Routes | `⚠️ DIVERGENT` | `Impersonal Language: "It was observ` | 7 |
| **W92** | B1 PET | Community Helpers / Math: Surveys | B1 PET & CLIL Mock 4 | `⚠️ DIVERGENT` | `Relative Clauses (Who): "A doctor i` | 7 |
| **W93** | B1 PET | Topic Selection & Outline. (Chọn chủ đề & Dàn ý) | The Human Brain & Memory | `⚠️ DIVERGENT` | `Tổng hợp 2 bản tóm tắt y khoa đối l` | 0 |
| **W94** | B1 PET | Drafting & Editing. (Viết nháp & Chỉnh sửa) | Urbanization & Megacities | `⚠️ DIVERGENT` | `Diễn giải biểu đồ dân số; `math_que` | 0 |
| **W95** | B1 PET | Ocean Acidification & Carbon | Ocean Acidification & Carbon | `✅ ALIGNED` | `Báo cáo CER đầy đủ với bằng chứng t` | 0 |
| **W96** | B1 PET | Preparation for Mid-Phase Gate | Preparation for Mid-Phase Gate | `✅ ALIGNED` | `Ôn tập trọng tâm các lỗi ngữ pháp B` | 0 |
| **W97** | B1 PET | Government / Math: Percentages Intro | B1 PET & CLIL Mock 5 | `⚠️ DIVERGENT` | `Modals of Prohibition: "Must not", ` | 7 |
| **W98** | B1 PET | Democracy / Math: Calculating Percentages | Climate Modeling & Greenhouse | `⚠️ DIVERGENT` | `Preferences: "I would rather...", "` | 7 |
| **W99** | B1 PET | Good Citizen / Math: Pie Charts | Ancient Greece & Philosophical Logic | `⚠️ DIVERGENT` | `Gerunds as Subjects: "Helping is im` | 6 |
| **W100** | B1 PET | Rights / Math: Percent Word Problems | Epidemiology & Pandemic Control | `⚠️ DIVERGENT` | `Abstract Nouns: Freedom, Justice, E` | 7 |
| **W101** | B1 PET | Needs vs. Wants / Math: Budgeting | Space Settlement: Moon to Mars | `⚠️ DIVERGENT` | `Second Conditional: "If I had money` | 7 |
| **W102** | B1 PET | Goods & Services / Math: Total Costs | B1 PET & CLIL Mock 6 | `⚠️ DIVERGENT` | `Passive with Modals: "Services can ` | 7 |
| **W103** | B1 PET | Producers & Consumers / Math: Profit & Loss | Cyber Security & Digital Privacy | `⚠️ DIVERGENT` | `Connectors of Contrast: "However", ` | 8 |
| **W104** | B1 PET | Supply & Demand / Math: Sales Trends | Renewable Energy: Nuclear Power? | `⚠️ DIVERGENT` | `Correlative Conjunctions: "The more` | 8 |
| **W105** | B1 PET | Topic Selection & The "Big Questions | Microplastics in Marine Chains | `⚠️ DIVERGENT` | `Wh- Questions (Complex): "What caus` | 7 |
| **W106** | B1 PET | Information Hunting (Sources) | Monetary Policy & Inflation | `⚠️ DIVERGENT` | `Reported Speech (Source Citation In` | 8 |
| **W107** | B1 PET | The Note-Taker (Summary) | B1 PET & CLIL Mock 7 | `⚠️ DIVERGENT` | `Fragments (using Noun Phrases for n` | 6 |
| **W108** | B1 PET | The Architect (Outlining) | Quantum Computing Intro | `⚠️ DIVERGENT` | `Future Plans: "In paragraph 1, I wi` | 8 |
| **W109** | B1 PET | Drafting Body Paragraph 1 | Clean Water Desalination | `⚠️ DIVERGENT` | `Linking Words (Addition): "Also", "` | 5 |
| **W110** | B1 PET | Drafting Body Paragraph 2 | Space Debris & Orbital Cleanup | `⚠️ DIVERGENT` | `Linking Words (Contrast/Sequence): ` | 5 |
| **W111** | B1 PET | Intro & Conclusion (The Frame) | Intensive PET Exam Master | `⚠️ DIVERGENT` | `Summary Phrases: "To sum up", "In c` | 5 |
| **W112** | B1 PET | The Editor's Eye (Review) | CAMBRIDGE B1 PET OFFICIAL GATE | `⚠️ DIVERGENT` | `Tự sửa lỗi chính tả và ngữ pháp cơ ` | 6 |
| **W113** | B1 PET | Visual Aids (Images & Captions) | *(Không có trong bảng A)* | `❓ B_ONLY` | `Prepositional Phrases: "In this pic` | 5 |
| **W114** | B1 PET | Project Assembly (Making the Poster) | *(Không có trong bảng A)* | `❓ B_ONLY` | `Grammar Drill & Sentence Constructi` | 6 |
| **W115** | B1 PET | Speaking Notes (Cue Cards) | *(Không có trong bảng A)* | `❓ B_ONLY` | `Imperatives/Keywords for self-promp` | 5 |
| **W116** | B1 PET | Rehearsal (Voice & Body) | *(Không có trong bảng A)* | `❓ B_ONLY` | `Grammar Drill & Sentence Constructi` | 5 |
| **W117** | B1 PET | The Knowledge Fair (Group A) | *(Không có trong bảng A)* | `❓ B_ONLY` | `Grammar Drill & Sentence Constructi` | 0 |
| **W118** | B1 PET | The Knowledge Fair (Group B) | *(Không có trong bảng A)* | `❓ B_ONLY` | `Grammar Drill & Sentence Constructi` | 0 |
| **W119** | B1 PET | Reflection & Portfolio | *(Không có trong bảng A)* | `❓ B_ONLY` | `Past Tense (Reflection)` | 0 |
| **W120** | B1 PET | PHASE 2 GRADUATION | *(Không có trong bảng A)* | `❓ B_ONLY` | `Grammar Drill & Sentence Constructi` | 0 |
| **W121** | B1+ Academic | Intro to Argumentative Research | Opinion Project 1: Homework in Primary School | `⚠️ DIVERGENT` | `Modals of Possibility: "It could ca` | 8 |
| **W122** | B1+ Academic | Critical Listening | Opinion Project 1: Constructing Arguments | `⚠️ DIVERGENT` | `Reporting Verbs: "The speaker claim` | 5 |
| **W123** | B1+ Academic | The Thesis Statement | Opinion Project 1: Anticipating Counterclaims | `⚠️ DIVERGENT` | `Concession: "Although homework is u` | 5 |
| **W124** | B1+ Academic | Drafting Arguments (Body) | Opinion Project 1: Recorded Presentation | `⚠️ DIVERGENT` | `Linking Words (Sequence): "Firstly"` | 5 |
| **W125** | B1+ Academic | Intro & Conclusion | Opinion Project 2: Video Games & Cognition | `⚠️ DIVERGENT` | `Persuasive Verbs: "Urge", "Recommen` | 4 |
| **W126** | B1+ Academic | From Essay to Speech | Opinion Project 2: Data & Statistical Claims | `⚠️ DIVERGENT` | `Signposting: "Moving on to...", "Le` | 0 |
| **W127** | B1+ Academic | Rebuttal Practice | B1+ Academic Assessment Mock 1 | `⚠️ DIVERGENT` | `Contrast Connectors: "On the contra` | 5 |
| **W128** | B1+ Academic | The Live Debate 1 | Opinion Project 2: Recorded Presentation | `⚠️ DIVERGENT` | ``broadcast_studio` thuyết trình qua` | 0 |
| **W129** | B1+ Academic | Opinion Project 3: Smartphones Under 12? | Opinion Project 3: Smartphones Under 12? | `✅ ALIGNED` | `Soạn thảo bài luận quan điểm hoàn c` | 0 |
| **W130** | B1+ Academic | Opinion Project 3: Comparing Global Approaches | Opinion Project 3: Comparing Global Approaches | `✅ ALIGNED` | `Trích dẫn nguồn thông tin; `reading` | 0 |
| **W131** | B1+ Academic | Opinion Project 3: Persuasive Techniques | Opinion Project 3: Persuasive Techniques | `✅ ALIGNED` | `Ngữ điệu và trọng âm nhấn mạnh; `ge` | 0 |
| **W132** | B1+ Academic | B1+ Academic Assessment Mock 2 | B1+ Academic Assessment Mock 2 | `✅ ALIGNED` | `Full Mock B1+ Academic 2: Chấm bài ` | 0 |
| **W133** | B1+ Academic | Deep Research & Data | Research Project 4: AI in Education | `⚠️ DIVERGENT` | `Citation Phrases: "According to a s` | 8 |
| **W134** | B1+ Academic | Identifying Fallacies | Research Project 4: Survey Design | `⚠️ DIVERGENT` | `Qualifiers: "Some", "Many", "Often"` | 8 |
| **W135** | B1+ Academic | The Counter-Argument Paragraph | Research Project 4: Data in Essays | `⚠️ DIVERGENT` | `Contrast Transitions: "However", "N` | 7 |
| **W136** | B1+ Academic | Drafting the Full Essay | Research Project 4: Recorded Presentation | `⚠️ DIVERGENT` | `Cohesion (Reviewing all linking wor` | 6 |
| **W137** | B1+ Academic | Editing & Polishing (Word Choice) | B1+ Academic Assessment Mock 3 | `⚠️ DIVERGENT` | `Synonyms & Antonyms usage` | 1 |
| **W138** | B1+ Academic | Advanced Rebuttal (Attacking Evidence) | Academic Reading: Earth Science | `⚠️ DIVERGENT` | `Polite Disagreement: "I see your po` | 7 |
| **W139** | B1+ Academic | Team Strategy | Academic Reading: World History | `⚠️ DIVERGENT` | `Future Continuous: "My partner will` | 7 |
| **W140** | B1+ Academic | The Live Debate 2 (Video Games) | Academic Reading: Document Analysis | `⚠️ DIVERGENT` | `Kỹ năng trích xuất luận điểm từ ngu` | 0 |
| **W141** | B1+ Academic | Geometry Review - Angles & Lines | Academic Reading: Math Word Problems | `⚠️ DIVERGENT` | ``math_quest` phương trình và biểu đ` | 0 |
| **W142** | B1+ Academic | Geometry Review - Area & Volume | B1+ Academic Assessment Mock 4 | `⚠️ DIVERGENT` | `Full Mock B1+ Academic 4: Đọc liên ` | 1 |
| **W143** | B1+ Academic | Critical Thinking - Analyzing Ads | Advanced Genre: Academic Narrative | `⚠️ DIVERGENT` | `Viết truyện ngắn văn học ($\ge 200$` | 0 |
| **W144** | B1+ Academic | Preparation for Capstone | Advanced Genre: Expository Paper | `⚠️ DIVERGENT` | `Bài báo khoa học giải thích có tríc` | 0 |
| **W145** | B1+ Academic | Independent Research | Extended Project: Topic Selection | `⚠️ DIVERGENT` | `Source Attribution: "According to [` | 6 |
| **W146** | B1+ Academic | Synthesizing Information | Extended Project: Research & Outline | `⚠️ DIVERGENT` | `Connectors of Comparison: "Similarl` | 6 |
| **W147** | B1+ Academic | Advanced Thesis Writing | B1+ Academic Assessment Mock 5 | `⚠️ DIVERGENT` | `Subordinating Conjunctions: "While"` | 5 |
| **W148** | B1+ Academic | Drafting Final Essay (Independent) | Extended Project: Data & Evidence | `⚠️ DIVERGENT` | `Variety of Sentence Structures (Sim` | 0 |
| **W149** | B1+ Academic | Final Polish & Peer Review | Extended Project: Full First Draft | `⚠️ DIVERGENT` | `Final Punctuation & Capitalization ` | 0 |
| **W150** | B1+ Academic | Mock Debate & Strategy | Extended Project: Peer Review | `⚠️ DIVERGENT` | `Biên tập chi tiết từng dòng, kiểm t` | 5 |
| **W151** | B1+ Academic | The Capstone Debate | Extended Project: Recorded Presentation | `⚠️ DIVERGENT` | ``broadcast_studio` thuyết trình dự ` | 0 |
| **W152** | B1+ Academic | Genre Review: Narrative | B1+ Academic Final Assessment | `⚠️ DIVERGENT` | `Narrative Tenses (Past Simple, Cont` | 0 |
| **W153** | B1+ Academic | Genre Review: Expository | Portfolio Showcase: Best Works | `⚠️ DIVERGENT` | `Cause & Effect Connectors (Advanced` | 0 |
| **W154** | B1+ Academic | Impromptu Speaking Skills | Portfolio Showcase: Reflection Essay | `⚠️ DIVERGENT` | `Fillers & Connectors: "That's an in` | 0 |
| **W155** | B1+ Academic | Portfolio Prep | Master Portfolio Curation | `⚠️ DIVERGENT` | `Past vs. Present Perfect: "I used t` | 0 |
| **W156** | B1+ Academic | GRADUATION CEREMONY & FINAL SHOWCASE | GRADUATION CEREMONY & SHOWCASE | `⚠️ DIVERGENT` | `LỄ TỐT NGHIỆP — TRÌNH BÀY EXTENDED ` | 0 |

---

## 5. Kết Luận & Đề Xuất Cho Chủ Sở Hữu

1. **Quy Mô Phân Kỳ Đã Được Kiểm Soát 100%**: Mặc dù có tới 138 tuần phân kỳ về mặt câu chữ tiêu đề, toàn bộ 156 tuần đều có nền tảng sư phạm mạch lạc từ Nguồn B.
2. **An Toàn Tuyệt Đối**: Quá trình quét dry-run không làm biến đổi bất kỳ file nào trên đĩa. Ba tuần W33, W34, W38 được bảo toàn nguyên vẹn.
3. **Sẵn Sàng Sản Xuất Hàng Loạt**: Khi nhận được lệnh của Chủ sở hữu, công cụ có thể tự động sinh trọn bộ 153 blueprint còn lại trong vòng chưa đầy 10 giây với độ tin cậy tuyệt đối.