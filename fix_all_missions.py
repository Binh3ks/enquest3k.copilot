"""
Fix all mission contexts that are missing:
  1. GAME FLOW / GAME MECHANIC / CONVERSATION FLOW structured steps
  2. FORBIDDEN ban on generic filler phrases
"""

import re

FILLER_BAN = "NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler."

def patch(path, replacements):
    with open(path) as f:
        c = f.read()
    for old, new in replacements:
        if old not in c:
            print(f"  !! NOT FOUND in {path}: {old[:60]!r}")
            continue
        c = c.replace(old, new, 1)
        print(f"  OK patch: {old[:60]!r}")
    with open(path, 'w') as f:
        f.write(c)

# ─── WEEK 01 M1 ─────────────────────────────────────────────────────────────
patch('src/data/weeks/week_01_real.js', [
    (
        "FORBIDDEN: No questions about family, home activities, or preferences. MINIMUM: 12 turns covering name, age, school, grade, and friends.",
        "GAME FLOW: (1) Ask name → (2) Ask age → (3) Ask school name → (4) Ask grade → (5) Ask about friends. One topic per turn, model full sentence each step. "
        "FORBIDDEN: No questions about family, home activities, or preferences. " + FILLER_BAN + " "
        "MINIMUM: 12 turns covering name, age, school, grade, and friends."
    ),
])

# ─── WEEK 02 M1 ─────────────────────────────────────────────────────────────
patch('src/data/weeks/week_02_real.js', [
    (
        "FORBIDDEN: No school topics, no location, no preferences about activities. MINIMUM: 15 turns covering at least 3 family members.",
        "GAME FLOW: (1) Ask who is in family → (2) Ask mother's trait → (3) Ask father's trait → (4) Ask about sibling(s) → (5) More members if time. One person per turn, model 'My [member] is [adjective]' every step. "
        "FORBIDDEN: No school topics, no location, no preferences about activities. " + FILLER_BAN + " "
        "MINIMUM: 15 turns covering at least 3 family members."
    ),
])

# ─── WEEK 03 M1 ─────────────────────────────────────────────────────────────
patch('src/data/weeks/week_03_real.js', [
    (
        "FORBIDDEN: No clothes, feelings, preferences. Do NOT ask 'Do you like...?' MINIMUM: 15 turns covering height, hair, and eyes.",
        "GAME FLOW: (1) Ask height (tall/short) → (2) Ask hair length (long/short) → (3) Ask hair color (dark/light/brown/black) → (4) Ask eye color. One feature per turn, model 'I am...' and 'I have...' every step. "
        "FORBIDDEN: No clothes, feelings, preferences. Do NOT ask 'Do you like...?' " + FILLER_BAN + " "
        "MINIMUM: 15 turns covering height, hair, and eyes."
    ),
])

# ─── WEEK 04 M1 ─────────────────────────────────────────────────────────────
patch('src/data/weeks/week_04_real.js', [
    # Expand CONVERSATION FLOW
    (
        "CONVERSATION FLOW: Get student name, ask about 4-5 different activities they like. MINIMUM: 10 turns.",
        "CONVERSATION FLOW: (1) Get name → (2) Explain Happy Jar ('Every happy thing goes in!') → (3) First activity: 'What do you like doing?' → (4) Ask 3-4 more: 'Do you like drawing/singing/playing?' → (5) Wrap up: 'Your Happy Jar is full!' "
        "FORBIDDEN: Do NOT ask about colors, locations, sizes, or descriptions. ONLY allowed: 'What do you like doing?', 'Do you like playing?', 'What makes you happy?' " + FILLER_BAN + " "
        "MINIMUM: 10 turns."
    ),
    # Remove old FORBIDDEN (already merged above)
    (
        "FORBIDDEN: Do NOT ask about colors, locations, sizes, or descriptions. ONLY allowed questions: \"What do you like doing?\", \"Do you like playing?\", \"What makes you happy?\" ",
        ""
    ),
])

# ─── WEEK 04 M3 ─────────────────────────────────────────────────────────────
# M3 is index 2. Need to patch after the M2 section.
# Use a unique enough string from M3 context
patch('src/data/weeks/week_04_real.js', [
    (
        "CONVERSATION FLOW: Investigate 4-5 different things that bring happiness (activities, people, food, places). FORBIDDEN: No colors, locations, or unrelated topics. MINIMUM: 10 turns.",
        "CONVERSATION FLOW: (1) Introduce detective notebook → (2) Activities: 'What do you like doing? Say: ___ makes me happy!' → (3) People: 'Who makes you happy?' → (4) Food: 'What food makes you happy?' → (5) Summarize all clues in notebook. One topic per turn. "
        "FORBIDDEN: No colors, locations, or unrelated topics. " + FILLER_BAN + " "
        "MINIMUM: 10 turns."
    ),
])

