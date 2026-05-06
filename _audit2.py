import json

def audit():
    w28 = json.load(open("mcp-server/data/lessons/W28.json"))
    print("=== W28 GOLDEN S1 part lengths ===")
    for p in w28["sessions"][0]["parts"]:
        print(f"  {p['title'][:40]!r:45} {len(p.get('content',[]))} lines")
    print()

    total_issues = 0
    for n in range(29, 37):
        w = json.load(open(f"mcp-server/data/lessons/W{n}.json"))
        issues = []
        for si, sess in enumerate(w.get("sessions", [])):
            sn = si + 1
            parts = sess.get("parts", [])
            part_map = {}
            for p in parts:
                t = p["title"]
                for key in ["SPIRAL", "PART 1", "PART 2", "PART 3", "PART 4", "PART 5", "PART 6", "PART 7", "PART 8", "PART 9"]:
                    if key in t:
                        part_map[key] = len(p.get("content", []))

            # Check spiral is SEPARATE part (not in header)
            header = parts[0] if parts else {}
            header_content = header.get("content", [])
            spiral_in_header = any("SPIRAL" in str(l) for l in header_content)
            if spiral_in_header:
                issues.append(f"S{sn} SPIRAL merged in header - needs separate part")

            checks = [
                ("SPIRAL", part_map.get("SPIRAL", 0), 5),
                ("PART 5", part_map.get("PART 5", 0), 6),
                ("PART 6", part_map.get("PART 6", 0), 13),
                ("PART 7", part_map.get("PART 7", 0), 6),
                ("PART 8", part_map.get("PART 8", 0), 9),
            ]
            for name, got, want in checks:
                if got < want:
                    issues.append(f"S{sn} {name}: {got} lines (need {want}+)")

        print(f"W{n}: {len(issues)} issues")
        for iss in issues:
            print(f"  ! {iss}")
            total_issues += 1
        if not issues:
            print("  All parts OK")

    print(f"\nTotal issues: {total_issues}")

audit()
