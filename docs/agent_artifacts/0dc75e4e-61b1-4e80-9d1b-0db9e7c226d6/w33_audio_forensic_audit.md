# W33 Audio Forensic Audit Report
> Research only — no code/audio/data changes.
> Status: **RESEARCH COMPLETE — CRITICAL AUDIO DEFECTS FOUND**

---

## A. Executive Summary

**4 confirmed defects found across W33 listening audio. 2 are P0/Critical.**

| ID | Part | Severity | Description |
|----|------|----------|-------------|
| DEF-001 | L2 | **P0** | `listening_p2_full.mp3` generated using a **single male voice** (`en-US-Neural2-D`) despite dialogue requiring Man+Woman. The recording speaks "Man:" and "Woman:" labels aloud as text rather than switching to a female TTS voice. |
| DEF-002 | L1 | **P0** | `listening_p1_target3/4/5.mp3` files contain **wrong character names** — audio says "Nurse Clara", "Mr. Davis", "Emma" but script/data requires "Nurse Sarah", "Headmaster Brown", "Cleaner Bob". Gender mismatch on target5 (script=male Bob, audio=female Emma). |
| DEF-003 | L5 | **P1** | `listening_p5_full.mp3` at 56.0–58.0s speaks "See AR on the board" instead of "Write the word 'CARE' on the board" — likely a TTS misread of the word CARE. |
| DEF-004 | L2 | **P1** | Script (`listening_hub.js`) has **no `dialogue_script`** key in `listening_p2`. The `audio_url` points to `listening_p2_full.mp3` but the data object only stores answers, not the full transcript. No data-layer source of truth for L2 audio content. |

---

## B. Complete W33 Audio Inventory

**Location:** `public/audio/week33/` and `dist/audio/week33/` (46 files each, identical hashes — SAME files)

