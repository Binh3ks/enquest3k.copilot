# production_kit — EngQuest3K Mass Production Toolkit

> **Single source of truth** cho tất cả file liên quan đến mass production hàng tuần.
> **Last updated**: May 18, 2026

---

## Cấu trúc

```
production_kit/
├── README.md                          ← Bạn đang ở đây
├── workflow/
│   ├── AGENT_SELF_CHECK_WORKFLOW.md  ← 11-step production workflow
│   ├── 0. NEW_AGENT_ONBOARDING_PROMPT.md ← Onboarding prompt (copy-paste vào chat mới)
│   └── TOOLKIT_INTEGRATION.md        ← Tool → workflow mapping
├── never_rules/
│   └── PRODUCTION_NEVER_RULES.md     ← 50+ rules với Why: + Source:
├── tools/
│   ├── preflight_check.sh            ← Pre-production system check (6 tests)
│   ├── bug_prevention_check.sh       ← Bug detection (10 patterns)
│   ├── code_quality_gate.sh          ← Quality gate (43 checks, C-01→C-43)
│   └── validate_sgmath_types.mjs      ← Singapore Math type validation
├── pipeline/
│   └── build_week_lesson_plan.py     ← Unified lesson plan entry point
└── reference/
    ├── Syllabus_V5_PublicationReady.docx
    ├── ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md
    ├── STEM_INTEGRATION_STRATEGY_W16_ONWARDS.md
    └── SUBTAB_ROADMAP.md
```

---

## Quick Start — New Chat Session

Copy-paste đoạn dưới vào Claude Code chat mới:

```
Tôi cần bạn đóng vai Production Agent cho EngQuest3K.

Workspace: /Users/binhnguyen/Downloads/Engquest3k/

Hãy đọc và follow quy trình trong:
production_kit/workflow/0. NEW_AGENT_ONBOARDING_PROMPT.md

Sẵn sàng nhận lệnh: "Tạo tuần N"
```

---

## Quy Trình Mới (W33+)

### Mỗi tuần production, chạy:

```bash
# 1. Pre-flight check
bash production_kit/tools/preflight_check.sh

# 2. Follow workflow: BƯỚC 0 → BƯỚC 10
# (Chi tiết trong production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md)

# 3. Validation (sau khi tạo content)
bash production_kit/tools/bug_prevention_check.sh 33
bash production_kit/tools/code_quality_gate.sh 33
node production_kit/tools/validate_sgmath_types.mjs 33
npm run content:lint -- --week 33 --errors-only

# 4. E2E tests
TEST_WEEK=33 npx playwright test --project=chromium

# 5. Deploy
git add . && git commit -m "feat(week33): add week 33 content" && git push
```

### Lesson Plan (Teacher Panel):
```bash
python3 production_kit/pipeline/build_week_lesson_plan.py 33      # single week
python3 production_kit/pipeline/build_week_lesson_plan.py 30-35   # range
```

---

## File Nào Cần Đọc Khi Nào

| Trường hợp | File đọc |
|------------|---------|
| Onboard agent mới | `workflow/0. NEW_AGENT_ONBOARDING_PROMPT.md` |
| Tạo nội dung tuần mới | `workflow/AGENT_SELF_CHECK_WORKFLOW.md` (BƯỚC 0→10) |
| Gặp bug lạ | `never_rules/PRODUCTION_NEVER_RULES.md` |
| Check schema/content | `tools/code_quality_gate.sh` |
| Check Singapore Math | `tools/validate_sgmath_types.mjs` |
| Chuẩn bị W35+ | `reference/SUBTAB_ROADMAP.md` |
| W16+ STEM content | `reference/STEM_INTEGRATION_STRATEGY_W16_ONWARDS.md` |
| Thông tin tuần (grammar/vocab) | `reference/Syllabus_V5_PublicationReady.docx` |
| Cấu trúc file/station specs | `reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` |

---

## 6 Fixes Đã Thực Hiện (May 2026)

| # | Fix | File |
|---|-----|------|
| 1 | Tạo SUBTAB_ROADMAP.md — fix W35+ contradiction | `reference/SUBTAB_ROADMAP.md` |
| 2 | CHECK numbering độc nhất (C-01→C-43) | `tools/code_quality_gate.sh` |
| 3 | BƯỚC 0.5 rút gọn (6 lệnh → 2 lệnh/file) | `workflow/AGENT_SELF_CHECK_WORKFLOW.md` |
| 4 | Unified lesson plan entry point | `pipeline/build_week_lesson_plan.py` |
| 5 | PRODUCTION_NEVER_RULES.md (50+ rules) | `never_rules/PRODUCTION_NEVER_RULES.md` |
| 6 | Runtime sgmath type validation | `tools/validate_sgmath_types.mjs` |

---

## Lưu Ý Quan Trọng

- **Production_FINAL/** = archive/historical (không phải canonical source nữa)
- **tools/** (root) = utility scripts (generate_audio, upload, etc.) — KHÔNG gom vào kit
- **pipeline/** (root) = helper scripts cho lesson plan — KHÔNG gom vào kit
- Chỉ gom **workflow, validation, reference** files dùng HÀNG TUẦN

---

## Thay Đổi Đường Dẫn (So Với Cũ)

| Cũ | Mới |
|-----|-----|
| `tools/code_quality_gate.sh` | `production_kit/tools/code_quality_gate.sh` |
| `tools/bug_prevention_check.sh` | `production_kit/tools/bug_prevention_check.sh` |
| `tools/preflight_check.sh` | `production_kit/tools/preflight_check.sh` |
| `Production_FINAL/...` | `production_kit/` |
