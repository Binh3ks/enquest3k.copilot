# KẾ HOẠCH TRIỂN KHAI KIẾN TRÚC 21 MINI-GAME (SUPER LEO CHRONICLES)

**Ngày lập:** 10/09/2026  
**Trạng thái:** Chờ phê duyệt (Pre-Execution)  
**Phạm vi:** 21 Mini-Game (7 Vocab / 7 Grammar / 7 Integration) — Không đổi phạm vi, không thêm/bớt game.  
**Thứ tự thực hiện:** **Phase A (Fix live bugs & Evidence) → Phase B (Build 6 games mới & Evidence)**

---

## 1. BẢNG ROSTER 21 MINI-GAME CHỐT (7/7/7)

| Door | # | Game ID | Display Name | Kỹ năng chính | Nguồn Data | Trạng thái |
|---|---|---|---|---|---|---|
| **Vocab** | V1 | `arcane_bubble` | Arcane Bubble Pop | Từ vựng ↔ Định nghĩa | `vocabItems` | ✅ Live |
| | V2 | `crystal_match` | Crystal Memory Match | Memory match từ/nghĩa | `vocabItems` | ✅ Live |
| | V3 | `phonics_bubble` | Phonics Sound Blaster | Ngữ âm / Phonics | Curriculum cố định | ✅ Live |
| | V4 | `highway_runner` | Highway Word Runner | Từ vựng tốc độ | `vocabItems` | ✅ Live |
| | V5 | `grand_matrix` | Grand Master Matrix | Định nghĩa lưới ma trận | `vocabItems` | ✅ Live |
| | **V6** | `synonym_storm` | **Synonym Storm** | Đồng nghĩa / Trái nghĩa | Hub vocab + synonym pairs | 🔨 Phase B |
| | **V7** | `word_forge_scramble`| **Word Forge Scramble** | Chính tả / Spelling dựng từ | `vocabItems[].word` | 🔨 Phase B |
| **Grammar** | G1 | `spell_train` | Spell Sentence Train | Điền từ vào câu | `grammarSentences` | ✅ Live |
| | G2 | `rune_forge` | Rune Forge | Chia thì / Morphology | `grammarSentences` | ✅ Live |
| | G3 | `chunk_catapult` | Chunk Catapult Match | Ghép cặp Collocation | `WEEKLY_CATAPULT_PAIRS` | ✅ Live |
| | G4 | `spell_train_express`| Syntax Express 4-Car | Hoàn thành câu 4 toa | `grammarSentences` | ✅ Live |
| | G5 | `titan_forge` | Titan Grammar Forge | Câu phức & liên từ | `grammarSentences` | ✅ Live |
| | **G6** | `connector_relay` | **Connector Relay** | Liên từ & mệnh đề phụ | `grammarSentences` / connectives | 🔨 Phase B |
| | **G7** | `question_quest` | **Question Quest** | Cấu trúc câu hỏi WH | Pre-generated pipeline (v3 fixed) | 🔨 Phase B |
| **Integration** | I1 | `lexical_det` | Lexical Detective | Safe crack từ/định nghĩa | `pools.integration` (pure vocab) | ⚠️ Live (Fix A1) |
| | I2 | `ancient_scroll` | Ancient Scroll Cloze | Điền từ vào văn cảnh | `grammarSentences` + `vocabItems` | ⚠️ Live (BUG-001) |
| | I3 | `meteor_smasher` | Meteor Smasher | Khiên đỡ từ vựng CLIL | `vocabItems` | ✅ Live |
| | I4 | `lexical_riddle` | Mystery Riddle Detective | Câu đố ngữ cảnh | Hub riddles / clues | ✅ Live |
| | I5 | `cambridge_cloze` | Cambridge Cloze Gauntlet | Platformer điền chỗ trống | Cambridge Part 5 / story | ℹ️ CODE-INFERRED (A2) |
| | **I6** | `story_sequencer` | **Story Sequencer** | Sắp xếp trật tự 5 cảnh | `story_scenes[].description_en` | 🔨 Phase B |
| | **I7** | `rune_balance_scale`| **Word Class Duel** | Phân biệt từ loại (Word Class) | Annotated dual-class words | 🔨 Phase B |

---

## 2. PHASE A — SỬA BUG TRÊN GAME LIVE & THU THẬP BẰNG CHỨNG THẬT

### A1. Sửa Triệt Để BUG-002 (`lexical_det` "Related to X" Filler)

