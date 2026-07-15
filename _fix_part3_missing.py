"""
Fix PART 3 issues:
  - W29 S1/S2: Add L1 (10 vocab clue items) + L5 (5 write-own items), update /30 → /45
  - W29 S3   : Add L1 (10 vocab clue items, forest theme),             update /35 → /45
  - W30, W32, W33, W34 all sessions: update /25 → /45 (content already complete)
"""
import json, re, glob

# ── W29 L-section content ──────────────────────────────────────────────────

L1_W29_S1S2 = [
    "L1 — Read the clue and write the word (10 items)",
    "[ALL] (10 items) Read the clue and write the correct word from the box: [ went / flew / ran / came / beach / airplane / forest / adventure / trip / sand ]",
    "The past tense of \"go\": _________",
    "The past tense of \"fly\": _________",
    "The past tense of \"run\": _________",
    "The past tense of \"come\": _________",
    "A place with water, waves and sand by the sea: _________",
    "A flying machine that carries many passengers: _________",
    "A place full of trees and wild animals: _________",
    "An exciting experience or journey: _________",
    "A short journey or holiday: _________",
    "The dry, grainy ground you find at the beach: _________",
]

L1_W29_S3 = [
    "L1 — Read the clue and write the word (10 items)",
    "[ALL] (10 items) Read the clue and write the correct word from the box: [ went / flew / ran / came / forest / rabbit / butterfly / turtle / trip / amazing ]",
    "The past tense of \"go\": _________",
    "The past tense of \"fly\": _________",
    "The past tense of \"run\": _________",
    "The past tense of \"come\": _________",
    "A place full of trees and wild animals: _________",
    "A fast animal with long ears and a fluffy tail: _________",
    "A beautiful insect with colourful wings: _________",
    "A slow animal with a hard shell on its back: _________",
    "A short journey or holiday: _________",
    "Something wonderful that makes you say \"Wow!\": _________",
]

L5_W29_S1S2 = [
    "L5 — Write Your Own (5 items)",
    "Write a sentence about a place you went to: ________________________________________________________________________________",
    "Write a sentence about something that flew in the sky: ________________________________________________________________________________",
    "Write a sentence about a time you ran fast: ________________________________________________________________________________",
    "Write what adventure means to you: ________________________________________________________________________________",
    "Your best sentence using \"beach\" and \"adventure\": ________________________________________________________________________________",
]

# ── helpers ───────────────────────────────────────────────────────────────

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

# ── fix W29 ───────────────────────────────────────────────────────────────

def fix_w29():
    print("\n=== W29 ===")
    for path in ["mcp-server/data/lessons/W29.json", "public/data/lessons/W29.json"]:
        data = json.load(open(path, encoding='utf-8'))
        for si, s in enumerate(data['sessions']):
            for p in s['parts']:
                if not p['title'].startswith('PART 3'):
                    continue
                c = list(p['content'])

                # --- insert L1 before first L2 line ---
                l2_idx = next(
                    (i for i, l in enumerate(c) if re.match(r'^L2\s+[—–\-]', str(l).strip())),
                    None
                )
                if l2_idx is None:
                    print(f"  W29 S{si+1}: L2 not found – skipping L1 insert")
                else:
                    l1_block = L1_W29_S3 if si == 2 else L1_W29_S1S2
                    c = c[:l2_idx] + l1_block + c[l2_idx:]
                    print(f"  W29 S{si+1}: inserted L1 ({len(l1_block)} lines) before L2")

                # --- insert L5 before Sub-total (only S1/S2 which currently lack it) ---
                if si in (0, 1):
                    sub_idx = next(
                        (i for i, l in enumerate(c) if 'Sub-total' in str(l)),
                        None
                    )
                    if sub_idx is not None:
                        c = c[:sub_idx] + L5_W29_S1S2 + c[sub_idx:]
                        print(f"  W29 S{si+1}: inserted L5 ({len(L5_W29_S1S2)} lines) before Sub-total")

                # --- fix sub-total marker ---
                for i, l in enumerate(c):
                    if 'Sub-total' in str(l):
                        old = str(c[i])
                        c[i] = '[ Sub-total: ___ / 45 ]'
                        print(f"  W29 S{si+1}: sub-total '{old}' → '/45'")
                        break

                p['content'] = c
        save(path, data)

# ── fix PART 3 sub-total /25 → /45 ───────────────────────────────────────

def fix_part3_subtotal(week):
    print(f"\n=== W{week} PART 3 sub-total /25 → /45 ===")
    for path in [f"mcp-server/data/lessons/W{week}.json",
                 f"public/data/lessons/W{week}.json"]:
        data = json.load(open(path, encoding='utf-8'))
        changed = 0
        for si, s in enumerate(data['sessions']):
            for p in s['parts']:
                if not p['title'].startswith('PART 3'):
                    continue
                for i, l in enumerate(p['content']):
                    if str(l).strip() == '[ Sub-total: ___ / 25 ]':
                        p['content'][i] = '[ Sub-total: ___ / 45 ]'
                        changed += 1
                        print(f"  W{week} S{si+1}: /25 → /45")
        save(path, data)
        print(f"  {changed} marker(s) changed")

# ── main ──────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    fix_w29()
    for wk in [30, 32, 33, 34]:
        fix_part3_subtotal(wk)
    rebuild_lesson_plans()
    print("\nDone.")