# ─── WEEK 05 M1 ─────────────────────────────────────────────────────────────
patch('src/data/weeks/week_05_real.js', [
    (
        "AVOID: Complex grammar, past tense, multiple questions at once. MINIMUM: 10 turns. FOCUS: Rooms and basic furniture only.",
        "GAME FLOW: (1) Get name + house size/color → (2) Bedroom: ask 2-3 furniture items → (3) Kitchen: ask 2-3 items → (4) Living room: ask 2-3 items → (5) Every 3-4 turns invite student to ask about Nova's house. One room/item per turn. "
        "FORBIDDEN: Do NOT ask about colors at this stage. " + FILLER_BAN + " Do NOT ask multiple rooms at once. "
        "AVOID: Complex grammar, past tense, multiple questions at once. MINIMUM: 10 turns. FOCUS: Rooms and basic furniture only."
    ),
])

# ─── WEEK 05 M3 ─────────────────────────────────────────────────────────────
patch('src/data/weeks/week_05_real.js', [
    (
        "AVOID: Making clues too hard. Give extra hints if student is stuck after 2 tries. MINIMUM: 6 object riddles. FOCUS: Turn grammar practice into exciting guessing game.",
        "GAME MECHANIC: Nova feels object → gives 1-2 clues (touch + function) → student guesses 'There is a/an ___' → confirm or recast → next object. One object per round. "
        "FORBIDDEN: Do NOT give away the answer. " + FILLER_BAN + " Do NOT ask about colors, sizes, or non-object topics. "
        "AVOID: Making clues too hard. Give extra hints if student is stuck after 2 tries. MINIMUM: 6 object riddles. FOCUS: Turn grammar practice into exciting guessing game."
    ),
])

# ─── WEEK 06 M3 ─────────────────────────────────────────────────────────────
patch('src/data/weeks/week_06_real.js', [
    (
        "SAMPLE TURN: \"Clue: the gold coin is next to something tall... Where is it? Say: The treasure is next to the ___!\" MINIMUM: 10 turns.",
        "SAMPLE TURN: \"Clue: the gold coin is next to something tall... Where is it? Say: The treasure is next to the ___!\" "
        "FORBIDDEN: Do NOT ask about preferences, colors, or feelings. " + FILLER_BAN + " ONLY ask location questions using in/on/under/next to. "
        "MINIMUM: 10 turns."
    ),
])

# ─── WEEK 07 M1 ─────────────────────────────────────────────────────────────
patch('src/data/weeks/week_07_real.js', [
    (
        "FORBIDDEN: Do NOT ask about feelings, preferences, or unrelated topics. AVOID: Multiple items per turn, complex sentences. MINIMUM: 10 turns covering at least 5 different items.",
        "GAME MECHANIC: Ask about ONE backpack item per turn → student says 'There is a [item] in my backpack' → confirm/recast → ask about next item. "
        "FORBIDDEN: Do NOT ask about feelings, preferences, or unrelated topics. " + FILLER_BAN + " "
        "AVOID: Multiple items per turn, complex sentences. MINIMUM: 10 turns covering at least 5 different items."
    ),
])

# ─── WEEK 07 M2 ─────────────────────────────────────────────────────────────
patch('src/data/weeks/week_07_real.js', [
    (
        "NEVER ask about preferences, feelings, or descriptions - ONLY IDENTIFY ITEMS WITH 'There is a...'.",
        "GAME MECHANIC: Point to ONE classroom item per turn → student says 'There is a [item]' → confirm/recast → point to next item. "
        "NEVER ask about preferences, feelings, or descriptions - ONLY IDENTIFY ITEMS WITH 'There is a...'. " + FILLER_BAN
    ),
])

# ─── WEEK 07 M3 ─────────────────────────────────────────────────────────────
patch('src/data/weeks/week_07_real.js', [
    (
        "NEVER ask about preferences, feelings, or descriptions - ONLY GUESS ITEMS WITH 'There is a...'.",
        "GAME MECHANIC: Nova reaches in magic backpack → gives ONE clue → student guesses 'There is a/an [item]' → confirm/recast → next item. "
        "NEVER ask about preferences, feelings, or descriptions - ONLY GUESS ITEMS WITH 'There is a...'. " + FILLER_BAN
    ),
])

# ─── FINAL REPORT ────────────────────────────────────────────────────────────
print()
import re as _re
weeks = [f'src/data/weeks/week_0{i}_real.js' for i in range(1,8)]
for path in weeks:
    with open(path) as f:
        c = f.read()
    ctxs = _re.findall(r'mission_context: `([^`]+)`', c)
    print(f'{path}:')
    for i, ctx in enumerate(ctxs, 1):
        has_flow = any(x in ctx for x in ['STORY FLOW','GAME FLOW','GAME MECHANIC','CONVERSATION FLOW'])
        has_forbidden = 'FORBIDDEN' in ctx
        has_filler_ban = 'Tell me more' in ctx
        print(f'  M{i} ({len(ctx)}c) | FLOW={has_flow} | FORBIDDEN={has_forbidden} | filler_ban={has_filler_ban}')
