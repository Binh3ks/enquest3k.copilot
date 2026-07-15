"""
sync_to_w05.py
Synchronizes conversation_cards fill_blank distribution for W01, W02, W03, W07
Target: ~7 fill_blank per week (matching W05 golden standard)
"""
import sys

def rep(filepath, old, new, required=True):
    with open(filepath) as f:
        c = f.read()
    if old not in c:
        print(f"  MISS: '{old[:60]}...' in {filepath}")
        if required:
            return False
        return True
    nc = c.replace(old, new, 1)
    with open(filepath, 'w') as f:
        f.write(nc)
    print(f"  OK: '{old[:50]}...'")
    return True

# ============================================================
# WEEK 01  (4 → 7 fill_blank)
# ============================================================
print("\n--- W01 ---")
w1 = 'src/data/weeks/week_01_real.js'

# Card 1 ex3: options → fill_blank "I am from ___"
rep(w1,
'''        {
          ai: "Wow! Where are you from? Choose: I am from Vietnam or I am from my city",
          options: ["I am from Vietnam", "I am from my city"]
        },''',
'''        {
          ai: "Wow! Where are you from? Say: I am from ___",
          fill_blank: "I am from ___",
          accept_words: ["Vietnam", "Hanoi", "Ho Chi Minh", "Saigon", "my city", "from"]
        },''')

# Card 1 ex4: accept → fill_blank "I am a ___"
rep(w1,
'''        {
          ai: "Great! Are you a student? Say: Yes, I am a student!",
          accept: ["Yes", "I am", "student"]
        },''',
'''        {
          ai: "Great! Are you a student? Say: I am a ___!",
          fill_blank: "I am a ___",
          accept_words: ["student", "learner", "I am", "am a"]
        },''')

# Card 2 ex3: options → fill_blank "I am ___"
rep(w1,
'''        {
          ai: "Awesome! Are you strong? Say: Yes, I am strong! or No, I am not strong!",
          options: ["Yes, I am strong!", "No, I am not strong!"]
        },''',
'''        {
          ai: "Awesome! Heroes are strong and brave! What are you? Say: I am ___!",
          fill_blank: "I am ___",
          accept_words: ["strong", "fast", "brave", "smart", "tall", "kind", "I am"]
        },''')

# ============================================================
# WEEK 02  (2 → 7 fill_blank)
# ============================================================
print("\n--- W02 ---")
w2 = 'src/data/weeks/week_02_real.js'

# Card 1 ex2: options → fill_blank "My father is ___"
rep(w2,
'''        {
          ai: "Great! Do you have a father? Say: Yes, I have a father! or No, I don't have a father.",
          options: ["Yes, I have a father!", "No, I don't have a father."]
        },''',
'''        {
          ai: "Great! Tell me about your father! What is he like? Say: My father is ___",
          fill_blank: "My father is ___",
          accept_words: ["kind", "tall", "funny", "nice", "happy", "short", "father", "is"]
        },''')

# Card 1 ex3: options → fill_blank "I have a ___"
rep(w2,
'''        {
          ai: "Do you have a brother or sister? Choose: I have a brother or I have a sister or I have no siblings",
          options: ["I have a brother", "I have a sister", "I have no siblings"]
        },''',
'''        {
          ai: "Do you have a brother or sister? Say: I have a ___",
          fill_blank: "I have a ___",
          accept_words: ["brother", "sister", "no siblings", "one brother", "two sisters", "have"]
        },''')

# Card 2 ex2: options → fill_blank "My mother ___"
rep(w2,
'''        {
          ai: "Does your mother cook? Say: Yes, my mother cooks! or No, my father cooks!",
          options: ["Yes, my mother cooks!", "No, my father cooks!"]
        },''',
'''        {
          ai: "Does your mother cook? Say: My mother ___!",
          fill_blank: "My mother ___",
          accept_words: ["cooks", "cook", "works", "helps", "sings", "reads", "mother"]
        },''')

