# W33 FINAL FORENSIC AUDIT
**Date:** 2026-08-27 | **Auditor:** Antigravity (independent verification) | **Mode:** AUDIT ONLY — no files modified.

---

## 1. Executive Verdict

### 🔴 NOT READY TO FREEZE

**W33 cannot be frozen as the Golden Standard in its current state.**

| Domain | Status |
|--------|--------|
| Cambridge Compliance | ⚠️ PARTIAL — L2 and L5 are EXACT; L1, L3 are ALIGNED; L4 is DEFECTIVE |
| Content Integrity | ❌ FAIL — 6 stale audio files, 3 cross-content character/content errors |
| Audio Integrity | ❌ FAIL — Dictation D1-D5, explore.mp3, read_stem.mp3 all stale/mismatched |
| Source-of-Truth Architecture | ⚠️ PARTIALLY SAFE — L2 is safe; L3/L4 contain architecture violations |
| Assessment Validity | ❌ FAIL — L4 all-A answers invalidates the assessment task |
| Architecture as Template | ⚠️ CONDITIONALLY SAFE — L2 architecture is replicable; L3/L4 must be fixed first |
| Public/dist Sync | ✅ PASS — all 45 audio files byte-identical |

**Hard blockers preventing freeze (must ALL be resolved):**

1. **L4 all-A answer distribution** — assessment is invalid
2. **Dictation D1–D5 audio does not match source text** — 5 stale audio files
3. **explore.mp3 narrates wrong content** — global school safety, not friction CLIL
4. **read_stem.mp3 narrates stale text** — character name "Nurse Clara", current source is anonymous
5. **L4 audio_script contains raw "Woman:"/"Man:" labels** — Rule B violation in source data
6. **L3 audio scripts live only in generation script** — Rule A violation

---

## 2. Evidence Summary

| Metric | Value |
|--------|-------|
| Total audio files in public/audio/week33/ | 46 (45 MP3 + 1 .md) |
| Active / runtime-used | 40 |
| Orphaned (not referenced) | 5 (target1–5) |
| Stale (wrong content vs current source) | 8 (read_stem, explore, dictation 1-5) |
| Public/dist 100% MD5 MATCH | ✅ Yes (all 45 MP3) |
| ASR coverage this audit | 100% of listening + content audio |
| Tasks with complete source→ASR chain | L1, L2, L3, L4, L5, explore, STEM, social, dictation |
| Cambridge parts audited | L1–L5 (all 5) |
| Gate 14 (public/dist) | ✅ PASS |
| Gate 15 (mechanic validity) | ❌ FAIL — L4 all-A |

---

## 3. Cambridge A2 Flyers Compliance Matrix

| Task | Mechanic | Items | Example | Speaker | Answer Validity | Alignment | Verdict |
|------|----------|-------|---------|---------|----------------|-----------|---------|
| L1: Draw Lines | Name→person matching, picture scene | 5 ✅ | ✅ | Single voice ❌ | ✅ | **ALIGNED** | ALIGNED — NOT EXACT |
| L2: Note Completion | Interview dialogue, fill 5 fields | 5 ✅ | ✅ | 2 voices ✅ | ✅ ALL PASS | **EXACT** | ✅ PASS |
| L3: Match A–H | 8 options, 5 scored, letter boxes | 5 ✅ | ✅ | 2 voices in audio ✅ | ✅ | **ALIGNED** | ALIGNED — NOT EXACT |
| L4: Tick the Box | 3-picture MCQ | 5 ✅ | ✅ | Single voice ❌ | ❌ ALL-A | **DEFECTIVE** | ❌ BLOCKER |
| L5: Colour & Write | 3 colour + 2 write | 5 ✅ | ✅ | Single (acceptable for L5) | ✅ CARE fixed | **EXACT** | ✅ PASS |
| Exam Intros L1–L5 | Official Cambridge wording | — | — | Single ✅ | — | **EXACT** | ✅ PASS |
| Exam Intros S1–S4 | Speaking task guidance | — | — | Single ✅ | — | **ALIGNED** | ALIGNED |

### Why L4 is DEFECTIVE, not merely INSPIRED:

Official Cambridge L4 distributes correct answers across A, B, and C with plausible distractors. A student who ticks "A" for every question scores **5/5 without listening to a single word**. This is not a style deviation — it is a fundamental failure of the assessment instrument.

### Why L3 is ALIGNED not EXACT:

- L3 audio scripts are generated from content inside `regenerate_w33_listening_audio.mjs`, not from hub data fields (Rule A violation)
- Cambridge L3 uses 8 cards; this implementation does provide 8 options (A–H)
- The structural issue is traceability, not the learner-facing mechanic

### Why L1 is ALIGNED not EXACT:

- Cambridge L1 uses acoustically distinct speakers per character. Current L1 uses a single voice (Journey-F) for a dialogue between Teacher and Mia
- The line-drawing mechanic, 5 targets, and example are correct
- The audio is functionally understandable but not Cambridge-authentic

---

## 4. Complete Audio Transcript Appendix

### L1: Draw Lines

**`listening_p1_full.mp3`** | 61.0s | Single voice (Journey-F)
```
Look at part one. Now look at the picture. Listen and look. There is one example.
Look at that boy in the corridor. Is he running? Oh. No. That's Tom slipping on the
wet floor. Look at the boy walking carefully in the blue shirt. Oh, I see him now. Is
that Jake? Yes. That's right. Jake is walking carefully. Can you see the example line?
Now you listen and draw lines. Who is the woman with the first aid kit rushing near the
wall? That is Nurse Sarah. She is bringing bandages to help. Look at the man wearing
glasses near the notice board. That is headmaster Brown. He is watching the corridor.
Is that cleaner Bob holding the yellow warning sign and mop? Yes. That is cleaner Bob.
He is drawing the tiles. Oh. Who is the teacher walking near the science lab?
That is teacher David. He is guiding students into the classroom.
```
> "drawing the tiles" — HIGH CONFIDENCE Whisper mishear of "drying". Not a defect.
> All 5 character names correct: Tom, Jake, Nurse Sarah, Headmaster Brown, Cleaner Bob, Teacher David.

---

### L2: Note Completion

