# Custom Command: /agent-start

## Description
Khởi động phiên làm việc mới, nạp toàn bộ context và memory của AgentOS.

## Instructions
When this command is run, you MUST execute these steps in order:

1. Read `.ai/AGENTOS_SPEC.md` to understand the AgentOS specification.
2. Read `.ai/memory/CURRENT.md` to update your internal state on the project status.
3. Read `.ai/tasks/ACTIVE.md` to see what needs to be worked on.
4. Read `CLAUDE.md` to understand available production tools and rules.
5. Output a short summary confirming you are fully initialized and ready with:
   - Current project status from CURRENT.md
   - Active tasks from ACTIVE.md
   - Key rules from CLAUDE.md

This command ensures all agents start with consistent context before beginning any task.
