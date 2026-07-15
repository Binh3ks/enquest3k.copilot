"""
Fix thin parts: W29 SPIRAL, W30/W32 PART5, W31/W36 PART7
Match W28 golden format exactly.
"""
import json, os

BASE = os.path.dirname(os.path.abspath(__file__))

# ─────────────────────────────────────────────────────────────────────────────
# W29 SPIRAL REVIEW  (3 lines → 5, separate answer lines like W28)
# ─────────────────────────────────────────────────────────────────────────────
SPIRAL_W29 = {
    1: [
        "Translation: 'Đầu tiên, tôi đi bộ đến trường.'",
        "\u2192 First, I ____________________ to school.",
        "Error Correction: 'He play soccer yesterday.'",
        "\u2192 He ____________________ soccer yesterday.",
        "Fill-in: The trip was very ____________________ (fun / boring / tired).",
    ],
    2: [
        "Translation: 'Con chim đã bay lên trời.'",
        "\u2192 The bird ____________________ up into the sky.",
        "Error Correction: 'I runned on the sand.'",
        "\u2192 I ____________________ on the sand.",
        "Fill-in: Yesterday, I ____________________ (went / go / going) to the beach.",
    ],
    3: [
        "Translation: 'Đầu tiên, con chim đã bay lên trời.'",
        "\u2192 First, the bird ____________________ up into the sky.",
        "Error Correction: 'Next, the cat comed to me.'",
        "\u2192 Next, the cat ____________________ to me.",
        "Fill-in: The trip was a great ____________________ (adventure / adventurous / adventurer).",
    ],
}

# ─────────────────────────────────────────────────────────────────────────────
# W30 PART 5 ERROR CORRECTION  (5 lines → 7, 3 errors + Sub-total)
# ─────────────────────────────────────────────────────────────────────────────
PART5_W30 = {
    1: [
        "1. 'Yesterday, I eated a very big sandwich at the picnic.'",
        "\u2192 Mistake: ____________________ | Correction: Yesterday, I ____________________ a very big sandwich.",
        "2. 'She drinked the cold juice quickly and smiled.'",
        "\u2192 Mistake: ____________________ | Correction: She ____________________ the cold juice quickly.",
        "3. 'I was very hungry, so I drank a sandwich.'",
        "\u2192 Mistake: ____________________ | Correction: I was very hungry, so I ____________________ a sandwich.",
        "[ Sub-total: ___ / 3 ]",
    ],
    2: [
        "1. 'Finally, I ate a sandwich, and first, I was hungry.'",
        "\u2192 Mistake: ____________________ | Correction: ____________________________________________.",
        "2. 'The little dog eated the fresh fruit on the blanket.'",
        "\u2192 Mistake: ____________________ | Correction: The little dog ____________________ the fresh fruit.",
        "3. 'I was very thirsty, so I ate a glass of water.'",
        "\u2192 Mistake: ____________________ | Correction: I was very thirsty, so I ____________________ a glass of water.",
        "[ Sub-total: ___ / 3 ]",
    ],
    3: [
        "1. 'The dog eated the sandwich and drinked all the juice.'",
        "\u2192 Mistakes (2): ____________________ | Corrections: The dog ____________________ and ____________________.",
        "2. 'I didn't drank the water because I was not thirsty.'",
        "\u2192 Mistake: ____________________ | Correction: I didn't ____________________ the water.",
        "3. 'Did you had a delicious picnic yesterday?'",
        "\u2192 Mistake: ____________________ | Correction: Did you ____________________ a delicious picnic?",
        "[ Sub-total: ___ / 3 ]",
    ],
}

