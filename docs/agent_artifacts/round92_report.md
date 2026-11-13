# Round 92 Report: Critical Fix — Singapore Math Adapter Field Alignment (`problemText` & `hintText`) for Staged Weeks W47–W54

**Date:** 2026-11-13  
**Author:** Antigravity / Content & Architecture Agent  
**Baseline Commit:** `69a9f18b10c6dc06068a512f065d02cd20ba0150` (Round 91 Manifest Update)  
**Deliverables Staged:** 8 Weeks in `docs/agent_artifacts/staging/` (`week_{47,48,49,50,51,52,53,54}/skill_practice_hub.js`)  
**Production Boundary:** 0 files modified in `src/data/weeks/` (Strict Staging Isolation enforced pending Claude QA ESL review)  

---

## 1. Executive Summary

During independent QA review of Round 91 staging deliverables, Claude QA executed `src/utils/station2Adapters.js`'s runtime `normalizeBarModelQuestion()` against the staged data files and identified a critical adapter contract defect:
- All 40 `singapore_math` questions across the 8 Block D staged weeks (W47–W54) declared their problem wording under `problem_text` (snake_case) and explanation under `step_by_step` (single string).
- The runtime adapter `normalizeBarModelQuestion()` strictly prioritizes:
  - `problemText: q?.problemText || q?.problem_en || q?.text || q?.question || 'Solve the Bar Model problem below:'`
  - `hintText: q?.hintText || hintFromSteps || 'Check the bar model diagram to calculate the target answer!'`
- Because neither `problemText`, `problem_en`, `text`, `question`, `hintText`, nor an array `steps` was present in W47–W54, every question silently fell back at runtime to the generic strings `"Solve the Bar Model problem below:"` and `"Check the bar model diagram to calculate the target answer!"`. The genuine word problem and step-by-step guidance never reached the student.
- W40, W42, and W44 (Task B) were confirmed clean and unaffected (they already declared `problemText` and `hintText` with array `steps`).

### Remediation Performed:
1. **Generator Hardening (`scripts/round91_data_generator.py`):** Added `normalize_math_problems(problems)` which defensively guarantees that any math problem emitted by the pipeline contains all aliases (`problemText`, `problem_en`, `problem_text`, `hintText`, `step_by_step`, and `steps: [step]`), eliminating future recurrence in batches W55–W72.
2. **Batch C Script Fix (`scripts/generate_round91_weeks_c.py`):** Explicitly declared `problemText`, `hintText`, and `steps` across all 40 questions in W47–W54.
3. **Staging Refresh:** Regenerated `skill_practice_hub.js` for weeks 47 through 54 in `docs/agent_artifacts/staging/`.
4. **Dedicated Verification Harness (`scripts/verify_round92_math_fields.mjs`):** Imported and executed the real `normalizeBarModelQuestion()` and `resolveNumericAnswer()` from `src/utils/station2Adapters.js`. Confirmed **40/40 questions resolve genuine problemText and hintText with 0 generic fallbacks**.
5. **Quality Gate Hardening (`scripts/verify_round91_staging.mjs`):** Added explicit assertion checks rejecting the generic fallback strings. All 11 staged weeks (W40, W42, W44, W47–W54) passed with 0 errors (Exit Code 0).

---

## 2. Root Cause & Architecture Forensic

### 2.1 Runtime Adapter Contract in `src/utils/station2Adapters.js`
The Bar Model Quest component (`BarModelQuest.jsx`) does not consume raw hub data directly; it passes each question object to `normalizeBarModelQuestion(rawQ, index, weekId)`:

```javascript
// src/utils/station2Adapters.js (lines 40-52)
export function normalizeBarModelQuestion(q, index = 0, weekId = 1) {
  // ...
  const hintFromSteps = Array.isArray(q?.steps) && q.steps.length > 0 
    ? q.steps.join(' ') 
    : '';

  return {
    id: q?.id ?? index + 1,
    title: q?.title || `Problem ${index + 1}`,
    problemText: q?.problemText || q?.problem_en || q?.text || q?.question || 'Solve the Bar Model problem below:',
    targetAnswer: resolveNumericAnswer(q),
    correctAnswer: resolveNumericAnswer(q),
    unit: q?.unit || q?.answer_unit || '',
    hintText: q?.hintText || hintFromSteps || 'Check the bar model diagram to calculate the target answer!',
    modelData: q?.modelData || { bars: [] },
    // ...
  };
}
```

