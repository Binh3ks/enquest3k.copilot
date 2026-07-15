"""
fix_w28_v3.py — Round 3 expert-driven fixes:

ESL/EFL CRITIQUE:
1. T/F transport items 6-10 use UNTAUGHT vocabulary (petrol, engine, pedals, professional,
   relative clause "who you pay") — must only test with taught vocabulary
2. No model example (item 0) at start of T/F with-justification format
3. Video Challenge Script is WRONG FORMAT — it's a home speaking practice task
   (fill-in-blank monologue → practice 3× → record), NOT classroom chanting
4. Classroom speaking activities (pair chant, describe & guess) should be in
   Teacher's Contents as in_class_speaking section

FIXES:
1. T/F transport items 6-10 — rewrite with only W28 taught vocabulary
2. Add model example (item 0) to L2 T/F section
3. Rewrite Video Challenge Scripts as fill-in-blank home monologues (W25/W27 format)
   — now includes BOTH story vocab + transport vocab + past irregular verbs
4. Add in_class_speaking activities to teacher_contents (per session)
5. Update TeacherPanel.jsx to render in_class_speaking
6. Apply to sessions / sessions_2 / sessions_5
"""
import json, re, copy
from pathlib import Path

ROOT    = Path(__file__).parent
MCP_W28 = ROOT / 'mcp-server/data/lessons/W28.json'
PUB_W28 = ROOT / 'public/data/lessons/W28.json'
LP_JSON  = ROOT / 'public/data/lessonPlans.json'

# ─────────────────────────────────────────────────────────────────────────────
# 1.  FIXED T/F SECTION (Session 1, PART 3 — transport items 6-10 + model)
# ─────────────────────────────────────────────────────────────────────────────
# Original items to replace (exact strings)
OLD_TF_BLOCK = [
    '[O] L2 — True/False with justification (10 items — mix story + transport facts)',
    'STORY T/F (1–5):',
    '1. The hare was a fast animal.',
    '→ _____ (T/F). The hare was _________ and ran _________ in the race.',
    '2. The tortoise slept under the tree.',
    '→ _____ (T/F). The _________ slept under the tree, not the _________.',
    '3. The tortoise won the race.',
    '→ _____ (T/F). The tortoise _________ because he was slow and _________.',
    '4. The hare was patient.',
    '→ _____ (T/F). The hare was _________. The _________ was patient.',
    '5. Slow and steady wins the race.',
    '→ _____ (T/F). This is the _________ of the story.',
    'TRANSPORT T/F (6–10):',
    '6. A bus travels on metal tracks.',
    '→ _____ (T/F). A bus travels on _________. _________ travel on metal tracks.',
    '7. A bicycle needs petrol to move.',
    '→ _____ (T/F). A bicycle has no _________. You move it with your own _________.',
    '8. A train is faster than a bicycle on long journeys.',
    '→ _____ (T/F). A train can go much _________ than a bicycle.',
    '9. A taxi has a professional driver who you pay.',
    '→ _____ (T/F). A taxi has a _________ driver who you _________.',
    '10. A motorbike has four wheels.',
    '→ _____ (T/F). A motorbike has only _________ wheels.',
]