**`listening_p2_full.mp3`** | 44.9s | Two voices confirmed (Journey-F female, Neural2-D male)
```
[FEMALE] Listen and write. There is one example.
[MALE]   Hi, my name is Jake. Can I answer some questions?
[FEMALE] Of course. What classroom are you in?
[MALE]   I am in room 4B.
[FEMALE] That is the example. Room 4B. Now you listen and write.
[FEMALE] What is your favorite subject at school?
[MALE]   My favorite subject is science.
[FEMALE] And where did the accident happen today?
[MALE]   It happened in the school corridor, near the science room.
[FEMALE] How quickly did the nurse arrive?
[MALE]   She arrived in about two minutes.
[FEMALE] What did the nurse use to help the hurt knee?
[MALE]   She used a clean bandage and a cold pack.
[FEMALE] Did the headmaster say anything at assembly?
[MALE]   Yes. He gave Jake a safety badge in front of the whole school.
```
> No speaker labels spoken. Two distinct voices acoustically confirmed.

---

### L3: Match A–H

**`listening_p3_example.mp3`** | 19.3s | Single voice
```
Listen and write a letter in each box. There is one example. Look at the picture.
What is the tool used to clean a wet floor? That is the cleaning mop. Can you see the
letter H in the box? That is the example. Now you listen and write a letter in each box.
```

**`listening_p3_item1.mp3`** | 12.8s | Answer: A (School Stairs) — Two voices in audio ✅
```
[MAN]   Look at the first picture. What are the steps inside the school building...?
[WOMAN] Those are the school stairs. They go up to the second floor.
[MAN]   School stairs. Write the letter.
```

**`listening_p3_item2.mp3`** | 11.0s | Answer: B (Warning Sign)
```
[MAN]   What is the yellow board placed on the wet floor to warn students?
[WOMAN] That is the warning sign. It says be careful.
[MAN]   Warning sign. Write the letter.
```

**`listening_p3_item3.mp3`** | 11.7s | Answer: C (First-Aid Kit)
```
[MAN]   What is the white box with a red cross kept in the nurse office?
[WOMAN] That is the first aid kit. The nurse keeps it ready.
[MAN]   First aid kit. Write the letter.
```

**`listening_p3_item4.mp3`** | 10.8s | Answer: D (Cold Pack)
```
[MAN]   What is the blue bag filled with ice that the nurse puts on a swollen knee?
[WOMAN] That is the cold pack. It stops the knee from swelling.
[MAN]   Cold pack. Write the letter.
```

**`listening_p3_item5.mp3`** | 12.7s | Answer: E (Clean Bandage)
```
[MAN]   What is the long white cloth strip wrapped around a cut or hurt part of the body?
[WOMAN] That is the clean bandage. The nurse uses it to cover the wound.
[MAN]   Clean bandage. Write the letter.
```

**`listening_p3_full.mp3`** | 78.3s — COMPOSITE of example + items 1–5 in sequence
```
[Full composite — contains all L3 content in one file, used as the main audio source by VisualMatchingAH.jsx]
Listen and write a letter in each box. ... [all 5 item descriptions in sequence]
```

---

### L4: Tick the Box

**`listening_p4_example.mp3`** | 12.3s | Single voice (Journey-F)
```
Look at the example. Where was Jake walking after class? He was walking carefully in
the school corridor. Can you see the tick next to picture A? Now you listen and tick the box.
```

**`listening_p4_q1.mp3`** | 7.4s | Answer: A | Single voice (Neural2-M)
```
Question 1. Why was the floor slippery near the science room?
The cleaner had just washed the tiles with water.
```

**`listening_p4_q2.mp3`** | 6.6s | Answer: A
```
Question 2. What happened when the boy ran fast?
He slipped on the wet floor and hurt his knee.
```

**`listening_p4_q3.mp3`** | 6.0s | Answer: A
```
Question 3. What did Jake do immediately?
He ran to the nurse room to call for help.
```

**`listening_p4_q4.mp3`** | 6.9s | Answer: A
```
Question 4. What did the nurse use to treat the knee?
She used a clean bandage and a cold pack.
```

**`listening_p4_q5.mp3`** | 7.2s | Answer: A
```
Question 5. What did the headmaster say during assembly?
He praised Jake for following safety habits.
```

**`listening_p4_full.mp3`** | 46.5s — COMPOSITE
```
Look at the example. Where was Jake walking after class? He was walking carefully in the
school corridor. Can you see the tick next to picture A? Now you listen and tick the box.
Question 1. Why was the floor slippery...? The cleaner had just washed the tiles with water.
Question 2. What happened when the boy ran fast? He slipped on the wet floor and hurt his knee.
Question 3. What did Jake do immediately? He ran to the nurse room to call for help.
Question 4. What did the nurse use to treat the knee? She used a clean bandage and a cold pack.
Question 5. What did the headmaster say during assembly? He praised Jake for following safety habits.
```

---

### L5: Colour and Write

**`listening_p5_full.mp3`** | 64.0s | Single voice
```
Listen, and color and write. There is one example. Look at this picture of the school
corridor. Can you see Jake's friends sitting on the bench? Yes, I can see him. Good.
Color his notebook yellow. Can you see the yellow notebook? That is the example. Now
you listen, and color, and write. Now look at Jake. He is carrying a backpack. Shall I
color his backpack blue? Yes. Color Jake's backpack blue. Look at the warning sign near
the wet tiles. Can you write a word on it? Sure. What word should I write? Write the
word wet on the sign. Can you find the science lab doorframe? Yes. It is next to the
lockers. Color the doorframe bright green. Look at the notice board on the wall. Can
you write one more word? Yes. What should I write? Write the word care on the board.
Now look at the nurse room door at the end of the corridor. Did I color it red? Yes.
Color the nurse room door red.
```
> "Jake's friends" (plural) — Whisper mishear of "friend" (singular). Not a defect.
> "CARE" spoken as natural word "care" — CONFIRMED FIX working.

**L5 Individual Instructions:**

| File | Duration | Transcript |
|------|----------|-----------|
| `inst1.mp3` | 2.0s | Color Jake's backpack blue. |
| `inst2.mp3` | 2.6s | Write the word wet on the warning sign. |
| `inst3.mp3` | 3.8s | Color the Science Lab Doorframe Bright Green. |
| `inst4.mp3` | 2.5s | Write the word CARE on the Notis Board. |
| `inst5.mp3` | 2.0s | Color the nurse room door red. |

> `inst4.mp3`: "Notis Board" — Whisper mishear for "Notice Board". UNVERIFIED — HUMAN EAR REVIEW REQUIRED.

---

### Exam Intros