### 2.2 Why the Defect Occurred
In `scripts/generate_round91_weeks_c.py`, the questions were drafted with:
```javascript
{
  "problem_text": "Lucas counted 21 bright stars...",
  "step_by_step": "Step 1: North sector stars = 21...",
  "correctAnswer": 55,
  "target_answer": 55
}
```
Because:
1. `problem_text` was not in the lookup chain (`q?.problemText || q?.problem_en || q?.text || q?.question`), `problemText` evaluated to `undefined` and triggered the fallback string `'Solve the Bar Model problem below:'`.
2. `step_by_step` was a scalar string rather than `hintText` or an array under `steps`, so `hintFromSteps` evaluated to `''`, triggering the fallback string `'Check the bar model diagram to calculate the target answer!'`.
3. `resolveNumericAnswer(q)` succeeded because `correctAnswer: 55` was present. The initial verification script only verified that `resolveNumericAnswer(q)` was a positive integer, leaving the text field fallback unnoticed.

---

## 3. Defense-in-Depth Generator Fix

### 3.1 `scripts/round91_data_generator.py`
To ensure that all future content generation batches (e.g. W55–W72) are immune to field mismatch, `normalize_math_problems` was implemented:

```python
def normalize_math_problems(problems):
    """
    Guarantees full compatibility with station2Adapters.js normalizeBarModelQuestion():
    - problemText (primary camelCase required by adapter)
    - hintText (primary camelCase required by adapter)
    - steps (array of strings required for hintFromSteps fallback)
    - problem_text / problem_en (backward compatibility)
    - step_by_step (backward compatibility)
    """
    normalized = []
    for p in problems:
        item = dict(p)
        text = item.get("problemText") or item.get("problem_en") or item.get("problem_text") or item.get("question") or item.get("text") or ""
        item["problemText"] = text
        item["problem_text"] = text
        item["problem_en"] = text

        step = item.get("hintText") or item.get("step_by_step") or (item.get("steps")[0] if isinstance(item.get("steps"), list) and item.get("steps") else "")
        item["hintText"] = step
        item["step_by_step"] = step
        if not item.get("steps") or not isinstance(item["steps"], list):
            item["steps"] = [step] if step else []

        normalized.append(item)
    return normalized
```

### 3.2 `scripts/generate_round91_weeks_c.py`
All 40 problem definitions in the script were patched with explicit `problemText`, `hintText`, and `steps: [step]` declarations alongside `problem_text` and `step_by_step`.

---

## 4. Full Verification Table: All 40 Singapore Math Problems (W47–W54)

The table below presents the verbatim outputs resolved by `src/utils/station2Adapters.js`'s `normalizeBarModelQuestion()` during the execution of `scripts/verify_round92_math_fields.mjs`:

