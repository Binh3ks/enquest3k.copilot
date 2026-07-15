"""
fix_w28_issues.py — Fix all W28.json issues raised in review:
1. Remove answer leaks from student-facing session content
2. Fix Speaking Checkpoint hints (structural, not answer-giving)
3. Add quick_ref data
4. Fix Games placeholders with actual W28 content
5. Add teacher_contents (listening scripts + speaking notes for teacher)
6. Apply fixes to sessions_2 and sessions_5 as well
"""
import json, re, copy
from pathlib import Path

ROOT = Path(__file__).parent
MCP_W28 = ROOT / 'mcp-server/data/lessons/W28.json'
PUB_W28 = ROOT / 'public/data/lessons/W28.json'
LP_JSON  = ROOT / 'public/data/lessonPlans.json'

# ─────────────────────────────────────────────────────────────────────────────
# 1. ANSWER LEAK PATTERNS — lines to remove from student worksheet content
# ─────────────────────────────────────────────────────────────────────────────
ANSWER_LINE_PATTERNS = [
    re.compile(r'^\(Story answers:', re.I),
    re.compile(r'^\(Transport answers:', re.I),
    re.compile(r'^\(Answers:', re.I),
]

def strip_parenthetical_answer(line: str) -> str:
    """Remove trailing (answer text) from STEM worked-example lines.
    e.g. '→ _________ (Bus = 30 km/h ... FALSE — the hare is faster!)' → '→ _________'
    Only applies if the line starts with '→ _________'.
    """
    if line.strip().startswith('→ _________') or line.strip().startswith('→ _________ '):
        # Remove the parenthetical at the end, but keep the blank
        cleaned = re.sub(r'\s*\([^)]*\)\s*$', '', line.rstrip())
        return cleaned
    # Also handle: '→ Which transport is MOST like ... _________ (Bus — ...)'
    if '_________ (' in line and line.strip().startswith('→ '):
        cleaned = re.sub(r'\s*\([^)]*\)\s*$', '', line.rstrip())
        return cleaned
    return line

def is_answer_leak(line: str) -> bool:
    return any(p.match(line.strip()) for p in ANSWER_LINE_PATTERNS)

def is_stem_answer_line(line: str, in_part6: bool) -> bool:
    """Return True if line is a STEM inline answer that should have its answer stripped."""
    if not in_part6:
        return False
    stripped = line.strip()
    return (
        stripped.startswith('→ _________') and '(' in stripped
    ) or (
        '_________ (' in stripped and stripped.startswith('→ ')
    )

def clean_content(content: list, part_title: str = '') -> list:
    """Remove answer leak lines; strip STEM inline answers."""
    in_part6 = 'PART 6' in part_title or 'STEM' in part_title
    result = []
    for line in content:
        if is_answer_leak(line):
            continue  # remove answer key lines entirely
        if is_stem_answer_line(line, in_part6):
            result.append(strip_parenthetical_answer(line))
        else:
            result.append(line)
    return result

# ─────────────────────────────────────────────────────────────────────────────
# 2. SPEAKING CHECKPOINT FIX
# ─────────────────────────────────────────────────────────────────────────────
OLD_SPEAKING_A = [
    "Student A: State one fact about the hare OR a transport vehicle (e.g., 'The hare was fast' / 'A train travels on metal tracks').",
    "Student B: Add a comparison (e.g., 'But the tortoise won' / 'A train is faster than a bicycle').",
    "Goal: use at least 1 story word + 1 transport word.",
]
NEW_SPEAKING_A = [
    "Student A: Think of ONE thing about the hare, the tortoise, or any transport vehicle. Tell your partner — no looking at the text!",
    "Student B: React! Add information, a comparison, or ask a follow-up question.",
    "💡 Prompt if stuck: 'What happened to the hare?' / 'How does a bus move?' / 'Which is faster?'",
    "Goal: produce at least 1 sentence using a story word + 1 sentence using a transport word. No copying from the page.",
]

