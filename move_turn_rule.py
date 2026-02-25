"""
Move TURN LIMIT rule to the VERY BEGINNING of every mission_context.
Cerebras ignores rules buried at 80%+ into the prompt.
"""
import re

CRITICAL_RULE = (
    'CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, '
    '(2) ask the NEXT question from the story, '
    '(3) give 2-3 hint choices: "Say: ___ or ___!" '
    'NEVER end a response without a question + choices. '
    'LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. '
)

weeks = [f'src/data/weeks/week_0{i}_real.js' for i in range(1, 8)]

for path in weeks:
    with open(path) as f:
        c = f.read()

    def patch_ctx(m):
        ctx = m.group(1)
        # Remove old TURN LIMIT block from wherever it is
        ctx = re.sub(
            r'\s*TURN LIMIT:[^.]+\.[^.]+\.[^.]+\.',
            '',
            ctx
        ).strip()
        # Also remove any leftover sentence fragments from the removal
        ctx = re.sub(r'\s{2,}', ' ', ctx)
        # Prepend CRITICAL RULE at the very start
        new_ctx = CRITICAL_RULE + ctx
        return f'mission_context: `{new_ctx}`'

    c = re.sub(r'mission_context: `([^`]+)`', patch_ctx, c)

    with open(path, 'w') as f:
        f.write(c)
    print(f'OK: {path}')

# Audit
print()
for path in weeks:
    with open(path) as f:
        c = f.read()
    ctxs = re.findall(r'mission_context: `([^`]+)`', c)
    print(f'{path}:')
    for i, ctx in enumerate(ctxs, 1):
        tl_pos = ctx.find('CRITICAL RULE')
        pct = int(tl_pos / len(ctx) * 100) if tl_pos >= 0 else -1
        print(f'  M{i} ({len(ctx)}c): CRITICAL_RULE at {pct}%')