| Week | Q# | Title | Resolved `problemText` | Resolved `hintText` | Answer | Bars | Status |
|:---:|:---:|:---|:---|:---|:---:|:---:|:---:|
| **W47** | 1 | Star Counting in Two Sectors | Lucas counted 21 bright stars in the north sector. Mia counted 34 stars in the south sector. How many stars did they count in total? | Step 1: North sector stars = 21. Step 2: South sector stars = 34. Step 3: Total = 21 + 34 = 55 stars. | 55 stars | 2 | ✅ PASS |
| **W47** | 2 | Village House Census | A mountain village has 45 stone cottages and 22 wooden cabins. How many houses are there altogether? | Step 1: Stone cottages = 45. Step 2: Wooden cabins = 22. Step 3: Total houses = 45 + 22 = 67 houses. | 67 houses | 2 | ✅ PASS |
| **W47** | 3 | Difference in Star Clusters | Sector A has 78 stars and Sector B has 45 stars. How many more stars are in Sector A than in Sector B? | Step 1: Sector A = 78 stars. Step 2: Sector B = 45 stars. Step 3: Difference = 78 - 45 = 33 stars. | 33 stars | 2 | ✅ PASS |
| **W47** | 4 | Approaching One Hundred | An observatory logged 89 stars before midnight. How many more stars do they need to log to reach 100 stars? | Step 1: Target = 100 stars. Step 2: Current logged = 89 stars. Step 3: Needed = 100 - 89 = 11 stars. | 11 stars | 2 | ✅ PASS |
| **W47** | 5 | Bundles of Ten Sticks | Students made 6 bundles of 10 counting sticks and had 7 single sticks left over. What is the total number of sticks? | Step 1: 6 bundles of 10 = 60 sticks. Step 2: 7 single sticks = 7. Step 3: Total = 60 + 7 = 67 sticks. | 67 sticks | 2 | ✅ PASS |
| **W48** | 1 | Ribbon Length Comparison | Lucas has a blue ribbon that is 45 cm long. Emma has a red ribbon that is 28 cm long. How many centimeters longer is the blue ribbon? | Step 1: Blue ribbon = 45 cm. Step 2: Red ribbon = 28 cm. Step 3: Difference = 45 - 28 = 17 cm. | 17 cm | 2 | ✅ PASS |
| **W48** | 2 | Total Ribbon for Project | A student needs 35 cm of ribbon for a poster and 42 cm of ribbon for a model. How much ribbon does the student need in total? | Step 1: Poster ribbon = 35 cm. Step 2: Model ribbon = 42 cm. Step 3: Total = 35 + 42 = 77 cm. | 77 cm | 2 | ✅ PASS |
| **W48** | 3 | Desk Length to One Meter | A wooden study desk is 68 cm long. How many more centimeters are needed to make it 100 cm (1 meter) long? | Step 1: Target = 100 cm. Step 2: Current length = 68 cm. Step 3: Needed = 100 - 68 = 32 cm. | 32 cm | 2 | ✅ PASS |
| **W48** | 4 | Sunflower Growth Measurement | A sunflower was 54 cm tall last Monday. By this Monday, it grew to 71 cm tall. How many centimeters did the sunflower grow? | Step 1: New height = 71 cm. Step 2: Old height = 54 cm. Step 3: Growth = 71 - 54 = 17 cm. | 17 cm | 2 | ✅ PASS |
| **W48** | 5 | Three Wire Segments | An electric circuit needs three wire pieces: 20 cm, 25 cm, and 30 cm. What is the total length of wire required? | Step 1: Wire pieces = 20, 25, 30 cm. Step 2: Sum = 20 + 25 + 30 = 75 cm. | 75 cm | 3 | ✅ PASS |
| **W49** | 1 | Saving for Science Equipment | Chloe saved 45 dollars in October and 38 dollars in November to buy a science microscope. How many dollars did she save in total? | Step 1: October savings = 45 dollars. Step 2: November savings = 38 dollars. Step 3: Total = 45 + 38 = 83 dollars. | 83 dollars | 2 | ✅ PASS |
| **W49** | 2 | Hours of Pilot Flight Training | A student pilot completed 56 hours of day flying and 25 hours of night flying. How many total hours of flight training were completed? | Step 1: Day hours = 56. Step 2: Night hours = 25. Step 3: Total = 56 + 25 = 81 hours. | 81 hours | 2 | ✅ PASS |
| **W49** | 3 | Chameleon Tongue Range Difference | A large chameleon can shoot its tongue 42 cm. A smaller chameleon can shoot its tongue 26 cm. What is the difference in reach between the two tongues? | Step 1: Large chameleon = 42 cm. Step 2: Small chameleon = 26 cm. Step 3: Difference = 42 - 26 = 16 cm. | 16 cm | 2 | ✅ PASS |
| **W49** | 4 | Reaching the Robotics Target | The robotics team needs 90 points to advance to finals. They scored 64 points in round one. How many points are needed in round two? | Step 1: Target = 90 points. Step 2: Scored = 64 points. Step 3: Needed = 90 - 64 = 26 points. | 26 points | 2 | ✅ PASS |
| **W49** | 5 | Three-Stage Rocket Altitude | A model rocket rises 30 meters in stage one, 35 meters in stage two, and 25 meters in stage three. What is the total altitude reached? | Step 1: Stages = 30, 35, 25 m. Step 2: Sum = 30 + 35 + 25 = 90 m. | 90 meters | 3 | ✅ PASS |
| **W50** | 1 | Science Library Books | Room 3A borrowed 38 books and Room 3B borrowed 47 books from the library. How many books were borrowed in total? | Step 1: Room 3A = 38 books. Step 2: Room 3B = 47 books. Step 3: Total = 38 + 47 = 85 books. | 85 books | 2 | ✅ PASS |
| **W50** | 2 | Math Tournament Cards | Alex has 52 challenge cards and Liam has 35 challenge cards. How many cards do they have altogether? | Step 1: Alex = 52 cards. Step 2: Liam = 35 cards. Step 3: Total = 52 + 35 = 87 cards. | 87 cards | 2 | ✅ PASS |
| **W50** | 3 | Lap Counter Difference | Lucas completed 48 laps on sports day and Noah completed 31 laps. How many more laps did Lucas complete than Noah? | Step 1: Lucas = 48 laps. Step 2: Noah = 31 laps. Step 3: Difference = 48 - 31 = 17 laps. | 17 laps | 2 | ✅ PASS |
| **W50** | 4 | Century Target Points | A gaming guild has 73 points toward their weekly century badge of 100 points. How many points are needed to complete the badge? | Step 1: Target = 100 points. Step 2: Current = 73 points. Step 3: Needed = 100 - 73 = 27 points. | 27 points | 2 | ✅ PASS |
| **W50** | 5 | Three-Section Hall Attendance | Section 1 has 25 guests, Section 2 has 30 guests, and Section 3 has 28 guests. What is the total attendance? | Step 1: Sections = 25, 30, 28 guests. Step 2: Sum = 25 + 30 + 28 = 83 guests. | 83 guests | 3 | ✅ PASS |
| **W51** | 1 | Science Quiz Points | Team Falcon scored 42 points in round one and 39 points in round two. How many points did they score altogether? | Step 1: Round 1 = 42 points. Step 2: Round 2 = 39 points. Step 3: Total = 42 + 39 = 81 points. | 81 points | 2 | ✅ PASS |
| **W51** | 2 | Eco-Club Tree Planting | The school eco-club planted 36 pine seedlings and 48 oak seedlings. How many seedlings were planted in total? | Step 1: Pine = 36. Step 2: Oak = 48. Step 3: Total = 36 + 48 = 84 seedlings. | 84 seedlings | 2 | ✅ PASS |
| **W51** | 3 | Reading Quest Page Count | Maya read 65 pages of her adventure novel this week, while Ethan read 42 pages. How many more pages did Maya read? | Step 1: Maya = 65 pages. Step 2: Ethan = 42 pages. Step 3: Difference = 65 - 42 = 23 pages. | 23 pages | 2 | ✅ PASS |
| **W51** | 4 | Centenary Science Fair Target | The science department wants to display 100 student projects. They have approved 81 projects so far. How many more projects are needed? | Step 1: Target = 100 projects. Step 2: Approved = 81 projects. Step 3: Needed = 100 - 81 = 19 projects. | 19 projects | 2 | ✅ PASS |
| **W51** | 5 | Habitat Survey Observations | Rangers counted 24 deer in the north forest, 31 in the central meadow, and 20 near the river. What was the total count? | Step 1: Counts = 24, 31, 20 deer. Step 2: Sum = 24 + 31 + 20 = 75 deer. | 75 deer | 3 | ✅ PASS |
| **W52** | 1 | World Map Pin Total | Sofia pinned 34 cities in Europe and 28 cities in Asia on her travel map. How many cities did she pin in total? | Step 1: Europe = 34 cities. Step 2: Asia = 28 cities. Step 3: Total = 34 + 28 = 62 cities. | 62 cities | 2 | ✅ PASS |
| **W52** | 2 | Travel Passport Stamps | Leo has 46 museum stamps and 37 park stamps in his explorer booklet. How many stamps does he have altogether? | Step 1: Museums = 46. Step 2: Parks = 37. Step 3: Total = 46 + 37 = 83 stamps. | 83 stamps | 2 | ✅ PASS |
| **W52** | 3 | Flight Hours Comparison | Flight Route A logs 54 flight hours per month, while Flight Route B logs 38 hours. What is the difference in flight hours? | Step 1: Flight A = 54 hours. Step 2: Flight B = 38 hours. Step 3: Difference = 54 - 38 = 16 hours. | 16 hours | 2 | ✅ PASS |
| **W52** | 4 | Bingo Cards Printed | The teacher needs 75 bingo cards for the grade level. She has printed 52 cards so far. How many cards still need to be printed? | Step 1: Total needed = 75 cards. Step 2: Printed = 52 cards. Step 3: Remaining = 75 - 52 = 23 cards. | 23 cards | 2 | ✅ PASS |
| **W52** | 5 | Museum Badges Collected | Daniel collected 27 science badges and 36 history badges. How many badges did he collect in all? | Step 1: Science = 27 badges. Step 2: History = 36 badges. Step 3: Total = 27 + 36 = 63 badges. | 63 badges | 2 | ✅ PASS |
| **W53** | 1 | Detective Evidence Cards | Oliver examined 26 suspect cards on Monday and 35 suspect cards on Tuesday. How many cards did he examine in total? | Step 1: Monday cards = 26. Step 2: Tuesday cards = 35. Step 3: Total = 26 + 35 = 61 cards. | 61 cards | 2 | ✅ PASS |
| **W53** | 2 | Portfolio Binder Pages | A student portfolio has 38 writing pages and 27 science lab pages. How many total pages are inside the binder? | Step 1: Writing = 38 pages. Step 2: Science = 27 pages. Step 3: Total = 38 + 27 = 65 pages. | 65 pages | 2 | ✅ PASS |
| **W53** | 3 | Footprint Length Difference | An adult shoe print measures 30 cm long. A child shoe print measures 22 cm long. What is the difference in length between the two prints? | Step 1: Adult print = 30 cm. Step 2: Child print = 22 cm. Step 3: Difference = 30 - 22 = 8 cm. | 8 cm | 2 | ✅ PASS |
| **W53** | 4 | Target Portfolio Badges | Grace needs 50 achievement badges for her portfolio collection. She has earned 36 badges so far. How many badges are needed to reach 50? | Step 1: Target = 50. Step 2: Earned = 36. Step 3: Needed = 50 - 36 = 14 badges. | 14 badges | 2 | ✅ PASS |
| **W53** | 5 | Solved Mystery Cases | The junior detective club solved 19 puzzle cases in semester one and 24 cases in semester two. What was the total number of solved cases? | Step 1: Semester 1 = 19. Step 2: Semester 2 = 24. Step 3: Total = 19 + 24 = 43 cases. | 43 cases | 2 | ✅ PASS |
| **W54** | 1 | Graduation Showcase Attendees | There are 50 graduates and 85 parent guests in the school auditorium. How many people are attending the showcase altogether? | Step 1: Graduates = 50. Step 2: Parent guests = 85. Step 3: Total = 50 + 85 = 135 people. | 135 people | 2 | ✅ PASS |
| **W54** | 2 | Stage Flower Arrangements | The stage has 24 red rose bouquets and 38 white lily bouquets. How many flower bouquets decorate the stage in all? | Step 1: Red rose bouquets = 24. Step 2: White lily bouquets = 38. Step 3: Total = 24 + 38 = 62 bouquets. | 62 bouquets | 2 | ✅ PASS |
| **W54** | 3 | Auditorium Chairs Difference | Section A of the auditorium has 90 chairs. Section B has 65 chairs. How many more chairs are in Section A than Section B? | Step 1: Section A = 90. Step 2: Section B = 65. Step 3: Difference = 90 - 65 = 25 chairs. | 25 chairs | 2 | ✅ PASS |
| **W54** | 4 | Target Graduation Certificates | The school office must sign 100 graduation certificates. They have signed 72 certificates so far. How many certificates remain to be signed? | Step 1: Total = 100 certificates. Step 2: Signed = 72. Step 3: Remaining = 100 - 72 = 28 certificates. | 28 certificates | 2 | ✅ PASS |
| **W54** | 5 | Showcase Photo Souvenirs | The media club printed 45 ceremony photos and 39 reception photos. What is the total number of souvenir photos printed? | Step 1: Ceremony photos = 45. Step 2: Reception photos = 39. Step 3: Total = 45 + 39 = 84 photos. | 84 photos | 2 | ✅ PASS |

