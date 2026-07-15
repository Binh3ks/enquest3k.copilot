"""
Fix vocab_tiers grammar rows: each verb pair = 1 individual dict row.
Format: Word="eat → ate" | Vietnamese="ăn → ăn (QK)" | Key Collocation(s)=sentence | Memory Trick=tip
"""
import json, os

BASE = os.path.dirname(os.path.abspath(__file__))

# Each verb pair as its own dict row (Word=present→past, Vietnamese=viet→viet(QK), Colloc=example, Trick=tip)
GRAMMAR_ROWS = {

    29: [  # go→went, come→came, run→ran, fly→flew
        {"Word": "go \u2192 went",    "Vietnamese": "đi \u2192 đã đi",       "Key Collocation(s)": "We went on a trip last weekend.",           "Memory Trick": "GO \u2192 WENT: completely different — memorise it!"},
        {"Word": "come \u2192 came",  "Vietnamese": "đến \u2192 đã đến",     "Key Collocation(s)": "She came back home after school.",           "Memory Trick": "COME \u2192 CAME: change O to A"},
        {"Word": "run \u2192 ran",    "Vietnamese": "chạy \u2192 đã chạy",   "Key Collocation(s)": "Max ran all the way to the mountain.",       "Memory Trick": "RUN \u2192 RAN: change U to A"},
        {"Word": "fly \u2192 flew",   "Vietnamese": "bay \u2192 đã bay",     "Key Collocation(s)": "The bird flew over the river.",              "Memory Trick": "FLY \u2192 FLEW: change Y to EW"},
    ],

    30: [  # eat→ate, drink→drank, have→had
        {"Word": "eat \u2192 ate",    "Vietnamese": "ăn \u2192 đã ăn",       "Key Collocation(s)": "They ate sandwiches at the picnic.",         "Memory Trick": "EAT \u2192 ATE: remove E, swap letters"},
        {"Word": "drink \u2192 drank","Vietnamese": "uống \u2192 đã uống",   "Key Collocation(s)": "She drank cold juice in the park.",          "Memory Trick": "DRINK \u2192 DRANK: change I to A"},
        {"Word": "have \u2192 had",   "Vietnamese": "có/ăn \u2192 đã có/ăn", "Key Collocation(s)": "We had a wonderful picnic together.",        "Memory Trick": "HAVE \u2192 HAD: drop the VE, add D"},
    ],

    31: [  # see→saw, hear→heard, feel→felt, smell→smelt
        {"Word": "see \u2192 saw",    "Vietnamese": "nhìn thấy \u2192 đã thấy",    "Key Collocation(s)": "Luna saw a deer in the forest.",         "Memory Trick": "SEE \u2192 SAW: change EE to AW"},
        {"Word": "hear \u2192 heard", "Vietnamese": "nghe \u2192 đã nghe",          "Key Collocation(s)": "They heard a strange rustling sound.",   "Memory Trick": "HEAR \u2192 HEARD: just add D at the end"},
        {"Word": "feel \u2192 felt",  "Vietnamese": "cảm thấy \u2192 đã cảm thấy", "Key Collocation(s)": "She felt a cool breeze on the path.",    "Memory Trick": "FEEL \u2192 FELT: drop one E, add T"},
        {"Word": "smell \u2192 smelt","Vietnamese": "ngửi \u2192 đã ngửi",          "Key Collocation(s)": "He smelt fresh flowers near the stream.","Memory Trick": "SMELL \u2192 SMELT: drop one L, add T"},
    ],

    32: [  # do→did, make→made, have→had, take→took
        {"Word": "do \u2192 did",     "Vietnamese": "làm \u2192 đã làm",     "Key Collocation(s)": "Max did his homework after dinner.",          "Memory Trick": "DO \u2192 DID: add ID — I Did it!"},
        {"Word": "make \u2192 made",  "Vietnamese": "tạo ra \u2192 đã làm",  "Key Collocation(s)": "She made her bed every morning.",            "Memory Trick": "MAKE \u2192 MADE: change K to D"},
        {"Word": "have \u2192 had",   "Vietnamese": "có/ăn \u2192 đã có/ăn", "Key Collocation(s)": "He had a big breakfast at 7 o'clock.",       "Memory Trick": "HAVE \u2192 HAD: change VE to D"},
        {"Word": "take \u2192 took",  "Vietnamese": "lấy/chụp \u2192 đã lấy","Key Collocation(s)": "She took a photo of the clean room.",        "Memory Trick": "TAKE \u2192 TOOK: change A to OO"},
    ],

    33: [  # break→broke, fall→fell, lose→lost, find→found
        {"Word": "break \u2192 broke","Vietnamese": "làm vỡ \u2192 đã vỡ",  "Key Collocation(s)": "He broke the glass by accident.",             "Memory Trick": "BREAK \u2192 BROKE: change EA to O"},
        {"Word": "fall \u2192 fell",  "Vietnamese": "ngã/rơi \u2192 đã ngã", "Key Collocation(s)": "She fell off the chair in the classroom.",   "Memory Trick": "FALL \u2192 FELL: change A to E"},
        {"Word": "lose \u2192 lost",  "Vietnamese": "mất \u2192 đã mất",     "Key Collocation(s)": "Max lost his bag on the way to school.",     "Memory Trick": "LOSE \u2192 LOST: change SE to ST"},
        {"Word": "find \u2192 found", "Vietnamese": "tìm thấy \u2192 đã tìm","Key Collocation(s)": "Luna found the key under the table.",        "Memory Trick": "FIND \u2192 FOUND: change I to OU"},
    ],

    34: [  # run→ran, win→won, catch→caught, say→said
        {"Word": "run \u2192 ran",    "Vietnamese": "chạy \u2192 đã chạy",   "Key Collocation(s)": "The lion ran after the mouse in the forest.", "Memory Trick": "RUN \u2192 RAN: change U to A"},
        {"Word": "win \u2192 won",    "Vietnamese": "thắng \u2192 đã thắng", "Key Collocation(s)": "The mouse won because she was clever.",       "Memory Trick": "WIN \u2192 WON: change I to O"},
        {"Word": "catch \u2192 caught","Vietnamese": "bắt \u2192 đã bắt",    "Key Collocation(s)": "The hunters caught the lion in a net.",       "Memory Trick": "CATCH \u2192 CAUGHT: -ATCH to -AUGHT (silent GH)"},
        {"Word": "say \u2192 said",   "Vietnamese": "nói \u2192 đã nói",     "Key Collocation(s)": "'I will help you!' said the little mouse.",   "Memory Trick": "SAY \u2192 SAID: change Y to ID"},
    ],

    35: [  # go→went, see→saw, feel→felt, make→made, give→gave
        {"Word": "go \u2192 went",    "Vietnamese": "đi \u2192 đã đi",       "Key Collocation(s)": "Max went to the beach on his best day.",      "Memory Trick": "GO \u2192 WENT: completely different — memorise it!"},
        {"Word": "see \u2192 saw",    "Vietnamese": "nhìn thấy \u2192 đã thấy","Key Collocation(s)": "He saw colourful coral under the sea.",     "Memory Trick": "SEE \u2192 SAW: change EE to AW"},
        {"Word": "feel \u2192 felt",  "Vietnamese": "cảm thấy \u2192 đã cảm thấy","Key Collocation(s)": "She felt happy when the kite flew high.", "Memory Trick": "FEEL \u2192 FELT: drop one E, add T"},
        {"Word": "make \u2192 made",  "Vietnamese": "làm ra \u2192 đã làm",  "Key Collocation(s)": "They made a big sandcastle on the beach.",    "Memory Trick": "MAKE \u2192 MADE: change K to D"},
        {"Word": "give \u2192 gave",  "Vietnamese": "cho/tặng \u2192 đã tặng","Key Collocation(s)": "He gave a shell to his mum as a gift.",      "Memory Trick": "GIVE \u2192 GAVE: change I to A"},
    ],

    36: [  # review week — key verbs recap
        {"Word": "go \u2192 went",    "Vietnamese": "đi \u2192 đã đi",       "Key Collocation(s)": "Max went on his greatest adventure.",         "Memory Trick": "GO \u2192 WENT: completely different — memorise!"},
        {"Word": "see \u2192 saw",    "Vietnamese": "nhìn thấy \u2192 đã thấy","Key Collocation(s)": "She saw a lion in the deep forest.",        "Memory Trick": "SEE \u2192 SAW: change EE to AW"},
        {"Word": "lose \u2192 lost",  "Vietnamese": "mất \u2192 đã mất",     "Key Collocation(s)": "He lost his map in the cave.",               "Memory Trick": "LOSE \u2192 LOST: change SE to ST"},
        {"Word": "find \u2192 found", "Vietnamese": "tìm thấy \u2192 đã tìm","Key Collocation(s)": "Finally, she found the path home.",          "Memory Trick": "FIND \u2192 FOUND: change I to OU"},
    ],
}

