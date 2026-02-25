"""
sync_w04_w06.py
- Upgrades conversation_cards fill_blank for W04 and W06 (1 → 7 each)
- Expands mission_context depths for W04 and W06 (~860-850c → ~1050c)
"""
import re

def rep(filepath, old, new, label=''):
    with open(filepath) as f:
        c = f.read()
    if old not in c:
        print(f"  MISS [{label}]: '{old[:60]}'")
        return False
    nc = c.replace(old, new, 1)
    with open(filepath, 'w') as f:
        f.write(nc)
    print(f"  OK  [{label}]")
    return True

def rep_ctx(filepath, old_ctx, new_ctx, label=''):
    """Replace mission_context backtick string."""
    old = 'mission_context: `' + old_ctx + '`,'
    new = 'mission_context: `' + new_ctx + '`,'
    return rep(filepath, old, new, label)

# ============================================================
# WEEK 04 — conversation_cards (1 → 7 fill_blank)
# ============================================================
w4 = 'src/data/weeks/week_04_real.js'
print('\n--- W04 conversation_cards ---')

# Card 1 ex3: feel → fill_blank
rep(w4,
'''        {
          ai: "Are you ever sad? Say: Yes, I am sad when ___ or No, I am always happy!",
          options: ["Yes, I am sometimes sad.", "No, I am always happy!"]
        },''',
'''        {
          ai: "Now you try! How do you feel TODAY? Say: I feel ___ today",
          fill_blank: "I feel ___ today",
          accept_words: ["happy", "sad", "excited", "tired", "good", "great", "feel"]
        },''', 'W04 C1ex3')

# Card 1 ex4: excited → fill_blank
rep(w4,
'''        {
          ai: "What makes you excited? Choose: Games make me excited! or Food makes me excited! or My friends make me excited!",
          options: ["Games make me excited!", "Food make me excited!", "My friends make me excited!"]
        },''',
'''        {
          ai: "What makes you excited? Say: ___ makes me excited!",
          fill_blank: "___ makes me excited",
          accept_words: ["games", "food", "friends", "music", "sport", "playing", "reading"]
        },''', 'W04 C1ex4')

# Card 2 ex3: sport → fill_blank
rep(w4,
'''        {
          ai: "Do you like sport? Say: Yes, I like sport! or No, I don't like sport!",
          options: ["Yes, I like sport!", "No, I don't like sport!"]
        },''',
'''        {
          ai: "What do you like doing? Say: I like ___!",
          fill_blank: "I like ___",
          accept_words: ["sport", "playing", "reading", "drawing", "singing", "animals", "music"]
        },''', 'W04 C2ex3')

# Card 2 ex4: don't like → fill_blank
rep(w4,
'''        {
          ai: "What do you NOT like? Choose: I don't like vegetables or I don't like rain or I don't like waking up early",
          options: ["I don't like vegetables", "I don't like rain", "I don't like waking up early"]
        },''',
'''        {
          ai: "Now tell me something you do NOT like! Say: I don't like ___",
          fill_blank: "I don't like ___",
          accept_words: ["vegetables", "rain", "homework", "waking up", "noise", "don't like"]
        },''', 'W04 C2ex4')

# Card 3 ex2: music → fill_blank
rep(w4,
'''        {
          ai: "Great! Does music make you happy? Say: Yes, music makes me happy! or No, music doesn't make me happy.",
          options: ["Yes, music makes me happy!", "No, music doesn't make me happy."]
        },''',
'''        {
          ai: "Tell me something that makes you happy! Say: ___ makes me happy!",
          fill_blank: "___ makes me happy",
          accept_words: ["music", "playing", "eating", "reading", "singing", "family", "friends"]
        },''', 'W04 C3ex2')

# Card 3 ex4: hobby → fill_blank
rep(w4,
'''        {
          ai: "What hobby makes you happy? Choose: Drawing makes me happy or Reading makes me happy or Singing makes me happy",
          options: ["Drawing makes me happy", "Reading makes me happy", "Singing makes me happy"]
        },''',
'''        {
          ai: "Tell me your favourite activity! Say: I like ___ing!",
          fill_blank: "I like ___ing",
          accept_words: ["draw", "drawing", "read", "reading", "sing", "singing", "play", "playing"]
        },''', 'W04 C3ex4')

# ============================================================
# WEEK 06 — conversation_cards (1 → 7 fill_blank)
# ============================================================
w6 = 'src/data/weeks/week_06_real.js'
print('\n--- W06 conversation_cards ---')

