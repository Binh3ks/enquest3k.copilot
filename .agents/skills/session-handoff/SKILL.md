---
name: session-handoff
description: Use when the user requests a session handoff (/handoff or "handoff phiên") to summarize completed work, save uncommitted state, and generate `.agents/handoffs/latest_handoff.md` for seamless continuation in the next session.
---

# Session Handoff Protocol (`/handoff`)

When the user runs `/handoff` or asks to end/handoff the session:

## Mandatory Execution Steps:

1. **Verify Git & Build Status**:
   - Run `git status --short` and `git log -n 1 --oneline`.
   - Run `npm run audit:week <currentWeek>` (if week data was modified) and `npm run build` to confirm zero build errors before handing off.

2. **Generate & Save Handoff Report**:
   - Run `node scripts/handoff.mjs "<Brief 1-2 sentence summary of what was accomplished in this session>"` to automatically save:
     - `.agents/handoffs/latest_handoff.md` (latest pointer for the next session)
     - `.agents/handoffs/handoff_<timestamp>.md` (permanent historical backup)

3. **Present Structured Report to User**:
   Structure your final turn output as follows:
   ```markdown
   ## 🤝 Session Handoff Complete (`/handoff`)
   - **Saved Handoff File**: `.agents/handoffs/latest_handoff.md`
   - **Latest Commit**: `<hash> <message>`
   - **Branch**: `<branch_name>`

   ### ✅ Work Completed:
   - [Item 1]
   - [Item 2]

   ### 🟡 Pending / Next Steps for New Session (`/start`):
   - [Step 1]
   - [Step 2]
   ```
