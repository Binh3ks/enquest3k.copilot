# 📚 TÓM TẮT CHÍNH XÁC CÁC STATION (Từ Code Thực Tế)

*Ngày audit: 04/03/2026*  
*Dựa trên đọc 20+ file source code*

---

## 📖 READING & VOCABULARY

### 1️⃣ **Read & Explore** (`ReadingExplore.jsx`)
**Logic thực tế**:
- Đọc đoạn văn, từ in đậm có popup (ảnh + nghĩa + audio)
- **Translation Challenge**: Gõ dịch từng câu tiếng Việt
- Gõ được > 50% độ dài câu target → nút "Check" hiện ra
- Click Check → AI analyze và feedback (smartCheck mode: 'academic')
- Có nút "Show Reference" xem bản dịch đúng
- **KHÔNG có translate button tự động** - học sinh phải tự dịch!

### 2️⃣ **New Words** (`VocabManager.jsx`)
**3 drills thực tế**:
1. **Copy Word 3x**: Gõ từ 3 lần (không phải nghe và chép!)
2. **Collocation Drill**: Gõ cụm từ collocation/example
3. **Make Sentence**: Đặt câu có chứa từ target

**KHÔNG có**:
- ❌ Listen & Type drill
- ❌ Meaning Match drag

**Có**:
- ✅ Flip card xem definition/collocation
- ✅ Audio button trên card
- ✅ Auto-complete khi 3 drills xong

### 3️⃣ **Word Power** (`WordPower.jsx`)
**Giống hệt New Words**:
1. Copy 3x
2. Type Definition (academic mode - chính tả strict)
3. Write Sentence

**Khác biệt**: Từ vựng mở rộng (collocations giai đoạn 1-54, synonyms 55-120, idioms 121+)

### 4️⃣ **Daily Watch** (`DailyWatch.jsx` + `update_videos.js`)
**Logic chọn video**:
- **Whitelist channels** phân theo topic:
  - Grammar → English Singsing (priority)
  - Story → Little Fox, Vooks (priority)
  - Math → Numberblocks
  - Science → SciShow Kids, Nat Geo Kids
  - Social → Homeschool Pop
- Match keywords từ syllabus với video title
- Filter: MIN 60s, MAX 900s duration
-Tracking: % watched (YouTube iframe API)

**KHÔNG có**:
- ❌ Comprehension questions
- ❌ Quiz sau xem

**Có**:
- ✅ YouTube player embed
- ✅ Progress bar
- ✅ Resume từ vị trí dừng

---

## 🗣️ COMMUNICATION

### 5️⃣ **Ask AI** (`AskAi.jsx`)
**Workflow**:
1. Đọc context/prompt tiếng Việt/Anh
2. Click **Mic** button → nói câu hỏi (PHẢI nói trước!)
3. Hoặc gõ (nhưng khuyến khích nói)
4. Click **Speaker button** (Volume2 icon) → nghe đáp án đúng
5. Click **Lightbulb** → xem hint pattern
6. Sai >= 3 lần → hiện đáp án đúng tự động

**Không phải**:
- ❌ AI generates question for student to answer
- ✅ Student reads prompt and ASKS question

### 6️⃣ **Mindmap Speaking** (`MindMapSpeaking.jsx`)
**Workflow**:
1. Chọn 1 trong các centerStems (cấu trúc câu có "___")
2. Xem mindmap với branches (các từ điền vào ___)
3. **Nghe audio** của từng stem/branch (có audio URL)
4. **Ghép** stem với branch thích hợp
5. **Ghi âm** câu hoàn chỉnh bằng Mic
6. AI check accuracy (analyzeAnswer mode: 'academic')

**Không phải**:
- ❌ Chỉ nói tự do
- ✅ Nghe trước → Ghép → Nói theo cấu trúc

---

## 📝 WRITING & GRAMMAR

### 7️⃣ **Grammar** (`GrammarEngine.jsx`)
**20 exercises/week**:
- Multiple Choice
- Word Order (sắp xếp từ)
- Fill in Blanks
Auto-grading

### 8️⃣ **Writing/Video Challenge** (`VideoChallenge.jsx`)
**2 tabs**:
1. **Write Tab**: Gõ script về chủ đề tuần, có sample sentences gợi ý
2. **Record Tab**:
   - Bật camera
   - Click Record → đếm ngược 3s
   - **Đọc/nói** script vào video
   - Download video MP4

**Không phải**:
- ❌ Chỉ viết xong submit
- ✅ Viết + quay video đọc lại

---

## 👂 LISTENING & PRONUNCIATION

### 9️⃣ **Dictation** (`DictationEngine.jsx`)
**3 LEVELS** (không phải 2!):
1. **Level 1 - Unscramble**: Sắp xếp từ → thành câu đúng
2. **Level 2 - Fill Blanks**: Nghe → điền từ còn thiếu (cloze test)
3. **Level 3 - Full Sentence**: Nghe → gõ lại toàn bộ câu

**Ghi chú**: User phải switch level thủ công

### 🔟 **Shadowing** (`Shadowing.jsx`)
**Workflow**:
1. Nghe audio từng câu (Play One)
2. Hoặc nghe cả đoạn (Play All)
3. Click Mic → record voice
4. Playback để nghe lại

**⚠️ QUAN TRỌNG**:
- **CHƯA CÓ** AI scoring/feedback
- **CHƯA CÓ** highlight từ sai
- **CHƯA CÓ** accuracy /100

**Cần bổ sung**: #2 trong Feature Roadmap (Shadowing AI Feedback)

---

## 🔬 KNOWLEDGE EXPLORATION