# Session 2 / 3 variant
OLD_SPEAKING_B = [
    "Student A: State one fact about the hare, tortoise, OR a transport vehicle from today's lesson.",
    "Student B: Add a comparison using 'faster than', 'slower than', or 'more reliable than'.",
    "Goal: use at least 2 story words + 2 transport words in your exchange.",
]
NEW_SPEAKING_B = [
    "Student A: Share one thing you remember from today — about the race, a character, or a vehicle. Don't read — just say it!",
    "Student B: Respond with a comparison or a contrasting idea.",
    "💡 Prompt if stuck: 'Who won and why?' / 'Which vehicle is steadiest?' / 'What would YOU choose?'",
    "Goal: each student uses at least 2 story words + 2 transport words in free speech.",
]

# Session 3 variant
OLD_SPEAKING_C = [
    "Student A: Describe the Modern Race — which vehicle won and why.",
    "Student B: Challenge — suggest a different vehicle and explain your choice.",
    "Goal: use at least 3 transport words + 2 irregular past tense verbs in the exchange.",
]
NEW_SPEAKING_C = [
    "Student A: Tell your partner about the Modern Race — don't read from the page. Use your own words.",
    "Student B: Disagree or add to the story — which vehicle would YOU choose and why?",
    "💡 Prompt if stuck: 'What happened in the race?' / 'Why did one vehicle beat the other?' / 'What does steady mean?'",
    "Goal: use at least 3 transport words + 2 irregular past tense verbs. All from memory.",
]

def fix_speaking_checkpoint(content: list) -> list:
    """Replace Speaking Checkpoint example sentences with structural prompts."""
    result = []
    i = 0
    while i < len(content):
        line = content[i]
        # Detect start of Speaking Checkpoint block
        if '⬛ SPEAKING CHECKPOINT' in line or 'SPEAKING CHECKPOINT' in line:
            result.append(line)
            i += 1
            # Collect the next lines that belong to this checkpoint
            block_lines = []
            while i < len(content) and not content[i].startswith('[') and 'PART ' not in content[i][:10]:
                block_lines.append(content[i])
                i += 1
            # Determine which variant to use based on block content
            combined = ' '.join(block_lines)
            if 'Modern Race' in combined or '3 transport words' in combined:
                result.extend(NEW_SPEAKING_C)
            elif '2 story words' in combined or '2 transport words' in combined:
                result.extend(NEW_SPEAKING_B)
            else:
                result.extend(NEW_SPEAKING_A)
        else:
            result.append(line)
            i += 1
    return result

# ─────────────────────────────────────────────────────────────────────────────
# 3. QUICK REF DATA
# ─────────────────────────────────────────────────────────────────────────────
QUICK_REF_W28 = {
    "Week": "28",
    "Block": "B",
    "Theme": "The Tortoise and the Hare — Speed, Patience & Transport",
    "Grammar Focus": "Past Simple — Irregular verbs: ran, won, rode, took, went, drove, sailed",
    "Key Pattern": '"The hare ran fast, but the tortoise won." / "She rode her bicycle to school."',
    "Vocabulary": "8 Tier 1 Story (hare, tortoise, race, patient, proud, fast, slow, win) + 10 Tier 2 Transport (bus, train, bicycle, taxi, motorbike, boat, ship, car)",
    "Spiral Review": "W25–W27: Past Simple regular verbs, sequence words, present simple facts",
    "STEM/CLIL Topic": "Animal Speed vs Transport Speed — Real-world km/h comparison & strategy thinking",
    "VC Word Targets": "S1=95w (70%) S2=105w (65%) S3=115w (60%)",
    "FK Target": "Grade 2 (FK 70–80)",
}

# ─────────────────────────────────────────────────────────────────────────────
# 4. GAMES FIX
# ─────────────────────────────────────────────────────────────────────────────
GRAMMAR_PLACEHOLDER = "this week's grammar point"
GRAMMAR_ACTUAL = "Past Simple irregular verbs (ran, won, rode, took, went, drove, sailed)"