# Card 2 ex6: options → fill_blank "I help my ___"
rep(w2,
'''        {
          ai: "Do you help your family? Choose: Yes, I help my family! or I help my mother or I help my father",
          options: ["Yes, I help my family!", "I help my mother", "I help my father"]
        }''',
'''        {
          ai: "Do you help your family? Say: I help my ___!",
          fill_blank: "I help my ___",
          accept_words: ["mother", "father", "brother", "sister", "family", "parents", "help"]
        }''')

# Card 3 ex4: options → fill_blank "My ___!"
rep(w2,
'''        {
          ai: "This person is old and loves to give you food! They are your parent's parent! Who are they? Say: My grandmother or My grandfather!",
          options: ["My grandmother!", "My grandfather!"]
        },''',
'''        {
          ai: "This person is old and loves to give you food! They are your parent's parent! Who are they? Say: My ___!",
          fill_blank: "My ___",
          accept_words: ["grandmother", "grandfather", "grandma", "grandpa", "granny"]
        },''')

# ============================================================
# WEEK 03  (6 → 7 fill_blank)
# ============================================================
print("\n--- W03 ---")
w3 = 'src/data/weeks/week_03_real.js'

# Card 3 ex5: accept → fill_blank "I look like my ___"
rep(w3,
'''        {
          ai: "Do you look like your mother or your father? Say: I look like my mother or I look like my father",
          accept: ["mother", "father", "I look like", "like my"]
        }''',
'''        {
          ai: "Do you look like your mother or your father? Say: I look like my ___!",
          fill_blank: "I look like my ___",
          accept_words: ["mother", "father", "mom", "dad", "look like", "I look"]
        }''')

# ============================================================
# WEEK 07  (3 → 7 fill_blank)
# ============================================================
print("\n--- W07 ---")
w7 = 'src/data/weeks/week_07_real.js'

# Card 1 ex2: options → fill_blank "There is a ___"
rep(w7,
'''        {
          ai: "Is there a pen? Choose: Yes, there is a pen or No, there is no pen",
          options: ["Yes, there is a pen", "No, there is no pen"]
        },''',
'''        {
          ai: "What else is in your bag? Say: There is a ___",
          fill_blank: "There is a ___",
          accept_words: ["pen", "book", "pencil", "notebook", "ruler", "eraser", "there is"]
        },''')

# Card 1 ex4: options → fill_blank "There is an ___"
rep(w7,
'''        {
          ai: "Is there an eraser in your bag? Choose: Yes, there is an eraser or No, there is no eraser",
          options: ["Yes, there is an eraser", "No, there is no eraser"]
        },''',
'''        {
          ai: "Remember: AN before vowels! Is there an eraser? Say: There is an ___",
          fill_blank: "There is an ___",
          accept_words: ["eraser", "an eraser", "umbrella", "apple"]
        },''')

# Card 2 ex3: options → fill_blank "There is an ___"
rep(w7,
'''        {
          ai: "Is there an eraser? Say: Yes, there is an eraser! or No, there is no eraser!",
          options: ["Yes, there is an eraser!", "No, there is no eraser!"]
        },''',
'''        {
          ai: "AN before vowel sounds! Say: There is an ___ in my pencil case!",
          fill_blank: "There is an ___",
          accept_words: ["eraser", "an eraser", "umbrella"]
        },''')

# Card 3 ex2: options → fill_blank "There is a ___ in my classroom"
rep(w7,
'''        {
          ai: "Is there a desk? Choose: Yes, there is a desk or No, there is no desk",
          options: ["Yes, there is a desk", "No, there is no desk"]
        },''',
'''        {
          ai: "Look around! What do you see? Say: There is a ___ in my classroom",
          fill_blank: "There is a ___ in my classroom",
          accept_words: ["desk", "chair", "board", "window", "door", "computer", "book", "there is"]
        },''')

print("\nDone.")
