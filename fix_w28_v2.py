"""
fix_w28_v2.py — Round 2 fixes for W28:

1. Compact worksheet lines: merge "→ Write 3 times / collocation / sentence" onto same line
   as the word header (no unnecessary newlines in print layout)
2. Rewrite task_cards with proper Cambridge-style vocabulary + grammar activities
3. Update Video Challenge Script (PART 9 last section) with Cambridge vocab/grammar
4. Apply to sessions, sessions_2, sessions_5
"""
import json, copy
from pathlib import Path

ROOT = Path(__file__).parent
MCP_W28 = ROOT / 'mcp-server/data/lessons/W28.json'
PUB_W28 = ROOT / 'public/data/lessons/W28.json'
LP_JSON  = ROOT / 'public/data/lessonPlans.json'

# ─────────────────────────────────────────────────────────────────────────────
# 1. COMPACT PART 2 VOCAB LINES
#    Problem: word header on its own line, then → Write 3 times on next line
#    These lines should be JOINED (no break needed — renderer handles indentation)
# ─────────────────────────────────────────────────────────────────────────────

def compact_vocab_part2(content: list) -> list:
    """
    Merge word entries like:
        '1. fast (nhanh)'          \
        '→ Write 3 times: ...'      > keep as-is; renderer already indents → lines
        '→ Collocation: ...'       /
    
    The actual issue is different: word entry lines like
        '4. patient (kiên nhẫn)'
    are already fine — the PRINT renderer already handles them.
    
    But some lines have ONLY '→ _________' on its own line after a question 
    that ends with → on the SAME line. Detect and collapse those.
    """
    result = []
    i = 0
    while i < len(content):
        line = content[i]
        s = str(line).strip()
        
        # Pattern: question ends mid-sentence (no '→') and next line is ONLY '→ _________'
        # e.g. "2. This animal has a hard shell and walks very slowly."
        #      "→ _________"
        # These should be merged: "2. This animal has a hard shell and walks very slowly. → _________"
        if i + 1 < len(content):
            next_line = str(content[i + 1]).strip()
            if (not s.startswith('→') and
                    not s.startswith('[') and
                    not s.endswith(':') and
                    not s.endswith('_') and
                    next_line.startswith('→ _________') and len(next_line) < 30):
                merged = s + '  → _________'
                result.append(merged)
                i += 2
                continue
        
        result.append(line)
        i += 1
    return result


def compact_all_sessions(sessions_array: list) -> list:
    """Apply compact_vocab_part2 to PART 3 content (the clue-writing section)."""
    fixed = []
    for session in sessions_array:
        new_session = dict(session)
        new_parts = []
        for part in session.get('parts', []):
            new_part = dict(part)
            title = part.get('title', '')
            content = list(part.get('content', []))
            # Apply to PART 3 (sentence building / clues) and PART 4 (listening)
            if 'PART 3' in title or 'PART 4' in title or 'PART 5' in title:
                content = compact_vocab_part2(content)
            new_part['content'] = content
            new_parts.append(new_part)
        new_session['parts'] = new_parts
        fixed.append(new_session)
    return fixed


# ─────────────────────────────────────────────────────────────────────────────
# 2. CAMBRIDGE-STYLE TASK CARDS (full rewrite)
# ─────────────────────────────────────────────────────────────────────────────

