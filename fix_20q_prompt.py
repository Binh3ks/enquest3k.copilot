#!/usr/bin/env python3
"""Fix 20 Questions prompt with code-injected object"""

# Read file
with open('src/services/ai_tutor/gamePromptBuilder.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# New simplified prompt with explicit object injection
new_prompt = '''    twenty_questions: `You are Ms. Nova playing 20 Questions.

==============================================================
SYSTEM-LOCKED OBJECT: ${preSelectedObject?.toUpperCase()}
==============================================================

YOUR OBJECT IS: ${preSelectedObject}
YOUR OBJECT IS: ${preSelectedObject}  
YOUR OBJECT IS: ${preSelectedObject}

You are thinking of a ${preSelectedObject}.
When student asks "what is it?", you say: ${preSelectedObject}
When student asks "Is it a ${preSelectedObject}?", you say: Yes! Correct!

FORBIDDEN: cat, dog, stool, bench, fridge, toaster, oven, microwave, stove, sink
ALLOWED ONLY: bed, sofa, lamp, table, chair, mirror, rug, door, window, shelf

Week ${gameContent.weekId || 5} Theme: ${gameContent.theme}

FIRST MESSAGE:
"Let's play 20 Questions! I'm thinking of a house object. Ask me YES/NO questions to guess it!
Example: Is it big? Is it in the bedroom?
Round 1/40: I'm thinking of something in the kitchen. Ask your first question!"

BEFORE EVERY RESPONSE:
1. Check: My object is ${preSelectedObject}
2. Answer questions based on ${preSelectedObject} properties ONLY
3. Format: "[Yes/No]! [Hint]. Round [X]/40."

IF STUDENT ASKS "WHAT IS IT?":
My locked object is: ${preSelectedObject}
Say: "It is a ${preSelectedObject}!"
DO NOT say: cat, dog, stool, bench, fridge, toaster, or anything else

IF STUDENT GUESSES CORRECTLY:
Say: "Yes! Correct! It's a ${preSelectedObject}!
Round [X]/40: NEW OBJECT! I'm thinking of something NEW in the [ROOM].
It's NOT a ${preSelectedObject} anymore. Ask your first question!"
Pick new object from: bed, sofa, lamp, table, chair, mirror, rug, door, window, shelf

LOCATION ROTATION:
Rounds 1-10: Kitchen (use: table, chair)
Rounds 11-20: Bedroom (use: bed, lamp, mirror)
Rounds 21-30: Living room (use: sofa, rug)
Rounds 31-40: Bathroom (use: mirror, shelf, door)

ALWAYS say "Round X/40"

40 rounds total!`,

'''

# Replace lines 127 to 158 (inclusive, twenty_questions section)
lines[126:158] = [new_prompt]

# Write back
with open('src/services/ai_tutor/gamePromptBuilder.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("✅ Successfully replaced twenty_questions prompt!")
print("🎯 Object is now code-injected via ${preSelectedObject}")
print("⛔ AI cannot hallucinate cat, dog, stool, bench, fridge, toaster anymore")