### 1️⃣1️⃣ **Explore (CLIL)** (`Explore.jsx`)
Đọc bài Science/Social Studies + comprehension questions

### 1️⃣2️⃣ **Logic Lab** (`LogicLab.jsx`)
Math problems in English
5-10 questions/week

---

## 🎮 GAMES

### 1️⃣3️⃣ **Word Match** (`WordMatch.jsx`)
**3 MODES** (không phải 2!):
1. **Meaning Mode**: Word ↔ Definition (Vietnamese)
2. **Image Mode**: Word ↔ Image
3. **Audio Mode** 🔊: Word (text) ↔ Word (audio only)
   - Card audio type: Click để nghe, không hiện text
   - Match bằng cách nhớ âm

**Ghi chú**: Audio mode UI cần cải thiện (hiện chỉ text, chưa có waveform)

### 1️⃣4️⃣ **Game Hub** (`GameHub.jsx`)
3 production games + World Adventure (4 external sites)

### 1️⃣5️⃣ **Self Regulation** (`SelfRegulation.jsx`)
Goal setting, progress tracking, reflection

---

## 🤖 AI TUTOR

### **Ms. Nova Button** (`FloatingButton.jsx`)
**Vị trí CHÍNH XÁC**:
```css
position: fixed;
top: 18px;
left: calc(320px + (100vw - 320px) / 2);
transform: translateX(-50%);
```
→ **Giữa phía trên màn hình** (TOP CENTER), không phải góc

**4 Tabs** (`TutorWindow.jsx`):
1. Story Mission (BookOpen icon)
2. Free Talk (MessageCircle icon)
3. Pronunciation (Mic icon)
4. Debate (MessageSquare icon) - unlock Week 20

### **Free Talk Tab** (`FreeTalkTab.jsx`)
**3 Cards hiện tại**:
1. **Translation Help**: Gõ câu tiếng Việt → AI dịch sang Anh + giải thích
2. **Conversation Cards**: Hội thoại có cấu trúc (questions/exchanges)
3. **Ask Anything**: Hỏi Ms. Nova bất kỳ điều gì

**Không còn**:
- ❌ Roleplay scenarios (đã chuyển sang GameHub)
- ❌ Games (đã có GameHub riêng)

### **Pronunciation Tab** (`PronunciationTab.jsx`)
**2 types**:
- Word-level: 10 New Words + 3 Word Power
- Sentence-level: Grammar examples

**1 mode hiện tại**: Practice (listen → record → score)

**⚠️ CHƯA CÓ**:
- ❌ "Repeat 3x" mode (rapid fire drill)
- Cần bổ sung: #4 trong Feature Roadmap

### ❓ **Quiz Tab** (`QuizTab.jsx`)
**Status**: File tồn tại nhưng KHÔNG render trong UI
- QuizTab.jsx (broken)
- QuizTab_OLD.jsx (old version)
- QuizTab_BROKEN.jsx

**Cần làm**: #3 trong Feature Roadmap (AI generate quiz từ student errors)

---

## 📊 PROGRESS SYSTEM

### **Universal Progress** (`useStationProgress.js`)
- % progress mỗi station
- Auto-save debounced 1.5s
- Persistent across sessions

### ⚠️ **CHƯA CÓ**:
- ❌ Scoring system (points/stars)
- ❌ Badges/Achievements
- ❌ Leaderboard
- Cần bổ sung: #1 trong Feature Roadmap (Priority CAO!)

**Hiện tại**: Chỉ % → Cần chuyển sang ⭐⭐⭐ stars

---

## 🔧 TTS SETTINGS

**4 Voices**:
- Nova (Warm) - default
- Luna (Calm)
- Stella (Energetic)
- Orion (Professional - male)

**5 Speeds**:
- Auto (context-aware)
- 0.7x (very slow)
- 0.85x (slow)
- 1.0x (normal)
- 1.2x (fast)

**Vị trí settings**:
- AI Tutor tabs: Top-right header
- Một số stations: Có riêng settings

---

## ✅ CHỐT LẠI SAI SÓT ĐÃ SỬA

| Tính năng | Mô tả SAI (cũ) | Mô tả ĐÚNG (sau audit) |
|-----------|---------------|----------------------|
| **Read& Explore** | Có nút translate tự động | Translation CHALLENGE: Học sinh phải tự gõ dịch, 50% → Check |
| **New Words** | Có Listen & Type drill | CHỈ có Copy 3x + Collocation + Sentence |
| **Daily Watch** | Có quiz sau xem | CHỈ tracking % watched, KHÔNG có quiz |
| **Ask AI** | AI hỏi, học sinh trả lời | Học sinh ĐỌC prompt và ĐẶT CÂU HỎI |
| **Mindmap** | Chỉ nói tự do | Nghe audio → Ghép stems/branches → Nói theo cấu trúc |
| **Writing** | Chỉ viết text | Viết + quay video ĐỌC lại script |
| **Dictation** | 2 levels | 3 LEVELS (Unscramble/Fill/Full) |
| **Shadowing** | Có AI scoring | CHƯA CÓ AI feedback (cần bổ sung!) |
| **Word Match** | 2 modes | 3 MODES (Meaning/Image/AUDIO) |
| **Ms. Nova** | Button góc phải dưới | Button GIỮA PHÍA TRÊN màn hình |
| **Free Talk** | 5+ options | 3 cards (Translation/Conversation/Ask) |
| **Pronunciation** | Có Repeat 3x | CHƯA CÓ mode này (cần bổ sung!) |
| **Progress** | Có stars/badges | CHỈ có %, chưa có scoring (cần bổ sung!) |

---

*© 2026 Engquest - Accurate Documentation from Source Code*
