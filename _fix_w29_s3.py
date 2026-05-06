"""
W29 S3 PART 3: remove L1 section (tôi vừa thêm vào) và đặt lại /35.
W29 S3 original = L2+L3+L4+L5 = 35 pts -> S3 total = 6+16+35+7+3+5+6+6 = 84 pts ✓ (reasonable for S3)
"""
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

# L1 block we inserted for W29 S3 (forest/animals theme)
L1_W29_S3_FIRST = "L1 — Read the clue and write the word (10 items)"

for path in ["mcp-server/data/lessons/W29.json", "public/data/lessons/W29.json"]:
    data = json.load(open(path, encoding='utf-8'))
    s3 = data['sessions'][2]
    for p in s3['parts']:
        if not p['title'].startswith('PART 3'):
            continue
        c = list(p['content'])
        # Find L1 section header
        l1_start = next((i for i, l in enumerate(c) if str(l).strip() == L1_W29_S3_FIRST), None)
        if l1_start is None:
            print(f"  {path}: L1 not found in S3 - skipping")
            continue
        # Find L2 section (after L1) - remove everything from L1 up to L2
        l2_start = next((i for i, l in enumerate(c) if i > l1_start and re.match(r'^L2\s*[——\-–]', str(l).strip())), None)
        if l2_start is None:
            print(f"  {path}: L2 not found after L1 - skipping")
            continue
        removed = c[l1_start:l2_start]
        c = c[:l1_start] + c[l2_start:]
        print(f"  {path}: removed {len(removed)} lines (L1 section) from S3")
        # Fix sub-total
        for i, l in enumerate(c):
            if '[ Sub-total: ___ / 45 ]' == str(l).strip():
                c[i] = '[ Sub-total: ___ / 35 ]'
                print(f"  {path}: S3 sub-total /45 -> /35")
                break
        p['content'] = c
    save(path, data)

rebuild_lesson_plans()
print("\nDone. W29 S3 total will be: 6+16+35+7+3+5+6+6 = 84 pts")
