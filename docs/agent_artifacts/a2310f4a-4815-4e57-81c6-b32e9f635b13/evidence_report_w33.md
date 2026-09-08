# Báo Cáo Bằng Chứng Thực Tế — W33 Definition of Done
*Dữ liệu từ code scan trực tiếp — không phải khẳng định bằng lời*

---

## Mục 1 — Confidence Threshold cho Chấm Điểm AI

### Bằng chứng: `scoreWithDeepgram` — [useShadowingRecorder.js L43–87](file:///Users/binhnguyen/projects/Engquest3k/src/hooks/useShadowingRecorder.js#L43-L87)

```js
// Code thực tế hiện tại — không chỉnh sửa:
if (data.success && data.evaluation) {
  setScores(prev => ({
    ...prev,
    [sentenceId]: {
      score: data.evaluation.score,   // ← KHÔNG CÓ CHECK CONFIDENCE
      transcript: data.transcript || '',
      provider: 'deepgram',
    },
  }));
  return;
}
// Fallback: scoreWithWebSpeech — cũng KHÔNG có silence detection
```

> [!CAUTION]
> **CONFIRMED GAP**: Không có dòng nào kiểm tra `confidence` hoặc `transcript.length`. Audio im lặng gửi lên → Deepgram trả về score → code chấp nhận vô điều kiện.

**Trạng thái:** ❌ Chưa có confidence threshold

---

## Mục 2 — Bar Model: Logic Tỷ Lệ vs. Cách W33 Render

### Bằng chứng A: Component tính đúng — [BarModelSVG.jsx L9–31](file:///Users/binhnguyen/projects/Engquest3k/src/modules/hubs/station2/components/BarModelSVG.jsx#L9-L31)

```js
export function calculateBarModelProportions(bars = [], totalWidth = 380) {
  const totalSum = bars.reduce((acc, b) => acc + (Number(b.value) || 0), 0) || 100;
  return bars.map((bar, idx) => {
    const ratio = totalSum > 0 ? rawVal / totalSum : 1 / bars.length;
    return { ...bar, percent: Math.round(ratio * 100), width: ratio * totalWidth };
  });
}
```

Unit test thủ công từ công thức trên:

| Input | totalSum | width | percent |
|---|---|---|---|
| `[{value:40},{value:60}]` | 100 | 152px / 228px | 40% / 60% ✅ |
| `[{value:25},{value:75}]` | 100 | 95px / 285px | 25% / 75% ✅ |
| `[{value:70},{value:30}]` | 100 | 266px / 114px | 70% / 30% ✅ |

### Bằng chứng B: W33 KHÔNG dùng component này — [BarModelQuest.jsx L80–82, L298–308](file:///Users/binhnguyen/projects/Engquest3k/src/modules/hubs/station2/LearnMode/BarModelQuest.jsx#L80-L82)

```js
// Data W33 — modelData = null:
modelData: q.modelData || null,  // ← undefined → null

// Render logic:
{currentQ.modelData
  ? <BarModelSVG modelData={currentQ.modelData} />  // ← KHÔNG chạy vì null
  : <img src={currentQ.svg_url} ... />}             // ← Chỉ hiện SVG tĩnh
```

> [!WARNING]
> W33 dùng file SVG tĩnh vẽ tay (`/images/week33/barmodel_w33_adv_p1.svg`). Nếu file này vẽ sai tỷ lệ thì lỗi ở file ảnh, không phải component. Component `BarModelSVG` với `calculateBarModelProportions` **chưa bao giờ được gọi** cho W33.

**Trạng thái:** ⚠️ Component đúng toán học, nhưng W33 bypass hoàn toàn, dùng SVG tĩnh

### Bằng chứng C: Bug tiềm ẩn ở comparison type — [BarModelSVG.jsx L113, L121](file:///Users/binhnguyen/projects/Engquest3k/src/modules/hubs/station2/components/BarModelSVG.jsx#L113-L121)

```js
// comparison type — width hardcoded từ data, không qua calculateBarModelProportions:
<rect width={bars[0]?.width || 380} .../>  // ← nếu bars[0].width không được set đúng → full width
```

---

## Mục 3 — Microphone Lifecycle

### Bằng chứng: On-demand + cleanup — [useShadowingRecorder.js L148–174, L260–272](file:///Users/binhnguyen/projects/Engquest3k/src/hooks/useShadowingRecorder.js#L148-L174)

```js
// L150 — Chỉ mở mic khi bấm record:
const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // on-demand ✅

// L160 — Đóng ngay khi onstop:
stream.getTracks().forEach(t => t.stop()); // ✅

// L260–272 — Cleanup khi unmount:
return () => {
  if (mediaRecorderRef.current?.state === 'recording') {
    mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
  }
};
```

Scan toàn codebase cho `getUserMedia`: chỉ xuất hiện trong `startRecording` (L150) và `startRecordAll` (L231) — không có prewarm trong `useEffect`.

**Trạng thái:** ✅ Mic lifecycle đúng — on-demand, đóng đúng chỗ, không prewarm

---

## Mục 4 — CEFR Guard: Phạm Vi Quét

### Bằng chứng: [cefr_curriculum_guard.mjs L123–127](file:///Users/binhnguyen/projects/Engquest3k/scripts/cefr_curriculum_guard.mjs#L123-L127)

```js
const HUB_FILES = ['reading_hub.js', 'listening_hub.js', 'writing_hub.js', 'speaking_hub.js'];
const files = targetWeek >= 33
  ? allFiles.filter(f => HUB_FILES.includes(f))  // ← CHỈ 4 FILE
  : allFiles;
```

Files thực tế trong `src/data/weeks/week_33/`:

| File | Bị quét? |
|---|---|
| `reading_hub.js` | ✅ |
| `listening_hub.js` | ✅ |
| `writing_hub.js` | ✅ |
| `speaking_hub.js` | ✅ |
| `singapore_math.js` | ❌ bỏ sót |
| `shadowing.js` | ❌ bỏ sót |
| `vocab.js` | ❌ bỏ sót |
| `word_power.js` | ❌ bỏ sót |
| `week_33_real.js` | ❌ bỏ sót |
| `index.js` | ❌ bỏ sót |

**Trạng thái:** ❌ Chỉ quét 4/~12 file — từ vượt cấp trong hint text, AI tutor hoặc vocab sẽ không bị bắt

---

## Mục 5 — Kiểm Tra "Liquid Lubricant" Claim

### Bằng chứng: grep thực tế

```bash
$ grep -r "liquid\|lubricant" src/data/weeks/week_33/ src/data/weeks_easy/week_33/
# Output thực tế:
src/data/weeks/week_33/reading_hub.js: "A small pool of liquid left on the floor after cleaning..."
```

- `lubricant` → **Không tồn tại** trong W33 data
- `liquid` → Có trong `reading_hub.js`, **không bị ban** ở A2 level (từ đơn giản, Cambridge Movers)

**Trạng thái:** ✅ "liquid lubricant" không có trong W33 — claim của bản phê bình không có cơ sở từ data thực tế

---

## Tổng Kết Xác Nhận

| Hạng mục | Kết quả scan | Cần fix? |
|---|---|---|
| Confidence threshold | ❌ Chưa có — code xác nhận | **Phải fix trước W34** |
| Bar Model component | ✅ Đúng toán học | — |
| Bar Model W33 render | ⚠️ Dùng SVG tĩnh, bypass component | Fix: thêm `modelData` vào data |
| Comparison type bug | ⚠️ width hardcoded | Fix: dùng `calculateBarModelProportions` |
| Mic lifecycle | ✅ Đúng — on-demand + cleanup | — |
| CEFR guard scope | ❌ 4/12 files — code xác nhận | **Phải fix trước W34** |
| "lubricant" trong W33 | ✅ Không tồn tại | — |

---

## 3 Fix Hệ Thống Cần Implement Ngay

### Fix 1 — Confidence Threshold (Critical, ~15 dòng)

File: [`useShadowingRecorder.js`](file:///Users/binhnguyen/projects/Engquest3k/src/hooks/useShadowingRecorder.js) — thêm vào `scoreWithDeepgram`:

```js
const MIN_CONFIDENCE = 0.55;
const MIN_TRANSCRIPT_WORDS = 2;

if (data.success && data.evaluation) {
  const transcript = data.transcript || '';
  const wordCount = transcript.trim().split(/\s+/).filter(Boolean).length;
  const conf = data.evaluation.confidence ?? data.confidence ?? 1;

  if (wordCount < MIN_TRANSCRIPT_WORDS || conf < MIN_CONFIDENCE) {
    setScores(prev => ({
      ...prev,
      [sentenceId]: {
        score: 0,
        feedback: "🎤 Couldn't hear clearly. Try again!",
        transcript: '',
        provider: 'deepgram_low_confidence'
      }
    }));
    return;
  }
  // ... proceed với real score
}
```

### Fix 2 — CEFR Guard Scope (~3 dòng)

File: [`cefr_curriculum_guard.mjs`](file:///Users/binhnguyen/projects/Engquest3k/scripts/cefr_curriculum_guard.mjs) — thay L123–127:

```js
// Quét TẤT CẢ file .js, không filter theo weekNum:
const files = allFiles;
```

### Fix 3 — Bar Model: Dùng Dynamic Component (~30 dòng data)

File: [`BarModelQuest.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/hubs/station2/LearnMode/BarModelQuest.jsx) — thêm `modelData` vào `WEEK33_BAR_QUESTIONS`:

```js
{
  id: 1,
  title: 'Problem 1: Corridor Distance (Part-Whole)',
  text: 'Jake walked 40 meters. The corridor is 100 meters long. How many meters are left?',
  correctAnswer: 60,
  answer: '60 meters',
  hintText: '...',
  modelData: {
    type: 'part_whole',
    bars: [
      { value: 40, label: '40m walked', color: '#4f46e5' },
      { value: 60, label: '60m left', color: '#06b6d4' },
    ],
    totalLabel: '100m corridor'
  }
}
// → Khi modelData != null, BarModelSVG động được gọi thay SVG tĩnh
```

---

## Manual QA Checklist v1.0

*Dùng cho mọi tuần trước khi merge main*

```
## QA Checklist — Week [XX] — Ngày: [___] — Tester: [___]
Thiết bị: [ ] iPhone Safari  [ ] Android Chrome

### A. Voice Shadow
[ ] Nói câu → score hợp lệ (>0, <100%, có transcript text)
[ ] Im lặng 5s → "Couldn't hear clearly" — KHÔNG có score
[ ] Play My Voice → không lẫn tiếng TTS loa ngoài
[ ] Kết thúc câu → tab Chrome KHÔNG có chấm đỏ 🔴

### B. Math Quest
[ ] Bar Model bài 1 (40/100): thanh ngắn hơn thanh dài rõ ràng
[ ] Timer đếm ngược đều, không nhảy

### C. Hotspot & Labels
[ ] Scene Explorer: hotspot bấm được, label không chồng lấn
[ ] Listening Shield: pill EXAMPLE không đè tên nhân vật

### D. Viewport 360px
[ ] Title không bị cắt ở 15 quest
[ ] CTA chính không cần cuộn

Kết quả: [ ] PASS  [ ] FAIL — items: ___
```