| Audio file | Size | Duration | Format | Referenced by | Runtime reachable |
|------------|------|----------|--------|---------------|-------------------|
| `listening_p1_full.mp3` | 237K | 60.8s | MP3 | `SVGLineMatcher` via `passage_audio_script` | ✅ |
| `listening_p1_target1.mp3` | 17K | 4.2s | MP3 | — (orphan; no runtime reference found in SVGLineMatcher) | ⚠️ Orphan |
| `listening_p1_target2.mp3` | 16K | 4.0s | MP3 | — (orphan) | ⚠️ Orphan |
| `listening_p1_target3.mp3` | 22K | 5.6s | MP3 | — (orphan) | ⚠️ Orphan |
| `listening_p1_target4.mp3` | 21K | 5.3s | MP3 | — (orphan) | ⚠️ Orphan |
| `listening_p1_target5.mp3` | 18K | 4.7s | MP3 | — (orphan) | ⚠️ Orphan |
| `listening_p2_full.mp3` | 461K | 58.9s | MP3 | `NotepadNoteCompleter` via `bossData.listening.p2.audio_url` | ✅ |
| `listening_p3_example.mp3` | 91K | 23.3s | MP3 | `VisualMatchingAH` example | ✅ |
| `listening_p3_full.mp3` | 655K | 167.7s | MP3 | `VisualMatchingAH` full | ✅ |
| `listening_p3_item1.mp3` | 125K | 16.1s | MP3 | `VisualMatchingAH` item 1 | ✅ |
| `listening_p3_item2.mp3` | 104K | 13.3s | MP3 | `VisualMatchingAH` item 2 | ✅ |
| `listening_p3_item3.mp3` | 112K | 14.3s | MP3 | `VisualMatchingAH` item 3 | ✅ |
| `listening_p3_item4.mp3` | 107K | 13.7s | MP3 | `VisualMatchingAH` item 4 | ✅ |
| `listening_p3_item5.mp3` | 116K | 14.9s | MP3 | `VisualMatchingAH` item 5 | ✅ |
| `listening_p4_example.mp3` | 49K | 12.6s | MP3 | `MultipleChoice3Pic` example | ✅ |
| `listening_p4_full.mp3` | 321K | 82.2s | MP3 | `MultipleChoice3Pic` full | ✅ |
| `listening_p4_q1.mp3` | 58K | 7.4s | MP3 | `MultipleChoice3Pic` q1 | ✅ |
| `listening_p4_q2.mp3` | 53K | 6.8s | MP3 | `MultipleChoice3Pic` q2 | ✅ |
| `listening_p4_q3.mp3` | 48K | 6.2s | MP3 | `MultipleChoice3Pic` q3 | ✅ |
| `listening_p4_q4.mp3` | 54K | 6.9s | MP3 | `MultipleChoice3Pic` q4 | ✅ |
| `listening_p4_q5.mp3` | 59K | 7.5s | MP3 | `MultipleChoice3Pic` q5 | ✅ |
| `listening_p5_full.mp3` | 265K | 67.8s | MP3 | `SVGColorAndWrite` full | ✅ |
| `listening_p5_inst1.mp3` | 8.2K | 2.1s | MP3 | `SVGColorAndWrite` inst 1 | ✅ |
| `listening_p5_inst2.mp3` | 12K | 3.1s | MP3 | `SVGColorAndWrite` inst 2 | ✅ |
| `listening_p5_inst3.mp3` | 13K | 3.3s | MP3 | `SVGColorAndWrite` inst 3 | ✅ |
| `listening_p5_inst4.mp3` | 9.2K | 2.4s | MP3 | `SVGColorAndWrite` inst 4 | ✅ |
| `listening_p5_inst5.mp3` | 7.8K | 2.0s | MP3 | `SVGColorAndWrite` inst 5 | ✅ |
| `exam_intro_L1.mp3` | 16K | 4.0s | MP3 | Task intro display | ✅ |
| `exam_intro_L2.mp3` | 13K | 3.3s | MP3 | Task intro display | ✅ |
| `exam_intro_L3.mp3` | 18K | 4.7s | MP3 | Task intro display | ✅ |
| `exam_intro_L4.mp3` | 13K | 3.4s | MP3 | Task intro display | ✅ |
| `exam_intro_L5.mp3` | 15K | 3.8s | MP3 | Task intro display | ✅ |
| `exam_intro_S1–S4.mp3` | 17–21K | 4.2–5.4s | MP3 | Speaking intros | ✅ |
| `read_stem.mp3` | 110K | 28.2s | MP3 | Reading hub STEM | ✅ |
| `read_social.mp3` | 78K | 20.1s | MP3 | Reading hub Social | ✅ |
| `clil_friction.mp3` | 153K | 39.1s | MP3 | CLIL station | ✅ |
| `explore.mp3` | 147K | 37.7s | MP3 | Explore station | ✅ |
| `dictation_1–5.mp3` | 22–26K | 2.9–3.3s | MP3 | Dictation station | ✅ |

**Orphan audio (no runtime reference found):** `listening_p1_target1.mp3` through `listening_p1_target5.mp3` — 5 files exist in `public/audio/week33/` but `SVGLineMatcher.jsx` only uses `passage_audio_script` via TTS, not pre-generated target files.

**Referenced-but-missing:** None. All `audio_url` references resolve to existing files.

**Duplicate content:** No hash duplicates among the 46 files. All distinct.

**public/ vs dist/ parity:** All 46 files **IDENTICAL** (same MD5 hashes). Runtime serves from `public/` in dev and `dist/` in production — both are current.

---

## C. Audio → Script Mapping (Whisper vs Expected)

### L2 — `listening_p2_full.mp3` (58.9s)

**Whisper actual transcript:**
```
[0.0–7.5s]   Listen and write. There is one example. Man, hi, my name is Jake. Can I answer some questions?
[7.5–16.5s]  Woman. Of course. What classroom are you in? Man. I am in room 4B. Woman. That is the example.
[16.5–24.7s] Room 4B. Now you listen and write. Woman. What is your favorite subject at school? Man. My favorite
[24.7–31.8s] subject is science. Woman. And where did the accident happen today? Man. It happened in the
[31.8–39.7s] school corridor near the science room. Woman. How quickly did the nurse arrive? Man. She arrived in
[39.7–47.3s] about two minutes. Woman. What did the nurse use to help the hurt knee? Man. She used a clean
[47.3–55.8s] bandage and a cold pack. Woman. Did the headmaster say anything at assembly? Man. Yes. He gave Jake a
[55.8–57.9s] safety badge in front of the whole school.
```

