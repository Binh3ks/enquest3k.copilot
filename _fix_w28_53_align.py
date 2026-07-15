"""
Fix all misalignments found in W28-W53 audit:
1. W29, W30, W31: Replace wrong story with correct syllabus story
2. W28, W29, W30, W31: Add Cambridge integration to Grammar Focus
3. W36: Fix GF — superlatives formal introduction
4. W50, W51, W53: Fix weak GF — add 📌 RULE + Cambridge content
"""
import json, re
from pathlib import Path
from copy import deepcopy

PUBLIC = Path("/Users/binhnguyen/Downloads/Engquest3k/public/data/lessons")
MCP    = Path("/Users/binhnguyen/Downloads/Engquest3k/mcp-server/data/lessons")

def split_sentences(text, maxlen=85):
    """Split story text into readable lines."""
    parts = re.split(r'(?<=[.!?"])\s+', text.strip())
    lines, cur = [], ""
    for s in parts:
        s = s.strip()
        if not s: continue
        if len(cur) + len(s) + 1 <= maxlen:
            cur = (cur + " " + s).strip()
        else:
            if cur: lines.append(cur)
            cur = s
    if cur: lines.append(cur)
    return lines

# ─────────────────────────────────────────────────────────────────────────────
# CORRECT STORIES FROM SYLLABUS V5 (with Cambridge embellishments)
# ─────────────────────────────────────────────────────────────────────────────

STORIES = {
    29: {
        "title": "The Magic Trip",
        "text": (
            "A group of friends went on a magic trip. "
            "They ran QUICKLY to the station and flew on a magic carpet. "
            "They came to a beautiful island. "
            "They swam HAPPILY in the sea, rode on dolphins, and drove a tiny car. "
            "They flew CAREFULLY over the mountains. "
            "They saw wonderful things and took photos. "
            "Then they came back home. "
            '"That was the best trip!" they said.'
        ),
    },
    30: {
        "title": "The Picnic",
        "text": (
            "The class went to the park for a picnic. "
            "They ate sandwiches and drank lemonade. "
            "Sam bought ice cream. "
            "Lisa gave her apple to a small bird. "
            "Ben made a flower crown. "
            'The CHEF cooked the sandwiches in the morning. '
            'The FARMER grew the apples that Lisa gave to the bird. '
            'The DRIVER drove the bus that took the class to the park. '
            "They had a wonderful time. "
            "Then it began to rain! "
            'They quickly put away the food and ran to the bus. '
            '"That was the best picnic!" they said.'
        ),
    },
    31: {
        "title": "A Day at the Market",
        "text": (
            "Maya went to the market with her mum. "
            "She saw colourful fruits and vegetables. "
            "She heard the sellers calling. "
            "She smelled fresh bread. "
            "She felt the soft COTTON cloth and the cold METAL pots. "
            "She saw WOODEN shelves, GLASS jars, PLASTIC bags, and STONE sculptures. "
            "She tasted a piece of sweet mango. "
            "She knew every shop and understood every word the sellers said. "
            '"I love the market!" she said.'
        ),
    },
}

# ─────────────────────────────────────────────────────────────────────────────
# GRAMMAR FOCUS CONTENT (fully aligned with Syllabus V5)
# ─────────────────────────────────────────────────────────────────────────────

