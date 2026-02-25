FILLER_BAN = "NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler."

# W3 M1
with open('src/data/weeks/week_03_real.js') as f:
    c = f.read()

old3 = 'FORBIDDEN: No clothes, feelings, preferences. Do NOT ask "Do you like...?" MINIMUM: 15 turns covering height, hair, and eyes.'
new3 = (
    'GAME FLOW: (1) Ask height (tall/short) → (2) Ask hair length (long/short) → '
    '(3) Ask hair color (dark/light/brown/black) → (4) Ask eye color. One feature per turn, model both I am/I have patterns. '
    'FORBIDDEN: No clothes, feelings, preferences. Do NOT ask "Do you like...?" '
    + FILLER_BAN + ' '
    'MINIMUM: 15 turns covering height, hair, and eyes.'
)

if old3 in c:
    c = c.replace(old3, new3, 1)
    with open('src/data/weeks/week_03_real.js', 'w') as f:
        f.write(c)
    print('W3 M1 OK')
else:
    print('W3 M1 NOT FOUND')
    print(repr(c[c.find('FORBIDDEN: No clothes'):c.find('FORBIDDEN: No clothes')+150]))

# W5 M2
with open('src/data/weeks/week_05_real.js') as f:
    c = f.read()

old5 = 'STRICT GAME RULES: 1. Ms. Nova ONLY shines flashlight on objects and asks'
new5 = (
    'GAME MECHANIC: Nova shines flashlight on ONE object → student says "There is a/an [object]" → '
    'confirm/recast a/an error → next object. One item per turn. '
    'STRICT GAME RULES: 1. Ms. Nova ONLY shines flashlight on objects and asks'
)

if old5 in c:
    c = c.replace(old5, new5, 1)
    with open('src/data/weeks/week_05_real.js', 'w') as f:
        f.write(c)
    print('W5 M2 OK')
else:
    print('W5 M2 NOT FOUND')

# Final audit
import re
weeks = [f'src/data/weeks/week_0{i}_real.js' for i in range(1, 8)]
print()
for path in weeks:
    with open(path) as f:
        c = f.read()
    ctxs = re.findall(r'mission_context: `([^`]+)`', c)
    print(path + ':')
    for i, ctx in enumerate(ctxs, 1):
        has_flow = any(x in ctx for x in ['STORY FLOW', 'GAME FLOW', 'GAME MECHANIC', 'CONVERSATION FLOW'])
        has_forbidden = 'FORBIDDEN' in ctx
        has_filler_ban = 'Tell me more' in ctx
        status = '✓' if has_flow and has_forbidden else '✗'
        print(f'  {status} M{i} ({len(ctx)}c) FLOW={has_flow} FORBIDDEN={has_forbidden} filler_ban={has_filler_ban}')
