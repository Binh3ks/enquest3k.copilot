---
name: session-start
description: Use at the start of any new conversation session (/start or "bắt đầu phiên mới") to load handoff context from `.agents/handoffs/latest_handoff.md`, read AGENTS.md rules, check git status, and brief the user before executing new directives.
---

# Session Start Protocol (`/start`)

When the user starts a session with `/start` or asks to resume/load context from the previous session:

## Mandatory Execution Steps:

1. **Read Previous Session Handoff**:
   - Check if `.agents/handoffs/latest_handoff.md` exists.
   - Use `view_file` to read the entire contents of `.agents/handoffs/latest_handoff.md`.

2. **Read Workspace Directives (`AGENTS.md`)**:
   - Read `AGENTS.md` to ensure adherence to Multi-Agent Review Protocol, ESL Chunking, Cambridge Blueprint, and Code Quality Standards.

3. **Check Repository Environment**:
   - Run `node scripts/start_session.mjs` to view current git status, active branch, and latest commit.

4. **Brief User & Await Directives**:
   Present a concise 3-part briefing:
   ```markdown
   ## 🚀 Session Initialized (`/start`)
   - **Active Branch**: `<branch>`
   - **Latest Commit**: `<commit>`
   - **Previous Handoff Loaded**: `.agents/handoffs/latest_handoff.md`

   ### 📋 Context Handed Off from Last Session:
   - **Completed**: <Key achievements from last session>
   - **Pending / In-Progress**: <Next steps identified in handoff>

   ✅ System ready for your next request!
   ```