GF_CONTENT = {
    28: [
        "📌 RULE: Introduction to Irregular Verbs (Preview from Story)",
        "",
        "Story verbs that do NOT follow the -ed rule:",
        "┌──────────────────────────────────────────────┐",
        "│  VERB (base)  →  PAST FORM                  │",
        "├──────────────────────────────────────────────┤",
        "│  run          →  ran                        │",
        "│  sleep        →  slept                      │",
        "│  win          →  won                        │",
        "│  say          →  said                       │",
        "│  wake         →  woke                       │",
        "└──────────────────────────────────────────────┘",
        "",
        "📌 NOTE: We will learn irregular verbs in 5 groups (W29–33). For now, learn by reading context.",
        "",
        "★ CAMBRIDGE INTEGRATION — Superlatives: Seeding (No Rules Yet)",
        "  ▶ Pattern exposed: adjective + -est  |  most + adjective (3 examples from story)",
        '  -> fast → the fastest  |  slow → the slowest  |  patient → the most patient',
        "  ▶ Noticing only. Students add to Word Discovery Box.",
        "  ▶ Task: Find all 3 superlative forms in the story. Write in notebook.",
        "  → Rule explained formally: Week 36.",
        "",
        "📌 PRACTICE:",
        "  1. Teacher models → Students repeat each irregular pair",
        "  2. Flash drill: Teacher says base form → students say past form",
        "  3. Pair practice: 'What did the hare do?' → 'He ran / slept / woke up.'",
    ],
    29: [
        "📌 RULE: Irregular Verbs Group 1 — Movement Verbs (10 verbs)",
        "",
        "┌──────────────────────────────────────────────┐",
        "│  BASE FORM    →  PAST FORM                  │",
        "├──────────────────────────────────────────────┤",
        "│  go           →  went                       │",
        "│  come         →  came                       │",
        "│  run          →  ran                        │",
        "│  fly          →  flew                       │",
        "│  swim         →  swam                       │",
        "│  ride         →  rode                       │",
        "│  drive        →  drove                      │",
        "│  fall         →  fell                       │",
        "│  climb        →  climbed  (regular!)        │",
        "│  walk         →  walked   (regular!)        │",
        "└──────────────────────────────────────────────┘",
        "",
        "EXAMPLES:",
        "  ✎ They went to the station.",
        "  ✎ They flew on a magic carpet.",
        "  ✎ They swam in the sea.",
        "",
        "★ CAMBRIDGE INTEGRATION — Adverbs of Manner (Seeding — 5 Words)",
        "  ▶ Pattern: verb + adverb of manner (describes HOW the action was done)",
        "  -> 5 adverbs seeded: quickly, slowly, carefully, loudly, quietly",
        '  -> "They ran QUICKLY." | "She swam CAREFULLY." | "He flew SLOWLY."',
        "  ▶ Noticing only — formal teaching: Week 35.",
        "",
        "📌 PRACTICE:",
        "  1. Teacher models → Students repeat each irregular pair",
        "  2. Past tense transformation drill: 'I go → I went'",
        "  3. Story substitution: 'They ___ on a magic carpet.' (flew/rode/drove)",
    ],
    30: [
        "📌 RULE: Irregular Verbs Group 2 — Consumption & Giving Verbs (10 verbs)",
        "",
        "┌──────────────────────────────────────────────┐",
        "│  BASE FORM    →  PAST FORM                  │",
        "├──────────────────────────────────────────────┤",
        "│  eat          →  ate                        │",
        "│  drink        →  drank                      │",
        "│  buy          →  bought                     │",
        "│  give         →  gave                       │",
        "│  make         →  made                       │",
        "│  have         →  had                        │",
        "│  take         →  took                       │",
        "│  bring        →  brought                    │",
        "│  sell         →  sold                       │",
        "│  pay          →  paid                       │",
        "└──────────────────────────────────────────────┘",
        "",
        "EXAMPLES:",
        "  ✎ They ate sandwiches and drank lemonade.",
        "  ✎ Sam bought ice cream.",
        "  ✎ Lisa gave her apple to a bird.",
        "",
        "★ CAMBRIDGE INTEGRATION — Adverbs of Manner (Consolidation)",
        "  ▶ Review W29 adverbs + 4 new: happily, hungrily, quietly, carefully",
        '  -> "She ate HUNGRILY." | "He gave his sandwich CAREFULLY."',
        '  -> "She drank her juice QUIETLY."',
        "  ▶ Mini drill: 3 sentences in 2 minutes — adverb placed after verb.",
        "",
        "📌 PRACTICE:",
        "  1. 'Who did what at the picnic?' sentence matching",
        "  2. Irregular verb bingo — past forms",
        "  3. Substitution: 'She ___ her juice ___.': drank / quietly / carefully",
    ],
    31: [
        "📌 RULE: Irregular Verbs Group 3 — Perception Verbs (10 verbs)",
        "",
        "┌──────────────────────────────────────────────┐",
        "│  BASE FORM    →  PAST FORM                  │",
        "├──────────────────────────────────────────────┤",
        "│  see          →  saw                        │",
        "│  hear         →  heard                      │",
        "│  feel         →  felt                       │",
        "│  smell        →  smelled / smelt            │",
        "│  know         →  knew                       │",
        "│  understand   →  understood                 │",
        "│  find         →  found                      │",
        "│  meet         →  met                        │",
        "│  tell         →  told                       │",
        "│  taste        →  tasted  (regular!)         │",
        "└──────────────────────────────────────────────┘",
        "",
        "EXAMPLES:",
        "  ✎ She saw colourful fruits and vegetables.",
        "  ✎ She heard the sellers calling.",
        "  ✎ She felt the soft COTTON cloth.",
        "",
        "★ CAMBRIDGE INTEGRATION — Adverbs + Perception Verbs",
        "  ▶ Review: adverb after verb. New examples with perception verbs:",
        '  -> "She looked at the glass CAREFULLY."',
        '  -> "He listened QUIETLY."',
        '  -> "She felt the cloth GENTLY."',
        "  ▶ Homework: Write 3 sentences — perception verb + adverb.",
        "",
        "★ CAMBRIDGE INTEGRATION — Materials Vocabulary",
        "  ▶ Materials in story (W31 introduces 10 man-made materials):",
        "  -> COTTON, METAL, WOODEN, GLASS, PLASTIC, STONE",
        '  -> Pattern: \'The pot is made of METAL.\' | \'The bag is made of PLASTIC.\'',
        "  ▶ Task: Find 6 material words in story. Classify: natural / man-made?",
        "",
        "📌 PRACTICE:",
        "  1. Sensory description chain: 'I saw / heard / felt / smelled...'",
        "  2. 'What did you see/hear/feel/smell/taste?' round-table",
        "  3. Pair practice — describe a market using perception + materials verbs",
    ],
    36: [
        "📌 RULE: Superlatives — FORMAL INTRODUCTION (Rules Taught This Week)",
        "",
        "★ CAMBRIDGE INTEGRATION — Superlatives: Full Rules",
        "",
        "┌──────────────────────────────────────────────────────┐",
        "│  RULE A: Short adjectives (1 syllable) → add -est    │",
        "│    fast → the fastest  |  slow → the slowest         │",
        "│    big  → the biggest  (double consonant!)           │",
        "│    late → the latest   (drop e)                      │",
        "├──────────────────────────────────────────────────────┤",
        "│  RULE B: 2+ syllable adjectives → most + adjective   │",
        "│    beautiful → the most beautiful                    │",
        "│    dangerous → the most dangerous                    │",
        "│    patient   → the most patient                      │",
        "├──────────────────────────────────────────────────────┤",
        "│  RULE C: Irregulars (must memorize!)                 │",
        "│    good → better → the best                          │",
        "│    bad  → worse  → the worst                         │",
        "└──────────────────────────────────────────────────────┘",
        "",
        "📌 RULE: Always use 'the' before a superlative!",
        "  ✎ 'It is THE fastest animal in Africa.'",
        "",
        "Full comparison table (W22 comparative → W36 superlative):",
        "  big → bigger → the biggest",
        "  fast → faster → the fastest",
        "  good → better → the best",
        "",
        "REVIEW: Irregular verbs W29–33 | Adverbs W35 | Relative clause seeding W34",
        "",
        "📌 PRACTICE:",
        "  1. Drill: 10 adjectives → write superlative form",
        "  2. Write 5 original sentences using animals/transport vocabulary",
        "  3. Pair: 'Which is the fastest / most beautiful / best...?'",
    ],
    50: [
        "📌 RULE: Comprehensive Grammar Review — All Cambridge Structures",
        "",
        "★ CAMBRIDGE INTEGRATION — Cambridge Flyers Mixed Structures Drill",
        "",
        "Structures reviewed this week:",
        "┌──────────────────────────────────────────────────────────┐",
        "│  1. Irregular verbs (20-verb speed test — 3 minutes)    │",
        "│  2. Adverbs — correct/incorrect placement (5 sentences) │",
        "│  3. Superlatives + Comparatives (transform 6 sentences) │",
        "│  4. Relative clauses — that/which/where/who (8 items)   │",
        "│  5. Passive — active → passive (5 sentences)            │",
        "│  6. Present Perfect — Q/A with ever/never/already/yet   │",
        "│  7. Should/Should not — 6 advice sentences              │",
        "└──────────────────────────────────────────────────────────┘",
        "",
        "CAMBRIDGE-STYLE MIXED QUIZ (10 questions):",
        "  ✎ Q1: ___ by the female butterfly. → are laid (passive)",
        "  ✎ Q2: Scientists ___ 5,000 exoplanets so far. → have discovered (PP)",
        "  ✎ Q3: She is ___ student in the class. → the most hardworking (superlative)",
        "",
        "📌 SCORING: Score: ___/10. Under 7 = do homework worksheet.",
        "",
        "📌 PRACTICE:",
        "  1. 20-verb speed test (write past forms)",
        "  2. Mixed 10-question Cambridge-style quiz",
        "  3. Self-mark with answer key — identify weak areas",
    ],
    51: [
        "📌 RULE: Grammar in Reading Context — Relative Clauses + Passive",
        "",
        "★ CAMBRIDGE INTEGRATION — Grammar in Reading Context",
        "  ▶ Focus: relative clauses + passive (most common in Cambridge reading texts)",
        "",
        "┌──────────────────────────────────────────────────────────┐",
        "│  PASSIVE in context:                                     │",
        "│  'Water IS DRIVEN by the sun.'                          │",
        "│  → Why passive? Focus on PROCESS, not the sun.          │",
        "├──────────────────────────────────────────────────────────┤",
        "│  RELATIVE CLAUSE in context:                             │",
        "│  'The sun, WHICH IS THE LARGEST object...'              │",
        "│  → Why relative clause? Adds info without a new sentence │",
        "└──────────────────────────────────────────────────────────┘",
        "",
        "📌 RULE: Cambridge strategy — recognise grammar structures in texts",
        "  → Helps Cambridge Reading Part 3 (True/False/Not Mentioned)",
        "",
        "Activity: 10-question mixed grammar quiz (take 2 from W50 — new sentences)",
        "  Focus: relative clauses + passive — need fluency for Reading comprehension",
        "",
        "📌 PRACTICE:",
        "  1. 5 sentences — explain why passive/relative clause was used",
        "  2. Mixed quiz (10 questions — different from W50)",
        "  3. Partner check: swap answers, discuss any differences",
    ],
    53: [
        "📌 RULE: Writing Consolidation — ALL Cambridge Structures for Accuracy",
        "",
        "★ CAMBRIDGE INTEGRATION — Should/Should not: Advice Writing",
        "",
        "Should / Should not in writing context:",
        "┌──────────────────────────────────────────────────────────┐",
        "│  A student SHOULD plan before writing.                  │",
        "│  They SHOULD NOT copy from the model text.              │",
        "│  You SHOULD use a variety of grammar structures.        │",
        "│  You SHOULD NOT only use simple sentences.              │",
        "└──────────────────────────────────────────────────────────┘",
        "",
        "Activity 1 — Error Correction Challenge (5 min):",
        "  Find 8 errors in a paragraph (1 per grammar structure)",
        "",
        "Activity 2 — Sentence Upgrading:",
        "  Simple → Complex:",
        '  "She learned science." →',
        '  "She has learned the most interesting science topics, WHICH ARE STUDIED in schools worldwide."',
        "",
        "📌 PRACTICE:",
        "  1. 5-min grammar error correction challenge",
        "  2. Upgrade 3 simple sentences (add superlative + relative clause + passive)",
        "  3. Write 4 pieces of advice for your future self about English learning",
    ],
}

