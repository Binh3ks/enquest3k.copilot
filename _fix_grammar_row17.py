import json, os

BASE = os.path.dirname(os.path.abspath(__file__))

ROW17 = {
    29: {"Word": "swim \u2192 swam",     "Vietnamese": "ride \u2192 rode",     "Key Collocation(s)": "drive \u2192 drove",   "Memory Trick": "take \u2192 took"},
    30: {"Word": "bring \u2192 brought", "Vietnamese": "make \u2192 made",     "Key Collocation(s)": "cut \u2192 cut",       "Memory Trick": "find \u2192 found"},
    31: {"Word": "find \u2192 found",    "Vietnamese": "sit \u2192 sat",       "Key Collocation(s)": "stand \u2192 stood",   "Memory Trick": "think \u2192 thought"},
    32: {"Word": "put \u2192 put",       "Vietnamese": "keep \u2192 kept",     "Key Collocation(s)": "bring \u2192 brought", "Memory Trick": "leave \u2192 left"},
    33: {"Word": "drop \u2192 dropped",  "Vietnamese": "hurt \u2192 hurt",     "Key Collocation(s)": "spill \u2192 spilt",   "Memory Trick": "trip \u2192 tripped"},
    34: {"Word": "sleep \u2192 slept",   "Vietnamese": "wake \u2192 woke",     "Key Collocation(s)": "eat \u2192 ate",       "Memory Trick": "drink \u2192 drank"},
    35: {"Word": "swim \u2192 swam",     "Vietnamese": "fly \u2192 flew",      "Key Collocation(s)": "ride \u2192 rode",     "Memory Trick": "run \u2192 ran"},
    36: {"Word": "hear \u2192 heard",    "Vietnamese": "run \u2192 ran",       "Key Collocation(s)": "give \u2192 gave",     "Memory Trick": "think \u2192 thought"},
}

for n in range(29, 37):
    for path_rel in [f"mcp-server/data/lessons/W{n}.json", f"public/data/lessons/W{n}.json"]:
        path = os.path.join(BASE, path_rel)
        w = json.load(open(path, encoding="utf-8"))
        old = w["vocab_tiers"][17]["Word"]
        w["vocab_tiers"][17] = ROW17[n]
        with open(path, "w", encoding="utf-8") as f:
            json.dump(w, f, ensure_ascii=False, indent=2)
    print(f"W{n}[17]: '{old}' -> '{ROW17[n]['Word']}'")

# Update lessonPlans.json
plans_path = os.path.join(BASE, "public/data/lessonPlans.json")
lp = json.load(open(plans_path, encoding="utf-8"))
for n in range(29, 37):
    lp[str(n)] = json.load(open(os.path.join(BASE, f"public/data/lessons/W{n}.json"), encoding="utf-8"))
with open(plans_path, "w", encoding="utf-8") as f:
    json.dump(lp, f, ensure_ascii=False, indent=2)

print("\nVerify:")
for n in range(28, 37):
    w = json.load(open(os.path.join(BASE, f"mcp-server/data/lessons/W{n}.json")))
    vt = w["vocab_tiers"]
    strs = [v for v in vt if isinstance(v, str)]
    ok = "OK" if len(vt) == 18 and not strs else "ERROR"
    print(f"  W{n}: {len(vt)} items, {ok} | [16]Word={vt[16]['Word']} | [17]Word={vt[17]['Word']}")
