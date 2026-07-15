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
| **R4a** | **⛔ AGENT KHÔNG ĐƯỢC tự chạy image generation scripts** | `node tools/batch_manager.js` | Chỉ tạo file prompts. User tự chạy script. |
| **R4b** | **Image prompts = vocab + wordpower + covers ONLY** | Prompts có `barmodel_` entries | Bar models auto-gen bởi Python script, KHÔNG vào prompts |
| **R4c** | **Prompt files thuộc `Production_FINAL/IMAGE PROMPTS/`** | `public/images/Prompts/` | `Production_FINAL/IMAGE PROMPTS/week_NN_image_prompts.txt` |
| **R4d** | **`week22_easy`, `week23_easy`... không tồn tại** | Tạo folder `weekN_easy` cho images | W20+: 1 folder dùng chung `weekN/` cho cả adv và easy |

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

## 📋 LESSON JSON CONTENT QUALITY — MANDATORY CHECKLIST

> Áp dụng cho mọi file `mcp-server/data/lessons/W{N}.json` (+ `public/data/lessons/`)

| # | Rule | Anti-pattern | Correct |
|---|------|-------------|---------|
| R29 | **PART 4 không được chứa placeholder stubs** | `— Cambridge Flyers Listening format` (xuất hiện 2-3 lần) | Xóa hết những dòng bắt đầu bằng `—` có chứa "Cambridge" |
| R30 | **PART 3 L2 items PHẢI có số thứ tự** | `The cat runs fast → ...` (không số) | `1. The cat runs fast → ...` |
| R31 | **PART 9 Homework PHẢI có Portfolio section** | *(thiếu mục Portfolio hoàn toàn)* | Thêm trước `🎥 VIDEO CHALLENGE`: `Portfolio (Homework Connection):` + 2 câu gợi ý |
| R32 | **Portfolio Extension PHẢI có instructions** | `Portfolio Extension (2 items):` + dòng trống | Thêm 1 dòng hướng dẫn: "Write 2 sentences using irregular past verbs..." |
| R33 | **Tất cả PART 1–8 PHẢI có `[ Sub-total: ___ / X ]`** | Part không có sub-total cuối | Thêm dòng `[ Sub-total: ___ / X ]` vào cuối content array của mỗi part |
| R34 | **Homework sentences có sẵn số KHÔNG được auto-number thêm** | `5. Write a sentence...____` → renderer xuất `5. 5. Write...` | Renderer check: `!/^\d+\.\s/.test(s.trim())` trước khi gắn qNum |
| R35 | **Sau khi sửa `mcp-server/data/lessons/W{N}.json` PHẢI copy sang `public/data/`** | Chỉ sửa 1 trong 2 | `shutil.copy(path_mcp, path_pub)` hoặc `cp mcp-server/.../W{N}.json public/data/...` |
| R36 | **Sau khi thay đổi bất kỳ W{N}.json PHẢI rebuild `lessonPlans.json`** | `public/data/lessonPlans.json` stale | `python3 -c "import json,os; ..."` hoặc chạy script rebuild |
| R37 | **L4 "Base: ... + Add: (...)" items PHẢI được isExLine nhận diện** | L4 items render không có số (unnumbered) | isExLine check: `\|\| /^Base:\s/.test(t)` |
| R38 | **PART 5 "Type A/B/C:" items PHẢI được isExLine nhận diện** | Type A/B/C không có số → không đếm điểm trong display | isExLine check: `\|\| /^Type\s+[A-Z]/.test(t)` |
| R39 | **Video challenge script với `[N] ___` KHÔNG được auto-number** | Reading passage `"Hello everyone! [1] ___"` → xuất `21. Hello everyone!...` | Check `/\[\d+\]\s*_{3,}/.test(s)` trước khi auto-number |
| R40 | **`get_part_key()` phải dùng `startswith`, không dùng `in`** | `'PART 1' in 'PART 8: ... (PART 1)'` = True → wrong match | `title.startswith('PART 1:')` hoặc `title.startswith('PART 1 ')` |
| R41 | **Sub-total phải khớp SỐ ITEM mà renderer đánh số** | PART 7 có 6 dòng `____` không có prefix `1.` → render 6 item, nhưng khai `/5` | Đếm actual items bằng is_ex_line; nếu actual > declared → sửa declared |
| R42 | **PART 7 format quyết định sub-total: 5 hay 6** | Items có prefix `1. Write...` → actual=0 → `/5` đúng | Items KHÔNG có prefix số → actual=6 → `/6`. Hai format này không được trộn lẫn |
| R43 | **Session totals phải trong ±5 pts so với ~83 (target S1=S2≈83, S3≤90)** | W26 S1/S2=66, W31 S1/S2=74, W35 S1/S2=75, W36 S3=77 — đều sai | Chạy `python3 _audit_all.py` sau MỌI thay đổi content. Nếu bất kỳ session nào <78 hoặc >90 → phải fix trước khi commit |
| R44 | **PART 3 sub-total phải phản ánh TẤT CẢ item có thể grade, kể cả [O]L2 format số** | [O]L2 dùng `1./2./...` prefix → is_ex_line không đếm; nhưng teacher VẪN grade → phải khai trong declared total | Declared total = L1(10)+L2(10)+L3(10)+L4(10)+L5(5) = /45 kể cả khi [O]L2 dùng numbered format |
| R45 | **PART 4 Dictation PHẢI có instruction + blank line cho học sinh viết** | `D. Dictation:` không có gì → học sinh không biết phải viết gì, không có chỗ viết | Format chuẩn: `D. Dictation (teacher reads twice — students write N sentence(s)):` + `1. ____` (S1/S2: N=1; S3: N=2 với thêm `2. ____`) |