# ─────────────────────────────────────────────────────────────────────────────
# APPLY FIXES
# ─────────────────────────────────────────────────────────────────────────────

def apply_fixes(wn):
    pub = PUBLIC / f"W{wn}.json"
    mcp = MCP / f"W{wn}.json"
    data = json.loads(pub.read_text(encoding='utf-8'))
    changed = False

    for key in ['sessions', 'sessions_2', 'sessions_5']:
        if key not in data or not data[key]:
            continue
        for sess in data[key]:
            parts = sess.get('parts', [])

            # ── Replace passage (W29, W30, W31) ──
            if wn in STORIES:
                rp_idx = next((i for i, p in enumerate(parts)
                               if 'READING INPUT' in p.get('title', '').upper()), None)
                if rp_idx is not None:
                    story = STORIES[wn]
                    passage_lines = [f"📖 {story['title']}", ""] + split_sentences(story['text'])

                    content = list(parts[rp_idx].get('content', []))
                    # Find where exercises start
                    ex_i = next(
                        (i for i, l in enumerate(content)
                         if str(l).strip().startswith('Title:') or
                         re.match(r'^Stage\s+\d', str(l).strip()) or
                         re.match(r'^\d+[.)]\s', str(l).strip()) or
                         str(l).strip().startswith('[')), 0
                    )
                    exercises = content[ex_i:]
                    parts[rp_idx]['content'] = passage_lines + [''] + exercises
                    changed = True

            # ── Fix Grammar Focus ──
            if wn in GF_CONTENT:
                gf_idx = next((i for i, p in enumerate(parts)
                               if re.search(r'GRAMMAR (FOCUS|SPOTLIGHT)', p.get('title', '').upper())), None)

                new_gf_content = GF_CONTENT[wn]

                if gf_idx is not None:
                    parts[gf_idx]['content'] = new_gf_content
                    # Fix title for review weeks
                    if wn == 36:
                        parts[gf_idx]['title'] = "GRAMMAR FOCUS — Superlatives: Formal Introduction"
                    elif wn == 50:
                        parts[gf_idx]['title'] = "GRAMMAR FOCUS — Comprehensive Review (All Cambridge Structures)"
                    elif wn == 51:
                        parts[gf_idx]['title'] = "GRAMMAR FOCUS — Relative Clauses + Passive in Context"
                    elif wn == 53:
                        parts[gf_idx]['title'] = "GRAMMAR FOCUS — Writing Consolidation (All Structures)"
                    changed = True
                else:
                    # Insert GF after Reading (or at position 1)
                    rp_idx = next((i for i, p in enumerate(parts)
                                   if 'READING INPUT' in p.get('title', '').upper()), None)
                    insert_at = (rp_idx + 1) if rp_idx is not None else 1
                    gf_title = {
                        28: "GRAMMAR FOCUS — Introduction to Irregular Verbs + Superlatives Seeding",
                        29: "GRAMMAR FOCUS — Irregular Verbs Group 1 (Movement) + Adverbs Seeding",
                        30: "GRAMMAR FOCUS — Irregular Verbs Group 2 (Consumption) + Adverbs Consolidation",
                        31: "GRAMMAR FOCUS — Irregular Verbs Group 3 (Perception) + Materials + Adverbs",
                        36: "GRAMMAR FOCUS — Superlatives: Formal Introduction",
                        50: "GRAMMAR FOCUS — Comprehensive Review (All Cambridge Structures)",
                        51: "GRAMMAR FOCUS — Relative Clauses + Passive in Context",
                        53: "GRAMMAR FOCUS — Writing Consolidation (All Structures)",
                    }.get(wn, f"GRAMMAR FOCUS — Week {wn}")

                    parts.insert(insert_at, {"title": gf_title, "score": 0, "content": new_gf_content})
                    sess['parts'] = parts
                    changed = True

    if changed:
        js = json.dumps(data, ensure_ascii=False, indent=2)
        pub.write_text(js, encoding='utf-8')
        mcp.write_text(js, encoding='utf-8')
    return changed


print("Applying targeted fixes for W28-W53 alignment issues...")
print("="*60)

# Weeks needing fixes
FIX_WEEKS = [28, 29, 30, 31, 36, 50, 51, 53]

for wn in FIX_WEEKS:
    result = apply_fixes(wn)
    if result:
        changes = []
        if wn in STORIES: changes.append("passage replaced")
        if wn in GF_CONTENT: changes.append("GF updated")
        print(f"  ✅ W{wn:2}: {', '.join(changes)}")
    else:
        print(f"  ➖ W{wn:2}: no changes")

print("\nDone.")