# ─────────────────────────────────────────────────────────────────────────────
# W31 PART 7 QUICK PRODUCTION  (5 lines → 6, add Sub-total)
# ─────────────────────────────────────────────────────────────────────────────
PART7_W31 = {
    1: [
        "1. Write '\u0111\u00e3 nghe' in English: ____________________  |  Write '\u0111\u00e3 c\u1ea3m th\u1ea5y' in English: ____________________",
        "2. Past tense of 'see': ____________________  |  Past tense of 'hear': ____________________  |  Past tense of 'feel': ____________________",
        "3. In the forest, Luna used 3 senses. Name them: ____________________, ____________________, ____________________",
        "4. Use 'heard' in a sentence about something surprising:",
        "____________________________________________________________",
        "5. My best sentence this session (use 1 sense verb + 1 forest word):",
        "____________________________________________________________",
        "[ Sub-total: ___ / 5 ]",
    ],
    2: [
        "1. Write '\u0111\u00e3 c\u1ea3m th\u1ea5y' in English: ____________________  |  Write 'c\u00e0nh c\u00e2y' in English: ____________________",
        "2. Past tense of 'smell': ____________________  |  Past tense of 'sit': ____________________  |  Past tense of 'find': ____________________",
        "3. Name 2 things you might HEAR in a forest: ____________________, ____________________",
        "4. Use 'felt' in a sentence about nature:",
        "____________________________________________________________",
        "5. My best sentence this session (use 1 sense verb + describing word):",
        "____________________________________________________________",
        "[ Sub-total: ___ / 5 ]",
    ],
    3: [
        "1. Write all 4 sense verbs in past tense: __________, __________, __________, __________",
        "2. Past tense of 'stand': ____________________  |  Past tense of 'think': ____________________",
        "3. Which sense can you use in the dark? (circle): saw / heard / felt / smelt",
        "4. Write a sentence starting with 'First, I saw': ____________________________________________",
        "5. My best sentence this whole week (use First/Then/Finally + 2 sense verbs):",
        "____________________________________________________________",
        "[ Sub-total: ___ / 5 ]",
    ],
}

# ─────────────────────────────────────────────────────────────────────────────
# W32 PART 5 ERROR CORRECTION  (5 lines → 7, 3 errors + Sub-total)
# ─────────────────────────────────────────────────────────────────────────────
PART5_W32 = {
    1: [
        "1. 'Yesterday, I doed all my difficult homework after school.'",
        "\u2192 Mistake: ____________________ | Correction: Yesterday, I ____________________ all my homework.",
        "2. 'She maked her bed carefully every morning.'",
        "\u2192 Mistake: ____________________ | Correction: She ____________________ her bed carefully.",
        "3. 'I took a breakfast at 7 o'clock this morning.'",
        "\u2192 Mistake: ____________________ | Correction: I ____________________ breakfast at 7 o'clock.",
        "[ Sub-total: ___ / 3 ]",
    ],
    2: [
        "1. 'Finally, I took a shower, and first, I did my chores.'",
        "\u2192 Mistake: ____________________ | Correction: ____________________________________________.",
        "2. 'My brother haved a big breakfast before school.'",
        "\u2192 Mistake: ____________________ | Correction: My brother ____________________ a big breakfast.",
        "3. 'I made a shower after the soccer game.'",
        "\u2192 Mistake: ____________________ | Correction: I ____________________ a shower after the game.",
        "[ Sub-total: ___ / 3 ]",
    ],
    3: [
        "1. 'I doed my chores and taked a photo of the clean room.'",
        "\u2192 Mistakes (2): ____________________ | Corrections: I ____________________ and ____________________.",
        "2. 'I didn't had breakfast this morning because I was late.'",
        "\u2192 Mistake: ____________________ | Correction: I didn't ____________________ breakfast.",
        "3. 'Did you made your bed before you came to school?'",
        "\u2192 Mistake: ____________________ | Correction: Did you ____________________ your bed?",
        "[ Sub-total: ___ / 3 ]",
    ],
}

