# 🚀 ENGQUEST3K — FEATURE SPECS V2.0

**Document Reference**: `docs/FEATURE_SPECS_V2.md`  
**Priority**: Phát triển trước khi sản xuất W34+  
**Effective Date**: 2026-09-05  
**Status**: 📋 SPEC DRAFT — Chờ Implementation

---

## Feature 1: SRS — Spaced Repetition System (Leitner 5-Box)

### Rationale
Từ vựng Cambridge Flyers (~1,200 từ) cần được ôn tập xoay vòng qua các tuần. Hiện tại, mỗi tuần là một silo độc lập — học sinh quên 80% từ vựng sau 4 tuần. SRS Leitner giải quyết bằng cách tự động đưa từ khó vào lịch ôn tập tối ưu.

### Data Model

```javascript
// localStorage key: `engquest_srs_${userId}`
{
  version: 2,
  boxes: {
    1: [{ word: "corridor", weekLearned: 33, lastReviewed: "2026-09-01", correctStreak: 0 }],
    2: [], // Review after 2 days
    3: [], // Review after 4 days
    4: [], // Review after 1 week
    5: []  // Mastered — review after 2 weeks
  },
  stats: {
    totalWords: 0,
    masteredWords: 0,
    dailyReviewsDone: 0
  }
}
```

### Integration Points
- **gear1_webtoon → gear4_clil**: Khi học sinh gặp từ mới, tự động thêm vào Box 1.
- **Daily Warm-up**: Trước khi vào Quest đầu tiên mỗi ngày, hiển thị 5–10 flashcards SRS.
- **word_blitz (Speed Match)**: Ưu tiên từ trong Box 1–2 để tăng tần suất tiếp xúc.
- **weekly_review**: Báo cáo SRS stats trong Passport cuối tuần.

### Component
- `SRSFlashcardReview.jsx` — Modal flashcard với flip animation, nút "Nhớ" / "Chưa nhớ".

---

## Feature 2: Diagnostic Placement Test

### Rationale
Học sinh mới đăng ký cần được xếp vào đúng tuần bắt đầu thay vì mặc định W01. Test 20 câu MCQ covering phonics → grammar → reading → listening sẽ auto-place vào starting week phù hợp.

### Test Structure

```
20 Questions total:
├── Q1–Q5:   Pre-A1 Starters (Phonics, Word Recognition)
├── Q6–Q10:  A1 Movers (Sentence Completion, Prepositions)
├── Q11–Q15: A2 Flyers (Reading Comprehension, Past Tense)
└── Q16–Q20: B1 PET (Inference, Complex Grammar)

Scoring:
- 0–5  correct → Start W01 (Pre-A1)
- 6–10 correct → Start W17 (A1 Movers)
- 11–15 correct → Start W33 (A2 Flyers)
- 16–20 correct → Start W73 (B1 PET)
```

### Data Model

```javascript
// src/data/diagnostic/placement_test.js
export const placementTest = {
  version: 1,
  timeLimit: 900, // 15 minutes
  questions: [
    {
      id: 'diag_01',
      level: 'pre_a1',
      type: 'mcq_image', // MCQ with image
      question: 'What is this?',
      image: 'diagnostic/cat.webp',
      options: ['A cat', 'A dog', 'A bird', 'A fish'],
      correct: 0
    },
    // ... 19 more
  ]
};
```

### Integration Points
- **Onboarding flow**: Hiển thị sau màn hình chào mừng, trước khi vào tuần đầu tiên.
- **Progress system**: Set `startingWeek` trong user profile.
- **Skip option**: Cho phép phụ huynh bỏ qua và chọn tuần thủ công.

### Component
- `DiagnosticTest.jsx` — Full-screen test UI với progress bar, timer, và kết quả.

---

## Feature 3: Writing Frequency Boost (Quick Write Warm-ups)

### Rationale
Writing hiện chỉ tập trung ở Zone 4 (Day 4). Nghiên cứu cho thấy tần suất viết ngắn hàng ngày (2–3 câu) hiệu quả hơn 1 bài viết dài mỗi tuần. Quick Write warm-ups tích hợp vào các quest existing.

### Implementation

```
Quick Write integration points:
├── Day 1: gear3_retell → "Write 1 sentence about what happened" (after retelling)
├── Day 2: science_lab → "Write your prediction" (before experiment)  
├── Day 3: sentence_smash → "Make your own sentence with these words" (after sorting)
├── Day 4: story_writer → Already full writing quest (no change)
└── Day 5: weekly_review → "Write 1 thing you learned this week" (reflection)
```

### Data Model

