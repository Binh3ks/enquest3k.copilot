"""
Fix reading exercise sections across all affected weeks:
1. Remove story copy below Title: → replace with re-read instruction
   (when exercise story matches blue box passage)
2. Keep variant stories for sessions 2/3 (different from blue box)
3. Add Stage questions to W29 sessions 1/2/3 (completely missing)
4. Fix wrong Stage questions in W30 session 1 (Max/Luna → class/Sam/Lisa)
5. Fix wrong Stage questions in W31 session 1 (Max forest → Maya market)
"""
import json, re
from pathlib import Path
from copy import deepcopy

PUBLIC = Path("/Users/binhnguyen/Downloads/Engquest3k/public/data/lessons")
MCP    = Path("/Users/binhnguyen/Downloads/Engquest3k/mcp-server/data/lessons")

INSTRUCTION = "(↑ Re-read the story above to answer:)"

# ─────────────────────────────────────────────────────────────────────────────
# New Stage questions for W29/30/31
# ─────────────────────────────────────────────────────────────────────────────

QUESTIONS = {
    # (week, session_index): [question lines]
    (29, 0): [
        "Stage 1 — Global:",
        "T / F: The friends travelled by bus.",
        "T / F: They swam in the sea.",
        "What is the main topic?",
        "____________________________________________________________",
        "Stage 2 — Detail:",
        "How did the friends travel to the island?",
        "→ ____________________________________________________________",
        "What did they do when they reached the island?",
        "→ ____________________________________________________________",
        "Fill-in from text: They flew _______________ over the mountains.",
        '[O] Stage 3B — Inference: Why did they say "That was the best trip!"?',
        "[ Sub-total: ___ / 6 ]",
    ],
    (29, 1): [
        "Stage 1 — Global:",
        "T / F: Luna's family went by airplane.",
        "T / F: An eagle flew over their heads.",
        "What is the main topic?",
        "____________________________________________________________",
        "Stage 2 — Detail:",
        "How did Luna's family travel to the mountain?",
        "→ ____________________________________________________________",
        "What animal said hello to Luna?",
        "→ ____________________________________________________________",
        'Fill-in from text: "The trip was _______________!" said Luna.',
        "[O] Stage 3B — Inference: Why does Luna want to go to the mountain again?",
        "[ Sub-total: ___ / 6 ]",
    ],
    (29, 2): [
        "Stage 1 — Global:",
        "T / F: The rabbit moved slowly.",
        "T / F: A butterfly flew in the air.",
        "What is the main topic?",
        "____________________________________________________________",
        "Stage 2 — Detail:",
        "What came out of the bushes first?",
        "→ ____________________________________________________________",
        "How did the turtle move?",
        "→ ____________________________________________________________",
        "Fill-in from text: Animals move in _______________ ways.",
        "[O] Stage 3B — Inference: What did Tom learn about how animals move?",
        "[ Sub-total: ___ / 6 ]",
    ],
    (30, 0): [
        "Stage 1 — Global (read once, no re-reading):",
        "T / F: The class had a picnic at the beach.",
        "T / F: Lisa gave her apple to a bird.",
        "What is the main topic?",
        "____________________________________________________________",
        "Stage 2 — Detail (re-read):",
        "What did Sam buy at the picnic?",
        "→ ____________________________________________________________",
        "What did Ben make?",
        "→ ____________________________________________________________",
        "Fill-in from text: The CHEF _______________ the sandwiches in the morning.",
        "[O] Stage 3B — Inference: Why did they run to the bus quickly?",
        "[ Sub-total: ___ / 6 ]",
    ],
    (31, 0): [
        "Stage 1 — Global:",
        "T / F: Maya went to the market alone.",
        "T / F: She tasted a piece of mango.",
        "What is the main topic?",
        "____________________________________________________________",
        "Stage 2 — Detail:",
        "What did Maya feel and touch at the market?",
        "→ ____________________________________________________________",
        "What did Maya smell?",
        "→ ____________________________________________________________",
        "Fill-in from text: She felt the soft _______________ cloth and the cold _______________ pots.",
        "[O] Stage 3B — Inference: How do we know Maya loves going to the market?",
        "[ Sub-total: ___ / 6 ]",
    ],
}

# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────

def ex_start_idx(content):
    """Find index where exercises start (Title: / Stage N / numbered)."""
    for i, l in enumerate(content):
        s = str(l).strip()
        if (s.startswith('Title:') or re.match(r'^Stage\s+\d', s) or
                re.match(r'^\d+[.)]\s', s)):
            return i
    return len(content)