# ─────────────────────────────────────────────────────────────────────────────
# W36 PART 7 QUICK PRODUCTION  (5 lines → 6, add Sub-total)
# ─────────────────────────────────────────────────────────────────────────────
PART7_W36 = {
    1: [
        "1. Write '\u0111\u00e3 \u0111\u00e1nh m\u1ea5t' in English: ____________________  |  Write 'c\u00e2u chuy\u1ec7n' in English: ____________________",
        "2. Past tense of 'go': ____________________  |  'see': ____________________  |  'lose': ____________________  |  'find': ____________________",
        "3. Name 2 sequence words you can use in a story: ____________________, ____________________",
        "4. Use 'went' in a sentence about an adventure:",
        "____________________________________________________________",
        "5. My best sentence this session (use 1 Block B verb + sequence word):",
        "____________________________________________________________",
        "[ Sub-total: ___ / 5 ]",
    ],
    2: [
        "1. Write 'c\u1ea3m th\u1ea5y lo l\u1eafng' in English: ____________________  |  Write 'cu\u1ed1i c\u00f9ng' in English: ____________________",
        "2. Past tense of 'feel': ____________________  |  'hear': ____________________  |  'run': ____________________  |  'give': ____________________",
        "3. Put these in order: Finally / First / Then \u2192 ____________________, ____________________, ____________________",
        "4. Use 'felt' in a sentence about a story character:",
        "____________________________________________________________",
        "5. My best sentence this session (use 2 Block B verbs in one sentence):",
        "____________________________________________________________",
        "[ Sub-total: ___ / 5 ]",
    ],
    3: [
        "1. Write all 5 sequence words from memory: ___________________________________________________",
        "2. Choose the correct verb: Max (go/went/goes) to the forest last week.",
        "3. Write 1 sentence using BOTH 'lost' and 'found': ___________________________________________________",
        "4. Write your story title and one sentence using 'was': Title: ____________________ | Sentence: ____________________",
        "5. My best sentence this whole week (use First/Then/Finally + 3 Block B verbs):",
        "____________________________________________________________",
        "[ Sub-total: ___ / 5 ]",
    ],
}

# ─────────────────────────────────────────────────────────────────────────────
# APPLY
# ─────────────────────────────────────────────────────────────────────────────
def patch(week, target_key, data_by_session):
    for path_rel in [f"mcp-server/data/lessons/W{week}.json", f"public/data/lessons/W{week}.json"]:
        path = os.path.join(BASE, path_rel)
        w = json.load(open(path, encoding="utf-8"))
        for sess in w["sessions"]:
            sn = sess["session"]
            if sn not in data_by_session:
                continue
            new_content = data_by_session[sn]
            for p in sess["parts"]:
                if target_key in p["title"]:
                    old_len = len(p.get("content", []))
                    p["content"] = new_content
                    print(f"  W{week} S{sn} {target_key}: {old_len} -> {len(new_content)} lines")
                    break
        with open(path, "w", encoding="utf-8") as f:
            json.dump(w, f, ensure_ascii=False, indent=2)

print("Fixing W29 SPIRAL...")
patch(29, "SPIRAL", SPIRAL_W29)

print("Fixing W30 PART 5...")
patch(30, "PART 5", PART5_W30)

print("Fixing W31 PART 7...")
patch(31, "PART 7", PART7_W31)

print("Fixing W32 PART 5...")
patch(32, "PART 5", PART5_W32)

print("Fixing W36 PART 7...")
patch(36, "PART 7", PART7_W36)

# Update lessonPlans.json
plans_path = os.path.join(BASE, "public/data/lessonPlans.json")
lp = json.load(open(plans_path, encoding="utf-8"))
for n in [29, 30, 31, 32, 36]:
    lp[str(n)] = json.load(open(os.path.join(BASE, f"public/data/lessons/W{n}.json"), encoding="utf-8"))
with open(plans_path, "w", encoding="utf-8") as f:
    json.dump(lp, f, ensure_ascii=False, indent=2)
print("lessonPlans.json updated")

# Re-run audit
print("\n=== FINAL AUDIT ===")
import subprocess, sys
result = subprocess.run([sys.executable, "_audit2.py"], capture_output=True, text=True)
print(result.stdout)
if result.returncode != 0:
    print(result.stderr)