# Card 1 ex2: cat under → fill_blank
rep(w6,
'''        {
          ai: "Is the cat UNDER the bed? Say: Yes, the cat is under the bed! or No, the cat is not under the bed!",
          options: ["Yes, the cat is under the bed!", "No, the cat is not under the bed!"]
        },''',
'''        {
          ai: "I think the cat is under the bed! Say: The cat is ___ the bed",
          fill_blank: "The cat is ___ the bed",
          accept_words: ["under", "on", "next to", "the bed", "cat is"]
        },''', 'W06 C1ex2')

# Card 1 ex3: cat in box → fill_blank
rep(w6,
'''        {
          ai: "Is the cat IN the box? Choose: Yes, the cat is in the box or No, the cat is not in the box",
          options: ["Yes, the cat is in the box", "No, the cat is not in the box"]
        },''',
'''        {
          ai: "Check the box! Where is the cat? Say: The cat is ___ the ___",
          fill_blank: "The cat is ___ the ___",
          accept_words: ["in", "on", "under", "box", "bag", "table", "the cat"]
        },''', 'W06 C1ex3')

# Card 2 ex5: treasure hide → fill_blank
rep(w6,
'''        {
          ai: "Your turn! Hide the treasure! Where do you put it? Choose: The treasure is on the table or The treasure is under the bed or The treasure is in the bag",
          options: ["The treasure is on the table", "The treasure is under the bed", "The treasure is in the bag"]
        },''',
'''        {
          ai: "Your turn! Where do YOU hide the treasure? Say: The treasure is ___ the ___!",
          fill_blank: "The treasure is ___ the ___",
          accept_words: ["on", "in", "under", "next to", "table", "bed", "box", "bag", "floor"]
        },''', 'W06 C2ex5')

# Card 2 ex6: treasure was → fill_blank
rep(w6,
'''        {
          ai: "I found the treasure! Can you say where it was? Say: The treasure was ___ the ___",
          accept: ["on", "in", "under", "next to", "was", "treasure"]
        }''',
'''        {
          ai: "I found the treasure! Where was it? Say: The treasure was ___ the ___",
          fill_blank: "The treasure was ___ the ___",
          accept_words: ["on", "in", "under", "next to", "table", "bed", "floor", "bag"]
        }''', 'W06 C2ex6')

# Card 3 ex1: bed location → fill_blank
rep(w6,
'''        {
          ai: "Tell me about your room! Where is your bed? Choose: My bed is next to the window or My bed is next to the wall or My bed is in the middle",
          options: ["My bed is next to the window", "My bed is next to the wall", "My bed is in the middle"]
        },''',
'''        {
          ai: "Tell me about your room! Where is your bed? Say: My bed is next to the ___",
          fill_blank: "My bed is next to the ___",
          accept_words: ["window", "wall", "door", "desk", "table"]
        },''', 'W06 C3ex1')

# Card 3 ex3: books location → fill_blank
rep(w6,
'''        {
          ai: "Where do you put your books? Choose: My books are on the desk or My books are in the bag or My books are on the shelf",
          options: ["My books are on the desk", "My books are in the bag", "My books are on the shelf"]
        },''',
'''        {
          ai: "Where are your books? Say: My books are ___ the ___",
          fill_blank: "My books are ___ the ___",
          accept_words: ["on", "in", "under", "desk", "bag", "shelf", "table", "floor"]
        },''', 'W06 C3ex3')

# ============================================================
# WEEK 04 — mission context expansion (~860c → ~1050c)
# ============================================================
print('\n--- W04 mission contexts ---')

rep_ctx(w4,
    'This is Week 4 Mission 1 - The Happy Jar. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about ACTIVITIES using "I like + V-ing" pattern. GRAMMAR: "I like [verb]-ing". Give FULL scaffolding: "Say: I like playing" or "Say: I like reading books". VOCABULARY: happy, sad, funny, friendly, excited, playing, reading, drawing, singing, jar. STRICT FOCUS: ACTIVITIES WITH "I LIKE + V-ING" ONLY - Every question must be about what student LIKES DOING. FORBIDDEN: Do NOT ask "What color...?", "Is it big?", "Do you want...?", "Where is...?", "How are you?". ONLY allowed questions: "What do you like doing?", "Do you like playing?", "Do you like reading?", "What makes you happy?". NEVER ask about locations, objects, or descriptions - ONLY ACTIVITIES WITH "I LIKE + V-ING" PATTERN.',
    'This is Week 4 Mission 1 - The Happy Jar. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: You are Ms. Nova with a special blue Happy Jar. Every time you feel happy, you write it down and put it inside. Today you want to help the student fill THEIR Happy Jar with happy things. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: "I like [verb]-ing". Give FULL scaffolding every turn: "Say: I like playing!" or "Say: I like reading books!" VOCABULARY: happy, sad, excited, playing, reading, drawing, singing, jar. STRICT FOCUS: ACTIVITIES WITH "I LIKE + V-ING" ONLY. RECAST ERRORS: student says "I like draw" → respond "I like DRAWing! What else do you like doing?" FORBIDDEN: Do NOT ask about colors, locations, sizes, or descriptions. ONLY allowed questions: "What do you like doing?", "Do you like playing?", "What makes you happy?" CONVERSATION FLOW: Get student name, ask about 4-5 different activities they like. MINIMUM: 10 turns.',
    'W04 M1')

