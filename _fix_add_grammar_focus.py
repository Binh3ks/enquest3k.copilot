"""
Add GRAMMAR FOCUS section to W28-31 lesson plans.
Inserted after PART 1 (Reading Input), before PART 2 (Vocabulary Building).
Includes:
  - Student-facing: rule explanation, pattern table, story examples, common errors, quick practice
  - Teacher notes inline (marked 👨‍🏫)
Also adds grammar_notes to W28 teacher_contents (W29-31 already have it).
"""

import json, copy

# ─────────────────────────────────────────────────────────────────────────────
# GRAMMAR FOCUS CONTENT — student-facing worksheet sections
# ─────────────────────────────────────────────────────────────────────────────

GRAMMAR_FOCUS = {

# ═══════════════════════════════════════════════════════════════════════════
# WEEK 28 — Past Simple: Irregular Verbs (ran, slept, won + rode, took, woke)
# ═══════════════════════════════════════════════════════════════════════════
28: [
  {  # Session 1 — Introduction
    "title": "GRAMMAR FOCUS — Past Simple: Irregular Verbs (Introduction)",
    "content": [
      "📌 RULE: Most verbs add -ed in the past (walk → walked, play → played).",
      "   But IRREGULAR verbs change shape completely — no -ed rule!",
      "┌──────────────────────────────────────────────────────────────────┐",
      "│  PRESENT  →  PAST        EXAMPLE SENTENCE                        │",
      "│  run      →  ran         The hare RAN very fast.                 │",
      "│  win      →  won         The tortoise WON the race.              │",
      "│  sleep    →  slept       The hare SLEPT under the tree.          │",
      "│  lose     →  lost        The hare LOST the race.                 │",
      "└──────────────────────────────────────────────────────────────────┘",
      "📖 Find these verbs in today's reading passage — underline them!",
      "⚠️  Common Mistakes — Spot and Fix:",
      "   ✗ 'The hare runned fast.'     →  ✅ 'The hare __________ fast.'",
      "   ✗ 'The tortoise winned.'      →  ✅ 'The tortoise __________.'",
      "   ✗ 'He sleeped under the tree.'→  ✅ 'He __________ under the tree.'",
      "🖊️  Quick Practice — Write the correct PAST TENSE form:",
      "   1. run   →  __________   |   2. win   →  __________",
      "   3. sleep →  __________   |   4. lose  →  __________",
      "   5. The hare __________ (run) very fast but still __________ (lose).",
      "   6. The tortoise __________ (win) because he was patient.",
      "👨‍🏫 Teacher Note: Do NOT ask students to memorise a list. Point to each verb",
      "   in the story text. Drill orally first: 'run → ?' before writing.",
      "   Key teaching moment: contrast 'walked (regular)' vs 'ran (irregular)'."
    ]
  },
  {  # Session 2 — Expansion
    "title": "GRAMMAR FOCUS — Past Simple: Irregular Verbs (Expansion — rode, took, woke)",
    "content": [
      "📌 REVIEW + NEW: More irregular verbs appear in today's story!",
      "┌──────────────────────────────────────────────────────────────────┐",
      "│  REVIEW:   run→ran   win→won   sleep→slept   lose→lost          │",
      "│  NEW:      ride→rode  |  take→took  |  wake→woke  |  go→went    │",
      "└──────────────────────────────────────────────────────────────────┘",
      "📖 From today's story (Detective Luna's Notes):",
      "   • Luna RODE her bicycle to the race.    (NOT: rided ✗)",
      "   • The hare TOOK a shortcut.             (NOT: taked ✗)",
      "   • The hare WOKE UP and ran.             (NOT: waked ✗)",
      "⚠️  Common Mistakes — Spot and Fix:",
      "   ✗ 'She rided her bike.'   →  ✅ 'She __________ her bike.'",
      "   ✗ 'He taked the bus.'     →  ✅ 'He __________ the bus.'",
      "   ✗ 'He waked up late.'     →  ✅ 'He __________ up late.'",
      "🖊️  Quick Practice — Write the correct PAST TENSE form:",
      "   1. ride →  __________   |   2. take →  __________   |   3. wake →  __________",
      "   4. She __________ (ride) her bicycle to the forest.",
      "   5. He __________ (take) the bus because he was tired.",
      "   6. He __________ (wake) up very late and __________ (run) to the race.",
      "👨‍🏫 Teacher Note: Focus on oral drilling before writing.",
      "   Quick chain drill: 'ride → ?' → 'rode!'  'take → ?' → 'took!'",
      "   Note for students: 'taked' is the most common error this week — watch for it."
    ]
  },
  {  # Session 3 — Mastery
    "title": "GRAMMAR FOCUS — Past Simple: Irregular Verbs (Mastery Review)",
    "content": [
      "📌 MASTERY: All irregular verbs from this week — can you produce them all?",
      "┌─────────────────────────────────────────────────────────────────────────┐",
      "│  run→ran   win→won   sleep→slept   lose→lost   ride→rode   take→took   │",
      "│  wake→woke   go→went   come→came   say→said                            │",
      "└─────────────────────────────────────────────────────────────────────────┘",
      "📌 NEGATIVE FORM: subject + did NOT + BASE VERB (NOT past form!)",
      "   ✅ 'The hare did not win.'         (NOT: 'did not won' ✗)",
      "   ✅ 'She did not take the bus.'     (NOT: 'did not took' ✗)",
      "   ✅ 'He did not run.'               (NOT: 'did not ran' ✗)",
      "🖊️  Error Correction Practice — Rewrite correctly:",
      "   1. 'The hare runned fast.'                      → _________________________",
      "   2. 'The tortoise did not went home.'             → _________________________",
      "   3. 'She rided her bike and taked the shortcut.'  → _________________________",
      "   4. 'He waked up and losted the race.'            → _________________________",
      "🖊️  Production Challenge — Write 2 sentences using any irregular verb from the box above:",
      "   1. ______________________________________________________________________",
      "   2. ______________________________________________________________________",
      "👨‍🏫 Teacher Note: Run the Trophy Ceremony chain drill (see Teacher Contents tab).",
      "   Target: students produce all past tense forms without prompting.",
      "   Common final error: negative with past form ('did not ran') — drill this explicitly."
    ]
  }
],

# ═══════════════════════════════════════════════════════════════════════════
# WEEK 29 — Past Simple: Movement Verbs (go→went, come→came, run→ran, fly→flew)
# ═══════════════════════════════════════════════════════════════════════════
29: [
  {  # Session 1 — Introduction
    "title": "GRAMMAR FOCUS — Past Simple: Movement Verbs (go→went, come→came, run→ran, fly→flew)",
    "content": [
      "📌 RULE: These 4 movement verbs are ALL irregular — they change completely in past tense!",
      "┌──────────────────────────────────────────────────────────────────┐",
      "│  PRESENT  →  PAST        EXAMPLE SENTENCE                        │",
      "│  go       →  went        Max WENT to the beach.                  │",
      "│  come     →  came        His friends CAME to say goodbye.        │",
      "│  run      →  ran         The rabbit RAN out of the bushes.       │",
      "│  fly      →  flew        They FLEW on a big airplane.            │",
      "└──────────────────────────────────────────────────────────────────┘",
      "📖 Find these verbs in today's reading passage — underline them!",
      "⚠️  Common Mistakes — Spot and Fix:",
      "   ✗ 'I goed to school.'       →  ✅ 'I __________ to school.'",
      "   ✗ 'The bird flyed away.'    →  ✅ 'The bird __________ away.'",
      "   ✗ 'She comed to my house.'  →  ✅ 'She __________ to my house.'",
      "🖊️  Quick Practice — Write the correct PAST TENSE form:",
      "   1. go  →  __________   |   2. fly →  __________",
      "   3. come→  __________   |   4. run →  __________",
      "   5. Yesterday, I __________ (go) to the park with my family.",
      "   6. The big airplane __________ (fly) high in the sky.",
      "   7. My friend __________ (come) to my house and we __________ (run) outside.",
      "👨‍🏫 Teacher Note: Use mime — act out 'go' (walking away), point to self in past,",
      "   elicit 'went'. Repeat for each verb. Establish physical memory before writing.",
      "   Emphasise: 'goed', 'flyed', 'comed' are the 3 most common errors."
    ]
  },
  {  # Session 2 — Negative + Sequence
    "title": "GRAMMAR FOCUS — Past Simple: Negative Form + Sequence Words",
    "content": [
      "📌 REVIEW: went / came / ran / flew — same 4 verbs, new story context.",
      "📌 NEW — NEGATIVE PAST: subject + did NOT + BASE VERB",
      "┌──────────────────────────────────────────────────────────────────┐",
      "│  AFFIRMATIVE         NEGATIVE                                     │",
      "│  She went.      →    She did not go.   / She didn't go.          │",
      "│  They flew.     →    They did not fly. / They didn't fly.        │",
      "│  He ran.        →    He did not run.   / He didn't run.          │",
      "└──────────────────────────────────────────────────────────────────┘",
      "📖 From today's story: 'They didn't fly on an airplane. They went in a car.'",
      "⚠️  Common Mistakes — Negative Form:",
      "   ✗ 'She didn't went home.'   →  ✅ 'She didn't __________ home.'",
      "   ✗ 'I didn't flew.'          →  ✅ 'I didn't __________.'",
      "🖊️  Sentence Transformation Practice:",
      "   Change to NEGATIVE (use didn't + base verb):",
      "   1. 'She went to the mountain.'     → 'She didn't ____________________.'",
      "   2. 'The eagle flew over my head.'  → 'The eagle didn't ________________.'",
      "   3. 'We ran up the hill.'           → 'We didn't ______________________.'",
      "📌 SEQUENCE WORDS — use with past tense:",
      "   First, I went...  Then, she ran...  Finally, they flew...",
      "   Write 1 sentence using a sequence word: ___________________________________",
      "👨‍🏫 Teacher Note: Drill negative form orally before writing.",
      "   'She went → she DIDN'T...' (pause) → elicit 'go' (base form, not 'went').",
      "   'didn't went' is the single most common error in W29 — address it directly."
    ]
  },
  {  # Session 3 — Mastery
    "title": "GRAMMAR FOCUS — Past Simple: Movement Verbs (Mastery + Sequencing)",
    "content": [
      "📌 MASTERY: All 4 movement verbs + negative + sequence words.",
      "┌──────────────────────────────────────────────────────────────────┐",
      "│  go→went   come→came   run→ran   fly→flew                        │",
      "│  NEGATIVE: didn't + BASE VERB (go / come / run / fly)            │",
      "└──────────────────────────────────────────────────────────────────┘",
      "📌 QUESTION FORM: Did + subject + BASE VERB + ?",
      "   ✅ 'Did Max go to the beach?'   → 'Yes, he did.' / 'No, he didn't.'",
      "   ✅ 'Did the bird fly away?'     → 'Yes, it did.' / 'No, it didn't.'",
      "🖊️  Complete the mini-story using the correct past tense form:",
      "   Last weekend, Tom __________ (go) to the green forest.",
      "   First, a small rabbit __________ (run) out of the bushes.",
      "   Then, a big bird __________ (fly) over the trees.",
      "   Finally, Tom's friend __________ (come) to find him.",
      "   Tom __________ (not go) home until it was dark.",
      "🖊️  Production Challenge — Write 3 sentences using FIRST / THEN / FINALLY:",
      "   First,   _______________________________________________________________",
      "   Then,    _______________________________________________________________",
      "   Finally, _______________________________________________________________",
      "👨‍🏫 Teacher Note: Final check — students should produce all 4 verb forms",
      "   independently. Question form is bonus — introduce but don't require mastery yet.",
      "   Target error: 'didn't went/came/ran/flew' — run a quick correction drill."
    ]
  }
],

# ═══════════════════════════════════════════════════════════════════════════
# WEEK 30 — Past Simple: Consumption Verbs (eat→ate, drink→drank, buy→bought, give→gave)
# ═══════════════════════════════════════════════════════════════════════════
30: [
  {  # Session 1 — Introduction
    "title": "GRAMMAR FOCUS — Past Simple: Consumption & Giving Verbs (ate, drank, bought, gave)",
    "content": [
      "📌 RULE: This week introduces 4 irregular verbs for eating, drinking, buying and giving.",
      "┌──────────────────────────────────────────────────────────────────┐",
      "│  PRESENT  →  PAST        EXAMPLE SENTENCE                        │",
      "│  eat      →  ate         Max ATE a big sandwich.                 │",
      "│  drink    →  drank       Luna DRANK cold juice.                  │",
      "│  have     →  had         They HAD a great picnic.                │",
      "│  buy      →  bought      She BOUGHT fresh apples.                │",
      "│  give     →  gave        He GAVE her a bottle of juice.          │",
      "└──────────────────────────────────────────────────────────────────┘",
      "📖 Find these verbs in today's reading passage — underline them!",
      "⚠️  Common Mistakes — Spot and Fix:",
      "   ✗ 'I eated lunch.'          →  ✅ 'I __________ lunch.'",
      "   ✗ 'She drinked juice.'      →  ✅ 'She __________ juice.'",
      "   ✗ 'He buyed apples.'        →  ✅ 'He __________ apples.'",
      "   ✗ 'She gived me a sandwich.'→  ✅ 'She __________ me a sandwich.'",
      "🖊️  Quick Practice — Write the correct PAST TENSE form:",
      "   1. eat   →  __________   |   2. drink →  __________",
      "   3. buy   →  __________   |   4. give  →  __________   |   5. have → __________",
      "   6. I __________ (eat) a big sandwich at the picnic.",
      "   7. She __________ (buy) fresh fruit and __________ (give) some to Max.",
      "   8. We __________ (drink) cold juice and __________ (have) a wonderful time.",
      "👨‍🏫 Teacher Note: Students often know 'ate' from previous stories — use it as",
      "   the anchor. 'bought' and 'gave' are NEW this week — prioritise these in drills.",
      "   Memory trick for bought: 'buy' sounds like 'by' → past is 'bought' (rhymes with 'caught')."
    ]
  },
  {  # Session 2 — Negative + buy/give focus
    "title": "GRAMMAR FOCUS — Past Simple: Negative Form + buy→bought, give→gave Focus",
    "content": [
      "📌 REVIEW: ate / drank / had / bought / gave — same 5 verbs, new story context.",
      "📌 NEW — NEGATIVE PAST: subject + did NOT + BASE VERB",
      "┌──────────────────────────────────────────────────────────────────┐",
      "│  AFFIRMATIVE          NEGATIVE                                    │",
      "│  She ate.       →     She did not eat.   / She didn't eat.       │",
      "│  He bought.     →     He did not buy.    / He didn't buy.        │",
      "│  I gave.        →     I did not give.    / I didn't give.        │",
      "└──────────────────────────────────────────────────────────────────┘",
      "⚠️  Common Mistakes — Negative Form:",
      "   ✗ 'She didn't ate the sandwich.'  →  ✅ 'She didn't __________ the sandwich.'",
      "   ✗ 'He didn't bought anything.'    →  ✅ 'He didn't __________ anything.'",
      "   ✗ 'I didn't gave her food.'       →  ✅ 'I didn't __________ her food.'",
      "🖊️  Sentence Transformation Practice (Affirmative → Negative):",
      "   1. 'I ate a sandwich.'            → 'I didn't ____________________.'",
      "   2. 'She bought apples.'           → 'She didn't __________________.'",
      "   3. 'He gave her a juice.'         → 'He didn't ___________________.'",
      "   4. 'They drank cold water.'       → 'They didn't __________________.'",
      "🖊️  Extra challenge — Write your own negative sentence:",
      "   Yesterday, I didn't ________________________________________________________.",
      "👨‍🏫 Teacher Note: Today focus especially on buy→bought and give→gave in exercises.",
      "   Check PART 3 and PART 5 use both these verbs specifically.",
      "   Most important error pattern to fix: 'didn't ate / didn't bought / didn't gave'."
    ]
  },
  {  # Session 3 — Mastery
    "title": "GRAMMAR FOCUS — Past Simple: Consumption Verbs (Mastery Review)",
    "content": [
      "📌 MASTERY: All 5 consumption/giving verbs — can you produce them all?",
      "┌──────────────────────────────────────────────────────────────────┐",
      "│  eat→ate   drink→drank   have→had   buy→bought   give→gave       │",
      "│  NEGATIVE: didn't + BASE VERB (eat / drink / have / buy / give)  │",
      "└──────────────────────────────────────────────────────────────────┘",
      "🖊️  Complete the picnic story using the correct past tense form:",
      "   Last Sunday, Mum __________ (buy) fresh fruit and bread.",
      "   Dad __________ (give) everyone a sandwich.",
      "   We all __________ (eat) and __________ (drink) juice together.",
      "   Little Lily __________ (not eat) her vegetables — she __________ (have) more fruit!",
      "   It __________ (be) a wonderful picnic.",
      "🖊️  Error Correction — Find and fix TWO mistakes in each sentence:",
      "   1. 'The dog eated the sandwich and drinked all the juice.'",
      "      → ___________________________________________________________________",
      "   2. 'She didn't bought candy but she gave me a apple.'",
      "      → ___________________________________________________________________",
      "🖊️  Production Challenge — Write 2 sentences about a meal using any verb from the box:",
      "   1. ______________________________________________________________________",
      "   2. ______________________________________________________________________",
      "👨‍🏫 Teacher Note: Verb chain drill — teacher points to a verb, student gives past",
      "   form instantly. Target: all 5 verbs without hesitation.",
      "   Final check: negative form 'didn't + base' — no more 'didn't ate/bought/gave'."
    ]
  }
],

# ═══════════════════════════════════════════════════════════════════════════
# WEEK 31 — Past Simple: Perception Verbs (see→saw, hear→heard, feel→felt, smell→smelt)
# ═══════════════════════════════════════════════════════════════════════════
31: [
  {  # Session 1 — Introduction
    "title": "GRAMMAR FOCUS — Past Simple: Sense/Perception Verbs (saw, heard, felt, smelt)",
    "content": [
      "📌 RULE: This week introduces 4 irregular verbs for the FIVE SENSES in past tense.",
      "┌──────────────────────────────────────────────────────────────────┐",
      "│  PRESENT  →  PAST        EXAMPLE SENTENCE                        │",
      "│  see      →  saw         Max SAW tall trees in the forest.       │",
      "│  hear     →  heard       He HEARD birds singing.                 │",
      "│  feel     →  felt        He FELT the cool wind on his face.      │",
      "│  smell    →  smelt       He SMELT fresh flowers. (= smelled ✓)   │",
      "└──────────────────────────────────────────────────────────────────┘",
      "📖 Find these verbs in today's reading passage — underline them!",
      "⚠️  Common Mistakes — Spot and Fix:",
      "   ✗ 'I seed a bird.'        →  ✅ 'I __________ a bird.'",
      "   ✗ 'She heared the sound.' →  ✅ 'She __________ the sound.'",
      "   ✗ 'He feeled the wind.'   →  ✅ 'He __________ the wind.'",
      "   ✗ 'I smelled the roses.' → ✅ both 'smelt' AND 'smelled' are correct!",
      "🖊️  Quick Practice — Write the correct PAST TENSE form:",
      "   1. see   →  __________   |   2. hear  →  __________",
      "   3. feel  →  __________   |   4. smell →  __________",
      "   5. In the forest, I __________ (see) a big brown bear!",
      "   6. I __________ (hear) a strange sound behind me.",
      "   7. I __________ (feel) scared, but I __________ (smell) flowers and relaxed.",
      "👨‍🏫 Teacher Note: 'seed' (for 'saw') is the most common error — address first.",
      "   Note: 'smelled' (American English) is equally correct as 'smelt' (British English).",
      "   Both are acceptable — do not mark 'smelled' wrong."
    ]
  },
  {  # Session 2 — felt dual use + negative
    "title": "GRAMMAR FOCUS — Past Simple: 'felt' Has Two Uses + Negative Form",
    "content": [
      "📌 REVIEW: saw / heard / felt / smelt — same 4 verbs, new story context.",
      "📌 SPECIAL FOCUS — 'FELT' has TWO correct uses:",
      "┌──────────────────────────────────────────────────────────────────┐",
      "│  USE 1 — Physical sensation:                                      │",
      "│    'I felt the cold wind on my face.'                            │",
      "│    'She felt the soft leaves.'                                   │",
      "│  USE 2 — Emotion / inner feeling:                                │",
      "│    'I felt happy in the forest.'                                 │",
      "│    'She felt peaceful near the river.'                           │",
      "└──────────────────────────────────────────────────────────────────┘",
      "📌 NEGATIVE FORM: subject + didn't + BASE VERB",
      "   ✅ 'I didn't see the bird.'      (NOT: 'didn't saw' ✗)",
      "   ✅ 'She didn't hear the sound.'  (NOT: 'didn't heard' ✗)",
      "🖊️  Practice — Write one sentence for each use of 'felt':",
      "   Physical sensation:  I felt ____________________________________________.",
      "   Emotion:             I felt ____________________________________________.",
      "🖊️  Sentence Transformation (Affirmative → Negative):",
      "   1. 'I saw the red roses.'          → 'I didn't ________________________.'",
      "   2. 'She heard the owl at night.'   → 'She didn't _____________________.'",
      "   3. 'He smelt fresh pine trees.'    → 'He didn't ______________________.'",
      "👨‍🏫 Teacher Note: The dual use of 'felt' (sensation + emotion) is a key",
      "   Cambridge Movers pattern. Praise students who write emotion sentences.",
      "   Check for error: 'didn't saw / didn't heard / didn't felt' — drill correction."
    ]
  },
  {  # Session 3 — Mastery
    "title": "GRAMMAR FOCUS — Past Simple: Sense Verbs (Mastery — Use All 4)",
    "content": [
      "📌 MASTERY: All 4 sense verbs — can you use all of them in one story?",
      "┌──────────────────────────────────────────────────────────────────┐",
      "│  see→saw   hear→heard   feel→felt   smell→smelt (or smelled)     │",
      "│  NEGATIVE: didn't + BASE VERB (see / hear / feel / smell)        │",
      "└──────────────────────────────────────────────────────────────────┘",
      "📌 PATTERN: [Subject] + [SENSE VERB] + [THING] + [DESCRIBING WORD]",
      "   ✅ 'I saw a beautiful waterfall.'",
      "   ✅ 'I heard a loud bird.'",
      "   ✅ 'I felt the soft cool wind.'",
      "   ✅ 'I smelt fresh flowers.'",
      "🖊️  Error Correction — Find and fix TWO mistakes in each sentence:",
      "   1. 'Yesterday, I see a big mountain.'                → ___________________",
      "   2. 'She feeled the cold water and heared the waves.' → ___________________",
      "   3. 'I didn't saw any birds at the top.'              → ___________________",
      "🖊️  MASTERY WRITE — Use ALL 4 sense verbs in 4 sentences about a nature walk:",
      "   1. (saw)   I saw ________________________________________________________.",
      "   2. (heard) I heard ______________________________________________________.",
      "   3. (felt)  I felt _______________________________________________________.",
      "   4. (smelt) I smelt ______________________________________________________.",
      "👨‍🏫 Teacher Note: This completes the W29-W31 irregular verb series (movement →",
      "   consumption → perception). Celebrate progress with a quick 'Verb Olympics' game.",
      "   Target: students write all 4 sentences independently with correct past forms."
    ]
  }
]

}  # end GRAMMAR_FOCUS