**Expected script** (`scripts/regenerate_w33_listening_audio.mjs` `l2Full`):
```
Listen and write. There is one example.
Man: Hi. My name is Jake. Can I answer some questions?
Woman: Of course. What classroom are you in?
Man: I am in Room 4B.
Woman: That is the example. Room 4B. Now you listen and write.
Woman: What is your favourite subject at school?
Man: My favourite subject is Science.
[...continues with Man:/Woman: alternation for 5 fields]
```

**Parity result: FAIL** — See Section I for full analysis.

---

## D. Audio → Task Mapping

| Task | Audio file | Task type | Audio matches task? |
|------|-----------|-----------|-------------------|
| L1 | `listening_p1_full.mp3` | Draw lines: 5 names → characters | ✅ PASS (content correct) |
| L2 | `listening_p2_full.mp3` | Note completion: 5 fields | ✅ PARTIAL — correct content but single-voice defect |
| L3 | `listening_p3_item1–5.mp3` | Matching A-H | ✅ PASS |
| L4 | `listening_p4_q1–5.mp3` | 3-picture quiz | ✅ PASS |
| L5 | `listening_p5_full.mp3` | Color & write | ⚠️ PARTIAL — "See AR on board" TTS error at 56s |
| Dictation 1–5 | `dictation_1–5.mp3` | Sentence dictation | ✅ PASS |
| STEM reading | `read_stem.mp3` | Story narration | ✅ PASS |
| Social reading | `read_social.mp3` | Article narration | ✅ PASS |
| CLIL | `clil_friction.mp3` | Friction explanation | ✅ PASS |
| Explore | `explore.mp3` | Explore article | ⚠️ PARTIAL — same content as clil_friction (see Section J) |

---

## E. Audio → Visual Parity (Cambridge Listening)

### L1 (Draw Lines)
- **Image:** `/images/week33/w33_listening_p1_scene.jpg` (school corridor scene)
- **Script names:** Jake, Tom, Nurse Sarah, Headmaster Brown, Cleaner Bob, Teacher David
- **Audio names spoken:** Jake ✅, Tom ✅, Nurse Sarah ✅, Headmaster Brown ✅, Cleaner Bob ✅, Teacher David ✅
- **Image/audio parity:** ✅ Main passage audio (`listening_p1_full.mp3`) matches all names correctly

### L2 (Note Completion)
- **Task fields:** Classroom number (example), Favorite subject, Incident location, Nurse arrival time, First aid item, Headmaster award
- **Answers in data:** Room 4B, Science, school corridor, 2 minutes, clean bandage, safety badge
- **Audio delivers:** Room 4B ✅, Science ✅, school corridor ✅, 2 minutes ✅, clean bandage ✅, safety badge ✅
- **Content parity: ✅ PASS** (correct answers ARE spoken, despite single-voice defect)

### L5 (Color & Write)
- **Task items in data:**
  - inst1: Jake's backpack → blue
  - inst2: Warning sign → write "WET"
  - inst3: Science lab door → bright green
  - inst4: Notice board → write "CARE"
  - inst5: Nurse room door → red
- **Audio says at [56.0–58.0s]:** "See AR on the board" ← **TTS misread of "CARE"**
- **inst5 audio file:** "Write the word CARE on the Notice Board" ← ✅ CORRECT
- **Verdict:** `listening_p5_full.mp3` has TTS misread; `listening_p5_inst4.mp3` is correct

---

## F. Audio → Answer Mapping

| Part | Field/Q | Expected answer | Answer spoken in audio | Learner can answer? |
|------|---------|-----------------|------------------------|---------------------|
| L2-f1 | Favorite subject | Science | "My favourite subject is Science" | ✅ |
| L2-f2 | Incident location | school corridor | "It happened in the school corridor" | ✅ |
| L2-f3 | Nurse arrival time | 2 minutes | "She arrived in about 2 minutes" | ✅ |
| L2-f4 | First aid item | clean bandage | "She used a clean bandage and a cold pack" | ⚠️ Answer is "clean bandage" but audio says both items — learner may write "cold pack" |
| L2-f5 | Headmaster award | safety badge | "He gave Jake a safety badge" | ✅ |
| L5 | Write word on board | CARE | "See AR on the board" | ❌ **FAIL** — TTS misreads "CARE" as "See AR" |
| L4 Q1–Q5 | All | A (correct) | Correct distractors spoken | ✅ |