#### Phân tích Nguyên nhân Gốc (Root Cause):
1. **Nhiễm bẩn Integration Pool**: `loadBucketPool(weekId, 'integration')` trong `src/services/contentService.js` gộp `rawItems = [...v, ...g]` (gồm cả vocab và grammar items). Trong `DailyRoomScreen.jsx`, `vocabItems` của Door 2 (Integration) lấy trực tiếp `pools.integration`.
2. **Filler generation**: `normalizeItem()` khi gặp item có `.sentence` (từ grammar) mà không có definition thì gán fallback:
   ```javascript
   def = CURRICULUM_DEFINITIONS?.[lower] || def || `Related to ${word}`;
   ```
   Biến toàn bộ câu văn dài (VD: *"Suddenly, he lost his balance on the wet floor"*) thành định nghĩa `"Related to Suddenly, he lost his balance on the wet floor"`.
3. **Bỏ sót nguồn `vocab.js`**: `extractVocabFromData()` chỉ đọc các field trong `reading_hub.js`, `writing_hub.js`, `listening_hub.js` (chỉ ra 10 items từ `rw_part_1.definitions`), hoàn toàn bỏ qua `weekData.stations?.new_words` (imported từ `vocab.js`), vốn chứa 20 từ vựng mục tiêu sạch và có `definition_en` chuẩn cho W33, W34, W35.

#### Các bước Sửa Code:
1. **Sửa `src/services/contentService.js`**:
   - Trong `extractVocabFromData(weekData)`: Bổ sung đọc từ `weekData.stations?.new_words || weekData.stations?.vocab || weekData.vocab || weekData.new_words`.
   - Lọc bỏ triệt để các item grammar (có `sentence`, `starter`, `completion`, hoặc độ dài > 4 từ / có dấu chấm câu).
   - Trong `normalizeItem()`: Bỏ hoàn toàn fallback `|| \`Related to ${word}\``. Nếu không tìm thấy definition, giữ nguyên `definition: ''` để các game không nhận diện nhầm là có định nghĩa.
   - Trong `loadBucketPool(weekId, 'integration')`: Tách rõ ràng pure vocab items cho `vocabItems` và sentences cho `grammarSentences`, đảm bảo vocab pool trong integration chỉ chứa từ vựng thực sự.
2. **Sửa `src/modules/chronicles/extractQuestVocab.js`**:
   - Xóa bỏ các fallback `Related to ${word}` tại lines 46, 460, 489.
3. **Thêm Defensive Filter tại `src/modules/quest/ShadowVaultInfiltrate.jsx`**:
   - Thêm bộ lọc: `vocabItems.filter(v => v.word && v.definition && !v.sentence && !v.definition.startsWith('Related to'))`.
4. **Kiểm tra rà soát toàn bộ 15 game live**:
   - Báo cáo danh sách mọi game dùng `.definition` và xác nhận không còn điểm nghẽn nào sinh ra "Related to".

#### Bằng chứng Bắt buộc Phải Nộp Cho A1:
1. Chạy Puppeteer vào W33 Floor 1 Door 3 (`lexical_det`), dump toàn bộ DOM text thật của game đang chạy và chụp screenshot nhúng vào báo cáo, chứng minh **0 instances of "Related to"**.
2. Script kiểm tra số liệu vocab-thuần trước/sau fix cho cả 3 tuần có content thật (W33, W34, W35):
   - Đếm số từ vựng sạch (có nghĩa chuẩn, không có filler, bao gồm cả nguồn `vocab.js`).

---

### A2. Đóng Nhãn Chuẩn Xác Cho Cambridge Cloze

- Xác nhận: `CambridgeClozeGauntlet.jsx` là game leo platformer (Leo jump/move nhặt crystals), counter hiển thị theo `placedBlanks`.
- Trạng thái: Giữ nguyên nhãn **`[CODE-INFERRED, chưa OBSERVED]`** trong tài liệu bàn giao và báo cáo hệ thống. Không nâng cấp nhãn lên OBSERVED khi chưa có video/ảnh thao tác thật.

---

## 3. PHASE B — XÂY DỰNG 6 MINI-GAME MỚI

Chỉ bắt đầu viết code Phase B sau khi Phase A đã hoàn tất và được xác nhận bằng chứng đầy đủ.

### B1. V6 — `synonym_storm` (Synonym Storm) — Vocab Door
- **Mechanic**: Cơn bão từ ngữ. Leo đứng giữa đấu trường, các quả cầu từ vựng mang từ đồng nghĩa hoặc trái nghĩa với từ mục tiêu bay vào. Học sinh chọn nhanh các quả cầu đồng nghĩa/trái nghĩa trong thời gian quy định (60-75s).
- **Data Source**: `vocabItems` từ hub + cặp synonym/antonym chuẩn CEFR A1/A2.
- **File tạo mới**: `src/modules/chronicles/games/SynonymStormGame.jsx`.

