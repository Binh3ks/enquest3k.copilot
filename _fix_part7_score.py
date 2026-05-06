"""
Fix PART 7 sub-total: /5 → /6 for W29, W30, W32, W33, W34, W35.
These weeks have 6 plain ____ items in PART 7 (no numbered prefix),
so the renderer correctly numbers them 1-6, but the marker incorrectly says /5.
"""
import json, re, shutil

WEEKS_TO_FIX = [29, 30, 32, 33, 34, 35]

def fix_week(week):
    path_mcp = f'mcp-server/data/lessons/W{week}.json'
    path_pub = f'public/data/lessons/W{week}.json'
    with open(path_mcp, encoding='utf-8') as f:
        data = json.load(f)

    changed = False
    for si, session in enumerate(data.get('sessions', [])):
        for p in session.get('parts', []):
            title = p.get('title', '')
            # Only PART 7 (not PART 7X or embedded)
            if not (title.startswith('PART 7:') or title.startswith('PART 7 ')):
                continue
            content = p.get('content', [])
            new_content = []
            for line in content:
                ls = str(line)
                # Replace sub-total /5 with /6
                fixed = re.sub(r'(\[\s*Sub-total[^/]*/\s*)5(\s*\])', r'\g<1>6\2', ls)
                if fixed != ls:
                    print(f'  W{week} S{si+1} PART 7: "{ls.strip()}" → "{fixed.strip()}"')
                    changed = True
                new_content.append(fixed)
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
    for w in WEEKS_TO_FIX:
        print(f'Processing W{w}...')
        if fix_week(w):
            any_changed = True

    if any_changed:
        update_lesson_plans()

    # Verify
    print('\n=== Verification ===')
    for w in WEEKS_TO_FIX:
        data = json.load(open(f'mcp-server/data/lessons/W{w}.json', encoding='utf-8'))
        for si, sess in enumerate(data['sessions']):
            for p in sess['parts']:
                if p.get('title','').startswith('PART 7'):
                    marker = next((str(l) for l in p.get('content',[]) if 'Sub-total' in str(l)), 'MISSING')
                    print(f'  W{w} S{si+1} PART7: {marker.strip()}')
    print('Done.')
