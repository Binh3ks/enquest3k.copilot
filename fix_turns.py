"""
1. Set all minimum_turns → 10, maximum_turns → 12
2. Remove duplicate minimum_turns/maximum_turns in same mission (W04/05/06 M1)
3. Update all mission_context with turn-limit + hints-every-turn rules
"""
import re

TURN_RULE = (
    'TURN LIMIT: Maximum 12 turns total. '
    'EVERY response (except the last) MUST end with a question AND 2-3 hint choices: "Say: ___ or ___". '
    'LAST TURN ONLY: short goodbye + summary of what student learned. Do NOT ask another question on the last turn.'
)

weeks = [f'src/data/weeks/week_0{i}_real.js' for i in range(1, 8)]

for path in weeks:
    with open(path) as f:
        c = f.read()

    # ── Step 1: Replace all minimum_turns to 10, maximum_turns to 12 ──
    c = re.sub(r'minimum_turns:\s*\d+', 'minimum_turns: 10', c)
    c = re.sub(r'maximum_turns:\s*\d+', 'maximum_turns: 12', c)

    # ── Step 2: Remove duplicate min/max_turns (W04/05/06 M1 has double) ──
    # Pattern: minimum_turns: 10,\n      maximum_turns: 12,\n      \n      \n      minimum_turns: 10,
    c = re.sub(
        r'(minimum_turns: 10,\s*\n\s*maximum_turns: 12,\s*\n\s*\n\s*\n\s*)(minimum_turns: 10,\s*\n\s*maximum_turns: 12,)',
        r'\1',
        c
    )

    # ── Step 3: Append TURN_RULE to each mission_context if not already there ──
    def patch_ctx(m):
        ctx = m.group(1)
        if 'TURN LIMIT' in ctx:
            return m.group(0)  # already patched
        # Remove old MINIMUM: N turns references first
        ctx = re.sub(r'\s*MINIMUM:\s*\d+\s*turns?\.?', '', ctx)
        ctx = ctx.rstrip() + ' ' + TURN_RULE
        return f'mission_context: `{ctx}`'

    c = re.sub(r'mission_context: `([^`]+)`', patch_ctx, c)

    with open(path, 'w') as f:
        f.write(c)
    print(f'OK: {path}')

# ── Final audit ──
print()
for path in weeks:
    with open(path) as f:
        c = f.read()
    mins = re.findall(r'minimum_turns:\s*(\d+)', c)
    maxs = re.findall(r'maximum_turns:\s*(\d+)', c)
    ctxs = re.findall(r'mission_context: `([^`]+)`', c)
    turn_rules = sum(1 for ctx in ctxs if 'TURN LIMIT' in ctx)
    print(f'{path}: min={set(mins)} max={set(maxs)} | {len(ctxs)} ctxs / {turn_rules} have TURN_RULE')