| File | Duration | Transcript | Verdict |
|------|----------|-----------|---------|
| `exam_intro_L1.mp3` | 4.0s | Listen and draw lines. There is one example. | ✅ EXACT |
| `exam_intro_L2.mp3` | 3.2s | Listen, and write. There is one example. | ✅ EXACT |
| `exam_intro_L3.mp3` | 4.5s | Listen and write a letter in each box. There is one example. | ✅ EXACT |
| `exam_intro_L4.mp3` | 3.4s | Listen and tick the box. There is one example. | ✅ EXACT |
| `exam_intro_L5.mp3` | 3.8s | Listen and color and write. There is one example. | ✅ EXACT (US spelling) |
| `exam_intro_S1.mp3` | 5.4s | Look at the two pictures. They are the same, but there are some differences. Tell me the differences. | ✅ ALIGNED |
| `exam_intro_S2.mp3` | 4.6s | Look at the questions. Ask and answer questions using the information cards. | ✅ ALIGNED |
| `exam_intro_S3.mp3` | 4.4s | Look at the pictures they tell a story. Look at the pictures first, and tell the story. | ✅ ALIGNED |
| `exam_intro_S4.mp3` | 4.2s | Now let's talk about you and your daily life. Answer the questions. | ✅ ALIGNED |

---

### Content Audio

**`explore.mp3`** | 37.7s
```
Schools around the world have important safety rules to protect students every day.
In Canada and the UK, janitors place bright yellow warning signs in corridors whenever
floors are wet. In Japan, students walk in single lines during class breaks and practice
safety drills every month. Following safety rules helps prevent accidents, keeps hallways
calm, and shows respect for our school community.
[continues with global safety examples...]
```
> **SOURCE MISMATCH**: `explore.js` `content_en` contains global school safety content.
> `clil_friction.mp3` contains the friction science content.
> The two content files serve their own correct stations separately.
> However: `explore.mp3` does NOT match the friction/corridor narrative context of the week.
> The explore station narrates *global school safety rules* while all other stations narrate *Jake's corridor friction accident*.
> This is a **pedagogical disconnect**, not a fatal runtime error, but is inconsistent with the week theme cohesion standard.

**`clil_friction.mp3`** | 39.0s
```
Why do we fall on wet floors? The answer is a science concept called Friction. Friction
is a force that stops things from sliding. While Jake was walking down the corridor, his
rubber shoes created high friction with the dry floor. This kept him safe and balanced.
Water on smooth tiles reduces surface friction and causes students to slip...
```
> ✅ Source: `reading_hub.js` → `clil_article.content_en`. Content consistent with week theme.

**`read_stem.mp3`** | 28.0s
```
On Monday morning, Jake was walking carefully down the school corridor after science class.
Suddenly, Tom was running fast because he was late. Tom slipped on the wet floor and fell
down heavily near the stairs. Jake stopped immediately. He did not run away. Jake called
the school nurse right away. Nurse Clara arrived with a clean bandage and a cold pack.
She treated Tom gently. Later the headmaster praised Jake for staying calm. Everyone felt relieved.
```
> 🔴 **STALE AUDIO**: "Nurse Clara" + "Tom was running" + specific character names.
> Current `read.js` `text_en` uses: "the nurse" (anonymous), "a boy running fast" (anonymous), "his friend".
> Audio was generated from a **previous version** of read.js containing "Nurse Clara" and character names.
> The current source text is anonymous. Audio must be regenerated.

**`read_social.mp3`** | 20.0s
```
School safety rules help protect every student each day. In ancient schools and modern
academies, following rules creates a peaceful environment. When students walk calmly in
hallways, accidents do not happen. Helping an injured friend shows kindness and responsibility.
Good citizens always care for others.
```
> No cross-content conflicts identified. Pedagogically appropriate.

---

### Dictation Audio

| File | Source Text (skill_practice_hub.js) | ASR Transcript | Match? |
|------|-------------------------------------|----------------|--------|
| `dictation_1.mp3` | "Jake was walking carefully down the corridor." | "Jake was walking carefully down the **school** corridor." | ⚠️ MINOR DRIFT — "school" added |
| `dictation_2.mp3` | "A boy **ran** fast and slipped on the wet floor." | "A boy **running** fast slipped on the wet floor." | ❌ STALE — different grammar ("ran" vs "running") |
| `dictation_3.mp3` | "Jake stopped immediately to help his **classmate**." | "**Jake called the school nurse right away.**" | ❌ STALE — completely different sentence |
| `dictation_4.mp3` | "The school nurse arrived quickly with a **bandage**." | "**The nurse applied a clean bandage and a cold pack.**" | ❌ STALE — different sentence |
| `dictation_5.mp3` | "Everyone felt relieved and **followed safety rules**." | "Everyone felt relieved and **praised Jake for safety**." | ❌ STALE — different ending |

> **CRITICAL FINDING**: Dictation D2–D5 audio files do not match current source text.
> D3 is completely different (different sentence). D4 and D5 have different predicates.
> All dictation audio was generated from a **previous version** of skill_practice_hub.js.

---

### Orphan Audio (L1 Targets)

| File | ASR Transcript | Hub Data (listening_hub.js) | Discrepancy |
|------|---------------|-----------------------------|-------------|
| `target1.mp3` | "Tom is the boy in the blue shirt who slipped..." | Jake = t1 | ❌ Jake↔Tom swapped |
| `target2.mp3` | "Jake is the boy wearing a green shirt..." | Tom = t2 | ❌ Tom↔Jake swapped |
| `target3.mp3` | "Nurse Clara is the kind school nurse..." | Nurse Sarah = t3 | ❌ Clara vs Sarah |
| `target4.mp3` | "Mr. Davis is the tall headmaster..." | Headmaster Brown = t4 | ❌ Davis vs Brown |
| `target5.mp3` | "Emma is the helpful girl wearing yellow..." | Cleaner Bob = t5 | ❌ Emma (female) vs Bob (male) |

---

## 5. Source → TTS → ASR Comparison

### L1

| Stage | Content |
|-------|---------|
| Source | `passage_audio_script` string: `"Teacher: ... Mia: ... Teacher: ..."` |
| TTS Transformation | Full string sent to VOICE_F (Journey-F). `tts()` strips speaker labels via regex. Single voice. |
| ASR | All character names present. "drying" → "drawing" (Whisper artifact). |
| Answer Key | n1→Jake, n2→Tom, n3→NurseSarah, n4→HeadmasterBrown, n5→CleanerBob, n6→TeacherDavid |
| Verdict | **MINOR_VARIANCE + SPEAKER_ERROR** — content correct, single voice violates Rule C for Cambridge ALIGNED claim |