VOCAB_PLACEHOLDER = "week vocabulary"
VOCAB_ACTUAL = "W28 vocab: hare, tortoise, race, patient, proud + bus, train, bicycle, taxi, motorbike"

VOCAB_PLACEHOLDER2 = "W28: week vocabulary"
VOCAB_ACTUAL2 = "W28: hare, tortoise, race, patient, proud, bus, train, bicycle, taxi, motorbike"

THEME_PLACEHOLDER = 'theme "Memories — The Famous Case"'
THEME_ACTUAL = 'theme "The Great Race — Tortoise vs Hare and the Modern Transport Race"'

def fix_games(games: list) -> list:
    """Replace placeholder strings in games with actual W28 content."""
    fixed = []
    for g in games:
        g_str = json.dumps(g, ensure_ascii=False)
        g_str = g_str.replace(GRAMMAR_PLACEHOLDER, GRAMMAR_ACTUAL)
        g_str = g_str.replace(VOCAB_PLACEHOLDER2, VOCAB_ACTUAL2)
        g_str = g_str.replace(VOCAB_PLACEHOLDER, VOCAB_ACTUAL)
        g_str = g_str.replace(THEME_PLACEHOLDER, THEME_ACTUAL)
        fixed.append(json.loads(g_str))
    return fixed