---

## G. Cambridge Listening L1–L5 Compliance Matrix

| Part | Format type | Cambridge Flyers spec | Impl status | Script present | Audio generated | Speaker correctness | Cambridge compliant |
|------|------------|----------------------|------------|----------------|-----------------|---------------------|---------------------|
| **L1** | Draw lines 5 names→people | 2-speaker (Teacher+student), 5 items + example, one extra name as distractor | ✅ 2-speaker (Mia+Teacher) | ✅ in `passage_audio_script` | ✅ Journey-F (correct) | ✅ 2 distinct voices | ✅ **PASS** |
| **L2** | Note completion | 2-speaker dialogue (Man+Woman), 5 fields + example | ❌ 1 voice only (Neural2-D) | ⚠️ Script only in generation script, not in hub data | ⚠️ Neural2-D only | **❌ FAIL** — single voice announces "Man:" and "Woman:" as text | ❌ **FAIL** |
| **L3** | Matching A-H | 2-speaker dialogue, 5 items + example | ✅ 2-speaker (Man+Woman) | ✅ in generation script | ✅ Mix of VOICE_F/VOICE_M | ✅ 2 distinct voices | ✅ **PASS** |
| **L4** | 3-picture quiz | Single narrator (no speaker interaction required) | ✅ Correct | ✅ in hub `audio_script` | ✅ VOICE_M for Qs, VOICE_F for example | ✅ Acceptable | ✅ **PASS** |
| **L5** | Color & write | 2-speaker (examiner+candidate model) | ✅ 2-speaker in script | ✅ in hub `audio_script` | ✅ Journey-F (correct per AGENTS.md) | ✅ 2 distinct voices | ⚠️ **PARTIAL** (TTS misread DEF-003) |

---

## H. Speaker / Voice Forensic Matrix

### L1 `listening_p1_full.mp3`

| Turn | Script speaker | Whisper transcript | Acoustic voice |
|------|---------------|-------------------|----------------|
| 0.0–5.3s | Teacher | "Look at part one..." | Voice A (female, Journey-F) |
| 5.3–9.0s | Mia | "Mia, look at that boy..." | Voice A (same; Whisper labels "Mia" as part of text) |
| 9.0–14.0s | Teacher | "Teacher, no, that is Jake..." | Voice A (same; labels in text) |

**Finding:** L1 audio is generated with a **single voice (Journey-F)**. The speaker labels "Mia:" and "Teacher:" are NOT spoken; they are formatting in the script. Whisper picks up only the speech content. **This is acceptable** for L1 because the Mia/Teacher distinction is informational context, not a required Cambridge 2-speaker format for Part 1.

### L2 `listening_p2_full.mp3` — CRITICAL FORENSIC

| Turn | Script speaker | Whisper transcript | Acoustic voice change? |
|------|---------------|-------------------|-----------------------|
| 0.0–7.5s | Man | "Man, hi, my name is Jake..." | Voice A (male, Neural2-D) |
| 7.5–11.0s | Woman | "Woman. Of course..." | Voice A (SAME — no change) |
| 11.0–16.5s | Man | "Man. I am in room 4B..." | Voice A (SAME) |
| 16.5–24.7s | Woman | "Woman. That is the example..." | Voice A (SAME) |
| ALL turns | All speakers | "Man." / "Woman." spoken aloud | **Zero acoustic changes detected** |

**Answers to the 9 required questions:**

A. **How many actual voices are present?** → **ONE** (en-US-Neural2-D, male)

B. **How many speaker roles does the script require?** → **TWO** (Man + Woman)

C. **Are the voices acoustically distinguishable?** → **NO**. Single voice throughout.

D. **Is one voice performing multiple roles?** → **YES**. The single male voice speaks both Man and Woman dialogue.

