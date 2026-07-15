"""
Add missing Sub-total markers to W26 and W27 all sessions.
Uses corrected item counting logic matching the renderer's isExLine.
"""
import json, re, shutil

ARROW = '\u2192'

def count_items(content):
    """Count scored exercise items using renderer-matching logic."""
    count = 0
    for line in content:
        t = str(line).strip()
        if not t: continue
        if t.startswith(ARROW) or t.startswith('\u2b1b'): continue
        if re.match(r'^[_\s]+$', t): continue
        if re.match(r'^\[\s*(Sub-total|Total)', t) or re.search(r'/\s*\d+\s*\]', t): continue
        if re.match(r'^Stage\s+\d', t) or re.match(r'^(\[O\]\s*)?L[1-5]\s*[—–\-]', t): continue
        if re.match(r'^Student [AB]:|^Goal:', t): continue
        if re.match(r'^Grammar sentences.*:', t) and '____' not in t: continue
        if re.match(r'^(Extension|Challenge|Design challenge):', t) and '____' not in t: continue
        if re.match(r'^Write\s+.+:\s*$', t): continue
        if re.match(r'^(\[O\]\s*)?[A-F]\.\s*(Stage|Dictation|Inference)', t): continue
        if re.match(r'^[A-F]\.\s*$', t): continue
        # Match exercise items
        if (t.startswith('T / F:') or
            ('____' in t and not t.startswith(ARROW)) or
            ' -> ' in t or
            t.startswith('Base:') or
            re.match(r'^Type\s+[A-Z]', t)):
            count += 1
    return count

def insert_subtotal(content, value):
    """Insert [ Sub-total: ___ / N ] before the last blank lines."""
    # Find last non-blank line index
    last_non_blank = len(content) - 1
    while last_non_blank >= 0 and not str(content[last_non_blank]).strip():
        last_non_blank -= 1
    # Insert after last_non_blank
    content.insert(last_non_blank + 1, f'[ Sub-total: ___ / {value} ]')
    return content

# Fixed values for parts where counting is unreliable
FIXED_VALUES = {
    'PART 4': 5,  # Listening: 2 written + inference + dictation
    'PART 5': 3,  # Error Correction: Type A/B/C
    'PART 8': 5,  # Portfolio entry
}

# Minimum fallback values
MIN_VALUES = {
    'PART 1': 4,
    'PART 2': 4,
    'PART 3': 10,
    'PART 6': 3,
    'PART 7': 4,
}

def get_part_key(title):
    for key in ['PART 1', 'PART 2', 'PART 3', 'PART 4', 'PART 5', 'PART 6', 'PART 7', 'PART 8']:
        if key in title:
            return key
    return None

def fix_week(week):
    path_mcp = f'mcp-server/data/lessons/W{week}.json'
    path_pub = f'public/data/lessons/W{week}.json'

    with open(path_mcp, encoding='utf-8') as f:
        data = json.load(f)

    changed = False
    for si, session in enumerate(data.get('sessions', [])):
        for p in session.get('parts', []):
            title = p.get('title', '')
            content = p.get('content', [])

            # Skip unscored parts
            if ('HOMEWORK' in title or 'PART 9' in title or
                title.startswith('WEEK') or 'SPIRAL' in title):
                continue

            # Skip if already has Sub-total
            if any('Sub-total' in str(l) for l in content):
                continue

            part_key = get_part_key(title)
            if not part_key:
                continue

            # Determine sub-total value
            if part_key in FIXED_VALUES:
                value = FIXED_VALUES[part_key]
            else:
                value = count_items(content)
                min_val = MIN_VALUES.get(part_key, 1)
                if value < min_val:
                    value = min_val

            # Insert the sub-total marker
            p['content'] = insert_subtotal(list(content), value)
            print(f'  W{week} S{si+1} {part_key}: added [ Sub-total: ___ / {value} ]')
            changed = True

    if changed:
        with open(path_mcp, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        shutil.copy(path_mcp, path_pub)
        print(f'  -> saved W{week}')

    return changed

def update_lesson_plans():
    import os, glob
    plans = {}
    for f in sorted(glob.glob('mcp-server/data/lessons/W*.json')):
        m = re.search(r'W(\d+)', f)
        if m:
            with open(f, encoding='utf-8') as fp:
                plans[m.group(1)] = json.load(fp)
    with open('public/data/lessonPlans.json', 'w', encoding='utf-8') as f:
        json.dump(plans, f, ensure_ascii=False, indent=2)
    print('Updated lessonPlans.json')

if __name__ == '__main__':
    any_changed = False
    for w in [26, 27]:
        print(f'\nProcessing W{w}...')
        if fix_week(w):
            any_changed = True

    if any_changed:
        update_lesson_plans()

    # Verify
    print('\n=== VERIFICATION ===')
    for w in [26, 27]:
        data = json.load(open(f'mcp-server/data/lessons/W{w}.json', encoding='utf-8'))
        session_totals = []
        for si, sess in enumerate(data['sessions']):
            total = 0
            missing = []
            for p in sess['parts']:
                title = p.get('title', '')
                if ('HOMEWORK' in title or 'PART 9' in title or
                    title.startswith('WEEK') or 'SPIRAL' in title):
                    continue
                part_key = get_part_key(title)
                if not part_key:
                    continue
                c = p.get('content', [])
                marker = next((str(l) for l in c if 'Sub-total' in str(l)), None)
                if marker:
                    m = re.search(r'/\s*(\d+)', marker)
                    if m:
                        total += int(m.group(1))
                else:
                    missing.append(part_key)
            session_totals.append(total)
            if missing:
                print(f'  W{w} S{si+1}: STILL MISSING {missing}')
        print(f'  W{w}: session totals = {session_totals}')
    print('Done.')
