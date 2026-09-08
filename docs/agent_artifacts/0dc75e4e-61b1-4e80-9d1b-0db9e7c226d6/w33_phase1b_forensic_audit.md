# PHASE 1B — W33 ADVERSARIAL GOLDEN-CANDIDATE AUDIT

**Execution Mode:** PHASE 1B — AUDIT ONLY (NO CODE/DATA/ASSET MUTATION)
**Commit inspected:** `66c0d1f8` (verified against production)
**Date:** 2026-08-28

---

## A. AUDIT SCOPE

Sources inspected (read-only):
- `src/data/weeks/week_33/` (all 4 hubs, index.js)
- `src/hooks/useFlyersListeningPlayer.js`, `src/services/voiceService.js`
- `src/components/cambridge/CLILExplorer.jsx`, `SVGLineMatcher.jsx`, `VisualMatchingAH.jsx`, `NotepadNoteCompleter.jsx`, `MultipleChoice3Pic.jsx`, `SVGColorAndWrite.jsx`, `InformationExchangeP2.jsx`
- `src/modules/zones/` (all 5 Zone components)
- `src/config/zoneDataMapper.js`, `src/components/questmap/TaskScreen.jsx`
- `scripts/gate15_production_dom_assertions.mjs`, `gate16_content_quality.mjs`, `gate17_fidelity_doctrine.mjs`
- `docs/GATE15_SPEC_W33.json`
- Runtime Node.js data inspection (all 4 hubs loaded)
- Production: `https://app.bkbacademy.vn/week/33/task/*` (Playwright verified Phase 1)

---

## B. REPOSITORY ↔ PRODUCTION STATE

```
REPOSITORY:  commit 66c0d1f8f673d2db6626c9dbf28e739d68e5ab3a / main
PRODUCTION:  app.bkbacademy.vn/version.json → same hash, built 2026-08-28T06:52:53.923Z
MATCH:       YES — 100% identical
BUILD:       npm run build → exit 0 (10.04s, 0 errors)
```

**Phase 1 VERIFIED / PASS claim reconciliation:** The repo↔production hash match is confirmed via direct evidence (version.json check). This specific claim stands.

---

## C. COMPLETE W33 ARCHITECTURE MAP

```
Week 33 — "School Safety & Friction" (CEFR A2 Flyers)

Quest 1 — Story World (Day 1)
  Task 1: gear1_webtoon  → Scene Explorer      → StoryWorldZone Gear 1
  Task 2: gear2_karaoke  → Voice Shadow         → StoryWorldZone Gear 2
  Task 3: gear3_retell   → Story Retell         → StoryWorldZone Gear 3

Quest 2 — Knowledge Lab (Day 2)
  Task 4:  gear4_clil      → Fact Finder        → CLILExplorer
  Task 5:  science_lab     → Action Lab         → BattleArenaZone
  Task 6:  science_report  → Discovery Report   → CreatorStudioZone

Quest 3 — Battle Arena (Day 3)
  Task 7:  word_blitz     → Speed Match         → BattleArenaZone
  Task 8:  sentence_smash → Grammar Duel        → BattleArenaZone
  Task 9:  math_quest     → Math Quest          → BattleArenaZone

Quest 4 — Creator Studio (Day 4)
  Task 10: story_writer      → Story Writer     → CreatorStudioZone
  Task 11: broadcast_studio  → Video Challenge  → CreatorStudioZone
  Task 12: info_exchange     → Info Exchange    → InfoExchangeZone

Quest 5 — Boss Castle (Day 5)
  Task 13: boss_listening → Listening Shield    → BossBattleZone (L1–L5)
  Task 14: boss_reading   → R&W Shield          → BossBattleZone (R1–R6+W7)
  Task 15: weekly_review  → Speaking & Passport → BossBattleZone (S1–S4)
```

---

## D. TASK-BY-TASK AUDIT MATRIX