---

## 5. Automated Quality Gate Compliance

### 5.1 Staging Verification (`scripts/verify_round91_staging.mjs`)
The staging verification script was updated to strictly check for generic fallbacks:
```javascript
if (norm.problemText === 'Solve the Bar Model problem below:') {
  errors.push(`Q${i+1} problemText fell back to generic fallback`);
}
if (norm.hintText === 'Check the bar model diagram to calculate the target answer!') {
  errors.push(`Q${i+1} hintText fell back to generic fallback`);
}
```
**Result across all 11 staged weeks (W40, W42, W44, W47–W54):**
- Total Weeks Audited: 11
- Total Singapore Math Questions: 55 (5/5 per week)
- Generic Fallbacks Detected: **0**
- Invalid / Non-Integer Answers: **0**
- Missing Bars: **0**
- Exit Code: **0**

### 5.2 Freeze Guard & Governance (`npm run guard:freeze:w33` & `npm run guard:governance`)
- W33 Golden Standard Freeze: 147/147 locked files untouched (100% PASS).
- Governance rules: 0 violations.
- Production isolation: 0 files touched in `src/data/weeks/`.

---

## 6. Conclusion & Staging Status

With the completion of Round 92:
1. The field alignment mismatch identified by Claude QA is 100% resolved across all 40 questions in W47–W54.
2. Both generator scripts (`scripts/round91_data_generator.py` and `scripts/generate_round91_weeks_c.py`) have been hardened against recurrence for all subsequent batches (W55–W72).
3. All 11 weeks (W40, W42, W44, W47–W54) remain staged in `docs/agent_artifacts/staging/` awaiting formal Claude QA ESL sign-off prior to production merge.
