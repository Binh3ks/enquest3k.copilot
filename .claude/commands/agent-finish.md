# Custom Command: /agent-finish

## Description
Kết thúc task, chạy quality gate và cập nhật hệ thống memory tự động.

## Instructions
When this command is run, you MUST execute these steps in order:

### 1. Quality Gate Check
If the task involved week content changes, remind the user to run:
```bash
bash production_kit/tools/code_quality_gate.sh NN
```

### 2. Update Task Status
- Move completed tasks from `.ai/tasks/ACTIVE.md` to `.ai/tasks/DONE.md`
- Mark completed tasks with `[x]` and add timestamp
- Keep pending tasks in ACTIVE.md

### 3. Update Memory
- Update `.ai/memory/CURRENT.md` with the latest system state
- Append a one-liner to `.ai/memory/HISTORY.md` with session summary

### 4. Git Status
- Show current git branch and recent commits
- Suggest a conventional commit message based on the work done

### 5. Cleanup
- Reset `.ai/tasks/ACTIVE.md` if all tasks are complete
- Output summary of changes made during session

This command ensures proper session closure and memory persistence for continuity.
