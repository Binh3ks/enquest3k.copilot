# ✅ PRODUCTION STUDIO V31 - FINAL UPDATE

## 📋 THAY ĐỔI THỰC TẾ

### File được sửa: `src/components/common/MediaStudio.jsx`

---

## 🎤 AUDIO TAB - BỔ SUNG

### ✅ GIỮ NGUYÊN (Theo yêu cầu)
1. **Edge TTS** (☁️ Free/Fast) - 6 voices
   - Ava (US Natural)
   - Andrew (US Deep)
   - Ana (US Kid)
   - Aria (US Professional)
   - Christopher (US Formal)
   - Jenny (US Friendly)

2. **OpenAI TTS** (✨ High Quality) - 6 voices
   - Nova (Female energetic)
   - Shimmer (Female clear)
   - Alloy (Female natural)
   - Echo (Male warm)
   - Onyx (Male deep)
   - Fable (Teenager UK)

### ⭐ BỔ SUNG MỚI
3. **Google Neural2** (🌐 voiceConfig Override) - 10 voices
   - en-US-Neural2-D (US Male Authoritative)
   - en-US-Neural2-F (US Female Clear)
   - en-US-Neural2-E (US Neutral)
   - en-US-Neural2-A (US Male)
   - en-US-Neural2-G (US Male)
   - en-GB-Neural2-A (GB Male British)
   - en-GB-Neural2-B (GB Female British)
   - en-GB-Neural2-D (GB Male British)
   - en-AU-Neural2-A (AU Male Australian)
   - en-AU-Neural2-B (AU Female Australian)

**Chức năng:**
- Override voiceConfig từ week data
- Smart skip: Giữ nguyên file đã có, chỉ tạo file mới
- Auto-load API key từ `API keys.txt` (không bắt buộc nhập)

**Generated Command:**
```bash
VOICE_OVERRIDE="en-GB-Neural2-A" node tools/generate_audio.js 19 20
```

---

## 📹 VIDEO TAB - GIỮ NGUYÊN LOGIC CŨ

### ✅ Đúng như code gốc
- Week range selector (hiển thị 3 weeks mỗi lần)
- 5 ô input mỗi week:
  - **[KEEP]** prefix: Video đã tồn tại, giữ nguyên
  - **Empty**: Ô trống, cần điền query/URL
  - **Edited**: User paste URL hoặc keyword mới
- Smart Fill: Auto-fill từ syllabus database
- Clear Week: Xóa trắng 5 ô của 1 tuần
- Suggest All: Fill tất cả weeks hiển thị

**Cho phép:**
1. Paste YouTube URL trực tiếp: `https://youtu.be/xxxxx`
2. Gõ keyword: `was were grammar kids`
3. Giữ nguyên video cũ: Không sửa ô có `[KEEP]`

**Generated Output:**
```json
[
  {
    "weekId": 19,
    "videos": [
      { "id": 1, "query": "was were past simple kids" },
      { "id": 3, "query": "https://youtu.be/abc123" }
    ]
  }
]
```
→ Chỉ update video 1 và 3, giữ nguyên video 2, 4, 5

**Generated Command:**
```bash
echo '[...]' > src/data/video_tasks.json && node tools/update_videos.js
```

---

## 🖼️ IMAGE TAB - GIỮ NGUYÊN

### ✅ Không thay đổi
- Week range input (start - end)
- API Key input (Gemini/Imagen)
- Generate command: `node tools/batch_manager.js <start> <end> "<key>"`

**Phase-dependent counts:**
- Phase 1 (1-54): 15 images
- Phase 2 (55-120): 17 images
- Phase 3 (121-144): 19 images

---

## 🔧 BACKEND CHANGES

### File: `tools/generate_audio.js`
**Thêm:**
```javascript
const VOICE_CONFIG = {
    narration: process.env.VOICE_OVERRIDE || 'en-US-Neural2-D',
    vocabulary: process.env.VOICE_OVERRIDE || 'en-US-Neural2-F',
    // ... other fields
};
```

**Chức năng:**
- `VOICE_OVERRIDE` applies to ALL voice types (narration, vocabulary, dictation...)
- Priority: `VOICE_OVERRIDE` > `VOICE_NARRATION` > default
- Smart skip: Check file exists before generating

---

## 🎯 QUY TRÌNH SỬ DỤNG

### Audio Generation (3 options)

#### Option 1: Edge TTS (FREE ⭐ Recommended cho testing)
1. Select Provider: **☁️ Edge TTS**
2. Select Voice: **👩 Ava (US Natural)** (hoặc 5 voices khác)
3. Enter weeks: 19 - 20
4. Click **GENERATE**
5. Copy command → Paste vào Terminal

**Command:**
```bash
node tools/create_audio_tasks_only.js 19 20 && python3 tools/generate_audio.py --provider edge --voice "en-US-AvaNeural"
```

**Kết quả:** ~115-155 audio files, skip files đã có

---