### L2

| Stage | Content |
|-------|---------|
| Source | `dialogue_script[]` — structured turns with `{speaker, text}` |
| TTS Transformation | Per-turn voice routing: man→Neural2-D, woman→Journey-F. `validateDialogueScript()` enforced. |
| ASR | All 5 answer fields present: science, school corridor, two minutes, clean bandage, safety badge |
| Answer Key | All 5 confirmed in audio |
| Verdict | **PASS** ✅ |

### L3 Items

| Stage | Content |
|-------|---------|
| Source | Hub data: `{id, name, target_letter, audio_url}` — NO `audio_text` or `audio_script` field |
| TTS Transformation | Scripts **constructed inside generation script** as hardcoded `turns[]` arrays. Not derivable from hub data alone. |
| ASR | Item names audible and answer-consistent |
| Answer Key | A=stairs, B=warning, C=first-aid, D=cold pack, E=bandage — all confirmed |
| Verdict | **SOURCE_OF_TRUTH_ERROR** — content correct, architecture violates Rule A |

### L4 Questions

| Stage | Content |
|-------|---------|
| Source | `audio_script` field: `"Woman: Question N. [Q]\nMan: [A]"` — raw labels in text |
| TTS Transformation | Generation script strips labels, sends `"Question N. [Q]\n[A]"` to single voice (Neural2-M for Q1–Q5) |
| ASR | "Question N." spoken aloud. Single voice. Content factually correct. |
| Answer Key | Q1=A, Q2=A, Q3=A, Q4=A, Q5=A — ALL A |
| Verdict | **TASK_DESIGN_ERROR + SPEAKER_ERROR + STRUCTURAL_ERROR** — multiple compounding failures |

### L5

| Stage | Content |
|-------|---------|
| Source | `audio_script` string + `instructions[]` array |
| TTS Transformation | String sent to VOICE_F, labels stripped. Individual inst files from `instructions[].text` |
| ASR | All 3 colours + 2 words confirmed. CARE fix working. |
| Answer Key | All 5 confirmed |
| Verdict | **PASS** ✅ |

### explore.mp3

| Stage | Content |
|-------|---------|
| Source | `explore.js` → `content_en` (global school safety rules — NOT friction science) |
| TTS Transformation | `generate_week_audio_universal.mjs` → `generateSingleMP3(exploreMod.content_en)` |
| ASR | "Schools around the world have important safety rules..." |
| Expected | Friction/corridor CLIL science content |
| Verdict | **CONTENT_ERROR** — audio matches its source (explore.js) but explore.js content is NOT the friction theme expected by the week architecture |

### read_stem.mp3

| Stage | Content |
|-------|---------|
| Source | `read.js` → `text_en` — current text uses "the nurse" (anonymous), "a boy" (anonymous) |
| TTS Input at generation time | **Unknown** — audio says "Nurse Clara" + "Tom slipped" — this text does NOT exist in current read.js |
| ASR | "Nurse Clara arrived" — stale character name |
| Current source | "the nurse arrived quickly" — anonymous |
| Verdict | **SOURCE_OF_TRUTH_ERROR + STALE_AUDIO** — audio generated from a previous version of read.js |

### Dictation Files

| File | Source | ASR | Verdict |
|------|--------|-----|---------|
| D1 | "...down the corridor." | "...down the school corridor." | **MINOR_VARIANCE** — extra "school" |
| D2 | "A boy ran fast..." | "A boy running fast..." | **CONTENT_ERROR** — different grammatical form changes dictation task |
| D3 | "Jake stopped...classmate." | "Jake called the school nurse right away." | **CONTENT_ERROR** — completely different sentence |
| D4 | "The school nurse arrived...bandage." | "The nurse applied...bandage and a cold pack." | **CONTENT_ERROR** — different sentence |
| D5 | "...followed safety rules." | "...praised Jake for safety." | **CONTENT_ERROR** — different ending |

---

## 6. Defect Register