| Task | Data Source | Key Asset(s) | Status |
|------|-------------|--------------|--------|
| gear1_webtoon | reading_hub.story_scenes[5] via zoneDataMapper.storyWorld.storyScenes | webtoon_scene_1–5.png | NEEDS-VERIFICATION (Gate 15 bypassed by auth overlay) |
| gear2_karaoke | reading_hub.read_explore.story_scenes → atomicSentences | shadowing audio files | NEEDS-VERIFICATION |
| gear3_retell | reading_hub.read_explore.retell_questions | None | NEEDS-VERIFICATION |
| gear4_clil | reading_hub.clil_article (11 vocab_focus, 2 grammar_patterns, 8 glossary) | clil_friction.mp3 (ASR-verified) | VERIFIED (production confirmed) |
| science_lab | skill_practice_hub.science_lab (EXISTS, all keys present) | background_image (check needed) | NEEDS-VERIFICATION |
| science_report | writing_hub.science_report_config (EXISTS, purpose/data_card/levels/pills_L1–L3) | None | NEEDS-VERIFICATION |
| word_blitz | reading_hub.vocab Array[20] via zoneDataMapper.battleArena.flashArena | TTS | NEEDS-VERIFICATION |
| sentence_smash | skill_practice_hub.grammar_drills Array[5] | None | NEEDS-VERIFICATION |
| math_quest | skill_practice_hub.singapore_math Array[5] | barmodel_w33_adv_p1–5.svg (Gate 3 PASS) | NEEDS-VERIFICATION |
| story_writer | writing_hub.picture_story (EXISTS) | writing_panel_1–3.png | NEEDS-VERIFICATION |
| broadcast_studio | speaking_hub.talkshow_video.video_id = "corridor_safety_w33" | **MISSING transcript JSON** | DISCOVERED (W33-P1B-006) |
| info_exchange | speaking_hub.info_exchange_cards (table_a + table_b confirmed) | exam_intro_S2.mp3, info_exchange_q1–4.mp3 (ASR-verified) | VERIFIED (functional) |
| boss_listening | listening_hub.listening_p1–5 | listening_p1–5_full.mp3, flyers_replay/end p1–5.mp3 | VERIFIED (button + header confirmed on production) |
| boss_reading | reading_hub.rw_part1–6 (all present), writing_hub.picture_story | None | NEEDS-VERIFICATION |
| weekly_review | speaking_hub.find_differences + picture_story + personal_questions | w33_diff_scene_a/b.jpg, ps_1–4.png | NEEDS-VERIFICATION |

---

## E. AUDIO FORENSIC MATRIX

> CAVEAT: Whisper ASR = high confidence, not mathematically guaranteed. All "match" claims below are "HIGH CONFIDENCE."

| Asset | Script Source | ASR Result | Confidence | Issue |
|-------|---------------|------------|------------|-------|
| clil_friction.mp3 | clil_article.content_en | Word-for-word match | HIGH | None |
| listening_p1_full.mp3 | listening_p1.passage_audio_script | Near match | HIGH | "holding them up" (ASR) vs "holding the mop" (script) — see W33-P1B-003 |
| listening_p2_full.mp3 | listening_p2.dialogue_script | Field answers match (Room 4B, 2 mins, bandage, badge) | HIGH | None |
| listening_p3_full.mp3 | listening_p3.passage_audio_script | All 5 item dialogues match | HIGH | None |
| listening_p4_full.mp3 | listening_p4.questions.dialogue_script | Q1–Q5 match | HIGH | None |
| listening_p5_full.mp3 | listening_p5.audio_script | **CRITICAL TRIPLE MISMATCH** | LOW | See W33-P1B-001 |
| flyers_replay_pN.mp3 | "Now listen to Part N again." | Match (ASR: "now listen to part one again") | HIGH | Case/number format minor |
| flyers_end_pN.mp3 | "That is the end of Part N." | Match (ASR: "that is the end of part 1") | HIGH | None |
| exam_intro_S2.mp3 | speaking_hub info_exchange_cards.audio_url | Full model dialogue present | HIGH | Audio contains answered dialogue (not raw rubric intro) |
| info_exchange_q1–4.mp3 | table_b.fields[*].nova_question | Q1–Q4 questions verified | HIGH | None |

### E1. L5 Triple Mismatch (W33-P1B-001 detail)

```
SOURCE audio_script: "...look at the long handrail near the stairs. Colour the handrail red."
ASR of MP3:          "...look at the nursery room door at the end of the corridor. Colour it red."
DATA instructions[5]: { item: "School Handrail", text: "Color the handrail red", color: "red" }

RESULT: MP3 was generated from a DIFFERENT draft than the current audio_script.
        All three layers (script, MP3, data) disagree on the final coloring item.
```

