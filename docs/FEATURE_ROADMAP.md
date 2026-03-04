# 📋 ENGQUEST - KẾ HOẠCH BỔ SUNG TÍNH NĂNG

*Ngày tạo: 04/03/2026*  
*Dựa trên audit code thực tế và feedback người dùng*

---

## 🎯 MỤC TIÊU
Hoàn thiện các tính năng còn thiếu và nâng cấp trải nghiệm học tập.

---

## 🔥 ƯU TIÊN CAO (Phase 1 - Tháng 3-4/2026)

### 1. ⭐ **HỆ THỐNG CHẤM ĐIỂM & TÍ tích SAO**
**Hiện trạng**: Chỉ có % progress cho từng station, chưa có stars/badges tổng thể

**Cần làm**:
- ✅ Thiết kế hệ thống tích sao 3 cấp:  - ⭐ 1 sao: Hoàn thành > 60% station
  - ⭐⭐ 2 sao: Hoàn thành > 80% + điểm tốt
  - ⭐⭐⭐ 3 sao: Hoàn thành 100% + điểm xuất sắc
- ✅ Hiển thị stars trên sidebar thay cho %
- ✅ Tổng điểm toàn tuần (Total Stars: X/45)
- ✅ Huy hiệu (Badges) khi đạt mốc:  - 🏆 Perfect Week: 45/45 sao
  - 🔥 Speed Learner: Hoàn thành tuần < 3 ngà  - 🔥 Speed Learner: Hoàn thành tuần < 3 ngà  - 🔥 Speed Learner: Hoàn thành tu)
  - 🔥 Speed Learner: Hoàn thành tuần < 3 ngress  - 🔥 Speed Learner:gic
--------------------------------------------------------------a/badgeCon-----s` - Tạo file mới định nghĩa badges

**Timeline**: 2 tuần

---

### 2. 🎤 **SHADOWING - BỔ SUNG ### 2. 🎤 **SHADOWING - BỔ SUNG ### 2. � voice nhưng CHƯA có AI chấm phát âm

**Cần làm**:
- ✅- ✅- ✅- ✅- ✅- ✅- ✅- ✅- ✅- ✅- ✅- ✅- ✅- ✅- ✅- ✅- ✅- ✅- ✅- � tex-
- ✅ Highligh- ✅ Highligh- ✅ Highligh- ✅ HighTính điểm accuracy /100
- ✅ Feedback chi tiết:- ✅ Feedber' phát âm 'wader' - cần rõ /t/ hơn"
- ✅ Auto-replay từ sai 3 lần

**API cần**: Deepgram Speech-to-Text (đã có key)

**File cần sửa***File cần sửa***File cần sửa***File c�rc/services/sttEngine.js` - Tạo file mới cho STT
- `src/utils/pronunci ationChecker.js` - Logic chấm điểm

**Timeline**: 1.5 tuần

---

### 3. ❓ **AI TUTOR - BỔ SUNG QUIZ TAB**
**Hiện trạng**: QuizTab.jsx tồn tại nhưng KHÔNG được render trong TutorWindow.jsx

**Cần làm**:
- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �- �ậ- �- �- �- �s
- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�-apt- ✅ 3 lo�- � n- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- � (- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- �tabs/QuizT- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ✅ 3 lo�- ` - Add tab vào tabs array
- `src/services/ai_tutor/quizGenerator.js` - Tạo file mới

**Timeline**: 2 tuần

---

## 🚀 ƯU TIÊN VỪA (Phase 2 - Tháng 5-6/2026)

### 4. 🗣️ **PRONUNCIATION TAB - "REPEAT 3X" MODE**
**Hiện trạng**: Chỉ có practice 1 lần, chưa có drill lặp lại


*Hiện trạng**: Chỉ có de "Rapid Fire": học sinh đọc 1 từ 3 lần liên tiếp
- ✅ So sánh consistency giữa 3 lần đọc
- ✅ So sánhl�- ✅ So sánhl�- ✅ So sánhl�- ✅ So sánhl�- ✅ So sánhl�- ✅ So sánhl�- ✅ So sánhl�- ✅ So sánhl�- ✅ ửa**:
- `src/modules/ai_tutor/tabs/PronunciationTab.jsx`

**Timeline**: 1 tuần

---

### 5. 🎮 **WORDMATCH - BỔ SUNG UI AUDIO MODE**
**Hiện trạng**: Có audio mode code nhưng UI chưa rõ ràng

**Cần làm**:
- ✅ Card audio type: Hiển thị waveform animation thay vì text
- ✅ Auto-play khi flip card
- ✅ "Listen Again" button trên card
- ✅ Visual cue: 🔊 icon lớn thay vì text

**File cần sửa**:
- `src/modules/match/WordMatch.jsx`


 `src/modules/match/WordMatch.jsx`
ay vì text
mation thay M Cmation thay M CmationS** (Tùmation thay M Cmation thay M CmationS** (Tùmatiem, không test hiểu

**Cần làm**:
- ✅ 3 câu hỏi MC- ✅ 3 câu hỏi MC- ✅ 3 câu hỏi MC- ✅ 3 câu hỏi MC- �dea, details, vocabulary)
- ✅ Unlock next video khi đúng >= 2/3 câu

**File cần sửa**:
- `src/m- `src/m- `src/m- `src/m- `src/m- `src/m- `src/_XX_real.js` - Thêm questions field

**Timeline**: 1 tuần

---

## 💡 ƯU TIÊN THẤP (Phase 3 - Tháng 7+/2026)

### 7. 🎖️ **ACHIEVEMENT SYSTEM**
- Daily streak badges (🔥 7 days, �- Daily streak badgesll maste- Daily streak badges (🔥 7 days, �-- Social feat- Daily streak badges (🔥 7 days, �- Daily streak badgesll mm pr- Daily st�a con- Daily streak badges (🔥 7 days, �- Daily streak badgesll masteE - Daily streak badges (�r off- Daily streak badges (🔥 7 days, ###- Daily streak badges (🔥 7 days, �- Dmode
- C- C- C- C- C- C- C- in- C- C- C- C- C- C- C- in- C- C- C---
- C- C- C- C- C- C- C- in- C- C- Phase | Thời gian | Tính năng |
|-------|-----------|-----------|
| **Phase 1** | T3-4/2026 | Scoring, Shadowing AI, Quiz Tab |
| **Phase 2** | T5-6/2026 | Repeat 3x, Audio Mode UI, Video Questions |
| **Phase 3** | T7+/2026 | Achievements, Parent Dashboard, Offline |

---

## 🔧 KỸ THUẬT CẦN C## 🔧 KỸ THU�PIs:## 🔧 KỸ THUẬT CẦN C## 🔧 KỸ THU�PIs:## 🔧 KỸ THUẬT CẦN C## 🔧 Kỳ ke## 🔧 KỸ THUẬT e:
- Err- Err- Err- Err- Err- Err- Err- Err- Err- Err- inh)
----------------------------Leaderboard----------------------------Leaderboard----------------------------Leaderboard----------------------------Leaderboard----------------------------Leaderboard----------------------------Leaderboard----------------------------Leaderboard----------------------------Leaderboard----------------------------Leaderboard----------------------------Leaderboard----------------------------LTab** ----------------------------Leaderboard-------------------data (không tưởng tượng)
   - AI generate dựa trên pattern sai
   - Giải thích rõ ràng hơn là "đúng/sai"

3. **Scoring System** phải:
   - Công bằng (không quá khó/dễ)
   - Motivating (stars > %)
   - Visible (hiển thị rõ ràng)

---

*© 2026 Engquest - Smart English Learning Platform*