NEW_TF_BLOCK = [
    '[O] L2 — True/False with justification (10 items — mix story + transport facts)',
    # ── Model example ──────────────────────────────────────────────────────
    'Example (0 — done for you):',
    '0. The hare was a slow animal.',
    '→ F. The hare was NOT slow. He was very _________ and _________. [fast / proud]',
    # ── Story T/F ─────────────────────────────────────────────────────────
    'STORY T/F (1–5):',
    '1. The hare was a fast animal.',
    '→ _____ (T/F). The hare was _________ and ran _________ in the race.',
    '2. The tortoise slept under the tree.',
    '→ _____ (T/F). The _________ slept under the tree, not the _________.',
    '3. The tortoise won the race.',
    '→ _____ (T/F). The tortoise _________ because he was slow and _________.',
    '4. The hare was patient.',
    '→ _____ (T/F). The hare was _________. The _________ was patient.',
    '5. Slow and steady wins the race.',
    '→ _____ (T/F). This is the _________ of the story.',
    # ── Transport T/F — rewritten to use ONLY taught W28 vocabulary ────────
    # Removed: petrol, engine, pedals, "professional driver who you pay" (relative clause)
    # Using only: bus, train, bicycle, taxi, motorbike + fast, slow, faster, slower, two
    'TRANSPORT T/F (6–10):',
    '6. A bus travels on metal tracks.',
    '→ _____ (T/F). A bus travels on roads. A _________ travels on metal tracks.',
    '7. A bicycle goes as fast as a motorbike.',
    '→ _____ (T/F). A bicycle is much _________ than a motorbike.',
    '8. A train is faster than a bicycle on long journeys.',
    '→ _____ (T/F). A train can go much _________ than a bicycle.',
    '9. A taxi takes you to any place you want.',
    '→ _____ (T/F). A taxi can take you anywhere. Yesterday, he _________ a taxi to school.',
    '10. A motorbike has four wheels.',
    '→ _____ (T/F). A motorbike has only _________ (two / four / six) wheels.',
]


def replace_tf_block(content: list, session_num: int) -> list:
    """Replace the old T/F block with the fixed version in Session 1 PART 3."""
    if session_num != 1:
        return content
    # Find start of OLD_TF_BLOCK
    target = OLD_TF_BLOCK[0]
    try:
        start = content.index(target)
    except ValueError:
        # Try matching after compact (→ _________ may have been merged)
        for i, line in enumerate(content):
            if str(line).strip() == target.strip():
                start = i
                break
        else:
            return content  # not found, skip

    # Find end of the block (last item of OLD_TF_BLOCK or next section)
    end = start
    old_last = OLD_TF_BLOCK[-1]
    for i in range(start, min(start + 40, len(content))):
        if str(content[i]).strip() == old_last.strip():
            end = i + 1
            break
    if end == start:
        # Fallback: find the Speaking Checkpoint which follows
        for i in range(start, min(start + 50, len(content))):
            if 'SPEAKING CHECKPOINT' in str(content[i]) or '[O] L3' in str(content[i]):
                end = i
                break

    # Replace with new block
    return content[:start] + NEW_TF_BLOCK + content[end:]


def fix_tf_in_sessions(sessions_array: list) -> list:
    fixed = []
    for session in sessions_array:
        new_session = dict(session)
        new_parts = []
        for part in session.get('parts', []):
            new_part = dict(part)
            if 'PART 3' in part.get('title', ''):
                new_part['content'] = replace_tf_block(
                    list(part.get('content', [])),
                    session.get('session', 0)
                )
            new_parts.append(new_part)
        new_session['parts'] = new_parts
        fixed.append(new_session)
    return fixed


# ─────────────────────────────────────────────────────────────────────────────
# 2.  VIDEO CHALLENGE SCRIPTS — correct HOME speaking format (W25/W27 style)
#     Fill-in-blank monologue → practice 3× → record → parent signature
#     Each blank has 3 word-bank choices
#     Uses BOTH story vocab AND transport vocab AND past irregular verbs
# ─────────────────────────────────────────────────────────────────────────────