### B2. V7 — `word_forge_scramble` (Word Forge Scramble) — Vocab Door
- **Mechanic**: Đe rèn chữ. Các khối ký tự bị xáo trộn (scrambled letters) của từ vựng tuần rơi xuống. Học sinh tap/click hoặc kéo các chữ cái vào đúng vị trí để hoàn thành từ trong 20s/từ.
- **Data Source**: `vocabItems[].word` (dùng 6-8 từ vựng của tuần).
- **File tạo mới**: `src/modules/chronicles/games/WordForgeScrambleGame.jsx`.

### B3. G6 — `connector_relay` (Connector Relay) — Grammar Door
- **Mechanic**: Đường chạy tiếp sức liên từ. Một câu phức đang chạy trên băng chuyền thiếu liên từ kết nối (`because`, `although`, `if`, `so`, `but`, `and`, `when`). Học sinh chọn liên từ chính xác để hoàn thành mạch logic câu trước khi hết giờ.
- **Data Source**: `sentence_smash.sentences` / câu ghép từ `reading_hub` và `listening_hub`.
- **File tạo mới**: `src/modules/chronicles/games/ConnectorRelayGame.jsx`.

### B4. G7 — `question_quest` (Question Quest) — Grammar Door
- **Mechanic**: Đấu trường câu hỏi. Hiển thị một câu tường thuật (Answer/Statement). Học sinh chọn 1 trong 3 câu hỏi WH tương ứng chính xác nhất về mặt ngữ pháp và ngữ nghĩa.
- **Content Pre-Generation Pipeline**:
  - Sửa thuật toán syntax-driven v3:
    1. Sửa bug possessive kép trong `fixProperNouns()`: Xử lý đúng apostrophe để không sinh `"Maria's's"`.
    2. Thêm suffix-pattern fallback `/[a-z](ed|d)\b/i` vào nhận diện thì quá khứ đơn bên cạnh danh sách `PAST_SIMP_VERBS` để không bỏ sót các động từ như `roared`, `cheered`, `walked`.
  - Chạy pre-generate bộ câu hỏi WH cho W33 tại build-time/pipeline:
    - Lưu vào file dữ liệu tĩnh `src/data/weeks/week_33/wh_questions.js` (hoặc tích hợp trong config).
    - Duyệt qua bước Human/Pedagogy Review xác nhận 100% ngữ pháp trước khi tích hợp vào game.
- **File tạo mới**: `src/modules/chronicles/games/QuestionQuestGame.jsx`.

### B5. I6 — `story_sequencer` (Story Sequencer) — Integration Door
- **Mechanic**: Sắp xếp 5 mảnh ghép câu chuyện. 5 thẻ câu trích từ `story_scenes[].description_en` bị xáo trộn. Học sinh kéo/thả hoặc đánh số để xếp lại đúng diễn biến câu chuyện trong vòng 35-41 giây.
- **Khung Sư phạm & Tải Nhận Thức**:
  - Giữ đúng 5 câu của W33 (độ dài 11-16 từ/câu, trung bình 12.8 từ).
  - Không thêm câu, không tăng độ dài câu để đảm bảo đây là game thao tác nhanh ("speed sequence"), không biến thành bài tập đọc hiểu đoạn văn dài.
- **File tạo mới**: `src/modules/chronicles/games/StorySequencerGame.jsx`.

### B6. I7 — `rune_balance_scale` (Display Name: "Word Class Duel") — Integration Door
- **Mechanic**: Đấu trí từ loại. Hiển thị 1 từ mục tiêu và yêu cầu tìm câu dùng từ đó dưới vai trò từ loại được chỉ định (VD: *"Which sentence uses 'grip' as a VERB?"*). 4 thẻ câu ngữ cảnh để chọn.
- **Content Effort & Annotation Protocol**:
  - Dữ liệu W33: Khai thác từ dual-class sạch "grip" (NOUN vs VERB) và "slide" đã được xác nhận verbatim từ bài đọc CLIL.
  - Thiết lập schema annotation chuẩn: `{ word, targetRole, cards: [{ text, role, isCorrect }] }` để chuẩn bị cho việc mở rộng các tuần tiếp theo.
- **File tạo mới**: `src/modules/chronicles/games/WordClassDuelGame.jsx`.

---

## 4. TÍCH HỢP VÀO HỆ THỐNG CHRONICLES & NAVIGATION

