import re

filepath = 'src/data/weeks/week_06_real.js'
with open(filepath) as f:
    c = f.read()

ctxs = list(re.finditer(r'mission_context: `([^`]+)`', c))
print('Total mission_context found:', len(ctxs))

m = ctxs[1]
print('M2 current len:', len(m.group(1)))
print('M2 starts with:', m.group(1)[:60])

new_ctx = ('This is Week 6 Mission 2 - Flashlight Treasure Hunt. '
           'STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. '
           'CHARACTER: Captain Nova shines a magic flashlight in a very dark room. '
           'The light reveals treasure locations one by one. In-character sound effects (Click! Shine! Look!) keep energy high. '
           'GAME MECHANIC: Shine flashlight on an object or location \u2192 student says where the treasure is using a complete preposition sentence. '
           'LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. '
           'GRAMMAR FOCUS: Prepositions (in/on/under/next to). '
           'Give FULL scaffolding: "Say: The treasure is ON the desk!" or "Say: It is UNDER the box!" '
           'VOCABULARY: box, desk, floor, wall, window, door, hide, seek, treasure, hunt. '
           'STRICT FOCUS: LOCATION ONLY. '
           'RECAST ERRORS: student says "under chair" \u2192 "Yes! IT IS under the chair! Full sentence!" '
           'FORBIDDEN: No preferences, feelings. '
           'SAMPLE TURN: Shine \u2192 "Look! I see something! Where is the coin? Say: The coin is ___!" '
           'MINIMUM: 10 turns.')

print('New M2 len:', len(new_ctx))

nc = c[:m.start()] + 'mission_context: `' + new_ctx + '`' + c[m.end():]
with open(filepath, 'w') as f:
    f.write(nc)
print('OK [W06 M2] written')

# Verify
with open(filepath) as f:
    c2 = f.read()
ctxs2 = re.findall(r'mission_context: `([^`]+)`', c2)
print('Verify M2 len:', len(ctxs2[1]))
print('Verify M2 ends:', ctxs2[1][-50:])