| ID | Severity | Type | File/Source | Evidence | Impact | Blocker? | Recommended Fix |
|----|----------|------|-------------|----------|--------|---------|----------------|
| DEF-001 | **CRITICAL** | STALE_AUDIO | `read_stem.mp3` | ASR: "Nurse Clara"; current `read.js` text_en has no "Nurse Clara" or "Tom"; audio predates current source | Student hears anonymous "nurse" in reading but "Nurse Clara" in audio; cross-content inconsistency | ✅ YES | Regenerate from current `read.js text_en` |
| DEF-002 | **CRITICAL** | STALE_AUDIO (orphaned) | `listening_p1_target1–5.mp3` | ASR: Jake↔Tom swapped, Nurse Clara, Mr. Davis, Emma; current hub uses Sarah, Brown, Bob | Not runtime-blocking (files not referenced), but unsafe to activate | ✅ If activated | Retain+document; regenerate if SVGLineMatcher adds per-target audio |
| DEF-003 | **CRITICAL** | TASK_DESIGN_ERROR | `listening_p4_q1–5.mp3` | Node: ALL answers = "A" (`{A:5}` distribution confirmed) | Assessment entirely invalid; 5/5 score achievable without listening | ✅ YES | Redesign Q1–Q5 so answers span A, B, C |
| DEF-004 | **CRITICAL** | STALE_AUDIO | `dictation_3.mp3` | Source: "stopped immediately to help his classmate"; ASR: "called the school nurse right away" | Student cannot dictate correct sentence from audio | ✅ YES | Regenerate from current `skill_practice_hub.js` |
| DEF-005 | **CRITICAL** | STALE_AUDIO | `dictation_4.mp3` | Source: "The school nurse arrived quickly with a bandage"; ASR: "The nurse applied a clean bandage and a cold pack" | Dictation answer mismatch | ✅ YES | Regenerate |
| DEF-006 | **CRITICAL** | STALE_AUDIO | `dictation_5.mp3` | Source: "followed safety rules"; ASR: "praised Jake for safety" | Dictation answer mismatch | ✅ YES | Regenerate |
| DEF-007 | **CRITICAL** | SOURCE_OF_TRUTH_ERROR | `explore.mp3` | ASR: global school safety (Canada/UK/Japan examples); `explore.js` content_en IS that global content; but week thematic cohesion is broken | Explore station narrates global safety rules while all other stations narrate friction corridor story — pedagogical disconnect | ✅ YES | Rewrite `explore.js content_en` to match friction/corridor theme |
| DEF-008 | **CRITICAL** | STRUCTURAL_ERROR | `listening_p4` source data | All `audio_script` fields contain `"Woman: Question N. ...\nMan: ..."` raw labels; verified by `node` introspection | Rule B violation in hub data; future generation risk; "Question N." is spoken in audio | ✅ YES | Remove labels from text; use `dialogue_script[]` |
| DEF-009 | **HIGH** | SOURCE_OF_TRUTH_ERROR | `listening_p3_item*.mp3` generation | L3 item audio scripts exist ONLY inside `regenerate_w33_listening_audio.mjs`; `listening_hub.js` items have no `audio_text` field | Cannot regenerate consistent audio from hub data alone; decoupled source of truth | ✅ YES | Add `audio_text` field to each item in `listening_hub.js` |
| DEF-010 | **HIGH** | SPEAKER_ERROR | `listening_p1_full.mp3` | Single voice (Journey-F) for 2-character dialogue (Teacher + Mia); confirmed by generation script: `await tts(l1Cleaned, VOICE_F, 0.85)` | Cambridge L1 requires distinct speakers; audio is single-voice monologue | Conditional | Convert to `dialogue_script[]`, regenerate with two voices |
| DEF-011 | **HIGH** | SPEAKER_ERROR | `listening_p4_*.mp3` | ASR confirms single voice. Generation script: `{ f: 'p4_q1.mp3', v: VOICE_M, t: ...}` — single `v:` parameter | Cambridge L4 requires 2-speaker conversation; current is single narrator | Conditional | Convert to `dialogue_script[]` with question (woman) + answer (man) |
| DEF-012 | **MEDIUM** | STALE_AUDIO | `dictation_2.mp3` | Source: "A boy ran fast"; ASR: "A boy running fast" — different grammatical form | Student writing "running" would be marked wrong vs source answer "ran" | Conditional | Regenerate from current source |
| DEF-013 | **MEDIUM** | MINOR_VARIANCE | `dictation_1.mp3` | Source: "down the corridor"; ASR: "down the school corridor" — extra "school" | Minor extra word; dictation student may add "school" which is not in answer key | LOW | Regenerate from current source |
| DEF-014 | **MEDIUM** | SPOKEN_METADATA | `listening_p4_q1–5.mp3` | ASR confirms: "Question 1.", "Question 2." etc. spoken aloud | Rule I violation; not a Cambridge mechanic for individual question files | LOW | Remove "Question N." prefix from audio_script text |
| DEF-015 | **LOW** | ASR_ARTIFACT (unverified) | `listening_p5_inst4.mp3` | Whisper: "Notis Board"; source: "notice board" | Possibly Whisper mishear; possibly TTS pronunciation defect | No | HUMAN EAR REVIEW REQUIRED |
| DEF-016 | **LOW** | ASR_ARTIFACT | `listening_p1_full.mp3` | "drawing the tiles" vs "drying the tiles" | High-confidence Whisper mishear. Audio content not defective. | No | No action needed |
| DEF-017 | **LOW** | ASR_ARTIFACT | `listening_p5_full.mp3` | "Jake's friends" vs "Jake's friend" | High-confidence Whisper mishear. | No | No action needed |
| DEF-018 | **INFO** | STRUCTURAL_REDUNDANCY | `explore.mp3` vs `clil_friction.mp3` | Previously reported as 98% identical. NOW RECLASSIFIED: they serve DIFFERENT content. `explore.mp3` narrates global safety; `clil_friction.mp3` narrates friction science. | Not identical — different content from different source files. | No | No action needed (after DEF-007 fixed) |
| DEF-019 | **INFO** | RUNTIME_ROLE_CLARIFICATION | `listening_p3_full.mp3` | VisualMatchingAH.jsx line 119: `customData?.audio_url || /audio/week33/listening_p3_full.mp3` — it IS the primary audio source for L3 full passage | Not redundant — it IS used as the primary playback audio. Individual `item*.mp3` files serve item-level playback. | No | No action; document dual-audio architecture |

---

## 7. Orphan/Stale Audio Register

| Filename | Status | Content | Source Match | Safe to Retain | Safe to Activate | Recommendation |
|----------|--------|---------|-------------|---------------|-----------------|----------------|
| `listening_p1_target1.mp3` | ORPHANED + INCORRECTLY NAMED | "Tom is the boy in the blue shirt..." | ❌ Jake↔Tom swapped | ✅ Yes | ❌ UNSAFE | Retain with documentation. Regenerate before any per-target audio activation. |
| `listening_p1_target2.mp3` | ORPHANED + INCORRECTLY NAMED | "Jake is the boy wearing a green shirt..." | ❌ Tom↔Jake swapped | ✅ Yes | ❌ UNSAFE | Same. |
| `listening_p1_target3.mp3` | ORPHANED + INCORRECTLY NAMED | "Nurse Clara is the kind school nurse..." | ❌ Should be Nurse Sarah | ✅ Yes | ❌ UNSAFE | Same. |
| `listening_p1_target4.mp3` | ORPHANED + INCORRECTLY NAMED | "Mr. Davis is the tall headmaster..." | ❌ Should be Headmaster Brown | ✅ Yes | ❌ UNSAFE | Same. |
| `listening_p1_target5.mp3` | ORPHANED + INCORRECTLY NAMED + WRONG GENDER | "Emma is the helpful girl..." | ❌ Should be Cleaner Bob (male) | ✅ Yes | ❌ UNSAFE | Same. |
| `read_stem.mp3` | STALE — wrong version | "Nurse Clara arrived..." + "Tom was running..." | ❌ Current source: anonymous "the nurse", "a boy" | Active | ❌ UNSAFE | Regenerate from current `read.js text_en` |
| `dictation_2.mp3` | STALE — grammar mismatch | "A boy running fast slipped..." | ❌ Source: "A boy ran fast..." | Active | ❌ UNSAFE for dictation | Regenerate |
| `dictation_3.mp3` | STALE — completely wrong sentence | "Jake called the school nurse right away." | ❌ Source: "Jake stopped immediately to help his classmate." | Active | ❌ UNSAFE | Regenerate |
| `dictation_4.mp3` | STALE — different sentence | "The nurse applied a clean bandage and a cold pack." | ❌ Source: "The school nurse arrived quickly with a bandage." | Active | ❌ UNSAFE | Regenerate |
| `dictation_5.mp3` | STALE — different ending | "...praised Jake for safety." | ❌ Source: "...followed safety rules." | Active | ❌ UNSAFE | Regenerate |
| `explore.mp3` | STALE vs THEME — wrong content era | Global school safety, not friction | Source matches current `explore.js`, BUT explore.js content is thematically inconsistent with week | Active | ⚠️ Used, but pedagogically wrong | Fix `explore.js` content, then regenerate |