### Kiểm tra nhanh (Quick Audit):
```bash
python3 << 'EOF'
import json, re, glob

ARROW = '\u2192'
def is_ex_line(t):
    t = t.strip()
    if not t or t.startswith(ARROW) or t.startswith('\u2b1b'): return False
    if re.match(r'^[_\s]+$', t): return False
    if re.match(r'^\[\s*(Sub-total|Total)', t) or re.search(r'/\s*\d+\s*\]', t): return False
    if re.match(r'^\d+\.\s', t) or re.match(r'^[a-p]\.\s', t): return False
    if re.match(r'^Stage\s+\d', t) or re.match(r'^(\[O\]\s*)?L[1-5]\s*[—–\-]', t): return False
    if re.match(r'^(Extension|Challenge|Design challenge):', t) and '____' not in t: return False
    if re.match(r'^Write\s+.+:\s*$', t): return False
    if re.search(r'\[\d+\]\s*_{3,}', t): return False
    return (t.startswith('T / F:') or ('____' in t and not t.startswith(ARROW)) or
            ' -> ' in t or t.startswith('Base:') or bool(re.match(r'^Type\s+[A-Z]', t)))

def get_part_key(title):
    for k in ['PART 1','PART 2','PART 3','PART 4','PART 5','PART 6','PART 7','PART 8']:
        if title.startswith(k+':') or title.startswith(k+' '): return k
    return None

for f in sorted(glob.glob("mcp-server/data/lessons/W*.json")):
    w = re.search(r'W(\d+)', f).group(1)
    data = json.load(open(f))
    for si, s in enumerate(data['sessions']):
        for p in s['parts']:
            title = p.get('title',''); c = p.get('content',[])
            pk = get_part_key(title)
            if not pk: continue
            marker = next((str(l) for l in c if 'Sub-total' in str(l)), None)
            actual = sum(1 for l in c if is_ex_line(str(l)))
            if marker:
                m = re.search(r'/\s*(\d+)', marker)
                declared = int(m.group(1)) if m else 0
                if actual > declared > 0:
                    print(f"W{w} S{si+1} {pk}: declared={declared}, actual={actual} → UNDER-DECLARED")
            if 'PART 4' in title:
                n = sum(1 for l in c if str(l).strip().startswith('—') and 'Cambridge' in str(l))
                if n: print(f"W{w} S{si+1} PART4: {n} Cambridge placeholders")
            if 'PART 9' in title or 'HOMEWORK' in title:
                if not any('portfolio' in str(l).lower() for l in c):
                    print(f"W{w} S{si+1} PART9: missing Portfolio section")
EOF
```

### Số thứ tự trong bài tập — Qui tắc renderer (isExLine):
Items được đánh số nếu thỏa MỘT trong các điều kiện:
- Bắt đầu bằng `T / F:`
- Có chứa `____` và không bắt đầu bằng `→`
- Có chứa ` -> ` (mũi tên ASCII với khoảng trắng hai bên)
- Bắt đầu bằng `Base:` **(L4 Sentence Expansion)**
- Match `/^Type\s+[A-Z]/` **(PART 5 Error Correction)**

Items KHÔNG được đánh số nếu:
- Bắt đầu bằng `→`, `⬛`, `📋`, `🔍`, `📌`
- Match `^\d+\.\s` (numbered sub-items rendered as bold headers)
- Match `^[a-p]\.\s` (lettered collocation choices)
- Match `^Stage\s+\d` hoặc `^L[1-5]\s*[—–-]`
- Match `^(Extension|Challenge|Design challenge):` mà không có `____`
- Match `^\[\s*(Sub-total|Total)`
- Là reading passage có `[N] ___` (bracket-numbered blanks) — video challenge script

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

*Cập nhật lần cuối: May 6, 2026 — R45 thêm sau fix dictation toàn bộ W1-W53 (trừ W43-W47 format khác)*  
*Xem chi tiết đầy đủ: `LESSONS_LEARNED_WEEK_9-11_FOR_W12.md`*
