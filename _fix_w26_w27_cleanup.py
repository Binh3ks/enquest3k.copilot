"""
CLEANUP: Fix wrong sub-totals added to PART 8 portfolio entries in W26/W27,
then add correct sub-total / 5 to them.
Also fix get_part_key bug by using startswith matching.
"""
import json, re, shutil

def get_part_key(title):
    """Match PART N: only at start of title, not in subtitle."""
    for key in ['PART 1', 'PART 2', 'PART 3', 'PART 4', 'PART 5', 'PART 6', 'PART 7', 'PART 8']:
        if title.startswith(key + ':') or title.startswith(key + ' '):
            return key
    return None

def cleanup_and_fix(week):
    path_mcp = f'mcp-server/data/lessons/W{week}.json'
    path_pub = f'public/data/lessons/W{week}.json'

    with open(path_mcp, encoding='utf-8') as f:
        data = json.load(f)

    changed = False
    for si, session in enumerate(data.get('sessions', [])):
        for p in session.get('parts', []):
            title = p.get('title', '')
            content = p.get('content', [])
            part_key = get_part_key(title)

            if not part_key:
                continue  # Skip unrecognized parts (homework, etc.)

            # PART 8 portfolio: should have exactly one Sub-total: ___ / 5
            if part_key == 'PART 8':
                # Remove any existing sub-total markers (may have wrong value)
                new_content = [l for l in content if 'Sub-total' not in str(l)]
                if len(new_content) != len(content):
                    print(f'  W{week} S{si+1} PART 8: removed wrong sub-total(s)')
                    changed = True
                # Add correct sub-total = 5
                if not any('Sub-total' in str(l) for l in new_content):
                    # Insert before last blank lines
                    last_non_blank = len(new_content) - 1
                    while last_non_blank >= 0 and not str(new_content[last_non_blank]).strip():
                        last_non_blank -= 1
                    new_content.insert(last_non_blank + 1, '[ Sub-total: ___ / 5 ]')
                    print(f'  W{week} S{si+1} PART 8: added [ Sub-total: ___ / 5 ]')
                    changed = True
                p['content'] = new_content

    if changed:
        with open(path_mcp, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        shutil.copy(path_mcp, path_pub)
        print(f'  -> saved W{week}')

    return changed

def update_lesson_plans():
    import glob
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
        print(f'\nCleaning up W{w}...')
        if cleanup_and_fix(w):
            any_changed = True

    if any_changed:
        update_lesson_plans()

    # Verification
    print('\n=== VERIFICATION ===')
    for w in [26, 27]:
        data = json.load(open(f'mcp-server/data/lessons/W{w}.json', encoding='utf-8'))
        for si, sess in enumerate(data['sessions']):
            total = 0
            parts_found = {}
            for p in sess['parts']:
                pk = get_part_key(p.get('title', ''))
                if not pk:
                    continue
                c = p.get('content', [])
                marker = next((str(l) for l in c if 'Sub-total' in str(l)), None)
                if marker:
                    m = re.search(r'/\s*(\d+)', marker)
                    v = int(m.group(1)) if m else 0
                    parts_found[pk] = v
                    total += v
                else:
                    parts_found[pk] = 'MISSING'
            print(f'  W{w} S{si+1}: total={total} | {parts_found}')
    print('Done.')
