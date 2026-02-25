import re

for wk in range(1, 8):
    fname = f'src/data/weeks/week_0{wk}_real.js'
    with open(fname) as f:
        c = f.read()

    # Extract missions array
    m = re.search(r'story_missions:\s*\[(.+?)(?=\n\s*conversation_cards|\n\s*reading_content)', c, re.DOTALL)
    if not m:
        print(f'W{wk}: Could not extract missions')
        continue

    block_text = m.group(1)
    # Find each mission block by splitting on mission_id
    mission_blocks = re.split(r'(?=\{\s*mission_id:)', block_text)
    print(f'\n=== WEEK {wk} ===')

    for block in mission_blocks:
        if 'mission_id' not in block:
            continue

        mid_m = re.search(r'mission_id:\s*(\d+)', block)
        title_m = re.search(r'title:\s*["\']([^"\']+)["\']', block)
        gram_m = re.search(r'grammar_pattern:\s*["\']([^"\']+)["\']', block)
        ctx_m = re.search(r'mission_context:\s*`([^`]+)`', block)
        vocab_m = re.search(r'target_vocab:\s*\[([^\]]+)\]', block)
        min_m = re.search(r'minimum_turns:\s*(\d+)', block)
        max_m = re.search(r'maximum_turns:\s*(\d+)', block)
        opening_m = re.search(r'opening_narrative:\s*["\']([^"\']+)["\']', block)
        char_m = re.search(r'story_character:\s*\{[^}]*name:\s*["\']([^"\']+)["\']', block)
        arc_m = re.search(r'story_arc:\s*\[([^\]]+)\]', block, re.DOTALL)

        mid = mid_m.group(1) if mid_m else '?'
        title = title_m.group(1) if title_m else '?'

        print(f'  M{mid}: {title}')
        print(f'    char: {char_m.group(1) if char_m else "N/A"}')
        print(f'    grammar: {gram_m.group(1) if gram_m else "N/A"}')
        print(f'    turns: {min_m.group(1) if min_m else "?"}-{max_m.group(1) if max_m else "?"}')
        print(f'    ctx_len: {len(ctx_m.group(1)) if ctx_m else 0}c')

        if vocab_m:
            words = re.findall(r'["\']([^"\']+)["\']', vocab_m.group(1))
            print(f'    vocab ({len(words)}): {words}')

        if opening_m:
            op = opening_m.group(1)
            print(f'    opening ({len(op)}c): {op[:100]}{"..." if len(op)>100 else ""}')

        if arc_m:
            steps = re.findall(r'["\']([^"\']{10,})["\']', arc_m.group(1))
            print(f'    story_arc ({len(steps)} steps): {steps[0][:60] if steps else "empty"}...')
        print()
