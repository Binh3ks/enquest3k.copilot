# ⚠️ W33 AUDIT FALSE-PASS CATALOG & WEAKNESS AUDIT

**Document Reference**: `docs/W33_AUDIT_FALSE_PASS_CATALOG.md`  
**Standard**: W33 Golden Learning & Assessment Standard v1.0  
**Focus**: Comprehensive inventory of all test heuristics, assertions, and test scripts across EngQuest3K that produce false-positive "PASS" results while masking underlying bugs.

---

## 1. Executive Summary of False-Pass Failure Modes

An audit of the previous QA test harness identified **6 distinct architectural failure modes** that allowed critical defects (`DAY5-ROUTING-001` and `DAY5-ROUTING-002`) to slip through undetected:

```
[Failure Mode 1: Self-Referential Spec Hardcoding]
  The test specification explicitly asserts the buggy runtime mapping rather than the curriculum contract.

[Failure Mode 2: Negative-Only Error String Check]
  The test asserts !body.includes('Error:') and assumes absence of fatal crash equals 100% correctness.

[Failure Mode 3: Shallow Text-Presence Matcher]
  The test checks body.includes('Cambridge A2 Flyers') but does not verify the Paper/Skill.

[Failure Mode 4: Blind Button/Element Counting]
  The test checks button.length >= 3 without validating the action or state transition triggered.

[Failure Mode 5: Loose Selector Aggregation]
  The test aggregates tabs, stats headers, and list items into a single container query.

[Failure Mode 6: Static AST Isolation]
  The test verifies data files on disk without testing whether the React component actually binds the data.
```

---

## 2. Comprehensive False-Pass Catalog

The catalog below details every flawed assertion, explains why it can false-pass, provides the exact code example from the repository, and defines the mandatory replacement assertion:

---

### ITEM 1: Tautological Spec Hardcoding on Day 5 Routes
- **TEST**: `gate15_production_dom_assertions.mjs` (referencing `docs/GATE15_SPEC_W33.json` lines 360–422)
- **WHY IT CAN FALSE-PASS**: The test spec hardcoded regex patterns asserting that `boss_reading` renders `NotepadNoteCompleter` (Listening P2) and `weekly_review` renders `VisualMatchingAH` (Listening P3). When the test ran, it matched the buggy rotary schedule and reported `PASS`.
- **EXISTING FLAWED CODE**:
  ```json
  "boss_reading": {
    "pos": [
      {
        "name": "Cycle 1 boss_reading renders Note Completion (Listening P2 / RW)",
        "type": "regex",
        "pattern": "(Notepad|Note|NotepadNoteCompleter|Incident|Part 2|Listening Part 2|Cambridge A2 Flyers)"
      }
    ]
  }
  ```
- **REPLACEMENT ASSERTION**:
  ```javascript
  // Assert positive Reading Paper component and negative forbidden Listening components
  expect(page.locator('[data-testid="word-bank-matching"], [data-testid="rw-assessment"]')).toBeVisible();
  expect(page.locator('[data-testid="notepad-completer"], [data-testid="svg-line-matcher"], [data-testid="visual-matching-ah"]')).toHaveCount(0);
  expect(await page.innerText('.ts-task-name')).toBe('Reading & Writing Shield');
  ```

---

### ITEM 2: Shallow Error-String Absence (`!body.includes('Error:')`)
- **TEST**: `w33_production_browser_audit.mjs` (lines 45–60)
- **WHY IT CAN FALSE-PASS**: If a page mounts a blank container, renders a 404 fallback gracefully, or renders completely the wrong task without throwing an unhandled React crash, this check evaluates to `TRUE`.
- **EXISTING FLAWED CODE**:
  ```javascript
  const bodyText = await page.evaluate(() => document.body.innerText);
  const isHealthy = !bodyText.includes('data not found') && !bodyText.includes('Error:') && !bodyText.includes('undefined');
  if (isHealthy) results[task] = 'PASS';
  ```
- **REPLACEMENT ASSERTION**:
  ```javascript
  // Assert explicit semantic contract matching Golden Oracle
  const oracle = ORACLE.tasks[taskId];
  const actualTitle = await page.innerText('.ts-task-name, h1');
  const hasExpectedComponent = await page.locator(oracle.expectedComponentSelector).isVisible();
  const hasForbiddenComponent = await page.locator(oracle.forbiddenComponentSelectors.join(',')).count() > 0;
  expect(actualTitle).toBe(oracle.expected_learner_facing_title);
  expect(hasExpectedComponent).toBe(true);
  expect(hasForbiddenComponent).toBe(false);
  ```

---