1. **Cập nhật `DailyRoomScreen.jsx`**:
   - Thêm các case tương ứng trong `renderActiveGame()` cho 6 game mới (`synonym_storm`, `word_forge_scramble`, `connector_relay`, `question_quest`, `story_sequencer`, `rune_balance_scale`).
2. **Cập nhật `src/stores/useChroniclesStore.js`**:
   - Bổ sung cấu hình Floor 6 và Floor 7 vào `DOOR_ROTATION` để hoàn thiện đủ 21 games.
3. **Cập nhật `GameInstructionModal.jsx` & `HallOfFameModal.jsx`**:
   - Bổ sung metadata hướng dẫn chơi và icon/title cho cả 6 game mới.

---

## 5. KẾ HOẠCH XÁC MINH & THU THẬP BẰNG CHỨNG (VERIFICATION PLAN)

### Automated Tests & Audit Scripts:
1. `scripts/test_bug002_fixed.mjs`: Verify W33, W34, W35 vocab pool counts before/after fix.
2. `scripts/test_wh_generator_fixed.mjs`: Test thuật toán WH generator với các câu có possessive ("Maria's") và động từ đuôi -ed ngoài danh sách ("roared", "cheered").
3. `scripts/capture_21_games.mjs`: Chạy Puppeteer truy cập và tương tác với các màn hình game, chụp ảnh gameplay thực tế (sau nút Start), dump DOM và kiểm tra console errors.

### Manual Verification & Visual Proof:
- Chụp ảnh màn hình gameplay thật cho từng game mới được build.
- Embed ảnh và trích dẫn verbatim DOM log vào tài liệu bàn giao `walkthrough.md` và `docs/agent_artifacts/`.

---

## 6. ĐẶC TẢ BOSS BATTLE MỚI — PHYSICAL DODGING & SHARD RUNNER (ĐÓNG BĂNG, CHỜ CODE)

> ⚠️ **Trạng thái:** **FROZEN / CHƯA CODE**. Tuyệt đối không can thiệp code trong giai đoạn audit C1–C7 và hoàn thiện Roster 21 Game.

### 6.1. Bản Đặc Tả Đã Duyệt (Approved Core Baseline):
1. **Hành vi Boss:**
   - Boss di chuyển ngang chậm qua lại trên đấu trường.
   - Boss dang rộng 2 tay tạo vùng cản trở vật lý.
2. **Cơ chế Điều Khiển & Né Tránh của Leo (Physical Dodging):**
   - Người chơi điều khiển chú cáo Leo di chuyển, luồn lách né tránh Boss và chạy vòng quanh sàn đấu để thu thập các mảnh ghép kiến thức.
   - Va chạm trực tiếp với Boss $\rightarrow$ Bị đẩy lùi (knockback) và mất tim.
3. **Phân định với Code Hiện Tại:**
   - Component `BossCombatScene.js` hiện có trong codebase (`src/phaser/scenes/BossCombatScene.js`) là bản thử nghiệm **MCQ Turn-based 2D Phaser** cho Boss Type 1 (Ancient Sorcerer), **hoàn toàn KHÔNG PHẢI** cơ chế né tránh vật lý thời gian thực này.

### 6.2. Ba Mục Đang Chờ Duyệt (Pending Items — Chưa Chốt):
Ba thông số sau đây **giữ nguyên trạng thái PENDING (chờ phê duyệt chính thức)**, tuyệt đối không tự ý gán giá trị:
1. **Số mảnh ghép Weekly:** `PENDING (Chờ duyệt)`
2. **Tổng tim (Hearts của Leo / Boss HP):** `PENDING (Chờ duyệt)`
3. **Công thức độ khó (Pacing & Speed scaling):** `PENDING (Chờ duyệt)`

### 6.3. Đề Xuất Mở Rộng — Chưa Duyệt (Unapproved Extended Proposals):
*(Phần ý tưởng đề xuất bổ sung cho tương lai, tách bạch hoàn toàn với bản đã chốt)*:
- Đề xuất bổ sung các đợt công kích diện rộng (sóng năng lượng hình vòng cung, quả cầu lửa, tia sét quét sàn).
- Đề xuất chia 3 pha chiến đấu (pha tích tụ năng lượng, pha phát tán đòn đánh, pha suy yếu vulnerable).
- Đề xuất hiệu ứng phản công Super Charge Blast khi hoàn thành chuỗi mảnh ghép.
*(Các đề xuất này CHƯA ĐƯỢC DUYỆT và KHÔNG nằm trong scope triển khai)*.