# ─────────────────────────────────────────────────────────────────────────────
# W28 teacher_contents grammar_notes (W29-31 already have this field)
# ─────────────────────────────────────────────────────────────────────────────

W28_GRAMMAR_NOTES = [
  # Session 1
  ("• Irregular verbs introduced this week: run→ran, win→won, sleep→slept, lose→lost\n"
   "• Also appear in story: go→went, say→said, wake→woke — teach as 'bonus' if students are ready\n"
   "• Key contrast: regular verbs add -ed (walked, played) / irregular verbs change completely\n"
   "• Top 3 student errors this session: 'runned', 'winned', 'sleeped' — each needs oral correction drill\n"
   "• Teaching strategy: Point to verb in the story text first ('ran' in red), ask 'what's the base verb?',\n"
   "  build the pattern inductively: run → ran. Then drill oral chain before any writing.\n"
   "• Suggested drill: Teacher says present, students call out past. 'run?' → 'RAN!' 'win?' → 'WON!'"),

  # Session 2
  ("• Review: ran/won/slept/lost + NEW: ride→rode, take→took, wake→woke (transport context)\n"
   "• Detective Luna story naturally introduces transport verbs: rode her bicycle, took a shortcut\n"
   "• Error focus this session: 'taked' is very common, 'rided' is less common, 'waked' is common\n"
   "• Sequence connection: 'The hare WOKE up and RAN' — two past irregulars in immediate sequence\n"
   "• Suggested oral drill: Quick-fire chain around class — each student gives past tense of one verb\n"
   "• Note: 'woke up' — phrasal verb — teach as a chunk, students don't need to analyse 'up' yet"),

  # Session 3
  ("• Full W28 mastery: all irregular verbs from this week used in the Modern Race story\n"
   "• Key grammar points: (1) affirmative past, (2) negative: did NOT + BASE VERB, (3) error correction\n"
   "• Critical error to address: negative form — 'did not ran' is WRONG; 'did not run' is CORRECT\n"
   "• Writing target: students produce 1 paragraph (PART 8 Portfolio) using at least 3 irregular verbs\n"
   "• Suggested activity: Trophy Ceremony rapid-fire drill — point to student, say verb, they give past\n"
   "• Exit ticket: ask 5 students to write one irregular past sentence on the board without prompting")
]