def is_stage_question(line):
    s = str(line).strip()
    return (re.match(r'^Stage\s+\d', s) or s.startswith('T / F:') or
            s.startswith('→ ') or s.startswith('Fill-in') or
            s.startswith('What ') or s.startswith('Who ') or s.startswith('How ') or
            s.startswith('Why ') or s.startswith('[O]') or s.startswith('[ Sub-total'))

def normalize(text):
    return re.sub(r'[^a-z]', ' ', str(text).lower())

def overlap_ratio(lines_a, lines_b):
    """Fraction of words in lines_a that also appear in lines_b."""
    words_a = set(normalize(' '.join(str(l) for l in lines_a)).split())
    words_b = set(normalize(' '.join(str(l) for l in lines_b)).split())
    if not words_a:
        return 0.0
    return len(words_a & words_b) / len(words_a)

def fix_session_reading(content, wn, si):
    """
    Fix the reading part content for a given week/session index.
    Returns updated content (or same content if no fix needed).
    """
    ei = ex_start_idx(content)
    blue_box = content[:ei]  # includes blank line at end
    exercises = content[ei:]  # starts from Title:

    if not exercises or not str(exercises[0]).strip().startswith('Title:'):
        return content  # no Title: found, skip

    # Find what's between Title: and first Stage question
    title_idx = 0  # exercises[0] is Title:
    story_start = 1
    stage_start = next(
        (i for i, l in enumerate(exercises[1:], 1)
         if re.match(r'^Stage\s+\d', str(l).strip()) or
         str(l).strip().startswith('[ Sub-total') or
         str(l).strip().startswith('[O]') or
         str(l).strip() == INSTRUCTION),
        None
    )

    if stage_start is None:
        # Everything after Title: is story text (no Stage questions exist)
        story_lines = [l for l in exercises[1:] if str(l).strip() and not str(l).strip().startswith('[ Sub-total')]
        stage_lines = [l for l in exercises[1:] if str(l).strip().startswith('[ Sub-total')]
        has_questions = False
    else:
        story_lines = [l for l in exercises[story_start:stage_start] if str(l).strip()]
        stage_lines = exercises[stage_start:]
        has_questions = True

    # Check if story_lines is the same as blue box (should be replaced with instruction)
    blue_text = [l for l in blue_box if str(l).strip() and '📖' not in str(l)]
    is_same_story = (len(story_lines) > 0 and
                     overlap_ratio(story_lines, blue_text) > 0.5)

    # Determine what to put between Title: and Stage questions
    if is_same_story:
        middle = [INSTRUCTION]
    elif story_lines:
        # Variant story - keep it but add instruction before stage questions
        middle = list(story_lines)
    else:
        # No story lines currently - add instruction
        middle = [INSTRUCTION]

    # Determine stage questions
    if has_questions and (wn, si) not in QUESTIONS:
        # Keep existing questions
        new_exercises = [exercises[0]] + middle + [""] + list(stage_lines)
    elif (wn, si) in QUESTIONS:
        # Use new questions
        new_exercises = [exercises[0]] + middle + [""] + QUESTIONS[(wn, si)]
    else:
        # No questions defined and none exist
        new_exercises = [exercises[0]] + middle + [""] + ["[ Sub-total: ___ / 6 ]"]

    return list(blue_box) + new_exercises


# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────

# Weeks that were modified by the restore script (had story copy added back)
# + W29/30/31 which need question fixes
AFFECTED_WEEKS = list(range(1, 27)) + [29, 30, 31, 32, 33, 34, 37, 38, 39, 40, 41, 49, 50, 51, 52, 53]

print("Fixing reading exercise sections...")
print("=" * 60)

total = 0
for wn in AFFECTED_WEEKS:
    pub = PUBLIC / f"W{wn}.json"
    if not pub.exists():
        continue

    data = json.loads(pub.read_text(encoding='utf-8'))
    changed = False

    for key in [k for k in data if k.startswith('sessions')]:
        sessions = data[key]
        for si, sess in enumerate(sessions):
            rp_idx = next((i for i, p in enumerate(sess.get('parts', []))
                           if 'READING INPUT' in p.get('title', '').upper()), None)
            if rp_idx is None:
                continue

            old_content = sess['parts'][rp_idx]['content']
            new_content = fix_session_reading(old_content, wn, si)

            if new_content != old_content:
                sess['parts'][rp_idx]['content'] = new_content
                changed = True

    if changed:
        js = json.dumps(data, ensure_ascii=False, indent=2)
        pub.write_text(js, encoding='utf-8')
        (MCP / f"W{wn}.json").write_text(js, encoding='utf-8')
        print(f"  ✅ W{wn:2}: fixed")
        total += 1

print(f"\nDone. Fixed {total} weeks.")