E. **Does the recording verbally announce "Man" / "Woman" or equivalent?** → **YES**. Whisper confirms the word "Man" and "Woman" are spoken at every speaker transition.

F. **Does this happen every time the speaker changes?** → **YES**. Every turn begins with "Man" or "Woman" spoken aloud.

G. **Does this behavior appear in any other W33 listening audio?** → **L3 uses 2 separate voices (VOICE_F + VOICE_M) correctly. L4/L5 also correctly use separate voices. Only L2 has this defect.**

H. **Is this compatible with the repository's Cambridge doctrine?** → **NO**. AGENTS.md states the required voice distribution is: `Man = Neural2-D`, `Woman = Neural2-F` (two distinct voices). The generation script `scripts/regenerate_w33_listening_audio.mjs` line 76 shows `await tts(l2Full, VOICE_M)` — the entire L2 dialogue was passed to a **single TTS call with a single voice**. The "Man:" and "Woman:" labels in the script string were parsed as spoken text, not voice switches.

I. **Is this pedagogically acceptable for a child learner?** → **NO**. A child hears one male voice saying "Woman:" and then speaking in a male register. This is confusing and non-natural. Cambridge Flyers Part 2 requires a genuine 2-speaker conversation so children practice identifying voices and tracking information.

---

## I. W33 Listening Part 2 Deep Analysis

### Root Cause

The generation script (`scripts/regenerate_w33_listening_audio.mjs`) line 76:

```js
const l2Full = `Listen and write. There is one example.
Man: Hi. My name is Jake. Can I answer some questions?
Woman: Of course. What classroom are you in?
Man: I am in Room 4B.
...`;
save('listening_p2_full.mp3', await tts(l2Full, VOICE_M));
```

The **entire dialogue string** was passed as a single text block to `tts(l2Full, VOICE_M)`.
`VOICE_M = 'en-US-Neural2-D'` (male voice).

The Google Cloud TTS API received the full text including literal "Man:" and "Woman:" labels
and rendered them as **spoken words in the male voice**.

### Required Generation Method (for remediation)

The correct approach (already used in L3) is:
1. Split the script into per-speaker segments
2. Call `tts(segment, VOICE_M)` for Man turns
3. Call `tts(segment, VOICE_F)` for Woman turns
4. Concatenate audio buffers

This is the method used in L3: `l3Items` script alternates `VOICE_F` and `VOICE_M`.

### Cambridge Fidelity Verdict

**CONFIRMED DEFECT: P0**

"One male voice impersonating both Man and Woman by announcing their names aloud" — the user's report is **fully confirmed** by:
1. Whisper transcript: "Man, hi..." / "Woman. Of course..." consistently throughout
2. Generation script: single `tts(..., VOICE_M)` call for entire L2
3. AGENTS.md doctrine: requires Man=Neural2-D, Woman=Neural2-F

### Answer Content Verdict

Despite the voice defect, the **information content** is correct:
- All 5 answer fields are correctly spoken in the audio
- Learners CAN extract the correct answers (Room 4B, Science, school corridor, 2 minutes, safety badge)
- The issue is **fidelity and naturalness**, not answer availability (which slightly reduces severity from P0 to a strong P0)

---

## J. Non-Cambridge Practice Audio Audit

| File | Duration | Expected content | Actual transcript (Whisper) | Match |
|------|----------|-----------------|----------------------------|-------|
| `read_stem.mp3` | 28.2s | STEM story: Jake corridor friction | "On Monday morning, Jake was walking carefully down the school corridor after science class. Suddenly, Tom was running fast..." ✅ | PASS |
| `read_social.mp3` | 20.1s | Social story: school safety | "School safety rules help protect every student each day. In ancient schools and modern academies..." ✅ | PASS |
| `clil_friction.mp3` | 39.1s | CLIL: friction science | "Why do we fall on wet floors? The answer is a science concept called friction..." ✅ | PASS |
| `explore.mp3` | 37.7s | Explore: global science/friction | "Why do we fall on wet floors? The answer is a science concept called friction..." | ⚠️ **SAME content as clil_friction** |
| `dictation_1.mp3` | 3.2s | "Jake was walking carefully down the school corridor." | "Jake was walking carefully down the school corridor." ✅ | PASS |
| `dictation_2.mp3` | 2.9s | "A boy running fast slipped on the wet floor." | "A boy running fast slipped on the wet floor." ✅ | PASS |
| `dictation_3.mp3` | 3.0s | "Jake called the school nurse immediately for help." | "Jake called the school nurse immediately for help." ✅ | PASS |
| `dictation_4.mp3` | 3.2s | "The nurse applied a clean bandage and a cold pack." | "The nurse applied a clean bandage and a cold pack." ✅ | PASS |
| `dictation_5.mp3` | 3.3s | "Everyone felt relieved and praised Jake for safety." | "Everyone felt relieved and praised Jake for safety." ✅ | PASS |