# ─────────────────────────────────────────────────────────────────────────────
# APPLY: replace rows [16] onwards with individual verb rows
# ─────────────────────────────────────────────────────────────────────────────
def apply(week_num):
    rows = GRAMMAR_ROWS[week_num]
    for path_rel in [f"mcp-server/data/lessons/W{week_num}.json", f"public/data/lessons/W{week_num}.json"]:
        path = os.path.join(BASE, path_rel)
        w = json.load(open(path, encoding="utf-8"))
        # Keep [0-15] (story + Tier2 words), replace [16+] with individual verb rows
        base = [v for v in w["vocab_tiers"] if isinstance(v, dict)][:16]
        w["vocab_tiers"] = base + rows
        total = len(w["vocab_tiers"])
        with open(path, "w", encoding="utf-8") as f:
            json.dump(w, f, ensure_ascii=False, indent=2)
        print(f"  {path_rel}: {total} items ({len(base)} words + {len(rows)} verb rows)")


print("=" * 60)
for n in range(29, 37):
    print(f"W{n}:")
    apply(n)

# Update lessonPlans.json
print("\nUpdating lessonPlans.json...")
plans_path = os.path.join(BASE, "public/data/lessonPlans.json")
lp = json.load(open(plans_path, encoding="utf-8"))
for n in range(29, 37):
    lp[str(n)] = json.load(open(os.path.join(BASE, f"public/data/lessons/W{n}.json"), encoding="utf-8"))
with open(plans_path, "w", encoding="utf-8") as f:
    json.dump(lp, f, ensure_ascii=False, indent=2)

print("\nVerify:")
for n in range(29, 37):
    w = json.load(open(os.path.join(BASE, f"mcp-server/data/lessons/W{n}.json")))
    vt = w["vocab_tiers"]
    strs = sum(1 for v in vt if isinstance(v, str))
    verb_rows = [v for v in vt if isinstance(v, dict) and "\u2192" in v.get("Word", "")]
    print(f"  W{n}: {len(vt)} total | {strs} strings | {len(verb_rows)} verb rows | last={vt[-1]['Word']!r}")