```javascript
// Thêm vào mỗi quest config:
{
  quickWrite: {
    enabled: true,
    prompt: "Write 1 sentence about what happened in the story.",
    minWords: 3,
    maxWords: 20,
    scaffoldPills: ["The boy", "went to", "because"],
    scoring: 'participation' // 'participation' | 'quality'
  }
}
```

### Integration Points
- **Existing quest components**: Thêm Quick Write panel ở cuối quest, trước nút "Complete".
- **Progress tracking**: Log `quickWriteAttempted: true/false` trong analytics.
- **Lite Mode (W01–W16)**: Quick Write = Draw & Say (vẽ tranh + nói, chưa viết).

### Component
- `QuickWritePanel.jsx` — Collapsible textarea với pill suggestions và word counter.

---

## Feature 4: Inference Training ("Why?" Questions)

### Rationale
Cambridge Flyers Reading Part 5 và B1 PET đều yêu cầu inference — suy luận thông tin không nêu trực tiếp trong văn bản. Hiện tại, gear4_clil (Fact Finder) chỉ hỏi factual questions. Thêm 2 "Why?" questions per CLIL lesson.

### Implementation

```javascript
// Thêm vào gear4_clil data trong reading_hub.js:
{
  inferenceQuestions: [
    {
      id: 'inf_01',
      text: "Why do you think the farmer waters the plants every morning?",
      type: 'open_response',
      scaffoldHint: "Think about what plants need to grow.",
      modelAnswer: "Because plants need water to stay alive and grow.",
      acceptableKeywords: ['water', 'grow', 'need', 'alive', 'sun']
    },
    {
      id: 'inf_02', 
      text: "How do you think the children felt when they saw the rainbow?",
      type: 'mcq_with_evidence',
      options: [
        { text: "Happy and excited", evidence: "They jumped up and pointed at the sky." },
        { text: "Scared and worried", evidence: null },
        { text: "Bored and sleepy", evidence: null }
      ],
      correct: 0
    }
  ]
}
```

### Integration Points
- **gear4_clil (Fact Finder)**: Sau 4 factual questions, hiển thị 2 inference questions.
- **boss_reading (Reading Shield)**: Flyers Reading Part 5 inference questions.
- **Scaffolding tier**: Tier 1 = MCQ + evidence highlight, Tier 2 = MCQ only, Tier 3 = open response.

### Component
- `InferenceQuestion.jsx` — Hiển thị passage highlight + question + evidence selector.

---

## Feature 5: Parent Dashboard (Weekly Progress Summary)

### Rationale
Phụ huynh cần biết con đang ở đâu trong hành trình 156 tuần mà không cần vào app. Weekly summary gửi qua email/notification hoặc hiển thị trong parent view.

### Data Model

```javascript
// Aggregated weekly report
{
  weekNumber: 33,
  studentName: "Minh",
  completionRate: "14/15",
  timeSpent: "2h 15m",
  skills: {
    listening: { score: 4, trend: 'up' },
    reading: { score: 3, trend: 'stable' },
    writing: { score: 3, trend: 'up' },
    speaking: { score: 5, trend: 'up' }
  },
  srsStats: {
    totalWords: 45,
    masteredWords: 28,
    needsReview: 8
  },
  highlights: [
    "Hoàn thành Story Retell lần đầu tiên không cần scaffolding!",
    "Đạt 5/5 Khiên trong Listening Shield"
  ],
  areasToImprove: [
    "Cần luyện thêm Past Simple (-ed endings)"
  ]
}
```

### Implementation
- **Parent PIN**: 4-digit PIN để truy cập parent view (tránh trẻ tự xem).
- **Weekly email**: Optional — phụ huynh đăng ký email nhận báo cáo tự động.
- **UI view**: Tab "Phụ huynh" trong app với biểu đồ radar 4 kỹ năng và timeline tiến độ.

### Component
- `ParentDashboard.jsx` — Protected view với PIN, radar chart, timeline, và SRS stats.
- `WeeklyReport.jsx` — Printable/shareable weekly summary card.

---

## Implementation Priority

| # | Feature | Effort | Impact | Priority |
|---|---------|--------|--------|----------|
| 1 | **SRS Leitner 5-Box** | Medium | Critical | P0 — Build first |
| 2 | **Diagnostic Placement Test** | Low | High | P1 — Build second |
| 3 | **Inference Training** | Low | High | P1 — Build with CLIL |
| 4 | **Writing Frequency Boost** | Low | Medium | P2 — Add incrementally |
| 5 | **Parent Dashboard** | High | Medium | P2 — Build after core |
