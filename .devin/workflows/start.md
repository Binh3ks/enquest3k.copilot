# 🤖 OpenHands / Devin Startup Workflow

## 1. Context Synchronization
Before executing ANY task or investigation, you MUST:
1. Read `.ai/AGENTOS_SPEC.md` to understand your execution boundaries.
2. Read `.ai/memory/CURRENT.md` to synchronize with the current system state.
3. Read `.ai/tasks/ACTIVE.md` to verify if your assigned bug/task matches the active context.

## 2. Quality Gates & Cooperation
- Do not conflict with Claude Code active workflows.
- After fixing a bug, you MUST append details to `.ai/decisions/DECISIONS_LOG.md`.
- Run `bash production_kit/tools/bug_prevention_check.sh` before pushing any changes.

## 3. Output Discipline (token-saving)
Khi xuất báo cáo hoặc sửa code, uu tien code cong dong va bo qua phan tich ly thuyet thua de tranh can kiet output token giua chung.
- Bao cao tien do: chi neu (a) da xong, (b) dang do, (c) can user quyet dinh - khong lap lai context da biet.
- Bao cao bug: nhay thang vao Root Cause + Code Fix; bo phan mo ta file-table/kien truc tru khi user yeu cau.
- Code fix: chia thanh cac block nho theo file; moi block <=30 dong; bo comment giai thich tru khi can thiet.
- KHONG viet "Hay xem tiep phan sau", "trinh bay bao cao day du" kieu rerun - cht tung phan ngay trong message.
- Khi phat hien sap het output budget: dung giai thich, chuyen ngay sang code patch ngan nhat co the.