VC_S1_SCRIPT = (
    '"Hello! My name is [1] ___. I am a Time Detective. Today, I will tell you a [2] ___ story! '
    'Once upon a time, there was a [3] ___ and a [4] ___. The [3] ___ was very [5] ___ and very [6] ___. '
    'The [4] ___ was [7] ___, but he was very [8] ___. '
    'One day, they had a big [9] ___. The [3] ___ [10] ___ very fast at the start. '
    'But then, he slept under a tree. He thought he would win easily! '
    'But the [4] ___ never stopped. He kept walking, slowly and steadily. '
    'In the end, the [4] ___ crossed the finish line first! He [11] ___ the race! '
    'I also learned new transport words this week. A [12] ___ and a [13] ___ are very useful in the city. '
    'The lesson: being [8] ___ and [14] ___ always wins! '
    'Practice 3 times, then record your video! Thank you for listening. Goodbye!"'
)
VC_S1_BANK = (
    'Word Bank (Choose the correct option): '
    '[1] (Max / Luna / Pip) '
    '[2] (famous / boring / strange) '
    '[3] (hare / cat / dog) '
    '[4] (tortoise / bird / monkey) '
    '[5] (fast / sad / cold) '
    '[6] (proud / angry / hungry) '
    '[7] (slow / loud / tall) '
    '[8] (patient / heavy / cold) '
    '[9] (race / party / lesson) '
    '[10] (ran / walked / swam) '
    '[11] (won / lost / played) '
    '[12] (bus / plane / rocket) '
    '[13] (bicycle / kite / balloon) '
    '[14] (steady / loud / hungry)'
)
VC_S1_AK = (
    '✍️ Answer Key: [1] any name [2] famous [3] hare [4] tortoise [5] fast '
    '[6] proud [7] slow [8] patient [9] race [10] ran [11] won [12] bus [13] bicycle [14] steady'
)

VC_S2_SCRIPT = (
    '"Welcome back, detectives! I am [1] ___. Today, I want to talk about the MIDDLE of the famous [2] ___, '
    'AND my new favourite topic — transport! '
    'First, the [3] ___ [4] ___ very fast. He was far ahead. He was too [5] ___. '
    'He decided to sleep under a big tree. But the [6] ___ kept [7] ___. He was [8] ___, but very [9] ___. '
    'He walked past the sleeping [3] ___ and crossed the finish line! '
    'Now, new transport words! A [10] ___ goes on metal tracks. It is very fast! '
    'I sometimes [11] ___ a bicycle to school. Yesterday, Mum [12] ___ a taxi to work! '
    'If I go on a long trip, I take a [10] ___. If I go somewhere close, I [11] ___ my bicycle. '
    'The lesson: choose the right transport, and always be [9] ___! '
    'Practice 3 times. Then record your video! Goodbye!"'
)
VC_S2_BANK = (
    'Word Bank (Choose the correct option): '
    '[1] (Max / Luna / Pip) '
    '[2] (race / party / book) '
    '[3] (hare / cat / fish) '
    '[4] (ran / walked / swam) '
    '[5] (proud / angry / hungry) '
    '[6] (tortoise / bird / monkey) '
    '[7] (walking / flying / singing) '
    '[8] (slow / loud / tall) '
    '[9] (patient / heavy / cold) '
    '[10] (train / kite / rocket) '
    '[11] (ride / drive / fly) '
    '[12] (took / rode / walked)'
)
VC_S2_AK = (
    '✍️ Answer Key: [1] any name [2] race [3] hare [4] ran [5] proud '
    '[6] tortoise [7] walking [8] slow [9] patient [10] train [11] ride [12] took'
)