### E2. L5 Example Mismatch (W33-P1B-002 detail)

```
audio_script example utterance: "Good. Colour the notebook yellow."
instructions[0]:                 { item: "Example Object", text: "Color the example brown", color: "brown" }

Audio says YELLOW NOTEBOOK; data says BROWN EXAMPLE OBJECT — different item AND color.
```

---

## F. FLYERS TWO-PLAY LOOP VERIFICATION

### Code Verification (Source: useFlyersListeningPlayer.js)

State machine: `idle → playing_1 → rubric_replay → pausing → playing_2 → rubric_closing → completed`

- Both plays use `targetAudioUrl` (captured at startTwoPlayLoop call) → SAME ASSET guaranteed ✓
- VoiceService.speak() returns Promise that resolves on `audio.onended` (line 1620–1623 of voiceService.js) → sequential await chain correct ✓
- Rapid-click guard: `if (isPlaying) { stop(); return; }` → no duplicate invocations ✓
- Auto-reset to `idle` after 4s on completion → re-play permitted, accidental 3rd play prevented ✓

### Per-Part Wiring

| Part | Component | audioUrl | Missing audio_url in data? | Code-verified | Browser-verified |
|------|-----------|----------|---------------------------|---------------|-----------------|
| L1 | SVGLineMatcher | /audio/week33/listening_p1_full.mp3 | No | YES | PARTIAL |
| L2 | NotepadNoteCompleter | /audio/week33/listening_p2_full.mp3 | No | YES | NO |
| L3 | VisualMatchingAH | /audio/week33/listening_p3_full.mp3 | No | YES | NO |
| L4 | MultipleChoice3Pic | /audio/week33/listening_p4_full.mp3 | No | YES | NO |
| L5 | SVGColorAndWrite | falls back to `/audio/week33/listening_p5_full.mp3` | **YES — no audio_url field** | YES (fallback) | NO |

---

## G. ASSESSMENT BOUNDARY AUDIT

- Quest 1–4: scaffold/attempt model → appropriate for learning stage ✓
- Quest 5: Cambridge strict mechanics (no hints, shield scoring) ✓
- Boundary maintained ✓

**Risk (non-blocking):** gear4_clil auto-completes on gear navigation (line 232 StoryWorldZone), not on Sentence Builder completion. Students can skip Sentence Builder and get quest credit.

---

## H. AUTOMATED GATE RESULTS

| Gate | Result | Root Cause Classification | Golden Blocker? |
|------|--------|--------------------------|-----------------|
| CEFR Guard | ✅ PASS | — | NO |
| Chunks Audit | ✅ PASS (W33 clean) | — | NO |
| Gate 3 Media | ✅ PASS | — | NO |
| Gate 15 DOM | ❌ FAIL (0/15) | VALIDATOR DEFECT: addInitScript sets localStorage but Supabase session not injected → app shows login/loading screen, not task content | YES (gate must pass before freeze) |
| Gate 16 Content | ❌ FAIL (3 errors) | STALE VALIDATOR: checks `sh.info_exchange_cards.examiner_questions` (legacy path) but W33 uses `table_b.fields[].audio_url` | YES |
| Gate 17 Fidelity | ❌ FAIL (INV-S2) | STALE VALIDATOR: checks `candidate_card.items` / `examiner_questions` but W33 uses `table_a.fields` / `table_b.fields` | YES |
| Build | ✅ PASS | — | NO |
| npm run audit:week | ❌ FAIL | Cascade from Gate 15+16+17 | YES |

**Important:** Gates 15, 16, 17 failures are caused by VALIDATOR DEFECTS, not W33 content defects. W33 data is correctly structured per its canonical schema. However, the gates must still pass before the Golden freeze is declared.

---

## I. DISCOVERED FINDINGS

### W33-P1B-001 — CRITICAL: L5 Audio/Script/Data Triple Mismatch