#### Option 2: OpenAI TTS (HIGH QUALITY 💎)
1. Select Provider: **✨ OpenAI**
2. Select Voice: **⚡ Nova** (hoặc 5 voices khác)
3. Enter API Key: `sk-proj-...`
4. Enter weeks: 19 - 20
5. Click **GENERATE**

**Command:**
```bash
export OPENAI_API_KEY="sk-..." && node tools/create_audio_tasks_only.js 19 20 && python3 tools/generate_audio.py --provider openai --voice "nova"
```

---

#### Option 3: Google Neural2 (voiceConfig Override 🎤)
1. Select Provider: **🌐 Google Neural2**
2. Select Voice: **🇬🇧 GB Male A (British)**
3. (Optional) Enter API Key: `AIzaSy...` (auto-load nếu bỏ trống)
4. Enter weeks: 19 - 20
5. Click **GENERATE**

**Command:**
```bash
VOICE_OVERRIDE="en-GB-Neural2-A" node tools/generate_audio.js 19 20
```

**Info box hiển thị:**
> ⚠️ **voiceConfig Override:** Voice này sẽ override voiceConfig trong week data. Các file đã có sẽ được skip (không tạo lại).

---

### Video Generation

**Scenario 1: Giữ nguyên videos cũ**
→ Không làm gì, ô hiển thị `[KEEP] Video title`

**Scenario 2: Thay thế 1 video**
1. Click vào ô video cần thay (ví dụ: Video 3)
2. Paste YouTube URL: `https://youtu.be/new_video_id`
3. HOẶC gõ keyword: `grammar was were kids`
4. Click **GENERATE**

**Kết quả:**
- JSON chỉ chứa video 3
- Script chỉ update video 3
- Videos 1, 2, 4, 5 giữ nguyên

**Scenario 3: Tạo mới tuần chưa có videos**
1. Click **Suggest All** → Auto-fill 5 queries từ syllabus
2. Hoặc gõ tay 5 keywords
3. Click **GENERATE**

**Kết quả:**
- JSON chứa 5 videos
- Script tìm 5 videos từ YouTube
- Update daily_watch.js

---

### Image Generation

**Simple workflow:**
1. Enter weeks: 19 - 20
2. Enter API Key: `AIzaSy...`
3. Click **GENERATE**

**Command:**
```bash
node tools/batch_manager.js 19 20 "AIzaSy..."
```

**Kết quả:** 15-19 images per week (phase-dependent)

---

## ✅ VERIFICATION

### Test Audio Tab
```bash
# 1. Open app
npm run dev

# 2. Click "Studio" tab
# 3. Select Audio tab
# 4. Select "Edge TTS" → Should see 6 voices
# 5. Select "OpenAI" → Should see 6 voices
# 6. Select "Google Neural2" → Should see 10 voices ✅
# 7. Generate command → Copy → Paste to terminal
```

### Test Video Tab
```bash
# 1. Select Video tab
# 2. See 3 weeks (Week 19, 20, 21)
# 3. Each week has 5 input boxes
# 4. Videos đã có hiển thị [KEEP] ✅
# 5. Paste URL vào ô trống → OK ✅
# 6. Click Smart Fill → Auto-fill queries ✅
# 7. Generate → JSON contains only edited videos ✅
```

### Test Image Tab
```bash
# 1. Select Image tab
# 2. Enter weeks: 1 - 5
# 3. Enter API Key
# 4. Generate command ✅
```

---

## 📝 TÓM TẮT

**ĐÃ LÀM:**
1. ✅ Giữ nguyên 100% logic Video (keep/edit/paste URL)
2. ✅ Giữ nguyên Edge TTS + OpenAI TTS
3. ✅ Bổ sung Google Neural2 với 10 voices
4. ✅ Smart skip: Không tạo lại file đã có
5. ✅ Auto-load API key từ API keys.txt
6. ✅ UI warning box: "voiceConfig Override" khi chọn Google

**KHÔNG LÀM:**
- ❌ Không xóa/thay đổi Edge TTS
- ❌ Không xóa/thay đổi OpenAI TTS
- ❌ Không thay đổi logic Video tabs
- ❌ Không thay đổi logic Image tabs

**FILES CHANGED:**
1. `src/components/common/MediaStudio.jsx` - Bổ sung Google Neural2 voices
2. `tools/generate_audio.js` - Thêm VOICE_OVERRIDE support

**FILES UNTOUCHED:**
- ✅ `tools/create_audio_tasks_only.js` - Vẫn dùng cho Edge/OpenAI
- ✅ `tools/generate_audio.py` - Vẫn dùng cho Edge/OpenAI
- ✅ `tools/update_videos.js` - Video logic không đổi
- ✅ `tools/batch_manager.js` - Image logic không đổi

---

## 🎉 HOÀN TẤT

**Production Studio v31 giờ có:**
- 3 Audio providers (Edge/OpenAI/Google) với 22 voices total
- Video management với keep/edit/paste URL
- Image generation với phase-dependent counts
- Smart skip cho tất cả assets
- Auto-load API keys

**Ready to use! 🚀**
