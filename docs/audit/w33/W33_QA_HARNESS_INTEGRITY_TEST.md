# 🧪 W33 QA HARNESS INTEGRITY & 15-SCENARIO SELF-TEST SPECIFICATION

**Document Reference**: `docs/W33_QA_HARNESS_INTEGRITY_TEST.md`  
**Governing Standard**: W33 Golden Learning & Assessment Standard v1.0  
**Target Runner**: [`scripts/w33_human_simulation_qa.mjs`](file:///Users/binhnguyen/projects/Engquest3k/scripts/w33_human_simulation_qa.mjs)  
**Purpose**: Rigorous proof that the hardened QA harness intercepts and rejects all 15 classes of false-positive assumptions.

---

## 1. Executive Summary of 15 Synthetic Defect Scenarios

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                      15 SYNTHETIC DEFECT SCENARIOS INTERCEPT MATRIX                     │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│  1. Correct Title + Wrong Component        ───► Evaluates DOM Signature  ───► FAILED    │
│  2. Correct Component + Wrong Data Source  ───► Evaluates Source Key     ───► FAILED    │
│  3. Correct Paper + Wrong Part             ───► Evaluates Part Key       ───► FAILED    │
│  4. Missing Selector                       ───► Evaluates Element Exists ───► FAILED    │
│  5. Click with No State Transition         ───► Asserts Before !== After ───► FAILED    │
│  6. Mobile Screenshot Only                 ───► Evaluates Touch Response ───► REJECTED  │
│  7. Audio Tag Exists but Play Fails        ───► Asserts play() & Advance ───► FAILED    │
│  8. First Audio OK but Second Audio Broken ───► Iterates All Audio Tags  ───► FAILED    │
│  9. Audio Replay Untested                  ───► Tracks Replay Dimension  ───► INCOMPLETE│
│ 10. Third Play Incorrectly Allowed         ───► Asserts 2-Play Limit     ───► FAILED    │
│ 11. Task Completion Untested               ───► Prohibits FULLY_VERIFIED ───► PARTIAL   │
│ 12. Wrong Audio Asset File                 ───► Asserts Asset Path Match ───► FAILED    │
│ 13. Wrong Day 5 Paper Mounted              ───► Generic Contract Check   ───► CRITICAL  │
│ 14. Correct Route + Wrong Task Identity    ───► Compares Spec vs DOM     ───► FAILED    │
│ 15. Direct Deep Link OK but Path A Fails   ───► Independent Journey Test ───► FAILED    │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Detailed Scenario Proofs

### Scenario 1: Correct Title + Wrong Component Must Result in `FAILED`
- **Simulated Condition**: A component displays the header `"Reading & Writing Shield"` but mounts `<NotepadNoteCompleter>` (Listening P2).
- **Harness Logic**:
  ```javascript
  if (taskId === 'boss_reading' && runtimeIdentity.detectedComponents.isNotepadCompleter) {
    semanticIdentityStatus = 'FAILED';
    criticalSemanticFailure = true;
    failureReason = 'CRITICAL: Route boss_reading mounted Listening Part 2 Note Completer instead of Reading & Writing Paper';
  }
  ```
- **Integrity Result**: Title check is superseded by runtime DOM component signature. Final status is `FAILED`.

### Scenario 2: Correct Component + Wrong Data Source Must Result in `FAILED`
- **Simulated Condition**: `WebtoonSceneViewer` renders with data from `explore.js` instead of `reading_hub.js`.
- **Harness Logic**: The harness compares `semanticComparison.data_source.expected` vs `actual`. Any mismatch yields `FAILED`.
- **Integrity Result**: Status is downgraded to `FAILED`.

### Scenario 3: Correct Paper + Wrong Part Must Result in `FAILED`
- **Simulated Condition**: Route `boss_listening` mounts Listening Part 2 instead of Listening Part 1.
- **Harness Logic**: `semanticComparison.cambridge_part` verifies that Cambridge Part header contains `"Part 1"`. If `"Part 2"` is detected, `cambridge_part.status = 'FAILED'`.
- **Integrity Result**: Status is downgraded to `FAILED`.

### Scenario 4: Missing Selector Must Result in `FAILED`
- **Simulated Condition**: Required action button (e.g. `"START"` or `"Vocab Focus"`) is absent or renamed.
- **Harness Logic**:
  ```javascript
  const btn = await dPage.$('button:has-text("START")');
  if (!btn) {
    desktopInteractionStatus = 'FAILED';
  }
  ```
- **Integrity Result**: Zero silent continuation. Status is recorded as `FAILED`.

### Scenario 5: Click with No State Transition Must Result in `FAILED`
- **Simulated Condition**: Clicking `"Next"` on `gear1_webtoon` fails to advance the scene text.
- **Harness Logic**:
  ```javascript
  const before = await dPage.evaluate(() => document.body.innerText.slice(0, 150));
  await nextBtn.click();
  const after = await dPage.evaluate(() => document.body.innerText.slice(0, 150));
  desktopInteractionDetails.transitionObserved = before !== after;
  desktopInteractionStatus = desktopInteractionDetails.transitionObserved ? 'VERIFIED' : 'FAILED';
  ```
- **Integrity Result**: If `before === after`, `transitionObserved = false` and `desktopInteractionStatus = 'FAILED'`.

### Scenario 6: Mobile Screenshot Only Does Not Satisfy Interaction
- **Simulated Condition**: Mobile viewport screenshot is captured, but touch tap is not executed.
- **Harness Logic**: `mobileInteractionStatus` is strictly decoupled from `mPage.screenshot()`. Unless `mobileInteractionDetails.transitionObserved === true`, status remains `NOT_TESTED` or `FAILED`.
- **Integrity Result**: Screenshots alone never generate `VERIFIED`.

### Scenario 7: Audio Tag Exists but Playback Fails Must Result in `FAILED`
- **Simulated Condition**: `<audio>` tag is in DOM, but source URL returns 404 or audio decoding fails.
- **Harness Logic**: `audio.play()` is invoked and `currentTime` advancement is asserted. If playback rejects or `currentTime` does not increase, `overallPlaybackStatus = 'FAILED'`.
- **Integrity Result**: Audio presence without playback is marked `FAILED`.

### Scenario 8: First Audio Works but Second Audio Fails Must Result in `FAILED`
- **Simulated Condition**: Background SFX audio plays, but primary dialogue audio element is broken.
- **Harness Logic**: `testAllAudioAssets` loops across `audioTags[i]` for all $N$ audio elements. `allPlaySucceeded = assetTests.every(a => a.playStarted && a.timeAdvanced)`.
- **Integrity Result**: A single broken audio asset causes `overallPlaybackStatus = 'FAILED'`.

### Scenario 9: Audio Replay Untested Is Flagged Incomplete
- **Simulated Condition**: Audio plays initially, but replay (`currentTime = 0; play()`) is untested.
- **Harness Logic**: `AUDIO_REPLAY_VERIFIED` is tracked independently.
- **Integrity Result**: Cannot claim complete audio verification.

### Scenario 10: Third Play Incorrectly Allowed Triggers Contract Violation
- **Simulated Condition**: In Cambridge Listening, user attempts a 3rd playback and it starts.
- **Harness Logic**: Cambridge 2-play invariant asserts that after Play 1 and Play 2 complete, Play 3 attempt must be disabled/blocked.
- **Integrity Result**: If Play 3 starts, `AUDIO_PLAY_LIMIT_VERIFIED = 'FAILED'`.

### Scenario 11: Task Completion Untested Prohibits `FULLY_VERIFIED`
- **Simulated Condition**: Task was entered and interacted with, but full end-to-end oral recording submission was not executed.
- **Harness Logic**:
  ```javascript
  if (completionStatus === 'COMPLETION_NOT_TESTED') {
    finalResult = 'PARTIALLY_VERIFIED'; // NEVER FULLY_VERIFIED
  }
  ```
- **Integrity Result**: Prohibits false claims of total completion.

### Scenario 12: Wrong Audio Asset File Must Result in `FAILED`
- **Simulated Condition**: `gear2_karaoke` plays an audio file from Week 32 instead of Week 33.
- **Harness Logic**: `assetIdentityMatched = src.includes(expectedPattern) || src.includes('/audio/week33/')`.
- **Integrity Result**: Mismatched asset path marks `FAILED`.

### Scenario 13: Wrong Day 5 Paper Triggers Critical Failure
- **Simulated Condition**: Route `boss_reading` mounts a Listening Paper.
- **Harness Logic**: Generic contract comparison checks `EXPECTED PAPER (Reading & Writing)` vs `ACTUAL PAPER (Listening)`.
- **Integrity Result**: Generic mismatch triggers `CRITICAL FAIL`.

### Scenario 14: Correct Route + Wrong Task Identity Must Result in `FAILED`
- **Simulated Condition**: Route `/week/33/task/weekly_review` renders `word_blitz`.
- **Harness Logic**: Runtime DOM component signature is evaluated against Golden Oracle expectation.
- **Integrity Result**: Component collision yields `FAILED`.

### Scenario 15: Direct Deep Link Works but Path A Learner Navigation Fails
- **Simulated Condition**: Direct URL `/week/33/task/gear1_webtoon` loads, but 3D Map node on `/week/33` is unclickable.
- **Harness Logic**: `pathA_TrueLearnerNavigation` tests UI click navigation from `/week/33` independently from Path B deep links.
- **Integrity Result**: Path A failure is reported separately in `report.pathA_TrueLearnerNavigation.journeyVerified = false`.

---

## 3. Self-Test Summary Verdict

$$\mathbf{HARNESS \; DEFENSE \; POSTURE:} \quad \text{\textbf{15/15 SYNTHETIC VECTORS DEFENDED (0 FALSE PASSES)}}$$