```
audio_script says: "handrail near the stairs" (red)
listening_p5_full.mp3 says (via ASR): "nursery room door" (red)
instructions[5]: { item: "School Handrail", color: "red" }

The MP3 was generated from a different script draft than current audio_script.
Students who follow the audio will color a door; the data evaluates a handrail.

STATUS: DISCOVERED
FIX OPTIONS:
  A) Regenerate MP3 from current audio_script (handrail). Requires image shows handrail.
  B) Update audio_script + instructions[5] to match MP3 ("nursery room door").
VERIFICATION: Re-run Whisper ASR on new MP3 + confirm all 3 layers align.
```

### W33-P1B-002 — MEDIUM: L5 Example Color/Item Mismatch

```
audio_script example: "Colour the notebook yellow"
instructions[0]: { text: "Color the example brown", color: "brown" }

Item AND color both wrong in instructions vs audio.
STATUS: DISCOVERED — fix in same pass as W33-P1B-001
```

### W33-P1B-003 — MEDIUM: L1 Maria/Mop ASR Discrepancy

```
ASR of L1 MP3: "She is holding them up to dry the wet floor."
listening_p1.passage_audio_script: "She is holding the mop to dry the wet floor."

May indicate MP3 generated from different draft OR Maria is holding warning signs.
STATUS: DISCOVERED — requires visual inspection of w33_listening_p1_scene.jpg
```

### W33-P1B-004 — HIGH: Gate 15 Complete Failure (Validator Defect)

```
Gate 15 → 0/15 PASS. All tasks blocked by Supabase auth check.
Playwright addInitScript injects localStorage keys but NOT Supabase session token.
Production app renders login/loading state, not task content.

Root cause: VALIDATOR DEFECT (not W33 content defect).
FIX: Inject mock Supabase session token OR add ?qa_bypass route flag in app.
VERIFICATION: Re-run gate15 → ≥13/15 PASS
STATUS: DISCOVERED — blocking
```

### W33-P1B-005 — HIGH: Gate 16 + Gate 17 INV-S2 Schema Mismatch (Validator Defect)

```
gate17 checks: s2.candidate_card?.items / s2.examiner_questions (3 items with audio_url)
gate16 checks: sh.info_exchange_cards?.examiner_questions (3 items with audio_url)

W33 uses: table_a.fields (4, all is_missing: true) + table_b.fields (4, each with audio_url)

InformationExchangeP2.jsx line 15 confirms table_a/table_b IS the canonical format.
W33 data is CORRECTLY structured. Validators are STALE.

FIX:
  gate17: update INV-S2 to accept table_a.fields[*].is_missing + table_b.fields[*].audio_url
  gate16: update speaking_hub check to read table_b.fields[*].audio_url instead of examiner_questions
VERIFICATION: npm run audit:week 33 → 4/4 gates pass
STATUS: DISCOVERED — blocking
```

### W33-P1B-006 — MEDIUM: broadcast_studio Missing Video Transcript

```
speaking_hub.talkshow_video.video_id = "corridor_safety_w33"
src/data/video_transcripts_by_id/sentences/corridor_safety_w33.json → DOES NOT EXIST

AGENTS.md states: "MUST have transcript JSON at sentences/<videoId>.json"

STATUS: DISCOVERED
FIX: Create transcript JSON OR confirm graceful fallback and document as ACCEPTED.
```

### W33-P1B-007 — LOW: L5 Missing audio_url Property in listening_hub.js

```
listening_p5 has no audio_url field (undefined).
SVGColorAndWrite.jsx falls back correctly to /audio/week33/listening_p5_full.mp3.
But schema is inconsistent vs L1–L4.

STATUS: DISCOVERED — non-blocking, schema gap only
FIX: Add audio_url: "/audio/week33/listening_p5_full.mp3" to listening_p5.
```

### W33-P1B-008 — LOW: rw_part2 Key Naming ("dialogue" vs "turns")

```
rw_part2.dialogue exists (length 5); rw_part2.turns does not exist.
gate17 uses: r2.turns || r2.dialogue — fallback handles it correctly.
SOP canonical key name is ambiguous.

STATUS: DISCOVERED — non-blocking
```

### W33-P1B-010 — LOW: Mia the Monitor Null Target_id in L1

