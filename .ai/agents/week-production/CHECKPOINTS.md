# Checkpoints — Week Production Runtime

---

A checkpoint is confirmed after a production phase completes successfully.
Production can resume from the last successful checkpoint.

---

## Checkpoint Map

| Checkpoint | Phase | Condition to mark complete |
|---|---|---|
| CP0 | Phase 0 — Pre-flight | `preflight_check.sh` exits 0 |
| CP1 | Phase 1 — Setup | All 19 ADV files + 19 Easy files exist in target directories |
| CP2 | Phase 2 — Videos | `daily_watch.js` exists in both ADV and Easy directories |
| CP3 | Phase 3 — Content | All content files (ADV + Easy + AI Tutor) authored and saved |
| CP4 | Phase 4 — Validation | quality-reviewer subagent returns SHIP |
| CP5 | Phase 5 — Images | image pipeline orchestrator returns complete (all stations) |
| CP6 | Phase 6 — Audio | Per-slot TTS requested on demand (no batch gate) |
| CP7 | Phase 7 — Build | `npm run build` exits 0 |
| CP8 | Phase 8 — Browser test | All stations render without console errors |
| CP9 | Phase 9 — Commit | `git commit` succeeds |

---

## Checkpoint CP3 — Content

Mark CP3 complete only when:
- All 19 ADV files are saved to `src/data/weeks/week_NN/`
- All 19 Easy files are saved to `src/data/weeks_easy/week_NN/`
- AI Tutor data file is saved to `src/data/weeks/week_NN_real.js`
- No file is left in draft or unnamed state

---

## Checkpoint CP4 — Validation

Mark CP4 complete only when quality-reviewer subagent reports **SHIP**.
Do not mark CP4 complete on FIX-THEN-SHIP — fix must be applied first.

---

### Image Pipeline

Image generation uses `orchestrator.mjs` with its own state machine. For resume,
use `--skip-existing` to avoid re-generating completed stations. See
`image_pipeline_state.json` for current station status. The runtime does not
own image pipeline logic; it only calls the orchestrator.

## Resume Rule

If a session ends mid-phase:
- Find the last confirmed checkpoint
- Resume at the next phase
- Do not re-run completed checkpoints unless the checkpoint condition is uncertain

## No-Checkpoint Rule

If no checkpoint exists (first-ever production run with no session state):
- Begin at Phase 0 and run every phase in order
- This is the only case where a full restart is acceptable