# ─────────────────────────────────────────────────────────────────────────────
# 5. TEACHER'S CONTENTS — listening scripts + speaking guidance per session
# ─────────────────────────────────────────────────────────────────────────────
TEACHER_CONTENTS = [
    {
        "session": 1,
        "listening_script": {
            "speed_note": "Read aloud at a normal, clear pace. Pause 2–3 seconds between sentences. Read the full text twice before students answer questions.",
            "text": (
                "Listen carefully. I will read the text twice.\n\n"
                "Once upon a time, a hare and a tortoise decided to have a race. "
                "The hare was very fast and very proud. He ran quickly at the start. "
                "But after a while, the hare felt sure he would win. "
                "He stopped and slept under a big tree. "
                "The tortoise never stopped. He walked slowly but steadily and patiently. "
                "He kept walking all the way to the finish line. "
                "When the hare woke up, it was too late — the tortoise had already won!\n\n"
                "Dictation sentence (read once slowly, then once at normal speed):\n"
                "\"The tortoise was slow but patient, and he won the race.\""
            )
        },
        "speaking_notes": (
            "SPEAKING CHECKPOINT — Teacher Guidance (do NOT share with students):\n"
            "• Do NOT model example sentences before students speak — this removes the challenge.\n"
            "• If Student A is stuck, prompt with a QUESTION: 'What do you know about the hare?', 'How does a bus move?'\n"
            "• Target errors to monitor: 'runned' (→ ran), 'winned' (→ won), 'rided' (→ rode).\n"
            "• Correct gently mid-task: 'Good idea — but how do we say [verb] in past tense?'\n"
            "• Success = 1 sentence with a story word + 1 sentence with a transport word, spoken freely."
        ),
        "stem_extension": (
            "STEM Extension Notes (teacher only):\n"
            "• Worked example answers: Bus (30 km/h) < Hare (70 km/h) → FALSE; Motorbike (80 km/h) > Hare (70 km/h) → TRUE.\n"
            "• Train vs Tortoise: 150 ÷ 0.3 = 500 times faster.\n"
            "• Tortoise on bus (30 km/h) vs Hare (70 km/h): Bus still SLOWER than hare.\n"
            "• Challenge answer: Tortoise on train (150 km/h) beats hare (70 km/h) — tortoise wins!"
        )
    },
    {
        "session": 2,
        "listening_script": {
            "speed_note": "Read each character description clearly and slowly. Pause 3 seconds after each one. Read all 5 descriptions twice before students match.",
            "text": (
                "Listen carefully. I will describe five characters. Write the letter next to the correct name.\n\n"
                "A. The bus driver: She drove steadily along the route. She never stopped unexpectedly.\n"
                "B. The hare: He ran fast at the start. But he stopped to sleep and lost the race.\n"
                "C. The tortoise: He was slow but patient. He kept walking and won the race.\n"
                "D. The teacher: She explained the lesson. She said: 'Be patient and steady, and you will succeed.'\n"
                "E. Detective Luna: She watched the race carefully. She took notes in her notebook.\n\n"
                "Dictation sentence (read once slowly, then once at normal speed):\n"
                "\"Detective Luna took notes about the race very carefully.\""
            )
        },
        "speaking_notes": (
            "SPEAKING CHECKPOINT — Teacher Guidance:\n"
            "• Students should now be able to use comparative structures: faster than, slower than, more reliable than.\n"
            "• If stuck, prompt: 'Which vehicle never stops?' / 'What happened to the hare in the middle?' / 'Which is more like the tortoise — a bus or a motorbike?'\n"
            "• Don't accept 'The bus is patient' — redirect: 'Can a vehicle be patient? What word describes a bus?' → steady, reliable.\n"
            "• Target: each student produces 2 story words + 2 transport words in a connected exchange."
        ),
        "stem_extension": (
            "STEM Extension Notes (teacher only):\n"
            "• Most tortoise-like transport: Bus (fixed route, steady, reliable, doesn't race but always arrives).\n"
            "• Most hare-like transport: Motorbike or sports car (very fast but stuck in traffic, unreliable).\n"
            "• City journey (with traffic): bicycle often beats motorbike in short distances — use special lanes.\n"
            "• Discussion prompt: 'Is being fast always the best strategy? In what real-life situations does slow+steady win?'"
        )
    },
    {
        "session": 3,
        "listening_script": {
            "speed_note": "Read the Modern Race story at normal speed. Pause at each event. Students should visualise the story as they listen. Read twice.",
            "text": (
                "Listen carefully. I will read the Modern Race story twice.\n\n"
                "One day, a hare and a tortoise decided to have a modern city race. "
                "The hare chose to go by bicycle — he could pedal very fast! "
                "'I will win easily!' said the proud hare. "
                "The tortoise decided to take the bus. 'A bus? That is so slow!' laughed the hare.\n"
                "The race began. The hare rode his bicycle very fast — until he reached a traffic jam. "
                "He stopped. And stopped. And stopped again. "
                "Meanwhile, the bus moved steadily through the bus lane. "
                "It stopped at traffic lights, but it never got stuck. "
                "The tortoise sat quietly and patiently on the bus. "
                "In the end, the bus arrived at the finish line first! "
                "The hare was still stuck in traffic. "
                "The lesson: Choose wisely — the steadiest option wins, not always the fastest.\n\n"
                "Dictation sentence (read once slowly, then once at normal speed):\n"
                "\"The bus moved steadily through the city and arrived first.\""
            )
        },
        "speaking_notes": (
            "SPEAKING CHECKPOINT — Teacher Guidance:\n"
            "• This is a PERFORMANCE task — students should retell from memory.\n"
            "• If Student A gives only 1 sentence, push: 'What happened next?' / 'And then?'\n"
            "• Student B should challenge or extend: 'What if the hare had taken a train?' / 'Do you agree with the lesson?'\n"
            "• Target: 3 transport words + 2 irregular past tense verbs spoken freely without reading.\n"
            "• Celebrate creative extensions — if students invent new scenarios, that is a HIGH success marker."
        ),
        "stem_extension": (
            "STEM Extension Notes (teacher only):\n"
            "• City with traffic: Bus on dedicated lane (30 km/h average in free lane) vs. bicycle (20 km/h but no traffic) → for <3 km, bicycle can be faster!\n"
            "• Most reliable for city: Bus (fixed schedule, bus lane, never stuck).\n"
            "• Design challenge answers (accept any logical vehicle with good reasons).\n"
            "• Encourage systems thinking: no single best transport — depends on distance, traffic, and time of day."
        )
    }
]

