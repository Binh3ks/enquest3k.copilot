# Error Recovery — Week Production Runtime

---

Recovery always resumes from the last confirmed checkpoint.
Full restart is permitted only when no checkpoint exists.

---

## Phase 0 — Pre-flight

| Situation | Action |
|---|---|
| Stop | `preflight_check.sh` exits non-zero |
| Retry | Run the script again: `bash production_kit/tools/preflight_check.sh` |
| Resume | From CP0 after successful retry |
| Escalate | After 3 consecutive failures — surface error with script output to user |

---

## Phase 1 — Setup

| Situation | Action |
|---|---|
| Stop | `mkdir` or `cp` fails (missing golden standard, permission error) |
| Retry | Re-run the clone commands for the failed directory only |
| Resume | From CP1 after all files are confirmed present |
| Escalate | If golden standard itself is missing — halt and surface |

---

## Phase 2 — Videos

| Situation | Action |
|---|---|
| Stop | Video fetch fails (API error, no results, whitelist rejection) |
| Retry | Re-run `node tools/update_videos.js NN --reset` |
| Resume | From CP2 after `daily_watch.js` is confirmed in both ADV and Easy directories |
| Escalate | After 3 consecutive failures — use `backup_search` from `video_queries.json` |

---

## Phase 3 — Content

| Situation | Action |
|---|---|
| Stop | content-writer subagent reports BLOCKER or unexpected exit |
| Retry | Re-delegate to content-writer subagent with the same week parameters |
| Resume | From CP3 after all 19+19+1 files are confirmed saved |
| Escalate | If BLOCKER is a hard rule conflict — surface to user without further retries |

---

## Phase 4 — Validation

| Situation | Action |
|---|---|
| Stop | Any validator exits non-zero or returns FAIL |
| Retry | Fix the reported errors, then re-run the failed validator only |
| Resume | From CP4 after quality-reviewer returns SHIP |
| Escalate | If BLOCKER — stop immediately. Surface blocker. Do not retry. |

**FIX-THEN-SHIP loop:** Fix → re-validate → if FAIL again → fix → re-validate. Maximum 3 cycles before escalation.

---

## Phase 5 — Images

| Situation | Action |
|---|---|
| Stop | `orchestrator.mjs` fails mid-station |
| Retry | Re-run `node tools/image_pipeline/orchestrator.mjs --week NN --skip-existing` |
| Resume | From CP5 after orchestrator reports complete (all stations done) |
| Escalate | After 3 consecutive failures — surface error, do not continue to Phase 6 |

---

## Phase 6 — Audio

| Situation | Action |
|---|---|
| Stop | TTS request fails for a specific slot |
| Retry | Re-request TTS for the specific slot only |
| Resume | From CP6 — no batch gate, each slot is independent |
| Escalate | Not applicable — audio is on-demand; failure does not block commit |

---

## Phase 7 — Build

| Situation | Action |
|---|---|
| Stop | `npm run build` exits non-zero |
| Retry | Re-run `npm run build` after checking for obvious syntax errors |
| Resume | From CP7 after build exits 0 |
| Escalate | After 3 consecutive failures — surface error. Do not commit. |

---

## Phase 8 — Browser Test

| Situation | Action |
|---|---|
| Stop | A station fails to render or console shows errors |
| Retry | Refresh and re-check the specific station |
| Resume | From CP8 after all stations render cleanly |
| Escalate | After 3 consecutive failures — surface error. Do not commit. |

---

## Phase 9 — Commit

| Situation | Action |
|---|---|
| Stop | `git commit` fails (conflict, dirty state) |
| Retry | Resolve conflict or `git add` + `git commit` again |
| Resume | From CP9 after commit succeeds |
| Escalate | After 3 consecutive failures — surface error with git status output |

---

## Global Rules

1. **Never restart from Phase 0** unless no checkpoint has been established.
2. **Never skip a checkpoint** even if you believe the phase is complete.
3. **Escalation** means surface the error to the user and stop. Do not continue.
4. **Session interruption** (e.g. timeout) — on re-entry, read session state and resume from last confirmed checkpoint.