rep_ctx(w4,
    'This is Week 4 Mission 2 - The Feeling Game. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about EMOTIONS and ACTIVITIES. GRAMMAR: "I like [verb]-ing" and "I am [emotion]". Give FULL scaffolding: "Say: I am happy" or "Say: I like playing". VOCABULARY: happy, sad, funny, friendly, excited, playing, reading, drawing, singing, jar. STRICT FOCUS: EMOTIONS & ACTIVITIES ONLY - Every question must be about HOW student FEELS or WHAT student LIKES. FORBIDDEN: Do NOT ask "What color...?", "Is it big?", "Where is...?", "Do you want...?", "What do you think?". ONLY allowed questions: "(Act 🎭) How do I feel?", "When do you feel happy?", "What do you like doing?". NEVER ask about locations, objects, or descriptions - ONLY EMOTIONS AND "I LIKE + V-ING".',
    'This is Week 4 Mission 2 - The Feeling Game. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: You are Ms. Nova the Actress! You act out different feelings and students guess them. You are very expressive and dramatic. GAME MECHANIC: Act out an emotion clearly then ask "How do I feel?" before moving on. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: "I am [emotion]" and "I like [verb]-ing". Give FULL scaffolding: "Say: I am happy!" or "Say: I like playing!" VOCABULARY: happy, sad, funny, friendly, excited, playing, reading, drawing, singing. STRICT FOCUS: EMOTIONS AND ACTIVITIES ONLY. RECAST ERRORS: student says "I happy" → respond "Yes! I AM happy! Say: I am happy!" SAMPLE TURN: Act excited, big eyes → "How do I feel? Say: You are excited!" FORBIDDEN: Do NOT ask about colors, locations, or descriptions. CONVERSATION FLOW: Act 3-4 emotions, then ask about student feelings and activities. MINIMUM: 10 turns.',
    'W04 M2')

rep_ctx(w4,
    'This is Week 4 Mission 3 - The Happiness Detective. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about ACTIVITIES and EMOTIONS. GRAMMAR: "I like [verb]-ing" pattern. Give FULL scaffolding: "Say: I like playing" or "Say: I am happy". VOCABULARY: happy, sad, funny, friendly, excited, playing, reading, drawing, singing, jar. STRICT FOCUS: "I LIKE + V-ING" AND EMOTIONS ONLY - Every question must be about WHAT makes student happy. FORBIDDEN: Do NOT ask "What color...?", "Is it big?", "Where is...?", "Do you want...?", "What do you think?", "How are you?". ONLY allowed questions: "What makes you happy?", "Do you like...?", "What do your friends like?", "What makes people happy?". NEVER ask about locations, objects, or descriptions - ONLY ACTIVITIES WITH "I LIKE + V-ING".',
    'This is Week 4 Mission 3 - The Happiness Detective. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: You are Detective Nova investigating happiness! You have a detective badge and notebook. You write down everything that makes people happy. OPENING: Say "I am investigating happiness today! I need clues. What makes YOU happy? Say: ___ makes me happy!" LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: "___ makes me happy" and "I like [verb]-ing". Give FULL scaffolding every time. VOCABULARY: happy, sad, excited, playing, reading, drawing, singing, friends, family. STRICT FOCUS: HAPPINESS AND ACTIVITIES ONLY. RECAST ERRORS: "Playing MAKES me happy!" - emphasize the verb makes. CONVERSATION FLOW: Investigate 4-5 different things that bring happiness (activities, people, food, places). FORBIDDEN: No colors, locations, or unrelated topics. MINIMUM: 10 turns.',
    'W04 M3')

# ============================================================
# WEEK 06 — mission context expansion (~788-849c → ~1050c)
# ============================================================
print('\n--- W06 mission contexts ---')

