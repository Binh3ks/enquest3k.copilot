import json, re, glob

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

# W30/W32/W33/W34 PART 3 has only L1(10)+L4(10)+L5(5)=25 actual items
# I wrongly changed /25 -> /45. Revert back to /25.
for wk in [30, 32, 33, 34]:
    print(f"\n=== Reverting W{wk} PART 3 /45 -> /25 ===")
    for path in [f"mcp-server/data/lessons/W{wk}.json",
                 f"public/data/lessons/W{wk}.json"]:
        data = json.load(open(path, encoding='utf-8'))
        changed = 0
        for si, s in enumerate(data['sessions']):
            for p in s['parts']:
                if not p['title'].startswith('PART 3'):
                    continue
                for i, l in enumerate(p['content']):
                    if str(l).strip() == '[ Sub-total: ___ / 45 ]':
                        p['content'][i] = '[ Sub-total: ___ / 25 ]'
                        changed += 1
                        print(f"  W{wk} S{si+1}: /45 -> /25")
        save(path, data)
        print(f"  {changed} marker(s) reverted")

rebuild_lesson_plans()
print("\nDone.")