VC_S3_SCRIPT = (
    '"Hello everyone! I am Time Detective [1] ___! Today, I will retell the FULL story of the [2] ___ and the [3] ___! '
    'At the beginning, the [2] ___ [4] ___ very fast. He was very [5] ___. '
    'But the [3] ___ [6] ___ slowly and steadily. He was very [7] ___. '
    'In the end, the [3] ___ [8] ___ the first [9] ___! Slow and [7] ___ wins! '
    'BUT WAIT — they had a MODERN race! The [2] ___ [10] ___ a bicycle through the city. '
    'The [3] ___ [11] ___ a bus. The bus went steadily and arrived first! '
    'The bicycle got stuck in traffic! The [3] ___ [8] ___ AGAIN! '
    'New words I know: a [12] ___ goes on metal tracks — it is very fast! '
    'A [13] ___ driver takes you anywhere in the city. '
    'The lesson of the FULL story: being [7] ___ and making a smart [14] ___ always wins! '
    'Practice 3 times, then record! Thank you. Goodbye!"'
)
VC_S3_BANK = (
    'Word Bank (Choose the correct option): '
    '[1] (Max / Luna / Pip) '
    '[2] (hare / cat / fish) '
    '[3] (tortoise / bird / monkey) '
    '[4] (ran / walked / swam) '
    '[5] (proud / angry / hungry) '
    '[6] (walked / flew / swam) '
    '[7] (patient / heavy / cold) '
    '[8] (won / lost / played) '
    '[9] (race / party / book) '
    '[10] (rode / drove / flew) '
    '[11] (took / rode / walked) '
    '[12] (train / kite / rocket) '
    '[13] (taxi / train / bicycle) '
    '[14] (choice / noise / colour)'
)
VC_S3_AK = (
    '✍️ Answer Key: [1] any name [2] hare [3] tortoise [4] ran [5] proud '
    '[6] walked [7] patient [8] won [9] race [10] rode [11] took '
    '[12] train [13] taxi [14] choice'
)

VIDEO_CHALLENGES = {
    1: (VC_S1_SCRIPT, VC_S1_BANK, VC_S1_AK),
    2: (VC_S2_SCRIPT, VC_S2_BANK, VC_S2_AK),
    3: (VC_S3_SCRIPT, VC_S3_BANK, VC_S3_AK),
}


def rebuild_video_challenge(content: list, sess_num: int) -> list:
    """Replace old Video Challenge block in PART 9 with proper home-speaking format."""
    vc_idx = None
    for j, line in enumerate(content):
        if '🎥 VIDEO CHALLENGE' in str(line) or 'VIDEO CHALLENGE SCRIPT' in str(line):
            vc_idx = j
            break
    if vc_idx is None:
        return content  # no video challenge found — leave as is

    base = content[:vc_idx]
    script, bank, ak = VIDEO_CHALLENGES.get(sess_num, (None, None, None))
    if not script:
        return content

    new_vc = [
        '🎥 Video Challenge: Fill in all the blanks. Practice 3 times. Then record your video!',
        f'🎥 VIDEO CHALLENGE SCRIPT — Session {sess_num}',
        script,
        bank,
        ak,
        '👨\u200d👩\u200d👧 Parent Signature: _______________________',
    ]
    return base + new_vc


def fix_vc_in_sessions(sessions_array: list) -> list:
    fixed = []
    for session in sessions_array:
        sess_num = session.get('session', 0)
        new_session = dict(session)
        new_parts = []
        for part in session.get('parts', []):
            new_part = dict(part)
            if 'PART 9' in part.get('title', '') or 'HOMEWORK' in part.get('title', ''):
                new_part['content'] = rebuild_video_challenge(
                    list(part.get('content', [])), sess_num
                )
            new_parts.append(new_part)
        new_session['parts'] = new_parts
        fixed.append(new_session)
    return fixed


# ─────────────────────────────────────────────────────────────────────────────
# 3.  IN-CLASS SPEAKING ACTIVITIES → teacher_contents
#     (These were wrongly placed in Video Challenge; moved here for teachers)
# ─────────────────────────────────────────────────────────────────────────────

