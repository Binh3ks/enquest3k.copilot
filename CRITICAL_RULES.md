# ⚡ CRITICAL RULES — EngQuest3k (Read First, Every Session)

> **Mục đích:** 30 quy tắc cốt lõi hay bị vi phạm nhất.  
> Đây là bản cô đọng của 2000+ dòng docs. Đọc trước khi bắt đầu bất kỳ task nào.

---

## 🖼️ IMAGES

| # | Rule | Anti-pattern | Correct |
|---|------|-------------|---------|
| R1 | **Mọi `<img>` từ data PHẢI dùng `getImageUrl()`** | `src={item.image_url}` | `src={getImageUrl(item.image_url)}` |
| R2 | Import ở đầu file | *(thiếu import)* | `import { getImageUrl } from '../../utils/imageUrl'` |
| R3 | Không dùng template literal cho R2 images | `src={\`/images/...\`}` | `src={getImageUrl(item.path)}` |
| R4 | Trước khi upload R2: rename `download.png` | *(download.png vẫn còn)* | `python3 auto_rename.py <week>` |

---

## 🔊 TTS / AUDIO

| # | Rule | Anti-pattern | Correct |
|---|------|-------------|---------|
| R5 | **MindMap dùng `'mindmap_speaking'`** | `speakText(text, url, 1.0, null, 'read', ...)` | `speakText(text, url, 1.0, null, 'mindmap_speaking', ...)` |
| R6 | Khi copy-paste `speakText()`: kiểm tra station string | *(quên đổi station)* | Đối chiếu `STATION_VOICE_KEY` map |
| R7 | **Station map** | | `read/read_explore/explore` → narration, `dictation`/`shadowing` → cùng voice, `mindmap_speaking` → mindmap, `ask_ai`/`logic_lab`/`gamehub` → questions |
| R8 | **Sau khi upload audio R2**: thêm week vào `CDN_WEEKS` | *(quên cập nhật)* | `voiceService.js` → `CDN_WEEKS = [..., weekN]` |
| R9 | `mindmap_speaking` phải có trong `STATIC_STATIONS` | *(thiếu)* | Đã fix, kiểm tra nếu refactor voiceService |
| R10 | Giọng nam (helios/zeus/orion) cần gain boost | *(nghe nhỏ)* | Đã fix với `VOICE_GAIN_BOOST` trong voiceService — không cần làm gì thêm |

---

## 📁 DATA FILES

| # | Rule | Anti-pattern | Correct |
|---|------|-------------|---------|
| R11 | `word_match.js` pairs = objects, KHÔNG phải numbers | `pairs: [1, 2, 3, ..., 13]` | `pairs: [{word: '...', definition: '...'}]` |
| R12 | Easy mode folder = `week_XX_easy`, filename = KHÔNG có `_easy` suffix | `mindmap_stem_2_easy.mp3` | `/week_XX_easy/mindmap_stem_2.mp3` |
| R13 | Audio path format: `week_XX` với zero-pad | `weekX` | `week_XX` (week_01, week_16) |
| R14 | `index.js` station keys: dùng đúng key | `grammar_practice`, `word_chain` | `grammar`, `word_power`, `ask_ai` (không có suffix) |
| R15 | Không có `sentence_builder` trong station list | *(deprecated)* | Đã chuyển vào GameHub |
| R16 | `read.js` cần đúng 10 bold words `**word**` | 9 hoặc 11 | Đúng 10 |
| R17 | Homophones: kiểm tra Deepgram pronunciation trước | "read" → /rɛd/ | Dùng context trick nếu sai |

---

## 🔧 COMPONENT CODE

| # | Rule | Anti-pattern | Correct |
|---|------|-------------|---------|
| R18 | Component mới có ảnh từ data: thêm `getImageUrl` NGAY | *(quên khi viết mới)* | Thêm vào trước khi test lần đầu |
| R19 | Component mới có TTS: kiểm tra station name NGAY | *(copy-paste từ component khác)* | Đối chiếu `STATION_VOICE_KEY` |
| R20 | `_BAK.jsx`, `_broken.jsx`: không sửa, không tạo mới | *(edit backup)* | Xóa hoặc bỏ qua |

---

## 🚀 DEPLOY

| # | Rule | Anti-pattern | Correct |
|---|------|-------------|---------|
| R21 | **Chạy gate trước commit**: `bash tools/code_quality_gate.sh <week>` | *(skip validation)* | Phải PASS (0 errors) |
| R22 | Images public/ bị gitignore: force-add | `git add public/images/...` → 0 files | `git add -f public/images/weekXX/` |
| R23 | Audio public/ bị gitignore: force-add | *(tương tự)* | `git add -f public/audio/weekXX/` |
| R24 | Kiểm tra `.wrangler/` không vào commit | *(lỡ add)* | `git status` trước commit |
| R25 | Test YouTube links trước khi commit | *(link bị xóa)* | Mở link, verify không 404 |

---

## 🤖 AI TUTOR

| # | Rule | Anti-pattern | Correct |
|---|------|-------------|---------|
| R26 | Mỗi mission PHẢI có `objectives: [...]` array | *(thiếu objectives)* | Mỗi mission: 10-12 objectives |
| R27 | FreeTalk `knowledge_base`: dùng plain strings, không số | `"1. Topic about..."` | `"Topic about..."` (không số đầu dòng) |
| R28 | AI Tutor `week_id` phải khớp với số tuần | `week_id: 5` trong week 16 | `week_id: 16` |

---

## ✅ QUY TRÌNH GATE BẮTBUỘC (trước mỗi commit)

```bash
# 1. Chạy data validator
node tools/validate_week.js <week>

# 2. Chạy content quality check  
bash tools/validate_content_quality.sh <week>

# 3. ⚡ CHẠY CODE QUALITY GATE (mới — kiểm tra code patterns)
bash tools/code_quality_gate.sh <week>
# → Phải PASS trước khi được commit

# 4. Commit (nếu tất cả pass)
git add -f public/images/weekXX/ public/audio/weekXX/
git add src/data/weeks/weekXX/ src/data/weeks_easy/weekXX/
git commit -m "Week XX: [Title]"
```

---

*Cập nhật lần cuối: March 23, 2026 — Sau Week 16 (BUG-18/19/20)*  
*Xem chi tiết đầy đủ: `LESSONS_LEARNED_WEEK_9-11_FOR_W12.md`*