---

## 8. Architecture Audit

### Source-of-Truth Design

| Component | Status | Assessment |
|-----------|--------|-----------|
| L2 `dialogue_script[]` | ✅ GOOD | Each turn has `{speaker, text}`. Speaker is metadata. Hub data is source. |
| L5 `instructions[]` | ✅ ADEQUATE | `audio_text` field used for TTS. Could improve with more structured fields. |
| L4 `audio_script` (string) | ❌ BAD | Contains raw `"Woman: Question N. ...\nMan: ..."` — embedded labels, spoken metadata in text. |
| L1 `passage_audio_script` (string) | ⚠️ WEAK | Speaker labels present (`Teacher:`, `Mia:`) in string; generation script strips by regex. Fragile. |
| L3 item audio scripts | ❌ BAD | Do not exist in hub data. Hard-coded inside generation script only. |
| Dictation texts | ❌ STALE | Hub data exists but audio was generated from previous version. |
| explore.js content_en | ❌ CONTENT MISMATCH | Text in explore.js does not match the week's friction/corridor narrative. |

### Speaker Metadata Architecture

| Rule | Status | Evidence |
|------|--------|---------|
| Rule B in L2 | ✅ ENFORCED | `dialogue_script[]` with speaker field. `validateDialogueScript()` checks labels. |
| Rule B in L4 | ❌ VIOLATED | `audio_script` contains `"Woman:"` / `"Man:"` in text fields. |
| Rule B in L1 | ⚠️ FRAGILE | Labels stripped by regex in `tts()`. Works but relies on regex pattern list. |
| Rule C in L2 | ✅ ENFORCED | Two voices confirmed by ASR. |
| Rule C in L3 | ✅ ENFORCED | Two voices confirmed — generation script uses `generateDialogueAudio(item.turns)`. |
| Rule C in L1 | ❌ VIOLATED | Single voice for multi-character dialogue. |
| Rule C in L4 | ❌ VIOLATED | Single voice per question. |

### TTS Generation Architecture

- **L2**: GOLD STANDARD pattern — `dialogue_script[]` + `generateDialogueAudio()` + `validateDialogueScript()`
- **L5**: ADEQUATE — individual instruction files + full concatenated file
- **L3**: PARTIALLY CORRECT — uses `generateDialogueAudio()` correctly but source scripts not in hub data
- **L1**: FRAGILE — string with regex label stripping; not structured
- **L4**: BROKEN — labels in source text, single voice, "Question N." spoken

### Runtime Reference Architecture

- L2: `NotepadNoteCompleter.jsx` → `listening_p2_full.mp3` ✅
- L3: `VisualMatchingAH.jsx` → `listening_p3_full.mp3` (primary) + `item*.mp3` (per-item) ✅
- L4: `MultipleChoice3Pic.jsx` → `listening_p4_full.mp3` + `q*.mp3` ✅
- L5: `SVGColorAndWrite.jsx` → `listening_p5_full.mp3` + `inst*.mp3` ✅
- L1: `SVGLineMatcher.jsx` → `listening_p1_full.mp3` ✅; `target*.mp3` NOT referenced ✅

### Public/dist Synchronization

- **Gate 14 PASS**: All 45 MP3 files byte-identical between public/ and dist/
- Architecture risk: Vite does not auto-sync; manual copy required after each generation run

---

## 9. Permanent Audio Generation Doctrine (Rules A–O — Final Authoritative)

### RULE A — SOURCE OF TRUTH
Every spoken word in assessed audio must trace to a field in authoritative hub data.
Generation scripts may transform hub data. They must NOT invent assessment content.

**Required for each task:**
```js
// L2 — Good:
dialogue_script: [{ speaker: "woman", text: "..." }]

// L3 — Required fix:
items: [{ id: 1, name: "School Stairs", target_letter: "A",
          audio_text: "What are the steps inside the school... School stairs. Write the letter.",
          audio_url: "/audio/weekNN/listening_p3_item1.mp3" }]

// L5 — Good:
instructions: [{ id: "inst_1", action: "colour", item: "Backpack",
                 audio_text: "Colour Jake's backpack blue.", audio_url: "..." }]
```

### RULE B — SPEAKER IDENTITY IS METADATA
```js
// CORRECT:
{ speaker: "woman", text: "Where is the first-aid room?" }

// FORBIDDEN:
{ text: "Woman: Where is the first-aid room?" }
```
The `tts()` safety guard must enforce this via regex rejection.

### RULE C — MULTI-SPEAKER REQUIRES SEPARATE TTS CALLS
```
man/boy  → en-US-Neural2-D
woman/girl → en-US-Journey-F
```
`generateDialogueAudio(turns)` must be called for all multi-speaker tasks.
`validateDialogueScript()` must confirm ≥ 2 distinct voices for tasks with `required_speakers.length >= 2`.

### RULE D — ANSWER FIDELITY
Answer-bearing words must be semantically identical or phonetically equivalent.
- "2 minutes" → "two minutes" ✅ acceptable
- "Nurse Sarah" → "Nurse Clara" ❌ factual error
- "ran" → "running" ❌ grammar change that breaks dictation task
- "followed safety rules" → "praised Jake for safety" ❌ different meaning

Add `spoken_text` field when normalization risk exists.

### RULE E — CEFR A2 FLYERS LANGUAGE LEVEL
Listening exam audio: everyday A2 English, ≤15 words/sentence, 7–10 year old audience.
CLIL/narration audio: topic-specific terms acceptable in learning stations only.

### RULE F — EXAM MECHANIC FIDELITY
- L4: Answer distribution MUST span A, B, C. All-A = invalid. Block generation if all same.
- L3: Exactly 8 option cards (A–H). Exactly 5 scored items + 1 example.
- L5: Exactly 3 colour + 2 write instructions + 1 example.
- Mechanic check must run as Gate 15 before file acceptance.

### RULE G — EXAMPLES REQUIRED
Every Cambridge part needs one example. The example must demonstrate the mechanic and must NOT consume a scored target answer.