TASK_CARDS_W28 = [
    "S1 Task — Information Gap: \"The Race\" | Cambridge Flyers Speaking style",
    "Materials: Print 1 copy of Card A + 1 copy of Card B per pair. Sit facing each other.",
    "Plaintext",

    "🃏 CARD A — Student A | Week 28 Session 1",
    "Cambridge Flyers Speaking — Information Gap",
    "",
    "YOUR PICTURE: The hare is running very fast at the START of the race.",
    "→ He looks proud. He does NOT look at the tortoise.",
    "→ The tortoise is walking slowly but steadily behind him.",
    "",
    "ASK your partner to complete YOUR missing information:",
    "a. \"What is the tortoise doing at the END of the race?\"  → ___________",
    "b. \"Who won the race?\"  → ___________",
    "c. \"Why did the hare lose?\" (Use: because + past simple)  → ___________",
    "",
    "ANSWER your partner's questions using YOUR picture:",
    "• The hare ran very fast. / He was proud. / The tortoise walked slowly.",
    "",
    "GRAMMAR TARGET: past simple — ran / walked / was / won",

    "Plaintext",

    "🃏 CARD B — Student B | Week 28 Session 1",
    "Cambridge Flyers Speaking — Information Gap",
    "",
    "YOUR PICTURE: The tortoise is crossing the FINISH LINE first.",
    "→ The hare is still sleeping under a tree in the background.",
    "→ The tortoise looks calm and patient.",
    "",
    "ASK your partner to complete YOUR missing information:",
    "a. \"What was the hare doing at the START?\"  → ___________",
    "b. \"How did the hare feel? Use a feeling word.\"  → ___________",
    "c. \"What is the lesson of this story?\"  → ___________",
    "",
    "ANSWER your partner's questions using YOUR picture:",
    "• The tortoise won. / He crossed the finish line. / The hare was sleeping.",
    "",
    "GRAMMAR TARGET: past simple — ran / walked / was / won",

    # ── Session 2 ──────────────────────────────────────────────────────────
    "S2 Task — Describe & Guess: Transport Clues | Cambridge Flyers Vocabulary",
    "Materials: Print 1 copy of Card A + 1 copy of Card B per pair.",
    "Plaintext",

    "🃏 CARD A — Student A | Week 28 Session 2",
    "Cambridge Flyers Vocabulary — Describe & Guess",
    "",
    "DESCRIBE the underlined word — DO NOT say the word!",
    "Use: 'It is a... / It has... / You use it to... / It goes...'",
    "",
    "1. Describe: BUS  → Your partner guesses: ___________",
    "   Clue idea: 'It is big. Many people ride it. It stops at fixed places.'",
    "2. Describe: TRAIN  → ___________",
    "   Clue idea: 'It goes very fast. It travels on metal tracks.'",
    "3. Describe: PATIENT  → ___________",
    "   Clue idea: 'It is an adjective. The tortoise was this. It means not angry when you wait.'",
    "",
    "NOW LISTEN — your partner describes these words. Write your answer:",
    "4. Your partner describes: ___________  → You guess: BICYCLE",
    "5. Your partner describes: ___________  → You guess: TAXI",
    "6. Your partner describes: ___________  → You guess: PROUD",

    "Plaintext",

    "🃏 CARD B — Student B | Week 28 Session 2",
    "Cambridge Flyers Vocabulary — Describe & Guess",
    "",
    "LISTEN first — your partner describes words 1–3. Write your answers:",
    "1. → ___________   2. → ___________   3. → ___________",
    "",
    "NOW YOUR TURN — describe these words. DO NOT say the word!",
    "Use: 'It is a... / It has... / You use it to... / It goes...'",
    "",
    "4. Describe: BICYCLE  → Your partner guesses: ___________",
    "   Clue idea: 'You pedal it with your feet. It has two wheels. No engine.'",
    "5. Describe: TAXI  → ___________",
    "   Clue idea: 'It is a small car. You pay the driver. You can go anywhere.'",
    "6. Describe: PROUD  → ___________",
    "   Clue idea: 'It is an adjective. The hare felt this. It means you think you are the best.'",
    "",
    "GRAMMAR TARGET: present simple (It is / It has / You use) + comparative (faster than)",

    # ── Session 3 ──────────────────────────────────────────────────────────
    "S3 Task — Collaborative Story Build | Cambridge Flyers Writing",
    "Materials: One card per pair. Students take turns adding sentences.",
    "Plaintext",

    "🃏 CARD — Pair Activity | Week 28 Session 3",
    "Cambridge Flyers Writing — Story Chain",
    "",
    "BUILD the Modern Race story together. Each student writes 1 sentence, then passes the card.",
    "✓ Use at least 3 words from the box   ✓ Use past simple   ✓ Each sentence must link to the last",
    "",
    "WORD BOX: race / patient / proud / fast / slow / steady / win / finish",
    "TRANSPORT BOX: bus / train / bicycle / taxi / motorbike / boat",
    "VERB BOX (past): ran / won / rode / took / drove / went / sailed / walked",
    "",
    "Sentence 1 (Student A — character + transport choice):  ___________________________",
    "Sentence 2 (Student B — what happened first):  ___________________________",
    "Sentence 3 (Student A — a problem or obstacle):  ___________________________",
    "Sentence 4 (Student B — how it ended):  ___________________________",
    "Sentence 5 (BOTH — the lesson, 1 sentence each):  A: ___________ B: ___________",
    "",
    "Cambridge Self-Check:",
    "□ Did you use past simple correctly? (ran ✓  runned ✗)",
    "□ Did you use at least 1 comparative? (faster than / slower than / more reliable than)",
    "□ Did your story have: a beginning / a middle / an end?",
    "[ Story Chain Total: _____ / 5 sentences ]",
]