```
listening_p1.names includes { text: "Mia the Monitor", target_id: null }
This is a Cambridge-style distractor (extra unmatched name).
SVGLineMatcher must handle null target_id without crashing.

STATUS: NEEDS-VERIFICATION (code path for null target_id in SVGLineMatcher.jsx not audited)
```

---

## J. SOP GAP CANDIDATES (for Phase 3 SOP document)

1. **Two-Play rubric audio naming**: `flyers_replay_pN.mp3` / `flyers_end_pN.mp3` → shared, not week-specific
2. **L5 audio_url**: All listening_pN objects MUST have explicit `audio_url` field
3. **audio_script = MP3 contract**: audio_script MUST be the EXACT script used to generate the MP3
4. **instructions vs audio_script contract**: Each instruction item/color/word MUST match audio_script utterance
5. **Canonical S2 schema**: `table_a.fields` + `table_b.fields` (NOT candidate_card/examiner_questions)
6. **Gate 15 auth**: Must inject Supabase mock session OR app must support ?qa_bypass flag
7. **broadcast_studio transcript**: video_id MUST have transcript JSON
8. **rw_part2 keys**: canonical is `dialogue` + `options` (document this)
9. **word_blitz data chain**: reading_hub.vocab → zoneDataMapper.battleArena.flashArena
10. **singapore_math data chain**: skill_practice_hub.singapore_math (NOT listening_hub)
11. **science_report_config location**: writing_hub.js (NOT listening_hub or stations)
12. **P5 example row**: instructions[0] MUST match audio_script example utterance

---

## K. GAMIFICATION SCOPE PROTECTION (FROZEN INVARIANTS)

The following MUST NOT be modified during Gamification Phase:

1. Quest schedule: 15 tasks / 5 quests / 5 days in questSchedule.js
2. Task IDs: all 15 IDs (gear1_webtoon, word_blitz, etc.)
3. Cambridge Two-Play 6-state machine in useFlyersListeningPlayer.js
4. Cambridge Rubric audio wording: "Now listen to Part N again." / "That is the end of Part N."
5. L1 character names (Jake/Tom/Nurse Sarah/Headmaster Brown/Maria/David) + pin coordinates
6. L3 location cards (A–H assignment)
7. CLIL vocab_focus (11), grammar_patterns (2), glossary (8)
8. P4 answer keys: Q1=B, Q2=A, Q3=C, Q4=B, Q5=A
9. info_exchange_cards table_a/table_b schema + is_missing flags + audio_url per table_b field
10. HoverWord dictionary popup behavior for glossary/vocab chunks

---

## L. FINAL VERDICT

### ❌ CONDITIONAL — W33 NOT SAFE TO FREEZE YET

**4 blocking issues require resolution before Golden freeze:**

| ID | Issue | Fix |
|----|-------|-----|
| W33-P1B-001 | L5 audio/script/data triple mismatch (handrail vs nursery door) | Regenerate MP3 or update script+data |
| W33-P1B-002 | L5 example mismatch (yellow notebook vs brown example) | Align instructions[0] with audio |
| W33-P1B-004 | Gate 15 fails 0/15 (Supabase auth not bypassed) | Fix Gate 15 auth bypass |
| W33-P1B-005 | Gates 16+17 fail INV-S2 (stale validator schema) | Update validators for table_a/table_b |

**5 non-blocking issues — address or accept with documentation:**

| ID | Issue |
|----|-------|
| W33-P1B-003 | L1 Maria/mop ASR discrepancy — needs image inspection |
| W33-P1B-006 | broadcast_studio missing transcript JSON |
| W33-P1B-007 | L5 missing audio_url property |
| W33-P1B-008 | rw_part2 key naming inconsistency |
| W33-P1B-010 | Mia the Monitor null target_id — needs SVGLineMatcher code audit |

**CLOSURE PROTOCOL — findings cannot be marked CLOSED until:**
- W33-P1B-001/002: (a) fix applied, (b) new MP3 generated, (c) Whisper ASR confirms alignment of all 3 layers
- W33-P1B-004: (a) Gate 15 fix applied, (b) gate re-run shows ≥13/15 PASS
- W33-P1B-005: (a) validator fixes applied, (b) `npm run audit:week 33` → 4/4 gates pass

---
*END OF PHASE 1B FORENSIC AUDIT REPORT*