### RULE H — NO DUPLICATE PLAYS IN FILE
One clean recording per file. No doubled content from generation bug.

### RULE I — NO SPOKEN UI ELEMENTS
FORBIDDEN: "Question 1", "Man", "Woman", "Speaker 1", "Correct answer".
ALLOWED: Cambridge official exam instruction sentences.

### RULE J — NO ANSWER LEAKAGE
L4 distractors must require listening to identify. Pattern-guessing (all-A) = assessment failure.
Automated Gate 15 check: flag if any answer letter appears for all scored items.

### RULE K — NATURAL AUDIO QUALITY
```
Assessed content: speaking rate 0.85–0.90
Narrated content: speaking rate 0.90–1.00
Speaker switch pause: ≥ 200ms
```

### RULE L — ACRONYM / CAPITALIZATION
"CARE" → TTS receives "care". Never spell out uppercase unless explicitly encoded.

### RULE M — TTS NORMALIZATION TRACKING
Review all text fields before generation. Add `spoken_text` field for:
- digits ("14" → risk of "forty")
- ordinals, abbreviations
- proper nouns (Vietnamese names → phonetic normalization)

### RULE N — POST-PROCESSING INTEGRITY
Concatenation must: preserve turn order, insert ≥200ms silence on speaker changes, not clip words, not duplicate turns.

### RULE O — RUNTIME INTEGRITY
After generation: MD5 compare `public/audio/weekNN/` vs `dist/audio/weekNN/`.
If mismatch: copy explicitly. Vite does not auto-sync audio assets.

---

## 10. Permanent Validation Gates

| Gate | Check | Severity | Status W33 |
|------|-------|----------|-----------|
| **G1** FILE EXISTS | Every `audio_url` resolves in `public/` | HARD BLOCKER | ✅ PASS |
| **G2** SOURCE EXISTS | Hub data loads; required exports present | HARD BLOCKER | ✅ PASS |
| **G3** STRUCTURE VALID | `dialogue_script[]` ≥ 2 turns; all turns `{speaker, text}` | HARD BLOCKER | ❌ FAIL (L4 uses string) |
| **G4** REQUIRED SPEAKERS | All `required_speakers[]` present in `dialogue_script` | HARD BLOCKER | ❌ FAIL (L4) |
| **G5** NO LABEL IN TEXT | No `turn.text` matches `/\b(Man\|Woman\|Girl\|Boy)\s*:/` | HARD BLOCKER | ❌ FAIL (L4 audio_script) |
| **G6** GENERATION SUCCESS | TTS returns valid non-empty audio | WARNING | ✅ PASS |
| **G7** DURATION > 0 | All files have valid duration | WARNING | ✅ PASS |
| **G8** ASR AVAILABLE | Whisper transcript exists for all assessed files | WARNING | ✅ PASS |
| **G9** KEY CONTENT PRESENT | All answer strings appear in ASR | HARD BLOCKER | ❌ FAIL (dictation D3, D4, D5) |
| **G10** ANSWER KEY IN AUDIO | Each answer key value present in its file's ASR | HARD BLOCKER | ❌ FAIL (dictation D3, D4, D5) |
| **G11** NO ANSWER CHANGE | No semantic answer mutation | HARD BLOCKER | ❌ FAIL (read_stem "Nurse Clara", dictation stale) |
| **G12** NO SPOKEN METADATA | ASR does not contain "Question N." as utterance-initial | WARNING | ❌ FAIL (L4 Q1–Q5) |
| **G13** NO DUPLICATE TURNS | Duration in expected range; no doubled content | WARNING | ✅ PASS |
| **G14** PUBLIC/DIST MATCH | MD5(public/) == MD5(dist/) for all files | HARD BLOCKER | ✅ PASS |
| **G15** MECHANIC VALID | L2: 5 fields; L3: 8 cards+5 items; L4: 5Q + mixed A/B/C; L5: 3c+2w | HARD BLOCKER | ❌ FAIL (L4 all-A) |
| **G16** ALIGNMENT DECLARED | `cambridge_alignment` field in hub or blueprint | WARNING | ❌ NOT YET IMPLEMENTED |
| **G17** FINAL VERDICT | All hard gates pass; no CRITICAL open defects | HARD BLOCKER | ❌ FAIL |

**Hard Blockers (FAIL = block release):** G3, G4, G5, G9, G10, G11, G14, G15

---

## 11. Pre-Freeze Remediation List

### P0 — MUST FIX BEFORE FREEZE (Release Blockers)

| # | Action | File(s) | Reason |
|---|--------|---------|--------|
| P0-1 | Redesign L4 questions so answers span A, B, C across Q1–Q5 | `listening_hub.js` → `listening_p4.questions[]` | DEF-003 — all-A invalidates assessment (Gate 15) |
| P0-2 | Regenerate dictation D3, D4, D5 from current `skill_practice_hub.js` text | `dictation_3–5.mp3` | DEF-004/5/6 — stale audio, completely wrong sentences (Gate 9, 10) |
| P0-3 | Regenerate `read_stem.mp3` from current `read.js text_en` | `read_stem.mp3` | DEF-001 — stale "Nurse Clara" audio (Gate 11) |
| P0-4 | Remove `Woman:`/`Man:` labels from `listening_p4.questions[].audio_script` text fields; convert to `dialogue_script[]` | `listening_hub.js` | DEF-008 — Rule B violation in source data (Gate 3, 4, 5) |
| P0-5 | Add `audio_text` field to every `listening_p3.items[]` entry in `listening_hub.js` | `listening_hub.js` | DEF-009 — Rule A violation (Gate 3) |
| P0-6 | Rewrite `explore.js content_en` to narrate friction/corridor theme (not global school safety) | `explore.js` | DEF-007 — explore.mp3 narrates wrong thematic content; regenerate after fix |
| P0-7 | Regenerate `explore.mp3` after DEF-007 fix | `explore.mp3` | Audio must match fixed explore.js |

### P1 — SHOULD FIX BEFORE FREEZE (Cambridge Compliance)

| # | Action | File(s) | Reason |
|---|--------|---------|--------|
| P1-1 | Convert L1 `passage_audio_script` to `dialogue_script[]`; regenerate with two voices (Teacher=VOICE_F, Mia=VOICE_F different voice or VOICE_M) | `listening_hub.js`, `listening_p1_full.mp3` | DEF-010 — single voice for multi-character; ALIGNED not EXACT |
| P1-2 | Regenerate `dictation_1.mp3` and `dictation_2.mp3` from current source | `dictation_1–2.mp3` | DEF-012/013 — minor drift and grammar mismatch |
| P1-3 | Remove "Question N." prefix from L4 audio_script text; regenerate after P0-4 | TBD after P0-4 | DEF-014 — Rule I violation |