# ─────────────────────────────────────────────────────────────────────────────
# 3. VIDEO CHALLENGE SCRIPT — update with Cambridge vocab/grammar
#    These appear at the end of PART 9 content in each session
# ─────────────────────────────────────────────────────────────────────────────

VIDEO_CHALLENGE_S1 = [
    "🎥 VIDEO CHALLENGE SCRIPT — Session 1",
    "Cambridge Flyers Speaking — Video Production Task",
    "",
    "Step 1 — Chant (whole class, 3 times):",
    "  'The hare RAN fast. The tortoise WON. Slow and steady — number one!'",
    "",
    "Step 2 — Individual speaking (record 30 seconds each):",
    "  Talk about ONE transport vehicle using this structure:",
    "  'A [vehicle] is [adjective]. It [verb] [adverb/place]. It is [comparison] than a [other vehicle].'",
    "  Example: 'A bus is big. It travels on roads steadily. It is slower than a train.'",
    "  Use: bus / train / bicycle / taxi / motorbike",
    "",
    "Step 3 — Story sentence (Cambridge Flyers frame):",
    "  'The [hare / tortoise] [past verb] because [reason].'",
    "  Use: ran / walked / won / slept / stopped",
    "",
    "Cambridge vocabulary check before filming: fast / slow / race / patient / proud",
]

VIDEO_CHALLENGE_S2 = [
    "🎥 VIDEO CHALLENGE SCRIPT — Session 2",
    "Cambridge Flyers Speaking — Comparison Task",
    "",
    "Step 1 — Pair chant (A says, B responds):",
    "  A: 'A hare is fast!'   B: 'But a tortoise is patient!'",
    "  A: 'A train is faster than a bus!'   B: 'But a bus is more reliable!'",
    "",
    "Step 2 — Individual comparison (record 45 seconds each):",
    "  Compare TWO transport vehicles using:",
    "  '[Vehicle A] is [adjective], but [Vehicle B] is [comparison].'",
    "  '[Vehicle B] is better for [situation] because [reason].'",
    "  Use: faster than / slower than / more reliable than / steadier than",
    "",
    "Step 3 — Grammar production:",
    "  Say 3 sentences in past simple — one about the hare, one about the tortoise, one about transport.",
    "  Irregular verbs: ran / won / rode / took / went / drove / sailed",
    "",
    "Cambridge vocabulary check: steady / reliable / patient / proud / race / win → won",
]

VIDEO_CHALLENGE_S3 = [
    "🎥 VIDEO CHALLENGE SCRIPT — Session 3",
    "Cambridge Flyers Writing + Speaking — Final Production",
    "",
    "Step 1 — Class chant (Modern Race):",
    "  'Slow and steady wins the race! Bus or train — keep a steady pace!'",
    "",
    "Step 2 — Individual story retelling (record 60 seconds each):",
    "  Tell the Modern Race story from memory. Include:",
    "  • WHO raced and WHAT transport they chose",
    "  • WHAT happened in the middle (problem)",
    "  • WHO won and WHY",
    "  Use: at least 3 transport words + 3 past simple irregular verbs",
    "",
    "Step 3 — Cambridge Writing Frame (write THEN read aloud on camera):",
    "  'In the Modern Race, [Character A] chose a [transport] because [reason].'",
    "  '[Character B] chose a [transport] because [reason].'",
    "  'In the end, [winner] won because [reason].'",
    "  'The lesson is: [lesson].'",
    "",
    "Cambridge self-check: □ 3 irregular past verbs □ 1 comparative □ 1 reason (because)",
]