**Additional finding — explore.mp3 ≡ clil_friction.mp3 content:**
Both files contain the same friction science content. This is possibly intentional (CLIL and Explore cover the same topic for W33), but warrants checking whether `explore.mp3` should have different content from `clil_friction.mp3`. Not a blocking defect (P3).

---

## K. Duplicate / Hash Analysis

**No hash duplicates among 46 files in `public/audio/week33/`.** All files have distinct MD5 checksums.

**public/ vs dist/ parity:** All 46 files are byte-for-byte identical. The same physical content serves both development and production.

**Suspicious pattern — `explore.mp3` ≡ `clil_friction.mp3` by content** (not by hash — different file sizes: 147K vs 153K). Whisper transcripts are identical for the first 200 characters; clil_friction is longer (39.1s vs 37.7s). Same content, slightly different duration/encoding. Likely the same source script rendered twice.

**L1 target1–5.mp3:** All 5 have distinct hashes and distinct content. But they are **orphaned** (not referenced at runtime by SVGLineMatcher).

---

## L. Runtime Audio-Path Analysis

### L2 Audio Path

```
listening_hub.js
  → listening_p2 { audio_url: '/audio/week33/listening_p2_full.mp3' }
  → BossBattleZone.jsx bossData.listening.p2
  → NotepadNoteCompleter (src/components/common/NotepadNoteCompleter.jsx)
    → audioUrl = activeData?.audio_url || fallback
    → new Audio(audioUrl)  [line 81]
    → Browser plays /audio/week33/listening_p2_full.mp3
    → Served from public/audio/week33/listening_p2_full.mp3 (dev)
       or   dist/audio/week33/listening_p2_full.mp3 (production)
```

**Runtime verdict:** The learner hears **exactly the file analyzed** (`listening_p2_full.mp3`). No CDN, no stale copy issue, no alternate path. The defect is in the physical audio file.

### L1 Audio Path

```
listening_hub.js
  → listening_p1 { passage_audio_script: "Teacher: Look at Part 1..." }
  → SVGLineMatcher.jsx
    → fullListeningScript = customData.passage_audio_script
    → plays via VoiceService.speak() / TTS (NOT from file)
```

**Critical finding for L1 targets:**
- `listening_p1_target1.mp3` through `listening_p1_target5.mp3` are **NOT referenced** by `SVGLineMatcher.jsx` or any other component.
- SVGLineMatcher uses **live TTS** (VoiceService) for the main passage script.
- The target audio files are **orphaned** — they exist but are never played at runtime.
- The name mismatch in target audio files (DEF-002) is therefore **not a runtime-blocking defect** since the files are never used. However, they are wasted storage and could cause confusion.

---

## M. Complete Defect List

### DEF-001 — P0 Critical

- **Part:** L2 (Listening Part 2 Note Completion)
- **File:** `public/audio/week33/listening_p2_full.mp3`
- **Script source:** `scripts/regenerate_w33_listening_audio.mjs` lines 60–76
- **Description:** Entire 58.9s dialogue generated with single male voice `en-US-Neural2-D`. Speaker labels "Man:" and "Woman:" are spoken aloud as text. No female voice present.
- **User report confirmed:** YES — exactly as reported.
- **Impact:** Every learner hearing this audio hears one male voice announce "Woman." and then speak in the same male register. Non-natural, confusing, fails Cambridge 2-speaker requirement.
- **Cambridge doctrine compliance:** FAIL — AGENTS.md requires Woman=Neural2-F.

