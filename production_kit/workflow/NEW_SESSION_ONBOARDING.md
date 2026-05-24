# NEW SESSION ONBOARDING PROMPT

Khi bắt đầu phiên mới hoặc nhận agent mới, chạy script này:

```bash
node ~/.claude/settings.json/scripts/onboard.js
```

Hoặc thủ công:

## BƯỚC 1: Đọc Memory

```bash
cat ~/.claude/projects/-Users-binhnguyen-Downloads-Engquest3k/memory/project_context.md
cat ~/.claude/projects/-Users-binhnguyen-Downloads-Engquest3k/memory/current-session.md
```

**Kiểm tra:**
- project_context.md: Week cao nhất đã deploy
- current-session.md: Task đang làm, pending work
- Nếu stale (>3 ngày) → cập nhật trước khi làm gì

## BƯỚC 2: Đọc CLAUDE.md

```bash
cat /Users/binhnguyen/Downloads/Engquest3k/CLAUDE.md
```

**Lưu ý quan trọng:**
- Toolkit scripts location
- Validation commands
- Dangerous operations (always confirm)
- Chunk-first rules (W28+)

## BƯỚC 3: Kiểm Tra Workspace

```bash
cd /Users/binhnguyen/Downloads/Engquest3k

# Current state
git status --short
git log --oneline -3

# Highest deployed week
ls src/data/weeks/ | grep "week_" | sort -V | tail -1

# Next week to create
NEXT_WEEK=$(ls src/data/weeks/ | grep "week_" | sort -V | tail -1 | sed 's/week_//')
echo "Current: week_$NEXT_WEEK"
echo "Next to create: week_$((NEXT_WEEK + 1))"
```

## BƯỚC 4: Đọc Production Workflow

```bash
cat production_kit/workflow/STANDARD_WEEK_CREATION_WORKFLOW.md
```

**4 W34 Bugs cần nhớ:**
1. `singapore_math.js` phải dùng `problems:` NOT `questions:`
2. bar_model paths: `barmodel_w{NN}_{mode}_p{n}_v1.jpg`
3. `index.js` phải có cho CẢ 2 modes
4. `index.js` stations object phải include `daily_watch`

## BÁO CÁO SAU 4 BƯỚC

```
## ONBOARDING REPORT

### Memory
- project_context.md: [đã đọc/cần cập nhật]
- current-session.md: [đã đọc/cần cập nhật]

### Workspace
- Current week: [số]
- Next week to create: [số]
- Uncommitted changes: [YES/NO]
  - Nếu YES: commit trước khi làm gì khác

### CLAUDE.md
- Đã đọc: YES/NO
- Toolkit location: production_kit/
- Critical rules: [kể 2-3 rules quan trọng nhất]

### Workflow
- Đã đọc: YES/NO
- Golden template: Week 34
- File requirement: 17 files/mode (34 total) + 2 AI Tutor = 36 files
- 4 W34 bugs: [kể tên]

### Ready State
✅ Sẵn sàng nhận lệnh
```

---

## LỆNH NHẬN ĐƯỢC

| Lệnh | Hành động |
|-------|-----------|
| `Tạo tuần N` | Chạy STANDARD_WEEK_CREATION_WORKFLOW.md |
| `/start` | Session launcher (memload + scope + suggest) |
| `/scope` | Current task scope |
| `/review` | Check uncommitted changes |

---

## QUY TẮC VÀNG

1. **Clone, đừng viết tay** - luôn clone từ template
2. **index.js cho CẢ 2 modes** - thiếu = crash
3. **Test CẢ 2 modes** - Advanced AND Easy
4. **Validation trước deploy** - bug_prevention_check.sh
5. **Rollback tag** - `git tag pre-week-N-backup` trước khi thay đổi lớn