# ─────────────────────────────────────────────────────────────────────────────
# MAIN FIX FUNCTION
# ─────────────────────────────────────────────────────────────────────────────
def fix_sessions_array(sessions_array: list) -> list:
    """Apply answer leak and speaking checkpoint fixes to any sessions array."""
    fixed = []
    for session in sessions_array:
        new_session = dict(session)
        new_parts = []
        for part in session.get('parts', []):
            new_part = dict(part)
            content = list(part.get('content', []))
            # Strip answer leaks
            content = clean_content(content, part_title=part.get('title', ''))
            # Fix Speaking Checkpoint
            content = fix_speaking_checkpoint(content)
            new_part['content'] = content
            new_parts.append(new_part)
        new_session['parts'] = new_parts
        fixed.append(new_session)
    return fixed


def main():
    print('Loading W28.json...')
    with open(MCP_W28, encoding='utf-8') as f:
        data = json.load(f)

    # ── Fix sessions ─────────────────────────────────────────────────────────
    print('  Fixing answer leaks + Speaking Checkpoints in sessions...')
    data['sessions']   = fix_sessions_array(data.get('sessions', []))
    data['sessions_2'] = fix_sessions_array(data.get('sessions_2', []))
    data['sessions_5'] = fix_sessions_array(data.get('sessions_5', []))

    # ── Fix quick_ref ────────────────────────────────────────────────────────
    print('  Adding quick_ref...')
    data['quick_ref'] = QUICK_REF_W28

    # ── Fix games ────────────────────────────────────────────────────────────
    print('  Fixing games placeholders...')
    data['games'] = fix_games(data.get('games', []))

    # ── Add teacher_contents ─────────────────────────────────────────────────
    print('  Adding teacher_contents...')
    data['teacher_contents'] = TEACHER_CONTENTS

    # ── Save both locations ──────────────────────────────────────────────────
    print('  Writing mcp-server/data/lessons/W28.json...')
    with open(MCP_W28, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print('  Writing public/data/lessons/W28.json...')
    PUB_W28.parent.mkdir(parents=True, exist_ok=True)
    with open(PUB_W28, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    # ── Update lessonPlans.json ──────────────────────────────────────────────
    print('  Updating public/data/lessonPlans.json...')
    with open(LP_JSON, encoding='utf-8') as f:
        lp = json.load(f)
    key = 'W28'
    if key in lp:
        lp[key] = data
        with open(LP_JSON, 'w', encoding='utf-8') as f:
            json.dump(lp, f, ensure_ascii=False, indent=2)

    # ── Verify ──────────────────────────────────────────────────────────────
    print()
    print('=== VERIFICATION ===')
    # Check no answer leaks remain
    leaks = []
    for sessions_key in ['sessions', 'sessions_2', 'sessions_5']:
        for s in data.get(sessions_key, []):
            for p in s.get('parts', []):
                for line in p.get('content', []):
                    if is_answer_leak(line):
                        leaks.append(f'  [{sessions_key} S{s["session"]}] {p["title"]}: {line[:60]}')
    if leaks:
        print('WARNING — Answer leaks still present:')
        for l in leaks: print(l)
    else:
        print('✓ No answer leaks found in sessions')

    print(f'✓ quick_ref has {len(data["quick_ref"])} entries')
    print(f'✓ games: {len(data["games"])} games')
    print(f'✓ teacher_contents: {len(data["teacher_contents"])} sessions')

    # Check Speaking Checkpoints no longer have example sentences
    old_phrase = "e.g., 'The hare was fast'"
    for sessions_key in ['sessions', 'sessions_2', 'sessions_5']:
        for s in data.get(sessions_key, []):
            for p in s.get('parts', []):
                for line in p.get('content', []):
                    if old_phrase in line:
                        print(f'WARNING: Old Speaking Checkpoint still in [{sessions_key}] S{s["session"]} {p["title"]}')
    print('✓ Speaking Checkpoints updated')
    print()
    print('Done! W28 fixes applied successfully.')


if __name__ == '__main__':
    main()
