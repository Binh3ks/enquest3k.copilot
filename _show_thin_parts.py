import json

w28 = json.load(open("mcp-server/data/lessons/W28.json"))

print("=== W28 SPIRAL REVIEW ===")
for p in w28["sessions"][0]["parts"]:
    if "SPIRAL" in p["title"]:
        for line in p.get("content", []):
            print(f"  {repr(line)[:110]}")
        break

print("\n=== W28 PART 5 ERROR CORRECTION ===")
for p in w28["sessions"][0]["parts"]:
    if "PART 5" in p["title"]:
        for line in p.get("content", []):
            print(f"  {repr(line)[:110]}")
        break

print("\n=== W28 PART 7 QUICK PRODUCTION ===")
for p in w28["sessions"][0]["parts"]:
    if "PART 7" in p["title"]:
        for line in p.get("content", []):
            print(f"  {repr(line)[:110]}")
        break

print("\n\n=== W29 SPIRAL current ===")
w29 = json.load(open("mcp-server/data/lessons/W29.json"))
for sess in w29["sessions"]:
    for p in sess["parts"]:
        if "SPIRAL" in p["title"]:
            print(f"  S{sess['session']}: {p['content']}")
            break

print("\n=== W30 PART 5 current ===")
w30 = json.load(open("mcp-server/data/lessons/W30.json"))
for sess in w30["sessions"]:
    for p in sess["parts"]:
        if "PART 5" in p["title"]:
            print(f"  S{sess['session']}: {p['content']}")
            break

print("\n=== W31 PART 7 current ===")
w31 = json.load(open("mcp-server/data/lessons/W31.json"))
for sess in w31["sessions"]:
    for p in sess["parts"]:
        if "PART 7" in p["title"]:
            print(f"  S{sess['session']}: {p['content']}")
            break

print("\n=== W32 PART 5 current ===")
w32 = json.load(open("mcp-server/data/lessons/W32.json"))
for sess in w32["sessions"]:
    for p in sess["parts"]:
        if "PART 5" in p["title"]:
            print(f"  S{sess['session']}: {p['content']}")
            break

print("\n=== W36 PART 7 current ===")
w36 = json.load(open("mcp-server/data/lessons/W36.json"))
for sess in w36["sessions"]:
    for p in sess["parts"]:
        if "PART 7" in p["title"]:
            print(f"  S{sess['session']}: {p['content']}")
            break
