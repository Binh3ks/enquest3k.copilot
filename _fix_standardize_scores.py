"""
Standardize session totals across all weeks to ~83 pts (±5).
Problems fixed:
  W26 all sessions: 64-66 → ~82
  W31 S1/S2: 74 → 82
  W35 S1/S2: 75 → 83
  W36 S3: 77 → 87
"""
import json, re, glob, copy

def save(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  Saved {path}")

def rebuild_lesson_plans():
    plans = {}
    for f in sorted(glob.glob('mcp-server/data/lessons/W*.json')):
        m = re.search(r'W(\d+)', f)
        if m:
            plans[m.group(1)] = json.load(open(f, encoding='utf-8'))
    with open('public/data/lessonPlans.json', 'w', encoding='utf-8') as f:
        json.dump(plans, f, ensure_ascii=False, indent=2)
    print("  Rebuilt public/data/lessonPlans.json")

def find_subtotal_idx(content):
    for i, l in enumerate(content):
        if re.search(r'\[\s*Sub-total', str(l)):
            return i
    return len(content)

def change_subtotal(content, old_n, new_n):
    for i, l in enumerate(content):
        if re.search(rf'\[\s*Sub-total[^\]]*\/\s*{old_n}\s*\]', str(l)):
            content[i] = f'[ Sub-total: ___ / {new_n} ]'
            return True
    return False

# ════════════════════════════════════════════════════════════
# W26: +16 pts across PART 1, PART 2, PART 3, PART 6
# ════════════════════════════════════════════════════════════

WALKED_WORD_BLOCK = [
    'walked (Vietnamese: đã đi bộ)',
    '→ Write 3 times: ____________________ ____________________ ____________________',
    '→ Key Collocation: walked + [place]',
    '→ Collocation practice:',
    'a. I walked ____________________________________________________________ (to school / a chair).',
    'b. She walked ____________________________________________________________ (in the park / on a table).',
    '→ Your turn: I walked ____________________________________________________________',
]

def fix_w26():
    print("\n=== W26 ===")
    src = json.load(open("mcp-server/data/lessons/W26.json", encoding='utf-8'))
    for si, s in enumerate(src['sessions']):
        for p in s['parts']:
            title = p['title']
            c = list(p['content'])

            # --- PART 1: add 2 T/F items → /4→/6 ---
            if title.startswith('PART 1'):
                idx = find_subtotal_idx(c)
                c.insert(idx, 'T / F: Max walked to the park in the afternoon.')
                c.insert(idx, 'T / F: Max cleaned his room on Saturday.')
                changed = change_subtotal(c, 4, 6)
                print(f"  W26 S{si+1} PART1: +2 T/F → /6 ({'ok' if changed else 'MARKER NOT FOUND'})")
                p['content'] = c

            # --- PART 2: S1/S2 add 'walked' word → /6→/8; S3 add 2 sentences → /4→/6 ---
            elif title.startswith('PART 2'):
                idx = find_subtotal_idx(c)
                if si in (0, 1):
                    # S1/S2: insert walked word block before sub-total
                    c = c[:idx] + WALKED_WORD_BLOCK + c[idx:]
                    changed = change_subtotal(c, 6, 8)
                    print(f"  W26 S{si+1} PART2: +walked word → /8 ({'ok' if changed else 'MARKER NOT FOUND'})")
                else:
                    # S3: add 2 more writing items before sub-total
                    idx = find_subtotal_idx(c)
                    c.insert(idx, 'Write 1 sentence with "Finally, I cleaned": ____________________________________________________________')
                    c.insert(idx, 'Write 1 sentence with "Then, I helped": ____________________________________________________________')
                    changed = change_subtotal(c, 4, 6)
                    print(f"  W26 S{si+1} PART2: +2 items → /6 ({'ok' if changed else 'MARKER NOT FOUND'})")
                p['content'] = c

            # --- PART 3: marker /35→/45 (content already has [O]L2 with 10 items) ---
            elif title.startswith('PART 3'):
                changed = change_subtotal(c, 35, 45)
                print(f"  W26 S{si+1} PART3: /35→/45 ({'ok' if changed else 'MARKER NOT FOUND'})")
                p['content'] = c

            # --- PART 6: add 2 fill-in items → /3→/5 ---
            elif title.startswith('PART 6'):
                idx = find_subtotal_idx(c)
                if si in (0, 1):
                    c.insert(idx, 'Fill-in: The characters in a comic tell the story through ____________________________________________________________')
                    c.insert(idx, 'T / F: A comic strip uses only words and no pictures.')
                else:
                    c.insert(idx, 'Fill-in: Looking at your audience helps them feel ____________________________________________________________')
                    c.insert(idx, 'T / F: A good presenter looks at the floor when speaking.')
                changed = change_subtotal(c, 3, 5)
                print(f"  W26 S{si+1} PART6: +2 items → /5 ({'ok' if changed else 'MARKER NOT FOUND'})")
                p['content'] = c

    for path in ["mcp-server/data/lessons/W26.json", "public/data/lessons/W26.json"]:
        save(path, src)

# ════════════════════════════════════════════════════════════
# W31 S1/S2: PART 3 expand 8→10 items per L-section → /37→/45
# ════════════════════════════════════════════════════════════

# ── W31 S1: Match / Unscramble / Fill-in / Sentence Expansion ───────────────
W31_S1 = {
    'L1': [
        'The rabbit quickly hid _________ i. behind the tall tree.',
        'The forest smell was _________ j. amazing and fresh.',
    ],
    'L2': [
        '9. heard / singing / birds / I / the / beautiful',
        '→ ________________________________________',
        '10. smelt / wonderful / forest / The / fresh / and / air',
        '→ ________________________________________',
    ],
    'L3': [
        'Max _______________ (see / saw / seen) the beautiful sunset.',
        'I _______________ (smell / smelt / smelling) the fresh flowers in the garden.',
    ],
    'L4': [
        'Base: I smelt. + Add: (the fresh morning air)',
        '→ ________________________________________',
        'Base: Max saw. + Add: (tall trees and colorful birds)',
        '→ ________________________________________',
    ],
}

# ── W31 S2: T/F Justification / Fix Mistakes / Odd One Out / Complete Dialogue ─
W31_S2 = {
    'L1': [
        '"I heard the beautiful forest." T / F. Why? ________________________________________',
        '"I smelt the bright colors of the painting." T / F. Why? ________________________________________',
    ],
    'L2': [
        '9. I goed to the forest yesterday.',
        '→ ________________________________________',
        '10. She sawed a big tree near the river.',
        '→ ________________________________________',
    ],
    'L3': [
        'happy / excited / joyful / went',
        'big / large / huge / heard',
    ],
    'L4': [
        'A: What did you 9._______________ in the forest?',
        'B: I 10._______________ many colorful birds!',
    ],
}

def expand_part3(content, extras, has_speaking=False):
    """Insert extra items into each L-section. Reverse order preserves indices."""
    c = list(content)

    def find_sec(label):
        return next((i for i, l in enumerate(c) if re.match(rf'^\[O\]\s*{label}[\s—–\-]', str(c[i]).strip())), None)

    # L4 extra → before L5
    l5 = find_sec('L5')
    if l5 and 'L4' in extras:
        c = c[:l5] + extras['L4'] + c[l5:]

    # L3 extra → before L4 (recalc)
    l4 = find_sec('L4')
    if l4 and 'L3' in extras:
        c = c[:l4] + extras['L3'] + c[l4:]

    # L2 extra → before ⬛ SPEAKING (if present) else before L3
    if 'L2' in extras:
        if has_speaking:
            sp = next((i for i, l in enumerate(c) if '⬛' in str(l)), None)
            target = sp
        else:
            target = find_sec('L3')
        if target is not None:
            c = c[:target] + extras['L2'] + c[target:]

    # L1 extra → before L2 (recalc)
    l2 = find_sec('L2')
    if l2 and 'L1' in extras:
        c = c[:l2] + extras['L1'] + c[l2:]

    return c

def fix_w31():
    print("\n=== W31 S1/S2 PART3 ===")
    src = json.load(open("mcp-server/data/lessons/W31.json", encoding='utf-8'))
    for si, extras in ((0, W31_S1), (1, W31_S2)):
        for p in src['sessions'][si]['parts']:
            if not p['title'].startswith('PART 3'):
                continue
            orig_len = len(p['content'])
            c = expand_part3(p['content'], extras, has_speaking=True)
            changed = change_subtotal(c, 37, 45)
            print(f"  W31 S{si+1} PART3: {orig_len}→{len(c)} lines, /37→/45 ({'ok' if changed else 'WARN: marker not found'})")
            p['content'] = c
    for path in ["mcp-server/data/lessons/W31.json", "public/data/lessons/W31.json"]:
        save(path, src)

# ════════════════════════════════════════════════════════════
# W35 S1/S2: PART 3 expand 8→10 items per L-section → /37→/45
# ════════════════════════════════════════════════════════════

# ── W35 S1: Match / Unscramble / Fill-in / Sentence Expansion ───────────────
W35_S1 = {
    'L1': [
        'My teacher gave _________ i. us all a gold star.',
        'I put _________ j. shells in my pocket.',
    ],
    'L2': [
        '9. shells / the / I / found / on / beach.',
        '→ ________________________________________',
        '10. felt / tired / but / We / happy.',
        '→ ________________________________________',
    ],
    'L3': [
        'Dad ________________________________________ (make / made / makes) a big sandcastle for us.',
        'Mom ________________________________________ (give / gave / gives) me a beautiful shell.',
    ],
    'L4': [
        'Base: Dad made. Add: a beautiful sandcastle',
        '→ ________________________________________',
        'Base: Mom gave. Add: me a pretty shell',
        '→ ________________________________________',
    ],
}

# ── W35 S2: Odd One Out / Find Mistake / Sentence Transformation / T/F Justification ─
W35_S2 = {
    'L1': [
        'see / made / walked / ran',
        'felt / gave / go / went',
    ],
    'L2': [
        '9. She sawed the beautiful sunset.',
        '→ ________________________________________',
        '10. I gived my friend a birthday card.',
        '→ ________________________________________',
    ],
    'L3': [
        'She goes to the park.',
        '→ Yesterday, ________________________________________.',
        'They make a kite.',
        '→ Yesterday, ________________________________________.',
    ],
    'L4': [
        '"I gave a sandwich to my teacher" is a logical sentence. T / F. Why? ________________________________________',
        '"I saw a rainbow at night" is a logical sentence. T / F. Why? ________________________________________',
    ],
}

def fix_w35():
    print("\n=== W35 S1/S2 PART3 ===")
    src = json.load(open("mcp-server/data/lessons/W35.json", encoding='utf-8'))
    for si, extras in ((0, W35_S1), (1, W35_S2)):
        for p in src['sessions'][si]['parts']:
            if not p['title'].startswith('PART 3'):
                continue
            orig_len = len(p['content'])
            c = expand_part3(p['content'], extras, has_speaking=False)
            changed = change_subtotal(c, 37, 45)
            print(f"  W35 S{si+1} PART3: {orig_len}→{len(c)} lines, /37→/45 ({'ok' if changed else 'WARN: marker not found'})")
            p['content'] = c
    for path in ["mcp-server/data/lessons/W35.json", "public/data/lessons/W35.json"]:
        save(path, src)

# ════════════════════════════════════════════════════════════
# W36 S3: PART 3 marker /25→/35
# ════════════════════════════════════════════════════════════

def fix_w36_s3():
    print("\n=== W36 S3 PART3 /25→/35 ===")
    src = json.load(open("mcp-server/data/lessons/W36.json", encoding='utf-8'))
    for p in src['sessions'][2]['parts']:
        if not p['title'].startswith('PART 3'):
            continue
        c = list(p['content'])
        changed = change_subtotal(c, 25, 35)
        print(f"  W36 S3 PART3: /25→/35 ({'ok' if changed else 'WARN: marker not found'})")
        p['content'] = c
    for path in ["mcp-server/data/lessons/W36.json", "public/data/lessons/W36.json"]:
        save(path, src)

# ════════════════════════════════════════════════════════════
# main
# ════════════════════════════════════════════════════════════

if __name__ == '__main__':
    fix_w26()
    fix_w31()
    fix_w35()
    fix_w36_s3()
    rebuild_lesson_plans()
    print("\nAll done.")
