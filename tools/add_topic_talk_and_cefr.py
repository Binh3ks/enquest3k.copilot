#!/usr/bin/env python3
"""
Add topic_talk_prompt to writing.js files (W8-W28 ADV + EASY)
Add cefr_level + cambridge_prep to metadata.js (W1-W29)

Run: python3 tools/add_topic_talk_and_cefr.py
"""
import pathlib, re

BASE = pathlib.Path(__file__).parent.parent
WEEKS_ADV  = BASE / "src/data/weeks"
WEEKS_EASY = BASE / "src/data/weeks_easy"

# ─── Week folder name helper ──────────────────────────────────────────────
def week_dir(n):
    return f"week_{n:02d}" if n < 10 else f"week_{n}"

# ─── topic_talk_prompt per week (ADV = rich, EASY = simpler) ─────────────
PROMPTS_ADV = {
    8:  "Tell me about your classroom. What do you see around you? How many students and things are there?",
    9:  "Tell me about a city you know. What sounds can you hear? What can you see on the streets?",
    10: "Tell me about a farm or animals you have seen. What animals were there? What did they do?",
    11: "Tell me about your favourite place to go on weekends. What do you do there? Why do you love it?",
    12: "Tell me about a special talent you have. What are you good at? How did you learn it?",
    13: "Tell me about your daily routine. What do you usually do from morning to night?",
    14: "Tell me about your favourite things — your room, toys, food, or hobby. What makes your world special?",
    15: "Tell me about what people are doing at a park right now. What actions can you see?",
    16: "Tell me about your favourite sport. What are the players doing? What is happening in the game?",
    17: "Tell me about the weather today and what people are wearing. Why are those clothes good for the weather?",
    18: "Tell me about an interesting event happening in your neighbourhood right now. Describe what is going on.",
    19: "Tell me about something you did when you were small. What happened? How is it different from now?",
    20: "Tell me about a place that looked different in the past. What did it look like? What changed?",
    21: "Tell me about what you did yesterday. What happened from morning to night?",
    22: "Tell me about something interesting that happened in the past. What clues helped you understand what occurred?",
    23: "Tell me about a painting or drawing you like. What do you see in it? How does it make you feel?",
    24: "Tell me about a time in the past when you felt very happy or very sad. What happened? How did you feel?",
    25: "Tell me about how you do something step by step. What is the first step? What comes next? What is the last step?",
    26: "Tell me about what you did last weekend from the beginning to the end. Tell it like a story.",
    27: "Tell me about a plant, garden, or living thing you have watched or taken care of. What changed over time?",
    28: "Tell me about a time when you worked slowly and steadily to finish something difficult. What happened in the end?",
}

PROMPTS_EASY = {
    8:  "Tell me about your classroom. What do you see there?",
    9:  "Tell me about a city. What sounds and sights are there?",
    10: "Tell me about animals on a farm. What do they do?",
    11: "Tell me about your favourite place on weekends. What do you do there?",
    12: "Tell me about something you are good at. What is your talent?",
    13: "Tell me about what you usually do every day.",
    14: "Tell me about your favourite things. What do you like most?",
    15: "Tell me about what people are doing at a park right now.",
    16: "Tell me about your favourite sport. What are the players doing?",
    17: "Tell me about the weather today. What are people wearing?",
    18: "Tell me about something interesting happening near you right now.",
    19: "Tell me about something you did when you were small.",
    20: "Tell me about how a place looked in the past. What was it like?",
    21: "Tell me about what you did yesterday. What happened?",
    22: "Tell me about something interesting that happened in the past.",
    23: "Tell me about a picture or drawing you like. What do you see?",
    24: "Tell me about a time you felt very happy or very sad. What happened?",
    25: "Tell me about how you do something. What are the steps?",
    26: "Tell me about what you did last weekend. Tell the story.",
    27: "Tell me about a plant or animal you have watched grow or change.",
    28: "Tell me about a time you worked hard to finish something. What happened?",
}

# ─── Add topic_talk_prompt to a writing.js file ──────────────────────────
def add_topic_talk(path: pathlib.Path, prompt: str):
    content = path.read_text(encoding="utf-8")
    if "topic_talk_prompt" in content:
        print(f"  SKIP (already has it): {path}")
        return
    # Insert before the final };
    # Find last occurrence of }; at start of line
    new_content = re.sub(
        r'(\n\}\;)\s*$',
        f'\n  topic_talk_prompt: "{prompt}",\n}};',
        content.rstrip()
    )
    if new_content == content.rstrip():
        print(f"  WARN (no match to insert): {path}")
        return
    path.write_text(new_content + "\n", encoding="utf-8")
    print(f"  OK: {path.relative_to(BASE)}")

# ─── Run topic_talk insertion ─────────────────────────────────────────────
print("=== TASK 1: Adding topic_talk_prompt to writing.js W8-W28 ===")
for w in range(8, 29):
    adv_path  = WEEKS_ADV  / week_dir(w) / "writing.js"
    easy_path = WEEKS_EASY / week_dir(w) / "writing.js"

    if adv_path.exists():
        add_topic_talk(adv_path, PROMPTS_ADV[w])
    else:
        print(f"  MISSING ADV: {adv_path}")

    if easy_path.exists():
        add_topic_talk(easy_path, PROMPTS_EASY[w])
    else:
        print(f"  MISSING EASY: {easy_path}")

# ─── Cambridge CEFR mapping ───────────────────────────────────────────────
CEFR = {}
for w in range(1, 15):
    CEFR[w] = ("Pre-A1", "YLE Starters")
for w in range(15, 29):
    CEFR[w] = ("A1", "YLE Starters → Movers")
for w in range(29, 55):
    CEFR[w] = ("A1+", "YLE Movers")
for w in range(55, 81):
    CEFR[w] = ("A2", "YLE Movers → Flyers")
for w in range(81, 121):
    CEFR[w] = ("A2+", "YLE Flyers")
for w in range(121, 145):
    CEFR[w] = ("B1", "B1 Preliminary")
for w in range(145, 157):
    CEFR[w] = ("B1+", "B1 Preliminary mastery")

# ─── Update metadata.js ───────────────────────────────────────────────────
print("\n=== TASK 2: Adding CEFR tags to metadata.js ===")
meta_path = BASE / "src/data/weeks/metadata.js"
meta = meta_path.read_text(encoding="utf-8")

def replace_week_entry(text, week_num, cefr_level, cambridge_prep):
    """Replace { title_en: "...", title_vi: "..." } with the same + CEFR fields."""
    # Match the week entry line: e.g.  29: { title_en: "...", title_vi: "..." },
    pattern = r'(' + str(week_num) + r'\s*:\s*\{[^}]*\})'
    def replacer(m):
        entry = m.group(1)
        if "cefr_level" in entry:
            return entry  # already done
        # Insert before closing }
        entry = entry.rstrip()
        if entry.endswith("}"):
            entry = entry[:-1].rstrip(", ") + f', cefr_level: "{cefr_level}", cambridge_prep: "{cambridge_prep}" }}'
        return entry
    new_text, n = re.subn(pattern, replacer, text, count=1)
    return new_text, n

changed = 0
for w in range(1, 30):
    if w in CEFR:
        cefr, cambridge = CEFR[w]
        meta, n = replace_week_entry(meta, w, cefr, cambridge)
        if n:
            changed += 1

meta_path.write_text(meta, encoding="utf-8")
print(f"  Updated {changed} week entries in metadata.js")
print("\nDONE.")
