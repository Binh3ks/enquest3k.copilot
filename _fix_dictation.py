"""
Fix ALL Dictation sections in PART 4 across all weeks:
- Add instruction: "teacher reads twice — students write N sentence(s)"
- Add numbered blank line(s) for student writing
- S1/S2: 1 sentence → 1 blank line
- S3: 2 sentences → 2 blank lines
"""
import json, re, glob, copy

BLANK = '________________________________________________________________'

def fix_dictation_in_part(content, session_idx):
    """
    Returns new content list with dictation fixed.
    session_idx: 0/1 = S1/S2 (1 sentence), 2 = S3 (2 sentences)
    """
    c = list(content)
    n_sentences = 1 if session_idx in (0, 1) else 2

    # Find dictation line index
    dict_idx = next((i for i, l in enumerate(c)
                     if re.match(r'^D\.\s+Dictation', str(l).strip())), None)
    if dict_idx is None:
        return c  # no dictation section

    # Standard instruction line
    instruction = (f'D. Dictation (teacher reads twice — students write {n_sentences} sentence{"s" if n_sentences > 1 else ""}):')

    # Remove old dictation line and any immediately following broken lines
    # (lone '1.', '2.', pure underscores, inline blanks)
    end = dict_idx + 1
    while end < len(c):
        t = str(c[end]).strip()
        # Stop at Sub-total marker or next section header
        if re.match(r'^\[\s*(Sub-total|Total)', t): break
        if re.match(r'^[A-Z]\.\s+(Stage|Dictation)', t): break
        if re.match(r'^⬛', t): break
        # Remove broken placeholder lines
        if re.match(r'^\d+\.\s*$', t): end += 1; continue          # lone '1.'
        if re.match(r'^[_\s]+$', t): end += 1; continue             # pure underscores
        if re.match(r'^\d+\.\s*_{5,}', t): end += 1; continue       # '1.____'
        if re.match(r'^Write.*:{0,1}\s*$', t): end += 1; continue   # 'Write:' no blank
        break

    # Build replacement block
    new_lines = [instruction]
    for i in range(1, n_sentences + 1):
        new_lines.append(f'{i}. {BLANK}')

    # Replace old dictation lines with new block
    c = c[:dict_idx] + new_lines + c[end:]
    return c

def fix_file(path):
    data = json.load(open(path, encoding='utf-8'))
    changed = False
    for si, s in enumerate(data['sessions']):
        for p in s['parts']:
            if not p['title'].startswith('PART 4'):
                continue
            original = p['content']
            fixed = fix_dictation_in_part(original, si)
            if fixed != original:
                p['content'] = fixed
                changed = True
    return data, changed

def save(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def rebuild_lesson_plans():
    import glob as g
    plans = {}
    for f in sorted(g.glob('mcp-server/data/lessons/W*.json')):
        m = re.search(r'W(\d+)', f)
        if m:
            plans[m.group(1)] = json.load(open(f, encoding='utf-8'))
    with open('public/data/lessonPlans.json', 'w', encoding='utf-8') as f:
        json.dump(plans, f, ensure_ascii=False, indent=2)
    print('  Rebuilt public/data/lessonPlans.json')

if __name__ == '__main__':
    changed_weeks = []
    for mcp_path in sorted(glob.glob('mcp-server/data/lessons/W*.json')):
        w = re.search(r'W(\d+)', mcp_path).group(1)
        pub_path = f'public/data/lessons/W{w}.json'

        data, changed = fix_file(mcp_path)
        if changed:
            save(mcp_path, data)
            save(pub_path, data)
            changed_weeks.append(w)
            print(f'  Fixed W{w}')
        else:
            print(f'  W{w} — no change')

    if changed_weeks:
        rebuild_lesson_plans()
        print(f'\nFixed weeks: {", ".join("W"+w for w in changed_weeks)}')
    else:
        print('\nNothing changed.')
