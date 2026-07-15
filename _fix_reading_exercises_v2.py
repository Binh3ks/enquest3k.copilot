"""
Fixed version of reading exercise cleanup:
- Session 0 of ALL affected weeks: always remove story text below Title → add instruction
- Sessions 1+ of W29: keep variant story + add Stage questions (NEW - had none)
- Sessions 1+ of W30/31: variant stories + questions already correct → leave unchanged
- Sessions 1+ of all other weeks: leave unchanged
"""
import json, re
from pathlib import Path

PUBLIC = Path("/Users/binhnguyen/Downloads/Engquest3k/public/data/lessons")
MCP    = Path("/Users/binhnguyen/Downloads/Engquest3k/mcp-server/data/lessons")

INSTRUCTION = "(↑ Re-read the story above to answer:)"

# Stage questions for W29/30/31 session 0, and W29 variant sessions
QUESTIONS = {
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
    (29, 1): [  # Luna mountain trip
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
    (29, 2): [  # Tom forest animals
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
    (30, 0): [  # The Picnic — class/Sam/Lisa/Ben (NOT Max/Luna)
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
    (31, 0): [  # A Day at the Market — Maya (NOT Max forest)
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

def ex_start_idx(content):
    for i, l in enumerate(content):
        s = str(l).strip()
        if s.startswith('Title:') or re.match(r'^Stage\s+\d', s) or re.match(r'^\d+[.)]\s', s):
            return i
    return len(content)

def find_stage_start(lines, from_idx=1):
    """Find index of first Stage/[O]/[Sub-total line, starting from from_idx."""
    for i in range(from_idx, len(lines)):
        s = str(lines[i]).strip()
        if (re.match(r'^Stage\s+\d', s) or s.startswith('[O]') or
                s.startswith('[ Sub-total') or s.startswith('(↑')):
            return i
    return None

def fix_session(content, wn, si, session_key):
    """Fix a single reading part's content for week wn, session index si."""
    ei = ex_start_idx(content)
    blue_box = content[:ei]
    exercises = content[ei:]

    if not exercises or not str(exercises[0]).strip().startswith('Title:'):
        return content  # no Title: found

    # What's currently between Title: and first Stage question?
    stage_i = find_stage_start(exercises, from_idx=1)

    if stage_i is None:
        # No Stage questions found at all — everything after Title: is story/junk
        story_lines = [l for l in exercises[1:] if str(l).strip()
                       and not str(l).strip().startswith('[ Sub-total')]
        existing_qs = [l for l in exercises[1:] if str(l).strip().startswith('[ Sub-total')]
    else:
        story_lines = [l for l in exercises[1:stage_i] if str(l).strip()
                       and str(l).strip() != INSTRUCTION]
        existing_qs = exercises[stage_i:]

    # ── DECIDE what to do ──────────────────────────────────────────────────

    # Case 1: Explicit question override exists (W29/30/31)
    if (wn, si) in QUESTIONS:
        new_qs = QUESTIONS[(wn, si)]

        # For W29 sessions 1+ (variant stories): keep the variant story text
        if wn == 29 and si > 0:
            middle = list(story_lines)  # keep variant story (Luna/Tom)
        else:
            middle = [INSTRUCTION]      # session 0: remove story, add instruction

        new_exercises = [exercises[0]] + middle + [""] + new_qs
        return list(blue_box) + new_exercises

    # Case 2: Session 0 of any affected week — remove story, add instruction
    if si == 0 and story_lines:
        # Remove story text, add instruction, keep existing Stage questions
        if existing_qs:
            new_exercises = [exercises[0], INSTRUCTION, ""] + list(existing_qs)
        else:
            new_exercises = [exercises[0], INSTRUCTION, "", "[ Sub-total: ___ / 6 ]"]
        return list(blue_box) + new_exercises

    # Case 3: Sessions 1+ with story and questions → leave alone (variant sessions)
    return content


# ── Main ────────────────────────────────────────────────────────────────────

AFFECTED_WEEKS = list(range(1, 27)) + [29, 30, 31, 32, 33, 34, 37, 38, 39, 40, 41, 49, 50, 51, 52, 53]

print("Fixing reading exercise sections (v2)...")
print("=" * 60)

total = 0
for wn in AFFECTED_WEEKS:
    pub = PUBLIC / f"W{wn}.json"
    if not pub.exists():
        continue

    data = json.loads(pub.read_text(encoding='utf-8'))
    changed = False

    for key in [k for k in data if k.startswith('sessions')]:
        for si, sess in enumerate(data[key]):
            rp_idx = next((i for i, p in enumerate(sess.get('parts', []))
                           if 'READING INPUT' in p.get('title', '').upper()), None)
            if rp_idx is None:
                continue

            old_c = sess['parts'][rp_idx]['content']
            new_c = fix_session(old_c, wn, si, key)
            if new_c != old_c:
                sess['parts'][rp_idx]['content'] = new_c
                changed = True

    if changed:
        js = json.dumps(data, ensure_ascii=False, indent=2)
        pub.write_text(js, encoding='utf-8')
        (MCP / f"W{wn}.json").write_text(js, encoding='utf-8')
        print(f"  ✅ W{wn:2}: fixed")
        total += 1

print(f"\nDone. Fixed {total} weeks.")