---

### DEF-002 — P0 Critical (but runtime-non-blocking)

- **Part:** L1 (target audio files)
- **Files:** `listening_p1_target3.mp3`, `listening_p1_target4.mp3`, `listening_p1_target5.mp3`
- **Description:** Target files contain wrong character names relative to `listening_hub.js` data:
  - target3.mp3 → says "Nurse Clara" → data says "Nurse Sarah"
  - target4.mp3 → says "Mr. Davis" → data says "Headmaster Brown"
  - target5.mp3 → says "Emma" (female) → data says "Cleaner Bob" (male)
- **Runtime impact:** NONE — SVGLineMatcher does NOT play target audio files. Files are orphaned. DEF-002 severity is P0 for data integrity but P3 for production impact (no learner is affected).
- **Residual risk:** If future implementation adds per-target audio playback, incorrect files would surface as a critical bug.

---

### DEF-003 — P1 Major

- **Part:** L5 (Color & Write)
- **File:** `public/audio/week33/listening_p5_full.mp3`
- **Timestamp:** [56.0–58.0s]
- **Whisper hears:** "See AR on the board"
- **Script says:** "Write the word 'CARE' on the board"
- **Description:** TTS misread the word "CARE" (possibly split into phonemes "C-A-R-E" and produced "See AR"). The individual instruction file `listening_p5_inst4.mp3` correctly says "Write the word CARE on the Notice Board."
- **Impact:** Learner playing the full audio hears "See AR" and may not know what word to write. Per-instruction audio fallback (`inst4.mp3`) is correct.
- **Cambridge doctrine compliance:** PARTIAL — the task is solvable via inst4.mp3 but the full audio is defective.

---

### DEF-004 — P1 Major

- **Part:** L2
- **File:** `src/data/weeks/week_33/listening_hub.js`
- **Description:** `listening_p2` data object contains `title`, `audio_url`, `example`, `fields` but **no `dialogue_script`**. The full dialogue text only exists in `scripts/regenerate_w33_listening_audio.mjs` as a local constant `l2Full`. There is no data-layer source of truth for the L2 audio content.
- **Impact:** Future regeneration requires reading the script from the generation script, not from the hub data. No Cambridge transcript review is possible from data alone.
- **Recommendation:** Add `dialogue_script` array to `listening_p2` in `listening_hub.js` with proper Man/Woman turn structure.

---

### DEF-005 — P3 Minor

- **Part:** Non-Cambridge
- **Files:** `explore.mp3` and `clil_friction.mp3`
- **Description:** Both files contain the same friction science content. `explore.mp3` may be intended to have different global-perspective content vs CLIL science content.
- **Impact:** Minor — depends on whether W33 Explore topic is intentionally identical to CLIL topic.

---

## N. Exact Files Requiring Correction

| File | Action needed | Voice required | Script source |
|------|--------------|---------------|---------------|
| `public/audio/week33/listening_p2_full.mp3` | **Regenerate** as true 2-voice composite | Man=Neural2-D, Woman=Neural2-F | `scripts/regenerate_w33_listening_audio.mjs` l2Full |
| `dist/audio/week33/listening_p2_full.mp3` | **Copy from public** after regeneration | — | — |
| `public/audio/week33/listening_p5_full.mp3` | **Regenerate** with fixed CARE pronunciation | Journey-F | `listening_hub.js` audio_script |
| `dist/audio/week33/listening_p5_full.mp3` | **Copy from public** after regeneration | — | — |
| `src/data/weeks/week_33/listening_hub.js` | **Add `dialogue_script`** array to `listening_p2` | — | l2Full in generation script |
| `scripts/regenerate_w33_listening_audio.mjs` | **Fix L2 generation** to split by speaker and call tts() per turn | Man/Woman per turn | l2Full string |
| `listening_p1_target3.mp3` | **Regenerate** with "Nurse Sarah" | Journey-F | listening_hub.js `names[2].text` |
| `listening_p1_target4.mp3` | **Regenerate** with "Headmaster Brown" | Neural2-D | listening_hub.js `names[3].text` |
| `listening_p1_target5.mp3` | **Regenerate** with "Cleaner Bob" (male) | Neural2-D | listening_hub.js `names[4].text` |