### ITEM 3: Blind Button Counting Without State Transition
- **TEST**: `w33_production_browser_audit.mjs` & `gate15_production_dom_assertions.mjs` (Vocab Focus check)
- **WHY IT CAN FALSE-PASS**: Verifying that 5 buttons exist or that clicking a button doesn't crash does not verify that the vocabulary pills revealed belong to Week 33 or that learner interaction state advances.
- **EXISTING FLAWED CODE**:
  ```javascript
  const buttons = await page.$$('button');
  if (buttons.length >= 3) results.buttonsPass = true;
  ```
- **REPLACEMENT ASSERTION**:
  ```javascript
  // Assert button click produces deterministic state transition and expected data
  const vocabBtn = page.locator('button:has-text("Vocab Focus")');
  await vocabBtn.click();
  const visiblePills = await page.locator('[data-testid="vocab-pill"]').allInnerTexts();
  const w33TargetWords = ORACLE.tasks.gear4_clil.expected_vocab;
  expect(visiblePills.filter(p => w33TargetWords.includes(p.toLowerCase())).length).toBeGreaterThanOrEqual(5);
  ```

---

### ITEM 4: Generic DOM Selector Aggregation (Word Treasury 25 vs 20)
- **TEST**: `w33_production_browser_audit.mjs` (Word Treasury count)
- **WHY IT CAN FALSE-PASS**: Querying generic list items or div children aggregated 5 status tab buttons (`All`, `Mastered`, `Reviewing`, `Learning`, `New`) and 20 word rows into a total count of 25, creating ambiguity between 20 target vocabulary words and 25 DOM elements.
- **EXISTING FLAWED CODE**:
  ```javascript
  const count = await page.evaluate(() => document.querySelectorAll('.divide-y > div, .overflow-x-auto button').length);
  // Reported 25 items without distinguishing word cards from tab buttons
  ```
- **REPLACEMENT ASSERTION**:
  ```javascript
  // Explicitly isolate word cards by semantic testid/structure
  const uniqueWordCards = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[data-testid="word-card-row"], .divide-y > div'))
      .map(e => e.querySelector('span.text-sm')?.innerText?.trim())
      .filter(Boolean);
  });
  expect(uniqueWordCards.length).toBe(20);
  expect(new Set(uniqueWordCards).size).toBe(20);
  ```

---

### ITEM 5: Audio Element Existence Without Playback Progression
- **TEST**: `audit_all_w33_tasks.mjs` (Audio presence check)
- **WHY IT CAN FALSE-PASS**: An `<audio>` tag can exist with a 404 `src` attribute or fail to decode without causing an element check to fail.
- **EXISTING FLAWED CODE**:
  ```javascript
  const hasAudio = await page.evaluate(() => document.querySelectorAll('audio').length > 0);
  if (hasAudio) results.audio = 'PASS';
  ```
- **REPLACEMENT ASSERTION**:
  ```javascript
  // Assert actual audio playback, duration > 0, and time advancement
  const audioState = await page.evaluate(async () => {
    const audio = document.querySelector('audio');
    if (!audio || !audio.src) return { ok: false, reason: 'no-src' };
    const dur = audio.duration;
    const initialTime = audio.currentTime;
    try {
      await audio.play();
      await new Promise(r => setTimeout(r, 400));
      const advanced = audio.currentTime > initialTime;
      audio.pause();
      return { ok: true, duration: dur, advanced };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  });
  expect(audioState.ok).toBe(true);
  expect(audioState.duration).toBeGreaterThan(0);
  expect(audioState.advanced).toBe(true);
  ```

---

### ITEM 6: Static AST Module Equality Without Runtime Component Binding
- **TEST**: `gate16_content_quality.mjs` (Singapore Math equality)
- **WHY IT CAN FALSE-PASS**: Compares `listening_hub.js` and `singapore_math.js` on disk using `import()`. If both files on disk match, but the React component renders a broken SVG or fails to import the data at runtime, the test passes while the student sees a broken screen.
- **EXISTING FLAWED CODE**:
  ```javascript
  // Static module comparison on disk
  if (lhMath.every((item, i) => item.problem_en === smMath[i].problemText)) {
    console.log('Math matched 100%');
  }
  ```
- **REPLACEMENT ASSERTION**:
  ```javascript
  // Runtime E2E verification in Chrome browser
  await page.goto('/week/33/task/math_quest');
  const renderedProblemText = await page.innerText('.math-problem-description');
  expect(renderedProblemText).toContain('corridor');
  expect(await page.locator('svg.bar-model-svg').isVisible()).toBe(true);
  ```

---

## 3. Mandatory Elimination of Weak Heuristics

All future test suites (W34+) must strictly enforce:
1. **Zero Tautological Spec Generation**: Specs must be generated from the independent Golden Oracle, not from rotary schedules.
2. **Positive & Negative Assertions**: Every assessment check must assert the target component AND assert the absence of forbidden cross-paper components.
3. **Runtime Interaction & Negative State Testing**: Every interactive task must submit a wrong value and verify that validation/retry UI responds correctly.