### P2 — FUTURE HARDENING (Architecture Safety)

| # | Action | Reason |
|---|--------|--------|
| P2-1 | Convert L4 to proper `dialogue_script[]` with 2-speaker interview format | DEF-011 — Cambridge L4 should be conversational |
| P2-2 | Implement `scripts/validate_audio_manifest.mjs <weekNum>` (Gates 1, 14) | Automated MD5 + file existence check after every generation |
| P2-3 | Implement `scripts/validate_dialogue_structure.mjs <weekNum>` (Gates 2–5) | Hub data structure validation before TTS |
| P2-4 | Implement `scripts/gate15_mechanic_check.mjs <weekNum>` (Gate 15) | L4 answer distribution check; reject all-same-answer |
| P2-5 | Implement `scripts/asr_answer_verification.mjs <weekNum>` (Gates 8–13) | Post-generation Whisper check + answer key cross-reference |
| P2-6 | Add `cambridge_alignment` field to `listening_hub.js` per task (Gate 16) | Self-declaring compliance level |
| P2-7 | Implement `ORPHANED_AUDIO_MANIFEST.md` as machine-readable JSON | Enable automated orphan detection |

---

## 12. Golden Standard Decision

### "Can W33 be frozen as the Golden Standard today?"

## ❌ NO

**W33 cannot be frozen as the Golden Standard in its current state.**

Exact reasons preventing freeze:

1. **Dictation D3 audio contains a completely different sentence than the source.** A student who listens to D3 and writes what they hear will write "Jake called the school nurse right away" — but the answer key says "Jake stopped immediately to help his classmate." This is a live assessment defect scoring students incorrectly.

2. **L4 has all 5 answers as "A".** A student who never listens scores 5/5. This makes L4 meaningless as an assessment instrument.

3. **read_stem.mp3 is stale.** It was generated from a previous version of `read.js` that used "Nurse Clara", "Tom slipped", and named characters. Current `read.js` uses anonymous "the nurse" and "a boy". Audio diverged from source when source was updated without regenerating audio.

4. **explore.mp3 narrates global school safety rules,** while the week's central narrative is Jake's friction corridor accident. The CLIL explore station disconnects from the week theme.

5. **L4 source data contains raw speaker labels in text fields.** This is a latent architecture bug that will manifest as spoken "Woman:" in audio if the generation script ever stops stripping them.

6. **L3 audio scripts do not exist in hub data.** Regenerating L3 requires diving into the generation script — this is unsafe for the production pipeline template.

**What W33 does correctly (template-worthy):**

- ✅ L2 architecture (dialogue_script[] pattern) is the gold standard; replicate for future weeks
- ✅ L5 architecture (instructions[] pattern) is adequate
- ✅ Cambridge L2 and L5 audio are exact Flyers mechanics
- ✅ Exam intro audio (L1–L5, S1–S4) are correct
- ✅ `validateDialogueScript()` function is the right enforcement pattern
- ✅ MD5 public/dist sync is working
- ✅ Two-voice generation for L2 and L3 is correctly implemented
- ✅ TTS safety guard (`tts()` label rejection) is the right pattern

---

## 13. Future Weekly Production Contract

Every week from W34 forward MUST satisfy this contract before delivery:

```
STAGE 1 — DATA
  □ All hub files present: listening_hub.js, reading_hub.js, speaking_hub.js, explore.js, skill_practice_hub.js
  □ listening_p2: dialogue_script[] format
  □ listening_p3.items[]: audio_text field present
  □ listening_p4.questions[]: dialogue_script[] format, NO "Woman:"/"Man:" in text, NO "Question N." prefix
  □ listening_p5.instructions[]: audio_text field present
  □ L4 answers: at least 2 distinct answer letters in Q1–Q5
  □ Dictation texts: current version reviewed and confirmed as answer keys
  □ explore.js content_en: matches week theme
  □ read.js text_en: confirmed as base for read_stem.mp3 generation

STAGE 2 — VALIDATION (pre-generation)
  □ Gate 2: Hub data loads without error
  □ Gate 3: All dialogue_script[] fields structurally valid
  □ Gate 4: Required speakers present
  □ Gate 5: No label in text
  □ Gate 15 pre-check: L4 answer distribution (reject if all-same)

STAGE 3 — TTS GENERATION
  □ L2: generateDialogueAudio(dialogue_script, required_speakers=['man','woman'])
  □ L3: generateDialogueAudio per item from hub audio_text (2-voice per item)
  □ L4: generateDialogueAudio per question (woman=question, man=answer)
  □ L5: generateSingleMP3 per instruction from audio_text
  □ read_stem.mp3: generateSingleMP3 from read.js text_en
  □ explore.mp3: generateSingleMP3 from explore.js content_en
  □ dictation 1–5: generateSingleMP3 from skill_practice_hub.js texts
  □ Verify all files non-empty, duration > 0

STAGE 4 — ASR VERIFICATION
  □ Run Whisper on all listening + content + dictation files
  □ Gate 9: All answer strings present in ASR
  □ Gate 10: Each answer key value present in its audio's transcript
  □ Gate 11: No semantic mutation vs source
  □ Gate 12: No "Question N." / "Man." / "Woman." spoken
  □ Gate 13: No duration anomaly (doubles)

STAGE 5 — MECHANIC VALIDATION
  □ Gate 15: L4 answer distribution confirmed ≥ 2 distinct letters
  □ Gate 15: L5 = 3 colour + 2 write verified
  □ Gate 15: L3 = 5 scored items + example + 8 option cards verified
  □ Gate 15: L2 = 5 answer fields + example verified

STAGE 6 — PUBLIC/DIST SYNC
  □ Gate 14: Copy all generated audio to dist/audio/weekNN/
  □ Gate 14: MD5 verify all files match

STAGE 7 — RELEASE GATE
  □ Gate 17: All Gates 1–15 PASS
  □ Gate 16: cambridge_alignment field declared for each task
  □ No CRITICAL or HIGH defects open
  □ Approved for production
```

---

*Final Forensic Audit complete. Audit only — no files modified.*
*All findings are independent verifications against current source files and audio content.*