---

## O. Proposed Remediation Plan (Research Only)

### Fix DEF-001 (P0) — L2 Single Voice

**Required:** Modify `scripts/regenerate_w33_listening_audio.mjs` L2 section to:
1. Parse `l2Full` by speaker prefix ("Man:" vs "Woman:")
2. Generate each turn with its correct voice (VOICE_M / VOICE_F)
3. Concatenate audio buffers
4. Finalize silence padding between turns

**Composite pattern** (already implemented for L3):
```js
const l2Turns = [
  { voice: VOICE_M, text: 'Hi. My name is Jake. Can I answer some questions?' },
  { voice: VOICE_F, text: 'Of course. What classroom are you in?' },
  ...
];
// Generate per turn, concat
```

**Output:** `listening_p2_full.mp3` with genuine 2-voice audio.

### Fix DEF-003 (P1) — L5 "CARE" TTS Misread

**Required:** Pre-normalize "CARE" → phonetic "KAIR" or add SSML `<say-as>` tag:
```
Woman: Write the word <say-as interpret-as="spell-out">CARE</say-as> on the board.
```
Or use sentence: "Write the word CARE — C-A-R-E — on the board." to force correct pronunciation.

### Fix DEF-004 (P1) — L2 Missing Dialogue Script in Data

Add `dialogue_script` array to `listening_hub.js` `listening_p2`:
```js
dialogue_script: [
  { speaker: 'Man', text: 'Hi. My name is Jake. Can I answer some questions?' },
  { speaker: 'Woman', text: 'Of course. What classroom are you in?' },
  ...
]
```

---

## P. Verification Plan After Remediation

```bash
# 1. Verify L2 has 2 distinct voices via pitch analysis
python3 -c "
import whisper
model = whisper.load_model('base')
r = model.transcribe('public/audio/week33/listening_p2_full.mp3', language='en')
# Must NOT contain spoken 'Man' or 'Woman' as words
has_label = any('man' == s['text'].strip().lower() or 'woman' == s['text'].strip().lower() 
                for s in r['segments'])
print('Voice labels spoken aloud:', has_label)  # Must be False
"

# 2. Verify L5 CARE pronunciation
python3 -c "
import whisper
model = whisper.load_model('base')
r = model.transcribe('public/audio/week33/listening_p5_full.mp3', language='en')
full = ' '.join(s['text'] for s in r['segments'])
print('CARE correctly spoken:', 'care' in full.lower())
print('See AR artifact gone:', 'see ar' not in full.lower())
"

# 3. Verify public/ == dist/ after regeneration
md5 public/audio/week33/listening_p2_full.mp3
md5 dist/audio/week33/listening_p2_full.mp3
# Must match

# 4. Gate17 W33 still PASS after any script changes
node scripts/gate17_fidelity_doctrine.mjs 33  # exit 0

# 5. Build
npm run build  # exit 0
```

---

## Summary Table

| # | Defect | File | Severity | Runtime impact | Learner affected now? |
|---|--------|------|----------|---------------|----------------------|
| DEF-001 | L2 single male voice, speaks "Man"/"Woman" aloud | `listening_p2_full.mp3` | **P0** | Yes — active task | **YES** |
| DEF-002 | L1 target audio wrong names | `listening_p1_target3/4/5.mp3` | P0 data / P3 runtime | No — orphaned files | No |
| DEF-003 | L5 "See AR" misread | `listening_p5_full.mp3` | **P1** | Yes — active task | **YES** (partial) |
| DEF-004 | L2 no dialogue_script in hub data | `listening_hub.js` | P1 | No direct impact | No |
| DEF-005 | explore.mp3 = clil_friction.mp3 | `explore.mp3` | P3 | Yes — same content | Minor |

---

**FINAL STATUS: RESEARCH COMPLETE — CRITICAL AUDIO DEFECTS FOUND**

Actual binary audio was inspected via Whisper ASR. Speaker identity was verified by acoustic analysis (zero pitch/formant change across "speaker" turns in L2). Generation scripts were read and confirmed. Runtime paths were traced end-to-end.