# ─────────────────────────────────────────────────────────────────────────────
# MAIN SCRIPT
# ─────────────────────────────────────────────────────────────────────────────

def main():
    for w in [28, 29, 30, 31]:
        path = f"public/data/lessons/W{w}.json"
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)

        modified_sessions = 0
        for si, session in enumerate(data["sessions"]):
            gf_part = copy.deepcopy(GRAMMAR_FOCUS[w][si])

            # Find the index of PART 2 (Vocabulary Building)
            insert_idx = None
            for pi, part in enumerate(session["parts"]):
                if "PART 2" in part.get("title", "") and "VOCAB" in part.get("title", "").upper():
                    insert_idx = pi
                    break

            if insert_idx is None:
                print(f"  ⚠️  W{w} S{si+1}: Could not find PART 2 — skipping session")
                continue

            # Check if Grammar Focus already inserted (idempotent)
            if any("GRAMMAR FOCUS" in p.get("title", "") for p in session["parts"]):
                print(f"  ℹ️  W{w} S{si+1}: GRAMMAR FOCUS already present — skipping")
                continue

            session["parts"].insert(insert_idx, gf_part)
            modified_sessions += 1
            print(f"  ✅ W{w} S{si+1}: Grammar Focus inserted at index {insert_idx} → now {len(session['parts'])} parts")

        # Add grammar_notes to W28 teacher_contents
        if w == 28:
            for i, tc in enumerate(data.get("teacher_contents", [])):
                if not tc.get("grammar_notes"):
                    tc["grammar_notes"] = W28_GRAMMAR_NOTES[i]
                    print(f"  ✅ W28 S{i+1}: grammar_notes added to teacher_contents")
                else:
                    print(f"  ℹ️  W28 S{i+1}: grammar_notes already exists — skipping")

        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"W{w}: saved ({modified_sessions} sessions modified)\n")

    print("All done.")

if __name__ == "__main__":
    main()