VIDEO_CHALLENGE_BY_SESSION = {
    1: VIDEO_CHALLENGE_S1,
    2: VIDEO_CHALLENGE_S2,
    3: VIDEO_CHALLENGE_S3,
}


def update_video_challenge(sessions_array: list) -> list:
    """Replace old Video Challenge Script lines in PART 9 of each session."""
    fixed = []
    for session in sessions_array:
        sess_num = session.get('session', 0)
        new_session = dict(session)
        new_parts = []
        for part in session.get('parts', []):
            new_part = dict(part)
            title = part.get('title', '')
            if 'PART 9' in title or 'HOMEWORK' in title:
                content = list(part.get('content', []))
                # Find and replace VIDEO CHALLENGE block
                # Remove from first "🎥 VIDEO CHALLENGE" line to end
                vc_idx = None
                for j, line in enumerate(content):
                    if '🎥 VIDEO CHALLENGE' in str(line):
                        vc_idx = j
                        break
                if vc_idx is not None:
                    content = content[:vc_idx]
                # Append updated video challenge
                vc_lines = VIDEO_CHALLENGE_BY_SESSION.get(sess_num, [])
                if vc_lines:
                    content.append('')
                    content.extend(vc_lines)
                new_part['content'] = content
            new_parts.append(new_part)
        new_session['parts'] = new_parts
        fixed.append(new_session)
    return fixed


# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────

def main():
    print('Loading W28.json...')
    with open(MCP_W28, encoding='utf-8') as f:
        data = json.load(f)

    # ── 1. Compact worksheet lines ───────────────────────────────────────────
    print('  Compacting unnecessary line breaks...')
    data['sessions']   = compact_all_sessions(data.get('sessions', []))
    data['sessions_2'] = compact_all_sessions(data.get('sessions_2', []))
    data['sessions_5'] = compact_all_sessions(data.get('sessions_5', []))

    # ── 2. Rewrite task cards ────────────────────────────────────────────────
    print('  Rewriting task cards (Cambridge-style)...')
    data['task_cards'] = TASK_CARDS_W28

    # Also update task_cards_by_session
    data['task_cards_by_session'] = {
        "1": TASK_CARDS_W28[:17],   # S1 cards (indices 0–16)
        "2": TASK_CARDS_W28[17:36], # S2 cards
        "3": TASK_CARDS_W28[36:],   # S3 cards
    }

    # ── 3. Update video challenge scripts ───────────────────────────────────
    print('  Updating Video Challenge Scripts...')
    data['sessions']   = update_video_challenge(data['sessions'])
    data['sessions_2'] = update_video_challenge(data['sessions_2'])
    data['sessions_5'] = update_video_challenge(data['sessions_5'])

    # ── Save ─────────────────────────────────────────────────────────────────
    print('  Writing mcp-server/data/lessons/W28.json...')
    with open(MCP_W28, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print('  Writing public/data/lessons/W28.json...')
    PUB_W28.parent.mkdir(parents=True, exist_ok=True)
    with open(PUB_W28, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print('  Updating public/data/lessonPlans.json...')
    with open(LP_JSON, encoding='utf-8') as f:
        lp = json.load(f)
    if 'W28' in lp:
        lp['W28'] = data
        with open(LP_JSON, 'w', encoding='utf-8') as f:
            json.dump(lp, f, ensure_ascii=False, indent=2)

    # ── Verify ───────────────────────────────────────────────────────────────
    print()
    print('=== VERIFICATION ===')
    print(f'✓ task_cards: {len(data["task_cards"])} lines')
    # Check video challenge in sessions
    for s in data['sessions']:
        for p in s['parts']:
            if 'PART 9' in p['title']:
                has_vc = any('🎥 VIDEO CHALLENGE' in str(l) for l in p['content'])
                has_cam = any('Cambridge' in str(l) for l in p['content'])
                print(f'  S{s["session"]} PART 9: VIDEO_CHALLENGE={has_vc}, CAMBRIDGE={has_cam}')

    # Count merged lines
    merged = 0
    for s in data['sessions']:
        for p in s['parts']:
            for line in p['content']:
                if '→ _________' in str(line) and not str(line).strip().startswith('→'):
                    merged += 1
    print(f'✓ Merged question+blank lines: {merged}')
    print()
    print('Done!')


if __name__ == '__main__':
    main()