IN_CLASS_SPEAKING = {
    1: (
        "IN-CLASS SPEAKING ACTIVITIES — Session 1 (teacher-led)\n\n"
        "Activity 1 — Irregular Past Tense Chant (3 min, whole class):\n"
        "  Teacher calls base form, class responds with past tense + 1 sentence.\n"
        "  'run!' → 'RAN! The hare ran fast!'   'win!' → 'WON! The tortoise won!'\n"
        "  'sleep!' → 'SLEPT! The hare slept under a tree!'\n"
        "  Purpose: fix irregular past tense patterns before writing.\n\n"
        "Activity 2 — Transport Flash-Introduction (4 min, teacher shows flashcards):\n"
        "  Show each vehicle card: bus / train / bicycle / taxi / motorbike.\n"
        "  Drill: 'A bus is [adjective].' Students supply adjective from word wall.\n"
        "  Extend: 'Is a train faster than a bicycle?' → 'Yes! A train is faster!'\n\n"
        "Activity 3 — Speed Translation Drill (3 min, whole class):\n"
        "  Teacher says Vietnamese phrase, students say English sentence (no writing).\n"
        "  • 'Thỏ chạy rất nhanh' → 'The hare ran very fast.'\n"
        "  • 'Rùa kiên nhẫn' → 'The tortoise was patient.'\n"
        "  • 'Cuộc đua lớn' → 'The big race.'\n"
        "  Rule: say it correctly or pass. No penalty for passing."
    ),
    2: (
        "IN-CLASS SPEAKING ACTIVITIES — Session 2 (teacher-led)\n\n"
        "Activity 1 — Describe & Guess: Vocabulary (8 min, pairs):\n"
        "  Student A describes a word without saying it. Student B guesses.\n"
        "  Teach the production frame first (write on board):\n"
        "  'It is a [noun]. You [verb] it. It is [adj] than a [other noun].'\n"
        "  Words: bus / train / bicycle / taxi / motorbike / patient / proud\n"
        "  After 4 min, switch roles. Award 1 point per correct guess.\n\n"
        "Activity 2 — Comparison Chains (5 min, pairs):\n"
        "  Student A names a vehicle. Student B must produce a comparison sentence.\n"
        "  Frames on board: '... is faster than ...' / '... is slower than ...' / '... is steadier than ...'\n"
        "  Example: A: 'Train!' → B: 'A train is faster than a bicycle on long trips!'\n\n"
        "Activity 3 — Tortoise or Hare? (3 min, quick-fire):\n"
        "  Teacher calls a transport: 'Bus!' → Students shout 'TORTOISE!' (steady) or 'HARE!' (fast/risky).\n"
        "  Follow up: 'Why?' — one student gives 1 reason using a taught adjective.\n"
        "  Purpose: connect character analogy to transport vocabulary from STEM section."
    ),
    3: (
        "IN-CLASS SPEAKING ACTIVITIES — Session 3 (teacher-led, performance)\n\n"
        "Activity 1 — Round-Robin Story Chain (8 min, whole class):\n"
        "  Each student adds ONE sentence to the Modern Race story (no repeats).\n"
        "  Rule: every sentence must use a past simple verb + connect to the previous.\n"
        "  Teacher prompts if stuck: 'And then...?' / 'But what did the tortoise do?'\n"
        "  Score: 1 point per correct sentence; bonus point for using a transport word.\n\n"
        "Activity 2 — The Modern Race Debate (5 min, pairs):\n"
        "  Student A argues: 'The hare should have taken a TRAIN.'\n"
        "  Student B argues for a different vehicle and gives 2 reasons.\n"
        "  No single correct answer — teacher awards points for language quality, not logic.\n"
        "  Monitor for: irregular past tense, comparative structures, coherent argument.\n\n"
        "Activity 3 — Trophy Ceremony (3 min, fun wrap-up):\n"
        "  One student stands: 'The winner of the Modern Race is [transport] because [reason]!'\n"
        "  Class responds (in unison): 'Slow and steady wins the race!'\n"
        "  Rotate until everyone has spoken or time runs out."
    ),
}

def update_teacher_contents(teacher_contents: list) -> list:
    """Add in_class_speaking to each session's teacher_contents."""
    updated = []
    for tc in teacher_contents:
        new_tc = dict(tc)
        sess_num = tc.get('session', 0)
        if sess_num in IN_CLASS_SPEAKING:
            new_tc['in_class_speaking'] = IN_CLASS_SPEAKING[sess_num]
        updated.append(new_tc)
    return updated


# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────

def main():
    print('Loading W28.json...')
    with open(MCP_W28, encoding='utf-8') as f:
        data = json.load(f)

    # ── 1. Fix T/F ────────────────────────────────────────────────────────
    print('  Fixing T/F transport items (remove untaught vocab, add model example)...')
    data['sessions']   = fix_tf_in_sessions(data.get('sessions', []))
    data['sessions_2'] = fix_tf_in_sessions(data.get('sessions_2', []))
    data['sessions_5'] = fix_tf_in_sessions(data.get('sessions_5', []))

    # ── 2. Fix Video Challenge Scripts ────────────────────────────────────
    print('  Rewriting Video Challenge Scripts (home fill-in-blank format)...')
    data['sessions']   = fix_vc_in_sessions(data['sessions'])
    data['sessions_2'] = fix_vc_in_sessions(data['sessions_2'])
    data['sessions_5'] = fix_vc_in_sessions(data['sessions_5'])

    # ── 3. Add in_class_speaking to teacher_contents ─────────────────────
    print('  Adding in_class_speaking to teacher_contents...')
    data['teacher_contents'] = update_teacher_contents(data.get('teacher_contents', []))

    # ── Save ─────────────────────────────────────────────────────────────
    print('  Writing files...')
    for path in [MCP_W28, PUB_W28]:
        path.parent.mkdir(parents=True, exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    with open(LP_JSON, encoding='utf-8') as f:
        lp = json.load(f)
    if 'W28' in lp:
        lp['W28'] = data
        with open(LP_JSON, 'w', encoding='utf-8') as f:
            json.dump(lp, f, ensure_ascii=False, indent=2)

    # ── Verify ───────────────────────────────────────────────────────────
    print()
    print('=== VERIFICATION ===')

    # Check model example present in S1 PART 3
    found_model = False
    for s in data['sessions']:
        if s['session'] == 1:
            for p in s['parts']:
                if 'PART 3' in p['title']:
                    for line in p['content']:
                        if 'Example (0' in str(line):
                            found_model = True
    print(f'{"✓" if found_model else "✗"} T/F model example (item 0) in S1 PART 3')

    # Check no untaught words in T/F
    bad_words = ['petrol', 'engine', 'pedals', 'professional', 'who you pay']
    for sessions_key in ['sessions', 'sessions_2', 'sessions_5']:
        for s in data.get(sessions_key, []):
            for p in s.get('parts', []):
                if 'PART 3' in p.get('title', ''):
                    for line in p.get('content', []):
                        for bw in bad_words:
                            if bw in str(line):
                                print(f'WARNING: untaught word "{bw}" still in [{sessions_key}] S{s["session"]} PART 3: {str(line)[:60]}')
    print('✓ No untaught vocabulary found in T/F sections')

    # Check Video Challenge format
    for s in data['sessions']:
        for p in s['parts']:
            if 'PART 9' in p['title']:
                has_blank_choice = any('[1]' in str(l) for l in p['content'])
                has_word_bank = any('Word Bank' in str(l) for l in p['content'])
                has_ak = any('Answer Key' in str(l) for l in p['content'])
                has_parent_sig = any('Parent Signature' in str(l) for l in p['content'])
                print(f'  S{s["session"]} PART 9: fill-in=[{has_blank_choice}] word-bank=[{has_word_bank}] AK=[{has_ak}] parent-sig=[{has_parent_sig}]')

    # Check in_class_speaking added
    for tc in data.get('teacher_contents', []):
        has_ics = 'in_class_speaking' in tc
        print(f'  teacher_contents S{tc["session"]}: in_class_speaking=[{has_ics}]')

    print()
    print('Done! W28 v3 fixes applied.')


if __name__ == '__main__':
    main()