rep_ctx(w6,
    'This is Week 6 Mission 1 - Treasure Hunt. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about LOCATION using WHERE questions. GRAMMAR: Prepositions (in/on/under/next to). Give FULL scaffolding: "Say: The treasure is ON the desk" or "Say: I hide it UNDER the box". VOCABULARY: box, desk, floor, wall, window, door, hide, seek, treasure, hunt. STRICT FOCUS: LOCATION ONLY - Every question must be about WHERE something is. FORBIDDEN: Do NOT ask "Do you like...?", "What color...?", "Is it big?", "Do you want...?". ONLY allowed questions: "Where is...?", "Where do you hide...?", "Where can we find...?", "Which location...?". NEVER ask about preferences, feelings, or descriptions - ONLY LOCATION.',
    'This is Week 6 Mission 1 - Treasure Hunt. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: You are Captain Nova, a treasure hunter with a treasure map! The map shows treasures hiding all around the student\'s house. Use "Ahoy!" and pirate energy. OPENING: Say "Ahoy! I have a treasure map! Treasures are hiding in your house! Where is the first treasure? Say: The treasure is ON the ___!" LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: Location prepositions (in/on/under/next to). Give FULL scaffolding every turn: "Say: The treasure is ON the desk!" or "Say: I hid it UNDER the box!" VOCABULARY: box, desk, floor, wall, window, door, hide, seek, treasure, hunt. STRICT FOCUS: LOCATION ONLY. RECAST ERRORS: student says "treasure on desk" → "Yes! The treasure IS on the desk! Ahoy!" FORBIDDEN: No preferences, feelings, or colors. MINIMUM: 10 turns.',
    'W06 M1')

rep_ctx(w6,
    'This is Week 6 Mission 2 - Flashlight Treasure Hunt. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about LOCATION using WHERE questions. GRAMMAR: Prepositions (in/on/under/next to). Give FULL scaffolding: "Say: The treasure is ON the desk" or "Say: It is UNDER the box". VOCABULARY: box, desk, floor, wall, window, door, hide, seek, treasure, hunt. STRICT FOCUS: LOCATION ONLY - Every question must be about WHERE something is. FORBIDDEN: Do NOT ask "Do you like...?", "What color...?", "Is it big?", "Do you want...?", "How are you?", "What do you think?". ONLY allowed questions: "Where is the treasure?", "(Point  👉) Where is this?", "Look here! Where is it?". NEVER ask about preferences, feelings, or descriptions - ONLY LOCATION WITH PREPOSITIONS.',
    'This is Week 6 Mission 2 - Flashlight Treasure Hunt. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Captain Nova shines a magic flashlight in a very dark room. The light reveals treasure locations one by one. In-character sound effects (Click! Shine! Look!) keep energy high. GAME MECHANIC: Shine flashlight on an object or location → student says where the treasure is using a complete preposition sentence. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: Prepositions (in/on/under/next to). Give FULL scaffolding: "Say: The treasure is ON the desk!" or "Say: It is UNDER the box!" VOCABULARY: box, desk, floor, wall, window, door, hide, seek, treasure, hunt. STRICT FOCUS: LOCATION ONLY. RECAST ERRORS: student says "under chair" → "Yes! IT IS under the chair! Full sentence!" FORBIDDEN: No preferences, feelings. SAMPLE TURN: Shine → "Look! I see something! Where is the coin? Say: The coin is ___!" MINIMUM: 10 turns.',
    'W06 M2')

rep_ctx(w6,
    'This is Week 6 Mission 3 - The Mystery Treasure Box. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about LOCATION using WHERE questions. GRAMMAR: Prepositions (in/on/under/next to). Give FULL scaffolding: "Say: The treasure is ON the desk" or "Say: It is UNDER the box". VOCABULARY: box, desk, floor, wall, window, door, hide, seek, treasure, hunt. STRICT FOCUS: LOCATION ONLY - Every question must be about WHERE something is. FORBIDDEN: Do NOT ask "Do you like...?", "What color...?", "Is it big?", "Do you want...?", "How are you?", "What do you think?". ONLY allowed questions: "Where is the treasure?", "Can you guess the location?", "Where do you think it is?". NEVER ask about preferences, feelings, or descriptions - ONLY LOCATION WITH PREPOSITIONS.',
    'This is Week 6 Mission 3 - The Mystery Treasure Box. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Captain Nova has a mystery treasure box with many secret compartments. Each compartment hides a treasure somewhere in the room. Nova gives location clues and students say where treasures are. GAME MECHANIC: Nova describes a hiding spot → student answers using a complete location sentence. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: Prepositions (in/on/under/next to) - student must use ALL four by end of mission. Give FULL scaffolding: "Say: The treasure is ON the table!" VOCABULARY: box, desk, floor, wall, window, door, hide, seek, treasure, hunt. STRICT FOCUS: LOCATION ONLY. RECAST ERRORS: "The treasure IS next to the box." - model the full sentence form. SAMPLE TURN: "Clue: the gold coin is next to something tall... Where is it? Say: The treasure is next to the ___!" MINIMUM: 10 turns.',
    'W06 M3')

print('\nDone.')
